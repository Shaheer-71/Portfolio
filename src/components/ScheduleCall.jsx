import { useState } from 'react'
import { Calendar, Clock, User, Mail, MessageSquare, CheckCircle, ExternalLink, Video } from 'lucide-react'

const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']

function getAvailableDates(count = 10) {
  const dates = []
  const d = new Date()
  d.setDate(d.getDate() + 1) // start from tomorrow
  while (dates.length < count) {
    const day = d.getDay()
    if (day !== 0 && day !== 6) dates.push(new Date(d)) // skip weekends
    d.setDate(d.getDate() + 1)
  }
  return dates
}

function fmtDate(d) {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function toISO(d) {
  return d.toISOString().split('T')[0]
}

const input = {
  width: '100%', padding: '11px 14px', borderRadius: 8, fontSize: 13,
  background: '#0d0d10', border: '1px solid rgba(255,255,255,0.08)', color: '#f4f4f5',
  outline: 'none', boxSizing: 'border-box',
}

export default function ScheduleCall() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', purpose: '' })
  const [status, setStatus]   = useState(null) // null | 'loading' | 'success' | 'error'
  const [result, setResult]   = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const dates = getAvailableDates()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          purpose: form.purpose,
          date:    toISO(selectedDate),
          time:    selectedTime,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setResult(data)
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Failed to schedule. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try emailing directly.')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <CheckCircle size={24} color="#10b981" />
        </div>
        <h4 style={{ color: '#f4f4f5', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>Interview Scheduled!</h4>
        <p style={{ color: '#71717a', fontSize: 13, lineHeight: 1.6, margin: '0 0 20px' }}>
          {fmtDate(selectedDate)} at {selectedTime} AST<br />
          Check your email for confirmation.
        </p>
        {(result?.eventLink || result?.meetLink) && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {result.eventLink && (
              <a href={result.eventLink} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 8, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', color: '#8b5cf6', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                <ExternalLink size={13} /> Calendar Event
              </a>
            )}
            {result.meetLink && (
              <a href={result.meetLink} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 8, background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                <Video size={13} /> Join Meet
              </a>
            )}
          </div>
        )}
        <button onClick={() => { setStatus(null); setResult(null); setSelectedDate(null); setSelectedTime(null); setForm({ name: '', email: '', purpose: '' }) }}
          style={{ marginTop: 16, background: 'none', border: 'none', color: '#52525b', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>
          Schedule another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Date picker */}
      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#52525b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, fontFamily: 'JetBrains Mono, monospace' }}>
          <Calendar size={12} color="#8b5cf6" /> Select Date
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {dates.map((d) => {
            const iso = toISO(d)
            const active = selectedDate && toISO(selectedDate) === iso
            return (
              <button
                key={iso}
                type="button"
                onClick={() => { setSelectedDate(d); setSelectedTime(null) }}
                style={{
                  padding: '7px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  background: active ? 'rgba(139,92,246,0.15)' : '#0d0d10',
                  border: `1px solid ${active ? '#8b5cf6' : 'rgba(255,255,255,0.07)'}`,
                  color: active ? '#8b5cf6' : '#71717a',
                  transition: 'all 0.15s',
                }}
              >
                {fmtDate(d)}
              </button>
            )
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#52525b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, fontFamily: 'JetBrains Mono, monospace' }}>
            <Clock size={12} color="#00d4ff" /> Select Time (AST)
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTime(t)}
                style={{
                  padding: '7px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  background: selectedTime === t ? 'rgba(0,212,255,0.12)' : '#0d0d10',
                  border: `1px solid ${selectedTime === t ? '#00d4ff' : 'rgba(255,255,255,0.07)'}`,
                  color: selectedTime === t ? '#00d4ff' : '#71717a',
                  transition: 'all 0.15s',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Details form — shown after date + time selected */}
      {selectedDate && selectedTime && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <User size={14} color="#52525b" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                style={{ ...input, paddingLeft: 34 }}
                placeholder="Your Name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div style={{ position: 'relative' }}>
              <Mail size={14} color="#52525b" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                style={{ ...input, paddingLeft: 34 }}
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div style={{ position: 'relative' }}>
              <MessageSquare size={14} color="#52525b" style={{ position: 'absolute', left: 12, top: 12, pointerEvents: 'none' }} />
              <textarea
                style={{ ...input, paddingLeft: 34, resize: 'none', height: 68 }}
                placeholder="Purpose / role you're hiring for (optional)"
                value={form.purpose}
                onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))}
                rows={3}
              />
            </div>
          </div>

          {/* Summary + submit */}
          <div style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: 8, padding: '12px 14px', fontSize: 13, color: '#a1a1aa' }}>
            📅 {fmtDate(selectedDate)} &nbsp;·&nbsp; 🕐 {selectedTime} AST &nbsp;·&nbsp; ⏱ 1 hour
          </div>

          {status === 'error' && (
            <p style={{ margin: 0, fontSize: 13, color: '#f87171', background: 'rgba(248,113,113,0.08)', padding: '10px 14px', borderRadius: 8 }}>
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '13px', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              background: status === 'loading' ? 'rgba(139,92,246,0.4)' : '#8b5cf6',
              border: '1px solid #8b5cf6', color: '#fff', opacity: status === 'loading' ? 0.7 : 1,
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.background = '#7c3aed' }}
            onMouseLeave={e => { if (status !== 'loading') e.currentTarget.style.background = '#8b5cf6' }}
          >
            {status === 'loading' ? 'Scheduling…' : 'Confirm Interview'}
          </button>
        </>
      )}
    </form>
  )
}
