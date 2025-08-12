import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
export default function App(){
  return (<div>
    <div className="topbar">
      <div className="brand"><div className="logo"></div> Enterprise Risk</div>
      <div className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/overview">Overview</NavLink>
        <NavLink to="/risks">Risks</NavLink>
        <NavLink to="/heatmap">Heatmap</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/settings/scoring">Settings</NavLink>
      </div>
    </div>
    <div className="container"><Outlet/></div>
  </div>)
}
