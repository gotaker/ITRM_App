export function ensureCsrfCookie(){
  const name='csrftoken='
  if(document.cookie.split('; ').find(c=>c.startsWith(name))) return
  const token = crypto.getRandomValues(new Uint8Array(16)).reduce((s,b)=>s+b.toString(16).padStart(2,'0'), '')
  document.cookie = `csrftoken=${token}; Path=/; SameSite=Strict`
}
export function withCsrf(init:RequestInit={}):RequestInit{
  ensureCsrfCookie()
  const token=(document.cookie.split('; ').find(c=>c.startsWith('csrftoken='))||'').split('=')[1]||''
  return { ...init, headers: { ...(init.headers||{}), 'X-CSRF-Token': token } }
}
