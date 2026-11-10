/* "Suggest a resource": client side of the form that opens a pull request.
   The server (functions/api/submit.js) validates everything again; this file only helps the reader. */
(function () {
  'use strict';
  var I = window.MOSAIC_I18N;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var form = $('#sg-form');
  if (!form || !I) return;

  var TEST_SITEKEY = '1x00000000000000000000AA'; /* Cloudflare's published always-passes key; used only on localhost */
  var WIDGET = null, scriptRequested = false, token = '', busy = false;
  var isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

  function siteKey() {
    if (isLocal) return TEST_SITEKEY;
    var m = document.querySelector('meta[name="turnstile-sitekey"]');
    return (m && m.getAttribute('content')) || '';
  }

  /* ---------- Turnstile (loaded only when the form is opened) ---------- */
  function renderWidget() {
    var host = $('#sg-turnstile');
    if (!window.turnstile || !host) return;
    var key = siteKey();
    if (!key) { showFailure('form.err.generic'); return; }
    if (WIDGET !== null) { try { window.turnstile.remove(WIDGET); } catch (e) {} WIDGET = null; }
    token = '';
    WIDGET = window.turnstile.render(host, {
      sitekey: key,
      language: I.getLang(),
      theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      callback: function (t) { token = t; },
      'expired-callback': function () { token = ''; },
      'error-callback': function () { token = ''; }
    });
  }
  function loadTurnstile() {
    if (window.turnstile) { renderWidget(); return; }
    if (scriptRequested) return;
    scriptRequested = true;
    var s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = renderWidget;
    s.onerror = function () { scriptRequested = false; showFailure('form.err.generic'); };
    document.head.appendChild(s);
  }
  function onRoute() {
    if ((location.hash || '').split('/')[0] === '#suggest') loadTurnstile();
  }
  window.addEventListener('hashchange', onRoute);
  document.addEventListener('mosaic:langchange', function () { counter(); if (window.turnstile && WIDGET !== null) renderWidget(); });
  onRoute();

  /* ---------- helpers ---------- */
  function val(id) { var el = document.getElementById(id); return el ? el.value : ''; }
  function checked(name) { return Array.prototype.map.call(form.querySelectorAll('input[name="' + name + '"]:checked'), function (i) { return i.value; }); }
  function clean(s) { return String(s || '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); }
  function isPublicHttps(u) {
    try {
      var x = new URL(u);
      if (x.protocol !== 'https:') return false;
      var h = x.hostname.toLowerCase();
      if (!h || h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.local') || h.endsWith('.internal')) return false;
      if (/^\d{1,3}(\.\d{1,3}){3}$/.test(h) || h.indexOf(':') >= 0 || h.charAt(0) === '[') return false;
      return h.indexOf('.') > 0;
    } catch (e) { return false; }
  }
  function counter() {
    var left = 600 - val('sg-what').length;
    $('#sg-what-count').textContent = I.t('form.charsLeft', { n: left });
  }
  $('#sg-what').addEventListener('input', counter);
  counter();

  function setErr(id, key) {
    var input = document.getElementById(id), err = document.getElementById(id + '-err');
    if (!err) return;
    if (key) { err.textContent = I.t(key); err.hidden = false; if (input) input.setAttribute('aria-invalid', 'true'); }
    else { err.textContent = ''; err.hidden = true; if (input) input.removeAttribute('aria-invalid'); }
  }
  function showFailure(key) {
    var box = $('#sg-failure');
    $('#sg-failure-msg').textContent = I.t(key);
    box.hidden = false;
  }

  /* ---------- validation ---------- */
  function validate() {
    var problems = [];
    var name = clean(val('sg-name')), what = clean(val('sg-what'));
    var url = val('sg-url').trim(), proof = val('sg-proof').trim();
    setErr('sg-name', null); setErr('sg-url', null); setErr('sg-what', null); setErr('sg-proof', null); setErr('sg-consent', null);
    if (name.length < 3 || name.length > 120) problems.push(['sg-name', 'form.err.name']);
    if (url.length < 8 || url.length > 300 || !isPublicHttps(url)) problems.push(['sg-url', 'form.err.url']);
    if (what.length < 40 || what.length > 600) problems.push(['sg-what', 'form.err.what']);
    if (proof.length < 8 || proof.length > 300 || !isPublicHttps(proof)) problems.push(['sg-proof', 'form.err.proof']);
    if (!$('#sg-consent').checked) problems.push(['sg-consent', 'form.err.consent']);
    return problems;
  }
  function showProblems(problems) {
    var box = $('#sg-errors'), list = $('#sg-error-list');
    list.innerHTML = '';
    problems.forEach(function (p) {
      setErr(p[0], p[1]);
      var li = document.createElement('li'), b = document.createElement('button');
      b.type = 'button'; b.className = 'underline text-start text-lapis'; b.textContent = I.t(p[1]);
      b.addEventListener('click', function () { var el = document.getElementById(p[0]); if (el) el.focus(); });
      li.appendChild(b); list.appendChild(li);
    });
    $('#sg-error-title').textContent = I.t('form.errorsTitle', { n: problems.length });
    box.hidden = false;
    box.focus();
  }

  /* ---------- submit ---------- */
  var ERR = { turnstile: 'form.err.turnstile', rate: 'form.err.rate', full: 'form.err.full', blocked: 'form.err.blocked', invalid: 'form.err.generic' };
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (busy) return;
    $('#sg-errors').hidden = true; $('#sg-failure').hidden = true;
    var problems = validate();
    if (problems.length) { showProblems(problems); return; }
    if (!token && !isLocal) { showProblems([['sg-consent', 'form.err.turnstile']]); setErr('sg-consent', null); return; }
    busy = true; $('#sg-submit').disabled = true; $('#sg-status').textContent = I.t('form.sending');
    var body = {
      type: val('sg-type'), name: clean(val('sg-name')), url: val('sg-url').trim(), what: clean(val('sg-what')),
      engage: checked('engage'), section: val('sg-section'), legal: val('sg-legal'), party: val('sg-party'), cost: val('sg-cost'),
      scope: val('sg-scope'), place: clean(val('sg-place')), proof: val('sg-proof').trim(), languages: checked('languages'),
      credit: clean(val('sg-credit')), consent: true, website: val('sg-website'), turnstile: token, lang: I.getLang()
    };
    fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return { ok: false, error: 'server' }; }).then(function (j) { return { status: r.status, body: j }; }); })
      .then(function (res) {
        var j = res.body || {};
        if (j.ok) {
          form.hidden = true;
          $('#sg-status').textContent = '';
          if (j.dry_run) $('#sg-success-msg').textContent = I.t('form.dry');
          else $('#sg-success-msg').textContent = I.t('form.success');
          var a = $('#sg-pr-link');
          if (j.pr_url && /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/pull\/\d+$/.test(j.pr_url)) {
            a.href = j.pr_url; a.textContent = I.t('form.successLink') + ' (#' + j.pr_number + ')'; a.parentNode.hidden = false;
          } else { a.parentNode.hidden = true; }
          var ok = $('#sg-success'); ok.hidden = false; ok.focus();
          return;
        }
        $('#sg-status').textContent = '';
        showFailure(ERR[j.error] || 'form.err.generic');
        $('#sg-failure').focus();
        if (window.turnstile && WIDGET !== null) { try { window.turnstile.reset(WIDGET); } catch (x) {} token = ''; }
      })
      .catch(function () { $('#sg-status').textContent = ''; showFailure('form.err.generic'); $('#sg-failure').focus(); })
      .then(function () { busy = false; $('#sg-submit').disabled = false; });
  });
})();
