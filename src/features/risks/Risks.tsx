import React from 'react'
import { query } from '../../db/sqlite'

type Risk = { id: string; title: string; category?: string; status?: string; perspective?: string; project_id?: string }

export default function Risks(){
  const [rows, setRows] = React.useState<Risk[]>([])
  React.useEffect(() => {
    (async () => {
      const rs = await query<Risk>(`SELECT id, title, category, status, perspective, project_id FROM risks ORDER BY created_at DESC;`)
      setRows(rs)
    })()
  }, [])

  return (
    <div className="section">
      <h2>Risks</h2>
      <div className="card" style={{overflowX:'auto'}}>
        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead>
            <tr>
              <th style={{textAlign:'left', padding:'8px'}}>Title</th>
              <th style={{textAlign:'left', padding:'8px'}}>Category</th>
              <th style={{textAlign:'left', padding:'8px'}}>Status</th>
              <th style={{textAlign:'left', padding:'8px'}}>Perspective</th>
              <th style={{textAlign:'left', padding:'8px'}}>Project</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td style={{padding:'8px'}}>{r.title}</td>
                <td style={{padding:'8px'}}>{r.category || ''}</td>
                <td style={{padding:'8px'}}>{r.status || ''}</td>
                <td style={{padding:'8px'}}>{r.perspective || ''}</td>
                <td style={{padding:'8px'}}>{r.project_id || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
