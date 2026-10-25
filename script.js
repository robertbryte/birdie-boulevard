/* Birdie Boulevard — site behavior (no dependencies) */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header state, scroll progress, sticky CTA ---------- */
  const header = $('.site-header');
  const bar = $('.scroll-progress span');
  const sticky = $('.sticky-cta');
  const hero = $('.hero');
  const quote = $('#quote');
  let quoteVisible = false;

  if (quote && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { quoteVisible = e.isIntersecting; onScroll(); }, { threshold: 0.1 }).observe(quote);
  }

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('scrolled', y > 24);
    if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    if (sticky) {
      const pastHero = y > (hero ? hero.offsetHeight * 0.75 : 500);
      sticky.classList.toggle('show', pastHero && !quoteVisible);
    }
  }
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(() => { onScroll(); ticking = false; }); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- mobile menu ---------- */
  const toggle = $('.menu-toggle');
  const menu = $('#mobile-menu');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    header.classList.toggle('menu-open', open);
  };
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); } });
  matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* ---------- scroll reveal ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* ---------- media: only use video files that actually exist ---------- */
  // Static hosts may answer missing files with index.html, so check the content type.
  const videoExists = async (src) => {
    try {
      const r = await fetch(src, { method: 'HEAD', cache: 'no-store' });
      return r.ok && (r.headers.get('content-type') || '').startsWith('video/');
    } catch { return false; }
  };

  const heroVideo = $('.hero-video');
  if (heroVideo && !reduceMotion) {
    videoExists(heroVideo.dataset.src).then((ok) => {
      if (!ok) return; // poster stays in place
      heroVideo.src = heroVideo.dataset.src;
      heroVideo.play().catch(() => {});
    });
  }

  const promo = $('.promo-video');
  const playBtn = $('.play-btn');
  if (promo && playBtn) {
    videoExists(promo.dataset.src).then((ok) => {
      if (!ok) return; // no file yet: keep poster, keep controls hidden
      promo.src = promo.dataset.src;
      playBtn.hidden = false;
      const fig = promo.closest('.phone-video');
      playBtn.addEventListener('click', () => { promo.controls = true; promo.play(); });
      promo.addEventListener('play', () => fig.classList.add('playing'));
      promo.addEventListener('pause', () => fig.classList.remove('playing'));
      promo.addEventListener('error', () => { playBtn.hidden = true; promo.controls = false; });
    });
  }

  /* ---------- package buttons preselect the quote form ---------- */
  const pkgSelect = $('#package-select');
  $$('[data-package]').forEach((btn) => btn.addEventListener('click', () => {
    if (pkgSelect) pkgSelect.value = btn.dataset.package;
  }));

  /* ---------- quote form ---------- */
  const form = $('#quote-form');
  if (form) {
    const status = $('.form-status', form);
    const submitBtn = $('button[type="submit"]', form);
    const setStatus = (msg, cls = '') => { status.textContent = msg; status.className = `form-status ${cls}`.trim(); };

    form.addEventListener('input', (e) => e.target.classList.remove('invalid'));
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const invalid = $$('[required]', form).filter((f) => !f.checkValidity());
      $$('.invalid', form).forEach((f) => f.classList.remove('invalid'));
      if (invalid.length) {
        invalid.forEach((f) => f.classList.add('invalid'));
        invalid[0].focus();
        setStatus('Please fill in the highlighted fields.', 'error');
        return;
      }

      const endpoint = (form.dataset.endpoint || '').trim();
      if (!endpoint) {
        // Preview mode: no destination configured yet — do not pretend it was sent.
        setStatus('Online quote requests aren’t connected yet, so this form didn’t send anything. Please check back soon.', 'notice');
        return;
      }

      submitBtn.disabled = true;
      setStatus('Sending…');
      try {
        const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus('Thanks! Your request is in — we’ll be in touch soon.', 'notice');
      } catch {
        setStatus('Something went wrong sending your request. Please try again.', 'error');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
})();
