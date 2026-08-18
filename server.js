/* global process */
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { createServer as createViteServer } from 'vite'

import { initialProjects } from './src/data/projects.js'
import { initialArticles } from './src/data/articles.js'
import { initialCertificates } from './src/data/certificates.js'
import { initialEvents } from './src/data/events.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const EMAIL_FROM = process.env.EMAIL_FROM || process.env.SMTP_USER || 'shalomkubwimbabazi@gmail.com'
const EMAIL_TO = process.env.EMAIL_TO || process.env.ADMIN_EMAIL || EMAIL_FROM
const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD || process.env.SMTP_PASS || ''

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

// Persistence DB File
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
    console.error('[Server DB] Error reading storage file:', err)
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

let transporter = null
const cleanPassword = EMAIL_APP_PASSWORD ? EMAIL_APP_PASSWORD.trim().replace(/\s+/g, '') : ''

if (EMAIL_FROM && cleanPassword) {
  // Configured with standard Port 587 (TLS/STARTTLS) + Debugging enabled
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
      user: EMAIL_FROM,
      pass: cleanPassword,
    },
    tls: {
      rejectUnauthorized: false // Prevents cloud SSL handshake blocks
    },
    logger: true, // Output details to server logs
    debug: true
  })
  console.log(`[Server SMTP] Nodemailer transporter ready for user ${EMAIL_FROM}`)
} else {
  console.warn('[Server] Missing EMAIL_FROM or EMAIL_APP_PASSWORD in environment variables.')
}

app.use(express.json({ limit: '10mb' }))

// --- CONTACT EMAIL ROUTE ---
app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All form fields are required.' })
  }

  if (!transporter) {
    return res.status(500).json({ error: 'SMTP credentials not configured on server.' })
  }

  try {
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br/>')}</p>`,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('[Email Send Error]:', error)
    return res.status(500).json({ error: 'Failed to send email. Check backend logs.' })
  }
})

// --- SECURE ADMIN PASSCODE AUTHENTICATION ---
let currentAdminPasscode = {
  code: null,
  expiresAt: 0,
}

app.post('/api/request-admin-code', async (_req, res) => {
  const targetEmail = EMAIL_TO || 'shalomkubwimbabazi@gmail.com'
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = Date.now() + 15 * 60 * 1000 // 15 mins expiry

  currentAdminPasscode = { code, expiresAt }

  if (!transporter) {
    return res.status(400).json({
      success: false,
      sentToEmail: false,
      message: 'SMTP credentials missing from Render environment.',
    })
  }

  try {
    await transporter.sendMail({
      from: `Portfolio Admin <${EMAIL_FROM}>`,
      to: targetEmail,
      subject: `[Portfolio CMS] Passcode: ${code}`,
      text: `Your one-time admin passcode is: ${code}\n\nExpires in 15 minutes.`,
      html: `<div style="font-family:sans-serif; padding:20px; background:#07090f; color:#fff; border-radius:8px;">
        <h2>CMS Admin Security Code</h2>
        <p>Your passcode to unlock the portal is:</p>
        <div style="font-size:28px; font-weight:bold; font-family:monospace; color:#3b82f6; letter-spacing:4px; padding:12px; background:rgba(59,130,246,0.1); text-align:center;">${code}</div>
        <p style="color:#888; font-size:12px;">Expires in 15 minutes.</p>
      </div>`,
    })
    
    // Passcode is NOT returned in this response (No auto-fill potential)
    return res.json({
      success: true,
      sentToEmail: true,
      message: 'Passcode sent to administrator email! Check your inbox/spam folder.',
    })
  } catch (err) {
    console.error('[CMS Admin Passcode Delivery Failed]:', err)
    return res.status(500).json({
      success: false,
      sentToEmail: false,
      message: 'Failed to deliver email. Check Render console logs for details.',
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

// --- RESTful API ENDPOINTS FOR CMS ---
app.get('/api/projects', (_req, res) => res.json(db.projects))
app.post('/api/projects', (req, res) => {
  const newProject = {
    id: `proj-${Date.now()}`,
    title: req.body.title || 'Untitled Project',
    coverImage: req.body.coverImage || '',
    description: req.body.description || '',
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    languages: Array.isArray(req.body.languages) ? req.body.languages : [],
    categories: Array.isArray(req.body.categories) ? req.body.categories : ['Web'],
    github: req.body.github || '#',
    live: req.body.live || '#',
    featured: Boolean(req.body.featured),
  }
  db.projects.unshift(newProject)
  saveDataStore()
  res.status(201).json(newProject)
})

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params
  const index = db.projects.findIndex((p) => String(p.id) === String(id))
  if (index === -1) return res.status(404).json({ error: 'Project not found' })

  db.projects[index] = { ...db.projects[index], ...req.body }
  saveDataStore()
  res.json(db.projects[index])
})

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params
  db.projects = db.projects.filter((p) => String(p.id) !== String(id))
  saveDataStore()
  res.json({ success: true, id })
})

// ARTICLES, CERTIFICATES, EVENTS & SERVER INIT
app.get('/api/articles', (_req, res) => res.json(db.articles))
app.get('/api/certificates', (_req, res) => res.json(db.certificates))
app.get('/api/events', (_req, res) => res.json(db.events))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', storeSize: { projects: db.projects.length }})
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