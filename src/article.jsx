/* matthewpurdon.me — single article view. */
import { useState } from 'react';
import DS from './ds/index.js';
import { Cover, kicker } from './shared.jsx';
import { AVATAR, PROFILE } from './data.js';
import { LEAF } from './chrome.jsx';

const { Prose, Soapbox, Callout, PullQuote, Byline } = DS;

// Collapsed-by-default Soapbox for end-of-article rants. One card: the header
// is always visible (and pulses gently while closed — see .soap-fold rules in
// site.css), the body slides open on click via a grid-rows transition. The
// header carries the title, so the inner Soapbox chrome is stripped in CSS.
function SoapboxFold({ title, signoff, children }) {
  const [open, setOpen] = useState(false);
  return (
    <section className={'soap-fold' + (open ? ' is-open' : '')} style={{
      border: '1px solid rgba(213,43,30,0.35)', borderInlineStart: '4px solid var(--canada-500)',
      borderRadius: 'var(--radius-lg)', background: 'var(--callout-soapbox-bg)', overflow: 'hidden',
    }}>
      <button type="button" className="soap-fold__head" onClick={() => setOpen(o => !o)} aria-expanded={open} style={{
        display: 'block', width: '100%', textAlign: 'start', cursor: 'pointer',
        border: 'none', padding: '1.05rem 1.5rem', color: 'inherit',
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(180deg, rgba(213,43,30,0.10), rgba(213,43,30,0))',
        borderBottom: open ? '1px solid rgba(213,43,30,0.28)' : '1px solid transparent',
      }}>
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'var(--font-label)', fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', color: 'var(--canada-300)' }}>
            <svg width="12" height="12" viewBox="-2015 -2000 4030 4030" fill="currentColor" aria-hidden="true" style={{ color: 'var(--canada-400)', flexShrink: 0 }}><path d={LEAF} /></svg>
            Soapbox
          </span>
          <span className="soap-fold__cta" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }} />
        </span>
        <span style={{ display: 'block', marginTop: 8, fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.15rem', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>{title}</span>
      </button>
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 380ms var(--ease)' }}>
        <div style={{ overflow: 'hidden' }}>
          <Soapbox title={title} signoff={signoff}>{children}</Soapbox>
        </div>
      </div>
    </section>
  );
}

/* Recreated artifacts for the worked example in "Summaries all the way down".
   All names, providers, and numbers are fictionalized; the shape is real. */

function FigCaption({ children }) {
  return <figcaption style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', lineHeight: 1.6, color: 'var(--text-muted)' }}>{children}</figcaption>;
}

