import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Platform knowledge base — answers to common questions
const KNOWLEDGE_BASE = [
  {
    keywords: ['what', 'platform', 'do', 'product', 'offer', 'help', 'about'],
    response: "Predictive Culinary Procurement Intelligence (PCI) helps multi-site food operations cut waste and optimize spend. We use AI to forecast demand so you order exactly what you need — typically cutting waste 15–25% and procurement costs 10–15%. We're built exclusively for restaurant groups, hotels, caterers, and institutional dining.",
    links: [{ to: '/product', label: 'See how it works →' }],
  },
  {
    keywords: ['pricing', 'cost', 'price', 'expensive', 'plan', 'trial', 'free'],
    response: "We offer three plans: Individual ($79–99/location/month), Team ($199–249/location/month — our most popular), and Enterprise (custom). All plans include a 14-day free trial with no credit card required. Annual billing saves 20%.",
    links: [{ to: '/pricing', label: 'View pricing →' }],
  },
  {
    keywords: ['integrat', 'connect', 'pos', 'inventory', 'vendor', 'api'],
    response: "PCI connects with your POS, inventory systems, and vendors. We provide real-time dashboards and a single source of truth — no more spreadsheet hell. The Team plan includes POS & inventory integrations; Enterprise offers custom integrations and full API access.",
    links: [{ to: '/docs', label: 'Integration guides →' }],
  },
  {
    keywords: ['forecast', 'accuracy', 'ai', 'predict', 'demand'],
    response: "Our AI is purpose-built for food: perishables, menu mix, substitutions, and seasonality. We achieve 90%+ forecast accuracy. Unlike generic inventory tools, we understand the unique challenges of culinary procurement.",
  },
  {
    keywords: ['start', 'get started', 'onboard', 'setup', 'begin'],
    response: "Getting started is easy: sign up for a free trial at /pricing, connect your data (POS, inventory, vendors), and our AI starts learning your patterns. Most teams see value within the first two weeks. We also offer email support (Individual), priority support (Team), or a dedicated success manager (Enterprise).",
    links: [{ to: '/pricing', label: 'Start free trial →' }],
  },
  {
    keywords: ['case study', 'customer', 'result', 'savings', 'testimonial'],
    response: "Our customers typically cut waste 15–25% and procurement costs 10–15%, often saving $150k+ annually. We serve restaurant groups, hotel chains, catering companies, and institutional dining. Check out our case studies for real-world results.",
    links: [{ to: '/case-studies', label: 'View case studies →' }],
  },
  {
    keywords: ['dashboard', 'report', 'metric', 'insight'],
    response: "One dashboard, one source of truth. We consolidate POS, inventory, and vendor data into real-time metrics and actionable insights. Teams typically save 5–15 hours per week on manual tracking.",
  },
  {
    keywords: ['doc', 'documentation', 'api', 'guide', 'reference'],
    response: "Our docs cover API references, integration guides, and best practices. Head to the Documentation section for everything you need to get the most out of PCI.",
    links: [{ to: '/docs', label: 'View documentation →' }],
  },
  {
    keywords: ['support', 'help', 'contact', 'sales', 'enterprise'],
    response: "We offer email support (Individual), priority support (Team), and dedicated success managers (Enterprise). For Enterprise or custom deployments, reach out through our contact sales option on the pricing page.",
    links: [{ to: '/pricing', label: 'Contact options →' }],
  },
]

const PROMPT_PROBES = [
  "What does PCI do?",
  "How much does it cost?",
  "What integrations do you support?",
  "How accurate are the forecasts?",
  "How do I get started?",
  "Who uses PCI?",
]

const DEFAULT_RESPONSE =
  "I'm the PCI assistant. I can answer questions about our platform — forecasting, pricing, integrations, getting started, and more. Try one of the suggested questions above, or ask me anything!"

function getAIResponse(query) {
  const normalized = query.toLowerCase().trim()
  if (!normalized) return { text: "I'd be happy to help! What would you like to know about PCI?", links: [] }

  for (const entry of KNOWLEDGE_BASE) {
    const matches = entry.keywords.filter((k) => normalized.includes(k))
    if (matches.length >= 2 || (matches.length === 1 && normalized.split(/\s+/).length <= 4)) {
      return { text: entry.response, links: entry.links || [] }
    }
  }
  return { text: DEFAULT_RESPONSE, links: [] }
}

