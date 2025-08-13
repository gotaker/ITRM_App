# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- CSV export for reports (planned)
- Column mapping rule presets (planned)

### Changed
- TBD

### Fixed
- TBD


## [0.3.0] - 2025-08-13
### Added
- **Route protection** with `<RequireAuth>` and redirects to `/auth/sign-in`.
- **OIDC SSO scaffold** (Azure AD / Google) with Authorization Code + PKCE.
- **Overview** page backed by DB (What/Why/How Enterprise & Projects/FAQ/Guidelines/My Projects + GitHub link).
- **Heatmap**: 4×4 and 5×5 toggle, 3‑color gradient thresholds (Green <4, Amber 4–11, Red >11), **dashed appetite curve** with slider, **click‑through** to filtered risks.
- **Risks list** with filters and P×I score.
- **Excel import** preview and raw upload storage for audit.
- **SQLite (WASM)** integration using OPFS with schema migrations.
- **CI hardening**: ESLint cache, Vitest JUnit, Playwright traces, artifacts.
- **Docker**: dev hot‑reload and prod Nginx images.
- **MD3** (Material Design 3) styling, light theme.

### Changed
- All prior “Ericsson” references replaced by **“enterprise”** across UI and docs.

### Fixed
- Vite base path auto‑detection for GitHub Pages builds.


## [0.2.0] - 2025-08-12
### Added
- Initial Overview, Heatmap (4×4) prototype, Risks scaffold.
- Demo Sign‑up with password rules, Verify code screen.
- Basic GitHub Actions pipeline (install, build, unit).

### Fixed
- Dependency resolution issues for CI (eslint/tsconfig alignment).


## [0.1.0] - 2025-08-11
### Added
- Project bootstrap (React + Vite) and page routing skeleton.
- Material Design 3 setup and global light theme.
