// JavaScript

// ========================================
// MOBILE MENU TOGGLE - IMPROVED
// ========================================
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  if (navLinks.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}

// ========================================
// DROPDOWN TOGGLE FOR MOBILE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const dropdownParents = document.querySelectorAll('.nav-links > li > a');
  
  dropdownParents.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only on mobile
      if (window.innerWidth <= 768) {
        const parent = this.parentElement;
        const hasDropdown = parent.querySelector('.dropdown');
        
        if (hasDropdown) {
          e.preventDefault();
          parent.classList.toggle('show-dropdown');
        }
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    const navLinks = document.getElementById('navLinks');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !menuBtn.contains(e.target)) {
      navLinks.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});

// ========================================
// BANNER SLIDER WITH AUTO & MANUAL CONTROLS
// ========================================

let currentSlide = 0;
let autoSlideTimer;

// Function: Kisi bhi slide par jaane ke liye
function goToSlide(slideIndex) {
  const slides = document.querySelectorAll('.slide');
  const slidesContainer = document.getElementById('slidesContainer');
  
  if (!slides.length) return;
  
  currentSlide = slideIndex;
  
  // Slide ko move karo
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Slides ka active class update karo
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index === currentSlide) {
      slide.classList.add('active');
    }
  });
  
  // Dots ka active class update karo
  const dots = document.querySelectorAll('.slider-dots .dot');
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === currentSlide) {
      dot.classList.add('active');
    }
  });
}

// Function: Auto slide (automatically next slide)
function autoSlide() {
  const slides = document.querySelectorAll('.slide');
  
  if (!slides.length) return;
  
  let nextSlide = currentSlide + 1;
  
  // Agar last slide hai to first slide par jao
  if (nextSlide >= slides.length) {
    nextSlide = 0;
  }
  
  goToSlide(nextSlide);
}

// Function: Change slide (for manual controls)
function changeSlide(direction) {
  const slides = document.querySelectorAll('.slide');
  
  if (!slides.length) return;
  
  let newSlide = currentSlide + direction;
  
  // Wrap around logic
  if (newSlide >= slides.length) {
    newSlide = 0;
  } else if (newSlide < 0) {
    newSlide = slides.length - 1;
  }
  
  goToSlide(newSlide);
  
  // Auto slide timer reset karo
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

// Function: Auto sliding start karo
function startAutoSlide() {
  autoSlideTimer = setInterval(autoSlide, 5000); // 5 seconds
}

// Function: Create dots dynamically
function createDots() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('dotsContainer');
  
  if (!dotsContainer) return;
  
  // Clear existing dots
  dotsContainer.innerHTML = '';
  
  // Create a dot for each slide
  slides.forEach((slide, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) {
      dot.classList.add('active');
    }
    
    // Dot click event
    dot.addEventListener('click', () => {
      goToSlide(index);
      clearInterval(autoSlideTimer);
      startAutoSlide();
    });
    
    dotsContainer.appendChild(dot);
  });
}

// Initialize slider when page loads
window.addEventListener('load', () => {
  
  // Create dots
  createDots();
  
  // Start auto sliding
  startAutoSlide();
  
  // Hover par pause (optional)
  const banner = document.querySelector('.banner-slider');
  if (banner) {
    banner.addEventListener('mouseenter', () => {
      clearInterval(autoSlideTimer);
    });
    
    banner.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
  }
});

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const navLinks = document.getElementById('navLinks');
      
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
      
      // Smooth scroll
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});