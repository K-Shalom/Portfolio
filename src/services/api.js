// Bearer sessions are deliberately memory-only: no cookies, localStorage or URL tokens.
export const API_BASE = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:3000' : 'https://portfolio-backend-dvn5.onrender.com')
let adminSession = null
let expiryTimer
export function setAdminSession(session) {
  clearAdminSession()
  adminSession = session
  expiryTimer = setTimeout(() => {
    clearAdminSession()
    window.dispatchEvent(new Event('admin-session-expired'))
  }, Math.max(0, session.expiresAt - Date.now()))
}
export function clearAdminSession() { clearTimeout(expiryTimer); adminSession = null }
export function hasAdminSession() { return Boolean(adminSession && adminSession.expiresAt > Date.now()) }
export async function logoutAdmin() {
  try {
    await apiRequest('/api/logout', { method: 'POST', body: {}, admin: true })
    return 'Logged out of CMS admin. Server session revoked.'
  } catch {
    return 'Signed out locally. Server session revocation could not be confirmed; the session will expire automatically.'
  } finally {
    clearAdminSession()
  }
}
export async function apiRequest(path, { method = 'GET', body, admin = false } = {}) {
  if (admin && !hasAdminSession()) {
    clearAdminSession()
    window.dispatchEvent(new Event('admin-session-expired'))
    throw new Error('Please sign in again before changing content.')
  }
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (admin) headers.Authorization = `Bearer ${adminSession.token}`
  const response = await fetch(`${API_BASE}${path}`, { method, headers, credentials: 'omit', body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(20000) })
  const data = await response.json().catch(() => ({}))
  if (response.status === 401 && admin) {
    clearAdminSession()
    window.dispatchEvent(new Event('admin-session-expired'))
  }
  if (!response.ok) throw new Error(data.error || 'The request could not be completed. Please try again.')
  return data
}
