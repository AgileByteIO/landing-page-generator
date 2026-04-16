// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import node from '@astrojs/node';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), solidJs()],

  adapter: node({
    mode: 'standalone'
  })
});