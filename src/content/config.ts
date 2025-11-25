import { defineCollection, z } from 'astro:content';

// Blog posts collection schema - matches PagesCMS fields
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    publishedAt: z.coerce.date(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    cover: z.object({
      src: z.string(),
      alt: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  blog,
};
