/* matthewpurdon.me — content layer.
   Real profile + links pulled from github.com/mpurdon. Posts and Lab entries are
   realistic, on-voice drafts Matthew can swap for the real thing. */

export const SITE_URL = "https://matthewpurdon.me";

export const AVATAR = "/images/matthew-purdon.webp";

export const PROFILE = {
  name: "Matthew Purdon",
  role: "Principal Engineer & AI Platform Builder",
  // SEO-friendly, true-to-his-interests one-liner. Edit freely.
  tagline:
    "Principal engineer and AI platform builder in Toronto with twenty-five years of experience turning messy software delivery into repeatable systems. I write about AI-assisted engineering, the new SDLC, code review, developer workflows, and how teams actually ship.",
  bio: "I help engineering organizations adopt AI-assisted delivery without turning the SDLC into chaos: platform architecture, developer workflows, agentic tooling, review systems, governance, and the process changes needed to make it stick.",
  location: "Toronto, Canada",
  avatar: AVATAR,
  email: "hello@matthewpurdon.me",
  links: {
    linkedin: "https://www.linkedin.com/in/matthewdjpurdon",
    github: "https://github.com/mpurdon",
    x: "https://x.com/mpurdon",
    instagram: "https://www.instagram.com/mdjpurdon/",
    site: "https://purdonmoi.com/", // domain has no DNS records yet; re-add footer/about links when live
  },
};

// Topic registry — name → { blurb, accent, keyConcepts }. Used by chips, topic pages, covers.
export const TOPICS = {
  "AI-Assisted Engineering": {
    blurb: "Building software when a model is in the loop for every commit.",
    accent: "amber",
    keyConcepts: [
      "Model-in-the-loop workflows",
      "Bespoke context maps and stubs",
      "Evaluations & quality pipelines",
      "Agentic developer harnesses",
    ],
  },
  "The New SDLC": {
    blurb: "What the development lifecycle looks like once agents sit inside it.",
    accent: "indigo",
    keyConcepts: [
      "Continuous PR background watches",
      "Review as the principal engineering gear",
      "Automated second-opinion gates",
      "Budget and token monitoring",
    ],
  },
  Product: {
    blurb: "How the product role shifts when generation is cheap and judgement is scarce.",
    accent: "teal",
    keyConcepts: [
      "The scarcity of human judgement",
      "Designing generator facades",
      "Maintaining taste and direction",
      "Low-effort feature filtering",
    ],
  },
  Hiring: {
    blurb: "Interviewing and leveling engineers for the model era.",
    accent: "canada",
    keyConcepts: [
      "Seeding quiet interview landmines",
      "Hiring for taste and code-reading",
      "Leveling engineers for model collaboration",
      "The death of syntax-under-pressure tests",
    ],
  },
  "Teams & Process": {
    blurb: "Field notes on how real teams reshape their habits — for better and worse.",
    accent: "amber",
    keyConcepts: [
      "Lightweight RFC formats (TE Proposals)",
      "The commit-to-executive compression chain",
      "Fostering healthy engineering habits",
      "Continuous process evolution",
    ],
  },
  Industry: {
    blurb: "Where we have been, what is coming, and the news worth slowing down for.",
    accent: "indigo",
    keyConcepts: [
      "Architectures that hold up",
      "The reality behind the hype",
      "Ecosystem shifts and model cost curves",
    ],
  },
  Opinion: {
    blurb: "The soap-box archive. Read at your own risk.",
    accent: "canada",
    keyConcepts: ["Busting industry myths", "Rants on standard practices", "The unpolished version of reality"],
  },
  Notes: {
    blurb: "Short, dated, half-formed. Thinking out loud.",
    accent: "teal",
    keyConcepts: ["Half-formed thoughts on development", "Quick code snippets and configs", "Thinking in public"],
  },
};
