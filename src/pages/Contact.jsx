import { useState } from 'react'

const CONTACT_EMAIL = 'info@francescatabor.com'

const REQUEST_TYPES = [
  { id: 'support', label: 'Customer Support', prefix: '[Customer Support]' },
  { id: 'bug', label: 'Bug Report', prefix: '[Bug Report]' },
  { id: 'general', label: 'General Inquiry', prefix: '[General Inquiry]' },
]

export default function Contact() {
  const [requestType, setRequestType] = useState('support')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const typeInfo = REQUEST_TYPES.find((t) => t.id === requestType)
    const emailSubject = subject.trim()
      ? `${typeInfo.prefix} ${subject.trim()}`
      : typeInfo.prefix
    const emailBody = [
      message.trim(),
      '',
      '---',
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Request Type: ${typeInfo.label}`,
    ].join('\n')
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    window.location.href = mailto
  }

  return (
    <section
      style={{
        padding: 'var(--space-24) var(--space-8)',
        background: 'var(--color-white)',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          margin: '0 auto',
        }}
      >
        <h1
          className="animate-fade-in"
          style={{
            fontSize: 'var(--font-size-4xl)',
            fontWeight: 'var(--font-weight-extrabold)',
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-4)',
          }}
        >
          Contact us
        </h1>
        <p
          className="animate-fade-in animate-delay-1"
          style={{
            fontSize: 'var(--font-size-lg)',
            lineHeight: 'var(--line-height-loose)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-10)',
          }}
        >
          Have a question, need support, or found a bug? We'll get back to you at{' '}
          <strong>{CONTACT_EMAIL}</strong>.
        </p>

        <form
          onSubmit={handleSubmit}
          className="animate-fade-in animate-delay-2"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
          }}
        >
          <div>
            <label
              htmlFor="request-type"
              style={{
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-2)',
              }}
            >
              Request type
            </label>
            <select
              id="request-type"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="input"
              required
              style={{ cursor: 'pointer' }}
            >
              {REQUEST_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            <div>
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              style={{
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-2)',
              }}
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="input"
              placeholder="Brief summary of your request"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              style={{
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-2)',
              }}
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input"
              placeholder="Describe your request, bug, or question in detail..."
              rows={6}
              required
              style={{
                resize: 'vertical',
                minHeight: '120px',
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: 'var(--space-3) var(--space-8)' }}>
            Send message
          </button>

          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-muted)',
              margin: 0,
            }}
          >
            Submissions will open your email client with a pre-filled message to{' '}
            <strong>{CONTACT_EMAIL}</strong>. You can review and send from there.
          </p>
        </form>
      </div>
    </section>
  )
}
