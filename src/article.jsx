/* matthewpurdon.me — single article view. */
import { useRef, useState } from "react";
import DS from "./ds/index.js";
import { Cover, kicker, useDeepAnchors } from "./shared.jsx";
import { AVATAR, PROFILE } from "./data.js";
import { LEAF } from "./chrome.jsx";

const { Prose, Soapbox, Callout, PullQuote, Byline } = DS;

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
        I have been messing with a PR review tool lately, a collaboration with a few engineers I work with. The idea is not subtle. The era of
        the small pull request is over; an ordinary agent-assisted change arrives as fifty files now, and most of those
        files are boilerplate that a reviewer's attention should never touch. The tool has one job: make a PR cleaner
        and more focused to review. Hide the noise, surface the intent. (The fifty-file era deserves its own write-up,
        and it will get one.)
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
        using it felt like. And notice the shape of the failure, because it is not laziness, and it is not
        incompetence; the graph was the most ambitious thing anyone proposed. Poor judgement almost never looks like cutting corners. It looks
        like ambition pointed slightly off the goal, it sounds like "you know what would be cool?" and the model has
        made that ambition free.
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
        find out where the hard parts live. I cannot know what to look for in someone else's version until I have had
        to look for it in mine. Second, named misses. The
        dependency graph became a lesson the moment we talked it through and shelved it; unexamined, it would have just
        been a feature that shipped. Every miss that gets named is a rep. Third, and this is the one nobody does: write the taste down.
        For the platform I steward at work, I keep a philosophy document; not a spec, a set of beliefs that every design
        decision can be checked against, with lines like "if a feature requires explanation, it is not finished" and
        "dashboards are for reporting; the primary surface is a task queue". It is externalized taste. It has the
        shelving conversation with people when I am not in the room. I have{" "}
        <a href="https://gist.github.com/mpurdon/69a7ba21f2bd6f2a86f8775e1efd2a9d" target="_blank" rel="noopener noreferrer">
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
          and your review process quietly turns into a rubber stamp for confident output ... right up until the
          incident where nobody in the room can explain the code that's on fire. One question keeps a team honest,
          and it costs nothing to ask: who actually understands this change? To be clear, I'm not
          against the tools; I built half my Lab with them and I'm not going back. I'm against the slide. The price of
          looking competent dropped to zero and the price of being right didn't move. Mind the gap.
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
  "summaries-all-the-way-down": SummariesBody,
  "judgement-is-the-job-now": JudgementBody,
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
                Principal software engineer in Toronto, 25 years in. Writes Field Notes on AI-assisted engineering and
                the new SDLC, and builds the occasional tool — and process — in the Lab.
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
