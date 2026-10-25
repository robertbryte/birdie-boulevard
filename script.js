(() => {
  const header = document.getElementById('site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  const progress = document.getElementById('scroll-progress');
  const mobileCta = document.querySelector('.mobile-cta');

  const closeMenu = () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = 'Open menu';
  };

  menuButton.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu';
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('scrolled', y > 20);
    mobileCta.classList.toggle('visible', y > 520 && y < max - 280);
    progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  document.querySelectorAll('[data-package]').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('package-select').value = link.dataset.package;
    });
  });

  const form = document.getElementById('quote-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const required = [...form.querySelectorAll('[required]')];
    const invalid = required.find(field => !field.value.trim() || !field.checkValidity());
    if (invalid) {
      status.textContent = 'Please complete a valid name and email to preview the request.';
      invalid.focus();
      return;
    }
    status.textContent = 'Preview only: nothing was sent. Connect an approved form destination before launch.';
  });
})();
