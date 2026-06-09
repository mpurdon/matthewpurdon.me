/* matthewpurdon.me — single article view. */
import DS from './ds/index.js';
import { Cover, kicker } from './shared.jsx';
import { AVATAR, PROFILE } from './data.js';

const { Prose, Soapbox, Callout, PullQuote, CodeBlock, Byline } = DS;

const RUBRIC = `// the round that actually correlates with the job\nconst loop = {\n  warmup:   "talk me through code you didn't write",\n  exercise: "here's an agent's PR — review it, out loud",\n  probe:    "what would make you reject this? what would you ship?",\n  signal:   ["taste", "verification", "knows when to stop"],\n}`;

// Rich, hand-written body for the featured essay.
function InterviewingBody() {
  return (
    <Prose dropcap style={{ maxWidth: '100%' }}>
      <p>For a decade the coding interview measured one thing reasonably well: can you, alone, in a quiet room, turn a problem into working code under time pressure. It was never a great proxy for the job, but it was a proxy. That proxy is now broken. The model in the candidate's editor would ace the take-home, and increasingly so would the model in mine.</p>

      <Soapbox variant="aside" label="Hot take" signoff="and I mean it">
        <p>If your interview can be passed by pasting the prompt into an assistant, you are not screening for engineers. You are screening for people who own a keyboard.</p>
      </Soapbox>

      <p>So I stopped asking people to produce code and started asking them to <em>judge</em> it. The most predictive forty minutes I run now is a review exercise: here is a pull request an agent opened against a real-ish codebase, with a plausible description and a few quiet landmines. Read it with me. Think out loud.</p>

      <h2>What the review round actually surfaces</h2>
      <p>Watching someone review is watching them think. Do they read the diff or the description? Do they notice the test that asserts nothing? Do they trust the confident comment or check the call site? The candidates I want are the ones who slow down at exactly the spots the model glossed over.</p>

      <Callout variant="note">
        The skill I am hiring for is no longer "can you produce a solution." It is "can you tell, quickly, which of several plausible solutions is the right one — and prove it."
      </Callout>

      <p>I script the exercise as a small, legible loop so every interviewer runs it the same way:</p>

      <CodeBlock filename="interview-loop.ts" lang="ts" caption="The whole round, minus the part where you actually listen.">{RUBRIC}</CodeBlock>

      <PullQuote cite="Matthew Purdon">
        Generation is cheap now. The expensive thing — the thing I am paying a salary for — is judgement about which generated thing to keep.
      </PullQuote>

      <h2>What I stopped weighting</h2>
      <p>Speed of typing. Memorized algorithms. Whether they reached for the same library I would have. None of it predicts who is good on a team where most first drafts arrive from a model. What predicts it: knowing when a thing is done, knowing when it is wrong, and being honest about which of the two you are looking at.</p>

      <Callout variant="warning" title="A trap I fell into">
        Do not reward the candidate who finds the most problems. Reward the one who finds the <em>load-bearing</em> problem and waves past the cosmetic ones. Nitpicking is cheap; triage is the job.
      </Callout>

      <Callout variant="tip" title="Make it concrete">
        Seed the PR with one bug that fails loudly, one that fails silently, and one thing that looks like a bug but is correct. The silent failure and the false alarm are where the signal lives.
      </Callout>

      <p>None of this is a clean science. I am still calibrating, still arguing with my own panel about what a "strong no" looks like. But the shape is clear enough to commit to: hire for taste and verification, interview by handing people work to judge instead of work to produce, and stop pretending the keyboard is the bottleneck.</p>

      <Soapbox title="Won't the model just do the reviewing too?" signoff="ask me again in a year">
        <p>Maybe. Models are already decent reviewers, and they will get better at the silent-failure class of bug faster than I would like. But review is not only pattern-matching against known mistakes — it is holding the <em>intent</em> of the change against the messy reality of the system it lands in, and deciding whether the trade is worth it for <em>this</em> team, on <em>this</em> deadline, given <em>that</em> incident last quarter.</p>
        <p>That context lives in people, in hallways, in the scar tissue of a codebase nobody fully documented. Until the model carries that, someone has to. I would rather hire the someone who is good at it than pretend the question went away.</p>
      </Soapbox>

      <Callout variant="takeaway">
        Interview for the decision, not the keystroke. Hand candidates something to judge, and hire the ones whose judgement you would trust at 3am.
      </Callout>
    </Prose>
  );
}

