/* RSS 2.0 feed at /feed.xml, built from the notes collection via @astrojs/rss.
   Replaces scripts/generate-feed.mjs. Field Notes only, newest-first. */
import rss from '@astrojs/rss';
import { getNotes } from '../lib/content.js';
import { PROFILE, SITE_URL } from '../data.js';

export async function GET(context) {
  const posts = [...(await getNotes())].sort(
    (a, b) => new Date(b.dateLong || b.date) - new Date(a.dateLong || a.date)
  );
  return rss({
    title: 'Matthew Purdon — Field Notes',
    description: PROFILE.tagline,
    site: context.site,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData:
      `<language>en-ca</language>` +
      `<atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
    items: posts.map((p) => ({
      title: p.title,
      link: `/notes/${p.slug}/`,
      pubDate: new Date(p.dateLong || p.date),
      description: p.dek,
      categories: [p.category],
    })),
  });
}
