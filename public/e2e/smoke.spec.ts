import { test, expect } from '@playwright/test'
test('auth & protected routes', async ({ page }) => {
  await page.goto('/overview')
  await expect(page.getByText(/Sign in/i)).toBeVisible()
  await page.goto('/auth/sign-up')
  await expect(page.getByText(/Create account/i)).toBeVisible()
})
