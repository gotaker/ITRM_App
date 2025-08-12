import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './shell/App'
import Home from './features/home/Home'
import Overview from './features/overview/Overview'
import Risks from './features/risks/Risks'
import RiskDetailSheet from './features/risks/RiskDetailSheet'
import Heatmap from './features/heatmap/Heatmap'
import Reports from './features/reports/Reports'
import ScoringSettings from './features/settings/Scoring'
import Branding from './features/settings/Branding'
import DataSettings from './features/settings/DataSettings'
import ImportPage from './features/import/ImportPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import VerifyEmail from './pages/VerifyEmail'
import NotFound from './features/notfound/NotFound'
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
