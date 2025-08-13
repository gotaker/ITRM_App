import React from 'react'
import { openDb, query, run } from '../../db/sqlite'

const PROJECT_CATEGORIES = ['Quality','Time','Cost','Deployment – Implementation','Value realization','Enterprise risks during project']
const ENTERPRISE_CATEGORIES = ['IT Strategy','Business Operation Risk','Legal Risk','IT Operation Risk','Information Security','Change Management Risk']

type Q = { id:string; category_code:string; risk_topic:string; question_text:string }

function uid(){ return 'id_'+Math.random().toString(36).slice(2) }

export default function Wizard(){
  const [scope,setScope]=React.useState<'Project'|'Enterprise'>('Project')
  const [category,setCategory]=React.useState<string>('Quality')
  const [qs,setQs]=React.useState<Q[]>([])
  const [title,setTitle]=React.useState('')
  const [p,setP]=React.useState(1)
  const [i,setI]=React.useState(1)
  const [owner,setOwner]=React.useState('')
  const [cost,setCost]=React.useState<number|''>('')

  React.useEffect(()=>{ (async()=>{
    await openDb()
    const rows=query<Q>('SELECT * FROM questions WHERE scope=? AND category_code=?',[scope,category])
    setQs(rows)
  })() },[scope,category])

  async function createRisk(e:React.FormEvent){
    e.preventDefault()
    await openDb()
    const riskId = uid()
    run(`INSERT INTO risks (id, project_id, title, code, category, status, owner, perspective, mitigation_cost)
         VALUES (?,?,?,?,?,'Open',?, ?, ?)`,
         [riskId, null, title || `${category}: ${qs[0]?.risk_topic||'New risk'}`, null, category, owner||'', scope, cost||null])
    run(`INSERT INTO assessments (id, risk_id, phase, probability, impact) VALUES (?,?,?,?,?)`,
        [uid(), riskId, 'pre', p, i])
    alert('Risk created')
  }

  const categories = scope==='Project' ? PROJECT_CATEGORIES : ENTERPRISE_CATEGORIES

  return (<div className="section">
    <h2>Guided assessment</h2>
    <div className="grid" style={{gridTemplateColumns:'1fr 2fr', gap:12}}>
      <div className="card">
        <label>Scope <select value={scope} onChange={e=>{const sc=e.target.value as 'Project'|'Enterprise'; setScope(sc); setCategory((sc==='Project'?PROJECT_CATEGORIES:ENTERPRISE_CATEGORIES)[0])}}>
          <option>Project</option><option>Enterprise</option></select></label>
        <label>Category <select value={category} onChange={e=>setCategory(e.target.value)}>
          {categories.map(c=> <option key={c}>{c}</option>)}
        </select></label>
        <div className="helper">Answer questions and set initial P/I to create a new risk.</div>
      </div>
      <div className="card">
        <h3>Questions</h3>
        {qs.length===0 ? <div className="helper">No questions seeded for this category.</div> :
          <ol>{qs.map(q=> <li key={q.id}><b>{q.risk_topic}</b><div className="helper">{q.question_text}</div></li>)}</ol>}
      </div>
    </div>
    <form onSubmit={createRisk} className="card" style={{marginTop:12, display:'grid', gap:8}}>
      <label>Title <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Short risk title"/></label>
      <div style={{display:'flex', gap:8}}>
        <label>P <input type="number" min={1} max={5} value={p} onChange={e=>setP(Number(e.target.value))}/></label>
        <label>I <input type="number" min={1} max={5} value={i} onChange={e=>setI(Number(e.target.value))}/></label>
        <label>Owner <input value={owner} onChange={e=>setOwner(e.target.value)} placeholder="Name or team"/></label>
        <label>Mitigation cost <input type="number" min={0} step="0.01" value={cost as any} onChange={e=>setCost(e.target.value===''?'':Number(e.target.value))}/></label>
      </div>
      <button className="card" type="submit">Create risk</button>
    </form>
  </div>)
}
