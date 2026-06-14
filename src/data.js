/* matthewpurdon.me — content layer.
   Real profile + links pulled from github.com/mpurdon. Posts and Lab entries are
   realistic, on-voice drafts Matthew can swap for the real thing. */

export const SITE_URL = 'https://matthewpurdon.me';

export const AVATAR = 'https://avatars.githubusercontent.com/u/132956?v=4';

export const PROFILE = {
  name: 'Matthew Purdon',
  role: 'Principal Software Engineer',
  // SEO-friendly, true-to-his-interests one-liner. Edit freely.
  tagline: 'Principal software engineer in Toronto. Twenty-five years building software — now writing about AI-assisted engineering, the new SDLC, and how teams actually ship.',
  location: 'Toronto, Canada',
  avatar: AVATAR,
  email: 'hello@matthewpurdon.me',
  links: {
    linkedin: 'https://www.linkedin.com/in/matthewdjpurdon',
    github: 'https://github.com/mpurdon',
    x: 'https://x.com/mpurdon',
    instagram: 'https://www.instagram.com/mdjpurdon/',
    site: 'https://purdonmoi.com/', // domain has no DNS records yet; re-add footer/about links when live

  },
};

// Topic registry — name → { blurb, accent }. Used by chips, topic pages, covers.
export const TOPICS = {
  'AI-Assisted Engineering': { blurb: 'Building software when a model is in the loop for every commit.', accent: 'amber' },
  'The New SDLC': { blurb: 'What the development lifecycle looks like once agents sit inside it.', accent: 'indigo' },
  'Product': { blurb: 'How the product role shifts when generation is cheap and judgement is scarce.', accent: 'teal' },
  'Hiring': { blurb: 'Interviewing and leveling engineers for the model era.', accent: 'canada' },
  'Teams & Process': { blurb: 'Field notes on how real teams reshape their habits — for better and worse.', accent: 'amber' },
  'Industry': { blurb: 'Where we have been, what is coming, and the news worth slowing down for.', accent: 'indigo' },
  'Opinion': { blurb: 'The soap-box archive. Read at your own risk.', accent: 'canada' },
  'Notes': { blurb: 'Short, dated, half-formed. Thinking out loud.', accent: 'teal' },
};

// Field Notes (the writing). Hand-written bodies live in article.jsx, keyed by slug.
export const POSTS = [
  {
    slug: 'judgement-is-the-job-now',
    title: 'Judgement is the job now',
    dek: 'Hand ten engineers the same model and the work comes back in two piles. AI removed the effort filter, and judgement is what is left. On taste, the dependency graph that wasn\'t, and the audit my vacation is about to run.',
    category: 'AI-Assisted Engineering', accent: 'indigo', featured: true,
    date: 'Jun 1, 2026', dateLong: 'June 1, 2026', time: '11 min read',
    tags: ['AI-Assisted Engineering', 'Hiring', 'Opinion'],
  },
  {
    slug: 'build-the-model-a-map',
    title: 'Build the model a map',
    dek: 'An agent will rediscover your whole database every session, and pay for it. The fix is not a better prompt; it is writing the map down. On indexes, stubs, skills, and the documentation your teammates never got.',
    category: 'AI-Assisted Engineering', accent: 'teal', featured: false,
    date: 'Jun 9, 2026', dateLong: 'June 9, 2026', time: '12 min read',
    tags: ['AI-Assisted Engineering', 'Teams & Process', 'Opinion'],
  },
  {
    slug: 'summaries-all-the-way-down',
    title: 'Summaries all the way down',
    dek: 'An engineer writes the truth. Four summaries later, an exec reads a guess. Field notes on the compression chain, and the layered artifact I build instead.',
    category: 'Teams & Process', accent: 'amber', featured: false,
    date: 'Apr 10, 2026', dateLong: 'April 10, 2026', time: '10 min read',
    tags: ['Teams & Process', 'AI-Assisted Engineering', 'Opinion'],
  },
];

// Field Note issue number shown on covers: chronological rank (oldest = 01),
// stable as new posts ship, regardless of display order.
const POSTS_BY_DATE = [...POSTS].sort((a, b) => new Date(a.dateLong || a.date) - new Date(b.dateLong || b.date));
export const postNumber = (post) => String(POSTS_BY_DATE.findIndex(p => p.slug === post.slug) + 1).padStart(2, '0');

