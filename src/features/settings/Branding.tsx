import React from 'react'
import { useAppSettings } from '../../state/useSettings'

export default function Branding(){
  const { settings, save } = useAppSettings()
  const [form, setForm] = React.useState({
    hero_url: settings.hero_url || '',
    hero_alt: settings.hero_alt || 'Enterprise Risk overview',
    github_repo_url: settings.github_repo_url || 'https://github.com/gotaker/ITRM_App'
  })
  React.useEffect(()=>{
    setForm({
      hero_url: settings.hero_url || '',
      hero_alt: settings.hero_alt || 'Enterprise Risk overview',
      github_repo_url: settings.github_repo_url || 'https://github.com/gotaker/ITRM_App'
    })
  }, [settings])
  return (
    <div className="section">
      <h2>Branding</h2>
      <div className="grid" style={{gridTemplateColumns:'repeat(2, minmax(240px, 1fr))'}}>
        <div className="card">
          <label>Hero image URL</label>
          <input style={{width:'100%'}} value={form.hero_url} onChange={e=>setForm({...form, hero_url:e.target.value})}/>
        </div>
        <div className="card">
          <label>Alt text</label>
          <input style={{width:'100%'}} value={form.hero_alt} onChange={e=>setForm({...form, hero_alt:e.target.value})}/>
        </div>
        <div className="card">
          <label>GitHub repo URL</label>
          <input style={{width:'100%'}} value={form.github_repo_url} onChange={e=>setForm({...form, github_repo_url:e.target.value})}/>
        </div>
      </div>
      <button className="card" onClick={()=>save(form)}>Save</button>
    </div>
  )
}
