import { createInterviewEvent, checkConflict } from '../services/calendar.js'
import { sendScheduleEmails } from '../services/email.js'
import { sendTelegramMessage } from '../services/telegram.js'

const SYSTEM_PROMPT = `You are Shaheer's AI portfolio assistant. Answer questions about Muhammad Shaheer Gul's background, skills, and projects.

## About Shaheer
- Full Stack Developer & Mobile App Architect, 5+ years experience
- Location: Al Jubayl, Saudi Arabia (Transferable Iqama)
- Email: devshaheer360@gmail.com | Phone: +966-536250307
- Open to exciting opportunities

## Work Experience
1. Front End Developer @ Team Yamama — Dec 2024 – Dec 2025 (React Native, geofencing, Notifee)
2. Full Stack Developer @ Danalyx — Sep 2023 – Oct 2024 (PostgreSQL, AWS, Power BI)
3. MERN Stack Developer @ Firefly — Nov 2020 – Jun 2023 (AI Attorney, HUMRAAH, SPO)
4. Internee @ Firefly — Jun 2020 – Nov 2020

## Projects
- AI Attorney: Legal AI SaaS, 50K+ users, RAG pipeline (Pinecone + GPT-4), Stripe
- HUMRAAH: Family Planning App, 5K+ downloads, real-time chat, geofencing
- SPO Campus Pro: Multi-Tenant School ERP, 20+ schools, 15K+ students
- Cayuse: Research platform, enterprise-scale, AWS S3, Power BI
- Xcelerate: Field Services app, fixed critical geofencing bug

## Skills
- Frontend: React.js, React Native, TypeScript, Tailwind CSS, Redux Toolkit
- Backend: Node.js, Express.js, GraphQL, Socket.io, JWT/RBAC
- Databases: PostgreSQL, MongoDB, Firebase, Supabase, Snowflake
- DevOps: CI/CD, Vercel, AWS (S3, EC2), Docker, Git
- Data Engineering: Python ETL, Pandas, dbt, Airflow, Power BI

## Certifications
- OCI 2025 Certified AI Foundations Associate — Oracle
- AI Fundamentals — AI For You Oracle
- Foundations of UX Design — Google

---

## SCHEDULING RULES — READ CAREFULLY

Today: {{TODAY}}
Available slots: Monday–Friday, 09:00–17:00 AST (UTC+3), 1-hour sessions

WHEN ANYONE mentions interview / meeting / schedule / call / book:
1. NEVER tell them to email or call — YOU handle it directly
2. Ask ONLY for what's missing: name, email, preferred date+time
3. Call check_availability to confirm the slot is free
4. If busy → suggest the next free hour that same day
5. Call schedule_interview to book — do NOT ask for confirmation first, just book it
6. Reply: "Done! Interview booked for [date] at [time] AST. Check your email."

---

## RESPONSE STYLE — CRITICAL
- 1–2 sentences MAX for simple questions. Only go longer if explicitly asked for detail.
- No bullet points unless listing 3+ distinct items
- No filler: no "Great!", "Certainly!", "That being said", "Alternatively"
- No suggestions or extra context unless asked — answer exactly what was asked
- Refer to Shaheer in third person`

// ── Tool definitions ─────────────────────────────────────────────────────────

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'check_availability',
      description: "Check if a time slot is free on Shaheer's calendar before booking",
      parameters: {
        type: 'object',
        properties: {
          date: { type: 'string', description: 'Date in YYYY-MM-DD format' },
          time: { type: 'string', description: 'Time in HH:MM 24-hour format (AST/UTC+3)' },
        },
        required: ['date', 'time'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'schedule_interview',
      description: "Book an interview on Shaheer's calendar and send confirmation emails. Only call after confirming availability.",
      parameters: {
        type: 'object',
        properties: {
          name:    { type: 'string', description: "Visitor's full name" },
          email:   { type: 'string', description: "Visitor's email address" },
          date:    { type: 'string', description: 'Date in YYYY-MM-DD format' },
          time:    { type: 'string', description: 'Time in HH:MM 24-hour format (AST)' },
          purpose: { type: 'string', description: 'Purpose of the meeting (optional)' },
        },
        required: ['name', 'email', 'date', 'time'],
      },
    },
  },
]

// ── Tool execution ────────────────────────────────────────────────────────────

async function runTool(name, args) {
  if (name === 'check_availability') {
    try {
      const busy = await checkConflict(args.date, args.time)
      return busy
        ? { available: false, message: `${args.date} at ${args.time} AST is already booked.` }
        : { available: true,  message: `${args.date} at ${args.time} AST is free.` }
    } catch {
      return { available: true, message: 'Could not verify — assuming available.' }
    }
  }

  if (name === 'schedule_interview') {
    const { name: visitorName, email, date, time, purpose } = args

    const startTime = new Date(`${date}T${time}:00+03:00`)
    if (isNaN(startTime) || startTime <= new Date()) {
      return { success: false, error: 'That time is in the past. Please pick a future date.' }
    }

    let eventLink = null
    try {
      const event = await createInterviewEvent({ name: visitorName, email, date, time, purpose })
      if (event) eventLink = event.eventLink
    } catch (err) {
      console.error('[Chat] Calendar error:', err.message)
    }

    await Promise.allSettled([
      sendScheduleEmails({ name: visitorName, email, date, time, purpose, eventLink }),
      sendTelegramMessage(
        `🗓️ <b>Interview via Chatbot!</b>\n\n<b>${visitorName}</b> (${email})\n📅 ${date} at ${time} AST\n💬 ${purpose || 'General'}`
      ),
    ])

    return {
      success: true,
      date,
      time,
      message: `Interview confirmed for ${date} at ${time} AST. Confirmation email sent to ${email}.`,
      ...(eventLink && { eventLink }),
    }
  }

  return { error: 'Unknown tool' }
}

// ── Main handler ──────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const { messages } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' })
    }
    if (!process.env.GROQ_API_KEY) {
      return res.status(503).json({ error: 'GROQ_API_KEY not configured.' })
    }

    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })
    const systemPrompt = SYSTEM_PROMPT.replace('{{TODAY}}', today)

    let chatMessages = messages
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({ role: m.role, content: String(m.content) }))

    // Tool calling loop — max 4 iterations (check + book + confirm)
    for (let i = 0; i < 4; i++) {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: systemPrompt }, ...chatMessages],
          tools: TOOLS,
          tool_choice: 'auto',
          max_tokens: 1024,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        console.error('Groq error:', await response.text())
        return res.status(500).json({ error: 'AI service error. Please try again.' })
      }

      const data = await response.json()
      const message = data.choices?.[0]?.message

      // No tool calls — final text response
      if (!message?.tool_calls?.length) {
        return res.json({ reply: message?.content || 'Sorry, I could not generate a response.' })
      }

      // Add assistant message (with tool_calls) to history
      chatMessages.push(message)

      // Execute each tool and add results
      for (const toolCall of message.tool_calls) {
        let args = {}
        try { args = JSON.parse(toolCall.function.arguments) } catch {}

        const result = await runTool(toolCall.function.name, args)
        chatMessages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        })
      }
    }

    return res.json({ reply: 'Something went wrong. Please try again or use the Contact form.' })

  } catch (err) {
    console.error('Chat error:', err.message)
    return res.status(500).json({ error: 'Failed to get AI response. Please try again.' })
  }
}
