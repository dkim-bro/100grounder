/**
 * 모바일 성능 최적화 JavaScript
 * 모바일 디바이스에서 무거운 기능들을 비활성화하거나 최적화
 */

// 모바일 디바이스 감지
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4; // CPU 코어 4개 이하

// 모바일 최적화 적용
function applyMobileOptimizations() {
  if (!isMobileDevice) return; // 데스크톱에서는 실행하지 않음

  console.log('Applying mobile optimizations...');

  // 1. GIF 애니메이션 최적화 - 모바일에서는 정적 이미지로 대체 (가장 중요!)
  const gifs = document.querySelectorAll('img[src*=".gif"]');
  gifs.forEach(gif => {
    // logo_animation GIF를 정적 이미지로 교체
    if (gif.src.includes('logo_animation')) {
      gif.src = 'images/logo1.png';
      gif.removeAttribute('srcset'); // srcset도 제거
    }
  });

  // 2. 이미지 지연 로딩 강화
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    // 첫 화면에 보이지 않는 이미지들만 lazy loading
    const rect = img.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight;

    if (!isInViewport) {
      img.loading = 'lazy';
    }
  });

  // 3. 애니메이션 일시정지 (화면 밖에 있을 때)
  if ('IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll('.ticker__list, .logos-marquee__track');

    const pauseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
          } else {
            entry.target.style.animationPlayState = 'paused';
          }
        });
      },
      { threshold: 0, rootMargin: '100px' }
    );

    animatedElements.forEach(element => {
      pauseObserver.observe(element);
    });
  }

  // 4. 메모리 최적화 - 저사양 기기에서 무거운 요소 제거
  if (isLowEndDevice) {
    // 복잡한 배경 요소들 제거
    const heavyElements = document.querySelectorAll('.hero__grid, .grid-noise');
    heavyElements.forEach(el => {
      if (el) el.remove();
    });

    // Nebula는 완전히 숨김 (CSS에서도 처리하지만 확실하게)
    const nebula = document.querySelector('.nebula');
    if (nebula) nebula.style.display = 'none';
  }

  // 5. 폰트 렌더링 최적화
  document.body.style.textRendering = 'optimizeSpeed';
  document.body.style.webkitFontSmoothing = 'antialiased';

  // 6. 불필요한 리소스 힌트 제거
  const preloadLinks = document.querySelectorAll('link[rel="preload"]');
  preloadLinks.forEach(link => {
    if (link.href.includes('.gif')) {
      link.remove(); // GIF preload 제거
    }
  });

  console.log('Mobile optimizations applied successfully');
}

// 페이지 로드 시 최적화 적용
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyMobileOptimizations);
} else {
  applyMobileOptimizations();
}

// 성능 모니터링 (개발용)
if (window.performance && window.performance.measure) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page Load Metrics:', {
      'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
      'TCP Connection': perfData.connectEnd - perfData.connectStart,
      'Request Time': perfData.responseStart - perfData.requestStart,
      'Response Time': perfData.responseEnd - perfData.responseStart,
      'DOM Processing': perfData.domComplete - perfData.domLoading,
      'Total Load Time': perfData.loadEventEnd - perfData.navigationStart
    });
  });
}