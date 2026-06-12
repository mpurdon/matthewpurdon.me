/* matthewpurdon.me — Lab project story bodies, keyed by slug.
   Rendered inside ProjectDetail's Prose; entries without a body fall back to summary. */
import DS from "./ds/index.js";

const { Callout, PullQuote, Soapbox } = DS;

function GreyEminenceBody() {
  return (
    <>
      <p>
        A grey eminence is the advisor who stands behind the throne and hears everything. It felt like the right name
        for a meeting recorder that never joins the call.
      </p>
      <p>
        It started as an itch about ownership. I sit in meetings all day and interview engineers in hiring seasons, and
        the record of those conversations kept living everywhere except with me: a bot in the participant list here, a
        vendor transcript behind a paywall there, an export button that produces a PDF nobody opens twice. Notion was
        the popular answer around me, and Notion was the problem: its meeting notes land in the shared workspace where
        everyone can read them, and my week includes confidential calls and calls for other clients that have no
        business in a team wiki. A note-taker that publishes by default is a liability with a nice font. I wanted the
        recording on my disk, the transcript in my index, and nothing leaving the machine except the transcript text I
        deliberately send to Claude (my key, my call). And when something does go to the model, I wanted to own the
        instructions too: the prompts that shape the summaries, the action items, and the open questions are mine to
        read and rewrite, not a vendor's fixed idea of what a recap should be.
      </p>
      <p>
        So I built it native: tap the microphone and the system audio (Core Audio taps, so Teams, Zoom, Meet, and a
        conference talk in a browser tab all look identical), transcribe both channels on the Neural Engine while the
        meeting is still happening, work out who said what, and distill it all into summaries, action items, follow-up
        questions, and a searchable memory of everything I have heard. Then I spent three months discovering why nobody
        ships this as a weekend project.
      </p>
      <p>
        One early decision paid for itself the entire build: the app ships with a developer mode. Flip it on and the
        recorder starts explaining itself; an activity log appears in the sidebar, every transcript segment grows a
        debug row showing exactly why the deduplicator did or did not fire on it, the prompts going to Claude become
        editable in place, and a storage panel itemizes what the database, the recordings, and the backups actually cost
        on disk. My test environment was my own nine-o'clock standup, and you cannot re-run yesterday's meeting under a
        debugger. Most of the bugs in this story were found because the app could show its work.
      </p>

      <h2>Why native, and not Electron or Tauri</h2>

      <Soapbox variant="aside" label="Hot take" signoff="and yes, Tauri counts">
        <p>
          Cross-platform frameworks make easy apps portable. They do not make hard apps easy, and the hard eighty
          percent of this app does not speak JavaScript.
        </p>
      </Soapbox>

      <p>
        The framework debate evaporated the moment I listed what the app actually does. System-audio capture is Core
        Audio taps. On-device transcription is CoreML on the Neural Engine, by way of WhisperKit and FluidAudio.
        Diarization is the same story. None of that is reachable from a webview; in Electron (or Tauri, if you prefer
        your web apps wrapped in Rust) I would have written the entire audio and ML engine as a native helper anyway,
        then spent my evenings shuttling buffers across an IPC boundary so a bundled browser could draw a list.
      </p>
      <p>
        The second reason is residency. A meeting recorder runs all day, every day, beside the calls it is recording; it
        does not get to spike the fans or squat on half a gigabyte of memory the way a tool you open twice a week might.
        Swift, SwiftUI, and the Neural Engine keep live transcription cheap enough that you forget it is running, and
        that is the entire bar for this kind of software: you should forget it is running.
      </p>
      <p>
        Native had costs and I paid them. Swift 6 strict concurrency catches most data races at compile time; the one
        that got through (a closure capturing the same locals a function had taken as <code>inout</code>) crashed the
        app at launch, before I could even reach the logs, and took dsym-and-dwarfdump archaeology on a release build to
        pin down. I would still make the same trade.
      </p>

      <h2>Everyone says everything twice</h2>
      <p>
        The first long transcript I read back had a stutter. Every line from the far side of the call appeared twice:
        one crisp, one slightly wrong, a beat later. I assumed the transcriber was broken. The bug was physics: the
        other side of the call comes out of your speakers and goes straight back in through your microphone, so
        recording both channels means transcribing everyone twice.
      </p>
      <p>
        The naive fix (drop mic segments whose text matches a system segment) caught approximately nothing, because two
        transcription passes never spell anything the same way. The same engine that spent a week transcribing my boss
        Erin as "Aaron", with her name boosted in the custom vocabulary at maximum weight, was never going to hand me
        byte-identical duplicates. What finally worked was fuzzy text matching with a time gate, and the real discovery
        was which half did the work. Similarity finds the candidates, but time is what makes deleting words safe: people
        repeat themselves on purpose constantly, and matching on text alone was erasing real speech. The echo always
        arrives within seconds. Time was the strongest feature.
      </p>
      <Callout variant="note" title="Under the hood">
        Segments match when their character-bigram overlap (a Dice coefficient) clears 0.45 and their midpoints land
        within fifteen seconds; the mic copy may trail the system copy by up to eight seconds (room echo plus
        transcription lag) and lead it by two (timestamp jitter). The system copy wins every time; the tap is the
        cleaner signal. None of these numbers came from theory: developer mode renders gap, delay, and similarity under
        every mic segment with a pass or fail verdict, and the thresholds were read off those rows over weeks of real
        meetings.
      </Callout>

      <h2>A fast liar and a slow perfectionist</h2>
      <p>
        I assumed I needed one good transcription model. I actually needed two flawed ones, flawed in opposite
        directions. During the meeting, latency wins: a small streaming model keeps the words close enough to real time
        to read along, and you forgive its sins because they scroll past. After the meeting, accuracy wins: the
        recording goes back through a model thirty times the size, and that version quietly replaces the live one as the
        document of record.
      </p>
      <p>
        Re-transcribing an hour of audio is a long job on a machine that might sleep, restart, or get dragged into
        another meeting, so the job checkpoints its progress and resumes. My first version resumed automatically, which
        is how I invented a tiny perpetual-motion machine: a wedged job that woke on every launch, failed the same way,
        and queued itself again. Failed jobs now sit and wait for a human to click Retry; some decisions should cost a
        click. Whisper also hallucinates politeness in dead air (it famously hears "Thank you." in silence), so quiet
        chunks are skipped and the known ghost phrases are filtered out.
      </p>
      <Callout variant="note" title="Under the hood">
        Live transcription is Parakeet, a 0.6-billion-parameter streaming model on the Neural Engine. The archival pass
        is Whisper large-v3-turbo, a 1.5 GB download that re-transcribes both channels, then re-runs the AI analysis and
        rebuilds the search index, because every downstream artifact was derived from the worse transcript. Progress
        lands in a JSON sidecar every five chunks, so a crash resumes instead of restarting.
      </Callout>

      <h2>Audio is the receipt; words are the asset</h2>
      <p>
        An hour of raw audio is a gigabyte-class problem; an hour of transcript is a rounding error. I never had to
        guess where optimizing would pay: the developer pane's storage breakdown made it embarrassing, recordings
        dwarfing the database and everything else on disk combined. That asymmetry ended up shaping the whole storage
        story: compress the audio hard, finalize it in small pieces while the meeting runs, and split retention in two,
        because the transcript is what you will actually search next quarter. The audio just proves it happened.
      </p>
      <Callout variant="tip" title="The arithmetic">
        Speech compresses to mono AAC at roughly 32 kbps: about fifteen megabytes per hour, written as a series of small
        files finalized as the meeting runs, so a crash costs seconds of audio rather than the meeting. Audio can purge
        after a configurable number of days; transcripts are kept forever.
      </Callout>

      <h2>Every bug fix ships with a janitor</h2>
      <p>
        My favourite discovery was about a bug I had already fixed. A deletion bug left orphaned search embeddings
        behind; I fixed it and felt good for about a day, until search quoted a deleted meeting back at me. Fixing the
        bug had stopped new damage. The old damage was still sitting in the database, haunting the index.
      </p>
      <p>
        So the app now runs a maintenance pass at launch (throttled to once a day): delete orphans, clear zombie
        "analyzing" flags from meetings that died mid-flight, backfill fields that older versions never wrote, wrap
        legacy records in the shapes newer features expect. Once that habit exists, every fix comes with the same two
        questions: what did this leave behind, and who cleans it up? The answer cannot be me: every install is a
        production database I will never get to log into.
      </p>

      <h2>The laptop is not a server</h2>
      <p>
        Everything heavy (re-transcription, AI analysis, re-indexing) flows through one background queue with one
        worker, which sounds timid until you remember what that queue shares the machine with. The moment a new
        recording starts, the queue parks its job mid-stride (checkpoint kept) and hands the Neural Engine back to the
        live call, picking up again when the meeting ends. It also refuses to start without a gigabyte of free disk,
        because the only thing worse than a slow background job is a full disk during a live interview.
      </p>
      <PullQuote cite="Matthew Purdon">
        On a server you fight for throughput; on a laptop you yield. The user's meeting is the high-priority workload,
        always.
      </PullQuote>

      <h2>Summaries all the way down, again</h2>
      <p>
        Claude reads every transcript twice: a rolling pass during the meeting (the summary so far, action items paired
        with the exact quote that produced them, follow-up questions that are genuine blockers rather than paraphrases)
        and a cleanup pass at the end. The plumbing lesson was old news: never trust a model to return clean JSON. The
        parser clips to the outermost braces, salvages truncated responses, and falls back to the last good state rather
        than taking the meeting down with it.
      </p>
      <p>
        The retrieval lesson was personal. "Ask" searches every meeting I have ever recorded, blending keyword scoring
        with on-device embeddings. One evening I asked it what we had decided about a migration, and it answered with
        its own meeting summaries; the index had been quietly preferring the AI's compressions over the humans' words. I
        had written an entire article about exactly this failure and then built it into my own software. Only transcript
        segments are allowed to match a query now. And when the ranking still looked broken afterward, the fix was not
        in the math: what I spent a night treating as a bad blend weight turned out to be a half-empty embedding store.
        Missing data masquerades as bad ranking; check the data before you tune. (Also, Apple's NLEmbedding is not
        thread-safe. That one shipped, crashed in the wild, and now lives behind a lock.)
      </p>

      <h2>The interviewing half</h2>
      <p>
        Somewhere along the way the app grew a second identity: a structured interview tool. Phases with time boxes,
        rubrics with weighted sections, keyboard-first live notes, and AI scoring that grades each section with evidence
        quotes pulled from the transcript (and an honest F, with a reason, for anything the interview never covered). My
        judgement and the model's sit side by side on the scorecard, and they are allowed to disagree.
      </p>
      <p>
        I am leaving that half mostly untold on purpose. How the interview kit works, and what building it taught me
        about hiring engineers in the AI-assisted era, deserves its own piece; it is the next Field Note I want to
        write.
      </p>
      <Callout variant="note" title="Coming to Field Notes">
        Hiring in the AI-assisted engineering era: what changes when the candidate, the interviewer, and the scorecard
        all have a model in the loop. This page will link to it when it ships.
      </Callout>
    </>
  );
}

