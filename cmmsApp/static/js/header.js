(function () {
  function initHeader() {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const links = document.querySelectorAll('[data-scroll-to]');

    if (!navMenu || !navToggle) return;

    function headerOffset() {
      return header ? header.offsetHeight : 0;
    }

    function closeMenu() {
      navMenu.classList.remove('show-menu');
      navToggle.classList.remove('show-icon');
      nav?.classList.remove('show-icon');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    }

    function openMenu() {
      navMenu.classList.add('show-menu');
      navToggle.classList.add('show-icon');
      nav?.classList.add('show-icon');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
    }

    function smoothScrollTo(selector) {
      const target = selector ? document.querySelector(selector) : null;
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    function setActiveOnScroll() {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((section) => {
        const top = section.offsetTop - headerOffset() - 24;
        if (window.pageYOffset >= top) current = section.id;
      });
      document.querySelectorAll('.nav__link').forEach((link) => {
        link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
      });
    }

    navToggle.addEventListener('click', () => {
      navMenu.classList.contains('show-menu') ? closeMenu() : openMenu();
    });

    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        const selector = link.getAttribute('href');
        if (!selector || !selector.startsWith('#')) return;
        event.preventDefault();
        smoothScrollTo(selector);
        closeMenu();
      });
    });

    document.addEventListener('click', (event) => {
      if (nav && !nav.contains(event.target) && navMenu.classList.contains('show-menu')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('scroll', setActiveOnScroll, { passive: true });
    setActiveOnScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();
