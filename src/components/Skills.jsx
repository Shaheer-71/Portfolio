import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { skills } from '../data/portfolio'

const colorMap = {
  cyan:   { accent: 'var(--cm-cyan-accent)',   bg: 'var(--cm-cyan-bg)',   border: 'var(--cm-cyan-border)',   hover: 'var(--cm-cyan-hover)'   },
  purple: { accent: 'var(--cm-purple-accent)', bg: 'var(--cm-purple-bg)', border: 'var(--cm-purple-border)', hover: 'var(--cm-purple-hover)' },
  green:  { accent: 'var(--cm-green-accent)',  bg: 'var(--cm-green-bg)',  border: 'var(--cm-green-border)',  hover: 'var(--cm-green-hover)'  },
  pink:   { accent: 'var(--cm-pink-accent)',   bg: 'var(--cm-pink-bg)',   border: 'var(--cm-pink-border)',   hover: 'var(--cm-pink-hover)'   },
}

const levelDot = { Advanced: 3, Intermediate: 2, Beginner: 1 }

const CARD_W = 310
const CARD_H = 400
const GAP    = 20

function ArrowBtn({ onClick, disabled, children }) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        width: 38, height: 38, borderRadius: 9,
        border: '1px solid var(--border)',
        background: disabled ? 'transparent' : 'var(--surface)',
        color: disabled ? 'var(--text-faint)' : 'var(--text-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer', transition: 'all 0.15s ease',
      }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.color = 'var(--accent)' }}}
      onMouseLeave={e => { if (!disabled) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}}
    >{children}</button>
  )
}

export default function Skills() {
  const scrollRef  = useRef(null)
  const [canLeft,  setCanLeft]  = useState(false)
  const [canRight, setCanRight] = useState(true)

  const updateArrows = () => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 8)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive: true })
    return () => el.removeEventListener('scroll', updateArrows)
  }, [])

  const scroll = dir =>
    scrollRef.current?.scrollBy({ left: dir * (CARD_W + GAP), behavior: 'smooth' })

  return (
    <section id="skills" style={{ padding: '108px 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
          style={{ marginBottom: 48 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: 'var(--cm-purple-accent)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
            Technical Arsenal
          </span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginTop: 8 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 46px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Skills &amp; <span className="text-gradient">Expertise</span>
            </h2>
            <div style={{ display: 'flex', gap: 8 }}>
              <ArrowBtn onClick={() => scroll(-1)} disabled={!canLeft}><ChevronLeft size={18}/></ArrowBtn>
              <ArrowBtn onClick={() => scroll(1)}  disabled={!canRight}><ChevronRight size={18}/></ArrowBtn>
            </div>
          </div>
          <div style={{ marginTop: 16, height: 2, background: 'var(--border)', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${100 / skills.length}%`, background: 'linear-gradient(90deg, var(--gradient-from), var(--gradient-to))', borderRadius: 2, transition: 'left 0.3s ease' }}/>
          </div>
        </motion.div>

        {/* Carousel */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 40, zIndex: 2, background: 'linear-gradient(to right, var(--bg), transparent)', pointerEvents: 'none', opacity: canLeft ? 1 : 0, transition: 'opacity 0.2s' }}/>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 40, zIndex: 2, background: 'linear-gradient(to left, var(--bg), transparent)', pointerEvents: 'none', opacity: canRight ? 1 : 0, transition: 'opacity 0.2s' }}/>

          <div ref={scrollRef}
            style={{ display: 'flex', gap: GAP, overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: 'grab', alignItems: 'stretch' }}
            onMouseDown={e => e.currentTarget.style.cursor = 'grabbing'}
            onMouseUp={e => e.currentTarget.style.cursor = 'grab'}
          >
            {skills.map((cat) => {
              const c = colorMap[cat.color]
              return (
                <motion.div key={cat.category}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                  style={{
                    width: CARD_W, minWidth: CARD_W, height: CARD_H,
                    flexShrink: 0, scrollSnapAlign: 'start',
                    display: 'flex', flexDirection: 'column',
                    background: 'var(--surface)', border: `1px solid ${c.border}`,
                    borderRadius: 14, padding: 26,
                    transition: 'border-color 0.2s, transform 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = c.hover}
                  onMouseLeave={e => e.currentTarget.style.borderColor = c.border}
                >
                  {/* Category header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22, flexShrink: 0 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                      {cat.icon}
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: c.accent, letterSpacing: '-0.01em', margin: 0 }}>{cat.category}</h3>
                  </div>

                  {/* Skills list */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                      {cat.items.map(skill => (
                        <div key={skill.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>{skill.name}</span>
                          <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                            {[1, 2, 3].map(dot => (
                              <div key={dot} style={{ width: 7, height: 7, borderRadius: '50%', background: dot <= levelDot[skill.level] ? c.accent : 'var(--border-hover)' }}/>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', gap: 16, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', flexShrink: 0 }}>
                    <span style={{ color: c.accent }}>●●● Adv</span>
                    <span style={{ color: 'var(--text-faint)' }}>●● Mid</span>
                    <span style={{ color: 'var(--text-faint)' }}>● Beg</span>
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
