import { motion } from 'framer-motion'
import { certifications, education } from '../data/portfolio'

const colorMap = {
  cyan:   { accent: '#6366f1', bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.2)' },
  purple: { accent: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)' },
  green:  { accent: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.1 } }),
}

export default function Certifications() {
  return (
    <section id="certifications" style={{ padding: '108px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 72, textAlign: 'center' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#6366f1', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
            Credentials
          </span>
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 800, marginTop: 10, color: '#f4f4f5', letterSpacing: '-0.02em' }}>
            Certifications &amp; <span className="text-gradient">Education</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 48 }}>

          {/* Left: Certifications */}
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#71717a', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 9, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'JetBrains Mono, monospace' }}>
              <span>🏆</span> Certifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {certifications.map((cert, i) => {
                const c = colorMap[cert.color]
                return (
                  <motion.div
                    key={cert.name}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={i}
                    style={{
                      background: '#111115', border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 12, padding: '20px 22px',
                      display: 'flex', alignItems: 'center', gap: 16,
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = c.border}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                      background: c.bg, border: `1px solid ${c.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                    }}>
                      {cert.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: '#f4f4f5', marginBottom: 5, lineHeight: 1.4 }}>{cert.name}</h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
                        <span style={{ fontSize: 12, color: c.accent, fontWeight: 600 }}>{cert.issuer}</span>
                        <span style={{ fontSize: 11, color: '#52525b', fontFamily: 'JetBrains Mono, monospace' }}>{cert.date}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right: Education + Languages */}
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#71717a', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 9, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'JetBrains Mono, monospace' }}>
              <span>🎓</span> Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {education.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} custom={i}
                  style={{
                    background: '#111115', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 12, padding: '20px 22px',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(139,92,246,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: '#f4f4f5', marginBottom: 6, letterSpacing: '-0.01em' }}>{edu.degree}</h4>
                  <p style={{ fontSize: 13, color: '#71717a', marginBottom: 4 }}>{edu.location}</p>
                  <p style={{ fontSize: 12, color: '#52525b' }}>Majors: {edu.majors}</p>
                </motion.div>
              ))}

              {/* Languages card */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={education.length}
                style={{
                  background: '#111115', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12, padding: '20px 22px',
                }}
              >
                <h4 style={{ fontSize: 13, fontWeight: 700, color: '#71717a', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'JetBrains Mono, monospace' }}>
                  🌐 Languages
                </h4>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[
                    { lang: 'English', level: 'C2 — Proficiency', color: '#6366f1' },
                    { lang: 'Urdu',    level: 'C2 — Proficiency', color: '#8b5cf6' },
                  ].map(l => (
                    <div key={l.lang} style={{
                      flex: 1, padding: '12px 14px', borderRadius: 10, textAlign: 'center',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: l.color }}>{l.lang}</div>
                      <div style={{ fontSize: 11, color: '#52525b', marginTop: 4 }}>{l.level}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
