/* matthewpurdon.me — single article view. */
import { useRef, useState } from "react";
import DS from "./ds/index.js";
import { Cover, kicker, useDeepAnchors, LEAF } from "./shared.jsx";
import { AVATAR, PROFILE } from "./data.js";

const { Prose, Soapbox, Callout, PullQuote, Byline, CodeBlock } = DS;

// Collapsed-by-default Soapbox for end-of-article rants. One card: the header
// is always visible (and pulses gently while closed — see .soap-fold rules in
// site.css), the body slides open on click via a grid-rows transition. The
// header carries the title, so the inner Soapbox chrome is stripped in CSS.
function SoapboxFold({ title, signoff, children }) {
  const [open, setOpen] = useState(false);
  return (
    <section
      className={"soap-fold" + (open ? " is-open" : "")}
      style={{
        border: "1px solid rgba(213,43,30,0.35)",
        borderInlineStart: "4px solid var(--canada-500)",
        borderRadius: "var(--radius-lg)",
        background: "var(--callout-soapbox-bg)",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        className="soap-fold__head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          display: "block",
          width: "100%",
          textAlign: "start",
          cursor: "pointer",
          border: "none",
          padding: "1.05rem 1.5rem",
          color: "inherit",
          backgroundColor: "transparent",
          backgroundImage: "linear-gradient(180deg, rgba(213,43,30,0.10), rgba(213,43,30,0))",
          borderBottom: open ? "1px solid rgba(213,43,30,0.28)" : "1px solid transparent",
        }}
      >
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              fontFamily: "var(--font-label)",
              fontSize: "var(--text-xs)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-widest)",
              color: "var(--canada-300)",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="-2015 -2000 4030 4030"
              fill="currentColor"
              aria-hidden="true"
              style={{ color: "var(--canada-400)", flexShrink: 0 }}
            >
              <path d={LEAF} />
            </svg>
            Soapbox
          </span>
          <span
            className="soap-fold__cta"
            style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}
          />
        </span>
        <span
          style={{
            display: "block",
            marginTop: 8,
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "1.15rem",
            letterSpacing: "-0.01em",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </span>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 380ms var(--ease)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <Soapbox title={title} signoff={signoff}>
            {children}
          </Soapbox>
        </div>
      </div>
    </section>
  );
}

/* Recreated artifacts for the worked example in "Summaries all the way down".
   All names, providers, and numbers are fictionalized; the shape is real. */

function FigCaption({ children }) {
  return (
    <figcaption
      style={{
        marginTop: 10,
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-xs)",
        lineHeight: 1.6,
        color: "var(--text-muted)",
      }}
    >
      {children}
    </figcaption>
  );
}

function MiniTable({ head, rows }) {
  const cell = {
    padding: "5px 10px 5px 0",
    borderTop: "1px solid var(--border)",
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    lineHeight: 1.5,
    textAlign: "start",
    verticalAlign: "top",
  };
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
      <thead>
        <tr>
          {head.map((h) => (
            <th
              key={h}
              style={{
                ...cell,
                borderTop: "none",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                fontSize: 10,
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j} style={{ ...cell, color: j === 0 ? "var(--text-primary)" : "var(--text-secondary)" }}>
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// The engineer's report: dense, excellent, six tables deep. Shown truncated.
function ReportFigure() {
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          background: "var(--bg-surface)",
          padding: "16px 18px 0",
          overflow: "hidden",
        }}
      >
        <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>
          #doc-pipeline · May 28 · the engineer
        </p>
        <p
          style={{
            margin: "12px 0 0",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: 14,
            color: "var(--text-primary)",
          }}
        >
          Headline funnel — 48,217 documents submitted (settled)
        </p>
        <MiniTable
          head={["Funnel stage", "Count", "% of submitted", "Note"]}
          rows={[
            ["Rejected at gate (intentional)", "37,944", "78.7%", "healthy filtering: wrong path + duplicates"],
            ["Real in-worker errors", "29", "<0.1%", "the only true failures"],
            ["Status frozen (tracking bug)", "6,820", "14.1%", "≈4,433 actually completed"],
            ["Completed-as-tracked", "3,424", "7.1%", "undercount; true completions higher"],
          ]}
        />
        <p
          style={{
            margin: "16px 0 0",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: 13,
            color: "var(--text-primary)",
          }}
        >
          2b. Real in-worker errors — 29 (settled; the actionable failures)
        </p>
        <MiniTable
          head={["Error bucket", "Count", "Root cause"]}
          rows={[
            ["Worker exited prematurely: signal 9", "11", "OOM kill; container exceeded memory mid-job"],
            ["Got index error while flattening", "6", "code-level bug in PDF flattening"],
            ["Unsupported file type … only PDF", "5", "non-PDF slipped past the gate"],
            ["TimeLimitExceeded(55555,)", "4", "hard task time-limit (≈15.4h ceiling)"],
            ["Image size exceeds limit", "3", "decompression bomb guard, working as intended"],
          ]}
        />
        <div style={{ position: "relative", marginTop: 16, height: 62, overflow: "hidden" }}>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: 13,
              color: "var(--text-primary)",
            }}
          >
            2c. Status frozen — 6,820 (tracking bug, NOT a processing stall)
          </p>
          <p
            style={{
              margin: "6px 0 0",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              lineHeight: 1.5,
              color: "var(--text-secondary)",
            }}
          >
            Validated against the store: these records carry a stale status, but most of the documents actually
            processed. Breaking the bucket down by what the children did …
          </p>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, transparent 8%, var(--bg-surface) 94%)",
            }}
          />
        </div>
      </div>
      <FigCaption>
        The engineer's report (recreated; names and numbers changed). It continues like this: six tables of forensics
        covering the frozen-status autopsy, the gate profile of the lost documents, time clustering, and provider mix.
        Excellent work, and twenty minutes of close reading.
      </FigCaption>
    </figure>
  );
}

// The manager's model-generated summary of the report.
function SummaryFigure() {
  const h = {
    margin: "14px 0 0",
    fontFamily: "var(--font-label)",
    fontSize: "var(--text-xs)",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "var(--tracking-wide)",
    color: "var(--text-muted)",
  };
  const p = {
    margin: "5px 0 0",
    fontFamily: "var(--font-prose)",
    fontSize: 14.5,
    lineHeight: 1.6,
    color: "var(--text-secondary)",
  };
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          background: "var(--bg-surface)",
          padding: "16px 18px 18px",
        }}
      >
        <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>
          #doc-pipeline · May 28 · product, via the model
        </p>
        <p
          style={{
            margin: "12px 0 0",
            fontFamily: "var(--font-prose)",
            fontWeight: 700,
            fontSize: 15,
            color: "var(--text-primary)",
          }}
        >
          Summary: May 28 Pipeline Lifecycle Analysis
        </p>
        <p style={h}>Overall picture</p>
        <p style={p}>
          Of 48,217 documents submitted, the pipeline is <strong>healthier than the headline numbers suggest</strong>.
          The apparent ~79% "failure" rate is almost entirely intentional filtering, not breakage.
        </p>
        <p style={h}>Funnel breakdown</p>
        <ul style={{ ...p, paddingInlineStart: 20 }}>
          <li>
            <strong>Intentional gate rejections (37,944 — 79%):</strong> working as designed; wrong paths and duplicate
            documents filtered out. No action needed.
          </li>
          <li>
            <strong>Genuine worker errors (29 — &lt;0.1%):</strong> the only true processing failures: OOM kills, one
            flattening bug, a few oversized files.
          </li>
          <li>
            <strong>"Frozen" status (6,820 — 14%):</strong> a tracking bug, not a processing failure; ~4,433 of these
            actually completed. A fix is in review.
          </li>
          <li>
            <strong>The one real loss (1,154):</strong> silent webserver OOM under burst load, killing in-flight
            requests with no error and no retry. Recoverable via event-replay.
          </li>
        </ul>
        <p style={h}>Key takeaway</p>
        <p style={p}>
          The primary issue is observability, not throughput. The lost documents are recoverable, but the underlying
          cause needs to be addressed to prevent recurrence under burst load.
        </p>
      </div>
      <FigCaption>The re-summary (recreated). Nothing in it is wrong. Everything in it is the same size.</FigCaption>
    </figure>
  );
}

// The progressive TL;DR: banner = glance, cards + bar = brief, report = full.
function DashboardFigure() {
  const card = (edge) => ({
    border: "1px solid var(--border)",
    borderTop: `2px solid ${edge}`,
    borderRadius: "var(--radius-md)",
    background: "var(--bg-surface)",
    padding: "12px 14px",
  });
  const label = {
    margin: 0,
    fontFamily: "var(--font-label)",
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  };
  const big = {
    margin: "8px 0 4px",
    fontFamily: "var(--font-mono)",
    fontWeight: 700,
    fontSize: 26,
    lineHeight: 1,
    color: "var(--text-primary)",
  };
  const sub = {
    margin: 0,
    fontFamily: "var(--font-mono)",
    fontSize: 10.5,
    lineHeight: 1.55,
    color: "var(--text-muted)",
  };
  const seg = (w, c) => ({ width: w, background: c, height: "100%" });
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          background: "var(--bg-elevated)",
          padding: "16px 18px 18px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <p style={{ ...label, color: "var(--amber-300)" }}>doc-pipeline · lifecycle health</p>
          <p style={{ ...label, color: "var(--text-muted)" }}>28 May · settled · 48,217 submitted</p>
        </div>
        <p
          style={{
            margin: "14px 0 0",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: 16.5,
            lineHeight: 1.5,
            letterSpacing: "-0.01em",
            color: "var(--text-primary)",
          }}
        >
          The pipeline is <span style={{ color: "var(--teal-400)" }}>healthy</span>. The{" "}
          <s style={{ color: "var(--text-muted)" }}>79% "failure" rate</s> is intentional filtering, not breakage. The
          one real problem: <span style={{ color: "var(--canada-300)" }}>1,154 documents silently lost</span> to a
          webserver memory bug during traffic bursts. <span style={{ color: "var(--amber-300)" }}>Recoverable.</span>
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: 12,
            marginTop: 16,
          }}
        >
          <div style={card("var(--teal-400)")}>
            <p style={{ ...label, color: "var(--teal-400)" }}>Processing · healthy</p>
            <p style={big}>
              29 <span style={{ fontSize: 12, color: "var(--text-muted)" }}>/ 48,217</span>
            </p>
            <p style={sub}>genuine in-worker errors are negligible; the work that runs, runs clean</p>
          </div>
          <div style={card("var(--amber-300)")}>
            <p style={{ ...label, color: "var(--amber-300)" }}>Observability · degraded</p>
            <p style={big}>6,820</p>
            <p style={sub}>statuses mis-tracked; 4,433 (65%) show as stuck but actually finished (fix in review)</p>
          </div>
          <div style={card("var(--canada-400)")}>
            <p style={{ ...label, color: "var(--canada-300)" }}>Intake · data loss</p>
            <p style={big}>1,154</p>
            <p style={sub}>OOM-killed at intake during overnight bursts; recoverable via event-replay</p>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <p style={{ ...label, color: "var(--text-muted)" }}>reality check · what "79% failure" actually is</p>
          <div
            style={{
              display: "flex",
              height: 22,
              borderRadius: 4,
              overflow: "hidden",
              marginTop: 8,
              border: "1px solid var(--border)",
            }}
          >
            <div style={seg("78.7%", "rgba(154,153,150,0.30)")} title="rejected at gate, by design" />
            <div style={seg("14.1%", "rgba(252,172,60,0.55)")} title="status frozen (tracking bug)" />
            <div style={seg("7.1%", "rgba(65,199,199,0.55)")} title="completed as tracked" />
            <div style={{ ...seg("0.2%", "var(--canada-500)"), minWidth: 3 }} title="real errors" />
          </div>
          <p style={{ ...sub, marginTop: 8 }}>
            intentional reject (bad path + duplicate) · frozen, mostly finished · completed-as-tracked · real errors: 29
          </p>
        </div>
      </div>
      <FigCaption>
        The artifact (recreated). The banner is the glance, the cards and the bar are the brief, and the engineer's full
        report rides along underneath as the full. Nobody downstream needs to re-summarize; every altitude already
        exists.
      </FigCaption>
    </figure>
  );
}

