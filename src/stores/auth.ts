const TOKEN_KEY = 'admin_access_token'
const PROFILE_KEY = 'admin_profile'

export interface StoredProfile {
  adminId: number
  username: string
  roleName: string
  permissions: string[]
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function getStoredProfile(): StoredProfile | null {
  const raw = localStorage.getItem(PROFILE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as StoredProfile
  } catch {
    return null
  }
}

export function setStoredProfile(profile: StoredProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function clearStoredProfile(): void {
  localStorage.removeItem(PROFILE_KEY)
}

export function logout(): void {
  clearToken()
  clearStoredProfile()
}

export function saveSession(token: string, profile: StoredProfile): void {
  setToken(token)
  setStoredProfile(profile)
}