function TccBody() {
  return (
    <>
      <p>
        tcc started as a curiosity, not a plan. I wanted to see what pi was like: a deliberately small open-source
        coding agent that ships an agent loop, a terminal UI, and very little else. The experiment stopped being an
        experiment almost immediately, because the discovery underneath it was bigger than the tool: building your own
        harness is not a research project. It is a couple of evenings, it is genuinely fun, and the thing you end up
        with is fast in a way that makes the commercial harnesses feel like they are wading. tcc is that experiment
        grown up: pi underneath, AWS Bedrock as the model provider, and everything else taught through extensions:
        persistent memory, per-branch checkpoints, secret scanning, budget caps, a second model that reviews the first
        one's work before it lands, and a French butler who announces my errors. We will get to the butler.
      </p>
      <Soapbox variant="aside" label="Petty grievance" signoff="the butler stays, though">
        <p>
          April 1, Claude Code grows a tamagotchi. Eighteen species, rarity tiers, a SNARK stat... living in the tool I
          work in all day, and I didn't get a vote. It's cute! And it bugged me way out of proportion, because that's
          the deal with a vendor harness: you get the roadmap, the whims, and the pet. Own the harness and the only
          whimsy in it is whimsy you installed on purpose.
        </p>
      </Soapbox>

      <p>
        The practical pull was Bedrock: at work the road to Claude runs through AWS (corporate SSO, per-model inference
        profiles, a bill in list-price dollars), and a harness I own could be built for those rails natively. Beyond
        that, the day-one brief said developer experience was paramount, and most of what that meant in practice was
        borrowing shamelessly. tcc mirrors Claude Code wherever mirroring is free: the memory format matches exactly, so
        both harnesses share one brain per project; hooks use the same event names, so an existing hooks file mostly
        drops in; plugins and skills load from the marketplace repos my team already maintains. Anything pi could not
        actually support was dropped without ceremony.
      </p>
      <p>
        Three weeks and fifty-four commits later, the wrapper had twenty-five always-on extensions and opinions about
        everything from token throughput to notification etiquette. Almost everything interesting I learned came from
        one property of the corporate cloud: on Bedrock, waste is not an abstraction. Every retry, every overlong test
        log, every reviewer that hangs for ten minutes shows up as dollars and wall-clock time, attributed to you.
      </p>

      <h2>Why a wrapper, and not a fork</h2>

      <p>
        pi stays small by exposing seams instead of shipping features: an extension API that surfaces session start,
        every tool call, every turn end, and the tool results themselves. That last seam matters more than it sounds;
        half of tcc is built on the discovery that an extension can rewrite what the model sees before the model sees
        it. Everything tcc adds hangs off those events, which means everything is a TypeScript file I can read, and
        nothing is a patch I have to maintain against someone else's release schedule. The result feels less like a
        product than a dotfiles repo: the tool I live in, kept in version control and tuned a little every week.
      </p>
      <p>
        There is one yardstick every new feature gets weighed against: tcc is fast, and it has to stay that way. UI
        extensions are skipped entirely in headless mode, MCP servers do not boot until the first tool call needs them,
        and anything that would add latency to a turn has to argue for its life. A harness you wait for is a harness you
        stop using.
      </p>

      <h2>The reviewer that never came back</h2>
      <p>
        tcc's heaviest feature is a final-review command that fans the day's diff out to about ten specialist reviewers:
        correctness, the six Well-Architected pillars, code reuse, complexity. The first time I ran it on a real repo,
        some reviewers simply never came back. Bedrock throttles concurrency per inference profile, and a ten-way
        parallel fan-out reliably starved a few of its own children. Annoying, but at least it was honest about failing.
      </p>
      <p>
        The expensive version came later, courtesy of one stale model ARN in a config file. Every reviewer pointed at it
        failed silently and burned its entire ten-minute timeout doing so; nine subagents, ninety minutes of wall-clock
        time, zero findings. The fix has three layers. Fatal AWS errors (a missing profile, denied access, an expired
        token) now kill the call immediately instead of waiting out the clock, while throttling stays retryable, because
        throttling is weather and a missing ARN is a wrong address. The first fatal failure puts that model on a
        per-session blacklist, so the other nine calls return instantly. And the doctor command grew a deep mode that
        smoke-tests every configured ARN, because the cheapest place to discover a wrong address is before you send nine
        couriers to it.
      </p>
      <p>
        The reviewers also got a doctrine. A failed subagent retries once, quietly; if it fails again it is marked
        unavailable and the work continues, and the final report names the lenses that went missing rather than
        pretending to coverage it did not have. One reviewer dying should cost exactly one reviewer's findings; it took
        deliberate engineering to make that sentence true.
      </p>
      <Callout variant="note" title="Under the hood">
        Reviewers launch in waves of three or four to stay under Bedrock's per-profile concurrency throttle. The pass
        refuses to start with less than 60k tokens of context headroom and warns below 120k, because aggregating ten
        reports consumes 60–120k on its own. Transient errors get one retry after five seconds; if more than half the
        reviewers fail anyway, the report ships marked as partial, with the gaps listed.
      </Callout>

      <h2>Compaction amnesia</h2>
      <p>
        Deep into a long session one night, I watched tcc shell out to grep and ls like a tourist, ignoring the
        ripgrep-backed search tools I had built for it. My first theory was that compaction (the periodic summarizing
        that keeps a long conversation inside the context window) had somehow deleted the tools. It had not. The tool
        list was intact; what compaction had erased was the history of the tools being used. Every earlier turn where
        the custom search returned clean results had been squashed into a summary, and with no recent examples in front
        of it, the model reached for the tool it knew best from training data. Both options were on the menu. It just
        picked the familiar one.
      </p>
      <p>
        I tried, briefly, to fix this with prompting, and you can guess how that went. The fix that held was
        subtraction: at session start, if ripgrep and fd exist on the machine, the built-in grep and find tools are
        removed from the menu entirely (ls survives; it is harmless, and there is no better replacement for simply
        looking around). The lesson generalized further than I expected: a model's defaults are training-deep, and a
        harness shapes behaviour most reliably by editing the menu, not the request.
      </p>
      <PullQuote cite="Matthew Purdon">
        You cannot prompt away a model's habits. If you want it to pick the right tool, take the wrong one off the menu.
      </PullQuote>

      <h2>A colleague's suspiciously good numbers</h2>
      <p>
        A colleague showed up with a screenshot of a token-trimming tool claiming it had cut his usage by 54 percent,
        and my honest first reaction was that the number smelled fake. Digging in, the verdict was kinder and more
        useful: not fake, cherry-picked. The headline was dominated by one case, a 91.8 percent cut on Rust test output,
        which is real and also unsurprising (cargo test is famously operatic). Across a normal mixed workflow the honest
        expectation was ten to twenty percent. But that is the thing about Bedrock at list price: ten to twenty percent
        of a heavy session is real money, not a rounding error. The number was cherry-picked and the idea was right.
      </p>
      <p>
        I did not want a new dependency for it (my instinct was a unix filter; awk if it came to that), and then I found
        something better while reading pi's event types: the content of a tool result is writable. An extension can
        rewrite a command's output after the command runs and before the model reads it. So tcc now trims at the source.
        Test runners keep their setup lines and their failures-and-summary tail, because the middle of a green test run
        has never once been useful; verbose git logs and everything else get sensible caps, with a note saying how many
        lines were omitted and a hint to pipe through grep next time.
      </p>
      <Callout variant="tip" title="The arithmetic">
        Test runners keep the first 30 lines and the last 150; git log without --oneline stops at 200; everything else
        caps at 500 with an "[N lines omitted]" marker. On a flat-fee subscription you never see what verbose output
        costs. On Bedrock it is a line item: a failing test run can be thousands of lines, and they get re-read on every
        turn that follows.
      </Callout>

      <h2>The token dies mid-sentence</h2>
      <p>
        Corporate SSO tokens expire on their own schedule, which is to say: mid-afternoon, mid-session, mid-thought. The
        failure arrived as a one-liner from the AWS SDK:{" "}
        <code>Value not present for clientId in SSO Token. Cannot refresh.</code> The diagnosis was a generation gap in
        AWS config formats; tokens minted through the legacy style carry no OAuth client registration, so the SDK has
        nothing to refresh with. Half the fix was a doctor warning that nags about the legacy format. The other half
        leaned on a small gift in pi's design: the hook that runs before each agent turn is awaitable. Every five
        minutes tcc quietly validates credentials, and when they have died it launches the SSO login and holds the turn
        until the browser dance completes. The model never sees the auth error. From its side of the conversation, the
        user just took a moment to reply.
      </p>

      <h2>A French butler in the terminal</h2>
      <p>
        An agent that works in long turns creates a babysitting problem: I want to walk away, and I want to know the
        moment it needs me. The obvious fix is notification sounds keyed by event (a question, a permission prompt, an
        error, a finished task), and the macOS defaults were too boring to live with. So tcc gives Claude a voice: the
        lines are generated once through a text-to-speech API, in a French accent, and now it is Claude himself saying
        "Pardonnez-moi, monsieur, j'ai une question" when he is blocked on me and "Oh là là! C'est une catastrophe!"
        when something dies.
      </p>
      <p>I REGRET NOTHING!!!</p>
      <p>
        The banners were the actual engineering story. The sound played; the notification never appeared; the scripting
        bridge returned a clean exit code while macOS silently discarded the banner. After a long detour through
        permission panes, the culprit turned out to be the terminal itself: on modern macOS a script's notification is
        attributed to whichever app launched it, and my terminal emulator had never been granted notification rights.
        Granting them surfaced the banner and revealed the second wrinkle: clicking it opened Script Editor, a hard
        limitation of the scripting route. The final fix was a small notifier utility with the sender mapped from the
        running terminal, so a click lands you back in the session that called for you.
      </p>
      <p>
        The last fix was etiquette. The butler originally announced a catastrophe for every failed shell command, and a
        coding agent fails shell commands all day as a normal part of working. Now the error line is reserved for the
        genuinely fatal (a blown budget, a dead login, a broken model), and quick turns finish in silence. A butler who
        announces everything announces nothing.
      </p>

      <h2>A shield between the agent and the wire</h2>
      <p>
        An agent reads files for a living, and sooner or later it reads the wrong one. A stray env file here, a deploy
        script with a hardcoded key there, and a credential is sitting in the conversation, one API call away from
        leaving the machine. tcc's last line of defence is a data-loss-prevention layer that inspects every tool call
        before it executes: eleven built-in patterns covering AWS access keys, three flavours of GitHub token, live
        Stripe keys, Slack tokens, private-key headers, and the API keys of the model vendors themselves. A match can be
        allowed, blocked, or held for review; review shows a redacted snippet (the first four characters, an ellipsis,
        the last four) and asks me to decide, and every event lands in an audit log.
      </p>
      <p>
        The architecture is borrowed with admiration from node9-proxy: rules group into shields, shields are plain JSON,
        and a directory of user shields means a new policy is a file drop, not a release. The epilogue is my favourite
        part. Days after it shipped, my own cleanup command (four parallel review agents that hunt for waste in whatever
        changed) flagged that the eleven patterns were being recompiled on every single tool call, and the regexes moved
        behind a cache. The harness reviews the harness now.
      </p>
      <Callout variant="note" title="Why not just node9-proxy?">
        Fair question, since the shield format is lifted from it. A proxy inspects traffic at the network edge, which is
        after the secret has already landed in the conversation; block there and the leak is contained, not prevented,
        and the context holding it gets re-sent on every turn that follows. Inside the harness the same rules fire
        before the tool call runs, so the secret never enters the context at all, and a hold can pause the turn and
        actually ask me. It also keeps the dependency count honest: a proxy is infrastructure to deploy and keep
        running; an extension is one more TypeScript file in the repo.
      </Callout>
      <p>
        When I quit for the day, tcc prints one line on the way out: <code>session: 42 turns · 34m · $1.83</code>. That
        line is the whole philosophy of the project: the work, the time, and the bill, visible, owned, and small enough
        to read at a glance.
      </p>
    </>
  );
}

