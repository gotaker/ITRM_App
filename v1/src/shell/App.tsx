import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAppSettings } from '../state/useSettings'

export default function App(){
  useAppSettings(); // ensure DB/open and settings load
  return (
    <div>
      <div className="topbar">
        <div className="brand"><div className="logo"></div> Enterprise Risk</div>
        <div className="nav">
          <NavLink to="/overview">Overview</NavLink>
          <NavLink to="/settings/scoring">Settings</NavLink>
        </div>
      </div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}
