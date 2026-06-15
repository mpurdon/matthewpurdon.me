# State of AI — Design System

A dark, data-forward UI kit extracted from the **State of AI 2026** report aesthetic
(source site: `https://2026.stateofai.dev`). Warm charcoal canvas, cream text, an amber
brand gradient, and **IBM Plex Mono as the primary typeface** for everything — body,
navigation, headings, and code. The vocabulary is editorial data-journalism: oversized
mono figures, horizontal gradient bar charts, sentiment/experience color scales, and
crisp near-square surfaces on a near-black background.

> If you only read one thing: **set type in IBM Plex Mono, paint on warm charcoal
> `#242220`, lead with one big amber number, and keep corners crisp.**

---

## Reading & editorial layer (matthewpurdon.me)

The system was extended to power **matthewpurdon.me**, a personal technical blog — a
warmer, magazine-flavoured, more readable face of the same brand. What this layer adds
on top of the report foundations:

- **A reading typeface.** IBM Plex Serif for long-form article body (the report's all-mono
  setting is tiring at article length). Headings, UI, code, and labels stay IBM Plex Mono;
  serif and mono share Plex metrics so the pairing is seamless. See `--font-prose`.
- **A Canadian co-brand.** A refined "Canada red" ramp (`--canada-500 #d52b1e`, flag-adjacent
  but warmed so it harmonises with amber rather than clashing). It carries in-article links,
  the maple mark, the soap-box, and editorial accents. Amber stays the primary brand; red is
  the second voice. The **maple leaf** (`assets/maple-leaf.svg`, `<MapleLeaf/>`) is the only
  literal Canadian motif — used as seasoning (masthead, footer, soap-box, dividers), never a
  background pattern. Keep the Canadian flavour in the *copy* light and dry (metric units,
  the odd place name / "eh"), never kitschy.
- **Magazine devices.** `Callout` (note/tip/warning/takeaway), the signature **`Soapbox`**
  — a *Fluent-Python-style* personal side-discussion: a titled, multi-paragraph essay block
  (`section`, default) where the author steps off-topic to rant, plus shorter `inline` and
  floating `aside` variants. Also `PullQuote`, captioned `CodeBlock`, `Byline`, `ArticleCard`
  (hero/grid/list), and a `Prose` wrapper that styles raw article markup. Covers are
  **typographic** by default (gradient + category eyebrow, matching the photo-less source
  aesthetic); drop in an `<img>` or a root-level `<image-slot>` for photos.
- **Topics / tags.** Posts are filed under topic tags (red `#` chips). The home has a
  "Browse by topic" cloud, articles end with a "Filed under" row, and `topic.html` is a tag
  landing page (topic header, filtered post list, related topics).

---

## Sources

This system was reverse-engineered from a real monorepo provided as a read-only
mounted codebase:

- **Codebase:** `mp-design-system/` (pnpm + Turborepo monorepo)
  - `packages/tokens/` — CSS variables (`src/tokens.css`), typed TS exports
    (`colors.ts`, `typography.ts`, `spacing.ts`, `animation.ts`), Tailwind config.
  - `packages/components/` — 25 React + Tailwind components (Button, Card, Badge,
    Banner, Input, Select, Checkbox, Switch, Radio, Table, Tabs, Dialog, Dropdown,
    Tooltip, Toast, Sidebar, Pagination, Accordion, Avatar, Spinner, Progress,
    FlipCard, BarChart, LineChart).
  - `packages/cli/` — an `ds-ui` shadcn-style CLI (init / add / list / diff).
  - `apps/storybook/` — Storybook 8 dark-themed catalog.
- **Visual origin:** the public *State of AI 2026* survey-report site. The token file
  notes colors were "extracted directly from the live site's inline styles and
  compiled stylesheet."

No logo, font binary, or image asset ships in that repo — fonts load from Google
Fonts, and all iconography is inline SVG. See **Iconography** and **Caveats** below.

---

## Content fundamentals

The product is a **survey/report**, so copy reads like a data desk annotating findings —
precise, declarative, lightly editorial. Never salesy.

