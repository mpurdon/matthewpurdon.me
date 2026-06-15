/* matthewpurdon.me — Home. Leads with Matthew. */
import DS from './ds/index.js';
import { SectionLabel, Cover, TopicChip, pad, TypeBadge, AIBadge, kicker, accent } from './shared.jsx';
import { PROFILE, POSTS, PROJECTS, TOPICS, postNumber } from './data.js';

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
        <p style={{
          fontFamily: 'var(--font-prose)',
          fontSize: 'var(--prose-lead)',
          lineHeight: 1.55,
          fontWeight: 600,
          color: 'var(--text-primary)',
          maxWidth: 680,
          margin: '0 0 16px',
          textWrap: 'pretty'
        }}>
          {PROFILE.tagline}
        </p>
        <p style={{
          fontFamily: 'var(--font-prose)',
          fontSize: 'var(--text-base)',
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
          maxWidth: 640,
          margin: '0 0 18px',
          textWrap: 'pretty'
        }}>
          {PROFILE.bio}
        </p>
        <SocialRow />
        <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="solid" onClick={go ? () => go('notes') : undefined} href="/notes">Read Field Notes</Button>
          <Button variant="outline" onClick={go ? () => go('lab') : undefined} href="/lab">See Lab Reports</Button>
          <a href="/about" onClick={go ? (e) => { e.preventDefault(); go('about'); } : undefined}
             style={{
               fontFamily: 'var(--font-mono)',
               fontSize: 'var(--text-xs)',
               fontWeight: 700,
               textTransform: 'uppercase',
               letterSpacing: 'var(--tracking-wider)',
               color: 'var(--text-secondary)',
               textDecoration: 'none',
               padding: '8px 16px',
               border: '1px solid var(--border)',
               borderRadius: 'var(--radius-md)',
               transition: 'all var(--duration-base) var(--ease)',
             }}
             onMouseEnter={(e) => {
               e.currentTarget.style.color = 'var(--text-primary)';
               e.currentTarget.style.borderColor = 'var(--border-strong)';
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.color = 'var(--text-secondary)';
               e.currentTarget.style.borderColor = 'var(--border)';
             }}>
            About Matthew
          </a>
        </div>
      </div>
    </div>
  );
}

