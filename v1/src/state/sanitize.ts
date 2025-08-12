import { z } from 'zod'

export const AppSettingsSchema = z.object({
  green_max: z.number().int().min(1).max(16).default(3),
  amber_max: z.number().int().min(1).max(16).default(11),
  appetite_anchor_p: z.number().int().min(1).max(4).default(3),
  appetite_anchor_i: z.number().int().min(1).max(4).default(3),
  appetite_bend: z.number().min(-1).max(1).default(0),
})

export type AppSettingsSafe = z.infer<typeof AppSettingsSchema>

/** Corrects out-of-bounds and inconsistent values. */
export function sanitizeSettings<T extends Record<string, any>>(raw: T): AppSettingsSafe & T {
  const parsed = AppSettingsSchema.safeParse(raw)
  let v: AppSettingsSafe = parsed.success ? parsed.data : {
    green_max: 3, amber_max: 11, appetite_anchor_p: 3, appetite_anchor_i: 3, appetite_bend: 0
  }
  // Ensure ordering green_max < amber_max
  if (v.green_max >= v.amber_max) {
    v.green_max = Math.max(1, Math.min(v.green_max, v.amber_max - 1, 10))
  }
  // Clamp anchors to 1..4
  v.appetite_anchor_p = Math.min(4, Math.max(1, v.appetite_anchor_p))
  v.appetite_anchor_i = Math.min(4, Math.max(1, v.appetite_anchor_i))
  // Clamp bend
  v.appetite_bend = Math.max(-1, Math.min(1, v.appetite_bend))
  return { ...raw, ...v }
}
