/* matthewpurdon.me — About. */
import DS from './ds/index.js';
import { kicker, pad } from './shared.jsx';
import { PROFILE } from './data.js';

const { Button, Prose, Soapbox } = DS;

function LinkCard({ label, value, href }) {
  return (
    <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
      style={{ display: 'flex', flexDirection: 'column', gap: 4, textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', padding: '14px 16px', transition: 'border-color var(--duration-base) var(--ease)' }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-strong)'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
      <span style={{ fontFamily: 'var(--font-label)', fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{value} <span style={{ color: 'var(--text-disabled)' }}>↗</span></span>
    </a>
  );
}

export default function About({ t, go }) {
  const L = PROFILE.links;
  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: '0 32px 96px' }}>
      <section style={{ padding: pad(t, '64px 0 40px', '44px 0 30px'), borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <img src={PROFILE.avatar} alt="Matthew Purdon — software engineer in Toronto" width="132" height="132"
            style={{ width: 132, height: 132, borderRadius: 'var(--radius-lg)', objectFit: 'cover', flexShrink: 0, border: '2px solid var(--border-strong)' }} />
          <div style={{ flex: '1 1 340px', minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', fontSize: 'var(--text-xs)', color: kicker(t), margin: '0 0 12px' }}>About · {PROFILE.location}</p>
            <h1 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(30px, 4.4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 14px', color: 'var(--text-primary)' }}>Matthew Purdon</h1>
            <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--prose-lead)', lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: 560, margin: 0 }}>{PROFILE.tagline}</p>
          </div>
        </div>
      </section>

      <section style={{ padding: pad(t, '40px 0', '28px 0') }}>
        <Prose style={{ maxWidth: 680 }}>
          <p>I'm a principal software engineer based in Toronto, twenty-five years into building software. These days I spend as much time building the <em>processes</em> that decide how software gets built as the software itself: how teams review work they didn't type, how the development lifecycle reshapes itself around models, and how you interview for any of it.</p>
          <p>This site is two things. <strong>Field Notes</strong> is where I write — partly thinking out loud about where the craft is heading, partly literal notes from watching real teams change how they work. <strong>The Lab</strong> is where I keep the things I've made: software, yes, but also the processes and playbooks I'm proudest of. Some of it was built with an AI pair; where that's true, I say so.</p>
          <p>I write in the open because the half-formed version, dated and a little wrong, is more useful than the polished version that never ships. If something here is wrong, that's an invitation — tell me.</p>
        </Prose>

        <Soapbox label="Origin story" title="The scenic route" style={{ maxWidth: 680, marginTop: 32 }}>
          <p>
            I grew up in the country, where the dump and the yard-sale table were our supply
            chain, and the family computer lived in the kitchen. The only quiet came after eleven,
            so that's when I learned; people ask why I'm still up at 3 a.m., and the honest answer
            is that the habit never left.
          </p>
          <p>
            The long version runs through three nights sleeping in my car, two semesters of
            college, most of a bootcamp, a Quake II crew, a program called pulse, three years on
            a Caribbean island, and zero job interviews in twenty-five years.
          </p>
          <p>
            <a href="/story" onClick={(e) => { e.preventDefault(); go('story'); }}>Read the whole story →</a>
          </p>
        </Soapbox>

        <div style={{ marginTop: 36 }}>
          <p style={{ fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-muted)', margin: '0 0 16px' }}>What I think about</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {['AI-assisted engineering', 'The new SDLC', 'Code review as the main event', 'Hiring & interviewing', 'Developer tools', 'Team process', 'Taste & judgement'].map(x => (
              <span key={x} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', background: 'var(--bg-surface)' }}>{x}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 8 }}>
        <p style={{ fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-muted)', margin: '0 0 16px' }}>Find me</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          <LinkCard label="GitHub" value="@mpurdon" href={L.github} />
          <LinkCard label="LinkedIn" value="matthewdjpurdon" href={L.linkedin} />
          <LinkCard label="X / Twitter" value="@mpurdon" href={L.x} />
          <LinkCard label="Instagram" value="@mdjpurdon" href={L.instagram} />
          <LinkCard label="Email" value={PROFILE.email} href={'mailto:' + PROFILE.email} />
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
          <Button variant="solid" onClick={() => go('notes')}>Read Field Notes</Button>
          <Button variant="outline" onClick={() => go('lab')}>See the Lab</Button>
        </div>
      </section>
    </main>
  );
}
