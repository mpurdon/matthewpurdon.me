/* @ds-bundle: {"format":3,"namespace":"StateOfAIDesignSystem_c9312a","components":[{"name":"Badge","sourcePath":"components/badge/Badge.jsx"},{"name":"Tag","sourcePath":"components/badge/Badge.jsx"},{"name":"MapleLeaf","sourcePath":"components/brand/MapleLeaf.jsx"},{"name":"Wordmark","sourcePath":"components/brand/MapleLeaf.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"ButtonGroup","sourcePath":"components/buttons/Button.jsx"},{"name":"Callout","sourcePath":"components/callout/Callout.jsx"},{"name":"Soapbox","sourcePath":"components/callout/Soapbox.jsx"},{"name":"Card","sourcePath":"components/card/Card.jsx"},{"name":"CardHeader","sourcePath":"components/card/Card.jsx"},{"name":"CardTitle","sourcePath":"components/card/Card.jsx"},{"name":"CardDescription","sourcePath":"components/card/Card.jsx"},{"name":"CardContent","sourcePath":"components/card/Card.jsx"},{"name":"CardFooter","sourcePath":"components/card/Card.jsx"},{"name":"StatBlock","sourcePath":"components/card/StatBlock.jsx"},{"name":"BarChart","sourcePath":"components/data/BarChart.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"ArticleCard","sourcePath":"components/editorial/ArticleCard.jsx"},{"name":"Byline","sourcePath":"components/editorial/Byline.jsx"},{"name":"CodeBlock","sourcePath":"components/editorial/CodeBlock.jsx"},{"name":"Prose","sourcePath":"components/editorial/Prose.jsx"},{"name":"PullQuote","sourcePath":"components/editorial/PullQuote.jsx"},{"name":"Banner","sourcePath":"components/feedback/Banner.jsx"},{"name":"Spinner","sourcePath":"components/feedback/Spinner.jsx"},{"name":"Progress","sourcePath":"components/feedback/Spinner.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Radio","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"SidebarHeader","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"SidebarContent","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"SidebarFooter","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"SidebarGroup","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"SidebarGroupLabel","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"SidebarItem","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/badge/Badge.jsx":"ef6122c0856c","components/brand/MapleLeaf.jsx":"3431515d43b0","components/buttons/Button.jsx":"c65a64553b89","components/callout/Callout.jsx":"eb7742f21586","components/callout/Soapbox.jsx":"b9eab00fa702","components/card/Card.jsx":"802f551876cf","components/card/StatBlock.jsx":"90bfefff2b5c","components/data/BarChart.jsx":"44141cffe913","components/data/DataTable.jsx":"6df3a0f717f7","components/editorial/ArticleCard.jsx":"f96239eb8f92","components/editorial/Byline.jsx":"61ab1e9c51ee","components/editorial/CodeBlock.jsx":"0a2f17b85116","components/editorial/Prose.jsx":"bd0f46f71a8d","components/editorial/PullQuote.jsx":"a94c00c12506","components/feedback/Banner.jsx":"ddb9d27bcdf8","components/feedback/Spinner.jsx":"8675d96e2965","components/feedback/Toast.jsx":"110699fc6258","components/feedback/Tooltip.jsx":"f1f69059aff8","components/forms/Checkbox.jsx":"b0a52272151a","components/forms/Input.jsx":"76d6fd2334a0","components/forms/Select.jsx":"d928ce651e08","components/forms/Switch.jsx":"3690a00d698a","components/navigation/Sidebar.jsx":"8c2dd09d5e55","components/navigation/Tabs.jsx":"0d7e3d344b1f","ui_kits/blog/ArticlePage.jsx":"31fcbab78c19","ui_kits/blog/Footer.jsx":"47061273eb7d","ui_kits/blog/Home.jsx":"a05158324bc9","ui_kits/blog/Masthead.jsx":"36319537c538","ui_kits/blog/TopicPage.jsx":"354cbbb8d266","ui_kits/report/ReportBody.jsx":"5fa32aec21b0","ui_kits/report/ReportHeader.jsx":"1ef1b5d323cc","ui_kits/report/ReportHero.jsx":"378258ecf9d7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.StateOfAIDesignSystem_c9312a = window.StateOfAIDesignSystem_c9312a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/badge/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small status pill. Tinted background + matching border, pill radius.
 * Tag — squarer, removable label chip (for filters / facets).
 */

const CSS = `
.mp-badge { display: inline-flex; align-items: center; gap: 0.375rem; border-radius: var(--radius-full); padding: 0.125rem 0.625rem; font-family: var(--font-label); font-size: var(--text-xs); font-weight: var(--weight-semibold); letter-spacing: var(--tracking-wide); line-height: 1.5; border: 1px solid transparent; }
.mp-badge--default { background: rgba(129,140,248,0.18); color: var(--indigo-400); border-color: rgba(129,140,248,0.3); }
.mp-badge--amber   { background: rgba(252,172,60,0.18); color: var(--brand); border-color: rgba(252,172,60,0.3); }
.mp-badge--teal    { background: rgba(65,199,199,0.18); color: var(--teal-400); border-color: rgba(65,199,199,0.3); }
.mp-badge--green   { background: rgba(133,235,162,0.16); color: var(--green-300); border-color: rgba(133,235,162,0.32); }
.mp-badge--pink    { background: rgba(249,93,178,0.16); color: var(--pink-400); border-color: rgba(249,93,178,0.32); }
.mp-badge--error   { background: var(--error-bg); color: var(--error); border-color: var(--error-border); }
.mp-badge--warning { background: var(--warning-bg); color: var(--warning); border-color: var(--warning-border); }
.mp-badge--outline { background: transparent; color: var(--text-secondary); border-color: var(--border-strong); }
.mp-badge--solid   { background: var(--indigo-500); color: #fff; }
.mp-badge__dot { width: 0.375rem; height: 0.375rem; border-radius: 9999px; background: currentColor; }

.mp-tag { display: inline-flex; align-items: center; gap: 0.375rem; border-radius: var(--radius-sm); padding: 0.1875rem 0.5rem; font-family: var(--font-ui); font-size: var(--text-xs); font-weight: var(--weight-medium); background: var(--bg-subtle); color: var(--text-secondary); border: 1px solid var(--border); }
.mp-tag__x { display: inline-flex; cursor: pointer; opacity: 0.6; background: none; border: none; color: inherit; padding: 0; font: inherit; line-height: 1; }
.mp-tag__x:hover { opacity: 1; }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-badge-css')) {
  const s = document.createElement('style');
  s.id = 'mp-badge-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Badge({
  variant = 'default',
  dot = false,
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `mp-badge mp-badge--${variant} ${className}`
  }, props), dot && /*#__PURE__*/React.createElement("span", {
    className: "mp-badge__dot",
    "aria-hidden": "true"
  }), children);
}
function Tag({
  onRemove,
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `mp-tag ${className}`
  }, props), children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mp-tag__x",
    "aria-label": "Remove",
    onClick: onRemove
  }, "\u2715"));
}
Object.assign(__ds_scope, { Badge, Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badge/Badge.jsx", error: String((e && e.message) || e) }); }

// components/brand/MapleLeaf.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MapleLeaf — the blog's Canadian brand mark. Inline SVG so it inherits
 * `currentColor` (tint it via the parent's color: Canada red, amber, or cream).
 * The same artwork lives at /assets/maple-leaf.svg for non-React use.
 */

const PATH = 'm-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z';
function MapleLeaf({
  size = 24,
  className = '',
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "-2015 -2000 4030 4030",
    width: size,
    height: size,
    fill: "currentColor",
    role: "img",
    "aria-label": "Maple leaf",
    className: className,
    style: {
      display: 'inline-block',
      flexShrink: 0,
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("path", {
    d: PATH
  }));
}

/**
 * Wordmark — "matthewpurdon" set in mono with the amber gradient, leaf to the
 * left in Canada red. The site's masthead/footer identity.
 */
function Wordmark({
  size = 20,
  showLeaf = true,
  className = '',
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5em',
      whiteSpace: 'nowrap',
      ...style
    }
  }, props), showLeaf && /*#__PURE__*/React.createElement(MapleLeaf, {
    size: size * 1.05,
    style: {
      color: 'var(--canada-500)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: size,
      letterSpacing: '-0.02em',
      background: 'var(--brand-gradient)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }
  }, "matthew", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-primary)',
      WebkitTextFillColor: 'currentColor'
    }
  }, "purdon")));
}
Object.assign(__ds_scope, { MapleLeaf, Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/MapleLeaf.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — State of AI design system
 * Uppercase, wide-tracked, 2px-border buttons. Outline is the default;
 * solid amber is the primary CTA. Active state nudges scale to 0.98.
 */

const CSS = `
.mp-btn {
  font-family: var(--font-label);
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-widest);
  display: inline-flex; align-items: center; justify-content: center;
  gap: 0.5rem; white-space: nowrap;
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer; user-select: none;
  transition: background var(--duration-base) var(--ease),
              border-color var(--duration-base) var(--ease),
              color var(--duration-base) var(--ease),
              transform var(--duration-fast) var(--ease);
}
.mp-btn:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--bg-base), 0 0 0 4px var(--accent); }
.mp-btn:disabled { opacity: 0.4; pointer-events: none; }
.mp-btn:active:not(:disabled) { transform: scale(0.98); }

.mp-btn--outline { border-color: var(--indigo-500); color: var(--indigo-500); background: transparent; }
.mp-btn--outline:hover { background: rgba(129,140,248,0.10); }

.mp-btn--solid { border-color: var(--brand); background: var(--brand); color: var(--ink-900); }
.mp-btn--solid:hover { background: var(--amber-500); border-color: var(--amber-500); }

.mp-btn--ghost { border-color: transparent; color: var(--text-secondary); background: transparent; }
.mp-btn--ghost:hover { background: var(--bg-subtle); color: var(--text-primary); }

.mp-btn--teal { border-color: var(--teal-500); color: var(--teal-500); background: transparent; }
.mp-btn--teal:hover { background: rgba(65,199,199,0.10); }

.mp-btn--destructive { border-color: var(--error); color: var(--error); background: transparent; }
.mp-btn--destructive:hover { background: rgba(254,106,106,0.10); }

.mp-btn--link { border-color: transparent; color: var(--indigo-400); background: transparent; padding: 0 !important; height: auto !important; letter-spacing: var(--tracking-wide); }
.mp-btn--link:hover { text-decoration: underline; }

.mp-btn--xs { height: 1.75rem; padding: 0 0.75rem; font-size: 0.6875rem; }
.mp-btn--sm { height: 2rem;    padding: 0 1rem;    font-size: var(--text-xs); }
.mp-btn--md { height: 2.5rem;  padding: 0 1.25rem; font-size: var(--text-xs); }
.mp-btn--lg { height: 3rem;    padding: 0 1.5rem;  font-size: var(--text-sm); }
.mp-btn--xl { height: 3.5rem;  padding: 0 2rem;    font-size: var(--text-base); }

.mp-btn__spinner { width: 1em; height: 1em; animation: mp-btn-spin 0.7s linear infinite; }
@keyframes mp-btn-spin { to { transform: rotate(360deg); } }

