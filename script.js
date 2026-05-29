/* ============================================================
   script.js — Tarandeep Singh | Motion Graphics & VFX Artist
   ============================================================ */

'use strict';

/* ── Navbar: shrink on scroll + active link ──────────────── */
(function () {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  // Scrolled class
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link based on current page
  const links = nav.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── Scroll Reveal ────────────────────────────────────────── */
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger delay
        entry.target.style.transitionDelay = (i % 4) * 0.08 + 's';
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => io.observe(el));
})();

/* ── Skill Progress Bars ──────────────────────────────────── */
(function () {
  const bars = document.querySelectorAll('.skill-progress-fill');
  if (!bars.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.width = el.getAttribute('data-width') + '%';
        io.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => io.observe(bar));
})();

/* ── Counter Animation ────────────────────────────────────── */
(function () {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const animateCount = (el, target) => {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current + (el.dataset.suffix || '');
    }, 25);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target, parseInt(entry.target.dataset.target));
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
})();

/* ── Contact Form Submit ──────────────────────────────────── */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    btn.innerHTML = '<i class="fa fa-spinner fa-spin me-2"></i>Sending…';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fa fa-check me-2"></i>Message Sent!';
      btn.style.background = 'var(--cyan)';
      btn.style.color = '#000';
      btn.style.borderColor = 'var(--cyan)';
      form.reset();
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.style = '';
      }, 3000);
    }, 1600);
  });
})();

/* ── Carousel: pause on hover ─────────────────────────────── */
(function () {
  const el = document.getElementById('heroCarousel');
  if (!el) return;
  el.addEventListener('mouseenter', () => {
    if (window.bootstrap) bootstrap.Carousel.getInstance(el)?.pause();
  });
  el.addEventListener('mouseleave', () => {
    if (window.bootstrap) bootstrap.Carousel.getInstance(el)?.cycle();
  });
})();

/* ── Portfolio tab active state ───────────────────────────── */
(function () {
  const tabs = document.querySelectorAll('#portfolioTabs .nav-link');
  tabs.forEach(tab => {
    tab.addEventListener('shown.bs.tab', () => {
      // re-trigger reveal for new tab content
      document.querySelectorAll('.tab-pane.show .reveal').forEach(el => {
        el.classList.add('visible');
      });
    });
  });
})();

/* ── Smooth scroll for anchor links ───────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
