import React from 'react'
import * as XLSX from 'xlsx'
import { openDb, run } from '../../db/sqlite'

type Row = Record<string, any>
function uid(){ return 'id_'+Math.random().toString(36).slice(2) }

export default function ImportPage(){
  const [rows,setRows]=React.useState<Row[]>([])
  const [headers,setHeaders]=React.useState<string[]>([])
  const [fileName,setFileName]=React.useState<string>('')
  const [mapping,setMapping]=React.useState<Record<string,string>>({
    'perspective':'Perspective',
    'category':'Category',
    'title':'Risk',
    'code':'Issue or risk',
    'description':'Comments',
    'owner':'Responsible',
    'mitigation_cost':'Mitigation cost',
    'pre_p':'Pre P',
    'pre_i':'Pre I',
    'post_p':'Post P',
    'post_i':'Post I'
  })

  function onFile(e:React.ChangeEvent<HTMLInputElement>){
    const f=e.target.files?.[0]; if(!f) return
    setFileName(f.name)
    const reader=new FileReader()
    reader.onload=()=>{
      const wb = XLSX.read(reader.result as ArrayBuffer, { type:'array' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const json = XLSX.utils.sheet_to_json<Row>(ws, { header:1 })
      const hdr = (json.shift() as any[]).map(v=>String(v||''))
      const data:Row[] = json.slice(0,50).map(r=>{ const o:Row={}; hdr.forEach((h,i)=>o[h]=r[i]); return o })
      setHeaders(hdr); setRows(data)
    }
    reader.readAsArrayBuffer(f)
  }

  async function commit(){
    await openDb()
    for(const r of rows){
      const perspective = r[mapping['perspective']] || 'Project'
      const riskId = uid()
      const title = r[mapping['title']] || '(Imported risk)'
      const code = r[mapping['code']] || null
      const category = r[mapping['category']] || ''
      const desc = r[mapping['description']] || '' // reserved for extension
      const owner = r[mapping['owner']] || ''
      const cost = r[mapping['mitigation_cost']] ? Number(r[mapping['mitigation_cost']]) : null
      run(`INSERT INTO risks (id, project_id, title, code, category, status, owner, perspective, mitigation_cost, revision_info)
           VALUES (?, NULL, ?, ?, ?, 'Open', ?, ?, ?, NULL)`,
          [riskId, title, code, category, owner, perspective, cost])
      const preP = Number(r[mapping['pre_p']])||null, preI=Number(r[mapping['pre_i']])||null
      const postP = Number(r[mapping['post_p']])||null, postI=Number(r[mapping['post_i']])||null
      if(preP && preI) run(`INSERT INTO assessments (id,risk_id,phase,probability,impact) VALUES (?,?,?,?,?)`, [uid(), riskId, 'pre', preP, preI])
      if(postP && postI) run(`INSERT INTO assessments (id,risk_id,phase,probability,impact) VALUES (?,?,?,?,?)`, [uid(), riskId, 'post', postP, postI])
    }
    alert('Import committed')
  }

  return (<div className="section">
    <h2>Excel import</h2>
    <div className="card">
      <input type="file" accept=".xlsx,.xls" onChange={onFile}/>
      <div className="helper">{fileName ? `Loaded ${fileName}` : 'Select a worksheet to preview first 50 rows'}</div>
    </div>
    {rows.length>0 && (<div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
      <div className="card">
        <h3>Mapping</h3>
        {Object.keys(mapping).map(k=>(<div key={k} style={{display:'flex',gap:8,alignItems:'center',marginBottom:6}}>
          <label style={{width:160}}>{k}</label>
          <select value={mapping[k]} onChange={e=>setMapping({...mapping,[k]:e.target.value})}>
            <option value="">—</option>
            {headers.map(h=><option key={h} value={h}>{h}</option>)}
          </select>
        </div>))}
        <button className="card" onClick={commit}>Commit</button>
      </div>
      <div className="card" style={{overflow:'auto',maxHeight:420}}>
        <table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r,i)=>(<tr key={i}>{headers.map(h=><td key={h}>{String(r[h]??'')}</td>)}</tr>))}</tbody></table>
      </div>
    </div>)}
  </div>)
}
