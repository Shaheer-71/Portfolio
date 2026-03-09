// Minimal local dev server — mirrors api/chat.js for local development
// Production uses Vercel serverless functions automatically
import http from 'http'
import { default as handler } from './api/chat.js'

http.createServer((req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    })
    return res.end()
  }

  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', async () => {
      try { req.body = JSON.parse(body) } catch { req.body = {} }

      // Mock Vercel's res object
      const mockRes = {
        _status: 200,
        status(code) { this._status = code; return this },
        json(data) {
          res.writeHead(this._status, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          })
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
  console.log('  ✓ API dev server  →  http://localhost:3001')
  console.log(`  ✓ GROQ_API_KEY    →  ${process.env.GROQ_API_KEY ? 'configured' : '❌ missing — check .env'}`)
})
