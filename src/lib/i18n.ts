// UI strings for the blog
// This is where all user interface text should live, not in the CMS
export const ui = {
  // Navigation & Layout
  searchPlaceholder: 'Search posts...',
  
  // Blog & Posts
  readMore: 'Read more',
  backToAllStories: '← Back to all stories',
  viewAll: 'View all →',
  shareText: 'Share:',
  readingTime: 'min read',
  
  // Labels
  featuredLabel: 'Featured',
  recentStoriesLabel: 'Recent Stories',
  relatedStoriesLabel: 'Related Stories',
  exploreLabel: 'Explore',
  connectLabel: 'Connect',
  
  // Messages
  noPostsFound: 'No posts found',
  errorLoadingPosts: 'Error loading posts',
  noStoriesYet: 'No stories yet',
  checkBackSoon: 'Check back soon for new content.',
  
  // Footer
  allRightsReserved: 'All rights reserved.',
} as const;

// Type for UI string keys
export type UIStringKey = keyof typeof ui;

// Helper function to get UI strings (optional, for consistency)
export function getUIString(key: UIStringKey): string {
  return ui[key];
}

// Example usage:
// import { ui, getUIString } from '../lib/i18n';
// const text = ui.readMore; // Direct access
// const text2 = getUIString('readMore'); // Function access 