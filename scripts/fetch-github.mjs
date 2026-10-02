// Snapshot public GitHub activity into src/lib/github.json at build time.
// The site ships zero JS, so the Lab's GitHub panel reads "as of the last
// deploy". If the fetch fails (no token, offline, rate limit) the committed
// snapshot is left alone and the build carries on with it.
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const LOGIN = 'mpurdon';
const OUT = new URL('../src/lib/github.json', import.meta.url);

function token() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try { return execSync('gh auth token', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); }
  catch { return null; }
}

const QUERY = `query($login: String!) {
  user(login: $login) {
    createdAt
    followers { totalCount }
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC, orderBy: { field: PUSHED_AT, direction: DESC }) {
      totalCount
      nodes {
        name description url pushedAt stargazerCount
        primaryLanguage { name color }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) { edges { size node { name color } } }
      }
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

function streaks(days) {
  let longest = 0, run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  // Current streak counts back from today; an empty today doesn't break it yet.
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else if (i !== days.length - 1) break;
  }
  return { longest, current };
}

async function main() {
  const t = token();
  if (!t) return console.warn('[github] no token; keeping existing snapshot');

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${t}`, 'Content-Type': 'application/json', 'User-Agent': 'matthewpurdon.me' },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors || json));
  const u = json.data.user;
  const repos = u.repositories.nodes;

  const langBytes = new Map();
  for (const r of repos) {
    for (const e of r.languages.edges) {
      const cur = langBytes.get(e.node.name) || { name: e.node.name, color: e.node.color, bytes: 0 };
      cur.bytes += e.size;
      langBytes.set(e.node.name, cur);
    }
  }
  const totalBytes = [...langBytes.values()].reduce((s, l) => s + l.bytes, 0) || 1;
  const languages = [...langBytes.values()]
    .sort((a, b) => b.bytes - a.bytes)
    .map(l => ({ name: l.name, color: l.color, pct: +(100 * l.bytes / totalBytes).toFixed(1) }));

  const days = u.contributionsCollection.contributionCalendar.weeks
    .flatMap(w => w.contributionDays)
    .map(d => ({ date: d.date, count: d.contributionCount }));

  const pick = r => ({
    name: r.name, description: r.description, url: r.url, pushedAt: r.pushedAt,
    stars: r.stargazerCount, language: r.primaryLanguage?.name ?? null, color: r.primaryLanguage?.color ?? null,
  });

  const snapshot = {
    login: LOGIN,
    fetchedAt: new Date().toISOString(),
    since: u.createdAt.slice(0, 4),
    followers: u.followers.totalCount,
    repos: u.repositories.totalCount,
    stars: repos.reduce((s, r) => s + r.stargazerCount, 0),
    contributions: u.contributionsCollection.contributionCalendar.totalContributions,
    streak: streaks(days),
    languages,
    recent: repos.slice(0, 6).map(pick),
    starred: [...repos].sort((a, b) => b.stargazerCount - a.stargazerCount).filter(r => r.stargazerCount > 0).slice(0, 5).map(pick),
    days,
  };
  writeFileSync(OUT, JSON.stringify(snapshot, null, 2) + '\n');
  console.log(`[github] snapshot: ${snapshot.repos} repos, ${snapshot.contributions} contributions`);
}

main().catch(err => console.warn('[github] fetch failed; keeping existing snapshot:', err.message));
