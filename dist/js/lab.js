/* Insights and Lab: six private exercises. Everything stays in this browser (localStorage, wrapped in try/catch).
   No network calls and no model calls. Data lives in data-lab.js. */
(function () {
  'use strict';
  var D = window.MOSAIC, L = D && D.insightsLab;
  if (!L || !document.getElementById('lab-claims')) return;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); };
  var KEY = 'mosaic:lab:state';
  function load() { try { var v = localStorage.getItem(KEY); return v ? JSON.parse(v) : {}; } catch (e) { return {}; } }
  var S = load();
  var saveTimer = 0;
  function save() { clearTimeout(saveTimer); saveTimer = setTimeout(function () { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }, 150); }
  function say(msg) { var s = $('#lab-status'); if (s) s.textContent = msg; }
  function sect(k) { if (!S[k]) S[k] = {}; return S[k]; }
  function link(u, t) { return '<a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(t) + '</a>'; }
  var FIELD = 'field';
  var AREA = 'field py-2';

  /* ---------- Lab 1: claim clinic ---------- */
  var VL = L.verdictLabels;
  function renderClaims() {
    var st = sect('claims'), shown = 0, match = 0;
    var html = L.claims.map(function (c, n) {
      var s = st[c.id] || {}, name = 'cl-' + c.id;
      if (s.revealed) { shown++; if (s.verdict === c.verdict) match++; }
      var opts = Object.keys(VL).map(function (k) {
        return '<label class="flex items-center gap-2 min-h-[2.5rem]"><input type="radio" name="' + name + '" value="' + k + '"' + (s.verdict === k ? ' checked' : '') + (s.revealed ? ' disabled' : '') + ' data-claim="' + c.id + '"> <span>' + esc(VL[k]) + '</span></label>';
      }).join('');
      var reveal = s.revealed ? '<div class="lens mt-3"><p class="eyebrow text-ochre-700 mb-1">What we found: ' + esc(VL[c.verdict]) + (s.verdict === c.verdict ? ' (you matched)' : ' (you said: ' + esc(VL[s.verdict] || 'no answer') + ')') + '</p><p class="text-sm">' + esc(c.finding) + '</p><p class="text-sm mt-2"><span class="font-semibold">A good first check:</span> ' + esc(c.check) + '</p><p class="text-xs mt-2">Source: ' + link(c.url, c.src) + '</p></div>' : '';
      return '<fieldset class="border border-paper-300 rounded-sm p-4"><legend class="px-1 font-mono text-xs text-stone-700">Claim ' + (n + 1) + ' of ' + L.claims.length + '</legend>' +
        '<p class="font-serif text-lg leading-snug">“' + esc(c.claim) + '”</p>' +
        '<div class="grid sm:grid-cols-2 gap-x-6 mt-2 text-sm">' + opts + '</div>' +
        '<label class="block mt-2 text-sm"><span class="font-semibold">The first check I would make</span><input type="text" class="' + FIELD + ' mt-1" data-claim-check="' + c.id + '" value="' + esc(s.check || '') + '"' + (s.revealed ? ' disabled' : '') + '></label>' +
        (s.revealed ? '' : '<button type="button" class="btn-ghost mt-3" data-reveal="' + c.id + '">Reveal what we found</button>') +
        '<div aria-live="polite">' + reveal + '</div></fieldset>';
    }).join('');
    html += '<p class="text-sm text-ink-700" id="claims-score">' + (shown ? 'You matched our verdict on ' + match + ' of ' + shown + ' claims you revealed. Matching is not the goal: what matters is the check you chose first.' : 'Pick a verdict for each claim, write your first check, then reveal.') + '</p>';
    $('#lab-claims').innerHTML = html;
  }
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.matches && t.matches('[data-claim]')) { var st = sect('claims'); (st[t.getAttribute('data-claim')] = st[t.getAttribute('data-claim')] || {}).verdict = t.value; save(); }
  });
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches && t.matches('[data-claim-check]')) { var st = sect('claims'), id = t.getAttribute('data-claim-check'); (st[id] = st[id] || {}).check = t.value; save(); }
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-reveal]') : null;
    if (!b) return;
    var id = b.getAttribute('data-reveal'), st = sect('claims'); st[id] = st[id] || {};
    if (!st[id].verdict) { say('Pick a verdict first, then reveal.'); var f = $('[name="cl-' + id + '"]'); if (f) f.focus(); return; }
    st[id].revealed = true; save(); renderClaims(); say('Revealed.');
    var again = $('[name="cl-' + id + '"]'); if (again && again.closest('fieldset')) again.closest('fieldset').scrollIntoView({ block: 'nearest' });
  });

  /* ---------- Lab 2: turnout or persuasion ---------- */
  var T = L.turnout;
  function margin(td, tr, cross) {
    var E = 50, d = T.defect;
    var vd = E * td / 100, vr = E * tr / 100;
    var dem = vd * (1 - d / 100) + vr * cross / 100, rep = vd * d / 100 + vr * (1 - cross / 100);
    return { m: (dem - rep) / (dem + rep) * 100, share: dem / (dem + rep) * 100, cast: vd + vr };
  }
  function fmtM(x) { var r = Math.round(Math.abs(x) * 10) / 10; return r === 0 ? 'Tied' : (x > 0 ? 'D+' : 'R+') + r.toFixed(1); }
  function fmtD(x) { var r = Math.round(x * 10) / 10; return (r > 0 ? '+' : r < 0 ? '−' : '') + Math.abs(r).toFixed(1); }
  function turnoutState() { var s = sect('turnout'); if (s.td == null) { s.td = T.baseline.td; s.tr = T.baseline.tr; s.cross = T.baseline.cross; } return s; }
  function renderTurnout() {
    var s = turnoutState();
    var dial = function (id, label, min, max, val, help) {
      return '<div><label for="' + id + '" class="font-semibold text-sm">' + label + ': <output id="' + id + '-o" class="font-mono">' + val + '%</output></label><input id="' + id + '" type="range" min="' + min + '" max="' + max + '" step="1" value="' + val + '" class="w-full" data-dial="' + id + '"><p class="text-xs text-stone-700">' + help + '</p></div>';
    };
    $('#lab-turnout').innerHTML =
      '<p class="text-sm text-ink-700">A toy district: 100 eligible voters, half leaning Democratic and half leaning Republican. A fixed 5 in 100 Democratic-leaning voters vote Republican. Move the three dials, or load a story, and watch the margin. It uses round invented numbers and is not a forecast or a measurement of 2026.</p>' +
      '<div class="flex flex-wrap gap-2 mt-2" role="group" aria-label="Load a story">' + T.presets.map(function (p) { return '<button type="button" class="btn-ghost" data-preset="' + p.id + '">' + esc(p.label) + '</button>'; }).join('') + '</div>' +
      '<p class="text-sm mt-2" id="t-note" aria-live="polite"></p>' +
      '<div class="grid md:grid-cols-3 gap-5 mt-3">' +
      dial('d-td', 'Democratic-leaning turnout', 30, 90, s.td, 'Share of that group who vote.') +
      dial('d-tr', 'Republican-leaning turnout', 30, 90, s.tr, 'Share of that group who vote.') +
      dial('d-cross', 'Republican-leaning voters who cross over', 0, 25, s.cross, 'Of those who vote, how many pick the Democrat.') + '</div>' +
      '<div class="mt-4" id="t-out"></div>' +
      '<p class="text-xs text-stone-700 mt-3">' + esc(T.reality) + ' ' + link('https://www.brookings.edu/articles/how-democrats-won-big-and-why-2028-remains-an-open-question/', 'Brookings') + '</p>' +
      '<label class="block mt-3 text-sm"><span class="font-semibold">What does this toy model leave out?</span><textarea rows="3" class="' + AREA + ' mt-1" data-field="turnout.note" placeholder="Who is missing from a two-group model? What would a real study need?">' + esc(s.note || '') + '</textarea></label>';
    updateTurnout();
  }
  function updateTurnout() {
    var s = turnoutState(), b = T.baseline;
    var now = margin(s.td, s.tr, s.cross), base = margin(b.td, b.tr, b.cross);
    var onlyTurn = margin(s.td, s.tr, b.cross), onlyCross = margin(b.td, b.tr, s.cross);
    var share = Math.max(0, Math.min(100, now.share));
    $('#t-out').innerHTML =
      '<div class="plate p-4"><p class="font-serif text-4xl">' + fmtM(now.m) + '</p><p class="text-sm text-ink-700">Democratic share of the two-party vote: ' + now.share.toFixed(1) + '%. Votes cast: ' + now.cast.toFixed(1) + ' of 100 eligible.</p>' +
      '<div class="mt-2 h-4 w-full rounded-sm overflow-hidden flex border border-line" role="img" aria-label="Democratic ' + now.share.toFixed(1) + ' percent, Republican ' + (100 - now.share).toFixed(1) + ' percent of the two-party vote"><div class="bg-lapis" style="width:' + share.toFixed(1) + '%"></div><div class="bg-terra" style="width:' + (100 - share).toFixed(1) + '%"></div></div>' +
      '<table class="w-full text-sm mt-3 border-collapse"><caption class="sr-only">Change in margin compared with the starting electorate</caption><tbody>' +
      '<tr><th scope="row" class="text-left p-1 border-b border-paper-300 font-normal">Starting electorate</th><td class="p-1 border-b border-paper-300 font-mono">' + fmtM(base.m) + '</td></tr>' +
      '<tr><th scope="row" class="text-left p-1 border-b border-paper-300 font-normal">Change from turnout alone</th><td class="p-1 border-b border-paper-300 font-mono">' + fmtD(onlyTurn.m - base.m) + ' points</td></tr>' +
      '<tr><th scope="row" class="text-left p-1 border-b border-paper-300 font-normal">Change from crossover alone</th><td class="p-1 border-b border-paper-300 font-mono">' + fmtD(onlyCross.m - base.m) + ' points</td></tr>' +
      '<tr><th scope="row" class="text-left p-1 font-semibold">Total change</th><td class="p-1 font-mono font-semibold">' + fmtD(now.m - base.m) + ' points</td></tr></tbody></table>' +
      '<p class="text-xs text-stone-700 mt-2">The two parts do not add up exactly, because turnout and crossover act on each other.</p></div>';
  }
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (!(t.matches && t.matches('[data-dial]'))) return;
    var s = turnoutState(), k = { 'd-td': 'td', 'd-tr': 'tr', 'd-cross': 'cross' }[t.getAttribute('data-dial')];
    s[k] = Number(t.value); var o = $('#' + t.id + '-o'); if (o) o.textContent = t.value + '%';
    var n = $('#t-note'); if (n) n.textContent = '';
    updateTurnout(); save();
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-preset]') : null;
    if (!b) return;
    var p = T.presets.filter(function (x) { return x.id === b.getAttribute('data-preset'); })[0]; if (!p) return;
    var s = turnoutState(); s.td = p.td; s.tr = p.tr; s.cross = p.cross; save();
    var keep = s.note; renderTurnout(); var n = $('#t-note'); if (n) n.textContent = p.note; s.note = keep;
  });

  /* ---------- Lab 3: analysis of competing hypotheses ---------- */
  var RATE = { C: 'Fits', I: 'Conflicts', N: 'Can’t tell' };
  function tally(getter) {
    var out = {};
    L.hypotheses.forEach(function (h) { out[h.id] = { C: 0, I: 0, N: 0, blank: 0 }; });
    L.evidence.forEach(function (ev) { L.hypotheses.forEach(function (h) { var r = getter(ev, h); if (r) out[h.id][r]++; else out[h.id].blank++; }); });
    return out;
  }
  function renderAch() {
    var st = sect('ach'); st.r = st.r || {};
    var cards = L.evidence.map(function (ev, n) {
      var sel = L.hypotheses.map(function (h) {
        var cur = (st.r[ev.id] || {})[h.id] || '';
        return '<label class="block text-xs"><span class="block text-stone-700">' + esc(h.label) + '</span><select class="' + FIELD + ' text-sm" data-ach="' + ev.id + '|' + h.id + '"><option value="">Not rated</option>' +
          Object.keys(RATE).map(function (k) { return '<option value="' + k + '"' + (cur === k ? ' selected' : '') + '>' + RATE[k] + '</option>'; }).join('') + '</select></label>';
      }).join('');
      return '<fieldset class="border border-paper-300 rounded-sm p-3"><legend class="px-1 font-mono text-xs text-stone-700">Evidence ' + (n + 1) + ' · ' + link(ev.url, ev.src) + '</legend><p class="text-sm">' + esc(ev.text) + '</p><div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">' + sel + '</div></fieldset>';
    }).join('');
    $('#lab-ach').innerHTML =
      '<p class="text-sm text-ink-700">Analysts use a method called analysis of competing hypotheses. List the explanations, then go through the evidence one item at a time and ask of each: does it <em>fit</em>, <em>conflict with</em>, or <em>fail to tell apart</em> each explanation? The key move is to count conflicts, not fits. One solid conflict can rule an explanation out; many fits can come from evidence every explanation would predict. Rate each item below; skip any you cannot judge.</p>' +
      '<div class="space-y-3 mt-3">' + cards + '</div>' +
      '<div id="ach-sum" class="mt-4" aria-live="polite"></div>' +
      '<div class="flex flex-wrap gap-2 mt-3"><button type="button" class="btn-ink" id="ach-reveal">' + (st.revealed ? 'Hide our reading' : 'Compare with our reading') + '</button></div>' +
      '<div id="ach-ours" class="mt-3"></div>' +
      '<label class="block mt-3 text-sm"><span class="font-semibold">One new piece of evidence that would change my ranking</span><textarea rows="3" class="' + AREA + ' mt-1" data-field="ach.change" placeholder="What would you look for, and where?">' + esc(st.change || '') + '</textarea></label>';
    updateAch();
  }
  function achTable(counts, title) {
    return '<table class="w-full text-sm border-collapse"><caption class="text-left font-semibold mb-1">' + esc(title) + '</caption><thead><tr class="text-left"><th scope="col" class="p-1 border-b border-paper-300">Explanation</th><th scope="col" class="p-1 border-b border-paper-300">Fits</th><th scope="col" class="p-1 border-b border-paper-300">Conflicts</th></tr></thead><tbody>' +
      L.hypotheses.map(function (h) { var c = counts[h.id]; return '<tr><th scope="row" class="text-left p-1 border-b border-paper-300 font-normal">' + esc(h.label) + '</th><td class="p-1 border-b border-paper-300 font-mono">' + c.C + '</td><td class="p-1 border-b border-paper-300 font-mono">' + c.I + '</td></tr>'; }).join('') + '</tbody></table>';
  }
  function updateAch() {
    var st = sect('ach'); st.r = st.r || {};
    var mine = tally(function (ev, h) { return (st.r[ev.id] || {})[h.id] || ''; });
    var any = L.hypotheses.some(function (h) { return mine[h.id].C + mine[h.id].I > 0; });
    $('#ach-sum').innerHTML = any ? achTable(mine, 'Your counts so far') : '<p class="text-sm text-stone-700">Your counts will appear here as you rate.</p>';
    var box = $('#ach-ours');
    if (!st.revealed) { box.innerHTML = ''; return; }
    var ours = tally(function (ev, h) { return ev.ours[h.id]; });
    var maxI = Math.max.apply(null, L.hypotheses.map(function (h) { return ours[h.id].I; }));
    var quote = function (h) { return '“' + h.label + '”'; };
    var most = L.hypotheses.filter(function (h) { return ours[h.id].I === maxI; }).map(quote);
    var none = L.hypotheses.filter(function (h) { return ours[h.id].I === 0; }).map(quote);
    var diff = 0, total = 0;
    L.evidence.forEach(function (ev) { L.hypotheses.forEach(function (h) { var r = (st.r[ev.id] || {})[h.id]; if (r) { total++; if (r !== ev.ours[h.id]) diff++; } }); });
    box.innerHTML = '<div class="lens"><p class="eyebrow text-ochre-700 mb-1">Our reading (open to dispute)</p>' + achTable(ours, 'Our counts') +
      '<p class="text-sm mt-2">No explanation is eliminated, and none is proven. The most conflicts (' + maxI + ' each) fall on ' + most.join(' and ') + '. ' + (none.length === 1 ? 'One has' : none.length + ' have') + ' no conflicts (' + none.join(' and ') + '), but ' + (none.length === 1 ? 'it rests' : 'each rests') + ' on a single item, so “not contradicted” means “not yet tested,” not “confirmed.” Most evidence here does not tell the explanations apart, which is why serious analysts keep several alive and name what would separate them.</p>' +
      '<p class="text-sm mt-2">' + (total ? 'You differed from us on ' + diff + ' of the ' + total + ' cells you rated. A difference is not an error: look at each one and ask which of you is reading the evidence more carefully.' : 'Rate some items to see where you differ.') + '</p></div>';
  }
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (!(t.matches && t.matches('[data-ach]'))) return;
    var p = t.getAttribute('data-ach').split('|'), st = sect('ach'); st.r = st.r || {};
    (st.r[p[0]] = st.r[p[0]] || {})[p[1]] = t.value; save(); updateAch();
  });
  document.addEventListener('click', function (e) {
    if (e.target.id !== 'ach-reveal') return;
    var st = sect('ach'); st.revealed = !st.revealed; save(); e.target.textContent = st.revealed ? 'Hide our reading' : 'Compare with our reading'; updateAch();
  });

  /* ---------- Lab 4: power map ---------- */
  function mapState() {
    var s = sect('map');
    if (!s.rows) { s.issue = L.mapExample.issue; s.rows = JSON.parse(JSON.stringify(L.mapExample.rows)); s.example = true; }
    return s;
  }
  function optsHtml(list, cur) { return list.map(function (o) { return '<option' + (o === cur ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join(''); }
  function numOpts(cur) { return [1, 2, 3, 4, 5].map(function (n) { return '<option value="' + n + '"' + (Number(cur) === n ? ' selected' : '') + '>' + n + '</option>'; }).join(''); }
  function renderMap() {
    var s = mapState();
    var rows = s.rows.map(function (r, i) {
      return '<fieldset class="border border-paper-300 rounded-sm p-3"><legend class="px-1 font-mono text-xs text-stone-700">Decision-maker ' + (i + 1) + '</legend><div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">' +
        '<label class="block text-xs sm:col-span-2"><span class="block text-stone-700">Who or what body</span><input type="text" class="' + FIELD + '" data-map="' + i + '|name" value="' + esc(r.name) + '"></label>' +
        '<label class="block text-xs"><span class="block text-stone-700">Level</span><select class="' + FIELD + '" data-map="' + i + '|level">' + optsHtml(L.mapLevels, r.level) + '</select></label>' +
        '<label class="block text-xs"><span class="block text-stone-700">How they get the job</span><select class="' + FIELD + '" data-map="' + i + '|how">' + optsHtml(L.mapSelected, r.how) + '</select></label>' +
        '<label class="block text-xs"><span class="block text-stone-700">Power over this issue (1 low, 5 high)</span><select class="' + FIELD + '" data-map="' + i + '|power">' + numOpts(r.power) + '</select></label>' +
        '<label class="block text-xs"><span class="block text-stone-700">How easily I can reach them (1 hard, 5 easy)</span><select class="' + FIELD + '" data-map="' + i + '|reach">' + numOpts(r.reach) + '</select></label>' +
        '<label class="block text-xs sm:col-span-2"><span class="block text-stone-700">Who they listen to</span><input type="text" class="' + FIELD + '" data-map="' + i + '|listens" value="' + esc(r.listens) + '"></label>' +
        '</div><button type="button" class="btn-ghost mt-2" data-map-del="' + i + '">Remove this row</button></fieldset>';
    }).join('');
    $('#lab-map').innerHTML =
      '<p class="text-sm text-ink-700">Pick one issue where you live. List who can say yes or no, who can be pressured, and who they listen to. Rate each on how much power they have over the issue and how easily you could reach them. The grid sorts them into where to start. A worked example is loaded; edit it or start blank.</p>' +
      '<label class="block mt-3 text-sm"><span class="font-semibold">The issue</span><input type="text" class="' + FIELD + ' mt-1" data-map-issue value="' + esc(s.issue) + '"></label>' +
      (s.example ? '<p class="text-xs text-stone-700 mt-2">' + esc(L.mapExample.note) + '</p>' : '') +
      '<div class="space-y-3 mt-3">' + rows + '</div>' +
      '<div class="flex flex-wrap gap-2 mt-3"><button type="button" class="btn-ghost" id="map-add"' + (s.rows.length >= 12 ? ' disabled' : '') + '>Add a row</button><button type="button" class="btn-ghost" id="map-blank">Start blank</button><button type="button" class="btn-ghost" id="map-example">Reload the example</button></div>' +
      '<div id="map-quads" class="mt-4" aria-live="polite"></div>';
    updateQuads();
  }
  function updateQuads() {
    var s = mapState();
    var q = { start: [], bridge: [], build: [], park: [] };
    s.rows.forEach(function (r) {
      if (!String(r.name).trim()) return;
      var hiP = Number(r.power) >= 4, hiR = Number(r.reach) >= 4;
      (hiP && hiR ? q.start : hiP ? q.bridge : hiR ? q.build : q.park).push(r);
    });
    var box = function (title, sub, list) {
      return '<div class="plate p-3"><p class="font-semibold text-sm">' + title + '</p><p class="text-xs text-stone-700 mb-1">' + sub + '</p>' +
        (list.length ? '<ul class="text-sm list-disc ps-5">' + list.map(function (r) { return '<li>' + esc(r.name) + ' <span class="text-stone-700">(' + esc(r.how.toLowerCase()) + ', ' + esc(r.level.toLowerCase()) + ')</span></li>'; }).join('') + '</ul>' : '<p class="text-sm text-stone-700">None yet.</p>') + '</div>';
    };
    $('#map-quads').innerHTML = '<div class="grid md:grid-cols-2 gap-3">' +
      box('Start here', 'High power, and you can reach them', q.start) +
      box('Find a bridge', 'High power, hard to reach. Who do you know who knows them?', q.bridge) +
      box('Build with them', 'Less power, easy to reach. Good allies and early practice.', q.build) +
      box('Park for now', 'Low power and hard to reach', q.park) + '</div>' +
      '<label class="block mt-3 text-sm"><span class="font-semibold">My first move</span><textarea rows="3" class="' + AREA + ' mt-1" data-field="map.first" placeholder="One person or body from ‘Start here’, one specific ask, one date.">' + esc(s.first || '') + '</textarea></label>';
  }
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches && t.matches('[data-map-issue]')) { var s = mapState(); s.issue = t.value; s.example = false; save(); return; }
    if (t.matches && t.matches('[data-map]') && t.tagName === 'INPUT') { var p = t.getAttribute('data-map').split('|'); mapState().rows[Number(p[0])][p[1]] = t.value; mapState().example = false; save(); updateQuads(); }
  });
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.matches && t.matches('[data-map]') && t.tagName === 'SELECT') { var p = t.getAttribute('data-map').split('|'); mapState().rows[Number(p[0])][p[1]] = t.value; mapState().example = false; save(); updateQuads(); }
  });
  document.addEventListener('click', function (e) {
    var t = e.target, s;
    if (t.id === 'map-add') { s = mapState(); if (s.rows.length < 12) { s.rows.push({ name: '', level: 'City', how: 'Elected', power: 3, reach: 3, listens: '' }); s.example = false; save(); renderMap(); var ins = $$('[data-map$="|name"]'); if (ins.length) ins[ins.length - 1].focus(); } }
    else if (t.id === 'map-blank') { s = sect('map'); s.issue = ''; s.rows = [{ name: '', level: 'City', how: 'Elected', power: 3, reach: 3, listens: '' }]; s.example = false; s.first = ''; save(); renderMap(); say('Started blank.'); }
    else if (t.id === 'map-example') { var m = sect('map'); delete m.rows; m.first = ''; save(); renderMap(); say('Example reloaded.'); }
    else if (t.getAttribute && t.getAttribute('data-map-del') != null) { s = mapState(); s.rows.splice(Number(t.getAttribute('data-map-del')), 1); if (!s.rows.length) s.rows.push({ name: '', level: 'City', how: 'Elected', power: 3, reach: 3, listens: '' }); s.example = false; save(); renderMap(); }
  });

  /* ---------- Lab 5: five conversations ---------- */
  function snowState() {
    var s = sect('snow');
    if (!s.people) { s.people = []; for (var i = 0; i < 5; i++) s.people.push({ who: '', common: '', ask: '', when: '', status: L.snowStatus[0], more: false }); }
    return s;
  }
  function renderSnow() {
    var s = snowState();
    var story = [['self', 'Story of self', 'Why you care. One moment that shaped it, in three or four sentences.'], ['us', 'Story of us', 'What you and the people you will ask share: a place, a worry, a hope.'], ['now', 'Story of now', 'What is at stake this year, and the specific thing you are asking people to do.']].map(function (a) {
      return '<label class="block text-sm"><span class="font-semibold">' + a[1] + '</span><span class="block text-xs text-stone-700">' + a[2] + '</span><textarea rows="3" class="' + AREA + ' mt-1" data-field="snow.story.' + a[0] + '">' + esc(((s.story || {})[a[0]]) || '') + '</textarea></label>';
    }).join('');
    var people = s.people.map(function (p, i) {
      return '<fieldset class="border border-paper-300 rounded-sm p-3"><legend class="px-1 font-mono text-xs text-stone-700">Person ' + (i + 1) + '</legend><div class="grid sm:grid-cols-2 gap-2">' +
        '<label class="block text-xs"><span class="block text-stone-700">Who (a first name or initials is enough)</span><input type="text" class="' + FIELD + '" data-snow="' + i + '|who" value="' + esc(p.who) + '"></label>' +
        '<label class="block text-xs"><span class="block text-stone-700">What we share</span><input type="text" class="' + FIELD + '" data-snow="' + i + '|common" value="' + esc(p.common) + '"></label>' +
        '<label class="block text-xs"><span class="block text-stone-700">My specific ask</span><input type="text" class="' + FIELD + '" data-snow="' + i + '|ask" value="' + esc(p.ask) + '" placeholder="Come to one meeting; sign this; bring one friend"></label>' +
        '<label class="block text-xs"><span class="block text-stone-700">By when</span><input type="text" class="' + FIELD + '" data-snow="' + i + '|when" value="' + esc(p.when) + '"></label>' +
        '<label class="block text-xs"><span class="block text-stone-700">Where it stands</span><select class="' + FIELD + '" data-snow="' + i + '|status">' + optsHtml(L.snowStatus, p.status) + '</select></label>' +
        '<label class="flex items-center gap-2 text-sm min-h-[2.75rem] mt-3"><input type="checkbox" data-snow-more="' + i + '"' + (p.more ? ' checked' : '') + '> <span>I asked them to bring one more person</span></label>' +
        '</div></fieldset>';
    }).join('');
    $('#lab-snow').innerHTML =
      '<p class="text-sm text-ink-700">Organizer Marshall Ganz teaches that people join through stories and through relationships, not slogans. His public narrative has three parts (self, us, now). His “snowflake” structure grows a group by asking each person to recruit others and lead them. Fill in your three stories, then plan five real conversations and a specific ask for each. Mark them as you do them. Names stay in this browser only.</p>' +
      '<div class="grid md:grid-cols-3 gap-3 mt-3">' + story + '</div>' +
      '<div class="space-y-3 mt-4">' + people + '</div>' +
      '<p class="text-sm mt-3 font-semibold" id="snow-sum" aria-live="polite"></p>' +
      '<p class="text-xs text-stone-700 mt-1">Why five and a specific ask: one 2018 experiment review found that most campaign contact does not change minds in general elections (Kalla and Broockman), while a trained, nonjudgmental conversation can (Broockman and Kalla, 2016). A relationship and a clear ask are what you control.</p>';
    updateSnow();
  }
  function updateSnow() {
    var s = snowState(), asked = 0, yes = 0, more = 0;
    s.people.forEach(function (p) { if (p.status !== L.snowStatus[0]) asked++; if (p.status === 'Said yes') yes++; if (p.more) more++; });
    var el = $('#snow-sum'); if (el) el.textContent = 'Asked: ' + asked + ' of 5 · said yes: ' + yes + ' · asked to bring one more: ' + more;
  }
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches && t.matches('[data-snow]') && t.tagName === 'INPUT') { var p = t.getAttribute('data-snow').split('|'); snowState().people[Number(p[0])][p[1]] = t.value; save(); }
  });
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.matches && t.matches('[data-snow]') && t.tagName === 'SELECT') { var p = t.getAttribute('data-snow').split('|'); snowState().people[Number(p[0])][p[1]] = t.value; save(); updateSnow(); }
    if (t.matches && t.matches('[data-snow-more]')) { snowState().people[Number(t.getAttribute('data-snow-more'))].more = t.checked; save(); updateSnow(); }
  });

  /* ---------- Lab 6: calendar ---------- */
  function renderCal() {
    var s = sect('cal'); s.w = s.w || {};
    var anchors = '<ol class="space-y-2">' + L.calendar.map(function (a) { return '<li class="text-sm"><span class="font-semibold">' + esc(a.when) + '.</span> ' + esc(a.what) + ' <span class="text-xs text-stone-700">(' + link(a.url, a.src) + ')</span></li>'; }).join('') + '</ol>';
    var wins = L.calWindows.map(function (w) {
      var v = s.w[w.id] || {};
      return '<fieldset class="border border-paper-300 rounded-sm p-3"><legend class="px-1 font-semibold text-sm">' + esc(w.label) + '</legend><div class="grid sm:grid-cols-2 gap-2">' +
        '<label class="block text-xs"><span class="block text-stone-700">My one action</span><input type="text" class="' + FIELD + '" data-cal="' + w.id + '|act" value="' + esc(v.act || '') + '"></label>' +
        '<label class="block text-xs"><span class="block text-stone-700">Who does it with me</span><input type="text" class="' + FIELD + '" data-cal="' + w.id + '|with" value="' + esc(v.with || '') + '"></label></div></fieldset>';
    }).join('');
    $('#lab-cal').innerHTML =
      '<p class="text-sm text-ink-700">Elections are the visible part. Between them, officials set budgets, boards vote, and agencies write rules. Here are the dates we could confirm, then four windows to fill with one action each. Keep each small enough that you will do it.</p>' +
      '<div class="mt-3">' + anchors + '</div><div class="space-y-3 mt-3">' + wins + '</div>';
  }
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches && t.matches('[data-cal]')) { var p = t.getAttribute('data-cal').split('|'), s = sect('cal'); s.w = s.w || {}; (s.w[p[0]] = s.w[p[0]] || {})[p[1]] = t.value; save(); }
    if (t.matches && t.matches('[data-field]')) {
      var path = t.getAttribute('data-field').split('.'), o = sect(path[0]);
      for (var i = 1; i < path.length - 1; i++) { o[path[i]] = o[path[i]] || {}; o = o[path[i]]; }
      o[path[path.length - 1]] = t.value; save();
    }
  });

  /* ---------- Export, download, clear ---------- */
  function exportMd() {
    var out = ['# My lab notes: Insights and Lab', '', '_From The Representation Mosaic (' + (D.meta && D.meta.url || '') + '). Facts checked as of ' + L.asOf + '. These notes are your own words and your own choices._', ''];
    var cl = sect('claims');
    out.push('## Lab 1: Claim clinic', '');
    L.claims.forEach(function (c) { var s = cl[c.id] || {}; out.push('- “' + c.claim + '” Your verdict: ' + (VL[s.verdict] || 'none') + '. First check: ' + (s.check || 'none') + '.' + (s.revealed ? ' We found: ' + VL[c.verdict] + '. ' + c.finding : '')); });
    var t = turnoutState(), n = margin(t.td, t.tr, t.cross), b = margin(T.baseline.td, T.baseline.tr, T.baseline.cross);
    out.push('', '## Lab 2: Turnout or persuasion (toy model)', '', 'Democratic-leaning turnout ' + t.td + '%, Republican-leaning turnout ' + t.tr + '%, crossover ' + t.cross + '%. Margin ' + fmtM(n.m) + ' (start ' + fmtM(b.m) + ', change ' + fmtD(n.m - b.m) + ' points).', 'What the model leaves out: ' + (t.note || 'not answered'));
    var a = sect('ach'); a.r = a.r || {};
    var mine = tally(function (ev, h) { return (a.r[ev.id] || {})[h.id] || ''; });
    out.push('', '## Lab 3: Competing explanations', '', '| Explanation | Fits | Conflicts |', '|---|---|---|');
    L.hypotheses.forEach(function (h) { out.push('| ' + h.label + ' | ' + mine[h.id].C + ' | ' + mine[h.id].I + ' |'); });
    out.push('', 'New evidence that would change my ranking: ' + (a.change || 'not answered'));
    var m = mapState();
    out.push('', '## Lab 4: Power map', '', 'Issue: ' + (m.issue || 'not set'), '', '| Who | Level | How they get the job | Power | Reach | Who they listen to |', '|---|---|---|---|---|---|');
    m.rows.forEach(function (r) { if (String(r.name).trim()) out.push('| ' + [r.name, r.level, r.how, r.power, r.reach, r.listens].map(function (x) { return String(x).replace(/\|/g, '/'); }).join(' | ') + ' |'); });
    out.push('', 'My first move: ' + (m.first || 'not answered'));
    var s = snowState(), st = s.story || {};
    out.push('', '## Lab 5: Five conversations', '', 'Story of self: ' + (st.self || ''), '', 'Story of us: ' + (st.us || ''), '', 'Story of now: ' + (st.now || ''), '');
    s.people.forEach(function (p, i) { out.push((i + 1) + '. ' + (p.who || '(no name)') + ' · shared: ' + (p.common || '') + ' · ask: ' + (p.ask || '') + ' · by: ' + (p.when || '') + ' · ' + p.status + (p.more ? ' · asked to bring one more' : '')); });
    var c = sect('cal'); c.w = c.w || {};
    out.push('', '## Lab 6: Calendar', '');
    L.calWindows.forEach(function (w) { var v = c.w[w.id] || {}; out.push('- ' + w.label + ': ' + (v.act || 'no action yet') + (v.with ? ' (with ' + v.with + ')' : '')); });
    out.push('', '## Reflection prompts', '');
    (D.lab || []).forEach(function (l) { var v = ''; try { var r = localStorage.getItem('mosaic:note:' + l.id); v = r ? JSON.parse(r) : ''; } catch (err) {} out.push('### ' + l.title, '', v || 'not answered', ''); });
    return out.join('\n');
  }
  function flush() { clearTimeout(saveTimer); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function copy(txt, done) {
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(done, fb); else fb();
    function fb() { var ta = document.createElement('textarea'); ta.value = txt; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta); if (ok) done(); else say('Copy was blocked. Use “Download as a text file” instead.'); }
  }
  var clearArmed = 0;
  document.addEventListener('click', function (e) {
    var id = e.target.id;
    if (id === 'lab-export') { flush(); copy(exportMd(), function () { say('Copied your lab notes to the clipboard.'); }); }
    else if (id === 'lab-download') {
      flush(); var blob = new Blob([exportMd()], { type: 'text/markdown;charset=utf-8' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'my-lab-notes.md'; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0); say('Downloaded my-lab-notes.md');
    } else if (id === 'lab-clear') {
      if (!clearArmed) { clearArmed = 1; e.target.textContent = 'Click again to erase everything'; say('This will erase every answer in the six labs and the reflection prompts, from this browser only.'); setTimeout(function () { clearArmed = 0; e.target.textContent = 'Clear everything I entered'; }, 5000); return; }
      clearArmed = 0; e.target.textContent = 'Clear everything I entered';
      S = {}; try { localStorage.removeItem(KEY); (D.lab || []).forEach(function (l) { localStorage.removeItem('mosaic:note:' + l.id); }); } catch (err) {}
      $$('[data-note]').forEach(function (ta) { ta.value = ''; });
      renderAll(); say('Cleared. Nothing from the labs remains in this browser.');
    }
  });

  function renderAll() { renderClaims(); renderTurnout(); renderAch(); renderMap(); renderSnow(); renderCal(); }
  renderAll();
})();
