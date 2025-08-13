import React from 'react'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/button/filled-button.js'
import { useNavigate } from 'react-router-dom'
import { checkPassword, passwordOk } from '../utils/password'
export default function SignUp(){
  const nav=useNavigate(); const [name,setName]=React.useState(''),[email,setEmail]=React.useState(''),[pw,setPw]=React.useState(''),[pw2,setPw2]=React.useState('')
  const checks=checkPassword(pw,email), ok=passwordOk(checks)&&pw===pw2
  function submit(e:React.FormEvent){ e.preventDefault(); if(!ok) return; localStorage.setItem('demo_signup', JSON.stringify({ email })); nav('/auth/verify?email='+encodeURIComponent(email)) }
  const Rule=({ok,text}:{ok:boolean,text:string})=> <div className={ok?'success':'helper'}>• {text}</div>
  return (<div className='section' style={{maxWidth:520,margin:'40px auto'}}>
    <h2>Create account (demo)</h2>
    <form onSubmit={submit} className='grid' style={{gap:12}}>
      {/* @ts-ignore */}<md-outlined-text-field label='Full name' value={name} oninput={(e:any)=>setName(e.target.value)} required />
      {/* @ts-ignore */}<md-outlined-text-field type='email' label='Email' value={email} oninput={(e:any)=>setEmail(e.target.value)} required />
      {/* @ts-ignore */}<md-outlined-text-field type='password' label='Password' value={pw} oninput={(e:any)=>setPw(e.target.value)} required />
      {/* @ts-ignore */}<md-outlined-text-field type='password' label='Confirm password' value={pw2} oninput={(e:any)=>setPw2(e.target.value)} required />
      <div className='card' style={{background:'#fafafa'}}><div className='helper' style={{marginBottom:6}}>Password rules</div>
        <Rule ok={checks.length} text='At least 12 characters'/><Rule ok={checks.upper} text='At least one uppercase letter'/><Rule ok={checks.lower} text='At least one lowercase letter'/><Rule ok={checks.number} text='At least one number'/><Rule ok={checks.special} text='At least one special character'/><Rule ok={checks.noEmailLocal} text='Must not contain your email’s local part'/>
      </div>
      {/* @ts-ignore */}<md-filled-button type='submit' disabled={!ok}>Create account</md-filled-button>
    </form>
  </div>)
}
