/* Deterministic short hash for cache-busting the og:image URL.
   The og card PNG lives at a stable path (/og/notes/<slug>.png); we append
   ?v=<hash> so the URL changes ONLY when the card's content changes, which
   busts Cloudflare AND social-platform (LinkedIn etc.) caches automatically.

   IMPORTANT: bump CARD_DESIGN whenever the card LAYOUT/palette changes in
   src/pages/og/[...slug].png.ts (data stays the same but pixels change), so all
   cards re-bust. */
export const CARD_DESIGN = 'c1';

// FNV-1a → base36. Deterministic, dependency-free, no Node/browser globals.
function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

// parts: the fields that determine the rendered card, in a stable order.
export function ogVersion(parts) {
  return fnv1a(CARD_DESIGN + '|' + parts.map((p) => String(p ?? '')).join(''));
}
