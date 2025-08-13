import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function Home(){
  return <div style={{padding:16}}>
    <h1>Enterprise Risk — It works ✅</h1>
    <p>If this shows, React is mounted. Now wire your real routes.</p>
  </div>
}

const router = createBrowserRouter([{ path: '/', element: <Home/> }])

const el = document.getElementById('root')
if(!el) throw new Error('Root element #root not found')
createRoot(el).render(<StrictMode><RouterProvider router={router}/></StrictMode>)
// This file is the entry point for the React application.