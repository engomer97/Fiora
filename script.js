/* =========================================
   FIORA LUXURY — script.js
   All interactions & animations
   ========================================= */

'use strict';

// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 700);
  }, 1200);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

// ===== HERO SLIDER =====
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots   = document.querySelectorAll('#heroDots .dot');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
  heroSlides[currentSlide].classList.remove('active');
  heroDots[currentSlide].classList.remove('active');
  currentSlide = (index + heroSlides.length) % heroSlides.length;
  heroSlides[currentSlide].classList.add('active');
  heroDots[currentSlide].classList.add('active');
}

function startSlider() {
  slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5500);
}

heroDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(slideInterval);
    goToSlide(i);
    startSlider();
  });
});

startSlider();

// ===== PRODUCT FILTER TABS =====
const filterBtns    = document.querySelectorAll('.filter-btn');
const productCards  = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Add fadeInUp keyframe dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);

// ===== CART SYSTEM =====
let cart = [];

const cartSidebar  = document.getElementById('cartSidebar');
const cartOverlay  = document.getElementById('cartOverlay');
const cartClose    = document.getElementById('cartClose');
const cartItemsEl  = document.getElementById('cartItems');
const cartFooterEl = document.getElementById('cartFooter');
const cartTotalEl  = document.getElementById('cartTotal');
const cartCountEl  = document.querySelector('.cart-count');
const cartBtn      = document.querySelector('.cart-btn');

function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeSidebar);
cartOverlay.addEventListener('click', closeSidebar);

function formatPrice(num) {
  return num.toLocaleString('ar-SA') + ' ر.س';
}

function renderCart() {
  cartItemsEl.innerHTML = '';
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-bag"></i>
        <p>سلتك فارغة</p>
      </div>`;
    cartFooterEl.style.display = 'none';
    return;
  }

  cartFooterEl.style.display = 'flex';
  let total = 0;

  cart.forEach((item, idx) => {
    total += item.price;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div>
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${formatPrice(item.price)}</p>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${idx})" aria-label="حذف">
        <i class="fas fa-times"></i>
      </button>`;
    cartItemsEl.appendChild(div);
  });

  cartTotalEl.textContent = formatPrice(total);
  cartCountEl.textContent = cart.length;
}

function addToCart(btn, name, price) {
  cart.push({ name, price });
  cartCountEl.textContent = cart.length;
  renderCart();

  // Button feedback
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> تمت الإضافة';
  btn.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
  }, 1800);

  showToast(`✦ تمت إضافة "${name}" للسلة`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  cartCountEl.textContent = cart.length || '0';
  renderCart();
  showToast('تم حذف المنتج من السلة');
}

// Make functions globally available
window.addToCart    = addToCart;
window.removeFromCart = removeFromCart;
window.closeSidebar = closeSidebar;

// ===== TOAST =====
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
}

// ===== TESTIMONIALS SLIDER =====
const testiCards = document.querySelectorAll('.testimonial-card');
const testiDots  = document.querySelectorAll('#testiDots .dot');
const testiPrev  = document.getElementById('testiPrev');
const testiNext  = document.getElementById('testiNext');
let currentTesti = 0;
let testiInterval;

function goToTesti(index) {
  testiCards[currentTesti].classList.remove('active');
  testiDots[currentTesti].classList.remove('active');
  currentTesti = (index + testiCards.length) % testiCards.length;
  testiCards[currentTesti].classList.add('active');
  testiDots[currentTesti].classList.add('active');
}

function startTesti() {
  testiInterval = setInterval(() => goToTesti(currentTesti + 1), 5000);
}

testiPrev.addEventListener('click', () => {
  clearInterval(testiInterval);
  goToTesti(currentTesti - 1);
  startTesti();
});
testiNext.addEventListener('click', () => {
  clearInterval(testiInterval);
  goToTesti(currentTesti + 1);
  startTesti();
});
testiDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(testiInterval);
    goToTesti(i);
    startTesti();
  });
});

startTesti();

// ===== BACK TO TOP =====
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== CONTACT FORM =====
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال بنجاح';
  btn.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    e.target.reset();
  }, 3000);
  showToast('✦ شكراً! سيتواصل معك فريقنا قريباً');
}

// ===== NEWSLETTER =====
function handleNewsletter(e) {
  e.preventDefault();
  e.target.reset();
  showToast('✦ تم الاشتراك في النشرة البريدية بنجاح');
}

window.handleFormSubmit = handleFormSubmit;
window.handleNewsletter = handleNewsletter;

// ===== WISHLIST TOGGLE =====
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('far')) {
      icon.classList.replace('far', 'fas');
      btn.style.color = '#e74c3c';
      showToast('✦ تمت الإضافة إلى المفضلة');
    } else {
      icon.classList.replace('fas', 'far');
      btn.style.color = '';
    }
  });
});

// Init all wishlist icons to regular (far)
document.querySelectorAll('.wishlist-btn i').forEach(icon => {
  icon.classList.add('far');
  icon.classList.remove('fas');
});

// ===== LOAD MORE PRODUCTS =====
const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جارٍ التحميل...';
    loadMoreBtn.disabled = true;
    setTimeout(() => {
      loadMoreBtn.innerHTML = 'لا توجد منتجات إضافية';
      loadMoreBtn.disabled = true;
      loadMoreBtn.classList.add('btn-outline');
      loadMoreBtn.style.opacity = '0.5';
    }, 1500);
  });
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  '.cat-card, .product-card, .service-card, .gallery-item, .about-feat, .contact-info-item'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Stagger delays for grids
document.querySelectorAll('.categories-grid .cat-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});
document.querySelectorAll('.products-grid .product-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.06}s`;
});
document.querySelectorAll('.services-grid .service-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections   = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.id;
    }
  });
  navLinkEls.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active-link');
    }
  });
});

// Add active link styling
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `.nav-links a.active-link { color: var(--gold); }`;
document.head.appendChild(activeLinkStyle);

// ===== SMOOTH SCROLLING FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

console.log('🌟 FIORA Luxury Website Loaded');
