/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Strictly 4 colors total (including white and black) + dark mode variants
        primary: {
          DEFAULT: '#1a1a1a',    // near-black for text
          dark: '#ffffff',       // white for dark mode text
        },
        accent: {
          DEFAULT: '#6366f1',    // indigo for links/highlights  
          dark: '#818cf8',       // lighter indigo for dark mode
        },
        muted: {
          DEFAULT: '#f8fafc',    // light gray for backgrounds
          dark: '#1f2937',       // dark gray for dark mode backgrounds
        },
        // white and black are available by default as the 4th colors
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.primary.DEFAULT'),
            maxWidth: 'none',
            h1: {
              fontFamily: '"Playfair Display", serif',
              fontWeight: '700',
              color: theme('colors.primary.DEFAULT'),
            },
            h2: {
              fontFamily: '"Playfair Display", serif',
              fontWeight: '600',
              color: theme('colors.primary.DEFAULT'),
            },
            h3: {
              fontFamily: '"Playfair Display", serif',
              fontWeight: '600',
              color: theme('colors.primary.DEFAULT'),
            },
            h4: {
              fontFamily: '"Playfair Display", serif',
              fontWeight: '600',
              color: theme('colors.primary.DEFAULT'),
            },
            a: {
              color: theme('colors.accent.DEFAULT'),
              textDecoration: 'underline',
              '&:hover': {
                color: theme('colors.primary.DEFAULT'),
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.accent.DEFAULT'),
              color: theme('colors.primary.DEFAULT'),
            },
            code: {
              backgroundColor: theme('colors.muted.DEFAULT'),
              color: theme('colors.primary.DEFAULT'),
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.primary.DEFAULT'),
              color: '#ffffff',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
            },
            strong: {
              color: theme('colors.primary.DEFAULT'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.primary.dark'),
            h1: {
              color: theme('colors.primary.dark'),
            },
            h2: {
              color: theme('colors.primary.dark'),
            },
            h3: {
              color: theme('colors.primary.dark'),
            },
            h4: {
              color: theme('colors.primary.dark'),
            },
            a: {
              color: theme('colors.accent.dark'),
              '&:hover': {
                color: theme('colors.primary.dark'),
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.accent.dark'),
              color: theme('colors.primary.dark'),
            },
            code: {
              backgroundColor: theme('colors.muted.dark'),
              color: theme('colors.primary.dark'),
            },
            pre: {
              backgroundColor: theme('colors.muted.dark'),
              color: theme('colors.primary.dark'),
            },
            strong: {
              color: theme('colors.primary.dark'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 