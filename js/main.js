/**
 * ==============================================================================
 * THE DAILY LENS - CLIENT-SIDE JAVASCRIPT
 * Coursework: Bachelor of Arts in Digital Journalism (BDJOU2)
 * Pair Assignment: Verena Likupe & Charity Ndhlovu
 * Topic: Development of an Online News Publishing Platform Using Semantic HTML
 * ==============================================================================
 *
 * Features Implemented (Meets Assignment Requirements 5, 6, 8, 10, 12):
 * 1. Loading Effects (Preloader & content shimmer loading)
 * 2. Responsive Navigation & Dual Dropdown Menus (Touch & Keyboard Accessible)
 * 3. Featured Story Carousel / Image Slider (Autoplay, Controls, Indicators)
 * 4. Real-Time Search & Autocomplete Results Filter
 * 5. Dynamic News Category Filtering with Result Counters
 * 6. Interactive Modal Windows (Quick Read & Newsletter Confirmation)
 * 7. "Read More / Show Less" Content Toggles
 * 8. Breaking News Ticker Controls (Pause/Play)
 * 9. Dark Mode / Light Mode Theme Switcher (Persistent via LocalStorage)
 * 10. Article Accessibility Tools (Font Size Adjustment, Reading Time)
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initTheme();
  initNavigation();
  initCarousel();
  initSearch();
  initCategoryFilter();
  initModals();
  initReadMore();
  initAccordions();
  initTicker();
  initArticleTools();
  initCurrentYear();
});

/* ==============================================================================
   1. LOADING EFFECTS (Requirement 10)
   ============================================================================== */
function initPreloader() {
  const preloader = document.getElementById('page-preloader');
  if (!preloader) return;

  const hidePreloader = () => {
    preloader.classList.add('preloader-hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 450);
  };

  // Dismiss on full window load or fallback timer
  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 250);
  } else {
    window.addEventListener('load', () => setTimeout(hidePreloader, 300));
    setTimeout(hidePreloader, 1500); // Safety fallback
  }
}

/**
 * Display a temporary loading shimmer effect when switching categories or running queries
 */
function showContentLoader(targetElement, duration = 300, callback) {
  if (!targetElement) {
    if (callback) callback();
    return;
  }
  targetElement.classList.add('content-loading');
  setTimeout(() => {
    targetElement.classList.remove('content-loading');
    if (callback) callback();
  }, duration);
}

/* ==============================================================================
   2. THEME SWITCHER (Dark / Light Mode)
   ============================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('dailylens_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('theme-dark');
  } else {
    document.documentElement.classList.remove('theme-dark');
  }
  updateThemeIcon(currentTheme);
  updateBrandLogo(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('theme-dark');
      const newTheme = isDark ? 'dark' : 'light';
      localStorage.setItem('dailylens_theme', newTheme);
      updateThemeIcon(newTheme);
      updateBrandLogo(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

function updateBrandLogo(theme) {
  const logoSource = theme === 'dark' ? 'images/logo-white.svg' : 'images/logo.svg';
  document.querySelectorAll('.brand-logo-img').forEach((logo) => {
    logo.setAttribute('src', logoSource);
  });
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle-btn');
  if (!themeToggle) return;
  const sunIcon = themeToggle.querySelector('.icon-sun');
  const moonIcon = themeToggle.querySelector('.icon-moon');
  if (sunIcon && moonIcon) {
    if (theme === 'dark') {
      sunIcon.style.display = 'inline-block';
      moonIcon.style.display = 'none';
      themeToggle.setAttribute('aria-label', 'Switch to light theme');
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'inline-block';
      themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    }
  }
}

/* ==============================================================================
   3. NAVIGATION & DUAL DROPDOWN MENUS (Requirement 6)
   ============================================================================== */
