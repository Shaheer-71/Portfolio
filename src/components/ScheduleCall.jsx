import { useState } from 'react'
import { Calendar, Clock, User, Mail, MessageSquare, CheckCircle, ExternalLink } from 'lucide-react'

const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']

function getAvailableDates(count = 10) {
  const dates = []
  const d = new Date()
  d.setDate(d.getDate() + 1)
  while (dates.length < count) {
    const day = d.getDay()
    if (day !== 0 && day !== 6) dates.push(new Date(d))
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

const inputStyle = {
  width: '100%', padding: '11px 14px', borderRadius: 8, fontSize: 13,
  background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)',
  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
}

export default function ScheduleCall() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', purpose: '' })
  const [status, setStatus]   = useState(null)
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
        <h4 style={{ color: 'var(--text)', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>Interview Scheduled!</h4>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6, margin: '0 0 20px' }}>
          {fmtDate(selectedDate)} at {selectedTime} AST<br />
          Check your email for confirmation.
        </p>
        {result?.eventLink && (
          <a href={result.eventLink} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 8, background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', color: 'var(--accent)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
            <ExternalLink size={13} /> Calendar Event
          </a>
        )}
        <button onClick={() => { setStatus(null); setResult(null); setSelectedDate(null); setSelectedTime(null); setForm({ name: '', email: '', purpose: '' }) }}
          style={{ marginTop: 16, display: 'block', margin: '16px auto 0', background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>
          Schedule another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Date picker */}
      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, fontFamily: 'JetBrains Mono, monospace' }}>
          <Calendar size={12} color="var(--cm-purple-accent)" /> Select Date
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
                  background: active ? 'var(--cm-purple-bg)' : 'var(--surface2)',
                  border: `1px solid ${active ? 'var(--cm-purple-border)' : 'var(--border)'}`,
                  color: active ? 'var(--cm-purple-accent)' : 'var(--text-muted)',
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
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, fontFamily: 'JetBrains Mono, monospace' }}>
            <Clock size={12} color="var(--cm-cyan-accent)" /> Select Time (AST)
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTime(t)}
                style={{
                  padding: '7px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  background: selectedTime === t ? 'var(--cm-cyan-bg)' : 'var(--surface2)',
                  border: `1px solid ${selectedTime === t ? 'var(--cm-cyan-border)' : 'var(--border)'}`,
                  color: selectedTime === t ? 'var(--cm-cyan-accent)' : 'var(--text-muted)',
                  transition: 'all 0.15s',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Details form */}
      {selectedDate && selectedTime && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <User size={14} color="var(--text-dim)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                style={{ ...inputStyle, paddingLeft: 34 }}
                placeholder="Your Name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div style={{ position: 'relative' }}>
              <Mail size={14} color="var(--text-dim)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                style={{ ...inputStyle, paddingLeft: 34 }}
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div style={{ position: 'relative' }}>
              <MessageSquare size={14} color="var(--text-dim)" style={{ position: 'absolute', left: 12, top: 12, pointerEvents: 'none' }} />
              <textarea
                style={{ ...inputStyle, paddingLeft: 34, resize: 'none', height: 68 }}
                placeholder="Purpose / role you're hiring for (optional)"
                value={form.purpose}
                onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))}
                rows={3}
              />
            </div>
          </div>

          {/* Summary */}
          <div style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: 8, padding: '12px 14px', fontSize: 13, color: 'var(--text-muted)' }}>
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
              padding: '13px', borderRadius: 10, fontSize: 14, fontWeight: 700,
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              background: status === 'loading' ? 'var(--accent-bg)' : 'var(--accent)',
              border: '1px solid var(--accent)', color: 'var(--bg)',
              opacity: status === 'loading' ? 0.7 : 1,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { if (status !== 'loading') e.currentTarget.style.opacity = '1' }}
          >
            {status === 'loading' ? 'Scheduling…' : 'Confirm Interview'}
          </button>
        </>
      )}
    </form>
  )
}
