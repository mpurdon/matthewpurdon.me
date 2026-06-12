/* matthewpurdon.me — Lab project story bodies, keyed by slug.
   Rendered inside ProjectDetail's Prose; entries without a body fall back to summary. */
import DS from './ds/index.js';

const { Callout, PullQuote, Soapbox } = DS;

function GreyEminenceBody() {
  return (
    <>
      <p>
        A grey eminence is the advisor who stands behind the throne and hears everything. It felt
        like the right name for a meeting recorder that never joins the call.
      </p>
      <p>
        It started as an itch about ownership. I sit in meetings all day and interview engineers in
        hiring seasons, and the record of those conversations kept living everywhere except with
        me: a bot in the participant list here, a vendor transcript behind a paywall there, an
        export button that produces a PDF nobody opens twice. Notion was the popular answer around
        me, and Notion was the problem: its meeting notes land in the shared workspace where
        everyone can read them, and my week includes confidential calls and calls for other clients
        that have no business in a team wiki. A note-taker that publishes by default is a liability
        with a nice font. I wanted the recording on my disk, the transcript in my index, and
        nothing leaving the machine except the transcript text I deliberately send to Claude (my
        key, my call). And when something does go to the model, I wanted to own the instructions
        too: the prompts that shape the summaries, the action items, and the open questions are
        mine to read and rewrite, not a vendor's fixed idea of what a recap should be.
      </p>
      <p>
        So I built it native: tap the microphone and the system audio (Core Audio taps, so Teams,
        Zoom, Meet, and a conference talk in a browser tab all look identical), transcribe both
        channels on the Neural Engine while the meeting is still happening, work out who said what,
        and distill it all into summaries, action items, follow-up questions, and a searchable
        memory of everything I have heard. Then I spent three months discovering why nobody ships
        this as a weekend project.
      </p>
      <p>
        One early decision paid for itself the entire build: the app ships with a developer mode.
        Flip it on and the recorder starts explaining itself; an activity log appears in the
        sidebar, every transcript segment grows a debug row showing exactly why the deduplicator
        did or did not fire on it, the prompts going to Claude become editable in place, and a
        storage panel itemizes what the database, the recordings, and the backups actually cost on
        disk. My
        test environment was my own nine-o'clock standup, and you cannot re-run yesterday's meeting
        under a debugger. Most of the bugs in this story were found because the app could show its
        work.
      </p>

      <h2>Why native, and not Electron or Tauri</h2>

      <Soapbox variant="aside" label="Hot take" signoff="and yes, Tauri counts">
        <p>Cross-platform frameworks make easy apps portable. They do not make hard apps easy, and the hard eighty percent of this app does not speak JavaScript.</p>
      </Soapbox>

      <p>
        The framework debate evaporated the moment I listed what the app actually does.
        System-audio capture is Core Audio taps. On-device transcription is CoreML on the Neural
        Engine, by way of WhisperKit and FluidAudio. Diarization is the same story. None of that is
        reachable from a webview; in Electron (or Tauri, if you prefer your web apps wrapped in
        Rust) I would have written the entire audio and ML engine as a native helper anyway, then
        spent my evenings shuttling buffers across an IPC boundary so a bundled browser could draw
        a list.
      </p>
      <p>
        The second reason is residency. A meeting recorder runs all day, every day, beside the
        calls it is recording; it does not get to spike the fans or squat on half a gigabyte of
        memory the way a tool you open twice a week might. Swift, SwiftUI, and the Neural Engine
        keep live transcription cheap enough that you forget it is running, and that is the entire
        bar for this kind of software: you should forget it is running.
      </p>
      <p>
        Native had costs and I paid them. Swift 6 strict concurrency catches most data races at
        compile time; the one that got through (a closure capturing the same locals a function had
        taken as <code>inout</code>) crashed the app at launch, before I could even reach the logs,
        and took dsym-and-dwarfdump archaeology on a release build to pin down. I would still make
        the same trade.
      </p>

      <h2>Everyone says everything twice</h2>
      <p>
        The first long transcript I read back had a stutter. Every line from the far side of the
        call appeared twice: one crisp, one slightly wrong, a beat later. I assumed the
        transcriber was broken. The bug was physics: the other side of the call comes out of your
        speakers and goes straight back in through your microphone, so recording both channels
        means transcribing everyone twice.
      </p>
      <p>
        The naive fix (drop mic segments whose text matches a system segment) caught approximately
        nothing, because two transcription passes never spell anything the same way. The same
        engine that spent a week transcribing my boss Erin as "Aaron", with her name boosted in the
        custom vocabulary at maximum weight, was never going to hand me byte-identical duplicates.
        What finally worked was fuzzy text matching with a time gate, and the real discovery was
        which half did the work. Similarity finds the candidates, but time is what makes deleting
        words safe: people repeat themselves on purpose constantly, and matching on text alone was
        erasing real speech. The echo always arrives within seconds. Time was the strongest
        feature.
      </p>
      <Callout variant="note" title="Under the hood">
        Segments match when their character-bigram overlap (a Dice coefficient) clears 0.45 and
        their midpoints land within fifteen seconds; the mic copy may trail the system copy by up
        to eight seconds (room echo plus transcription lag) and lead it by two (timestamp jitter).
        The system copy wins every time; the tap is the cleaner signal. None of these numbers came
        from theory: developer mode renders gap, delay, and similarity under every mic segment with
        a pass or fail verdict, and the thresholds were read off those rows over weeks of real
        meetings.
      </Callout>

      <h2>A fast liar and a slow perfectionist</h2>
      <p>
        I assumed I needed one good transcription model. I actually needed two flawed ones, flawed
        in opposite directions. During the meeting, latency wins: a small streaming model keeps the
        words close enough to real time to read along, and you forgive its sins because they scroll
        past. After the meeting, accuracy wins: the recording goes back through a model thirty
        times the size, and that version quietly replaces the live one as the document of record.
      </p>
      <p>
        Re-transcribing an hour of audio is a long job on a machine that might sleep, restart, or
        get dragged into another meeting, so the job checkpoints its progress and resumes. My first
        version resumed automatically, which is how I invented a tiny perpetual-motion machine: a
        wedged job that woke on every launch, failed the same way, and queued itself again. Failed
        jobs now sit and wait for a human to click Retry; some decisions should cost a click.
        Whisper also hallucinates politeness in dead air (it famously hears "Thank you." in
        silence), so quiet chunks are skipped and the known ghost phrases are filtered out.
      </p>
      <Callout variant="note" title="Under the hood">
        Live transcription is Parakeet, a 0.6-billion-parameter streaming model on the Neural
        Engine. The archival pass is Whisper large-v3-turbo, a 1.5 GB download that re-transcribes
        both channels, then re-runs the AI analysis and rebuilds the search index, because every
        downstream artifact was derived from the worse transcript. Progress lands in a JSON sidecar
        every five chunks, so a crash resumes instead of restarting.
      </Callout>

      <h2>Audio is the receipt; words are the asset</h2>
      <p>
        An hour of raw audio is a gigabyte-class problem; an hour of transcript is a rounding
        error. I never had to guess where optimizing would pay: the developer pane's storage
        breakdown made it embarrassing, recordings dwarfing the database and everything else on
        disk combined. That asymmetry ended up shaping the whole storage story: compress the audio hard,
        finalize it in small pieces while the meeting runs, and split retention in two, because the
        transcript is what you will actually search next quarter. The audio just proves it
        happened.
      </p>
      <Callout variant="tip" title="The arithmetic">
        Speech compresses to mono AAC at roughly 32 kbps: about fifteen megabytes per hour, written
        as a series of small files finalized as the meeting runs, so a crash costs seconds of audio
        rather than the meeting. Audio can purge after a configurable number of days; transcripts
        are kept forever.
      </Callout>

      <h2>Every bug fix ships with a janitor</h2>
      <p>
        My favourite discovery was about a bug I had already fixed. A deletion bug left orphaned
        search embeddings behind; I fixed it and felt good for about a day, until search quoted a
        deleted meeting back at me. Fixing the bug had stopped new damage. The old damage was still
        sitting in the database, haunting the index.
      </p>
      <p>
        So the app now runs a maintenance pass at launch (throttled to once a day): delete
        orphans, clear zombie "analyzing" flags from meetings that died mid-flight, backfill fields
        that older versions never wrote, wrap legacy records in the shapes newer features expect.
        Once that habit exists, every fix comes with the same two questions: what did this leave
        behind, and who cleans it up? The answer cannot be me: every install is a production
        database I will never get to log into.
      </p>

      <h2>The laptop is not a server</h2>
      <p>
        Everything heavy (re-transcription, AI analysis, re-indexing) flows through one background
        queue with one worker, which sounds timid until you remember what that queue shares the
        machine with. The moment a new recording starts, the queue parks its job mid-stride
        (checkpoint kept) and hands the Neural Engine back to the live call, picking up again when
        the meeting ends. It also refuses to start without a gigabyte of free disk, because the
        only thing worse than a slow background job is a full disk during a live interview.
      </p>
      <PullQuote cite="Matthew Purdon">
        On a server you fight for throughput; on a laptop you yield. The user's meeting is the
        high-priority workload, always.
      </PullQuote>

      <h2>Summaries all the way down, again</h2>
      <p>
        Claude reads every transcript twice: a rolling pass during the meeting (the summary so far,
        action items paired with the exact quote that produced them, follow-up questions that are
        genuine blockers rather than paraphrases) and a cleanup pass at the end. The plumbing
        lesson was old news: never trust a model to return clean JSON. The parser clips to the
        outermost braces, salvages truncated responses, and falls back to the last good state
        rather than taking the meeting down with it.
      </p>
      <p>
        The retrieval lesson was personal. "Ask" searches every meeting I have ever recorded,
        blending keyword scoring with on-device embeddings. One evening I asked it what we had
        decided about a migration, and it answered with its own meeting summaries; the index had
        been quietly preferring the AI's compressions over the humans' words. I had written an
        entire article about exactly this failure and then built it into my own software. Only
        transcript segments are allowed to match a query now. And when the ranking still looked
        broken afterward, the fix was not in the math: what I spent a night treating as a bad blend
        weight turned out to be a half-empty embedding store. Missing data masquerades as bad
        ranking; check the data before you tune. (Also, Apple's NLEmbedding is not thread-safe.
        That one shipped, crashed in the wild, and now lives behind a lock.)
      </p>

      <h2>The interviewing half</h2>
      <p>
        Somewhere along the way the app grew a second identity: a structured interview tool. Phases
        with time boxes, rubrics with weighted sections, keyboard-first live notes, and AI scoring
        that grades each section with evidence quotes pulled from the transcript (and an honest F,
        with a reason, for anything the interview never covered). My judgement and the model's sit
        side by side on the scorecard, and they are allowed to disagree.
      </p>
      <p>
        I am leaving that half mostly untold on purpose. How the interview kit works, and what
        building it taught me about hiring engineers in the AI-assisted era, deserves its own piece;
        it is the next Field Note I want to write.
      </p>
      <Callout variant="note" title="Coming to Field Notes">
        Hiring in the AI-assisted engineering era: what changes when the candidate, the
        interviewer, and the scorecard all have a model in the loop. This page will link to it when
        it ships.
      </Callout>
    </>
  );
}

