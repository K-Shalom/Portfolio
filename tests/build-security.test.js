/* global process */
import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveConfig } from 'vite'

test('production builds reject legacy browser provider credentials without revealing their value', async () => {
  const previous = process.env.VITE_OPENROUTER_API_KEY
  process.env.VITE_OPENROUTER_API_KEY = 'SECRET_PROVIDER_SENTINEL'
  try {
    await assert.rejects(resolveConfig({ mode: 'production' }, 'build'), error => {
      assert.ok(!error.message.includes('SECRET_PROVIDER_SENTINEL'))
      return error.message.includes('Remove private provider credentials')
    })
  } finally {
    if (previous === undefined) delete process.env.VITE_OPENROUTER_API_KEY
    else process.env.VITE_OPENROUTER_API_KEY = previous
  }
})