.mp-btn-group { display: inline-flex; }
.mp-btn-group > .mp-btn:not(:first-child) { border-top-left-radius: 0; border-bottom-left-radius: 0; margin-left: -2px; }
.mp-btn-group > .mp-btn:not(:last-child) { border-top-right-radius: 0; border-bottom-right-radius: 0; }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-button-css')) {
  const s = document.createElement('style');
  s.id = 'mp-button-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Button({
  variant = 'outline',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    className: `mp-btn mp-btn--${variant} mp-btn--${size} ${className}`,
    disabled: disabled ?? loading,
    "aria-busy": loading || undefined
  }, props), loading && /*#__PURE__*/React.createElement("svg", {
    className: "mp-btn__spinner",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4",
    opacity: "0.25"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 12a8 8 0 018-8",
    stroke: "currentColor",
    strokeWidth: "4",
    strokeLinecap: "round"
  })), children);
}
function ButtonGroup({
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "group",
    className: `mp-btn-group ${className}`
  }, props), children);
}
Object.assign(__ds_scope, { Button, ButtonGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/callout/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Callout — magazine-style aside that breaks up prose. Tinted charcoal surface
 * with a thick accent edge, an outline icon, an optional title, and body content.
 * Variants: note · tip · warning · takeaway. (For opinions, use <Soapbox/>.)
 */

const CSS = `
.mp-callout { display: flex; gap: 0.875rem; padding: 1.125rem 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border); border-inline-start: 3px solid var(--_accent); background: var(--_bg); margin: var(--prose-para-gap, 1.4em) 0; }
.mp-callout__icon { flex-shrink: 0; color: var(--_accent); margin-top: 0.1rem; }
.mp-callout__body { min-width: 0; flex: 1; }
.mp-callout__title { display: block; font-family: var(--font-label); font-size: var(--text-xs); font-weight: var(--weight-bold); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--_accent); margin-bottom: 0.35rem; }
.mp-callout__content { font-family: var(--font-prose); font-size: 1.0625rem; line-height: 1.55; color: var(--text-secondary); }
.mp-callout__content > :first-child { margin-top: 0; }
.mp-callout__content > :last-child { margin-bottom: 0; }
.mp-callout__content a { color: var(--prose-link); }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-callout-css')) {
  const s = document.createElement('style');
  s.id = 'mp-callout-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
const ICONS = {
  note: /*#__PURE__*/React.createElement("path", {
    d: "M12 16v-4M12 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }),
  tip: /*#__PURE__*/React.createElement("path", {
    d: "M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0012 2z"
  }),
  warning: /*#__PURE__*/React.createElement("path", {
    d: "M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.4 3.9a2 2 0 00-3.4 0z"
  }),
  takeaway: /*#__PURE__*/React.createElement("path", {
    d: "M9 11l3 3 8-8M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
  })
};
const ACCENT = {
  note: {
    accent: 'var(--callout-note-accent)',
    bg: 'var(--callout-note-bg)'
  },
  tip: {
    accent: 'var(--callout-tip-accent)',
    bg: 'var(--callout-tip-bg)'
  },
  warning: {
    accent: 'var(--callout-warning-accent)',
    bg: 'var(--callout-warning-bg)'
  },
  takeaway: {
    accent: 'var(--callout-takeaway-accent)',
    bg: 'var(--callout-takeaway-bg)'
  }
};
const DEFAULT_TITLE = {
  note: 'Note',
  tip: 'Tip',
  warning: 'Heads up',
  takeaway: 'Takeaway'
};
function Callout({
  variant = 'note',
  title,
  icon,
  className = '',
  children,
  ...props
}) {
  const a = ACCENT[variant] || ACCENT.note;
  const heading = title !== undefined ? title : DEFAULT_TITLE[variant];
  return /*#__PURE__*/React.createElement("aside", _extends({
    className: `mp-callout ${className}`,
    style: {
      '--_accent': a.accent,
      '--_bg': a.bg
    }
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "mp-callout__icon",
    "aria-hidden": "true"
  }, icon || /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, ICONS[variant] || ICONS.note)), /*#__PURE__*/React.createElement("div", {
    className: "mp-callout__body"
  }, heading && /*#__PURE__*/React.createElement("span", {
    className: "mp-callout__title"
  }, heading), /*#__PURE__*/React.createElement("div", {
    className: "mp-callout__content"
  }, children)));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/callout/Callout.jsx", error: String((e && e.message) || e) }); }

// components/callout/Soapbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Soapbox — the blog's signature personal aside, modelled on the "Soapbox"
 * sections in O'Reilly's Fluent Python: a self-contained, titled side-discussion
 * where the author steps off the main topic to rant, reminisce, or argue a
 * tangentially-related opinion. It is NOT a one-line callout — it holds several
 * paragraphs of serif prose. Canada-red, maple-marked.
 *
 * Layouts:
 *   • section — full-width titled essay block with a header bar (default). Drop
 *               it at the end of a section/article. Body takes multiple <p>s.
 *   • inline  — a shorter block in the article flow (compact header).
 *   • aside   — floats into the right margin on wide screens for a quick aside.
 */

const LEAF = 'm-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z';
const CSS = `
.mp-soap { position: relative; background: var(--callout-soapbox-bg); border: 1px solid rgba(213,43,30,0.35); border-radius: var(--radius-lg); overflow: hidden; }
.mp-soap__leaf-bg { position: absolute; right: -34px; bottom: -34px; width: 150px; height: 150px; color: var(--canada-500); opacity: 0.06; pointer-events: none; }
.mp-soap__eyebrow { display: inline-flex; align-items: center; gap: 0.45rem; font-family: var(--font-label); font-size: var(--text-xs); font-weight: var(--weight-bold); text-transform: uppercase; letter-spacing: var(--tracking-widest); color: var(--canada-300); }
.mp-soap__leaf { color: var(--canada-400); flex-shrink: 0; }
.mp-soap__title { font-family: var(--font-mono); font-weight: 700; letter-spacing: -0.01em; color: var(--text-primary); margin: 0; }
.mp-soap__body { position: relative; font-family: var(--font-prose); font-size: 1.0625rem; line-height: 1.62; color: var(--text-secondary); }
.mp-soap__body > * { margin: 0; }
.mp-soap__body > * + * { margin-top: 0.85em; }
.mp-soap__body h4 { font-family: var(--font-mono); font-weight: 700; font-size: 0.8125rem; text-transform: uppercase; letter-spacing: var(--tracking-wide); color: var(--canada-300); margin-top: 1.25em; }
.mp-soap__body h4 + p { margin-top: 0.4em; }
.mp-soap__body em, .mp-soap__body i { color: var(--canada-300); font-style: italic; }
.mp-soap__body strong { color: var(--text-primary); font-weight: 600; }
.mp-soap__body a { color: var(--prose-link); }
.mp-soap__body code { font-family: var(--font-mono); font-size: 0.85em; background: var(--code-bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.1em 0.4em; color: var(--amber-300); }
.mp-soap__sign { display: block; margin-top: 1rem; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--prose-muted); font-style: normal; }
.mp-soap__sign::before { content: '— '; }

/* section — the Fluent-Python-style titled essay block */
.mp-soap--section { margin: 2.25em 0; border-inline-start: 4px solid var(--canada-500); }
.mp-soap--section .mp-soap__head { display: flex; flex-direction: column; gap: 0.5rem; padding: 1.15rem 1.5rem; background: linear-gradient(180deg, rgba(213,43,30,0.12), transparent); border-bottom: 1px solid rgba(213,43,30,0.28); }
.mp-soap--section .mp-soap__title { font-size: 1.375rem; }
.mp-soap--section .mp-soap__body { padding: 1.25rem 1.5rem 1.5rem; }

/* inline — compact */
.mp-soap--inline { padding: 1.25rem 1.375rem; border-inline-start: 4px solid var(--canada-500); margin: var(--prose-para-gap, 1.4em) 0; }
.mp-soap--inline .mp-soap__head { margin-bottom: 0.6rem; }
.mp-soap--inline .mp-soap__title { font-size: 1.0625rem; margin-top: 0.4rem; }

/* aside — floats to the margin on wide screens */
.mp-soap--aside { padding: 1.15rem 1.25rem; border-inline-start: 4px solid var(--canada-500); margin: 0.5rem 0 1rem; }
.mp-soap--aside .mp-soap__head { margin-bottom: 0.55rem; }
.mp-soap--aside .mp-soap__title { font-size: 1rem; margin-top: 0.35rem; }
@media (min-width: 1100px) {
  .mp-soap--aside { float: inline-end; width: 19rem; margin-inline-start: 2.25rem; margin-block: 0.35rem 1rem; }
}
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-soapbox-css')) {
  const s = document.createElement('style');
  s.id = 'mp-soapbox-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Eyebrow({
  label
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "mp-soap__eyebrow"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "mp-soap__leaf",
    width: "14",
    height: "14",
    viewBox: "-2015 -2000 4030 4030",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: LEAF
  })), label);
}
function Soapbox({
  variant = 'section',
  label = 'Soapbox',
  title,
  signoff,
  className = '',
  children,
  ...props
}) {
  const head = /*#__PURE__*/React.createElement("div", {
    className: "mp-soap__head"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    label: label
  }), title && /*#__PURE__*/React.createElement("p", {
    className: "mp-soap__title"
  }, title));
  return /*#__PURE__*/React.createElement("aside", _extends({
    className: `mp-soap mp-soap--${variant} ${className}`
  }, props), /*#__PURE__*/React.createElement("svg", {
    className: "mp-soap__leaf-bg",
    viewBox: "-2015 -2000 4030 4030",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: LEAF
  })), head, /*#__PURE__*/React.createElement("div", {
    className: "mp-soap__body"
  }, children, signoff && /*#__PURE__*/React.createElement("span", {
    className: "mp-soap__sign"
  }, signoff)));
}
Object.assign(__ds_scope, { Soapbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/callout/Soapbox.jsx", error: String((e && e.message) || e) }); }

// components/card/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — State of AI design system
 * Crisp-cornered (8px) surface card. Glow variants add a soft accent halo.
 */

const CSS = `
.mp-card { border-radius: var(--radius-lg); border: 1px solid var(--border); background: var(--bg-surface); color: var(--text-primary); }
.mp-card--elevated { box-shadow: var(--shadow-lg); }
.mp-card--outline  { background: transparent; }
.mp-card--ghost    { background: transparent; border-color: transparent; }
.mp-card--glow   { border-color: rgba(129,140,248,0.3); box-shadow: var(--glow-indigo); }
.mp-card--amber  { border-color: rgba(252,172,60,0.3);  box-shadow: var(--glow-amber); }
.mp-card--teal   { border-color: rgba(65,199,199,0.3);  box-shadow: var(--glow-teal); }
.mp-card__header { display: flex; flex-direction: column; gap: 0.375rem; padding: 1.5rem 1.5rem 0; }
.mp-card__title  { margin: 0; font-family: var(--font-display); font-size: var(--text-xl); font-weight: var(--weight-bold); letter-spacing: var(--tracking-tight); color: var(--text-primary); }
.mp-card__desc   { margin: 0; font-size: var(--text-sm); line-height: var(--leading-relaxed); color: var(--text-muted); }
.mp-card__body   { padding: 1.5rem; }
.mp-card__footer { display: flex; align-items: center; gap: 0.75rem; padding: 0 1.5rem 1.5rem; }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-card-css')) {
  const s = document.createElement('style');
  s.id = 'mp-card-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Card({
  variant = 'default',
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `mp-card mp-card--${variant} ${className}`
  }, props), children);
}
function CardHeader({
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `mp-card__header ${className}`
  }, props), children);
}
function CardTitle({
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("h3", _extends({
    className: `mp-card__title ${className}`
  }, props), children);
}
function CardDescription({
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    className: `mp-card__desc ${className}`
  }, props), children);
}
function CardContent({
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `mp-card__body ${className}`
  }, props), children);
}
function CardFooter({
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `mp-card__footer ${className}`
  }, props), children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/card/Card.jsx", error: String((e && e.message) || e) }); }

// components/card/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatBlock — the big-number callout that anchors report pages.
 * Oversized mono figure, amber by default, with an eyebrow label and optional
 * delta/footnote. The signature "data-forward" unit of the brand.
 */

const CSS = `
.mp-stat { display: flex; flex-direction: column; gap: 0.25rem; }
.mp-stat__eyebrow { font-family: var(--font-label); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--text-muted); }
.mp-stat__value { font-family: var(--font-display); font-weight: var(--weight-bold); line-height: 1; letter-spacing: var(--tracking-tight); font-variant-numeric: tabular-nums; }
.mp-stat__value--amber  { color: var(--brand); }
.mp-stat__value--indigo { color: var(--indigo-500); }
.mp-stat__value--teal   { color: var(--teal-500); }
.mp-stat__value--cream  { color: var(--text-primary); }
.mp-stat__delta { display: inline-flex; align-items: center; gap: 0.25rem; font-size: var(--text-sm); font-weight: var(--weight-semibold); }
.mp-stat__delta--up   { color: var(--success); }
.mp-stat__delta--down { color: var(--error); }
.mp-stat__foot { font-size: var(--text-sm); color: var(--text-muted); }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-stat-css')) {
  const s = document.createElement('style');
  s.id = 'mp-stat-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
const SIZES = {
  sm: '2.5rem',
  md: '3.5rem',
  lg: '5rem',
  xl: '5.5rem'
};
function StatBlock({
  label,
  value,
  color = 'amber',
  size = 'lg',
  delta,
  footnote,
  className = '',
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `mp-stat ${className}`
  }, props), label && /*#__PURE__*/React.createElement("span", {
    className: "mp-stat__eyebrow"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: `mp-stat__value mp-stat__value--${color}`,
    style: {
      fontSize: SIZES[size]
    }
  }, value), delta && /*#__PURE__*/React.createElement("span", {
    className: `mp-stat__delta mp-stat__delta--${delta.direction || 'up'}`
  }, (delta.direction || 'up') === 'up' ? '▲' : '▼', " ", delta.label), footnote && /*#__PURE__*/React.createElement("span", {
    className: "mp-stat__foot"
  }, footnote));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/card/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/data/BarChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BarChart — the signature horizontal gradient bar chart from the report.
 * Each row: label · animated amber-gradient track · value. Per-datum color
 * overrides the gradient (used for experience/sentiment scales). An optional
 * average marker draws a vertical hairline across the plot.
 */

