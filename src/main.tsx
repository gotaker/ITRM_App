import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './shell/App'
import Home from './pages/Home'
import Overview from './pages/Overview'
import Risks from './pages/Risks'
import RiskDetailSheet from './pages/RiskDetailSheet'
import Heatmap from './pages/Heatmap'
import Reports from './pages/Reports'
import ScoringSettings from './pages/Scoring'
import Branding from './pages/Branding'
import DataSettings from './pages/DataSettings'
import ImportPage from './pages/ImportPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import VerifyEmail from './pages/VerifyEmail'
import NotFound from './pages/NotFound'
import './styles/index.css'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Home /> },
    { path: 'overview', element: <Overview /> },
    { path: 'risks', element: <Risks /> },
    { path: 'risks/:id', element: <><Risks /><RiskDetailSheet /></> },
    { path: 'heatmap', element: <Heatmap /> },
    { path: 'reports', element: <Reports /> },
    { path: 'settings/scoring', element: <ScoringSettings /> },
    { path: 'settings/branding', element: <Branding /> },
    { path: 'settings/data', element: <DataSettings /> },
    { path: 'import', element: <ImportPage /> },
    { path: '404', element: <NotFound /> },
    { path: '*', element: <NotFound /> },
  ]},
  { path: '/auth', children: [
    { path: 'sign-in', element: <SignIn /> },
    { path: 'sign-up', element: <SignUp /> },
    { path: 'verify', element: <VerifyEmail /> },
  ]}
])

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
