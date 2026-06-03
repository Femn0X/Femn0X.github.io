# ✦ Femn0X — Portfolio

Personal portfolio site built with **Vue 3** and **Vite**. Fully static — no server-side code — designed for deployment on GitHub Pages or any static host.

**Live:** [femn0x.github.io](https://femn0x.github.io)  
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

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

The built output lands in `dist/`.

---

## Deploying to GitHub Pages

### Option A — Upload dist/ manually

1. Run `npm run build`
2. Push the contents of `dist/` to your `gh-pages` branch (or repo root for `username.github.io` repos)

### Option B — GitHub Actions (recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

> **Why hash mode?** Vue Router uses `createWebHashHistory()` so all routes work without server configuration. URLs look like `femn0x.github.io/#/project/velocity-dashboard` — GitHub Pages handles this perfectly.

---

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
