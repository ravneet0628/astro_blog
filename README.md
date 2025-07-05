# Reset at 30 - Blog Frontend

A modern, responsive blog site built with Astro, featuring a headless CMS integration with Strapi. "Reset at 30" is a thoughtful collection of stories about life, style, and everything in between.

## 🌐 Live Site

🔗 **[resetat30.pages.dev](https://resetat30.pages.dev)**

The site is deployed on Cloudflare Pages and updated automatically with each push to the main branch.

## 📁 Repository

🔗 **[Astro Frontend](https://github.com/ravneet0628/astro_blog)** - This repository  
🔗 **[Strapi CMS Backend](https://github.com/ravneet0628/Blog_cms)** - Content management system

## 🚀 Features

- **Static Site Generation** with Astro for optimal performance
- **MDX Support** for rich content creation with components
- **Headless CMS** integration with Strapi via GraphQL
- **Responsive Design** with Tailwind CSS
- **SEO Optimized** with sitemap and RSS feed generation
- **Image Optimization** with built-in Astro image processing
- **Reading Time Calculation** for blog posts
- **Tag-based Navigation** for content organization
- **Author Sidebar** with social media links
- **Newsletter Signup** functionality
- **Performance Optimized** with static generation

## 🛠️ Tech Stack

- **Frontend**: [Astro](https://astro.build/) - Modern static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Content**: [MDX](https://mdxjs.com/) - Markdown with JSX components
- **CMS and Database**: [Strapi](https://strapi.io/) - Headless CMS with hosted PostgreSQL
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/) - Edge hosting

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Running Strapi CMS instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ravneet0628/astro_blog.git
   cd astro_blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the environment variables:
   ```env
   # Strapi CMS URL
   VITE_STRAPI_URL=http://localhost:1337
   
   # Site Configuration
   PUBLIC_SITE_URL=http://localhost:4321
   PUBLIC_SITE_TITLE=Reset at 30
   PUBLIC_SITE_DESCRIPTION=A thoughtful collection of stories about life, style, and everything in between.
   PUBLIC_AUTHOR=Your Name
   
   # Social Media Links
   PUBLIC_TWITTER_URL=
   PUBLIC_INSTAGRAM_URL=
   PUBLIC_EMAIL=hello@example.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:4321
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.astro     # Site header with navigation
│   ├── Footer.astro     # Site footer
│   ├── PostCard.astro   # Blog post card component
│   ├── AuthorSidebar.astro # Author information sidebar
│   ├── BaseHead.astro   # SEO meta tags
│   └── ...
├── layouts/             # Page layouts
│   └── Layout.astro     # Base layout template
├── pages/              # Route pages
│   ├── index.astro     # Homepage
│   ├── about.astro     # About page
│   ├── blog/           # Blog pages
│   ├── tags/           # Tag pages
│   └── rss.xml.js      # RSS feed
├── lib/                # Utility functions
│   ├── strapi.js       # Strapi API functions
│   └── site-settings.js # Site configuration
├── config/             # Configuration files
├── styles/             # Global styles
└── env.d.ts           # TypeScript definitions
```

## 🎨 Styling

The project uses **Tailwind CSS** with a custom design system:

### Color Palette
- **Primary**: Main text and headings
- **Secondary**: Subtle text and borders
- **Accent**: Links and interactive elements
- **Muted**: Background colors and subtle elements

### Typography
- **Font Family**: Custom serif fonts for headings, sans-serif for body
- **Typography Plugin**: Enhanced typography for blog content

## 📝 Content Management

### Blog Posts
- Managed through Strapi CMS
- Support for rich content with MDX
- Featured images and thumbnails
- Tags and categories
- Reading time calculation
- SEO metadata

### Pages
- **Homepage**: Featured posts and recent stories
- **Blog**: Archive of all posts with pagination
- **About**: Author information and bio
- **Tags**: Tag-based content filtering

## 🔌 CMS Integration

The site integrates with Strapi CMS via GraphQL for content management:

- **Posts**: Blog articles with metadata
- **Tags**: Content categorization  
- **About Page**: Author information
- **Site Settings**: Global site configuration

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables (Production)
```env
VITE_STRAPI_URL=https://your-strapi-app.strapiapp.com
PUBLIC_SITE_URL=https://resetat30.pages.dev
PUBLIC_SITE_TITLE=Reset at 30
PUBLIC_SITE_DESCRIPTION=A thoughtful collection of stories about life, style, and everything in between.
PUBLIC_AUTHOR=Your Name
PUBLIC_EMAIL=your-email@example.com
```

### Cloudflare Pages Configuration
- **Framework**: Astro
- **Build command**: `npm run build`
- **Output directory**: `dist`

## 📈 Performance

- Static site generation for fast loading
- Image optimization with Astro
- CSS purging with Tailwind
- Component-based architecture
- SEO best practices implemented

## 🤝 Contributing

1. Fork the [repository](https://github.com/ravneet0628/astro_blog)
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Open an issue on [GitHub](https://github.com/ravneet0628/astro_blog/issues)

## 🔗 Related Projects

- [Strapi CMS Backend](../cms/README.md) - Content management system
- [Deployment Documentation](../deployment-plan.md) - Production deployment guide

---

**Built with ❤️ using Astro and Strapi** 