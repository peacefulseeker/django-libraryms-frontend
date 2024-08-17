/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
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
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  experimental: {
    renderBuiltUrl(filename) {
        if (filename.indexOf('/assets/') !== -1) {
          return '/static/frontend/assets/' + filename.replace(/^assets\//, '');
        }
        return '/static/frontend/' + filename;
    },
  }
});

export default viteConfig;
