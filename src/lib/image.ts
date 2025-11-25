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
 * Cover image interface for blog posts
 */
export interface CoverImage {
  src: string;
  alt?: string;
}

/**
 * Get image src with fallback to placeholder
 */
export function getImageSrc(image?: CoverImage | null): string {
  if (!image?.src) {
    return DEFAULT_PLACEHOLDER;
  }
  return image.src;
}

/**
 * Get responsive image props for use in img elements
 */
export function getResponsiveImageProps(
  image: CoverImage | null | undefined,
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
    alt: image?.alt || options.alt,
    loading: options.loading || 'lazy',
    className: options.className,
    width: options.width,
    height: options.height,
  };
}

/**
 * Check if image exists and fallback if needed
 */
export function getFallbackImageSrc(
  primaryImage?: CoverImage | null,
  fallbackUrl?: string
): string {
  if (primaryImage?.src) {
    return primaryImage.src;
  }
  
  return fallbackUrl || DEFAULT_PLACEHOLDER;
}
