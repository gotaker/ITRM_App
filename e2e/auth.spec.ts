import { test, expect } from '@playwright/test'

test('auth pages load', async ({ page }) => {
  await page.goto('/auth/sign-in')
  await expect(page.getByText(/Sign in/i)).toBeVisible()
  await page.goto('/auth/sign-up')
  await expect(page.getByText(/Create account/i)).toBeVisible()
  await page.goto('/auth/verify')
  await expect(page.getByText(/Verify your email/i)).toBeVisible()
})
