# matthewpurdon.me

Personal site of Matthew Purdon — Field Notes (writing on AI-assisted engineering and
the new SDLC) and the Lab (things built, software and process).

React + Vite single-page app on a custom design system (warm charcoal, IBM Plex Mono +
Serif, amber brand, Canada-red co-brand). See `src/ds/README.md` for the full design
system guide.

## Develop

```sh
npm install
npm run dev        # local dev server
npm run build      # production build → dist/ (also generates feed.xml)
npm run preview    # serve the production build locally
```

## Structure

```
index.html              SEO head + app mount point
src/
  main.jsx              entry — mounts <App/>
  app.jsx               hash router + page chrome
  data.js               all content: profile, topics, posts, lab projects
  chrome.jsx            masthead + footer
  home.jsx / notes.jsx / article.jsx / lab.jsx / about.jsx   views
  shared.jsx            covers, chips, badges, layout helpers
  ds/                   design system: tokens (CSS), component bundle, docs
public/                 favicon, robots.txt, _headers
scripts/generate-feed.mjs   RSS feed built from src/data.js
.github/workflows/deploy.yml   CI deploy to Cloudflare Pages
```

Routes are hash-based: `#notes`, `#notes/<slug>`, `#lab`, `#lab/<slug>`,
`#topic/<name>`, `#about`.

## Content

Everything editable lives in `src/data.js` (posts, projects, profile, topics) and
`src/article.jsx` (the featured essay's body). Add a post by appending to `POSTS`.

## Deploy

Hosted on Cloudflare Pages (project `matthewpurdon-me`). Pushes to `main` deploy
via GitHub Actions (`.github/workflows/deploy.yml`), which needs two repo secrets:
`CLOUDFLARE_API_TOKEN` (Cloudflare Pages — Edit) and `CLOUDFLARE_ACCOUNT_ID`.

Manual deploy from a machine with wrangler auth: `npm run deploy`.