- **Voice & person.** Third-person and impersonal about the data ("76% of respondents
  report daily use"). Second person ("you") only in product chrome / CTAs ("Get the
  report", "Filter your view"). Avoid first-person "we" except in a clearly-bylined intro.
- **Tone.** Authoritative, dry, a little wry. Findings are stated flatly and let the
  number carry the weight. No hype words ("revolutionary", "game-changing"). No emoji.
- **Casing.** Sentence case for headings and body. **UPPERCASE with wide tracking** for
  the mannered elements: buttons, nav items, eyebrow/kicker labels, table column heads,
  badge text, axis labels. This uppercase-mono-eyebrow is the signature.
- **Numbers.** Always the hero. Percentages with a `%` glyph, tabular figures, deltas
  shown as `▲ +12 pts` / `▼ −3 pts` with the year-over-year basis spelled out. Round to
  whole percents in display, keep decimals in tables.
- **Labels & microcopy.** Terse. "Daily active use", "Net sentiment", "Most adopted",
  "Among 2,400 respondents". Footnotes carry methodology ("vs. 2025 survey", "n = 2,400").
- **Eyebrows.** Short ALL-CAPS kickers sit above a stat or section title
  ("EXPERIENCE TIER", "SENTIMENT", "MODEL ADOPTION").

Examples of the house style:

- ✅ "76% — Daily active use · +12 pts YoY"
- ✅ "MODEL ADOPTION — Share of respondents using each model weekly"
- ❌ "Wow, AI adoption is exploding 🚀 — see how WE changed everything!"

---

## Visual foundations

**Palette & vibe.** A warm dark theme, not a cold one. The background is warm charcoal
`#242220` (a hair of brown in it, never blue-black). Primary text is **cream `#FFF6E6`**,
not pure white; muted text is the same cream at 50% opacity. The brand is **amber
`#fcac3c`**, almost always delivered as a left-to-right gradient `#b7781f → #fcac3c`
(bar fills, the wordmark). Interactive accent is **indigo `#818cf8`** (default buttons,
active nav, focus rings). **Teal `#41c7c7`** is the cool data accent. A wider ordered
chart palette (amber → indigo → teal → pink → mint → lavender → sky → red → orange →
warm-teal) drives multi-series viz. "Inverted" sections flip to a **cream `#FFF6E6`
background with dark `#272325` ink** — used sparingly for emphasis breaks.

**Type.** IBM Plex Mono everywhere (400/500/600/700). Inter is a secondary sans reserved
only for dense UI chrome (tight table cells) where the wide mono advance crowds. Display
figures are huge (up to ~88px) and tight-tracked; eyebrows and buttons are uppercase
with `0.08–0.14em` tracking. Headings lean 600–700.

**Spacing & layout.** A named scale (quarter 8 / half 16 / base 32 / double 64 / triple
96 / quad 128) plus a numeric rem scale. Generous vertical rhythm between report
sections; dense within data tables. Layout is grid-driven and editorial — wide measure
for charts, fixed sidebars at 256px (collapsing to 64px).

**Backgrounds.** Flat warm charcoal — **no busy gradients, no photographic hero imagery,
no hand-drawn illustration, no textures.** The only gradients are functional: amber bar
fills and the wordmark. Emphasis comes from the cream "inverted" section flip, not from
background decoration.

**Corners & surfaces.** Crisp. Inputs/chips 4px, buttons 6px, cards 8px, dialogs/flip
cards 12px; full pills only for badges and avatars. Cards are a raised charcoal surface
`#272325` with a 1px hairline border (cream at ~16% opacity). No heavy outlines.

**Borders.** Hairlines. `rgba(255,246,229,0.16)` default, `0.35` for stronger dividers,
solid cream for high-contrast outlines. Buttons use a **2px** border (the chunky bordered
button is a signature).

**Shadows & glow.** Two systems. (1) Deep, soft, near-black drop shadows for elevation
(`0 12px 24px rgba(0,0,0,0.7)` etc.) — appropriate for a dark theme. (2) Accent **glow**
shadows (`0 0 24px` of amber / indigo / teal at 30%) reserved for emphasised or "award"
cards. No glow on ordinary surfaces.

**Animation.** Quick and functional. Standard easing `cubic-bezier(0.4,0,0.2,1)` at
100–300ms. Hover and focus are color/opacity transitions, not movement. One **bounce**
easing `cubic-bezier(0.34,1.56,0.64,1)` is reserved for playful moments (the FlipCard 3D
flip, ~500ms). Bars animate width on mount. No infinite/looping decorative motion.

**Interaction states.**
- *Hover* — outline/ghost buttons get a 10% tinted wash of their accent; solid amber goes
  a step warmer (`#ec9c23`); rows shift to the amber-tinted hover surface `#56442b`;
  links underline.
- *Focus* — a 2–3px ring in the control's accent (indigo for neutral fields, amber for
  brand, error-red for invalid), offset against the page color.
- *Press* — buttons scale to `0.98` (no color flip on press).
- *Disabled* — 40% opacity, pointer events off.

**Transparency & blur.** Used lightly. Tints are solid-color at low alpha (badge fills at
~16–20%, hover washes at 10%). No frosted-glass blur in the core system — keep it flat.

---

## Iconography

The source repo ships **no icon font and no SVG asset files** — every icon is an inline
SVG drawn in component code (the spinner, the banner dismiss ✕, select/accordion chevrons,
the bar-chart markers). They are a consistent **outline style: 2px stroke, round caps and
joins, 24×24 viewBox, `currentColor`** — i.e. the Lucide / Heroicons (outline) idiom.

