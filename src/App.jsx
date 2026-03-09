import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import ChatBot from './components/ChatBot'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <Hero onChatOpen={() => setChatOpen(true)} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(prev => !prev)} />

      {/* Floating Chat Button when panel is closed */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          title="Chat with AI about Shaheer"
          style={{
            position: 'fixed', bottom: 32, right: 32, zIndex: 200,
            width: 56, height: 56, borderRadius: '50%', cursor: 'pointer',
            background: '#6366f1',
            border: 'none', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 24px rgba(99,102,241,0.4)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#4f46e5'; e.currentTarget.style.transform = 'scale(1.07)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      )}
    </div>
  )
}
