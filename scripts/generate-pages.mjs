/* Prerenders a static HTML shell per route into dist/ with route-specific
   title, description, canonical, Open Graph, and JSON-LD — so every page is
   indexable with correct metadata before any JS runs. Also writes sitemap.xml.
   Runs as part of `npm run build`, after vite build and the feed. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname as dirOf } from 'node:path';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { POSTS, PROJECTS, TOPICS, PROFILE, SITE_URL, AVATAR } from '../src/data.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const template = readFileSync(resolve(root, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const iso = (d) => new Date(d).toISOString().slice(0, 10);

const PERSON = { '@type': 'Person', name: 'Matthew Purdon', url: SITE_URL + '/' };

function breadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, url], i) => ({
      '@type': 'ListItem', position: i + 1, name, item: SITE_URL + url,
    })),
  };
}

function renderPage({ path, title, description, ogType = 'website', jsonLd = [], extraMeta = '' }) {
  const url = SITE_URL + path;
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${esc(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${url}$2`)
    .replace(/(<meta property="og:type" content=")[^"]*(" \/>)/, `$1${ogType}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(" \/>)/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(" \/>)/, `$1${esc(description)}$2`);
  const blocks = jsonLd.map((o) => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`).join('\n');
  if (blocks || extraMeta) html = html.replace('</head>', `${extraMeta}${blocks}\n</head>`);
  // Flat <path>.html (not <path>/index.html): Cloudflare Pages serves it at
  // the clean slash-less URL with a 200, matching canonicals/sitemap exactly.
  const file = resolve(root, '.' + decodeURIComponent(path) + '.html');
  mkdirSync(dirOf(file), { recursive: true });
  writeFileSync(file, html);
  return url;
}

const urls = [{ loc: SITE_URL + '/' }];

// Section indexes
urls.push({ loc: renderPage({
  path: '/notes',
  title: 'Field Notes — Matthew Purdon',
  description: 'Notes on AI-assisted engineering, the new SDLC, and how teams really ship. Half thinking out loud, half field notes from real teams.',
}) });
urls.push({ loc: renderPage({
  path: '/lab',
  title: 'Lab — Matthew Purdon',
  description: 'Things Matthew Purdon has built — software and process. Native macOS apps, RFC formats, design systems, and the long tail of experiments.',
}) });
urls.push({ loc: renderPage({
  path: '/about',
  title: 'About — Matthew Purdon',
  description: 'Matthew Purdon is a principal software engineer in Toronto with 25 years of experience, writing about AI-assisted engineering and how teams actually ship.',
}) });

// Articles → BlogPosting + breadcrumbs + article OG tags
for (const p of POSTS) {
  const path = '/notes/' + p.slug;
  const date = iso(p.dateLong);
  const extraMeta = [
    `<meta property="article:published_time" content="${date}" />`,
    `<meta property="article:author" content="Matthew Purdon" />`,
    `<meta property="article:section" content="${esc(p.category)}" />`,
    ...p.tags.map((tag) => `<meta property="article:tag" content="${esc(tag)}" />`),
  ].join('\n') + '\n';
  urls.push({ loc: renderPage({
    path,
    title: p.title + ' — Matthew Purdon',
    description: p.dek,
    ogType: 'article',
    extraMeta,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.dek,
        url: SITE_URL + path,
        mainEntityOfPage: SITE_URL + path,
        datePublished: date,
        dateModified: date,
        author: PERSON,
        publisher: PERSON,
        image: AVATAR,
        articleSection: p.category,
        keywords: p.tags.join(', '),
        inLanguage: 'en',
      },
      breadcrumbs([['Home', '/'], ['Field Notes', '/notes'], [p.title, path]]),
    ],
  }), lastmod: date });
}

// Projects → SoftwareSourceCode / CreativeWork + breadcrumbs
for (const pr of PROJECTS) {
  const path = '/lab/' + pr.slug;
  const work = {
    '@context': 'https://schema.org',
    '@type': pr.type === 'Software' ? 'SoftwareSourceCode' : 'CreativeWork',
    name: pr.name,
    description: pr.tagline,
    url: SITE_URL + path,
    author: PERSON,
    inLanguage: 'en',
  };
  if (pr.type === 'Software' && pr.link.includes('github.com')) work.codeRepository = pr.link;
  urls.push({ loc: renderPage({
    path,
    title: pr.name + ' — Matthew Purdon · Lab',
    description: pr.tagline,
    jsonLd: [work, breadcrumbs([['Home', '/'], ['Lab', '/lab'], [pr.name, path]])],
  }) });
}

// Topic landings
for (const [name, info] of Object.entries(TOPICS)) {
  const path = '/topic/' + encodeURIComponent(name);
  urls.push({ loc: renderPage({
    path,
    title: '#' + name + ' — Matthew Purdon',
    description: info.blurb + ' Posts by Matthew Purdon.',
  }) });
}

// Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}\n  </url>`).join('\n')}
</urlset>
`;
writeFileSync(resolve(root, 'sitemap.xml'), sitemap);
console.log(`${urls.length - 1} pages prerendered, sitemap.xml written (${urls.length} URLs)`);
