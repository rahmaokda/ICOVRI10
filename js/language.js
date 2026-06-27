/**
 * ICOVRI 10 — Language Switcher
 */
const Language = (() => {
  function setLang(lang) {
    const isAr = lang === 'ar';
    document.body.classList.toggle('ar', isAr);
    document.body.setAttribute('dir', isAr ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    document.getElementById('btn-en')?.classList.toggle('active', !isAr);
    document.getElementById('btn-ar')?.classList.toggle('active',  isAr);
  }

  function init() {
    document.getElementById('btn-en')?.addEventListener('click', () => setLang('en'));
    document.getElementById('btn-ar')?.addEventListener('click', () => setLang('ar'));
  }

  // expose setLang globally for any legacy onclick usage
  window.setLang = setLang;

  return { init, setLang };
})();
