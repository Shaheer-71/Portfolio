import { createInterviewEvent } from '../services/calendar.js'
import { sendScheduleEmails } from '../services/email.js'
import { sendTelegramMessage } from '../services/telegram.js'

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

  // Try Google Calendar (optional — won't break if not configured)
  let eventLink = null
  let meetLink = null
  try {
    const event = await createInterviewEvent({ name, email, date, time, purpose })
    if (event) { eventLink = event.eventLink; meetLink = event.meetLink }
  } catch (err) {
    console.error('[Schedule] Calendar error (non-critical):', err.message)
  }

  const calStatus = eventLink
    ? `📌 <a href="${eventLink}">Calendar Event</a>`
    : '⚠️ Calendar not configured — skipped'

  await Promise.allSettled([
    sendScheduleEmails({ name, email, date, time, purpose, eventLink, meetLink }),
    sendTelegramMessage(
      `🗓️ <b>Interview Scheduled!</b>\n\n<b>${name}</b> (${email})\n📅 ${date} at ${time} AST\n💬 ${purpose || 'General'}\n\n${calStatus}`
    ),
  ])

  return res.status(200).json({ success: true, eventLink, meetLink })
}
