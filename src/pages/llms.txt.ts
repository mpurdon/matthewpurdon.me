/* /llms.txt — a curated, agent-readable map of the site, per the llmstxt.org
   convention: an H1 name, a blockquote summary, then link sections with a
   one-line gloss each. Generated from the content collections (like the
   sitemap) so it never drifts from what's actually published. */
import { getNotes, getProjects } from '../lib/content.js';
import { PROFILE, SITE_URL } from '../data.js';

export async function GET() {
  const notes = await getNotes();
  const projects = await getProjects();

  const noteLines = notes
    .map((p) => `- [${p.title}](${SITE_URL}/notes/${p.slug}/): ${p.dek}`)
    .join('\n');
  const labLines = projects
    .map((pr) => `- [${pr.name}](${SITE_URL}/lab/${pr.slug}/): ${pr.tagline}`)
    .join('\n');

  const body = `# Matthew Purdon

> ${PROFILE.tagline}

${PROFILE.bio}

This site has two parts. **Field Notes** are opinion and craft — where the
software-development lifecycle is heading as models move inside it. **Lab
Reports** are war stories: what I built, how, and the arithmetic behind it.

## Field Notes
${noteLines}

## Lab Reports
${labLines}

## About
- [About Matthew Purdon](${SITE_URL}/about/): Who I am and what I think about.
- [The scenic route](${SITE_URL}/story/): The long-form origin story.
- [RSS feed](${SITE_URL}/feed.xml): Subscribe to new Field Notes.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
