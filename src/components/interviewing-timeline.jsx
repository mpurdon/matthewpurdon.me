/* The 90-minute interview loop timeline for the "Interviewing the AI-assisted
   engineer" Field Note. Lives in a .jsx file (not inline in the .mdx) so the
   item `content` JSX compiles with React's runtime — JSX passed as a prop does
   not get Astro's MDX->React interop, unlike JSX children. */
import { Timeline } from './article-figures.jsx';

export default function InterviewingTimeline() {
  return (
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
                schemas, or outline the data flow). But it is exceedingly rare that they do. It makes me sad,
                honestly; it shows how deeply candidates still compartmentalize the model as a mere syntax typewriter,
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
  );
}
