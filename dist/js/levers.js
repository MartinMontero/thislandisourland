/* Build power: "Pick your lever" guide and the winners scorecard.
   Everything stays in this browser (localStorage in try/catch). No network or model calls. Data: data-levers.js. */
(function () {
  'use strict';
  var D = window.MOSAIC, V = D && D.levers;
  if (!V || !document.getElementById('lev-root')) return;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); };
  var KEY = 'mosaic:lever:state';
  function load() { try { var v = localStorage.getItem(KEY); return v ? JSON.parse(v) : {}; } catch (e) { return {}; } }
  var S = load();
  var timer = 0;
  function save() { clearTimeout(timer); timer = setTimeout(flush, 150); }
  function flush() { clearTimeout(timer); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function sayL(m) { var s = $('#lev-status'); if (s) s.textContent = m; }
  function sayS(m) { var s = $('#score-status'); if (s) s.textContent = m; }
  function link(u, t) {
    var internal = String(u).charAt(0) === '#';
    return '<a href="' + esc(u) + '"' + (internal ? '' : ' target="_blank" rel="noopener"') + '>' + esc(t) + '</a>';
  }
  function srcs(list) { return list && list.length ? '<span class="text-xs text-stone-700"> (' + list.map(function (s) { return link(s[1], s[0]); }).join('; ') + ')</span>' : ''; }
  var BP = (D.buildpower && D.buildpower.records) || [];
  function rec(id) { for (var i = 0; i < BP.length; i++) if (BP[i].id === id) return BP[i]; return null; }
  var FIELD = 'field';

  /* ======================= Lever guide ======================= */
  function stateAnswer(state) {
    if (!state) return '<p class="text-sm text-stone-700">Pick your state to see whether voters elect the commission.</p>';
    var e = V.elected[state];
    if (e) {
      return '<p class="text-sm"><span class="font-semibold">Voters elect it in ' + esc(state) + '.</span> It is the ' + link(e.url, e.name) + '.' +
        (state === 'Georgia' ? ' On November 3, Democrats won a majority of the Georgia commission.' : '') + srcs([['Ballotpedia', 'https://ballotpedia.org/Public_service_commission_elections,_2026']]) + '</p>';
    }
    return '<p class="text-sm"><span class="font-semibold">Not elected in ' + esc(state) + '.</span> ' + (state === 'South Carolina' ? 'The Legislature appoints the commissioners.' : 'A governor or the Legislature appoints the commissioners.') +
      ' Ten states elect their commission: ' + Object.keys(V.elected).join(', ') + '. To find yours, use ' + link('https://www.usa.gov/state-local-governments', 'USAGov’s state page') + '.' +
      srcs([['Ballotpedia', 'https://ballotpedia.org/Public_service_commission_elections,_2026']]) + '</p>';
  }
  function issueById(id) { for (var i = 0; i < V.issues.length; i++) if (V.issues[i].id === id) return V.issues[i]; return null; }
  function renderLever() {
    var cur = S.issue || '';
    var chips = V.issues.map(function (i) {
      return '<button type="button" class="chip" data-issue="' + i.id + '" aria-pressed="' + (cur === i.id) + '">' + esc(i.label) + '</button>';
    }).join('');
    $('#lev-root').innerHTML = '<div class="flex flex-wrap gap-2" role="group" aria-label="Pick an issue">' + chips + '</div><div id="lev-out" class="mt-4" aria-live="polite"></div>';
    renderLeverOut();
  }
  function renderLeverOut() {
    var i = issueById(S.issue), out = $('#lev-out');
    if (!i) { out.innerHTML = '<p class="text-sm text-ink-700">Choose the closest match to what you care about. Each path shows who holds the vote, who can say no, where decisions are written down and how to get a seat, with a source for each claim.</p>'; return; }
    var rows = i.rows.map(function (r) {
      var body;
      if (r.state) {
        body = '<label class="block text-sm mb-2"><span class="font-semibold">Your state</span><select id="lev-state" class="' + FIELD + ' mt-1 max-w-xs"><option value="">Choose…</option>' +
          V.states.map(function (s) { return '<option' + (S.state === s ? ' selected' : '') + '>' + esc(s) + '</option>'; }).join('') + '</select></label><div id="lev-state-out" aria-live="polite">' + stateAnswer(S.state) + '</div>';
      } else {
        body = '<p class="text-sm text-ink-700 leading-relaxed">' + esc(r.a) + srcs(r.src) + '</p>';
      }
      return '<div class="border-t border-paper-300 pt-3"><p class="font-semibold text-sm mb-1">' + esc(r.q) + '</p>' + body + '</div>';
    }).join('');
    var tools = (i.tools || []).map(function (id) {
      var r = rec(id); if (!r) return '';
      return '<li>' + link(r.url, r.name) + ' <span class="text-xs text-stone-700">(directory entry, checked ' + esc(r.date_verified) + ')</span></li>';
    }).join('');
    out.innerHTML = '<div class="plate p-5 space-y-3"><h3 class="text-xl">' + esc(i.label) + '</h3>' + rows +
      '<div class="lens"><p class="eyebrow text-ochre-700 mb-1">A first step this week</p><p class="text-sm">' + esc(i.first) + '</p></div>' +
      (tools ? '<div><p class="font-semibold text-sm mb-1">Tools in the directory for this</p><ul class="text-sm list-disc ps-5 space-y-1">' + tools + '</ul></div>' : '') +
      (i.gap ? '<p class="text-sm text-stone-700"><span class="font-semibold">What we could not find.</span> ' + esc(i.gap) + '</p>' : '') +
      '<div class="flex flex-wrap gap-2 no-print"><button type="button" class="btn-ghost" data-dir-search="' + esc(i.kw) + '">Search the directory for “' + esc(i.kw) + '”</button>' +
      (i.page ? '<a class="btn-ghost" href="#' + esc(i.page[0]) + '">' + esc(i.page[1]) + ' →</a>' : '') + '</div></div>';
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-issue]') : null;
    if (b) { S.issue = S.issue === b.getAttribute('data-issue') ? '' : b.getAttribute('data-issue'); save(); renderLever(); var again = $('[data-issue="' + S.issue + '"]'); if (again) again.focus(); return; }
    var d = e.target.closest ? e.target.closest('[data-dir-search]') : null;
    if (d) {
      var q = $('#bp-q'); if (!q) return;
      q.value = d.getAttribute('data-dir-search'); q.dispatchEvent(new Event('input', { bubbles: true }));
      var tgt = document.getElementById('build-directory'); if (tgt) { tgt.scrollIntoView(); tgt.focus({ preventScroll: true }); }
      sayL('Directory filtered to “' + q.value + '”. Use Clear in the directory to reset.');
    }
  });
  document.addEventListener('change', function (e) {
    if (e.target.id === 'lev-state') { S.state = e.target.value; save(); var o = $('#lev-state-out'); if (o) o.innerHTML = stateAnswer(S.state); }
  });

  /* ======================= Scorecard ======================= */
  var OFFICE = { governor: 'Governor', senate: 'U.S. Senate', house: 'U.S. House', municipal: 'Mayor', other: 'Other office' };
  function sc() { if (!S.sc) S.sc = { p: {}, custom: [], f: 'all', q: '' }; if (!S.sc.p) S.sc.p = {}; if (!S.sc.custom) S.sc.custom = []; return S.sc; }
  function people() {
    var list = (D.officials || []).map(function (o) { return { id: o.id, name: o.name, office: o.officeType, where: o.jurisdiction, party: o.party, promises: o.platform || [], src: (o.sources && o.sources[0]) || null, custom: false }; });
    sc().custom.forEach(function (c) { list.push({ id: c.id, name: c.name, office: c.office, where: c.where || '', party: '', promises: c.promises, src: null, custom: true }); });
    return list;
  }
  function toolsFor(office) {
    var ids = office === 'senate' || office === 'house' ? ['congress-alerts', 'govtrack'] : office === 'governor' ? ['open_states_plural', 'legiscan', 'billtrack50'] : ['public-comment', 'local-budget'];
    return ids.map(function (id) { var r = rec(id); return r ? '<li>' + link(r.url, r.name) + '</li>' : ''; }).join('');
  }
  function counts() {
    var s = sc(), c = { total: 0, checked: 0, done: 0, moving: 0, 'not-started': 0, reversed: 0, unclear: 0 };
    people().forEach(function (p) { p.promises.forEach(function (_, i) { c.total++; var r = s.p[p.id + '|' + i]; if (r && r.s) { c.checked++; c[r.s]++; } }); });
    return c;
  }
  function selHtml(list, cur, attrs, label) {
    return '<label class="block text-xs"><span class="block text-stone-700">' + label + '</span><select class="' + FIELD + ' text-sm" ' + attrs + '>' +
      list.map(function (o) { return '<option value="' + o.v + '"' + (cur === o.v ? ' selected' : '') + '>' + esc(o.label) + '</option>'; }).join('') + '</select></label>';
  }
  function cardCount(p) { var s = sc(), n = 0; p.promises.forEach(function (_, i) { var r = s.p[p.id + '|' + i]; if (r && r.s) n++; }); return n; }
  function card(p) {
    var s = sc(), lv = V.levers[p.office] || { title: 'What this office can use', body: 'Find out who has the legal vote on each promise (see the paths above) and whether anyone else can block it.', look: 'Look for: the paper trail that would show it moving, such as a vote, a budget line or an order.', src: [] };
    var rows = p.promises.map(function (txt, i) {
      var k = p.id + '|' + i, r = s.p[k] || {};
      return '<li class="border-t border-paper-300 pt-3"><p class="text-sm font-semibold">' + esc(txt) + '</p>' +
        '<div class="grid sm:grid-cols-3 gap-2 mt-2">' +
        selHtml(V.statuses, r.s || '', 'data-sc="' + esc(k) + '|s"', 'What I found') +
        selHtml(V.blocks, r.b || '', 'data-sc="' + esc(k) + '|b"', 'Why') +
        '<label class="block text-xs"><span class="block text-stone-700">Evidence: a link or a note</span><input type="text" class="' + FIELD + ' text-sm" data-sc="' + esc(k) + '|n" value="' + esc(r.n || '') + '"></label></div>' +
        '<p class="text-xs text-stone-700 mt-1" data-date="' + esc(k) + '">' + (r.d ? 'Last changed ' + esc(r.d) : '') + '</p></li>';
    }).join('');
    return '<details class="plate p-4" data-person="' + esc(p.id) + '"><summary class="cursor-pointer flex flex-wrap items-baseline justify-between gap-2"><span><span class="font-serif text-xl">' + esc(p.name) + '</span> <span class="text-sm text-stone-700">· ' + esc(OFFICE[p.office] || 'Office') + (p.where ? ', ' + esc(p.where) : '') + '</span></span>' +
      '<span class="text-xs font-mono text-stone-700" data-card-count="' + esc(p.id) + '">' + cardCount(p) + ' of ' + p.promises.length + ' checked</span></summary>' +
      '<div class="mt-3 space-y-3">' +
      '<div class="lens"><p class="eyebrow text-ochre-700 mb-1">' + esc(lv.title) + '</p><p class="text-sm">' + esc(lv.body) + srcs(lv.src) + '</p><p class="text-sm mt-1">' + esc(lv.look) + '</p></div>' +
      '<ul class="space-y-3">' + rows + '</ul>' +
      '<div><p class="font-semibold text-sm mb-1">Where to look</p><ul class="text-sm list-disc ps-5">' + toolsFor(p.office) + '</ul></div>' +
      '<p class="text-xs text-stone-700">' + (p.custom ? '<button type="button" class="btn-ghost" data-del-custom="' + esc(p.id) + '">Remove this official</button>' : 'Promises are as reported in campaign coverage; see this person’s sources' + (p.src ? ': ' + link(p.src.url, p.src.label) : '') + '. ' + link('#cast', 'Open the Cast page') + '.') + '</p></div></details>';
  }
  function summary() {
    var c = counts();
    $('#score-sum').innerHTML = '<p class="text-sm"><span class="font-semibold">' + c.checked + ' of ' + c.total + ' promises checked.</span> In motion ' + c.moving + ' · Done ' + c.done + ' · Nothing yet ' + c['not-started'] + ' · Went the other way ' + c.reversed + ' · Can’t tell ' + c.unclear + '</p>';
  }
  function visible(p) {
    var s = sc(), f = s.f || 'all', q = (s.q || '').toLowerCase();
    if (f !== 'all' && !(f === 'custom' ? p.custom : p.office === f)) return false;
    if (!q) return true;
    return (p.name + ' ' + p.where + ' ' + p.promises.join(' ')).toLowerCase().indexOf(q) >= 0;
  }
  function renderList() {
    var list = people().filter(visible);
    $('#score-list').innerHTML = list.length ? list.map(card).join('') : '<p class="text-sm text-stone-700">Nothing matches. Clear the search or choose another group.</p>';
    summary();
  }
  function renderScore() {
    var s = sc();
    var filters = [['all', 'Everyone'], ['governor', 'Governors'], ['senate', 'Senate'], ['house', 'House'], ['municipal', 'Mayors'], ['custom', 'Added by me']];
    $('#score-root').innerHTML =
      '<div class="flex flex-wrap items-center gap-2" role="group" aria-label="Show">' + filters.map(function (f) { return '<button type="button" class="chip" data-sf="' + f[0] + '" aria-pressed="' + ((s.f || 'all') === f[0]) + '">' + f[1] + '</button>'; }).join('') + '</div>' +
      '<label class="relative block max-w-xl mt-3"><span class="sr-only">Search officials and promises</span><input id="score-q" type="search" autocomplete="off" placeholder="Search a name, state or promise" class="' + FIELD + '" value="' + esc(s.q || '') + '"></label>' +
      '<div id="score-sum" class="plate p-3 mt-3" aria-live="polite"></div>' +
      '<div id="score-list" class="space-y-3 mt-3"></div>' +
      '<details class="plate p-4 mt-4 no-print"><summary class="cursor-pointer font-semibold text-sm">Add an official I want to track (any party, any level)</summary>' +
      '<div class="grid sm:grid-cols-3 gap-2 mt-3"><label class="block text-xs"><span class="block text-stone-700">Name</span><input id="cu-name" type="text" class="' + FIELD + '"></label>' +
      '<label class="block text-xs"><span class="block text-stone-700">Office</span><select id="cu-office" class="' + FIELD + '">' + Object.keys(OFFICE).map(function (k) { return '<option value="' + k + '">' + OFFICE[k] + '</option>'; }).join('') + '</select></label>' +
      '<label class="block text-xs"><span class="block text-stone-700">Place</span><input id="cu-where" type="text" class="' + FIELD + '"></label></div>' +
      '<label class="block text-xs mt-2"><span class="block text-stone-700">Promises, one per line</span><textarea id="cu-prom" rows="4" class="' + FIELD + ' py-2"></textarea></label>' +
      '<button type="button" class="btn-ink mt-3" id="cu-add">Add to my scorecard</button></details>';
    renderList();
  }
  document.addEventListener('click', function (e) {
    var t = e.target, b = t.closest ? t.closest('[data-sf]') : null;
    if (b) { sc().f = b.getAttribute('data-sf'); save(); $$('[data-sf]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); renderList(); return; }
    if (t.id === 'cu-add') {
      var name = $('#cu-name').value.trim(), lines = $('#cu-prom').value.split(/\n/).map(function (x) { return x.trim(); }).filter(Boolean).slice(0, 12);
      if (!name || !lines.length) { sayS('Add a name and at least one promise.'); return; }
      var s = sc(); s.custom.push({ id: 'c' + Date.now().toString(36), name: name, office: $('#cu-office').value, where: $('#cu-where').value.trim(), promises: lines });
      s.f = 'custom'; save(); renderScore(); sayS('Added ' + name + '.'); return;
    }
    var dc = t.closest ? t.closest('[data-del-custom]') : null;
    if (dc) { var id = dc.getAttribute('data-del-custom'), st = sc(); st.custom = st.custom.filter(function (c) { return c.id !== id; }); Object.keys(st.p).forEach(function (k) { if (k.indexOf(id + '|') === 0) delete st.p[k]; }); save(); renderList(); sayS('Removed.'); }
  });
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.id === 'score-q') { sc().q = t.value; save(); renderList(); return; }
    if (t.matches && t.matches('[data-sc]') && t.tagName === 'INPUT') setField(t);
  });
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.matches && t.matches('[data-sc]') && t.tagName === 'SELECT') setField(t);
  });
  function setField(t) {
    var parts = t.getAttribute('data-sc').split('|'), field = parts.pop(), key = parts.join('|'), s = sc();
    var r = s.p[key] = s.p[key] || {};
    r[field] = t.value;
    r.d = new Date().toISOString().slice(0, 10);
    var el = $('[data-date="' + key.replace(/"/g, '\\"') + '"]'); if (el) el.textContent = 'Last changed ' + r.d;
    var pid = key.split('|')[0], p = people().filter(function (x) { return x.id === pid; })[0], cc = $('[data-card-count="' + pid + '"]');
    if (p && cc) cc.textContent = cardCount(p) + ' of ' + p.promises.length + ' checked';
    summary(); save();
  }

  /* ----- export / clear ----- */
  function exportMd() {
    var s = sc(), out = ['# My scorecard: holding winners to their word', '', '_From The Representation Mosaic (' + (D.meta && D.meta.url || '') + '). Promises are as reported in campaign coverage; the findings below are my own. Generated ' + new Date().toISOString().slice(0, 10) + '._', ''];
    var label = {}; V.statuses.forEach(function (x) { label[x.v] = x.label; }); var why = {}; V.blocks.forEach(function (x) { why[x.v] = x.label; });
    people().forEach(function (p) {
      var rows = [];
      p.promises.forEach(function (txt, i) { var r = s.p[p.id + '|' + i]; if (r && (r.s || r.n || r.b)) rows.push('- ' + txt + ' — ' + (label[r.s || ''] || 'Not checked yet') + (r.b ? ' (' + why[r.b] + ')' : '') + (r.n ? '. Evidence: ' + r.n : '') + (r.d ? ' [' + r.d + ']' : '')); });
      if (rows.length) out.push('## ' + p.name + ' · ' + (OFFICE[p.office] || '') + (p.where ? ', ' + p.where : ''), '', rows.join('\n'), '');
    });
    if (out.length <= 4) out.push('No promises checked yet.');
    return out.join('\n');
  }
  var armed = 0;
  document.addEventListener('click', function (e) {
    var id = e.target.id;
    if (id === 'score-copy') {
      flush(); var txt = exportMd();
      var ok = function () { sayS('Copied your scorecard.'); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(ok, fb); else fb();
      function fb() { var ta = document.createElement('textarea'); ta.value = txt; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); var good = false; try { good = document.execCommand('copy'); } catch (x) {} document.body.removeChild(ta); if (good) ok(); else sayS('Copy was blocked. Use the download button instead.'); }
    } else if (id === 'score-download') {
      flush(); var blob = new Blob([exportMd()], { type: 'text/markdown;charset=utf-8' }), a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'my-scorecard.md'; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0); sayS('Downloaded my-scorecard.md');
    } else if (id === 'score-clear') {
      if (!armed) { armed = 1; e.target.textContent = 'Click again to erase my scorecard'; sayS('This erases every finding and every official you added, from this browser only.'); setTimeout(function () { armed = 0; e.target.textContent = 'Clear my scorecard'; }, 5000); return; }
      armed = 0; e.target.textContent = 'Clear my scorecard'; delete S.sc; flush(); renderScore(); sayS('Cleared.');
    }
  });

  renderLever();
  renderScore();
})();
