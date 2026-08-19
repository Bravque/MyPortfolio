/* Subtle fade / slide-up on scroll, using IntersectionObserver.
   Progressive enhancement: if JS is off, or reduced motion is
   requested, content is shown immediately (no hidden state added). */

const REVEAL_SELECTORS = [
  '.section-head',
  '.about-media',
  '.about-body',
  '.timeline-item',
  '.project-card',
  '.skill-card',
  '.service-card',
  '.github-panel',
  '.testi-card',
  '.contact-intro',
  '.contact-form',
];

export function initReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;

  const els = document.querySelectorAll(REVEAL_SELECTORS.join(','));
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  els.forEach((el, i) => {
    el.classList.add('reveal');
    // Gentle stagger for grouped items without over-delaying.
    el.style.transitionDelay = `${Math.min((i % 6) * 60, 300)}ms`;
    observer.observe(el);
  });
}
