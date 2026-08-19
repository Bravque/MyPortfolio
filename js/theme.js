/* Dark / light theme toggle with localStorage persistence.
   The initial theme is applied by an inline script in <head>
   to avoid a flash of the wrong theme. */

export function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const setLabel = (theme) => {
    const next = theme === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', `Switch to ${next} theme`);
  };

  setLabel(root.getAttribute('data-theme'));

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    setLabel(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* storage may be unavailable */
    }
  });
}
