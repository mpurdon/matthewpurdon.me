/* Generates dist/sitemap.xml from the posts, projects, and topics in src/data.js.
   Runs as part of `npm run build`, after astro build. */
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { POSTS, PROJECTS, TOPICS, SITE_URL } from '../src/data.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');

const urls = [
  { loc: SITE_URL + '/' },
  { loc: SITE_URL + '/notes' },
  { loc: SITE_URL + '/lab' },
  { loc: SITE_URL + '/about' },
  { loc: SITE_URL + '/story' },
];

const iso = (d) => new Date(d).toISOString().slice(0, 10);

// Articles
for (const p of POSTS) {
  urls.push({ loc: `${SITE_URL}/notes/${p.slug}`, lastmod: iso(p.dateLong) });
}

// Projects
for (const pr of PROJECTS) {
  urls.push({ loc: `${SITE_URL}/lab/${pr.slug}` });
}

// Topics
for (const name of Object.keys(TOPICS)) {
  urls.push({ loc: `${SITE_URL}/topic/${encodeURIComponent(name)}` });
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}\n  </url>`).join('\n')}
</urlset>
`;

writeFileSync(resolve(root, 'sitemap.xml'), sitemap);
console.log(`sitemap.xml written (${urls.length} URLs) → ${resolve(root, 'sitemap.xml')}`);
