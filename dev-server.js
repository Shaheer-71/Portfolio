// Minimal local dev server — mirrors api/chat.js for local development
// Production uses Vercel serverless functions automatically
import http from 'http'
import { readFileSync } from 'fs'

// Load .env manually (works on any Node version)
try {
  const lines = readFileSync('.env', 'utf8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed.slice(eq + 1).trim()
    if (key && !(key in process.env)) process.env[key] = val
  }
} catch { /* .env not found — env vars must be set in shell */ }

const { default: handler } = await import('./api/chat.js')

http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    return res.end()
  }

  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', async () => {
      try { req.body = JSON.parse(body) } catch { req.body = {} }

      const mockRes = {
        _status: 200,
        status(code) { this._status = code; return this },
        json(data) {
          res.writeHead(this._status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
          res.end(JSON.stringify(data))
        },
        end() { res.writeHead(this._status); res.end() },
      }

      await handler(req, mockRes)
    })
  } else {
    res.writeHead(404)
    res.end()
  }
}).listen(3001, () => {
  console.log('  API server ready  →  http://localhost:3001')
  console.log(`  GROQ_API_KEY      →  ${process.env.GROQ_API_KEY ? 'OK' : 'MISSING — check .env'}`)
})
