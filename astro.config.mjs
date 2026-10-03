import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://online-calculator.pages.dev',
  output: 'static',
  build: {
    format: 'directory'
  },
  server: {
    port: 4321,
    host: true
  }
});
