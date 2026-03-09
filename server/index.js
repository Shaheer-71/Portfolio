import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import chatHandler     from '../api/chat.js'
import contactHandler  from '../api/contact.js'
import scheduleHandler from '../api/schedule.js'

const app  = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json())

app.post('/api/chat',     (req, res) => chatHandler(req, res))
app.post('/api/contact',  (req, res) => contactHandler(req, res))
app.post('/api/schedule', (req, res) => scheduleHandler(req, res))

app.get('/api/health', (_req, res) => res.json({
  status: 'ok',
  services: {
    groq:     !!process.env.GROQ_API_KEY,
    email:    !!process.env.EMAIL_USER,
    telegram: !!process.env.TELEGRAM_BOT_TOKEN,
    calendar: !!process.env.GOOGLE_CLIENT_EMAIL,
  },
}))

app.listen(PORT, () => {
  const ok  = (v) => v ? '\x1b[32m✔\x1b[0m' : '\x1b[33m✘ not set\x1b[0m'
  console.log(`\n  \x1b[36m[API]\x1b[0m Server ready → http://localhost:${PORT}`)
  console.log(`  GROQ_API_KEY       ${ok(process.env.GROQ_API_KEY)}`)
  console.log(`  EMAIL_USER         ${ok(process.env.EMAIL_USER)}`)
  console.log(`  TELEGRAM_BOT_TOKEN ${ok(process.env.TELEGRAM_BOT_TOKEN)}`)
  console.log(`  GOOGLE_CLIENT_EMAIL ${ok(process.env.GOOGLE_CLIENT_EMAIL)}\n`)
})
