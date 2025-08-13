import React from 'react'
import { useAppSettings } from '../../state/useSettings'
import RiskTreatmentMatrix from '../../components/RiskTreatmentMatrix'
import { useNavigate } from 'react-router-dom'
export default function Heatmap(){
  const nav=useNavigate(); const { settings, save } = useAppSettings()
  const [cells,setCells]=React.useState<4|5>((settings.grid_cells as 4|5)||4)
  const [green,setGreen]=React.useState(settings.green_max||3)
  const [amber,setAmber]=React.useState(settings.amber_max||11)
  const [bend,setBend]=React.useState(settings.appetite_bend||0)
  function onCell(p:number,i:number,s:number){ nav(`/risks?p=${p}&i=${i}`) }
  async function persist(){ await save({ grid_cells: cells, green_max: green, amber_max: amber, appetite_bend: bend }) }
  return (<div className="section"><h2>Heatmap</h2>
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
      <RiskTreatmentMatrix cells={cells} greenMax={green} amberMax={amber} bend={bend} onCellClick={onCell}/>
      <div className="card">
        <div className="helper">Settings</div>
        <label>Grid: <select value={cells} onChange={e=>setCells(Number(e.target.value) as any)}><option value={4}>4×4</option><option value={5}>5×5</option></select></label>
        <div style={{display:'grid',gap:8,marginTop:10}}>
          <label>Green max <input type="number" min={1} max={25} value={green} onChange={e=>setGreen(Number(e.target.value))}/></label>
          <label>Amber max <input type="number" min={green+1} max={25} value={amber} onChange={e=>setAmber(Number(e.target.value))}/></label>
          <label>Bend <input type="range" min={-1} max={1} step={0.05} value={bend} onChange={e=>setBend(Number(e.target.value))}/> {bend}</label>
          <button className="card" onClick={persist}>Save</button>
        </div>
      </div>
    </div>
  </div>)
}
