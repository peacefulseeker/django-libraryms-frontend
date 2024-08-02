/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
// import checker from 'vite-plugin-checker';
import vue from '@vitejs/plugin-vue';


// const dockerPort = 7004;
const localPort = 7070;
// https://vitejs.dev/config/
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
    // checker({ vueTsc: true  }),
  ],
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
