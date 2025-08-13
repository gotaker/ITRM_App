
>undercosntruction

# Enterprise Risk (ITRM)

A lightweight, Material Design 3–styled web app for project managers to **capture, assess, monitor, and report project risks**.  
Runs fully client-side with **React + Vite + SQLite (WASM/OPFS)** and secures access via **OIDC SSO** (Azure AD / Google).



---

## ✨ Features

- **Auth & Protection** — OIDC (Authorization Code + PKCE). Unauth users redirected to `/auth/sign-in`.
- **Overview** — Admin-editable _What / Why / How (Enterprise & Projects) / FAQ / Risk Treatment Guidelines / My Projects_ with hero image + GitHub link.
- **Risk Register** — P×I scoring (pre/post). Filters and sorting.
- **Heatmap** — 4×4 & 5×5 toggle, 3‑color gradient (Green <4, Amber 4–11, Red >11), **dashed appetite curve** with slider, click‑through to `/risks`.
- **Excel Import** — Preview, map, validate, commit; stores raw upload for audit.
- **Reports (initial)** — Top 5, Category means, Highest per category (scaffold).
- **SQLite WASM** — Browser‑persisted data via OPFS; backup via export/import.
- **CI/CD** — GitHub Actions (lint, build, unit, Playwright e2e with traces).

---

## 🧭 Page Structure

```
/                    → Home
/auth
  /auth/sign-in      → Sign in (SSO buttons; demo fallback)
  /auth/sign-up      → Demo create account (password rules)
  /auth/verify       → Demo 6-digit code (UX only)
  /auth/callback     → OIDC callback
  /auth/reset        → OIDC reset guidance
/overview            → (Protected) What/Why/How/FAQ/Guidelines/My Projects + GitHub link
/risks               → (Protected) Risk list (filters + sorting)
/heatmap             → (Protected) 4×4/5×5, thresholds, appetite curve, click-through
/reports             → (Protected) Reports scaffold
/settings
  /settings/scoring  → Thresholds & grid size
  /settings/branding → Hero image, overview text, GitHub URL
  /settings/data     → Import/Export, backups
/import              → (Protected) Excel import (preview/map/validate/commit)
/404                 → Not found
```

---

## 🚀 Quickstart

### Local Dev
```bash
npm ci
npm run dev
# open http://localhost:5173
```

### Docker (recommended)
```bash
# Hot-reload dev server
docker compose up dev    # http://localhost:5173

# Production static build behind Nginx
docker compose up web    # http://localhost:8080
```

### OIDC (SSO) Runtime Config
```bash
mkdir -p public/config
cp public/config/oidc.example.json public/config/oidc.json
# Edit tenant/client/redirect_uri, e.g. http://localhost:5173/auth/callback
```
If OIDC isn’t configured yet, Sign‑in will show a notice and you can use the **demo Sign‑up → Verify** flow to explore UX.  
> For production, rely on OIDC (no local passwords).

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, React Router v6, **Material Design 3** web components
- **State:** Zustand
- **DB:** **SQLite (WASM)** with OPFS persistence
- **Auth:** `oidc-client-ts` (Authorization Code + PKCE)
- **Build/Serve:** Vite → Nginx (prod)
- **CI:** GitHub Actions (ESLint cache, Vitest JUnit, Playwright e2e + traces)

---

## 🔒 Security Notes

- Route guard redirects unauthenticated access to `/auth/sign-in`.
- Minimal profile data stored in storage; tokens handled by OIDC library.
- DOMPurify sanitizes admin‑authored markdown content.
- CSRF utility (`src/utils/csrf.ts`) prepared for future API calls (SameSite + header).

---

## 📦 Scripts

```bash
npm run dev           # start Vite dev server
npm run build         # build production bundle
npm run preview       # preview prod build
npm run lint          # eslint (with cache)
npm run typecheck     # typescript check
npm run test          # unit tests (vitest)
npm run test:e2e      # e2e (playwright)
```

---

## 🧪 Tests & CI

- **Unit:** Vitest (jsdom). JUnit output for CI.
- **E2E:** Playwright smoke (redirects & auth pages).
- **CI Workflow:** `.github/workflows/ci.yml` → install, lint, build, preview, e2e, and artifact uploads (JUnit + Playwright traces).

---

## 📥 Excel Import

1. Upload `.xlsx/.xls` → preview shows first rows.  
2. Map columns to **Project / Risk / Assessment** fields.  
3. Validate (required fields, ranges, duplicates).  
4. Commit → data inserted; **raw file** saved in `uploads` (blob + metadata).

---

## 📁 Project Layout

```
src/
  auth/               # OIDC config + helpers
  components/         # Reusable UI (e.g., RiskTreatmentMatrix)
  db/                 # SQLite WASM wrapper
  features/
    overview/
    risks/
    heatmap/
    settings/
    import/
  pages/              # Auth & scaffolds
  shell/              # App shell + RequireAuth
  state/              # Zustand stores
  styles/             # Global CSS
```

---

## 🧩 Configuration

- **GitHub Pages base:** Vite auto‑sets `base` for `gotaker/ITRM_App` during Actions runs.
- **Thresholds:** Settings → Scoring (Green `<4`, Amber `4–11`, Red `>11` by default).
- **Grid:** 4×4 or 5×5; appetite curve **bend** adjustable (admin).

---

## 🙌 Contributing

1. Fork + branch from `main`.  
2. `npm ci && npm run dev` to start.  
3. Ensure `npm run lint && npm run test && npm run build` are green.  
4. Submit a PR; CI must pass.

---

## 📄 License

TBD by the **enterprise** owner of this repository.
