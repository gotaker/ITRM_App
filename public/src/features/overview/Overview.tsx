import React from 'react'
import DOMPurify from 'dompurify'
import { useAppSettings } from '../../state/useSettings'
import { openDb, query } from '../../db/sqlite'
export default function Overview(){
  const { settings } = useAppSettings()
  const [projects, setProjects] = React.useState<any[]>([])
  React.useEffect(()=>{ (async()=>{ await openDb(); const rows=query<any>('SELECT p.* FROM projects p ORDER BY created_at DESC LIMIT 10'); setProjects(rows) })() }, [])
  const clean = (md?: string) => ({ __html: DOMPurify.sanitize(md || '') })
  return (<div className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
    <div className="section"><h1>Overview</h1>
      {settings.hero_url && <img src={settings.hero_url} alt={settings.hero_alt||'hero'} style={{width:'100%',borderRadius:12,margin:'8px 0'}}/>}
      <h3>What</h3><div dangerouslySetInnerHTML={clean(settings.what_md)} />
      <h3>Why</h3><div dangerouslySetInnerHTML={clean(settings.why_md)} />
      <h3>How (Enterprise)</h3><div dangerouslySetInnerHTML={clean(settings.how_enterprise_md)} />
      <h3>How (Projects)</h3><div dangerouslySetInnerHTML={clean(settings.how_project_md)} />
      <h3>Risk Treatment Guidelines</h3><div dangerouslySetInnerHTML={clean(settings.treatment_guidelines_md)} />
      <div style={{marginTop:12}}><a className="card" href={settings.github_repo_url || 'https://github.com/gotaker/ITRM_App'} target="_blank" rel="noreferrer">GitHub: contribute improvements</a></div>
    </div>
    <div className="section"><h2>My Projects</h2>{projects.length===0 ? <div className="helper">No projects yet.</div> : <ul>{projects.map(p=> <li key={p.id}>{p.name} <span className="helper">({p.code||'—'})</span></li>)}</ul>}</div>
  </div>)
}