// Coherent, on-voice default body for the other (draft) essays.
function DefaultBody({ post }) {
  return (
    <Prose dropcap style={{ maxWidth: '100%' }}>
      <p>{post.dek}</p>
      <p>This one is still a draft — a field note more than a finished argument. I am publishing the sketch because the thinking is more useful in the open than perfect in a folder, and because half the point of writing here is to find out where I am wrong faster.</p>
      <Callout variant="note">
        A working theory, filed under <strong>{post.category}</strong>: the tools changed the work before anyone changed the words we use to describe the work. Most of the confusion lives in that gap.
      </Callout>
      <h2>Where this is going</h2>
      <p>I will flesh this out with the specifics — the team, the before-and-after, the part that surprised me — once the observation has had a few more weeks to either hold up or fall apart. If you want the finished version, it lands in the next monthly batch.</p>
      <PullQuote cite="Matthew Purdon">
        The honest version of a field note is dated, partial, and a little embarrassing in hindsight. That is what makes it worth keeping.
      </PullQuote>
      <Callout variant="takeaway">
        Notes beat essays for the half-formed stuff. Write the note, date it, and let future-you sort out whether it was right.
      </Callout>
    </Prose>
  );
}

export default function Article({ post, t, openTopic, go }) {
  const meta = (p) => <Byline author="Matthew Purdon" avatar="MP" date={p.dateLong || p.date} readingTime={p.time} tag={p.category} />;
  const back = post.category;
  return (
    <article>
      <header style={{ maxWidth: 820, margin: '0 auto', padding: '56px 32px 32px', textAlign: 'center' }}>
        <a href="#topic" onClick={(e) => { e.preventDefault(); openTopic(back); }}
          style={{ fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', fontSize: 'var(--text-xs)', fontWeight: 700, color: kicker(t), textDecoration: 'none' }}>
          ← {back}
        </a>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(30px, 4.4vw, 50px)', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '18px 0 20px', color: 'var(--text-primary)', textWrap: 'balance' }}>{post.title}</h1>
        <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--prose-lead)', lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto 28px', textWrap: 'pretty' }}>{post.dek}</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>{meta(post)}</div>
      </header>

      <div style={{ maxWidth: 1080, margin: '0 auto 8px', padding: '0 32px' }}>
        <Cover id={'art-' + post.slug} t={t} category={post.category} accent={post.accent} height={300} />
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 32px 64px' }}>
        {post.featured ? <InterviewingBody /> : <DefaultBody post={post} />}

        <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-label)', fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', color: 'var(--text-muted)', marginInlineEnd: 4 }}>Filed under</span>
          {post.tags.map(tag => (
            <a key={tag} href="#topic" onClick={(e) => { e.preventDefault(); openTopic(tag); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--canada-300)', textDecoration: 'none', padding: '0.3rem 0.7rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(213,43,30,0.32)', background: 'rgba(213,43,30,0.08)' }}>
              #{tag}
            </a>
          ))}
        </div>

        <div style={{ marginTop: 48, paddingTop: 28, borderTop: '1px solid var(--border)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <img src={AVATAR} alt="Matthew Purdon" width="48" height="48" style={{ width: 48, height: 48, borderRadius: 9999, objectFit: 'cover', flexShrink: 0, border: '1px solid var(--border-strong)' }} />
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-primary)', margin: 0 }}>Matthew Purdon</p>
            <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--text-base)', lineHeight: 1.6, color: 'var(--text-secondary)', margin: '6px 0 10px', maxWidth: 520 }}>
              Principal software engineer in Toronto, 25 years in. Writes Field Notes on AI-assisted engineering and the new SDLC, and builds the occasional tool — and process — in the Lab.
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              <a href="#about" onClick={(e) => { e.preventDefault(); go('about'); }} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--canada-300)', textDecoration: 'none' }}>About →</a>
              <a href={PROFILE.links.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textDecoration: 'none' }}>GitHub ↗</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
