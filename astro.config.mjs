// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://rokthar0394.github.io/',
  base: '/rokthar0394.github.io',
  vite: {
    plugins: [tailwindcss()]
  }
});