function TccBody() {
  return (
    <>
      <p>
        tcc started as a curiosity, not a plan. I wanted to see what pi was like: a deliberately
        small open-source coding agent that ships an agent loop, a terminal UI, and very little
        else. The experiment stopped being an experiment almost immediately, because the discovery
        underneath it was bigger than the tool: building your own harness is not a research
        project. It is a couple of evenings, it is genuinely fun, and the thing you end up with is
        fast in a way that makes the commercial harnesses feel like they are wading. tcc is that
        experiment grown up: pi underneath, AWS Bedrock as the model provider, and everything else
        taught through extensions: persistent memory, per-branch checkpoints, secret scanning,
        budget caps, a second model that reviews the first one's work before it lands, and a French
        butler who announces my errors. We will get to the butler.
      </p>
      <Soapbox variant="aside" label="Petty grievance" signoff="the butler stays, though">
        <p>April 1, Claude Code grows a tamagotchi. Eighteen species, rarity tiers, a SNARK stat... living in the tool I work in all day, and I didn't get a vote. It's cute! And it bugged me way out of proportion, because that's the deal with a vendor harness: you get the roadmap, the whims, and the pet. Own the harness and the only whimsy in it is whimsy you installed on purpose.</p>
      </Soapbox>

      <p>
        The practical pull was Bedrock: at work the road to Claude runs through AWS (corporate SSO,
        per-model inference profiles, a bill in list-price dollars), and a harness I own could be
        built for those rails natively. Beyond that, the day-one brief said developer experience
        was paramount, and most of what that meant in practice was borrowing shamelessly. tcc
        mirrors Claude Code wherever mirroring is free: the memory format matches exactly, so both
        harnesses share one brain per project; hooks use the same event names, so an existing hooks
        file mostly drops in; plugins and skills load from the marketplace repos my team already
        maintains. Anything pi could not actually support was dropped without ceremony.
      </p>
      <p>
        Three weeks and fifty-four commits later, the wrapper had twenty-five always-on extensions
        and opinions about everything from token throughput to notification etiquette. Almost
        everything interesting I learned came from one property of the corporate cloud: on Bedrock,
        waste is not an abstraction. Every retry, every overlong test log, every reviewer that
        hangs for ten minutes shows up as dollars and wall-clock time, attributed to you.
      </p>

      <h2>Why a wrapper, and not a fork</h2>

      <p>
        pi stays small by exposing seams instead of shipping features: an extension API that
        surfaces session start, every tool call, every turn end, and the tool results themselves.
        That last seam matters more than it sounds; half of tcc is built on the discovery that an
        extension can rewrite what the model sees before the model sees it. Everything tcc adds
        hangs off those events, which means everything is a TypeScript file I can read, and nothing
        is a patch I have to maintain against someone else's release schedule. The result feels
        less like a product than a dotfiles repo: the tool I live in, kept in version control and
        tuned a little every week.
      </p>
      <p>
        There is one yardstick every new feature gets weighed against: tcc is fast, and it has to
        stay that way. UI extensions are skipped entirely in headless mode, MCP servers do not boot
        until the first tool call needs them, and anything that would add latency to a turn has to
        argue for its life. A harness you wait for is a harness you stop using.
      </p>

      <h2>The reviewer that never came back</h2>
      <p>
        tcc's heaviest feature is a final-review command that fans the day's diff out to about ten
        specialist reviewers: correctness, the six Well-Architected pillars, code reuse,
        complexity. The first time I ran it on a real repo, some reviewers simply never came back.
        Bedrock throttles concurrency per inference profile, and a ten-way parallel fan-out
        reliably starved a few of its own children. Annoying, but at least it was honest about
        failing.
      </p>
      <p>
        The expensive version came later, courtesy of one stale model ARN in a config file. Every
        reviewer pointed at it failed silently and burned its entire ten-minute timeout doing so;
        nine subagents, ninety minutes of wall-clock time, zero findings. The fix has three layers.
        Fatal AWS errors (a missing profile, denied access, an expired token) now kill the call
        immediately instead of waiting out the clock, while throttling stays retryable, because
        throttling is weather and a missing ARN is a wrong address. The first fatal failure puts
        that model on a per-session blacklist, so the other nine calls return instantly. And the
        doctor command grew a deep mode that smoke-tests every configured ARN, because the cheapest
        place to discover a wrong address is before you send nine couriers to it.
      </p>
      <p>
        The reviewers also got a doctrine. A failed subagent retries once, quietly; if it fails
        again it is marked unavailable and the work continues, and the final report names the
        lenses that went missing rather than pretending to coverage it did not have. One reviewer
        dying should cost exactly one reviewer's findings; it took deliberate engineering to make
        that sentence true.
      </p>
      <Callout variant="note" title="Under the hood">
        Reviewers launch in waves of three or four to stay under Bedrock's per-profile concurrency
        throttle. The pass refuses to start with less than 60k tokens of context headroom and warns
        below 120k, because aggregating ten reports consumes 60–120k on its own. Transient errors
        get one retry after five seconds; if more than half the reviewers fail anyway, the report
        ships marked as partial, with the gaps listed.
      </Callout>

      <h2>Compaction amnesia</h2>
      <p>
        Deep into a long session one night, I watched tcc shell out to grep and ls like a tourist,
        ignoring the ripgrep-backed search tools I had built for it. My first theory was that
        compaction (the periodic summarizing that keeps a long conversation inside the context
        window) had somehow deleted the tools. It had not. The tool list was intact; what
        compaction had erased was the history of the tools being used. Every earlier turn where the
        custom search returned clean results had been squashed into a summary, and with no recent
        examples in front of it, the model reached for the tool it knew best from training data.
        Both options were on the menu. It just picked the familiar one.
      </p>
      <p>
        I tried, briefly, to fix this with prompting, and you can guess how that went. The fix that
        held was subtraction: at session start, if ripgrep and fd exist on the machine, the
        built-in grep and find tools are removed from the menu entirely (ls survives; it is
        harmless, and there is no better replacement for simply looking around). The lesson
        generalized further than I expected: a model's defaults are training-deep, and a harness
        shapes behaviour most reliably by editing the menu, not the request.
      </p>
      <PullQuote cite="Matthew Purdon">
        You cannot prompt away a model's habits. If you want it to pick the right tool, take the
        wrong one off the menu.
      </PullQuote>

      <h2>A colleague's suspiciously good numbers</h2>
      <p>
        A colleague showed up with a screenshot of a token-trimming tool claiming it had cut his
        usage by 54 percent, and my honest first reaction was that the number smelled fake. Digging
        in, the verdict was kinder and more useful: not fake, cherry-picked. The headline was
        dominated by one case, a 91.8 percent cut on Rust test output, which is real and also
        unsurprising (cargo test is famously operatic). Across a normal mixed workflow the honest
        expectation was ten to twenty percent. But that is the thing about Bedrock at list price:
        ten to twenty percent of a heavy session is real money, not a rounding error. The number
        was cherry-picked and the idea was right.
      </p>
      <p>
        I did not want a new dependency for it (my instinct was a unix filter; awk if it came to
        that), and then I found something better while reading pi's event types: the content of a
        tool result is writable. An extension can rewrite a command's output after the command runs
        and before the model reads it. So tcc now trims at the source. Test runners keep their
        setup lines and their failures-and-summary tail, because the middle of a green test run has
        never once been useful; verbose git logs and everything else get sensible caps, with a note
        saying how many lines were omitted and a hint to pipe through grep next time.
      </p>
      <Callout variant="tip" title="The arithmetic">
        Test runners keep the first 30 lines and the last 150; git log without --oneline stops at
        200; everything else caps at 500 with an "[N lines omitted]" marker. On a flat-fee
        subscription you never see what verbose output costs. On Bedrock it is a line item: a
        failing test run can be thousands of lines, and they get re-read on every turn that
        follows.
      </Callout>

      <h2>The token dies mid-sentence</h2>
      <p>
        Corporate SSO tokens expire on their own schedule, which is to say: mid-afternoon,
        mid-session, mid-thought. The failure arrived as a one-liner from the AWS SDK:{' '}
        <code>Value not present for clientId in SSO Token. Cannot refresh.</code> The diagnosis was
        a generation gap in AWS config formats; tokens minted through the legacy style carry no
        OAuth client registration, so the SDK has nothing to refresh with. Half the fix was a
        doctor warning that nags about the legacy format. The other half leaned on a small gift in
        pi's design: the hook that runs before each agent turn is awaitable. Every five minutes tcc
        quietly validates credentials, and when they have died it launches the SSO login and holds
        the turn until the browser dance completes. The model never sees the auth error. From its
        side of the conversation, the user just took a moment to reply.
      </p>

      <h2>A French butler in the terminal</h2>
      <p>
        An agent that works in long turns creates a babysitting problem: I want to walk away, and I
        want to know the moment it needs me. The obvious fix is notification sounds keyed by event
        (a question, a permission prompt, an error, a finished task), and the macOS defaults were
        too boring to live with. So tcc gives Claude a voice: the lines are generated once through
        a text-to-speech API, in a French accent, and now it is Claude himself saying
        "Pardonnez-moi, monsieur, j'ai une question" when he is blocked on me and "Oh là là!
        C'est une catastrophe!" when something dies.
      </p>
      <p>I REGRET NOTHING!!!</p>
      <p>
        The banners were the actual engineering story. The sound played; the notification never
        appeared; the scripting bridge returned a clean exit code while macOS silently discarded
        the banner. After a long detour through permission panes, the culprit turned out to be the
        terminal itself: on modern macOS a script's notification is attributed to whichever app
        launched it, and my terminal emulator had never been granted notification rights. Granting
        them surfaced the banner and revealed the second wrinkle: clicking it opened Script Editor,
        a hard limitation of the scripting route. The final fix was a small notifier utility with
        the sender mapped from the running terminal, so a click lands you back in the session that
        called for you.
      </p>
      <p>
        The last fix was etiquette. The butler originally announced a catastrophe for every failed
        shell command, and a coding agent fails shell commands all day as a normal part of working.
        Now the error line is reserved for the genuinely fatal (a blown budget, a dead login, a
        broken model), and quick turns finish in silence. A butler who announces everything
        announces nothing.
      </p>

      <h2>A shield between the agent and the wire</h2>
      <p>
        An agent reads files for a living, and sooner or later it reads the wrong one. A stray env
        file here, a deploy script with a hardcoded key there, and a credential is sitting in the
        conversation, one API call away from leaving the machine. tcc's last line of defence is a
        data-loss-prevention layer that inspects every tool call before it executes: eleven
        built-in patterns covering AWS access keys, three flavours of GitHub token, live Stripe
        keys, Slack tokens, private-key headers, and the API keys of the model vendors themselves.
        A match can be allowed, blocked, or held for review; review shows a redacted snippet (the
        first four characters, an ellipsis, the last four) and asks me to decide, and every event
        lands in an audit log.
      </p>
      <p>
        The architecture is borrowed with admiration from node9-proxy: rules group into shields,
        shields are plain JSON, and a directory of user shields means a new policy is a file drop,
        not a release. The epilogue is my favourite part. Days after it shipped, my own cleanup
        command (four parallel review agents that hunt for waste in whatever changed) flagged that
        the eleven patterns were being recompiled on every single tool call, and the regexes moved
        behind a cache. The harness reviews the harness now.
      </p>
      <Callout variant="note" title="Why not just node9-proxy?">
        Fair question, since the shield format is lifted from it. A proxy inspects traffic at the
        network edge, which is after the secret has already landed in the conversation; block
        there and the leak is contained, not prevented, and the context holding it gets re-sent
        on every turn that follows. Inside the harness the same rules fire before the tool call
        runs, so the secret never enters the context at all, and a hold can pause the turn and
        actually ask me. It also keeps the dependency count honest: a proxy is infrastructure to
        deploy and keep running; an extension is one more TypeScript file in the repo.
      </Callout>
      <p>
        When I quit for the day, tcc prints one line on the way out:{' '}
        <code>session: 42 turns · 34m · $1.83</code>. That line is the whole philosophy of the
        project: the work, the time, and the bill, visible, owned, and small enough to read at a
        glance.
      </p>
    </>
  );
}

