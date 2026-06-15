/* matthewpurdon.me — Lab index + project detail. */
import { useRef } from 'react';
import DS from './ds/index.js';
import { SectionLabel, pad, TypeBadge, AIBadge, kicker, TYPE_META, useDeepAnchors } from './shared.jsx';
import { PROJECTS } from './data.js';
import { PROJECT_BODIES } from './lab-bodies.jsx';

const { Button, Prose } = DS;

function StackRow({ stack }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {stack.map(s => (
        <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>{s}</span>
      ))}
    </div>
  );
}

function FeaturedProjectCard({ pr, openProject, t }) {
  const m = TYPE_META[pr.type] || TYPE_META.Software;
  return (
    <a href={'/lab/' + pr.slug} onClick={(e) => { e.preventDefault(); openProject(pr); }}
      style={{
        display: 'block',
        textDecoration: 'none',
        border: '1px solid var(--border)',
        borderTop: '4px solid ' + m.color,
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(180deg, rgba(36,34,32,0.6) 0%, rgba(26,24,22,0.4) 100%)',
        padding: 32,
        transition: 'border-color var(--duration-base) var(--ease)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        marginBottom: 32,
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = m.color}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <TypeBadge type={pr.type} />
          {pr.ai && <AIBadge />}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{pr.year}</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(24px, 3.5vw, 32px)', letterSpacing: '-0.025em', color: 'var(--text-primary)', margin: '0 0 12px', lineHeight: 1.15 }}>{pr.name}</h2>
      <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--prose-lead)', lineHeight: 1.5, color: 'var(--text-secondary)', margin: '0 0 18px', textWrap: 'pretty' }}>{pr.tagline}</p>
      <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-muted)', margin: '0 0 24px', maxWidth: 820 }}>
        {pr.summary}
      </p>
      <div style={{ borderTop: '1px dashed var(--border)', paddingTop: 20 }}>
        <StackRow stack={pr.stack} />
      </div>
    </a>
  );
}

function CardsGrid({ items, openProject }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
      {items.map(pr => {
        const m = TYPE_META[pr.type] || TYPE_META.Software;
        return (
          <a key={pr.slug} href={'/lab/' + pr.slug} onClick={(e) => { e.preventDefault(); openProject(pr); }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              textDecoration: 'none',
              border: '1px solid var(--border)',
              borderTop: '3px solid ' + m.color,
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(180deg, rgba(36,34,32,0.6) 0%, rgba(26,24,22,0.4) 100%)',
              padding: 24,
              transition: 'border-color var(--duration-base) var(--ease)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = m.color}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <TypeBadge type={pr.type} />
                {pr.ai && <AIBadge />}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{pr.year}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'var(--text-xl)', letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: '0 0 10px' }}>{pr.name}</h2>
            <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--text-base)', lineHeight: 1.55, color: 'var(--text-secondary)', margin: '0 0 18px' }}>{pr.tagline}</p>
            <div style={{ marginTop: 'auto' }}>
              <StackRow stack={pr.stack} />
            </div>
          </a>
        );
      })}
    </div>
  );
}

export function LabIndex({ t, openProject, go }) {
  const featured = PROJECTS.find(p => p.featured) || PROJECTS[0];
  const rest = PROJECTS.filter(p => p !== featured);
  return (
    <main style={{ maxWidth: 1080, margin: '0 auto', padding: '0 32px 96px' }}>
      <section style={{ padding: pad(t, '64px 0 40px', '44px 0 30px'), borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', fontSize: 'var(--text-xs)', color: kicker(t), margin: '0 0 14px' }}>Lab Reports</p>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 18px', color: 'var(--text-primary)', maxWidth: 760, textWrap: 'balance' }}>
        Things I've built — software and process.
        </h1>
        <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--prose-lead)', lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: 640, margin: '0 0 22px' }}>
          Not just code. Some of the work I'm proudest of is a process — a way of working that made a team faster. Each entry says whether it's software or process, and whether AI was a build partner.
        </p>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}><span style={{ width: 9, height: 9, borderRadius: 9999, background: TYPE_META.Software.dot }} />Software</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}><span style={{ width: 9, height: 9, borderRadius: 9999, background: TYPE_META.Process.dot }} />Process</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}><span style={{ width: 9, height: 9, borderRadius: 9999, background: '#a5b4fc' }} />AI-assisted build</span>
        </div>
      </section>

      <section style={{ padding: pad(t, '40px 0 0', '28px 0 0') }}>
        <SectionLabel t={t}>Featured Report</SectionLabel>
        <FeaturedProjectCard pr={featured} openProject={openProject} t={t} />
      </section>

      {rest.length > 0 && (
        <section style={{ padding: pad(t, '24px 0 40px', '16px 0 30px') }}>
          <SectionLabel t={t}>Other Lab Reports</SectionLabel>
          <CardsGrid items={rest} openProject={openProject} />
        </section>
      )}

    </main>
  );
}

export function ProjectDetail({ project: pr, t, go, openProject }) {
  const others = PROJECTS.filter(x => x.slug !== pr.slug).slice(0, 3);
  const Body = PROJECT_BODIES[pr.slug];
  const bodyRef = useRef(null);
  useDeepAnchors(bodyRef, [pr.slug]);
  return (
    <main style={{ maxWidth: 820, margin: '0 auto', padding: '0 32px 96px' }}>
      <header style={{ padding: '56px 0 28px' }}>
        <a href="/lab" onClick={(e) => { e.preventDefault(); go('lab'); }} style={{ fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-muted)', textDecoration: 'none' }}>← Lab Reports</a>
        <div style={{ display: 'flex', gap: 8, margin: '20px 0 16px' }}><TypeBadge type={pr.type} />{pr.ai && <AIBadge />}</div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(30px, 4.4vw, 48px)', lineHeight: 1.06, letterSpacing: '-0.03em', margin: '0 0 18px', color: 'var(--text-primary)', textWrap: 'balance' }}>{pr.name}</h1>
        <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--prose-lead)', lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: 640, margin: 0 }}>{pr.tagline}</p>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, padding: '22px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: 8 }}>
        {[['Type', pr.type], ['Status', pr.status], pr.date ? ['Date', pr.date] : ['Year', pr.year], ['AI partner', pr.ai ? 'Yes' : 'No']].map(([k, v]) => (
          <div key={k}>
            <p style={{ fontFamily: 'var(--font-label)', fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--text-muted)', margin: '0 0 5px' }}>{k}</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)', color: 'var(--text-primary)', margin: 0 }}>{v}</p>
          </div>
        ))}
      </div>

      <div ref={bodyRef} style={{ padding: '28px 0 8px' }}>
        <Prose style={{ maxWidth: '100%' }}>
          {Body ? <Body /> : <p>{pr.summary}</p>}
        </Prose>
        <div style={{ margin: '26px 0' }}><StackRow stack={pr.stack} /></div>
        <a href={pr.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <Button variant="solid">{pr.linkLabel} ↗</Button>
        </a>
      </div>

      <section style={{ marginTop: 48, paddingTop: 28, borderTop: '1px solid var(--border)' }}>
        <SectionLabel t={t} style={{ marginBottom: 16 }}>More Lab Reports</SectionLabel>
        <div>
          {others.map((o, i) => {
            const m = TYPE_META[o.type] || TYPE_META.Software;
            return (
              <a key={o.slug} href={'/lab/' + o.slug} onClick={(e) => { e.preventDefault(); openProject(o); }}
                style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', padding: '14px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
                <span style={{ width: 8, height: 8, borderRadius: 9999, background: m.dot, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>{o.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginLeft: 'auto' }}>{o.type}</span>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
