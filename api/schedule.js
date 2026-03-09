import { createInterviewEvent } from '../services/calendar.js'
import { sendScheduleEmails } from '../services/email.js'
import { sendWhatsAppMessage } from '../services/whatsapp.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, date, time, purpose } = req.body || {}

  if (!name?.trim() || !email?.trim() || !date || !time) {
    return res.status(400).json({ error: 'Name, email, date, and time are required.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  const startTime = new Date(`${date}T${time}:00+03:00`)
  if (isNaN(startTime) || startTime <= new Date()) {
    return res.status(400).json({ error: 'Please select a valid future date and time.' })
  }

  let eventLink = null
  try {
    const event = await createInterviewEvent({ name, email, date, time, purpose })
    if (event) eventLink = event.eventLink
  } catch (err) {
    console.error('[Schedule] Calendar error (non-critical):', err.message)
  }

  await Promise.allSettled([
    sendScheduleEmails({ name, email, date, time, purpose, eventLink }),
    sendWhatsAppMessage(`🗓️ Interview Scheduled!\n\n${name} (${email})\n📅 ${date} at ${time} AST\n💬 ${purpose || 'General'}`),
  ])

  return res.status(200).json({ success: true, eventLink })
}
