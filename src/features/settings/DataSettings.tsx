import React from 'react'
import Page from '../../components/Page'
import Button from '../../components/md3/Button'
import TextArea from '../../components/md3/TextArea'
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
  return (<Page title="Settings — Data">
    <div className="md3-card">
      <Button variant="tonal" onClick={doExport}>Export (JSON)</Button>
      {exportJson && <div style={{marginTop:10}}><TextArea label="Export" value={exportJson} readOnly/></div>}
    </div>
    <div className="md3-card">
      <input type="file" accept="application/json" onChange={doImport}/>
      <div className="md3-helper">This imports JSON created by the Export above.</div>
    </div>
  </Page>)
}
