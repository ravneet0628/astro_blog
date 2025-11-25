(function () {
	const ARTICLE_SELECTOR = '[data-article-content]';
	const TOC_LIST_SELECTOR = '[data-toc-list]';
	const TOC_MOBILE_LIST_SELECTOR = '[data-toc-mobile-list]';
	const PROGRESS_SELECTOR = '[data-reading-progress]';
	const SCROLL_TOP_SELECTOR = '[data-scroll-top]';
	const HEADING_QUERY = 'h2, h3';

	const slugify = (text) =>
		text
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-');

	const buildToc = (article) => {
		const desktopList = document.querySelector(TOC_LIST_SELECTOR);
		const mobileList = document.querySelector(TOC_MOBILE_LIST_SELECTOR);
		if (!article || (!desktopList && !mobileList)) return { headings: [], tocLinks: [] };

		const headings = Array.from(article.querySelectorAll(HEADING_QUERY)).filter(
			(node) => node.textContent && node.textContent.trim().length > 0
		);

		if (!headings.length) {
			if (desktopList) desktopList.innerHTML = '<li class="text-sm text-primary/60">Sections will appear here.</li>';
			if (mobileList) mobileList.innerHTML = '<li class="text-sm text-primary/60">Sections will appear here.</li>';
			return { headings: [], tocLinks: [] };
		}

		const createLink = (heading) => {
			if (!heading.id) {
				heading.id = slugify(heading.textContent || '');
			}

			const link = document.createElement('a');
			link.href = `#${heading.id}`;
			link.textContent = heading.textContent || '';
			link.className = 'toc-link';
			link.dataset.depth = heading.tagName === 'H3' ? '3' : '2';
			link.setAttribute('aria-current', 'false');
			return link;
		};

		const tocLinks = [];
		const appendLink = (targetList, heading) => {
			if (!targetList) return;
			const link = createLink(heading);
			const item = document.createElement('li');
			item.appendChild(link);
			targetList.appendChild(item);
			tocLinks.push(link);
		};

		headings.forEach((heading) => {
			appendLink(desktopList, heading);
			appendLink(mobileList, heading);
		});

		return { headings, tocLinks };
	};

	const initScrollSpy = (headings, tocLinks) => {
		if (!headings.length || !tocLinks.length) return;

		const setActive = (id) => {
			tocLinks.forEach((link) => {
				const isActive = link.getAttribute('href') === `#${id}`;
				link.setAttribute('aria-current', isActive ? 'true' : 'false');
			});
		};

		const observer = new IntersectionObserver(
			(entries) => {
				const visibleEntry =
					entries.find((entry) => entry.isIntersecting) ||
					entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

				if (visibleEntry?.target?.id) {
					setActive(visibleEntry.target.id);
				}
			},
			{
				rootMargin: '-55% 0px -35% 0px',
				threshold: [0, 0.3, 1],
			}
		);

		headings.forEach((heading) => observer.observe(heading));
	};

	const initReadingProgress = (article) => {
		const progressBar = document.querySelector(PROGRESS_SELECTOR);
		if (!progressBar || !article) return;

		let ticking = false;

		const update = () => {
			const rect = article.getBoundingClientRect();
			const scrollTop = window.scrollY || window.pageYOffset;
			const start = rect.top + scrollTop - 120;
			const end = start + article.offsetHeight - window.innerHeight * 0.25;
			const progress = Math.min(Math.max((scrollTop - start) / (end - start), 0), 1);
			progressBar.style.width = `${(progress || 0) * 100}%`;
			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(update);
				ticking = true;
			}
		};

		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', update);
	};

	const initScrollTop = () => {
		document.querySelectorAll(SCROLL_TOP_SELECTOR).forEach((button) => {
			button.addEventListener('click', (event) => {
				event.preventDefault();
				window.scrollTo({ top: 0, behavior: 'smooth' });
			});
		});
	};

	const init = () => {
		const article = document.querySelector(ARTICLE_SELECTOR);
		if (!article) return;
		const { headings, tocLinks } = buildToc(article);
		initScrollSpy(headings, tocLinks);
		initReadingProgress(article);
		initScrollTop();
	};

	document.addEventListener('DOMContentLoaded', init);
	document.addEventListener('astro:page-load', init);
})();

