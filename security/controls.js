import { createHmac, randomBytes, randomInt, timingSafeEqual } from 'node:crypto'

export class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status }
}
export const fail = (status, message) => { throw new HttpError(status, message) }
export const escapeHtml = value => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

// Fixed windows, bounded memory, explicit rejection on capacity exhaustion.
export function limiter(now) {
  const buckets = new Map()
  return (key, max, windowMs) => {
    for (const [k, b] of buckets) if (b.until <= now()) buckets.delete(k)
    let bucket = buckets.get(key)
    if (!bucket) {
      if (buckets.size >= 10000) fail(429, 'Too many requests. Try again later.')
      bucket = { count: 0, until: now() + windowMs }; buckets.set(key, bucket)
    }
    if (++bucket.count > max) fail(429, 'Too many requests. Try again later.')
  }
}

export function authentication({ now, sendMail, adminEmail, from, otpMs = 600000, sessionMs = 1800000 }) {
  const secret = randomBytes(32)
  const digest = value => createHmac('sha256', secret).update(value).digest()
  let otp = null
  let cooldownUntil = 0
  const sessions = new Map()
  function session(req) {
    const header = req.get('authorization') || ''
    if (!/^Bearer [a-f0-9]{64}$/.test(header)) return null
    const key = digest(header.slice(7)).toString('hex')
    const expires = sessions.get(key)
    if (!expires || expires <= now()) { sessions.delete(key); return null }
    return { key, expires }
  }
  return {
    session,
    require(req, _res, next) {
      req.adminSession = session(req)
      if (!req.adminSession) return next(new HttpError(401, 'Administrator authentication required.'))
      next()
    },
    async request() {
      if (now() < cooldownUntil) fail(429, 'Please wait before requesting another code.')
      cooldownUntil = now() + 60000
      const code = String(randomInt(100000, 1000000))
      const pending = { hash: digest(code), expires: now() + otpMs, attempts: 0 }
      otp = pending
      try {
        await sendMail({ from, to: adminEmail, subject: 'Portfolio administrator sign-in code', text: `Your administrator code is ${code}. It expires in 10 minutes.`, html: `<p>Your administrator code is <strong>${code}</strong>. It expires in 10 minutes.</p>` })
      } catch {
        if (otp === pending) otp = null
        fail(503, 'Sign-in is temporarily unavailable. Try again later.')
      }
      return { success: true, message: 'If delivery is available, a sign-in code has been sent.' }
    },
    verify(code) {
      if (!otp || otp.expires <= now() || otp.attempts >= 5) { otp = null; fail(401, 'Invalid or expired sign-in code.') }
      otp.attempts++
      if (!timingSafeEqual(otp.hash, digest(code))) {
        if (otp.attempts >= 5) otp = null
        fail(401, 'Invalid or expired sign-in code.')
      }
      otp = null
      sessions.clear() // One administrator; a new sign-in revokes all older sessions.
      const token = randomBytes(32).toString('hex')
      const expiresAt = now() + sessionMs
      sessions.set(digest(token).toString('hex'), expiresAt)
      return { success: true, token, expiresAt }
    },
    logout(req) { sessions.delete(req.adminSession.key) },
  }
}

export function securityHeaders(req, res, next) {
  res.set({
    'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
    'Cache-Control': 'no-store',
  })
  if (req.secure) res.set('Strict-Transport-Security', 'max-age=31536000')
  next()
}