// Lab — things built. type: 'Software' | 'Process'. ai: was AI a build partner?
export const PROJECTS = [
  {
    slug: 'grey-eminence',
    name: 'Grey Eminence',
    type: 'Software', ai: true, status: 'Live', accent: 'teal', featured: true,
    tagline: 'A native macOS meeting recorder that never joins the call: on-device transcription, speaker diarization, and a Claude-powered memory of everything said.',
    summary: 'Records the mic and system audio with Core Audio taps, transcribes both on the Neural Engine while the meeting runs, then re-transcribes with a larger Whisper model after. Claude turns transcripts into summaries, action items, and answers; an interview mode scores candidates against rubrics with evidence quotes.',
    stack: ['Swift 6', 'SwiftUI', 'WhisperKit', 'Core Audio', 'Claude API'],
    link: 'https://github.com/mpurdon/greyeminence',
    linkLabel: 'Source on GitHub',
    year: '2026', date: 'May 29, 2026',
  },
  {
    slug: 'tcc',
    name: 'tcc',
    type: 'Software', ai: true, status: 'Live', accent: 'indigo', featured: true,
    tagline: 'An experiment with the tiny pi coding agent that became my daily-driver harness: AWS Bedrock underneath, twenty-five extensions on top, every behaviour mine to change.',
    summary: 'A weekend experiment with the open-source pi coding agent that grew into a daily-driver harness on AWS Bedrock: persistent memory, per-branch checkpoints, secret scanning, budget caps, background PR watches, and a second-opinion review gate. Built for a corporate account, where every wasted token is a line item.',
    stack: ['TypeScript', 'pi', 'AWS Bedrock', 'Node.js'],
    link: 'https://github.com/mpurdon/tcc-harness',
    linkLabel: 'Source on GitHub',
    year: '2026', date: 'June 7, 2026',
  },
  {
    slug: 'technical-evolution-proposals',
    name: 'Technical Evolution (TE) Proposals',
    type: 'Process', ai: false, status: 'In use', accent: 'amber', featured: true,
    tagline: 'A lightweight RFC format for engineering teams — small enough that people actually write them.',
    summary: 'A numbered, plain-text proposal process for evolving how a team works. TE-0001 standardizes Conventional Commits; later notes cover branching, review SLAs, and how AI tools enter the workflow.',
    stack: ['Markdown', 'Git', 'Process'],
    link: 'https://gist.github.com/mpurdon/9b55728297987219db25a48ad53aaf65',
    linkLabel: 'Read TE-0001',
    year: '2025',
  },
  {
    slug: 'mcp-servers',
    name: 'MCP servers',
    type: 'Software', ai: true, status: 'Live', accent: 'amber', featured: true,
    tagline: 'A monorepo of Model Context Protocol servers built as facades, not adapters: each tool answers a question I actually ask, with the org\'s tribal knowledge baked in.',
    summary: 'Four public TypeScript MCP servers (MongoDB, Sumo Logic, GitHub, FreshBooks) plus an installer CLI that configures Claude Desktop, Code, and Cowork in one command and auto-discovers private servers from local descriptors. Each server is a facade over its API: org-wide PR rollups and CI-failure log archaeology in one call, log searches that already know where every service logs, production writes that refuse to run without explicit confirmation, and invoicing tools shaped like the chore instead of the endpoint.',
    stack: ['TypeScript', 'MCP SDK', 'zod', 'Turborepo', 'npm'],
    link: 'https://github.com/mpurdon/mcp-servers',
    linkLabel: 'Source on GitHub',
    year: '2026', date: 'June 7, 2026',
  },
  {
    slug: 'evalu8',
    name: 'Evalu8',
    type: 'Software', ai: true, status: 'Done', accent: 'teal', featured: false,
    tagline: 'A one-evening Electron app that replaced the Postman collection: a bespoke client for a sparsely documented API, built to explore call evaluations the way I actually wanted to read them.',
    summary: 'Built in a single evening to explore 8x8\'s quality-management API while validating an AI call-scoring pipeline: search interactions, read transcripts beside their human scorecards, all behind a UI that absorbs the API\'s inconsistent response shapes and thin documentation. Reopened once, four months later, to add a phone-number lookup that scans five years of call history in parallel monthly windows with client-side matching, because the API has no phone filter. The entire git history is two sittings; that cadence is the point.',
    stack: ['Electron', 'React', 'TypeScript', 'Vite', 'Tailwind'],
    link: 'https://github.com/mpurdon/evalu8',
    linkLabel: 'Source on GitHub',
    year: '2026', date: 'March 31, 2026',
  },
  {
    slug: 'matthewpurdon-design-system',
    name: 'matthewpurdon.me + design system',
    type: 'Software', ai: true, status: 'Live', accent: 'canada', featured: true,
    tagline: 'This site and the dark, data-forward design system under it: a look distilled from sites I admire, a voice cloned from my own Teams messages, and every page built in three layers.',
    summary: 'A look inspired by the State of AI 2026 report and a few personal sites I admire, formalized into a 25-component monorepo, then reverse-engineered into a spec an agent can follow: a README brand book, a Claude Code skill, and one self-contained bundle. The writing voice comes from a Cowork analysis of 500 of my own Teams messages, and the content model follows the glance/brief/full layering argued in the first Field Note.',
    stack: ['React', 'Vite', 'Design tokens', 'Claude', 'Cowork'],
    link: 'https://github.com/mpurdon/matthewpurdon.me',
    linkLabel: 'Source on GitHub',
    year: '2026', date: 'June 11, 2026',
  },
];
