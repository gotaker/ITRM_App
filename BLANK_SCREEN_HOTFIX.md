# Blank Screen Hotfix

This patch provides a known-good `index.html`, adds a console `debug-probe`, and a minimal `src/main.tsx`
that renders your `shell/App` with a fallback route so the page never appears blank.

## Apply
Unzip into your repo root, then restart dev or rebuild Docker.

## Check
1) Open DevTools → Console. You should see `[debug-probe] index.html loaded`.
2) If errors appear, the ErrorBoundary/console will show the stack.
3) If you see "App loaded. Replace with your routes.", your router isn't mounting — wire your existing routes under `<Outlet/>` in `App`.
