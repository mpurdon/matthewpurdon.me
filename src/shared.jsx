/* matthewpurdon.me — shared view helpers (covers, labels, chips, accents). */
import { useEffect } from 'react';

const ACCENTS = {
  amber:  { fill: 'rgba(252,172,60,0.22)', edge: 'var(--amber-300)', solid: '#fcac3c' },
  canada: { fill: 'rgba(213,43,30,0.30)', edge: 'var(--canada-300)', solid: '#f4837a' },
  teal:   { fill: 'rgba(65,199,199,0.22)', edge: 'var(--teal-400)', solid: '#47cfed' },
  indigo: { fill: 'rgba(129,140,248,0.24)', edge: 'var(--indigo-400)', solid: '#a5b4fc' },
};
export const accent = (a) => ACCENTS[a] || ACCENTS.amber;

// Eyebrow / kicker colour, dialled by the red-intensity setting.
export function kicker(t) { return t && t.red === 'subtle' ? 'var(--text-muted)' : 'var(--canada-300)'; }

export function SectionLabel({ children, t, style }) {
  return (
    <h2 style={{ fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-muted)', margin: '0 0 20px', ...style }}>
      {children}
    </h2>
  );
}

// Typographic cover — on-brand, photo-less. `ratio` e.g. '16 / 9' or '4 / 3'.
export function TypoCover({ category, accent: a = 'amber', ratio = '16 / 9', big, height, labelSize = 'var(--text-xs)', centerLabel = false }) {
  const c = accent(a);
  return (
    <div style={{
      position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border)', aspectRatio: height ? undefined : ratio, height,
      background: centerLabel
        ? `radial-gradient(55% 320% at 100% 50%, ${c.fill} 0%, transparent 62%), radial-gradient(45% 260% at 72% 50%, ${c.fill} 0%, transparent 70%), linear-gradient(135deg, var(--bg-elevated), var(--bg-surface))`
        : `radial-gradient(120% 150% at 100% 0%, ${c.fill} 0%, transparent 55%), linear-gradient(135deg, var(--bg-elevated), var(--bg-surface))`,
      display: 'flex', flexDirection: 'column', justifyContent: centerLabel ? 'center' : 'space-between', padding: '1rem 1.1rem',
    }}>
      <span style={{ fontFamily: 'var(--font-label)', fontSize: labelSize, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', color: c.edge }}>{category}</span>
      {big && <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(2.2rem, 6vw, 3.4rem)', lineHeight: 0.95, letterSpacing: '-0.04em', color: 'var(--text-primary)', opacity: 0.92, alignSelf: 'flex-end' }}>{big}</span>}
    </div>
  );
}

// Article/section cover. `id` kept for call-site stability; covers are typographic.
export function Cover({ category, accent = 'amber', ratio = '16 / 9', big, height, labelSize, centerLabel }) {
  return <TypoCover category={category} accent={accent} ratio={ratio} big={big} height={height} labelSize={labelSize} centerLabel={centerLabel} />;
}

// Red-aware topic chip.
export function TopicChip({ label, count, onClick, t, size = 'md' }) {
  const subtle = t && t.red === 'subtle';
  const pad = size === 'sm' ? '0.3rem 0.7rem' : '0.5rem 0.9rem';
  return (
    <a href={'/topic/' + encodeURIComponent(label)} onClick={(e) => { e.preventDefault(); onClick && onClick(label); }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        fontFamily: 'var(--font-mono)', fontSize: size === 'sm' ? 'var(--text-xs)' : 'var(--text-sm)',
        color: subtle ? 'var(--text-secondary)' : 'var(--canada-300)', textDecoration: 'none',
        padding: pad, borderRadius: 'var(--radius-full)',
        border: subtle ? '1px solid var(--border)' : '1px solid rgba(213,43,30,0.32)',
        background: subtle ? 'var(--bg-surface)' : 'rgba(213,43,30,0.08)',
        transition: 'border-color var(--duration-base) var(--ease), background var(--duration-base) var(--ease)',
      }}>
      <span style={{ color: subtle ? 'var(--canada-300)' : 'inherit' }}>#</span>{label}
      {count != null && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{count}</span>}
    </a>
  );
}

// Section vertical rhythm from the density setting.
export function pad(t, comfy, compact) { return (t && t.density === 'compact') ? compact : comfy; }

// type → accent + label colour for Lab.
export const TYPE_META = {
  Software: { color: 'var(--teal-400)', dot: '#47cfed' },
  Process: { color: 'var(--amber-300)', dot: '#fcac3c' },
};

export function Pill({ children, color, bg, border }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
      fontFamily: 'var(--font-label)', fontSize: 'var(--text-xs)', fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)',
      padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-full)',
      color: color || 'var(--text-secondary)', background: bg || 'transparent',
      border: border || '1px solid var(--border)',
    }}>{children}</span>
  );
}

