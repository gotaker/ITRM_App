import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import MD3Theme from '../components/md3/Theme'

export default function App(){
  return (<MD3Theme>
    <div style={{display:'grid', gap:12, padding:16}}>
      <header style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <Link to="/" style={{textDecoration:'none', color:'#0f172a', fontWeight:800}}>Enterprise Risk</Link>
        <nav style={{display:'flex', gap:12}}>
          <Link to="/overview">Overview</Link>
          <Link to="/heatmap">Heatmap</Link>
          <Link to="/risks">Risks</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/settings/scoring">Settings</Link>
        </nav>
      </header>
      <Outlet/>
    </div>
  </MD3Theme>)
}
