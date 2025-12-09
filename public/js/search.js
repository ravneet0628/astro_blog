// Search functionality for the blog
class BlogSearch {
  constructor() {
    this.searchPosts = window.SEARCH_DATA || [];
    this.searchTimeout = null;
    this.isSearchOpen = false;
    this.initializeElements();
    this.bindEvents();
  }

  initializeElements() {
    this.searchToggleMobile = document.getElementById('search-toggle');
    this.searchToggleDesktop = document.getElementById('search-toggle-desktop');
    this.searchDropdown = document.getElementById('search-dropdown');
    this.searchInput = document.getElementById('search-input');
    this.searchResults = document.getElementById('search-posts');
    this.searchPlaceholder = document.getElementById('search-placeholder');
    this.searchNoResults = document.getElementById('search-no-results');
    this.mobileSearchTrigger = document.getElementById('mobile-search-trigger');
  }

  bindEvents() {
    // Search toggle events
    if (this.searchToggleMobile) {
      this.searchToggleMobile.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleSearchDropdown();
      });
    }

    if (this.searchToggleDesktop) {
      this.searchToggleDesktop.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleSearchDropdown();
      });
    }

    // Click outside to close
    document.addEventListener('click', (e) => {
      const clickedInsideDropdown = this.searchDropdown && this.searchDropdown.contains(e.target);
      const clickedOnToggle = (this.searchToggleMobile && this.searchToggleMobile.contains(e.target)) ||
        (this.searchToggleDesktop && this.searchToggleDesktop.contains(e.target)) ||
        (this.mobileSearchTrigger && this.mobileSearchTrigger.contains(e.target));

      if (this.searchDropdown && !clickedInsideDropdown && !clickedOnToggle) {
        this.closeSearchDropdown();
      }
    });

    // Search input events
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });

      this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeSearchDropdown();
        }
      });
    }

    // Prevent dropdown clicks from closing
    if (this.searchDropdown) {
      this.searchDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    if (this.mobileSearchTrigger) {
      this.mobileSearchTrigger.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        document.dispatchEvent(new CustomEvent('mobile-menu:close'));
        this.openSearchDropdown();
      });
    }
  }

  toggleSearchDropdown() {
    if (this.isSearchOpen) {
      this.closeSearchDropdown();
    } else {
      this.openSearchDropdown();
    }
  }

  openSearchDropdown() {
    if (this.searchDropdown) {
      this.searchDropdown.classList.remove('hidden');
    }
    
    // Update aria-expanded state
    [this.searchToggleMobile, this.searchToggleDesktop].forEach(btn => {
      if (btn) btn.setAttribute('aria-expanded', 'true');
    });
    
    if (this.searchInput) {
      this.searchInput.focus();
    }
    this.isSearchOpen = true;
  }

  closeSearchDropdown() {
    if (this.searchDropdown) {
      this.searchDropdown.classList.add('hidden');
    }
    
    // Update aria-expanded state
    [this.searchToggleMobile, this.searchToggleDesktop].forEach(btn => {
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
    
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    this.showSearchPlaceholder();
    this.isSearchOpen = false;
  }

  handleSearch(query) {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.performSearch(query.trim());
    }, 300);
  }

  performSearch(query) {
    if (!query) {
      this.showSearchPlaceholder();
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filteredPosts = this.searchPosts.filter(post => {
      if (!post) return false;
      
      // Search in title
      if (post.title && post.title.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      // Search in excerpt
      if (post.excerpt && post.excerpt.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      // Search in tags
      if (post.tags && post.tags.some(tag => 
        typeof tag === 'string' && tag.toLowerCase().includes(lowerQuery)
      )) {
        return true;
      }
      
      return false;
    });

    if (filteredPosts.length > 0) {
      this.showSearchResults(filteredPosts);
    } else {
      this.showSearchNoResults();
    }
  }

  showSearchPlaceholder() {
    this.hideAllSearchStates();
    if (this.searchPlaceholder) {
      this.searchPlaceholder.classList.remove('hidden');
    }
  }

  showSearchResults(posts) {
    this.hideAllSearchStates();
    if (this.searchResults) {
      this.searchResults.classList.remove('hidden');
    }
    
    const postsHTML = posts.slice(0, 10).map(post => {
      const imageHTML = post.cover && post.cover.src 
        ? `<div class="w-12 h-12 rounded flex-shrink-0 overflow-hidden bg-muted" style="width: 48px; height: 48px; min-width: 48px; min-height: 48px;">
             <img src="${post.cover.src}" alt="${post.cover.alt || post.title}" class="w-full h-full object-cover" loading="lazy" />
           </div>`
        : '<div class="w-12 h-12 bg-muted rounded flex-shrink-0 flex items-center justify-center" style="width: 48px; height: 48px;"><svg class="w-4 h-4 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></div>';

      const excerptHTML = post.excerpt 
        ? `<p class="text-xs text-primary/60 mt-1 line-clamp-2">${post.excerpt}</p>`
        : '';

      const tagsHTML = post.tags && post.tags.length > 0
        ? `<div class="flex flex-wrap gap-1 mt-2">
             ${post.tags.slice(0, 2).map(tag => 
               `<span class="inline-block px-2 py-0.5 bg-muted text-xs text-primary/70 rounded">#${tag}</span>`
             ).join('')}
             ${post.tags.length > 2 ? `<span class="text-xs text-primary/50">+${post.tags.length - 2}</span>` : ''}
           </div>`
        : '';

      return `<a href="/blog/${post.slug}" class="block p-3 hover:bg-muted rounded-lg transition-colors group">
        <div class="flex items-start space-x-3">
          ${imageHTML}
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-primary group-hover:text-accent text-sm truncate">${post.title}</h3>
            ${excerptHTML}
            ${tagsHTML}
          </div>
        </div>
      </a>`;
    }).join('');
    
    if (this.searchResults) {
      this.searchResults.innerHTML = postsHTML;
    }
  }

  showSearchNoResults() {
    this.hideAllSearchStates();
    if (this.searchNoResults) {
      this.searchNoResults.classList.remove('hidden');
    }
  }

  hideAllSearchStates() {
    [this.searchPlaceholder, this.searchResults, this.searchNoResults].forEach(element => {
      if (element) element.classList.add('hidden');
    });
  }
}

// Mobile menu functionality
class MobileMenu {
  constructor() {
    this.toggleButton = document.getElementById('mobile-menu-toggle');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.closeButton = document.getElementById('mobile-menu-close');
    this.isOpen = false;
    this.previouslyFocusedElement = null;
    this.previousBodyOverflow = '';
    this.handleKeydown = this.handleKeydown.bind(this);
    this.bindEvents();
    document.addEventListener('mobile-menu:close', () => this.closeMenu());
  }

  bindEvents() {
    if (this.toggleButton && this.mobileMenu) {
      this.toggleButton.addEventListener('click', () => this.toggleMenu());
    }

    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.closeMenu());
    }

    if (this.mobileMenu) {
      this.mobileMenu.addEventListener('click', (event) => {
        if (event.target === this.mobileMenu) {
          this.closeMenu();
        }
      });

      const links = this.mobileMenu.querySelectorAll('a');
      links.forEach((link) => {
        link.addEventListener('click', () => this.closeMenu());
      });
    }
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    if (!this.mobileMenu) return;
    this.previouslyFocusedElement = document.activeElement;
    this.mobileMenu.classList.remove('hidden');
    this.mobileMenu.setAttribute('aria-hidden', 'false');
    this.previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (this.toggleButton) {
      this.toggleButton.setAttribute('aria-expanded', 'true');
    }
    this.isOpen = true;
    this.setInitialFocus();
    document.addEventListener('keydown', this.handleKeydown);
  }

  closeMenu() {
    if (!this.mobileMenu || !this.isOpen) return;
    this.mobileMenu.classList.add('hidden');
    this.mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = this.previousBodyOverflow || '';
    if (this.toggleButton) {
      this.toggleButton.setAttribute('aria-expanded', 'false');
    }
    this.isOpen = false;
    document.removeEventListener('keydown', this.handleKeydown);
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }
  }

  handleKeydown(event) {
    if (event.key === 'Escape') {
      this.closeMenu();
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  trapFocus(event) {
    const focusable = this.getFocusableElements();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  getFocusableElements() {
    if (!this.mobileMenu) return [];
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];
    return Array.from(this.mobileMenu.querySelectorAll(selectors.join(','))).filter(
      (el) => !el.hasAttribute('hidden') && el.offsetParent !== null
    );
  }

  setInitialFocus() {
    const focusable = this.getFocusableElements();
    if (focusable.length > 0) {
      focusable[0].focus();
    }
  }
}

// Initialize function
function initializeApp() {
  new MobileMenu();
  new BlogSearch();
}

// Initialize on first load
document.addEventListener('DOMContentLoaded', initializeApp);

// Re-initialize after Astro View Transitions navigation
document.addEventListener('astro:page-load', initializeApp);
