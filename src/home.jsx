/* matthewpurdon.me — Home. Leads with Matthew. */
import DS from './ds/index.js';
import { SectionLabel, Cover, TopicChip, pad, TypeBadge, AIBadge, kicker } from './shared.jsx';
import { PROFILE, POSTS, PROJECTS, TOPICS } from './data.js';

const { Button, ArticleCard, Byline } = DS;

function Avatar({ size = 96, ring = true }) {
  return (
    <img src={PROFILE.avatar} alt="Matthew Purdon" width={size} height={size}
      style={{ width: size, height: size, borderRadius: 9999, objectFit: 'cover', flexShrink: 0,
        border: ring ? '2px solid var(--border-strong)' : 'none',
        boxShadow: ring ? '0 0 0 4px rgba(252,172,60,0.10)' : 'none' }} />
  );
}

function Eyebrow({ children, t }) {
  return <p style={{ fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', fontSize: 'var(--text-xs)', fontWeight: 700, color: kicker(t), margin: '0 0 14px' }}>{children}</p>;
}

function SocialRow() {
  const L = PROFILE.links;
  const items = [
    ['GitHub', L.github], ['LinkedIn', L.linkedin], ['X', L.x], ['Email', 'mailto:' + PROFILE.email],
  ];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 26 }}>
      {items.map(([label, href]) => (
        <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap',
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', textDecoration: 'none',
            padding: '0.45rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-surface)',
            transition: 'border-color var(--duration-base) var(--ease), color var(--duration-base) var(--ease)' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
          {label} <span style={{ color: 'var(--text-disabled)' }}>↗</span>
        </a>
      ))}
    </div>
  );
}

function HeroPortrait({ t, go }) {
  return (
    <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Avatar size={120} />
      <div style={{ flex: '1 1 360px', minWidth: 0 }}>
        <Eyebrow t={t}>{PROFILE.role} · {PROFILE.location}</Eyebrow>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1.04, letterSpacing: '-0.035em', margin: '0 0 18px', color: 'var(--text-primary)' }}>Matthew Purdon</h1>
        <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--prose-lead)', lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: 620, margin: 0 }}>{PROFILE.tagline}</p>
        <SocialRow />
        <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
          <Button variant="solid" onClick={() => go('notes')}>Read Field Notes</Button>
          <Button variant="outline" onClick={() => go('lab')}>See the Lab</Button>
        </div>
      </div>
    </div>
  );
}

export default function Home({ t, go, openPost, openProject, openTopic }) {
  const featured = POSTS.find(p => p.featured) || POSTS[0];
  const recent = POSTS.filter(p => p !== featured).slice(0, 3);
  const labFeat = PROJECTS.filter(p => p.featured).slice(0, 2);
  const meta = (p) => <Byline compact author="Matthew Purdon" avatar="MP" date={p.date} readingTime={p.time} tag={p.category} />;

  return (
    <main style={{ maxWidth: 1080, margin: '0 auto', padding: '0 32px 96px' }}>
      {/* Hero */}
      <section style={{ padding: pad(t, '64px 0 52px', '44px 0 36px'), borderBottom: '1px solid var(--border)' }}>
        <HeroPortrait t={t} go={go} />
      </section>

      {/* Latest Field Notes */}
      <section style={{ padding: pad(t, '48px 0 8px', '34px 0 4px') }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <SectionLabel t={t}>From Field Notes</SectionLabel>
          <a href="#notes" onClick={(e) => { e.preventDefault(); go('notes'); }} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textDecoration: 'none' }}>All writing →</a>
        </div>
        <ArticleCard variant="hero" accent={featured.accent} category={featured.category}
          href={'#notes/' + featured.slug} onClick={(e) => { e.preventDefault(); openPost(featured); }}
          title={featured.title} dek={featured.dek} meta={meta(featured)}
          cover={<Cover id="home-feat" t={t} category={featured.category} accent={featured.accent} ratio="4 / 3" big="01" />} />
      </section>

      <section style={{ padding: pad(t, '28px 0 40px', '18px 0 30px') }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {recent.map((p, i) => (
            <ArticleCard key={p.slug} variant="grid" accent={p.accent} category={p.category}
              href={'#notes/' + p.slug} onClick={(e) => { e.preventDefault(); openPost(p); }}
              title={p.title} dek={p.dek} meta={meta(p)}
              cover={<Cover id={'home-r' + i} t={t} category={p.category} accent={p.accent} big={'0' + (i + 2)} />} />
          ))}
        </div>
      </section>

      {/* From the Lab */}
      <section style={{ padding: pad(t, '24px 0 40px', '16px 0 30px'), borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, paddingTop: pad(t, 36, 26) }}>
          <SectionLabel t={t} style={{ marginBottom: 20 }}>From the Lab</SectionLabel>
          <a href="#lab" onClick={(e) => { e.preventDefault(); go('lab'); }} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textDecoration: 'none' }}>Everything built →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {labFeat.map((pr) => (
            <a key={pr.slug} href={'#lab/' + pr.slug} onClick={(e) => { e.preventDefault(); openProject(pr); }}
              style={{ display: 'block', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', background: 'var(--bg-surface)', padding: 24, transition: 'border-color var(--duration-base) var(--ease)' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-strong)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}><TypeBadge type={pr.type} />{pr.ai && <AIBadge />}</div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'var(--text-xl)', letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: '0 0 8px' }}>{pr.name}</h3>
              <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--text-base)', lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0 }}>{pr.tagline}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Browse by topic */}
      <section style={{ marginTop: pad(t, 20, 10), paddingTop: pad(t, 36, 26), borderTop: '1px solid var(--border)' }}>
        <SectionLabel t={t}>Browse by topic</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {Object.keys(TOPICS).map(name => (
            <TopicChip key={name} label={name} t={t} onClick={openTopic} />
          ))}
        </div>
      </section>
    </main>
  );
}
