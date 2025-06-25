// Environment configuration for different deployment environments
export const config = {
  // API Configuration
  strapi: {
    url: import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337',
    graphqlEndpoint: '/graphql',
    uploadsPath: '/uploads'
  },

  // Site Configuration (fallbacks for when Strapi is unavailable)
  site: {
    url: import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321',
    title: import.meta.env.PUBLIC_SITE_TITLE || 'Sukh di Chah',
    description: import.meta.env.PUBLIC_SITE_DESCRIPTION || 'A thoughtful collection of stories about life, style, and everything in between.',
    author: import.meta.env.PUBLIC_AUTHOR || 'Sukhman Kaur',
    social: {
      twitter: import.meta.env.PUBLIC_TWITTER_URL || '',
      instagram: import.meta.env.PUBLIC_INSTAGRAM_URL || '',
      facebook: import.meta.env.PUBLIC_FACEBOOK_URL || '',
      linkedin: import.meta.env.PUBLIC_LINKEDIN_URL || '',
      github: import.meta.env.PUBLIC_GITHUB_URL || '',
      email: import.meta.env.PUBLIC_EMAIL || ''
    }
  },

  // Feature Flags
  features: {
    analytics: import.meta.env.PUBLIC_ANALYTICS_ENABLED === 'true',
    comments: import.meta.env.PUBLIC_COMMENTS_ENABLED === 'true',
    newsletter: import.meta.env.PUBLIC_NEWSLETTER_ENABLED === 'true',
    search: import.meta.env.PUBLIC_SEARCH_ENABLED !== 'false', // default to true
    imageOptimization: import.meta.env.PUBLIC_ENABLE_IMAGE_OPTIMIZATION !== 'false',
    preconnect: import.meta.env.PUBLIC_ENABLE_PRECONNECT !== 'false'
  },

  // Analytics
  analytics: {
    googleAnalyticsId: import.meta.env.PUBLIC_GOOGLE_ANALYTICS_ID || '',
    plausibleDomain: import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN || ''
  },

  // Newsletter
  newsletter: {
    endpoint: import.meta.env.PUBLIC_NEWSLETTER_ENDPOINT || ''
  },

  // Development
  development: {
    debugMode: import.meta.env.PUBLIC_DEBUG_MODE === 'true'
  }
};

// Helper functions - only keeping what's actively used
export const getStrapiMediaUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${config.strapi.url}${path}`;
};

export const getImageUrl = (strapiImage: any) => {
  if (!strapiImage?.url) return undefined;
  return getStrapiMediaUrl(strapiImage.url);
};

// Reading time calculation
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}; 