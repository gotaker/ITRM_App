import React from 'react'
import Page from '../../components/Page'
import TextField from '../../components/md3/TextField'
import TextArea from '../../components/md3/TextArea'
import Button from '../../components/md3/Button'
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
  return (<Page title="Settings — Branding & Content" actions={<Button variant="tonal" onClick={persist}>Save</Button>}>
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
      <div className="md3-card" style={{display:'grid', gap:10}}>
        <TextField label="Hero image URL" value={hero} onChange={e=>setHero((e.target as HTMLInputElement).value)} />
        <TextField label="Hero alt text" value={alt} onChange={e=>setAlt((e.target as HTMLInputElement).value)} />
        <TextField label="GitHub repo URL" value={repo} onChange={e=>setRepo((e.target as HTMLInputElement).value)} />
      </div>
      <div className="md3-card" style={{display:'grid', gap:10}}>
        <TextArea label="What (Markdown)" value={what} onChange={e=>setWhat((e.target as HTMLTextAreaElement).value)} />
        <TextArea label="Why (Markdown)" value={why} onChange={e=>setWhy((e.target as HTMLTextAreaElement).value)} />
        <TextArea label="How — Enterprise (Markdown)" value={howE} onChange={e=>setHowE((e.target as HTMLTextAreaElement).value)} />
        <TextArea label="How — Projects (Markdown)" value={howP} onChange={e=>setHowP((e.target as HTMLTextAreaElement).value)} />
        <TextArea label="FAQ (JSON array)" value={faq} onChange={e=>setFaq((e.target as HTMLTextAreaElement).value)} />
        <TextArea label="Treatment Guidelines (Markdown)" value={treat} onChange={e=>setTreat((e.target as HTMLTextAreaElement).value)} />
      </div>
    </div>
  </Page>)
}
