/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const dockerPort = 7004;
const localPort = 7070;
// https://vitejs.dev/config/
const viteConfig = defineConfig({
  server: {
    host: true,
    port: 6060,
    proxy: {
      '/api': `http://127.0.0.1:${dockerPort}`,
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