// "Summaries all the way down" — the compression-chain essay.
function SummariesBody() {
  return (
    <Prose dropcap style={{ maxWidth: "100%" }}>
      {/* The article practices its own thesis: the glance ships first. */}
      <Callout variant="takeaway" title="The glance">
        Stop forwarding compressions. Summarize once, at the source, in three layers (glance, brief, full) and ship them
        together; the reader picks the altitude and the important detail survives.
      </Callout>

      {/* Floated aside: placed before the passage it accompanies so it wraps
          beside paragraphs 1-2 and resolves before the first section heading. */}
      <Soapbox variant="aside" label="Hot take" signoff="and the second guess is worse">
        <p>A summary of a summary is not a shorter version of the document. It is a guess about a guess.</p>
      </Soapbox>

      <p>
        Last month I watched a single fact make a five-hop journey across an org. An engineer wrote a careful incident
        review: what broke, why, and the one caveat that mattered (the fix was a stopgap and would not survive the next
        traffic spike). A model summarized the review for the team channel. The channel summary got rolled into the
        weekly ops report. The ops report got summarized into an exec brief. And the exec, short on time, pasted the
        brief into an assistant and asked for the TL;DR. By the time the information reached the decision, the caveat
        was gone. The stopgap shipped as the fix.
      </p>

      <p>
        Nobody in that chain did anything unreasonable. Every hop was a sensible person making a long thing shorter for
        a busy person. That is what makes the pattern dangerous: it is summaries all the way down, and each individual
        summary looks like good citizenship.
      </p>

      <h2>Compression compounds</h2>
      <p>
        Every summary is lossy compression. That is the point of a summary; it drops what looks unimportant. The trouble
        is that caveats, edge cases, and dissent are statistically rare in a document, structurally subordinate, and
        therefore look exactly like the unimportant stuff. They get dropped first. The research backs the intuition:
        studies of LLM summarization keep finding that omission outpaces hallucination; the model is far more likely to
        quietly leave the load-bearing sentence out than to make one up. And work on iterative generation (the academic
        version of the telephone game) shows the distortion compounds with every hop. The tails of the distribution
        disappear, and the caveat lives in the tail.
      </p>

      <PullQuote cite="Matthew Purdon">
        The caveat is always the first casualty. It is rare, it is subordinate, and it is the single most expensive
        thing in the document to lose.
      </PullQuote>

      <p>
        There is a Tom Fishburne cartoon from 2023 that nailed the loop before most of us were living it: one worker
        uses AI to inflate a bullet point into a long email he can pretend he wrote; the recipient uses AI to deflate
        the email back into a bullet point she can pretend she read. We pay the compression tax in both directions and
        the bullet point that comes out is not the bullet point that went in. By 2025 the researchers had a name for the
        genre, workslop, and numbers to go with it: roughly forty percent of desk workers reported receiving it monthly,
        at a cost of about two hours of rework per incident. The chain is not a thought experiment. It is the org chart.
      </p>

      <Callout variant="note">
        Tiago Forte said the quiet part years ago, writing about note-taking:{" "}
        <em>you cannot compress something without losing some of its context.</em> The fix is not better compression.
        The fix is keeping every layer.
      </Callout>

      <h2>The chain, caught in the wild</h2>
      <p>
        Here is a real one from this spring, recreated with the names and numbers changed (the shape is exact). An
        engineer shipped a lifecycle analysis of a document pipeline: 48,217 submissions, a scary-looking 79% "failure"
        rate, and the forensics showing that almost none of it was real failure. Six tables deep, every claim traceable
        to a query. It is excellent work, and it costs twenty minutes to read properly.
      </p>

      <ReportFigure />

      <p>
        Twenty minutes is more than most of the audience had, so a product manager did the sensible thing and asked a
        model to boil it down for the channel:
      </p>

      <SummaryFigure />

      <p>
        Nothing in the summary is wrong, and that is exactly what makes it instructive: this is the chain working as
        designed, and the signal is already going. Every fact arrives at the same volume, so the reader cannot tell the
        routine from the load-bearing. The one sentence that should change somebody's week (the loss will recur on the
        next traffic burst until the fix ships) sits mid-bullet, indistinguishable from the housekeeping. And this is
        hop one. The next hop keeps "pipeline is healthy" and drops the rest.
      </p>

      <h2>The old fixes knew something we forgot</h2>
      <p>
        None of this is a new problem, and the old solutions are instructive. Journalists built the inverted pyramid
        because telegraph-era editors cut stories from the bottom; the format was designed to{" "}
        <em>survive truncation</em>. The military codified BLUF, bottom line up front, into actual regulation. Minto
        taught consultants to argue in pyramids: answer at the top, evidence below, descend only as needed. And the
        scientific paper (title, abstract, introduction, body, appendix) is the oldest progressive TL;DR in production,
        shipping every altitude of the same idea in one artifact for four hundred years.
      </p>

      <p>
        And the version I love most comes from my own trade: the C4 model. Simon Brown's whole pitch is that an
        architecture diagram should work like a map: you zoom. <strong>Context</strong>: here is the system and who
        touches it. <strong>Containers</strong>: here is what it is made of. <strong>Components</strong>: here is how
        one piece works inside. <strong>Code</strong>: here is the class, if you really must. I have reached for C4 for
        years, and it took watching the summary chain fail around me to understand why I trust it so much: it is
        choose-your-own-complexity. Nobody asks for a summary of a C4 set, because the summary is built in; the top
        diagram is the summary, and every deeper answer is one zoom away, drawn by the author from the same source of
        truth. A stakeholder and a new hire read the same artifact at different altitudes and neither one gets a guess.
      </p>

      <p>
        Notice what all of them have in common: the detail stays attached. The reader chooses a depth and the rest of
        the document is right there, un-summarized, when they want more. The modern summary chain breaks exactly this
        property. Every hop strips the source and forwards only the compression. It is repeated truncation in which
        nobody keeps the original: the inverted pyramid with the bottom torn off at every desk it crosses.
      </p>

      <h2>Build the drill-down instead</h2>
      <p>
        So I stopped sending summaries and started sending altitudes. The artifact I now build has three fixed layers.
        The <strong>glance</strong>: the decision and the one caveat that matters, readable in ten seconds. The{" "}
        <strong>brief</strong>: the reasoning and the trade-offs, two minutes. The <strong>full</strong>: everything
        (the source document, the transcript, the raw numbers) attached, always. One artifact, written once, at the
        source, by the person with full context. The reader picks the depth. Nobody downstream re-summarizes, because
        the summary at every depth already exists and it was made by the one node in the chain that had the whole
        picture. It is C4 for prose.
      </p>

      <p>For the pipeline report above, here is how those altitudes landed:</p>

      <DashboardFigure />

      <Callout variant="tip" title="Three altitudes, not a telescope">
        Fixed layers, not infinitely expanding text. The usability research on progressive disclosure is old and clear:
        past about two levels of drill-down, readers get lost. Telescoping prose has been tried since 1970 (Ted Nelson
        called it StretchText) and it never won, partly for this reason. Even C4 defines four zoom levels, and Brown
        himself will tell you most teams only ever need the top two. Glance, brief, full. Stop there.
      </Callout>

      <p>
        The honest objection is that this is more work, and it used to be true. Writing three altitudes of the same
        document was three writing jobs, which is why only journalists, scientists, and the military ever sustained the
        habit (they had editors, referees, and regulations to enforce it). That economics just changed. A model with the{" "}
        <em>full source</em> in context produces credible drafts of all three layers in about a minute. The author's job
        collapses to editing and verifying: one act of judgement at the source instead of five acts of guessing along
        the chain. The same tool that caused the slop makes the fix nearly free. We are just pointing it at the wrong
        end of the pipeline.
      </p>

      <Callout variant="warning" title="The catch">
        The glance is the layer everyone reads and the easiest to get subtly wrong. If you let the model draft it and do
        not check it against the full document yourself, you have not fixed the chain; you have built a prettier first
        hop. Verify the ten-second layer hardest.
      </Callout>

      <p>
        I am still tuning the format (the layer names change weekly, and the glance keeps wanting to grow a fourth
        sentence) but it has already paid for itself: the questions I get now are about the work, not about what I
        meant. The chain stops where the layers start.
      </p>

      {/* The closing rant is an appendix, optional by design — collapsed
          until the reader asks for it. */}
      <SoapboxFold title="Who the hell has time to read that?" signoff="and yes, I'd make you read it out loud">
        <p>
          That was my first honest reaction when the report landed. Six tables. Beautiful tables! I read the whole thing
          and I'm pretty sure that made me the only one, and I only did it because the pipeline was mine to care about.
          Everybody else saw the size of the scroll bar and bailed.
        </p>
        <p>
          Then the summary hit the channel and I had an evil little thought I still stand behind: whoever posted it
          should have to read the original out loud in a meeting. All of it. Every row. So ... many ... rows ... brutal.
          You want to compress somebody's work? Earn it. Feel the twenty minutes first, then decide what survives. (I
          would absolutely sit there the whole time, watching.)
        </p>
        <p>
          Because the actual sin isn't the model, you know? It's using it blind. No judgement, no empathy, zero seconds
          spent on what the person receiving this needs in order to decide something. Just paste, generate, post, walk
          away. That's not communication, that's dumping workslop all over someone's face. The question that fixes it is
          ancient and has nothing to do with AI: if I was in their position, what would I want from someone in my
          position? Answer that first and the artifact basically designs itself.
        </p>
      </SoapboxFold>
    </Prose>
  );
}

