// Checks one machine translation against its English source. Used by build-i18n, translate-content and the tests.
// Rules: every URL, number, capitalised proper-noun token and legal designation in the source survives unchanged;
// HTML tags, hrefs and {placeholders} match; Arabic uses Western digits and wraps Latin runs in <bdi>;
// load-bearing glossary terms use the fixed rendering.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export function loadGlossary() {
  const ctx = { window: {}, document: { readyState: 'loading', addEventListener() {}, getElementById() { return null; }, querySelector() { return null; }, querySelectorAll() { return []; }, createElement() { return {}; }, head: { appendChild() {} }, body: {}, documentElement: { classList: { add() {}, remove() {} } } }, navigator: {}, location: { search: '', hash: '' }, localStorage: {}, history: {}, URL, URLSearchParams, Intl, Promise, console, setTimeout, MutationObserver: undefined, CustomEvent: function () {}, requestAnimationFrame() {}, NodeFilter: {} };
  ctx.window = ctx; ctx.window.window = ctx;
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'dist', 'js', 'i18n.js'), 'utf8'), ctx);
  return ctx.MOSAIC_I18N || ctx.window.MOSAIC_I18N;
}
let _I18N;
export const I18N = () => (_I18N ||= loadGlossary());

const URL_RE = /https?:\/\/[^\s"'<>)\]]+/g;
const NUM_RE = /\d[\d,.]*\d|\d/g;
const DESIG_RE = /501\(c\)\(\d+\)|\b(?:PACs?|EIN|IRS|FEC|NAACP|ACLU|AFL-CIO|SEIU|NDTC|ICMA|AP|DOJ|FBI|LGBTQ\+?|AAPI|AAPIs)\b/g;
const SENTENCE_START = /(^|[.!?:;—–·▶✓⧉↓↗]\s*|[“"(]\s*)$/u;
const COMMON_CAPS = new Set(['City', 'Halls', 'Hispanic', 'Democrat', 'Build', 'Power', 'Pacific', 'Islander', 'Commissioner', 'Political', 'Practices', 'ZIP', 'MW', 'Sept', 'Nov', 'Dec', 'Jan', 'Feb', 'Aug', 'Oct', 'Apr', 'Mar', 'Rep', 'Sen', 'US', 'FAQ', 'FAQs', 'CEO', 'RSVP', 'RSVPs', 'PACs', 'South', 'North', 'Global', 'White', 'Party', 'Palestine', 'Solutions', 'Stories', 'Principles', 'Questions', 'Union', 'States', 'United', 'ET', 'DC', 'I', 'A', 'An', 'The', 'This', 'That', 'These', 'Those', 'Each', 'Every', 'Some', 'Most', 'Many', 'More', 'Only', 'Not', 'No', 'Yes', 'It', 'Its', 'In', 'On', 'At', 'For', 'From', 'To', 'Of', 'And', 'Or', 'But', 'If', 'When', 'While', 'Where', 'Why', 'How', 'What', 'Who', 'Which', 'Both', 'All', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Check', 'Read', 'Find', 'Start', 'Use', 'See', 'Ask', 'Look', 'Compare', 'Download', 'Search', 'Show', 'Free', 'Local', 'National', 'State', 'Active', 'Confirmed', 'Unconfirmed', 'Yes', 'Nonpartisan', 'Partisan', 'Democratic', 'Republican', 'Black', 'Latino', 'Latina', 'Latinx', 'American', 'Americans', 'Asian', 'Native', 'Indigenous', 'Muslim', 'Jewish', 'Christian', 'Democrats', 'Republicans', 'Congress', 'Senate', 'House', 'Big', 'Tech', 'Election', 'Day', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Step', 'Round', 'Kind', 'Failure', 'Section', 'Yes', 'No']);

const uniq = (a) => [...new Set(a)];
function plain(html) { return html.replace(/<[^>]+>/g, ' '); }
function tagSig(html) {
  return (html.match(/<[a-zA-Z][^>]*>/g) || []).map((t) => {
    const name = /^<\/?([a-zA-Z0-9]+)/.exec(t)[1].toLowerCase();
    const attrs = ['href', 'data-fill', 'id'].map((a) => { const m = new RegExp('\\s' + a + '="([^"]*)"').exec(t); return m ? a + '=' + m[1] : ''; }).filter(Boolean).join(' ');
    return name + (attrs ? ' ' + attrs : '');
  }).filter((x) => x !== 'bdi' && !x.startsWith('bdi '));
}
function properNouns(text) {
  const out = new Set();
  text = text.replace(/[’']s\b/g, ''); // possessives: "Guthrie's" -> "Guthrie"
  const re = /\b([A-Z][A-Za-z’']*[A-Za-z])\b/g;
  let m;
  while ((m = re.exec(text))) {
    const w = m[1];
    if (COMMON_CAPS.has(w)) continue;
    const before = text.slice(0, m.index);
    const atStart = SENTENCE_START.test(before) || before.trim() === '';
    // A sentence-initial word is capitalised by grammar, not because it is a name, so it is skipped;
    // the words that follow it in a capitalised run ("Instrument Serif") are still checked.
    if (atStart) continue;
    out.add(w);
  }
  return [...out];
}

/** @returns {string[]} list of problems, empty when the translation passes */
export function validate(src, tr, lang, opts = {}) {
  const errs = [];
  const isHtml = !!opts.html;
  if (typeof tr === 'object' && tr) { // plural object: validate each form against the source
    for (const [cat, v] of Object.entries(tr)) errs.push(...validate(src, v, lang, { ...opts, plural: true }).map((e) => `[${cat}] ${e}`));
    return errs;
  }
  if (typeof tr !== 'string' || !tr.trim()) return ['empty translation'];
  const srcText = isHtml ? plain(src) : src;
  const trText = isHtml ? plain(tr) : tr;

  for (const u of uniq(src.match(URL_RE) || [])) if (!tr.includes(u)) errs.push('URL changed or missing: ' + u);
  for (const n of uniq((srcText.replace(URL_RE, ' ').match(NUM_RE) || []))) if (!trText.replace(URL_RE, ' ').includes(n)) errs.push('number changed or missing: ' + n);
  for (const d of uniq((srcText.match(DESIG_RE) || []).map((x) => x.replace(/^(PAC|AAPI)s$/, '$1')))) if (!trText.includes(d)) errs.push('designation changed or missing: ' + d);
  // Glossary phrases ("Build power") are translated by rule, so their capitals are not proper nouns.
  let forNouns = srcText.replace(URL_RE, ' ');
  for (const g of I18N().glossary) forNouns = forNouns.split(g.en).join(' ');
  for (const p of properNouns(forNouns)) if (!trText.includes(p)) errs.push('proper noun changed or missing: ' + p);

  const ph = (s) => uniq(s.match(/\{\w+\}/g) || []).sort().join(',');
  const subset = ph(tr).split(",").filter(Boolean).every((p) => ph(src).split(",").includes(p));
  if (opts.plural ? !subset : ph(src) !== ph(tr)) errs.push(`placeholders differ: ${ph(src)} vs ${ph(tr)}`);

  if (isHtml) {
    const a = tagSig(src).join('|'), b = tagSig(tr).join('|');
    if (a !== b) errs.push('HTML tags or attributes differ');
  }
  if (lang === 'ar') {
    if (/[٠-٩۰-۹]/.test(tr)) errs.push('Arabic text must use Western digits (0-9)');
    if (isHtml) {
      const stripped = tr.replace(/<bdi>[\s\S]*?<\/bdi>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ');
      const latin = (stripped.match(/[A-Za-z][A-Za-z0-9.'’&\-/:()%,+#@_]*/g) || []).filter((w) => !/^(https?|www)$/i.test(w));
      if (latin.length) errs.push('Latin text in Arabic must be wrapped in <bdi>: ' + latin.slice(0, 4).join(' '));
    }
  }
  if (lang === 'es' || lang === 'ar') {
    if (tr.trim() === src.trim() && (srcText.match(/(^|\s)\p{Ll}\p{L}{2,}/gu) || []).length >= 3) errs.push('translation identical to the English');
  }
  const gloss = I18N().glossary;
  // Product names that contain a glossary word are not common nouns.
  const glossSrc = srcText.split('Nonprofit Explorer').join(' ');
  for (const g of gloss) {
    if (!g.strict || srcText.trim().split(/\s+/).length > 6) continue;
    const re = new RegExp('(^|[^\\p{L}])' + g.en.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') + '(?=$|[^\\p{L}])', 'iu');
    if (re.test(glossSrc) && !trText.toLowerCase().includes(String(g[lang]).toLowerCase())) errs.push(`glossary: "${g.en}" must be rendered as "${g[lang]}"`);
  }
  return errs;
}