const CSS = `
.mp-bc { width: 100%; display: flex; flex-direction: column; gap: 0.5rem; }
.mp-bc__row { display: flex; align-items: center; gap: 0.625rem; }
.mp-bc__label { width: 6rem; flex-shrink: 0; text-align: end; font-family: var(--font-body); font-size: var(--text-xs); color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mp-bc__track { position: relative; flex: 1 1 0; min-width: 0; }
.mp-bc__bar { height: 100%; border-radius: var(--radius-sm); background: var(--brand-gradient); transition: width var(--duration-slow) var(--ease); min-width: 2px; }
.mp-bc__avg { position: absolute; top: 0; height: 100%; width: 1px; background: var(--text-muted); opacity: 0.5; }
.mp-bc__value { width: 2.75rem; flex-shrink: 0; text-align: end; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-primary); font-variant-numeric: tabular-nums; }
.mp-bc__cap { margin-top: 0.5rem; text-align: end; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-barchart-css')) {
  const s = document.createElement('style');
  s.id = 'mp-barchart-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function BarChart({
  data = [],
  max,
  showValues = true,
  isPercent = false,
  rowHeight = 26,
  average,
  className = '',
  ...props
}) {
  const maxVal = max ?? Math.max(...data.map(d => d.value), 1);
  const fmt = v => isPercent ? `${v}%` : v.toLocaleString();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `mp-bc ${className}`,
    role: "img"
  }, props), data.map((d, i) => {
    const pct = Math.min(d.value / maxVal * 100, 100);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "mp-bc__row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "mp-bc__label",
      title: d.label
    }, d.label), /*#__PURE__*/React.createElement("div", {
      className: "mp-bc__track",
      style: {
        height: rowHeight
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "mp-bc__bar",
      style: {
        width: `${pct}%`,
        ...(d.color ? {
          background: d.color
        } : {})
      },
      role: "meter",
      "aria-valuenow": d.value,
      "aria-valuemin": 0,
      "aria-valuemax": maxVal,
      "aria-label": d.label
    }), average !== undefined && /*#__PURE__*/React.createElement("div", {
      className: "mp-bc__avg",
      style: {
        left: `${average / maxVal * 100}%`
      },
      "aria-hidden": "true"
    })), showValues && /*#__PURE__*/React.createElement("span", {
      className: "mp-bc__value"
    }, fmt(d.value)));
  }), average !== undefined && /*#__PURE__*/React.createElement("p", {
    className: "mp-bc__cap"
  }, "\u2205 ", fmt(average)));
}
Object.assign(__ds_scope, { BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DataTable — report ranking table. Uppercase mono column heads, hairline rows,
 * amber-tinted hover. Pass `columns` + `rows`; cells may be any node.
 */

const CSS = `
.mp-dt-wrap { width: 100%; overflow-x: auto; }
.mp-dt { width: 100%; border-collapse: collapse; font-family: var(--font-body); }
.mp-dt thead th { text-align: start; padding: 0.625rem 0.875rem; font-family: var(--font-label); font-size: var(--text-xs); font-weight: var(--weight-semibold); text-transform: uppercase; letter-spacing: var(--tracking-wide); color: var(--text-muted); border-bottom: 1px solid var(--border-strong); white-space: nowrap; }
.mp-dt tbody td { padding: 0.75rem 0.875rem; font-size: var(--text-sm); color: var(--text-secondary); border-bottom: 1px solid var(--border); }
.mp-dt tbody tr { transition: background var(--duration-base) var(--ease); }
.mp-dt tbody tr:hover { background: var(--bg-subtle); }
.mp-dt tbody tr:last-child td { border-bottom: none; }
.mp-dt .mp-dt--num { text-align: end; font-family: var(--font-mono); font-variant-numeric: tabular-nums; color: var(--text-primary); }
.mp-dt .mp-dt--rank { width: 2.5rem; color: var(--text-disabled); font-family: var(--font-mono); }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-datatable-css')) {
  const s = document.createElement('style');
  s.id = 'mp-datatable-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function DataTable({
  columns = [],
  rows = [],
  className = '',
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "mp-dt-wrap"
  }, /*#__PURE__*/React.createElement("table", _extends({
    className: `mp-dt ${className}`
  }, props), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    className: c.align === 'end' ? 'mp-dt--num' : '',
    style: c.width ? {
      width: c.width
    } : undefined
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri
  }, columns.map((c, ci) => /*#__PURE__*/React.createElement("td", {
    key: ci,
    className: c.align === 'end' ? 'mp-dt--num' : c.key === 'rank' ? 'mp-dt--rank' : ''
  }, row[c.key])))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/editorial/ArticleCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ArticleCard — a post card for the index. Three layouts:
 *   • hero — large featured card, cover beside a big headline
 *   • grid — cover on top, title + dek below (the default card)
 *   • list — compact text row, no cover (dense list under the hero)
 *
 * `cover` takes any node (an <image-slot>, <img>, or your own art). When omitted
 * it renders a typographic fallback cover tinted by `accent`.
 */

const CSS = `
.mp-acard { display: block; color: inherit; text-decoration: none; border-radius: var(--radius-lg); transition: transform var(--duration-base) var(--ease); }
.mp-acard:hover { text-decoration: none; }
.mp-acard__cover { position: relative; overflow: hidden; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--bg-surface); aspect-ratio: 16 / 9; }
.mp-acard__cover > * { width: 100%; height: 100%; object-fit: cover; display: block; }
.mp-acard__fallback { width: 100%; height: 100%; display: flex; align-items: flex-end; padding: 1rem; background:
  radial-gradient(120% 140% at 100% 0%, var(--_a1) 0%, transparent 55%),
  linear-gradient(135deg, var(--bg-elevated), var(--bg-surface)); }
.mp-acard__fallback-tag { font-family: var(--font-label); font-size: var(--text-xs); font-weight: var(--weight-bold); text-transform: uppercase; letter-spacing: var(--tracking-widest); color: var(--_a2); }
.mp-acard__cat { font-family: var(--font-label); font-size: var(--text-xs); font-weight: var(--weight-bold); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--canada-300); }
.mp-acard__title { font-family: var(--font-mono); font-weight: 700; letter-spacing: -0.02em; color: var(--text-primary); margin: 0.5rem 0 0; transition: color var(--duration-base) var(--ease); text-wrap: balance; }
.mp-acard:hover .mp-acard__title { color: var(--amber-300); }
.mp-acard__dek { font-family: var(--font-prose); font-size: 1.0625rem; line-height: 1.5; color: var(--text-secondary); margin: 0.55rem 0 0; text-wrap: pretty; }
.mp-acard__meta { margin-top: 0.85rem; }
.mp-acard__arrow { display: inline-block; transition: transform var(--duration-base) var(--ease); }
.mp-acard:hover .mp-acard__arrow { transform: translateX(3px); }

/* grid (default) */
.mp-acard--grid .mp-acard__title { font-size: var(--text-xl); }

/* hero */
.mp-acard--hero { display: grid; grid-template-columns: 1.05fr 1fr; gap: 1.75rem; align-items: center; padding: 1.5rem; border: 1px solid var(--border); background: var(--bg-surface); }
.mp-acard--hero .mp-acard__cover { aspect-ratio: 4 / 3; }
.mp-acard--hero .mp-acard__title { font-size: clamp(1.6rem, 2.4vw, 2.25rem); line-height: 1.1; margin-top: 0.65rem; }
.mp-acard--hero .mp-acard__dek { font-size: 1.1875rem; }
@media (max-width: 760px) { .mp-acard--hero { grid-template-columns: 1fr; } }

/* list */
.mp-acard--list { display: flex; flex-direction: column; gap: 0.4rem; padding: 1.25rem 0; border-top: 1px solid var(--border); }
.mp-acard--list .mp-acard__title { font-size: 1.1875rem; }
.mp-acard--list .mp-acard__dek { font-size: 1rem; margin-top: 0.3rem; }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-articlecard-css')) {
  const s = document.createElement('style');
  s.id = 'mp-articlecard-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
const ACCENTS = {
  amber: ['rgba(252,172,60,0.22)', 'var(--amber-300)'],
  canada: ['rgba(213,43,30,0.28)', 'var(--canada-300)'],
  teal: ['rgba(65,199,199,0.22)', 'var(--teal-400)'],
  indigo: ['rgba(129,140,248,0.22)', 'var(--indigo-400)']
};
function Cover({
  cover,
  accent,
  category
}) {
  const [a1, a2] = ACCENTS[accent] || ACCENTS.amber;
  return /*#__PURE__*/React.createElement("div", {
    className: "mp-acard__cover"
  }, cover || /*#__PURE__*/React.createElement("div", {
    className: "mp-acard__fallback",
    style: {
      '--_a1': a1,
      '--_a2': a2
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mp-acard__fallback-tag"
  }, category || 'Essay')));
}
function ArticleCard({
  variant = 'grid',
  title,
  dek,
  category,
  accent = 'amber',
  cover,
  meta,
  href = '#',
  showCover = true,
  className = '',
  ...props
}) {
  const withCover = showCover && variant !== 'list';
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    className: `mp-acard mp-acard--${variant} ${className}`
  }, props), variant === 'hero' ? /*#__PURE__*/React.createElement(React.Fragment, null, withCover && /*#__PURE__*/React.createElement(Cover, {
    cover: cover,
    accent: accent,
    category: category
  }), /*#__PURE__*/React.createElement("div", null, category && /*#__PURE__*/React.createElement("span", {
    className: "mp-acard__cat"
  }, category), /*#__PURE__*/React.createElement("h3", {
    className: "mp-acard__title"
  }, title), dek && /*#__PURE__*/React.createElement("p", {
    className: "mp-acard__dek"
  }, dek), meta && /*#__PURE__*/React.createElement("div", {
    className: "mp-acard__meta"
  }, meta))) : /*#__PURE__*/React.createElement(React.Fragment, null, withCover && /*#__PURE__*/React.createElement(Cover, {
    cover: cover,
    accent: accent,
    category: category
  }), variant === 'list' && category && /*#__PURE__*/React.createElement("span", {
    className: "mp-acard__cat"
  }, category), /*#__PURE__*/React.createElement("h3", {
    className: "mp-acard__title"
  }, title), dek && /*#__PURE__*/React.createElement("p", {
    className: "mp-acard__dek"
  }, dek), meta && /*#__PURE__*/React.createElement("div", {
    className: "mp-acard__meta"
  }, meta)));
}
Object.assign(__ds_scope, { ArticleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/ArticleCard.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Byline.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Byline — the author/meta row under an article title (or on a card).
 * Avatar (initials), name, publish date, reading time, and topic tags.
 */

const CSS = `
.mp-byline { display: flex; align-items: center; gap: 0.75rem; font-family: var(--font-mono); }
.mp-byline__avatar { width: 2.25rem; height: 2.25rem; border-radius: 9999px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: var(--text-sm); color: var(--ink-900); background: var(--brand-gradient); border: 1px solid rgba(0,0,0,0.15); }
.mp-byline__col { display: flex; flex-direction: column; gap: 0.1rem; min-width: 0; }
.mp-byline__name { font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--text-primary); }
.mp-byline__meta { display: flex; align-items: center; gap: 0.5rem; font-size: var(--text-xs); color: var(--text-muted); flex-wrap: wrap; }
.mp-byline__meta > span { white-space: nowrap; }
.mp-byline__dot { width: 0.2rem; height: 0.2rem; border-radius: 9999px; background: currentColor; opacity: 0.6; }
.mp-byline__tag { font-family: var(--font-label); font-size: 0.6875rem; text-transform: uppercase; letter-spacing: var(--tracking-wide); color: var(--canada-300); }
.mp-byline--compact .mp-byline__avatar { width: 1.75rem; height: 1.75rem; font-size: var(--text-xs); }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-byline-css')) {
  const s = document.createElement('style');
  s.id = 'mp-byline-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function initials(name = '') {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}
