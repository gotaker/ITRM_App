import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { openDb, query } from '../../db/sqlite'

export default function Risks(){
  const [params] = useSearchParams(); const nav=useNavigate()
  const pf=Number(params.get('p')||0), ip=Number(params.get('i')||0)
  const [rows,setRows] = React.useState<any[]>([])

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
    setRows(query(sql,bind))
  })() },[pf,ip])

  const score=(p?:number,i?:number)=> (p||0)*(i||0) || ''

  return (<div className="section">
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h2>Risks {pf||ip ? '(filtered)' : ''}</h2>
      <button className="card" onClick={()=>nav('/assess')}>+ Guided assessment</button>
    </div>
    <div className="helper" style={{marginBottom:8}}>Tip: filters P={pf||'–'} I={ip||'–'} come from clicking Heatmap cells.</div>
    <table width="100%" cellPadding={8}>
      <thead>
        <tr>
          <th>Code</th><th>Title</th><th>Category</th><th>Status</th><th>Owner</th><th>Mitigation cost</th>
          <th>Pre P</th><th>Pre I</th><th>Pre Score</th>
          <th>Post P</th><th>Post I</th><th>Post Score</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r=>(<tr key={r.id}>
          <td>{r.code||''}</td>
          <td>{r.title}</td>
          <td>{r.category}</td>
          <td>{r.status}</td>
          <td>{r.owner||''}</td>
          <td>{r.mitigation_cost ?? ''}</td>
          <td>{r.pre_p ?? ''}</td>
          <td>{r.pre_i ?? ''}</td>
          <td>{score(r.pre_p,r.pre_i)}</td>
          <td>{r.post_p ?? ''}</td>
          <td>{r.post_i ?? ''}</td>
          <td>{score(r.post_p,r.post_i)}</td>
        </tr>))}
      </tbody>
    </table>
  </div>)
}
