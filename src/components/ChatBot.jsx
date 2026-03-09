import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react'

const WELCOME = `Hi! I'm Shaheer's AI assistant. 👋

I know everything about Muhammad Shaheer Gul — his skills, projects, work experience, certifications, and more.

Ask me anything like:
• "What projects has Shaheer built?"
• "What are his main skills?"
• "Is he available for hire?"
• "Tell me about AI Attorney"`

const SUGGESTIONS = [
  "What are Shaheer's main skills?",
  'Tell me about his best project',
  'Is he available for hire?',
  'What tech stack does he use?',
]

function Message({ msg }) {
  const isBot = msg.role === 'assistant'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        display: 'flex', gap: 10, alignItems: 'flex-start',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
      }}
    >
      {isBot && (
        <div style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginTop: 2,
          background: '#6366f1',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Bot size={13} color="#fff" />
        </div>
      )}
      <div style={{
        maxWidth: '80%', padding: '10px 14px',
        borderRadius: isBot ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
        background: isBot
          ? '#18181c'
          : 'rgba(99,102,241,0.15)',
        border: isBot
          ? '1px solid rgba(255,255,255,0.07)'
          : '1px solid rgba(99,102,241,0.3)',
        fontSize: 13, lineHeight: 1.7, color: '#f4f4f5',
        whiteSpace: 'pre-wrap',
      }}>
        {msg.content}
      </div>
      {!isBot && (
        <div style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginTop: 2,
          background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <User size={13} color="#818cf8" />
        </div>
      )}
    </motion.div>
  )
}

export default function ChatBot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  const send = async (text) => {
    const userMsg = text || input.trim()
    if (!userMsg || loading) return
    setInput('')
    setError(null)

    const newMessages = [...messages, { role: 'user', content: userMsg }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.filter(m => m.role !== 'system'),
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `Server error: ${res.status}`)
      }

      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError(err.message)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, I couldn't connect right now. Please try again, or reach Shaheer directly at devshaheer360@gmail.com 😊`,
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.94 }}
            onClick={onClose}
            style={{
              position: 'fixed', bottom: 32, right: 32, zIndex: 200,
              width: 56, height: 56, borderRadius: '50%', cursor: 'pointer',
              background: '#6366f1', border: 'none', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
            }}
          >
            <MessageSquare size={22} />
            {/* Pulsing ring */}
            <span style={{
              position: 'absolute', inset: -5, borderRadius: '50%',
              border: '2px solid rgba(99,102,241,0.35)',
              animation: 'chatPulseRing 2s ease-out infinite',
            }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 420 }}
            style={{
              position: 'fixed', bottom: 24, right: 24, zIndex: 200,
              width: 'min(400px, calc(100vw - 32px))',
              height: 'min(580px, calc(100vh - 48px))',
              borderRadius: 16,
              background: '#0d0d10',
              border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: '#6366f1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Bot size={17} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f4f4f5', letterSpacing: '-0.01em' }}>
                    Shaheer's AI
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#10b981' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                    Online · Powered by Claude AI
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#52525b', padding: 6, borderRadius: 8, transition: 'color 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#a1a1aa'}
                onMouseLeave={e => e.currentTarget.style.color = '#52525b'}
              >
                <X size={17} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="chat-scroll"
              style={{ flex: 1, overflowY: 'auto', padding: '18px', display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              {messages.map((msg, i) => <Message key={i} msg={msg} />)}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: '#6366f1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Bot size={13} color="#fff" />
                  </div>
                  <div style={{
                    padding: '10px 14px', borderRadius: '4px 14px 14px 14px',
                    background: '#18181c', border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', gap: 5, alignItems: 'center',
                  }}>
                    {[0, 1, 2].map(i => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        style={{ width: 5, height: 5, borderRadius: '50%', background: '#6366f1', display: 'inline-block' }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions — shown only on first message */}
            {messages.length <= 1 && (
              <div style={{ padding: '0 18px 10px', display: 'flex', flexWrap: 'wrap', gap: 7, flexShrink: 0 }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{
                      padding: '5px 11px', borderRadius: 100, fontSize: 11, cursor: 'pointer',
                      background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
                      color: '#818cf8', fontWeight: 500, transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.16)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.08)'}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: '10px 18px 18px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
              <div
                style={{
                  display: 'flex', gap: 8, alignItems: 'flex-end',
                  background: '#18181c', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12, padding: '9px 12px',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about Shaheer..."
                  rows={1}
                  style={{
                    flex: 1, background: 'none', border: 'none', outline: 'none',
                    color: '#f4f4f5', fontSize: 13, lineHeight: 1.5, resize: 'none',
                    fontFamily: 'Inter, sans-serif', maxHeight: 80, overflowY: 'auto',
                  }}
                  onInput={e => {
                    e.target.style.height = 'auto'
                    e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px'
                  }}
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  style={{
                    width: 32, height: 32, borderRadius: 8, border: 'none', flexShrink: 0,
                    cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                    background: input.trim() && !loading ? '#6366f1' : 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}
                >
                  {loading
                    ? <Loader2 size={14} color="#52525b" style={{ animation: 'chatSpin 1s linear infinite' }} />
                    : <Send size={14} color={input.trim() ? '#fff' : '#52525b'} />
                  }
                </button>
              </div>
              <div style={{ textAlign: 'center', marginTop: 7, fontSize: 10, color: '#3f3f46', fontFamily: 'JetBrains Mono, monospace' }}>
                Powered by Claude AI · Ask anything about Shaheer
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes chatSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes chatPulseRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.4); opacity: 0;   }
          100% { transform: scale(1.4); opacity: 0;   }
        }
      `}</style>
    </>
  )
}