function initNavigation() {
  // Mobile Navigation Hamburger Toggle
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mainNav = document.getElementById('primary-navigation');
  const navList = document.querySelector('.main-navigation .nav-list');

  if (mobileToggle && navList) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navList.classList.toggle('nav-list-open');
      document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.main-navigation') && !e.target.closest('#mobile-nav-toggle')) {
        if (navList.classList.contains('nav-list-open')) {
          navList.classList.remove('nav-list-open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('menu-open');
        }
      }
    });
  }

  // Dual Dropdown Menus Setup & Keyboard Accessibility
  const dropdownItems = document.querySelectorAll('.nav-item-dropdown');

  dropdownItems.forEach((dropdown) => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (!trigger || !menu) return;

    // Toggle on trigger click (works for both touch and desktop)
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close other open dropdowns first
      dropdownItems.forEach(other => {
        if (other !== dropdown) {
          other.classList.remove('dropdown-open');
          const otherTrigger = other.querySelector('.dropdown-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      trigger.setAttribute('aria-expanded', !isExpanded);
      dropdown.classList.toggle('dropdown-open', !isExpanded);
    });

    // Keyboard navigation (Arrow keys & Escape)
    dropdown.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('dropdown-open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      dropdownItems.forEach((dropdown) => {
        dropdown.classList.remove('dropdown-open');
        const trigger = dropdown.querySelector('.dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* ==============================================================================
   4. FEATURED STORY CAROUSEL / IMAGE SLIDER (Requirement 5)
   ============================================================================== */
function initCarousel() {
  const carousel = document.querySelector('.featured-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.carousel-btn-prev');
  const nextBtn = carousel.querySelector('.carousel-btn-next');
  const dotsContainer = carousel.querySelector('.carousel-dots');

  if (slides.length <= 1) return;

  let currentSlide = 0;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 5000;

  const updateSlideAccessibility = () => {
    slides.forEach((slide, idx) => {
      slide.setAttribute('aria-hidden', String(idx !== currentSlide));
    });
  };

  // Build dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        restartAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  const updateDots = () => {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  };

  const goToSlide = (index) => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    updateDots();
    updateSlideAccessibility();
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      restartAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      restartAutoplay();
    });
  }

  // Keyboard navigation when carousel has focus
  carousel.setAttribute('tabindex', '0');
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
      restartAutoplay();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      restartAutoplay();
    }
  });

  // Autoplay with pause on hover
  const startAutoplay = () => {
    if (!autoplayTimer) {
      autoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    }
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  const restartAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  updateSlideAccessibility();
  startAutoplay();
}

/* ==============================================================================
   5. REAL-TIME SEARCH & FILTERING (Requirement 5 & 12)
   ============================================================================== */