// Coherent, on-voice default body for the other (draft) essays.
function JudgementBody() {
  return (
    <Prose dropcap style={{ maxWidth: "100%" }}>
      <p>
        You can feel the people who get it now. Hand ten engineers the same model and the work comes back in two piles:
        good and useful, or complicated and missing the mark. Hardly anything lands in between, and the sorting is fast;
        you usually know which pile a thing belongs to before you finish reading its README.
      </p>
      <p>
        <a href="https://ctosub.com/p/the-ctos-new-engineering-ladder" target="_blank" rel="noopener noreferrer">
          The CTO's New Engineering Ladder
        </a>{" "}
        takes a serious swing at this, five rungs and salary bands and all, and it lands one genuinely great sentence:
        the new firing offense is "an engineer who ships AI-generated code they cannot explain". The whole piece is an
        attempt to make judgement observable, and I think it is directionally right. But it is a manager's document; it
        grades output from above. The question it leaves open is the one that interests me: why do two engineers with
        the same model, the same codebase, and the same ticket produce results that are not even cousins? I have spent a
        year watching that gap at close range, and I keep arriving at the same slightly uncomfortable answer.
      </p>
      <Callout variant="takeaway" title="The glance">
        Effort used to be a judgement prosthetic: bad ideas died on the cost of building them. The model removed effort,
        so judgement is the only filter left, and the gap between engineers widens instead of closing. Judgement is
        three gates (the ask, the accept, the look); it is grown, not granted (use what you build, name the misses,
        write the taste down); and it cannot be grown by next quarter, which is why the next article in this pair is
        about hiring for it.
      </Callout>

      <h2>Effort was doing us a favour</h2>
      <Soapbox variant="aside" label="Hot take" signoff="simple means somebody decided">
        <p>
          Complicated isn't ambition, it's avoidance. When you can't (or won't) say the one sentence a thing is for, you
          build everything it might be instead ... all that motion is just deferring the one decision that matters.
          Simple isn't the easy version of the build.
        </p>
      </Soapbox>
      <p>
        Every team carries a backlog of ideas that should not be built. Until recently, most of them died of natural
        causes: the speculative feature cost three weeks, the clever abstraction cost a sprint, and somewhere into the
        second week the builder quietly understood it was not worth it and let it die. Effort was a filter. A crude one,
        and nobody designed it, but it was load-bearing: it rationed bad ideas, and it smuggled understanding into the
        process, because three weeks of building a thing is three weeks of staring at the problem whether you meant to
        or not.
      </p>
      <p>
        The model removes the filter. Everything is an afternoon now; the speculative feature, the clever abstraction,
        and the genuinely right call all cost about the same. So the only thing standing between an idea and a
        fifty-file pull request is the quality of the decision to ask for it. The model returns the quality of the
        question, accepts whatever standard you hold it to, and is exactly as wrong as you let it be. It is an
        amplifier, not an equalizer.
      </p>
      <PullQuote cite="Matthew Purdon">
        AI did not level the playing field. It drained the pool, and now you can see who was standing on what.
      </PullQuote>

      <h2>The graph and the progress bar</h2>
      <p>
        I have been messing with a PR review tool lately, a collaboration with a few engineers I work with. The idea is
        not subtle. The era of the small pull request is over; an ordinary agent-assisted change arrives as fifty files
        now, and most of those files are boilerplate that a reviewer's attention should never touch. The tool has one
        job: make a PR cleaner and more focused to review. Hide the noise, surface the intent. (The fifty-file era
        deserves its own write-up, and it will get one.)
      </p>
      <p>
        One morning a ping landed in my DMs, excitement about a new feature taking shape in the repo - a dependency
        graph. A visualization of how the changed files related to each other, ambitious and technically interesting,
        and I could not connect it to the goal no matter how generously I squinted. I also know, from scar tissue, that
        getting software to draw good graphs is a tar pit; you can lose a month to edge routing and still have something
        nobody reads. When we finally talked it through, it got shelved without much pushback.
      </p>
      <p>
        My first contribution to the tool was less impressive. I pulled up a real PR, and the tool sat there, silent,
        for three minutes; I assumed it had crashed. It had not. It was working, invisibly, the whole time. So I added a
        progress bar.
      </p>
      <p>
        That is the entire gap, in one tool. One of us was building what the tool could be; the other was fixing what
        using it felt like. And notice the shape of the failure, because it is not laziness, and it is not incompetence;
        the graph was the most ambitious thing anyone proposed. Poor judgement almost never looks like cutting corners.
        It looks like ambition pointed slightly off the goal, it sounds like "you know what would be cool?" and the
        model has made that ambition free.
      </p>

      <h2>The ask, the accept, and the look</h2>
      <p>
        So what is judgement actually made of? Watching engineers work with models, I keep seeing the gap open at the
        same three gates.
      </p>
      <p>
        <strong>The ask.</strong> A prompt is a summary of intent, and most people cannot summarize. The engineer who
        can compress a problem to its actual shape ("make a PR cleaner to review") gets a different artifact than the
        one who pastes in the ticket and hopes. I wrote a whole{" "}
        <a href="/notes/summaries-all-the-way-down">Field Note</a> about layered summaries; the prompt is the glance
        layer of a problem, and if you cannot write the glance, you do not understand the thing yet, and the model will
        faithfully build your confusion. People do not fail at prompting. They fail at knowing what they want.
      </p>
      <p>
        <strong>The accept.</strong> Generation is free now, which makes acceptance the only scarce act. Taste is the
        rejection function, and I think that is why it is so hard to pin down: taste is a classifier, not a generator.
        You cannot write down its rules for the same reason you cannot write down how you recognize a face; it is
        compressed experience, thousands of examples of good and bad work distilled into a reflex that fires before the
        reasoning arrives. You know it when you see it because seeing it is the only interface taste has.
      </p>
      <p>
        <strong>The look.</strong> The model is confident the way a brochure is confident, and the third gate is whether
        you check it against reality or against vibes. The engineers who get good results are the ones who hold ground
        truth: they ran the query themselves, they read the failing log, they pulled the actual PR. The ones who get
        burned are outsourcing their epistemology to the most persuasive component in the stack.
      </p>
      <Callout variant="note" title="Field recordings">
        Things I have actually typed at an agent, preserved in my session logs: "you are wrong, I know it's in that
        database, I looked in Compass." "you're the one that wrote all of this code." "CHECK THE LOGS FIRST MORON." Look
        at what each of them is: a human holding ground truth against confident fiction. That is the gate doing its job.
      </Callout>

      <h2>Can you install it?</h2>
      <p>
        The question I keep asking myself is whether this is nurture or nature: what would it actually take to move a
        senior from poor judgement to good judgement, never mind helping them reach staff? I do not think taste can be
        taught as rules. I think it can only be grown, and only under specific conditions, all three of which were
        present in the progress-bar story and absent in the dependency-graph story.
      </p>
      <p>
        First, contact with consequences. I found the three-minute hang because I pulled a real PR; the graph's builder
        never felt it, because the graph was a feature for the demo in their head. Use the thing you build, every day,
        and taste accumulates on its own; build at arm's length and it never starts. It is also why I make a habit of
        building the things I ask other people to build; not to check up on anyone, but because building it is how you
        find out where the hard parts live. I cannot know what to look for in someone else's version until I have had to
        look for it in mine. Second, named misses. The dependency graph became a lesson the moment we talked it through
        and shelved it; unexamined, it would have just been a feature that shipped. Every miss that gets named is a rep.
        Third, and this is the one nobody does: write the taste down. For the platform I steward at work, I keep a
        philosophy document; not a spec, a set of beliefs that every design decision can be checked against, with lines
        like "if a feature requires explanation, it is not finished" and "dashboards are for reporting; the primary
        surface is a task queue". It is externalized taste. It has the shelving conversation with people when I am not
        in the room. I have{" "}
        <a
          href="https://gist.github.com/mpurdon/69a7ba21f2bd6f2a86f8775e1efd2a9d"
          target="_blank"
          rel="noopener noreferrer"
        >
          whitelabeled it
        </a>{" "}
        if you want the shape.
      </p>
      <p>
        What ties the three together: good judgement is having the shelving conversation with yourself, before someone
        has to have it with you. That is the whole skill. And it does grow; I have watched it grow. But it grows on the
        timescale of seasons, not sprints, which leaves every team lead with the same arithmetic: you can grow
        judgement, but you cannot grow it by next quarter. So you also have to hire for it, and how I am attempting to
        do that is the next article.
      </p>

      <h2>Not just us</h2>
      <p>
        None of this is specific to software. A lawyer with a drafting model, an analyst with a research agent, a
        marketer with a content pipeline; they all diverge at the same three gates, asking, accepting, and looking, and
        the ones who thrive are the ones who can say the simple sentence about what they are actually trying to do.
        Judgement is the universal interface to these tools. Software engineers just hit the wall first, because we
        adopted them first, and because our outputs fail loudly enough to measure.
      </p>
      <p>
        I am going on vacation in a few days. I know the house will not fall down while I am gone; the pipelines will
        run, the gates will hold, nobody is going to drop prod. What I catch myself worrying about is quieter: that
        decisions will get made, and some of them will be dumb, and I will not be there for the shelving conversations.
        And I have to sit with what that worry says about me, because if the judgement leaves the building when I do,
        then it lives in my head and not in the team or the tools, and this entire essay grades me, not them. My credo
        for the people I lead has always been that I am preparing them for their next job. The week I am gone is the
        audit. I will let you know what I find.
      </p>

      <SoapboxFold title="No, everyone did not just become senior" signoff="the gap is the product now">
        <p>
          Every vendor deck this year has the same slide: AI makes your whole team operate like seniors. WRONG! I have
          watched the same model make one engineer faster and another one dangerous, in the same week, on the same
          codebase. The demos are sick and the slide is still wrong ... what the model actually did was decouple output
          from understanding, and output was the only thing your process was measuring.
        </p>
        <p>
          I mean... the slide isn't even harmless. Believe it and you'll staff like it's true, measure like it's true,
          and your review process quietly turns into a rubber stamp for confident output ... right up until the incident
          where nobody in the room can explain the code that's on fire. One question keeps a team honest, and it costs
          nothing to ask: who actually understands this change? To be clear, I'm not against the tools; I built half my
          Lab with them and I'm not going back. I'm against the slide. The price of looking competent dropped to zero
          and the price of being right didn't move. Mind the gap.
        </p>
      </SoapboxFold>
    </Prose>
  );
}

