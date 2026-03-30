import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin } from 'lucide-react'
import { experience } from '../data/portfolio'

const colorMap = {
  cyan:   { accent: 'var(--cm-cyan-accent)',   bg: 'var(--cm-cyan-bg)',   border: 'var(--cm-cyan-border)'   },
  purple: { accent: 'var(--cm-purple-accent)', bg: 'var(--cm-purple-bg)', border: 'var(--cm-purple-border)' },
  green:  { accent: 'var(--cm-green-accent)',  bg: 'var(--cm-green-bg)',  border: 'var(--cm-green-border)'  },
  pink:   { accent: 'var(--cm-pink-accent)',   bg: 'var(--cm-pink-bg)',   border: 'var(--cm-pink-border)'   },
}

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '108px 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 72, textAlign: 'center' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
            Career Path
          </span>
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 800, marginTop: 10, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Work <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute', left: 22, top: 8, bottom: 8, width: 1,
            background: 'linear-gradient(to bottom, var(--accent), var(--gradient-to))',
            opacity: 0.3,
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {experience.map((job, i) => {
              const c = colorMap[job.color]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  style={{ paddingLeft: 56, position: 'relative' }}
                >
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute', left: 12, top: 22,
                    width: 20, height: 20, borderRadius: '50%',
                    background: c.bg, border: `2px solid ${c.accent}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.accent }} />
                  </div>

                  {/* Card */}
                  <div
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 14, padding: 28,
                      transition: 'border-color 0.25s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = c.border}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                      <div>
                        <h3 style={{ fontSize: 19, fontWeight: 700, color: 'var(--text)', marginBottom: 5, letterSpacing: '-0.02em' }}>
                          {job.role}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <Briefcase size={13} color={c.accent} />
                          <span style={{ fontSize: 14, fontWeight: 600, color: c.accent }}>{job.company}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end' }}>
                        <span style={{
                          padding: '3px 11px', borderRadius: 100, fontSize: 11, fontWeight: 600,
                          background: c.bg, border: `1px solid ${c.border}`, color: c.accent,
                        }}>
                          {job.type}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-dim)' }}>
                          <Calendar size={11} />
                          <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{job.period}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-dim)' }}>
                          <MapPin size={11} />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>

                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 9, paddingLeft: 0, listStyle: 'none', marginTop: 14 }}>
                      {job.highlights.map((h, hi) => (
                        <li key={hi} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>
                          <span style={{ color: c.accent, flexShrink: 0, marginTop: 2, fontSize: 12 }}>▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
