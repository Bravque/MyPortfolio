/* Lightweight GitHub activity: fetches recent public repos client-side,
   after first paint, and caches the result in sessionStorage so it runs
   at most once per session. Fully non-blocking — if the request fails or
   is rate-limited, a graceful fallback message + profile link remains. */

const USER = 'Bravque';
const CACHE_KEY = 'gh-repos-v1';
const MAX_REPOS = 6;

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null) continue;
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else node.setAttribute(k, v);
  }
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c == null) return;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  });
  return node;
}

function starIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icon');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', '#i-star');
  svg.append(use);
  return svg;
}

function repoCard(repo) {
  const name = el('a', {
    class: 'repo-name',
    href: repo.html_url,
    target: '_blank',
    rel: 'noopener noreferrer',
  });
  name.append(repo.name);

  const meta = el('div', { class: 'repo-meta' });
  if (repo.language) {
    meta.append(el('span', { class: 'repo-lang' }, [el('span', { class: 'lang-dot' }), repo.language]));
  }
  const stars = el('span', { class: 'repo-stars' }, [starIcon(), String(repo.stargazers_count || 0)]);
  meta.append(stars);

  return el('div', { class: 'repo-card' }, [
    name,
    el('p', { class: 'repo-desc', text: repo.description || 'No description provided.' }),
    meta,
  ]);
}

function render(container, repos) {
  const frag = document.createDocumentFragment();
  repos.forEach((r) => frag.append(repoCard(r)));
  container.replaceChildren(frag);
}

export function initGithub() {
  const container = document.getElementById('github-repos');
  if (!container) return;

  // Serve from session cache when available.
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      render(container, JSON.parse(cached));
      return;
    }
  } catch (e) {
    /* ignore */
  }

  const url = `https://api.github.com/users/${USER}/repos?sort=updated&per_page=100`;

  fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
    .then((res) => {
      if (!res.ok) throw new Error(`GitHub ${res.status}`);
      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) throw new Error('Unexpected response');
      const repos = data
        .filter((r) => !r.fork && !r.archived)
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, MAX_REPOS)
        .map((r) => ({
          name: r.name,
          html_url: r.html_url,
          description: r.description,
          language: r.language,
          stargazers_count: r.stargazers_count,
          pushed_at: r.pushed_at,
        }));

      if (!repos.length) throw new Error('No public repos');
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(repos));
      } catch (e) {
        /* ignore quota */
      }
      render(container, repos);
    })
    .catch(() => {
      container.replaceChildren(
        el('p', {
          class: 'github-loading',
          text: 'Recent repositories are on my GitHub profile →',
        })
      );
    });
}
