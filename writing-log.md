# Writing log

Per-article production stats, for tracking how the sausage gets made.

## Scarcity was the feature — published 2026-07-15

- **Idea to published:** 2 sessions. Planning kickoff July 14 (~4pm): memory recap of the
  Canadian AI Capability Exchange thread, three scoping decisions (spine = mainframe
  scarcity merged with "the meter is back"; compute tension argued, later cut as a fake
  dichotomy; title). Writing day July 15: first draft rendered ~1:00pm, deployed ~8:30pm.
- **Active writing/revision time:** ~7.5 hours wall clock.
- **Revision rounds:** ~40 from Matthew after the first draft, plus ~6 direct hand edits
  in the file. Breakdown:
  - ~10 structural/content additions (coding-on-paper opening + Gates/Allen anecdote,
    Jonathan Blow hot take, TSX/Nvidia market-cap arithmetic, Grok privacy wall,
    tax-year + government-symmetry, minimum-wage floor, AgentCore marketplace + Crown
    data section, rights/social-benefit pivot, DeepSeek section replacing the dichotomy,
    soapbox rewrite)
  - ~8 paragraph-level rewrites (eval paragraph, procurement paragraph took three passes,
    pull quote, dichotomy teardown)
  - ~10 voice-enforcement rounds (four new banned phrases: "quiet work", "load-bearing",
    "What I keep coming back to", performed-"honest"; buddy purge; WASTED added to the
    lexicon)
  - ~12 line edits and placement moves
- **Size:** first draft 2,150 words in one pass; published at 3,744 words / 18 min after
  a dedup pass (five claims were paying rent twice).
- **Observation:** only ~5 of the 40 rounds were about what the article argues (the
  dichotomy cut, the rights pivot, "who are the vendors?"); those changed the piece more
  than the other 35 combined.
- **Shipped alongside:** Sovereign AI topic page, custom 404 (killed Cloudflare Pages
  soft-404), NOTE_ORDER top slot.

### Compression pass — 2026-07-21

- **Brief:** cut 15–20% without sanitizing the voice, make the capability section the
  centre, qualify the scarcity thesis, shorten the history and the Grok example.
- **Size:** 3,727 → 3,244 words (87%), 18 → 15 min. Net cut of original material is closer
  to 15%: one new ~95-word paragraph went in (badly designed meters produce queues and
  protect incumbents, which the piece had never conceded).
