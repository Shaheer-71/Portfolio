import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from 'lucide-react'
import GridBg from './ParticlesBg'
import { personal } from '../data/portfolio'

function useTypewriter(texts, speed = 60, pause = 2000) {
  const [display, setDisplay] = useState('')
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[idx]
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setIdx(i => (i + 1) % texts.length)
    }

    setDisplay(current.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, idx, texts, speed, pause])

  return display
}

export default function Hero({ onChatOpen }) {
  const typed = useTypewriter(personal.taglines)

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <GridBg />

      {/* Subtle indigo radial glow — top-center */}
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 500, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%', paddingTop: 96 }}>
        <div style={{ maxWidth: 760 }}>

          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, border: '1px solid rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.08)', marginBottom: 28 }}
          >
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block',
              animation: 'heroPulse 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: 12, color: '#a5b4fc', fontWeight: 500, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.02em' }}>
              Available for new opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            style={{ fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 18, letterSpacing: '-0.03em' }}
          >
            <span style={{ color: '#f4f4f5' }}>Muhammad</span>
            <br />
            <span className="text-gradient">Shaheer Gul</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            style={{ fontSize: 'clamp(16px, 2.2vw, 22px)', fontWeight: 500, color: '#a1a1aa', marginBottom: 14, letterSpacing: '-0.01em' }}
          >
            Full Stack Developer &amp; Mobile App Architect
          </motion.p>

          {/* Typewriter line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ marginBottom: 44, height: 32, display: 'flex', alignItems: 'center' }}
          >
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(13px, 1.6vw, 16px)', color: '#818cf8' }}>
              {'▸ '}{typed}
              <span style={{ borderRight: '2px solid #818cf8', marginLeft: 2, animation: 'blink 1.1s step-end infinite' }}>&nbsp;</span>
            </span>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            style={{
              display: 'inline-flex', flexWrap: 'wrap', gap: 0, marginBottom: 48,
              background: '#111115', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 12, overflow: 'hidden',
            }}
          >
            {personal.stats.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  padding: '18px 28px', display: 'flex', flexDirection: 'column', gap: 4,
                  borderRight: i < personal.stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}
              >
                <span style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }} className="text-gradient">
                  {stat.value}
                </span>
                <span style={{ fontSize: 12, color: '#52525b', fontWeight: 500, letterSpacing: '0.02em' }}>{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.68 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}
          >
            {/* View My Work */}
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '13px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer',
                background: '#6366f1', border: '1px solid #6366f1', color: '#fff',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'background 0.2s, transform 0.2s',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#5558e3'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              View My Work
              <ArrowRight size={16} />
            </button>

            {/* Chat with AI */}
            <button
              onClick={onChatOpen}
              style={{
                padding: '13px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer',
                background: '#18181c', border: '1px solid rgba(255,255,255,0.1)', color: '#a1a1aa',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.color = '#c7d2fe'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <Sparkles size={16} />
              Chat with AI
            </button>

            {/* Get in Touch */}
            <a
              href={`mailto:${personal.email}`}
              style={{
                padding: '13px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700,
                background: 'transparent', border: '1px solid rgba(255,255,255,0.07)', color: '#71717a',
                display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#71717a'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <Mail size={16} />
              Get in Touch
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            style={{ display: 'flex', gap: 10 }}
          >
            {[
              { icon: Github, href: personal.github, label: 'GitHub' },
              { icon: Linkedin, href: personal.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                title={label}
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: '#18181c', border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#52525b', textDecoration: 'none',
                  transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = '#1f1f24' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#52525b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = '#18181c' }}
              >
                <Icon size={16} />
              </a>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', zIndex: 1 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span style={{ fontSize: 10, color: '#3f3f46', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>scroll</span>
        <motion.div
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ width: 1, height: 28, background: 'linear-gradient(to bottom, #6366f1, transparent)', transformOrigin: 'top' }}
        />
      </motion.div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes heroPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
      `}</style>
    </section>
  )
}
