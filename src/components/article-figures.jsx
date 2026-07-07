/* Recreated artifacts for the worked example in the "Summaries all the way down"
   Field Note. All names, providers, and numbers are fictionalized; the shape is
   real. Extracted from the former article.jsx so the MDX body can import them.
   Pure React + inline styles; no design-system dependency. */

export function FigCaption({ children }) {
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

export function MiniTable({ head, rows }) {
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
export function ReportFigure() {
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
export function SummaryFigure() {
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

// Vertical timeline used in the "Interviewing the AI-assisted engineer" note.
export function TimelineItem({ time, title, isLast, children }) {
  return (
    <div style={{ display: "flex", gap: "1.5rem", position: "relative" }}>
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

export function Timeline({ items }) {
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

// The progressive TL;DR: banner = glance, cards + bar = brief, report = full.
export function DashboardFigure() {
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
