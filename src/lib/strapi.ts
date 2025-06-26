import { GraphQLClient } from 'graphql-request';
import { config } from '../config/environment';

export const strapiClient = new GraphQLClient(`${config.strapi.url}/graphql`, {
  headers: {
    'Content-Type': 'application/json',
    ...(config.strapi.apiToken && {
      'Authorization': `Bearer ${config.strapi.apiToken}`
    })
  }
});

// Reusable fragments to avoid repetition
const POST_FRAGMENT = `
  fragment PostFields on Post {
    documentId
    title
    slug
    excerpt
    body
    cover {
      url
      alternativeText
      width
      height
    }
    tags {
      name
    }
    publishedAt
    createdAt
    updatedAt
  }
`;

const POST_CARD_FRAGMENT = `
  fragment PostCardFields on Post {
    documentId
    title
    slug
    excerpt
    cover {
      url
      alternativeText
      formats
    }
    tags {
      name
    }
    publishedAt
    createdAt
  }
`;

// Simplified queries using fragments - with fallback for posts without tag permissions
export const GET_POSTS = `
  ${POST_CARD_FRAGMENT}
  query GetPosts($pagination: PaginationArg, $sort: [String]) {
    posts(pagination: $pagination, sort: $sort, filters: { publishedAt: { notNull: true } }) {
      ...PostCardFields
    }
  }
`;

// Fallback query for when tags permissions are not set up
export const GET_POSTS_NO_TAGS = `
  query GetPostsNoTags($pagination: PaginationArg, $sort: [String]) {
    posts(pagination: $pagination, sort: $sort, filters: { publishedAt: { notNull: true } }) {
      documentId
      title
      slug
      excerpt
      cover {
        url
        alternativeText
        formats
      }
      publishedAt
      createdAt
    }
  }
`;

export const GET_POST_BY_SLUG = `
  ${POST_FRAGMENT}
  query GetPostBySlug($filters: PostFiltersInput) {
    posts(filters: $filters) {
      ...PostFields
    }
  }
`;

// Fallback query for individual posts without tags
export const GET_POST_BY_SLUG_NO_TAGS = `
  query GetPostBySlugNoTags($filters: PostFiltersInput) {
    posts(filters: $filters) {
      documentId
      title
      slug
      excerpt
      body
      cover {
        url
        alternativeText
        width
        height
      }
      publishedAt
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_SLUGS = `
  query GetAllSlugs {
    posts(filters: { publishedAt: { notNull: true } }) {
      slug
      updatedAt
    }
  }
`;

export const GET_RELATED_POSTS = `
  query GetRelatedPosts($filters: PostFiltersInput, $pagination: PaginationArg) {
    posts(filters: $filters, pagination: $pagination, sort: "createdAt:desc") {
      documentId
      title
      slug
      excerpt
      cover {
        url
        alternativeText
        width
        height
      }
      tags {
        name
      }
      publishedAt
      createdAt
    }
  }
