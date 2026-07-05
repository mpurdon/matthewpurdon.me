/* Generates per-article social/OG cards into public/og/{notes,lab}/<slug>.png.
   Runs as part of `npm run build`, BEFORE `astro build` (so public/ is copied
   into dist/). Pure build-time: renders the site's own type + palette through
   Satori -> resvg. No AI, no network. See homepage-featured-strategy for context. */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { POSTS, PROJECTS, postNumber } from '../src/data.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const font = (w) => readFileSync(resolve(__dirname, `og-fonts/PlexMono-${w}.ttf`));
const fonts = [400, 500, 600, 700].map((w) => ({ name: 'IBM Plex Mono', data: font(w), weight: w, style: 'normal' }));

// tiny hyperscript for Satori's element tree (no HTML parsing / entity escaping)
const h = (type, style, ...children) => ({ type, props: { style, children: children.flat() } });
const img = (src, style) => ({ type: 'img', props: { src, style } });

const LEAF = 'm-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z';
const leaf = (color) =>
  'data:image/svg+xml;base64,' +
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2015 -2000 4030 4030"><path fill="${color}" d="${LEAF}"/></svg>`).toString('base64');

// palette straight from src/ds/tokens/colors.css
const BG = '#242220', CREAM = '#FFF6E6', MUTED = '#a49b91', DEK = '#c4bcb1', RED = '#d52b1e';
const ACCENT = {
  amber:  { edge: '#fcac3c', glow: 'rgba(252,172,60,0.16)' },
  indigo: { edge: '#a5b4fc', glow: 'rgba(129,140,248,0.18)' },
  teal:   { edge: '#47cfed', glow: 'rgba(65,199,199,0.16)' },
  canada: { edge: '#f4837a', glow: 'rgba(213,43,30,0.20)' },
};

// Card blurb: substantive part of the dek (drop the trailing "On X, Y, Z"), trimmed to ~2 lines.
const blurb = (text) => {
  const s = (text || '').split(/\.\s+On\s/)[0].trim();
  const withDot = /[.!?:]$/.test(s) ? s : s + '.';
  if (withDot.length <= 158) return withDot;
  const cut = withDot.slice(0, 156);
  const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '));
  return (lastStop > 90 ? cut.slice(0, lastStop + 1) : cut.slice(0, cut.lastIndexOf(' ')) + '…');
};

function card({ eyebrow, category, title, dek, footer, accent }) {
  const a = ACCENT[accent] || ACCENT.amber;
  return h('div',
    { width: 1200, height: 630, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', background: BG, padding: 72, fontFamily: 'IBM Plex Mono', overflow: 'hidden' },
    h('div', { position: 'absolute', top: -260, right: -200, width: 760, height: 760, display: 'flex', background: `radial-gradient(circle at center, ${a.glow}, transparent 60%)` }),
    h('div', { position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, display: 'flex', background: a.edge }),

    h('div', { display: 'flex', alignItems: 'center' },
      img(leaf(RED), { width: 30, height: 30, marginRight: 15 }),
      h('div', { display: 'flex', fontSize: 19, fontWeight: 600, letterSpacing: 4, color: MUTED }, eyebrow),
    ),

    h('div', { display: 'flex', flexDirection: 'column' },
      h('div', { display: 'flex', fontSize: 21, fontWeight: 700, letterSpacing: 4, color: a.edge, marginBottom: 22 }, category.toUpperCase()),
      h('div', { display: 'flex', fontSize: 60, fontWeight: 700, letterSpacing: -2, lineHeight: 1.08, color: CREAM, maxWidth: 1040 }, title),
      h('div', { display: 'flex', fontSize: 25, fontWeight: 400, lineHeight: 1.44, color: DEK, marginTop: 28, maxWidth: 940 }, blurb(dek)),
    ),

    h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
      h('div', { display: 'flex', fontSize: 19, fontWeight: 500, letterSpacing: 3, color: MUTED }, (footer || '').toUpperCase()),
      h('div', { display: 'flex', width: 76, height: 5, background: a.edge }),
    ),
  );
}

async function render(spec, outPath) {
  const svg = await satori(card(spec), { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, png);
}

let n = 0;
for (const p of POSTS) {
  await render(
    { eyebrow: `MATTHEWPURDON.ME · FIELD NOTES ${postNumber(p)}`, category: p.category, title: p.title, dek: p.dek, footer: p.time, accent: p.accent },
    resolve(root, `public/og/notes/${p.slug}.png`),
  );
  n++;
}
for (const pr of PROJECTS) {
  await render(
    { eyebrow: 'MATTHEWPURDON.ME · LAB REPORT', category: pr.type, title: pr.name, dek: pr.tagline, footer: pr.status, accent: pr.accent },
    resolve(root, `public/og/lab/${pr.slug}.png`),
  );
  n++;
}
console.log(`og cards written (${n}) -> public/og/{notes,lab}/`);
