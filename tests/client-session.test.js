import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'

test('client session is explicit bearer-only, expires/revokes locally, and never fakes rejected writes', async () => {
  const vite = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false }, appType: 'custom' })
  const originalFetch = globalThis.fetch
  const originalWindow = globalThis.window
  globalThis.window = new EventTarget()
  const requests = []
  let invalidations = 0
  globalThis.window.addEventListener('admin-session-expired', () => { invalidations++ })
  try {
    const client = await vite.ssrLoadModule('/src/services/api.js')
    globalThis.fetch = async (url, options) => {
      requests.push({ url, options })
      return { ok: true, status: 200, json: async () => ({ success: true }) }
    }
    await assert.rejects(client.apiRequest('/api/projects', { method: 'POST', body: {}, admin: true }))
    assert.equal(requests.length, 0)
    const token = 'a'.repeat(64)
    client.setAdminSession({ token, expiresAt: Date.now() + 60000 })
    await client.apiRequest('/api/projects', { method: 'POST', body: { title: 'Test' }, admin: true })
    assert.equal(requests[0].options.headers.Authorization, 'Bearer ' + token)
    assert.equal(requests[0].options.credentials, 'omit')
    globalThis.fetch = async () => ({ ok: false, status: 401, json: async () => ({ error: 'Authentication required.' }) })
    await assert.rejects(client.apiRequest('/api/projects', { method: 'POST', body: {}, admin: true }), /Authentication required/)
    assert.equal(client.hasAdminSession(), false)
    assert.ok(invalidations >= 2)
    client.setAdminSession({ token, expiresAt: Date.now() - 1 })
    await assert.rejects(client.apiRequest('/api/projects', { admin: true }), /sign in again/)
    client.clearAdminSession()
  } finally {
    globalThis.fetch = originalFetch
    globalThis.window = originalWindow
    await vite.close()
  }
})
