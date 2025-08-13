import React from 'react'
import { openDb, query, run } from '../../db/sqlite'

export default function DataSettings(){
  const [exportJson,setExportJson]=React.useState<string>('')
  async function doExport(){
    await openDb()
    const tables=['app_settings','users','projects','project_members','risks','assessments','uploads','questions']
    const dump:any={}
    for(const t of tables){ dump[t]=query(`SELECT * FROM ${t}`) }
    setExportJson(JSON.stringify(dump,null,2))
  }
  async function doImport(e:React.ChangeEvent<HTMLInputElement>){
    const f=e.target.files?.[0]; if(!f) return
    const text=await f.text(); const data=JSON.parse(text)
    await openDb()
    for(const t of Object.keys(data)){
      const rows=data[t]; if(!Array.isArray(rows)) continue
      for(const r of rows){
        const cols=Object.keys(r); const placeholders=cols.map(()=>'?').join(',')
        const sql=`INSERT OR REPLACE INTO ${t} (${cols.join(',')}) VALUES (${placeholders})`
        run(sql, cols.map(c=>r[c]))
      }
    }
    alert('Import done')
  }
  return (<div className="section"><h2>Settings — Data</h2>
    <div className="card">
      <button className="card" onClick={doExport}>Export (JSON)</button>
      {exportJson && <textarea rows={14} style={{width:'100%'}} value={exportJson} readOnly/>}
    </div>
    <div className="card">
      <label>Import JSON <input type="file" accept="application/json" onChange={doImport}/></label>
      <div className="helper">This imports JSON created by the Export above.</div>
    </div>
  </div>)
}
