// Tags translatable static strings in dist/index.html with data-i18n ids and writes the English
// source table to i18n/static.en.json. Safe to re-run: elements that already carry an id are kept
// (their English text is refreshed in the table), new ones get a new id.
//
//   node scripts/i18n-annotate.mjs          # annotate + write table
//   node scripts/i18n-annotate.mjs --check  # fail if any translatable element has no id
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'dist', 'index.html');
const tablePath = path.join(root, 'i18n', 'static.en.json');
const check = process.argv.includes('--check');

const INLINE = new Set(['a', 'strong', 'em', 'b', 'i', 'span', 'br', 'code', 'abbr', 'bdi', 'small', 'sup', 'sub']);
const SKIP = new Set(['script', 'style', 'title', 'head', 'svg', 'textarea', 'option', 'select', 'canvas', 'blockquote', 'noscript']);
const ATTRS = ['aria-label', 'placeholder', 'alt'];
const NS_BY_PANEL = { suggest: 'suggest', wave: 'wave', mosaic: 'officials', crosscurrents: 'officials', insights: 'ledger', speeches: 'ledger', local: 'ledger', districts: 'ledger', money: 'ledger', justice: 'ledger', rcv: 'ledger', method: 'method', build: 'buildpower' };

let src = fs.readFileSync(htmlPath, 'utf8');
const doc = parse(src, { sourceCodeLocationInfo: true });
const attr = (n, name) => (n.attrs || []).find((a) => a.name === name)?.value;
const isEl = (n) => n.tagName !== undefined;
const textOf = (n) => (n.nodeName === '#text' ? n.value : (n.childNodes || []).map(textOf).join(''));
const hasWords = (s) => /\p{L}{2,}/u.test(s);
const onlyInline = (n) => (n.childNodes || []).every((c) => !isEl(c) || (INLINE.has(c.tagName) && onlyInline(c)));
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const isQuoteText = (s) => /^\s*[“"]/.test(s);

const existing = fs.existsSync(tablePath) ? JSON.parse(fs.readFileSync(tablePath, 'utf8')) : {};
const used = new Set(Object.keys(existing));
const table = {};
const edits = []; // {offset, text}
let missing = 0;

function slugFor(ns, text) {
  let s = text.toLowerCase().replace(/&[a-z]+;/g, ' ').replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim().split(' ').slice(0, 5).join('-').slice(0, 36).replace(/-$/, '');
  if (!s) s = 'n';
  let id = ns + '.' + s, k = 2;
  while (used.has(id)) id = ns + '.' + s + '-' + k++;
  used.add(id);
  return id;
}

function walk(n, ns) {
  if (!isEl(n)) { (n.childNodes || []).forEach((c) => walk(c, ns)); return; }
  if (SKIP.has(n.tagName)) return;
  if (n.tagName === 'section' && attr(n, 'data-panel')) ns = NS_BY_PANEL[attr(n, 'data-panel')] || 'shell';
  const loc = n.sourceCodeLocation;
  const have = attr(n, 'data-i18n');
  const direct = (n.childNodes || []).filter((c) => c.nodeName === '#text').map((c) => c.value).join(' ');
  const candidate = hasWords(direct) && onlyInline(n) && !isQuoteText(direct) && !attr(n, 'lang') && n.tagName !== 'html' && n.tagName !== 'body';
  const attrIds = [];
  for (const a of ATTRS) {
    const v = attr(n, a);
    if (v && hasWords(v) && !attr(n, 'data-i18n-skip')) attrIds.push([a, v]);
  }
  if (candidate && loc?.startTag && loc?.endTag) {
    const inner = norm(src.slice(loc.startTag.endOffset, loc.endTag.startOffset));
    let id = have;
    if (!id) { id = slugFor(ns, inner); missing++; edits.push({ at: loc.startTag.startOffset + 1 + n.tagName.length, text: ` data-i18n="${id}"` }); }
    table[id] = { ns: id.split('.')[0], html: inner };
  }
  if (attrIds.length && loc?.startTag) {
    const existingMap = attr(n, 'data-i18n-attr');
    const parts = [];
    for (const [a, v] of attrIds) {
      const prior = existingMap && existingMap.split(';').map((p) => p.split(':')).find((p) => p[0] === a);
      let id = prior ? prior[1] : null;
      if (!id) { id = slugFor(ns, v) + '.' + a; missing++; }
      table[id] = { ns: id.split('.')[0], attr: a, text: v };
      parts.push(a + ':' + id);
    }
    if (!existingMap) edits.push({ at: loc.startTag.startOffset + 1 + n.tagName.length, text: ` data-i18n-attr="${parts.join(';')}"` });
  }
  if (candidate) return; // children are carried inside this element's html
  (n.childNodes || []).forEach((c) => walk(c, ns));
}

walk(doc, 'shell');

if (check) {
  if (missing) { console.error(`i18n-annotate --check: ${missing} translatable element(s) have no data-i18n id. Run node scripts/i18n-annotate.mjs`); process.exit(1); }
  console.log('i18n-annotate --check: every translatable element is tagged (' + Object.keys(table).length + ' ids).');
  process.exit(0);
}

edits.sort((a, b) => b.at - a.at).forEach((e) => { src = src.slice(0, e.at) + e.text + src.slice(e.at); });
fs.writeFileSync(htmlPath, src);
fs.mkdirSync(path.dirname(tablePath), { recursive: true });
fs.writeFileSync(tablePath, JSON.stringify(table, null, 1) + '\n');
const byNs = {};
Object.values(table).forEach((v) => { byNs[v.ns] = (byNs[v.ns] || 0) + 1; });
console.log('tagged ' + edits.length + ' new insertions; table has ' + Object.keys(table).length + ' ids', byNs);
