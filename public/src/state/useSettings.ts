import { create } from 'zustand'
import { openDb, query, run } from '../db/sqlite'
type Settings = { hero_url?:string; hero_alt?:string; what_md?:string; why_md?:string; how_enterprise_md?:string; how_project_md?:string; faq_json?:string; github_repo_url?:string; treatment_guidelines_md?:string; appetite_bend?:number; green_max?:number; amber_max?:number; grid_cells?:number }
type Store = { ready:boolean; settings:Partial<Settings>; load:()=>Promise<void>; save:(p:Partial<Settings>)=>Promise<void> }
export const useAppSettings = create<Store>((set,get)=>({
  ready:false, settings:{},
  load: async()=>{ await openDb(); const row=query<Settings>('SELECT * FROM app_settings WHERE id=1')[0]||{}; set({ready:true, settings:row}) },
  save: async(p)=>{ const cur=get().settings||{}; const next={...cur,...p}; const cols=Object.keys(next); const values=cols.map(c=>(next as any)[c]); const setExpr=cols.map(c=>`${c}=?`).join(', '); run(`UPDATE app_settings SET ${setExpr}, updated_at=CURRENT_TIMESTAMP WHERE id=1`, values); set({ settings: next }) }
}))
openDb().then(()=>useAppSettings.getState().load())
