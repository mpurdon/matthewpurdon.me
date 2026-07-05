/* Generates dist/feed.xml (RSS 2.0) from the posts in src/data.js.
   Runs as part of `npm run build`, after vite build. */
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { POSTS, PROFILE, SITE_URL } from '../src/data.js';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const posts = [...POSTS].sort((a, b) => new Date(b.dateLong) - new Date(a.dateLong));

const items = posts.map((p) => {
  const url = `${SITE_URL}/notes/${p.slug}/`;
  return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.dek)}</description>
      <category>${esc(p.category)}</category>
      <pubDate>${new Date(p.dateLong).toUTCString()}</pubDate>
    </item>`;
}).join('\n');

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Matthew Purdon — Field Notes</title>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${esc(PROFILE.tagline)}</description>
    <language>en-ca</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

const out = resolve(dirname(fileURLToPath(import.meta.url)), '../dist/feed.xml');
writeFileSync(out, feed);
console.log(`feed.xml written (${posts.length} items) → ${out}`);
