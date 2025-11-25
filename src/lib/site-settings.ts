import siteSettingsData from '../data/site-settings.json';

// Image type used across settings
export interface ImageObject {
  src: string;
  alt?: string;
}

// Navigation item type
export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

// Types for site settings
export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  author: string;
  authorBio?: string;
  authorImage?: ImageObject | null;
  logo?: ImageObject | null;
  favicon?: ImageObject | null;
  socialLinks?: {
    email?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  footerText?: string;
  seoDefaults?: {
    ogImage?: ImageObject | null;
  };
}

// Navigation is hardcoded - not editable in CMS
const HARDCODED_NAVIGATION: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

// Default fallback values
const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteTitle: 'My Blog',
  siteDescription: 'A thoughtful collection of stories about life, style, and everything in between.',
  author: 'Blog Author',
  authorBio: 'Welcome to my corner of the internet.',
  socialLinks: {
    email: '',
    twitter: '',
    instagram: '',
    website: '',
  },
  footerText: '',
  seoDefaults: {
    ogImage: null,
  },
};

// Type for the raw JSON data
type SiteSettingsJSON = typeof siteSettingsData;

/**
 * Get site settings from local JSON file
 */
export function getSiteSettings(): SiteSettings {
  const data = siteSettingsData as SiteSettingsJSON;
  
  return {
    ...DEFAULT_SITE_SETTINGS,
    ...data,
    socialLinks: {
      ...DEFAULT_SITE_SETTINGS.socialLinks,
      ...(data.socialLinks || {}),
    },
    seoDefaults: {
      ...DEFAULT_SITE_SETTINGS.seoDefaults,
      ...(data.seoDefaults || {}),
    },
  };
}

/**
 * Get navigation items - hardcoded, not editable in CMS
 */
export function getNavigationItems(): NavigationItem[] {
  return HARDCODED_NAVIGATION;
}

/**
 * Get logo if configured
 */
export function getLogo(): ImageObject | null {
  const settings = getSiteSettings();
  return settings.logo || null;
}

/**
 * Get favicon if configured
 */
export function getFavicon(): ImageObject | null {
  const settings = getSiteSettings();
  return settings.favicon || null;
}

/**
 * Get default OG image for social sharing
 */
export function getDefaultOgImage(): ImageObject | null {
  const settings = getSiteSettings();
  return settings.seoDefaults?.ogImage || null;
}

/**
 * Get social links with non-empty values
 */
export function getSocialLinks(): Record<string, string> {
  const settings = getSiteSettings();
  const socialLinks = settings.socialLinks || {};
  
  // Filter out empty values
  return Object.entries(socialLinks)
    .filter(([_, value]) => value && value.trim() !== '')
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}
