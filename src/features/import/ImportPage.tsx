import React from 'react'
import * as XLSX from 'xlsx'
import Page from '../../components/Page'
import Banner from '../../components/md3/Banner'
import DataTable from '../../components/md3/DataTable'
import Select from '../../components/md3/Select'
import Button from '../../components/md3/Button'
import { openDb, run } from '../../db/sqlite'

type Row = Record<string, any>
function uid(){ return 'id_'+Math.random().toString(36).slice(2) }

export default function ImportPage(){
  const [rows,setRows]=React.useState<Row[]>([])
  const [headers,setHeaders]=React.useState<string[]>([])
  const [fileName,setFileName]=React.useState<string>('')
  const [message,setMessage]=React.useState<string>('')
  const [mapping,setMapping]=React.useState<Record<string,string>>({
    'perspective':'Perspective','category':'Category','title':'Risk','code':'Issue or risk','description':'Comments','owner':'Responsible','mitigation_cost':'Mitigation cost','pre_p':'Pre P','pre_i':'Pre I','post_p':'Post P','post_i':'Post I'
  })

  function onFile(e:React.ChangeEvent<HTMLInputElement>){
    const f=e.target.files?.[0]; if(!f) return
    setFileName(f.name)
    const reader=new FileReader()
    reader.onload=()=>{ const wb=XLSX.read(reader.result as ArrayBuffer,{type:'array'}); const ws=wb.Sheets[wb.SheetNames[0]]; const json=XLSX.utils.sheet_to_json<Row>(ws,{header:1}); const hdr=(json.shift() as any[]).map(v=>String(v||'')); const data:Row[]=json.slice(0,50).map(r=>{const o:Row={}; hdr.forEach((h,i)=>o[h]=r[i]); return o}); setHeaders(hdr); setRows(data); setMessage(`Previewing first ${data.length} rows from ${f.name}`) }
    reader.readAsArrayBuffer(f)
  }

  async function commit(){
    if(!rows.length){ setMessage('Nothing to import'); return }
    await openDb()
    for(const r of rows){
      const riskId=uid(), perspective=r[mapping['perspective']]||'Project', title=r[mapping['title']]||'(Imported risk)', code=r[mapping['code']]||null, category=r[mapping['category']]||'', owner=r[mapping['owner']]||'', cost=r[mapping['mitigation_cost']]?Number(r[mapping['mitigation_cost']]):null
      run(`INSERT INTO risks (id, project_id, title, code, category, status, owner, perspective, mitigation_cost, revision_info) VALUES (?, NULL, ?, ?, ?, 'Open', ?, ?, ?, NULL)`,[riskId,title,code,category,owner,perspective,cost])
      const preP=Number(r[mapping['pre_p']])||null, preI=Number(r[mapping['pre_i']])||null, postP=Number(r[mapping['post_p']])||null, postI=Number(r[mapping['post_i']])||null
      if(preP && preI) run(`INSERT INTO assessments (id,risk_id,phase,probability,impact) VALUES (?,?,?,?,?)`,[uid(),riskId,'pre',preP,preI])
      if(postP && postI) run(`INSERT INTO assessments (id,risk_id,phase,probability,impact) VALUES (?,?,?,?,?)`,[uid(),riskId,'post',postP,postI])
    }
    setMessage('Import committed successfully')
  }

  return (<Page title="Excel import" actions={<Button onClick={commit} disabled={!rows.length}>Commit</Button>}>
    <div className="md3-card">
      <input type="file" accept=".xlsx,.xls" onChange={onFile}/>
      {message && <div style={{marginTop:10}}><Banner title="Status">{message}</Banner></div>}
    </div>
    {rows.length>0 && (<div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
      <div className="md3-card">
        <h3>Mapping</h3>
        {Object.keys(mapping).map(k=>(
          <Select key={k} label={k} value={mapping[k]} onChange={e=>setMapping({...mapping,[k]:e.target.value})}>
            <option value="">—</option>
            {headers.map(h=><option key={h} value={h}>{h}</option>)}
          </Select>
        ))}
      </div>
      <div className="md3-card" style={{overflow:'auto', maxHeight:420}}>
        <h3>Preview</h3>
        <DataTable columns={headers.map(h=>({key:h as any, title:h}))} rows={rows}/>
      </div>
    </div>)}
  </Page>)
}