function DocsForModelBody() {
  return (
    <Prose dropcap style={{ maxWidth: "100%" }}>
      <Callout variant="takeaway" title="The glance">
        The model is your most literal reader, and it does not read your documentation so much as navigate it. So write
        for how it actually moves: an index of what exists, stubs that describe a thing without loading it, skills that
        encode how you work, and cached constants it can stop re-deriving. You get three payoffs at once (faster,
        cheaper, and fewer hallucinations), and the map you built for the machine turns out to be the onboarding your
        people never got.
      </Callout>

      <p>
        Watch an agent work against a database nobody has told it about and it does the same thing every session: SHOW
        TABLES, then DESCRIBE this and DESCRIBE that, feeling its way across the schema one metadata query at a time,
        like someone crossing a dark house with their hands out. It is a house they have walked before and do not
        remember, and one that may have been quietly renovated since their last visit (a table added, a column renamed),
        with no note left on the counter to say so. It is not lost, exactly; it just wakes up every session having
        forgotten it was ever here.
      </p>
      <p>
        The first time this genuinely bothered me, I was wiring up an MCP server against an internal database, and I
        typed something at the agent that turned out to be the whole idea: could we cache the list-tables and describe
        results and keep the structure written down on disk, so the model could make its decisions before we ran a
        single live query. I did not invent that thought; I just happened to have it. The same idea was loose in the
        world at the same moment. Andrej Karpathy published a version of it and supplied the name that stuck, the{" "}
        <a
          href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
          target="_blank"
          rel="noopener noreferrer"
        >
          LLM wiki
        </a>{" "}
        (a knowledge base the model compiles once and keeps current instead of re-deriving on every query), and within
        weeks dozens of people had built their own.
      </p>
      <p>
        An idea, once enough minds accept that it is even possible, becomes a building block left lying around for
        whoever is standing close enough to pick it up; what we call genius is often just proximity to the right
        unfinished thought.
      </p>

      <Callout variant="note" title="The wheel of time">
        Public-key cryptography, the math behind every secure login and payment online, was invented twice. Once in the
        open, in the mid-1970s, by the Stanford and MIT academics whose names ended up on the algorithms
        (Diffie-Hellman, RSA); and once in secret, years earlier, by James Ellis, Clifford Cocks, and Malcolm Williamson
        at Britain's GCHQ, who had worked it out and were not allowed to tell a living soul until 1997. The same locks,
        cut by two sets of hands that never met.
      </Callout>

      <p>
        And these models came with no manual. Nobody shipped a guide to working with them, so everything we know we have
        had to find by experiment, out loud, and hand to each other; the whole field is people poking at a black box and
        posting what fell out. There is a quiet joke in that, given where this is going: we spend our days writing the
        manual the machine reads, and we never got one for the machine. The model's reading problem and the warehouse's
        cost problem turned out to be the same problem, and the answer to both is a map.
      </p>

      <h2>The model navigates; it does not skim</h2>
      <Soapbox variant="aside" label="Hot take" signoff="plausible gets the ones that aren't judging">
        <p>
          A model with no map does not fail loudly. It free-associates a table name that sounds right, writes a
          confident query against a column that was never there, and hands you a number with no warning label. The
          hallucination that hurts you is never the obvious one; it is the plausible one.
        </p>
      </Soapbox>
      <p>
        A person reads documentation the way they read a map of a city they half-know already: skim it, jump to the
        unfamiliar part, fill the rest from memory and a quick question to whoever sits nearby. The model has none of
        that. It reads top to bottom, literally, every word, every session, from a cold start, and there is nobody
        nearby to ask. So the first line of this project's instructions is not a friendly welcome; it is an order:
        always read the memory files below before you start anything. Underneath it sits an index (a few databases, a
        couple of hundred tables, counts, and links down into the detail), and the model reads that map and knows where
        it stands before it touches anything live.
      </p>
      <p>
        The shape underneath is deliberately dull. One index at the top; one folder per database; inside each, the
        tables sorted by kind (the dimension tables that hold entities, the big event tables, the pre-aggregated
        rollups), every table a single row with its size and a link down to its full column list. Nothing loads until it
        is needed. The model reads a hundred lines to understand a warehouse it would otherwise have interrogated with a
        hundred queries.
      </p>

      <h2>A map, not a tour</h2>
      <p>
        The temptation, when documenting a system for a model, is to give it the tour: dump every table and every column
        into one enormous file and let the context window sort it out. That is not a map; it is the territory,
        photocopied. The entire value of a map is that it is smaller than the place it describes. So the index carries
        only enough to choose with: a name, a type, a row count, one line of what lives in the table, and a pointer to
        the rest. The model reads the index, forms a plan, and opens precisely the two files the plan calls for. I built
        the same thing once as <a href="/lab/mcp-servers">a single MCP tool</a> that returns a whole schema as one
        document instead of twenty describe-table round-trips; this is that idea, grown to a warehouse.
      </p>
      <p>
        A colleague, Olek, had made the same move on a different project, for the agent that drove a design system:
        summarize what is available, build an index of it with pointers and examples, then aim the work at the index
        instead of the raw thing. His reason for it has stuck with me. It is faster, and you get fewer hallucinations,
        because you have handed the model a guided path instead of a dark house. A model that is guessing is a model
        that is free-associating, and a map is the whole difference between remembering and inventing.
      </p>

      <h2>The cheapest query is the one you didn't make</h2>
      <p>
        None of this is abstract thrift; the rediscovery has a bill. One month of an agent working that warehouse ran
        about twenty-six hundred queries: cheap per query and quick (a third of a second on average, seventy-odd dollars
        all in), but a real fraction of that was the model re-asking what it had already been told, in a fresh session
        that remembered nothing. The skill that wraps the index says the quiet part in its own instructions: read the
        local index first, because it is faster than a live query and spares the compute.
      </p>
      <p>
        Reference data gets the same treatment one level down. The constants a warehouse leans on (status codes, call
        dispositions, the dozen lookup values every query joins against) do not change between Tuesday and Wednesday,
        but a mapless agent re-derives them on every run. So they are written into memory once and read from there, and
        the model stops asking the warehouse to remind it what it already established last week. For a decade compute
        was free enough to ignore one call at a time; an agent that pays by the token and the warehouse-second puts the
        meter back in your eyeline, and not making it look up what it can read off disk stops being hygiene and becomes
        the budget.
      </p>
      <PullQuote cite="Matthew Purdon">The cheapest, fastest query is the one you never had to make.</PullQuote>

      <h2>Skills ate the coding-standards document</h2>
      <p>
        A map tells the model where the tables are; it does not tell it that the big event tables will hurt you if you
        forget a date filter, or which key joins across databases, or that we do not SELECT-star in anger. That
        knowledge used to live in a coding-standards document: the one linked in onboarding, skimmed once, and never
        opened again while the real standards lived in code review and in a few senior heads. Now it lives in a skill,
        and the difference is everything, because a skill is executed rather than referenced. The model loads it and
        does the thing; there is no step where a human was supposed to remember.
      </p>
      <p>I review a lot of the skills my team writes, and I keep distilling the same handful of rules out of them.</p>
      <Callout variant="note" title="Rules of thumb for a skill">
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.75rem 0.85rem", marginTop: "0.35rem" }}>
          <span
            style={{
              color: "var(--callout-note-accent)",
              fontFamily: "var(--font-mono)",
              fontWeight: "bold",
              fontSize: "0.95em",
            }}
          >
            01
          </span>
          <div>
            <strong>Order the steps sequentially:</strong> The model reads top to bottom, so lay out the steps in the
            order the work happens (before you start, while you build, after you are done).
          </div>

          <span
            style={{
              color: "var(--callout-note-accent)",
              fontFamily: "var(--font-mono)",
              fontWeight: "bold",
              fontSize: "0.95em",
            }}
          >
            02
          </span>
          <div>
            <strong>Design precise, varied triggers:</strong> People ask in half-sentences and with worse spelling.
          </div>

          <span
            style={{
              color: "var(--callout-note-accent)",
              fontFamily: "var(--font-mono)",
              fontWeight: "bold",
              fontSize: "0.95em",
            }}
          >
            03
          </span>
          <div>
            <strong>Include self-verification:</strong> Always give the skill a way to verify its own work.
          </div>

          <span
            style={{
              color: "var(--callout-note-accent)",
              fontFamily: "var(--font-mono)",
              fontWeight: "bold",
              fontSize: "0.95em",
            }}
          >
            04
          </span>
          <div>
            <strong>Write "must" or delete it:</strong> A soft rule is wasted space that the model will skip.
          </div>

          <span
            style={{
              color: "var(--callout-note-accent)",
              fontFamily: "var(--font-mono)",
              fontWeight: "bold",
              fontSize: "0.95em",
            }}
          >
            05
          </span>
          <div>
            <strong>Keep it under 500 words:</strong> If it climbs past 1500 words, break it into sub-agents.
          </div>
        </div>
      </Callout>
      <p>
        This is the same move as the philosophy document from{" "}
        <a href="/notes/judgement-is-the-job-now">the last note</a>: taste you cannot teach in the room, written down
        where the model (and the new hire) can follow it. We have gone a step further and built a skill whose only job
        is to write other skills to this standard. The coding-standards document did not die. It grew hands and started
        doing the work itself.
      </p>

      <Soapbox label="Hot take" title="There is no prompt priesthood" signoff="the hours, not the credential">
        <p>
          Every few weeks someone with a decade in traditional ML explains to a room that prompting is really a craft
          you need their kind of background to get. I will be generous, because the internals knowledge is real:
          understanding how quantization degrades reasoning in a 4-bit GGUF, how a LoRA or QLoRA adapter steers
          attention without bloating the base model, or how attention heads route tokens through key-value caches. That
          stuff is hard, and it matters. But knowing how a model is built is not the same as knowing how to work with
          one, the way knowing how to tune a piano is not the same as being able to play it. The wiring is not the
          music.
        </p>
        <p>
          I mean ... here's the uncomfortable version. The person who knows the most about getting real work out of one
          of these things is usually whoever has asked it the most questions, on the hardest problems, and watched the
          most answers fall over. Not the researcher running single turns through an eval harness; the engineer halfway
          through a fifty-file change who has negotiated with the thing all day, every day, for a year. That knowledge
          is empirical, it is earned in the loop, and it keeps getting condescended to because it does not arrive with a
          credential. There is no priesthood here. There are hours in the seat, and whoever has put in the most of them
          knows the most, you know?
        </p>
      </Soapbox>

      <h2>Document once, and it becomes the standard</h2>
      <p>
        The instinct is to treat all this mapping as overhead, the thing you do at the end if there is time, which means
        never. That is backwards. On a new project you do it first: build the index, write the skill, set the
        conventions, get one thing genuinely right. Because the first thing you build well becomes the template the
        model copies. On a greenfield project the map is not a record of how the work was done; it is the first draft of
        how the work will be done, and once you have refined it by hand, with taste, every session afterward inherits it
        for free.
      </p>
      <p>
        Here is the part that stays with me. I built every piece of this for the machine (the index, the stubs, the
        cached constants, the skill) because the machine was the one paying the toll for not having them. But the thing
        I ended up holding was the document I should have handed every person who ever opened that warehouse, saw two
        hundred tables, and had no idea where to start. The map a model needs and the map a newcomer needs are the same
        map. We just never got around to writing it down, because people muddle through and machines will not, and for
        years muddling through was cheap enough to hide what we had failed to write.
      </p>

      <SoapboxFold title="The standards doc was always fiction" signoff="skills don't rot, they run">
        <p>
          Be honest about the coding-standards document, the real one at your last job. Did anyone read it? You linked
          it in the onboarding wiki, somebody skimmed it on day two, and then it sat there rotting while the actual
          standards lived in pull-request comments and in three people's heads. We called it the source of truth because
          the alternative, admitting the standards were folklore passed down by whoever reviewed your first PR, was a
          little embarrassing. The doc was a monument to a thing we wished we did. And I am not pointing from higher
          ground here: I write hundreds of these, link someone to one mid-sentence with total confidence, and only while
          pasting the URL do I clock that the thing is three years old and I am probably the last soul who opened it.
        </p>
        <p>
          I mean ... the machine is what finally called the bluff. A skill can't be aspirational; it fires and changes
          the output or it doesn't, and you find out in a single session. Turns out the test of whether you actually had
          standards was never "is it written down somewhere," it was "does anything happen when someone ignores it," and
          for years the honest answer was nothing, nothing at all. Now the model reads the skill and does the thing, and
          the standard is real for the first time in its life, you know? It's a bit humbling that it took a reader made
          of math to get us to write the docs our own people always deserved. I'll take it though.
        </p>
      </SoapboxFold>
    </Prose>
  );
}

