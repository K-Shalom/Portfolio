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
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(null, true) // Pass through for external frontends
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

// Handle preflight OPTIONS requests across all routes
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
    console.error('[Server DB] Error reading storage file, falling back to initial data:', err)
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
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_FROM,
      pass: cleanPassword,
    },
  })
  console.log(`[Server SMTP] Configured Nodemailer with user ${EMAIL_FROM}`)
} else {
  console.warn('[Server] Missing EMAIL_FROM or EMAIL_APP_PASSWORD. Contact emails will be logged locally.')
}

app.use(express.json({ limit: '10mb' }))

// --- CONTACT EMAIL ROUTE ---
app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All form fields are required.' })
  }

  if (!transporter) {
    console.log('[Mock Email Sent]', { name, email, subject, message })
    return res.status(200).json({
      success: true,
      mock: true,
      message: 'Message received! (SMTP credentials not configured, saved to server logs)',
    })
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
    console.error('Email send error:', error)
    return res.status(500).json({ error: 'Could not send email. Please check server logs.' })
  }
})

// --- ADMIN EMAIL PASSCODE AUTHENTICATION ---
let currentAdminPasscode = {
  code: null,
  expiresAt: 0,
}

app.post('/api/request-admin-code', async (_req, res) => {
  const targetEmail = EMAIL_TO || 'shalomkubwimbabazi@gmail.com'
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = Date.now() + 15 * 60 * 1000 // 15 mins expiry

  currentAdminPasscode = { code, expiresAt }
  console.log(`[CMS Admin Passcode Generated]: ${code}`)

  if (transporter) {
    try {
      await transporter.sendMail({
        from: EMAIL_FROM,
        to: targetEmail,
        subject: `[Portfolio CMS] Your Admin Passcode: ${code}`,
        text: `Hello,\n\nYour one-time passcode to unlock the CMS Admin Portal is:\n\n${code}\n\nThis passcode expires in 15 minutes.`,
        html: `<div style="font-family:sans-serif; padding:20px; border:1px solid #e8ff00; background:#07090f; color:#fff; border-radius:8px;">
          <h2 style="color:#e8ff00; margin-top:0;">CMS Admin Security Code</h2>
          <p>Your one-time passcode to unlock the Portfolio Admin Portal is:</p>
          <div style="font-size:28px; font-weight:bold; font-family:monospace; color:#e8ff00; letter-spacing:4px; padding:12px; background:rgba(232,255,0,0.1); border:1px solid rgba(232,255,0,0.3); border-radius:4px; text-align:center; margin:16px 0;">${code}</div>
          <p style="color:#888; font-size:12px;">This code will expire in 15 minutes.</p>
        </div>`,
      })
      return res.json({
        success: true,
        sentToEmail: true,
        message: 'Passcode sent to administrator email! Please check your inbox.',
      })
    } catch (err) {
      console.error('[CMS Admin Code Email Delivery Failed]', err)
      return res.status(500).json({
        success: false,
        sentToEmail: false,
        message: 'Failed to send verification email. Please check server SMTP configuration on Render.',
      })
    }
  } else {
    return res.status(400).json({
      success: false,
      sentToEmail: false,
      message: 'SMTP environment variables not configured on server.',
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
    error: 'Invalid or expired passcode. Please request a new code to your email.',
  })
})

// --- RESTful API ENDPOINTS FOR CMS ---

// PROJECTS
app.get('/api/projects', (_req, res) => {
  res.json(db.projects)
})

app.post('/api/projects', (req, res) => {
  const newProject = {
    id: `proj-${Date.now()}`,
    title: req.body.title || 'Untitled Project',
    coverImage: req.body.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: req.body.description || '',
    tags: Array.isArray(req.body.tags) ? req.body.tags : (req.body.tags ? req.body.tags.split(',').map(t => t.trim()) : []),
    languages: Array.isArray(req.body.languages) ? req.body.languages : (req.body.languages ? req.body.languages.split(',').map(l => l.trim()) : []),
    categories: Array.isArray(req.body.categories) ? req.body.categories : (req.body.categories ? req.body.categories.split(',').map(c => c.trim()) : ['Web']),
    github: req.body.github || 'https://github.com/K-Shalom',
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

  db.projects[index] = {
    ...db.projects[index],
    ...req.body,
    tags: Array.isArray(req.body.tags) ? req.body.tags : (req.body.tags ? req.body.tags.split(',').map(t => t.trim()) : db.projects[index].tags),
    languages: Array.isArray(req.body.languages) ? req.body.languages : (req.body.languages ? req.body.languages.split(',').map(l => l.trim()) : db.projects[index].languages),
    categories: Array.isArray(req.body.categories) ? req.body.categories : (req.body.categories ? req.body.categories.split(',').map(c => c.trim()) : db.projects[index].categories),
  }
  saveDataStore()
  res.json(db.projects[index])
})

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params
  db.projects = db.projects.filter((p) => String(p.id) !== String(id))
  saveDataStore()
  res.json({ success: true, id })
})

