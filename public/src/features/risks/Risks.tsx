import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { openDb, query } from '../../db/sqlite'
export default function Risks(){
  const [params] = useSearchParams(); const pf=Number(params.get('p')||0), ip=Number(params.get('i')||0)
  const [rows,setRows] = React.useState<any[]>([])
  React.useEffect(()=>{ (async()=>{ await openDb(); let where='1=1',bind:any[]=[]; if(pf){where+=' AND a.probability=?';bind.push(pf)} if(ip){where+=' AND a.impact=?';bind.push(ip)} const sql=`SELECT r.id,r.title,r.category,r.status,a.probability,a.impact FROM risks r LEFT JOIN assessments a ON a.risk_id=r.id AND a.phase='pre' WHERE ${where} ORDER BY a.probability*a.impact DESC`; setRows(query(sql,bind)) })() },[pf,ip])
  return (<div className="section"><h2>Risks {pf||ip ? '(filtered)' : ''}</h2>
    <table width="100%" cellPadding="8"><thead><tr><th>Title</th><th>Category</th><th>Status</th><th>P</th><th>I</th><th>Score</th></tr></thead>
      <tbody>{rows.map(r=><tr key={r.id}><td>{r.title}</td><td>{r.category}</td><td>{r.status}</td><td>{r.probability}</td><td>{r.impact}</td><td>{(r.probability||0)*(r.impact||0)}</td></tr>)}</tbody>
    </table>
  </div>)
}