function TimelineItem({ time, title, isLast, children }) {
  return (
    <div style={{ display: "flex", gap: "1.5rem", position: "relative" }}>
      {/* Left side: Time indicator */}
      <div
        style={{
          width: "4.5rem",
          flexShrink: 0,
          textAlign: "right",
          fontFamily: "var(--font-mono)",
          fontSize: "0.9rem",
          color: "var(--canada-300)",
          fontWeight: 700,
          paddingBlockStart: "0.15rem",
        }}
      >
        {time}
      </div>

      {/* Middle: Bullet and Line */}
      <div
        style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, position: "relative" }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "var(--canada-bg)",
            border: "2.5px solid var(--canada-300)",
            zIndex: 1,
            boxShadow: "0 0 0 4px var(--bg-primary, var(--bg-body, #121214))",
          }}
        />
        {!isLast && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              bottom: "-2.5rem",
              width: "2px",
              background: "rgba(244, 131, 122, 0.22)",
            }}
          />
        )}
      </div>

      {/* Right side: Content */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : "2.5rem" }}>
        <h3
          style={{
            margin: "0 0 0.5rem",
            fontSize: "1.15rem",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h3>
        <div style={{ fontSize: "1.025rem", lineHeight: "1.55", color: "var(--text-secondary)" }}>{children}</div>
      </div>
    </div>
  );
}

function Timeline({ items }) {
  return (
    <div style={{ margin: "2.5rem 0", paddingInlineStart: "0.5rem" }}>
      {items.map((item, i) => (
        <TimelineItem key={i} time={item.time} title={item.title} isLast={i === items.length - 1}>
          {item.content}
        </TimelineItem>
      ))}
    </div>
  );
}

