import React from 'react'
import RiskTreatmentMatrix from '../../components/RiskTreatmentMatrix'
import { useAppSettings } from '../../state/useSettings'

export default function Overview(){
  const { settings } = useAppSettings()
  const g = settings.green_max ?? 3
  const a = settings.amber_max ?? 11
  const ap = settings.appetite_anchor_p ?? 3
  const ai = settings.appetite_anchor_i ?? 3
  const bend = settings.appetite_bend ?? 0

  return (
    <div className="grid gap-6">
      <section className="section">
        <h1>Overview</h1>
        <p>Capture, assess, mitigate, and report risks across projects and the enterprise.</p>
        <div style={{display:'flex', gap:8, marginTop:8}}>
          <a className="card" href="/risks">Get started</a>
          <a className="card" href={settings.github_repo_url || 'https://github.com/gotaker/ITRM_App'} target="_blank" rel="noreferrer">View on GitHub</a>
        </div>
      </section>

      <section className="section">
        <h2>Risk Treatment Guidelines</h2>
        <div className="grid" style={{gridTemplateColumns: 'minmax(300px, 1.6fr) minmax(260px, 1fr)'}}>
          <div>
            <RiskTreatmentMatrix greenMax={g} amberMax={a} anchorP={ap} anchorI={ai} bend={bend} />
          </div>
          <div className="grid" style={{alignContent:'start'}}>
            <div className="card">
              <strong>Upper Left Quadrant - Treatment</strong><br/>
              Reduce risk through transferring activities.<br/>
              Typically lower the impact through an insurance or through outsourcing.
            </div>
            <div className="card">
              <strong>Upper Right Quadrant - Treatment</strong><br/>
              Reduce risk through preventive mitigation activities.<br/>
              Typically lower the probability.<br/>
              Residual risk after treatment should never be in the red zone
            </div>
            <div className="card">
              <strong>Lower Right Quadrant - Treatment</strong><br/>
              Reduce risk through controlling, containing and corrective activities.<br/>
              By monitoring/detecting the threat/event in an early stage the probability for severe impact can be lowered.<br/>
              This implies that the event may actually take place but corrective actions are prepared.
            </div>
            <div className="card">
              <strong>Lower Left Quadrant - Treatment</strong><br/>
              Typically accept risk (acceptance of risk should be done by the sponsor)<br/>
              Consider applying  monitoring and/or detective activities.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
