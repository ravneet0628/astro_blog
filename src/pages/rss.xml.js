import rss from '@astrojs/rss';
import { getPosts } from '../lib/content';
import { getSiteSettings } from '../lib/site-settings';

export async function GET(context) {
	const posts = await getPosts(); // Get all posts (already filtered by draft status)
	
	// Get site settings for RSS metadata
	const siteSettings = getSiteSettings();
	
	return rss({
		title: siteSettings.siteTitle,
		description: siteSettings.siteDescription,
		site: context.site,
		items: posts.map((post) => ({
			title: post.title,
			description: post.excerpt || '',
			pubDate: post.publishedAt,
			link: `/blog/${post.slug}/`,
		})),
	});
}
