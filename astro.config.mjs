import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://matthewpurdon.me',
  integrations: [react(), mdx()],
  outDir: './dist', // Renders output into the exact same folder for wrangler compatibility
  srcDir: './src',
  // Inline the (single, ~36 KB) design-system stylesheet into each page's <head>
  // so first paint needs only the HTML document — no render-blocking CSS request.
  // The site is zero-JS and pages are small, so the per-page bytes are a net FCP win.
  build: {
    inlineStylesheets: 'always',
  },
  // Preserve the author's literal punctuation: keep straight quotes and the
  // signature spaced "..." (voice guide) instead of curly quotes / … ellipses.
  // @astrojs/mdx inherits this markdown config by default.
  markdown: {
    smartypants: false,
  },
});
