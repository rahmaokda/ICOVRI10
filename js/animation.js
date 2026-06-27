/**
 * ICOVRI 10 — Particles & Scroll Animations
 */
const Particles = (() => {
  function init() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.background        = '#1ab8d4';
      p.style.animationDuration = (8 + Math.random() * 12) + 's';
      p.style.animationDelay    = (-Math.random() * 20) + 's';
      const size = (1 + Math.random() * 2) + 'px';
      p.style.width  = size;
      p.style.height = size;
      p.style.left   = (Math.random() * 100) + '%';
      container.appendChild(p);
    }
  }
  return { init };
})();

const Animations = (() => {
  function init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }
  return { init };
})();