function initSearch() {
  const searchInputs = document.querySelectorAll('.search-input');
  const searchForms = document.querySelectorAll('.search-form');
  const liveResultsModal = document.getElementById('search-modal');
  const liveResultsContainer = document.getElementById('search-results-list');
  const searchCountBadge = document.getElementById('search-results-count');

  // Collect searchable article items from the page
  const articleCards = Array.from(document.querySelectorAll('article')).map(card => {
    const titleEl = card.querySelector('h1, h2, h3, h4');
    const linkEl = card.querySelector('a');
    const summaryEl = card.querySelector('p');
    const categoryEl = card.querySelector('.badge');
    const authorEl = card.querySelector('.article-meta span:not(.meta-dot), .author-name');

    return {
      element: card,
      title: titleEl ? titleEl.textContent.trim() : '',
      summary: summaryEl ? summaryEl.textContent.trim() : '',
      category: categoryEl ? categoryEl.textContent.trim() : '',
      author: authorEl ? authorEl.textContent.trim() : '',
      url: linkEl ? linkEl.getAttribute('href') : '#'
    };
  }).filter(item => item.title.length > 0);

  // Form submit handler
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.search-input');
      if (input && input.value.trim().length > 0) {
        executeSearch(input.value.trim());
      }
    });
  });

  // Instant live input listener
  searchInputs.forEach(input => {
    let debounceTimer = null;
    input.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const query = e.target.value.trim();
      if (query.length >= 2) {
        debounceTimer = setTimeout(() => executeSearch(query), 200);
      }
    });
  });

  function executeSearch(query) {
    const lowerQuery = query.toLowerCase();
    const matches = articleCards.filter(item => {
      return item.title.toLowerCase().includes(lowerQuery) ||
             item.summary.toLowerCase().includes(lowerQuery) ||
             item.category.toLowerCase().includes(lowerQuery) ||
             item.author.toLowerCase().includes(lowerQuery);
    });

    // Populate search modal if present
    if (liveResultsModal && liveResultsContainer) {
      liveResultsContainer.innerHTML = '';
      if (searchCountBadge) {
        searchCountBadge.textContent = `${matches.length} result${matches.length === 1 ? '' : 's'} for "${query}"`;
      }

      if (matches.length === 0) {
        liveResultsContainer.innerHTML = `
          <div class="search-empty-state">
            <p>No stories found matching "<strong>${escapeHtml(query)}</strong>".</p>
            <p class="search-hint">Try searching for topics like "solar", "MUBAS", "football", "technology", or reporters "Charity Ndhlovu" / "Verena Likupe".</p>
          </div>
        `;
      } else {
        matches.slice(0, 10).forEach(match => {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'search-result-item';
          itemDiv.innerHTML = `
            <span class="badge badge-tech">${escapeHtml(match.category || 'News')}</span>
            <h4><a href="${escapeHtml(match.url)}">${highlightText(match.title, query)}</a></h4>
            <p>${highlightText(match.summary.substring(0, 120), query)}...</p>
            <div class="search-item-meta">
              <span>${escapeHtml(match.author || 'The DailyLens Desk')}</span>
            </div>
          `;
          liveResultsContainer.appendChild(itemDiv);
        });
      }

      liveResultsModal.classList.add('modal-open');
      document.body.classList.add('modal-backdrop-open');
    } else {
      // In-page visual filtering if no search modal exists
      articleCards.forEach(item => {
        const isMatch = item.title.toLowerCase().includes(lowerQuery) ||
                        item.summary.toLowerCase().includes(lowerQuery);
        item.element.style.display = isMatch ? '' : 'none';
      });
      showToast(`Found ${matches.length} articles matching "${query}"`);
    }
  }
}

/* ==============================================================================
   6. DYNAMIC NEWS CATEGORY FILTERING (Requirement 5 & 12)
   ============================================================================== */
function initCategoryFilter() {
  const filterPills = document.querySelectorAll('.category-filter-pill');
  const filterableCards = document.querySelectorAll('[data-category]');
  const countDisplay = document.getElementById('filter-results-counter');
  const gridContainer = document.querySelector('.filterable-grid');

  if (filterPills.length === 0 || filterableCards.length === 0) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Update active pill
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const selectedCategory = pill.getAttribute('data-filter') || 'all';

      // Shimmer loading feedback
      showContentLoader(gridContainer, 200, () => {
        let visibleCount = 0;

        filterableCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category') || '';
          const match = selectedCategory === 'all' ||
                        cardCategory.toLowerCase() === selectedCategory.toLowerCase();

          if (match) {
            card.classList.remove('card-hidden');
            card.style.display = '';
            visibleCount++;
          } else {
            card.classList.add('card-hidden');
            card.style.display = 'none';
          }
        });

        if (countDisplay) {
          countDisplay.textContent = `Showing ${visibleCount} ${selectedCategory === 'all' ? 'total' : selectedCategory} ${visibleCount === 1 ? 'article' : 'articles'}`;
        }
      });
    });
  });
}

/* ==============================================================================
   7. INTERACTIVE MODAL WINDOWS (Requirement 5)
   ============================================================================== */
