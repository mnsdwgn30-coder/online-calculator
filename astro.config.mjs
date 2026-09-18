import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://online-calculator-nine-chi.vercel.app',
  server: {
    port: 4321,
    host: true
  }
});
