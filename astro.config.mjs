import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://onlinecalculator.app',
  server: {
    port: 4321,
    host: true
  }
});
