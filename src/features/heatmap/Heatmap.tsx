import React from 'react'
import { useAppSettings } from '../../state/useSettings'
import RiskTreatmentMatrix from '../../components/RiskTreatmentMatrix'
import { useNavigate } from 'react-router-dom'
import { openDb, query } from '../../db/sqlite'

const ENTERPRISE_CATEGORIES = ['IT Strategy','Business Operation Risk','Legal Risk','IT Operation Risk','Information Security','Change Management Risk']
const PROJECT_CATEGORIES = ['Quality','Time','Cost','Deployment – Implementation','Value realization','Enterprise risks during project']

type ViewScope = 'Enterprise'|'Project'
type ViewChoice = 'All categories'|'Five highest'|string // string = a specific category
type Point = { id:string; p:number; i:number }

function usePoints(scope:ViewScope, view:ViewChoice, topN:number):Point[]{
  const [pts,setPts]=React.useState<Point[]>([])
  React.useEffect(()=>{ (async()=>{
    await openDb()
    const whereScope = scope === 'Enterprise' ? "r.perspective='Enterprise'" : "r.perspective='Project'"
    let where = whereScope
    let order = "COALESCE(pre.probability,0)*COALESCE(pre.impact,0) DESC"
    let bind:any[]=[]
    if(view!=='All categories' && view!=='Five highest'){
      where += " AND r.category=?"; bind.push(view)
    }
    const baseSql = `SELECT r.id, pre.probability as p, pre.impact as i
                     FROM risks r LEFT JOIN assessments pre ON pre.risk_id=r.id AND pre.phase='pre'
                     WHERE ${where} ORDER BY ${order}`
    const rows:any[] = query(baseSql, bind)
    const picked = view==='Five highest' ? rows.slice(0, topN) : rows
    setPts(picked.filter(r=>r.p && r.i).map((r:any)=>({ id:r.id, p:r.p, i:r.i })))
  })() },[scope,view,topN])
  return pts
}

function ScatterOverlay({cells, points, jitter=0.0}:{cells:4|5, points:Point[], jitter:number}){
  const W=cells===5?620:560, H=W, GAP=10, cell=(W-GAP*(cells-1))/cells
  function pos(p:number,i:number){
    const col=p-1, row=(cells-i)
    const x=col*(cell+GAP), y=row*(cell+GAP)
    const jx=(Math.random()-0.5)*jitter*cell, jy=(Math.random()-0.5)*jitter*cell
    return { cx:x+cell/2+jx, cy:y+cell/2+jy }
  }
  return (<svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{position:'absolute',left:0,top:0}}>
    {points.map(pt=>{ const {cx,cy}=pos(pt.p,pt.i); return <circle key={pt.id} cx={cx} cy={cy} r={6} fill="rgba(30,41,59,0.85)"></circle>})}
  </svg>)
}

export default function Heatmap(){
  const nav=useNavigate()
  const { settings, save } = useAppSettings()
  const [cells,setCells]=React.useState<4|5>((settings.grid_cells as 4|5)||4)
  const [green,setGreen]=React.useState(settings.green_max||3)
  const [amber,setAmber]=React.useState(settings.amber_max||11)
  const [bend,setBend]=React.useState(settings.appetite_bend||0)
  const [scope,setScope]=React.useState<ViewScope>('Project')
  const [view,setView]=React.useState<ViewChoice>('All categories')
  const [showPoints,setShowPoints]=React.useState<boolean>(false)
  const [jitter,setJitter]=React.useState<number>(settings.scatter_jitter||0)
  const [topN,setTopN]=React.useState<number>(settings.default_top_n||5)

  const categories = scope==='Enterprise' ? ENTERPRISE_CATEGORIES : PROJECT_CATEGORIES
  const points = usePoints(scope, view, topN)

  function onCell(p:number,i:number,s:number){ nav(`/risks?p=${p}&i=${i}`) }
  async function persist(){ await save({ grid_cells: cells, green_max: green, amber_max: amber, appetite_bend: bend, scatter_jitter: jitter, default_top_n: topN }) }

  return (<div className="section">
    <h2>Heatmap</h2>
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
      <div style={{position:'relative'}}>
        <RiskTreatmentMatrix cells={cells} greenMax={green} amberMax={amber} bend={bend} onCellClick={onCell}/>
        {showPoints && <ScatterOverlay cells={cells} points={points} jitter={jitter}/>}
      </div>
      <div className="card">
        <div className="helper">Settings</div>
        <label>Scope: <select value={scope} onChange={e=>setScope(e.target.value as ViewScope)}>
          <option>Project</option><option>Enterprise</option></select></label>
        <label style={{marginTop:6}}>View: <select value={view} onChange={e=>setView(e.target.value as ViewChoice)}>
          <option>All categories</option><option>Five highest</option>
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select></label>
        <div style={{display:'grid',gap:8,marginTop:10}}>
          <label>Grid <select value={cells} onChange={e=>setCells(Number(e.target.value) as any)}><option value={4}>4×4</option><option value={5}>5×5</option></select></label>
          <label>Green max <input type="number" min={1} max={25} value={green} onChange={e=>setGreen(Number(e.target.value))}/></label>
          <label>Amber max <input type="number" min={green+1} max={25} value={amber} onChange={e=>setAmber(Number(e.target.value))}/></label>
          <label>Bend <input type="range" min={-1} max={1} step={0.05} value={bend} onChange={e=>setBend(Number(e.target.value))}/> {bend}</label>
          <hr/>
          <label><input type="checkbox" checked={showPoints} onChange={e=>setShowPoints(e.target.checked)}/> Show points (scatter)</label>
          <label>Jitter <input type="range" min={0} max={0.6} step={0.02} value={jitter} onChange={e=>setJitter(Number(e.target.value))}/> {jitter.toFixed(2)}</label>
          <label>Top N (for “Five highest”) <input type="number" min={1} max={25} value={topN} onChange={e=>setTopN(Number(e.target.value))}/></label>
          <button className="card" onClick={persist}>Save</button>
        </div>
      </div>
    </div>
  </div>)
}
