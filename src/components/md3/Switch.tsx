import React from 'react'
type Props = { label?:string; checked:boolean; onChange:(c:boolean)=>void }
export default function Switch({label, checked, onChange}:Props){
  return <label className="md3-switch">
    <input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)}/>
    <span className="track"><span className="thumb"/></span>
    {label && <span className="md3-label">{label}</span>}
  </label>
}
