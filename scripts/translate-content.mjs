// Generates the next wave of Spanish / Arabic overlay text with the Anthropic API.
// It is resumable (skips anything already in i18n/<lang>.json), caches by a hash of the source string,
// sends the glossary and the never-translate rules in the system prompt, and runs the same validator as the
// build before it writes anything. It never edits the English data files.
//
//   node scripts/translate-content.mjs --lang es,ar --limit 80 --provider anthropic [--model claude-sonnet-5-5]
//   node scripts/translate-content.mjs --dry-run            # identity translations, written to .cache only
//   --tag wave-2     adds a tag to meta.tags of the files it changes
//   --ns buildpower  only this namespace (default: all, in priority order)
//
// Environment: ANTHROPIC_API_KEY (required for --provider anthropic), ANTHROPIC_BASE_URL (optional).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { validate, I18N } from './lib/validate-translation.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => (a.startsWith('--') ? [a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true] : null)).filter(Boolean));
const langs = String(args.lang || 'es,ar').split(',').map((s) => s.trim()).filter(Boolean);
const limit = args.limit ? Number(args.limit) : Infinity;
const provider = args.provider || 'anthropic';
const model = args.model || 'claude-sonnet-5-5';
const dry = !!args['dry-run'];
const only = args.ns && args.ns !== true ? String(args.ns) : null;
const BATCH = 25;
const PRIORITY = ['buildpower', 'suggest', 'provenance', 'method', 'wave', 'officials', 'ledger', 'shell'];

const rd = (f, d) => (fs.existsSync(path.join(root, f)) ? JSON.parse(fs.readFileSync(path.join(root, f), 'utf8')) : d);
const staticEn = rd('i18n/static.en.json', {});
const stringsEn = rd('i18n/strings.en.json', {});
const cacheFile = path.join(root, '.cache', 'translations.json');
const cache = fs.existsSync(cacheFile) ? JSON.parse(fs.readFileSync(cacheFile, 'utf8')) : {};
const sha = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 16);

const LANG_NAME = { es: 'Spanish (neutral Latin American / US usage)', ar: 'Modern Standard Arabic' };
function systemPrompt(lang) {
  const g = I18N().glossary.map((x) => `- "${x.en}" -> "${x[lang]}"`).join('\n');
  return `You translate interface and explanatory text for a nonpartisan civic-education website into ${LANG_NAME[lang]}.
Rules, all mandatory:
1. Output JSON only: an array of {"key": "...", "text": "..."} with the same keys you were given.
2. Never translate or alter: person names, organization names, product names, URLs, numbers, dates' digits, vote counts, percentages, code, legal designations (501(c)(3), 501(c)(4), 527, PAC, Super PAC, EIN, IRS, FEC) or any quotation inside quote marks. Keep every capitalised proper-noun token exactly as written.
3. Keep HTML tags, attributes, hrefs and {placeholders} exactly as in the source; translate only the text between tags. Preserve the order of tags.
4. Use Western digits (0-9) in every language, including Arabic.
5. In Arabic output that contains HTML, wrap every Latin-script name, URL or designation in <bdi>...</bdi>. Do not add <bdi> in plain-text items.
6. These terms carry legal, tax or verification meaning. Use exactly this rendering whenever the English term appears:
${g}
7. Keep the register plain, neutral and non-partisan. Do not add, remove or soften claims. Do not add explanations.
If a source is a plural pattern containing {n}, translate it as a single sentence; the program handles plural forms separately.`;
}

async function callAnthropic(lang, items) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('ANTHROPIC_API_KEY is not set');
  const base = (process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com').replace(/\/$/, '');
  const r = await fetch(base + '/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model, max_tokens: 8000, system: systemPrompt(lang), messages: [{ role: 'user', content: JSON.stringify(items.map((x) => ({ key: x.key, text: x.src }))) }] })
  });
  if (!r.ok) throw new Error('Anthropic API ' + r.status);
  const j = await r.json();
  const text = (j.content || []).map((c) => c.text || '').join('');
  const m = /\[[\s\S]*\]/.exec(text);
  if (!m) throw new Error('no JSON array in the response');
  return JSON.parse(m[0]);
}

function pending(lang, cur) {
  const out = [];
  for (const ns of PRIORITY) {
    if (only && ns !== only) continue;
    for (const [id, v] of Object.entries(staticEn)) if (v.ns === ns && cur.static[id] == null) out.push({ key: 's:' + id, ns, id, kind: 'static', src: v.html ?? v.text, html: v.html !== undefined });
    for (const en of stringsEn[ns] || []) if (!(cur.strings[ns] || {})[en]) out.push({ key: 't:' + ns + ':' + sha(en), ns, en, kind: 'string', src: en, html: false });
  }
  return out;
}

async function run(lang) {
  const file = path.join(root, 'i18n', `${lang}.json`);
  const cur = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { meta: {}, static: {}, strings: {} };
  cur.static ||= {}; cur.strings ||= {}; cur.meta ||= {};
  const todo = pending(lang, cur).slice(0, limit);
  let added = 0, rejected = 0;
  for (let i = 0; i < todo.length; i += BATCH) {
    const batch = todo.slice(i, i + BATCH);
    let got = [];
    if (dry) got = batch.map((b) => ({ key: b.key, text: b.src }));
    else {
      const cached = batch.filter((b) => cache[lang + ':' + sha(b.src)]);
      got = cached.map((b) => ({ key: b.key, text: cache[lang + ':' + sha(b.src)] }));
      const fresh = batch.filter((b) => !cache[lang + ':' + sha(b.src)]);
      if (fresh.length) got = got.concat(await callAnthropic(lang, fresh));
    }
    const byKey = Object.fromEntries(got.map((g) => [g.key, g.text]));
    for (const b of batch) {
      const tr = byKey[b.key];
      const errs = tr == null ? ['missing'] : (dry ? [] : validate(b.src, tr, lang, { html: b.html }));
      if (errs.length) { rejected++; console.error(`${lang} ${b.key}: ${errs.join('; ')}`); continue; }
      if (!dry) cache[lang + ':' + sha(b.src)] = tr;
      if (b.kind === 'static') cur.static[b.id] = tr; else (cur.strings[b.ns] ||= {})[b.en] = tr;
      added++;
    }
    console.log(`${lang}: ${Math.min(i + BATCH, todo.length)} of ${todo.length} processed`);
  }
  cur.meta = { ...cur.meta, model: dry ? 'dry-run (identity)' : model, machine_translated: true, reviewed_by: cur.meta.reviewed_by || null };
  if (args.tag && args.tag !== true) cur.meta.tags = [...new Set([...(cur.meta.tags || []), args.tag])];
  const outFile = dry ? path.join(root, '.cache', `${lang}.dry-run.json`) : file;
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(cur, null, 1) + '\n');
  if (!dry) { fs.mkdirSync(path.dirname(cacheFile), { recursive: true }); fs.writeFileSync(cacheFile, JSON.stringify(cache)); }
  console.log(`${lang}: added ${added}, rejected by the validator ${rejected}, still untranslated ${Math.max(0, pending(lang, cur).length)}${dry ? ' (dry run: wrote ' + path.relative(root, outFile) + ')' : ''}`);
}

if (provider !== 'anthropic' && !dry) { console.error('Only --provider anthropic is supported.'); process.exit(1); }
for (const l of langs) await run(l);
