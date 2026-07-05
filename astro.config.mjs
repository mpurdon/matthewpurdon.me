import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://matthewpurdon.me',
  integrations: [react()],
  outDir: './dist', // Renders output into the exact same folder for wrangler compatibility
  srcDir: './src',
});
