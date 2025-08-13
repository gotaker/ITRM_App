---
title: Enterprise Risk (ITRM) — Product Specification
description: Lightweight, MD3-styled React app for capturing, assessing, monitoring, and reporting project risks with SQLite (WASM), OIDC SSO, and Excel import.
layout: default
permalink: /product-spec/
---

# Enterprise Risk (ITRM) — Product Specification

**Last updated:** 2025-08-13

> Production-ready specification for the **Enterprise Risk** web app that replaces a legacy Excel (macros/VBA) workflow. The app targets project managers and risk analysts, runs locally (Docker) or in the cloud, and uses a **lightweight, Google-like** UX with **Material Design 3** (light theme).

---

## 1. Overview

**Purpose**  
Enable teams to **capture, assess, monitor, and report** project risks consistently.

**Primary Outcomes**
- Consistent risk scoring (pre/post treatment), visibility via heatmaps & reports.
- Simple import from the legacy Excel, with audit trail.
- Secure access with SSO (OIDC) and protected routes.
- Admin-managed branding (hero image), overview content, thresholds, and links.

---

## 2. Scope

### In-Scope (MVP → v1)
- **Auth:** Sign-in via OIDC (Azure AD / Google; GitHub optional), route protection; demo email sign-up/verify (UX only).
- **Overview:** “What / Why / How (Enterprise & Projects) / FAQ / Risk Treatment Guidelines / My Projects + GitHub link” from DB; admin-editable.
- **Risk register:** CRUD, categories, owners; assessments (pre/post) with **P×I** scoring.
- **Heatmap:** **4×4** and **5×5**; **3‑color gradient** (Green <4, Amber 4–11, Red >11 default); **dashed risk‑appetite curve** with **slider**; **click cell → filtered risk list**.
- **Import:** Map legacy Excel columns to DB entities; **preview & validate** before commit; **store raw upload** for audit.
- **Reports (initial):** Top 5, Category means, Highest per category (stubbed initially).
- **Settings:** Scoring thresholds; branding (hero image, overview text, GitHub URL); data (import/export/backups).
- **CI/CD:** GitHub Actions (ESLint cache, Vitest JUnit, Playwright e2e with traces). Optional Codecov.

### Out-of-Scope (v1)
- Real email delivery / tokenized password reset server (use OIDC flows).
- Granular RBAC beyond “member/admin”.
- Multi-tenant administration.

---

## 3. Personas

- **Project Manager (Primary):** Create risks, update assessments, export reports.
- **Risk Analyst (Contributor):** Review risks, tune thresholds with admin.
- **Admin (Secondary):** Manage branding, overview content, SSO config, thresholds.
- **Sponsor/Stakeholder (Viewer):** Read dashboards/reports.

---

## 4. Information Architecture / Routes

```text
/                    → Home (brief intro)
/auth
  /auth/sign-in      → Sign in (SSO buttons; demo fallback)
  /auth/sign-up      → Demo create account (password rules)
  /auth/verify       → Demo 6-digit code screen
  /auth/callback     → OIDC callback
  /auth/reset        → Guidance for OIDC password reset
/overview            → Landing after login (What/Why/How/FAQ/Guidelines/My Projects + GitHub link)
/risks               → Risks list (filters + sortable table)
/heatmap             → Heatmap (4×4 / 5×5 toggle; appetite curve; cell click-through)
/reports             → Top 5, Category means, Highest per category
/settings
  /settings/scoring  → Scoring thresholds, grid size default
  /settings/branding → Admin: hero image, overview text, GitHub URL
  /settings/data     → Import/Export, backups
/import              → Excel import (preview, map, validate, commit)
/404                 → Not found
```

**Route protection:** `/overview`, `/risks`, `/heatmap`, `/reports`, `/settings/*`, `/import` require auth (redirect → `/auth/sign-in`).

---

## 5. UX & Visual Design

