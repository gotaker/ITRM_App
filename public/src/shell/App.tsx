import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/useAuth'
export default function App(){
  const nav=useNavigate(); const { user, signOut } = useAuth()
  return (<div>
    <div className="topbar">
      <div className="brand"><div className="logo"></div> Enterprise Risk</div>
      <div className="nav" style={{display:'flex',alignItems:'center',gap:8}}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/overview">Overview</NavLink>
        <NavLink to="/risks">Risks</NavLink>
        <NavLink to="/heatmap">Heatmap</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/settings/scoring">Settings</NavLink>
        <span style={{marginLeft:12}}>|</span>
        {user ? (<><span className="helper">Hi, {user.name || user.email}</span><button className="card" onClick={()=>{ signOut(); nav('/auth/sign-in') }}>Sign out</button></>) : (<button className="card" onClick={()=>nav('/auth/sign-in')}>Sign in</button>)}
      </div>
    </div>
    <div className="container"><Outlet/></div>
  </div>)
}
