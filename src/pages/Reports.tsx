import React from 'react'
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
    // Category means (pre only for v1; post can be added similarly)
    const means:any[] = []
    for(const cat of categories){
      const rows = query(`SELECT pre.probability as p, pre.impact as i FROM risks r LEFT JOIN assessments pre ON pre.risk_id=r.id AND pre.phase='pre' WHERE r.category=? AND r.${whereScope} AND pre.probability IS NOT NULL AND pre.impact IS NOT NULL`, [cat])
      if(rows.length){
        const avgP = rows.reduce((s:any,r:any)=>s+(r.p||0),0)/rows.length
        const avgI = rows.reduce((s:any,r:any)=>s+(r.i||0),0)/rows.length
        means.push({ category:cat, avgP:+avgP.toFixed(2), avgI:+avgI.toFixed(2), avgScore:+(avgP*avgI).toFixed(2) })
      } else { means.push({ category:cat, avgP:'—', avgI:'—', avgScore:'—' }) }
    }
    setCatMeans(means)

    // Top N
    setTopList(query(`SELECT r.title,r.category, pre.probability as p, pre.impact as i, (pre.probability*pre.impact) as s
                      FROM risks r LEFT JOIN assessments pre ON pre.risk_id=r.id AND pre.phase='pre'
                      WHERE r.${whereScope} AND pre.probability IS NOT NULL AND pre.impact IS NOT NULL
                      ORDER BY s DESC LIMIT ${topN}`))

    // Highest per category
    const high:any[]=[]
    for(const cat of categories){
      const r = query(`SELECT r.title, pre.probability as p, pre.impact as i, (pre.probability*pre.impact) as s
                       FROM risks r LEFT JOIN assessments pre ON pre.risk_id=r.id AND pre.phase='pre'
                       WHERE r.category=? AND r.${whereScope} AND pre.probability IS NOT NULL AND pre.impact IS NOT NULL
                       ORDER BY s DESC LIMIT 1`, [cat])[0]
      if(r) high.push({ category:cat, ...r })
    }
    setHighestPerCat(high)
  })() },[scope,topN])

  return (<div className="section">
    <h2>Reports</h2>
    <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:8}}>
      <label>Scope: <select value={scope} onChange={e=>setScope(e.target.value as Scope)}><option>Project</option><option>Enterprise</option></select></label>
      <label>Top N: <input type="number" min={1} max={25} value={topN} onChange={e=>setTopN(Number(e.target.value))}/></label>
    </div>

    <div className="grid" style={{gridTemplateColumns:'1fr 1fr 1fr'}}>
      <div className="card">
        <h3>Top {topN}</h3>
        <ol>{topList.map((r:any,i:number)=>(<li key={i}>{r.title} <span className="helper">[{r.category}]</span> — P{r.p}×I{r.i} = <b>{r.s}</b></li>))}</ol>
      </div>
      <div className="card">
        <h3>Category means (pre)</h3>
        <table><thead><tr><th>Category</th><th>P̄</th><th>Ī</th><th>Scorē</th></tr></thead>
          <tbody>{catMeans.map((r:any)=>(<tr key={r.category}><td>{r.category}</td><td>{r.avgP}</td><td>{r.avgI}</td><td>{r.avgScore}</td></tr>))}</tbody></table>
      </div>
      <div className="card">
        <h3>Highest per category</h3>
        <ul>{highestPerCat.map((r:any)=>(<li key={r.category}><b>{r.category}</b>: {r.title} — <span className="helper">P{r.p}×I{r.i}</span> = <b>{r.s}</b></li>))}</ul>
      </div>
    </div>
  </div>)
}
