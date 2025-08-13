import React from 'react'
import Page from '../../components/Page'
import Select from '../../components/md3/Select'
import Switch from '../../components/md3/Switch'
import Slider from '../../components/md3/Slider'
import Button from '../../components/md3/Button'
import RiskTreatmentMatrix from '../../components/RiskTreatmentMatrix'
import { useNavigate } from 'react-router-dom'
import { openDb, query } from '../../db/sqlite'
import { useAppSettings } from '../../state/useSettings'

const ENTERPRISE_CATEGORIES = ['IT Strategy','Business Operation Risk','Legal Risk','IT Operation Risk','Information Security','Change Management Risk']
const PROJECT_CATEGORIES = ['Quality','Time','Cost','Deployment – Implementation','Value realization','Enterprise risks during project']

type ViewScope = 'Enterprise'|'Project'
type ViewChoice = 'All categories'|'Five highest'|string
type Point = { id:string; p:number; i:number }

function usePoints(scope:ViewScope, view:ViewChoice, topN:number):Point[]{
  const [pts,setPts]=React.useState<Point[]>([])
  React.useEffect(()=>{ (async()=>{
    await openDb()
    const whereScope = scope === 'Enterprise' ? "r.perspective='Enterprise'" : "r.perspective='Project'"
    let where = whereScope, bind:any[]=[]
    if(view!=='All categories' && view!=='Five highest'){ where += " AND r.category=?"; bind.push(view) }
    const rows:any[] = query(`SELECT r.id, pre.probability p, pre.impact i FROM risks r LEFT JOIN assessments pre ON pre.risk_id=r.id AND pre.phase='pre' WHERE ${where} ORDER BY (pre.probability*pre.impact) DESC`, bind)
    const picked = view==='Five highest' ? rows.slice(0, topN) : rows
    setPts(picked.filter(r=>r.p&&r.i).map((r:any)=>({id:r.id,p:r.p,i:r.i})))
  })() },[scope,view,topN])
  return pts
}

function ScatterOverlay({cells, points, jitter=0.0}:{cells:4|5, points:Point[], jitter:number}){
  const W=cells===5?620:560, H=W, GAP=10, cell=(W-GAP*(cells-1))/cells
  function pos(p:number,i:number){ const col=p-1,row=(cells-i),x=col*(cell+GAP),y=row*(cell+GAP); const jx=(Math.random()-0.5)*jitter*cell,jy=(Math.random()-0.5)*jitter*cell; return { cx:x+cell/2+jx, cy:y+cell/2+jy } }
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
  const onCell=(p:number,i:number,s:number)=> nav(`/risks?p=${p}&i=${i}`)
  const persist=async()=>{ await save({ grid_cells:cells, green_max:green, amber_max:amber, appetite_bend:bend, scatter_jitter:jitter, default_top_n:topN }) }

  return (<Page title="Heatmap" actions={<Button onClick={persist} variant="tonal">Save</Button>}>
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
      <div style={{position:'relative'}} className="md3-card">
        <RiskTreatmentMatrix cells={cells} greenMax={green} amberMax={amber} bend={bend} onCellClick={onCell}/>
        {showPoints && <ScatterOverlay cells={cells} points={points} jitter={jitter}/>}
      </div>
      <div className="md3-card" style={{display:'grid', gap:10}}>
        <Select label="Scope" value={scope} onChange={(e)=>setScope(e.target.value as ViewScope)}>
          <option>Project</option><option>Enterprise</option>
        </Select>
        <Select label="View" value={view} onChange={(e)=>setView(e.target.value as ViewChoice)}>
          <option>All categories</option><option>Five highest</option>
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </Select>
        <Select label="Grid" value={String(cells)} onChange={(e)=>setCells(Number(e.target.value) as any)}>
          <option value="4">4×4</option><option value="5">5×5</option>
        </Select>
        <TextField label="Green max" type="number" value={String(green)} onChange={(e)=>setGreen(Number(e.target.value)) as any}/>
        <TextField label="Amber max" type="number" value={String(amber)} onChange={(e)=>setAmber(Number(e.target.value)) as any}/>
        <Slider label="Appetite bend" min={-1} max={1} step={0.05} value={bend} onChange={setBend}/>
        <Switch label="Show points (scatter)" checked={showPoints} onChange={setShowPoints}/>
        <Slider label="Jitter" min={0} max={0.6} step={0.02} value={jitter} onChange={setJitter}/>
        <TextField label='Top N (for "Five highest")' type="number" value={String(topN)} onChange={e=>setTopN(Number(e.target.value)) as any}/>
      </div>
    </div>
  </Page>)
}