export function TypeBadge({ type }) {
  const m = TYPE_META[type] || TYPE_META.Software;
  return <Pill color={m.color} border={`1px solid ${m.color}`} bg="transparent">
    <span style={{ width: 6, height: 6, borderRadius: 9999, background: m.dot }} />{type}
  </Pill>;
}

export function AIBadge() {
  return <Pill color="var(--indigo-400)" border="1px solid rgba(129,140,248,0.4)" bg="rgba(129,140,248,0.12)">AI-assisted</Pill>;
}

// Deep-linkable anchors. Gives every h2, Soapbox, and SoapboxFold inside a
// rendered body an id slugged from its title plus a red copy-link button
// (styles: .anchor-copy in site.css). DOM enhancement rather than components
// because the Soapbox markup lives inside the prebuilt DS bundle.
export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const LINK_SVG = '<svg class="anchor-copy__link" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
const CHECK_SVG = '<svg class="anchor-copy__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>';

function makeCopyButton(id) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'anchor-copy';
  b.title = 'Copy link to this section';
  b.setAttribute('aria-label', 'Copy link to this section');
  b.innerHTML = LINK_SVG + CHECK_SVG;
  b.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.history.replaceState(null, '', '#' + id);
    const url = window.location.origin + window.location.pathname + '#' + id;
    if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    b.classList.add('is-copied');
    setTimeout(() => b.classList.remove('is-copied'), 1400);
  });
  return b;
}

export function useDeepAnchors(ref, deps) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const seen = new Set();
    const assign = (base) => {
      let id = base || 'section';
      let n = 2;
      while (seen.has(id)) id = `${base}-${n++}`;
      seen.add(id);
      return id;
    };

    // Section headers: id + button on the h2 itself.
    root.querySelectorAll('h2').forEach((h) => {
      if (h.querySelector('.anchor-copy')) { seen.add(h.id); return; }
      const id = assign(slugify(h.textContent));
      h.id = id;
      h.appendChild(makeCopyButton(id));
    });

    // Soapboxes (full-width and asides). The copy of a Soapbox nested inside a
    // SoapboxFold has its chrome stripped, so the fold section is the anchor.
    root.querySelectorAll('.mp-soap, .soap-fold').forEach((el) => {
      if (el.classList.contains('mp-soap') && el.closest('.soap-fold')) return;
      if (el.querySelector(':scope > .anchor-copy, :scope .mp-soap__title .anchor-copy, :scope .mp-soap__eyebrow .anchor-copy')) { seen.add(el.id); return; }
      const title = el.querySelector('.mp-soap__title');
      const sign = el.querySelector('.mp-soap__sign');
      const foldTitle = el.classList.contains('soap-fold') ? el.querySelector('.soap-fold__head span:last-child') : null;
      const text = (foldTitle || title || sign)?.textContent;
      if (!text) return;
      const id = assign(slugify(text));
      el.id = id;
      const btn = makeCopyButton(id);
      if (el.classList.contains('soap-fold')) {
        // The fold header is itself a <button>; park the copy link on the
        // section, absolutely positioned (no nested buttons).
        btn.classList.add('anchor-copy--fold');
        el.appendChild(btn);
      } else if (title) {
        title.appendChild(btn);
      } else {
        const eyebrow = el.querySelector('.mp-soap__eyebrow');
        (eyebrow || el).appendChild(btn);
      }
    });

    // Deep link on load: wait out the router's scroll-to-top, then go there.
    const hash = decodeURIComponent((window.location.hash || '').slice(1));
    if (hash && seen.has(hash)) {
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (!el) return;
        if (el.classList.contains('soap-fold')) {
          const head = el.querySelector('.soap-fold__head');
          if (head && head.getAttribute('aria-expanded') === 'false') head.click();
        }
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
