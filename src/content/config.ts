import { defineCollection, z } from 'astro:content';

// Blog posts collection schema
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    cover: z.object({
      src: z.string(),
      alt: z.string().optional(),
    }).optional(),
    draft: z.boolean().default(false),
    canonicalUrl: z.string().optional(),
  }),
});

// Custom pages collection schema
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    layout: z.enum(['default', 'full', 'narrow']).default('default'),
    showInNav: z.boolean().default(false),
    navOrder: z.number().optional(),
  }),
});

export const collections = {
  blog,
  pages,
};
