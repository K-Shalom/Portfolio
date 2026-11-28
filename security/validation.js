import { fail } from './controls.js'

export function object(value, keys) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.getPrototypeOf(value) !== Object.prototype) fail(400, 'Invalid request payload.')
  if (Object.keys(value).some(k => !keys.includes(k))) fail(400, 'Unexpected request field.')
  return value
}
export function text(value, max, required = false) {
  if (typeof value !== 'string' || value.length > max || Array.from(value).some(ch => { const n = ch.charCodeAt(0); return (n < 32 && ![9, 10, 13].includes(n)) || n === 127 }) || (required && !value.trim())) fail(400, 'Invalid text field.')
  return value.trim()
}
export function email(value) {
  value = text(value, 254, true)
  if (!/^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(value)) fail(400, 'Invalid email address.')
  return value
}
export function url(value) {
  value = text(value, 2048)
  if (!value || value === '#') return value
  let u
  try { u = new URL(value) } catch { fail(400, 'Invalid URL.') }
  if (!['https:', 'http:'].includes(u.protocol) || u.username || u.password) fail(400, 'Invalid URL.')
  return value
}
const common = { title: 'required', coverImage: 'url', published: 'bool' }
const schemas = {
  projects: { ...common, description: 'long', tags: 'list', languages: 'list', categories: 'list', github: 'url', live: 'url', featured: 'bool' },
  articles: { ...common, summary: 'long', content: 'content', date: 'date', readTime: 'short', tags: 'list', author: 'short', link: 'url' },
  certificates: { ...common, issuer: 'short', issueDate: 'month', credentialId: 'short', credentialUrl: 'url', category: 'short', skills: 'list', verified: 'bool' },
  events: { ...common, organization: 'short', location: 'short', date: 'date', role: 'short', description: 'long', highlights: 'list', category: 'short' },
}
export function record(kind, body, update = false) {
  const schema = schemas[kind]
  object(body, Object.keys(schema))
  if (!update && !Object.hasOwn(body, 'title')) fail(400, 'Title is required.')
  if (!Object.keys(body).length) fail(400, 'No fields supplied.')
  const result = {}
  for (const [key, value] of Object.entries(body)) {
    const type = schema[key]
    if (type === 'bool') {
      if (typeof value !== 'boolean') fail(400, 'Invalid boolean field.')
      result[key] = value
    } else if (type === 'url') result[key] = url(value)
    else if (type === 'list') {
      const items = typeof value === 'string' ? value.split(',') : value
      if (!Array.isArray(items) || items.length > 30) fail(400, 'Invalid list field.')
      result[key] = items.map(v => text(v, 100)).filter(Boolean)
    } else {
      result[key] = text(value, type === 'content' ? 20000 : type === 'long' ? 5000 : 240, type === 'required')
      if (type === 'date' || type === 'month') {
        const regex = type === 'date' ? /^\d{4}-\d{2}-\d{2}$/ : /^\d{4}-\d{2}$/
        const date = type === 'month' ? `${result[key]}-01` : result[key]
        if (!regex.test(result[key]) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, date.length) !== date) fail(400, 'Invalid date.')
      }
    }
  }
  return result
}
export function contact(body) {
  object(body, ['name', 'email', 'subject', 'message'])
  const result = { name: text(body.name, 120, true), email: email(body.email), subject: text(body.subject, 200, true), message: text(body.message, 5000, true) }
  if (/[\r\n]/.test(result.name + result.subject)) fail(400, 'Invalid email header field.')
  return result
}
