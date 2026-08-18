/* global process */
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { Resend } from 'resend'
import { createServer as createViteServer } from 'vite'

import { initialProjects } from './src/data/projects.js'
import { initialArticles } from './src/data/articles.js'
import { initialCertificates } from './src/data/certificates.js'
import { initialEvents } from './src/data/events.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'shalomkubwimbabazi@gmail.com'

// Initialize Resend API client (uses HTTPS port 443 - bypasses Render port blocks)
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

if (resend) {
  console.log('[Server Email] Resend HTTP API client initialized successfully.')
} else {
  console.warn('[Server Email] Missing RESEND_API_KEY environment variable.')
}

// --- CORS CONFIGURATION ---
const allowedOrigins = [
  'https://shalomk.me',
  'https://portfolio-4y9.pages.dev',
  'http://localhost:5173',
  'http://localhost:3000',
]

if (process.env.ALLOWED_ORIGIN) {
  allowedOrigins.push(process.env.ALLOWED_ORIGIN)
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(null, true)
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

app.options('*', cors())

// Persistence DB Setup
const DB_FILE = path.join(process.cwd(), 'data_store.json')

function loadDataStore() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const fileData = fs.readFileSync(DB_FILE, 'utf8')
      const parsed = JSON.parse(fileData)
      return {
        projects: parsed.projects || initialProjects,
        articles: parsed.articles || initialArticles,
        certificates: parsed.certificates || initialCertificates,
        events: parsed.events || initialEvents,
      }
    }
  } catch (err) {
    console.error('[Server DB] Error loading data store:', err)
  }
  return {
    projects: initialProjects,
    articles: initialArticles,
    certificates: initialCertificates,
    events: initialEvents,
  }
}

let db = loadDataStore()

function saveDataStore() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8')
  } catch (err) {
    console.error('[Server DB] Error saving data store:', err)
  }
}

app.use(express.json({ limit: '10mb' }))

// --- CONTACT EMAIL ROUTE ---
app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All form fields are required.' })
  }

  if (!resend) {
    return res.status(500).json({ error: 'Email service key missing on server.' })
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br/>')}</p>`,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('[Resend Contact Email Error]:', error)
    return res.status(500).json({ error: 'Could not send contact email.' })
  }
})

// --- SECURE ADMIN PASSCODE ROUTE ---
let currentAdminPasscode = {
  code: null,
  expiresAt: 0,
}

app.post('/api/request-admin-code', async (_req, res) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = Date.now() + 15 * 60 * 1000 // 15 mins expiry

  currentAdminPasscode = { code, expiresAt }

  if (!resend) {
    return res.status(500).json({
      success: false,
      sentToEmail: false,
      message: 'RESEND_API_KEY environment variable is missing on Render.',
    })
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Admin <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `[Portfolio CMS] Passcode: ${code}`,
      html: `<div style="font-family:sans-serif; padding:20px; background:#07090f; color:#fff; border-radius:8px;">
        <h2 style="color:#3b82f6;">CMS Admin Security Code</h2>
        <p>Your one-time passcode to unlock the Portfolio Admin Portal is:</p>
        <div style="font-size:28px; font-weight:bold; font-family:monospace; color:#3b82f6; letter-spacing:4px; padding:12px; background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.3); border-radius:4px; text-align:center; margin:16px 0;">${code}</div>
        <p style="color:#888; font-size:12px;">This passcode expires in 15 minutes.</p>
      </div>`,
    })

    return res.json({
      success: true,
      sentToEmail: true,
      message: 'Passcode sent successfully to administrator email!',
    })
  } catch (err) {
    console.error('[Resend Admin Code Email Error]:', err)
    return res.status(500).json({
      success: false,
      sentToEmail: false,
      message: 'Failed to deliver passcode via email service.',
    })
  }
})

app.post('/api/verify-admin-code', (req, res) => {
  const { code } = req.body
  if (!code) {
    return res.status(400).json({ success: false, error: 'Passcode is required.' })
  }

  const trimmed = String(code).trim()

  if (
    currentAdminPasscode.code &&
    currentAdminPasscode.code === trimmed &&
    Date.now() < currentAdminPasscode.expiresAt
  ) {
    return res.json({ success: true })
  }

  return res.status(400).json({
    success: false,
    error: 'Invalid or expired passcode.',
  })
})

// --- REST ENDPOINTS & SERVER INIT ---
app.get('/api/projects', (_req, res) => res.json(db.projects))
app.get('/api/articles', (_req, res) => res.json(db.articles))
app.get('/api/certificates', (_req, res) => res.json(db.certificates))
app.get('/api/events', (_req, res) => res.json(db.events))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', storeSize: { projects: db.projects.length } })
})

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa',
    })
    app.use(vite.middlewares)
  } else {
    const distPath = path.join(process.cwd(), 'dist')
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath))
      app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')))
    }
  }

  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`))
}

startServer()