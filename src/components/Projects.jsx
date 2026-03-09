import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { projects } from '../data/portfolio'

const colorMap = {
  cyan:   { accent: '#6366f1', bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.22)',  hover: 'rgba(99,102,241,0.35)'  },
  purple: { accent: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.22)', hover: 'rgba(139,92,246,0.35)' },
  green:  { accent: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.22)', hover: 'rgba(16,185,129,0.35)' },
  pink:   { accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.22)',  hover: 'rgba(245,158,11,0.35)'  },
}

const CARD_W = 360
const CARD_H = 420
const GAP    = 20

function ArrowBtn({ onClick, disabled, children }) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        width: 38, height: 38, borderRadius: 9, border: '1px solid rgba(255,255,255,0.09)',
        background: disabled ? 'rgba(255,255,255,0.03)' : '#111115',
        color: disabled ? '#3f3f46' : '#a1a1aa',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer', transition: 'all 0.15s ease',
      }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.color = '#f4f4f5' }}}
      onMouseLeave={e => { if (!disabled) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#a1a1aa' }}}
    >{children}</button>
  )
}

function Modal({ proj, onClose }) {
  const c = colorMap[proj.color]
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        style={{ background: '#111115', border: `1px solid ${c.border}`, borderRadius: 16, padding: 32, maxWidth: 560, width: '100%', maxHeight: '85vh', overflowY: 'auto', position: 'relative' }}
      >
        {/* Close */}
        <button onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.04)', color: '#71717a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#f4f4f5'}
          onMouseLeave={e => e.currentTarget.style.color = '#71717a'}
        ><X size={15}/></button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 50, height: 50, borderRadius: 12, flexShrink: 0, background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
            {proj.icon}
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f4f4f5', letterSpacing: '-0.02em', marginBottom: 2 }}>{proj.name}</h3>
            <span style={{ fontSize: 12, color: c.accent, fontWeight: 500 }}>{proj.subtitle}</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18 }}>
          {Object.entries(proj.stats).map(([k, v]) => (
            <span key={k} style={{ padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700, background: c.bg, border: `1px solid ${c.border}`, color: c.accent }}>{v}</span>
          ))}
        </div>

        {/* Description */}
        <p style={{ fontSize: 13.5, color: '#a1a1aa', lineHeight: 1.75, marginBottom: 20 }}>{proj.description}</p>

        {/* Highlights */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10.5, color: '#52525b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, fontFamily: 'JetBrains Mono, monospace' }}>
            Key Highlights
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 0 }}>
            {proj.highlights.map((h, hi) => (
              <li key={hi} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#a1a1aa', lineHeight: 1.65 }}>
                <span style={{ color: c.accent, flexShrink: 0, fontSize: 12, marginTop: 2 }}>▸</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Full tech stack */}
        <div>
          <div style={{ fontSize: 10.5, color: '#52525b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, fontFamily: 'JetBrains Mono, monospace' }}>
            Tech Stack
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {proj.tech.map(t => (
              <span key={t} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#71717a' }}>{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const scrollRef  = useRef(null)
  const [canLeft,  setCanLeft]  = useState(false)
  const [canRight, setCanRight] = useState(true)
  const [selected, setSelected] = useState(null)

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

  const scroll = dir => {
    scrollRef.current?.scrollBy({ left: dir * (CARD_W + GAP), behavior: 'smooth' })
  }

  const selectedProj = selected !== null ? projects[selected] : null

  return (
    <section id="projects" style={{ padding: '108px 0', background: 'rgba(17,17,21,0.5)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>

        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
          style={{ marginBottom: 56 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#6366f1', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
            What I've Built
          </span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginTop: 8 }}>
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 46px)', fontWeight: 800, color: '#f4f4f5', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Featured <span className="text-gradient-warm">Projects</span>
              </h2>
              <p style={{ marginTop: 8, color: '#52525b', fontSize: 14 }}>
                Production apps serving real users across multiple industries.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <ArrowBtn onClick={() => scroll(-1)} disabled={!canLeft}><ChevronLeft size={18}/></ArrowBtn>
              <ArrowBtn onClick={() => scroll(1)}  disabled={!canRight}><ChevronRight size={18}/></ArrowBtn>
            </div>
          </div>

          {/* Track bar */}
          <div style={{ marginTop: 16, height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${100 / projects.length}%`, background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', borderRadius: 2, transition: 'left 0.3s ease' }}/>
          </div>
        </motion.div>

        {/* Carousel */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 48, zIndex: 2, background: 'linear-gradient(to right, var(--bg), transparent)', pointerEvents: 'none', opacity: canLeft ? 1 : 0, transition: 'opacity 0.2s' }}/>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 48, zIndex: 2, background: 'linear-gradient(to left, var(--bg), transparent)', pointerEvents: 'none', opacity: canRight ? 1 : 0, transition: 'opacity 0.2s' }}/>

          <div
            ref={scrollRef}
            style={{ display: 'flex', gap: GAP, overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none', alignItems: 'stretch', cursor: 'grab' }}
            onMouseDown={e => e.currentTarget.style.cursor = 'grabbing'}
            onMouseUp={e => e.currentTarget.style.cursor = 'grab'}
          >
            {projects.map((proj, i) => {
              const c = colorMap[proj.color]
              return (
                <motion.div
                  key={proj.name}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                  style={{
                    width: CARD_W, minWidth: CARD_W, height: CARD_H,
                    flexShrink: 0, scrollSnapAlign: 'start',
                    display: 'flex', flexDirection: 'column',
                    background: '#111115',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 14, padding: 26,
                    transition: 'border-color 0.2s, transform 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = c.hover}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14, gap: 8, flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0, background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                        {proj.icon}
                      </div>
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f4f4f5', letterSpacing: '-0.02em', marginBottom: 2 }}>{proj.name}</h3>
                        <span style={{ fontSize: 12, color: c.accent, fontWeight: 500 }}>{proj.subtitle}</span>
                      </div>
                    </div>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#52525b', flexShrink: 0, paddingTop: 2 }}>{proj.period}</span>
                  </div>

                  {/* Stats */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12, flexShrink: 0 }}>
                    {Object.entries(proj.stats).map(([k, v]) => (
                      <span key={k} style={{ padding: '3px 9px', borderRadius: 100, fontSize: 11, fontWeight: 700, background: c.bg, border: `1px solid ${c.border}`, color: c.accent }}>{v}</span>
                    ))}
                  </div>

                  {/* Description — fills remaining space */}
                  <p style={{ fontSize: 13, color: '#71717a', lineHeight: 1.7, flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                    {proj.description}
                  </p>

                  {/* Tech stack — first 4 tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14, flexShrink: 0 }}>
                    {proj.tech.slice(0, 4).map(t => (
                      <span key={t} style={{ padding: '3px 9px', borderRadius: 6, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#71717a' }}>{t}</span>
                    ))}
                    {proj.tech.length > 4 && (
                      <span style={{ padding: '3px 9px', borderRadius: 6, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#52525b' }}>+{proj.tech.length - 4} more</span>
                    )}
                  </div>

                  {/* View details button — pinned to bottom */}
                  <button
                    onClick={() => setSelected(i)}
                    style={{ marginTop: 14, width: '100%', padding: '9px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', cursor: 'pointer', fontSize: 12, color: '#52525b', fontFamily: 'JetBrains Mono, monospace', transition: 'all 0.15s ease', flexShrink: 0 }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.accent }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#52525b' }}
                  >
                    ▼ view details
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProj && <Modal proj={selectedProj} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
