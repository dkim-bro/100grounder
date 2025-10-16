# Repository Guidelines

## Project Structure & Module Organization
- `index.html` contains the full landing page markup, grouped into hero, services, and testimonials sections. Treat each section as a reusable block when adding new content.
- `styles.css` holds all styling; utility variables are defined at the top under `:root`. Keep new components grouped and alphabetize selectors within their section when practical.
- `script.js` manages navigation toggles, scroll animations, and nebula parallax effects. Add additional interactions as standalone functions near the bottom. Assets live in the `images/` directory; keep filenames lowercase with hyphens.

## Build, Test, and Development Commands
- `npx serve .` or any static server (e.g., `python3 -m http.server`) previews the site locally; use `http://localhost:3000` (serve) or `:8000` (Python) to verify animation timing.
- `npx prettier --write index.html script.js styles.css` formats sources before committing.

## Coding Style & Naming Conventions
- Follow two-space indentation for HTML/JS and align CSS declarations on new lines. Favor descriptive class names with hyphen-case (e.g., `feature-grid`).
- JavaScript prefers modern syntax: `const`/`let`, arrow functions, and `dataset` for data hooks. Keep DOM queries scoped and use early returns for guard clauses.
- CSS custom properties already define palette and spacing; extend them rather than hard-coding new values. Place media queries beside the component they adjust.

## Testing Guidelines
- Run a manual regression pass in the latest Chrome and Safari by loading the served site and checking navigation, scroll-triggered animations, and responsive breakpoints (360px, 768px, 1280px).
- Lint accessibility with the browser’s Lighthouse panel; note any contrast or aria warnings in the PR description.

## Commit & Pull Request Guidelines
- The repository currently has no recorded Git history; adopt Conventional Commit messages (`feat:`, `fix:`, `chore:`) for clarity.
- For pull requests, describe the visual/behavioral change, list validation steps (e.g., browsers tested, Lighthouse results), and add screenshots or screen recordings when UI is affected.

## Optional Enhancements
- When adding libraries, capture CDN versions in a `docs/dependencies.md` note for future audits.
- Security-sensitive changes (e.g., new forms) should document required headers or rate limits in the PR so deployment scripts can be updated.