function Byline({
  author = 'Matthew Purdon',
  avatar,
  date,
  readingTime,
  tag,
  compact = false,
  className = '',
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `mp-byline ${compact ? 'mp-byline--compact' : ''} ${className}`
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "mp-byline__avatar",
    "aria-hidden": "true"
  }, avatar || initials(author)), /*#__PURE__*/React.createElement("span", {
    className: "mp-byline__col"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mp-byline__name"
  }, author), /*#__PURE__*/React.createElement("span", {
    className: "mp-byline__meta"
  }, date && /*#__PURE__*/React.createElement("span", null, date), date && readingTime && /*#__PURE__*/React.createElement("span", {
    className: "mp-byline__dot"
  }), readingTime && /*#__PURE__*/React.createElement("span", null, readingTime), tag && (readingTime || date) && /*#__PURE__*/React.createElement("span", {
    className: "mp-byline__dot"
  }), tag && /*#__PURE__*/React.createElement("span", {
    className: "mp-byline__tag"
  }, tag))));
}
Object.assign(__ds_scope, { Byline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Byline.jsx", error: String((e && e.message) || e) }); }

// components/editorial/CodeBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CodeBlock — a captioned code surface with a window header (filename + dots),
 * optional line numbers, and a copy affordance. Pass raw code as the `code`
 * string (preserves whitespace) or as children. No live syntax highlighting —
 * tokens are styled if you wrap them, otherwise it's clean mono on dark.
 */

const CSS = `
.mp-code { margin: var(--prose-para-gap, 1.4em) 0; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--code-bg); overflow: hidden; }
.mp-code__head { display: flex; align-items: center; gap: 0.625rem; padding: 0.55rem 0.875rem; background: var(--code-header-bg); border-bottom: 1px solid var(--border); }
.mp-code__dots { display: inline-flex; gap: 0.3rem; }
.mp-code__dots i { width: 0.55rem; height: 0.55rem; border-radius: 9999px; background: var(--border-strong); }
.mp-code__file { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-secondary); letter-spacing: 0.01em; }
.mp-code__lang { margin-inline-start: auto; font-family: var(--font-label); font-size: 0.6875rem; text-transform: uppercase; letter-spacing: var(--tracking-wide); color: var(--text-muted); }
.mp-code__scroll { overflow-x: auto; }
.mp-code__pre { margin: 0; padding: 1rem 1.15rem; font-family: var(--font-mono); font-size: var(--text-sm); line-height: 1.6; color: var(--code-text); }
.mp-code--numbered .mp-code__pre { counter-reset: ln; padding-inline-start: 0; }
.mp-code--numbered .mp-code__line { display: block; counter-increment: ln; padding-inline-start: 3.25rem; position: relative; }
.mp-code--numbered .mp-code__line::before { content: counter(ln); position: absolute; left: 0; width: 2.25rem; text-align: end; color: var(--code-comment); }
.mp-code__cap { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--prose-muted); padding: 0.6rem 0.875rem; border-top: 1px solid var(--border); background: var(--code-header-bg); }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-codeblock-css')) {
  const s = document.createElement('style');
  s.id = 'mp-codeblock-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function CodeBlock({
  filename,
  lang,
  caption,
  numbered = false,
  code,
  className = '',
  children,
  ...props
}) {
  const text = code != null ? code : typeof children === 'string' ? children : null;
  const lines = numbered && text != null ? text.replace(/\n$/, '').split('\n') : null;
  return /*#__PURE__*/React.createElement("figure", _extends({
    className: `mp-code ${numbered ? 'mp-code--numbered' : ''} ${className}`
  }, props), (filename || lang) && /*#__PURE__*/React.createElement("div", {
    className: "mp-code__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mp-code__dots",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), filename && /*#__PURE__*/React.createElement("span", {
    className: "mp-code__file"
  }, filename), lang && /*#__PURE__*/React.createElement("span", {
    className: "mp-code__lang"
  }, lang)), /*#__PURE__*/React.createElement("div", {
    className: "mp-code__scroll"
  }, /*#__PURE__*/React.createElement("pre", {
    className: "mp-code__pre"
  }, /*#__PURE__*/React.createElement("code", null, lines ? lines.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "mp-code__line"
  }, l || '\u00A0', '\n')) : text != null ? text : children))), caption && /*#__PURE__*/React.createElement("figcaption", {
    className: "mp-code__cap"
  }, caption));
}
Object.assign(__ds_scope, { CodeBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/CodeBlock.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Prose.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Prose — the long-form reading wrapper. Sets article body in IBM Plex Serif at
 * a comfortable size/measure and styles every common element (headings, links,
 * lists, blockquote, inline code, hr, images, tables). Drop raw article markup
 * (or MDX output) inside. Optional drop-cap on the first paragraph.
 */

const CSS = `
.mp-prose { font-family: var(--font-prose); font-size: var(--prose-size); line-height: var(--prose-leading); color: var(--prose-text); max-width: var(--prose-measure); }
.mp-prose > * { margin-block: 0; }
.mp-prose > * + * { margin-block-start: var(--prose-para-gap); }
.mp-prose p { text-wrap: pretty; }
.mp-prose a { color: var(--prose-link); text-decoration: none; border-bottom: 1px solid rgba(244,131,122,0.4); transition: color var(--duration-fast) var(--ease), border-color var(--duration-fast) var(--ease); }
.mp-prose a:hover { color: var(--prose-link-hover); border-bottom-color: var(--prose-link-hover); }
.mp-prose strong { color: var(--prose-heading); font-weight: 600; }
.mp-prose em { font-style: italic; }
.mp-prose h2 { font-family: var(--font-mono); font-weight: 700; font-size: var(--prose-h2); line-height: 1.15; letter-spacing: -0.02em; color: var(--prose-heading); margin-block-start: 2em; scroll-margin-top: 5rem; }
.mp-prose h3 { font-family: var(--font-mono); font-weight: 600; font-size: var(--prose-h3); line-height: 1.25; letter-spacing: -0.01em; color: var(--prose-heading); margin-block-start: 1.6em; scroll-margin-top: 5rem; }
.mp-prose h2 + p, .mp-prose h3 + p { margin-block-start: 0.6em; }
.mp-prose ul, .mp-prose ol { padding-inline-start: 1.4em; }
.mp-prose li + li { margin-block-start: 0.4em; }
.mp-prose li::marker { color: var(--prose-marker); }
.mp-prose ul > li::marker { content: '— '; }
.mp-prose blockquote { margin: 0; padding-inline-start: 1.25rem; border-inline-start: 3px solid var(--canada-500); color: var(--text-secondary); font-style: italic; }
.mp-prose hr { border: none; border-top: 1px solid var(--prose-rule); margin-block: 2.5em; }
.mp-prose code { font-family: var(--font-mono); font-size: 0.85em; background: var(--code-bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.1em 0.4em; color: var(--amber-300); }
.mp-prose pre { background: var(--code-bg); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1rem 1.15rem; overflow-x: auto; font-size: var(--text-sm); }
.mp-prose pre code { background: none; border: none; padding: 0; color: var(--code-text); }
.mp-prose img { max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border); }
.mp-prose figure { margin: 0; }
.mp-prose figcaption { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--prose-muted); margin-top: 0.5rem; text-align: center; }
.mp-prose--dropcap > p:first-of-type::first-letter { font-family: var(--font-mono); font-weight: 700; float: inline-start; font-size: 3.4em; line-height: 0.78; padding-inline-end: 0.08em; padding-block-start: 0.04em; color: var(--prose-marker); }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-prose-css')) {
  const s = document.createElement('style');
  s.id = 'mp-prose-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Prose({
  dropcap = false,
  as: Tag = 'div',
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `mp-prose ${dropcap ? 'mp-prose--dropcap' : ''} ${className}`
  }, props), children);
}
Object.assign(__ds_scope, { Prose });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Prose.jsx", error: String((e && e.message) || e) }); }

// components/editorial/PullQuote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PullQuote — oversized serif quotation that interrupts the column for emphasis.
 * Optional citation. `align` can pull it wide (full column) or float aside.
 */

const CSS = `
.mp-pq { margin: 2em 0; padding: 0; border: none; }
.mp-pq__mark { font-family: var(--font-mono); font-size: 3rem; line-height: 0.5; color: var(--canada-500); display: block; height: 1.4rem; }
.mp-pq__text { font-family: var(--font-prose); font-weight: 500; font-size: var(--prose-pullquote); line-height: 1.3; letter-spacing: -0.01em; color: var(--prose-heading); margin: 0; text-wrap: balance; }
.mp-pq__cite { display: block; margin-top: 0.9rem; font-family: var(--font-label); font-size: var(--text-xs); font-weight: var(--weight-semibold); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--amber-300); font-style: normal; }
.mp-pq__cite::before { content: '— '; }
.mp-pq--center { text-align: center; }
.mp-pq--center .mp-pq__mark { height: 1.8rem; }
@media (min-width: 1100px) {
  .mp-pq--aside { float: inline-end; width: 17rem; margin-inline-start: 2.25rem; margin-block: 0.35rem 1rem; }
  .mp-pq--aside .mp-pq__text { font-size: 1.5rem; }
}
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-pullquote-css')) {
  const s = document.createElement('style');
  s.id = 'mp-pullquote-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function PullQuote({
  cite,
  align = 'wide',
  mark = true,
  className = '',
  children,
  ...props
}) {
  const mod = align === 'center' ? 'mp-pq--center' : align === 'aside' ? 'mp-pq--aside' : '';
  return /*#__PURE__*/React.createElement("figure", _extends({
    className: `mp-pq ${mod} ${className}`
  }, props), mark && /*#__PURE__*/React.createElement("span", {
    className: "mp-pq__mark",
    "aria-hidden": "true"
  }, "\u201C"), /*#__PURE__*/React.createElement("blockquote", {
    className: "mp-pq__text"
  }, children), cite && /*#__PURE__*/React.createElement("figcaption", {
    className: "mp-pq__cite"
  }, cite));
}
Object.assign(__ds_scope, { PullQuote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/PullQuote.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Banner.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Banner — full-width announcement / status bar with a bottom border.
 * Variants map to the semantic status colors. Optional action slot + dismiss.
 */

const CSS = `
.mp-banner { position: relative; display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.75rem 1.5rem; font-family: var(--font-body); font-size: var(--text-sm); font-weight: var(--weight-medium); border-bottom: 1px solid transparent; }
.mp-banner--info    { background: var(--info-bg);    border-color: var(--info-border);    color: var(--info); }
.mp-banner--success { background: var(--success-bg); border-color: var(--success-border); color: var(--success); }
.mp-banner--warning { background: var(--warning-bg); border-color: var(--warning-border); color: var(--warning); }
.mp-banner--error   { background: var(--error-bg);   border-color: var(--error-border);   color: var(--error); }
.mp-banner--brand   { background: var(--bg-surface); border-color: var(--border); color: var(--text-primary); }
.mp-banner__msg { display: flex; align-items: center; gap: 0.75rem; min-width: 0; }
.mp-banner__actions { display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0; }
.mp-banner__x { display: inline-flex; cursor: pointer; opacity: 0.7; background: none; border: none; color: inherit; padding: 0.25rem; line-height: 0; }
.mp-banner__x:hover { opacity: 1; }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-banner-css')) {
  const s = document.createElement('style');
  s.id = 'mp-banner-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Banner({
  variant = 'info',
  action,
  onDismiss,
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "region",
    "aria-live": "polite",
    className: `mp-banner mp-banner--${variant} ${className}`
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "mp-banner__msg"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "mp-banner__actions"
  }, action, onDismiss && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mp-banner__x",
    "aria-label": "Dismiss",
    onClick: onDismiss
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18L18 6M6 6l12 12",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))));
}
Object.assign(__ds_scope, { Banner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Banner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Spinner.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Spinner — minimal mono ring. Inherits currentColor; size via prop.
 * Progress — labelled bar with the amber gradient fill.
 */

const CSS = `
.mp-spinner { display: inline-block; border-radius: 9999px; border-style: solid; border-color: currentColor; border-right-color: transparent; animation: mp-spin 0.7s linear infinite; }
@keyframes mp-spin { to { transform: rotate(360deg); } }

.mp-progress { width: 100%; }
.mp-progress__head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.375rem; }
.mp-progress__label { font-family: var(--font-label); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wide); color: var(--text-muted); white-space: nowrap; }
.mp-progress__val { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-secondary); font-variant-numeric: tabular-nums; }
.mp-progress__track { height: 0.5rem; border-radius: var(--radius-full); background: var(--bg-subtle); overflow: hidden; }
.mp-progress__fill { height: 100%; border-radius: var(--radius-full); background: var(--brand-gradient); transition: width var(--duration-slow) var(--ease); }
.mp-progress__fill--indigo { background: var(--indigo-500); }
.mp-progress__fill--teal   { background: var(--teal-500); }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-progress-css')) {
  const s = document.createElement('style');
  s.id = 'mp-progress-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Spinner({
  size = 20,
  thickness = 2,
  className = '',
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `mp-spinner ${className}`,
    role: "status",
    "aria-label": "Loading",
    style: {
      width: size,
      height: size,
      borderWidth: thickness,
      ...style
    }
  }, props));
}
function Progress({
  value = 0,
  max = 100,
  label,
  showValue = true,
  color = 'amber',
  className = '',
  ...props
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `mp-progress ${className}`
  }, props), (label || showValue) && /*#__PURE__*/React.createElement("div", {
    className: "mp-progress__head"
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "mp-progress__label"
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    className: "mp-progress__val"
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    className: "mp-progress__track",
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": max
  }, /*#__PURE__*/React.createElement("div", {
    className: `mp-progress__fill mp-progress__fill--${color}`,
    style: {
      width: `${pct}%`
    }
  })));
}
Object.assign(__ds_scope, { Spinner, Progress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Spinner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Toast — transient notification card. Pair with a status accent stripe.
 * Stateless presentational component; manage stacking/visibility in your app.
 */

const CSS = `
.mp-toast { display: flex; align-items: flex-start; gap: 0.75rem; width: 340px; max-width: 100%; padding: 0.875rem 1rem; border-radius: var(--radius-lg); background: var(--bg-elevated); border: 1px solid var(--border); box-shadow: var(--shadow-lg); position: relative; overflow: hidden; }
.mp-toast::before { content: ''; position: absolute; inset-block: 0; inset-inline-start: 0; width: 3px; background: var(--accent); }
.mp-toast--success::before { background: var(--success); }
.mp-toast--error::before   { background: var(--error); }
.mp-toast--warning::before { background: var(--warning); }
.mp-toast--amber::before   { background: var(--brand); }
.mp-toast__body { flex: 1; min-width: 0; }
.mp-toast__title { margin: 0; font-family: var(--font-display); font-size: var(--text-sm); font-weight: var(--weight-bold); color: var(--text-primary); }
.mp-toast__desc { margin: 0.125rem 0 0; font-family: var(--font-body); font-size: var(--text-xs); line-height: var(--leading-normal); color: var(--text-muted); }
.mp-toast__x { background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 0.125rem; line-height: 0; flex-shrink: 0; }
.mp-toast__x:hover { color: var(--text-primary); }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-toast-css')) {
  const s = document.createElement('style');
  s.id = 'mp-toast-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Toast({
  variant = 'default',
  title,
  children,
  icon,
  onDismiss,
  className = '',
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    "aria-live": "polite",
    className: `mp-toast mp-toast--${variant} ${className}`
  }, props), icon && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      flexShrink: 0
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    className: "mp-toast__body"
  }, title && /*#__PURE__*/React.createElement("p", {
    className: "mp-toast__title"
  }, title), children && /*#__PURE__*/React.createElement("p", {
    className: "mp-toast__desc"
  }, children)), onDismiss && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mp-toast__x",
    "aria-label": "Dismiss",
    onClick: onDismiss
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18L18 6M6 6l12 12",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tooltip — hover/focus label on a raised dark surface with a small arrow.
 * Pure-CSS positioning around the trigger; `side` chooses placement.
 */

