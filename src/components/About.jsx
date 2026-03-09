import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Globe } from 'lucide-react'
import { personal } from '../data/portfolio'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1 } }),
}

const codeLines = [
  { key: 'name',        value: '"Muhammad Shaheer Gul"',        color: '#ddd6fe' },
  { key: 'role',        value: '"Full Stack & Mobile Dev"',      color: '#ddd6fe' },
  { key: 'experience',  value: '"5+ years"',                    color: '#ddd6fe' },
  { key: 'users',       value: '"50,000+"',                     color: '#ddd6fe' },
  { key: 'specialties', value: '["React", "React Native",',     color: '#ddd6fe', multi: true },
  { key: null,          value: ' "Node.js", "TypeScript"]',     color: '#ddd6fe' },
  { key: 'location',    value: '"Al Jubayl, Saudi Arabia"',     color: '#ddd6fe' },
  { key: 'iqama',       value: '"Transferable"',                color: '#ddd6fe' },
  { key: 'openTo',      value: 'true',                         color: '#93c5fd' },
]

export default function About() {
  return (
    <section id="about" style={{ padding: '108px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} custom={0}
          style={{ marginBottom: 72, textAlign: 'center' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#6366f1', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
            Get to know me
          </span>
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 800, marginTop: 10, color: '#f4f4f5', letterSpacing: '-0.02em' }}>
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 48, alignItems: 'start' }}>

          {/* Left: Bio */}
          <div>
            <motion.p
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={1}
              style={{ fontSize: 16, lineHeight: 1.85, color: '#a1a1aa', marginBottom: 36 }}
            >
              {personal.summary}
            </motion.p>

            {/* Contact rows */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={2}
              style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}
            >
              {[
                { icon: Mail,   label: personal.email,                      href: `mailto:${personal.email}` },
                { icon: Phone,  label: personal.phone,                      href: `tel:${personal.phone}` },
                { icon: MapPin, label: personal.location },
                { icon: Globe,  label: 'English & Urdu — C2 Proficiency' },
              ].map(({ icon: Icon, label, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={15} color="#818cf8" />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#c7d2fe'}
                      onMouseLeave={e => e.target.style.color = '#a1a1aa'}
                    >{label}</a>
                  ) : (
                    <span style={{ color: '#a1a1aa', fontSize: 14 }}>{label}</span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Soft skill tags */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={3}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
            >
              {['Problem-Solving', 'Communication', 'Teamwork', 'Collaboration', 'Adaptability', 'Time Management'].map(s => (
                <span
                  key={s}
                  style={{
                    padding: '5px 13px', borderRadius: 100, fontSize: 12, fontWeight: 500,
                    background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.18)', color: '#a78bfa',
                  }}
                >{s}</span>
              ))}
            </motion.div>
          </div>

          {/* Right: Code card */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={2}
          >
            <div style={{
              background: '#111115', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14, overflow: 'hidden',
            }}>
              {/* Window bar */}
              <div style={{
                padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.02)',
              }}>
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#52525b', marginLeft: 10 }}>shaheer.json</span>
              </div>

              {/* Code content */}
              <div style={{ padding: '22px 24px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 2 }}>
                <div style={{ color: '#3f3f46' }}>{'{'}</div>
                {codeLines.map((line, i) => (
                  <div key={i} style={{ paddingLeft: 20 }}>
                    {line.key && (
                      <span style={{ color: '#71717a' }}>
                        "{line.key}"<span style={{ color: '#3f3f46' }}>: </span>
                      </span>
                    )}
                    {!line.key && <span style={{ display: 'inline-block', width: 'calc(6ch + 4px)' }} />}
                    <span style={{ color: line.color }}>{line.value}</span>
                    {i < codeLines.length - 1 && !line.multi && <span style={{ color: '#3f3f46' }}>,</span>}
                  </div>
                ))}
                <div style={{ color: '#3f3f46' }}>{'}'}</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
