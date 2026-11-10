import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { JSDOM } from 'jsdom';

const require = createRequire(import.meta.url);
const init = require('../dist/js/translate.js');

const PAGE = `<!doctype html><html lang="en"><head><title>t</title></head><body>
<header class="appbar"><span translate="no" id="site">The Representation Mosaic</span><span id="eyebrow">Top vs. bottom</span>
  <button type="button" data-lang="en" aria-pressed="true"><span translate="no">English</span></button>
  <button type="button" data-lang="es" aria-pressed="false" id="es-btn"><span translate="no">Español</span></button>
  <button type="button" data-lang="ar" aria-pressed="false"><span translate="no">العربية</span></button>
  <button type="button" id="lang-menu">Language</button></header>
<main id="main">
  <section data-panel="wave"><h1 id="h1">A new architecture</h1>
    <p id="p1" title="Hover text">Hello world</p><p id="p2">Hello world</p><p id="nums">2026 · 12%</p>
    <div translate="no"><p id="no1">Keep this exactly</p><p translate="yes" id="yes1">Translate me anyway</p></div>
    <p translate="bogus" id="bogus">Inherits from its parent</p>
    <input id="q" placeholder="Search names" aria-label="Search the list"><input id="btn" type="button" value="Reset filters"><input id="txt" type="text" value="user typed">
    <img id="img" alt="A small chart picture" src="x.png">
    <code id="code">const x = 1</code><pre id="pre">keep the pre text</pre><kbd>Ctrl</kbd><samp>sample output</samp>
    <canvas id="cv" aria-label="Bar chart of shares"></canvas><svg id="svg"><title>Vector title</title></svg>
    <script>var a = 'script text';</script><style>.x { content: 'style text'; }</style>
    <p id="ein">Re Power Fund (501(c)(3), EIN 35-2191193) and Issue One Action, a 527 group</p>
    <p id="person">Talk to Deb Haaland about it</p><a id="url" href="https://example.org/a">https://example.org/a</a>
    <p id="quote" translate="no">“We will not be conquered.”</p>
  </section>
  <section data-panel="build" hidden><p id="hidden1">Hidden panel text</p></section>
</main></body></html>`;

function mockTranslator({ availability = 'available', gate = null } = {}) {
  const calls = [], log = [];
  class T {
    static async availability(o) { log.push(['availability', o]); return typeof availability === 'function' ? availability(o) : availability; }
    static async create(o) {
      log.push(['create', o]);
      if (o.monitor) o.monitor({ addEventListener: (type, fn) => { if (type === 'downloadprogress') fn({ loaded: 0.5 }); } });
      return { translate: async (s) => { calls.push(s); if (gate) await gate; return '«' + s + '»'; } };
    }
  }
  return { T, calls, log };
}
async function env({ translator, saved, html = PAGE, names = [] } = {}) {
  const dom = new JSDOM(html, { url: 'http://localhost/', pretendToBeVisual: true });
  const win = dom.window;
  await new Promise((r) => (win.document.readyState === 'complete' ? r() : win.addEventListener('load', r)));
  if (translator) win.Translator = translator.T;
  if (saved) win.localStorage.setItem('mosaic:lang', saved);
  if (names.length) win.MOSAIC = { officials: names.map((n) => ({ name: n })) };
  init(win);
  const api = win.MosaicTranslate;
  const $ = (s) => win.document.querySelector(s);
  return { win, doc: win.document, api, $, close: () => dom.window.close() };
}
const text = (e, s) => e.$(s).textContent;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

test('translate="no": inherited, overridden by yes, invalid values ignored', async () => {
  const e = await env();
  assert.equal(e.api.translatable(e.$('#no1')), false);
  assert.equal(e.api.translatable(e.$('#yes1')), true);
  assert.equal(e.api.translatable(e.$('#bogus')), true);
  assert.equal(e.api.translatable(e.$('#site')), false);
  assert.equal(e.api.translatable(e.$('#p1')), true);
  e.close();
});

test('translates text and attributes, skips the elements and strings it must', async () => {
  const m = mockTranslator();
  const e = await env({ translator: m });
  assert.equal(await e.api.choose('es'), 'translated');
  const ok = (s) => assert.ok(text(e, s).startsWith('«'), s + ' should be translated: ' + text(e, s));
  const same = (s, v) => assert.equal(text(e, s), v, s + ' must be unchanged');
  ok('#h1'); ok('#p1'); ok('#yes1'); ok('#bogus'); ok('#hidden1'); ok('#eyebrow');
  same('#no1', 'Keep this exactly'); same('#site', 'The Representation Mosaic'); same('#quote', '“We will not be conquered.”');
  same('#code', 'const x = 1'); same('#pre', 'keep the pre text'); same('#nums', '2026 · 12%'); same('#url', 'https://example.org/a');
  assert.equal(e.$('#p1').getAttribute('title'), '«Hover text»');
  assert.equal(e.$('#q').getAttribute('placeholder'), '«Search names»');
  assert.equal(e.$('#q').getAttribute('aria-label'), '«Search the list»');
  assert.equal(e.$('#img').getAttribute('alt'), '«A small chart picture»');
  assert.equal(e.$('#btn').getAttribute('value'), '«Reset filters»');
  assert.equal(e.$('#txt').getAttribute('value'), 'user typed', 'text inputs keep what the user typed');
  assert.equal(e.$('#cv').getAttribute('aria-label'), 'Bar chart of shares', 'canvas is skipped');
  assert.ok(!m.calls.some((c) => /script text|style text|Vector title|Ctrl|sample output/.test(c)));
  assert.equal(text(e, '#es-btn span'), 'Español');
  e.close();
});

