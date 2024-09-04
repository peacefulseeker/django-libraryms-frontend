/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

// const dockerPort = 7004;
const localPort = 7070;
const viteConfig = defineConfig({
  server: {
    host: true,
    port: 6060,
    proxy: {
      '/api': `http://127.0.0.1:${localPort}`,
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css') {
            return 'assets/index.css';
          }
          return 'assets/[name].[ext]';
        },
      },
    },
  },
  experimental: {
    renderBuiltUrl(filename) {
      // renderBuiltUrl(filename, { hostId, hostType, type }) {
      if (process.env.CLOUDFRONT_ASSETS_VERSION) {
        // if (hostType === 'html') {
        // filename = filename.replace(/-[a-zA-Z0-9]+\.(js|css)$/, '.$1');
        //   console.log({ filename, hostId, hostType, type });
        //   console.log('====');
        // }

        filename =
          `https://d1nvb8emsymmvr.cloudfront.net/v/${process.env.CLOUDFRONT_ASSETS_VERSION}/` +
          filename;
        return filename;
      }
      if (filename.indexOf('/assets/') !== -1) {
        return '/static/frontend/assets/' + filename.replace(/^assets\//, '');
      }
      return '/static/frontend/' + filename;
    },
  },
});

export default viteConfig;
