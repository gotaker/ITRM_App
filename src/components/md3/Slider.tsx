import React from 'react'
type Props = { label?:string; min?:number; max?:number; step?:number; value:number; onChange:(v:number)=>void }
export default function Slider({label, min=0, max=100, step=1, value, onChange}:Props){
  return <div className="md3-slider">
    {label && <div className="md3-label">{label} <span className="md3-helper">{value}</span></div>}
    <input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}/>
  </div>
}
