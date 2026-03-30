import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ExternalLink, ShoppingBag } from 'lucide-react'
import { projects } from '../data/portfolio'

const colorMap = {
  cyan:   { accent: 'var(--cm-cyan-accent)',   bg: 'var(--cm-cyan-bg)',   border: 'var(--cm-cyan-border)',   hover: 'var(--cm-cyan-hover)'   },
  purple: { accent: 'var(--cm-purple-accent)', bg: 'var(--cm-purple-bg)', border: 'var(--cm-purple-border)', hover: 'var(--cm-purple-hover)' },
  green:  { accent: 'var(--cm-green-accent)',  bg: 'var(--cm-green-bg)',  border: 'var(--cm-green-border)',  hover: 'var(--cm-green-hover)'  },
  pink:   { accent: 'var(--cm-pink-accent)',   bg: 'var(--cm-pink-bg)',   border: 'var(--cm-pink-border)',   hover: 'var(--cm-pink-hover)'   },
}

const CARD_W = 360
const CARD_H = 460
const GAP    = 20

// Play Store icon as SVG
function PlayStoreIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.18 23.76a2 2 0 0 0 2.17-.23l12.14-6.93-3.44-3.44L3.18 23.76zM.29 1.1A2 2 0 0 0 0 2v20a2 2 0 0 0 .29.9l.11.11L11.5 12 .4.99.29 1.1zM23.17 10.31l-2.96-1.69-3.36 3.36 3.36 3.36 3-1.71a2 2 0 0 0 0-3.32zM5.35.47A2 2 0 0 0 3.18.24L14.05 11.1l-3.44-3.44L5.35.47z"/>
    </svg>
  )
}

function LinkButton({ link, accent, bg, border }) {
  const isStore = link.type === 'store'
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '6px 12px', borderRadius: 7, fontSize: 12, fontWeight: 600,
        background: bg, border: `1px solid ${border}`, color: accent,
        textDecoration: 'none', transition: 'opacity 0.15s, transform 0.15s',
        flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'translateY(-1px)' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {isStore ? <PlayStoreIcon size={12} /> : <ExternalLink size={12} />}
      {link.label}
    </a>
  )
}

