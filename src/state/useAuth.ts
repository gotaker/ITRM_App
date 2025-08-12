import { create } from 'zustand'

type User = { id: string; email: string; name?: string }
type Pending = { email: string; code: string }

type AuthState = {
  user: User | null
  pending: Pending | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (name: string, email: string, password: string) => Promise<{ ok: boolean; code?: string; error?: string }>
  verify: (code: string) => Promise<boolean>
  signOut: () => void
}

const keyUser = 'auth_user', keyPending = 'auth_pending'
const ls = {
  get(k: string) { try { return JSON.parse(localStorage.getItem(k) || 'null') } catch { return null } },
  set(k: string, v: any) { localStorage.setItem(k, JSON.stringify(v)) },
  del(k: string) { localStorage.removeItem(k) },
}

function genCode() { return Math.floor(100000 + Math.random() * 900000).toString() }

export const useAuth = create<AuthState>((set, get) => ({
  user: ls.get(keyUser),
  pending: ls.get(keyPending),

  async signIn(email, _password) {
    // Demo logic: any verified user in localStorage can sign in
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    const u = users[email]
    if (u && u.verified) {
      set({ user: u })
      ls.set(keyUser, u)
      return true
    }
    return false
  },

  async signUp(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    if (users[email]) return { ok: false, error: 'Account already exists' }
    const code = genCode()
    users[email] = { id: 'u_' + Math.random().toString(36).slice(2), email, name, verified: false, passwordHash: 'demo:' + password }
    localStorage.setItem('users', JSON.stringify(users))
    const pending = { email, code }
    set({ pending })
    ls.set(keyPending, pending)
    return { ok: true, code }
  },

  async verify(code) {
    const p = get().pending
    if (!p || p.code !== code) return false
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    const u = users[p.email]; if (!u) return false
    u.verified = true
    localStorage.setItem('users', JSON.stringify(users))
    const user = { id: u.id, email: u.email, name: u.name }
    set({ user, pending: null })
    ls.set(keyUser, user)
    ls.del(keyPending)
    return true
  },

  signOut() {
    set({ user: null })
    ls.del(keyUser)
  }
}))
