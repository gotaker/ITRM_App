export type OIDCProvider = { authority: string; client_id: string; redirect_uri: string; scope: string }
export type OIDCConfig = { providers: Record<string, Partial<OIDCProvider>>; default?: string }
let _cfg: OIDCConfig | null = null
export async function loadOIDCConfig(): Promise<OIDCConfig> {
  if (_cfg) return _cfg
  try { const res = await fetch('/config/oidc.json', { cache: 'no-store' }); if (!res.ok) throw new Error('No config'); _cfg = await res.json() }
  catch { _cfg = { providers: {} } }
  return _cfg!
}
