import React from 'react'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/button/filled-button.js'
import '@material/web/button/outlined-button.js'
import '@material/web/iconbutton/icon-button.js'
import { useAuth } from '../state/useAuth'
import { useNavigate, Link } from 'react-router-dom'

export default function SignIn() {
  const nav = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = React.useState(''), [password, setPassword] = React.useState('')
  const [show, setShow] = React.useState(false), [error, setError] = React.useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(null)
    const ok = await signIn(email, password)
    if (ok) nav('/overview'); else setError('Invalid credentials or email not verified yet.')
  }
  const SSO = (p: string) => alert(`${p} SSO coming soon (demo)`)

  return (
    <div className="section" style={{ maxWidth: 480, margin: '40px auto' }}>
      <h2>Sign in</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {/* @ts-ignore */}<md-outlined-button onClick={() => SSO('Google')}>Continue with Google</md-outlined-button>
        {/* @ts-ignore */}<md-outlined-button onClick={() => SSO('Microsoft')}>Continue with Microsoft</md-outlined-button>
        {/* @ts-ignore */}<md-outlined-button onClick={() => SSO('GitHub')}>Continue with GitHub</md-outlined-button>
      </div>
      <div className="helper" style={{ margin: '10px 0' }}>or sign in with email</div>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        {/* @ts-ignore */}<md-outlined-text-field type="email" label="Email" value={email} oninput={(e:any)=>setEmail(e.target.value)} required />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr max-content', alignItems: 'center', gap: 8 }}>
          {/* @ts-ignore */}<md-outlined-text-field type={show?'text':'password'} label="Password" value={password} oninput={(e:any)=>setPassword(e.target.value)} required />
          {/* @ts-ignore */}<md-icon-button title="Toggle" onclick={() => setShow(s => !s)}>{show?'visibility_off':'visibility'}</md-icon-button>
        </div>
        {/* @ts-ignore */}<md-filled-button type="submit">Sign in</md-filled-button>
        {error && <div className="error">{error}</div>}
      </form>
      <div className="helper" style={{ marginTop: 12 }}>No account? <Link to="/auth/sign-up">Create one</Link></div>
    </div>
  )
}
