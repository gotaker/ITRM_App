import React from 'react'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/button/filled-button.js'
import { useNavigate, useSearchParams } from 'react-router-dom'
export default function VerifyEmail(){
  const nav=useNavigate(),[params]=useSearchParams(),email=params.get('email')||''
  const [code,setCode]=React.useState('')
  function onSubmit(e:React.FormEvent){ e.preventDefault(); if((code||'').length<6) return; alert('Email verified (demo). Use OIDC in production.'); nav('/overview') }
  return (<div className='section' style={{maxWidth:420,margin:'40px auto'}}>
    <h2>Verify your email</h2><p className='helper'>We sent a 6-digit code to {email||'your email'} (demo).</p>
    <form onSubmit={onSubmit} className='grid' style={{gap:12}}>
      {/* @ts-ignore */}<md-outlined-text-field label='6-digit code' value={code} oninput={(e:any)=>setCode(e.target.value)} required maxlength='6' inputmode='numeric' pattern='[0-9]*'/>
      {/* @ts-ignore */}<md-filled-button type='submit' disabled={(code||'').length<6}>Verify</md-filled-button>
    </form>
  </div>)
}
