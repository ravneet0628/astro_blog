/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  // Site Configuration
  readonly PUBLIC_SITE_URL: string;

  // Feature Flags
  readonly PUBLIC_ANALYTICS_ENABLED?: string;
  readonly PUBLIC_COMMENTS_ENABLED?: string;
  readonly PUBLIC_NEWSLETTER_ENABLED?: string;
  readonly PUBLIC_SEARCH_ENABLED?: string;

  // Analytics
  readonly PUBLIC_GOOGLE_ANALYTICS_ID?: string;
  readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;

  // Newsletter
  readonly PUBLIC_NEWSLETTER_ENDPOINT?: string;

  // Performance
  readonly PUBLIC_ENABLE_IMAGE_OPTIMIZATION?: string;
  readonly PUBLIC_ENABLE_PRECONNECT?: string;

  // Development
  readonly PUBLIC_DEBUG_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
