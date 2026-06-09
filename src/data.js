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
    site: 'https://purdonmoi.com/',
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

// Field Notes (the writing). `body` present on the featured one for the article view.
export const POSTS = [
  {
    slug: 'interviewing-the-ai-assisted-engineer',
    title: 'Interviewing for the AI-assisted engineer',
    dek: 'When the editor writes half the code, the take-home stops measuring what you think it measures. Here is what I screen for instead.',
    category: 'Hiring', accent: 'canada', featured: true,
    date: 'May 31, 2026', dateLong: 'May 31, 2026', time: '9 min read',
    tags: ['Hiring', 'AI-Assisted Engineering', 'The New SDLC', 'Opinion'],
  },
  {
    slug: 'the-new-sdlc-from-memory',
    title: 'The new SDLC, drawn from memory',
    dek: 'I tried to sketch the development loop the way it actually runs now — model in every step — without looking at anyone’s diagram. It came out weird, and truer for it.',
    category: 'The New SDLC', accent: 'indigo',
    date: 'May 19', dateLong: 'May 19, 2026', time: '7 min read',
    tags: ['The New SDLC', 'AI-Assisted Engineering', 'Teams & Process'],
  },
  {
    slug: 'what-i-watch-when-a-team-adopts-ai',
    title: 'What I watch when a team adopts AI',
    dek: 'Field notes from three teams’ first ninety days with assistants. The interesting signal was never the velocity chart.',
    category: 'Teams & Process', accent: 'teal',
    date: 'May 6', dateLong: 'May 6, 2026', time: '8 min read',
    tags: ['Teams & Process', 'AI-Assisted Engineering', 'Notes'],
  },
  {
    slug: 'product-managers-are-becoming-editors',
    title: 'Product managers are becoming editors',
    dek: 'The role quietly changed shape and nobody updated the org chart. A short argument for renaming the job.',
    category: 'Product', accent: 'teal',
    date: 'Apr 24', dateLong: 'April 24, 2026', time: '6 min read',
    tags: ['Product', 'Opinion', 'The New SDLC'],
  },
  {
    slug: 'a-short-history-of-the-autocomplete',
    title: 'Where we’ve been: a short history of the autocomplete',
    dek: 'From snippets to IntelliSense to agents. The line is straighter than the hype suggests, and the lessons keep repeating.',
    category: 'Industry', accent: 'indigo',
    date: 'Apr 9', dateLong: 'April 9, 2026', time: '11 min read',
    tags: ['Industry', 'AI-Assisted Engineering'],
  },
  {
    slug: 'taste-is-the-bottleneck-now',
    title: 'Taste is the bottleneck now',
    dek: 'When generation is free, the scarce resource is knowing which of the ten plausible answers is the right one.',
    category: 'AI-Assisted Engineering', accent: 'amber',
    date: 'Mar 28', dateLong: 'March 28, 2026', time: '5 min read',
    tags: ['AI-Assisted Engineering', 'Opinion'],
  },
  {
    slug: 'review-is-the-new-writing',
    title: 'Review is the new writing',
    dek: 'I now spend more of the day reading code I did not type than typing code nobody will read. The skills are not the same.',
    category: 'The New SDLC', accent: 'indigo',
    date: 'Mar 12', dateLong: 'March 12, 2026', time: '6 min read',
    tags: ['The New SDLC', 'Teams & Process', 'Opinion'],
  },
  {
    slug: 'on-vibe-coding',
    title: 'On “vibe coding” and other things we’ll regret naming',
    dek: 'A short note on why the names we give new practices outlive the practices, and stick us with the wrong mental model.',
    category: 'Notes', accent: 'teal',
    date: 'Feb 27', dateLong: 'February 27, 2026', time: '3 min read',
    tags: ['Notes', 'Industry'],
  },
];

// Lab — things built. type: 'Software' | 'Process'. ai: was AI a build partner?
export const PROJECTS = [
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
    slug: 'matthewpurdon-design-system',
    name: 'matthewpurdon.me + design system',
    type: 'Software', ai: true, status: 'Live', accent: 'canada', featured: true,
    tagline: 'This site, and the dark, data-forward design system underneath it — built with an AI pair.',
    summary: 'A warm-charcoal UI kit (IBM Plex Mono + Serif, amber brand, Canada-red co-brand) and the personal site it powers. Most of it was drafted in conversation with an assistant and edited down by hand.',
    stack: ['React', 'Design tokens', 'AI-assisted'],
    link: 'https://github.com/mpurdon',
    linkLabel: 'Source on GitHub',
    year: '2026',
  },
  {
    slug: 'ai-assisted-interview-kit',
    name: 'AI-Assisted Engineering interview kit',
    type: 'Process', ai: true, status: 'Draft', accent: 'indigo',
    tagline: 'A rubric and take-home built to measure judgement, not autocomplete speed.',
    summary: 'A structured interview loop for hiring engineers who work with models all day: a paired review exercise, a "debug the agent" round, and a scoring sheet weighted toward taste and verification.',
    stack: ['Rubric', 'Take-home', 'Hiring'],
    link: 'https://github.com/mpurdon',
    linkLabel: 'Notes & template',
    year: '2026',
  },
  {
    slug: 'new-sdlc-playbook',
    name: 'The New SDLC playbook',
    type: 'Process', ai: false, status: 'Draft', accent: 'teal',
    tagline: 'A team operating model for shipping with agents in the loop, without losing the plot.',
    summary: 'A short playbook: where the model belongs in each phase, what stays human, the review ritual that replaces solo authorship, and the guardrails that keep velocity from becoming churn.',
    stack: ['Playbook', 'Process', 'Teams'],
    link: 'https://github.com/mpurdon',
    linkLabel: 'Read the draft',
    year: '2026',
  },
  {
    slug: 'open-source',
    name: 'Sixty repos and counting',
    type: 'Software', ai: false, status: 'Ongoing', accent: 'amber',
    tagline: 'CLIs, experiments, and tools-for-one that occasionally turn out to be useful.',
    summary: 'The long tail of side projects on GitHub — small command-line tools, runtime experiments, and the occasional thing that escaped into production. Browse the whole shelf.',
    stack: ['Python', 'TypeScript', 'CLIs'],
    link: 'https://github.com/mpurdon?tab=repositories',
    linkLabel: 'Browse all repos',
    year: '2012 – now',
  },
];
