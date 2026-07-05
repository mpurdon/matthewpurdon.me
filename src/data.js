/* matthewpurdon.me — content layer.
   Real profile + links pulled from github.com/mpurdon. Posts and Lab entries are
   realistic, on-voice drafts Matthew can swap for the real thing. */

export const SITE_URL = 'https://matthewpurdon.me';

export const AVATAR = '/images/matthew-purdon.webp';

export const PROFILE = {
  name: 'Matthew Purdon',
  role: 'Principal Engineer & AI Platform Builder',
  // SEO-friendly, true-to-his-interests one-liner. Edit freely.
  tagline: 'Principal engineer and AI platform builder in Toronto with twenty-five years of experience turning messy software delivery into repeatable systems. I write about AI-assisted engineering, the new SDLC, code review, developer workflows, and how teams actually ship.',
  bio: 'I help engineering organizations adopt AI-assisted delivery without turning the SDLC into chaos: platform architecture, developer workflows, agentic tooling, review systems, governance, and the process changes needed to make it stick.',
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

// Topic registry — name → { blurb, accent, keyConcepts }. Used by chips, topic pages, covers.
export const TOPICS = {
  'AI-Assisted Engineering': {
    blurb: 'Building software when a model is in the loop for every commit.',
    accent: 'amber',
    keyConcepts: ['Model-in-the-loop workflows', 'Bespoke context maps and stubs', 'Evaluations & quality pipelines', 'Agentic developer harnesses']
  },
  'The New SDLC': {
    blurb: 'What the development lifecycle looks like once agents sit inside it.',
    accent: 'indigo',
    keyConcepts: ['Continuous PR background watches', 'Review as the principal engineering gear', 'Automated second-opinion gates', 'Budget and token monitoring']
  },
  'Product': {
    blurb: 'How the product role shifts when generation is cheap and judgement is scarce.',
    accent: 'teal',
    keyConcepts: ['The scarcity of human judgement', 'Designing generator facades', 'Maintaining taste and direction', 'Low-effort feature filtering']
  },
  'Hiring': {
    blurb: 'Interviewing and leveling engineers for the model era.',
    accent: 'canada',
    keyConcepts: ['Seeding quiet interview landmines', 'Hiring for taste and code-reading', 'Leveling engineers for model collaboration', 'The death of syntax-under-pressure tests']
  },
  'Teams & Process': {
    blurb: 'Field notes on how real teams reshape their habits — for better and worse.',
    accent: 'amber',
    keyConcepts: ['Lightweight RFC formats (TE Proposals)', 'The commit-to-executive compression chain', 'Fostering healthy engineering habits', 'Continuous process evolution']
  },
  'Industry': {
    blurb: 'Where we have been, what is coming, and the news worth slowing down for.',
    accent: 'indigo',
    keyConcepts: ['Architectures that hold up', 'The reality behind the hype', 'Ecosystem shifts and model cost curves']
  },
  'Opinion': {
    blurb: 'The soap-box archive. Read at your own risk.',
    accent: 'canada',
    keyConcepts: ['Busting industry myths', 'Rants on standard practices', 'The unpolished version of reality']
  },
  'Notes': {
    blurb: 'Short, dated, half-formed. Thinking out loud.',
    accent: 'teal',
    keyConcepts: ['Half-formed thoughts on development', 'Quick code snippets and configs', 'Thinking in public']
  },
};

// Field Notes (the writing). Hand-written bodies live in article.jsx, keyed by slug.
export const POSTS = [
  {
    slug: 'what-is-a-principal-engineer',
    title: 'What is a principal engineer?',
    dek: 'Reaching Staff means specializing into one archetype. Reaching Principal means mastering the transition between all four. Why you cannot lead a platform (or an AI transition) from a single gear, and how we ran the engine on our largest multi-agent initiative.',
    category: 'Teams & Process', accent: 'indigo', featured: true,
    date: 'Jun 13, 2026', dateLong: 'June 13, 2026', time: '13 min read',
    tags: ['Teams & Process', 'AI-Assisted Engineering', 'Opinion'],
  },
  {
    slug: 'interviewing-the-ai-assisted-engineer',
    title: 'Interviewing the AI-assisted engineer',
    dek: 'For a decade, the coding interview measured whether you could produce syntax under pressure. That proxy is broken. If we want to find engineers who can actually ship, we have to stop asking them to write code and start asking them to judge it. On the review round, seeding quiet landmines, and hiring for taste.',
    category: 'Hiring', accent: 'canada', featured: false,
    date: 'Jun 3, 2026', dateLong: 'June 3, 2026', time: '10 min read',
    tags: ['Hiring', 'AI-Assisted Engineering', 'Opinion'],
  },
  {
    slug: 'judgement-is-the-job-now',
    title: 'Judgement is the job now',
    dek: 'Hand ten engineers the same model and the work comes back in two piles. AI removed the effort filter, and judgement is what is left. On taste, the dependency graph that wasn\'t, and the audit my vacation is about to run.',
    category: 'AI-Assisted Engineering', accent: 'indigo', featured: false,
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
    name: 'TCC',
    type: 'Software', ai: true, status: 'Live', accent: 'indigo', featured: true,
    tagline: 'An experiment with the tiny pi coding agent that became my daily-driver harness: AWS Bedrock underneath, twenty-five extensions on top, every behaviour mine to change.',
    summary: 'A weekend experiment with the open-source pi coding agent that grew into a daily-driver harness on AWS Bedrock: persistent memory, per-branch checkpoints, secret scanning, budget caps, background PR watches, and a second-opinion review gate. Built for a corporate account, where every wasted token is a line item.',
    stack: ['TypeScript', 'pi', 'AWS Bedrock', 'Node.js'],
    link: 'https://github.com/mpurdon/tcc-harness',
    linkLabel: 'Source on GitHub',
    year: '2026', date: 'June 7, 2026',
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
];
