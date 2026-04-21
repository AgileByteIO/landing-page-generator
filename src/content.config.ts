import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const contentPath = process.env.CONTENT_PATH ?? './private/content';

const landingpage = defineCollection({
  loader: glob({
    base: contentPath,
    pattern: '**/{root,documents,cookie-consents}/**/*.md'
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Anonymous'),
    link: z.string().optional(),
    mandatory: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    'service-icon': z.string().optional(),
    'domain-icon': z.string().optional(),
  }),
});

const tags = defineCollection({
  loader: glob({
    base: contentPath,
    pattern: '**/tags/*.md'
  }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { landingpage, tags };
