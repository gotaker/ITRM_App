# ITRM_App (Enterprise Risk) — Full CI & Tests

## Scripts
- `npm run dev` — Vite dev server
- `npm run build` — Production build
- `npm run preview` — Preview build
- `npm run typecheck` — TypeScript
- `npm run lint` — ESLint
- `npm test` — Vitest unit tests
- `npm run coverage` — Coverage report
- `npm run test:e2e` — Playwright e2e tests (expects preview on :4173)

## CI
- Typecheck, Lint, Unit + Coverage to Codecov
- Build + Preview + Playwright E2E
- Deploy to GitHub Pages

## E2E locally
```bash
npm run build
npm run preview:test &
npx wait-on http://127.0.0.1:4173
npm run test:e2e
```

## Docker
```bash
docker compose up dev   # http://localhost:5173
docker compose up web   # http://localhost:8080
```
