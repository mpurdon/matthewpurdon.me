# CLAUDE.md

## Writing article content (Field Notes and Lab reports)

Before drafting or editing anything in `src/content/notes/` or `src/content/lab/`,
read `writing-without-ai-fingerprints-style-guide.md` at the repo root. It is
binding for all prose on this site. The operational core:

- Matthew owns the argument; it develops in conversation (fragments, decisions,
  reactions) before anything gets drafted. AI may write the first draft in his
  voice from that material, but must run the guide's fingerprint checklist and
  Final Humanization Pass on its own output BEFORE showing it — his revision
  rounds are for taste and argument, not for catching known tells. His hand
  edits to the file are canon; never revert them. When editing prose he wrote,
  act as a skeptical editor: prefer cuts and questions over replacement prose.
- No structural announcements ("Now the two halves meet", "There is one more
  thing...", "This brings us to..."). If the structure works, the reader feels it
  without being told.
- Ration mic-drop endings. One genuinely strong closer per piece, where it
  matters most; other sections end plainly (a fact, a consequence, a question,
  a concession).
- Rewrite most "It is not X. It is Y." reversals as direct statements.
- Let some paragraphs simply explain. Not every anecdote has to prove the thesis;
  for every three argumentative paragraphs, allow one that is informational.
- Uneven lists over complete ones: rank items, emphasize one or two, admit the
  list is incomplete. Cut items included only for symmetry.
- Preserve awkward specificity (exact tools, mistakes, unflattering details) and
  real uncertainty. Scope the strongest claims instead of universalizing them.
- No importance markers: "Crucially", "Importantly", "It is worth noting",
  "The key insight". Put the weight in the fact itself.
- Vary cadence. Few standalone fragments, few one-line paragraphs, sparse em
  dashes. If a rhythm repeats three times, rewrite one occurrence.
- After any AI edit, restore phrases that sound unmistakably like Matthew.
- Before calling a draft done, run the guide's "Final Humanization Pass"
  (cut / add / check lists at the bottom of the guide).

Banned phrases and voice-register details accumulate in Matthew's session memory
guides; when in doubt about a phrase, ask rather than assume.

## Site facts

- Content is one `.mdx` per entry; the filename is the slug. Frontmatter is
  Zod-validated by `src/content.config.ts`.
- Display order is hand-curated in `NOTE_ORDER` / `PROJECT_ORDER` in
  `src/lib/content.js`. Topic pages generate only for keys in `TOPICS`
  (`src/data.js`) — every tag on a note must exist there.
- Article body convention: "The glance" takeaway callout first, folded Soapbox
  last, floating asides placed paragraph → aside → paragraph and expanding one
  quoted thought (never restating the adjacent paragraph).
- Deploy is push-to-main → GitHub Actions → Cloudflare Pages. `npm run build`
  locally to verify before pushing.
- `writing-log.md` tracks per-article production stats; add a section when a
  piece ships.
