import React from 'react'
import Page from '../components/Page'
import TextField from '../components/md3/TextField'
import Button from '../components/md3/Button'

export default function VerifyEmail(){
  const [code,setCode]=React.useState('')
  return (<Page title="Verify your email">
    <div className="md3-card" style={{maxWidth:420}}>
      <TextField label="6-digit code" value={code} onChange={e=>setCode((e.target as HTMLInputElement).value)} />
      <Button onClick={()=>alert('Demo verify')}>Verify</Button>
    </div>
  </Page>)
}