- **Blocks:** 32 edited, 2 added, 2 cut, 17 untouched. Removed the Unix/PDP-7 example and
  two structural announcements the fingerprints guide bans ("Hold that thought…", "Now the
  two halves of this essay meet"). The mainframe callback moved above the library-card
  close so the piece ends on "Small and metered is the thesis."
- **Fact check at release:** Nvidia's cap had moved past the drafted US$4.7T to just under
  US$5T, so the TSX comparison was restated; Grok's 370k indexed chats and DeepSeek's
  ~US$600B single-day Nvidia drop both held. DeepSeek's cost and hardware numbers are now
  explicitly hedged rather than asserted.
- **New banned phrase:** "the sharpest" as an evaluative superlative.
- **Tooling:** a throwaway `/review-scarcity` page rendered a word-level diff against HEAD
  in site typography (green inserts, red strikethrough, CSS-only toggle to hide deletions).
  Reviewing a compression pass needs to show what left, not what stayed. Deleted at release.

### Second compression pass — 2026-07-22

- **Brief:** another 8–12%, taken almost entirely as deletion. Qualify the scarcity thesis
  before the platform argument leans on it, shorten the historical runway, halve the Grok
  example, make the DeepSeek claims defensible, and end on the thesis lines.
- **Size:** 3,244 → 2,887 words (89%), 15 → 13 min.
- **Cut:** the Wirth/Jonathan Blow hot take and the Gates/Allen Altair callout — both good,
  both making a point the piece already made inline. Wozniak and time-sharing/virtualization
  carry the history alone now, and the Canadian argument arrives ~290 words sooner.
- **Moved:** the badly-metered-compute concession added last pass sat in the platform
  section, arriving after two sections had already relied on scarcity. It now closes "The
  meter is back" as "Scarcity by itself is not the feature, though. A well-designed meter
  is." Its old slot is gone, so the concession is made once.
- **Hedged further:** DeepSeek's causation is now labelled as interpretation ("my reading is
  that the constraint had something to do with it") rather than asserted.
- **Ending:** deleted the mainframe callback and the quota chiasmus. Two closers were
  stacked on top of the real one. The soapbox stays after the final lines per site
  convention, compressed from two paragraphs to three shorter ones.
- **Observation:** roughly a third of what came out was material I had added in the previous
  pass or written as a bridge between two things that did not need bridging. Compression
  finds its own leftovers.
- **Also shipped:** `.soap-fold` bodies now use prose leading and 1.2em paragraph gaps. The
  DS defaults are tuned for the narrow floating asides and read as a wall at full measure.

## Summaries all the way down — published 2026-04-10

Predates this log; the entry below covers a maintenance pass only.

### Fingerprint pass — 2026-08-12

- **Trigger:** Matthew reading the live article spotted "quietly leave the load-bearing
  sentence out" and asked why the fingerprint sweep had missed it. It had not: both words
  were flagged on 2026-07-15 during the scarcity rounds, and the going-forward-only policy
  left published instances alone. He lifted the policy for this piece because he shares it.
- **Edits:** 8, all tell removal, no argument changed.
  - Both "load-bearing" instances. The second one was also saying the same thing as the
    clause after it, so the sentence went rather than getting a synonym.
  - "and that is exactly what makes it instructive" — repeated the construction from two
    paragraphs earlier ("that is what makes the pattern dangerous"). Cut, not reworded;
    the observation lands harder without the meta-commentary.
  - "Notice what all of them have in common:" → "All of them keep the detail attached."
    Structural announcement plus the banned "Notice that…".
  - Two performed-"honest" instances ("The honest objection", "my first honest reaction").
  - One not-X-but-Y in the Forte callout, where the quote above it already carried the
    negative half.
  - A third consecutive paragraph-initial "And".
  - "It is C4 for prose." — a repeated thesis in slogan form, two paragraphs after the C4
    section had made the point at length.
- **Mic-drops:** the piece had six section closers. Removing two ("It is C4 for prose", the
  callout reversal) leaves the org-chart line, the tail line, the torn-pyramid line and the
  ending. Still more than the guide wants; the survivors are the good ones.
- **Observation:** the two banned words were the cheapest thing in the pass. What actually
  needed fixing was the density of closers and three places where a claim was made twice in
  adjacent sentences — neither of which a phrase list catches.

### Corpus "quietly" sweep — 2026-08-12

- **New rule:** "quietly" is allowed only when it describes actual manner ("I took the person
  aside and quietly explained that they can't do that"), never as the metaphorical
  unnoticed-shift intensifier. Recorded in the session memory guide.
- **Scope:** 16 occurrences across 10 articles. Removed 11, kept 4, all deletions — every one
  survived losing the adverb because the surrounding sentence was already doing the work
  ("with no note left on the counter to say so", "a lot of people haven't noticed").
- **Kept:** the tcc retry and credential-refresh lines (genuinely about not making noise),
  the Grok share button (concealment is the actual charge), and the builder in the judgement
  article who quietly understood the thing was not worth building — a person, privately.
- **Worst concentration:** three in the Postman note, which also tripped the
  don't-recycle-a-pet-phrase rule independently.
- **Also shipped:** `text-wrap: balance` on `.mp-prose h2` / `h3`. Article and Lab `<h1>`s,
  card titles and pull quotes already balanced; prose section headings were the last text on
  the site still wrapping greedily, which orphaned "forgot" onto its own line in "The old
  fixes knew something we forgot".

## What was the review ever for? — published 2026-08-19

- **Idea to published:** 3 sessions. Research August 16 (GiTF prompt-caching transcript mined
  out of the session JSONL, the codenaked Safari sequence reconstructed from git history and
  transcripts, Cora/Marrow provenance, Sam Newman's video transcribed and argued with).
  Matthew overruled the article-first plan mid-research — the Cora Lab story had to ship
  before a Field Note could lean on it — so the Lab report went out August 18. Draft and
  ship August 19: first render ~6:20pm, unlisted for feedback by ~6:30pm, published 10:30pm.
- **Revision rounds:** ~60 from Matthew, 22 commits on the article file. Weighted heavily
  toward the Soapbox, which took 11 consecutive rounds on its own.
- **Size:** first draft 3,819 words; published at 3,745 / 17 min. The compression pass
  I projected at ~350 words delivered 51 — the draft was already tight, and saying so
  would have been cheaper than the pass.
- **The register correction that shaped the piece:** the first draft stated a policy.
  Matthew: "I am not stating a policy in this article, I'm stating a sense of unease about
  the way forward. Were we ever right about what we thought PRs were doing." Every
  prescriptive sentence came out. The one that survived does so as a question.
- **Rubber-stamping constraint:** no anecdote, because he does not do it. What he has is the
  metric — average review time under three minutes — which is a stronger claim than a story
  and required rewriting the section around evidence he can point at rather than a scene.
- **Headings:** the first set were verbless labels ("The part I cannot specify"). A count of
  the corpus found 26 of 30 existing section headings make a claim with a verb; these were
  4 of 5 without one. Rewritten to "Three minutes is not a good time", "Sam is mostly right",
  "It ain't got no gas in it", "I would have said yes", "A dark factory of my own".
- **Sourcing:** the Chainguard paragraph was a hedge until Matthew's (wrong) hunch that it
  was an X post unblocked the search — their own engineering blog has the numbers, and what
  the second-hand summaries dropped turned out to be the part the article needed. The Faros
  figures got the study's actual name and a link. The GiTF verbatim was recovered by grepping
  the raw session JSONL rather than paraphrasing from memory.
- **Self-caught fingerprints:** a structural announcement ("Which brings me to the part of my
  own year I have been avoiding") and a three-beat negation with a fragment, both removed
  before Matthew saw the draft — which is what the checklist is for.
- **Shipped alongside:** an `unlisted` frontmatter flag (builds at its own URL, served
  noindex, absent from the feed, sitemap, llms.txt and every index) so the piece could
  circulate for feedback for four hours before it was really published; a `.ui-label` style
  in site.css for quoting an interface control without overloading code ticks; the Recent
  hero rotation; and a backlink from "Judgement is the job now", which had promised the
  fifty-file era its own write-up.
