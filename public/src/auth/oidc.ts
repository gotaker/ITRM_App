import { UserManager, WebStorageStateStore } from 'oidc-client-ts'
import { loadOIDCConfig } from './config'
const managers: Record<string, UserManager> = {}
async function getManager(providerKey?: string){
  const cfg=await loadOIDCConfig(); const key=providerKey||cfg.default; if(!key) return null
  const p:any=cfg.providers[key]; if(!p?.authority||!p?.client_id||!p?.redirect_uri) return null
  if(!managers[key]) managers[key]=new UserManager({ authority:p.authority, client_id:p.client_id, redirect_uri:p.redirect_uri, response_type:'code', scope:p.scope||'openid profile email', userStore:new WebStorageStateStore({store:window.sessionStorage}), automaticSilentRenew:true })
  return { key, mgr: managers[key] }
}
export async function signIn(providerKey?: string){ const r=await getManager(providerKey); if(!r) throw new Error('OIDC not configured'); await r.mgr.signinRedirect() }
export async function completeSignIn(){ const cfg=await loadOIDCConfig(); for(const key of Object.keys(cfg.providers)){ const r=await getManager(key); if(!r) continue; try{ const user=await r.mgr.signinCallback(); return {key,user} }catch{} } return null }
export async function signOut(providerKey?: string){ const r=await getManager(providerKey); if(!r) throw new Error('OIDC not configured'); await r.mgr.signoutRedirect() }