function ChatIcon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function CloseIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function SendIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping, isOpen])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const sendMessage = (text) => {
    const trimmed = text?.trim()
    if (!trimmed) return

    const userMsg = { role: 'user', text: trimmed }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const { text: replyText, links } = getAIResponse(trimmed)
      setMessages((m) => [...m, { role: 'assistant', text: replyText, links }])
      setIsTyping(false)
    }, 400 + Math.random() * 300)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleProbeClick = (probe) => {
    sendMessage(probe)
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'var(--space-6)',
        right: 'var(--space-6)',
        zIndex: 1000,
        fontFamily: 'var(--font-family)',
      }}
    >
      {/* Chat panel */}
      {isOpen && (
        <div
          className="chat-panel"
          style={{
            position: 'absolute',
            bottom: 'calc(56px + var(--space-4))',
            right: 0,
            width: 'min(400px, calc(100vw - var(--space-12)))',
            maxHeight: 'min(520px, 70vh)',
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-grey-200)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'chat-slide-up 0.25s ease-out',
          }}
        >
          <div
            style={{
              padding: 'var(--space-4) var(--space-5)',
              borderBottom: '1px solid var(--color-grey-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--gradient-accent-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--gradient-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChatIcon size={18} stroke="white" />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}
                >
                  PCI Assistant
                </h3>
                <p
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-muted)',
                    margin: 0,
                  }}
                >
                  Ask me about the platform
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              style={{
                padding: 'var(--space-2)',
                background: 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)',
                transition: 'background var(--transition-fast), color var(--transition-fast)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--color-grey-200)'
                e.currentTarget.style.color = 'var(--color-text-primary)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--color-text-secondary)'
              }}
            >
              <CloseIcon />
            </button>
          </div>

          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
              minHeight: 200,
            }}
          >
            {messages.length === 0 ? (
              <>
                <div
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 'var(--line-height-relaxed)',
                  }}
                >
                  Hi! I'm here to answer questions about PCI — our forecasting, pricing, integrations, and how to get started. Pick a question below or type your own.
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <span
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--color-text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Suggested questions
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'var(--space-2)',
                    }}
                  >
                    {PROMPT_PROBES.map((probe) => (
                      <button
                        key={probe}
                        type="button"
                        onClick={() => handleProbeClick(probe)}
                        className="chat-probe-btn"
                        style={{
                          padding: 'var(--space-2) var(--space-3)',
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-accent-blue)',
                          background: 'var(--gradient-accent-subtle)',
                          border: '1px solid rgba(37, 99, 235, 0.2)',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)',
                          textAlign: 'left',
                        }}
                      >
                        {probe}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                    }}
                  >
                    <div
                      style={{
                        padding: 'var(--space-3) var(--space-4)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--font-size-sm)',
                        lineHeight: 'var(--line-height-relaxed)',
                        background:
                          msg.role === 'user'
                            ? 'var(--color-text-primary)'
                            : 'var(--color-grey-100)',
                        color: msg.role === 'user' ? 'var(--color-white)' : 'var(--color-text-primary)',
                      }}
                    >
                      {msg.text}
                      {msg.links?.length > 0 && (
                        <div
                          style={{
                            marginTop: 'var(--space-3)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-2)',
                          }}
                        >
                          {msg.links.map((link, j) => (
                            <Link
                              key={j}
                              to={link.to}
                              style={{
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: 'var(--color-accent-blue)',
                                textDecoration: 'none',
                              }}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div
                    style={{
                      alignSelf: 'flex-start',
                      padding: 'var(--space-3) var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-grey-100)',
                      display: 'flex',
                      gap: 4,
                    }}
                  >
                    <span
                      className="typing-dot"
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--color-grey-500)',
                        animation: 'typing-bounce 0.6s ease-in-out infinite',
                      }}
                    />
                    <span
                      className="typing-dot"
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--color-grey-500)',
                        animation: 'typing-bounce 0.6s ease-in-out 0.2s infinite',
                      }}
                    />
                    <span
                      className="typing-dot"
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--color-grey-500)',
                        animation: 'typing-bounce 0.6s ease-in-out 0.4s infinite',
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              padding: 'var(--space-4)',
              borderTop: '1px solid var(--color-grey-200)',
              background: 'var(--color-white)',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-2)',
                alignItems: 'center',
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about PCI..."
                className="input"
                style={{
                  flex: 1,
                  padding: 'var(--space-3) var(--space-4)',
                }}
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="btn btn-primary"
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  minWidth: 44,
                }}
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--gradient-accent)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)',
          transition: 'transform var(--transition-base), box-shadow var(--transition-base)',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
          e.currentTarget.style.boxShadow =
            '0 12px 24px -4px rgba(0, 0, 0, 0.12), 0 6px 12px -2px rgba(0, 0, 0, 0.08)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
        }}
      >
        <ChatIcon size={26} />
      </button>
    </div>
  )
}
