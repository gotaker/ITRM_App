import React from 'react'
import Page from '../components/Page'
import DataTable from '../components/md3/DataTable'
import Select from '../components/md3/Select'
import TextField from '../components/md3/TextField'
import { openDb, query } from '../db/sqlite'
import { useAppSettings } from '../state/useSettings'

const ENTERPRISE_CATEGORIES = ['IT Strategy','Business Operation Risk','Legal Risk','IT Operation Risk','Information Security','Change Management Risk']
const PROJECT_CATEGORIES = ['Quality','Time','Cost','Deployment – Implementation','Value realization','Enterprise risks during project']
type Scope = 'Enterprise'|'Project'

export default function Reports(){
  const { settings } = useAppSettings()
  const [scope,setScope]=React.useState<Scope>('Project')
  const [topN,setTopN]=React.useState<number>(settings.default_top_n||5)
  const [catMeans,setCatMeans]=React.useState<any[]>([])
  const [topList,setTopList]=React.useState<any[]>([])
  const [highestPerCat,setHighestPerCat]=React.useState<any[]>([])
  const categories = scope==='Enterprise' ? ENTERPRISE_CATEGORIES : PROJECT_CATEGORIES

  React.useEffect(()=>{ (async()=>{
    await openDb()
    const whereScope = scope==='Enterprise' ? "perspective='Enterprise'" : "perspective='Project'"
    const means:any[]=[]
    for(const cat of categories){
      const rows = query(`SELECT pre.probability p, pre.impact i FROM risks r LEFT JOIN assessments pre ON pre.risk_id=r.id AND pre.phase='pre' WHERE r.category=? AND r.${whereScope} AND pre.probability IS NOT NULL AND pre.impact IS NOT NULL`, [cat])
      if(rows.length){ const ap=rows.reduce((s:any,r:any)=>s+(r.p||0),0)/rows.length; const ai=rows.reduce((s:any,r:any)=>s+(r.i||0),0)/rows.length; means.push({ category:cat, avgP:+ap.toFixed(2), avgI:+ai.toFixed(2), avgScore:+(ap*ai).toFixed(2) }) }
      else { means.push({ category:cat, avgP:'—', avgI:'—', avgScore:'—' }) }
    }
    setCatMeans(means)
    setTopList(query(`SELECT r.title,r.category, pre.probability p, pre.impact i, (pre.probability*pre.impact) s FROM risks r LEFT JOIN assessments pre ON pre.risk_id=r.id AND pre.phase='pre' WHERE r.${whereScope} AND pre.probability IS NOT NULL AND pre.impact IS NOT NULL ORDER BY s DESC LIMIT ${topN}`))
    const high:any[]=[]
    for(const cat of categories){
      const r=query(`SELECT r.title, pre.probability p, pre.impact i, (pre.probability*pre.impact) s FROM risks r LEFT JOIN assessments pre ON pre.risk_id=r.id AND pre.phase='pre' WHERE r.category=? AND r.${whereScope} AND pre.probability IS NOT NULL AND pre.impact IS NOT NULL ORDER BY s DESC LIMIT 1`,[cat])[0]
      if(r) high.push({ category:cat, ...r })
    }
    setHighestPerCat(high)
  })() },[scope,topN])

  return (<Page title="Reports">
    <div className="md3-card" style={{display:'flex', gap:12}}>
      <Select label="Scope" value={scope} onChange={e=>setScope(e.target.value as Scope)}><option>Project</option><option>Enterprise</option></Select>
      <TextField label="Top N" type="number" value={String(topN)} onChange={e=>setTopN(Number(e.target.value)) as any}/>
    </div>
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12}}>
      <div className="md3-card"><h3>Top {topN}</h3><DataTable columns={[{key:'title',title:'Title'},{key:'category',title:'Category'},{key:'p',title:'P'},{key:'i',title:'I'},{key:'s',title:'Score'}]} rows={topList}/></div>
      <div className="md3-card"><h3>Category means (pre)</h3><DataTable columns={[{key:'category',title:'Category'},{key:'avgP',title:'P̄'},{key:'avgI',title:'Ī'},{key:'avgScore',title:'Scorē'}]} rows={catMeans}/></div>
      <div className="md3-card"><h3>Highest per category</h3><DataTable columns={[{key:'category',title:'Category'},{key:'title',title:'Title'},{key:'p',title:'P'},{key:'i',title:'I'},{key:'s',title:'Score'}]} rows={highestPerCat}/></div>
    </div>
  </Page>)
}
