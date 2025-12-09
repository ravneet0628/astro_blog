import { getCollection, type CollectionEntry } from 'astro:content';

// Re-export the type for use in components
export type BlogPost = CollectionEntry<'blog'>;

// Type for post data used in components (flattened structure)
export interface PostData {
  slug: string;
  title: string;
  excerpt?: string;
  body?: string;
  cover?: {
    src: string;
    alt?: string;
  };
  tags: string[];
  publishedAt: Date;
  featured: boolean;
  draft: boolean;
}

/**
 * Convert a collection entry to a flattened PostData object
 */
export function toPostData(entry: BlogPost): PostData {
  return {
    slug: entry.slug,
    title: entry.data.title,
    excerpt: entry.data.excerpt,
    body: entry.body,
    cover: entry.data.cover,
    tags: entry.data.tags,
    publishedAt: entry.data.publishedAt,
    featured: entry.data.featured,
    draft: entry.data.draft,
  };
}

/**
 * Get all published blog posts sorted by date (newest first)
 */
export async function getPosts(limit?: number, offset = 0): Promise<PostData[]> {
  const posts = await getCollection('blog', ({ data }) => {
    // Filter out drafts in production
    return import.meta.env.PROD ? !data.draft : true;
  });

  // Sort by publishedAt date, newest first
  const sortedPosts = posts
    .map(toPostData)
    .sort((a, b) => b.publishedAt.valueOf() - a.publishedAt.valueOf());

  // Apply offset and limit
  if (limit !== undefined) {
    return sortedPosts.slice(offset, offset + limit);
  }
  return sortedPosts.slice(offset);
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<{ post: BlogPost; data: PostData } | null> {
  const posts = await getCollection('blog');
  const post = posts.find(p => p.slug === slug);
  
  if (!post) return null;
  
  // Filter out drafts in production
  if (import.meta.env.PROD && post.data.draft) return null;
  
  return {
    post,
    data: toPostData(post),
  };
}

/**
 * Get all post slugs (for static path generation)
 */
export async function getAllSlugs(): Promise<string[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });
  
  return posts.map(post => post.slug);
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tagName: string, limit?: number): Promise<PostData[]> {
  const posts = await getCollection('blog', ({ data }) => {
    const hasTag = data.tags.some(
      tag => tag.toLowerCase() === tagName.toLowerCase()
    );
    const isPublished = import.meta.env.PROD ? !data.draft : true;
    return hasTag && isPublished;
  });

  const sortedPosts = posts
    .map(toPostData)
    .sort((a, b) => b.publishedAt.valueOf() - a.publishedAt.valueOf());

  if (limit !== undefined) {
    return sortedPosts.slice(0, limit);
  }
  return sortedPosts;
}

/**
 * Get all unique tags from all posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  const tagSet = new Set<string>();
  posts.forEach(post => {
    post.data.tags.forEach(tag => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

/**
 * Get top tags by frequency (descending). Limits to avoid huge lists.
 */
export async function getTopTags(limit = 8): Promise<string[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  const counts: Record<string, number> = {};
  posts.forEach(post => {
    post.data.tags.forEach(tag => {
      const key = tag;
      counts[key] = (counts[key] || 0) + 1;
    });
  });

  return Object.entries(counts)
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    })
    .slice(0, limit)
    .map(([tag]) => tag);
}

/**
 * Get related posts based on shared tags
 */
export async function getRelatedPosts(
  tags: string[],
  currentSlug: string,
  limit = 3
): Promise<PostData[]> {
  if (!tags || tags.length === 0) return [];

  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  // Filter posts that share at least one tag and exclude current post
  const relatedPosts = posts
    .filter(post => {
      if (post.slug === currentSlug) return false;
      return post.data.tags.some(tag => 
        tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    })
    .map(toPostData)
    .sort((a, b) => b.publishedAt.valueOf() - a.publishedAt.valueOf())
    .slice(0, limit);

  return relatedPosts;
}

/**
 * Helper to get tag names (for compatibility with existing code)
 */
export function getTagNames(tags?: string[]): string[] {
  return tags || [];
}