function MiniTable({ head, rows }) {
  const cell = { padding: '5px 10px 5px 0', borderTop: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.5, textAlign: 'start', verticalAlign: 'top' };
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
      <thead>
        <tr>{head.map((h) => (
          <th key={h} style={{ ...cell, borderTop: 'none', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontSize: 10 }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>{r.map((c, j) => (
            <td key={j} style={{ ...cell, color: j === 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{c}</td>
          ))}</tr>
        ))}
      </tbody>
    </table>
  );
}

// The engineer's report: dense, excellent, six tables deep. Shown truncated.
function ReportFigure() {
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', padding: '16px 18px 0', overflow: 'hidden' }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>#doc-pipeline · May 28 · the engineer</p>
        <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>Headline funnel — 48,217 documents submitted (settled)</p>
        <MiniTable
          head={['Funnel stage', 'Count', '% of submitted', 'Note']}
          rows={[
            ['Rejected at gate (intentional)', '37,944', '78.7%', 'healthy filtering: wrong path + duplicates'],
            ['Real in-worker errors', '29', '<0.1%', 'the only true failures'],
            ['Status frozen (tracking bug)', '6,820', '14.1%', '≈4,433 actually completed'],
            ['Completed-as-tracked', '3,424', '7.1%', 'undercount; true completions higher'],
          ]}
        />
        <p style={{ margin: '16px 0 0', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>2b. Real in-worker errors — 29 (settled; the actionable failures)</p>
        <MiniTable
          head={['Error bucket', 'Count', 'Root cause']}
          rows={[
            ['Worker exited prematurely: signal 9', '11', 'OOM kill; container exceeded memory mid-job'],
            ['Got index error while flattening', '6', 'code-level bug in PDF flattening'],
            ['Unsupported file type … only PDF', '5', 'non-PDF slipped past the gate'],
            ['TimeLimitExceeded(55555,)', '4', 'hard task time-limit (≈15.4h ceiling)'],
            ['Image size exceeds limit', '3', 'decompression bomb guard, working as intended'],
          ]}
        />
        <div style={{ position: 'relative', marginTop: 16, height: 62, overflow: 'hidden' }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>2c. Status frozen — 6,820 (tracking bug, NOT a processing stall)</p>
          <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.5, color: 'var(--text-secondary)' }}>Validated against the store: these records carry a stale status, but most of the documents actually processed. Breaking the bucket down by what the children did …</p>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 8%, var(--bg-surface) 94%)' }} />
        </div>
      </div>
      <FigCaption>The engineer's report (recreated; names and numbers changed). It continues like this: six tables of forensics covering the frozen-status autopsy, the gate profile of the lost documents, time clustering, and provider mix. Excellent work, and twenty minutes of close reading.</FigCaption>
    </figure>
  );
}

// The manager's model-generated summary of the report.
function SummaryFigure() {
  const h = { margin: '14px 0 0', fontFamily: 'var(--font-label)', fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--text-muted)' };
  const p = { margin: '5px 0 0', fontFamily: 'var(--font-prose)', fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)' };
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', padding: '16px 18px 18px' }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>#doc-pipeline · May 28 · product, via the model</p>
        <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-prose)', fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>Summary: May 28 Pipeline Lifecycle Analysis</p>
        <p style={h}>Overall picture</p>
        <p style={p}>Of 48,217 documents submitted, the pipeline is <strong>healthier than the headline numbers suggest</strong>. The apparent ~79% "failure" rate is almost entirely intentional filtering, not breakage.</p>
        <p style={h}>Funnel breakdown</p>
        <ul style={{ ...p, paddingInlineStart: 20 }}>
          <li><strong>Intentional gate rejections (37,944 — 79%):</strong> working as designed; wrong paths and duplicate documents filtered out. No action needed.</li>
          <li><strong>Genuine worker errors (29 — &lt;0.1%):</strong> the only true processing failures: OOM kills, one flattening bug, a few oversized files.</li>
          <li><strong>"Frozen" status (6,820 — 14%):</strong> a tracking bug, not a processing failure; ~4,433 of these actually completed. A fix is in review.</li>
          <li><strong>The one real loss (1,154):</strong> silent webserver OOM under burst load, killing in-flight requests with no error and no retry. Recoverable via event-replay.</li>
        </ul>
        <p style={h}>Key takeaway</p>
        <p style={p}>The primary issue is observability, not throughput. The lost documents are recoverable, but the underlying cause needs to be addressed to prevent recurrence under burst load.</p>
      </div>
      <FigCaption>The re-summary (recreated). Nothing in it is wrong. Everything in it is the same size.</FigCaption>
    </figure>
  );
}

