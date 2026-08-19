/* ============================================================
   Project data — single source of truth for the Projects grid
   and the case-study modal.

   To add a project: copy one object below, drop your screenshot
   into /assets (webp + jpg), and fill in the fields. Set
   `featured: true` for a large, full-width case-study card.
   Only fields you provide are rendered — omit `source` if there
   is no public repo, etc.
   ============================================================ */

export const projects = [
  {
    id: 'bodabodacare',
    title: 'BodaBodaCare',
    category: 'Web Application',
    featured: true,
    image: {
      webp: '/assets/bodabodacare.webp',
      jpg: '/assets/bodabodacare.jpg',
      alt: 'BodaBodaCare web app landing page — insurance for motorbike operators',
    },
    short:
      'A web platform that helps motorbike (boda boda) operators understand road safety and access insurance against accidents.',
    overview:
      'BodaBodaCare is a web application built around the boda boda community in Kenya — a large, often under-served group of motorbike operators. It combines road-safety education with a path to affordable insurance.',
    problem:
      'Motorbike operators face high accident risk but frequently lack accessible information about road safety and clear, trustworthy routes to insurance cover.',
    solution:
      'A focused web app that pairs plain-language safety guidance with insurance packages and a simple sign-up and enquiry flow, so operators can learn and get covered in one place.',
    contribution: 'Designed and built the application — UI, front-end, and the account and enquiry flows.',
    tech: ['Node.js', 'Express', 'MySQL', 'JavaScript'],
    features: [
      'Road-safety education content tailored to boda boda operators',
      'Insurance packages with a clear call-to-action and enquiry flow',
      'Account sign-up / login and a lead-capture form',
      'Fully responsive layout for mobile-first users',
    ],
    challenges:
      'Designing an interface that stays simple and trustworthy for a mobile-first audience with varied digital experience, while still covering safety content and insurance actions.',
    outcome: 'Deployed and live, presenting a clear path from safety awareness to insurance sign-up.',
    links: { live: 'https://bodabodacare.netlify.app/' },
  },

  {
    id: 'amc-migori',
    title: 'AMC Migori',
    category: 'Business Website',
    featured: false,
    image: {
      webp: '/assets/amc-migori.webp',
      jpg: '/assets/amc-migori.jpg',
      alt: 'AMC Migori website homepage for the Artisanal Mining Committee',
    },
    short:
      'An informational website for the Migori County Artisanal Mining Committee, keeping investors and miners up to date.',
    overview:
      'A public-facing website for the Migori County Artisanal Mining Committee (AMC), presenting the organisation, its services, and updates for both miners and prospective investors.',
    problem:
      'The committee needed a credible online presence to communicate its work, share updates, and build trust with the community and investors.',
    solution:
      'A clean, responsive website with clear sections for services, activities, and contact — structured so content can be kept current.',
    contribution: 'Designed and developed the full website, from layout and content structure to deployment.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    features: [
      'Clear presentation of the committee, services, and activities',
      'Sections aimed at both miners and investors',
      'Responsive across mobile, tablet, and desktop',
      'Contact section for enquiries',
    ],
    challenges: 'Organising a broad range of organisational information into a simple, credible, easy-to-navigate structure.',
    outcome: 'Live and serving as the committee’s official online presence.',
    links: { live: 'https://artisanalminingcommittee.netlify.app/' },
  },

  {
    id: 'nicole-portfolio',
    title: 'Nicole Mwanaidi — Portfolio',
    category: 'Portfolio Website',
    featured: false,
    image: {
      webp: '/assets/nicole-portfolio.webp',
      jpg: '/assets/nicole-portfolio.jpg',
      alt: 'Portfolio website for data analyst Nicole Mwanaidi',
    },
    short:
      'A personal portfolio for a data analyst, showcasing her data analytics and business intelligence work.',
    overview:
      'A professional portfolio website for Nicole Mwanaidi, a data analyst, presenting her background, skills, and selected data-analytics and business-intelligence projects.',
    problem:
      'She needed a polished, modern portfolio that clearly communicated her expertise and project work to prospective employers and clients.',
    solution:
      'A clean, content-first portfolio with a strong hero, an organised projects section, and a clear route to her CV and contact details.',
    contribution: 'Designed and developed the portfolio end to end based on her professional profile.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    features: [
      'Hero introduction with clear positioning and a CV download',
      'Projects section highlighting data-analytics work',
      'Responsive, accessible layout',
    ],
    challenges: 'Translating a professional profile into a design that felt personal, credible, and recruiter-ready.',
    outcome: 'Delivered and live — the client praised the attention to detail and final result.',
    links: { live: 'https://nicolemwanaidi.netlify.app/' },
  },

  {
    id: 'digital-menu',
    title: 'Digital Menu Board',
    category: 'Digital Signage',
    featured: false,
    image: {
      webp: '/assets/digital-menu.webp',
      jpg: '/assets/digital-menu.jpg',
      alt: 'Digital menu board displayed on a screen at Monny’s Place café',
    },
    short:
      'An interactive digital menu board for a café, designed for a wall-mounted display and easy updates.',
    overview:
      'A digital menu board for Monny’s Place café, designed to run on an in-store display. It replaces static printed menus with a vibrant, easy-to-update screen.',
    problem:
      'The café needed an eye-catching, flexible way to present its menu that could be updated quickly without reprinting.',
    solution:
      'A bold, readable menu layout optimised for a screen at a distance, with clear pricing and appetising visuals — simple for staff to update.',
    contribution: 'Designed the menu board layout, visual system, and content for the café’s display.',
    tech: ['Canva', 'Graphic Design', 'Digital Signage'],
    features: [
      'High-contrast, legible layout designed for on-wall viewing',
      'Clear item names and pricing in KSh',
      'Vibrant food imagery for appetite appeal',
      'Easy to update as the menu changes',
    ],
    challenges: 'Balancing visual impact with legibility at a distance while keeping the board quick to update.',
    outcome: 'In use at the café, improving how customers engage with the menu.',
    links: { live: 'https://www.canva.com/design/DAGLO_iUvYg/vOu9ydtr_24cthBmunSI1Q/watch' },
  },
];
