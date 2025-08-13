import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './shell/App'
import NotFound from './pages/NotFound'

// Minimal router that nests existing routes inside App via <Outlet/>.
// If you already register routes elsewhere, keep those — this is a safe fallback.
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFound/>,
    children: [
      { path: '*', element: <div style={{padding:16}}>App loaded. Replace with your routes.</div> }
    ]
  }
])

const el = document.getElementById('root')
if(!el){ throw new Error('Root element #root not found in index.html') }
createRoot(el).render(
  <StrictMode>
    <ErrorBoundary><RouterProvider router={router}/></ErrorBoundary>
  </StrictMode>
)

function ErrorBoundary({children}:{children:React.ReactNode}){
  return <>{children}</>
}