function initModals() {
  // Close buttons inside any modal
  const closeButtons = document.querySelectorAll('[data-modal-close], .modal-close-btn');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => closeAllModals());
  });

  // Backdrop click to close
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Quick Read Modal triggers
  const quickReadBtns = document.querySelectorAll('.btn-quick-read');
  const quickModal = document.getElementById('quick-read-modal');

  quickReadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const storyCard = btn.closest('.carousel-slide, article');
      if (!storyCard || !quickModal) return;

      const title = storyCard.querySelector('h1, h2, h3, h4')?.textContent.trim() || 'News Article';
      const summary = storyCard.querySelector('p')?.textContent.trim() || '';
      const category = storyCard.querySelector('.badge')?.textContent.trim() || 'General';
      const metaElement = storyCard.querySelector('.article-meta');
      const meta = metaElement ? metaElement.cloneNode(true) : null;
      meta?.querySelector('.btn-quick-read')?.remove();
      const imgSrc = storyCard.querySelector('img')?.getAttribute('src') || '';
      const fullLink = storyCard.querySelector('h1 a, h2 a, h3 a, h4 a')?.getAttribute('href') || '#';

      const modalTitle = quickModal.querySelector('.modal-article-title');
      const modalBadge = quickModal.querySelector('.modal-article-badge');
      const modalMeta = quickModal.querySelector('.modal-article-meta');
      const modalSummary = quickModal.querySelector('.modal-article-body');
      const modalImg = quickModal.querySelector('.modal-article-img');
      const modalFullBtn = quickModal.querySelector('.modal-read-full-btn');

      if (modalTitle) modalTitle.textContent = title;
      if (modalBadge) modalBadge.textContent = category;
      if (modalMeta) {
        modalMeta.replaceChildren();
        if (meta) {
          modalMeta.append(...meta.childNodes);
        } else {
          modalMeta.textContent = 'The DailyLens newsroom';
        }
      }
      if (modalSummary) {
        const summaryParagraph = document.createElement('p');
        summaryParagraph.className = 'modal-lead-para';
        summaryParagraph.textContent = summary;
        const noteParagraph = document.createElement('p');
        noteParagraph.textContent = 'Read the complete report for the full context, voices, and verified details behind this story.';
        modalSummary.replaceChildren(summaryParagraph, noteParagraph);
      }
      if (modalImg) {
        if (imgSrc) {
          modalImg.src = imgSrc;
          modalImg.alt = title;
          modalImg.style.display = 'block';
        } else {
          modalImg.style.display = 'none';
        }
      }
      if (modalFullBtn) {
        modalFullBtn.setAttribute('href', fullLink);
      }

      quickModal.classList.add('modal-open');
      document.body.classList.add('modal-backdrop-open');
      quickModal.querySelector('.modal-close-btn')?.focus();
    });
  });

  // Newsletter Subscription Form (Submits via modal popup)
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  const newsletterModal = document.getElementById('newsletter-success-modal');

  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (!emailInput || !emailInput.value.includes('@')) {
        showToast('Please enter a valid email address.');
        return;
      }

      const email = emailInput.value;
      form.reset();

      if (newsletterModal) {
        const emailPlaceholder = newsletterModal.querySelector('.modal-subscriber-email');
        if (emailPlaceholder) emailPlaceholder.textContent = email;
        newsletterModal.classList.add('modal-open');
        document.body.classList.add('modal-backdrop-open');
      } else {
        showToast(`Thank you! Subscribed with ${email}`);
      }
    });
  });
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('modal-open');
  });
  document.body.classList.remove('modal-backdrop-open');
}

/* ==============================================================================
   8. "READ MORE / SHOW LESS" TOGGLES (Requirement 5)
   ============================================================================== */
function initReadMore() {
  const readMoreButtons = document.querySelectorAll('.btn-read-more-toggle');

  readMoreButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const targetContent = targetId ? document.getElementById(targetId) : btn.previousElementSibling;

      if (!targetContent) return;

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isExpanded);

      if (isExpanded) {
        targetContent.classList.remove('content-expanded');
        btn.innerHTML = 'Read Full Summary <span aria-hidden="true">&darr;</span>';
      } else {
        targetContent.classList.add('content-expanded');
        btn.innerHTML = 'Show Less <span aria-hidden="true">&uarr;</span>';
      }
    });
  });
}

