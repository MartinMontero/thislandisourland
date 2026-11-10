// Collects the translatable English strings that live in the data files (dist/js/data*.js) into
// i18n/strings.en.json, grouped by namespace. Names, quotes, URLs, ids, vote counts and anything
// else that must stay as written are skipped by rule (see SKIP_KEYS and SKIP_PATHS).
//
//   node scripts/extract-strings.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ctx = { window: {}, console };
ctx.window.window = ctx.window;
vm.createContext(ctx);
for (const f of ['data', 'data-officials', 'data-wave', 'data-captions', 'data-provenance', 'data-buildpower']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'dist', 'js', f + '.js'), 'utf8'), ctx, { filename: f });
}
const D = ctx.window.MOSAIC;

// Dataset -> namespace. The names match the overlay namespaces.
const NS = { buildpower: 'buildpower', provenance: 'provenance', ledger: 'provenance', wave: 'wave', officials: 'officials', themes: 'officials', insights: 'ledger', lab: 'ledger', local: 'ledger', districts: 'ledger', money: 'ledger', justice: 'ledger', rcv: 'ledger', charts: 'ledger' };

// Keys whose values are never translated: identifiers, links, proper names, quotations, dates and
// the verbatim words of speakers.
const KEEP_SINGLE = [/^wave\.shiftChart\.labels\.\d+$/, /^charts\.\d+\.(labels\.\d+|series\.\d+\.label)$/];
const SKIP_KEYS = new Set(['id', 'url', 'href', 'source', 'src', 'sources', 'links', 'link', 'name', 'who', 'quote', 'quotes', 'excerpts', 'full', 'video', 'speech', 'youtubeId', 'videoId', 'channel', 'party', 'office', 'officeType', 'jurisdiction', 'jurisdictionShort', 'keywords', 'date', 'date_verified', 'generated', 'verified', 'expires', 'swatch', 'color', 'unit', 'cls', 'arrow', 'exportText', 'labels', 'y2024', 'y2026', 'data', 'domainTier', 'city', 'incumbent', 'winner', 'eyebrow', 'post', 'retrieved', 'byId', 'extra', 'further', 'asOf', 'title_en', 'panel', 'canvas', 'group', 'status', 'verification', 'section', 'engage', 'stack', 'mills', 'seats', 'assessmentRatio', 'n', 'kind', 'ranking', 'size', 'themes', 'fixed', 'on', 'type']);
// Provenance and officials keep a few fields that the skip list would otherwise drop.
const KEEP_UNDER = [/^(wave\.shiftChart|charts\.\d+)\.labels(\.\d+)?$/,/^provenance\.tiers\.\d+\.name$/, /^provenance\.status\./, /^provenance\.groups\./, /^buildpower\.sections\./, /^buildpower\.beautiful_trouble_types\.\d+\.type$/, /^buildpower\.start_something\.\d+\.start$/, /^themes\.\d+\.(short|label)$/];
const SKIP_PATHS = [/^captions\./, /^officials\.\d+\.(speech|sources)/, /^wave\.shiftChart/, /^wave\.texas\.video/, /^wave\.speechmap\.\d+\.quotes/, /^wave\.forces\.\d+\.voice/, /\.url$/, /\.sources\./];

const out = {};
const seen = {};
function add(ns, s, force, keepSingle) {
  const t = s.replace(/\s+/g, ' ').trim();
  if (!t) return;
  if (!/\p{L}{2,}/u.test(t)) return;
  if (/^https?:\/\//.test(t)) return;
  if (force) { (seen[ns] ||= new Set()).add(t); return; }
  if (!keepSingle && !/\s/.test(t) && !/^[a-z]/.test(t)) return; // single capitalised words are almost always names
  // Designations, acronyms, EINs and numbers need no translation: skip strings with no ordinary lowercase word left.
  const core = t.replace(/501\(c\)\(\d+\)|\bEIN\b[\s\d-]*|\b[A-Z]{2,}[A-Za-z]*\b|[\d$%.,;:()/+\-–—&"'“”‘’]/g, ' ');
  if (!/\p{Ll}{3,}/u.test(core)) return;
  (seen[ns] ||= new Set()).add(t);
}
function walk(v, p, ns) {
  if (typeof v === 'string') { if (KEEP_UNDER.some((r) => r.test(p)) || (!SKIP_PATHS.some((r) => r.test(p)))) add(ns, v, false, KEEP_SINGLE.some((r) => r.test(p))); return; }
  if (Array.isArray(v)) { v.forEach((x, i) => walk(x, p + '.' + i, ns)); return; }
  if (v && typeof v === 'object') {
    for (const [k, x] of Object.entries(v)) {
      const sub = p + '.' + k;
      if (SKIP_KEYS.has(k) && !KEEP_UNDER.some((r) => r.test(sub))) continue;
      walk(x, sub, ns);
    }
  }
}
for (const [k, ns] of Object.entries(NS)) if (D[k] !== undefined) walk(D[k], k, ns);

// Strings that app.js builds in code (labels and templates). {x} marks a variable; the runtime
// matches these as patterns, so the English in app.js stays untouched.
const manual = JSON.parse(fs.readFileSync(path.join(root, 'i18n', 'manual.en.json'), 'utf8'));
for (const [ns, list] of Object.entries(manual)) list.forEach((s) => add(ns, s, true));

// A string that appears in several namespaces is claimed once, by the highest-priority namespace,
// so it is translated (and counted) once.
const PRIORITY = ['buildpower', 'suggest', 'provenance', 'method', 'wave', 'officials', 'ledger', 'shell'];
const claimed = new Set();
for (const ns of PRIORITY) {
  if (!seen[ns]) continue;
  out[ns] = [...seen[ns]].filter((t) => !claimed.has(t)).sort();
  out[ns].forEach((t) => claimed.add(t));
}
fs.writeFileSync(path.join(root, 'i18n', 'strings.en.json'), JSON.stringify(out, null, 1) + '\n');
console.log(Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length + ' strings, ' + v.reduce((a, s) => a + s.length, 0) + ' chars'])));
