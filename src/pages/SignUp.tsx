import React from 'react'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/button/filled-button.js'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/useAuth'
import { checkPassword, passwordOk } from '../utils/password'

export default function SignUp() {
  const nav = useNavigate(); const { signUp } = useAuth()
  const [name,setName]=React.useState(''),[email,setEmail]=React.useState('')
  const [password,setPassword]=React.useState(''),[confirm,setConfirm]=React.useState('')
  const [error,setError]=React.useState<string|null>(null)
  const checks = checkPassword(password, email), ok = passwordOk(checks) && password === confirm

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(null)
    if (!ok) { setError('Please meet all password rules and confirm password.'); return }
    const res = await signUp(name, email, password)
    if (!res.ok) { setError(res.error || 'Sign up failed'); return }
    nav(`/auth/verify?email=${encodeURIComponent(email)}`)
  }
  const Rule = ({ pass, text }: { pass: boolean; text: string }) => <div className={pass?'success':'helper'}>• {text}</div>

  return (
    <div className="section" style={{ maxWidth: 520, margin: '40px auto' }}>
      <h2>Create account</h2>
      <form onSubmit={onSubmit} style={{ display:'grid', gap:12 }}>
        {/* @ts-ignore */}<md-outlined-text-field label="Full name" value={name} oninput={(e:any)=>setName(e.target.value)} required />
        {/* @ts-ignore */}<md-outlined-text-field type="email" label="Email" value={email} oninput={(e:any)=>setEmail(e.target.value)} required />
        {/* @ts-ignore */}<md-outlined-text-field type="password" label="Password" value={password} oninput={(e:any)=>setPassword(e.target.value)} required />
        {/* @ts-ignore */}<md-outlined-text-field type="password" label="Confirm password" value={confirm} oninput={(e:any)=>setConfirm(e.target.value)} required />
        <div className="card" style={{ background: '#fafafa' }}>
          <div className="helper" style={{ marginBottom: 6 }}>Password rules</div>
          <Rule pass={checks.length} text="At least 12 characters" />
          <Rule pass={checks.upper}  text="At least one uppercase letter" />
          <Rule pass={checks.lower}  text="At least one lowercase letter" />
          <Rule pass={checks.number} text="At least one number" />
          <Rule pass={checks.special} text="At least one special character" />
          <Rule pass={checks.noEmailLocal} text="Must not contain your email’s local part" />
        </div>
        {/* @ts-ignore */}<md-filled-button type="submit" disabled={!ok}>Create account</md-filled-button>
        {error && <div className="error">{error}</div>}
      </form>
      <div className="helper" style={{ marginTop: 12 }}>Already have an account? <Link to="/auth/sign-in">Sign in</Link></div>
    </div>
  )
}