/* ==============================================================================
   9. ACCORDION / SHOW-HIDE SECTIONS (Requirement 5)
   ============================================================================== */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const body = header.nextElementSibling;

      // Close siblings if in single-expand mode
      const parent = header.closest('.accordion-group');
      if (parent) {
        parent.querySelectorAll('.accordion-header').forEach(sibling => {
          if (sibling !== header) {
            sibling.setAttribute('aria-expanded', 'false');
            if (sibling.nextElementSibling) sibling.nextElementSibling.classList.remove('accordion-open');
          }
        });
      }

      header.setAttribute('aria-expanded', !isExpanded);
      if (body) {
        body.classList.toggle('accordion-open', !isExpanded);
      }
    });
  });
}

/* ==============================================================================
   10. BREAKING NEWS TICKER PAUSE / PLAY
   ============================================================================== */
function initTicker() {
  const ticker = document.querySelector('.ticker-track');
  const toggleBtn = document.getElementById('ticker-toggle-btn');
  if (!ticker || !toggleBtn) return;

  let isPaused = false;

  toggleBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    ticker.style.animationPlayState = isPaused ? 'paused' : 'running';
    toggleBtn.setAttribute('aria-label', isPaused ? 'Play news ticker' : 'Pause news ticker');
    toggleBtn.innerHTML = isPaused ? '&#9658;' : '&#10074;&#10074;';
    showToast(isPaused ? 'Ticker paused' : 'Ticker resumed');
  });
}

/* ==============================================================================
   11. ARTICLE ACCESSIBILITY & READING TOOLS
   ============================================================================== */
function initArticleTools() {
  const articleBody = document.querySelector('.article-main-body, .article-prose');
  if (!articleBody) return;

  // Font Size Adjuster
  const btnFontDecrease = document.getElementById('btn-font-decrease');
  const btnFontIncrease = document.getElementById('btn-font-increase');
  const btnFontReset = document.getElementById('btn-font-reset');

  let currentFontSizePercent = 100;

  if (btnFontIncrease) {
    btnFontIncrease.addEventListener('click', () => {
      if (currentFontSizePercent < 140) {
        currentFontSizePercent += 10;
        articleBody.style.fontSize = `${currentFontSizePercent}%`;
      }
    });
  }

  if (btnFontDecrease) {
    btnFontDecrease.addEventListener('click', () => {
      if (currentFontSizePercent > 85) {
        currentFontSizePercent -= 10;
        articleBody.style.fontSize = `${currentFontSizePercent}%`;
      }
    });
  }

  if (btnFontReset) {
    btnFontReset.addEventListener('click', () => {
      currentFontSizePercent = 100;
      articleBody.style.fontSize = '';
    });
  }

  // Reading Time Estimation
  const readTimeBadge = document.getElementById('reading-time-estimate');
  if (readTimeBadge) {
    const text = articleBody.textContent || '';
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    readTimeBadge.textContent = `${readingTime} min read (${words} words)`;
  }

  // Copy Link Button with Toast Notification
  const copyLinkBtn = document.getElementById('btn-copy-link');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Article link copied to clipboard!');
        }).catch(() => {
          showToast('URL copied: ' + window.location.href);
        });
      } else {
        showToast('URL copied: ' + window.location.href);
      }
    });
  }
}

/* ==============================================================================
   12. HELPER UTILITIES
   ============================================================================== */
function initCurrentYear() {
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
}

function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'site-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('toast-visible');

  setTimeout(() => {
    toast.classList.remove('toast-visible');
  }, 2800);
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function highlightText(text, query) {
  if (!query) return escapeHtml(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escapeHtml(text).replace(regex, '<mark class="search-highlight">$1</mark>');
}
