// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Locally: leave VITE_BASE unset (defaults to '/')
// GH Pages: set VITE_BASE=/ITRM_App/
const base = process.env.VITE_BASE || '/'

export default defineConfig({
  plugins: [react()],
  base,
  server: { host: true, port: 5173, strictPort: true, hmr: { clientPort: 5173 } },
  preview: { host: true, port: 5173, strictPort: true }
})
