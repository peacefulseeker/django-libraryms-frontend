/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';

import { defineConfig, mergeConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

let config = {
  server: {
    host: true,
    port: 6060,
    proxy: {
      '/api': `http://127.0.0.1:${process.env.API_PROXY_PORT}`,
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
};

if (process.env.VITE_PREVIEW === undefined) {
  config = mergeConfig(config, {
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
      renderBuiltUrl(filename, { hostType }) {
        if (hostType === 'js') {
          return { runtime: `window.__toFrontendAssetsUrl(${JSON.stringify(filename)})` }
        }
        return {
          relative: true
        }
      },
    },
  });
}

export default defineConfig(config);
