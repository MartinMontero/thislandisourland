/* The Representation Mosaic — application logic. Vanilla JS, no build step.
   All facts live in data.js (window.MOSAIC). This file only renders and computes. */
(function () {
  'use strict';
  var D = window.MOSAIC;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('mosaic:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('mosaic:' + k, JSON.stringify(v)); } catch (e) {} }
  };
  var officeLabel = { governor: 'Governor', senate: 'U.S. Senate', house: 'U.S. House', municipal: 'Mayor' };
  var partyLabel = { D: 'Democrat', R: 'Republican', I: 'Independent', N: 'Nonpartisan office' };
  var themeById = {};
  D.themes.forEach(function (t) { themeById[t.id] = t; });

  /* ---------------- Routing ---------------- */
  var panels = $$('[data-panel]');
  var chartsBuilt = {};
  function show(id, focus) {
    if (!$('[data-panel="' + id + '"]')) id = 'wave';
    panels.forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== id; });
    $$('[data-tab]').forEach(function (a) {
      if (a.getAttribute('data-tab') === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (!chartsBuilt[id] && charts[id]) { charts[id](); chartsBuilt[id] = true; }
    if (focus) {
      var h = $('[data-panel="' + id + '"] h2, [data-panel="' + id + '"] h1');
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }
  function route(focus) { show((location.hash || '#wave').slice(1).split('/')[0], focus); }
  window.addEventListener('hashchange', function () { route(true); });

  /* More sheet: lists every section for the compact (bottom bar) layout */
  function buildMore() {
    var out = [];
    $$('.nav-group').forEach(function (g) {
      var label = g.querySelector('.nav-group-label');
      out.push('<p class="eyebrow mt-3 mb-1 px-3">' + esc(label ? label.textContent : '') + '</p>');
      $$('a[data-tab]', g).forEach(function (a) {
        out.push('<a class="sheet-link" data-close data-tab="' + esc(a.getAttribute('data-tab')) + '" href="' + esc(a.getAttribute('href')) + '">' +
          '<span class="navicon" aria-hidden="true">' + esc(a.querySelector('.navicon').textContent) + '</span><span>' + esc(a.getAttribute('aria-label')) + '</span></a>');
      });
    });
    out.push('<p class="eyebrow mt-3 mb-1 px-3">Language</p>');
    [['en', 'English', ''], ['es', 'Español', ''], ['ar', 'العربية', ' dir="rtl"']].forEach(function (l) {
      out.push('<button type="button" class="sheet-link w-full" data-lang="' + l[0] + '" lang="' + l[0] + '"' + l[2] + ' aria-pressed="' + (l[0] === 'en') + '"><span translate="no" lang="' + l[0] + '">' + l[1] + '</span></button>');
    });
    var box = $('#more-links'); if (box) box.innerHTML = out.join('');
  }
  (function () {
    var btn = $('#nav-more');
    if (btn) btn.addEventListener('click', function () { lastFocus = btn; openModal('#more-sheet'); });
    var lb = $('#lang-menu');
    if (lb) lb.addEventListener('click', function () { lastFocus = lb; openModal('#lang-sheet'); });
  })();

  /* ---------------- Candidate grid ---------------- */
  var state = { office: 'all', theme: null, q: '', lens: store.get('lens', true), natl: false, wave: false };

  function statusTag(o) {
    var map = { called: ['verdict-confirmed', 'Race called'], uncalled: ['verdict-unverified', 'Not yet called'], unverified: ['verdict-unverified', 'Not verified'] };
    var m = map[o.status] || map.unverified;
    return '<span class="' + m[0] + '">' + m[1] + '</span>';
  }
  function partyTag(p) {
    return '<span class="tag border-paper-300 bg-paper-50 text-ink-700" title="' + esc(partyLabel[p] || p) + '">' + esc(p) + '</span>';
  }
  function card(o) {
    var lens = state.lens && o.lens ? (
      '<div class="lens mt-4"><p class="eyebrow text-ochre-700 mb-1">Critical lens</p>' +
      '<p class="text-sm leading-relaxed text-ink-700">' + esc(o.lens) + '</p>' +
      (o.lensCaveat ? '<p class="mt-2 text-xs text-stone-700 italic">' + esc(o.lensCaveat) + '</p>' : '') + '</div>') : '';
    var firsts = (o.firsts || []).map(function (f) {
      return '<li class="flex gap-2 text-sm"><span aria-hidden="true" class="mt-1.5 inline-block w-2 h-2 shrink-0 ' + (f.scope === 'national' ? 'bg-gold' : f.scope === 'milestone' ? 'bg-verd' : 'bg-stone') + '"></span><span>' + esc(f.text) +
        (f.note ? ' <span class="text-xs text-stone-700">(' + esc(f.note) + ')</span>' : '') + '</span></li>';
    }).join('');
    var themes = (o.themes || []).map(function (t) { return themeById[t] ? '<span class="tag border-paper-300 text-stone-700 bg-paper">' + esc(themeById[t].short) + '</span>' : ''; }).join(' ');
    var speechBtn = o.speech && o.speech.youtubeId ? '<button class="btn-ghost !py-1.5 !text-xs" data-speech="' + esc(o.id) + '">▶ Speech</button>' : '';
    return '<article class="plate p-5 flex flex-col ' + (o.nationalFirst ? 'singular' : '') + '" aria-labelledby="h-' + esc(o.id) + '">' +
      '<div class="flex items-start justify-between gap-2 mb-3"><div class="flex flex-wrap items-center gap-1.5">' + partyTag(o.party) +
      '<span class="eyebrow">' + esc(officeLabel[o.officeType]) + ' · ' + esc(o.jurisdiction) + '</span></div>' + statusTag(o) + '</div>' +
      '<h2 id="h-' + esc(o.id) + '" class="text-2xl leading-tight mb-1" translate="no">' + esc(o.name) + '</h2>' +
      '<p class="text-xs text-stone-700 mb-3">' + esc(o.background) + '</p>' +
      (o.nationalFirst ? '<p class="eyebrow text-gold-700 mb-2">★ National first</p>' : '') + (o.wave ? '<p class="eyebrow text-verd-700 mb-2">◆ Wave-maker</p>' : '') +
      '<ul class="space-y-1.5 mb-4">' + firsts + '</ul>' +
      '<div class="mb-3"><p class="eyebrow mb-1.5">Platform</p><ul class="text-sm text-ink-700 space-y-1">' +
      (o.platform || []).map(function (p) { return '<li class="flex gap-2"><span aria-hidden="true" class="text-verd">—</span><span>' + esc(p) + '</span></li>'; }).join('') + '</ul></div>' +
      '<p class="text-xs text-stone-700 mb-3"><span class="font-semibold text-ink-700">Result:</span> ' + esc(o.result) + '</p>' +
      '<div class="flex flex-wrap gap-1 mb-4">' + themes + '</div>' +
      '<div class="mt-auto pt-3 border-t border-paper-300 flex flex-wrap items-center gap-2">' + speechBtn +
      '<button class="btn-ghost !py-1.5 !text-xs" data-dossier="' + esc(o.id) + '">⧉ Copy dossier</button>' +
      '<details class="ms-auto text-xs"><summary class="cursor-pointer text-lapis">Sources (' + (o.sources || []).length + ')</summary><ul class="mt-2 space-y-1">' +
      (o.sources || []).map(function (s) { return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a></li>'; }).join('') + '</ul></details></div>' +
      lens + '</article>';
  }
  function matches(o) {
    if (state.office !== 'all' && o.officeType !== state.office) return false;
    if (state.natl && !o.nationalFirst) return false;
    if (state.wave && !o.wave) return false;
    if (state.theme && (o.themes || []).indexOf(state.theme) < 0) return false;
    if (state.q) {
      var hay = [o.name, o.jurisdiction, o.background, o.lens, o.result, (o.platform || []).join(' '), (o.firsts || []).map(function (f) { return f.text; }).join(' '), (o.keywords || []).join(' ')].join(' ').toLowerCase();
      return state.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; });
    }
    return true;
  }
  function renderGrid() {
    var list = D.officials.filter(matches);
    var grid = $('#grid');
    grid.innerHTML = list.map(card).join('');
    $('#grid-empty').hidden = list.length > 0;
    $('#grid-count').textContent = list.length + ' of ' + D.officials.length + ' profiles';
    $('#lens-switch').setAttribute('aria-checked', String(state.lens));
    $('#lens-state').textContent = state.lens ? 'On' : 'Off';
  }
  function bindGrid() {
    $$('[data-office]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.office = b.getAttribute('data-office');
        $$('[data-office]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        renderGrid();
      });
    });
    $('#natl-only').addEventListener('click', function (e) { state.natl = !state.natl; e.currentTarget.setAttribute('aria-pressed', String(state.natl)); renderGrid(); });
    $('#wave-only').addEventListener('click', function (e) { state.wave = !state.wave; e.currentTarget.setAttribute('aria-pressed', String(state.wave)); renderGrid(); });
    var tb = $('#theme-chips');
    tb.innerHTML = D.themes.map(function (t) { return '<button class="chip" aria-pressed="false" data-theme="' + t.id + '">' + esc(t.short) + '</button>'; }).join('');
    $$('[data-theme]', tb).forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-theme');
        state.theme = state.theme === id ? null : id;
        $$('[data-theme]', tb).forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-theme') === state.theme)); });
        renderGrid();
      });
    });
    var q = $('#q'); var t;
    q.addEventListener('input', function () { clearTimeout(t); t = setTimeout(function () { state.q = q.value.trim(); renderGrid(); }, 120); });
    $('#lens-switch').addEventListener('click', function () { state.lens = !state.lens; store.set('lens', state.lens); renderGrid(); });
    $('#grid-reset').addEventListener('click', resetGrid);
    $('#grid-reset-2').addEventListener('click', resetGrid);
    document.addEventListener('click', function (e) {
      var s = e.target.closest('[data-speech]'); if (s) openSpeech(s.getAttribute('data-speech'), s);
      var d = e.target.closest('[data-dossier]'); if (d) copyText(dossierFor(byId(d.getAttribute('data-dossier'))), d);
      var v = e.target.closest('[data-video]'); if (v) openVideo(v.getAttribute('data-video'), v.getAttribute('data-vtitle'), v.getAttribute('data-vsub'), v);
    });
  }
  function resetGrid() {
    state.office = 'all'; state.theme = null; state.q = ''; state.natl = false; state.wave = false; $('#q').value = ''; $('#wave-only').setAttribute('aria-pressed', 'false');
    $$('[data-office]').forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-office') === 'all')); });
    $$('[data-theme]').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    $('#natl-only').setAttribute('aria-pressed', 'false');
    renderGrid();
  }
  function byId(id) { for (var i = 0; i < D.officials.length; i++) if (D.officials[i].id === id) return D.officials[i]; return null; }

  /* ---------------- Policy crosscurrent matrix ---------------- */
  var mx = { theme: null };
  function renderMatrix() {
    var head = '<tr><th scope="col" class="sticky start-0 bg-paper-50 text-start p-2 font-semibold text-xs min-w-[11rem]">Official</th>' +
      D.themes.map(function (t) {
        return '<th scope="col" class="p-1 align-bottom"><button class="w-full min-w-[4.5rem] text-[10px] leading-tight font-mono uppercase tracking-wide px-1 pb-1 pt-0 rounded-sm border overflow-hidden cursor-pointer ' +
          (mx.theme === t.id ? 'bg-lapis text-onprimary border-lapis' : 'bg-paper-50 border-paper-300 hover:bg-paper-200') + '" data-mx="' + t.id + '" aria-pressed="' + (mx.theme === t.id) + '" title="Click to show who made this issue part of their campaign">' +
          '<span aria-hidden="true" class="block h-1.5 -mx-1 mb-1 ' + t.swatch + '"></span>' + esc(t.short) + '</button></th>';
      }).join('') + '</tr>';
    var rows = D.officials.map(function (o) {
      var dim = mx.theme && (o.themes || []).indexOf(mx.theme) < 0;
      return '<tr class="' + (dim ? 'opacity-30' : '') + '"><th scope="row" class="sticky start-0 bg-paper-50 text-start p-2 text-sm font-normal whitespace-nowrap"><span class="font-semibold" translate="no">' + esc(o.name) + '</span> <span class="text-xs text-stone-700">' + esc(o.party) + '·' + esc(o.jurisdictionShort || o.jurisdiction) + '</span></th>' +
        D.themes.map(function (t) {
          var on = (o.themes || []).indexOf(t.id) >= 0;
          return '<td class="p-1 text-center"><span class="inline-block w-6 h-6 rounded-[1px] ' + (on ? t.swatch : 'bg-paper-200') + '" title="' + esc(o.name + ': ' + t.label + (on ? ' — yes' : ' — no')) + '"></span><span class="sr-only">' + (on ? 'Yes' : 'No') + '</span></td>';
        }).join('') + '</tr>';
    }).join('');
    $('#matrix').innerHTML = '<thead>' + head + '</thead><tbody>' + rows + '</tbody>';
    var note = $('#matrix-note');
    if (mx.theme) {
      var t = themeById[mx.theme];
      var n = D.officials.filter(function (o) { return (o.themes || []).indexOf(t.id) >= 0; });
      note.innerHTML = '<p class="eyebrow mb-1">' + esc(t.label) + ' · ' + n.length + ' officials</p><p class="text-sm leading-relaxed">' + esc(t.explain) + '</p>' +
        '<p class="text-sm mt-2 text-ink-700"><span class="font-semibold">Ask:</span> ' + esc(t.question) + '</p>';
    } else {
      note.innerHTML = '<p class="text-sm text-stone-700">Select a column to isolate one issue. Each coloured cell means the official made that issue a documented part of their campaign or record, per the sources on their profile.</p>';
    }
    $$('[data-mx]').forEach(function (b) { b.addEventListener('click', function () { mx.theme = mx.theme === b.getAttribute('data-mx') ? null : b.getAttribute('data-mx'); renderMatrix(); }); });
  }

  /* ---------------- Speech vault + modal ---------------- */
  var lastFocus = null;
  function fmtT(t) { var h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), s = Math.floor(t % 60); return (h ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (s < 10 ? '0' : '') + s; }
  function tsLink(vid, t) { if (t === null || t === undefined) return ''; return '<a class="font-mono text-xs" href="https://www.youtube.com/watch?v=' + encodeURIComponent(vid) + '&t=' + Math.floor(t) + 's" target="_blank" rel="noopener">▶ ' + fmtT(t) + '</a>'; }
  /* "Read the speech" panel: verified excerpts for every video with captions; full text only for the candidate's own channel. */
  /* "Read the transcript" panel: the transcript of the linked YouTube video, plus short quotes with timestamp links. */
  function transcriptPanel(C, vid, name, mb) {
    if (!C) return '';
    var note = C.note ? '<p class="text-xs text-stone-700 mb-3">' + esc(C.note) + '</p>' : '';
    var hasEx = C.excerpts && C.excerpts.length, hasFull = C.full && C.full.length;
    if (!hasEx && !hasFull) return note ? '<div class="' + (mb || 'mb-4') + ' border-s-2 border-paper-300 ps-3 pt-2">' + note + '</div>' : '';
    var ex = hasEx ? '<ul class="text-sm space-y-2 mb-3">' + C.excerpts.map(function (e) {
      return '<li class="border-s-2 border-paper-300 ps-3" translate="no">“' + esc(e.text) + '”' + (e.t === null || e.t === undefined ? '' : ' ' + tsLink(vid, e.t)) + '</li>';
    }).join('') + '</ul>' : '';
    var full = hasFull ? '<details class="mt-2"><summary class="btn-ghost !text-xs cursor-pointer list-none [&::-webkit-details-marker]:hidden">Full transcript</summary>' +
      '<div tabindex="0" role="region" aria-label="Full transcript for ' + esc(name) + '" class="max-h-96 overflow-y-auto mt-2 pe-2 text-sm leading-relaxed space-y-2">' +
      C.full.map(function (p) { return '<p translate="no">' + tsLink(vid, p[0]) + ' ' + esc(p[1]) + '</p>'; }).join('') + '</div></details>' : '';
    return '<details class="' + (mb || 'mb-4') + ' border border-paper-300 rounded-sm bg-paper"><summary class="btn-ghost !text-xs !justify-start w-full cursor-pointer list-none [&::-webkit-details-marker]:hidden">Read the transcript</summary>' +
      '<div class="p-3">' + note + '<p class="text-xs text-stone-700 mb-3">Transcript from the YouTube video. It may contain errors; watch the video to verify.</p>' + ex + full + '</div></details>';
  }
  function captionPanel(o) { return transcriptPanel(D.captions && D.captions.byId && D.captions.byId[o.id], o.speech.youtubeId, o.name); }
  function renderVault() {
    var withVid = D.officials.filter(function (o) { return o.speech && o.speech.youtubeId; });
    var without = D.officials.filter(function (o) { return !(o.speech && o.speech.youtubeId); });
    $('#vault').innerHTML = withVid.map(function (o) {
      return '<article class="plate p-5 flex flex-col"><p class="eyebrow mb-1">' + esc(officeLabel[o.officeType]) + ' · ' + esc(o.jurisdiction) + '</p>' +
        '<h2 class="text-xl mb-1" translate="no">' + esc(o.name) + '</h2>' +
        '<p class="text-xs text-stone-700 mb-3">Video: “' + esc(o.speech.title) + '” — ' + esc(o.speech.channel) + '</p>' +
        (o.speech.highlights && o.speech.highlights.length ? '<ul class="text-sm space-y-2 mb-4">' + o.speech.highlights.map(function (h) {
          return '<li class="border-s-2 border-paper-300 ps-3"' + (h.quote ? ' translate="no"' : '') + '>' + (h.quote ? '“' + esc(h.quote) + '”' : esc(h.theme)) + (h.source ? ' <a class="text-xs" href="' + esc(h.source) + '" target="_blank" rel="noopener">source</a>' : '') + '</li>';
        }).join('') + '</ul>' : '') +
        captionPanel(o) +
        '<div class="mt-auto flex gap-2"><button class="btn-ink !text-xs" data-speech="' + esc(o.id) + '">▶ Watch here</button>' +
        '<a class="btn-ghost !text-xs" href="https://www.youtube.com/watch?v=' + esc(o.speech.youtubeId) + '" target="_blank" rel="noopener">Open on YouTube ↗</a></div></article>';
    }).join('') + ((D.captions && D.captions.extra) || []).map(function (x) {
      return '<article class="plate p-5 flex flex-col"><p class="eyebrow mb-1">' + esc(x.eyebrow) + '</p>' +
        '<h2 class="text-xl mb-1" translate="no">' + esc(x.name) + '</h2>' +
        '<p class="text-xs text-stone-700 mb-3">Video: “' + esc(x.title) + '” — ' + esc(x.channel) + '</p>' +
        transcriptPanel(x, x.videoId, x.name) +
        '<div class="mt-auto flex gap-2"><button class="btn-ink !text-xs" data-video="' + esc(x.videoId) + '" data-vtitle="' + esc(x.name) + '" data-vsub="“' + esc(x.title) + '” — ' + esc(x.channel) + '">▶ Watch here</button>' +
        '<a class="btn-ghost !text-xs" href="https://www.youtube.com/watch?v=' + esc(x.videoId) + '" target="_blank" rel="noopener">Open on YouTube ↗</a></div></article>';
    }).join('');
    $('#vault-missing').innerHTML = without.length ? '<p class="eyebrow mb-2">No verified speech video yet</p><p class="text-sm text-ink-700">' +
      without.map(function (o) { return esc(o.name); }).join(' · ') + '</p>' : '';
  }
  function openVideo(vid, title, sub, trigger) {
    lastFocus = trigger || document.activeElement;
    $('#vm-title').textContent = title; $('#vm-sub').textContent = sub;
    $('#vm-frame').innerHTML = '<iframe class="absolute inset-0 w-full h-full" src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(vid) + '?autoplay=1&rel=0" title="' + esc(title) + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
    $('#vm-link').href = 'https://www.youtube.com/watch?v=' + vid;
    openModal('#video-modal');
  }
  function openSpeech(id, trigger) {
    var o = byId(id); if (!o || !o.speech) return;
    lastFocus = trigger || document.activeElement;
    $('#vm-title').textContent = o.name;
    $('#vm-sub').textContent = '“' + o.speech.title + '” — ' + o.speech.channel;
    $('#vm-frame').innerHTML = '<iframe class="absolute inset-0 w-full h-full" src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(o.speech.youtubeId) + '?autoplay=1&rel=0" title="' + esc(o.name) + ' speech video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
    $('#vm-link').href = 'https://www.youtube.com/watch?v=' + o.speech.youtubeId;
    openModal('#video-modal');
  }
  function openModal(sel) {
    var m = $(sel); m.hidden = false; document.body.style.overflow = 'hidden';
    var f = m.querySelector('[data-close]'); if (f) f.focus();
  }
  function closeModal(m) {
    m.hidden = true; document.body.style.overflow = '';
    if (m.id === 'video-modal') $('#vm-frame').innerHTML = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener('keydown', function (e) {
    var open = $$('.modal').filter(function (m) { return !m.hidden; })[0];
    if (!open) return;
    if (e.key === 'Escape') { closeModal(open); return; }
    if (e.key === 'Tab') {
      var f = $$('button, a[href], select, textarea, input, iframe', open).filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-close]'); if (c) closeModal(c.closest('.modal'));
    if (e.target.classList && e.target.classList.contains('modal')) closeModal(e.target);
  });


  /* ---------------- The wave ---------------- */
  function srcLink(url, label) { return '<a class="text-xs" href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(label || 'source') + '</a>'; }
  function renderWave() {
    var W = D.wave; if (!W) return;
    $('#wave-stats').innerHTML = W.stats.map(function (t) {
      return '<div class="plate p-4 flex flex-col"><p class="font-serif text-4xl sm:text-5xl leading-none">' + esc(t.value) + '</p><p class="text-sm text-ink-700 mt-2 leading-snug">' + esc(t.label) + '</p><p class="mt-auto pt-2">' + srcLink(t.source, t.src) + '</p></div>';
    }).join('');
    $('#wave-forces').innerHTML = W.forces.map(function (f, n) {
      return '<article class="plate p-5 flex flex-col"><p class="font-mono text-xs text-gold-700 mb-1">0' + (n + 1) + '</p><h3 class="font-serif text-3xl leading-tight">' + esc(f.title) + '</h3><p class="eyebrow mb-3">' + esc(f.kicker) + '</p>' +
        '<p class="text-sm text-ink-700 leading-relaxed mb-3">' + esc(f.body) + '</p>' +
        '<ul class="text-sm space-y-1 mb-4">' + f.evidence.map(function (e) { return '<li class="flex gap-2"><span aria-hidden="true" class="text-verd">—</span><span>' + esc(e) + '</span></li>'; }).join('') + '</ul>' +
        (f.voice ? '<blockquote class="mt-auto border-s-2 border-gold ps-3 py-1"><p class="font-serif text-lg leading-snug" translate="no">“' + esc(f.voice.quote) + '”</p><footer class="text-xs text-stone-700 mt-1">' + esc(f.voice.who) + ' · ' + srcLink(f.voice.source) + '</footer></blockquote>' : '') +
        '<details class="text-xs mt-3"><summary class="cursor-pointer text-lapis">Sources (' + f.sources.length + ')</summary><ul class="mt-2 space-y-1">' + f.sources.map(function (x) { return '<li>' + srcLink(x.url, x.label) + '</li>'; }).join('') + '</ul></details></article>';
    }).join('');
    $('#wave-who').innerHTML = W.who.map(function (c) {
      return '<div class="plate p-5"><h3 class="font-serif text-2xl leading-tight mb-2">' + esc(c.title) + '</h3><p class="text-sm text-ink-700 leading-relaxed">' + esc(c.body) + '</p><p class="mt-2">' + srcLink(c.url, c.src) + '</p></div>';
    }).join('');
    $('#wave-playbook').innerHTML = W.playbook.map(function (c, n) {
      return '<li class="p-4 border border-oninverse/30 rounded-sm"><p class="font-mono text-xs text-invaccent mb-1">' + (n + 1) + '</p><p class="font-serif text-xl text-oninverse mb-1">' + esc(c.title) + '</p><p class="text-sm text-invmuted leading-relaxed">' + esc(c.body) + '</p></li>';
    }).join('');
    $('#wave-speechmap').innerHTML = W.speechmap.map(function (g) {
      return '<div class="plate p-5"><p class="eyebrow text-gold-700 mb-3">' + esc(g.theme) + '</p><ul class="space-y-4">' + g.quotes.map(function (q) {
        return '<li><p class="font-serif text-xl leading-snug" translate="no">“' + esc(q.text) + '”</p><p class="text-xs text-stone-700 mt-1">' + esc(q.who) + (q.note ? ' · ' + esc(q.note) : '') + ' · ' + srcLink(q.source) + '</p></li>';
      }).join('') + '</ul></div>';
    }).join('');
    $('#wave-breaks').innerHTML = W.breaks.map(function (b) {
      return '<div class="lens bg-paper-50"><p class="font-semibold text-sm mb-1">' + esc(b.title) + '</p><p class="text-sm text-ink-700 leading-relaxed">' + esc(b.body) + '</p><p class="mt-1">' + srcLink(b.url, b.src) + '</p></div>';
    }).join('');
    var T = W.texas;
    $('#wave-texas').innerHTML = '<p class="eyebrow mb-1">Case study</p><h3 class="text-3xl mb-3">' + esc(T.title.replace('Case study: how', 'How')) + '</h3><div class="prose-civic text-sm text-ink-700">' + T.body.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' +
      '<div class="flex flex-wrap items-center gap-2 mt-2"><button class="btn-ink !text-xs" data-video="' + esc(T.video.id) + '" data-vtitle="' + esc(T.video.title) + '" data-vsub="Third-party analysis · ' + esc(T.video.channel) + '">▶ Watch: “' + esc(T.video.title) + '”</button><span class="text-xs text-stone-700">Third-party commentary from ' + esc(T.video.channel) + '; its claims are its own and were not fact-checked here.</span></div>' +
      '<details class="text-xs mt-3"><summary class="cursor-pointer text-lapis">Sources (' + T.sources.length + ')</summary><ul class="mt-2 space-y-1">' + T.sources.map(function (x) { return '<li>' + srcLink(x.url, x.label) + '</li>'; }).join('') + '</ul></details>';
  }
  function renderFurther() {
    var F = D.captions && D.captions.further, el = $('#wave-mpu'); if (!F || !el) return;
    el.innerHTML = '<p class="eyebrow mb-1">Further viewing</p><h3 class="text-3xl mb-3">' + esc(F.title) + '</h3>' +
      '<p class="text-sm text-ink-700 leading-relaxed mb-3">A video and post from ' + esc(F.channel) + ' arguing that economic populism won back working-class voters in the 2026 midterms, and asking whether the shift will last or fade. Its claims are its own and were not fact-checked here.</p>' +
      '<div class="flex flex-wrap items-center gap-2 mb-4"><button class="btn-ink !text-xs" data-video="' + esc(F.videoId) + '" data-vtitle="' + esc(F.title) + '" data-vsub="Third-party analysis · ' + esc(F.channel) + '">▶ Watch the video</button>' +
      '<a class="btn-ghost !text-xs" href="' + esc(F.post) + '" target="_blank" rel="noopener">Read the post ↗</a></div>' +
      transcriptPanel(F, F.videoId, F.title, 'mb-0');
  }
  function waveChart() {
    var el = document.getElementById('chart-shift'); if (!el || !window.Chart) return;
    var C = D.wave.shiftChart;
    new Chart(el, { type: 'bar', data: { labels: C.labels, datasets: [
      { label: 'Trump, 2024', data: C.y2024, backgroundColor: tok('stone'), borderWidth: 0, maxBarThickness: 26 },
      { label: 'Republican House candidates, 2026', data: C.y2026, backgroundColor: tok('error'), borderWidth: 0, maxBarThickness: 26 } ] },
      options: baseOpts({ indexAxis: 'y', scales: { x: { min: 0, max: 70, grid: { color: GRID }, ticks: { color: INK, font: { family: 'IBM Plex Mono', size: 11 }, callback: function (v) { return v + '%'; } } }, y: { grid: { color: 'transparent' }, ticks: { color: INK, font: { family: 'system-ui', size: 12 } } } },
        plugins: { legend: { labels: { color: INK, font: { family: 'system-ui', size: 12 }, boxWidth: 12 } }, tooltip: { backgroundColor: INK, titleColor: tok('surface'), bodyColor: tok('surface'), callbacks: { label: function (c) { return ' ' + c.dataset.label + ': ' + c.parsed.x + '%'; } } } } }) });
    tableFor('chart-shift-table', C.labels, [{ label: 'Trump 2024 (%)', data: C.y2024 }, { label: 'GOP House 2026 (%)', data: C.y2026 }]);
  }

  /* ---------------- Governance model simulator ---------------- */
  function govBlock(m) {
    var flow = m.flow.map(function (step, i) {
      return (i ? '<div class="text-center text-stone-700 font-mono text-sm py-1" aria-hidden="true">' + esc(step.arrow || '↓') + '</div>' : '') +
        '<div class="p-3 border ' + (step.elected ? 'border-verd/40 bg-verd-50' : 'border-paper-300 bg-paper') + ' rounded-sm"><div class="flex justify-between gap-2"><span class="font-semibold text-sm">' + esc(step.role) + '</span><span class="eyebrow">' + (step.elected ? 'Elected' : 'Appointed') + '</span></div><p class="text-sm text-ink-700 mt-1">' + esc(step.does) + '</p></div>';
    }).join('');
    return '<p class="eyebrow mb-1">' + esc(m.share) + '</p><h3 class="font-serif text-2xl mb-2">' + esc(m.name) + '</h3><p class="text-sm text-ink-700 mb-4">' + esc(m.summary) + '</p>' + flow +
      '<div class="lens mt-4"><p class="eyebrow text-ochre-700 mb-1">What this means for you</p><p class="text-sm">' + esc(m.forYou) + '</p></div>' +
      '<p class="text-xs text-stone-700 mt-3"><span class="font-semibold">Examples:</span> ' + esc(m.examples) + '</p>';
  }
  function renderGov(key) {
    $$('[data-model]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-model') === key)); });
    if (key === 'both') {
      $('#gov-detail').innerHTML = '<div class="grid grid-cols-1 md:grid-cols-2 gap-5"><div>' + govBlock(D.local.models.cm) + '</div><div>' + govBlock(D.local.models.mc) + '</div></div>';
      return;
    }
    $('#gov-detail').innerHTML = govBlock(D.local.models[key]);
  }

  /* ---------------- Special district stack ---------------- */
  function renderStack() {
    var val = Math.max(0, parseFloat($('#home-value').value) || 0);
    var taxable = val * D.districts.stack.assessmentRatio;
    var total = 0, boards = 0, seats = 0, rows = '', bar = '';
    var on = D.districts.stack.layers.filter(function (l) { var cb = $('#layer-' + l.id); return l.fixed || (cb && cb.checked); });
    on.forEach(function (l) { total += taxable * l.mills / 1000; boards += 1; seats += l.seats; });
    on.forEach(function (l) {
      var amt = taxable * l.mills / 1000;
      var pct = total ? (amt / total * 100) : 0;
      bar += '<div class="h-full ' + l.swatch + '" style="width:' + pct.toFixed(2) + '%" title="' + esc(l.name) + ': $' + Math.round(amt).toLocaleString('en-US') + '"></div>';
    });
    D.districts.stack.layers.forEach(function (l) {
      var el = $('#amt-' + l.id); if (el) el.textContent = '$' + Math.round(taxable * l.mills / 1000).toLocaleString('en-US');
    });
    $('#stack-bar').innerHTML = bar;
    $('#stack-total').textContent = '$' + Math.round(total).toLocaleString('en-US');
    $('#stack-boards').textContent = boards;
    $('#stack-seats').textContent = seats;
  }
  function buildStack() {
    var L = D.districts.stack.layers;
    $('#stack-layers').innerHTML = L.map(function (l) {
      return '<label class="flex items-center justify-between gap-3 p-3 border border-paper-300 bg-paper-50 rounded-sm ' + (l.fixed ? '' : 'cursor-pointer hover:bg-paper-200') + '">' +
        '<span class="flex items-center gap-3"><input type="checkbox" id="layer-' + l.id + '" ' + (l.fixed ? 'checked disabled' : (l.on ? 'checked' : '')) + ' class="w-6 h-6 accent-lapis">' +
        '<span aria-hidden="true" class="inline-block w-3 h-3 ' + l.swatch + '"></span>' +
        '<span><span class="block text-sm font-semibold">' + esc(l.name) + '</span><span class="block text-xs text-stone-700">' + esc(l.kind) + ' · ' + l.mills + ' mills · ' + l.seats + ' elected seats</span></span></span>' +
        '<span class="font-mono text-sm" id="amt-' + l.id + '"></span></label>';
    }).join('');
    L.forEach(function (l) { var cb = $('#layer-' + l.id); if (cb && !l.fixed) cb.addEventListener('change', renderStack); });
    $('#home-value').addEventListener('input', renderStack);
    renderStack();
  }

  /* ---------------- RCV instant-runoff sandbox ---------------- */
  var rcv = { blocs: null };
  function loadScenario(key) {
    var s = D.rcv.scenarios[key];
    rcv.blocs = s.blocs.map(function (b) { return { size: b.size, ranking: b.ranking.slice(), label: b.label }; });
    $$('[data-scn]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-scn') === key)); });
    $('#rcv-scn-note').textContent = s.note;
    buildBlocs();
  }
  function buildBlocs() {
    var C = D.rcv.candidates;
    $('#rcv-blocs').innerHTML = rcv.blocs.map(function (b, i) {
      var sels = [0, 1, 2, 3].map(function (r) {
        return '<label class="block"><span class="sr-only">Bloc ' + (i + 1) + ' choice ' + (r + 1) + '</span><select data-bloc="' + i + '" data-rank="' + r + '" class="w-full min-h-[2.75rem] text-sm border border-line bg-paper-50 rounded-sm px-1">' +
          '<option value="">—</option>' + C.map(function (c) { return '<option value="' + c.id + '"' + (b.ranking[r] === c.id ? ' selected' : '') + '>' + (r + 1) + '. ' + esc(c.name) + '</option>'; }).join('') + '</select></label>';
      }).join('');
      return '<div class="p-3 border border-paper-300 bg-paper-50 rounded-sm"><div class="flex items-center justify-between gap-3 mb-2"><span class="text-sm font-semibold">' + esc(b.label) + '</span>' +
        '<label class="flex items-center gap-2 text-xs"><span class="sr-only">Size of ' + esc(b.label) + '</span><input type="range" min="0" max="60" step="1" value="' + b.size + '" data-size="' + i + '" class="w-28 accent-ink"><span class="font-mono w-10 text-end" id="size-' + i + '">' + b.size + '%</span></label></div>' +
        '<div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">' + sels + '</div></div>';
    }).join('');
    $$('[data-size]').forEach(function (r) { r.addEventListener('input', function () { var i = +r.getAttribute('data-size'); rcv.blocs[i].size = +r.value; $('#size-' + i).textContent = r.value + '%'; runRCV(); }); });
    $$('[data-bloc]').forEach(function (s) {
      s.addEventListener('change', function () {
        var i = +s.getAttribute('data-bloc'), r = +s.getAttribute('data-rank');
        var rk = rcv.blocs[i].ranking; var v = s.value || null;
        var dup = v ? rk.indexOf(v) : -1; if (dup >= 0 && dup !== r) rk[dup] = rk[r] || null;
        rk[r] = v;
        buildBlocs();
      });
    });
    runRCV();
  }
  function irv(blocs, candIds) {
    var active = candIds.slice(), rounds = [];
    var totalW = blocs.reduce(function (a, b) { return a + b.size; }, 0);
    while (active.length) {
      var tally = {}; active.forEach(function (c) { tally[c] = 0; });
      var exhausted = 0;
      blocs.forEach(function (b) {
        var pick = null;
        for (var k = 0; k < b.ranking.length; k++) { if (b.ranking[k] && active.indexOf(b.ranking[k]) >= 0) { pick = b.ranking[k]; break; } }
        if (pick) tally[pick] += b.size; else exhausted += b.size;
      });
      var cont = totalW - exhausted;
      var sorted = active.slice().sort(function (a, b) { return tally[b] - tally[a]; });
      var top = sorted[0];
      var round = { tally: tally, active: active.slice(), continuing: cont, exhausted: exhausted, total: totalW };
      if (cont === 0) { round.end = 'all-exhausted'; rounds.push(round); break; }
      if (tally[top] * 2 > cont || active.length === 1) { round.winner = top; rounds.push(round); break; }
      var low = Math.min.apply(null, active.map(function (c) { return tally[c]; }));
      var lows = active.filter(function (c) { return tally[c] === low; });
      var out = lows[lows.length - 1]; // deterministic tie-break: last in ballot order
      round.eliminated = out; round.tie = lows.length > 1;
      rounds.push(round);
      active = active.filter(function (c) { return c !== out; });
    }
    return rounds;
  }
  function runRCV() {
    var C = D.rcv.candidates, ids = C.map(function (c) { return c.id; });
    var nameOf = {}; C.forEach(function (c) { nameOf[c.id] = c.name; });
    var swatch = {}; C.forEach(function (c) { swatch[c.id] = c.swatch; });
    var rounds = irv(rcv.blocs, ids);
    var first = rounds[0];
    var pluralityWinner = ids.slice().sort(function (a, b) { return first.tally[b] - first.tally[a]; })[0];
    var html = rounds.map(function (r, i) {
      var bars = r.active.slice().sort(function (a, b) { return r.tally[b] - r.tally[a]; }).map(function (c) {
        var pct = r.continuing ? r.tally[c] / r.continuing * 100 : 0;
        return '<div><div class="flex justify-between text-xs mb-1"><span class="' + (r.winner === c ? 'font-semibold' : '') + '">' + esc(nameOf[c]) + (r.eliminated === c ? ' — eliminated' : '') + (r.winner === c ? ' — wins' : '') + '</span><span class="font-mono">' + pct.toFixed(1) + '%</span></div>' +
          '<div class="bar-track"><div class="bar-fill ' + (r.eliminated === c ? 'bg-stone' : swatch[c]) + '" style="width:' + pct.toFixed(1) + '%"></div></div></div>';
      }).join('');
      var note = r.winner ? esc(nameOf[r.winner]) + ' holds more than half of the ballots still counting, so the count stops.' :
        r.end ? 'Every ballot is exhausted; no winner.' :
        'No one has a majority of continuing ballots. ' + esc(nameOf[r.eliminated]) + ' has the fewest and is eliminated' + (r.tie ? ' (tie broken by ballot order)' : '') + '; those ballots move to their next choice still in the race.';
      return '<div class="p-4 border rounded-sm ' + (r.winner ? 'border-verd/50 bg-verd-50' : 'border-paper-300 bg-paper-50') + '"><div class="flex justify-between mb-3"><span class="font-semibold text-sm">Round ' + (i + 1) + '</span><span class="text-xs text-stone-700 font-mono">majority = over ' + (r.continuing / 2).toFixed(1) + '% · exhausted ' + r.exhausted + '%</span></div><div class="space-y-2.5">' + bars + '</div><p class="text-xs text-ink-700 mt-3 pt-3 border-t border-paper-300">' + note + '</p></div>';
    }).join('');
    var final = rounds[rounds.length - 1];
    var cmp = '';
    if (final.winner) {
      cmp = final.winner === pluralityWinner ?
        '<p><span class="font-semibold">Same winner either way.</span> ' + esc(nameOf[final.winner]) + ' led the first-choice count and also won the count. Ranked choice did not change the winner here. That does not prove the winner was the broadest choice: check whether a candidate most voters ranked second was eliminated early.</p>' :
        '<p><span class="font-semibold">Different winner.</span> Under a single-choice plurality rule, ' + esc(nameOf[pluralityWinner]) + ' would have won with ' + (first.tally[pluralityWinner] / first.total * 100).toFixed(1) + '% of first choices. Under instant runoff, ' + esc(nameOf[final.winner]) + ' wins because more voters ranked them above the plurality leader once weaker candidates dropped out. Whether that is better depends on what you think an election should measure: the most intense support, or the broadest acceptable support.</p>';
    }
    $('#rcv-rounds').innerHTML = html;
    $('#rcv-compare').innerHTML = cmp;
    var tot = rcv.blocs.reduce(function (a, b) { return a + b.size; }, 0);
    $('#rcv-total').textContent = tot + '%';
    $('#rcv-total').className = 'font-mono ' + (tot === 100 ? 'text-verd-700' : 'text-terra-700');
  }

  /* ---------------- Charts ---------------- */
  function tok(name, alpha) {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-' + name).trim().split(/\s+/);
    return alpha == null ? 'rgb(' + v.join(',') + ')' : 'rgba(' + v.join(',') + ',' + alpha + ')';
  }
  var INK = tok('on-surface'), GRID = tok('on-surface', 0.14);
  if (window.matchMedia) window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { location.reload(); });
  function baseOpts(extra) {
    var o = {
      responsive: true, maintainAspectRatio: false, animation: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? false : { duration: 500 },
      plugins: { legend: { labels: { color: INK, font: { family: 'system-ui', size: 12 }, boxWidth: 12 } }, tooltip: { backgroundColor: INK, titleColor: tok('surface'), bodyColor: tok('surface'), titleFont: { family: 'system-ui' }, bodyFont: { family: 'system-ui' } } },
      scales: {}
    };
    return Object.assign(o, extra || {});
  }
  function barChart(id, cfg) {
    var el = document.getElementById(id); if (!el || !window.Chart) return;
    new Chart(el, {
      type: 'bar',
      data: { labels: cfg.labels, datasets: cfg.datasets },
      options: baseOpts({
        indexAxis: cfg.horizontal ? 'y' : 'x',
        plugins: { legend: { display: cfg.datasets.length > 1, labels: { color: INK, font: { family: 'system-ui', size: 12 }, boxWidth: 12 } }, tooltip: { backgroundColor: INK, titleColor: tok('surface'), bodyColor: tok('surface'), callbacks: cfg.tooltip ? { label: cfg.tooltip } : {} } },
        scales: {
          x: { stacked: !!cfg.stacked, grid: { color: cfg.horizontal ? GRID : 'transparent' }, ticks: { color: INK, font: { family: 'IBM Plex Mono', size: 11 }, callback: cfg.xTick } },
          y: { stacked: !!cfg.stacked, grid: { color: cfg.horizontal ? 'transparent' : GRID }, ticks: { color: INK, font: { family: cfg.horizontal ? 'system-ui' : 'IBM Plex Mono', size: 11 } }, beginAtZero: true }
        }
      })
    });
  }
  function tableFor(id, labels, series) {
    var host = document.getElementById(id); if (!host) return;
    host.innerHTML = '<details class="mt-3 text-xs"><summary class="cursor-pointer text-lapis">View data as a table</summary><table class="mt-2 w-full text-start border-collapse"><thead><tr><th class="p-1 border-b border-paper-300">Category</th>' +
      series.map(function (s) { return '<th class="p-1 border-b border-paper-300">' + esc(s.label) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      labels.map(function (l, i) { return '<tr><td class="p-1 border-b border-paper-200">' + esc(l) + '</td>' + series.map(function (s) { return '<td class="p-1 border-b border-paper-200 font-mono">' + esc(s.data[i]) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></details>';
  }
  var charts = {};
  function registerCharts() {
    charts.wave = waveChart;
    (D.charts || []).forEach(function (c) {
      var prev = charts[c.panel];
      charts[c.panel] = function () {
        if (prev) prev();
        barChart(c.canvas, { labels: c.labels, datasets: c.series.map(function (s) { return { label: s.label, data: s.data, backgroundColor: tok(s.color), borderWidth: 0, maxBarThickness: 38 }; }), horizontal: c.horizontal, stacked: c.stacked, xTick: c.unit === '%' ? function (v) { return v + '%'; } : (c.unit === 'million dollars' ? function (v) { return '$' + v + 'M'; } : undefined), tooltip: c.unit ? function (ctx) { var v = (ctx.parsed[c.horizontal ? 'x' : 'y']).toLocaleString('en-US'); if (c.unit === 'million dollars') return ' ' + ctx.dataset.label.replace(' ($ million)', '') + ': $' + v + ' million'; return ' ' + ctx.dataset.label + ': ' + v + (c.unit === '%' ? '%' : ' ' + c.unit); } : undefined });
        tableFor(c.canvas + '-table', c.labels, c.series.map(function (s) { return { label: s.label, data: s.data }; }));
      };
    });
  }

  /* ---------------- Notebook / Markdown export ---------------- */
  function src(list) { return (list || []).map(function (s) { return '- [' + s.label + '](' + s.url + ')'; }).join('\n'); }
  function dossierFor(o) {
    if (!o) return '';
    return '## ' + o.name + ' (' + o.party + ') — ' + officeLabel[o.officeType] + ', ' + o.jurisdiction + '\n\n' +
      '- **Status:** ' + (o.status === 'called' ? 'Race called' : o.status === 'uncalled' ? 'Not yet called' : 'Not verified') + ' (as of ' + D.meta.asOf + ')\n' +
      '- **Result:** ' + o.result + '\n' +
      '- **Background:** ' + o.background + '\n' +
      (o.firsts || []).map(function (f) { return '- **' + (f.scope === 'national' ? 'National first' : f.scope === 'milestone' ? 'Milestone' : 'State first') + ':** ' + f.text + (f.note ? ' (' + f.note + ')' : ''); }).join('\n') + '\n' +
      '- **Platform:** ' + (o.platform || []).join('; ') + '\n' +
      '- **Themes:** ' + (o.themes || []).map(function (t) { return themeById[t] ? themeById[t].label : t; }).join(', ') + '\n\n' +
      (o.lens ? '**Critical lens.** ' + o.lens + (o.lensCaveat ? ' _' + o.lensCaveat + '_' : '') + '\n\n' : '') +
      (o.speech && o.speech.youtubeId ? '**Speech video:** https://www.youtube.com/watch?v=' + o.speech.youtubeId + ' — "' + o.speech.title + '" (' + o.speech.channel + ')\n\n' : '') +
      '**Sources**\n' + src(o.sources) + '\n';
  }
  function header(title) {
    return '# ' + title + '\n\n_From ' + D.meta.title + ' (' + D.meta.url + '). Facts checked as of ' + D.meta.asOf + '. ' + D.meta.exportNote + '_\n\n';
  }
  var exports = {
    officials: function () { return header('The Cast of the 2026 Wave — Official Dossiers') + D.officials.map(dossierFor).join('\n---\n\n'); },
    insights: function () {
      return header('Structural Insights of the 2026 Midterms') + D.insights.map(function (i) {
        return '## ' + i.title + '\n\n' + i.body.join('\n\n') + '\n\n**Evidence**\n' + i.evidence.map(function (e) { return '- ' + e; }).join('\n') + '\n\n**Limits of this claim.** ' + i.limits + '\n\n**Sources**\n' + src(i.sources) + '\n';
      }).join('\n') + '\n## Civic Wisdom Lab prompts\n\n' + D.lab.map(function (l) { return '### ' + l.title + '\n\n' + l.body + '\n\n' + l.questions.map(function (q) { return '- ' + q; }).join('\n') + '\n'; }).join('\n');
    },
    local: function () {
      return header('How Local Power Works — 2026 Municipal Framework') + D.local.exportText + '\n\n**Sources**\n' + src(D.local.sources) + '\n\n' + D.districts.exportText + '\n\n**Sources**\n' + src(D.districts.sources) + '\n\n' + D.money.exportText + '\n\n**Sources**\n' + src(D.money.sources) + '\n\n' + D.justice.exportText + '\n\n**Sources**\n' + src(D.justice.sources) + '\n\n' + D.rcv.exportText + '\n\n**Sources**\n' + src(D.rcv.sources) + '\n';
    },
    ledger: function () {
      var P2 = D.provenance;
      var st = function (k) { return (P2.status[k] || P2.status.open).label; };
      return header('Sources and Claim Checks') + P2.lede + '\n\n## How to read a claim here\n\n' + P2.reading.map(function (r) { return '- **' + r.title + '.** ' + r.body; }).join('\n') +
        '\n\n## Kinds of source\n\n' + P2.tiers.map(function (t) { return '### ' + t.name + '\n\n**Can show.** ' + t.shows + '\n\n**Watch for.** ' + t.limits; }).join('\n\n') +
        '\n\n## Trace a claim yourself\n\n' + P2.steps.map(function (s, i) { return (i + 1) + '. **' + s.title + '.** ' + s.body.replace('{n}', D.ledger.length); }).join('\n') +
        '\n\n## Where claims go wrong\n\n' + P2.modes.map(function (m) { return '### ' + m.title + '\n\n' + m.body + '\n\n' + m.links.map(function (l) { return '- [' + l[0] + '](' + l[1] + ')'; }).join('\n'); }).join('\n\n') +
        '\n\n## What is still open\n\n' + P2.open.map(function (o) { return '- **' + o.title + '.** ' + o.body; }).join('\n') +
        '\n\n## Claim checks\n\nStatements chosen because they are easy to get wrong; the share needing a qualifier says nothing about news accuracy in general.\n\n| Topic | Claim | Status | What the sources show | Source |\n|---|---|---|---|---|\n' +
        D.ledger.map(function (l) { return '| ' + (P2.groups[l.group] || '') + ' | ' + l.claim.replace(/\|/g, '/') + ' | ' + st(l.status) + ' | ' + l.finding.replace(/\|/g, '/') + ' | [' + hostOf(l.source) + '](' + l.source + ') |'; }).join('\n') + '\n';
    }
  };
  exports.wave = function () {
    var W = D.wave;
    return header('Top vs. Bottom: How the 2026 Midterms Became a Wave') +
      '## The scale\n\n' + W.stats.map(function (t) { return '- **' + t.value + '**: ' + t.label + ' ([' + t.src + '](' + t.source + '))'; }).join('\n') + '\n\n' +
      '## Republican share by group, 2024 vs. 2026\n\n| Group | Trump 2024 | GOP House 2026 |\n|---|---|---|\n' + W.shiftChart.labels.map(function (l, i) { return '| ' + l + ' | ' + W.shiftChart.y2024[i] + '% | ' + W.shiftChart.y2026[i] + '% |'; }).join('\n') + '\n\nSource: ' + W.shiftChart.source + '\n\n' +
      '## Why: six forces\n\n' + W.forces.map(function (f) { return '### ' + f.title + ' — ' + f.kicker + '\n\n' + f.body + '\n\n' + f.evidence.map(function (e) { return '- ' + e; }).join('\n') + (f.voice ? '\n\n> “' + f.voice.quote + '” — ' + f.voice.who + ' ([source](' + f.voice.source + '))' : '') + '\n\n' + src(f.sources); }).join('\n\n') + '\n\n' +
      '## Who moved\n\n' + W.who.map(function (c) { return '### ' + c.title + '\n\n' + c.body + ' ([' + c.src + '](' + c.url + '))'; }).join('\n\n') + '\n\n' +
      '## How they won: the playbook\n\n' + W.playbook.map(function (c, i) { return (i + 1) + '. **' + c.title + '.** ' + c.body; }).join('\n') + '\n\n' +
      '## The speech map\n\n' + W.speechmap.map(function (g) { return '### ' + g.theme + '\n\n' + g.quotes.map(function (q) { return '- “' + q.text + '” — ' + q.who + (q.note ? ' (' + q.note + ')' : '') + ' ([source](' + q.source + '))'; }).join('\n'); }).join('\n\n') + '\n\n' +
      '## Where the frame breaks\n\n' + W.breaks.map(function (b) { return '### ' + b.title + '\n\n' + b.body + ' ([' + b.src + '](' + b.url + '))'; }).join('\n\n') + '\n\n' +
      '## ' + W.texas.title + '\n\n' + W.texas.body.join('\n\n') + '\n\nVideo (third-party commentary): https://www.youtube.com/watch?v=' + W.texas.video.id + '\n\n' + src(W.texas.sources) + '\n';
  };
  exports.buildpower = function () {
    var B = D.buildpower;
    var lk = function (o) { return '[' + o.label + '](' + o.url + ')'; };
    var out = header('Build Power: A Checked Directory') + B.intro.join(' ') + '\n\n**Verified ' + B.verified + '.** **How to read it.** ' + B.how_to_read + '\n\n' + B.badge_note + '\n\n' +
      '## Start here\n\n' + B.start_here.map(function (s) { return s.n + '. **' + s.title + '.** ' + s.text + (s.links.length ? ' (' + s.links.map(lk).join('; ') + ')' : ''); }).join('\n') + '\n\n## Directory\n\n';
    Object.keys(B.sections).forEach(function (k) {
      var rows = B.records.filter(function (r) { return r.section === k; });
      out += '### ' + B.sections[k] + '\n\n' + rows.map(function (r) {
        var vi = { confirmed: 'Confirmed', indexed: 'Reported in 2026 sources', unverified: 'Not confirmed' }[r.verification] || r.verification;
        return '- **[' + r.name + '](' + r.url + ')** — ' + r.what + '\n  - How to help: ' + (r.engage || []).join(', ') + '\n  - Scope: ' + (r.scope || 'n/a') + '\n  - Legal form: ' + (r.legal_status || 'not stated') + '\n  - Where it sits: ' + (r.partisanship || 'not stated') +
          '\n  - Tax-deductible: ' + (r.tax_deductible || 'not stated') + '\n  - Cost: ' + (r.cost || 'n/a') + '\n  - Status in 2026: ' + (r.status_2026 || 'n/a') + '\n  - Verification: ' + vi + ' (checked ' + r.date_verified + ')' + (/^not (verified|confirmed)/i.test(r.legal_status || '') || r.tax_deductible === 'Not confirmed' || r.tax_deductible === 'Not verified' ? ' — legal form not verified' : '') + (r.expires ? '\n  - Date-limited: ends ' + r.expires : '') +
          (r.notes ? '\n  - Notes: ' + r.notes : '') + '\n  - Links: ' + Object.keys(r.links || {}).map(function (n) { return '[' + n.replace(/_/g, ' ') + '](' + r.links[n] + ')'; }).join(', ') + '\n  - Sources: ' + (r.sources || []).join(', ');
      }).join('\n') + '\n\n';
    });
    var dc = B.data_centers, bt = B.beautiful_trouble;
    out += '## ' + dc.title + '\n\n' + dc.lede + '\n\n' + dc.points.map(function (p) { return '- ' + p.text + (p.link ? ' (' + lk(p.link) + ')' : ''); }).join('\n') + '\n\n' + dc.note + '\n\n' +
      '## Beautiful Trouble and Beautiful Solutions\n\n[' + bt.toolbox.label + '](' + bt.toolbox.url + ') ' + bt.intro + '\n\n| Type | What it is | Use it to |\n|---|---|---|\n' + B.beautiful_trouble_types.map(function (t) { return '| ' + t.type + ' | ' + t.what + ' | ' + t.use + ' |'; }).join('\n') + '\n\n' +
      bt.recommended_lede + '\n\n' + bt.recommended.map(function (r) { return '- ' + (r.url ? '[' + r.name + '](' + r.url + ')' : r.name) + (r.note ? ' (' + r.note + ')' : ''); }).join('\n') + '\n\n' + bt.planning_lede + ' ' + bt.planning.map(function (p) { return p.url ? '[' + p.name + '](' + p.url + ')' : p.name; }).join(', ') + '.\n\n' + bt.fits + '\n\n' + bt.extras + '\n\n' +
      '[' + bt.solutions.name + '](' + bt.solutions.url + ') ' + bt.solutions.text + '\n\n[' + bt.pbp.name + '](' + bt.pbp.url + ') ' + bt.pbp.text + '\n\n' +
      '## Start something\n\n| Start a… | First step | Guide | Support |\n|---|---|---|---|\n' + B.start_something.map(function (s) { return '| ' + s.start + ' | ' + s.first + ' | ' + lk(s.guide) + ' | ' + s.support + ' |'; }).join('\n') + '\n\n' +
      '## Holding the 2026 winners to their word\n\n' + B.hold_winners.map(function (h, i) { return (i + 1) + '. ' + h.text + (h.link ? h.link.text + (h.after || '') : ''); }).join('\n') + '\n\n' +
      '## What we could not confirm\n\n' + B.open_items.map(function (o) { return '- **' + o.title + '.** ' + o.body; }).join('\n') + '\n';
    return out;
  };
  exports.all = function () { return [exports.wave(), exports.officials(), exports.insights(), exports.local(), exports.ledger()].join('\n\n---\n\n'); };
  function setExport(key) {
    $$('[data-exp]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-exp') === key)); });
    var txt = exports[key]();
    $('#exp-text').value = txt;
    $('#exp-meta').textContent = txt.length.toLocaleString('en-US') + ' characters · ' + txt.split(/\s+/).length.toLocaleString('en-US') + ' words';
    $('#exp-text').setAttribute('data-key', key);
  }
  function copyText(txt, btn) {
    var done = function () { if (!btn) return; var o = btn.innerHTML; btn.innerHTML = '✓ Copied'; setTimeout(function () { btn.innerHTML = o; }, 1600); };
    var live = $('#live'); if (live) live.textContent = 'Copied to clipboard';
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(done, fallback); else fallback();
    function fallback() { var t = document.createElement('textarea'); t.value = txt; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (e) {} document.body.removeChild(t); }
  }
  function download() {
    var key = $('#exp-text').getAttribute('data-key') || 'all';
    var blob = new Blob([$('#exp-text').value], { type: 'text/markdown;charset=utf-8' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'representation-mosaic-' + key + '.md';
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }

  /* ---------------- Static renderers for data-driven sections ---------------- */
  function renderInsights() {
    $('#insights').innerHTML = D.insights.map(function (i, n) {
      return '<article class="plate p-6 flex flex-col"><p class="font-mono text-xs text-gold-700 mb-2">0' + (n + 1) + '</p><h3 class="text-3xl mb-1">' + esc(i.title) + '</h3><p class="eyebrow mb-4">' + esc(i.kicker) + '</p>' +
        '<div class="prose-civic text-sm text-ink-700">' + i.body.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' +
        '<p class="eyebrow mt-2 mb-1">Evidence</p><ul class="text-sm space-y-1 mb-4">' + i.evidence.map(function (e) { return '<li class="flex gap-2"><span aria-hidden="true" class="text-verd">—</span><span>' + esc(e) + '</span></li>'; }).join('') + '</ul>' +
        '<div class="lens mt-auto"><p class="eyebrow text-ochre-700 mb-1">Limits of this claim</p><p class="text-sm">' + esc(i.limits) + '</p></div>' +
        '<details class="text-xs mt-3"><summary class="cursor-pointer text-lapis">Sources (' + i.sources.length + ')</summary><ul class="mt-2 space-y-1">' + i.sources.map(function (s) { return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a></li>'; }).join('') + '</ul></details></article>';
    }).join('');
    $('#lab').innerHTML = D.lab.map(function (l, n) {
      return '<details class="group border border-oninverse/20 bg-oninverse/10 rounded-sm p-4"' + (n === 0 ? ' open' : '') + '><summary class="flex items-center justify-between gap-3 cursor-pointer list-none"><span class="font-serif text-xl text-oninverse">' + esc(l.title) + '</span><span aria-hidden="true" class="font-mono text-invaccent group-open:rotate-45 transition-transform">+</span></summary>' +
        '<div class="mt-3 pt-3 border-t border-oninverse/30 text-sm text-invmuted space-y-3"><p class="leading-relaxed">' + esc(l.body) + '</p>' +
        (l.example ? '<p class="leading-relaxed text-invmuted"><span class="text-invaccent font-semibold">From this election:</span> ' + esc(l.example) + '</p>' : '') +
        '<p class="eyebrow !text-invaccent">Questions to sit with</p><ul class="space-y-1.5">' + l.questions.map(function (q) { return '<li class="flex gap-2"><span aria-hidden="true">?</span><span>' + esc(q) + '</span></li>'; }).join('') + '</ul>' +
        '<label class="block"><span class="eyebrow !text-invmuted">Your answer (stays in this browser)</span><textarea data-note="' + l.id + '" rows="3" class="mt-1 w-full bg-inverse border border-oninverse/40 rounded-sm p-2 text-oninverse text-sm" placeholder="Write your reasoning…"></textarea></label></div></details>';
    }).join('');
    $$('[data-note]').forEach(function (t) { var k = 'note:' + t.getAttribute('data-note'); t.value = store.get(k, ''); t.addEventListener('input', function () { store.set(k, t.value); }); });
  }
  /* ---------------- Sources & provenance ---------------- */
  var P = D.provenance;
  var tierShort = { official: 'Official record', primary: 'Candidate’s own words', national: 'National news', research: 'Research or reference', advocacy: 'Advocacy group', news: 'News outlet', video: 'Video commentary' };
  function hostOf(u) { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return ''; } }
  function tierOfHost(host) {
    var best = 'news', bestLen = 0;
    for (var t in P.domainTier) {
      P.domainTier[t].forEach(function (d) {
        if ((host === d || host.slice(-(d.length + 1)) === '.' + d) && d.length > bestLen) { best = t; bestLen = d.length; }
      });
    }
    return best;
  }
  function collectSources() {
    var entries = {};
    function add(u, forced) {
      u = String(u).replace(/[.,;]+$/, '');
      var host = hostOf(u);
      if (!host || host === 'localhost' || host === location.hostname || host === 'representation-mosaic.pages.dev' || host === 'thislandisourland.us') return;
      if (/(^|\.)youtube\.com$|^youtu\.be$/.test(host) && !forced) return;
      entries[u.replace(/#.*$/, '').replace(/\/$/, '')] = { host: host, tier: forced || tierOfHost(host) };
    }
    (JSON.stringify(D).match(/https?:\/\/[^\s"'<>\\)]+/g) || []).forEach(function (u) { add(u); });
    $$('a[href^="http"]').forEach(function (el) { add(el.getAttribute('href')); });
    D.officials.forEach(function (o) { if (o.speech && o.speech.youtubeId) add('https://www.youtube.com/watch?v=' + o.speech.youtubeId, 'primary'); });
    if (D.wave && D.wave.texas && D.wave.texas.video) add('https://www.youtube.com/watch?v=' + D.wave.texas.video.id, 'video');
    return entries;
  }
  function statusOf(s) { return P.status[s] || P.status.open; }

  function renderProvenance() {
    var entries = collectSources();
    var urls = Object.keys(entries);
    var hosts = {}; urls.forEach(function (u) { hosts[entries[u].host] = true; });
    var holds = D.ledger.filter(function (l) { return l.status === 'holds'; }).length;
    var videos = urls.filter(function (u) { return /youtube\.com/.test(u); }).length;

    $('#prov-lede').textContent = P.lede;
    $('#prov-stats').innerHTML = [
      [urls.length, 'outside links to the reporting and records behind the site'],
      [Object.keys(hosts).length, 'different sites, grouped by kind below'],
      [D.ledger.length, 'statements checked one by one'],
      [videos, 'speech and commentary videos linked']
    ].map(function (t) {
      return '<div class="plate p-4"><p class="font-serif text-4xl leading-none">' + t[0] + '</p><p class="text-sm text-ink-700 mt-2 leading-snug">' + esc(t[1]) + '</p></div>';
    }).join('');

    $('#prov-reading-list').innerHTML = P.reading.map(function (r, i) {
      return '<div class="plate p-5"><p class="eyebrow mb-1">' + (i + 1) + '</p><h3 class="text-2xl leading-tight mb-2">' + esc(r.title) + '</h3><p class="text-sm text-ink-700 leading-relaxed">' + esc(r.body) + '</p></div>';
    }).join('');

    $('#prov-tiers').innerHTML = P.tiers.map(function (t, i) {
      var mine = urls.filter(function (u) { return entries[u].tier === t.id; });
      var counts = {}; mine.forEach(function (u) { counts[entries[u].host] = (counts[entries[u].host] || 0) + 1; });
      var names = Object.keys(counts).sort(function (x, y) { return counts[y] - counts[x] || (x < y ? -1 : 1); });
      return '<article class="plate p-5 flex flex-col"><p class="eyebrow mb-1">Kind ' + (i + 1) + '</p><h3 class="text-2xl leading-tight mb-1">' + esc(t.name) + '</h3>' +
        '<p class="font-mono text-xs text-stone-700 mb-3">' + mine.length + ' link' + (mine.length === 1 ? '' : 's') + ' · ' + names.length + ' site' + (names.length === 1 ? '' : 's') + '</p>' +
        '<p class="text-sm text-ink-700 leading-relaxed mb-2"><strong class="text-ink">Can show.</strong> ' + esc(t.shows) + '</p>' +
        '<p class="text-sm text-ink-700 leading-relaxed mb-3"><strong class="text-ink">Watch for.</strong> ' + esc(t.limits) + '</p>' +
        (names.length ? '<details class="mt-auto"><summary class="cursor-pointer min-h-[2.75rem] flex items-center text-sm text-lapis">Sites in this group (' + names.length + ')</summary><p class="text-xs text-ink-700 leading-relaxed pb-1">' +
          names.map(function (n) { return esc(n) + (counts[n] > 1 ? ' (' + counts[n] + ')' : ''); }).join(' · ') + '</p></details>' : '') + '</article>';
    }).join('');

    $('#prov-steps').innerHTML = P.steps.map(function (s, i) {
      return '<li class="plate p-4 flex gap-4"><span aria-hidden="true" class="font-serif text-4xl leading-none w-8 flex-none text-lapis">' + (i + 1) + '</span><div><p class="font-semibold">' + esc(s.title) + '</p><p class="text-sm text-ink-700 leading-relaxed">' + esc(s.body.replace('{n}', D.ledger.length)) + '</p></div></li>';
    }).join('');

    $('#prov-modes-list').innerHTML = P.modes.map(function (m, i) {
      return '<article class="plate p-5 flex flex-col"><p class="eyebrow mb-1">Failure ' + (i + 1) + '</p><h3 class="text-2xl leading-tight mb-2">' + esc(m.title) + '</h3><p class="text-sm text-ink-700 leading-relaxed mb-3">' + esc(m.body) + '</p>' +
        '<ul class="mt-auto flex flex-wrap gap-x-4 gap-y-1">' + m.links.map(function (l) { return '<li><a class="text-xs" href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + '</a></li>'; }).join('') + '</ul></article>';
    }).join('');

    $('#prov-open-list').innerHTML = P.open.map(function (o) {
      return '<div><dt class="font-semibold">' + esc(o.title) + '</dt><dd class="text-sm text-ink-700 leading-relaxed mt-1">' + esc(o.body) + '</dd></div>';
    }).join('');

    $('#prov-checks-intro').textContent = 'These ' + D.ledger.length + ' statements are the ones most likely to be repeated wrongly about the 2026 results and local government. Each has a status and the source that settles it. ' + holds + ' hold up as stated; the rest needed a qualifier, were contradicted, or could not be established.';

    $$('[data-jump]').forEach(function (b) {
      b.addEventListener('click', function () {
        var el = document.getElementById(b.getAttribute('data-jump')); if (!el) return;
        el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        el.focus({ preventScroll: true });
      });
    });
    renderChecks(entries);
  }

  function renderChecks(entries) {
    var ck = { q: '', status: null, group: null };
    var sKeys = ['holds', 'qualified', 'wrong', 'open'];
    var gKeys = Object.keys(P.groups);
    function count(fn) { return D.ledger.filter(fn).length; }
    function chip(attr, key, label, n, on) {
      return '<button type="button" class="chip" ' + attr + '="' + esc(key) + '" aria-pressed="' + on + '">' + esc(label) + ' <span class="font-mono text-xs">' + n + '</span></button>';
    }
    function draw() {
      $('#ck-status').innerHTML = chip('data-ck-status', '', 'All statuses', D.ledger.length, ck.status === null) +
        sKeys.map(function (k) { return chip('data-ck-status', k, statusOf(k).label, count(function (l) { return l.status === k; }), ck.status === k); }).join('');
      $('#ck-group').innerHTML = chip('data-ck-group', '', 'All topics', D.ledger.length, ck.group === null) +
        gKeys.map(function (k) { return chip('data-ck-group', k, P.groups[k], count(function (l) { return l.group === k; }), ck.group === k); }).join('');
      var q = ck.q.trim().toLowerCase();
      var rows = D.ledger.filter(function (l) {
        return (!ck.status || l.status === ck.status) && (!ck.group || l.group === ck.group) &&
          (!q || (l.claim + ' ' + l.finding).toLowerCase().indexOf(q) !== -1);
      });
      var gloss = ck.status ? ' ' + statusOf(ck.status).gloss : '';
      $('#ck-count').textContent = 'Showing ' + rows.length + ' of ' + D.ledger.length + ' checks.' + gloss;
      $('#ledger').innerHTML = rows.length ? rows.map(function (l) {
        var st = statusOf(l.status); var host = hostOf(l.source);
        var e = entries[String(l.source).replace(/#.*$/, '').replace(/\/$/, '')];
        var kind = tierShort[(e && e.tier) || tierOfHost(host)];
        return '<li class="plate p-4 sm:p-5 md:grid md:grid-cols-12 md:gap-6">' +
          '<div class="md:col-span-5"><p class="eyebrow mb-1">' + esc(P.groups[l.group] || '') + '</p><p class="font-semibold leading-snug">' + esc(l.claim) + '</p></div>' +
          '<div class="md:col-span-2 my-3 md:my-0"><span class="' + st.cls + '">' + esc(st.label) + '</span></div>' +
          '<div class="md:col-span-5 text-sm text-ink-700 leading-relaxed"><p>' + esc(l.finding) + '</p>' +
          '<p class="mt-2"><a class="text-xs" href="' + esc(l.source) + '" target="_blank" rel="noopener">' + esc(host) + '</a> <span class="text-xs text-stone-700">· ' + esc(kind) + '</span></p></div></li>';
      }).join('') : '<li class="plate p-5 text-sm text-ink-700">No checks match. Clear a filter or change the search.</li>';
    }
    document.addEventListener('click', function (e) {
      var s = e.target.closest('[data-ck-status]'), g = e.target.closest('[data-ck-group]');
      if (s) { ck.status = s.getAttribute('data-ck-status') || null; draw(); var n = $('[data-ck-status="' + (ck.status || '') + '"]'); if (n) n.focus(); }
      if (g) { ck.group = g.getAttribute('data-ck-group') || null; draw(); var m = $('[data-ck-group="' + (ck.group || '') + '"]'); if (m) m.focus(); }
    });
    $('#ck-q').addEventListener('input', function (e) { ck.q = e.target.value; draw(); });
    draw();
  }
  function renderMayors() {
    $('#mayors').innerHTML = D.local.mayors.map(function (m) {
      return '<tr class="border-b border-paper-200 align-top"><th scope="row" class="p-2 text-start font-semibold whitespace-nowrap">' + esc(m.city) + '</th><td class="p-2 whitespace-nowrap font-mono text-xs">' + esc(m.date) + '</td><td class="p-2">' + esc(m.incumbent) + '</td><td class="p-2 font-semibold">' + esc(m.winner) + '</td><td class="p-2 text-ink-700">' + esc(m.note) + (m.source ? ' <a class="text-xs" href="' + esc(m.source) + '" target="_blank" rel="noopener">source</a>' : '') + '</td></tr>';
    }).join('');
  }

  /* ---------------- Build power ---------------- */
  function ext(url, label, cls, noTranslate) {
    if (noTranslate) label = '<span translate="no">' + esc(label) + '</span>';
    else label = esc(label);
    return '<a' + (cls ? ' class="' + cls + '"' : '') + ' href="' + esc(url) + '" target="_blank" rel="noopener">' + label + '<span class="sr-only"> (opens in a new tab)</span></a>';
  }
  function renderBuild() {
    var B = D.buildpower; if (!B || !$('#bp-list')) return;
    var helpLabel = { volunteer: 'Volunteer', donate: 'Donate', train: 'Train', run: 'Run', start: 'Start something', use_tool: 'Use a tool', get_help: 'Get help', serve: 'Serve', read: 'Read', join: 'Join', champion: 'Champion a reform', attend: 'Attend', host: 'Host an event', find: 'Find' };
    var taxLabel = { yes: 'Yes', partial: 'No or partial', unconfirmed: 'Not confirmed', na: 'Not applicable' };
    var verInfo = { confirmed: { label: 'Confirmed', status: 'holds' }, indexed: { label: 'Reported in 2026 sources', status: 'qualified' }, unverified: { label: 'Not confirmed', status: 'open' } };
    function taxKey(t) {
      var s = String(t == null ? '' : t).trim(), l = s.toLowerCase();
      if (l === 'n/a') return 'na';
      if (!s || /^not (verified|confirmed|re-checked|stated)/.test(l) || /unconfirmed|if c3 confirmed/.test(l)) return 'unconfirmed';
      if (/^yes\b/.test(l)) return 'yes';
      return 'partial';
    }
    var all = B.records;
    function legalUnverified(r) { return /^not (verified|confirmed)/i.test(r.legal_status || '') || r.tax_deductible === 'Not confirmed' || r.tax_deductible === 'Not verified'; }
    function countBy(fn) { var c = {}; all.forEach(function (r) { [].concat(fn(r)).forEach(function (k) { c[k] = (c[k] || 0) + 1; }); }); return c; }
    var cSec = countBy(function (r) { return r.section; }), cHelp = countBy(function (r) { return r.engage || []; }), cTax = countBy(function (r) { return taxKey(r.tax_deductible); }), cVer = countBy(function (r) { return r.verification; });
    var secKeys = Object.keys(B.sections);
    var helpKeys = Object.keys(cHelp).sort(function (a, b) { return cHelp[b] - cHelp[a] || (helpLabel[a] < helpLabel[b] ? -1 : 1); });
    var taxKeys = ['yes', 'partial', 'unconfirmed', 'na'];
    var verKeys = ['confirmed', 'indexed', 'unverified'];
    var f = { q: '', section: {}, help: {}, tax: {}, ver: {} };
    function has(set) { return Object.keys(set).length > 0; }
    function match(r) {
      if (has(f.section) && !f.section[r.section]) return false;
      if (has(f.help) && !(r.engage || []).some(function (e) { return f.help[e]; })) return false;
      if (has(f.tax) && !f.tax[taxKey(r.tax_deductible)]) return false;
      if (has(f.ver) && !f.ver[r.verification]) return false;
      var q = f.q.trim().toLowerCase();
      return !q || (r.name + ' ' + r.what + ' ' + (r.notes || '')).toLowerCase().indexOf(q) !== -1;
    }
    function fmtDate(iso) { var d = new Date(iso + 'T12:00:00'); return isNaN(d) ? iso : d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); }
    function humanize(k) { var s = String(k).replace(/_/g, ' '); return s.charAt(0).toUpperCase() + s.slice(1); }
    function row(label, v) { return '<div><dt class="eyebrow">' + esc(label) + '</dt><dd class="text-ink-700 leading-snug break-words">' + esc(v) + '</dd></div>'; }
    function card(r) {
      var vi = verInfo[r.verification] || verInfo.unverified, st = P.status[vi.status];
      var passed = r.expires && new Date() > new Date(r.expires + 'T23:59:59');
      var links = Object.keys(r.links || {});
      return '<li class="plate p-5 flex flex-col" id="bp-' + esc(r.id) + '">' +
        '<div class="flex flex-wrap items-center gap-2 mb-2"><span class="' + st.cls + '">' + esc(vi.label) + '</span>' + (legalUnverified(r) ? '<span class="tag border-line bg-paper-200 text-stone-700">Legal form not verified</span>' : '') + (passed ? '<span class="tag border-line bg-paper-200 text-stone-700">Date has passed</span>' : '') + (r.community ? '<span class="tag border-verd/40 bg-verd-50 text-verd-700">Suggested by the community</span>' : '') + '</div>' +
        '<p class="eyebrow mb-1">' + esc(B.sections[r.section] || '') + '</p>' +
        '<h3 class="text-2xl leading-tight mb-2">' + ext(r.url, r.name, null, true) + '</h3>' +
        '<p class="text-sm text-ink-700 leading-relaxed mb-3">' + esc(r.what) + '</p>' +
        ((r.engage || []).length ? '<div class="mb-3"><p class="eyebrow mb-1">How to help</p><ul class="flex flex-wrap gap-1.5">' + r.engage.map(function (e) { return '<li class="tag border-line bg-paper-50 text-ink-700">' + esc(helpLabel[e] || humanize(e)) + '</li>'; }).join('') + '</ul></div>' : '') +
        '<dl class="text-sm space-y-2 mb-3">' +
          (r.scope ? row('Scope', r.scope) : '') + row('Legal form', r.legal_status || 'Not stated') + row('Where it sits', r.partisanship || 'Not stated') +
          row('Tax-deductible', r.tax_deductible || 'Not stated') + (r.cost ? row('Cost', r.cost) : '') + (r.status_2026 ? row('Status in 2026', r.status_2026) : '') + '</dl>' +
        (links.length ? '<div class="mb-3"><p class="eyebrow mb-1">Key links</p><ul class="text-sm flex flex-wrap gap-x-4 gap-y-1">' + links.map(function (k) { return '<li>' + ext(r.links[k], humanize(k)) + '</li>'; }).join('') + '</ul></div>' : '') +
        (r.notes ? '<p class="text-sm text-ink-700 leading-relaxed mb-3 break-words"><strong class="text-ink">Notes.</strong> ' + esc(r.notes) + '</p>' : '') +
        '<p class="text-xs text-stone-700 mb-1">Checked ' + esc(fmtDate(r.date_verified)) + '</p>' + (r.community && r.credit ? '<p class="text-xs text-stone-700 mb-1">Credit: <bdi translate="no">' + esc(r.credit) + '</bdi></p>' : '') +
        ((r.sources || []).length ? '<details class="text-xs mt-auto"><summary class="cursor-pointer min-h-[2.75rem] flex items-center text-lapis">Sources (' + r.sources.length + ')</summary><ul class="mt-1 space-y-1 break-words">' +
          r.sources.map(function (u) { return '<li>' + ext(u, u.replace(/^https?:\/\/(www\.)?/, '')) + '</li>'; }).join('') + '</ul></details>' : '') + '</li>';
    }
    function chipRow(sel, rowKey, keys, labelOf, counts) {
      $(sel).innerHTML = keys.map(function (k) {
        return '<button type="button" class="chip" data-bp-row="' + rowKey + '" data-bp-val="' + esc(k) + '" aria-pressed="' + (f[rowKey][k] ? 'true' : 'false') + '">' + esc(labelOf(k)) + ' <span class="font-mono text-xs">' + (counts[k] || 0) + '</span></button>';
      }).join('');
    }
    function draw(focus) {
      chipRow('#bp-section', 'section', secKeys, function (k) { return B.sections[k]; }, cSec);
      chipRow('#bp-help', 'help', helpKeys, function (k) { return helpLabel[k] || humanize(k); }, cHelp);
      chipRow('#bp-tax', 'tax', taxKeys, function (k) { return taxLabel[k]; }, cTax);
      chipRow('#bp-ver', 'ver', verKeys, function (k) { return verInfo[k].label; }, cVer);
      var rows = all.filter(match);
      $('#bp-count').textContent = 'Showing ' + rows.length + ' of ' + all.length + ' entries.';
      $('#bp-list').innerHTML = rows.length ? rows.map(card).join('') :
        '<li class="plate p-5 md:col-span-2 xl:col-span-3"><p class="text-sm text-ink-700 mb-3">No entries match these filters. Clear a filter or change the search.</p><div class="flex flex-wrap gap-2"><button type="button" class="btn-ghost" data-bp-clear>Clear filters</button><a class="btn-tonal" href="#suggest">Don’t see it? Suggest it</a></div></li>';
      if (focus) { var el = $('[data-bp-row="' + focus[0] + '"][data-bp-val="' + focus[1] + '"]'); if (el) el.focus(); }
    }
    function clearAll() { f = { q: '', section: {}, help: {}, tax: {}, ver: {} }; $('#bp-q').value = ''; draw(); $('#bp-q').focus(); }
    document.addEventListener('click', function (e) {
      var c = e.target.closest('[data-bp-row]');
      if (c) { var rk = c.getAttribute('data-bp-row'), v = c.getAttribute('data-bp-val'); if (f[rk][v]) delete f[rk][v]; else f[rk][v] = true; draw([rk, v]); return; }
      if (e.target.closest('#bp-clear') || e.target.closest('[data-bp-clear]')) clearAll();
    });
    $('#bp-q').addEventListener('input', function (e) { f.q = e.target.value; draw(); });

    /* hero */
    $('#bp-intro').innerHTML = B.intro.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
    $('#bp-how').textContent = B.how_to_read;
    $('#bp-badge-note').innerHTML = '<span aria-hidden="true" class="mt-1 w-3 h-3 shrink-0 bg-verd-50 border border-verd/40"></span><p>' + esc(B.badge_note) + '</p>';

    /* start here */
    $('#bp-start').innerHTML = B.start_here.map(function (s) {
      return '<li class="plate p-5 flex flex-col"><p class="font-serif text-4xl leading-none text-lapis mb-2" aria-hidden="true">' + s.n + '</p>' +
        '<h3 class="text-2xl leading-tight mb-2"><span class="sr-only">Step ' + s.n + ': </span>' + esc(s.title) + '</h3>' +
        '<p class="text-sm text-ink-700 leading-relaxed mb-3">' + esc(s.text) + '</p>' +
        (s.links.length ? '<ul class="mt-auto flex flex-wrap gap-x-4 gap-y-1 text-sm">' + s.links.map(function (l) { return '<li>' + ext(l.url, l.label) + '</li>'; }).join('') + '</ul>' : '') + '</li>';
    }).join('');

    /* data centers band */
    var dc = B.data_centers;
    $('#bp-dc').innerHTML = '<div class="grid grid-cols-1 lg:grid-cols-12 gap-10"><div class="lg:col-span-4"><p class="eyebrow !text-invaccent mb-2">03 · The local fight</p><h2 class="text-4xl !text-oninverse mb-4">' + esc(dc.title) + '</h2><p class="text-invmuted text-sm leading-relaxed">' + esc(dc.lede) + '</p></div>' +
      '<div class="lg:col-span-8"><ul class="space-y-3">' + dc.points.map(function (p) {
        return '<li class="flex gap-3 text-sm leading-relaxed text-invmuted"><span aria-hidden="true" class="text-invaccent">—</span><span>' + esc(p.text) + (p.link ? ' ' + ext(p.link.url, p.link.label, '!text-invaccent') : '') + '</span></li>';
      }).join('') + '</ul><p class="text-xs text-invmuted mt-4 leading-relaxed">' + esc(dc.note) + '</p></div></div>';

    /* Beautiful Trouble */
    var bt = B.beautiful_trouble;
    $('#bp-trouble').innerHTML =
      '<p class="text-ink-700 leading-relaxed max-w-prose2 mb-5">' + ext(bt.toolbox.url, bt.toolbox.label) + ' ' + esc(bt.intro) + '</p>' +
      '<div class="overflow-x-auto mb-6"><table class="w-full text-sm border border-paper-300"><caption class="text-start text-xs text-stone-700 pb-2">The five kinds of Beautiful Trouble entry, what each is, and what to use it for</caption>' +
      '<thead class="bg-paper-200"><tr><th scope="col" class="p-2 text-start">Type</th><th scope="col" class="p-2 text-start">What it is</th><th scope="col" class="p-2 text-start">Use it to</th></tr></thead><tbody>' +
      D.buildpower.beautiful_trouble_types.map(function (t) { return '<tr class="border-t border-paper-300 align-top"><th scope="row" class="p-2 text-start font-semibold">' + esc(t.type) + '</th><td class="p-2 text-ink-700">' + esc(t.what) + '</td><td class="p-2 text-ink-700">' + esc(t.use) + '</td></tr>'; }).join('') + '</tbody></table></div>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="plate p-5"><p class="text-sm text-ink-700 leading-relaxed mb-2">' + esc(bt.recommended_lede) + '</p><ul class="text-sm space-y-1 mb-3">' +
        bt.recommended.map(function (r) { return '<li>' + (r.url ? ext(r.url, r.name) : esc(r.name)) + (r.note ? ' <span class="text-ink-700">(' + esc(r.note) + ')</span>' : '') + '</li>'; }).join('') + '</ul>' +
        '<p class="text-sm text-ink-700 leading-relaxed mb-1">' + esc(bt.planning_lede) + ' ' + bt.planning.map(function (p) { return p.url ? ext(p.url, p.name) : esc(p.name); }).join(', ') + '.</p>' +
        '<p class="text-sm text-ink-700 leading-relaxed mt-3">' + esc(bt.fits) + '</p><p class="text-sm text-ink-700 leading-relaxed mt-3">' + esc(bt.extras) + '</p></div>' +
      '<div class="space-y-4"><div class="plate p-5"><p class="text-sm text-ink-700 leading-relaxed">' + ext(bt.solutions.url, bt.solutions.name, 'font-semibold') + ' ' + esc(bt.solutions.text) + '</p></div>' +
        '<div class="plate p-5"><p class="text-sm text-ink-700 leading-relaxed">' + ext(bt.pbp.url, bt.pbp.name, 'font-semibold') + ' ' + esc(bt.pbp.text) + '</p></div></div></div>';

    /* Start something: table from md up, stacked cards below */
    var ss = B.start_something;
    $('#bp-something').innerHTML =
      '<div class="hidden md:block"><table class="w-full text-sm border border-paper-300"><caption class="text-start text-xs text-stone-700 pb-2">What to start, the first step, a guide, and who can support you</caption>' +
      '<thead class="bg-paper-200"><tr><th scope="col" class="p-2 text-start">Start a…</th><th scope="col" class="p-2 text-start">First step</th><th scope="col" class="p-2 text-start">Guide</th><th scope="col" class="p-2 text-start">Support</th></tr></thead><tbody>' +
      ss.map(function (s) { return '<tr class="border-t border-paper-300 align-top"><th scope="row" class="p-2 text-start font-semibold">' + esc(s.start) + '</th><td class="p-2 text-ink-700">' + esc(s.first) + '</td><td class="p-2">' + ext(s.guide.url, s.guide.label) + '</td><td class="p-2 text-ink-700">' + esc(s.support) + '</td></tr>'; }).join('') + '</tbody></table></div>' +
      '<ul class="md:hidden space-y-3">' + ss.map(function (s) {
        return '<li class="plate p-4"><p class="font-semibold mb-1">Start a ' + esc(s.start.charAt(0).toLowerCase() + s.start.slice(1)) + '</p><dl class="text-sm space-y-1"><div><dt class="eyebrow">First step</dt><dd class="text-ink-700">' + esc(s.first) + '</dd></div><div><dt class="eyebrow">Guide</dt><dd>' + ext(s.guide.url, s.guide.label) + '</dd></div><div><dt class="eyebrow">Support</dt><dd class="text-ink-700">' + esc(s.support) + '</dd></div></dl></li>';
      }).join('') + '</ul>';

    /* Holding winners to their word */
    $('#bp-hold').innerHTML = B.hold_winners.map(function (h, i) {
      return '<li class="plate p-4 flex gap-4"><span aria-hidden="true" class="font-serif text-4xl leading-none w-8 flex-none text-lapis">' + (i + 1) + '</span><p class="self-center">' + esc(h.text) + (h.link ? '<a href="' + esc(h.link.href) + '">' + esc(h.link.text) + '</a>' + esc(h.after || '') : '') + '</p></li>';
    }).join('');

    draw();
  }

  /* ---------------- Init ---------------- */
  function fillData() {
    $$('[data-fill]').forEach(function (el) {
      var path = el.getAttribute('data-fill').split('.'); var v = D;
      path.forEach(function (p) { v = v == null ? v : v[p]; });
      if (v != null) el.textContent = v;
    });
  }
  function init() {
    buildMore();
    fillData();
    $$('[data-sources]').forEach(function (ul) {
      var sec = D[ul.getAttribute('data-sources')];
      ul.innerHTML = (sec && sec.sources || []).map(function (x) { return '<li><a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.label) + '</a></li>'; }).join('');
    });
    renderWave(); renderFurther(); bindGrid(); renderGrid(); renderMatrix(); renderVault(); renderInsights(); renderMayors();
    $$('[data-model]').forEach(function (b) { b.addEventListener('click', function () { renderGov(b.getAttribute('data-model')); }); });
    renderGov('cm');
    buildStack();
    $$('[data-scn]').forEach(function (b) { b.addEventListener('click', function () { loadScenario(b.getAttribute('data-scn')); }); });
    loadScenario(Object.keys(D.rcv.scenarios)[0]);
    registerCharts();
    renderProvenance();
    renderBuild();
    $$('[data-open-export]').forEach(function (b) { b.addEventListener('click', function () { lastFocus = b; setExport(b.getAttribute('data-open-export') || 'all'); openModal('#export-modal'); }); });
    $$('[data-exp]').forEach(function (b) { b.addEventListener('click', function () { setExport(b.getAttribute('data-exp')); }); });
    $('#exp-copy').addEventListener('click', function (e) { copyText($('#exp-text').value, e.currentTarget); });
    $('#exp-dl').addEventListener('click', download);
    route(false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