const CSS = `
.mp-tt { position: relative; display: inline-flex; }
.mp-tt__pop { position: absolute; z-index: var(--z-tooltip, 1000); pointer-events: none; opacity: 0; transform: translateY(2px); transition: opacity var(--duration-fast) var(--ease), transform var(--duration-fast) var(--ease); background: var(--bg-elevated); color: var(--text-primary); border: 1px solid var(--border-strong); border-radius: var(--radius-md); padding: 0.375rem 0.625rem; font-family: var(--font-body); font-size: var(--text-xs); white-space: nowrap; box-shadow: var(--shadow-md); }
.mp-tt:hover .mp-tt__pop, .mp-tt:focus-within .mp-tt__pop { opacity: 1; transform: translateY(0); }
.mp-tt__pop--top    { bottom: calc(100% + 6px); left: 50%; transform: translate(-50%, 2px); }
.mp-tt:hover .mp-tt__pop--top, .mp-tt:focus-within .mp-tt__pop--top { transform: translate(-50%, 0); }
.mp-tt__pop--bottom { top: calc(100% + 6px); left: 50%; transform: translate(-50%, -2px); }
.mp-tt:hover .mp-tt__pop--bottom, .mp-tt:focus-within .mp-tt__pop--bottom { transform: translate(-50%, 0); }
.mp-tt__pop--right  { left: calc(100% + 6px); top: 50%; transform: translate(-2px, -50%); }
.mp-tt:hover .mp-tt__pop--right, .mp-tt:focus-within .mp-tt__pop--right { transform: translate(0, -50%); }
.mp-tt__pop--left   { right: calc(100% + 6px); top: 50%; transform: translate(2px, -50%); }
.mp-tt:hover .mp-tt__pop--left, .mp-tt:focus-within .mp-tt__pop--left { transform: translate(0, -50%); }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-tooltip-css')) {
  const s = document.createElement('style');
  s.id = 'mp-tooltip-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Tooltip({
  label,
  side = 'top',
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `mp-tt ${className}`
  }, props), children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    className: `mp-tt__pop mp-tt__pop--${side}`
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkbox & Radio — amber-filled controls with a cream check/dot.
 * Both render a hidden native input for accessibility and a styled box.
 */

const CSS = `
.mp-check { display: inline-flex; align-items: center; gap: 0.625rem; cursor: pointer; font-family: var(--font-body); font-size: var(--text-sm); color: var(--text-secondary); user-select: none; }
.mp-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.mp-check__box { display: inline-flex; align-items: center; justify-content: center; width: 1.125rem; height: 1.125rem; border: 1.5px solid var(--border-strong); background: var(--bg-surface); transition: all var(--duration-fast) var(--ease); flex-shrink: 0; }
.mp-check__box--cb { border-radius: var(--radius-sm); }
.mp-check__box--rb { border-radius: 9999px; }
.mp-check input:focus-visible + .mp-check__box { box-shadow: 0 0 0 3px rgba(129,140,248,0.3); }
.mp-check input:checked + .mp-check__box { background: var(--brand); border-color: var(--brand); }
.mp-check__tick { color: var(--ink-900); opacity: 0; transform: scale(0.6); transition: all var(--duration-fast) var(--ease); }
.mp-check input:checked + .mp-check__box .mp-check__tick { opacity: 1; transform: scale(1); }
.mp-check__dot { width: 0.5rem; height: 0.5rem; border-radius: 9999px; background: var(--ink-900); opacity: 0; transform: scale(0.4); transition: all var(--duration-fast) var(--ease); }
.mp-check input:checked + .mp-check__box .mp-check__dot { opacity: 1; transform: scale(1); }
.mp-check--disabled { opacity: 0.4; pointer-events: none; }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-check-css')) {
  const s = document.createElement('style');
  s.id = 'mp-check-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Checkbox({
  label,
  disabled = false,
  className = '',
  ...props
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `mp-check ${disabled ? 'mp-check--disabled' : ''} ${className}`
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    disabled: disabled
  }, props)), /*#__PURE__*/React.createElement("span", {
    className: "mp-check__box mp-check__box--cb"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "mp-check__tick",
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12l5 5L19 7",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
function Radio({
  label,
  disabled = false,
  className = '',
  ...props
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `mp-check ${disabled ? 'mp-check--disabled' : ''} ${className}`
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    disabled: disabled
  }, props)), /*#__PURE__*/React.createElement("span", {
    className: "mp-check__box mp-check__box--rb"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mp-check__dot",
    "aria-hidden": "true"
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox, Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — text field with optional prefix/suffix adornments.
 * Dark surface, hairline border, indigo focus ring.
 */

const CSS = `
.mp-field { display: flex; align-items: center; gap: 0.5rem; width: 100%; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--bg-surface); padding: 0 0.75rem; height: 2.5rem; transition: border-color var(--duration-base) var(--ease), box-shadow var(--duration-base) var(--ease); }
.mp-field:hover { border-color: var(--border-strong); }
.mp-field:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(129,140,248,0.18); }
.mp-field--error { border-color: var(--error); }
.mp-field--error:focus-within { box-shadow: 0 0 0 3px rgba(254,106,106,0.18); }
.mp-field--disabled { opacity: 0.4; pointer-events: none; }
.mp-field__adorn { display: inline-flex; align-items: center; color: var(--text-muted); flex-shrink: 0; }
.mp-input { flex: 1; min-width: 0; background: transparent; border: none; outline: none; color: var(--text-primary); font-family: var(--font-body); font-size: var(--text-sm); }
.mp-input::placeholder { color: var(--text-disabled); }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-input-css')) {
  const s = document.createElement('style');
  s.id = 'mp-input-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Input({
  prefix,
  suffix,
  error = false,
  disabled = false,
  className = '',
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `mp-field ${error ? 'mp-field--error' : ''} ${disabled ? 'mp-field--disabled' : ''} ${className}`
  }, prefix && /*#__PURE__*/React.createElement("span", {
    className: "mp-field__adorn"
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    className: "mp-input",
    disabled: disabled,
    "aria-invalid": error || undefined
  }, props)), suffix && /*#__PURE__*/React.createElement("span", {
    className: "mp-field__adorn"
  }, suffix));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — native-backed select with a custom chevron and DS field styling.
 */

const CSS = `
.mp-select-wrap { position: relative; display: inline-flex; width: 100%; }
.mp-select { appearance: none; -webkit-appearance: none; width: 100%; height: 2.5rem; padding: 0 2.25rem 0 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--bg-surface); color: var(--text-primary); font-family: var(--font-body); font-size: var(--text-sm); cursor: pointer; transition: border-color var(--duration-base) var(--ease), box-shadow var(--duration-base) var(--ease); }
.mp-select:hover { border-color: var(--border-strong); }
.mp-select:focus-visible { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(129,140,248,0.18); }
.mp-select:disabled { opacity: 0.4; cursor: not-allowed; }
.mp-select option { background: var(--bg-elevated); color: var(--text-primary); }
.mp-select__chevron { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--text-muted); }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-select-css')) {
  const s = document.createElement('style');
  s.id = 'mp-select-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Select({
  options = [],
  placeholder,
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "mp-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    className: `mp-select ${className}`
  }, props), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true,
    hidden: true
  }, placeholder), children ?? options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("svg", {
    className: "mp-select__chevron",
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Switch — pill toggle. Off = hairline track, On = amber track with cream knob.
 */

const CSS = `
.mp-switch { display: inline-flex; align-items: center; gap: 0.625rem; cursor: pointer; font-family: var(--font-body); font-size: var(--text-sm); color: var(--text-secondary); user-select: none; }
.mp-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.mp-switch__track { position: relative; width: 2.5rem; height: 1.375rem; border-radius: 9999px; background: var(--bg-subtle); border: 1px solid var(--border); transition: background var(--duration-base) var(--ease), border-color var(--duration-base) var(--ease); flex-shrink: 0; }
.mp-switch__knob { position: absolute; top: 50%; left: 2px; transform: translateY(-50%); width: 1rem; height: 1rem; border-radius: 9999px; background: var(--text-muted); transition: all var(--duration-base) var(--ease); }
.mp-switch input:checked + .mp-switch__track { background: var(--brand); border-color: var(--brand); }
.mp-switch input:checked + .mp-switch__track .mp-switch__knob { left: calc(100% - 1rem - 2px); background: var(--ink-900); }
.mp-switch input:focus-visible + .mp-switch__track { box-shadow: 0 0 0 3px rgba(129,140,248,0.3); }
.mp-switch--disabled { opacity: 0.4; pointer-events: none; }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-switch-css')) {
  const s = document.createElement('style');
  s.id = 'mp-switch-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Switch({
  label,
  disabled = false,
  className = '',
  ...props
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `mp-switch ${disabled ? 'mp-switch--disabled' : ''} ${className}`
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    disabled: disabled
  }, props)), /*#__PURE__*/React.createElement("span", {
    className: "mp-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mp-switch__knob"
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sidebar — fixed product navigation rail (256px, collapses to 64px).
 * Compose with SidebarHeader / SidebarGroup / SidebarGroupLabel / SidebarItem /
 * SidebarFooter. Active item gets an indigo wash + label.
 */

const CSS = `
.mp-sb { display: flex; flex-direction: column; width: 16rem; height: 100%; background: var(--bg-surface); border-inline-end: 1px solid var(--border); transition: width var(--duration-slow) var(--ease); }
.mp-sb[data-collapsed="true"] { width: 4rem; }
.mp-sb__header { display: flex; align-items: center; height: 4rem; padding: 0 1rem; border-bottom: 1px solid var(--border); flex-shrink: 0; }
.mp-sb__content { display: flex; flex-direction: column; gap: 0.125rem; padding: 0.5rem; overflow-y: auto; flex: 1; }
.mp-sb__footer { padding: 0.5rem; border-top: 1px solid var(--border); }
.mp-sb__group { padding: 0.5rem 0; }
.mp-sb__grouplabel { padding: 0 0.75rem; margin-bottom: 0.375rem; font-family: var(--font-label); font-size: var(--text-xs); font-weight: var(--weight-semibold); text-transform: uppercase; letter-spacing: var(--tracking-widest); color: var(--text-disabled); }
.mp-sb__item { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0.75rem; border-radius: var(--radius-md); font-family: var(--font-body); font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-muted); cursor: pointer; transition: background var(--duration-base) var(--ease), color var(--duration-base) var(--ease); text-decoration: none; }
.mp-sb__item:hover { background: var(--bg-subtle); color: var(--text-primary); text-decoration: none; }
.mp-sb__item[aria-current="page"] { background: rgba(129,140,248,0.12); color: var(--indigo-400); }
.mp-sb__item-icon { display: inline-flex; flex-shrink: 0; width: 1.125rem; height: 1.125rem; }
.mp-sb__item-label { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mp-sb__item-badge { margin-inline-start: auto; flex-shrink: 0; }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-sidebar-css')) {
  const s = document.createElement('style');
  s.id = 'mp-sidebar-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Sidebar({
  collapsed = false,
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("aside", _extends({
    "data-collapsed": collapsed,
    className: `mp-sb ${className}`
  }, props), children);
}
function SidebarHeader({
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `mp-sb__header ${className}`
  }, props), children);
}
function SidebarContent({
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `mp-sb__content ${className}`
  }, props), children);
}
function SidebarFooter({
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `mp-sb__footer ${className}`
  }, props), children);
}
function SidebarGroup({
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `mp-sb__group ${className}`
  }, props), children);
}
function SidebarGroupLabel({
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    className: `mp-sb__grouplabel ${className}`
  }, props), children);
}
function SidebarItem({
  active = false,
  icon,
  badge,
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    "aria-current": active ? 'page' : undefined,
    className: `mp-sb__item ${className}`
  }, props), icon && /*#__PURE__*/React.createElement("span", {
    className: "mp-sb__item-icon",
    "aria-hidden": "true"
  }, icon), /*#__PURE__*/React.createElement("span", {
    className: "mp-sb__item-label"
  }, children), badge && /*#__PURE__*/React.createElement("span", {
    className: "mp-sb__item-badge"
  }, badge));
}
Object.assign(__ds_scope, { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tabs — underline tab bar. Active tab gets an amber underline + cream label.
 * Controlled via `value`/`onValueChange`, or uncontrolled with `defaultValue`.
 */

const CSS = `
.mp-tabs__list { display: flex; gap: 0.25rem; border-bottom: 1px solid var(--border); }
.mp-tab { position: relative; appearance: none; background: none; border: none; cursor: pointer; padding: 0.625rem 0.875rem; font-family: var(--font-label); font-size: var(--text-xs); font-weight: var(--weight-semibold); text-transform: uppercase; letter-spacing: var(--tracking-wide); color: var(--text-muted); transition: color var(--duration-base) var(--ease); }
.mp-tab:hover { color: var(--text-secondary); }
.mp-tab[data-active="true"] { color: var(--text-primary); }
.mp-tab[data-active="true"]::after { content: ''; position: absolute; left: 0.5rem; right: 0.5rem; bottom: -1px; height: 2px; background: var(--brand); border-radius: 2px; }
.mp-tab:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--accent); border-radius: var(--radius-sm); }
.mp-tabs__panel { padding-top: 1rem; }
`;
if (typeof document !== 'undefined' && !document.getElementById('mp-tabs-css')) {
  const s = document.createElement('style');
  s.id = 'mp-tabs-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Tabs({
  items = [],
  value,
  defaultValue,
  onValueChange,
  className = '',
  children,
  ...props
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? (items[0] && items[0].value));
  const active = value !== undefined ? value : internal;
  const select = v => {
    if (value === undefined) setInternal(v);
    onValueChange && onValueChange(v);
  };
  const activeItem = items.find(i => i.value === active);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `mp-tabs ${className}`
  }, props), /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    className: "mp-tabs__list"
  }, items.map(i => /*#__PURE__*/React.createElement("button", {
    key: i.value,
    role: "tab",
    "aria-selected": i.value === active,
    "data-active": i.value === active,
    className: "mp-tab",
    onClick: () => select(i.value)
  }, i.label))), /*#__PURE__*/React.createElement("div", {
    role: "tabpanel",
    className: "mp-tabs__panel"
  }, activeItem && activeItem.content ? activeItem.content : children));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/ArticlePage.jsx
