import { createInterviewEvent, checkConflict } from '../services/calendar.js'
import { sendScheduleEmails } from '../services/email.js'
import { sendTelegramMessage } from '../services/telegram.js'

const SYSTEM_PROMPT = `You are Shaheer's AI portfolio assistant. You represent Muhammad Shaheer Gul professionally and answer questions about his background, skills, projects, and experience.

## About Shaheer
- Full Name: Muhammad Shaheer Gul
- Title: Full Stack Developer & Mobile App Architect
- Experience: 5+ years
- Location: Al Jubayl, Saudi Arabia (Transferable Iqama)
- Email: devshaheer360@gmail.com
- Phone: +966-536250307
- Languages: Urdu (native), English (professional)

## Summary
Full Stack Developer specializing in React and React Native with 5+ years building scalable web and mobile applications. Delivered production solutions serving 50K+ users. Expert in frontend architecture, real-time systems, AI-powered interfaces, and cross-platform mobile development.

## Work Experience
1. Front End Developer @ Team Yamama (Remote, Saudi Arabia) — Dec 2024 – Dec 2025
2. Full Stack Developer @ Danalyx (Islamabad) — Sep 2023 – Oct 2024
3. MERN Stack Developer @ Firefly (Rawalpindi) — Nov 2020 – Jun 2023
   - AI Attorney (50K+ users), HUMRAAH (5K+ downloads), SPO Campus Pro (20+ schools)
4. Internee @ Firefly — Jun 2020 – Nov 2020

## Projects
- AI Attorney: Legal AI SaaS — 50K+ users, RAG pipeline (Pinecone + GPT-4), Stripe
- HUMRAAH: Family Planning App — 5K+ downloads, real-time chat, geofencing
- SPO Campus Pro: Multi-Tenant School ERP — 20+ schools, 15K+ students
- Cayuse: Research Management Platform — enterprise-scale, AWS S3, Power BI
- Xcelerate: Field Services Platform — fixed critical geofencing bug

## Technical Skills
- Frontend: React.js, React Native, JavaScript, TypeScript, Tailwind CSS, Redux Toolkit
- Backend: Node.js, Express.js, GraphQL, Socket.io, JWT/RBAC
- Databases: PostgreSQL, MongoDB, Firebase, Supabase, Snowflake
- DevOps: CI/CD, Vercel, AWS (S3, EC2), Docker, Git
- Data Engineering: Python ETL, Pandas, dbt, Airflow, Power BI

## Certifications
- OCI 2025 Certified AI Foundations Associate — Oracle
- Artificial Intelligence Fundamentals — AI For You Oracle
- Foundations of UX Design — Google

## Interview Scheduling
You can book interviews directly in this chat. When someone wants to schedule:
1. Ask for their name and email (if not already given)
2. Ask for preferred date and time (available Mon–Fri, 09:00–17:00 AST/UTC+3, 1 hour slots)
3. Use check_availability to verify the slot is free
4. If busy, suggest the next available hour on the same day or ask for another day
5. Once confirmed, use schedule_interview to book it
6. Tell them a confirmation email has been sent

Today's date: {{TODAY}}

## Response Rules
- Default to short answers (1–3 sentences) unless asked for detail
- No headers or filler phrases — go straight to the answer
- Use bullets only for 3+ items
- Refer to Shaheer in third person
- Do not make up information not listed above`

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
