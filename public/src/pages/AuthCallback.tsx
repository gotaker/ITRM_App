import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/useAuth'
export default function AuthCallback(){
  const nav = useNavigate(); const { finishRedirect } = useAuth()
  React.useEffect(()=>{ (async()=>{ const ok = await finishRedirect(); nav(ok?'/overview':'/auth/sign-in',{replace:true}) })() },[])
  return <div className='section' style={{maxWidth:420,margin:'40px auto'}}><h2>Signing you in…</h2></div>
}
