/* Design-system entry point. Import order matters: react-global.js sets
   window.React, then bundle.js (IIFE) populates the namespace we re-export. */
import './react-global.js';
import './bundle.js';
import './styles.css';
// bundle.js injects component CSS at runtime via document.createElement; on a
// static/zero-JS build that never runs, so we ship the extracted rules as a
// real stylesheet (see components.css / _extract-ds-css.mjs).
import './components.css';

export default window.StateOfAIDesignSystem_c9312a;
