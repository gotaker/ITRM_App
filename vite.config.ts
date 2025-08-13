

// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: '/',                                // <-- force root base in dev
  server: { host: true, port: 5173, strictPort: true, hmr: { clientPort: 5173 } },
  preview: { host: true, port: 5173, strictPort: true } // keep preview on 5173 to avoid confusion
}))






// Locally: leave VITE_BASE unset (defaults to '/')
// GH Pages: set VITE_BASE=/ITRM_App/
//const base = process.env.VITE_BASE || '/'

//export default defineConfig({
  //plugins: [react()],
  //base,
  //server: { host: true, port: 5173, strictPort: true, hmr: { clientPort: 5173 } },
 // preview: { host: true, port: 5173, strictPort: true }
//})
