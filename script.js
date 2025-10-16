const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const nebula = document.querySelector('.nebula');
const header = document.querySelector('.site-header');
const hero = document.querySelector('.hero');
const heroOrb = document.querySelector('.hero__orb');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', (!expanded).toString());
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.addEventListener('click', (event) => {
  if (!siteNav || !navToggle) return;
  if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

if (nebula) {
  document.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    nebula.style.setProperty('--mouse-x', `${x}%`);
    nebula.style.setProperty('--mouse-y', `${y}%`);

    if (hero) {
      hero.style.setProperty('--cursor-x', `${x}%`);
      hero.style.setProperty('--cursor-y', `${y}%`);
    }
  });
}

if (heroOrb) {
  document.addEventListener('pointermove', (event) => {
    const rect = heroOrb.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((event.clientY - centerY) / rect.height) * -12;
    const rotateY = ((event.clientX - centerX) / rect.width) * 12;
    heroOrb.style.setProperty('--rotate-x', `${rotateX}deg`);
    heroOrb.style.setProperty('--rotate-y', `${rotateY}deg`);
  });

  heroOrb.addEventListener('mouseleave', () => {
    heroOrb.style.setProperty('--rotate-x', '0deg');
    heroOrb.style.setProperty('--rotate-y', '0deg');
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

const revealTargets = document.querySelectorAll(
  '.hero__content, .intel-card, .timeline__item, .strip__content, .strip__visual, .showcase-card, .contact-form, .logos-marquee'
);

revealTargets.forEach((element) => {
  element.classList.add('will-animate');
  observer.observe(element);
});

window.addEventListener('scroll', () => {
  if (!header) return;
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
