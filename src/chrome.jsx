/* matthewpurdon.me — masthead + footer chrome. */
import DS from './ds/index.js';
import { PROFILE } from './data.js';

const { Button } = DS;

export const LEAF = 'm-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z';

export function Wordmark({ size = 19, leaf = 22 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}>
      <svg width={leaf} height={leaf} viewBox="-2015 -2000 4030 4030" fill="currentColor" style={{ color: 'var(--canada-500)' }}><path d={LEAF} /></svg>
      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: size, letterSpacing: '-0.02em', background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        matthew<span style={{ color: 'var(--text-primary)', WebkitTextFillColor: 'currentColor' }}>purdon</span>
      </span>
    </span>
  );
}

const NAV = [
  { key: 'notes', label: 'Field Notes' },
  { key: 'lab', label: 'Lab' },
  { key: 'about', label: 'About' },
];

export function Masthead({ view, go }) {
  const active = view === 'article' || view === 'topic' ? 'notes' : view === 'project' ? 'lab' : view === 'story' ? 'about' : view;
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 600,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: 68, padding: '0 32px', background: 'rgba(36,34,32,0.82)',
      backdropFilter: 'saturate(140%) blur(10px)', WebkitBackdropFilter: 'saturate(140%) blur(10px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <a href="/" onClick={(e) => { e.preventDefault(); go('home'); }} style={{ textDecoration: 'none' }} aria-label="matthewpurdon — home">
        <Wordmark />
      </a>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {NAV.map(n => (
          <a key={n.key} href={'/' + n.key} onClick={(e) => { e.preventDefault(); go(n.key); }} style={{
            fontFamily: 'var(--font-label)', fontSize: 'var(--text-xs)', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)',
            padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', textDecoration: 'none',
            transition: 'color var(--duration-base) var(--ease)',
            color: n.key === active ? 'var(--text-primary)' : 'var(--text-muted)',
          }}>{n.label}</a>
        ))}
        <span style={{ width: 12 }} />
        <a href={PROFILE.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
           style={{ display: 'inline-flex', color: 'var(--text-muted)', padding: '0.35rem', transition: 'color var(--duration-base) var(--ease)' }}
           onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
           onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/></svg>
        </a>
        <span style={{ width: 8 }} />
        <Button variant="solid" size="sm" onClick={() => go('notes')}>Read</Button>
      </nav>
    </header>
  );
}

function FooterCol({ title, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span style={{ fontFamily: 'var(--font-label)', fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', color: 'var(--text-muted)' }}>{title}</span>
      {children}
    </div>
  );
}

function FLink({ href, onClick, children, external }) {
  const props = external
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { href, onClick: (e) => { e.preventDefault(); onClick && onClick(); } };
  return (
    <a {...props} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', textDecoration: 'none', width: 'fit-content', transition: 'color var(--duration-base) var(--ease)' }}
       onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
       onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>{children}</a>
  );
}

export function Footer({ go }) {
  const L = PROFILE.links;
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '48px 32px', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 32 }}>
        <div>
          <Wordmark size={18} leaf={20} />
          <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: 300, marginTop: 14 }}>
            {PROFILE.tagline}
          </p>
        </div>
        <FooterCol title="Read">
          <FLink href="/notes" onClick={() => go('notes')}>Field Notes</FLink>
          <FLink href="/lab" onClick={() => go('lab')}>Lab</FLink>
          <FLink href="/about" onClick={() => go('about')}>About</FLink>
        </FooterCol>
        <FooterCol title="Elsewhere">
          <FLink href={L.github} external>GitHub</FLink>
          <FLink href={L.linkedin} external>LinkedIn</FLink>
          <FLink href={L.x} external>X / Twitter</FLink>
          <FLink href={L.instagram} external>Instagram</FLink>
        </FooterCol>
        <FooterCol title="Contact">
          <FLink href={'mailto:' + PROFILE.email} external>Email</FLink>
        </FooterCol>
      </div>
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '18px 32px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-disabled)' }}>
          <span>© 2026 Matthew Purdon · Toronto, Canada</span>
          <span>Set in IBM Plex Serif &amp; Mono · Made in Canada</span>
        </div>
      </div>
    </footer>
  );
}