try { (() => {
/* Blog UI kit — single article: header, prose, soap-box aside, callouts, quote, code. */
(function () {
  const {
    Prose,
    Soapbox,
    Callout,
    PullQuote,
    CodeBlock,
    Byline,
    Badge
  } = window.StateOfAIDesignSystem_c9312a;
  const SERVER_CODE = `// eleven services, one shared contract\nexport const handler = defineHandler({\n  route: "/deploy/:env",\n  async run({ params, log }) {\n    log.info("deploying", { env: params.env })\n    await ship(params.env)        // boring on purpose\n    return { ok: true }\n  },\n})`;
  function ArticlePage({
    onBack,
    onTopic
  }) {
    const back = e => {
      if (onBack) {
        e.preventDefault();
        onBack();
      }
    };
    return /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("header", {
      style: {
        maxWidth: 820,
        margin: '0 auto',
        padding: '56px 32px 36px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "index.html",
      onClick: back,
      style: {
        fontFamily: 'var(--font-label)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-wider)',
        fontSize: 'var(--text-xs)',
        fontWeight: 700,
        color: 'var(--canada-300)',
        textDecoration: 'none'
      }
    }, "\u2190 Systems"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: 'clamp(32px, 4.6vw, 52px)',
        lineHeight: 1.08,
        letterSpacing: '-0.03em',
        margin: '18px 0 20px',
        color: 'var(--text-primary)',
        textWrap: 'balance'
      }
    }, "Why I moved off the monorepo"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-prose)',
        fontSize: 'var(--prose-lead)',
        lineHeight: 1.5,
        color: 'var(--text-secondary)',
        maxWidth: 640,
        margin: '0 auto 28px',
        textWrap: 'pretty'
      }
    }, "A year ago I split a 200,000-line monorepo into eleven repositories. Here's the honest scorecard."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Byline, {
      date: "May 28, 2026",
      readingTime: "8 min read",
      tag: "Systems"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1080,
        margin: '0 auto 8px',
        padding: '0 32px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 280,
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        background: 'radial-gradient(120% 160% at 88% 0%, rgba(213,43,30,0.34) 0%, transparent 52%), radial-gradient(90% 140% at 0% 100%, rgba(252,172,60,0.20) 0%, transparent 55%), linear-gradient(135deg, var(--bg-elevated), var(--bg-surface))',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 24
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-muted)'
      }
    }, "fig.0 \u2014 eleven repos, one regret"))), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 760,
        margin: '0 auto',
        padding: '32px 32px 64px'
      }
    }, /*#__PURE__*/React.createElement(Prose, {
      dropcap: true,
      style: {
        maxWidth: '100%'
      }
    }, /*#__PURE__*/React.createElement("p", null, "The pitch for a monorepo is seductive: one clone, one version of everything, atomic cross-cutting changes. For three years it served us well. Then the build times crept past ten minutes, the CI bill crept past the coffee budget, and onboarding a new engineer meant explaining a graph nobody fully held in their head."), /*#__PURE__*/React.createElement(Soapbox, {
      variant: "aside",
      label: "Hot take",
      signoff: "and I mean it"
    }, /*#__PURE__*/React.createElement("p", null, "Most teams reaching for a monorepo have a ", /*#__PURE__*/React.createElement("em", null, "tooling"), " problem, not a ", /*#__PURE__*/React.createElement("em", null, "repository"), " problem. Fix the tooling first and the urge usually evaporates.")), /*#__PURE__*/React.createElement("p", null, "So we split it. Eleven repositories, each with a clear owner and a published contract. It took a quarter, it broke things, and on balance I'd do it again \u2014 with three exceptions I'll get to. First, the parts that genuinely improved."), /*#__PURE__*/React.createElement("h2", null, "The scorecard"), /*#__PURE__*/React.createElement("p", null, "The wins were mostly about ", /*#__PURE__*/React.createElement("strong", null, "blast radius"), ". A bad change now fails in one place instead of fanning out across the graph. Deploys got smaller and, crucially, more boring."), /*#__PURE__*/React.createElement(Callout, {
      variant: "note"
    }, "\"Boring\" is the highest compliment I pay a deploy. It means the interesting work happened earlier, in review, where it belongs."), /*#__PURE__*/React.createElement("p", null, "Our deploy handler shrank to something a new hire can read on day one:"), /*#__PURE__*/React.createElement(CodeBlock, {
      filename: "deploy.ts",
      lang: "ts",
      caption: "The whole deploy path, minus the parts that page you at 3am."
    }, SERVER_CODE), /*#__PURE__*/React.createElement(PullQuote, {
      cite: "Matthew Purdon"
    }, "The repository was never the bottleneck. The bottleneck was that we'd hidden eleven teams behind one git history."), /*#__PURE__*/React.createElement("h2", null, "What I'd never do again"), /*#__PURE__*/React.createElement("p", null, "Splitting shared types into their own package felt clean and cost us a month of version-skew bugs. If I did it over, the contracts would ship as generated artifacts \u2014 just ", /*#__PURE__*/React.createElement("em", null, "plain text"), " the build emits \u2014 not a hand-maintained library."), /*#__PURE__*/React.createElement(Callout, {
      variant: "warning",
      title: "Learn from this"
    }, "Don't split a type package out of a monorepo without a generation step. You will spend more time on ", /*#__PURE__*/React.createElement("code", null, "npm link"), " than on the actual product."), /*#__PURE__*/React.createElement(Callout, {
      variant: "tip",
      title: "Pro tip"
    }, "Tag every cross-repo contract with the commit that produced it. Future-you, debugging a skew at midnight, will send past-you a thank-you note."), /*#__PURE__*/React.createElement("p", null, "The honest summary: the monorepo wasn't the villain. It was a magnifier \u2014 for both our discipline and our shortcuts. Splitting it just made the shortcuts impossible to ignore."), /*#__PURE__*/React.createElement(Soapbox, {
      title: "What is \u201Cplain\u201D text, anyway?",
      signoff: "it's nice to see the spread of good ideas"
    }, /*#__PURE__*/React.createElement("p", null, "I keep saying our contracts ship as \u201Cjust plain text,\u201D and every time I do, a small voice asks what I think that ", /*#__PURE__*/React.createElement("em", null, "means"), ". Plain text sounds like the floor of simplicity \u2014 a sequence of characters, no formatting, no fuss. But a \u201Ccharacter\u201D is whatever the Unicode Consortium decided it is this year, and the bytes on disk depend on an encoding you have to know ", /*#__PURE__*/React.createElement("em", null, "out of band"), ". A file is never just text; it's text ", /*#__PURE__*/React.createElement("em", null, "plus a promise"), " about how to read it."), /*#__PURE__*/React.createElement("h4", null, "And then there's Unicode"), /*#__PURE__*/React.createElement("p", null, "Unicode is a triumph and a daily annoyance. The same visible string can have two different byte representations \u2014 ", /*#__PURE__*/React.createElement("code", null, "\xE9"), " as one code point, or ", /*#__PURE__*/React.createElement("code", null, "e"), " plus a combining accent \u2014 and they won't compare equal until you normalize them. Count the \u201Ccharacters\u201D in a string with a family emoji and you'll get a number that matches nothing a human would say out loud. Code points aren't grapheme clusters; bytes aren't code points; and almost every bug I've shipped in this area came from forgetting which layer I was standing on."), /*#__PURE__*/React.createElement("h4", null, "How Python holds a string"), /*#__PURE__*/React.createElement("p", null, "Python's ", /*#__PURE__*/React.createElement("code", null, "str"), " is a sequence of code points, not bytes, which is the right abstraction. Under the hood CPython is sneakier than that: since PEP 393 it picks the narrowest storage that fits \u2014 one byte per character for pure Latin-1, two for the BMP, four only when it must. So a single stray emoji can quietly quadruple the memory of an otherwise-ASCII string. The abstraction is clean; the representation is pragmatic."), /*#__PURE__*/React.createElement("p", null, "None of this is Python's invention \u2014 it borrowed the flexible-representation idea, sanded off the edges, and made it the default so the rest of us never think about it.")), /*#__PURE__*/React.createElement(Callout, {
      variant: "takeaway"
    }, "Pick the repository layout that makes your ", /*#__PURE__*/React.createElement("em", null, "worst"), " day cheaper, not your best demo flashier.")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 36,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-label)',
        fontSize: 'var(--text-xs)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-wider)',
        color: 'var(--text-muted)',
        marginInlineEnd: 4
      }
    }, "Filed under"), ['Systems', 'Monorepos', 'CI/CD', 'Team', 'Opinion'].map(t => /*#__PURE__*/React.createElement("a", {
      key: t,
      href: "topic.html",
      onClick: e => {
        if (onTopic) {
          e.preventDefault();
          onTopic(t);
        }
      },
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        color: 'var(--canada-300)',
        textDecoration: 'none',
        padding: '0.3rem 0.7rem',
        borderRadius: 'var(--radius-full)',
        border: '1px solid rgba(213,43,30,0.32)',
        background: 'rgba(213,43,30,0.08)'
      }
    }, "#", t))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 48,
        paddingTop: 28,
        borderTop: '1px solid var(--border)',
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 48,
        height: 48,
        borderRadius: 9999,
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        color: 'var(--ink-900)',
        background: 'var(--brand-gradient)'
      }
    }, "MP"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        fontSize: 'var(--text-sm)',
        color: 'var(--text-primary)',
        margin: 0
      }
    }, "Matthew Purdon"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-prose)',
        fontSize: 'var(--text-base)',
        lineHeight: 1.6,
        color: 'var(--text-secondary)',
        margin: '6px 0 0',
        maxWidth: 520
      }
    }, "Builds developer tools in Toronto. Writes about systems, type, and resisting the urge to rewrite everything. Mostly resists.")))));
  }
  window.ArticlePage = ArticlePage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/ArticlePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/Footer.jsx
