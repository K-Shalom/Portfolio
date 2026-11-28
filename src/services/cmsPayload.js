// Explicit browser write contract. Server validation remains authoritative.
const fields = {
  projects: ['title', 'coverImage', 'published', 'description', 'tags', 'languages', 'categories', 'github', 'live', 'featured'],
  articles: ['title', 'coverImage', 'published', 'summary', 'content', 'date', 'readTime', 'tags', 'author', 'link'],
  certificates: ['title', 'coverImage', 'published', 'issuer', 'issueDate', 'credentialId', 'credentialUrl', 'category', 'skills', 'verified'],
  events: ['title', 'coverImage', 'published', 'organization', 'location', 'date', 'role', 'description', 'highlights', 'category'],
}
const lists = new Set(['tags', 'languages', 'categories', 'skills', 'highlights'])

export function cmsPayload(kind, form) {
  if (!Object.hasOwn(fields, kind)) throw new Error('Unsupported CMS collection.')
  return Object.fromEntries(fields[kind].filter(key => Object.hasOwn(form, key) && form[key] !== undefined).map(key => {
    const value = form[key]
    return [key, lists.has(key) && typeof value === 'string' ? value.split(',').map(item => item.trim()).filter(Boolean) : value]
  }))
}