function PrincipalBody() {
  return (
    <Prose dropcap style={{ maxWidth: "100%" }}>
      <Callout variant="takeaway" title="The glance">
        The Staff Software Engineer scales by specializing deeply into one of four archetypes (the Tech Lead, the
        Architect, the Solver, or the Right Hand). The Principal Engineer scales by mastering the transition between all
        four. To drive a horizontal paradigm shift (like our transition to autonomous agentic platforms) you cannot
        operate from a single gear. You must play the Right Hand to align with executive goals, the Architect to draw
        the boundaries, the Tech Lead to run hypothesis-driven tiger teams, and the Solver to plunge into the data
        layer and fix model failures at the source.
      </Callout>

      <p>
        In his defining work on the subject, Will Larson mapped out four distinct archetypes for Staff-plus engineers: the
        Tech Lead, the Architect, the Solver, and the Right Hand. It is the gold standard for understanding how individual
        contributors scale their impact. If you are aiming for Staff, the advice is simple: identify the archetype that matches
        your strengths and the organization's needs, and specialize deeply.
      </p>

      <Soapbox variant="aside" label="Hot take" signoff="specialization is a local maximum">
        <p>
          Specializing in a single archetype is a trap. If you remain just the Architect, your systems are beautiful
          drawing-board fictions that teams bypass. If you remain just the Right Hand, you lose your technical edge and
          become a corporate proxy.
        </p>
      </Soapbox>

      <p>
        But when you cross the boundary from Staff to Principal, that specialization becomes a local maximum. A Principal
        Software Engineer is not just a "more senior" Staff engineer; they are the dynamic synthesis of all four archetypes.
        To take a massive, cross-cutting horizontal mandate and push it successfully through an organization, you cannot
        operate in a single lane. You have to shift gears fluidly, running all four archetypes on the same initiative depending
        on where the platform needs your weight.
      </p>

      <h2>Case Study: The Autonomous Agent Platform</h2>
      <p>
        To see how this four-gear model works in the dirt, let's look at a specific case study: our recent initiative to
        build a horizontal autonomous agent platform. How we navigated this shift is illustrative of how a Principal
        must operate. (The deep architectural details—and why ninety-five percent of enterprise agentic workflows fail in
        production—are the subject of my next note; the execution pattern is what matters here).
      </p>
      <p>
        Most organizations try to lead these paradigm shifts from a single gear. They have an Architect draw abstract
        multi-agent diagrams that never run; or they have a Right Hand negotiate API licenses with OpenAI while the
        engineering teams have no platform boundaries. To build a production-grade autonomous agent platform, you have
        to run all four gears. You have to hold executive goals in one hand and low-level model telemetry in the other,
        and build the processes that connect them.
      </p>
      <p>
        Our results look different. In the last eight months, the team has delivered fifty-plus agentic solutions. Every
        single one of them is successful, currently saving the business millions of dollars while costing less than a
        thousand dollars a month on our AWS bill in total. Underpinning this is a personal leadership philosophy I have
        carried for years: <em>we have succeeded, I have failed</em>. I celebrate the team's wins, and I take absolute,
        personal ownership where we missed the mark or failed entirely. That is what happens when you run the engine
        across all four gears: the platform's boundaries are protected, the models are constrained, the telemetry is
        rigorous, and the ROI is undeniable.
      </p>

      <h2>Gear 1: The Right Hand (The Mandate)</h2>
      <p>
        Every horizontal platform initiative starts with alignment. For our autonomous agent platform, this meant direct,
        candid conversations with our CTO. We did not talk about models or token lengths; we talked about her strategic goals
        for the year, the platform's long-term ROI, and cutting operational waste.
      </p>
      <p>
        When an executive knows you understand the business context as deeply as they do, and that you have the technical
        stewardship to protect the platform's stability, they let you off the chain. But this is not blind autonomy. It is
        the trust that you will drive the initiative relentlessly forward while keeping their strategic objectives perfectly
        in view. You are borrowing their organizational authority to clear the path for the platform.
      </p>

      <h2>Gear 2: The Architect (The Map)</h2>
      <p>
        Once you have the executive mandate, you must draw the map. This is the Architect gear. But the trap here is
        spending months waiting for the "perfect" architecture to emerge. There is no such thing. You need to get to a
        place where you know what the strategic goals are, understand roughly how to get there, and then go. We are not
        looking for a set of rigid GPS waypoints that bind the team to the same pre-packaged, failed paths as everyone
        else. We are looking for a hand-drawn map to grandma's house (one that defines the critical boundaries but allows
        for discovery and correction along the way).
      </p>
      <p>
        For us, drawing that hand-drawn map and being on the absolute edge of what autonomous workflows can be meant working
        directly with AWS to get early access to the <strong>AgentCore runtime</strong>. It meant utilizing the <strong>Strands
        SDK</strong> to construct a highly decoupled, graph-based multi-agent architecture.
      </p>
      <p>
        The Architect's job is simply to define the hard, load-bearing boundaries: the shared <code>invocation_state</code> schemas,
        the async GraphBuilder factory patterns, the validation gates, and the telemetry structures. You are not just building
        an agent; you are building a horizontal platform that multiple product teams can eventually build on top of. You are
        architecting the loose guardrails to ensure the team avoids the production failure traps that sink other enterprise teams,
        without locking them into a sterile execution cage.
      </p>

      <h2>Gear 3: The Tech Lead (The Vanguard)</h2>
      <p>
        A beautiful architectural spec is worthless if the engineering teams cannot execute it. But you cannot hand a massive,
        highly complex AI paradigm shift to an entire department at once; it results in chaos, fragmented standards, and
        workslop. This is where you shift into the Tech Lead gear.
      </p>
      <p>
        We formed compact, two-person "tiger teams" structured for rapid, high-fidelity mentorship: one engineer who had
        already successfully completed a project, and another learning the ropes of how we build. In this way, we grew the
        knowledge and capabilities of the team in a real, meaningful way. I kicked off the loop by seeding the first four
        teams myself, performing the role of the "experienced engineer" on each of them so I could directly convey what my
        tastes, standards, and judgements were for this new way of building. Once those first four candidates successfully
        shipped, they became the mentors for the next wave, multiplying our standards organically across the department.
      </p>
      <p>
        To support them, we invented a completely new SDLC specifically designed for AI-native engineering:
        <strong>hypothesis-driven development</strong>. Traditional agile sprints fail when the machine is writing the code and
        the parameters are non-deterministic. We established a process centered on a strict "We Believe" statement:
      </p>

      <div style={{ borderLeft: "3px solid var(--callout-note-accent)", paddingInlineStart: "1.25rem", margin: "1.5rem 0", fontFamily: "var(--font-mono)", fontSize: "0.95rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
        We believe that <strong>[user segment]</strong><br />
        has a need to <strong>[user need/problem]</strong>.<br />
        By delivering <strong>[proposed solution / feature]</strong>,<br />
        we expect to achieve <strong>[measurable outcome]</strong><br />
        within <strong>[time period of delivery]</strong>.
      </div>

      <p>
        This simple, rigorous template forces the team to drive to a single, hyper-specific goal instead of aiming for some
        vague, corporate "be more good" statement. We formulate the architectural hypothesis first, verify it with automated
        model testing, and iterate in tight, high-signal loops.
      </p>

      <PullQuote cite="Matthew Purdon">
        A principal engineer does not just design the architecture. They design the human processes and execution patterns that make the architecture buildable.
      </PullQuote>

      <h2>Gear 4: The Solver (The Fire)</h2>
      <p>
        No matter how clean your spec is, the vanguard teams will eventually hit a low-level, high-stakes wall. A model will
        begin hallucinating on database metadata, or the context window will bloat, or the async event loop will lock up. In those
        moments, you do not write a Jira ticket or schedule another meeting. You shift into the Solver gear. You drop into the
        deepest hole and solve the unsolvable.
      </p>
      <p>
        We recently hit a complex failure where the LLM was drawing incorrect, hallucinated conclusions from the source data.
        It was adding added weight to a random inference (a guess) it was making based on a few variables in the payload.
        The inexperienced engineer's immediate instinct was to "prompt-engineer" our way out of it — writing very earnest,
        all-caps warnings like "NEVER" and "IGNORE" in the system prompt.
      </p>
      <p>
        My response was fundamentally different: you refuse to prompt-engineer out of a data-layer problem. After talking it
        through, I decided we should just pre-process the data and strip those variables from the LLM's input entirely, stashing
        them in a temporary list on our state. Once the processing agent was done, we simply appended those variables back to the
        return structure in the final reporting agent.
      </p>
      <p>
        Not only did we solve the problem perfectly, we passed fewer tokens, ran faster, and, most importantly, we shared the story
        with the rest of the department so it could become part of our shared engineering knowledge. We fixed it at the data layer,
        proved the fix with async tests, and codified that hard boundary back into the platform's core architecture.
      </p>

      <h2>Stewardship of the platform</h2>
      <p>
        When you run all four gears on a single horizontal initiative, you realize something fundamental: the true role
        of a Principal Engineer is stewardship. It is the responsibility to bridge C-suite business objectives with
        low-level technical realities: translating long-term strategy into the concrete human processes (like
        hypothesis-driven tiger teams) that scale those architectural beliefs organically. You are not just guiding
        code; you are guiding the vision and belief of everyone building for the organization.
      </p>
      <p>
        We successfully launched our autonomous agent platform using this exact four-gear cycle. How we actually built those
        agentic workflows (the specific Strands SDK graph topologies, the AgentCore telemetry patterns, and the exact reasons
        why ninety-five percent of multi-agent architectures fall over in production) is the subject of my next note.
      </p>

      <SoapboxFold title="Staff is not Senior++" signoff="protect the title, protect the team">
        <p>
          I am so tired of watching engineering organizations treat the Staff Software Engineer title like a seniority gold
          star. It is not just another rung on the ladder. It is not some tenured reward for surviving five years as a Senior
          without setting the codebase on fire.
        </p>
        <p>
          But companies do it anyway out of pure promotion creep. They promote a Senior who is an absolute typing machine —
          someone who can spit out three hundred lines of flawless syntax a day — but who has zero organizational taste,
          no strategic vision, and has never had a single oblique conversation with an executive in their life. You are
          giving a leadership mandate to someone whose only skill is driving a keyboard.
        </p>
        <p>
          I mean ... it is a completely different job. Promoting an unqualified Senior to Staff is a nuclear-level mistake. It
          does not just waste a title; it clogs up your technical leadership channels with people who cannot guide a platform. It
          dilutes your architectural standards, creates immense friction, and can break a high-performing engineering culture
          from the inside out. Stop treating your career ladder like a tenure program. Protect the title, or watch all of the
          hard work you put into building an amazing platform and culture erode and rot.
        </p>
      </SoapboxFold>
    </Prose>
  );
}

function InterviewingBody() {
  return (
    <Prose dropcap style={{ maxWidth: "100%" }}>
      <Callout variant="takeaway" title="The glance">
        Whiteboard syntax and memorized algorithms are screens for typing speed, not engineering capability. When AI can
        generate code instantly, the critical skill is no longer production, but curation. Shift your interview to a
        <strong> live AI-assisted challenge</strong>: hand the candidate a real-world task seeded with quiet logic
        traps, and calibrate for <strong>judgement</strong> (the ability to translate the true requirements into a
        rigorous spec), <strong>verification</strong> (can they quickly find where the LLM went off the rails or even
        better, is about to), and finally <strong>taste</strong> (is the thing that got built actually good in the sense
        that it's simple, easy to reason about, follows the standards from the rest of the codebase). You will find the
        engineers whose judgement you would actually trust to run full speed and not take production down at 3 in the
        morning.
      </Callout>

      <p>
        For a long time, the coding interview measured one thing reasonably well: can you, alone, in a quiet room, turn
        a problem into working code under time pressure. It was never a great proxy for the job; software development
        has always been a team sport of building, integration, and maintaining. But it was something. That proxy is now
        dead. The frontier model in the candidate's editor would ace the take-home.
      </p>

      <Soapbox variant="aside" label="Hot take" signoff="and I mean it">
        <p>
          If your interview can be passed by pasting the prompt into an assistant, you are not screening for engineers.
          You are screening for people who own a keyboard.
        </p>
      </Soapbox>

      <p>
        I have no interest in making people work in a sterile sandbox, or spending hours on unpaid take-home homework.
        Instead, we run a live, forty-five-minute coding exercise. We hand them a small, real-world task: fetch data
        from a public API, transform it, and display it in a clean format. Do the actual job we want you to do. And we
        explicitly tell them to use AI assistance (Copilot, Cursor, Claude, or whatever feels best).
      </p>

      <p>
        But there is a catch: that forty-five minutes has to cover both the building <em>and</em> the judging. How long
        the candidate spends coaxing the model to generate the solution eats directly into their review time. The brutal
        reality of the round is that most candidates never even reach the review; they spend so long navigating the spec
        and fighting with the model's first drafts that the clock runs out before they can verify a single line of
        output. The standouts are the ones who steer the model efficiently, get to a stable draft in fifteen minutes,
        and leave the remaining half-hour to audit the model's silent assumptions and write tests.
      </p>

      <h2>How they build is how they think</h2>
      <p>
        Watching someone review the code after the LLM has built something is how you know whether they actually know
        code, and whether they can spot a failure from the model. It is a pure window into their decision-making. Do
        they notice the test that asserts nothing? Do they trust the confident, model-generated comment or check the
        actual API payload? The candidates I want are the ones who can look at what the model produced and find where
        its logic falls over.
      </p>

      <p>
        But the most important signal in the entire forty-five minutes is at the very start:{" "}
        <strong>how they translate the challenge description into a specification.</strong> A mediocre candidate copies
        the raw, messy requirements and pastes them into the prompt window. The standout candidate stops. They reframe,
        clarify, and translate the product description into a rigorous engineering spec before they ever touch the
        model. They constrain the AI first, because they know that the quality of the spec determines the fidelity of
        the generation.
      </p>

      <Callout variant="note">
        The skill I am hiring for is no longer "can you produce a solution." It is "can you tell, quickly, which of
        several plausible solutions is the right one — and prove it."
      </Callout>

      <p>
        Conversely, if they spend too much time on the spec, it is a waste of time. We are not writing a treaty; we are
        coding on a forty-five-minute clock. The candidate needs a sharp sense of "good enough" — the threshold where
        planning ends and execution starts — and then fall back on the old IRC advice: <em>TIAS</em> (try it and see).
        Build the spec, get the first draft on disk, and run it. You cannot verify a model's assumptions from the chat
        history; you have to look at the logs of the live environment.
      </p>

      <p>
        During interview seasons, I sit in these rounds with my local meeting recorder running in developer mode (I
        built <a href="/lab/grey-eminence">Grey Eminence</a> specifically to keep these transcripts on my own disk).
        Reading the transcripts later is a masterclass in calibration. The candidates who "talk the talk" with perfect
        jargon often fail so friggin hard when they meet the real code, because they are just running their own
        pattern-matching retrieval loops. But the candidates who can actually ship are different; they are the ones who
        look at what the model typed and instantly spot the load-bearing flaw.
      </p>

      <p>I script the entire panel as a ninety-minute, high-signal loop so every interviewer runs it the same way:</p>

      <Timeline
        items={[
          {
            time: "15 min",
            title: "01. The oblique warmup",
            content: (
              <>
                <p style={{ margin: 0 }}>
                  Resumes are fiction, so I never read them before the round. Instead, we spend fifteen minutes talking
                  about recent work, things they built that were genuinely fun, or what they want to learn next. I ask
                  questions based on their answers and I come at them obliquely.
                </p>
                <p style={{ margin: "0.5rem 0 0" }}>
                  For example, rather than asking how much experience they have with Python, I ask:{" "}
                  <em>"What do you hate about Python?"</em> If they do not have anything they dislike about their
                  primary tool, they have not been using it long enough. A senior who has spent years in a language
                  carries scar tissue; they should be able to rattle off personal pain points in seconds.
                </p>
              </>
            ),
          },
          {
            time: "45 min",
            title: "02. The live challenge & review",
            content: (
              <>
                <p style={{ margin: 0 }}>
                  This is the API-fetch-and-transform core. How fast the candidate gets the AI to generate the first
                  draft determines how much time is left for the review. If they spend forty minutes fighting the spec,
                  they have five minutes to judge the code. Managing the model is part of the test.
                </p>
                <p style={{ margin: "0.5rem 0 0" }}>
                  A mediocre candidate dumps the spec into the chat box, hits enter, and prays the first output runs.
                  The standouts operate differently: they treat the model like an assistant, not a magic box. They take
                  the challenge, feed it to the model, and ask it to summarize and probe the spec for understanding
                  first. Only when they are comfortable that they and the model agree on a plan do they execute.
                </p>
                <p style={{ margin: "0.5rem 0 0" }}>
                  And they do not look away while it is typing. They watch the scrolly bits. If their gut gets triggered
                  by something in the stream, they halt generation instantly to ask what it is doing, or remember the
                  line for when the model stops typing. Once they have a draft, they have the model generate tests to
                  verify the build, run a refactoring task to simplify the code, and only then do they roll up their
                  sleeves to inspect the code.
                </p>
                <p style={{ margin: "0.5rem 0 0" }}>
                  This is where we measure real taste: do they let the model ship a monolithic, eighty-line function
                  where all operations live together, or do they force it to separate fetching from transformation? Do
                  they audit how it handles API failures or missing payloads? And do they catch the absurd AI
                  hallucinations? (I have watched models bafflingly throw an infinite <code>for(;;)</code> loop into
                  TypeScript code processing a finite array of data, and watched careless candidates wave it through.)
                  The standout catches the infinite loop, rejects the monolith, and refuses to ship until the boundaries
                  are verified.
                </p>
              </>
            ),
          },
          {
            time: "25 min",
            title: "03. System design",
            content: (
              <>
                <p style={{ margin: 0 }}>
                  The system design is an entirely new thing that we expect them to draw out using some drawing tool.
                  The prompt is practical: design a system that takes user surveys and tries to match them up to
                  benefits.
                </p>
                <p style={{ margin: "0.5rem 0 0" }}>
                  It is incredibly interesting to see if they use the models to help them with this part. They are
                  completely free to use AI as a sparring partner (asking it to brainstorm components, validate DB
                  schemas, or outline the data flow). But it is exceedingly rare that they do. It makes me sad, honestly;
                  it shows how deeply candidates still compartmentalize the model as a mere syntax typewriter,
                  forgetting that its highest and best use is as a cognitive partner for architectural trade-offs.
                </p>
              </>
            ),
          },
          {
            time: "5 min",
            title: "04. The handoff",
            content: (
              <p style={{ margin: 0 }}>
                The final five minutes are for the candidates to ask us anything they want. It is a soft-looking
                segment, but it carries a massive signal. A candidate who says, "I don't really have any questions" is
                prolly not going to make the cut. Inquisitive engineers are the only ones who survive in a world where
                the machine answers the easy questions; if you cannot think of a single thing to ask a future peer about
                their platform, your curiosity is already retired.
              </p>
            ),
          },
        ]}
      />

      <PullQuote cite="Matthew Purdon">
        Generation is cheap now. The expensive thing (the thing they earn a salary for) is judgement about which
        generated thing to keep.
      </PullQuote>

      <h2>Seeding the spec with traps</h2>
      <p>
        A great interview challenge doesn't need to be massive. We keep the core task simple (fetch, transform, display)
        but we seed the requirements description with a few quiet, highly plausible logic traps. We want to see if the
        candidate's translated specification catches these before they prompt, and whether their code review catches
        where the model fails them:
      </p>

      <Callout variant="note" title="Seeding the requirements">
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.75rem 0.85rem", marginTop: "0.35rem" }}>
          <span
            style={{
              color: "var(--callout-note-accent)",
              fontFamily: "var(--font-mono)",
              fontWeight: "bold",
              fontSize: "0.95em",
            }}
          >
            01
          </span>
          <div>
            <strong>Seed dynamic windows:</strong> Requirements that demand deriving ranges from the input data rather
            than hard-coding values. This is the baseline; anyone paying attention finds it.
          </div>

          <span
            style={{
              color: "var(--callout-note-accent)",
              fontFamily: "var(--font-mono)",
              fontWeight: "bold",
              fontSize: "0.95em",
            }}
          >
            02
          </span>
          <div>
            <strong>Seed silent traps:</strong> Edge cases (like off-by-one errors, timezone mismatches, or unhandled
            empty states) that run fine but yield wrong data. This is where the signal lives.
          </div>

          <span
            style={{
              color: "var(--callout-note-accent)",
              fontFamily: "var(--font-mono)",
              fontWeight: "bold",
              fontSize: "0.95em",
            }}
          >
            03
          </span>
          <div>
            <strong>Seed false alarms:</strong> Something that looks like a bug but is actually a deliberate, documented
            workaround. We want to see if they verify before they react.
          </div>

          <span
            style={{
              color: "var(--callout-note-accent)",
              fontFamily: "var(--font-mono)",
              fontWeight: "bold",
              fontSize: "0.95em",
            }}
          >
            04
          </span>
          <div>
            <strong>Check the tests:</strong> A model will confidently generate tests that assert nothing (like an empty
            try-catch block wrapping an assertion, or <code>expect(true).toBe(true)</code>). We watch to see if they
            inspect the test assertions.
          </div>
        </div>
      </Callout>

      <p>
        The candidate's job isn't to nitpick the formatting or complain about the naming style. I want the ones who
        reframe the spec, find the load-bearing logic bug during review, and refuse to ship until it is verified.
        Nitpicking is cheap; triage is the job.
      </p>

      <h2>What I stopped weighting</h2>
      <p>
        I no longer care about speed of typing. I have never felt any value in LeetCode-like challenges; I have always
        valued real-world examples (fetch data from this API, process and display it). Do the job we actually want you
        to do. None of those abstract puzzle algorithms predict who is good on a team where most first drafts arrive
        from a model.
      </p>
      <p>
        What predicts it is simple: knowing when a thing is done, knowing when it is wrong, and being honest about which
        of the two you are looking at.
      </p>

      <Callout variant="tip" title="Make it concrete">
        Always run the exercise against a small, working local dev environment. If the candidate says "I think this
        would crash if the array is empty," do not just agree. Say: "Let's run it and see." Watch how they debug the
        live feedback.
      </Callout>

      <p>
        None of this is a clean science. I am still calibrating, still arguing with my own panel about what a "strong
        no" looks like. But the shape is clear enough to commit to: hire for taste and judgement, interview by handing
        people work to evaluate instead of work to produce, and stop pretending the keyboard is the bottleneck.
      </p>

      <p>
        It is exhausting, of course. Interviewing is heavy, non-linear work, and when you are staring at your third
        panel of the week while your own backlog is pile-up high, it is easy to treat it like overhead. That is a
        dangerous mistake. Hiring someone onto your team is the single most important thing you can do as an engineer.
        Much like jury duty, it can often feel like a waste of time, a chore that takes you away from your "real" work.
        But you cannot let fatigue win out. Safeguarding who joins your team is a necessary part of engineering culture
        and team cohesion, the same way participating in a jury is a key underpinning for a functioning society. You are
        guarding the joy of delivering surprises that make your users love the work you do. You are guarding the
        work/life balance of yourself and your teammates.
      </p>

      <SoapboxFold title="Stop asking for the steak knives" signoff="hire the judge, not the keyboard">
        <p>
          OMG, I am so tired of the whiteboard puzzle interview. We are hiring people to build systems, not to
          re-implement Dijkstra's algorithm from memory on a virtual wall while three people pretend to watch while
          checking their email. If a model can do that in two shakes of a lamb's tail, what are we even testing? We are
          testing if they spent two weeks memorizing Leetcode.
        </p>
        <p>
          I mean ... the typing is never the bottleneck. It never was! But we spent twenty years pretending it was
          because it was easy to count. Now the machine can type ten thousand lines of absolute crap a minute, and we're
          still screening for typing speed. It's friggin' embarrassing.
        </p>
        <p>
          If you keep testing people on how fast they can spit out syntax, you'll end up with a team that can generate
          code they can't explain, and review processes that turn into rubber stamps. Stop treating your interview loop
          like a Glengarry boiler room. Put the whiteboard down. Coffee is for coders, but the Cadillac is for curators.
          Stop asking for the steak knives. ABC: Always Be Curating.
        </p>
      </SoapboxFold>
    </Prose>
  );
}

function CultureBody() {
  return (
    <Prose dropcap style={{ maxWidth: "100%" }}>
      <Callout variant="takeaway" title="The glance">
        The popular take is that culture is what you tolerate, and a leader's job is to police the edges. I keep landing
        on the opposite, and from humility more than pride: the best teams I have watched ran on how little the leader
        had to do. You do not enforce a culture, you grow one, by making the good thing easy, feeding people autonomy,
        mastery, and purpose on a bed of trust, and tending the confidence it all rides on. The only catch is that it
        starts with who you hired.
      </Callout>

      <p>
        A post about culture goes around every few months, and it came past me again last week: culture is not what you
        say, it is what you tolerate; what you permit, you promote. It is sharp, quotable, and built to be screenshotted,
        and every time it lands in my feed I nod along for a sentence and then find myself arguing with the whole shape
        of it. Not because I have leadership solved. Closer to the opposite.
      </p>
      <p>
        It is not that the post is wrong; the observation under it is real. A top performer who gets a pass nobody else
        would get does erode something, the quiet belief that greatness on this team is even reachable. But my
        disagreement comes from a humbler place than the post does. That version of culture flatters the leader, casting
        you as the bouncer at the door, the one thing standing between the team and chaos; what I keep learning, mostly
        from carefully watching the teams that felt smooth and effortless in their delivery, is that it was less about
        what I did and more about what the individual contributors on the team did. The
        post is not wrong, then, just half the picture: all of its wisdom goes to what a leader should refuse to
        tolerate, and none to what a leader should grow. You cannot punish a team into being great. You can only punish
        it into being quiet.
      </p>

      <h2>Every rule is a confession</h2>
      <p>
        Here is something I believe and can only half-defend: whenever you have to write a rule, it is because you
        already failed. The rule is a patch stuck over the exact spot where the wrong thing was easier than the right
        thing. "Assume good intent." "There are no dumb questions." "Give credit where it is due." Every one of those is
        an admission that, left to the path of least resistance, people did the other thing, and rather than move the
        path you printed a sign and checked a box.
      </p>
      <Soapbox variant="aside" label="Hot take" signoff="the sign is not the fix">
        <p>
          Values on a wall are vanity. If your culture only survives because you are standing at the door personally
          refusing to tolerate things, you do not have a culture, buddy, you have a hall monitor with a lanyard ... and
          the second you leave the hallway it is gone. I mean... a real value is one you built into the terrain so
          thoroughly that violating it takes effort. Nobody screenshots that, because it is boring, and boring is exactly
          what "it just works" is supposed to feel like.
        </p>
      </Soapbox>
      <p>
        The good version of a rule is almost never a poster; it is a change to the terrain. You do not put "give credit"
        on the wall and hope; you make the person who did the work the one who stands up and presents it, so the credit
        has nowhere else to go. My own version of that is a credo I have led by for years: <em>we have succeeded, I have
        failed</em>. When the work lands, it was the team; when it goes sideways, and eventually it always does, that one
        is on me. It is not modesty; it is terrain. If credit reliably flows down and blame reliably stops at my desk,
        people will take the swings that real growth requires, because I have made the downside safe and left the upside
        theirs.
      </p>
      <p>
        That is the move. Make the correct thing the default, the easy thing, the thing that happens when someone is
        tired and just wants to go home, and you do not have to tolerate or not-tolerate anything, because the behaviour
        you wanted is simply what falls out of the path of least resistance. Enforcement is what is left over when you
        could not be bothered to fix the terrain.
      </p>

      <h2>AMP, and the trust it sits on</h2>
      <p>
        So if not enforcement, then what? The honest answer did not come from a management book. It came from a
        parenting book about toddlers, of all places (Joanna Faber and Julie King's{" "}
        <em>How to Talk So Little Kids Will Listen</em>), which is really one long argument for listening to a small
        person instead of managing them. The frame I took from it has never left me: autonomy, mastery, purpose. AMP.
        Autonomy is handing someone the task and genuinely trusting them to build something good; that trust is not a
        courtesy, it is where their confidence starts. Mastery is giving people the room to learn and grow: space to
        explore an idea, to float a proposal and not have it shot down out of hand. And purpose is the belief that the
        work actually matters, that a thing gets built because there is a hypothesis and a real bet on value behind it,
        not because someone needed to be kept busy. Feed those three and people do not need to be policed, because they
        are already pulling in the direction you wanted.
      </p>
      <p>
        But AMP does not run on good vibes and a values deck; hope is not a strategy. It runs on trust, and
        specifically in a room where people know they can say the
        thing: the half-formed idea, the disagreement, the quiet "I think this is actually wrong," without getting bitten
        for it. A genuinely free space. That is the soil; autonomy, mastery, and purpose are what you plant in it. Skip
        the soil and none of the rest takes, because a person who does not feel safe saying the true thing will just say
        the safe thing, and now you are back to a quiet team, which the enforcement crowd mistook for a healthy one.
      </p>
      <PullQuote cite="Matthew Purdon">
        A quiet team is not a healthy team. It is a frightened one that has learned to say the safe thing.
      </PullQuote>

      <h2>Confidence is a flappy bird</h2>
      <p>
        There is a variable underneath all of this that never makes it onto the values wall, and it is confidence. Not
        arrogance, and not a fixed trait you either have or you do not. Confidence is a level, and the level never holds
        still. It behaves, and I am only half joking, like Flappy Bird. Gravity is constant and it is always pulling down. Left
        alone, confidence sinks: the deploy that failed, the review that came back brutal, the feature nobody used, the
        imposter voice on an ordinary Tuesday. It falls, and it keeps falling, until something gives it a bump: a shipped
        thing that worked, a hard bug actually resolved, praise from someone whose opinion you value. Then it rises, clears the pipe,
        and gravity takes back over and it starts sinking toward the next one.
      </p>
      <p>
        Which means praise is not a nicety you hand out when you happen to remember. It is the stimulus. It is the tap
        that keeps the bird in the air long enough to clear the next gap, and a team full of people whose confidence is
        quietly on the floor is a team that has stopped taking the swings that grow anyone. The catch is that the bump
        has to be real and specific to land; everyone can feel the difference between "good job team" and "the way you
        went and killed the twenty-minute build the whole team had just learned to live with, no ticket, nobody asking;
        that is the part I never had to assign." One is noise. The other is fuel, because it tells the person
        exactly which thing they did was good, so they, and everyone watching, can do it on purpose next time.
        That is the same signal I said I hunt for when I{" "}
        <a href="/notes/interviewing-the-ai-assisted-engineer">interview</a>; the difference is that in the interview I
        am measuring it, and on the team I am trying to grow it.
      </p>

      <h2>Only works on the willing</h2>
      <p>
        Do this across a whole team (AMP, the trust under it, the confidence bumps landed at the right moments) and the
        culture drifts upward more or less on its own. It is slow. It moves on the timescale of seasons, not sprints, the
        same as <a href="/notes/judgement-is-the-job-now">judgement</a> does, and for the same reason: you are growing
        something, not installing it.
      </p>
      <p>
        But here is the catch, and it is the one place the tolerance post and I actually shake hands, just reaching from
        opposite ends. All of it (AMP, trust, the bumps) only works on people who wanted to grow in the first place. You
        cannot AMP someone who is phoning it in. Autonomy is wasted on them, mastery is not something they were chasing,
        and purpose bounces off. And they do not just fail to rise; they sap the room. Energy on a team is finite, and
        one person coasting on everyone else's effort is a slow leak that drags every bird in the flock down toward the
        pipe. That is the rot the original post was actually pointing at, and it was right that it spreads; it was just
        wrong that the answer is a bouncer.
      </p>
      <p>
        The answer is upstream of all of it. Every leadership philosophy, mine very much included, eventually comes down
        to one unglamorous decision: who you let in the door. Hire people who want to build something and be part of
        something, and AMP has something to work on. Hire people who want a paycheque and a quiet life, and no amount of
        culture-tending saves you; you will spend your leadership standing at the edge of the room refusing to tolerate
        things, which is to say you will have proven the post right by hiring in a way that made it true. So, fine: what
        you permit, you promote. But culture is not what you forbid; it is what you make easy. What you celebrate, you
        cultivate. And what you hire is what you get.
      </p>

      <SoapboxFold title="You are not the hero" signoff="let them shine">
        <p>
          Every couple of weeks LinkedIn coughs up another stern, screenshottable leadership post, and underneath every
          one of them is the same fantasy: that leadership is control. That somewhere there is a firm hand, a hard call,
          a moment you step in and save the day and everyone finally sees the hero was you the whole time. WRONG! I
          mean... you do have that power, it's just the power to destroy. You can absolutely sink a team from that
          chair, with guilt trips and moving goalposts and the steady background hum of threat, and none of it makes
          anyone better; it only makes them quiet and resentful. The beatings will continue until morale improves, except they've
          never caught on it's a joke.
        </p>
        <p>
          Nobody writes the other post because the other post does not make you look brilliant. Real leadership is trust
          and patience, handing people the real work and then stepping out of their way, catching someone doing something
          good and telling them exactly what it was, then doing all of that again, and again.
          None of that fits on a slide and none of it makes you look like the hero, so it never gets screenshotted, and
          the feed fills up with visionary decidinators instead. But the quiet way is the one that actually wins: slow, unglamorous,
          mostly invisible, and the whole job. You are not the one who saves the team, buddy. You are the one who gets
          out of their light.
        </p>
      </SoapboxFold>
    </Prose>
  );
}

function DefaultBody({ post }) {
  return (
    <Prose dropcap style={{ maxWidth: "100%" }}>
      <p>{post.dek}</p>
      <p>
        This one is still a draft — a field note more than a finished argument. I am publishing the sketch because the
        thinking is more useful in the open than perfect in a folder, and because half the point of writing here is to
        find out where I am wrong faster.
      </p>
      <Callout variant="note">
        A working theory, filed under <strong>{post.category}</strong>: the tools changed the work before anyone changed
        the words we use to describe the work. Most of the confusion lives in that gap.
      </Callout>
      <h2>Where this is going</h2>
      <p>
        I will flesh this out with the specifics — the team, the before-and-after, the part that surprised me — once the
        observation has had a few more weeks to either hold up or fall apart. If you want the finished version, it lands
        in the next monthly batch.
      </p>
      <PullQuote cite="Matthew Purdon">
        The honest version of a field note is dated, partial, and a little embarrassing in hindsight. That is what makes
        it worth keeping.
      </PullQuote>
      <Callout variant="takeaway">
        Notes beat essays for the half-formed stuff. Write the note, date it, and let future-you sort out whether it was
        right.
      </Callout>
    </Prose>
  );
}

// Hand-written essay bodies, keyed by slug. Everything else gets DefaultBody.
const BODIES = {
  "what-is-a-principal-engineer": PrincipalBody,
  "interviewing-the-ai-assisted-engineer": InterviewingBody,
  "summaries-all-the-way-down": SummariesBody,
  "judgement-is-the-job-now": JudgementBody,
  "build-the-model-a-map": DocsForModelBody,
  "punish-your-way-to-a-great-culture": CultureBody,
};

export default function Article({ post, t, openTopic, go }) {
  const Body = BODIES[post.slug];
  const meta = (p) => (
    <Byline author="Matthew Purdon" avatar="MP" date={p.dateLong || p.date} readingTime={p.time} tag={p.category} />
  );
  const back = post.category;
  const bodyRef = useRef(null);
  useDeepAnchors(bodyRef, [post.slug]);
  return (
    <main>
      <article>
        <header style={{ maxWidth: 820, margin: "0 auto", padding: "56px 32px 32px", textAlign: "center" }}>
          <a
            href={"/topic/" + encodeURIComponent(back)}
            onClick={(e) => {
              e.preventDefault();
              openTopic(back);
            }}
            style={{
              fontFamily: "var(--font-label)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-wider)",
              fontSize: "var(--text-xs)",
              fontWeight: 700,
              color: kicker(t),
              textDecoration: "none",
            }}
          >
            ← {back}
          </a>
          <h1
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "clamp(30px, 4.4vw, 50px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              margin: "18px 0 20px",
              color: "var(--text-primary)",
              textWrap: "balance",
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-prose)",
              fontSize: "var(--prose-lead)",
              lineHeight: 1.5,
              color: "var(--text-secondary)",
              maxWidth: 640,
              margin: "0 auto 28px",
              textWrap: "pretty",
            }}
          >
            {post.dek}
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>{meta(post)}</div>
        </header>

        <div style={{ maxWidth: 1080, margin: "0 auto 8px", padding: "0 32px" }}>
          <Cover
            id={"art-" + post.slug}
            t={t}
            category={post.category}
            accent={post.accent}
            height={60}
            labelSize="var(--prose-lead)"
            centerLabel
          />
        </div>

        <div ref={bodyRef} style={{ maxWidth: 760, margin: "0 auto", padding: "32px 32px 64px" }}>
          {Body ? <Body /> : <DefaultBody post={post} />}

          <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-wider)",
                color: "var(--text-muted)",
                marginInlineEnd: 4,
              }}
            >
              Filed under
            </span>
            {post.tags.map((tag) => (
              <a
                key={tag}
                href={"/topic/" + encodeURIComponent(tag)}
                onClick={(e) => {
                  e.preventDefault();
                  openTopic(tag);
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--canada-300)",
                  textDecoration: "none",
                  padding: "0.3rem 0.7rem",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid rgba(213,43,30,0.32)",
                  background: "rgba(213,43,30,0.08)",
                }}
              >
                #{tag}
              </a>
            ))}
          </div>

          <div
            style={{
              marginTop: 48,
              paddingTop: 28,
              borderTop: "1px solid var(--border)",
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            <img
              src={AVATAR}
              alt="Matthew Purdon"
              width="48"
              height="48"
              style={{
                width: 48,
                height: 48,
                borderRadius: 9999,
                objectFit: "cover",
                flexShrink: 0,
                border: "1px solid var(--border-strong)",
              }}
            />
            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  fontSize: "var(--text-sm)",
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                Matthew Purdon
              </p>
              <p
                style={{
                  fontFamily: "var(--font-prose)",
                  fontSize: "var(--text-base)",
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                  margin: "6px 0 10px",
                  maxWidth: 520,
                }}
              >
                Principal engineer and AI platform builder in Toronto with twenty-five years of experience turning messy
                software delivery into repeatable systems. Writes Field Notes on AI-assisted engineering and the new
                SDLC, and builds tools and processes in the Lab Reports.
              </p>
              <div style={{ display: "flex", gap: 14 }}>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    go("about");
                  }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-sm)",
                    color: "var(--canada-300)",
                    textDecoration: "none",
                  }}
                >
                  About →
                </a>
                <a
                  href={PROFILE.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-sm)",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                  }}
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
