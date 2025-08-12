import React from 'react'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/button/filled-button.js'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/useAuth'

export default function VerifyEmail() {
  const nav = useNavigate(), { verify } = useAuth()
  const [params] = useSearchParams()
  const email = params.get('email') || ''
  const [code, setCode] = React.useState(''), [error, setError] = React.useState<string|null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(null)
    const ok = await verify(code.trim())
    if (ok) nav('/overview'); else setError('Invalid verification code.')
  }

  return (
    <div className="section" style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Verify your email</h2>
      <p className="helper">We sent a 6-digit code to {email || 'your email'}.</p>
      <form onSubmit={onSubmit} style={{ display:'grid', gap:12 }}>
        {/* @ts-ignore */}<md-outlined-text-field inputmode="numeric" pattern="[0-9]*" maxlength="6"
          label="6-digit code" value={code} oninput={(e:any)=>setCode(e.target.value)} required />
        {/* @ts-ignore */}<md-filled-button type="submit" disabled={(code||'').length<6}>Verify</md-filled-button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}
