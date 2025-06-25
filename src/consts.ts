// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import { config } from './config/environment';

// Legacy constants for backward compatibility
// These will be replaced by dynamic site settings from Strapi
export const SITE_TITLE = config.site.title;
export const SITE_DESCRIPTION = config.site.description;

// Note: For new code, use getSiteSettings() from './lib/site-settings' instead
// These constants are kept for compatibility with existing code that will be gradually migrated
