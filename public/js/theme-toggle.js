(function () {
	const STORAGE_KEY = 'reset-theme';

	const getStoredTheme = () => {
		try {
			return localStorage.getItem(STORAGE_KEY);
		} catch {
			return null;
		}
	};

	const setStoredTheme = (value) => {
		try {
			localStorage.setItem(STORAGE_KEY, value);
		} catch {
			/* no-op */
		}
	};

	const applyTheme = (theme, { persist = true } = {}) => {
		const doc = document.documentElement;
		doc.setAttribute('data-theme', theme);
		doc.classList.toggle('dark', theme === 'dark');

		if (persist) {
			setStoredTheme(theme);
		}

		document
			.querySelectorAll('[data-theme-toggle]')
			.forEach((button) => button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false'));
	};

	const resolvePreferredTheme = () => {
		const stored = getStoredTheme();
		if (stored) return stored;
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};

	const handleToggle = (event) => {
		event.preventDefault();
		const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
		applyTheme(nextTheme);
	};

	const bindToggleButtons = () => {
		document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
			if (button.dataset.themeToggleBound === 'true') return;
			button.dataset.themeToggleBound = 'true';
			button.addEventListener('click', handleToggle);
		});
	};

	const init = () => {
		const preferred = resolvePreferredTheme();
		applyTheme(preferred, { persist: !getStoredTheme() });
		bindToggleButtons();

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		if (mediaQuery) {
			mediaQuery.addEventListener('change', (event) => {
				if (getStoredTheme()) return;
				applyTheme(event.matches ? 'dark' : 'light', { persist: false });
			});
		}
	};

	document.addEventListener('DOMContentLoaded', init);
	document.addEventListener('astro:page-load', init);
})();


