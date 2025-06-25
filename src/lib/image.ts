import { getImageUrl } from '../config/environment';

/**
 * Default placeholder image data URL - simple gray placeholder
 */
export const DEFAULT_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwSDI1MFYyMDBIMTUwVjEwMFoiIHN0cm9rZT0iIzhFOTQ5RCIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+CjxjaXJjbGUgY3g9IjE4MCIgY3k9IjEzMCIgcj0iMTAiIGZpbGw9IiM4RTk0OUQiLz4KPHBhdGggZD0iTTE2MCAxNzBMMTgwIDE1MEwyMDAgMTcwTDIyMCAxNTBMMjQwIDE3MFYxODBIMTYwVjE3MFoiIGZpbGw9IiM4RTk0OUQiLz4KPC9zdmc+';

/**
 * Simple responsive image options
 */
export interface ResponsiveImageOptions {
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
}

/**
 * Strapi image interface matching what we get from GraphQL
 */
export interface StrapiImage {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

/**
 * Get image src with fallback to placeholder
 */
export function getImageSrc(image?: StrapiImage | null): string {
  if (!image?.url) {
    return DEFAULT_PLACEHOLDER;
  }
  
  const imageUrl = getImageUrl(image);
  return imageUrl || DEFAULT_PLACEHOLDER;
}

/**
 * Get responsive image props for use in img elements
 */
export function getResponsiveImageProps(
  image: StrapiImage | null | undefined,
  options: ResponsiveImageOptions
): {
  src: string;
  alt: string;
  loading: 'lazy' | 'eager';
  className?: string;
  width?: number;
  height?: number;
} {
  return {
    src: getImageSrc(image),
    alt: image?.alternativeText || options.alt,
    loading: options.loading || 'lazy',
    className: options.className,
    width: options.width || image?.width,
    height: options.height || image?.height,
  };
}

/**
 * Check if image exists and fallback if needed
 */
export function getFallbackImageSrc(
  primaryImage?: StrapiImage | null,
  fallbackUrl?: string
): string {
  if (primaryImage?.url) {
    const url = getImageUrl(primaryImage);
    if (url) return url;
  }
  
  return fallbackUrl || DEFAULT_PLACEHOLDER;
} 