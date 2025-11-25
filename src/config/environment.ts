// Environment configuration for different deployment environments
export const config = {
  // Site Configuration
  site: {
    url: import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321',
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

// Reading time calculation
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};
