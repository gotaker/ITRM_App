import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { openDb, query } from '../../db/sqlite'
import Page from '../../components/Page'
import DataTable from '../../components/md3/DataTable'
import Button from '../../components/md3/Button'
import TextField from '../../components/md3/TextField'

type Row = {
  id:string; code?:string; title:string; category?:string; status?:string; owner?:string; mitigation_cost?:number|string;
  pre_p?:number; pre_i?:number; post_p?:number; post_i?:number
}

export default function Risks(){
  const [params] = useSearchParams(); const nav=useNavigate()
  const pf=Number(params.get('p')||0), ip=Number(params.get('i')||0)
  const [rows,setRows] = React.useState<Row[]>([])
  const [q,setQ] = React.useState('')

  React.useEffect(()=>{ (async()=>{
    await openDb()
    let where='1=1',bind:any[]=[]
    if(pf){where+=' AND a.probability=?';bind.push(pf)}
    if(ip){where+=' AND a.impact=?';bind.push(ip)}
    const sql=`
      SELECT r.id,r.title,r.code,r.category,r.status,r.owner,r.mitigation_cost,
             pre.probability as pre_p, pre.impact as pre_i,
             post.probability as post_p, post.impact as post_i
      FROM risks r
      LEFT JOIN assessments pre ON pre.risk_id=r.id AND pre.phase='pre'
      LEFT JOIN assessments post ON post.risk_id=r.id AND post.phase='post'
      LEFT JOIN assessments a ON a.risk_id=r.id AND a.phase='pre'
      WHERE ${where}
      ORDER BY COALESCE(pre.probability,0)*COALESCE(pre.impact,0) DESC, r.created_at DESC`
    setRows(query<Row>(sql,bind))
  })() },[pf,ip])

  const score=(p?:number,i?:number)=> (p||0)*(i||0) || ''
  const filtered = rows.filter(r=>{
    if(!q) return true
    const hay = `${r.title} ${r.category||''} ${r.code||''} ${r.owner||''}`.toLowerCase()
    return hay.includes(q.toLowerCase())
  }).map(r=>({...r, pre_score:score(r.pre_p,r.pre_i), post_score:score(r.post_p,r.post_i)}))

  return (<Page title={`Risks ${pf||ip ? '(filtered)' : ''}`} actions={<Button onClick={()=>nav('/assess')}>+ Guided assessment</Button>}>
    <div className="md3-card"><TextField label="Search" placeholder="Title, category, code, owner…" value={q} onChange={e=>setQ((e.target as HTMLInputElement).value)} /></div>
    <div className="md3-card">
      <DataTable<Row> columns={[
        {key:'code', title:'Code', width:'10%'},
        {key:'title', title:'Title', width:'28%'},
        {key:'category', title:'Category', width:'16%'},
        {key:'status', title:'Status', width:'10%'},
        {key:'owner', title:'Owner', width:'12%'},
        {key:'mitigation_cost', title:'Mitigation cost', width:'10%'},
        {key:'pre_p', title:'Pre P'},{key:'pre_i', title:'Pre I'},{key:'pre_score', title:'Pre Score'},
        {key:'post_p', title:'Post P'},{key:'post_i', title:'Post I'},{key:'post_score', title:'Post Score'}
      ]} rows={filtered}/>
    </div>
  </Page>)
}
