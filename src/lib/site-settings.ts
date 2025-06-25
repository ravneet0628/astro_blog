import { config } from '../config/environment';

// Types for site settings from Strapi
export interface StrapiSiteSettings {
  siteTitle: string;
  siteDescription: string;
  author: string;
  authorBio?: string;
  authorImage?: {
    url: string;
    alternativeText?: string;
  };
  logo?: {
    url: string;
    alternativeText?: string;
  };
  favicon?: {
    url: string;
    alternativeText?: string;
  };
  socialLinks?: {
    email?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  };

  footerText?: string;
  seoMetadata?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: {
      url: string;
      alternativeText?: string;
    };
  };
}

// About page type
export interface StrapiAboutPage {
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  heroImage?: {
    url: string;
    alternativeText?: string;
  };
}

// Default fallback values (simple hardcoded defaults, no .env fallbacks)
const DEFAULT_SITE_SETTINGS: StrapiSiteSettings = {
  siteTitle: 'My Blog',
  siteDescription: 'A thoughtful collection of stories about life, style, and everything in between.',
  author: 'Blog Author',
  authorBio: 'Welcome to my corner of the internet, where I share stories about life, style, travel, and everything that sparks joy.',
  socialLinks: {
    email: '',
    twitter: '',
    instagram: '',
    website: '',
  },

  footerText: '',
  seoMetadata: {
    metaTitle: '',
    metaDescription: '',
  },
};

// Cache for site settings
let cachedSiteSettings: StrapiSiteSettings | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// GraphQL query for site settings
const SITE_SETTINGS_QUERY = `
  query {
    siteSetting {
      siteTitle
      siteDescription
      author
      authorBio
      authorImage {
        url
        alternativeText
      }
      logo {
        url
        alternativeText
      }
      favicon {
        url
        alternativeText
      }
      socialLinks {
        email
        twitter
        instagram
        website
      }

      footerText
      seoMetadata {
        metaTitle
        metaDescription
        ogImage {
          url
          alternativeText
        }
      }
    }
  }
`;

/**
 * Fetch site settings from Strapi with caching and fallbacks
 */
export async function getSiteSettings(): Promise<StrapiSiteSettings> {
  // Return cached settings if still valid
  const now = Date.now();
  if (cachedSiteSettings && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedSiteSettings;
  }

  try {
    const response = await fetch(`${config.strapi.url}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: SITE_SETTINGS_QUERY,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.warn('GraphQL errors in site settings:', data.errors);
      throw new Error('GraphQL errors');
    }

    const strapiSettings = data.data?.siteSetting;
    
    if (strapiSettings) {
      // Merge Strapi settings with defaults
      cachedSiteSettings = {
        ...DEFAULT_SITE_SETTINGS,
        ...strapiSettings,
        socialLinks: {
          ...DEFAULT_SITE_SETTINGS.socialLinks,
          ...strapiSettings.socialLinks,
        },
        seoMetadata: {
          ...DEFAULT_SITE_SETTINGS.seoMetadata,
          ...strapiSettings.seoMetadata,
        },
      };
      
      lastFetchTime = now;
      return cachedSiteSettings as StrapiSiteSettings;
    }
  } catch (error) {
    console.warn('Failed to fetch site settings from Strapi, using defaults:', error);
  }

  // Return defaults if Strapi is unavailable
  cachedSiteSettings = DEFAULT_SITE_SETTINGS;
  lastFetchTime = now;
  return DEFAULT_SITE_SETTINGS;
}

/**
 * Fetch about page content from Strapi
 */
export async function getAboutPage(): Promise<StrapiAboutPage | null> {
  try {
    const response = await fetch(`${config.strapi.url}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            aboutPage {
              title
              slug
              content
              metaTitle
              metaDescription
              heroImage {
                url
                alternativeText
              }
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.warn('GraphQL errors in about page:', data.errors);
      return null;
    }

    return data.data?.aboutPage || null;
  } catch (error) {
    console.warn('Failed to fetch about page from Strapi:', error);
    return null;
  }
}

/**
 * Get hardcoded navigation items
 */
export function getNavigationItems() {
  return [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ];
}

/**
 * Get social links with non-empty values
 */
export async function getSocialLinks() {
  const settings = await getSiteSettings();
  const socialLinks = settings.socialLinks || DEFAULT_SITE_SETTINGS.socialLinks || {};
  
  // Filter out empty values
  return Object.entries(socialLinks)
    .filter(([_, value]) => value && value.trim() !== '')
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

/**
 * Clear the cache (useful for development)
 */
export function clearSiteSettingsCache() {
  cachedSiteSettings = null;
  lastFetchTime = 0;
} 