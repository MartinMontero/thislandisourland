/* Page translation by the visitor's own browser.
   English is the only source text. When a visitor picks Español or العربية:
   - Chrome and Edge on desktop expose the Translator API; the page is translated on the device, nothing is sent to this site.
   - Every other browser gets a short panel explaining its own Translate feature.
   No network request is made by this file. No dependencies. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory;
  else factory(root);
})(typeof self !== 'undefined' ? self : this, function init(win) {
  'use strict';
  var doc = win.document;
  if (!doc || win.MosaicTranslate) return;

  /* The only Spanish and Arabic written by hand: the help panel and the returning-visitor prompt.
     Everything else is translated by the browser. (Reviewed by a native reader: pending.) */
  var COPY = {
    es: {
      title: 'Traducir esta página',
      intro: 'Este navegador no permite que el sitio inicie la traducción. Use la función de traducción de su propio navegador. El inglés es el original.',
      items: [
        ['Firefox (computadora y Android)', 'Botón de traducción en la barra de herramientas o <bdi>“Translate page”</bdi> en el menú; <bdi>“Show original”</bdi> para volver.'],
        ['Chrome', 'En la computadora, <bdi>“Translate”</bdi> a la derecha de la barra de direcciones. En Android y iPhone: menú <bdi>“More”</bdi> y luego <bdi>“Translate”</bdi>.'],
        ['Safari', 'En iPhone: menú de la página y <bdi>“Translate to”</bdi>. En Mac: botón Traducir en el campo de búsqueda.'],
        ['Edge', 'Icono del traductor en la barra de direcciones, <bdi>“Translate to”</bdi> y <bdi>“Translate”</bdi>.']
      ],
      privacy: 'Firefox traduce en su dispositivo. Chrome en el móvil, Safari y Edge pueden usar el servicio en línea de su fabricante.',
      close: 'Cerrar',
      prompt: 'Su navegador puede traducir esta página al español en su dispositivo.',
      promptBtn: 'Traducir',
      promptClose: 'Cerrar aviso'
    },
    ar: {
      title: 'ترجمة هذه الصفحة',
      intro: 'لا يتيح هذا المتصفح للموقع تشغيل الترجمة. استخدم ميزة الترجمة في متصفحك نفسه. الإنجليزية هي النسخة الأصلية.',
      items: [
        ['<bdi>Firefox</bdi> (الحاسوب وAndroid)', 'أيقونة الترجمة في شريط الأدوات أو <bdi>“Translate page”</bdi> من القائمة، ثم <bdi>“Show original”</bdi> للعودة.'],
        ['<bdi>Chrome</bdi>', 'على الحاسوب: <bdi>“Translate”</bdi> يمين شريط العنوان. وعلى Android وiPhone: القائمة <bdi>“More”</bdi> ثم <bdi>“Translate”</bdi>.'],
        ['<bdi>Safari</bdi>', 'على iPhone: قائمة الصفحة ثم <bdi>“Translate to”</bdi>. وعلى Mac: زر الترجمة في حقل البحث.'],
        ['<bdi>Edge</bdi>', 'أيقونة المترجم في شريط العنوان، ثم <bdi>“Translate to”</bdi> ثم <bdi>“Translate”</bdi>.']
      ],
      privacy: 'يترجم Firefox على جهازك. أما Chrome على الهاتف وSafari وEdge فقد تستخدم خدمة الشركة عبر الإنترنت.',
      close: 'إغلاق',
      prompt: 'يمكن لمتصفحك ترجمة هذه الصفحة إلى العربية على جهازك.',
      promptBtn: 'ترجمة',
      promptClose: 'إغلاق التنبيه'
    }
  };
  var LANGS = { es: { dir: 'ltr' }, ar: { dir: 'rtl' } };
  var BANNER = 'Translated by your browser on this device. Translations can contain errors. The English original is the authoritative version.';
  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, CODE: 1, PRE: 1, KBD: 1, SAMP: 1, SVG: 1, CANVAS: 1, TEXTAREA: 1, HEAD: 1 };
  var ATTRS = ['aria-label', 'title', 'placeholder', 'alt'];
  var BATCH = 20, CACHE_CAP = 2 * 1024 * 1024, DEBOUNCE = 150;

  var current = 'en';          // the language actually on the page
  var runId = 0;               // bumps to cancel an in-flight run
  var translator = null, translatorLang = null;
  var origText = new WeakMap(), origAttr = new WeakMap();
  var touchedText = [], touchedEls = [];
  var caches = {};             // lang -> Map(english -> translated)
  var observer = null, pending = [], timer = null;
  var opener = null;
  var fontLinks = [];          // preload links we added for Arabic; removed when English returns

  /* ---------------- small helpers ---------------- */
  function $(s, r) { return (r || doc).querySelector(s); }
  function hasLetters(s) { return /\p{L}/u.test(s); }
  function idle() {
    return new Promise(function (res) {
      if (win.requestIdleCallback) win.requestIdleCallback(function () { res(); }, { timeout: 200 });
      else win.setTimeout(res, 0);
    });
  }
  function store(kind) { try { return win[kind]; } catch (e) { return null; } }
  function readLang() {
    try {
      var v = store('localStorage').getItem('mosaic:lang');
      if (v == null) return null;
      try { v = JSON.parse(v); } catch (e) { /* plain string */ }
      return v === 'es' || v === 'ar' ? v : null;
    } catch (e) { return null; }
  }
  function saveLang(l) { try { store('localStorage').setItem('mosaic:lang', l); } catch (e) { /* private mode */ } }

  /* ---------------- translate="no" exactly as the HTML standard defines it ---------------- */
  function translateState(el) {
    for (var e = el; e && e.nodeType === 1; e = e.parentElement) {
      var v = e.getAttribute('translate');
      if (v === null) continue;
      v = v.trim().toLowerCase();
      if (v === 'no') return false;
      if (v === 'yes' || v === '') return true;
      // an invalid value is ignored and the element inherits
    }
    return true;
  }
  function inSkippedTag(el) {
    for (var e = el; e && e.nodeType === 1; e = e.parentElement) {
      if (SKIP_TAGS[e.tagName.toUpperCase()] || e.id === 'tr-help') return true;
    }
    return false;
  }
  function translatable(el) { return !!el && !inSkippedTag(el) && translateState(el); }

  /* ---------------- protected tokens (never sent to the translator) ---------------- */
  var NAMES = [];
  function collectNames() {
    var D = win.MOSAIC, set = {};
    if (D) {
      (D.officials || []).forEach(function (o) { if (o.name) set[o.name] = 1; });
      ((D.buildpower && D.buildpower.records) || []).forEach(function (r) { if (r.name) set[r.name] = 1; });
      ((D.captions && D.captions.extra) || []).forEach(function (x) { if (x.name) set[x.name] = 1; });
    }
    NAMES = Object.keys(set).filter(function (n) { return n.length >= 4; }).sort(function (a, b) { return b.length - a.length; });
  }
  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  var FIXED = '(?:https?:\\/\\/[^\\s)]+|[\\w.+-]+@[\\w-]+(?:\\.[\\w-]+)+|\\b\\d{2}-\\d{7}\\b|\\b\\d{3}-[A-Z]{3}-[A-Z]{4}\\b|\\(?\\b\\d{3}\\)?[-. ]\\d{3}[-. ]\\d{4}\\b|\\b501\\(c\\)\\(\\d+\\)|\\b527\\b|\\b(?:[Ss]uper )?PACs?\\b|\\bEIN\\b)';
  var protectRe = null;
  function protectPattern() {
    var src = FIXED + (NAMES.length ? '|(?<![\\p{L}\\p{N}])(?:' + NAMES.map(esc).join('|') + ')(?![\\p{L}\\p{N}])' : '');
    protectRe = new RegExp(src, 'gu');
    return protectRe;
  }
  /** Whole string is a URL, domain or e-mail: nothing to translate. */
  function isPlainRef(s) { return /^(?:https?:\/\/\S+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|(?:[\w-]+\.)+[a-z]{2,}(?:\/\S*)?)$/i.test(s.trim()); }
  function splitProtected(str) {
    var re = protectPattern(), out = [], last = 0, m;
    while ((m = re.exec(str))) {
      if (m.index > last) out.push({ t: str.slice(last, m.index), keep: false });
      out.push({ t: m[0], keep: true });
      last = m.index + m[0].length;
      if (m[0].length === 0) re.lastIndex++;
    }
    if (last < str.length) out.push({ t: str.slice(last), keep: false });
    return out;
  }

  /* ---------------- collecting what to translate ---------------- */
  function isButtonInput(el) { return el.tagName === 'INPUT' && /^(button|submit|reset)$/i.test(el.type || ''); }
  function collect(rootEl, jobs) {
    jobs = jobs || new Map();
    var add = function (s, item) { var a = jobs.get(s); if (!a) jobs.set(s, (a = [])); a.push(item); };
    if (!rootEl) return jobs;
    var walker = doc.createTreeWalker(rootEl, 1 | 4, null); // elements and text
    var n = rootEl;
    var visit = function (node) {
      if (node.nodeType === 3) {
        if (origText.has(node)) return;
        var raw = node.nodeValue;
        if (!hasLetters(raw) || !translatable(node.parentElement)) return;
        var core = raw.replace(/\s+/g, ' ').trim();
        if (!core || isPlainRef(core)) return;
        add(core, { node: node });
      } else if (node.nodeType === 1) {
        if (!translatable(node)) return;
        ATTRS.forEach(function (a) {
          var v = node.getAttribute(a);
          if (v && hasLetters(v) && !isPlainRef(v) && !(origAttr.get(node) || {}).hasOwnProperty(a)) add(v.trim(), { el: node, attr: a });
        });
        if (isButtonInput(node)) {
          var bv = node.getAttribute('value');
          if (bv && hasLetters(bv) && !(origAttr.get(node) || {}).hasOwnProperty('value')) add(bv.trim(), { el: node, attr: 'value' });
        }
      }
    };
    if (rootEl.nodeType === 1 || rootEl.nodeType === 3) visit(rootEl);
    while ((n = walker.nextNode())) visit(n);
    return jobs;
  }

  /* ---------------- translating strings ---------------- */
  function cacheFor(lang) {
    if (caches[lang]) return caches[lang];
    var m = new Map();
    try {
      var raw = store('sessionStorage').getItem('mosaic:tr:' + lang);
      if (raw) { var o = JSON.parse(raw); Object.keys(o).forEach(function (k) { m.set(k, o[k]); }); }
    } catch (e) { /* ignore */ }
    return (caches[lang] = m);
  }
  function persistCache(lang) {
    try {
      var out = {}, size = 2;
      cacheFor(lang).forEach(function (v, k) {
        var add = k.length + v.length + 8;
        if (size + add <= CACHE_CAP) { out[k] = v; size += add; }
      });
      store('sessionStorage').setItem('mosaic:tr:' + lang, JSON.stringify(out));
    } catch (e) { /* quota or private mode */ }
  }
  async function translateString(str, lang) {
    var cache = cacheFor(lang);
    if (cache.has(str)) return cache.get(str);
    var parts = splitProtected(str), out = '';
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (p.keep || !hasLetters(p.t)) { out += p.t; continue; }
      var lead = /^\s*/.exec(p.t)[0], tail = /\s*$/.exec(p.t)[0];
      var tr = await translator.translate(p.t.trim());
      out += lead + tr + tail;
    }
    cache.set(str, out);
    return out;
  }
  function applyItems(str, tr, items) {
    items.forEach(function (it) {
      if (it.node) {
        if (!it.node.isConnected || origText.has(it.node)) return;
        var raw = it.node.nodeValue;
        origText.set(it.node, raw);
        touchedText.push(it.node);
        it.node.nodeValue = /^\s*/.exec(raw)[0] + tr + /\s*$/.exec(raw)[0];
      } else if (it.el.isConnected) {
        var memo = origAttr.get(it.el) || {};
        if (memo.hasOwnProperty(it.attr)) return;
        memo[it.attr] = it.el.getAttribute(it.attr);
        origAttr.set(it.el, memo);
        if (touchedEls.indexOf(it.el) < 0) touchedEls.push(it.el);
        it.el.setAttribute(it.attr, tr);
      }
    });
  }
  function startedOnPage(lang) {
    if (doc.documentElement.lang === lang) return;
    doc.documentElement.lang = lang;
    doc.documentElement.dir = LANGS[lang].dir === 'rtl' ? 'rtl' : '';
    if (!doc.documentElement.dir) doc.documentElement.removeAttribute('dir');
  }
  async function runJobs(jobs, lang, id) {
    var keys = Array.from(jobs.keys());
    for (var i = 0; i < keys.length; i += BATCH) {
      if (id !== runId) return false;
      var batch = keys.slice(i, i + BATCH), results = [];
      for (var j = 0; j < batch.length; j++) {
        if (id !== runId) return false;
        results.push(await translateString(batch[j], lang));
      }
      if (id !== runId) return false;
      startedOnPage(lang);
      batch.forEach(function (s, k) { applyItems(s, results[k], jobs.get(s)); });
      persistCache(lang);
      await idle();
    }
    return true;
  }
  async function translateRoots(lang, id) {
    var visible = $('[data-panel]:not([hidden])');
    var first = [$('#tr-bar'), $('.appbar'), $('#primary-nav'), visible].filter(Boolean);
    var jobs = new Map();
    first.forEach(function (r) { collect(r, jobs); });
    if (!(await runJobs(jobs, lang, id))) return false;
    return runJobs(collect(doc.body), lang, id);
  }

  /* ---------------- bar, banner, status, prompt ---------------- */
  function bar() {
    var b = $('#tr-bar');
    if (b) return b;
    var main = $('main') || doc.body;
    b = doc.createElement('div');
    b.id = 'tr-bar';
    b.className = 'no-print';
    b.innerHTML = '<p id="tr-status" role="status" aria-live="polite" class="text-sm px-4 sm:px-6 lg:px-8"></p>';
    main.insertBefore(b, main.firstChild);
    return b;
  }
  function status(msg) { var s = $('#tr-status', bar()); if (s) s.textContent = msg || ''; }
  function clearPrompt() { var p = $('#tr-prompt'); if (p) p.remove(); }
  function showBanner() {
    if ($('#tr-banner')) return;
    var d = doc.createElement('div');
    d.id = 'tr-banner'; d.className = 'lang-banner'; d.setAttribute('role', 'note');
    d.innerHTML = '<div class="wrap py-2 text-sm flex flex-wrap items-center gap-x-4 gap-y-1"><p></p><button type="button" class="btn-ghost" data-lang="en">Show original</button></div>';
    d.querySelector('p').textContent = BANNER;
    var b = bar(); b.insertBefore(d, b.firstChild);
  }
  function showPrompt(lang) {
    clearPrompt();
    var c = COPY[lang]; if (!c) return;
    var d = doc.createElement('div');
    d.id = 'tr-prompt'; d.className = 'lang-banner'; d.setAttribute('translate', 'no');
    d.setAttribute('lang', lang); d.setAttribute('dir', LANGS[lang].dir);
    d.innerHTML = '<div class="wrap py-1 text-sm flex flex-wrap items-center gap-x-4 gap-y-1"><p></p><button type="button" class="btn-tonal" data-lang="' + lang + '"></button><button type="button" class="btn-ghost" data-tr-prompt-close></button></div>';
    d.querySelector('p').textContent = c.prompt;
    d.querySelector('[data-lang]').textContent = c.promptBtn;
    var x = d.querySelector('[data-tr-prompt-close]'); x.textContent = '✕'; x.setAttribute('aria-label', c.promptClose);
    var b = bar(); b.appendChild(d);
  }
  function setPressed() {
    Array.prototype.forEach.call(doc.querySelectorAll('[data-lang]'), function (b) {
      if (b.closest('#tr-banner') || b.closest('#tr-prompt')) return;
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === current));
    });
  }
  function announceChange() { doc.dispatchEvent(new win.CustomEvent('mosaic:langchange', { detail: { lang: current } })); }

  /* ---------------- help panel (no Translator API) ---------------- */
  function focusables(p) { return Array.prototype.filter.call(p.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])'), function (x) { return !x.disabled; }); }
  function closeHelp() {
    var p = $('#tr-help'); if (!p) return;
    p.remove();
    doc.body.style.overflow = '';
    if (opener && opener.focus && opener.isConnected) opener.focus();
    opener = null;
  }
  function showHelp(lang, from) {
    closeHelp();
    var c = COPY[lang]; if (!c) return;
    opener = from || doc.activeElement;
    var p = doc.createElement('div');
    p.id = 'tr-help';
    p.className = 'fixed inset-0 z-50 bg-scrim/60 flex items-center justify-center p-4';
    p.setAttribute('role', 'dialog'); p.setAttribute('aria-modal', 'true'); p.setAttribute('aria-labelledby', 'tr-help-title');
    p.setAttribute('lang', lang); p.setAttribute('dir', LANGS[lang].dir); p.setAttribute('translate', 'no');
    var items = c.items.map(function (it) { return '<li><strong>' + it[0] + '.</strong> ' + it[1] + '</li>'; }).join('');
    p.innerHTML = '<div class="bg-paper-50 w-full max-w-lg rounded-sm border border-paper-300 p-5 max-h-[90vh] overflow-y-auto">' +
      '<div class="flex items-start justify-between gap-3 mb-3"><h2 id="tr-help-title" class="font-serif text-2xl leading-tight"></h2><button type="button" class="btn-ghost" data-tr-close></button></div>' +
      '<p class="mb-3 text-sm"></p><ul class="space-y-2 text-sm mb-3">' + items + '</ul><p class="text-xs text-stone-700" data-tr-privacy></p></div>';
    p.querySelector('h2').textContent = c.title;
    p.querySelector('[data-tr-close]').textContent = c.close;
    p.querySelector('p.mb-3').textContent = c.intro;
    p.querySelector('[data-tr-privacy]').textContent = c.privacy;
    doc.body.appendChild(p);
    doc.body.style.overflow = 'hidden';
    p.querySelector('[data-tr-close]').focus();
  }
  doc.addEventListener('keydown', function (e) {
    var p = $('#tr-help'); if (!p) return;
    if (e.key === 'Escape') { e.preventDefault(); closeHelp(); return; }
    if (e.key === 'Tab') {
      var f = focusables(p); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (!p.contains(doc.activeElement)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------------- observer for panels rendered later ---------------- */
  function ignorable(n) { var el = n.nodeType === 1 ? n : n.parentElement; return !el || !!el.closest('#tr-bar, #tr-help'); }
  function startObserver() {
    var main = $('main'); if (!main || observer || !win.MutationObserver) return;
    observer = new win.MutationObserver(function (muts) {
      muts.forEach(function (m) {
        Array.prototype.forEach.call(m.addedNodes, function (n) { if (!ignorable(n)) pending.push(n); });
      });
      if (!pending.length) return;
      win.clearTimeout(timer);
      timer = win.setTimeout(flushPending, DEBOUNCE);
    });
    observer.observe(main, { childList: true, subtree: true });
  }
  function stopObserver() { if (observer) { observer.disconnect(); observer = null; } pending = []; win.clearTimeout(timer); }
  async function flushPending() {
    var list = pending; pending = [];
    if (current === 'en' || !translator) return;
    var id = runId, jobs = new Map();
    list.filter(function (n) { return n.isConnected && !list.some(function (o) { return o !== n && o.nodeType === 1 && o.contains(n); }); })
      .forEach(function (n) { collect(n, jobs); });
    if (jobs.size) await runJobs(jobs, current, id);
  }

  /* ---------------- choosing a language ---------------- */
  function restore() {
    runId++; stopObserver();
    touchedText.forEach(function (n) { if (origText.has(n)) { n.nodeValue = origText.get(n); origText.delete(n); } });
    touchedEls.forEach(function (el) {
      var memo = origAttr.get(el);
      if (memo) Object.keys(memo).forEach(function (a) { if (memo[a] === null) el.removeAttribute(a); else el.setAttribute(a, memo[a]); });
      origAttr.delete(el);
    });
    touchedText = []; touchedEls = [];
    var b = $('#tr-banner'); if (b) b.remove();
    clearPrompt(); status('');
    fontLinks.forEach(function (l) { l.remove(); }); fontLinks = [];
    doc.documentElement.lang = 'en';
    doc.documentElement.removeAttribute('dir');
    current = 'en';
    setPressed(); announceChange();
  }
  function preloadArabicFonts() {
    ['/fonts/ReadexPro-Arabic-700.woff2', '/fonts/NotoSansArabic-Arabic-var.woff2'].forEach(function (h) {
      if ($('link[href="' + h + '"]')) return;
      var l = doc.createElement('link'); l.rel = 'preload'; l.as = 'font'; l.type = 'font/woff2'; l.crossOrigin = ''; l.href = h; doc.head.appendChild(l); fontLinks.push(l);
    });
  }
  async function ensureTranslator(lang, canDownload) {
    if (translator && translatorLang === lang) return translator;
    var av = await win.Translator.availability({ sourceLanguage: 'en', targetLanguage: lang });
    if (av === 'unavailable') return null;
    if (av !== 'available' && !canDownload) return null;
    translator = await win.Translator.create({
      sourceLanguage: 'en', targetLanguage: lang,
      monitor: function (m) {
        m.addEventListener('downloadprogress', function (e) { status('Downloading the translation model: ' + Math.round((e.loaded || 0) * 100) + '%'); });
      }
    });
    translatorLang = lang;
    return translator;
  }
  async function choose(lang, opts) {
    opts = opts || {};
    if (lang === 'en') { saveLang('en'); if (current !== 'en') restore(); else { clearPrompt(); setPressed(); } return 'en'; }
    if (!COPY[lang]) return null;
    saveLang(lang);
    clearPrompt();
    if (!win.Translator) { showHelp(lang, opts.from); return 'help'; }
    var id = ++runId;
    try {
      status('Preparing translation…');
      var t = await ensureTranslator(lang, true);
      if (id !== runId) return null;
      if (!t) { status(''); showHelp(lang, opts.from); return 'help'; }
      current = lang; // the Translator exists; the first applied batch sets <html lang>
      collectNames();
      if (lang === 'ar') preloadArabicFonts();
      showBanner(); startObserver(); setPressed();
      status('Translating…');
      var ok = await translateRoots(lang, id);
      if (id === runId) { status(''); announceChange(); }
      return 'translated';
    } catch (err) {
      if (id === runId) { status(''); if (current !== lang) { current = 'en'; stopObserver(); var b = $('#tr-banner'); if (b) b.remove(); } showHelp(lang, opts.from); }
      return 'help';
    }
  }

  /* ---------------- wiring ---------------- */
  doc.addEventListener('click', function (e) {
    var close = e.target.closest && e.target.closest('[data-tr-close]');
    if (close) { closeHelp(); return; }
    if (e.target.id === 'tr-help') { closeHelp(); return; }
    var pc = e.target.closest && e.target.closest('[data-tr-prompt-close]');
    if (pc) { clearPrompt(); return; }
    var b = e.target.closest && e.target.closest('[data-lang]');
    if (!b) return;
    e.preventDefault();
    var modal = b.closest('.modal'), closer = modal && modal.querySelector('[data-close]');
    if (closer) closer.click();
    choose(b.getAttribute('data-lang'), { from: closer ? doc.getElementById('lang-menu') || b : b });
  });

  async function boot() {
    bar(); setPressed();
    var saved = readLang();
    if (!saved) return;
    if (win.Translator) {
      try {
        var av = await win.Translator.availability({ sourceLanguage: 'en', targetLanguage: saved });
        if (av === 'available') { await choose(saved); return; }
      } catch (e) { /* fall through to the prompt */ }
    }
    showPrompt(saved);
  }
  win.MosaicTranslate = { choose: choose, restore: restore, collect: collect, translatable: translatable, translateState: translateState, showHelp: showHelp, closeHelp: closeHelp, boot: boot, state: function () { return { current: current }; } };
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
});
