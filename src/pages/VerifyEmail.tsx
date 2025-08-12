import React from 'react'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/button/filled-button.js'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/useAuth'

export default function VerifyEmail() {
  const nav = useNavigate()
  const { verify } = useAuth()
  const [params] = useSearchParams()
  const email = params.get('email') || ''
  const [code, setCode] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const ok = await verify(code.trim())
    if (ok) nav('/overview')
    else setError('Invalid verification code.')
  }

  return (
    <div className="section" style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Verify your email</h2>
      <p className="helper">We sent a 6-digit code to {email || 'your email'}.</p>
      <form onSubmit={onSubmit} className="grid" style={{ gap: 12 }}>
        {/* @ts-ignore */}
        <md-outlined-text-field inputmode="numeric" pattern="[0-9]*" maxlength="6"
          label="6-digit code" value={code} oninput={(e: any) => setCode(e.target.value)} required />
        {/* @ts-ignore */}
        <md-filled-button type="submit" disabled={(code || '').length < 6}>Verify</md-filled-button>
        {error && <div className="error">{error}</div>}
      </form>
      <div className="helper" style={{ marginTop: 10 }}>
        Didn’t get a code? <a onClick={(e) => { e.preventDefault(); alert('Resend code (demo)') }} href="#">Resend</a>
      </div>
    </div>
  )
}
