import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Send, Calendar, CheckCircle, User, MessageSquare } from 'lucide-react'
import { personal } from '../data/portfolio'
import ScheduleCall from './ScheduleCall'

const inputStyle = {
  width: '100%', padding: '11px 14px', borderRadius: 8, fontSize: 13,
  background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)',
  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
}

function ContactForm() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Failed to send. Please try emailing directly.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try emailing directly.')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <CheckCircle size={24} color="#10b981" />
        </div>
        <h4 style={{ color: 'var(--text)', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>Message Sent!</h4>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6, margin: '0 0 16px' }}>
          I'll get back to you within 24 hours.<br />Check your inbox for a confirmation.
        </p>
        <button onClick={() => setStatus(null)}
          style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
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
      </div>

      <div style={{ position: 'relative' }}>
        <MessageSquare size={14} color="var(--text-dim)" style={{ position: 'absolute', left: 12, top: 12, pointerEvents: 'none' }} />
        <textarea
          style={{ ...inputStyle, paddingLeft: 34, resize: 'none', height: 110, lineHeight: 1.6 }}
          placeholder="Your message…"
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          required
          rows={4}
        />
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
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '13px', borderRadius: 10, fontSize: 14, fontWeight: 700,
          background: status === 'loading' ? 'var(--accent-bg)' : 'var(--accent)',
          border: '1px solid var(--accent)', color: 'var(--bg)',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.7 : 1, transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.opacity = '0.85' }}
        onMouseLeave={e => { if (status !== 'loading') e.currentTarget.style.opacity = '1' }}
      >
        <Send size={15} />
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}

const TABS = [
  { label: 'Send Message',        icon: Send,     id: 'message' },
  { label: 'Schedule Interview',  icon: Calendar, id: 'schedule' },
]

export default function Contact() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="contact" style={{ padding: '108px 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 72, textAlign: 'center' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--cm-purple-accent)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
            Let's Connect
          </span>
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 800, marginTop: 10, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Get In <span className="text-gradient-warm">Touch</span>
          </h2>
          <p style={{ marginTop: 14, color: 'var(--text-dim)', maxWidth: 480, margin: '14px auto 0', fontSize: 14 }}>
            Open to exciting opportunities, collaborations, and interesting projects. Let's build something great together.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 40, maxWidth: 880, margin: '0 auto' }}>

          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 30, letterSpacing: '-0.02em' }}>
              Contact Information
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              {[
                { icon: Mail,   label: 'Email',    value: personal.email,    href: `mailto:${personal.email}`,  color: 'var(--cm-cyan-accent)' },
                { icon: Phone,  label: 'Phone',    value: personal.phone,    href: `tel:${personal.phone}`,     color: 'var(--cm-purple-accent)' },
                { icon: MapPin, label: 'Location', value: personal.location,                                    color: 'var(--cm-green-accent)' },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color={color} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3, fontFamily: 'JetBrains Mono, monospace' }}>
                      {label}
                    </div>
                    {href ? (
                      <a href={href} style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                        onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                        {value}
                      </a>
                    ) : (
                      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div style={{ marginTop: 40 }}>
              <div style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14, fontFamily: 'JetBrains Mono, monospace' }}>
                Find Me Online
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { icon: Github,   href: personal.github,            label: 'GitHub'   },
                  { icon: Linkedin, href: personal.linkedin,           label: 'LinkedIn' },
                  { icon: Mail,     href: `mailto:${personal.email}`, label: 'Email'    },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                    style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', textDecoration: 'none', transition: 'all 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent-border)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Open to work chip */}
            <div style={{ marginTop: 32 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                Open to work
              </span>
            </div>
          </motion.div>

          {/* Right: Tabbed form */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32 }}>

              {/* Tab switcher */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'var(--surface2)', borderRadius: 10, padding: 4 }}>
                {TABS.map(({ label, icon: Icon }, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveTab(i)}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '9px 10px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                      background: activeTab === i ? 'var(--surface)' : 'transparent',
                      color: activeTab === i ? 'var(--text)' : 'var(--text-dim)',
                      boxShadow: activeTab === i ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Icon size={13} color={activeTab === i ? (i === 0 ? 'var(--cm-cyan-accent)' : 'var(--cm-purple-accent)') : 'var(--text-dim)'} />
                    {label}
                  </button>
                ))}
              </div>

              {activeTab === 0 ? <ContactForm /> : <ScheduleCall />}

            </div>
          </motion.div>

        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: 80, textAlign: 'center', paddingTop: 36, borderTop: '1px solid var(--border)' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--text-faint)' }}>
            Designed &amp; Built by{' '}
            <span className="text-gradient" style={{ fontWeight: 700 }}>Muhammad Shaheer Gul</span>
            {' '}· 2026
          </span>
        </motion.div>

      </div>
    </section>
  )
}
