/**
 * ICOVRI 10 — Main Bootstrap
 * Runs after DOMContentLoaded. All modules are loaded as
 * plain <script> tags so the site works from file:// too.
 */
document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
  Language.init();
  Countdown.init();
  Particles.init();
  Animations.init();
  Form.init();
});
