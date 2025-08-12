# ITRM_App (Enterprise Risk)

[![CI](https://github.com/gotaker/ITRM_App/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/gotaker/ITRM_App/actions/workflows/ci.yml)
[![Deploy (GitHub Pages)](https://github.com/gotaker/ITRM_App/actions/workflows/deploy-pages.yml/badge.svg?branch=main)](https://github.com/gotaker/ITRM_App/actions/workflows/deploy-pages.yml)
[![Site](https://img.shields.io/website?url=https%3A%2F%2Fgotaker.github.io%2FITRM_App%2F)](https://gotaker.github.io/ITRM_App/)
[![codecov](https://codecov.io/gh/gotaker/ITRM_App/branch/main/graph/badge.svg)](https://codecov.io/gh/gotaker/ITRM_App)

<!-- Extra badges -->
[![Node](https://img.shields.io/badge/node-20%2B-339933?logo=node.js&logoColor=white)](#)
[![Code style: Prettier](https://img.shields.io/badge/code_style-Prettier-ff69b4.svg?logo=prettier)](https://prettier.io/)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=061C30)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Issues](https://img.shields.io/github/issues/gotaker/ITRM_App)
![PRs](https://img.shields.io/github/issues-pr/gotaker/ITRM_App)
![Last commit](https://img.shields.io/github/last-commit/gotaker/ITRM_App)

React + Vite + TypeScript with Material Design 3 (Material Web) and **SQLite WASM (OPFS)**.

## Quick start
```bash
npm ci       # or: npm i / pnpm i / yarn
npm run dev  # http://localhost:5173
```

## Docker
```bash
# Dev
docker compose up dev  # → http://localhost:5173

# Prod
docker compose up web  # → http://localhost:8080
```

## CI/CD
- GitHub Actions: typecheck, lint, unit + e2e, coverage upload to Codecov.
- GitHub Pages: auto-deploy on push to main.

## What is included
- Light theme
- Overview page with **Risk Treatment Guidelines** (4x4 matrix, 3-color bands, dashed appetite line)
- Admin sliders (Settings → Scoring) to control appetite line (P, I, curvature) and score bands
- SQLite WASM persisted to OPFS (`app_settings` table + seeds)

## Notes
- To change the GitHub link shown on Overview, update `app_settings.github_repo_url` in the DB (Settings → Branding).
- Clearing site data will remove the local DB (OPFS).