// Featured Field Note: magazine-cover treatment — category, title, and issue
// number live inside the cover block; the right side is just dek + byline.
function FeaturedCard({ post, t, onClick }) {
  const c = accent(post.accent);
  return (
    <a href={'/notes/' + post.slug} onClick={onClick}
      style={{ display: 'flex', flexWrap: 'wrap', gap: 26, alignItems: 'center', textDecoration: 'none',
        border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', background: 'var(--bg-surface)',
        padding: 20, marginTop: 20, transition: 'border-color var(--duration-base) var(--ease)' }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-strong)'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
      <div style={{ flex: '1 1 380px', minWidth: 0, height: 220, borderRadius: 'var(--radius-md)', border: '1px solid var(--border)',
        background: `radial-gradient(120% 150% at 100% 0%, ${c.fill} 0%, transparent 55%), linear-gradient(135deg, var(--bg-elevated), var(--bg-surface))`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '14px 16px' }}>
        <div>
          <span style={{ display: 'block', fontFamily: 'var(--font-label)', fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', color: c.edge }}>{post.category}</span>
          <span style={{ display: 'block', marginTop: 12, fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(28px, 3.4vw, 38px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)', textWrap: 'balance' }}>{post.title}</span>
        </div>
        <span aria-hidden="true" style={{ alignSelf: 'flex-end', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', lineHeight: 0.95, letterSpacing: '-0.04em', color: 'var(--text-primary)', opacity: 0.92 }}>{postNumber(post)}</span>
      </div>
      <div style={{ flex: '1 1 320px', minWidth: 0 }}>
        <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--text-lg)', lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0, textWrap: 'pretty' }}>{post.dek}</p>
        <div style={{ marginTop: 18 }}>
          <Byline compact author="Matthew Purdon" avatar="MP" date={post.date} readingTime={post.time} />
        </div>
      </div>
    </a>
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

      {/* Focus Areas / Proof Blocks */}
      <section style={{ padding: pad(t, '48px 0 52px', '34px 0 38px'), borderBottom: '1px dashed var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 26 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--canada-300)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>[ CORE FOCUS AREAS // STACK CAPABILITY ]</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--border) 0%, transparent 100%)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <div style={{
            border: '1px solid var(--border)',
            borderTop: '3px solid rgba(252,172,60,0.85)',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(180deg, rgba(36,34,32,0.6) 0%, rgba(26,24,22,0.4) 100%)',
            padding: 24,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'var(--text-base)', letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: '0 0 12px' }}>AI-assisted engineering</h3>
            <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
              Designing workflows where agents help with requirements, specs, code, review, testing, and release.
            </p>
          </div>
          <div style={{
            border: '1px solid var(--border)',
            borderTop: '3px solid rgba(129,140,248,0.85)',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(180deg, rgba(36,34,32,0.6) 0%, rgba(26,24,22,0.4) 100%)',
            padding: 24,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'var(--text-base)', letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: '0 0 12px' }}>Platform architecture</h3>
            <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
              Building internal systems, standards, APIs, event-driven workflows, observability, and deployment patterns.
            </p>
          </div>
          <div style={{
            border: '1px solid var(--border)',
            borderTop: '3px solid var(--canada-300)',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(180deg, rgba(36,34,32,0.6) 0%, rgba(26,24,22,0.4) 100%)',
            padding: 24,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'var(--text-base)', letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: '0 0 12px' }}>Engineering operating systems</h3>
            <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
              RFCs, review loops, team rituals, quality gates, reliability practices, and delivery governance.
            </p>
          </div>
        </div>
      </section>

      {/* Start Here / Core Beliefs */}
      <section style={{ padding: pad(t, '40px 0 44px', '28px 0 32px'), borderBottom: '1px solid var(--border)' }}>
        <SectionLabel t={t} style={{ marginBottom: 20 }}>Start Here</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          {[
            { title: 'AI-assisted engineering', desc: 'Transforming requirements, specs, testing, and delivery once a model sits in the loop.', topic: 'AI-Assisted Engineering', href: '/topic/AI-Assisted Engineering' },
            { title: 'Code review as the main event', desc: 'Refocusing the team\'s execution standards from typing speed to high-fidelity validation.', topic: 'Opinion', href: '/topic/Opinion' },
            { title: 'The new SDLC', desc: 'Inventing and stabilizing the process changes needed when agents enter the workflow.', topic: 'The New SDLC', href: '/topic/The New SDLC' },
            { title: 'Developer tools and platform systems', desc: 'Building the local harnesses, telemetry, and frameworks that make it actually stick.', topic: 'Teams & Process', href: '/topic/Teams & Process' }
          ].map((item, i) => (
            <a key={i} href={item.href} onClick={openTopic ? (e) => { e.preventDefault(); openTopic(item.topic); } : undefined}
               style={{
                 display: 'block',
                 textDecoration: 'none',
                 borderLeft: '2px solid var(--canada-300)',
                 paddingLeft: 16,
                 cursor: 'pointer',
                 transition: 'all var(--duration-base) var(--ease)',
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.borderLeftColor = 'var(--canada-500)';
                 e.currentTarget.style.paddingLeft = '20px';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.borderLeftColor = 'var(--canada-300)';
                 e.currentTarget.style.paddingLeft = '16px';
               }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px', transition: 'color var(--duration-base) var(--ease)' }}>{item.title}</h4>
              <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--text-xs)', lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0 }}>{item.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Latest Field Notes */}
      <section style={{ padding: pad(t, '48px 0 8px', '34px 0 4px') }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <SectionLabel t={t}>From Field Notes</SectionLabel>
          <a href="/notes" onClick={go ? (e) => { e.preventDefault(); go('notes'); } : undefined} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textDecoration: 'none' }}>All writing →</a>
        </div>
        <FeaturedCard post={featured} t={t} onClick={openPost ? (e) => { e.preventDefault(); openPost(featured); } : undefined} />
      </section>

      {recent.length > 0 && (
        <section style={{ padding: pad(t, '28px 0 40px', '18px 0 30px') }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {recent.map((p, i) => (
              <ArticleCard key={p.slug} variant="grid" accent={p.accent} category={p.category}
                href={'/notes/' + p.slug} onClick={openPost ? (e) => { e.preventDefault(); openPost(p); } : undefined}
                title={p.title} dek={p.dek} meta={meta(p)}
                cover={<Cover id={'home-r' + i} t={t} category={p.category} accent={p.accent} big={postNumber(p)} />} />
            ))}
          </div>
        </section>
      )}

      {/* From the Lab */}
      <section style={{ padding: pad(t, '24px 0 40px', '16px 0 30px'), borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, paddingTop: pad(t, 36, 26) }}>
          <SectionLabel t={t} style={{ marginBottom: 20 }}>From Lab Reports</SectionLabel>
          <a href="/lab" onClick={go ? (e) => { e.preventDefault(); go('lab'); } : undefined} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textDecoration: 'none' }}>Everything built →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {labFeat.map((pr) => (
            <a key={pr.slug} href={'/lab/' + pr.slug} onClick={openProject ? (e) => { e.preventDefault(); openProject(pr); } : undefined}
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
