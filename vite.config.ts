/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  server: {
    host: true,
    port: 6060,
    proxy: {
      '/api': 'http://127.0.0.1:7070',
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // test: {
  //     // ./tests/*.config.ts
  // },
});

export default viteConfig;
