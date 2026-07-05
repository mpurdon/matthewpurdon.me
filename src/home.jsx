/* matthewpurdon.me — Home. Leads with Matthew. */
import './ds/index.js'; // side-effect import: loads design-system CSS (.mp-btn etc.) on the homepage
import { TopicChip, TypeBadge, AIBadge, kicker } from './shared.jsx';
import { PROFILE, POSTS, PROJECTS, TOPICS, postNumber } from './data.js';

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
    <div style={{ display: 'grid', gridTemplateColumns: '132px minmax(0, 1fr)', gap: 28, alignItems: 'flex-start' }}>
      <Avatar size={120} />
      <div style={{ minWidth: 0 }}>
        <Eyebrow t={t}>{PROFILE.role} · {PROFILE.location}</Eyebrow>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(38px, 5.2vw, 56px)', lineHeight: 1.04, letterSpacing: '-0.04em', margin: '0 0 18px', color: 'var(--text-primary)' }}>Matthew Purdon</h1>
        <p style={{
          fontFamily: 'var(--font-prose)',
          fontSize: 'clamp(1.25rem, 2vw, 1.45rem)',
          lineHeight: 1.5,
          fontWeight: 600,
          color: 'var(--text-primary)',
          maxWidth: 760,
          margin: '0 0 16px',
          textWrap: 'pretty'
        }}>
          I build the systems around AI-assisted engineering: platform boundaries, review loops, agent workflows, and the team habits that keep generated software from turning into entropy.
        </p>
        <p style={{
          fontFamily: 'var(--font-prose)',
          fontSize: 'var(--text-base)',
          lineHeight: 1.65,
          color: 'var(--text-secondary)',
          maxWidth: 680,
          margin: '0 0 18px',
          textWrap: 'pretty'
        }}>
          Twenty-five years in software, writing Field Notes on the new SDLC, code review, hiring for judgement, and how teams actually ship.
        </p>
        <SocialRow />
        <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap', alignItems: 'center' }}>
          <a className="mp-btn mp-btn--solid mp-btn--md" href="/notes"
             onClick={go ? (e) => { e.preventDefault(); go('notes'); } : undefined}
             style={{ textDecoration: 'none' }}>Read Field Notes</a>
          <a className="mp-btn mp-btn--outline mp-btn--md" href="/lab"
             onClick={go ? (e) => { e.preventDefault(); go('lab'); } : undefined}
             style={{ textDecoration: 'none' }}>See Lab Reports</a>
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

function NumberedSection({ number, title, children, style }) {
  return (
    <section style={{ padding: '42px 0', borderBottom: '1px solid var(--border)', ...style }}>
      <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 18, alignItems: 'baseline', marginBottom: 22 }}>
        <span style={{ color: 'var(--canada-300)', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.18em', fontSize: 'var(--text-xs)' }}>{number}</span>
        <h2 style={{ margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 'clamp(22px, 2.8vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function TheWork() {
  const rows = [
    ['Writing', 'principal engineering, review, AI-assisted delivery'],
    ['Building', 'agentic tools, MCP servers, local-first review systems'],
    ['Arguing', 'review is now the main engineering act'],
    ['Based', PROFILE.location],
  ];
  return (
    <NumberedSection number="01" title="The Work">
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 46, alignItems: 'start' }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-prose)', fontSize: 'clamp(1.35rem, 2.3vw, 1.48rem)', lineHeight: 1.48, color: 'var(--prose-text)', maxWidth: 650, textWrap: 'pretty' }}>
          My work sits at the intersection of <strong style={{ color: 'var(--text-primary)' }}>architecture</strong>, <strong style={{ color: 'var(--text-primary)' }}>process</strong>, and <strong style={{ color: 'var(--text-primary)' }}>AI-assisted delivery</strong>. I care less about demos and more about the operating system that lets teams ship with models in the loop without lowering their standards.
        </p>
        <div style={{ borderLeft: '2px solid var(--canada-500)', paddingLeft: 20, display: 'grid', gap: 14, marginTop: 4 }}>
          {rows.map(([label, copy]) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: 14, lineHeight: 1.45 }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-label)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>{label}</span>
              <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-prose)', fontSize: 'var(--text-base)' }}>{copy}</span>
            </div>
          ))}
        </div>
      </div>
    </NumberedSection>
  );
}

