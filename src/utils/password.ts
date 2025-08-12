export type PasswordCheck = { length: boolean; upper: boolean; lower: boolean; number: boolean; special: boolean; noEmailLocal: boolean }
export function checkPassword(pw: string, email = ''): PasswordCheck {
  const local = (email.split('@')[0] || '').toLowerCase()
  return {
    length: pw.length >= 12,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    number: /\d/.test(pw),
    special: /[^A-Za-z0-9]/.test(pw),
    noEmailLocal: local ? !pw.toLowerCase().includes(local) : true,
  }
}
export function passwordOk(c: PasswordCheck) { return c.length && c.upper && c.lower && c.number && c.special && c.noEmailLocal }
export function passwordStrength(pw: string): number {
  const c = checkPassword(pw)
  return Object.values(c).filter(v => v).length
}