// ARTICLES
app.get('/api/articles', (_req, res) => {
  res.json(db.articles)
})

app.post('/api/articles', (req, res) => {
  const newArticle = {
    id: `art-${Date.now()}`,
    title: req.body.title || 'Untitled Article',
    coverImage: req.body.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    summary: req.body.summary || '',
    content: req.body.content || '',
    date: req.body.date || new Date().toISOString().split('T')[0],
    readTime: req.body.readTime || '5 min read',
    tags: Array.isArray(req.body.tags) ? req.body.tags : (req.body.tags ? req.body.tags.split(',').map(t => t.trim()) : []),
    author: req.body.author || 'Shalom Kubwimbabazi',
    link: req.body.link || '#',
    published: true,
  }
  db.articles.unshift(newArticle)
  saveDataStore()
  res.status(201).json(newArticle)
})

app.put('/api/articles/:id', (req, res) => {
  const { id } = req.params
  const index = db.articles.findIndex((a) => String(a.id) === String(id))
  if (index === -1) return res.status(404).json({ error: 'Article not found' })

  db.articles[index] = { ...db.articles[index], ...req.body }
  saveDataStore()
  res.json(db.articles[index])
})

app.delete('/api/articles/:id', (req, res) => {
  const { id } = req.params
  db.articles = db.articles.filter((a) => String(a.id) !== String(id))
  saveDataStore()
  res.json({ success: true, id })
})

// CERTIFICATES
app.get('/api/certificates', (_req, res) => {
  res.json(db.certificates)
})

app.post('/api/certificates', (req, res) => {
  const newCert = {
    id: `cert-${Date.now()}`,
    title: req.body.title || 'Certificate Title',
    issuer: req.body.issuer || 'Issuing Authority',
    issueDate: req.body.issueDate || new Date().toISOString().slice(0, 7),
    credentialId: req.body.credentialId || `CERT-${Math.floor(Math.random() * 10000)}`,
    credentialUrl: req.body.credentialUrl || 'https://github.com/K-Shalom',
    coverImage: req.body.coverImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    category: req.body.category || 'Certification',
    skills: Array.isArray(req.body.skills) ? req.body.skills : (req.body.skills ? req.body.skills.split(',').map(s => s.trim()) : []),
    verified: req.body.verified !== false,
  }
  db.certificates.unshift(newCert)
  saveDataStore()
  res.status(201).json(newCert)
})

app.put('/api/certificates/:id', (req, res) => {
  const { id } = req.params
  const index = db.certificates.findIndex((c) => String(c.id) === String(id))
  if (index === -1) return res.status(404).json({ error: 'Certificate not found' })

  db.certificates[index] = { ...db.certificates[index], ...req.body }
  saveDataStore()
  res.json(db.certificates[index])
})

app.delete('/api/certificates/:id', (req, res) => {
  const { id } = req.params
  db.certificates = db.certificates.filter((c) => String(c.id) !== String(id))
  saveDataStore()
  res.json({ success: true, id })
})

// EVENTS
app.get('/api/events', (_req, res) => {
  res.json(db.events)
})

app.post('/api/events', (req, res) => {
  const newEvent = {
    id: `evt-${Date.now()}`,
    title: req.body.title || 'Event Title',
    organization: req.body.organization || 'Organization Name',
    location: req.body.location || 'Rwanda',
    date: req.body.date || new Date().toISOString().split('T')[0],
    role: req.body.role || 'Attendee',
    coverImage: req.body.coverImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    description: req.body.description || '',
    highlights: Array.isArray(req.body.highlights) ? req.body.highlights : (req.body.highlights ? req.body.highlights.split(',').map(h => h.trim()) : []),
    category: req.body.category || 'Event',
  }
  db.events.unshift(newEvent)
  saveDataStore()
  res.status(201).json(newEvent)
})

app.put('/api/events/:id', (req, res) => {
  const { id } = req.params
  const index = db.events.findIndex((e) => String(e.id) === String(id))
  if (index === -1) return res.status(404).json({ error: 'Event not found' })

  db.events[index] = { ...db.events[index], ...req.body }
  saveDataStore()
  res.json(db.events[index])
})

app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params
  db.events = db.events.filter((e) => String(e.id) !== String(id))
  saveDataStore()
  res.json({ success: true, id })
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', storeSize: {
    projects: db.projects.length,
    articles: db.articles.length,
    certificates: db.certificates.length,
    events: db.events.length,
  }})
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
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'))
      })
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`)
  })
}

startServer()