import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './shell/App'
import RequireAuth from './shell/RequireAuth'
import Home from './pages/Home'
import Overview from './features/overview/Overview'
import Risks from './features/risks/Risks'
import Heatmap from './features/heatmap/Heatmap'
import Reports from './pages/Reports'
import Scoring from './features/settings/Scoring'
import Branding from './features/settings/Branding'
import DataSettings from './features/settings/DataSettings'
import ImportPage from './features/import/ImportPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import VerifyEmail from './pages/VerifyEmail'
import AuthCallback from './pages/AuthCallback'
import Reset from './pages/Reset'
import NotFound from './pages/NotFound'
import AssessWizard from './features/assess/Wizard'
import './styles/index.css'

const router = createBrowserRouter([
  { path: '/', element: <App/>, children: [
    { index: true, element: <Home/> },
    { path: 'overview', element: <RequireAuth><Overview/></RequireAuth> },
    { path: 'risks', element: <RequireAuth><Risks/></RequireAuth> },
    { path: 'heatmap', element: <RequireAuth><Heatmap/></RequireAuth> },
    { path: 'reports', element: <RequireAuth><Reports/></RequireAuth> },
    { path: 'assess', element: <RequireAuth><AssessWizard/></RequireAuth> },
    { path: 'settings/scoring', element: <RequireAuth><Scoring/></RequireAuth> },
    { path: 'settings/branding', element: <RequireAuth><Branding/></RequireAuth> },
    { path: 'settings/data', element: <RequireAuth><DataSettings/></RequireAuth> },
    { path: 'import', element: <RequireAuth><ImportPage/></RequireAuth> },
    { path: '404', element: <NotFound/> },
    { path: '*', element: <NotFound/> }
  ]},
  { path: '/auth', children: [
    { path: 'sign-in', element: <SignIn/> },
    { path: 'sign-up', element: <SignUp/> },
    { path: 'verify', element: <VerifyEmail/> },
    { path: 'callback', element: <AuthCallback/> },
    { path: 'reset', element: <Reset/> }
  ]}
])

createRoot(document.getElementById('root')!).render(<RouterProvider router={router}/>)
