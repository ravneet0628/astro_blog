import { defineCollection, z } from 'astro:content';

// Blog posts collection schema
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.object({
      src: z.string(),
      alt: z.string().optional(),
    }).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
};

