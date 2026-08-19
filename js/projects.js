/* Renders project cards from data.js and wires up an accessible
   case-study modal built on the native <dialog> element (focus
   trapping, Esc-to-close, and backdrop click handled here). */

import { projects } from './data.js';

/* Tiny DOM helper — keeps rendering readable and XSS-safe (text
   goes in via textContent, never innerHTML with data). */
function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, val] of Object.entries(props)) {
    if (val == null) continue;
    if (key === 'class') node.className = val;
    else if (key === 'text') node.textContent = val;
    else if (key === 'html') node.innerHTML = val;
    // setAttribute handles href/src/rel/target/aria-*/loading/decoding/alt correctly.
    else node.setAttribute(key, val);
  }
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c == null) return;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  });
  return node;
}

function icon(id, cls = 'icon') {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', cls);
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `#${id}`);
  svg.append(use);
  return svg;
}

function picture(image, imgClass) {
  const pic = el('picture');
  pic.append(el('source', { srcset: image.webp, type: 'image/webp' }));
  pic.append(
    el('img', {
      src: image.jpg,
      alt: image.alt,
      loading: 'lazy',
      decoding: 'async',
      class: imgClass || '',
    })
  );
  return pic;
}

function techList(items, cls) {
  return el(
    'ul',
    { class: cls, 'aria-label': 'Technologies used' },
    items.map((t) => el('li', { text: t }))
  );
}

/* ---------- Card ---------- */
function buildCard(p) {
  const media = el('div', { class: 'project-media' }, [
    picture(p.image),
    el('span', { class: 'project-badge', text: p.category }),
  ]);

  const openBtn = el('button', {
    class: 'project-open',
    type: 'button',
    'data-id': p.id,
    'aria-label': `View case study: ${p.title}`,
  });
  openBtn.append(document.createTextNode('Case study '), icon('i-arrow-r'));

  const links = el('div', { class: 'project-links' });
  if (p.links?.live) {
    const live = el('a', {
      href: p.links.live,
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': `Open live project: ${p.title}`,
      title: 'Live project',
    });
    live.append(icon('i-arrow-ur'));
    links.append(live);
  }
  if (p.links?.source) {
    const src = el('a', {
      href: p.links.source,
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': `View source code: ${p.title}`,
      title: 'Source code',
    });
    src.append(icon('i-github'));
    links.append(src);
  }

  const body = el('div', { class: 'project-body' }, [
    el('p', { class: 'project-eyebrow', text: p.category }),
    el('h3', { class: 'project-title', text: p.title }),
    el('p', { class: 'project-desc', text: p.short }),
    techList(p.tech, 'project-tech'),
    el('div', { class: 'project-foot' }, [openBtn, links]),
  ]);

  const inner = el('div', { class: 'project-inner' }, [media, body]);
  return el('article', { class: `project-card${p.featured ? ' is-featured' : ''}` }, [inner]);
}

/* ---------- Modal ---------- */
function block(title, body) {
  if (!body) return null;
  return el('div', { class: 'modal-block' }, [el('h3', { text: title }), el('p', { text: body })]);
}

function buildModalContent(p) {
  const close = el('button', { class: 'modal-close', type: 'button', 'aria-label': 'Close case study' });
  close.append(icon('i-close'));

  const media = el('div', { class: 'modal-media' }, [picture(p.image), close]);

  const featureList =
    p.features && p.features.length
      ? el('div', { class: 'modal-block' }, [
          el('h3', { text: 'Key features' }),
          el(
            'ul',
            { class: 'modal-features' },
            p.features.map((f) => el('li', {}, [icon('i-check'), el('span', { text: f })]))
          ),
        ])
      : null;

  const builtWith = el('div', { class: 'modal-block' }, [
    el('h3', { text: 'Built with' }),
    techList(p.tech, 'project-tech'),
  ]);

  const actions = el('div', { class: 'modal-actions' });
  if (p.links?.live) {
    const a = el('a', { class: 'btn btn-primary', href: p.links.live, target: '_blank', rel: 'noopener noreferrer' });
    a.append(document.createTextNode('View live project'), icon('i-arrow-ur'));
    actions.append(a);
  }
  if (p.links?.source) {
    const a = el('a', { class: 'btn btn-outline', href: p.links.source, target: '_blank', rel: 'noopener noreferrer' });
    a.append(icon('i-github'), document.createTextNode('View source'));
    actions.append(a);
  }

  const content = el('div', { class: 'modal-content' }, [
    el('p', { class: 'modal-eyebrow', text: p.category }),
    el('h2', { class: 'modal-title', id: 'modal-title', text: p.title }),
    block('Overview', p.overview),
    block('Problem', p.problem),
    block('Solution', p.solution),
    block('My contribution', p.contribution),
    featureList,
    block('Challenges', p.challenges),
    block('Outcome', p.outcome),
    builtWith,
    actions,
  ]);

  return el('div', {}, [media, content]);
}

export function initProjects() {
  const grid = document.getElementById('projects-grid');
  const dialog = document.getElementById('project-modal');
  const modalInner = document.getElementById('modal-inner');
  if (!grid || !dialog || !modalInner) return;

  // Featured first, then the rest, preserving data order otherwise.
  const ordered = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  const frag = document.createDocumentFragment();
  ordered.forEach((p) => frag.append(buildCard(p)));
  grid.append(frag);

  let lastTrigger = null;

  const openModal = (id, trigger) => {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    lastTrigger = trigger || null;
    modalInner.replaceChildren(buildModalContent(p));
    modalInner.scrollTop = 0;

    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', ''); // very old fallback
    document.body.style.overflow = 'hidden';

    modalInner.querySelector('.modal-close')?.addEventListener('click', closeModal);
  };

  const closeModal = () => {
    if (dialog.open) dialog.close();
    document.body.style.overflow = '';
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
  };

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.project-open');
    if (btn) openModal(btn.getAttribute('data-id'), btn);
  });

  // Backdrop click (native dialog reports clicks on the dialog element itself).
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeModal();
  });
  // Esc / native close.
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
  });
}