function DsBody() {
  return (
    <>
      <p>
        This is the recursive entry: the Lab page about the site the Lab lives on. The site went from git init to
        roughly what you are reading in three days in June, and the three days are honestly the least interesting number
        on the page.
      </p>
      <p>
        The interesting part is that almost nothing here started from a blank file. The look was distilled from a
        shortlist of sites I admire. The voice was mined out of five hundred of my own Teams messages. The structure of
        every page is an argument from my first Field Note, applied to the site that published it. What follows is the
        long version of all three.
      </p>

      <h2>A design system with no design phase</h2>
      <p>
        This project started as a bookmarks folder, not a brief. The State of AI 2026 report: IBM Plex Mono on warm
        charcoal, one big amber number leading every section. My coworker Teancum's{" "}
        <a href="https://besendorfer.com" target="_blank" rel="noopener noreferrer">
          besendorfer.com
        </a>
        : quiet, completely deliberate, and it has a live status dot I am still jealous of. A few others I kept coming
        back to. I knew the feel I wanted; what stood between me and having it was the part I dreaded (moodboards, font
        pairings, three weeks of self-doubt in Figma).
      </p>
      <p>
        So I skipped the brief and went straight to the evidence. The State of AI report was the closest match to the
        voice I wanted, so I pointed Claude at the live site and asked it to formalize what I admired: read the colors
        out of the live styles, measure the spacing instead of eyeballing it, rebuild the result as a real monorepo. An
        afternoon later I had a token layer, twenty-five React components, a shadcn-style CLI, and a Storybook, and the
        tokens file is honest about its parentage ("extracted directly from the live site's inline styles and compiled
        stylesheet").
      </p>
      <p>
        Measuring mattered more than I expected. Inspiration usually degrades on the way from the eye to the stylesheet;
        you rebuild what you admired from memory and end up with a copy of a copy, neither yours nor theirs. Starting
        from true values left all my attention for the parts that are mine: what to keep, what to drop, what to build on
        top. Most of what this page actually looks like (the serif, the red, the leaf, the Soapbox) appears in none of
        the sources. We will get there.
      </p>
      <Callout variant="note" title="Under the hood">
        135 CSS custom properties in the token layer (color, type, spacing, radii, shadows, motion). 25 components
        across forms, overlays, navigation, and data viz, about 4,700 lines of TSX. A ds-ui CLI in the shadcn style
        (init / add / list / diff) and a dark-themed Storybook 8, all in a pnpm-plus-Turborepo monorepo built on June 2,
        a week before this site existed.
      </Callout>

      <h2>The spec's real audience is an agent</h2>
      <p>
        Here is the part I find genuinely new: the monorepo never gets imported. This site does not install the design
        system as a package; there is no node_modules path from one to the other. Instead I mounted the monorepo
        read-only into a Claude session and had it reverse-engineer the code back into prose: a README that reads like a
        brand book, with the whole identity compressed into one line ("set type in IBM Plex Mono, paint on warm charcoal
        #242220, lead with one big amber number, and keep corners crisp"); a SKILL.md wrapper so the system loads
        straight into Claude Code as a skill; and one self-contained bundle that hangs forty-four components on a window
        namespace.
      </p>
      <p>
        Follow the chain: a website was turned into code, the code was turned into a document, and the document was
        turned into this website. The middle step looks backwards until you ask who a design system is for now. Mine has
        exactly one consumer, and it was never going to be a developer reading Storybook; it is an agent holding a spec.
        Components encode what things look like. The README encodes taste: when the inverted cream section is allowed,
        why corners stay crisp, what the uppercase mono eyebrow is for. Hand that to a model and ask for a page that
        does not exist yet, and it comes back on brand. I stopped maintaining a component library and started
        maintaining a description of one, and the description turned out to be the more valuable artifact.
      </p>
      <PullQuote cite="Matthew Purdon">
        The components used to be the product and the documentation was the chore. With an agent in the loop it flips:
        the document is the design system.
      </PullQuote>

      <h2>A report can't hold a rant</h2>
      <Soapbox variant="aside" label="Hot take" title="Lorem ipsum is a noob move" signoff="content is the whole job">
        <p>
          Every demo screen in the system is populated with realistic content, because whenever I see lorem ipsum now I
          think it's a noob move. LLMs can generate plausible fake data so easily it's dumb to force a layout to hold
          something generic and meaningless. Fake latin hides every real problem: the headline that wraps badly, the
          table that breaks at real widths, the card that only works when the title is short. you know what never says
          lorem ipsum? a shipped page.
        </p>
      </Soapbox>
      <p>
        The foundation I started from was tailored for a data desk: third person, impersonal ("76% of respondents report
        daily use"), allergic to opinion. I am a guy with opinions, and a personal site that cannot hold a rant is a
        brochure. So the blog layer extends the system rather than replacing it. IBM Plex Serif for article bodies
        (all-mono is tiring at article length, and Plex Serif shares the mono's metrics so the pairing looks
        intentional). A Canada-red co-brand, warmed a few degrees so it harmonises with amber instead of fighting it. A
        maple leaf drawn from scratch; there was no Canadian identity in the sources, so this part is all mine. And the
        magazine devices: drop caps, pull quotes with the oversized quotation mark, callouts in four flavours, and the
        one I am proudest of, the Soapbox.
      </p>
      <p>
        The Soapbox is borrowed in spirit from Fluent Python, the only technical book I know that gives the author a
        formal place to step off the material and editorialize. Here it is a titled, red-edged box with a faint maple
        leaf in the corner, and it has rules. It comes in three sizes (a full-width section, an inline block, and an
        aside that floats into the right margin on wide screens, like the one beside this paragraph), and at the end of
        an article it ships folded: collapsed to its title, pulsing gently, opening only if you ask. The rant is opt-in;
        the prose stays calm. Keeping those two registers honestly separated turned out to need a document of its own.
      </p>

      <h2>Five hundred messages of me</h2>
      <p>
        The site could look like a magazine and still read like a model. Early drafts had exactly that problem:
        grammatically perfect, structurally sound, and written by nobody in particular. The obvious fix (telling the
        model "write like me") is useless, because I am the least qualified person alive to describe how I write. Nobody
        hears their own accent.
      </p>
      <p>
        So I had it read the evidence instead. In a Cowork session with the Teams connector, I had Claude search my sent
        messages (mine only, filtered to me as the sender), paginate until it held about 250 of them, and analyze the
        corpus like a linguist: sentence rhythm, punctuation tells, signature lexicon, hyperbole patterns, how I praise,
        how I push back. Then the step that made it real: a second, independent sample of 250 messages from six weeks
        earlier, so the guide would not be (in the prompt's words) a local maximum of one week's mood. The two samples
        matched almost exactly. I am, apparently, extremely consistent, for better or worse.
      </p>
      <Callout variant="note" title="The output: my voice, one paragraph">
        "Matthew's written voice is conversational and unfiltered: fast, blunt, lowercase, and allergic to ceremony.
        He's a senior engineer/leader who compresses strong opinions into short bursts, swings between deadpan one-word
        dismissals ('brutal', 'rediculous') and ALL-CAPS exasperation ('WHAT ARE WE DOING?!?!?!?'), and softens the
        bluntness with self-aware humor, teasing, and genuine warmth toward people doing good work. He is, in his own
        words, 'prone to extremes so flipping tables is not unexpected.' He never performs politeness he doesn't feel,
        and he never pads."
      </Callout>
      <p>
        The guide has rules I did not expect to need. Accidental typos are not style ("jsut" is fast typing; "prolly" is
        the fingerprint, and only one of them belongs in the guide). Every coworker name is scrubbed to a placeholder so
        the file is safe to share. Every claim has to be backable by a quoted message, which means the guide describes
        how I type and refuses to speculate about how I sound in a meeting. And it governs this site mechanically now:
        article prose gets the tight register, and the loose Teams voice (the "yeah", the " ... " pause, the "brutal")
        is only allowed inside a Soapbox. The two registers you have been reading on this page are not an accident; they
        are policy.
      </p>
      <p>
        The prompt is public and reusable:{" "}
        <a
          href="https://gist.github.com/mpurdon/46fe27a1abc046bc5f41d739870c8638"
          target="_blank"
          rel="noopener noreferrer"
        >
          Find Your Voice
        </a>
        . Bring your own messages. The optional last step asks the model to hold up a mirror and tell you, honestly, how
        your style lands with the people who receive it. Do not skip that step; it is the best part.
      </p>

      <Soapbox label="Hot take" title="Specs were training wheels" signoff="taste is the job now">
        <p>
          A year ago I would have told you the spec was everything. Detailed requirements, acceptance criteria, the
          works ... the models needed the rails, because any gap you left, they filled with something dumb. Then
          somewhere in the last six months that quietly stopped being true, and a lot of people haven't noticed. The
          models got good enough that the spec is no longer the bottleneck. What made the difference on this site wasn't
          describing the thing precisely; it was handing the model everything: the live site to measure, the monorepo to
          read, the voice guide, the article with the argument in it. Resources, not requirements. Give it the raw
          material and let it take a real first pass.
        </p>
        <p>
          Then the actual job starts, which is iterating. The first pass is never right; it's just real enough to react
          to. I look at it and something feels off ... the spacing is too tight, the rant reads fake, the red fights the
          amber ... and half the time I couldn't have told you the rule before I saw it broken. That's the part I bring.
          The model does volume; I do "warmer", "tighter", "that's not me". You can't spec what feels good, because you
          don't know what feels good until it's in front of you, you know? Taste doesn't go in the prompt. Taste is the
          loop.
        </p>
      </Soapbox>

      <h2>Glance, brief, full</h2>
      <p>
        My first Field Note, <a href="/notes/summaries-all-the-way-down">Summaries all the way down</a>, argues that the
        deadliest failure in how organizations communicate is the compression chain: every summary of a summary drops
        the caveat first, and the fix is not better summaries but layered ones (a ten-second glance, a two-minute brief,
        and the full detail attached, always). The awkward thing about publishing an argument is that your own site has
        to survive being measured against it.
      </p>
      <p>
        So the content model encodes the three layers structurally. Every Lab project is a tagline you can read on the
        index card (the glance), a lead and a metadata strip at the top of its page (the brief), and the long story
        underneath (the full). Field Notes do it with the dek, the callouts, and the prose. Nothing on this site is a
        summary of something you cannot reach; the deeper layer is always attached, one click or one scroll away,
        written once at the source instead of regenerated downstream.
      </p>
      <Callout variant="takeaway" title="The house rule">
        Everything ships in three depths: a glance (the card), a brief (the lead and the metadata), and the full story,
        attached. If a layer cannot be traced down to the layer below it, it does not ship. The site has to practice
        what the first article preaches, because readers would (correctly) check.
      </Callout>
      <p>
        Which makes this page the full layer of an entry about the system of layers, drafted by an agent reading a guide
        to my voice, styled by a design system that exists as a document an agent can read. The card you clicked was the
        glance. You just finished the full.
      </p>
    </>
  );
}

function McpServersBody() {
  return (
    <>
      <p>
        One weekend in early June I went looking for my MCP servers and found an archaeology dig. A FreshBooks server
        living inside <code>~/.claude/mcp-servers/</code>, no git history, born in a single Claude session in May. A
        Sumo Logic server that was a straight clone of a repo I found on GitHub, still carrying a Dockerfile and an HTTP
        transport I never used. A GitHub server written in untyped JavaScript. Each one wired up by hand-editing
        whichever JSON file that particular host wanted: one path for Claude Desktop, another for Claude Code, a third
        for Cowork. Every new machine, every new host, the same twenty minutes of config spelunking.
      </p>
      <p>
        The cleanup is the boring part of this story: a pnpm and Turborepo monorepo, everything ported to strict
        TypeScript, a conventions document, CI, and npm publishing. That took the weekend. The part worth writing down
        is what I noticed while moving the servers in: Claude used some of them constantly and ignored others, and the
        difference had nothing to do with how many tools each one exposed. The servers that earned their keep were the
        ones that knew things.
      </p>
      <Callout variant="note" title="Under the hood">
        Four public servers (MongoDB, Sumo Logic, GitHub, FreshBooks) and one installer CLI, fifty-one tools between
        them, published to npm under <code>@mpurdon/*</code>. TypeScript, ESM, Node 20+, every tool input validated with
        zod, stdio transport only. One private server (a work MySQL database) lives in its own repo and joins through a
        local descriptor. Releases go out via Changesets and npm Trusted Publishing (OIDC); there is no npm token in CI
        to leak.
      </Callout>

      <h2>Watching Claude order off the menu</h2>
      <p>
        The Sumo Logic API is honest about what it is: searches are jobs, so you start one, poll until it finishes, then
        page through the results. My first server exposed exactly that, one tool per endpoint, and watching Claude use
        it was like watching an intern with a curl cheatsheet. Five tool calls to answer one question, and the first
        query was usually wrong anyway, because the query language is the easy half. The hard half is knowing that the
        checkout service logs under a source category like <code>prd/ecommerce/checkout</code>, that its noisy health
        checks need filtering out, and that nobody has ever written any of this down anywhere a model could read it.
      </p>
      <Callout variant="warning" title="The adapter smells">
        You are looking at an adapter, not a tool, when: the tool list mirrors the API's endpoint list; the descriptions
        are copied from the endpoint summaries, with no hint of when to reach for one; results come back as raw API
        responses (pagination envelopes, hypermedia links, forty fields where five matter) that the model re-reads on
        every turn that follows; polling and paging are the model's problem; tools demand IDs the model has no way to
        know (account, business, workspace) instead of resolving them from config; and a DELETE is wrapped as casually
        as a GET, with no confirmation semantics anywhere.
      </Callout>
      <p>
        The fix was already sitting in the server I had cloned. Grey Perez, a developer I have never met whose{" "}
        <a href="https://github.com/greyaperez/mcp-sumologic" target="_blank" rel="noopener noreferrer">
          mcp-sumologic
        </a>{" "}
        this package descends from, had built it around a context file, and it is still the best idea in the whole
        monorepo. It maps the organization the way a senior engineer carries it in their head (environments, then
        applications and infrastructure, each with its source category, common filters, and a couple of known-good
        sample queries), plus shortcuts: parameterized query templates for the searches you run every week. On top of
        that map the server grows tools shaped like questions. <code>discover_sources</code> tells the model what
        exists. <code>search_by_context</code> takes an application name and a time range and builds the query itself.
        The raw job-polling tools are still there for the odd bespoke search, but the model almost never needs them,
        because the tribal knowledge lives in the server now.
      </p>
      <PullQuote cite="Matthew Purdon">An adapter exposes the API. A facade answers the question.</PullQuote>
      <p>
        The FreshBooks server is the purest version of the idea. The API has endpoints for time entries, clients, and
        invoices; nothing in the API knows that it is invoicing day. So the tools are the chores themselves.{" "}
        <code>generate_timesheet</code> pulls a date range of time entries and writes the exact bi-weekly Excel file my
        client expects, signature image and all. <code>generate_invoice</code> groups the same entries by project and
        service, looks up each billable rate, and creates the draft invoice. What used to be a Python script and an
        evening of copy-paste is one sentence in a chat window.
      </p>

      <Soapbox label="Hot take" title="Stop shipping adapters" signoff="put the loop in the server">
        <p>
          Every team's first MCP server is the same server: open the API docs, write one tool per endpoint, ship it,
          post about it. Congrats, you've built an SDK with extra steps. And lately you don't even have to do the
          typing: point FastMCP's from_openapi() at an OpenAPI document and the whole spec becomes a server, one tool
          per operation, two hundred endpoints into two hundred tools in one line of code. (Not FastMCP's fault. It's a
          good framework, and it ships route maps precisely so you can curate the conversion. Nobody curates.) Every one
          of those two hundred names, descriptions, and parameter schemas now gets loaded into the model's context
          before the conversation starts; you're paying by the token to ship a table of contents.
        </p>
        <p>
          The model already knows how to call a REST API; that was never the hard part. The hard part is which
          endpoints, in what order, with which magic strings, and a 1:1 wrapper outsources exactly that to the most
          expensive, slowest component in the entire stack. You're paying frontier-model prices for orchestration a
          for-loop could do. So here's the test: if your server's tool list reads like the API's sidebar nav, you
          haven't built a tool, you've forwarded the documentation. Put the loop in the server. Put the org chart in the
          server. Put the connection strings, the source categories, the rate limits, the schema in the server. Tools
          should be named after the questions people actually ask ("what broke in CI?", "what merged this week?"),
          because every turn the model spends on plumbing is a turn it doesn't spend on judgment, you know? The model is
          the only part of the system that can think. Stop making it do the part that doesn't need thinking.
        </p>
      </Soapbox>

      <h2>One question, forty API calls</h2>
      <p>
        My Monday-morning question is "what happened in the org while I wasn't looking?" GitHub does not have an
        endpoint for that. It has a search endpoint that returns thin results, and a detail endpoint you must hit once
        per PR to learn anything useful, and a secondary rate limit that bans you for asking too enthusiastically (I
        found that one the empirical way). So <code>get_org_recent_prs</code> does the whole dance in one call: search
        the org, then enrich every hit with its size, CI state, and whether it is a dependabot PR, in batches of eight
        to stay under the ban hammer. One tool call, one rolled-up answer, org-wide.
      </p>
      <p>
        The deepest tool in the set is <code>get_pr_ci_failures</code>, which exists because "why is CI red?" is never
        one API call. It resolves the PR to its head commit, finds the failed workflow runs for that commit, keeps only
        the newest run per workflow, walks each one down through its failing jobs to the failing steps, downloads the
        job log, locates that step's section by its log markers, strips the timestamps, and returns the last fifty
        lines. That is the part of code review nobody enjoys (four phases of clicking through the Actions UI), and the
        model gets it as a single tool whose answer is exactly the fifty lines that matter. Its sibling{" "}
        <code>get_pr_for_review</code> categorizes every changed file as code, CI, infrastructure, or dependencies, so a
        review can open with the blast radius instead of discovering it on file nine of twelve.
      </p>

      <h2>Production is a different planet</h2>
      <p>
        The scariest sentence in agent tooling is "the model has your production connection string". The MongoDB server
        is built around taking that sentence seriously. It keeps three connection strings (dev, staging, production) in
        a <code>chmod 600</code> config file, always knows which one is loaded, and reports it through{" "}
        <code>current_environment</code> along with a <code>writesRestricted</code> flag. In production, write tools do
        not execute. They return a refusal that describes exactly what would have run (the operation, the environment,
        the host, the documents or filters involved) and ask to be re-invoked with <code>confirmed: true</code>. The
        model cannot forget to ask permission, because asking permission is the return value.{" "}
        <code>drop_collection</code> requires confirmation in every environment, including dev, because there is no
        environment where I want that to be a surprise.
      </p>
      <p>
        The same paranoia covers what comes back over the wire. The server will happily tell you which host it is
        talking to; it derives a sanitized hostname from the connection string and never returns the string itself,
        because a credential that enters the context window gets re-sent with every turn that follows (the tcc story's
        secret shields fight the same battle one layer up). And the private work server, a MySQL database with fifteen
        years of history in it, applies the philosophy to schemas: its best tool is <code>get_schema_wiki</code>, which
        returns the entire schema as one markdown document, cached for a day. The model reads it once at the start of a
        session instead of dribbling out twenty <code>describe_table</code> calls, and its other tools are named after
        the domain objects, not the tables.
      </p>

      <h2>Five servers, one shape</h2>
      <p>
        A week after the consolidation, dependabot bumped every dependency in the repo and handed me the best war story
        in it. The dotenv library, as of version 17, prints a friendly tip banner when it loads. To stdout. A stdio MCP
        server <em>is</em> its stdout; the host expects nothing on that stream but JSON-RPC frames, so one library being
        helpful is a corrupted stream and a dead server. The fix is a <code>quiet: true</code> flag and a new respect
        for how fragile the transport is: the conventions document now opens with the rule that diagnostics go to
        stderr, and ESLint enforces it by banning <code>console.log</code> outright.
      </p>
      <p>
        That document (<code>CONVENTIONS.md</code>, distilled from the MongoDB package as the reference implementation)
        is what makes five servers feel like one. Config is validated with zod at startup, and a bad config fails with a
        message that names the exact file and shows sample contents to paste. Servers shut down cleanly on SIGINT and
        guard against late-resolving promises crashing the process mid-session. And the installer ties it together:{" "}
        <code>npx @mpurdon/mcp-servers configure</code> detects which Claude hosts are on the machine, prompts for each
        server's credentials (masked, never echoed), and writes the right entry into the right config file for Desktop,
        Code, and Cowork; idempotently, with a <code>--dry-run</code> flag. The twenty minutes of config spelunking is
        now a single command.
      </p>
      <p>
        The installer also solves the problem that not everything can be public. Work servers stay in private repos, but
        each one ships a register command that writes a small versioned descriptor into{" "}
        <code>~/.mpurdon-mcp/servers.d/</code>. The configurator discovers those at runtime and offers them in the same
        list as the npm packages, marked <code>(private)</code> and launched from local disk. The public CLI ships no
        knowledge of them at all; one install experience, two tiers of secrecy.
      </p>

      <Callout variant="takeaway" title="The house rule">
        A tool earns its slot by answering a question I actually ask, in one call, with the context already inside it:
        the source categories, the connection strings, the schema, the rate limits. If the tool list reads like the
        API's table of contents, it is an adapter, and it goes back in the oven.
      </Callout>
      <p>
        There is a familiar shape in all of this. A tool result is a summary of an API response, written for the reader
        who has to act on it; the facade decides what the model needs the way a good brief decides what an exec needs. I
        wrote a whole <a href="/notes/summaries-all-the-way-down">Field Note</a> about layering information for its
        reader. It turns out the argument holds when the reader is a machine.
      </p>
    </>
  );
}

function Evalu8Body() {
  return (
    <>
      <p>
        Last November I was deep in a pipeline that scored contact-center calls with an LLM, and I needed ground truth:
        the calls themselves, their transcripts, and the scorecards the human evaluators had filled in. All of that
        lives behind 8x8's quality-management API. Step one was supposed to be the usual ritual: read the docs, build a
        Postman collection, poke at endpoints until the shapes make sense.
      </p>
      <p>
        Step one lasted about an hour. The docs typed the agent reference as a double (a floating-point employee); the
        region list had entries like <code>us-west-8x8</code> and <code>us-east-stats</code> with nothing to say which
        one was mine; and the first responses that came back did not match the documented shapes anyway. So I skipped
        the collection and described an app to Kiro instead: the searches I actually wanted to run, a transcript I could
        read next to its scorecard, a settings screen for the credentials. The whole repo went up as six commits stamped
        within three minutes of each other, all in one evening. The surprise was not how fast it went up. The surprise
        was what it quietly replaced.
      </p>
      <Callout variant="note" title="Under the hood">
        Electron, React, Vite, Tailwind, TypeScript; about 3,300 lines all in. Four tabs (evaluations, interaction
        search, phone lookup, settings), credentials in localStorage, OAuth client-credentials with the token cached on
        a sixty-second buffer. The entire git history is seven commits across two sittings: November 20, 2025 and March
        31, 2026. There are no tests, no CI, and no releases, and that is not neglect; that is the spec.
      </Callout>

      <h2>The docs said the agent ID was a double</h2>
      <p>
        The 8x8 quality-management API is not a bad API so much as an unaccompanied one. The documentation tells you an
        endpoint exists and roughly what it wants, and then you are on your own: which of six regions your tenant
        answers in, which header names your PBX, whether the filter parameter you need is called{" "}
        <code>userReference</code> or <code>agentId</code> (the code still carries a comment weighing the two, because
        the docs typed the first one as a number with a decimal point). The transcript endpoint was the best of it.
        Singular or plural? The fossil record is right there in the source: "If 'transcription' (singular) failed, let's
        try plural. Also, let's try to be robust about the path." That last sentence appears twice in a row, because the
        agent writing it was negotiating with the API in real time, and the negotiation made it into the commit.
      </p>
      <PullQuote cite="Matthew Purdon">The app became the documentation I wished the API had.</PullQuote>
      <p>
        That is the part Postman never gives you. A collection records requests that worked once. The app records the
        whole settlement: every guess that survived contact with the API is sitting in a typed function with the losing
        guesses still visible in the comments. Four months later I did not have to remember any of it; I opened the app
        and the knowledge was still there, load-bearing, in code.
      </p>

      <h2>Guess the shape of the response</h2>
      <p>
        The responses themselves were a second negotiation. The same search endpoint might hand back a bare array, or an
        object with a <code>content</code> key, or one with an <code>interactions</code> key, so the parsing line reads
        like a shrug: <code>Array.isArray(data) ? data : (data.interactions || data.content || [])</code>. The agent's
        name lives at <code>agent.name</code> except when it is <code>agentName</code>; the timestamp is{" "}
        <code>createdAt</code> except when it is <code>interactionTime</code>; a transcript speaker is{" "}
        <code>channel: 'external'</code> in one response and <code>speaker: 'customer'</code> in another.
      </p>
      <Soapbox variant="aside" label="Hot take" signoff="check seventeen first">
        Somewhere in every enterprise API there is a <code>customField17</code>, and it is load-bearing. In this one it
        holds the queue name. The schema is where the data model starts; custom fields are where it actually lives.
      </Soapbox>
      <p>
        All of that roulette gets handled exactly once, in one mapping function, and every screen downstream gets clean
        rows. Which is the real answer to "why an app instead of a REST client": Postman shows you a response, and I did
        not want responses. I wanted to search a date range, click a call, and read the transcript beside the scorecard
        the human evaluator filled in, the way you would actually review a call. The UI is not a nicety on top of the
        exploration; the UI <em>is</em> the exploration, shaped like the question instead of like the API.
      </p>

      <h2>The API doesn't know what a phone number is</h2>
      <p>
        The app then sat untouched for four months, until I needed every call we had ever exchanged with one specific
        phone number. The API has no phone-number filter that I could find. Worse, the numbers it returns come back in
        whatever format the telephony layer felt like that day, so even if you could filter server-side, you could not
        trust the match. The only honest approach was the dumb one: scan the history and filter client-side, matching on
        the last ten digits of both the caller and dialed numbers.
      </p>
      <Callout variant="note" title="The arithmetic">
        Five years of history split into roughly sixty monthly windows, scanned four windows at a time, fifty records
        per page with a 200-page guard per window (the API caps a query window at about 10,000 records anyway). Failed
        pages retry three times with exponential backoff. A finished scan is cached in localStorage with its date range
        and record count, so repeating a lookup costs zero API calls until you hit refresh.
      </Callout>
      <p>
        One evening with Claude (the commit credits Opus 4.6) added the whole feature, and the fun bug was the progress
        bar. With four monthly windows in flight, the fastest one finishes first, so a naive progress report jumps
        backwards every time a slower month reports in. The fix was to let only the forerunner speak: the window
        furthest back in time owns the progress bar, and the scan reads cleanly today-to-past. A throwaway app, getting
        concurrency-aware UX polish, because the agent made that polish cost nothing.
      </p>

      <Soapbox label="Hot take" title="Postman was a workaround" signoff="build the app, then throw it away">
        <p>
          Postman is a coping mechanism that got funding. The only reason "REST client" is even a software category is
          that building a real UI for an API used to cost weeks, so we all agreed to squint at raw JSON in a generic one
          instead. And then the coping mechanism grew collections, environments, pre-request scripts, tests written in
          JavaScript ... buddy, you're coding. You're just doing it in a runtime you can't version, in a UI somebody
          designed for the average of every API on earth. So ... many ... clicks ... and at the end you've got a
          collection that remembers the requests that worked once and exactly none of what you learned getting there.
          Total waste of time.
        </p>
        <p>
          I mean... that trade made sense at the old prices, it just doesn't anymore. Kiro stood this thing up in one
          evening; six commits in three minutes and I never typed a line of boilerplate. No tests, no CI, creds in
          localStorage, audience of one ... and that's fine! It's not a product, it's a question with a window border.
          The bespoke app costs less than learning the generic tool now, and it answers the thing I actually asked
          instead of making me translate it into somebody else's request builder, you know? When the question dies,
          delete the app. The understanding was the artifact.
        </p>
      </Soapbox>

      <h2>Two sittings, four months apart</h2>
      <p>
        I keep coming back to the commit log, because it is the most honest changelog I own. One evening in November
        with Kiro to build it, one evening in March with Claude to teach it about phone numbers, and nothing in between:
        no refactors, no dependency bumps, no gardening. The app did not even keep its author; whichever agent was open
        that night did the typing, and the app could not care less. The app does not need to be good software. It needs
        to be ready the next time the API and I have a disagreement, and dormancy is what that readiness looks like. I
        notice I have stopped feeling guilty about repos like this. The unfinished side project that nags at you is a
        product you have not shipped; this is a question that got answered, kept around in case I ask it again.
      </p>
      <Callout variant="takeaway" title="The house rule">
        When the docs and the API disagree, stop reading and start building: the smallest app that answers your actual
        question, in an evening, with an agent doing the boilerplate. The workarounds become typed code instead of
        memory, the UI explores the way you think instead of the way the vendor imagined, and the whole thing is allowed
        to sleep until the next question shows up.
      </Callout>
      <p>
        If this sounds familiar, it is the <a href="/lab/mcp-servers">facade argument</a> wearing pixels. An adapter
        exposes the API and a facade answers the question; evalu8 is what a facade looks like when the consumer is not a
        model but me, squinting at a transcript at ten at night. The generic client is the adapter. Build the facade.
      </p>
    </>
  );
}

export const PROJECT_BODIES = {
  "grey-eminence": GreyEminenceBody,
  tcc: TccBody,
  "matthewpurdon-design-system": DsBody,
  "mcp-servers": McpServersBody,
  evalu8: Evalu8Body,
};
