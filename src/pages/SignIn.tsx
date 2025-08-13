import React from 'react'
import Page from '../components/Page'
import TextField from '../components/md3/TextField'
import Button from '../components/md3/Button'

export default function SignIn(){
  const [email,setEmail]=React.useState('')
  const [password,setPassword]=React.useState('')
  return (<Page title="Sign in">
    <div className="md3-card" style={{maxWidth:480}}>
      <div style={{display:'grid', gap:10}}>
        <Button variant="tonal" onClick={()=>alert('SSO: Microsoft Entra (OIDC)')}>Continue with Microsoft</Button>
        <Button variant="tonal" onClick={()=>alert('SSO: Google (OIDC)')}>Continue with Google</Button>
        <Button variant="tonal" onClick={()=>alert('SSO: GitHub (OIDC)')}>Continue with GitHub</Button>
        <hr/>
        <TextField label="Email" type="email" value={email} onChange={e=>setEmail((e.target as HTMLInputElement).value)} />
        <TextField label="Password" type="password" value={password} onChange={e=>setPassword((e.target as HTMLInputElement).value)} helperText="Use SSO for production. Demo login only."/>
        <Button onClick={()=>alert('Demo sign-in')}>Sign in</Button>
      </div>
    </div>
  </Page>)
}
