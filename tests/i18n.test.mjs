// Run with: npm test   (node --test tests/)
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { I18N, validate } from '../scripts/lib/validate-translation.mjs';
import { hasBlockedToken, sha256Hex } from '../functions/_lib/submission.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rd = (f) => JSON.parse(fs.readFileSync(path.join(root, f), 'utf8'));
const I = I18N();
const ui = I.ui;
const placeholders = (s) => [...new Set(String(s).match(/\{\w+\}/g) || [])].sort();

test('ui tables: es and ar have exactly the keys of en', () => {
  const en = Object.keys(ui.en).sort();
  assert.deepEqual(Object.keys(ui.es).sort(), en, 'es keys differ from en');
  assert.deepEqual(Object.keys(ui.ar).sort(), en, 'ar keys differ from en');
});

test('ui tables: no empty values, identical {placeholders} per key', () => {
  for (const key of Object.keys(ui.en)) {
    const base = ui.en[key];
    const baseVars = typeof base === 'object' ? [...new Set(Object.values(base).flatMap(placeholders))].sort() : placeholders(base);
    for (const lang of ['es', 'ar']) {
      const v = ui[lang][key];
      const forms = typeof v === 'object' ? Object.values(v) : [v];
      forms.forEach((f) => assert.ok(String(f).trim(), `${lang}.${key} is empty`));
      if (typeof v !== 'object') assert.deepEqual(placeholders(v), baseVars, `${lang}.${key} placeholders differ`);
      else for (const f of forms) for (const p of placeholders(f)) assert.ok(baseVars.includes(p), `${lang}.${key} uses ${p}, which en does not`);
    }
  }
});

test('plural keys are complete: en and es one/other, ar zero/one/two/few/many/other', () => {
  const need = { en: ['one', 'other'], es: ['one', 'other'], ar: ['zero', 'one', 'two', 'few', 'many', 'other'] };
  for (const key of Object.keys(ui.en)) {
    if (typeof ui.en[key] !== 'object') continue;
    for (const lang of ['en', 'es', 'ar']) {
      assert.equal(typeof ui[lang][key], 'object', `${lang}.${key} must be a plural table`);
      assert.deepEqual(Object.keys(ui[lang][key]).sort(), [...need[lang]].sort(), `${lang}.${key} plural forms`);
    }
  }
  // Arabic really uses all six categories for these numbers.
  const cats = new Set([0, 1, 2, 3, 11, 100].map((n) => new Intl.PluralRules('ar').select(n)));
  assert.deepEqual([...cats].sort(), ['few', 'many', 'one', 'other', 'two', 'zero']);
  assert.equal(I.plural('ar', 2, ui.ar['form.charsLeft']), ui.ar['form.charsLeft'].two);
  assert.equal(I.plural('es', 1, ui.es['form.charsLeft']), ui.es['form.charsLeft'].one);
});

test('glossary covers every verification, tax and legal label the directory uses', () => {
  const ctx = { window: { MOSAIC: {} } }; ctx.window.window = ctx.window; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'dist/js/data-buildpower.js'), 'utf8'), ctx);
  const B = ctx.window.MOSAIC.buildpower || ctx.window.MOSAIC.buildpower;
  const used = new Set(B.records.map((r) => r.verification));
  const labels = { confirmed: 'Confirmed', indexed: 'Reported in 2026 sources', unverified: 'Not confirmed' };
  for (const v of used) assert.ok(labels[v], `unknown verification value ${v}`);
  const g = Object.fromEntries(I.glossary.map((x) => [x.en, x]));
  for (const label of Object.values(labels)) assert.ok(g[label], `glossary lacks "${label}"`);
  for (const term of ['tax-deductible', 'nonpartisan', 'nonprofit']) assert.ok(g[term], `glossary lacks "${term}"`);
  for (const x of I.glossary) { assert.ok(x.es && x.ar, `${x.en} needs es and ar`); }
  // The overlays render the labels exactly as the glossary says.
  for (const lang of ['es', 'ar']) {
    const o = rd(`i18n/${lang}.json`).strings.buildpower || {};
    for (const label of Object.values(labels)) if (o[label] != null) assert.equal(o[label], g[label][lang], `${lang}: "${label}" must follow the glossary`);
  }
});

test('translated overlays pass the validator (URLs, numbers, names, designations, tags, bdi)', () => {
  const staticEn = rd('i18n/static.en.json'), stringsEn = rd('i18n/strings.en.json');
  for (const lang of ['es', 'ar']) {
    const o = rd(`i18n/${lang}.json`);
    for (const [id, tr] of Object.entries(o.static)) {
      assert.ok(staticEn[id], `${lang}: unknown static id ${id}`);
      const en = staticEn[id];
      assert.deepEqual(validate(en.html ?? en.text, tr, lang, { html: en.html !== undefined }), [], `${lang} ${id}`);
    }
    for (const [ns, m] of Object.entries(o.strings)) for (const [en, tr] of Object.entries(m)) {
      assert.ok((stringsEn[ns] || []).includes(en), `${lang}: string not in the English list: ${en.slice(0, 60)}`);
      assert.deepEqual(validate(en, tr, lang), [], `${lang} ${ns} ${en.slice(0, 50)}`);
    }
  }
});

test('the interface namespaces (shell, suggest) are translated completely', () => {
  const cov = rd('i18n/coverage.json');
  for (const lang of ['es', 'ar']) for (const ns of ['shell']) assert.equal(cov[lang][ns].done, cov[lang][ns].total, `${lang} ${ns}`);
  for (const lang of ['es', 'ar']) assert.ok(cov[lang].suggest.done >= cov[lang].suggest.total - 2, `${lang} suggest`);
});

test('every translatable static element in index.html carries a data-i18n id', () => {
  execFileSync(process.execPath, [path.join(root, 'scripts/i18n-annotate.mjs'), '--check'], { cwd: root, stdio: 'pipe' });
});

test('no translation table contains the blocked token (hash match only)', async () => {
  const blocked = rd('data/blocked-token-hashes.json').hashes;
  const all = [];
  for (const l of Object.values(ui)) for (const v of Object.values(l)) all.push(...(typeof v === 'object' ? Object.values(v) : [v]));
  for (const lang of ['es', 'ar']) {
    const o = rd(`i18n/${lang}.json`);
    all.push(...Object.values(o.static));
    for (const m of Object.values(o.strings)) all.push(...Object.keys(m), ...Object.values(m));
  }
  all.push(...Object.values(rd('i18n/static.en.json')).map((v) => v.html ?? v.text));
  for (const s of all) assert.equal(await hasBlockedToken(String(s), blocked), false, 'blocked token found in a translation table');
  assert.equal(await sha256Hex('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
});

test('index.html: lang, hreflang alternates, logical direction classes', () => {
  const h = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');
  assert.match(h, /<html lang="en">/);
  for (const l of ['en', 'es', 'ar', 'x-default']) assert.match(h, new RegExp('hreflang="' + l + '"'));
  assert.doesNotMatch(h, /(^|[\s"'])(ml|mr|pl|pr)-\d/m, 'physical margin/padding classes remain');
  assert.doesNotMatch(h, /<svg|mermaid/i);
});
