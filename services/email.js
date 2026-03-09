import nodemailer from 'nodemailer'

function createTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  })
}

const from = () => `"Shaheer Gul Portfolio" <${process.env.EMAIL_USER}>`
const owner = () => process.env.OWNER_EMAIL || 'devshaheer360@gmail.com'

// ── Contact form ────────────────────────────────────────────────────────────

export async function sendContactEmails({ name, email, message }) {
  const t = createTransport()
  const safe = (s) => s.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')

  await Promise.all([
    // Notification to Shaheer
    t.sendMail({
      from: from(),
      to: owner(),
      subject: `📨 New message from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;padding:24px;background:#0d0d1f;color:#e2e8f0;border-radius:12px">
          <h2 style="color:#00d4ff;margin:0 0 20px">New Portfolio Message</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
            <tr><td style="padding:8px 0;color:#a1a1aa;width:70px">From</td><td style="color:#f4f4f5;font-weight:600">${safe(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#a1a1aa">Email</td><td><a href="mailto:${email}" style="color:#6366f1">${email}</a></td></tr>
          </table>
          <div style="background:rgba(255,255,255,.05);padding:16px;border-radius:8px;border-left:4px solid #00d4ff">
            <p style="margin:0;line-height:1.7;color:#d4d4d8">${safe(message)}</p>
          </div>
          <p style="margin-top:20px;font-size:12px;color:#52525b">Sent via your portfolio contact form</p>
        </div>`,
    }),

    // Auto-reply to visitor
    t.sendMail({
      from: from(),
      to: email,
      subject: `Got your message, ${name}! 👋`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;padding:24px;background:#0d0d1f;color:#e2e8f0;border-radius:12px">
          <h2 style="color:#00d4ff;margin:0 0 16px">Hi ${safe(name)}!</h2>
          <p style="color:#a1a1aa;line-height:1.7">Thanks for reaching out. I've received your message and will get back to you within 24 hours.</p>
          <div style="background:rgba(0,212,255,.08);border-left:4px solid #00d4ff;padding:16px;margin:20px 0;border-radius:0 8px 8px 0">
            <p style="margin:0 0 8px;color:#71717a;font-size:13px">Your message:</p>
            <p style="margin:0;line-height:1.7;color:#d4d4d8">${safe(message)}</p>
          </div>
          <p style="color:#a1a1aa;line-height:1.7">Best regards,<br>
            <strong style="color:#f4f4f5">Muhammad Shaheer Gul</strong><br>
            <span style="color:#8b5cf6;font-size:13px">Full Stack Developer & Mobile App Architect</span>
          </p>
        </div>`,
    }),
  ])
}

// ── Schedule interview ──────────────────────────────────────────────────────

export async function sendScheduleEmails({ name, email, date, time, purpose, eventLink, meetLink }) {
  const t = createTransport()
  const formatted = new Date(`${date}T${time}:00`).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  await t.sendMail({
    from: from(),
    to: owner(),
    subject: `🗓️ Interview Scheduled: ${name} — ${formatted} at ${time}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;padding:24px;background:#0d0d1f;color:#e2e8f0;border-radius:12px">
        <h2 style="color:#8b5cf6;margin:0 0 20px">Interview Scheduled!</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          <tr><td style="padding:8px 0;color:#a1a1aa;width:80px">Name</td><td style="color:#f4f4f5;font-weight:600">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#a1a1aa">Email</td><td><a href="mailto:${email}" style="color:#6366f1">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#a1a1aa">Date</td><td style="color:#f4f4f5">${formatted}</td></tr>
          <tr><td style="padding:8px 0;color:#a1a1aa">Time</td><td style="color:#f4f4f5">${time} AST</td></tr>
          <tr><td style="padding:8px 0;color:#a1a1aa">Purpose</td><td style="color:#f4f4f5">${purpose || 'General discussion'}</td></tr>
        </table>
        ${eventLink ? `<a href="${eventLink}" style="display:inline-block;background:#8b5cf6;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-right:8px">View Calendar Event</a>` : ''}
        ${meetLink  ? `<a href="${meetLink}"  style="display:inline-block;background:#00d4ff;color:#0d0d1f;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">Join Google Meet</a>` : ''}
      </div>`,
  })
}
