import rss from '@astrojs/rss';
import { getPosts } from '../lib/strapi';
import { getSiteSettings } from '../lib/site-settings';

export async function GET(context) {
	const response = await getPosts(100); // Get all posts for RSS (already filtered by publishedAt)
	const posts = response.data;
	
	// Get site settings for RSS metadata
	const siteSettings = await getSiteSettings();
	
	return rss({
		title: siteSettings.siteTitle,
		description: siteSettings.siteDescription,
		site: context.site,
		items: posts.map((post) => ({
			title: post.title,
			description: post.excerpt || '',
			pubDate: new Date(post.publishedAt || post.createdAt),
			link: `/blog/${post.slug}/`,
		})),
	});
}