// The progressive TL;DR: banner = glance, cards + bar = brief, report = full.
function DashboardFigure() {
  const card = (edge) => ({ border: '1px solid var(--border)', borderTop: `2px solid ${edge}`, borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', padding: '12px 14px' });
  const label = { margin: 0, fontFamily: 'var(--font-label)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' };
  const big = { margin: '8px 0 4px', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 26, lineHeight: 1, color: 'var(--text-primary)' };
  const sub = { margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10.5, lineHeight: 1.55, color: 'var(--text-muted)' };
  const seg = (w, c) => ({ width: w, background: c, height: '100%' });
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', padding: '16px 18px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <p style={{ ...label, color: 'var(--amber-300)' }}>doc-pipeline · lifecycle health</p>
          <p style={{ ...label, color: 'var(--text-muted)' }}>28 May · settled · 48,217 submitted</p>
        </div>
        <p style={{ margin: '14px 0 0', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16.5, lineHeight: 1.5, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>
          The pipeline is <span style={{ color: 'var(--teal-400)' }}>healthy</span>. The <s style={{ color: 'var(--text-muted)' }}>79% "failure" rate</s> is intentional filtering, not breakage. The one real problem: <span style={{ color: 'var(--canada-300)' }}>1,154 documents silently lost</span> to a webserver memory bug during traffic bursts. <span style={{ color: 'var(--amber-300)' }}>Recoverable.</span>
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, marginTop: 16 }}>
          <div style={card('var(--teal-400)')}>
            <p style={{ ...label, color: 'var(--teal-400)' }}>Processing · healthy</p>
            <p style={big}>29 <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>/ 48,217</span></p>
            <p style={sub}>genuine in-worker errors are negligible; the work that runs, runs clean</p>
          </div>
          <div style={card('var(--amber-300)')}>
            <p style={{ ...label, color: 'var(--amber-300)' }}>Observability · degraded</p>
            <p style={big}>6,820</p>
            <p style={sub}>statuses mis-tracked; 4,433 (65%) show as stuck but actually finished (fix in review)</p>
          </div>
          <div style={card('var(--canada-400)')}>
            <p style={{ ...label, color: 'var(--canada-300)' }}>Intake · data loss</p>
            <p style={big}>1,154</p>
            <p style={sub}>OOM-killed at intake during overnight bursts; recoverable via event-replay</p>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <p style={{ ...label, color: 'var(--text-muted)' }}>reality check · what "79% failure" actually is</p>
          <div style={{ display: 'flex', height: 22, borderRadius: 4, overflow: 'hidden', marginTop: 8, border: '1px solid var(--border)' }}>
            <div style={seg('78.7%', 'rgba(154,153,150,0.30)')} title="rejected at gate, by design" />
            <div style={seg('14.1%', 'rgba(252,172,60,0.55)')} title="status frozen (tracking bug)" />
            <div style={seg('7.1%', 'rgba(65,199,199,0.55)')} title="completed as tracked" />
            <div style={{ ...seg('0.2%', 'var(--canada-500)'), minWidth: 3 }} title="real errors" />
          </div>
          <p style={{ ...sub, marginTop: 8 }}>intentional reject (bad path + duplicate) · frozen, mostly finished · completed-as-tracked · real errors: 29</p>
        </div>
      </div>
      <FigCaption>The artifact (recreated). The banner is the glance, the cards and the bar are the brief, and the engineer's full report rides along underneath as the full. Nobody downstream needs to re-summarize; every altitude already exists.</FigCaption>
    </figure>
  );
}

// "Summaries all the way down" — the compression-chain essay.
function SummariesBody() {
  return (
    <Prose dropcap style={{ maxWidth: '100%' }}>
      {/* The article practices its own thesis: the glance ships first. */}
      <Callout variant="takeaway" title="The glance">
        Stop forwarding compressions. Summarize once, at the source, in three layers (glance, brief, full) and ship them together; the reader picks the altitude and the important detail survives.
      </Callout>

      {/* Floated aside: placed before the passage it accompanies so it wraps
          beside paragraphs 1-2 and resolves before the first section heading. */}
      <Soapbox variant="aside" label="Hot take" signoff="and the second guess is worse">
        <p>A summary of a summary is not a shorter version of the document. It is a guess about a guess.</p>
      </Soapbox>

      <p>Last month I watched a single fact make a five-hop journey across an org. An engineer wrote a careful incident review: what broke, why, and the one caveat that mattered (the fix was a stopgap and would not survive the next traffic spike). A model summarized the review for the team channel. The channel summary got rolled into the weekly ops report. The ops report got summarized into an exec brief. And the exec, short on time, pasted the brief into an assistant and asked for the TL;DR. By the time the information reached the decision, the caveat was gone. The stopgap shipped as the fix.</p>

      <p>Nobody in that chain did anything unreasonable. Every hop was a sensible person making a long thing shorter for a busy person. That is what makes the pattern dangerous: it is summaries all the way down, and each individual summary looks like good citizenship.</p>

      <h2>Compression compounds</h2>
      <p>Every summary is lossy compression. That is the point of a summary; it drops what looks unimportant. The trouble is that caveats, edge cases, and dissent are statistically rare in a document, structurally subordinate, and therefore look exactly like the unimportant stuff. They get dropped first. The research backs the intuition: studies of LLM summarization keep finding that omission outpaces hallucination; the model is far more likely to quietly leave the load-bearing sentence out than to make one up. And work on iterative generation (the academic version of the telephone game) shows the distortion compounds with every hop. The tails of the distribution disappear, and the caveat lives in the tail.</p>

      <PullQuote cite="Matthew Purdon">
        The caveat is always the first casualty. It is rare, it is subordinate, and it is the single most expensive thing in the document to lose.
      </PullQuote>

      <p>There is a Tom Fishburne cartoon from 2023 that nailed the loop before most of us were living it: one worker uses AI to inflate a bullet point into a long email he can pretend he wrote; the recipient uses AI to deflate the email back into a bullet point she can pretend she read. We pay the compression tax in both directions and the bullet point that comes out is not the bullet point that went in. By 2025 the researchers had a name for the genre, workslop, and numbers to go with it: roughly forty percent of desk workers reported receiving it monthly, at a cost of about two hours of rework per incident. The chain is not a thought experiment. It is the org chart.</p>

      <Callout variant="note">
        Tiago Forte said the quiet part years ago, writing about note-taking: <em>you cannot compress something without losing some of its context.</em> The fix is not better compression. The fix is keeping every layer.
      </Callout>

      <h2>The chain, caught in the wild</h2>
      <p>Here is a real one from this spring, recreated with the names and numbers changed (the shape is exact). An engineer shipped a lifecycle analysis of a document pipeline: 48,217 submissions, a scary-looking 79% "failure" rate, and the forensics showing that almost none of it was real failure. Six tables deep, every claim traceable to a query. It is excellent work, and it costs twenty minutes to read properly.</p>

      <ReportFigure />

      <p>Twenty minutes is more than most of the audience had, so a product manager did the sensible thing and asked a model to boil it down for the channel:</p>

      <SummaryFigure />

      <p>Nothing in the summary is wrong, and that is exactly what makes it instructive: this is the chain working as designed, and the signal is already going. Every fact arrives at the same volume, so the reader cannot tell the routine from the load-bearing. The one sentence that should change somebody's week (the loss will recur on the next traffic burst until the fix ships) sits mid-bullet, indistinguishable from the housekeeping. And this is hop one. The next hop keeps "pipeline is healthy" and drops the rest.</p>

      <h2>The old fixes knew something we forgot</h2>
      <p>None of this is a new problem, and the old solutions are instructive. Journalists built the inverted pyramid because telegraph-era editors cut stories from the bottom; the format was designed to <em>survive truncation</em>. The military codified BLUF, bottom line up front, into actual regulation. Minto taught consultants to argue in pyramids: answer at the top, evidence below, descend only as needed. And the scientific paper (title, abstract, introduction, body, appendix) is the oldest progressive TL;DR in production, shipping every altitude of the same idea in one artifact for four hundred years.</p>

      <p>And the version I love most comes from my own trade: the C4 model. Simon Brown's whole pitch is that an architecture diagram should work like a map: you zoom. <strong>Context</strong>: here is the system and who touches it. <strong>Containers</strong>: here is what it is made of. <strong>Components</strong>: here is how one piece works inside. <strong>Code</strong>: here is the class, if you really must. I have reached for C4 for years, and it took watching the summary chain fail around me to understand why I trust it so much: it is choose-your-own-complexity. Nobody asks for a summary of a C4 set, because the summary is built in; the top diagram is the summary, and every deeper answer is one zoom away, drawn by the author from the same source of truth. A stakeholder and a new hire read the same artifact at different altitudes and neither one gets a guess.</p>

      <p>Notice what all of them have in common: the detail stays attached. The reader chooses a depth and the rest of the document is right there, un-summarized, when they want more. The modern summary chain breaks exactly this property. Every hop strips the source and forwards only the compression. It is repeated truncation in which nobody keeps the original: the inverted pyramid with the bottom torn off at every desk it crosses.</p>

      <h2>Build the drill-down instead</h2>
      <p>So I stopped sending summaries and started sending altitudes. The artifact I now build has three fixed layers. The <strong>glance</strong>: the decision and the one caveat that matters, readable in ten seconds. The <strong>brief</strong>: the reasoning and the trade-offs, two minutes. The <strong>full</strong>: everything (the source document, the transcript, the raw numbers) attached, always. One artifact, written once, at the source, by the person with full context. The reader picks the depth. Nobody downstream re-summarizes, because the summary at every depth already exists and it was made by the one node in the chain that had the whole picture. It is C4 for prose.</p>

      <p>For the pipeline report above, here is how those altitudes landed:</p>

      <DashboardFigure />

      <Callout variant="tip" title="Three altitudes, not a telescope">
        Fixed layers, not infinitely expanding text. The usability research on progressive disclosure is old and clear: past about two levels of drill-down, readers get lost. Telescoping prose has been tried since 1970 (Ted Nelson called it StretchText) and it never won, partly for this reason. Even C4 defines four zoom levels, and Brown himself will tell you most teams only ever need the top two. Glance, brief, full. Stop there.
      </Callout>

      <p>The honest objection is that this is more work, and it used to be true. Writing three altitudes of the same document was three writing jobs, which is why only journalists, scientists, and the military ever sustained the habit (they had editors, referees, and regulations to enforce it). That economics just changed. A model with the <em>full source</em> in context produces credible drafts of all three layers in about a minute. The author's job collapses to editing and verifying: one act of judgement at the source instead of five acts of guessing along the chain. The same tool that caused the slop makes the fix nearly free. We are just pointing it at the wrong end of the pipeline.</p>

      <Callout variant="warning" title="The catch">
        The glance is the layer everyone reads and the easiest to get subtly wrong. If you let the model draft it and do not check it against the full document yourself, you have not fixed the chain; you have built a prettier first hop. Verify the ten-second layer hardest.
      </Callout>

      <p>I am still tuning the format (the layer names change weekly, and the glance keeps wanting to grow a fourth sentence) but it has already paid for itself: the questions I get now are about the work, not about what I meant. The chain stops where the layers start.</p>

      {/* The closing rant is an appendix, optional by design — collapsed
          until the reader asks for it. */}
      <SoapboxFold title="Who the hell has time to read that?" signoff="and yes, I'd make you read it out loud">
        <p>That was my first honest reaction when the report landed. Six tables. Beautiful tables! I read the whole thing and I'm pretty sure that made me the only one, and I only did it because the pipeline was mine to care about. Everybody else saw the size of the scroll bar and bailed.</p>
        <p>Then the summary hit the channel and I had an evil little thought I still stand behind: whoever posted it should have to read the original out loud in a meeting. All of it. Every row. So ... many ... rows ... brutal. You want to compress somebody's work? Earn it. Feel the twenty minutes first, then decide what survives. (I would absolutely sit there the whole time, watching.)</p>
        <p>Because the actual sin isn't the model, you know? It's using it blind. No judgement, no empathy, zero seconds spent on what the person receiving this needs in order to decide something. Just paste, generate, post, walk away. That's not communication, that's dumping workslop all over someone's face. The question that fixes it is ancient and has nothing to do with AI: if I was in their position, what would I want from someone in my position? Answer that first and the artifact basically designs itself.</p>
      </SoapboxFold>
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

// Hand-written essay bodies, keyed by slug. Everything else gets DefaultBody.
const BODIES = {
  'summaries-all-the-way-down': SummariesBody,
};

export default function Article({ post, t, openTopic, go }) {
  const Body = BODIES[post.slug];
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
        <Cover id={'art-' + post.slug} t={t} category={post.category} accent={post.accent} height={60} labelSize="var(--prose-lead)" centerLabel />
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 32px 64px' }}>
        {Body ? <Body /> : <DefaultBody post={post} />}

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
