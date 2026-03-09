import { google } from 'googleapis'

/**
 * Creates a Google Calendar event with a Meet link.
 * Returns { eventLink, meetLink } or null if credentials are not configured.
 */
export async function createInterviewEvent({ name, email, date, time, purpose }) {
  const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_CALENDAR_ID, OWNER_EMAIL } = process.env

  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) return null

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })

  const calendar = google.calendar({ version: 'v3', auth })

  // AST = UTC+3
  const start = new Date(`${date}T${time}:00+03:00`)
  const end   = new Date(start.getTime() + 60 * 60 * 1000)

  const { data } = await calendar.events.insert({
    calendarId: GOOGLE_CALENDAR_ID || 'primary',
    conferenceDataVersion: 1,
    sendUpdates: 'all',
    requestBody: {
      summary: `Interview with ${name} — Shaheer Gul`,
      description: `Portfolio interview request\nPurpose: ${purpose || 'General discussion'}\nContact: ${email}`,
      start: { dateTime: start.toISOString(), timeZone: 'Asia/Riyadh' },
      end:   { dateTime: end.toISOString(),   timeZone: 'Asia/Riyadh' },
      attendees: [
        { email: OWNER_EMAIL || 'devshaheer360@gmail.com' },
        { email, displayName: name },
      ],
      conferenceData: {
        createRequest: {
          requestId: `portfolio-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    },
  })

  return { eventLink: data.htmlLink, meetLink: data.hangoutLink }
}
