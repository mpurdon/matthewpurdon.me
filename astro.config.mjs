import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://matthewpurdon.me',
  integrations: [react(), mdx()],
  outDir: './dist', // Renders output into the exact same folder for wrangler compatibility
  srcDir: './src',
  // Preserve the author's literal punctuation: keep straight quotes and the
  // signature spaced "..." (voice guide) instead of curly quotes / … ellipses.
  // @astrojs/mdx inherits this markdown config by default.
  markdown: {
    smartypants: false,
  },
});