- **Style:** Material Design 3, **light theme**, clean Google-like aesthetic, fluid responsive layout.
- **Global:** Top app bar (brand, nav, sign-in/out). Cards for content groups; consistent spacing & rounded corners.
- **Overview:** Admin-managed **hero image**, sections for What, Why, How (Enterprise), How (Projects), FAQ, **Risk Treatment Guidelines**, **My Projects**, **GitHub link**.
- **Risks list:** Columns: Title, Category, Owner (later), Status, **Pre P/I/Score**, **Post P/I/Score** (v1), Updated. Filters: category, status; deep-link params `?p=` `?i=` from heatmap.
- **Heatmap:** **4×4/5×5** grid, **3‑color gradient**, **dashed appetite curve** (slider). Hover shows P, I, Score; click navigates to `/risks` (filtered). Side panel: grid size, **Green/Amber thresholds**, appetite bend; persist admin defaults.
- **Import:** File upload (xlsx/xls), preview (first 20 rows); mapping UI (drag/select), validation summary, commit; raw file stored.
- **Auth:** SSO buttons (Azure AD, Google; GitHub optional). Demo sign-up with **password rules** (≥12 chars, upper, lower, number, special, not containing email local part). Demo 6-digit verification UI (production uses OIDC).

---

## 6. Functional Requirements

### 6.1 Risk Model
- **Score = Probability × Impact**.
- **Scale:** 1–4 (default) or 1–5 (toggle).
- **Thresholds (default):** Green `<4`, Amber `4–11`, Red `>11`. Admin override.
- **Phases:** `pre` (inherent) and `post` (residual).

### 6.2 Risk Treatment Guidelines (placement on overview/heatmap help)
- **Upper Left — Transfer:** Reduce impact via insurance/outsourcing.
- **Upper Right — Preventive:** Reduce probability. *Residual risk must not be red.*
- **Lower Right — Detect/Contain/Correct:** Monitor early; probability lowered even if event occurs.
- **Lower Left — Accept:** Sponsor accepts; consider monitoring/detective controls.

### 6.3 Import & Mapping
- Upload Excel → parse → **preview** → **map** Project/Risk/Assessment fields → **validate** (required fields, types, ranges, duplicates) → **commit**.
- Store **raw file blob + metadata** (rows/cols, timestamp, uploader) for audit.

### 6.4 Reports (initial)
- Top 5 risks by current score.
- Category mean score.
- Highest score per category.
- Export CSV (v1).

---

## 7. Data Model (SQLite WASM / OPFS)

| Table             | Columns (key → type) |
|-------------------|----------------------|
| **app_settings**  | **id** (1), `hero_url`, `hero_alt`, `what_md`, `why_md`, `how_enterprise_md`, `how_project_md`, `faq_json`, `github_repo_url`, `treatment_guidelines_md`, `grid_cells` (4/5), `green_max` (int), `amber_max` (int), `appetite_bend` (real), `updated_at` |
| **users**         | **id** (text PK), `email` (unique), `name`, `created_at` |
| **projects**      | **id** (text PK), `name`, `code`, `active` (1/0), `created_at` |
| **project_members** | **project_id+user_id** (PK), `role` |
| **risks**         | **id** (text PK), `project_id`, `title`, `category`, `status` (Open/Closed), `owner_id`, `perspective` (Enterprise/Project), `created_at` |
| **assessments**   | **id** (text PK), `risk_id`, `phase` (`pre`/`post`), `probability` (int), `impact` (int), `assessed_by`, `assessed_at` |
| **uploads**       | **id** (text PK), `name`, `mime` (text), `blob` (BLOB), `meta` (JSON), `created_by`, `created_at` |

Notes:
- Persisted in-browser via **OPFS**. Export/import cover backup & restore.
- Server mode can reuse schema unchanged.

---

## 8. Security & Compliance

