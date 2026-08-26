import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Sparkles } from 'lucide-react'
import GridBg from './ParticlesBg'
import { personal, skills } from '../data/portfolio'
import { useI18n } from '../i18n'
import profileImg from '../data/image-3-cutout.png'

// Flatten every skill from the data into one de-duplicated list
const allSkills = [...new Set(skills.flatMap(group => group.items.map(item => item.name)))]

const initials = personal.name
  .split(' ')
  .filter(Boolean)
  .slice(0, 2)
  .map(w => w[0])
  .join('')

const ease = [0.22, 1, 0.36, 1]

// Thick, hollow outlined chevron bracket — matches the reference
function Chevron({ dir = 'left', size = 92, style, className }) {
  const id = `chev-grad-${dir}`
  return (
    <svg
      className={className}
      width={size} height={size * 1.18} viewBox="0 0 120 142" fill="none"
      style={{ transform: dir === 'right' ? 'scaleX(-1)' : 'none', filter: 'drop-shadow(0 0 8px var(--accent))', ...style }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%"   className="accent-stop" stopOpacity="0.18" />
          <stop offset="55%"  className="accent-stop" stopOpacity="0.5" />
          <stop offset="100%" className="accent-stop" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <path
        d="M112 14 L22 71 L112 128 L112 98 L66 71 L112 44 Z"
        stroke={`url(#${id})`} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"
      />
    </svg>
  )
}

export default function Hero({ onChatOpen }) {
  const { t } = useI18n()
  const [imgOk, setImgOk] = useState(true)

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg)' }}>
      <GridBg />

      {/* Atmospheric glow behind portrait */}
      <div style={{
        position: 'absolute', top: '46%', right: '8%', transform: 'translateY(-50%)',
        width: 'min(620px, 50vw)', height: 'min(620px, 50vw)', borderRadius: '50%',
        background: 'radial-gradient(circle at center, var(--accent-bg) 0%, transparent 68%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="hero-grid" style={{
        position: 'relative', zIndex: 1, flex: 1,
        maxWidth: 1280, width: '100%', margin: '0 auto', padding: '120px 40px 0',
        display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', alignItems: 'center', gap: 40,
      }}>

        {/* ── Left: copy ───────────────────────────────────────── */}
        <div className="hero-copy" style={{ maxWidth: 620 }}>
          {/* Available badge */}
          <motion.div
            className="hero-available"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.04 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 100, border: '1px solid var(--accent-border)', background: 'var(--accent-bg)', marginBottom: 26 }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 500, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.02em' }}>
              {t('hero.available')}
            </span>
          </motion.div>

          {/* Hello + dot */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            style={{ fontSize: 'clamp(40px, 5.5vw, 60px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--text)', display: 'flex', alignItems: 'flex-end' }}
          >
            {t('hero.hello')}
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--accent)', marginLeft: 6, marginBottom: 10, display: 'inline-block' }} />
          </motion.h1>

          {/* line + name */}
          <motion.div
            className="hero-row-center"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.22 }}
            style={{ display: 'flex', alignItems: 'center', gap: 22, margin: '22px 0 14px' }}
          >
            <span className="hero-line" style={{ width: 64, height: 2, background: 'var(--accent)', flexShrink: 0 }} />
            <span style={{ fontSize: 'clamp(26px, 3.4vw, 40px)', fontWeight: 400, color: 'var(--text-muted)', letterSpacing: '-0.01em' }}>
              {t('hero.im')} {t('hero.name')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.32 }}
            style={{ fontSize: 'clamp(40px, 6.4vw, 78px)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 24 }}
          >
            {t('hero.titleL1')}<br />{t('hero.titleL2')}
          </motion.h2>

          {/* Intro line */}
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.38 }}
            className="hero-intro"
            style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: 460, marginBottom: 36 }}
          >
            {t('hero.intro')}
          </motion.p>

          {/* Hero action buttons */}
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}
          >
            <button
              className="hero-action-button"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '15px 30px', borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: 'pointer',
                background: 'var(--accent)', border: '1px solid var(--accent)', color: 'var(--bg)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 8px 26px -10px var(--accent)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px -10px var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 26px -10px var(--accent)' }}
            >
              {t('hero.bottomWork')}
              <ArrowRight size={16} />
            </button>

            <button
              className="hero-action-button"
              onClick={onChatOpen}
              style={{
                padding: '15px 30px', borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: 'pointer',
                background: 'transparent', border: '1px solid var(--border-hover)', color: 'var(--text)',
                transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <Sparkles size={16} />
              {t('hero.bottomChat')}
            </button>

            <a
              className="hero-action-button hero-action-touch"
              href={`mailto:${personal.email}`}
              style={{
                padding: '15px 30px', borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: 'pointer',
                background: 'transparent', border: '1px solid var(--border-hover)', color: 'var(--text)',
                display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
                transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <Mail size={16} />
              {t('hero.bottomTouch')}
            </a>
          </motion.div>
        </div>

        {/* ── Right: portrait overflowing the ring ─────────────── */}
        <motion.div
          className="hero-portrait"
          initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
        >
          <div style={{ position: 'relative', width: 'min(460px, 42vw)', height: 'min(560px, 52vw)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            {/* Radial glow */}
            <div style={{
              position: 'absolute', top: '46%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '120%', height: '92%', borderRadius: '50%',
              background: 'radial-gradient(circle at center, var(--accent-bg) 0%, transparent 64%)',
              pointerEvents: 'none',
            }} />

            {/* Ring — gradient stroke that fades toward the bottom */}
            <svg
              className="hero-ring"
              viewBox="0 0 200 200" fill="none"
              style={{
                position: 'absolute', top: '53%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 'min(448px, 41vw)', height: 'min(448px, 41vw)',
                pointerEvents: 'none', zIndex: 1,
              }}
            >
              <defs>
                <linearGradient id="ring-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   className="accent-stop" stopOpacity="1" />
                  <stop offset="55%"  className="accent-stop" stopOpacity="1" />
                  <stop offset="100%" className="accent-stop" stopOpacity="0.12" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="94" stroke="url(#ring-grad)" strokeWidth="12" />
            </svg>

            {/* Chevrons — thick hollow brackets, clear of the ring */}
            <Chevron className="hero-ring-chevron hero-ring-chevron-left" dir="left"  size={84} style={{ position: 'absolute', left: '-17%', top: '20%', zIndex: 3 }} />
            <Chevron className="hero-ring-chevron hero-ring-chevron-right" dir="right" size={84} style={{ position: 'absolute', right: '-17%', bottom: '12%', zIndex: 3 }} />

            {/* Person cutout — overflows the ring */}
            {imgOk ? (
              <img
                src={profileImg}
                alt={personal.name}
                onError={() => setImgOk(false)}
                style={{
                  position: 'relative', zIndex: 2, height: '100%', width: 'auto',
                  objectFit: 'contain', objectPosition: 'bottom',
                  transform: 'scale(1.14)', transformOrigin: 'bottom center',
                  filter: 'drop-shadow(0 24px 36px rgba(0,0,0,0.45))',
                }}
              />
            ) : (
              <div style={{ position: 'relative', zIndex: 2, width: 'min(280px, 26vw)', aspectRatio: '1', borderRadius: '50%', background: 'var(--surface2)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14%' }}>
                <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(56px, 9vw, 110px)', fontWeight: 600, color: 'var(--accent)', letterSpacing: '-0.04em' }}>
                  {initials}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Skills marquee ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="hero-tech-strip marquee"
        style={{
          position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)',
          background: 'color-mix(in srgb, var(--surface) 50%, transparent)',
          padding: '24px 0', direction: 'ltr',
        }}
      >
        {/* Rendered twice for a seamless infinite loop */}
        <div className="marquee-track" aria-label="Skills" style={{ direction: 'ltr' }}>
          {[...allSkills, ...allSkills].map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              aria-hidden={i >= allSkills.length}
              style={{ display: 'flex', alignItems: 'center', gap: 24, whiteSpace: 'nowrap', flexShrink: 0, marginRight: 24 }}
            >
              <span style={{ fontSize: 'clamp(15px, 1.7vw, 22px)', fontWeight: 500, color: 'var(--text-faint)', letterSpacing: '-0.01em', lineHeight: 1 }}>
                {skill}
              </span>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', opacity: 0.55, margin: '0 16px', alignSelf: 'center' }} />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
