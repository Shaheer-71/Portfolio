import { sendContactEmails } from '../services/email.js'
import { sendTelegramMessage } from '../services/telegram.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, message } = req.body || {}

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  // Both notifications run in parallel; errors are non-fatal
  await Promise.allSettled([
    sendContactEmails({ name, email, message }),
    sendTelegramMessage(
      `📨 <b>New Portfolio Message</b>\n\n<b>${name}</b> (${email})\n\n${message.slice(0, 500)}`
    ),
  ])

  return res.status(200).json({ success: true })
}
