/* Runs before first paint (blocking, tiny). Picks the language and sets <html lang dir> so an Arabic
   reader never sees a flash of left-to-right layout. Order: ?lang= in the URL, then the saved choice,
   then English. i18n.js takes over from here. */
(function () {
  var LANGS = ['en', 'es', 'ar'], lang = 'en', d = document.documentElement;
  try {
    var q = new URLSearchParams(location.search).get('lang'), saved = null;
    try { saved = JSON.parse(localStorage.getItem('mosaic:lang')); } catch (e) {}
    lang = LANGS.indexOf(q) >= 0 ? q : (LANGS.indexOf(saved) >= 0 ? saved : 'en');
  } catch (e) { lang = 'en'; }
  d.lang = lang; d.dir = lang === 'ar' ? 'rtl' : 'ltr';
  window.__MOSAIC_LANG = lang;
  if (lang !== 'en') {
    d.classList.add('i18n-pending');
    setTimeout(function () { d.classList.remove('i18n-pending'); }, 3000); // never leave the page hidden
  }
})();