function ArrowBtn({ onClick, disabled, children }) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        width: 38, height: 38, borderRadius: 9, border: '1px solid var(--border)',
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
      style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--overlay)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        style={{ background: 'var(--surface)', border: `1px solid ${c.border}`, borderRadius: 16, padding: 32, maxWidth: 580, width: '100%', maxHeight: '85vh', overflowY: 'auto', position: 'relative' }}
      >
        {/* Close */}
        <button onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
        ><X size={15}/></button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, flexShrink: 0, background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
            {proj.icon}
          </div>
          <div>
            <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 3 }}>{proj.name}</h3>
            <span style={{ fontSize: 12, color: c.accent, fontWeight: 600 }}>{proj.subtitle}</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 16 }}>
          {Object.entries(proj.stats).map(([k, v]) => (
            <span key={k} style={{ padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700, background: c.bg, border: `1px solid ${c.border}`, color: c.accent }}>{v}</span>
          ))}
        </div>

        {/* Live links */}
        {proj.links?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
            {proj.links.map(link => (
              <LinkButton key={link.url} link={link} accent={c.accent} bg={c.bg} border={c.border} />
            ))}
          </div>
        )}

        {/* Description */}
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 22 }}>{proj.description}</p>

        {/* Highlights */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 10.5, color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, fontFamily: 'JetBrains Mono, monospace' }}>
            Key Highlights
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 0 }}>
            {proj.highlights.map((h, hi) => (
              <li key={hi} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>
                <span style={{ color: c.accent, flexShrink: 0, fontSize: 12, marginTop: 2 }}>▸</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div>
          <div style={{ fontSize: 10.5, color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, fontFamily: 'JetBrains Mono, monospace' }}>
            Tech Stack
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {proj.tech.map(t => (
              <span key={t} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text-dim)' }}>{t}</span>
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
    <section id="projects" style={{ padding: '108px 0', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>

        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
          style={{ marginBottom: 56 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: 'var(--accent)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
            What I've Built
          </span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginTop: 8 }}>
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 46px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Featured <span className="text-gradient-warm">Projects</span>
              </h2>
              <p style={{ marginTop: 8, color: 'var(--text-dim)', fontSize: 14 }}>
                Production apps serving real users across multiple industries.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <ArrowBtn onClick={() => scroll(-1)} disabled={!canLeft}><ChevronLeft size={18}/></ArrowBtn>
              <ArrowBtn onClick={() => scroll(1)}  disabled={!canRight}><ChevronRight size={18}/></ArrowBtn>
            </div>
          </div>

          <div style={{ marginTop: 16, height: 2, background: 'var(--border)', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${100 / projects.length}%`, background: 'linear-gradient(90deg, var(--gradient-from), var(--gradient-to))', borderRadius: 2 }}/>
          </div>
        </motion.div>

        {/* Carousel */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 48, zIndex: 2, background: 'linear-gradient(to right, var(--surface), transparent)', pointerEvents: 'none', opacity: canLeft ? 1 : 0, transition: 'opacity 0.2s' }}/>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 48, zIndex: 2, background: 'linear-gradient(to left, var(--surface), transparent)', pointerEvents: 'none', opacity: canRight ? 1 : 0, transition: 'opacity 0.2s' }}/>

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
                  whileHover={{ y: -4 }}
                  style={{
                    width: CARD_W, minWidth: CARD_W, height: CARD_H,
                    flexShrink: 0, scrollSnapAlign: 'start',
                    display: 'flex', flexDirection: 'column',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 14, padding: 26,
                    transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = c.hover; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14, gap: 8, flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 46, height: 46, borderRadius: 11, flexShrink: 0, background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                        {proj.icon}
                      </div>
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 2 }}>{proj.name}</h3>
                        <span style={{ fontSize: 11.5, color: c.accent, fontWeight: 600 }}>{proj.subtitle}</span>
                      </div>
                    </div>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'var(--text-faint)', flexShrink: 0, paddingTop: 3 }}>{proj.period}</span>
                  </div>

                  {/* Stats */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12, flexShrink: 0 }}>
                    {Object.entries(proj.stats).map(([k, v]) => (
                      <span key={k} style={{ padding: '3px 9px', borderRadius: 100, fontSize: 11, fontWeight: 700, background: c.bg, border: `1px solid ${c.border}`, color: c.accent }}>{v}</span>
                    ))}
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7, flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {proj.description}
                  </p>

                  {/* Tech tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 14, flexShrink: 0 }}>
                    {proj.tech.slice(0, 4).map(t => (
                      <span key={t} style={{ padding: '3px 8px', borderRadius: 5, fontSize: 10.5, fontFamily: 'JetBrains Mono, monospace', background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text-dim)' }}>{t}</span>
                    ))}
                    {proj.tech.length > 4 && (
                      <span style={{ padding: '3px 8px', borderRadius: 5, fontSize: 10.5, fontFamily: 'JetBrains Mono, monospace', background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text-faint)' }}>+{proj.tech.length - 4}</span>
                    )}
                  </div>

                  {/* Link buttons + Details */}
                  <div style={{ marginTop: 16, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {/* Live links */}
                    {proj.links?.length > 0 && (
                      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                        {proj.links.map(link => (
                          <LinkButton key={link.url} link={link} accent={c.accent} bg={c.bg} border={c.border} />
                        ))}
                      </div>
                    )}

                    {/* View details */}
                    <button
                      onClick={() => setSelected(i)}
                      style={{
                        width: '100%', padding: '8px', borderRadius: 8,
                        border: '1px solid var(--border)', background: 'var(--surface2)',
                        cursor: 'pointer', fontSize: 11.5, color: 'var(--text-dim)',
                        fontFamily: 'JetBrains Mono, monospace', transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.accent }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-dim)' }}
                    >
                      ▼ view details
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProj && <Modal proj={selectedProj} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
