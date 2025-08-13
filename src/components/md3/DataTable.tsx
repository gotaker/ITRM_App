import React from 'react'
type Col<T> = { key: keyof T; title: string; width?:string }
type Props<T> = { columns: Col<T>[]; rows: T[] }
export default function DataTable<T extends Record<string,any>>({columns, rows}:Props<T>){
  return <table className="md3-table">
    <thead><tr>{columns.map(c=><th key={String(c.key)} style={{width:c.width}}>{c.title}</th>)}</tr></thead>
    <tbody>{rows.map((r,idx)=>(<tr key={idx}>{columns.map(c=><td key={String(c.key)}>{String(r[c.key]??'')}</td>)}</tr>))}</tbody>
  </table>
}
