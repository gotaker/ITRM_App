import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './shell/App'
import Overview from './features/overview/Overview'
import ScoringSettings from './features/settings/Scoring'
import './styles/index.css'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Overview /> },
    { path: 'overview', element: <Overview /> },
    { path: 'settings/scoring', element: <ScoringSettings /> },
  ]},
])

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
