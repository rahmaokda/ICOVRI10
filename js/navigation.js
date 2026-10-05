/**
 * ICOVRI 10 — Header, Mobile Menu & Announcement
 */
const Navigation = (() => {
  function initMenu() {
    const hamburger  = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;

    const setOpen = (open) => {
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    hamburger.addEventListener('click', () => setOpen(!mobileMenu.classList.contains('open')));
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  function initHeaderShadow() {
    const header = document.getElementById('site-header');
    if (!header) return;
    const update = () => header.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initAnnouncement() {
    const bar = document.getElementById('announcement-bar');
    bar?.querySelector('.announcement-close')?.addEventListener('click', () => bar.remove());
  }

  function init() {
    initMenu();
    initHeaderShadow();
    initAnnouncement();
  }

  return { init };
})();
