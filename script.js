/* ============================================================
   Nehir İnsel — interactions
   ============================================================ */
(() => {
  'use strict';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- year ---------- */
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();

  /* ---------- theme (dark / light) ---------- */
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  const themeMeta = document.getElementById('themeColor');
  const applyTheme = (t) => {
    root.setAttribute('data-theme', t);
    if (themeMeta) themeMeta.setAttribute('content', t === 'light' ? '#faf9f7' : '#0a0a0c');
    if (themeBtn) themeBtn.setAttribute('aria-label',
      t === 'light' ? 'Koyu temaya geç' : 'Açık temaya geç');
    try { localStorage.setItem('theme', t); } catch (e) {}
  };
  // the inline head script already set the attribute; sync labels/meta with it
  applyTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  if (themeBtn) themeBtn.addEventListener('click', () =>
    applyTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light'));

  /* ---------- language switch ---------- */
  const langNodes = document.querySelectorAll('[data-tr]');
  const setLang = (lang) => {
    document.documentElement.lang = lang;
    langNodes.forEach(el => {
      const v = el.getAttribute('data-' + lang);
      if (v == null) return;
      if (el.hasAttribute('data-html')) el.innerHTML = v;
      else el.textContent = v;
    });
    document.querySelectorAll('.lang-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.lang === lang));
    try { localStorage.setItem('lang', lang); } catch (e) {}
  };
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.addEventListener('click', () => setLang(b.dataset.lang)));
  let saved = 'tr';
  try { saved = localStorage.getItem('lang') || 'tr'; } catch (e) {}
  if (saved !== 'tr') setLang(saved);

  /* ---------- scroll progress + navbar ---------- */
  const nav = document.getElementById('nav');
  const progress = document.getElementById('scrollProgress');
  const onScroll = () => {
    const st = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('scrolled', st > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  const reveals = document.querySelectorAll('.reveal, .hero-title');
  if (prefersReduced) {
    reveals.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -14% 0px' });
    const groups = new Map();
    reveals.forEach(el => {
      const p = el.parentElement;
      if (!groups.has(p)) groups.set(p, 0);
      const i = groups.get(p);
      el.style.transitionDelay = (i * 90) + 'ms';
      groups.set(p, i + 1);
      io.observe(el);
    });
  }

  /* ---------- animated counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const fmt = (el, val) => {
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    if (decimals > 0) return val.toFixed(decimals) + suffix;
    return (val >= 1000 ? val.toLocaleString('tr-TR') : String(Math.floor(val))) + suffix;
  };
  const runCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const dur = 1600, start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(el, eased * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(el, target);
    };
    requestAnimationFrame(tick);
  };
  if (prefersReduced) {
    counters.forEach(el => el.textContent = fmt(el, parseFloat(el.dataset.count)));
  } else {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(el => cio.observe(el));
  }

  /* ---------- mobile menu ---------- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    const close = () => { toggle.classList.remove('open'); links.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open'); links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  }

  /* ---------- active nav link ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, { threshold: 0.4, rootMargin: '-20% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  /* ---------- magnetic buttons (subtle) ---------- */
  if (window.matchMedia('(hover:hover)').matches && !prefersReduced) {
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${mx * 0.1}px, ${my * 0.18}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- scroll-driven horizontal gallery ---------- */
  const mioScroll = document.getElementById('mioScroll');
  const track = document.getElementById('carTrack');
  if (mioScroll && track) {
    const stage = track.parentElement;
    const curEl = document.getElementById('carCur');
    const totEl = document.getElementById('carTot');
    const progEl = document.getElementById('carProgress');
    const total = track.children.length;
    if (totEl) totEl.textContent = total;
    const isDesktop = () => window.matchMedia('(min-width:901px)').matches && !prefersReduced;
    let travel = 0;
    const measure = () => {
      if (!isDesktop()) { mioScroll.style.height = ''; track.style.transform = ''; travel = 0; return; }
      travel = Math.max(0, track.scrollWidth - stage.clientWidth);
      mioScroll.style.height = (window.innerHeight + travel * 1.25) + 'px';
    };
    const update = () => {
      if (!isDesktop()) { if (progEl) progEl.style.width = ''; return; }
      const denom = mioScroll.offsetHeight - window.innerHeight;
      if (denom <= 0) return;
      const p = Math.min(Math.max(-mioScroll.getBoundingClientRect().top / denom, 0), 1);
      track.style.transform = `translateX(${-(p * travel).toFixed(2)}px)`;
      if (curEl) curEl.textContent = Math.min(total, Math.floor(p * total) + 1);
      if (progEl) progEl.style.width = (6 + p * 94) + '%';
    };
    const init = () => { measure(); update(); };
    window.addEventListener('resize', init, { passive: true });
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('load', init);
    init();
  }
})();
