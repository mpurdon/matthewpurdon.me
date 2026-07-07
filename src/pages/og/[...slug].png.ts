/* Per-entry social/OG cards at /og/notes/<slug>.png and /og/lab/<slug>.png.
   Ports scripts/generate-og.mjs verbatim (LEAF, palette, ACCENT, blurb, card),
   rendered at build time through Satori -> resvg. Sourced from the content
   loaders. Deliberately imports NO design-system / CSS — just satori, resvg,
   fonts, and the loaders. */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getNotes, getProjects } from '../../lib/content.js';

const font = (w: number) =>
  readFileSync(fileURLToPath(new URL(`../../../scripts/og-fonts/PlexMono-${w}.ttf`, import.meta.url)));
const fonts = [400, 500, 600, 700].map((w) => ({
  name: 'IBM Plex Mono',
  data: font(w),
  weight: w as 400 | 500 | 600 | 700,
  style: 'normal' as const,
}));

// tiny hyperscript for Satori's element tree (no HTML parsing / entity escaping)
const h = (type: string, style: any, ...children: any[]) => ({ type, props: { style, children: children.flat() } });
const img = (src: string, style: any) => ({ type: 'img', props: { src, style } });

const LEAF =
  'm-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z';
const leaf = (color: string) =>
  'data:image/svg+xml;base64,' +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2015 -2000 4030 4030"><path fill="${color}" d="${LEAF}"/></svg>`
  ).toString('base64');

// palette straight from src/ds/tokens/colors.css
const BG = '#242220',
  CREAM = '#FFF6E6',
  MUTED = '#a49b91',
  DEK = '#c4bcb1',
  RED = '#d52b1e';
const ACCENT: Record<string, { edge: string; glow: string }> = {
  amber: { edge: '#fcac3c', glow: 'rgba(252,172,60,0.16)' },
  indigo: { edge: '#a5b4fc', glow: 'rgba(129,140,248,0.18)' },
  teal: { edge: '#47cfed', glow: 'rgba(65,199,199,0.16)' },
  canada: { edge: '#f4837a', glow: 'rgba(213,43,30,0.20)' },
};

// Card blurb: drop the dek's trailing "On X, Y, Z", then keep as many whole
// sentences as fit (~2-3 lines). Never ends mid-clause; only ellipsizes if a
// single sentence overflows the budget.
const blurb = (text: string) => {
  const MAX = 170;
  let base = (text || '').split(/\.\s+On\s/)[0].trim();
  if (base && !/[.!?]$/.test(base)) base += '.';
  const sentences = base.match(/[^.!?]+[.!?]+/g);
  if (sentences) {
    let out = '';
    for (const s of sentences) {
      if ((out + s).trim().length > MAX) break;
      out += s;
    }
    if (out.trim()) return out.trim();
  }
  const cut = base.slice(0, MAX);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s.,:;–—-]+$/, '') + '…';
};

function card({ eyebrow, category, title, dek, footer, accent }: any) {
  const a = ACCENT[accent] || ACCENT.amber;
  return h(
    'div',
    { width: 1200, height: 630, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', background: BG, padding: 72, fontFamily: 'IBM Plex Mono', overflow: 'hidden' },
    h('div', { position: 'absolute', top: -260, right: -200, width: 760, height: 760, display: 'flex', background: `radial-gradient(circle at center, ${a.glow}, transparent 60%)` }),
    h('div', { position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, display: 'flex', background: a.edge }),

    h('div', { display: 'flex', alignItems: 'center' },
      img(leaf(RED), { width: 30, height: 30, marginRight: 15 }),
      h('div', { display: 'flex', fontSize: 19, fontWeight: 600, letterSpacing: 4, color: MUTED }, eyebrow)
    ),

    h('div', { display: 'flex', flexDirection: 'column' },
      h('div', { display: 'flex', fontSize: 21, fontWeight: 700, letterSpacing: 4, color: a.edge, marginBottom: 22 }, category.toUpperCase()),
      h('div', { display: 'flex', fontSize: 60, fontWeight: 700, letterSpacing: -2, lineHeight: 1.08, color: CREAM, maxWidth: 1040 }, title),
      h('div', { display: 'flex', fontSize: 25, fontWeight: 400, lineHeight: 1.44, color: DEK, marginTop: 28, maxWidth: 940 }, blurb(dek))
    ),

    h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
      h('div', { display: 'flex', fontSize: 19, fontWeight: 500, letterSpacing: 3, color: MUTED }, (footer || '').toUpperCase()),
      h('div', { display: 'flex', width: 76, height: 5, background: a.edge })
    )
  );
}

async function toPng(spec: any) {
  const svg = await satori(card(spec) as any, { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}

export async function getStaticPaths() {
  const notes = await getNotes();
  const projects = await getProjects();
  return [
    ...notes.map((p) => ({ params: { slug: `notes/${p.slug}` }, props: { kind: 'note', data: p } })),
    ...projects.map((p) => ({ params: { slug: `lab/${p.slug}` }, props: { kind: 'lab', data: p } })),
  ];
}

export async function GET({ props }: any) {
  const { kind, data } = props;
  const spec =
    kind === 'note'
      ? { eyebrow: `MATTHEWPURDON.ME · FIELD NOTES ${data.number}`, category: data.category, title: data.title, dek: data.dek, footer: data.time, accent: data.accent }
      : { eyebrow: 'MATTHEWPURDON.ME · LAB REPORT', category: data.type, title: data.name, dek: data.tagline, footer: data.status, accent: data.accent };
  const png = await toPng(spec);
  return new Response(png as any, { headers: { 'Content-Type': 'image/png' } });
}
