import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="section">
      <h2>404 — Not found</h2>
      <p>Try going back to the <Link to="/overview">Overview</Link>.</p>
    </div>
  )
}
