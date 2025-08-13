# White-Screen Killer v3

Dynamic-import boot that surfaces module load errors **in the page**.
If an import fails (path, TS, or package resolution), you will see a red "Boot error" with the stack trace.

## Apply
unzip -o White_Screen_Killer_v3.zip -d .
npm run dev   # or: docker compose up --build -d

## Next
- If you still see "Loading app…", open DevTools → Network and check `/src/main.tsx` status.
- If you see "Boot error", paste the red stack here and I’ll ship a targeted fix.
