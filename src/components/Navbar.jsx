import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'

const links = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')
  const [open, setOpen]         = useState(false)
  const dark = theme === 'dark'

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
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--accent), var(--gradient-to))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 12L8 3.5L13 12" stroke={dark ? '#020C1B' : '#fff'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.2 9H10.8" stroke={dark ? '#020C1B' : '#fff'} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            shaheer<span style={{ color: 'var(--accent)' }}>.dev</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="nav-desktop-links">
          {links.map(l => {
            const isActive = active === l.href.slice(1)
            return (
              <button key={l.href} onClick={() => goto(l.href)} style={{
                background: isActive ? 'var(--accent-bg)' : 'none',
                border: 'none', cursor: 'pointer',
                padding: '6px 14px', borderRadius: 8, fontSize: 13.5, fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                transition: 'all 0.15s ease', letterSpacing: '-0.01em',
              }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--border)' }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'none' }}}
              >{l.label}</button>
            )
          })}

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              marginLeft: 8, width: 36, height: 36, borderRadius: 8, border: '1px solid var(--border)',
              background: 'var(--surface)', color: 'var(--text-muted)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <a href="mailto:devshaheer360@gmail.com" style={{
            marginLeft: 8, padding: '7px 18px', borderRadius: 8, fontSize: 13.5, fontWeight: 600,
            background: 'var(--accent)', color: dark ? '#020C1B' : '#fff', textDecoration: 'none',
            transition: 'opacity 0.15s ease', letterSpacing: '-0.01em',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Hire Me</a>
        </div>

        {/* Mobile hamburger only */}
        <button onClick={() => setOpen(!open)} className="nav-hamburger">
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ background: 'var(--nav-bg)', borderBottom: '1px solid var(--border)', overflow: 'hidden', backdropFilter: 'blur(20px)' }}>
            <div style={{ padding: '12px 24px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {links.map(l => (
                <button key={l.href} onClick={() => goto(l.href)} style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0',
                  textAlign: 'left', fontSize: 15, fontWeight: 500,
                  color: active === l.href.slice(1) ? 'var(--accent)' : 'var(--text-muted)',
                  borderBottom: '1px solid var(--border)',
                }}>{l.label}</button>
              ))}
              <button onClick={() => { onToggleTheme(); setOpen(false) }} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0',
                textAlign: 'left', fontSize: 15, fontWeight: 500, color: 'var(--text-muted)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                {dark ? <Sun size={16} /> : <Moon size={16} />}
                {dark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
