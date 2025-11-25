import siteSettingsData from '../data/site-settings.json';

// Types for site settings
export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  author: string;
  authorBio?: string;
  authorImage?: {
    src: string;
    alt?: string;
  } | null;
  logo?: {
    src: string;
    alt?: string;
  } | null;
  favicon?: {
    src: string;
    alt?: string;
  } | null;
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
      src: string;
      alt?: string;
    } | null;
  };
}

// About page type
export interface AboutPage {
  title: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  heroImage?: {
    src: string;
    alt?: string;
  } | null;
}

// Default fallback values
const DEFAULT_SITE_SETTINGS: SiteSettings = {
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

/**
 * Get site settings from local JSON file
 */
export function getSiteSettings(): SiteSettings {
  return {
    ...DEFAULT_SITE_SETTINGS,
    ...siteSettingsData,
    socialLinks: {
      ...DEFAULT_SITE_SETTINGS.socialLinks,
      ...(siteSettingsData.socialLinks || {}),
    },
    seoMetadata: {
      ...DEFAULT_SITE_SETTINGS.seoMetadata,
      ...(siteSettingsData.seoMetadata || {}),
    },
  };
}

/**
 * Get about page content from local JSON file
 */
export function getAboutPage(): AboutPage | null {
  const data = siteSettingsData as typeof siteSettingsData & { aboutPage?: AboutPage };
  return data.aboutPage || null;
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
export function getSocialLinks() {
  const settings = getSiteSettings();
  const socialLinks = settings.socialLinks || DEFAULT_SITE_SETTINGS.socialLinks || {};
  
  // Filter out empty values
  return Object.entries(socialLinks)
    .filter(([_, value]) => value && value.trim() !== '')
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}
