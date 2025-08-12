import { sanitizeSettings } from './sanitize'

it('clamps anchors and bend', () => {
  const s = sanitizeSettings({ appetite_anchor_p: 9, appetite_anchor_i: -2, appetite_bend: 3 } as any)
  expect(s.appetite_anchor_p).toBe(4)
  expect(s.appetite_anchor_i).toBe(1)
  expect(s.appetite_bend).toBe(1)
})

it('enforces green_max < amber_max', () => {
  const s = sanitizeSettings({ green_max: 12, amber_max: 10 } as any)
  expect(s.green_max).toBeLessThan(s.amber_max)
})
