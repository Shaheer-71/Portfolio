import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const ids = links.map(l => l.href.slice(1))
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goto = href => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 64,
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        background: scrolled ? 'rgba(9,9,11,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 12L8 3.5L13 12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.2 9H10.8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700, color: '#f4f4f5', letterSpacing: '-0.02em' }}>
            shaheer<span style={{ color: '#6366f1' }}>.dev</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="nav-desktop-links">
          {links.map(l => {
            const isActive = active === l.href.slice(1)
            return (
              <button key={l.href} onClick={() => goto(l.href)} style={{
                background: isActive ? 'rgba(99,102,241,0.1)' : 'none',
                border: 'none', cursor: 'pointer',
                padding: '6px 14px', borderRadius: 8, fontSize: 13.5, fontWeight: isActive ? 600 : 500,
                color: isActive ? '#818cf8' : '#a1a1aa',
                transition: 'all 0.15s ease', letterSpacing: '-0.01em',
              }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = '#e4e4e7'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.background = 'none' }}}
              >{l.label}</button>
            )
          })}
          <a href="mailto:devshaheer360@gmail.com" style={{
            marginLeft: 12, padding: '7px 18px', borderRadius: 8, fontSize: 13.5, fontWeight: 600,
            background: '#6366f1', color: '#fff', textDecoration: 'none', transition: 'background 0.15s ease', letterSpacing: '-0.01em',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#4f46e5'}
            onMouseLeave={e => e.currentTarget.style.background = '#6366f1'}
          >Hire Me</a>
        </div>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="nav-hamburger">
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(9,9,11,0.98)', borderBottom: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {links.map(l => (
                <button key={l.href} onClick={() => goto(l.href)} style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0',
                  textAlign: 'left', fontSize: 15, fontWeight: 500,
                  color: active === l.href.slice(1) ? '#818cf8' : '#a1a1aa',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>{l.label}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
