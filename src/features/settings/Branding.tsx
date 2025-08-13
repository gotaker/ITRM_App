import React from 'react'
import { useAppSettings } from '../../state/useSettings'

export default function Branding(){
  const { settings, save } = useAppSettings()
  const [hero,setHero]=React.useState(settings.hero_url||'')
  const [alt,setAlt]=React.useState(settings.hero_alt||'')
  const [repo,setRepo]=React.useState(settings.github_repo_url||'https://github.com/gotaker/ITRM_App')
  const [what,setWhat]=React.useState(settings.what_md||'')
  const [why,setWhy]=React.useState(settings.why_md||'')
  const [howE,setHowE]=React.useState(settings.how_enterprise_md||'')
  const [howP,setHowP]=React.useState(settings.how_project_md||'')
  const [faq,setFaq]=React.useState(settings.faq_json||'[]')
  const [treat,setTreat]=React.useState(settings.treatment_guidelines_md||'')
  async function persist(){ await save({ hero_url:hero, hero_alt:alt, github_repo_url:repo, what_md:what, why_md:why, how_enterprise_md:howE, how_project_md:howP, faq_json:faq, treatment_guidelines_md:treat }) }
  return (<div className="section"><h2>Settings — Branding & Content</h2>
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
      <div className="card">
        <label>Hero image URL <input value={hero} onChange={e=>setHero(e.target.value)}/></label>
        <label>Hero alt text <input value={alt} onChange={e=>setAlt(e.target.value)}/></label>
        <label>GitHub repo URL <input value={repo} onChange={e=>setRepo(e.target.value)}/></label>
        <button className="card" onClick={persist}>Save</button>
      </div>
      <div className="card">
        <label>What (Markdown) <textarea rows={4} value={what} onChange={e=>setWhat(e.target.value)}/></label>
        <label>Why (Markdown) <textarea rows={4} value={why} onChange={e=>setWhy(e.target.value)}/></label>
        <label>How — Enterprise (Markdown) <textarea rows={4} value={howE} onChange={e=>setHowE(e.target.value)}/></label>
        <label>How — Projects (Markdown) <textarea rows={4} value={howP} onChange={e=>setHowP(e.target.value)}/></label>
        <label>FAQ (JSON array) <textarea rows={4} value={faq} onChange={e=>setFaq(e.target.value)}/></label>
        <label>Treatment Guidelines (Markdown) <textarea rows={4} value={treat} onChange={e=>setTreat(e.target.value)}/></label>
      </div>
    </div>
  </div>)
}
