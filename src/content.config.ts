import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const contentPath = process.env.CONTENT_PATH ?? './private/content';

const landingpage = defineCollection({
  loader: glob({ 
    base: contentPath, 
    pattern: '**/*.md'
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Anonymous'),
  }),
});

export const collections = { landingpage };
