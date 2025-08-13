# White-Screen Killer Patch

This patch ensures the app visibly renders and configures Vite for Docker/dev correctly.

## Files
- `vite.config.ts` — safe `base` (GitHub Pages only), `server.host: true` for Docker, strict ports.
- `index.html` — visible loading placeholder, proper `#root`.
- `src/main.tsx` — minimal router render with a Home page to prove React mounts.
- `src/shell/App.tsx` — simple shell with header and `<Outlet/>`.

## Apply
Unzip into the repo root and restart dev:
```
unzip -o White_Screen_Killer_v2.zip -d .
npm run dev
# or Docker dev:
docker compose up --build -d
```

## Verify
Open http://localhost:5173 — you should see “Enterprise Risk — It works ✅”. If not, check DevTools console. If it shows but your full app is missing, wire your routes back under the shell’s `<Outlet/>`.