test('identical strings are sent once and cached; a second run uses the cache', async () => {
  const m = mockTranslator();
  const e = await env({ translator: m });
  await e.api.choose('es');
  assert.equal(m.calls.filter((c) => c === 'Hello world').length, 1);
  assert.equal(text(e, '#p1'), text(e, '#p2'));
  const first = m.calls.length;
  e.api.restore();
  await e.api.choose('es');
  assert.equal(m.calls.length, first, 'no new translate() calls after restore and re-translate');
  assert.ok(e.win.sessionStorage.getItem('mosaic:tr:es').length < 2 * 1024 * 1024);
  e.close();
});

test('protected tokens (EIN, 501(c)(3), 527, PAC, names, URLs) are never sent to the translator', async () => {
  const m = mockTranslator();
  const e = await env({ translator: m, names: ['Deb Haaland'] });
  await e.api.choose('es');
  const ein = text(e, '#ein');
  assert.ok(ein.includes('501(c)(3), EIN 35-2191193'), 'designation and EIN survive exactly: ' + ein);
  assert.ok(ein.includes(' 527 '), '527 survives');
  assert.ok(text(e, '#person').includes('Deb Haaland'));
  assert.ok(!m.calls.some((c) => /501\(c\)|35-2191193|Haaland|\b527\b/.test(c)), 'protected text never reaches translate()');
  e.close();
});

test('restoring English gives back the exact DOM', async () => {
  const m = mockTranslator();
  const e = await env({ translator: m });
  const snap = () => e.doc.documentElement.outerHTML;
  const before = snap();
  await e.api.choose('ar');
  assert.notEqual(snap(), before);
  assert.equal(e.doc.documentElement.dir, 'rtl');
  e.api.restore();
  assert.equal(snap(), before, 'DOM differs after restore');
  assert.equal(e.doc.documentElement.lang, 'en');
  assert.equal(e.doc.documentElement.hasAttribute('dir'), false);
  assert.equal(e.$('#tr-banner'), null);
  e.close();
});

test('a panel rendered later is picked up by the observer (debounced), and stops after English', async () => {
  const m = mockTranslator();
  const e = await env({ translator: m });
  await e.api.choose('es');
  const p = e.doc.createElement('p'); p.id = 'late'; p.textContent = 'Rendered after translation';
  e.$('main').appendChild(p);
  assert.equal(p.textContent, 'Rendered after translation', 'not before the debounce');
  await sleep(450);
  assert.equal(p.textContent, '«Rendered after translation»');
  e.api.restore();
  assert.equal(p.textContent, 'Rendered after translation');
  const p2 = e.doc.createElement('p'); p2.textContent = 'After English'; e.$('main').appendChild(p2);
  await sleep(300);
  assert.equal(p2.textContent, 'After English', 'observer is disconnected in English');
  e.close();
});

test('<html lang> and dir change only once translation has started', async () => {
  let release; const gate = new Promise((r) => { release = r; });
  const m = mockTranslator({ gate });
  const e = await env({ translator: m });
  const run = e.api.choose('ar');
  await sleep(50);
  assert.equal(e.doc.documentElement.lang, 'en', 'still English while nothing is translated');
  assert.equal(e.doc.documentElement.hasAttribute('dir'), false);
  release();
  await run;
  assert.equal(e.doc.documentElement.lang, 'ar');
  assert.equal(e.doc.documentElement.dir, 'rtl');
  e.api.restore();
  const run2 = e.api.choose('es'); await run2;
  assert.equal(e.doc.documentElement.lang, 'es');
  assert.equal(e.doc.documentElement.hasAttribute('dir'), false, 'Spanish is left-to-right');
  e.close();
});

test('banner is shown, is itself translated, and Show original restores', async () => {
  const m = mockTranslator();
  const e = await env({ translator: m });
  await e.api.choose('es');
  const banner = e.$('#tr-banner');
  assert.ok(banner);
  assert.ok(banner.textContent.includes('«Translated by your browser on this device. Translations can contain errors. The English original is the authoritative version.»'));
  assert.equal(e.$('#tr-status').getAttribute('role'), 'status');
  e.$('#tr-banner [data-lang="en"]').click();
  assert.equal(e.$('#tr-banner'), null);
  assert.equal(text(e, '#p1'), 'Hello world');
  e.close();
});