try { (() => {
/* Blog UI kit — footer: wordmark, columns, colophon. */
(function () {
  const LEAF = 'm-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z';
  function Footer() {
    const col = (title, items) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-label)',
        fontSize: 'var(--text-xs)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-wider)',
        color: 'var(--text-muted)'
      }
    }, title), items.map(i => /*#__PURE__*/React.createElement("a", {
      key: i,
      href: "#",
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)',
        textDecoration: 'none'
      }
    }, i)));
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-surface)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1080,
        margin: '0 auto',
        padding: '48px 32px',
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
        gap: 32
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "-2015 -2000 4030 4030",
      fill: "currentColor",
      style: {
        color: 'var(--canada-500)'
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: LEAF
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: '-0.02em',
        background: 'var(--brand-gradient)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }
    }, "matthew", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-primary)',
        WebkitTextFillColor: 'currentColor'
      }
    }, "purdon"))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-prose)',
        fontSize: 'var(--text-sm)',
        lineHeight: 1.6,
        color: 'var(--text-muted)',
        maxWidth: 280,
        marginTop: 14
      }
    }, "Developer tools, type, and the boring decisions in between. Made in Toronto.")), col('Writing', ['All essays', 'Notes', 'RSS feed']), col('Elsewhere', ['GitHub', 'Mastodon', 'Bluesky']), col('Site', ['About', 'Colophon', 'Now'])), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1080,
        margin: '0 auto',
        padding: '18px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8,
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-disabled)'
      }
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Matthew Purdon \xB7 Built with the matthewpurdon design system"), /*#__PURE__*/React.createElement("span", null, "Set in IBM Plex Serif & Mono \xB7 Made in Canada"))));
  }
  window.Footer = Footer;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/Home.jsx
try { (() => {
/* Blog UI kit — home: intro, featured hero, card grid, dense list. */
(function () {
  const {
    ArticleCard,
    Byline,
    Badge
  } = window.StateOfAIDesignSystem_c9312a;
  const meta = (date, time, tag) => /*#__PURE__*/React.createElement(Byline, {
    compact: true,
    date: date,
    readingTime: time,
    tag: tag
  });
  function Home({
    onOpen,
    onTopic
  }) {
    const open = e => {
      if (onOpen) {
        e.preventDefault();
        onOpen();
      }
    };
    const topic = t => e => {
      if (onTopic) {
        e.preventDefault();
        onTopic(t);
      }
    };
    return /*#__PURE__*/React.createElement("main", {
      style: {
        maxWidth: 1080,
        margin: '0 auto',
        padding: '0 32px 96px'
      }
    }, /*#__PURE__*/React.createElement("section", {
      style: {
        padding: '64px 0 40px',
        borderBottom: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-label)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-wider)',
        fontSize: 'var(--text-xs)',
        color: 'var(--canada-300)',
        margin: '0 0 14px'
      }
    }, "Writing from Toronto, ON"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: 'clamp(32px, 4.5vw, 52px)',
        lineHeight: 1.08,
        letterSpacing: '-0.03em',
        margin: '0 0 18px',
        color: 'var(--text-primary)',
        maxWidth: 760,
        textWrap: 'balance'
      }
    }, "Notes on systems, type, and shipping the boring version."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-prose)',
        fontSize: 'var(--prose-lead)',
        lineHeight: 1.5,
        color: 'var(--text-secondary)',
        maxWidth: 620,
        margin: 0
      }
    }, "I'm Matthew \u2014 I build developer tools and write about the unglamorous decisions that keep software readable. New essays roughly monthly, occasionally with a hot take.")), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: '40px 0'
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "Featured"), /*#__PURE__*/React.createElement(ArticleCard, {
      variant: "hero",
      accent: "canada",
      category: "Systems",
      href: "article.html",
      onClick: open,
      title: "Why I moved off the monorepo",
      dek: "A year ago I split a 200k-line monorepo into eleven repositories. Here's the honest scorecard \u2014 what got faster, what got worse, and the one thing I'd never do again.",
      meta: meta('May 28, 2026', '8 min read', 'Systems')
    })), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: '8px 0 40px'
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "Recent"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 28
      }
    }, /*#__PURE__*/React.createElement(ArticleCard, {
      variant: "grid",
      accent: "amber",
      category: "Design",
      href: "article.html",
      onClick: open,
      title: "Plex Serif on a charcoal canvas",
      dek: "Pairing a serif reading face with a mono UI without the seams showing.",
      meta: meta('May 12', '6 min', 'Design')
    }), /*#__PURE__*/React.createElement(ArticleCard, {
      variant: "grid",
      accent: "teal",
      category: "Runtime",
      href: "article.html",
      onClick: open,
      title: "Bun, a year later",
      dek: "The good, the rough edges, and where it quietly replaced my toolchain.",
      meta: meta('Apr 30', '11 min', 'Runtime')
    }), /*#__PURE__*/React.createElement(ArticleCard, {
      variant: "grid",
      accent: "indigo",
      category: "Notes",
      href: "article.html",
      onClick: open,
      title: "Metric for everything except pizza",
      dek: "A Canadian's field guide to unit conversion bugs in shared codebases.",
      meta: meta('Apr 18', '4 min', 'Notes')
    }))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(SectionLabel, null, "More writing"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ArticleCard, {
      variant: "list",
      category: "Ops",
      href: "article.html",
      onClick: open,
      title: "The case for boring deploys",
      dek: "Friday afternoons, feature flags, and why excitement is a smell.",
      meta: meta('Apr 2', '7 min')
    }), /*#__PURE__*/React.createElement(ArticleCard, {
      variant: "list",
      category: "Tooling",
      href: "article.html",
      onClick: open,
      title: "Reading logs like a Torontonian reads the TTC map",
      dek: "Structured logging as wayfinding: know the lines before you need them.",
      meta: meta('Mar 21', '9 min')
    }), /*#__PURE__*/React.createElement(ArticleCard, {
      variant: "list",
      category: "Side projects",
      href: "article.html",
      onClick: open,
      title: "I rewrote my RSS reader. Again.",
      dek: "The fourth time is the charm, or so I tell myself every two years.",
      meta: meta('Mar 8', '5 min')
    }), /*#__PURE__*/React.createElement(ArticleCard, {
      variant: "list",
      category: "Opinion",
      href: "article.html",
      onClick: open,
      title: "Tabs, spaces, and other settled debates",
      dek: "It's settled. I'll tell you the answer. You won't like the reasoning.",
      meta: meta('Feb 24', '3 min')
    }))), /*#__PURE__*/React.createElement("section", {
      style: {
        marginTop: 56,
        paddingTop: 36,
        borderTop: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "Browse by topic"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10
      }
    }, [['Systems', 14], ['Opinion', 22], ['CI/CD', 9], ['Design', 8], ['Runtime', 6], ['Monorepos', 5], ['Team', 7], ['Notes', 31]].map(([t, n]) => /*#__PURE__*/React.createElement("a", {
      key: t,
      href: "topic.html",
      onClick: topic(t),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)',
        textDecoration: 'none',
        padding: '0.5rem 0.9rem',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border)',
        background: 'var(--bg-surface)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--canada-300)'
      }
    }, "#"), t, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)'
      }
    }, n))))));
  }
  function SectionLabel({
    children
  }) {
    return /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-label)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-widest)',
        fontSize: 'var(--text-xs)',
        fontWeight: 700,
        color: 'var(--text-muted)',
        margin: '0 0 20px'
      }
    }, children);
  }
  window.Home = Home;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/Masthead.jsx
try { (() => {
/* Blog UI kit — masthead: wordmark, primary nav, subscribe CTA. */
(function () {
  const {
    Button
  } = window.StateOfAIDesignSystem_c9312a;
  const LEAF = 'm-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z';
  function Masthead({
    active = 'Writing',
    onHome
  }) {
    const links = ['Writing', 'Notes', 'Projects', 'About'];
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 68,
        padding: '0 32px',
        background: 'rgba(36,34,32,0.82)',
        backdropFilter: 'saturate(140%) blur(10px)',
        WebkitBackdropFilter: 'saturate(140%) blur(10px)',
        borderBottom: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "index.html",
      onClick: onHome,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
        textDecoration: 'none'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "-2015 -2000 4030 4030",
      fill: "currentColor",
      style: {
        color: 'var(--canada-500)'
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: LEAF
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: 19,
        letterSpacing: '-0.02em',
        background: 'var(--brand-gradient)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }
    }, "matthew", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-primary)',
        WebkitTextFillColor: 'currentColor'
      }
    }, "purdon"))), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }
    }, links.map(l => /*#__PURE__*/React.createElement("a", {
      key: l,
      href: "#",
      style: {
        fontFamily: 'var(--font-label)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-wide)',
        padding: '0.5rem 0.75rem',
        borderRadius: 'var(--radius-md)',
        textDecoration: 'none',
        color: l === active ? 'var(--text-primary)' : 'var(--text-muted)'
      }
    }, l)), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "solid",
      size: "sm"
    }, "Subscribe")));
  }
  window.Masthead = Masthead;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/Masthead.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/TopicPage.jsx
try { (() => {
/* Blog UI kit — topic / tag landing: header, post list, related topics. */
(function () {
  const {
    ArticleCard,
    Byline
  } = window.StateOfAIDesignSystem_c9312a;
  const LEAF = 'm-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z';

  // Topic → blurb + post list. (Static sample data for the kit.)
  const TOPICS = {
    Systems: {
      blurb: 'Architecture decisions, the boring kind that actually hold up.',
      count: 14
    },
    Monorepos: {
      blurb: 'One repo, many repos, and the year I spent regretting both.',
      count: 5
    },
    'CI/CD': {
      blurb: 'Pipelines, deploys, and making Fridays uneventful.',
      count: 9
    },
    Team: {
      blurb: 'How tools shape the way small teams actually work.',
      count: 7
    },
    Opinion: {
      blurb: 'The soap-box archive. Read at your own risk.',
      count: 22
    },
    Design: {
      blurb: 'Type, colour, and the craft of a readable page.',
      count: 8
    },
    Runtime: {
      blurb: 'Bun, Node, and what runs my code at 3am.',
      count: 6
    },
    Notes: {
      blurb: 'Short field notes, half-formed and dated.',
      count: 31
    }
  };
  const POSTS = [{
    title: 'Why I moved off the monorepo',
    dek: 'A year in, the honest scorecard — what got faster, what got worse.',
    cat: 'Systems',
    date: 'May 28',
    time: '8 min',
    tags: ['Systems', 'Monorepos', 'CI/CD', 'Opinion']
  }, {
    title: 'The case for boring deploys',
    dek: 'Friday afternoons, feature flags, and why excitement is a smell.',
    cat: 'Ops',
    date: 'Apr 2',
    time: '7 min',
    tags: ['CI/CD', 'Systems', 'Team']
  }, {
    title: 'Reading logs like a TTC map',
    dek: 'Structured logging as wayfinding: know the lines before you need them.',
    cat: 'Tooling',
    date: 'Mar 21',
    time: '9 min',
    tags: ['Systems', 'CI/CD']
  }, {
    title: 'Tabs, spaces, and other settled debates',
    dek: "It's settled. I'll tell you the answer. You won't like the reasoning.",
    cat: 'Opinion',
    date: 'Feb 24',
    time: '3 min',
    tags: ['Opinion', 'Team']
  }, {
    title: 'Eleven repos, eleven owners',
    dek: 'On Conway\u2019s Law and letting the org chart pick your boundaries.',
    cat: 'Systems',
    date: 'Feb 9',
    time: '6 min',
    tags: ['Systems', 'Monorepos', 'Team']
  }, {
    title: 'Generate your contracts, don\u2019t hand-write them',
    dek: 'The version-skew bug that cost me a month, and the fix.',
    cat: 'Systems',
    date: 'Jan 30',
    time: '5 min',
    tags: ['Systems', 'CI/CD', 'Monorepos']
  }];
  function TopicPage({
    topic = 'Systems',
    onBack,
    onOpen,
    onTopic
  }) {
    const info = TOPICS[topic] || {
      blurb: 'Posts on this topic.',
      count: 1
    };
    const posts = POSTS.filter(p => p.tags.includes(topic));
    const related = Object.keys(TOPICS).filter(t => t !== topic).slice(0, 6);
    const open = e => {
      if (onOpen) {
        e.preventDefault();
        onOpen();
      }
    };
    return /*#__PURE__*/React.createElement("main", {
      style: {
        maxWidth: 880,
        margin: '0 auto',
        padding: '0 32px 96px'
      }
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        padding: '56px 0 32px',
        borderBottom: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "index.html",
      onClick: e => {
        if (onBack) {
          e.preventDefault();
          onBack();
        }
      },
      style: {
        fontFamily: 'var(--font-label)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-wider)',
        fontSize: 'var(--text-xs)',
        fontWeight: 700,
        color: 'var(--text-muted)',
        textDecoration: 'none'
      }
    }, "\u2190 All writing"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        margin: '18px 0 12px'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "30",
      height: "30",
      viewBox: "-2015 -2000 4030 4030",
      fill: "currentColor",
      style: {
        color: 'var(--canada-500)',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: LEAF
    })), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: 'clamp(30px, 4vw, 44px)',
        letterSpacing: '-0.03em',
        margin: 0,
        color: 'var(--text-primary)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--canada-300)'
      }
    }, "#"), topic)), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-prose)',
        fontSize: 'var(--prose-lead)',
        lineHeight: 1.5,
        color: 'var(--text-secondary)',
        maxWidth: 600,
        margin: 0
      }
    }, info.blurb), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)',
        marginTop: 14,
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-wide)'
      }
    }, info.count, " ", info.count === 1 ? 'post' : 'posts', " \xB7 showing ", posts.length)), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 8
      }
    }, posts.map((p, i) => /*#__PURE__*/React.createElement(ArticleCard, {
      key: i,
      variant: "list",
      category: p.cat,
      href: "article.html",
      onClick: open,
      title: p.title,
      dek: p.dek,
      meta: /*#__PURE__*/React.createElement(Byline, {
        compact: true,
        date: p.date,
        readingTime: p.time
      })
    })), posts.length === 0 && /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-prose)',
        color: 'var(--text-muted)',
        padding: '32px 0'
      }
    }, "No posts here yet. Check back after the next rant.")), /*#__PURE__*/React.createElement("section", {
      style: {
        marginTop: 48,
        paddingTop: 28,
        borderTop: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-label)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-widest)',
        fontSize: 'var(--text-xs)',
        fontWeight: 700,
        color: 'var(--text-muted)',
        margin: '0 0 16px'
      }
    }, "Related topics"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8
      }
    }, related.map(t => /*#__PURE__*/React.createElement("a", {
      key: t,
      href: "topic.html",
      onClick: e => {
        if (onTopic) {
          e.preventDefault();
          onTopic(t);
        }
      },
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)',
        color: 'var(--canada-300)',
        textDecoration: 'none',
        padding: '0.4rem 0.85rem',
        borderRadius: 'var(--radius-full)',
        border: '1px solid rgba(213,43,30,0.32)',
        background: 'rgba(213,43,30,0.08)'
      }
    }, "#", t)))));
  }
  window.TopicPage = TopicPage;
  window.BLOG_TOPICS = TOPICS;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/TopicPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/report/ReportBody.jsx
