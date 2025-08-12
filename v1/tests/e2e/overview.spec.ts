import { test, expect } from '@playwright/test'

test('Overview loads and shows matrix legend', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('img', { name: /probability by impact matrix/i })).toBeVisible()
  await expect(page.getByText(/Green < 4/)).toBeVisible()
  await expect(page.getByText(/Amber 4–11/)).toBeVisible()
  await expect(page.getByText(/Red > 11/)).toBeVisible()
})
