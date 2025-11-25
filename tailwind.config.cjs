const withOpacityValue = (variable) => ({ opacityValue }) => {
  if (opacityValue !== undefined) {
    return `rgb(var(${variable}) / ${opacityValue})`;
  }
  return `rgb(var(${variable}) / 1)`;
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue('--color-primary'),
        accent: withOpacityValue('--color-accent'),
        muted: withOpacityValue('--color-muted'),
        surface: withOpacityValue('--color-surface'),
        border: withOpacityValue('--color-border'),
        progress: withOpacityValue('--color-progress'),
        'progress-track': withOpacityValue('--color-progress-track'),
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.primary'),
            maxWidth: 'none',
            h1: {
              fontFamily: '"Playfair Display", serif',
              fontWeight: '700',
              color: theme('colors.primary'),
            },
            h2: {
              fontFamily: '"Playfair Display", serif',
              fontWeight: '600',
              color: theme('colors.primary'),
            },
            h3: {
              fontFamily: '"Playfair Display", serif',
              fontWeight: '600',
              color: theme('colors.primary'),
            },
            h4: {
              fontFamily: '"Playfair Display", serif',
              fontWeight: '600',
              color: theme('colors.primary'),
            },
            a: {
              color: theme('colors.accent'),
              textDecoration: 'underline',
              '&:hover': {
                color: theme('colors.primary'),
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.accent'),
              color: theme('colors.primary'),
            },
            code: {
              backgroundColor: theme('colors.muted'),
              color: theme('colors.primary'),
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.primary'),
              color: '#ffffff',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
            },
            strong: {
              color: theme('colors.primary'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

