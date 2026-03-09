import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'
import { personal } from '../data/portfolio'

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '108px 0', background: 'rgba(17,17,21,0.6)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 72, textAlign: 'center' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#8b5cf6', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
            Let's Connect
          </span>
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 800, marginTop: 10, color: '#f4f4f5', letterSpacing: '-0.02em' }}>
            Get In <span className="text-gradient-warm">Touch</span>
          </h2>
          <p style={{ marginTop: 14, color: '#52525b', maxWidth: 480, margin: '14px auto 0', fontSize: 14 }}>
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
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f4f4f5', marginBottom: 30, letterSpacing: '-0.02em' }}>
              Contact Information
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              {[
                { icon: Mail,   label: 'Email',    value: personal.email,    href: `mailto:${personal.email}`,  color: '#6366f1' },
                { icon: Phone,  label: 'Phone',    value: personal.phone,    href: `tel:${personal.phone}`,     color: '#8b5cf6' },
                { icon: MapPin, label: 'Location', value: personal.location,                                    color: '#10b981' },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                    background: `${color}14`, border: `1px solid ${color}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color={color} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#52525b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3, fontFamily: 'JetBrains Mono, monospace' }}>
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        style={{ fontSize: 14, color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = color}
                        onMouseLeave={e => e.target.style.color = '#a1a1aa'}
                      >{value}</a>
                    ) : (
                      <span style={{ fontSize: 14, color: '#a1a1aa' }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div style={{ marginTop: 40 }}>
              <div style={{ fontSize: 11, color: '#52525b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14, fontFamily: 'JetBrains Mono, monospace' }}>
                Find Me Online
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { icon: Github,   href: personal.github,              label: 'GitHub',   hoverColor: '#f4f4f5' },
                  { icon: Linkedin, href: personal.linkedin,             label: 'LinkedIn', hoverColor: '#0077b5' },
                  { icon: Mail,     href: `mailto:${personal.email}`,   label: 'Email',    hoverColor: '#6366f1' },
                ].map(({ icon: Icon, href, label, hoverColor }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    title={label}
                    style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: '#18181c', border: '1px solid rgba(255,255,255,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#52525b', textDecoration: 'none', transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = hoverColor; e.currentTarget.style.borderColor = `${hoverColor}35`; e.currentTarget.style.background = `${hoverColor}10` }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#52525b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = '#18181c' }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Open to work chip */}
            <div style={{ marginTop: 32 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                Open to work
              </span>
            </div>
          </motion.div>

          {/* Right: CTA card */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div style={{
              background: '#111115', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: 40, textAlign: 'center',
            }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#f4f4f5', marginBottom: 12, letterSpacing: '-0.02em' }}>
                Ready to Build Together?
              </h3>
              <p style={{ color: '#71717a', lineHeight: 1.75, marginBottom: 32, fontSize: 14 }}>
                Available for full-time positions, freelance projects, and exciting collaborations. 5+ years of experience and a proven track record — let's create something great.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Email button */}
                <a
                  href={`mailto:${personal.email}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    padding: '14px', borderRadius: 10, fontSize: 14, fontWeight: 700,
                    background: '#6366f1', border: '1px solid #6366f1', color: '#fff', textDecoration: 'none',
                    transition: 'background 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#5558e3'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <Mail size={16} />
                  Send an Email
                </a>

                {/* Call button */}
                <a
                  href={`tel:${personal.phone}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    padding: '14px', borderRadius: 10, fontSize: 14, fontWeight: 700,
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#a1a1aa', textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#f4f4f5'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <Phone size={16} />
                  Schedule a Call
                </a>
              </div>

              {/* Status row */}
              <div style={{
                marginTop: 24, padding: '12px 16px', borderRadius: 10,
                background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                <span style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>Available · Transferable Iqama</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: 80, textAlign: 'center', paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#3f3f46' }}>
            Designed &amp; Built by{' '}
            <span className="text-gradient" style={{ fontWeight: 700 }}>Muhammad Shaheer Gul</span>
            {' '}· 2025
          </span>
        </motion.div>

      </div>
    </section>
  )
}
