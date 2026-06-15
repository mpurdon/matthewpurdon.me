/* matthewpurdon.me — Field Notes index + Topic landing. */
import DS from './ds/index.js';
import { SectionLabel, Cover, TopicChip, pad, kicker } from './shared.jsx';
import { POSTS, TOPICS, PROFILE, postNumber } from './data.js';
import { LEAF } from './chrome.jsx';

const { ArticleCard, Byline } = DS;

const meta = (p, compact = true) => <Byline compact={compact} author="Matthew Purdon" avatar="MP" date={p.date} readingTime={p.time} tag={compact ? undefined : p.category} />;

export function NotesIndex({ t, openPost, openTopic }) {
  const featured = POSTS.find(p => p.featured) || POSTS[0];
  const rest = POSTS.filter(p => p !== featured);
  const grid = rest.slice(0, 3);
  const list = rest.slice(3);
  return (
    <main style={{ maxWidth: 1080, margin: '0 auto', padding: '0 32px 96px' }}>
      <section style={{ padding: pad(t, '64px 0 40px', '44px 0 30px'), borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', fontSize: 'var(--text-xs)', color: kicker(t), margin: '0 0 14px' }}>Field Notes · {PROFILE.location}</p>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 18px', color: 'var(--text-primary)', maxWidth: 820, textWrap: 'balance' }}>
          Notes on AI-assisted engineering, the new SDLC, and how teams really ship.
        </h1>
        <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--prose-lead)', lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: 640, margin: 0 }}>
          Half of this is thinking out loud about where the craft is heading. The other half is field notes — what I actually watched happen when real teams changed how they work. New posts roughly monthly.
        </p>
      </section>

      <section style={{ padding: pad(t, '40px 0', '28px 0') }}>
        <SectionLabel t={t}>Featured</SectionLabel>
        <ArticleCard variant="hero" accent={featured.accent} category={featured.category}
          href={'/notes/' + featured.slug} onClick={openPost ? (e) => { e.preventDefault(); openPost(featured); } : undefined}
          title={featured.title} dek={featured.dek} meta={meta(featured)}
          cover={<Cover id="notes-feat" t={t} category={featured.category} accent={featured.accent} ratio="4 / 3" big={postNumber(featured)} />} />
      </section>

      {grid.length > 0 && (
        <section style={{ padding: pad(t, '8px 0 40px', '4px 0 28px') }}>
          <SectionLabel t={t}>Recent</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {grid.map((p, i) => (
              <ArticleCard key={p.slug} variant="grid" accent={p.accent} category={p.category}
                href={'/notes/' + p.slug} onClick={openPost ? (e) => { e.preventDefault(); openPost(p); } : undefined}
                title={p.title} dek={p.dek} meta={meta(p)}
                cover={<Cover id={'notes-g' + i} t={t} category={p.category} accent={p.accent} big={postNumber(p)} />} />
            ))}
          </div>
        </section>
      )}

      {list.length > 0 && (
        <section>
          <SectionLabel t={t}>More writing</SectionLabel>
          <div>
            {list.map((p) => (
              <ArticleCard key={p.slug} variant="list" category={p.category}
                href={'/notes/' + p.slug} onClick={openPost ? (e) => { e.preventDefault(); openPost(p); } : undefined}
                title={p.title} dek={p.dek} meta={meta(p)} />
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: pad(t, 56, 36), paddingTop: 36, borderTop: '1px solid var(--border)' }}>
        <SectionLabel t={t}>Browse by topic</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {Object.keys(TOPICS).map(name => {
            const n = POSTS.filter(p => p.tags.includes(name)).length;
            return <TopicChip key={name} label={name} count={n || undefined} t={t} onClick={openTopic} />;
          })}
        </div>
      </section>
    </main>
  );
}

export function TopicPage({ topic, t, openPost, openTopic, go }) {
  const info = TOPICS[topic] || { blurb: 'Posts on this topic.', accent: 'amber' };
  const posts = POSTS.filter(p => p.tags.includes(topic) || p.category === topic);
  const related = Object.keys(TOPICS).filter(x => x !== topic).slice(0, 6);
  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: '0 32px 96px' }}>
      <header style={{ padding: pad(t, '56px 0 32px', '40px 0 26px'), borderBottom: '1px solid var(--border)' }}>
        <a href="/notes" onClick={go ? (e) => { e.preventDefault(); go('notes'); } : undefined} style={{ fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-muted)', textDecoration: 'none' }}>← All Field Notes</a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '18px 0 12px' }}>
          <svg width="30" height="30" viewBox="-2015 -2000 4030 4030" fill="currentColor" style={{ color: 'var(--canada-500)', flexShrink: 0 }}><path d={LEAF} /></svg>
          <h1 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.03em', margin: 0, color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--canada-300)' }}>#</span>{topic}
          </h1>
        </div>
        <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--prose-lead)', lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: 600, margin: 0 }}>{info.blurb}</p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 14, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </header>

      <section style={{ paddingTop: 8 }}>
        {posts.map((p) => (
          <ArticleCard key={p.slug} variant="list" category={p.category}
            href={'/notes/' + p.slug} onClick={openPost ? (e) => { e.preventDefault(); openPost(p); } : undefined}
            title={p.title} dek={p.dek} meta={meta(p)} />
        ))}
        {posts.length === 0 && <p style={{ fontFamily: 'var(--font-prose)', color: 'var(--text-muted)', padding: '32px 0' }}>No posts here yet — check back after the next one.</p>}
      </section>

      <section style={{ marginTop: 48, paddingTop: 28, borderTop: '1px solid var(--border)' }}>
        <SectionLabel t={t} style={{ marginBottom: 16 }}>Related topics</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {related.map(x => <TopicChip key={x} label={x} t={t} size="sm" onClick={openTopic ? () => openTopic(x) : undefined} />)}
        </div>
      </section>
    </main>
  );
}
