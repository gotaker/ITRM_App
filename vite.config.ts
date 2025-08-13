import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const onGh = process.env.GITHUB_PAGES === 'true' || process.env.VITE_GH_PAGES === 'true'
export default defineConfig({
  plugins: [react()],
  base: onGh ? '/ITRM_App/' : '/',
  server: { host: true, port: 5173, strictPort: true, hmr: { clientPort: 5173 } },
  preview: { port: 4173, strictPort: true }
})
