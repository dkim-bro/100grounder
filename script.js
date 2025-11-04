const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const nebula = document.querySelector('.nebula');
const header = document.querySelector('.site-header');
const hero = document.querySelector('.hero');
const heroOrb = document.querySelector('.hero__orb');

// 모바일 디바이스 감지
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

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

// 마우스 이동 효과 - 데스크톱에서만 활성화
if (nebula && !isMobile) {
  // Throttle 함수
  let rafId = null;
  const handleMouseMove = (event) => {
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      nebula.style.setProperty('--mouse-x', `${x}%`);
      nebula.style.setProperty('--mouse-y', `${y}%`);

      if (hero) {
        hero.style.setProperty('--cursor-x', `${x}%`);
        hero.style.setProperty('--cursor-y', `${y}%`);
      }

      rafId = null;
    });
  };

  document.addEventListener('pointermove', handleMouseMove, { passive: true });
}

// 오브 회전 효과 - 데스크톱에서만 활성화
if (heroOrb && !isMobile) {
  let rafId = null;
  const handleOrbMove = (event) => {
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      const rect = heroOrb.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = ((event.clientY - centerY) / rect.height) * -12;
      const rotateY = ((event.clientX - centerX) / rect.width) * 12;
      heroOrb.style.setProperty('--rotate-x', `${rotateX}deg`);
      heroOrb.style.setProperty('--rotate-y', `${rotateY}deg`);

      rafId = null;
    });
  };

  document.addEventListener('pointermove', handleOrbMove, { passive: true });

  heroOrb.addEventListener('mouseleave', () => {
    heroOrb.style.setProperty('--rotate-x', '0deg');
    heroOrb.style.setProperty('--rotate-y', '0deg');
  });
}

// IntersectionObserver 최적화
const observerOptions = isMobile
  ? { threshold: 0.05, rootMargin: '50px' }  // 모바일: 빠른 트리거
  : { threshold: 0.2 };  // 데스크톱: 기존 설정

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  observerOptions
);

const revealTargets = document.querySelectorAll(
  '.hero__content, .intel-card, .timeline__item, .strip__content, .strip__visual, .showcase-card, .contact-form, .logos-marquee'
);

revealTargets.forEach((element) => {
  element.classList.add('will-animate');
  observer.observe(element);
});

// 스크롤 이벤트 최적화
if (header) {
  let ticking = false;
  let lastScrollY = window.scrollY;

  const updateHeader = () => {
    const scrollY = window.scrollY;

    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}
