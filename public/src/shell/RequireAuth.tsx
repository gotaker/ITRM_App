import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../state/useAuth'
export default function RequireAuth({ children }: { children: React.ReactNode }){
  const { user } = useAuth(); const loc = useLocation()
  if (!user) return <Navigate to={`/auth/sign-in?from=${encodeURIComponent(loc.pathname+loc.search)}`} replace />
  return <>{children}</>
}
