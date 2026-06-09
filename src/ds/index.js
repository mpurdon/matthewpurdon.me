/* Design-system entry point. Import order matters: react-global.js sets
   window.React, then bundle.js (IIFE) populates the namespace we re-export. */
import './react-global.js';
import './bundle.js';
import './styles.css';

export default window.StateOfAIDesignSystem_c9312a;