test('model download: Translator.create runs on the click, progress is announced', async () => {
  const m = mockTranslator({ availability: 'downloadable' });
  const e = await env({ translator: m });
  e.$('#es-btn').click();
  await sleep(100);
  assert.ok(m.log.some((l) => l[0] === 'create' && l[1].targetLanguage === 'es' && l[1].sourceLanguage === 'en' && typeof l[1].monitor === 'function'));
  assert.equal(e.doc.documentElement.lang, 'es');
  e.close();
  const m2 = mockTranslator({ availability: 'unavailable' });
  const e2 = await env({ translator: m2 });
  assert.equal(await e2.api.choose('ar'), 'help');
  assert.ok(e2.$('#tr-help'));
  assert.equal(e2.doc.documentElement.lang, 'en');
  e2.close();
});

test('download failure falls back to the help panel and leaves the page English', async () => {
  const m = mockTranslator();
  m.T.create = async () => { throw new Error('refused'); };
  const e = await env({ translator: m });
  const before = e.doc.body.innerHTML;
  assert.equal(await e.api.choose('es'), 'help');
  assert.ok(e.$('#tr-help'));
  e.api.closeHelp();
  assert.equal(e.doc.body.innerHTML, before);
  e.close();
});

test('no Translator API: help panel opens, traps focus, closes on Escape, page text unchanged', async () => {
  const e = await env();
  const before = e.doc.body.innerHTML;
  const opener = e.$('#es-btn'); opener.focus();
  assert.equal(await e.api.choose('es', { from: opener }), 'help');
  const panel = e.$('#tr-help');
  assert.ok(panel);
  assert.equal(panel.getAttribute('role'), 'dialog'); assert.equal(panel.getAttribute('aria-modal'), 'true');
  assert.equal(panel.getAttribute('lang'), 'es'); assert.equal(panel.getAttribute('translate'), 'no');
  const closeBtn = panel.querySelector('[data-tr-close]');
  assert.equal(e.doc.activeElement, closeBtn, 'focus moves into the panel');
  const key = (k, extra = {}) => closeBtn.dispatchEvent(new e.win.KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true, ...extra }));
  key('Tab'); assert.equal(e.doc.activeElement, closeBtn, 'Tab wraps (only one focusable element)');
  key('Tab', { shiftKey: true }); assert.equal(e.doc.activeElement, closeBtn, 'Shift+Tab wraps');
  e.doc.body.focus(); key('Tab'); assert.ok(panel.contains(e.doc.activeElement), 'focus outside the panel is pulled back in');
  key('Escape');
  assert.equal(e.$('#tr-help'), null);
  assert.equal(e.doc.activeElement, opener, 'focus returns to the opener');
  assert.equal(e.doc.body.innerHTML.replace(/<div id="tr-bar".*?<\/div>/s, ''), before.replace(/<div id="tr-bar".*?<\/div>/s, ''));
  assert.equal(e.doc.documentElement.lang, 'en');
  const a = e.doc.createElement('button');
  e.doc.body.appendChild(a);
  assert.equal(await e.api.choose('ar'), 'help');
  assert.equal(e.$('#tr-help').getAttribute('dir'), 'rtl');
  e.$('#tr-help [data-tr-close]').click();
  assert.equal(e.$('#tr-help'), null);
  e.close();
});

test('the hand-written help copy is short and covers every browser', async () => {
  const e = await env();
  for (const lang of ['es', 'ar']) {
    await e.api.choose(lang);
    const panel = e.$('#tr-help');
    const words = panel.textContent.trim().split(/\s+/).length;
    assert.ok(words < 120, lang + ' help panel has ' + words + ' words');
    for (const b of ['Firefox', 'Chrome', 'Safari', 'Edge']) assert.ok(panel.textContent.includes(b), lang + ' lacks ' + b);
    e.api.closeHelp();
  }
  e.close();
});

test('returning visitor: auto-translate only when availability is "available", otherwise a prompt', async () => {
  const m = mockTranslator({ availability: 'available' });
  const e = await env({ translator: m, saved: 'es' });
  await e.api.boot();
  assert.equal(e.doc.documentElement.lang, 'es');
  e.close();

  const m2 = mockTranslator({ availability: 'downloadable' });
  const e2 = await env({ translator: m2, saved: 'ar' });
  await e2.api.boot();
  assert.equal(e2.doc.documentElement.lang, 'en', 'nothing translated before a click');
  const prompt = e2.$('#tr-prompt');
  assert.ok(prompt); assert.equal(prompt.getAttribute('dir'), 'rtl');
  assert.equal(m2.log.filter((l) => l[0] === 'create').length, 0, 'no model download without a click');
  prompt.querySelector('button[data-lang="ar"]').click();
  await sleep(100);
  assert.equal(e2.doc.documentElement.lang, 'ar');
  e2.close();
});

test('the choice is remembered in localStorage', async () => {
  const m = mockTranslator();
  const e = await env({ translator: m });
  await e.api.choose('ar');
  assert.equal(e.win.localStorage.getItem('mosaic:lang'), 'ar');
  e.api.restore(); await e.api.choose('en');
  assert.equal(e.win.localStorage.getItem('mosaic:lang'), 'en');
  e.close();
});
