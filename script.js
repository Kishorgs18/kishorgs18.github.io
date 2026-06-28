// Enable JS-only reveal styles (content stays visible if JS is off)
document.documentElement.classList.add('js');

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll-reveal
const reveal = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('[data-reveal]').forEach((el) => reveal.observe(el));

// Count-up for numeric stats (runs when the stats block enters view)
const countObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('[data-count]').forEach((el) => {
      const target = +el.dataset.count;
      let n = 0;
      const step = Math.max(1, Math.round(target / 28));
      const tick = () => {
        n = Math.min(target, n + step);
        el.textContent = n;
        if (n < target) requestAnimationFrame(tick);
      };
      tick();
    });
    obs.disconnect();
  });
}, { threshold: 0.4 });
const stats = document.querySelector('.stats');
if (stats) countObserver.observe(stats);
