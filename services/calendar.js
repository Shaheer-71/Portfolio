import { google } from 'googleapis'

function getCalendar() {
  const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env
  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) return null

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })
  return google.calendar({ version: 'v3', auth })
}

const calendarId = () => process.env.GOOGLE_CALENDAR_ID || 'primary'

// ── Create event ────────────────────────────────────────────────────────────

export async function createInterviewEvent({ name, email, date, time, purpose }) {
  const calendar = getCalendar()
  if (!calendar) return null

  // AST = UTC+3
  const start = new Date(`${date}T${time}:00+03:00`)
  const end   = new Date(start.getTime() + 60 * 60 * 1000)

  const { data } = await calendar.events.insert({
    calendarId: calendarId(),
    requestBody: {
      summary: `Interview with ${name} — Shaheer Gul`,
      description: `Portfolio interview request\nPurpose: ${purpose || 'General discussion'}\nContact: ${email}\n\nVisitor will be notified via email.`,
      start: { dateTime: start.toISOString(), timeZone: 'Asia/Riyadh' },
      end:   { dateTime: end.toISOString(),   timeZone: 'Asia/Riyadh' },
    },
  })

  return { eventLink: data.htmlLink }
}

// ── Check conflict ──────────────────────────────────────────────────────────

export async function checkConflict(date, time) {
  const calendar = getCalendar()
  if (!calendar) return false // assume free if calendar not configured

  const start = new Date(`${date}T${time}:00+03:00`)
  const end   = new Date(start.getTime() + 60 * 60 * 1000)

  const { data } = await calendar.events.list({
    calendarId: calendarId(),
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  })

  return data.items.length > 0
}
