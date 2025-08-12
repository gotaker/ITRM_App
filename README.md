# ITRM_App (Enterprise Risk)

[![CI](https://github.com/gotaker/ITRM_App/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/gotaker/ITRM_App/actions/workflows/ci.yml)
[![Deploy (GitHub Pages)](https://github.com/gotaker/ITRM_App/actions/workflows/deploy-pages.yml/badge.svg?branch=main)](https://github.com/gotaker/ITRM_App/actions/workflows/deploy-pages.yml)

<!-- Extra badges -->
[![Node](https://img.shields.io/badge/node-20%2B-339933?logo=node.js&logoColor=white)](#)
[![Code style: Prettier](https://img.shields.io/badge/code_style-Prettier-ff69b4.svg?logo=prettier)](https://prettier.io/)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=061C30)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Issues](https://img.shields.io/github/issues/gotaker/ITRM_App)
![PRs](https://img.shields.io/github/issues-pr/gotaker/ITRM_App)
![Last commit](https://img.shields.io/github/last-commit/gotaker/ITRM_App)
[![Site](https://img.shields.io/website?url=https%3A%2F%2Fgotaker.github.io%2FITRM_App%2F)](https://gotaker.github.io/ITRM_App/)
[![codecov](https://codecov.io/gh/gotaker/ITRM_App/branch/main/graph/badge.svg)](https://codecov.io/gh/gotaker/ITRM_App)

React + Vite + TypeScript with Material Design 3 (Material Web) and **SQLite WASM (OPFS)**.

## Quick start
```bash
pnpm i   # or: npm i / yarn
pnpm dev # http://localhost:5173
```

## Build
```bash
pnpm build
pnpm preview
```

## What is included
- Light theme
- Overview page with **Risk Treatment Guidelines** (4x4 matrix, 3-color bands, dashed appetite line)
- Admin sliders (Settings → Scoring) to control appetite line (P, I, curvature) and score bands
- SQLite WASM persisted to OPFS (`app_settings` table).

## Pushing to GitHub (gotaker/ITRM_App)
```bash
git clone https://github.com/gotaker/ITRM_App.git
cd ITRM_App
# if the repo is empty, copy the scaffold files in:
cp -R /path/to/this/folder/* .
git add .
git commit -m "chore: initial React+Vite+SQLite WASM scaffold with Overview + Settings"
git push origin main
```
If the repo already has content, consider creating a new branch:
```bash
git checkout -b feat/initial-scaffold
git push -u origin feat/initial-scaffold
```
Then open a Pull Request in GitHub.

## Notes
- To change the GitHub link shown on Overview, update `app_settings.github_repo_url` in the DB (Settings page coming later for Branding).
- SQLite file persists in the browser (OPFS). Clearing site data will remove it.