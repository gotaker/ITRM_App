import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    globals: true,
    css: true,
    reporters: process.env.CI ? ['default', ['vitest-junit-reporter', { outputFile: 'junit.xml' }]] : ['default'],
    coverage: { provider: 'v8', reporter: ['text','lcov'], reportsDirectory: './coverage', include: ['src/**/*.{ts,tsx}'] }
  }
})
