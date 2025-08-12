
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGH = process.env.GITHUB_ACTIONS === 'true' && (process.env.GITHUB_REPOSITORY || '').endsWith('/ITRM_App')

export default defineConfig({
  plugins: [react()],
  base: isGH ? '/ITRM_App/' : '/'
})
