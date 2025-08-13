import React from 'react'
import '@material/web/button/outlined-button.js'
import { useAuth } from '../state/useAuth'
import { Link } from 'react-router-dom'
import { loadOIDCConfig } from '../auth/config'
export default function SignIn(){
  const { signIn } = useAuth(); const [cfg,setCfg]=React.useState<any>(null)
  React.useEffect(()=>{ loadOIDCConfig().then(setCfg) },[])
  const providers = Object.keys((cfg?.providers)||{})
  return (<div className='section' style={{maxWidth:520,margin:'40px auto'}}>
    <h2>Sign in</h2>
    {providers.length ? <div className='grid' style={{gridTemplateColumns:'1fr 1fr',gap:8}}>{providers.map(k=> (/* @ts-ignore */<md-outlined-button key={k} onClick={()=>signIn(k)}>Continue with {k}</md-outlined-button>))}</div> : <div className='helper'>OIDC not configured. Use demo Sign Up/Verify.</div>}
    <div className='helper' style={{marginTop:12}}>No account? <Link to='/auth/sign-up'>Create one (demo)</Link></div>
    <div className='helper' style={{marginTop:8}}><Link to='/auth/reset'>Forgot password?</Link></div>
  </div>)
}
