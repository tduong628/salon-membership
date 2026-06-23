import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// On GitHub Pages the app is served from /<repo>/, locally from /.
// Set GHPAGES=1 (the deploy step does) to emit the repo base path.
const base = process.env.GHPAGES ? '/salon-membership/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2020',
    cssMinify: true,
  },
});
