import React from 'react'
import RiskTreatmentMatrix from '../../components/RiskTreatmentMatrix'
import { useAppSettings } from '../../state/useSettings'

export default function Heatmap(){
  const { settings } = useAppSettings()
  return (
    <div className="section">
      <h2>Heatmap</h2>
      <RiskTreatmentMatrix
        greenMax={settings.green_max ?? 3}
        amberMax={settings.amber_max ?? 11}
        anchorP={settings.appetite_anchor_p ?? 3}
        anchorI={settings.appetite_anchor_i ?? 3}
        bend={settings.appetite_bend ?? 0}
      />
    </div>
  )
}
