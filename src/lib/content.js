import { getCollection } from 'astro:content';

// Hand-curated display order (newest-first) — matches the former data.js arrays
// so the homepage "Recent" and the notes index render identically. New entries
// not listed here sort to the end.
const NOTE_ORDER = [
  'what-was-the-review-ever-for',
  'scarcity-was-the-feature',
  'postman-was-a-workaround',
  'punish-your-way-to-a-great-culture',
  'what-is-a-principal-engineer',
  'interviewing-the-ai-assisted-engineer',
  'judgement-is-the-job-now',
  'build-the-model-a-map',
  'summaries-all-the-way-down',
];
const PROJECT_ORDER = [
  'cora', 'grey-eminence', 'tcc', 'mcp-servers', 'evalu8',
  'matthewpurdon-design-system', 'technical-evolution-proposals',
];
const rank = (order) => (slug) => { const i = order.indexOf(slug); return i < 0 ? 999 : i; };

// Field Note issue number = chronological rank (oldest = 01), independent of display order.
// Unlisted notes are excluded everywhere by default; pass includeUnlisted for the
// routes that must still build the page itself (the note route and its OG card).
export async function getNotes({ includeUnlisted = false } = {}) {
  const all = await getCollection('notes');
  const entries = includeUnlisted ? all : all.filter((e) => !e.data.unlisted);
  const byDate = [...all].sort(
    (a, b) => new Date(a.data.dateLong || a.data.date) - new Date(b.data.dateLong || b.data.date)
  );
  const numberOf = (id) => String(byDate.findIndex((e) => e.id === id) + 1).padStart(2, '0');
  const r = rank(NOTE_ORDER);
  return entries
    .map((e) => ({ slug: e.id, number: numberOf(e.id), ...e.data }))
    .sort((a, b) => r(a.slug) - r(b.slug));
}
export async function getProjects() {
  const entries = await getCollection('lab');
  const r = rank(PROJECT_ORDER);
  return entries.map((e) => ({ slug: e.id, ...e.data })).sort((a, b) => r(a.slug) - r(b.slug));
}
