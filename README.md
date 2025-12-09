# Blog Site

A modern, responsive blog site built with Astro and Pages CMS.

## Features

- **Static Site Generation** with Astro for optimal performance
- **Git-based CMS** with [Pages CMS](https://pagescms.org) - edit content directly on GitHub
- **Markdown Content** stored in your repository
- **Responsive Design** with Tailwind CSS
- **SEO Optimized** with sitemap and RSS feed generation
- **Reading Time Calculation** for blog posts
- **Tag-based Navigation** with clickable tag pages (`/tags/<tag>`) and a tag cloud in the author sidebar that shows top-used tags

## Tech Stack

- **Frontend**: [Astro](https://astro.build/) - Modern static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **CMS**: [Pages CMS](https://pagescms.org/) - Git-based content management
- **Content**: Markdown files with frontmatter

## Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd blogsite/astro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server** (defaults to port 4321)
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:4321
   ```

## Content Management

### Using Pages CMS

1. Go to [pagescms.org](https://pagescms.org)
2. Sign in with your GitHub account
3. Select your repository
4. Create and edit blog posts through the web interface

### Manual Editing

You can also edit content directly:

- **Blog Posts**: `src/content/blog/*.md`
- **Site Settings**: `src/data/site-settings.json`

### Blog Post Frontmatter

```yaml
---
title: "Your Post Title"
excerpt: "A short summary"
publishedAt: 2025-01-01
tags:
  - tag1
  - tag2
cover:
  src: "/uploads/image.jpg"
  alt: "Image description"
draft: false
---
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── content/
│   └── blog/        # Markdown blog posts
├── data/            # Site configuration
├── layouts/         # Page layouts
├── lib/             # Utility functions
├── pages/           # Route pages
└── styles/          # Global styles
```

## Build & Deploy

```bash
# Production build
npm run build

# Preview build
npm run preview
```

## License

MIT License
