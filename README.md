# ✦ Femn0X — Portfolio

Personal portfolio site built with **Vue 3** and **Vite**. Fully static — no server-side code — designed for deployment on GitHub Pages or any static host.

**Live:** [femn0x.github.io](https://femn0x.github.io/dist/index.html)  
**Author:** Luca Winecker ([@Femn0X](https://github.com/Femn0X))  
**Email:** lucawinecker@gmail.com

---

## Stack

| Tool | Purpose |
|------|---------|
| Vue 3 (Composition API) | UI framework |
| Vite 8 | Build tool |
| Vue Router 4 (hash mode) | Client-side routing |
| Google Fonts | Typography (Bebas Neue, DM Sans, DM Mono) |
| Vanilla CSS + CSS Variables | Styling |

No UI library, no Tailwind, no SSR — just clean Vue + CSS.

---

## Project Structure

```
src/
├── assets/
│   └── global.css          # CSS variables, resets, scrollbar
├── components/
│   ├── NavBar.vue
│   ├── HeroSection.vue
│   ├── AboutSection.vue
│   ├── SkillsSection.vue
│   ├── ProjectsSection.vue
│   └── ContactSection.vue
├── data/
│   └── projects.js         # All project data (edit this to add your own)
├── router/
│   └── index.js            # Hash-mode router
├── views/
│   ├── HomeView.vue        # Landing page (all sections)
│   └── ProjectView.vue     # Individual project detail page
├── App.vue
└── main.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

## Adding Your Own Projects

Edit `src/data/projects.js` — each project object has:

```js
{
  slug: 'my-project',          // URL slug → /project/my-project
  title: 'My Project',
  subtitle: 'Short description',
  desc: 'Card description (shown in grid)',
  year: '2024',
  icon: '🚀',                  // Emoji displayed on card & detail page
  bg: 'linear-gradient(...)',  // Card background gradient
  accentColor: '#e8ff47',      // Highlight color on detail page
  tags: ['Vue 3', 'Vite'],
  status: 'Completed',         // Completed | Live | Open Source
  role: 'Solo Developer',
  duration: '2 months',
  github: 'https://github.com/Femn0X/my-project',
  live: null,                  // or 'https://...'
  overview: '...',
  features: ['Feature 1', 'Feature 2'],
  techDetails: [
    { label: 'Framework', value: 'Vue 3' },
  ],
  challenges: '...',
}
```

---

## Customizing Contact Info

Open `src/components/ContactSection.vue` and update the `<template>` links with your own email, GitHub, and LinkedIn URLs.

---

## License

ISC — see [LICENSE](./LICENSE)
