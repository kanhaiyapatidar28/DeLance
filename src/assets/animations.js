/* ── DeLance Animations v2 — Light Mode ────────────────────────────────────── */
(function() {
  'use strict';

  // ── Scroll Reveal (Intersection Observer) ────────────────────────────────── //
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => observer.observe(el));
  }

  // ── Animated Counters ─────────────────────────────────────────────────────── //
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target) || 0;
    const prefix = el.dataset.prefix || '';
    const decimal = parseFloat(el.dataset.decimal) || 1;
    const duration = 1800;
    const start = performance.now();

    function formatNum(n) {
      if (decimal < 1) {
        return (n / (1 / decimal)).toFixed(1);
      }
      if (target >= 1000000) {
        return '$' + (n / 1000000).toFixed(1) + 'M';
      }
      if (target >= 10000) {
        return prefix + n.toLocaleString('en-US');
      }
      return prefix + Math.floor(n).toLocaleString('en-US');
    }

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = ease * target;
      el.textContent = formatNum(current);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    const counterEls = document.querySelectorAll('[data-counter]');
    if (!counterEls.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    counterEls.forEach((el) => observer.observe(el));
  }

  // ── Navbar Scrolled State ─────────────────────────────────────────────────── //
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    function onScroll() { navbar.classList.toggle('scrolled', window.scrollY > 20); }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Testimonial Dots ──────────────────────────────────────────────────────── //
  function initTestimonialDots() {
    const dots = document.querySelectorAll('.testi-dot');
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });
  }

  // ── Escrow Progress Bar Micro-animation ───────────────────────────────────── //
  function initEscrowAnim() {
    const fills = document.querySelectorAll('.progress-fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetW = el.style.width;
          el.style.width = '0';
          requestAnimationFrame(() => {
            setTimeout(() => { el.style.width = targetW; }, 80);
          });
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    fills.forEach(f => { f._targetWidth = f.style.width; observer.observe(f); });
  }

  // ── Earnings Chart hover ───────────────────────────────────────────────────── //
  function initEarningsChart() {
    const groups = document.querySelectorAll('.earnings-bar-group');
    groups.forEach(g => {
      g.addEventListener('mouseenter', () => { g.style.opacity = '0.8'; });
      g.addEventListener('mouseleave', () => { g.style.opacity = '1'; });
    });
  }

  // ── Card hover-lift (extra) ───────────────────────────────────────────────── //
  function initCardInteractions() {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'box-shadow 0.22s ease, transform 0.22s ease';
      });
    });
  }

  // ── Smooth anchor scroll ─────────────────────────────────────────────────── //
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });
  }

  // ── Init ─────────────────────────────────────────────────────────────────── //
  function init() {
    initScrollReveal();
    initCounters();
    initNavbar();
    initTestimonialDots();
    initEscrowAnim();
    initEarningsChart();
    initCardInteractions();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
