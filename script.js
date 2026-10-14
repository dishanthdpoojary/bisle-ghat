/**
 * Bisle Ghat Website Script
 * Functional behaviors: Navigation drawer, theme toggle, interactive checklist,
 * gallery lightbox dialog with keyboard and swipe support.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initActiveNavSpy();
  initChecklist();
  initGalleryLightbox();
  initSmoothScrollFix();
});

/* ==========================================================================
   1. Theme Toggle (Auto / Dark / Light with LocalStorage)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  if (!themeToggleBtn) return;

  // Retrieve saved preference or fallback to auto
  const savedTheme = localStorage.getItem('bisle_theme') || 'auto';
  setTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme') || 'auto';
    let nextTheme = 'light';

    if (currentTheme === 'auto') {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      nextTheme = isSystemDark ? 'light' : 'dark';
    } else if (currentTheme === 'light') {
      nextTheme = 'dark';
    } else {
      nextTheme = 'light';
    }

    setTheme(nextTheme);
  });

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('bisle_theme', theme);
  }

  // Listen to OS theme changes if user hasn't explicitly locked light/dark
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('bisle_theme') === 'auto') {
      root.setAttribute('data-theme', 'auto');
    }
  });
}

/* ==========================================================================
   2. Mobile Navigation Drawer & Hamburger
   ========================================================================== */
function initMobileNav() {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = mainNav ? mainNav.querySelectorAll('.nav-link') : [];

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    toggleMenu(!isExpanded);
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('is-open')) {
        toggleMenu(false);
      }
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
      toggleMenu(false);
      menuToggle.focus();
    }
  });

  function toggleMenu(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    if (open) {
      mainNav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    } else {
      mainNav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }
}

/* ==========================================================================
   3. Scroll Spy for Active Navigation Link
   ========================================================================== */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   4. Travel Tips Interactive Checklist (Persistent in LocalStorage)
   ========================================================================== */
function initChecklist() {
  const checklistContainer = document.getElementById('checklist-list');
  const counterEl = document.getElementById('checklist-counter');
  if (!checklistContainer || !counterEl) return;

  const checkboxes = checklistContainer.querySelectorAll('input[type="checkbox"]');
  const storageKey = 'bisle_checklist_v1';

  // Load saved state
  let savedState = {};
  try {
    savedState = JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch (e) {
    savedState = {};
  }

  checkboxes.forEach(cb => {
    const tipId = cb.getAttribute('data-tip-id');
    if (tipId && savedState[tipId]) {
      cb.checked = true;
    }

    cb.addEventListener('change', () => {
      savedState[tipId] = cb.checked;
      try {
        localStorage.setItem(storageKey, JSON.stringify(savedState));
      } catch (e) {
        // storage disabled or quota exceeded
      }
      updateCounter();
    });
  });

  function updateCounter() {
    let checkedCount = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) checkedCount++;
    });
    counterEl.textContent = `${checkedCount} of ${checkboxes.length} packed`;
  }

  updateCounter();
}

/* ==========================================================================
   5. Native Accessible Dialog Lightbox for Gallery
   ========================================================================== */
function initGalleryLightbox() {
  const dialog = document.getElementById('lightbox-dialog');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');
  const thumbBtns = document.querySelectorAll('.gallery-thumb-btn');

  if (!dialog || !lightboxImg || !thumbBtns.length) return;

  // Gallery items metadata
  const galleryItems = [
    {
      src: 'images/hero.webp',
      alt: 'Bisle Ghat mountain vista with mist rising above deep shola valleys and mountain ridges',
      caption: 'The Three Ranges Vista — Bisle Ghat Viewpoint'
    },
    {
      src: 'images/viewpoint-deck.webp',
      alt: 'Wooden railed observation platform and viewing shelter at Bisle Beauty Spot over the cliff abyss',
      caption: 'The Observation Pavilion — Bisle Betta (Beauty Spot)'
    },
    {
      src: 'images/shola-road.webp',
      alt: 'Winding asphalt mountain road flanked by towering ancient moss-covered trees and ferns',
      caption: 'Shola Forest Highway — State Highway 85'
    },
    {
      src: 'images/hornbill.webp',
      alt: 'Great Indian Hornbill perched on a mossy branch in the Western Ghats rainforest canopy',
      caption: 'Great Indian Hornbill — Bisle Reserve Forest Fauna'
    },
    {
      src: 'images/waterfall.webp',
      alt: 'Cascading forest stream waterfall flowing over black moss-covered rocks and wild ferns',
      caption: 'Mountain Stream Cascade — Monsoon Waterfall'
    },
    {
      src: 'images/kumara-parvatha.webp',
      alt: 'Towering granite summit of Kumara Parvatha with ridge hiking trails under dramatic clouds',
      caption: 'Kumara Parvatha Peak — Pushpagiri Wildlife Sanctuary'
    },
    {
      src: 'images/shola-grasslands.webp',
      alt: 'Rolling emerald montane shola grasslands and stunted evergreen forest valleys in Bisle Ghat',
      caption: 'Montane Grasslands — Shola-Grassland Mosaic'
    },
    {
      src: 'images/green-route.webp',
      alt: 'Historic Green Route arched railway viaduct bridge traversing across lush tropical rainforest valley',
      caption: 'Green Route Viaduct — Sakleshpur Railway Heritage'
    },
    {
      src: 'images/yellathur-valley.webp',
      alt: 'Yellathur viewpoint overlooking rolling mountain layers enveloped in a blanket of morning clouds',
      caption: 'Yellathur Sea of Clouds — Subramanya Ghat Descent'
    }
  ];

  let currentIndex = 0;

  thumbBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    dialog.close();
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const item = galleryItems[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxCaption.textContent = item.caption;
    lightboxCounter.textContent = `${currentIndex + 1} of ${galleryItems.length}`;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Close on backdrop click (Light Dismiss)
  dialog.addEventListener('click', (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  dialog.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  dialog.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 45;
    if (touchEndX < touchStartX - threshold) {
      showNext();
    } else if (touchEndX > touchStartX + threshold) {
      showPrev();
    }
  }
}

/* ==========================================================================
   6. Smooth Scroll Fix for Safari & Older Browsers
   ========================================================================== */
function initSmoothScrollFix() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        history.pushState(null, '', targetId);
      }
    });
  });
}
