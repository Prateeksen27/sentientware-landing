import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import sitemap from 'vite-plugin-sitemap';
import { robots } from 'vite-plugin-robots';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio/',
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1600,
  },
  plugins: [
    tailwindcss(),
    vue(),
    robots(),
    sitemap({
      hostname: 'https://hetari.github.io/',
      basePath: 'portfolio',
      changefreq: 'hourly',
      priority: 1,
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    watch: {
      usePolling: true,   // 👈 Windows fix
      interval: 300,      // 👈 har 300ms pe check karega
    },
  },
  optimizeDeps: {
    exclude: ['@tailwindcss/vite'],
    force: true,
  },
});