**Guidance for this system:**
- Match the existing idiom: **outline, stroke-width 2, round caps/joins, `currentColor`**.
- For coverage beyond the handful in the repo, use **[Lucide](https://lucide.dev)** from
  CDN — it is the closest match to the hand-rolled SVGs already present. *(Substitution —
  flagged in Caveats; swap for the brand's own set if one exists.)*
- Inline small glyphs (chevrons, ✕, search) directly as SVG, sized to the text.
- **Emoji are not used.** A few Unicode glyphs appear as data marks only: `▲`/`▼` for
  deltas, `∅` for averages, `→` in links, `✕` for dismiss/remove. Keep to that set.

---

## Index / manifest

**Root**
- `styles.css` — global entry point (imports only). Link this one file.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skills front-matter wrapper for Claude Code use.

**`tokens/`** (each `@import`ed by `styles.css`)
- `fonts.css` — Google Fonts (`IBM Plex Mono`, `IBM Plex Serif`, `Inter`).
- `colors.css` — base palette + semantic aliases + **Canada-red co-brand** + editorial/prose/code roles.
- `typography.css` — families (incl. `--font-serif`/`--font-prose`), scale, weights, tracking, prose rhythm.
- `spacing.css` — spacing, radii, shadows, glows, z-index, motion.
- `base.css` — reset + document defaults (charcoal canvas, cream mono body).

**`components/`** (React primitives — `window.StateOfAIDesignSystem_c9312a`)
- `buttons/` — Button, ButtonGroup
- `card/` — Card (+ Header/Title/Description/Content/Footer), StatBlock
- `badge/` — Badge, Tag
- `forms/` — Input, Select, Checkbox, Radio, Switch
- `feedback/` — Banner, Toast, Spinner, Progress, Tooltip
- `navigation/` — Tabs, Sidebar
- `data/` — BarChart, DataTable
- `brand/` — MapleLeaf, Wordmark *(Canadian identity)*
- `callout/` — Callout (note/tip/warning/takeaway), **Soapbox** (opinion — inline + margin aside)
- `editorial/` — Prose, PullQuote, CodeBlock, Byline, ArticleCard

**`guidelines/`** — foundation specimen cards (Type / Colors / Spacing) for the
Design System tab.

**`assets/`** — `maple-leaf.svg` (the brand mark; tint via `currentColor`).

**`ui_kits/`** — full-screen recreations.
- `report/` — the *State of AI* survey-report reader (hero stats, bar charts, sentiment,
  ranking table, inverted section).
- `blog/` — **matthewpurdon.me** technical blog: `index.html` (home — masthead, featured
  hero, card grid, dense list, browse-by-topic cloud), `article.html` (single post — serif
  prose, soap-box side-discussion, callouts, pull-quote, captioned code, filed-under tags,
  author bio), and `topic.html` (tag landing — topic header, filtered post list, related
  topics). On the home, the featured card opens the article and topic chips open the topic
  view in place.

---

## Caveats / substitutions

- **Fonts** load from Google Fonts (no binaries existed in the source repo). Self-host by
  dropping `.woff2` files in `assets/fonts` and swapping the `@import` for `@font-face`.
- **Icons** are substituted with **Lucide** (CDN) — the closest match to the repo's
  inline outline SVGs. Replace if an official set exists.
- **No logo** exists in the source; the report wordmark is a CSS type treatment ("STATE OF
  AI" in mono with the amber gradient), not an asset.
- **The maple-leaf mark** (`assets/maple-leaf.svg`) was drawn for this system — there was no
  Canadian identity in the source. Swap it if you have an official mark.
- **Canada red** (`#d52b1e`) is a design decision for the blog, not extracted from a source —
  tune the ramp in `tokens/colors.css` to taste.

---

## SEO, SSG, and Accessibility Mandates (matthewpurdon.me)

To ensure `matthewpurdon.me` remains "best in breed" regarding indexability, search engine ranking, AI crawler scraping, and WCAG 2.1 AA accessibility, any future additions, notes, projects, or refactors must adhere strictly to these architectural mandates:

1. **HTML-First Static Pre-Rendering (SSG):**
   - The website operates on **Astro 5 SSG**. 100% of the textual content, article bodies, and core layout elements must compile to statically pre-rendered semantic HTML in the initial HTTP response.
   - Client-side React routing click intercepts are forbidden unless a routing function (`go`, `openPost`, etc.) is explicitly passed as a prop. All standard navigation links must fallback natively to standard browser `href` anchors so that search crawlers and social unfurlers can traverse pages seamlessly.
2. **SSR/SSG Compatibility for React Components:**
   - The design system IIFE bundle (`bundle.js`) binds to `window`. Because Node.js has no `window` object during static compilation, `src/ds/react-global.js` shims `global.window = global`.
   - Any new React components must remain SSR-safe. Always guard browser-only globals (like `document`, `window`, `navigator`, `localStorage`) behind conditional `typeof object !== 'undefined'` checks before accessing them.
3. **Structured Data JSON-LD Schemas:**
   - Standalone article/note routes must inject a dynamic `BlogPosting` schema.
   - Lab Reports details must inject a dynamic `SoftwareApplication` (for Software types) or `CreativeWork` (for Process types) schema.
   - These schemas must accurately map title, date, canonical URL, and authors to ensure optimal indexing by AI search engines.
4. **Accessible Naming & Keyboard Navigation (a11y):**
   - The global layout includes a hidden **"Skip to content"** link at the very top of the `<body>` pointing to `<main id="main-content" tabindex="-1">` to support keyboard-only screen readers.
   - Every icon-only link (such as top-navigation icon anchors) must carry a highly descriptive, accessible name (`aria-label="Matthew Purdon on GitHub"`). Never leave pure icons bare.
