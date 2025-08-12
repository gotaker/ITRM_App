import React from 'react'
import '@material/web/slider/slider.js'
import '@material/web/textfield/outlined-text-field.js'
import { useAppSettings } from '../../state/useSettings'

export default function ScoringSettings(){
  const { settings, save } = useAppSettings()
  const s = settings

  return (
    <div className="section">
      <h2>Risk Appetite</h2>
      <div className="grid" style={{gridTemplateColumns:'repeat(3, minmax(200px, 1fr))'}}>
        <div>
          <label>Anchor Probability</label><br/>
          {/* @ts-ignore */}
          <md-slider min="1" max="4" step="1" value={s.appetite_anchor_p ?? 3} oninput={(e:any)=>save({appetite_anchor_p: Number(e.target.value)})}></md-slider>
        </div>
        <div>
          <label>Anchor Impact</label><br/>
          {/* @ts-ignore */}
          <md-slider min="1" max="4" step="1" value={s.appetite_anchor_i ?? 3} oninput={(e:any)=>save({appetite_anchor_i: Number(e.target.value)})}></md-slider>
        </div>
        <div>
          <label>Curvature</label><br/>
          {/* @ts-ignore */}
          <md-slider min="-1" max="1" step="0.1" value={s.appetite_bend ?? 0} oninput={(e:any)=>save({appetite_bend: Number(e.target.value)})}></md-slider>
        </div>
      </div>

      <h2 style={{marginTop:20}}>Score Bands</h2>
      <div className="grid" style={{gridTemplateColumns:'repeat(2, minmax(240px, 1fr))'}}>
        {/* @ts-ignore */}
        <md-outlined-text-field label="Green max (<)" type="number" value={(s.green_max ?? 3)} oninput={(e:any)=>save({green_max: Number(e.target.value)})}></md-outlined-text-field>
        {/* @ts-ignore */}
        <md-outlined-text-field label="Amber max (<=)" type="number" value={(s.amber_max ?? 11)} oninput={(e:any)=>save({amber_max: Number(e.target.value)})}></md-outlined-text-field>
      </div>
      <small>Default bands: Green &lt; 4, Amber 4–11, Red &gt; 11. Values are auto-corrected if out of range.</small>
    </div>
  )
}
