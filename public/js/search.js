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
      if (this.searchDropdown && !this.searchDropdown.contains(e.target) && 
          (!this.searchToggleMobile || !this.searchToggleMobile.contains(e.target)) && 
          (!this.searchToggleDesktop || !this.searchToggleDesktop.contains(e.target))) {
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
        tag.name && tag.name.toLowerCase().includes(lowerQuery)
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
      const imageHTML = post.cover && post.cover.url 
        ? `<div class="w-12 h-12 rounded flex-shrink-0 overflow-hidden bg-gray-100" style="width: 48px; height: 48px; min-width: 48px; min-height: 48px; max-width: 48px; max-height: 48px;">
             <img src="${this.getImageUrl(post.cover)}" alt="${post.cover.alternativeText || post.title}" class="w-full h-full object-cover" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
           </div>`
        : '<div class="w-12 h-12 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center" style="width: 48px; height: 48px; min-width: 48px; min-height: 48px;"><svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></div>';

      const excerptHTML = post.excerpt 
        ? `<p class="text-xs text-gray-600 mt-1 line-clamp-2">${post.excerpt}</p>`
        : '';

      const tagsHTML = post.tags && post.tags.length > 0
        ? `<div class="flex flex-wrap gap-1 mt-2">
             ${post.tags.slice(0, 2).map(tag => 
               `<span class="inline-block px-2 py-0.5 bg-muted text-xs text-primary/70 rounded">#${tag.name}</span>`
             ).join('')}
             ${post.tags.length > 2 ? `<span class="text-xs text-primary/50">+${post.tags.length - 2}</span>` : ''}
           </div>`
        : '';

      return `<a href="/blog/${post.slug}" class="block p-3 hover:bg-gray-50 rounded-lg transition-colors group">
        <div class="flex items-start space-x-3">
          ${imageHTML}
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-gray-900 group-hover:text-blue-600 text-sm truncate">${post.title}</h3>
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

  getImageUrl(image) {
    if (!image || !image.url) return '';
    
    // Check if we have formats available (Strapi auto-generates these)
    if (image.formats) {
      // Use thumbnail first (160x160), then small (500px), then original
      if (image.formats.thumbnail?.url) {
        const url = image.formats.thumbnail.url;
        return url.startsWith('http') ? url : 'http://localhost:1337' + url;
      }
      if (image.formats.small?.url) {
        const url = image.formats.small.url;
        return url.startsWith('http') ? url : 'http://localhost:1337' + url;
      }
    }
    
    // Fallback to original with width query parameter for optimization
    const baseUrl = image.url.startsWith('http') ? image.url : 'http://localhost:1337' + image.url;
    return baseUrl + '?width=96&height=96&fit=cover'; // 96px for retina displays on 48px container
  }
}

// Mobile menu functionality
class MobileMenu {
  constructor() {
    this.toggleButton = document.getElementById('mobile-menu-toggle');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.bindEvents();
  }

  bindEvents() {
    if (this.toggleButton && this.mobileMenu) {
      this.toggleButton.addEventListener('click', () => {
        this.mobileMenu.classList.toggle('hidden');
      });
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MobileMenu();
  new BlogSearch();
}); 