- **Auth:** OIDC (Authorization Code + PKCE). Providers: Entra ID (Azure AD), Google; GitHub optional.
- **Route Guard:** Unauth → redirect to `/auth/sign-in`.
- **Sessions:** OIDC library maintains tokens; frontend stores minimal user profile.
- **CSRF:** SameSite cookies & `X-CSRF-Token` for future API calls.
- **Sanitization:** DOMPurify for admin-rendered markdown.
- **PII Minimization:** Only name/email stored.
- **Audit:** Raw import file + metadata retained in `uploads`.

---

## 9. Non‑Functional Requirements

- **Performance:** TTI < 2.5s; bundle target < 300KB gz (code split feature routes).
- **Accessibility:** WCAG 2.1 AA.
- **Responsiveness:** Mobile → desktop fluid layouts.
- **Reliability:** OPFS durable; idempotent import.
- **Browser Support:** Latest Chrome/Edge/Firefox/Safari.
- **i18n:** English (default); content editable via admin fields.

---

## 10. Technology Stack

- **Frontend:** React 18 + Vite, **Material Design 3** web components, React Router v6.
- **State:** Zustand (auth, settings).
- **DB:** **SQLite WASM** (OPFS).
- **Auth:** `oidc-client-ts`.
- **Build/Serve:** Vite; Nginx for static prod container.
- **CI/CD:** GitHub Actions → lint, unit (Vitest JUnit), build, preview, e2e (Playwright, traces). Optional Codecov.
- **Docker:** `Dockerfile.dev` (hot reload), `Dockerfile` (static), `docker-compose.yml` (dev/prod).

---

## 11. Acceptance Criteria (MVP)

- [ ] Visiting `/overview` while unauthenticated **redirects** to `/auth/sign-in`.
- [ ] Successful SSO returns to `/overview`.
- [ ] Admin can set **hero image**, **GitHub URL**, and **What/Why/How/FAQ/Guidelines** and see them rendered.
- [ ] “**My Projects**” shows latest 10 items or an empty state.
- [ ] **Heatmap** toggles **4×4/5×5**; respects thresholds; dashed appetite curve (slider) renders; **cell click → /risks** filter works.
- [ ] **Risks** table shows Title/Category/Status/P/I/Score; deep-link filters work.
- [ ] **Import** shows preview, mapping step, validation summary, and commits; **raw file** captured in `uploads` with metadata.
- [ ] CI: lint, unit (JUnit), build, preview, e2e smoke pass; artifacts uploaded.
- [ ] All references to “Ericsson” are replaced by **“enterprise”**.

---

## 12. Release Plan (suggested)

- **Phase 0 (Scaffold):** Auth shell + protected routes + settings + OPFS DB.  
- **Phase 1 (MVP):** Overview content, Heatmap (4×4, appetite slider), Risks list, Import preview & raw storage, CI green.  
- **Phase 2 (v1):** 5×5 heatmap parity, Reports (Top 5 / Category means / Highest per category), CSV export, mapping rules library, coverage badge, basic telemetry.

---

## 13. Risks & Mitigations

- **OPFS support variance** → offer export/import backup; document supported browsers.  
- **OIDC setup complexity** → ship `public/config/oidc.example.json`; provide quickstart.  
- **Excel variability** → mapping preview, strict validations; store raw for reprocessing.

---

## 14. Open Questions

1. Final list of **risk categories** and any required **enterprise** taxonomy.  
2. Required **report templates**/formats (CSV vs PDF, grouping rules).  
3. Who can manage **branding/settings** (global admin vs per‑project)?  
4. Any **data retention** or export compliance needs?  
5. Additional **SSO providers** to support (Okta, GitHub Enterprise)?

---

### Appendix A — Quickstart (for README)

```bash
npm ci
npm run dev               # http://localhost:5173

# Docker
docker compose up dev     # hot reload at 5173
docker compose up web     # static build at 8080

# OIDC runtime config
mkdir -p public/config
cp public/config/oidc.example.json public/config/oidc.json
# edit tenant/client/redirect_uri
```
