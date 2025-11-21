const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('site-nav');
const overlay = document.getElementById('overlay');

function openNav() {
  hamburger.classList.add('open');
  nav.classList.add('open');
  overlay.classList.add('visible');
  overlay.hidden = false;
  hamburger.setAttribute('aria-expanded', 'true');
  nav.setAttribute('aria-hidden', 'false');
}

function closeNav() {
  hamburger.classList.remove('open');
  nav.classList.remove('open');
  
  overlay.classList.remove('visible');
  overlay.hidden = true;
  hamburger.setAttribute('aria-expanded', 'false');
  nav.setAttribute('aria-hidden', 'true');
}

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  expanded ? closeNav() : openNav();
});

overlay.addEventListener('click', closeNav);

// Close nav when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeNav);
});

// Close nav on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    closeNav();
  }
});





(() => {
  const selectors = [
    '.reveal',
    '[data-animate]',
    '.hidden',
    '.home',
    '.landing-logo',
    '.landing-text',
    '.tab1',
    '.tab2',
    '.tab3',
    '.tab4',
    '.about',
    '.services',
  '.achievements',
  '#achievements',
    '.our-team',
    '.testimonials',
    '.updates',
    'h1'
  ];
  const elems = selectors
    .map(s => Array.from(document.querySelectorAll(s)))
    .flat();

  // Unique elements only
  const hiddenElements = Array.from(new Set(elems));
  if (hiddenElements.length === 0) return;

  // Ensure baseline class exists so CSS can target initial state
  hiddenElements.forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      const el = entry.target;
      // If element has attribute data-animate-once or class animate-once, treat it as one-shot
      const once = el.hasAttribute('data-animate-once') || el.classList.contains('animate-once');

      if (entry.isIntersecting) {
        el.classList.add('show');
        if (once) {
          // stop observing once shown for one-shot animations
          obs.unobserve(el);
        }
      } else {
        // remove the show class when it leaves viewport so animation can replay on re-entry
        if (!once) el.classList.remove('show');
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -8% 0px'
  });
+
  hiddenElements.forEach(el => observer.observe(el));
})();

