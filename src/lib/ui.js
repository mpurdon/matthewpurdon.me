/* matthewpurdon.me — pure view utilities (no React). Formerly in shared.jsx. */

// Maple-leaf SVG path — the brand mark.
export const LEAF = 'm-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z';

const ACCENTS = {
  amber:  { fill: 'rgba(252,172,60,0.22)', edge: 'var(--amber-300)', solid: '#fcac3c' },
  canada: { fill: 'rgba(213,43,30,0.30)', edge: 'var(--canada-300)', solid: '#f4837a' },
  teal:   { fill: 'rgba(65,199,199,0.22)', edge: 'var(--teal-400)', solid: '#47cfed' },
  indigo: { fill: 'rgba(129,140,248,0.24)', edge: 'var(--indigo-400)', solid: '#a5b4fc' },
};
export const accent = (a) => ACCENTS[a] || ACCENTS.amber;

// Eyebrow / kicker colour, dialled by the red-intensity setting.
export function kicker(t) { return t && t.red === 'subtle' ? 'var(--text-muted)' : 'var(--canada-300)'; }

// Section vertical rhythm from the density setting.
export function pad(t, comfy, compact) { return (t && t.density === 'compact') ? compact : comfy; }

// type → accent + label colour for Lab.
export const TYPE_META = {
  Software: { color: 'var(--teal-400)', dot: '#47cfed' },
  Process: { color: 'var(--amber-300)', dot: '#fcac3c' },
};

export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
