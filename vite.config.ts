import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'cloudflare-spa-fallback',
      closeBundle() {
        const distDir = path.resolve(__dirname, 'dist');
        const indexPath = path.join(distDir, 'index.html');
        const fallbackPath = path.join(distDir, '200.html');
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, fallbackPath);
          console.log('[Cloudflare SPA] Generated 200.html fallback for Cloudflare Pages.');
        }
      },
    },
  ],
  server: {
    port: 5180,
    open: false,
  },
  preview: {
    port: 5180,
  },
});
