/* Entry point — initialises each feature module.
   Loaded as an ES module (deferred by default), so the DOM is ready. */

import { initTheme } from './theme.js';
import { initNav } from './nav.js';
import { initProjects } from './projects.js';
import { initReveal } from './reveal.js';
import { initForm } from './form.js';
import { initGithub } from './github.js';

function boot() {
  initTheme();
  initNav();
  initProjects();
  initReveal();
  initForm();

  // Current year in the footer.
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // GitHub fetch runs after paint so it never blocks rendering.
  if ('requestIdleCallback' in window) requestIdleCallback(initGithub, { timeout: 2500 });
  else setTimeout(initGithub, 1200);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