`;

export const GET_POSTS_BY_TAG = `
  query GetPostsByTag($tagName: String!, $pagination: PaginationArg) {
    posts(
      filters: { 
        tags: { name: { containsi: $tagName } },
        publishedAt: { notNull: true }
      }, 
      pagination: $pagination, 
      sort: "createdAt:desc"
    ) {
      documentId
      title
      slug
      excerpt
      cover {
        url
        alternativeText
        width
        height
      }
      tags {
        name
      }
      publishedAt
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_TAGS = `
  query GetAllTags {
    tags {
      name
    }
  }
`;

// Types
export interface StrapiTag {
  name: string;
}

export interface StrapiPost {
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  cover?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
    formats?: {
      thumbnail?: { url: string; width: number; height: number; };
      small?: { url: string; width: number; height: number; };
      medium?: { url: string; width: number; height: number; };
      large?: { url: string; width: number; height: number; };
    };
  };
  tags?: StrapiTag[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonicalURL?: string;
  };
}

export interface StrapiResponse<T> {
  data: T;
  error?: string;
  loading?: boolean;
}

// Helper function to extract tag names from tag objects
export function getTagNames(tags?: StrapiTag[]): string[] {
  return tags?.map(tag => tag.name) || [];
}

// Helper functions with clean error handling
export async function getPosts(limit = 6, start = 0): Promise<StrapiResponse<StrapiPost[]>> {
  try {
    // Try the full query with tags first
    const data = await strapiClient.request<{ posts: StrapiPost[] }>(GET_POSTS, { 
      pagination: { limit, start },
      sort: ["createdAt:desc"]
    });
    
    return { data: data.posts || [] };
    
  } catch (error) {
    console.warn('Tags query failed, falling back to posts without tags:', error);
    
    // Fallback to query without tags if permissions are not set up
    try {
      const fallbackData = await strapiClient.request<{ posts: StrapiPost[] }>(GET_POSTS_NO_TAGS, { 
        pagination: { limit, start },
        sort: ["createdAt:desc"]
      });
      
      // Add empty tags array to maintain interface compatibility
      const postsWithEmptyTags = (fallbackData.posts || []).map(post => ({
        ...post,
        tags: [] as StrapiTag[]
      }));
      
      return { data: postsWithEmptyTags };
      
    } catch (fallbackError) {
      console.error('Error fetching posts (fallback):', fallbackError);
      return { data: [], error: 'Failed to fetch posts' };
    }
  }
}

export async function getPostBySlug(slug: string): Promise<StrapiPost | null> {
  try {
    // Try the full query with tags first
    const data = await strapiClient.request<{ posts: StrapiPost[] }>(GET_POST_BY_SLUG, {
      filters: { slug: { eq: slug }, publishedAt: { notNull: true } }
    });
    
    return data.posts?.[0] || null;
    
  } catch (error) {
    console.warn('Tags query failed for single post, falling back to post without tags:', error);
    
    // Fallback to query without tags if permissions are not set up
    try {
      const fallbackData = await strapiClient.request<{ posts: StrapiPost[] }>(GET_POST_BY_SLUG_NO_TAGS, {
        filters: { slug: { eq: slug }, publishedAt: { notNull: true } }
      });
      
      const post = fallbackData.posts?.[0];
      if (post) {
        // Add empty tags array to maintain interface compatibility
        return {
          ...post,
          tags: [] as StrapiTag[]
        };
      }
      
      return null;
      
    } catch (fallbackError) {
      console.error('Error fetching post by slug (fallback):', fallbackError);
      return null;
    }
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const data = await strapiClient.request<{ posts: { slug: string }[] }>(GET_ALL_SLUGS);
    return data.posts?.map(post => post.slug) || [];
    
  } catch (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }
}

export async function getRelatedPosts(tagNames: string[] = [], limit = 3): Promise<StrapiPost[]> {
  if (!tagNames || tagNames.length === 0) return [];
  
  try {
    const data = await strapiClient.request<{ posts: StrapiPost[] }>(GET_RELATED_POSTS, { 
      filters: { 
        tags: { name: { in: tagNames } },
        publishedAt: { notNull: true }
      },
      pagination: { limit }
    });
    
    return data.posts || [];
    
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

export async function getPostsByTag(
  tagName: string,
  limit = 6,
  start = 0
): Promise<StrapiResponse<StrapiPost[]>> {
  try {
    const data = await strapiClient.request<{ posts: StrapiPost[] }>(GET_POSTS_BY_TAG, {
      tagName,
      pagination: { limit, start }
    });
    
    return { data: data.posts || [] };
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return { data: [], error: 'Failed to fetch posts by tag' };
  }
}

export async function getAllTags(): Promise<string[]> {
  try {
    const data = await strapiClient.request<{ tags: StrapiTag[] }>(GET_ALL_TAGS);
    return data.tags?.map(tag => tag.name) || [];
  } catch (error) {
    console.warn('Error fetching tags, likely due to permissions:', error);
    // Return empty array if tags are not accessible (e.g., permissions not set)
    return [];
  }
} 