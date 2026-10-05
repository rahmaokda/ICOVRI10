/**
 * ICOVRI 10 — Language Switcher
 * Toggles <body class="ar"> (CSS hides .en-only / .ar-only accordingly),
 * sets dir/lang, and remembers the choice. ?lang=ar|en in the URL wins.
 */
const Language = (() => {
  const STORAGE_KEY = 'icovri-lang';

  function save(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) { /* storage blocked */ }
  }

  function load() {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl === 'ar' || fromUrl === 'en') return fromUrl;
    try { return localStorage.getItem(STORAGE_KEY) || 'en'; } catch (_) { return 'en'; }
  }

  function setLang(lang) {
    const isAr = lang === 'ar';
    document.body.classList.toggle('ar', isAr);
    document.documentElement.setAttribute('lang', isAr ? 'ar' : 'en');
    document.documentElement.setAttribute('dir',  isAr ? 'rtl' : 'ltr');

    [['btn-en', !isAr], ['btn-ar', isAr]].forEach(([id, on]) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
    });

    save(isAr ? 'ar' : 'en');
  }

  function init() {
    document.getElementById('btn-en')?.addEventListener('click', () => setLang('en'));
    document.getElementById('btn-ar')?.addEventListener('click', () => setLang('ar'));
    setLang(load());
  }

  // expose setLang globally for any legacy onclick usage
  window.setLang = setLang;

  return { init, setLang };
})();
