/* matthewpurdon.me — app shell: path router + page chrome. */
import { useEffect, useRef, useState } from 'react';
import { Masthead, Footer } from './chrome.jsx';
import Home from './home.jsx';
import { NotesIndex, TopicPage } from './notes.jsx';
import Article from './article.jsx';
import { LabIndex, ProjectDetail } from './lab.jsx';
import About from './about.jsx';
import { POSTS, PROJECTS, SITE_URL } from './data.js';

// Design settings, fixed at the values chosen during the design pass.
const SETTINGS = {
  hero: 'portrait',
  labStyle: 'cards',
  density: 'comfortable',
  covers: 'typographic',
  red: 'bold',
};

const TITLES = {
  home: 'Matthew Purdon — Principal Software Engineer in Toronto',
  notes: 'Field Notes — Matthew Purdon',
  lab: 'Lab — Matthew Purdon',
  about: 'About — Matthew Purdon',
};

// /notes/slug → article, /lab/slug → project, /topic/name → topic landing.
function parsePath(pathname) {
  const h = decodeURIComponent((pathname || '/').replace(/^\/+/, '').replace(/\/+$/, ''));
  if (!h || h === 'home' || h === 'index.html') return { name: 'home' };
  const slash = h.indexOf('/');
  const head = slash === -1 ? h : h.slice(0, slash);
  const rest = slash === -1 ? '' : h.slice(slash + 1);
  if (head === 'notes' && rest) {
    const post = POSTS.find(p => p.slug === rest);
    return post ? { name: 'article', post } : { name: 'notes' };
  }
  if (head === 'lab' && rest) {
    const project = PROJECTS.find(p => p.slug === rest);
    return project ? { name: 'project', project } : { name: 'lab' };
  }
  if (head === 'topic' && rest) return { name: 'topic', topic: rest };
  if (head === 'notes' || head === 'lab' || head === 'about') return { name: head };
  return { name: 'home' };
}

function viewToPath(view) {
  switch (view.name) {
    case 'article': return '/notes/' + view.post.slug;
    case 'project': return '/lab/' + view.project.slug;
    case 'topic': return '/topic/' + encodeURIComponent(view.topic);
    case 'home': return '/';
    default: return '/' + view.name;
  }
}

// Pre-path-routing links used #notes/slug fragments; translate them once on load.
function initialView() {
  const legacy = (window.location.hash || '').replace(/^#\/?/, '');
  if (legacy) {
    const view = parsePath('/' + legacy);
    window.history.replaceState(null, '', viewToPath(view));
    return view;
  }
  return parsePath(window.location.pathname);
}

export default function App() {
  const t = SETTINGS;
  const [view, setView] = useState(initialView);
  const scroller = useRef(null);

  useEffect(() => {
    const onPop = () => setView(parsePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = 0;
    let title = TITLES[view.name] || TITLES.home;
    if (view.name === 'article') title = view.post.title + ' — Matthew Purdon';
    if (view.name === 'project') title = view.project.name + ' — Matthew Purdon · Lab';
    if (view.name === 'topic') title = '#' + view.topic + ' — Matthew Purdon';
    document.title = title;
    // Keep canonical + description in sync on client-side navigation; the
    // prerendered HTML carries the correct values on first load.
    const path = viewToPath(view);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', SITE_URL + (path === '/' ? '/' : path));
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      if (view.name === 'article') desc.setAttribute('content', view.post.dek);
      else if (view.name === 'project') desc.setAttribute('content', view.project.tagline);
    }
  }, [view]);

  const navigate = (next) => {
    const path = viewToPath(next);
    if (window.location.pathname !== path) window.history.pushState(null, '', path);
    setView(next);
  };

  const go = (name) => navigate({ name });
  const openPost = (post) => navigate({ name: 'article', post });
  const openProject = (project) => navigate({ name: 'project', project });
  const openTopic = (topic) => navigate({ name: 'topic', topic });

  let body;
  switch (view.name) {
    case 'notes': body = <NotesIndex t={t} openPost={openPost} openTopic={openTopic} />; break;
    case 'lab': body = <LabIndex t={t} openProject={openProject} go={go} />; break;
    case 'about': body = <About t={t} go={go} />; break;
    case 'article': body = <Article post={view.post} t={t} openTopic={openTopic} go={go} />; break;
    case 'project': body = <ProjectDetail project={view.project} t={t} go={go} openProject={openProject} />; break;
    case 'topic': body = <TopicPage topic={view.topic} t={t} openPost={openPost} openTopic={openTopic} go={go} />; break;
    default: body = <Home t={t} go={go} openPost={openPost} openProject={openProject} openTopic={openTopic} />;
  }

  return (
    <div ref={scroller} style={{ height: '100vh', overflowY: 'auto', background: 'var(--bg-base)' }}>
      <Masthead view={view.name} go={go} />
      {body}
      <Footer go={go} />
    </div>
  );
}
