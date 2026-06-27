/**
 * ICOVRI 10 — Countdown Timer
 */
const Countdown = (() => {
  const TARGET = new Date('2026-09-27T09:00:00');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const diff = TARGET - new Date();
    if (diff <= 0) {
      const el = document.getElementById('countdown');
      if (el) el.style.display = 'none';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);

    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('cd-days',  pad(d));
    set('cd-hours', pad(h));
    set('cd-mins',  pad(m));
    set('cd-secs',  pad(s));
  }

  function init() {
    tick();
    setInterval(tick, 1000);
  }

  return { init };
})();
