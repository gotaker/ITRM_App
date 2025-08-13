# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Planned
- Route protection that redirects unauthenticated users to `/auth/sign-in` for `/overview`, `/risks`, `/heatmap`, `/reports`, `/settings/*`.
- Swap demo auth for real OIDC (Microsoft Entra, Google, GitHub) with token storage in httpOnly cookies.
- Email verification and password reset via signed, expiring links.
- CSRF protection and `SameSite` cookie hardening.
- Heatmap click-through directly filtering the risks list.
- CI enhancements: upload Playwright traces and Codecov badges across PRs.

## [0.6.0] - 2025-08-13
### Added
- **Material Design 3 (MD3) UI kit**: theme tokens and primitives (`Button`, `TextField`, `Select`, `Slider`, `Switch`, `DataTable`, `Banner`, `Snackbar`, `Page`).
- **UX standardization** across pages with MD3 components and a consistent light theme.
- **Heatmap controls**: 4×4/5×5 toggle, green/amber thresholds, dashed **risk appetite** slider (bend control), optional scatter overlay with jitter.
- **Reports** page: Top N, Category means (pre), Highest per category.
- **Excel Import** page with column mapping, preview, and commit into SQLite (requires `xlsx` package).
- **Settings → Scoring** for thresholds/grid/jitter/topN and **Settings → Branding** for hero image, overview copy, guidelines, and GitHub repo URL.
- **Auth UI polish**: MD3-styled Sign-in, Sign-up, Verify Email views with SSO action buttons (demo placeholders).
- **Shell header & navigation** linking Overview / Heatmap / Risks / Reports / Settings.

### Changed
- Replaced any references to “Ericsson” with **“enterprise”** in copy and labels.
- Unified spacing, elevation, and focus rings to MD3 tokens; converted plain HTML tables/inputs to MD3 components.
- Simplified header to a clean, fluid layout that scales from mobile to desktop.

### Fixed
- Addressed build issues seen earlier:
  - Vite config duplicate variable error.
  - Missing `App.css` and import path mismatches.
  - Docker `npm ci` failure by allowing `npm install` fallback when no lockfile.
- Importer preview stability (handles blank cells and short rows more gracefully).

### Notes
- **Dependency:** install importer lib once: `npm i xlsx`.
- **Styling:** new stylesheet at `src/styles/md3.css`; new components under `src/components/md3/*`.

## [0.5.0] - 2025-08-10
### Added
- **Heatmap** first implementation with 3-color gradient (green < 4, amber 4–11, red > 11).
- **Dashed risk appetite curve** with a basic slider control; line terminates at grid edges.
- “Risk Treatment Guidelines” copy outside grid, aligned to quadrants.

### Changed
- Overview content model introduced (What / Why / How (Enterprise & Projects) / FAQ / My Projects).

## [0.4.0] - 2025-08-07
### Added
- SQLite (WASM) schema for users, projects, risks, assessments, uploads, settings.
- Basic “My Projects” list scaffold and Guided Assessment draft.
- CI: ESLint + Vitest + Playwright base jobs.

### Fixed
- Docker compose targets for dev and prod stages, Vite port mapping.

## [0.3.0] - 2025-08-05
### Added
- Initial page structure and navigation routes:
  - `/` (Home), `/overview`, `/auth/*`, `/risks`, `/heatmap`, `/reports`, `/settings/*`, `/import`.
- Home hero image and GitHub repo link (admin-editable).

## [0.2.0] - 2025-08-02
### Added
- Legacy Excel analysis outputs and field mapping draft.
- Initial risk model (pre/post Probability × Impact scoring).

## [0.1.0] - 2025-07-30
### Added
- Project scaffold (Vite + React + TypeScript), linting, unit test harness.
