import React from 'react'
import { useAppSettings } from '../../state/useSettings'

export default function Scoring(){
  const { settings, save } = useAppSettings()
  const [green,setGreen]=React.useState(settings.green_max||3)
  const [amber,setAmber]=React.useState(settings.amber_max||11)
  const [cells,setCells]=React.useState(settings.grid_cells||4)
  const [bend,setBend]=React.useState(settings.appetite_bend||0)
  const [topN,setTopN]=React.useState(settings.default_top_n||5)
  const [jitter,setJitter]=React.useState(settings.scatter_jitter||0)
  async function persist(){ await save({ green_max:green, amber_max:amber, grid_cells:cells, appetite_bend:bend, default_top_n:topN, scatter_jitter:jitter }) }
  return (<div className="section"><h2>Settings — Scoring</h2>
    <div className="card">
      <label>Grid <select value={cells} onChange={e=>setCells(Number(e.target.value))}><option value={4}>4×4</option><option value={5}>5×5</option></select></label>
      <label>Green max <input type="number" value={green} onChange={e=>setGreen(Number(e.target.value))}/></label>
      <label>Amber max <input type="number" value={amber} onChange={e=>setAmber(Number(e.target.value))}/></label>
      <label>Appetite bend <input type="range" min={-1} max={1} step={0.05} value={bend} onChange={e=>setBend(Number(e.target.value))}/> {bend}</label>
      <label>Default Top N <input type="number" min={1} max={25} value={topN} onChange={e=>setTopN(Number(e.target.value))}/></label>
      <label>Scatter jitter <input type="range" min={0} max={0.6} step={0.02} value={jitter} onChange={e=>setJitter(Number(e.target.value))}/> {Number(jitter).toFixed(2)}</label>
      <button className="card" onClick={persist}>Save</button>
    </div>
  </div>)
}
