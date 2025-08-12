import { create } from 'zustand'
import { openDb, query, run } from '../db/sqlite'
import { sanitizeSettings } from './sanitize'

type AppSettings = {
  id: 1
  hero_src_type: 'url'|'blob'
  hero_url?: string
  hero_alt?: string
  what_md?: string
  why_md?: string
  how_enterprise_md?: string
  how_project_md?: string
  faq_json?: string
  github_repo_url?: string
  treatment_guidelines_md?: string
  appetite_anchor_p?: number
  appetite_anchor_i?: number
  appetite_bend?: number
  appetite_enabled?: number
  green_max?: number
  amber_max?: number
}

type Store = {
  settings: Partial<AppSettings>
  ready: boolean
  load: () => Promise<void>
  save: (patch: Partial<AppSettings>) => Promise<void>
}

export const useAppSettings = create<Store>((set, get) => ({
  settings: {},
  ready: false,
  load: async () => {
    const db = await openDb()
    const row = query<AppSettings>('SELECT * FROM app_settings WHERE id=1 LIMIT 1')[0]
    set({ settings: sanitizeSettings(row ?? {} as any), ready: true })
  },
  save: async (patch) => {
    const cur = get().settings
    const next = sanitizeSettings({ ...(cur as any), ...(patch as any) })
    const cols = Object.keys(next).filter(k => k !== 'id')
    const placeholders = cols.map(c => `${c}=?`).join(',')
    const values = cols.map(c => (next as any)[c])
    run(`UPDATE app_settings SET ${placeholders}, updated_at=CURRENT_TIMESTAMP WHERE id=1`, values)
    set({ settings: next })
  }
}))

// Kick initial load
openDb().then(() => useAppSettings.getState().load())
