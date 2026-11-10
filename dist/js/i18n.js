/* The Representation Mosaic: English / Español / العربية.
   Loaded before the data files and app.js.

   How it works
   - ui: small key-aligned tables (en, es, ar) for text the code itself produces: the language switcher,
     banners, form messages, page title. Plural entries are objects keyed by CLDR category.
   - Static page text carries data-i18n="<id>" (and data-i18n-attr for attributes). English stays in the HTML.
   - Everything else (cards, tables, labels built by app.js) is English in the data files and is translated
     after it is drawn, by exact string or by {variable} pattern, using the loaded overlay.
   - Overlays (content.es.js, content.ar.js) are loaded on demand. A string with no translation stays in
     English. Quotations, names, URLs, numbers and legal designations are never in an overlay.
   - Machine translation: a banner says so whenever the language is not English. */
(function () {
  'use strict';

  var LANGS = {
    en: { label: 'English', dir: 'ltr', locale: 'en-US' },
    es: { label: 'Español', dir: 'ltr', locale: 'es' },
    ar: { label: 'العربية', dir: 'rtl', locale: 'ar-u-nu-latn' } /* Western digits in Arabic text */
  };
  var ORDER = ['en', 'es', 'ar'];
  var VERSION = '20261110h';

  /* ---------------- ui tables (key-aligned; tests/i18n.test.mjs enforces parity) ---------------- */
  var ui = {
    en: {
      'lang.changed': 'Language: {lang}',
      'banner.text': 'Machine-translated; awaiting review by a native speaker.',
      'banner.partial': 'Parts of this page are not translated yet and appear in English.',
      'banner.link': 'Read the English original',
      'suggest.text': 'This page is available in English.',
      'suggest.accept': 'Switch',
      'suggest.dismiss': 'No thanks',
      'suggest.aria': 'Language suggestion',
      'meta.title': 'The Representation Mosaic — Top vs. Bottom: How the 2026 Midterms Became a Wave',
      'meta.description': 'Who, why and how: a fact-checked civic guide to the 2026 U.S. midterm wave, the historic firsts it produced, and the local power, money and voting rules beneath it.',
      'meta.ogDescription': 'Not left versus right. Top versus bottom. How the 2026 midterms became a wave, checked claim by claim.',
      'form.sending': 'Sending…',
      'form.success': 'Thank you. Your suggestion was sent for review.',
      'form.successLink': 'View it on GitHub',
      'form.dry': 'Test mode: the server accepted the form and nothing was created.',
      'form.err.name': 'Name: enter 3 to 120 characters.',
      'form.err.what': 'Description: enter 40 to 600 characters.',
      'form.err.url': 'Link: enter a full web address that starts with https://',
      'form.err.proof': 'Proof link: enter a full web address that starts with https://',
      'form.err.consent': 'Please tick the box to agree before sending.',
      'form.err.turnstile': 'Please complete the verification check.',
      'form.err.rate': 'Too many suggestions from this connection. Please try again later.',
      'form.err.full': 'The review queue is full; please try again later or suggest it on GitHub.',
      'form.err.blocked': "This submission can't be accepted.",
      'form.err.generic': 'Something went wrong. Please use the GitHub issue form instead.',
      'form.charsLeft': { one: '{n} character left', other: '{n} characters left' },
      'form.errorsTitle': { one: 'There is {n} problem with your suggestion.', other: 'There are {n} problems with your suggestion.' }
    },
    es: {
      'lang.changed': 'Idioma: {lang}',
      'banner.text': 'Traducción automática; pendiente de revisión por un hablante nativo.',
      'banner.partial': 'Algunas partes de esta página aún no están traducidas y aparecen en inglés.',
      'banner.link': 'Leer el original en inglés',
      'suggest.text': 'Esta página está disponible en español.',
      'suggest.accept': 'Cambiar',
      'suggest.dismiss': 'No, gracias',
      'suggest.aria': 'Sugerencia de idioma',
      'meta.title': 'The Representation Mosaic — Arriba contra abajo: cómo las elecciones intermedias de 2026 se convirtieron en una ola',
      'meta.description': 'Quién, por qué y cómo: una guía cívica verificada sobre la ola de las elecciones intermedias de 2026 en EE. UU., los hitos históricos que produjo y las reglas de poder local, dinero y voto que hay debajo.',
      'meta.ogDescription': 'No izquierda contra derecha. Arriba contra abajo. Cómo las elecciones intermedias de 2026 se convirtieron en una ola, verificado afirmación por afirmación.',
      'form.sending': 'Enviando…',
      'form.success': 'Gracias. Su sugerencia se envió para revisión.',
      'form.successLink': 'Verla en GitHub',
      'form.dry': 'Modo de prueba: el servidor aceptó el formulario y no se creó nada.',
      'form.err.name': 'Nombre: escriba de 3 a 120 caracteres.',
      'form.err.what': 'Descripción: escriba de 40 a 600 caracteres.',
      'form.err.url': 'Enlace: escriba una dirección web completa que empiece por https://',
      'form.err.proof': 'Enlace de prueba: escriba una dirección web completa que empiece por https://',
      'form.err.consent': 'Marque la casilla de aceptación antes de enviar.',
      'form.err.turnstile': 'Complete la comprobación de verificación.',
      'form.err.rate': 'Demasiadas sugerencias desde esta conexión. Inténtelo de nuevo más tarde.',
      'form.err.full': 'La cola de revisión está llena; inténtelo más tarde o sugiéralo en GitHub.',
      'form.err.blocked': 'No se puede aceptar este envío.',
      'form.err.generic': 'Algo salió mal. Use en su lugar el formulario de incidencias de GitHub.',
      'form.charsLeft': { one: 'Queda {n} carácter', other: 'Quedan {n} caracteres' },
      'form.errorsTitle': { one: 'Hay {n} problema con su sugerencia.', other: 'Hay {n} problemas con su sugerencia.' }
    },
    ar: {
      'lang.changed': 'اللغة: {lang}',
      'banner.text': 'ترجمة آلية بانتظار مراجعة متحدث أصلي.',
      'banner.partial': 'بعض أجزاء هذه الصفحة لم تُترجم بعد وتظهر بالإنجليزية.',
      'banner.link': 'اقرأ النص الإنجليزي الأصلي',
      'suggest.text': 'هذه الصفحة متاحة بالعربية.',
      'suggest.accept': 'تبديل',
      'suggest.dismiss': 'لا، شكرًا',
      'suggest.aria': 'اقتراح اللغة',
      'meta.title': 'The Representation Mosaic — القمة مقابل القاعدة: كيف أصبحت انتخابات التجديد النصفي 2026 موجة',
      'meta.description': 'من وكيف ولماذا: دليل مدني موثّق عن موجة انتخابات التجديد النصفي الأمريكية 2026، والإنجازات التاريخية التي أفرزتها، وقواعد السلطة المحلية والمال والتصويت التي تقف خلفها.',
      'meta.ogDescription': 'ليس اليسار ضد اليمين، بل القمة مقابل القاعدة. كيف أصبحت انتخابات التجديد النصفي 2026 موجة، مع التحقق من كل ادعاء على حدة.',
      'form.sending': 'جارٍ الإرسال…',
      'form.success': 'شكرًا لك. أُرسل اقتراحك للمراجعة.',
      'form.successLink': 'اعرضه على GitHub',
      'form.dry': 'وضع الاختبار: قبل الخادم النموذج ولم يُنشأ أي شيء.',
      'form.err.name': 'الاسم: أدخل من 3 إلى 120 حرفًا.',
      'form.err.what': 'الوصف: أدخل من 40 إلى 600 حرف.',
      'form.err.url': 'الرابط: أدخل عنوان ويب كاملًا يبدأ بـ https://',
      'form.err.proof': 'رابط الإثبات: أدخل عنوان ويب كاملًا يبدأ بـ https://',
      'form.err.consent': 'يرجى تحديد مربع الموافقة قبل الإرسال.',
      'form.err.turnstile': 'يرجى إكمال التحقق الأمني.',
      'form.err.rate': 'عدد كبير من الاقتراحات من هذا الاتصال. يرجى المحاولة لاحقًا.',
      'form.err.full': 'قائمة المراجعة ممتلئة؛ يرجى المحاولة لاحقًا أو اقتراحه عبر GitHub.',
      'form.err.blocked': 'لا يمكن قبول هذا الإرسال.',
      'form.err.generic': 'حدث خطأ ما. يرجى استخدام نموذج البلاغات على GitHub بدلًا من ذلك.',
      'form.charsLeft': {
        zero: 'لا أحرف متبقية',
        one: 'حرف واحد متبقٍ',
        two: 'حرفان متبقيان',
        few: '{n} أحرف متبقية',
        many: '{n} حرفًا متبقيًا',
        other: '{n} حرف متبقٍ'
      },
      'form.errorsTitle': {
        zero: 'لا توجد مشكلات في اقتراحك.',
        one: 'توجد مشكلة واحدة في اقتراحك.',
        two: 'توجد مشكلتان في اقتراحك.',
        few: 'توجد {n} مشكلات في اقتراحك.',
        many: 'توجد {n} مشكلة في اقتراحك.',
        other: 'توجد {n} مشكلة في اقتراحك.'
      }
    }
  };

  /* Terms that carry legal, tax or verification meaning. Each language uses one fixed rendering, so a
     reader never sees two words for the same thing. tests/i18n.test.mjs checks every overlay string that
     contains the English term for `strict` entries. Designations such as 501(c)(3), 527, PAC and EIN are
     never translated. Native-speaker review of this table comes first. */
  var glossary = [
    { en: 'tax-deductible', es: 'deducible de impuestos', ar: 'قابل للخصم الضريبي', strict: true },
    { en: 'nonpartisan', es: 'no partidista', ar: 'غير حزبي', strict: true },
    { en: 'nonprofit', es: 'organización sin fines de lucro', ar: 'منظمة غير ربحية', strict: true },
    { en: 'ranked-choice voting', es: 'votación por orden de preferencia', ar: 'التصويت بالاختيار المرتب', strict: true },
    { en: 'special district', es: 'distrito especial', ar: 'منطقة خدمات خاصة', strict: false },
    { en: 'Confirmed', es: 'Confirmado', ar: 'مؤكد', strict: false },
    { en: 'Reported in 2026 sources', es: 'Informado en fuentes de 2026', ar: 'ورد في مصادر 2026', strict: true },
    { en: 'Not confirmed', es: 'No confirmado', ar: 'غير مؤكد', strict: true },
    { en: 'Critical lens', es: 'Lente crítica', ar: 'عدسة نقدية', strict: true },
    { en: 'Build power', es: 'Construir poder', ar: 'بناء القوة', strict: false },
    { en: 'unofficial', es: 'no oficial', ar: 'غير رسمي', strict: false },
    { en: 'Council-manager', es: 'Concejo-administrador', ar: 'مجلس–مدير', strict: false },
    { en: 'Mayor-council', es: 'Alcalde-concejo', ar: 'عمدة–مجلس', strict: false },
    { en: 'Top versus bottom', es: 'Arriba contra abajo', ar: 'القمة مقابل القاعدة', strict: false },
    { en: 'wave', es: 'ola', ar: 'موجة', strict: false }
  ];

  /* ---------------- state ---------------- */
  var current = 'en';
  var overlays = {};            // lang -> overlay object
  var exact = {};               // lang -> { english: translation }
  var patterns = {};            // lang -> [{re, keys, value, weight}]
  var loading = {};             // lang -> Promise
  var origHtml = new WeakMap(), origAttr = new WeakMap(), appliedLang = new WeakMap(), origText = new WeakMap();
  var touched = [];             // text nodes and attribute holders we have translated
  var marked = [];              // elements marked as English fallback (lang=en dir=ltr)
  var observer = null, pending = [], flushing = false;

  function norm(s) { return String(s).replace(/\s+/g, ' ').trim(); }
  function esc(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function dir(l) { return (LANGS[l] || LANGS.en).dir; }

  /* ---------------- ui lookup, plurals ---------------- */
  function plural(lang, n, forms) {
    var cat = 'other';
    try { cat = new Intl.PluralRules(LANGS[lang].locale).select(n); } catch (e) {}
    return forms[cat] != null ? forms[cat] : forms.other;
  }
  function fill(str, vars) {
    return String(str).replace(/\{(\w+)\}/g, function (m, k) { return vars && vars[k] != null ? vars[k] : m; });
  }
  function t(key, vars) {
    var v = (ui[current] && ui[current][key] != null) ? ui[current][key] : ui.en[key];
    if (v == null) return key;
    if (typeof v === 'object') v = plural(ui[current][key] != null ? current : 'en', vars && vars.n != null ? vars.n : 0, v);
    return fill(v, vars);
  }
  function tIn(lang, key, vars) { var save = current; current = lang; try { return t(key, vars); } finally { current = save; } }

  /* ---------------- overlay loading ---------------- */
  function indexOverlay(lang) {
    var o = overlays[lang], map = {}, pats = [];
    var groups = (o && o.strings) || {};
    Object.keys(groups).forEach(function (ns) {
      Object.keys(groups[ns]).forEach(function (en) {
        var val = groups[ns][en];
        if (/\{\w+\}/.test(en)) {
          var keys = [], re = '^' + norm(en).split(/(\{\w+\})/).map(function (part) {
            var m = /^\{(\w+)\}$/.exec(part);
            if (m) { keys.push(m[1]); return '(.+?)'; }
            return esc(part);
          }).join('') + '$';
          pats.push({ re: new RegExp(re, 's'), keys: keys, value: val, weight: norm(en).replace(/\{\w+\}/g, '').length });
        } else map[norm(en)] = val;
      });
    });
    pats.sort(function (a, b) { return b.weight - a.weight; });
    exact[lang] = map; patterns[lang] = pats;
  }
  function loadOverlay(lang) {
    if (lang === 'en' || overlays[lang]) return Promise.resolve();
    if (loading[lang]) return loading[lang];
    loading[lang] = new Promise(function (resolve) {
      var s = document.createElement('script');
      s.src = '/js/content.' + lang + '.js?v=' + VERSION;
      s.onload = function () { overlays[lang] = ((window.MOSAIC_I18N && window.MOSAIC_I18N.content) || {})[lang] || { static: {}, strings: {} }; indexOverlay(lang); resolve(); };
      s.onerror = function () { overlays[lang] = { static: {}, strings: {}, meta: { failed: true } }; indexOverlay(lang); resolve(); };
      document.head.appendChild(s);
    });
    return loading[lang];
  }

  /* ---------------- string translation ---------------- */
  function pick(val, vars) {
    if (val == null) return null;
    if (typeof val === 'object') {
      var n = vars && (vars.n != null ? vars.n : vars.count != null ? vars.count : null);
      n = parseFloat(String(n).replace(/,/g, ''));
      return plural(current, isNaN(n) ? 0 : n, val);
    }
    return val;
  }
  function lookupVar(v) {
    var m = exact[current];
    var k = norm(v);
    if (m[k] != null) return typeof m[k] === 'string' ? m[k] : v;
    // "Start a {x}": the data holds "Canvassing team"; the sentence has it lower-cased.
    var cap = k.charAt(0).toUpperCase() + k.slice(1);
    if (cap !== k && typeof m[cap] === 'string') return m[cap].charAt(0).toLowerCase() + m[cap].slice(1);
    return v;
  }
  /* Latin names, URLs and designations inside Arabic text are wrapped in left-to-right isolates (the
     text-node equivalent of <bdi>) so the bidi algorithm cannot scramble them. */
  var LRI = String.fromCharCode(0x2066), PDI = String.fromCharCode(0x2069); // left-to-right isolate, pop directional isolate
  var LATIN_RUN = /[A-Za-z][A-Za-z0-9.'’&\/:()%,+#@_ -]*[A-Za-z0-9)]|[A-Za-z]/g;
  function isolate(str) {
    if (current !== 'ar') return str;
    return str.replace(LATIN_RUN, function (m) { return LRI + m + PDI; });
  }
  /* Returns the translation of an English string, or null when there is none. */
  function s(text) {
    var r = s0(text);
    return r == null ? null : isolate(r);
  }
  function s0(text) {
    if (current === 'en') return null;
    var k = norm(text), m = exact[current];
    if (!m) return null;
    if (m[k] != null) return typeof m[k] === 'string' ? m[k] : null;
    var list = patterns[current] || [];
    for (var i = 0; i < list.length; i++) {
      var r = list[i].re.exec(k);
      if (!r) continue;
      var vars = {};
      list[i].keys.forEach(function (key, j) { vars[key] = r[j + 1]; });
      var tpl = pick(list[i].value, vars);
      if (tpl == null) return null;
      var out = {};
      Object.keys(vars).forEach(function (key) { out[key] = lookupVar(vars[key]); });
      return fill(tpl, out);
    }
    return null;
  }

  /* ---------------- DOM application ---------------- */
  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, NOSCRIPT: 1, CODE: 0 };
  function skipText(node) {
    var p = node.parentNode;
    if (!p || p.nodeType !== 1) return true;
    if (SKIP_TAGS[p.tagName]) return true;
    return !!(p.closest && p.closest('[data-i18n],[data-i18n-skip],[lang]:not([data-fallback]):not(html)'));
  }
  /* Text with no translation yet stays English. Mark it as English so it reads left-to-right, is announced in
     the right language, and is not mistaken for translated text. */
  function markFallback(el) {
    if (!el || el.nodeType !== 1 || el.hasAttribute('lang') || el.id === 'live') return;
    el.setAttribute('lang', 'en'); el.setAttribute('dir', 'ltr'); el.setAttribute('data-fallback', '');
    marked.push(el);
  }
  function looksEnglishProse(s) {
    var t = norm(s);
    if (t.length < 25 || t.split(' ').length < 5) return false;
    var latin = (t.match(/[A-Za-z]/g) || []).length, letters = (t.match(/\p{L}/gu) || []).length;
    return letters > 0 && latin / letters > 0.9;
  }
  function translateText(root) {
    if (current === 'en') return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, batch = [];
    if (root.nodeType === 3) batch.push(root);
    else while ((n = w.nextNode())) batch.push(n);
    batch.forEach(function (node) {
      if (origText.has(node) || skipText(node)) return;
      var raw = node.nodeValue;
      if (!/\p{L}{2,}/u.test(raw)) return;
      var tr = s(raw);
      if (tr == null) { if (looksEnglishProse(raw) && node.parentNode.childElementCount === 0) markFallback(node.parentNode); return; }
      origText.set(node, raw);
      var lead = /^\s*/.exec(raw)[0], tail = /\s*$/.exec(raw)[0];
      node.nodeValue = lead + tr + tail;
      touched.push(node);
    });
  }
  var ATTRS = ['aria-label', 'placeholder', 'title', 'alt'];
  function translateAttrs(root) {
    if (current === 'en' || root.nodeType !== 1) return;
    var els = Array.prototype.slice.call(root.querySelectorAll('[aria-label],[placeholder],[title],[alt]'));
    if (root.matches && root.matches('[aria-label],[placeholder],[title],[alt]')) els.unshift(root);
    els.forEach(function (el) {
      if (el.hasAttribute('data-i18n-attr') || el.closest('[lang]:not([data-fallback]):not(html)')) return;
      ATTRS.forEach(function (a) {
        if (!el.hasAttribute(a)) return;
        var memo = origAttr.get(el) || {};
        if (memo[a] !== undefined) return;
        var raw = el.getAttribute(a), tr = s(raw);
        if (tr == null) return;
        memo[a] = raw; origAttr.set(el, memo); el.setAttribute(a, tr);
        touched.push(el);
      });
    });
  }
  function applyStatic(root) {
    var st = (overlays[current] && overlays[current].static) || {};
    var els = Array.prototype.slice.call(root.querySelectorAll('[data-i18n],[data-i18n-attr]'));
    if (root.matches && root.matches('[data-i18n],[data-i18n-attr]')) els.unshift(root);
    els.forEach(function (el) {
      if (appliedLang.get(el) === current) return;
      var id = el.getAttribute('data-i18n');
      if (id) {
        if (!origHtml.has(el)) origHtml.set(el, el.innerHTML);
        var want = current === 'en' ? origHtml.get(el) : (st[id] != null ? st[id] : origHtml.get(el));
        if (want !== el.innerHTML) el.innerHTML = want;
        if (current !== 'en' && st[id] == null) markFallback(el);
      }
      var am = el.getAttribute('data-i18n-attr');
      if (am) {
        var memo = origAttr.get(el) || {};
        am.split(';').forEach(function (pair) {
          var i = pair.indexOf(':'), a = pair.slice(0, i), aid = pair.slice(i + 1);
          if (memo[a] === undefined) memo[a] = el.getAttribute(a);
          var val = current === 'en' ? memo[a] : (st[aid] != null ? st[aid] : memo[a]);
          if (val != null) el.setAttribute(a, val);
        });
        origAttr.set(el, memo);
      }
      appliedLang.set(el, current);
    });
  }
  function revertAll() {
    var keep = [];
    touched.forEach(function (x) {
      if (x.nodeType === 3) { if (origText.has(x)) { x.nodeValue = origText.get(x); origText.delete(x); } }
      else {
        var memo = origAttr.get(x);
        if (memo) Object.keys(memo).forEach(function (a) { if (!x.hasAttribute('data-i18n-attr') && memo[a] !== undefined) x.setAttribute(a, memo[a]); });
        origAttr.delete(x);
      }
    });
    touched = keep;
    marked.forEach(function (el) { el.removeAttribute('lang'); el.removeAttribute('dir'); el.removeAttribute('data-fallback'); });
    marked = [];
  }
  function applyAll(root) {
    root = root || document.body;
    applyStatic(root);
    translateText(root);
    translateAttrs(root);
  }
  function startObserver() {
    if (observer || !window.MutationObserver) return;
    observer = new MutationObserver(function (muts) {
      muts.forEach(function (m) { for (var i = 0; i < m.addedNodes.length; i++) pending.push(m.addedNodes[i]); });
      if (flushing || !pending.length) return;
      flushing = true;
      requestAnimationFrame(function () {
        var list = pending; pending = []; flushing = false;
        list.forEach(function (n) { if (n.isConnected) { if (n.nodeType === 1) { applyStatic(n); translateAttrs(n); } translateText(n); } });
        if (touched.length > 20000) touched = touched.filter(function (x) { return x.isConnected; });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /* ---------------- head, banner, switcher ---------------- */
  function setMeta() {
    document.title = t('meta.title');
    [['meta[name="description"]', 'meta.description'], ['meta[property="og:title"]', null], ['meta[property="og:description"]', 'meta.ogDescription'], ['meta[name="twitter:description"]', 'meta.ogDescription']].forEach(function (p) {
      var el = document.querySelector(p[0]); if (el && p[1]) el.setAttribute('content', t(p[1]));
    });
  }
  function setBanner() {
    var b = document.getElementById('lang-banner'); if (!b) return;
    if (current === 'en') { b.hidden = true; return; }
    b.hidden = false;
    b.setAttribute('lang', current); b.setAttribute('dir', dir(current));
    var o = overlays[current] || {};
    if (o.meta && o.meta.reviewed_by) { b.hidden = true; return; }
    var partial = !o.meta || o.meta.partial !== false;
    document.getElementById('lang-banner-text').textContent = t('banner.text') + (partial ? ' ' + t('banner.partial') : '');
    var a = document.getElementById('lang-banner-link');
    a.textContent = t('banner.link'); a.setAttribute('lang', 'en'); a.setAttribute('dir', 'ltr');
    a.setAttribute('href', '?lang=en' + location.hash);
  }
  function setSwitcher() {
    var btns = document.querySelectorAll('[data-lang]');
    Array.prototype.forEach.call(btns, function (b) {
      if (b.tagName === 'A') return;
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === current));
    });
  }

  /* ---------------- public: setLang ---------------- */
  function setLang(code, opts) {
    opts = opts || {};
    if (!LANGS[code]) code = 'en';
    return loadOverlay(code).then(function () {
      var changed = code !== current;
      var keep = scrollAnchor();
      revertAll();
      current = code;
      var d = document.documentElement;
      d.lang = code; d.dir = dir(code);
      if (opts.persist) { try { localStorage.setItem('mosaic:lang', JSON.stringify(code)); } catch (e) {} }
      if (opts.url !== false) {
        try {
          var u = new URL(location.href);
          if (code === 'en') u.searchParams.delete('lang'); else u.searchParams.set('lang', code);
          history.replaceState(null, '', u.pathname + u.search + u.hash);
        } catch (e) {}
      }
      appliedLang = new WeakMap();
      if (code !== 'en') indexOverlay(code);
      applyAll(document.body);
      setMeta(); setBanner(); setSwitcher();
      d.classList.remove('i18n-pending');
      var live = document.getElementById('live');
      if (live && changed && opts.announce) live.textContent = t('lang.changed', { lang: LANGS[code].label });
      document.dispatchEvent(new CustomEvent('mosaic:langchange', { detail: { lang: code, dir: dir(code) } }));
      if (changed) { restoreAnchor(keep); requestAnimationFrame(function () { restoreAnchor(keep); setTimeout(function () { restoreAnchor(keep); }, 250); }); }
    });
  }

  /* Switching language re-flows the page. Remember which element sat near the top of the window and where,
     then put it back, so the reader keeps their place. */
  function scrollAnchor() {
    var el = document.elementFromPoint(Math.round(window.innerWidth / 2), 160);
    var st = el && el.closest && el.closest('[data-i18n]');
    if (st) el = st; // static text keeps its element; only the text inside is swapped
    if (!el || el === document.body || el === document.documentElement) return { y: window.scrollY };
    return { el: el, top: el.getBoundingClientRect().top, y: window.scrollY };
  }
  function restoreAnchor(a) {
    if (!a) return;
    if (!a.el || !a.el.isConnected) { window.scrollTo(0, a.y); return; }
    var d = a.el.getBoundingClientRect().top - a.top;
    if (Math.abs(d) > 1) window.scrollBy(0, d);
  }

  /* ---------------- the "your browser prefers…" suggestion ---------------- */
  function maybeSuggest() {
    if (current !== 'en') return;
    var saved = null; try { saved = JSON.parse(localStorage.getItem('mosaic:lang')); } catch (e) {}
    var dismissed = null; try { dismissed = localStorage.getItem('mosaic:lang-dismissed'); } catch (e) {}
    if (saved || dismissed || new URLSearchParams(location.search).get('lang')) return;
    var prefs = navigator.languages || [navigator.language || 'en'], pick = null;
    for (var i = 0; i < prefs.length && !pick; i++) {
      var p = String(prefs[i]).toLowerCase().split('-')[0];
      if (p === 'en') return;       // the reader's first choice is English
      if (p === 'es' || p === 'ar') pick = p;
    }
    var box = document.getElementById('lang-suggest'); if (!pick || !box) return;
    box.hidden = false; box.setAttribute('lang', pick); box.setAttribute('dir', dir(pick));
    box.setAttribute('aria-label', tIn(pick, 'suggest.aria'));
    document.getElementById('lang-suggest-text').textContent = tIn(pick, 'suggest.text');
    var go = document.getElementById('lang-suggest-go'), no = document.getElementById('lang-suggest-no');
    go.textContent = tIn(pick, 'suggest.accept'); no.textContent = tIn(pick, 'suggest.dismiss');
    go.onclick = function () { box.hidden = true; setLang(pick, { persist: true, announce: true }); };
    no.onclick = function () { box.hidden = true; try { localStorage.setItem('mosaic:lang-dismissed', '1'); } catch (e) {} };
  }

  /* ---------------- helpers for app.js ---------------- */
  function fmtNum(n) { return Number(n).toLocaleString('en-US'); }
  function fmtDate(iso) {
    var d = new Date(iso + 'T12:00:00'); if (isNaN(d)) return iso;
    try { return new Intl.DateTimeFormat(LANGS[current].locale, { month: 'long', day: 'numeric', year: 'numeric' }).format(d); } catch (e) { return iso; }
  }

  function init() {
    startObserver();
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-lang]'); if (!b) return;
      e.preventDefault();
      var code = b.getAttribute('data-lang');
      var modal = b.closest('.modal'); var closer = modal && modal.querySelector('[data-close]'); if (closer) closer.click();
      setLang(code, { persist: true, announce: true });
    });
    var start = window.__MOSAIC_LANG || 'en';
    setLang(start, { url: false }).then(maybeSuggest);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.MOSAIC_I18N = {
    langs: LANGS, order: ORDER, ui: ui, glossary: glossary,
    t: t, tIn: tIn, plural: plural, setLang: setLang, getLang: function () { return current; },
    s: function (text) { var r = s(text); return r == null ? text : r; },
    num: fmtNum, date: fmtDate, apply: applyAll, isRtl: function () { return dir(current) === 'rtl'; }
  };
})();
