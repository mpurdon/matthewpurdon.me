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