function DsBody() {
  return (
    <>
      <p>
        This is the recursive entry: the Lab page about the site the Lab lives on. The site went
        from git init to roughly what you are reading in three days in June, and the three days
        are honestly the least interesting number on the page.
      </p>
      <p>
        The interesting part is that almost nothing here started from a blank file. The look was
        distilled from a shortlist of sites I admire. The voice was mined out of five hundred of
        my own Teams messages. The structure of every page is an argument from my first Field
        Note, applied to the site that published it. What follows is the long version of all
        three.
      </p>

      <h2>A design system with no design phase</h2>
      <p>
        This project started as a bookmarks folder, not a brief. The State of AI 2026 report:
        IBM Plex Mono on warm charcoal, one big amber number leading every section. My coworker
        Teancum's{' '}
        <a href="https://besendorfer.com" target="_blank" rel="noopener noreferrer">besendorfer.com</a>:
        quiet, completely deliberate, and it has a live status dot I am still jealous of. A few
        others I kept coming back to. I knew the feel I wanted; what stood between me and having
        it was the part I dreaded (moodboards, font pairings, three weeks of self-doubt in
        Figma).
      </p>
      <p>
        So I skipped the brief and went straight to the evidence. The State of AI report was the
        closest match to the voice I wanted, so I pointed Claude at the live site and asked it to
        formalize what I admired: read the colors out of the live styles, measure the spacing
        instead of eyeballing it, rebuild the result as a real monorepo. An afternoon later I had
        a token layer, twenty-five React components, a shadcn-style CLI, and a Storybook, and the
        tokens file is honest about its parentage ("extracted directly from the live site's
        inline styles and compiled stylesheet").
      </p>
      <p>
        Measuring mattered more than I expected. Inspiration usually degrades on the way from
        the eye to the stylesheet; you rebuild what you admired from memory and end up with a
        copy of a copy, neither yours nor theirs. Starting from true values left all my
        attention for the parts that are mine: what to keep, what to drop, what to build on top.
        Most of what this page actually looks like (the serif, the red, the leaf, the Soapbox)
        appears in none of the sources. We will get there.
      </p>
      <Callout variant="note" title="Under the hood">
        135 CSS custom properties in the token layer (color, type, spacing, radii, shadows,
        motion). 25 components across forms, overlays, navigation, and data viz, about 4,700
        lines of TSX. A ds-ui CLI in the shadcn style (init / add / list / diff) and a dark-themed
        Storybook 8, all in a pnpm-plus-Turborepo monorepo built on June 2, a week before this
        site existed.
      </Callout>

      <h2>The spec's real audience is an agent</h2>
      <p>
        Here is the part I find genuinely new: the monorepo never gets imported. This site does
        not install the design system as a package; there is no node_modules path from one to the
        other. Instead I mounted the monorepo read-only into a Claude session and had it
        reverse-engineer the code back into prose: a README that reads like a brand book, with
        the whole identity compressed into one line ("set type in IBM Plex Mono, paint on warm
        charcoal #242220, lead with one big amber number, and keep corners crisp"); a SKILL.md
        wrapper so the system loads straight into Claude Code as a skill; and one self-contained
        bundle that hangs forty-four components on a window namespace.
      </p>
      <p>
        Follow the chain: a website was turned into code, the code was turned into a document,
        and the document was turned into this website. The middle step looks backwards until you
        ask who a design system is for now. Mine has exactly one consumer, and it was never going
        to be a developer reading Storybook; it is an agent holding a spec. Components encode
        what things look like. The README encodes taste: when the inverted cream section is
        allowed, why corners stay crisp, what the uppercase mono eyebrow is for. Hand that to a
        model and ask for a page that does not exist yet, and it comes back on brand. I stopped
        maintaining a component library and started maintaining a description of one, and the
        description turned out to be the more valuable artifact.
      </p>
      <PullQuote cite="Matthew Purdon">
        The components used to be the product and the documentation was the chore. With an agent
        in the loop it flips: the document is the design system.
      </PullQuote>

      <h2>A report can't hold a rant</h2>
      <Soapbox variant="aside" label="Hot take" title="Lorem ipsum is a noob move" signoff="content is the whole job">
        <p>Every demo screen in the system is populated with realistic content, because whenever I see lorem ipsum now I think it's a noob move. LLMs can generate plausible fake data so easily it's dumb to force a layout to hold something generic and meaningless. Fake latin hides every real problem: the headline that wraps badly, the table that breaks at real widths, the card that only works when the title is short. you know what never says lorem ipsum? a shipped page.</p>
      </Soapbox>
      <p>
        The foundation I started from was tailored for a data desk: third person, impersonal
        ("76% of respondents report daily use"), allergic to opinion. I am a guy with opinions,
        and a personal site that cannot hold a rant is a brochure. So the blog layer extends the
        system rather than replacing it. IBM Plex Serif for article bodies (all-mono is tiring
        at article length, and Plex Serif shares the mono's metrics so the pairing looks
        intentional). A Canada-red co-brand, warmed a few degrees so it harmonises with amber
        instead of fighting it. A maple leaf drawn from scratch; there was no Canadian identity
        in the sources, so this part is all mine. And the magazine devices: drop caps, pull
        quotes with the oversized quotation mark, callouts in four flavours, and the one I am
        proudest of, the Soapbox.
      </p>
      <p>
        The Soapbox is borrowed in spirit from Fluent Python, the only technical book I know that
        gives the author a formal place to step off the material and editorialize. Here it is a
        titled, red-edged box with a faint maple leaf in the corner, and it has rules. It comes
        in three sizes (a full-width section, an inline block, and an aside that floats into the
        right margin on wide screens, like the one beside this paragraph), and at the end of an
        article it ships folded: collapsed to its title, pulsing gently, opening only if you ask.
        The rant is opt-in; the prose stays calm. Keeping those two registers honestly separated
        turned out to need a document of its own.
      </p>

      <h2>Five hundred messages of me</h2>
      <p>
        The site could look like a magazine and still read like a model. Early drafts had exactly
        that problem: grammatically perfect, structurally sound, and written by nobody in
        particular. The obvious fix (telling the model "write like me") is useless, because I am
        the least qualified person alive to describe how I write. Nobody hears their own accent.
      </p>
      <p>
        So I had it read the evidence instead. In a Cowork session with the Teams connector, I
        had Claude search my sent messages (mine only, filtered to me as the sender), paginate
        until it held about 250 of them, and analyze the corpus like a linguist: sentence rhythm,
        punctuation tells, signature lexicon, hyperbole patterns, how I praise, how I push back.
        Then the step that made it real: a second, independent sample of 250 messages from six
        weeks earlier, so the guide would not be (in the prompt's words) a local maximum of one
        week's mood. The two samples matched almost exactly. I am, apparently, extremely
        consistent, for better or worse.
      </p>
      <Callout variant="note" title="The output: my voice, one paragraph">
        "Matthew's written voice is conversational and unfiltered: fast, blunt, lowercase, and
        allergic to ceremony. He's a senior engineer/leader who compresses strong opinions into
        short bursts, swings between deadpan one-word dismissals ('brutal', 'rediculous') and
        ALL-CAPS exasperation ('WHAT ARE WE DOING?!?!?!?'), and softens the bluntness with
        self-aware humor, teasing, and genuine warmth toward people doing good work. He is, in
        his own words, 'prone to extremes so flipping tables is not unexpected.' He never
        performs politeness he doesn't feel, and he never pads."
      </Callout>
      <p>
        The guide has rules I did not expect to need. Accidental typos are not style ("jsut" is
        fast typing; "prolly" is the fingerprint, and only one of them belongs in the guide).
        Every coworker name is scrubbed to a placeholder so the file is safe to share. Every
        claim has to be backable by a quoted message, which means the guide describes how I type
        and refuses to speculate about how I sound in a meeting. And it governs this site
        mechanically now: article prose gets the tight register, and the loose Teams voice (the
        "yeah", the " ... " pause, the "brutal") is only allowed inside a Soapbox. The two
        registers you have been reading on this page are not an accident; they are policy.
      </p>
      <p>
        The prompt is public and reusable:{' '}
        <a href="https://gist.github.com/mpurdon/46fe27a1abc046bc5f41d739870c8638" target="_blank" rel="noopener noreferrer">
          Find Your Voice
        </a>
        . Bring your own messages. The optional last step asks the model to hold up a mirror and
        tell you, honestly, how your style lands with the people who receive it. Do not skip
        that step; it is the best part.
      </p>

      <Soapbox label="Hot take" title="Specs were training wheels" signoff="taste is the job now">
        <p>A year ago I would have told you the spec was everything. Detailed requirements, acceptance criteria, the works ... the models needed the rails, because any gap you left, they filled with something dumb. Then somewhere in the last six months that quietly stopped being true, and a lot of people haven't noticed. The models got good enough that the spec is no longer the bottleneck. What made the difference on this site wasn't describing the thing precisely; it was handing the model everything: the live site to measure, the monorepo to read, the voice guide, the article with the argument in it. Resources, not requirements. Give it the raw material and let it take a real first pass.</p>
        <p>Then the actual job starts, which is iterating. The first pass is never right; it's just real enough to react to. I look at it and something feels off ... the spacing is too tight, the rant reads fake, the red fights the amber ... and half the time I couldn't have told you the rule before I saw it broken. That's the part I bring. The model does volume; I do "warmer", "tighter", "that's not me". You can't spec what feels good, because you don't know what feels good until it's in front of you, you know? Taste doesn't go in the prompt. Taste is the loop.</p>
      </Soapbox>

      <h2>Glance, brief, full</h2>
      <p>
        My first Field Note,{' '}
        <a href="/notes/summaries-all-the-way-down">Summaries all the way down</a>, argues that
        the deadliest failure in how organizations communicate is the compression chain: every
        summary of a summary drops the caveat first, and the fix is not better summaries but
        layered ones (a ten-second glance, a two-minute brief, and the full detail attached,
        always). The awkward thing about publishing an argument is that your own site has to
        survive being measured against it.
      </p>
      <p>
        So the content model encodes the three layers structurally. Every Lab project is a
        tagline you can read on the index card (the glance), a lead and a metadata strip at the
        top of its page (the brief), and the long story underneath (the full). Field Notes do it
        with the dek, the callouts, and the prose. Nothing on this site is a summary of something
        you cannot reach; the deeper layer is always attached, one click or one scroll away,
        written once at the source instead of regenerated downstream.
      </p>
      <Callout variant="takeaway" title="The house rule">
        Everything ships in three depths: a glance (the card), a brief (the lead and the
        metadata), and the full story, attached. If a layer cannot be traced down to the layer
        below it, it does not ship. The site has to practice what the first article preaches,
        because readers would (correctly) check.
      </Callout>
      <p>
        Which makes this page the full layer of an entry about the system of layers, drafted by
        an agent reading a guide to my voice, styled by a design system that exists as a document
        an agent can read. The card you clicked was the glance. You just finished the full.
      </p>
    </>
  );
}

export const PROJECT_BODIES = {
  'grey-eminence': GreyEminenceBody,
  'tcc': TccBody,
  'matthewpurdon-design-system': DsBody,
};