function StartHere({ openPost }) {
  const slugs = ['what-is-a-principal-engineer', 'judgement-is-the-job-now', 'build-the-model-a-map'];
  const copy = {
    'what-is-a-principal-engineer': 'Principal engineering is not one archetype. It is the ability to shift between all four without losing the thread.',
    'judgement-is-the-job-now': 'AI removed the effort filter. Taste, review, and technical judgement are what remain.',
    'build-the-model-a-map': 'Agents do not need better vibes. They need written-down context, stable boundaries, and fewer rediscovery loops.',
  };
  const posts = slugs.map((slug) => POSTS.find((p) => p.slug === slug)).filter(Boolean);

  return (
    <NumberedSection number="02" title="Start Here">
      <div style={{ display: 'grid', gap: 0, borderTop: '1px solid var(--border)' }}>
        {posts.map((post) => (
          <a key={post.slug} href={'/notes/' + post.slug} onClick={openPost ? (e) => { e.preventDefault(); openPost(post); } : undefined}
             style={{ display: 'grid', gridTemplateColumns: '64px 1fr 18px', gap: 18, padding: '20px 0', borderBottom: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
            <span aria-hidden="true" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '-0.04em', fontSize: '32px', lineHeight: 1 }}>{postNumber(post)}</span>
            <span>
              <h3 style={{ margin: '0 0 7px', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-lg)', color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>{post.title}</h3>
              <p style={{ margin: 0, maxWidth: 730, fontFamily: 'var(--font-prose)', fontSize: 'var(--text-base)', lineHeight: 1.55, color: 'var(--text-secondary)' }}>{copy[post.slug]}</p>
            </span>
            <span aria-hidden="true" style={{ color: 'var(--canada-300)', fontSize: 18, paddingTop: 2 }}>→</span>
          </a>
        ))}
      </div>
    </NumberedSection>
  );
}

function RecentFieldNotes({ featured, recent, openPost }) {
  return (
    <NumberedSection number="03" title="Recent Field Notes">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <a href={'/notes/' + featured.slug} onClick={openPost ? (e) => { e.preventDefault(); openPost(featured); } : undefined}
           style={{ minHeight: 218, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 22, border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none', color: 'inherit',
             background: 'radial-gradient(120% 150% at 100% 0%, rgba(129, 140, 248, 0.18), transparent 55%), linear-gradient(135deg, rgba(47, 43, 40, 0.72), rgba(39, 35, 37, 0.68))' }}>
          <div style={{ color: 'var(--indigo-400)', fontFamily: 'var(--font-label)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{featured.category} · {featured.time}</div>
          <div>
            <h3 style={{ margin: '0 0 10px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 'clamp(26px, 3.5vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.04em' }}>{featured.title}</h3>
            <p style={{ margin: 0, fontFamily: 'var(--font-prose)', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{featured.dek}</p>
          </div>
        </a>
        <div style={{ display: 'grid', gap: 12 }}>
          {recent.map((post, index) => (
            <a key={post.slug} href={'/notes/' + post.slug} onClick={openPost ? (e) => { e.preventDefault(); openPost(post); } : undefined}
               style={{ padding: '0 0 14px 16px', borderLeft: `2px solid ${index === 0 ? 'var(--border-strong)' : index === 1 ? 'rgba(213, 43, 30, 0.7)' : 'rgba(71, 207, 237, 0.7)'}`, borderBottom: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
              <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>{post.title}</h3>
              <p style={{ margin: 0, fontFamily: 'var(--font-prose)', color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.5 }}>{post.dek}</p>
            </a>
          ))}
        </div>
      </div>
    </NumberedSection>
  );
}

function SelectedLabReports({ openProject }) {
  const projects = PROJECTS.filter((project) => ['grey-eminence', 'tcc', 'mcp-servers'].includes(project.slug));

  return (
    <NumberedSection number="04" title="Selected Lab Reports">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
        {projects.map((project) => (
          <a key={project.slug} href={'/lab/' + project.slug} onClick={openProject ? (e) => { e.preventDefault(); openProject(project); } : undefined}
             style={{ minHeight: 184, display: 'flex', flexDirection: 'column', padding: 20, border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(180deg, rgba(47, 43, 40, 0.58), rgba(32, 30, 28, 0.35))', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 30 }}>
              <TypeBadge type={project.type} />
              {project.ai && <AIBadge />}
            </div>
            <h3 style={{ margin: '0 0 9px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xl)', letterSpacing: '-0.03em' }}>{project.name}</h3>
            <p style={{ margin: 0, fontFamily: 'var(--font-prose)', fontSize: 'var(--text-sm)', lineHeight: 1.55, color: 'var(--text-secondary)' }}>{project.tagline}</p>
            <span style={{ marginTop: 'auto', paddingTop: 20, color: 'var(--canada-300)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>View report →</span>
          </a>
        ))}
      </div>
    </NumberedSection>
  );
}

export default function Home({ t, go, openPost, openProject, openTopic }) {
  const featured = POSTS.find(p => p.featured) || POSTS[0];
  const recent = POSTS.filter(p => p !== featured).slice(0, 3);

  return (
    <main style={{ maxWidth: 1080, margin: '0 auto', padding: '0 32px 96px' }}>
      <section style={{ padding: '64px 0 52px', borderBottom: '1px solid var(--border)' }}>
        <HeroPortrait t={t} go={go} />
      </section>

      <TheWork />
      <StartHere openPost={openPost} />
      <RecentFieldNotes featured={featured} recent={recent} openPost={openPost} />
      <SelectedLabReports openProject={openProject} />

      <section style={{ marginTop: 20, paddingTop: 36 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 18, alignItems: 'baseline', marginBottom: 22 }}>
          <span style={{ color: 'var(--canada-300)', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.18em', fontSize: 'var(--text-xs)' }}>05</span>
          <h2 style={{ margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 'clamp(22px, 2.8vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>Browse Topics</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {Object.keys(TOPICS).map(name => (
            <TopicChip key={name} label={name} t={t} onClick={openTopic} />
          ))}
        </div>
      </section>
    </main>
  );
}
