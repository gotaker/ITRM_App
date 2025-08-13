import React from 'react'
import Page from '../components/Page'
import TextField from '../components/md3/TextField'
import Button from '../components/md3/Button'

export default function SignUp(){
  const [email,setEmail]=React.useState('')
  const [password,setPassword]=React.useState('')
  const [confirm,setConfirm]=React.useState('')
  return (<Page title="Create account">
    <div className="md3-card" style={{maxWidth:520}}>
      <div className="md3-helper">Password rules: ≥12 chars, upper, lower, number, special, not containing your email local part.</div>
      <div style={{display:'grid', gap:10, marginTop:10}}>
        <TextField label="Email" type="email" value={email} onChange={e=>setEmail((e.target as HTMLInputElement).value)}/>
        <TextField label="Password" type="password" value={password} onChange={e=>setPassword((e.target as HTMLInputElement).value)}/>
        <TextField label="Confirm password" type="password" value={confirm} onChange={e=>setConfirm((e.target as HTMLInputElement).value)}/>
        <Button onClick={()=>alert('Demo sign-up')}>Create account</Button>
      </div>
    </div>
  </Page>)
}
