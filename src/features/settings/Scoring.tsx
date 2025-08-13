import React from 'react'
import Page from '../../components/Page'
import Select from '../../components/md3/Select'
import TextField from '../../components/md3/TextField'
import Slider from '../../components/md3/Slider'
import Button from '../../components/md3/Button'
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
  return (<Page title="Settings — Scoring" actions={<Button variant="tonal" onClick={persist}>Save</Button>}>
    <div className="md3-card" style={{display:'grid', gap:10}}>
      <Select label="Grid" value={String(cells)} onChange={e=>setCells(Number(e.target.value))}><option value="4">4×4</option><option value="5">5×5</option></Select>
      <TextField label="Green max" type="number" value={String(green)} onChange={e=>setGreen(Number(e.target.value)) as any}/>
      <TextField label="Amber max" type="number" value={String(amber)} onChange={e=>setAmber(Number(e.target.value)) as any}/>
      <Slider label="Appetite bend" min={-1} max={1} step={0.05} value={bend} onChange={setBend}/>
      <TextField label="Default Top N" type="number" value={String(topN)} onChange={e=>setTopN(Number(e.target.value)) as any}/>
      <Slider label="Scatter jitter" min={0} max={0.6} step={0.02} value={jitter} onChange={setJitter}/>
    </div>
  </Page>)
}