try { (() => {
/* Report UI kit — body: tabbed sections with charts, table, and an inverted callout. */
(function () {
  const {
    Tabs,
    BarChart,
    DataTable,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Progress
  } = window.StateOfAIDesignSystem_c9312a;
  function SectionTitle({
    eyebrow,
    title,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-label)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-wider)',
        fontSize: 'var(--text-xs)',
        color: 'var(--brand)',
        margin: '0 0 8px'
      }
    }, eyebrow), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-3xl)',
        letterSpacing: 'var(--tracking-tight)',
        margin: 0,
        color: 'var(--text-primary)'
      }
    }, title), children && /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        color: 'var(--text-muted)',
        maxWidth: 620,
        marginTop: 8
      }
    }, children));
  }
  function AdoptionPanel() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: 28,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Weekly model use"), /*#__PURE__*/React.createElement(CardDescription, null, "Share of respondents using each model weekly")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(BarChart, {
      isPercent: true,
      average: 40,
      data: [{
        label: 'Claude',
        value: 62
      }, {
        label: 'GPT-class',
        value: 58
      }, {
        label: 'Gemini',
        value: 41
      }, {
        label: 'Llama',
        value: 27
      }, {
        label: 'Mistral',
        value: 14
      }, {
        label: 'Other OSS',
        value: 9,
        color: 'var(--teal-500)'
      }]
    }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Adoption ranking"), /*#__PURE__*/React.createElement(CardDescription, null, "Year-over-year movement")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(DataTable, {
      columns: [{
        key: 'rank',
        header: '#',
        width: '2.25rem'
      }, {
        key: 'model',
        header: 'Model'
      }, {
        key: 'share',
        header: 'Weekly',
        align: 'end'
      }, {
        key: 'yoy',
        header: 'YoY',
        align: 'end'
      }],
      rows: [{
        rank: '01',
        model: 'Claude',
        share: '62%',
        yoy: '▲ +14'
      }, {
        rank: '02',
        model: 'GPT-class',
        share: '58%',
        yoy: '▲ +6'
      }, {
        rank: '03',
        model: 'Gemini',
        share: '41%',
        yoy: '▲ +9'
      }, {
        rank: '04',
        model: 'Llama',
        share: '27%',
        yoy: '▼ −2'
      }, {
        rank: '05',
        model: 'Mistral',
        share: '14%',
        yoy: '▲ +3'
      }]
    }))));
  }
  function SentimentPanel() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 28,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Sentiment by role"), /*#__PURE__*/React.createElement(CardDescription, null, "Net positive minus negative")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(BarChart, {
      isPercent: true,
      data: [{
        label: 'Backend',
        value: 52,
        color: 'var(--sentiment-positive)'
      }, {
        label: 'Frontend',
        value: 47,
        color: 'var(--sentiment-positive)'
      }, {
        label: 'Data/ML',
        value: 61,
        color: 'var(--sentiment-positive)'
      }, {
        label: 'DevOps',
        value: 38,
        color: 'var(--sentiment-positive)'
      }, {
        label: 'Mgmt',
        value: 44,
        color: 'var(--sentiment-positive)'
      }]
    }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Trust in output"), /*#__PURE__*/React.createElement(CardDescription, null, "\"I review before shipping\"")), /*#__PURE__*/React.createElement(CardContent, {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Progress, {
      label: "Always review",
      value: 71,
      color: "amber"
    }), /*#__PURE__*/React.createElement(Progress, {
      label: "Sometimes",
      value: 23,
      color: "indigo"
    }), /*#__PURE__*/React.createElement(Progress, {
      label: "Trust as-is",
      value: 6,
      color: "teal"
    }))));
  }
  function ToolingPanel() {
    return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Where AI lives in the workflow"), /*#__PURE__*/React.createElement(CardDescription, null, "Multiple selections allowed")), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(BarChart, {
      isPercent: true,
      data: [{
        label: 'In the editor',
        value: 81
      }, {
        label: 'CLI / terminal',
        value: 49
      }, {
        label: 'Chat app',
        value: 67
      }, {
        label: 'Code review',
        value: 38
      }, {
        label: 'CI / pipelines',
        value: 22,
        color: 'var(--indigo-500)'
      }, {
        label: 'Docs / search',
        value: 44
      }]
    })));
  }
  function KeyFinding() {
    return /*#__PURE__*/React.createElement("section", {
      className: "inverted",
      style: {
        borderRadius: 'var(--radius-xl)',
        padding: '40px 44px',
        margin: '8px 0 40px'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-label)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-wider)',
        fontSize: 'var(--text-xs)',
        color: 'var(--brand-dark)',
        margin: '0 0 14px'
      }
    }, "Key finding"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(24px, 3vw, 34px)',
        lineHeight: 1.25,
        letterSpacing: 'var(--tracking-tight)',
        color: 'var(--text-inverted)',
        maxWidth: 760,
        margin: 0
      }
    }, "For the first time, more developers ship AI-assisted code to production than keep it in a sandbox \u2014 a 15-point swing in a single year."));
  }
  function ReportBody() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '24px 0 0'
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      eyebrow: "Section 01",
      title: "What the data shows"
    }, "Switch between the three core dimensions of this year's survey."), /*#__PURE__*/React.createElement(KeyFinding, null), /*#__PURE__*/React.createElement(Tabs, {
      defaultValue: "adoption",
      items: [{
        value: 'adoption',
        label: 'Adoption',
        content: /*#__PURE__*/React.createElement("div", {
          style: {
            paddingTop: 8
          }
        }, /*#__PURE__*/React.createElement(AdoptionPanel, null))
      }, {
        value: 'sentiment',
        label: 'Sentiment',
        content: /*#__PURE__*/React.createElement("div", {
          style: {
            paddingTop: 8
          }
        }, /*#__PURE__*/React.createElement(SentimentPanel, null))
      }, {
        value: 'tooling',
        label: 'Tooling',
        content: /*#__PURE__*/React.createElement("div", {
          style: {
            paddingTop: 8
          }
        }, /*#__PURE__*/React.createElement(ToolingPanel, null))
      }]
    }));
  }
  window.ReportBody = ReportBody;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/report/ReportBody.jsx", error: String((e && e.message) || e) }); }

// ui_kits/report/ReportHeader.jsx
try { (() => {
/* Report UI kit — top header bar: wordmark, section nav, actions. */
(function () {
  const {
    Button,
    Badge
  } = window.StateOfAIDesignSystem_c9312a;
  function ReportHeader({
    wave = '2026'
  }) {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        padding: '0 28px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-base)',
        position: 'sticky',
        top: 0,
        zIndex: 600
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        background: 'var(--brand-gradient)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }
    }, "State of AI"), /*#__PURE__*/React.createElement(Badge, {
      variant: "outline"
    }, wave)), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "Methodology"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "Download data"), /*#__PURE__*/React.createElement(Button, {
      variant: "solid",
      size: "sm"
    }, "Share")));
  }
  window.ReportHeader = ReportHeader;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/report/ReportHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/report/ReportHero.jsx
try { (() => {
/* Report UI kit — hero: page title, lede, and a row of headline stats. */
(function () {
  const {
    StatBlock,
    Card,
    CardContent
  } = window.StateOfAIDesignSystem_c9312a;
  function ReportHero() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: '40px 0 8px'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-label)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-wider)',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)',
        margin: '0 0 12px'
      }
    }, "The annual developer survey \xB7 n = 2,400"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(36px, 5vw, 56px)',
        lineHeight: 1.05,
        letterSpacing: 'var(--tracking-tight)',
        margin: '0 0 16px',
        color: 'var(--text-primary)',
        maxWidth: 820,
        textWrap: 'balance'
      }
    }, "How developers actually use AI in 2026"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-lg)',
        lineHeight: 'var(--leading-relaxed)',
        color: 'var(--text-secondary)',
        maxWidth: 680,
        margin: '0 0 36px'
      }
    }, "Daily use crossed three-quarters of respondents for the first time. Below: adoption, sentiment, and the tools that won the year."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      variant: "amber"
    }, /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(StatBlock, {
      label: "Daily active use",
      value: "76%",
      color: "amber",
      size: "lg",
      delta: {
        label: '+12 pts YoY',
        direction: 'up'
      }
    }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(StatBlock, {
      label: "Net sentiment",
      value: "+41",
      color: "teal",
      size: "lg",
      delta: {
        label: '−3 pts',
        direction: 'down'
      }
    }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(StatBlock, {
      label: "Use 3+ tools",
      value: "58%",
      color: "indigo",
      size: "lg",
      delta: {
        label: '+9 pts',
        direction: 'up'
      }
    }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(StatBlock, {
      label: "Ship to prod",
      value: "34%",
      color: "cream",
      size: "lg",
      delta: {
        label: '+15 pts',
        direction: 'up'
      }
    })))));
  }
  window.ReportHero = ReportHero;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/report/ReportHero.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.MapleLeaf = __ds_scope.MapleLeaf;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ButtonGroup = __ds_scope.ButtonGroup;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.Soapbox = __ds_scope.Soapbox;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardDescription = __ds_scope.CardDescription;

__ds_ns.CardContent = __ds_scope.CardContent;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.ArticleCard = __ds_scope.ArticleCard;

__ds_ns.Byline = __ds_scope.Byline;

__ds_ns.CodeBlock = __ds_scope.CodeBlock;

__ds_ns.Prose = __ds_scope.Prose;

__ds_ns.PullQuote = __ds_scope.PullQuote;

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.Progress = __ds_scope.Progress;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.SidebarHeader = __ds_scope.SidebarHeader;

__ds_ns.SidebarContent = __ds_scope.SidebarContent;

__ds_ns.SidebarFooter = __ds_scope.SidebarFooter;

__ds_ns.SidebarGroup = __ds_scope.SidebarGroup;

__ds_ns.SidebarGroupLabel = __ds_scope.SidebarGroupLabel;

__ds_ns.SidebarItem = __ds_scope.SidebarItem;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
