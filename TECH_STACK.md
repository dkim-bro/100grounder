# 100grounder Codex 기술 스택 개요

## 전반 구조
- 정적 싱글 페이지 앱(SPA가 아닌 정적 페이지)으로 `index.html`, `styles.css`, `script.js` 세 파일을 중심으로 구성됩니다.
- 모든 마크업은 시맨틱 HTML5 요소(`<header>`, `<main>`, `<section>`, `<footer>` 등)를 활용하여 접근성과 유지보수성을 확보했습니다.

## 마크업 레이어 (HTML)
- 랜딩 섹션 구조: 히어로 → About → Capabilities → Full Funnel → Showcase → CTA 순으로 설계되어 자연스러운 퍼널 스토리텔링을 구현합니다.
- 네비게이션은 앵커 기반 스크롤 이동을 사용하며, 모바일 환경을 고려해 햄버거 토글 버튼을 제공합니다.

## 스타일링 레이어 (CSS)
- CSS Custom Properties로 컬러 팔레트, 그림자, 레이아웃 폭 등을 관리하여 테마 조정 시 일관성을 유지합니다.
- 글래스모피즘, 네온 그라디언트, 블러 효과 등을 조합한 하이테크 비주얼을 구현했습니다.
- `grid`, `flex`, `clamp()` 등 최신 레이아웃 기능을 이용해 반응형(모바일~데스크톱) 디자인을 구성했습니다.
- `@keyframes` 애니메이션과 `will-change` 최적화로 플로팅 오브젝트, 티커, 스크롤 리빌과 같은 동적 효과를 제공합니다.

## 인터랙션 레이어 (JavaScript)
- ES2015+ 문법(`const/let`, 화살표 함수, `dataset`)을 사용하며 별도 빌드 없이 브라우저에서 실행되는 순수 자바스크립트입니다.
- 주요 기능: 모바일 내비게이션 토글, IntersectionObserver 기반 스크롤 리빌, 마우스 위치에 반응하는 네뷸라/히어로 플레어, 히어로 구체(orb) 틸트 효과.
- 이벤트 리스너는 `pointermove`, `click`, `scroll` 등으로 구성되어 크로스 디바이스 포인터 입력을 지원합니다.

## 에셋 및 폰트
- 모든 비주얼 리소스는 `images/` 디렉터리에 위치하며 PNG/GIF 형식으로 관리됩니다.
- 시스템 기본 산세리프와 `Pretendard`, `Montserrat`, `Noto Sans KR` 폰트 스택을 선언하여 한글/영문 혼합 환경에서 안정적인 타이포그래피를 보장합니다.

## 개발 및 배포 워크플로우
- 로컬 프리뷰: `npx serve .` 또는 `python3 -m http.server`로 정적 서버를 열어 확인합니다.
- 코드 포맷팅: `npx prettier --write index.html script.js styles.css` 명령으로 일관된 스타일을 유지합니다.
- 별도의 빌드 또는 번들링 파이프라인이 필요하지 않아 GitHub Pages, Vercel, Netlify 등 정적 호스팅 서비스에 즉시 배포할 수 있습니다.

## 브라우저 호환성
- 최신 Chrome/Safari 기준으로 최적화되어 있으며, CSS 변수 및 IntersectionObserver를 지원하지 않는 구형 브라우저에서는 일부 효과가 제한될 수 있습니다.
- 접근성 점검은 Lighthouse 혹은 WAVE와 같은 툴을 통해 수행할 수 있도록 설계되어 있습니다.
