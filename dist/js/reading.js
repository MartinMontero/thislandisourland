/* Reading comfort and calm-reading helpers. No dependencies, no network.
   Loaded in <head> (not deferred) so a reader's saved settings apply before the first paint.
   Settings live only in this browser's localStorage, under mosaic:rc. */
(function () {
  'use strict';
  var KEY = 'mosaic:rc';
  var OPTS = ['large', 'space', 'font', 'open'];
  var root = document.documentElement;

  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  var rc = load();
  function apply() { OPTS.forEach(function (o) { root.classList.toggle('rc-' + o, !!rc[o]); }); }
  apply();

  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* Open every "Read more" and evidence group in a panel (or close them). */
  function setAll(scope, open) {
    $$('details.more, details.evgroup', scope).forEach(function (d) { d.open = open; });
  }

  function ready() {
    /* The Aa menu */
    var btn = document.getElementById('rc-btn');
    var pop = document.getElementById('rc-pop');
    if (btn && pop) {
      $$('input[data-rc]', pop).forEach(function (i) {
        i.checked = !!rc[i.getAttribute('data-rc')];
        i.addEventListener('change', function () {
          rc[i.getAttribute('data-rc')] = i.checked; save(rc); apply();
          if (i.getAttribute('data-rc') === 'open') setAll(document, i.checked);
        });
      });
      var close = function (refocus) { pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); if (refocus) btn.focus(); };
      btn.addEventListener('click', function () {
        var opening = pop.hidden;
        pop.hidden = !opening; btn.setAttribute('aria-expanded', String(opening));
        if (opening) { var f = pop.querySelector('input'); if (f) f.focus(); }
      });
      pop.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(true); });
      document.addEventListener('click', function (e) { if (!pop.hidden && !pop.contains(e.target) && !btn.contains(e.target)) close(false); });
      var done = pop.querySelector('[data-rc-close]');
      if (done) done.addEventListener('click', function () { close(true); });
    }

    if (rc.open) setAll(document, true);

    /* Expand / collapse buttons inside a panel */
    $$('[data-expand]').forEach(function (b) {
      b.addEventListener('click', function () {
        var scope = b.closest('[data-panel]') || document;
        setAll(scope, b.getAttribute('data-expand') === 'open');
      });
    });

    /* Open or close the claim groups of one analysis block */
    $$('[data-expand-block]').forEach(function (b) {
      b.addEventListener('click', function () {
        var scope = b.closest('.analysis') || document;
        $$('details.evgroup', scope).forEach(function (d) { d.open = b.getAttribute('data-expand-block') === 'open'; });
      });
    });

    /* Page map: mark the section in view. */
    if (!('IntersectionObserver' in window)) return;
    $$('.pagemap').forEach(function (map) {
      var links = $$('a[href*="/"]', map);
      var byId = {};
      links.forEach(function (a) { var id = a.getAttribute('href').split('/')[1]; var el = id && document.getElementById(id); if (el) byId[id] = a; });
      var current = null;
      links.forEach(function (a) {
        a.addEventListener('click', function () {
          if (current) current.removeAttribute('aria-current');
          a.setAttribute('aria-current', 'true'); current = a;
        });
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var a = byId[en.target.id]; if (!a || a === current) return;
          if (current) current.removeAttribute('aria-current');
          a.setAttribute('aria-current', 'true'); current = a;
          var inner = map.querySelector('.pagemap-inner');
          if (inner && inner.scrollWidth > inner.clientWidth) {
            var left = a.offsetLeft - inner.clientWidth / 2 + a.offsetWidth / 2;
            inner.scrollTo({ left: left, behavior: 'auto' });
          }
        });
      }, { rootMargin: '-35% 0px -60% 0px' });
      Object.keys(byId).forEach(function (id) { io.observe(document.getElementById(id)); });
    });
  }

  /* Open any closed <details> around an element, then bring it into view. Used by the router for #panel/section links. */
  window.MosaicReveal = function (el) {
    var d = el; while (d) { if (d.tagName === 'DETAILS') d.open = true; d = d.parentElement; }
    if (el.tagName === 'DETAILS') el.open = true;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
})();
