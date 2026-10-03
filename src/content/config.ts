import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    author: z.string(),
    title: z.string(),
    date: z.coerce.date(),
    thumbnail: z.string(),
    excerpt: z.string(),
    download: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    year: z.number(),
    thumbnail: z.string(),
    link: z.string(),
    image_position: z.string().optional(),
  }),
});

const snippets = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { posts, projects, snippets };
