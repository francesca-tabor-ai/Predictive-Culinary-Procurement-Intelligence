import { useState } from 'react'
import { Link } from 'react-router-dom'

const CATEGORIES = [
  'Point of Sale',
  'Inventory',
  'Procurement / Vendors',
  'Analytics & Reporting',
  'Sustainability / Waste',
  'Menu & Recipe',
  'Other',
]

const INTEGRATION_TYPES = [
  'API Integration',
  'Webhook / Event-based',
  'Batch Import/Export',
  'Real-time Sync',
]

export default function BuildApp() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    companyName: '',
    developerEmail: '',
    developerName: '',
    appName: '',
    appDescription: '',
    appCategory: '',
    integrationType: '',
    websiteUrl: '',
    supportEmail: '',
    emergencyContact: '',
    termsAccepted: false,
  })

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const required = {
      1: ['companyName', 'developerName', 'developerEmail'],
      2: ['appName', 'appDescription', 'appCategory', 'integrationType'],
      3: ['supportEmail', 'termsAccepted'],
    }
    for (let s = 1; s <= 3; s++) {
      const missing = required[s].filter((k) => !form[k] || (k === 'termsAccepted' && !form.termsAccepted))
      if (missing.length) {
        setStep(s)
        setError(s === 1 ? 'Please fill in all company and developer fields.' : s === 2 ? 'Please fill in all app details.' : 'Please provide support email and accept the terms.')
        return
      }
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section
        style={{
          padding: 'var(--space-24) var(--space-8)',
          maxWidth: '560px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div
          className="card"
          style={{
            padding: 'var(--space-12)',
            background: 'var(--gradient-accent-subtle)',
            border: '1px solid var(--color-grey-200)',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>✓</div>
          <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-4)' }}>
            Application submitted
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
            We'll review your application within 4–5 business days. You'll receive an email at{' '}
            <strong>{form.developerEmail}</strong> with next steps.
          </p>
          <Link to="/marketplace" className="btn btn-primary">
            Back to Marketplace
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section
      style={{
        padding: 'var(--space-24) var(--space-8)',
        maxWidth: '640px',
        margin: '0 auto',
      }}
    >
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <Link
          to="/marketplace"
          style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)', display: 'inline-block' }}
        >
          ← Marketplace
        </Link>
        <h1
          className="animate-fade-in"
          style={{
            fontSize: 'var(--font-size-4xl)',
            fontWeight: 'var(--font-weight-extrabold)',
            marginBottom: 'var(--space-2)',
          }}
        >
          Build an app
        </h1>
        <p
          className="animate-fade-in animate-delay-1"
          style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-text-secondary)',
          }}
        >
          Submit your app for review. Approved apps appear in the marketplace and reach our customers.
        </p>

        {/* Progress steps */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-2)',
            marginTop: 'var(--space-6)',
          }}
        >
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStep(s)}
              className="btn btn-secondary"
              style={{
                opacity: step === s ? 1 : 0.6,
                padding: 'var(--space-1) var(--space-3)',
                fontSize: 'var(--font-size-xs)',
              }}
            >
              Step {s}
            </button>
          ))}
        </div>
      </header>

      <form onSubmit={handleSubmit} className="animate-fade-in">
        {error && (
          <div
            style={{
              padding: 'var(--space-3)',
              background: 'rgba(220, 38, 38, 0.1)',
              color: '#b91c1c',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)',
            }}
          >
            {error}
          </div>
        )}
        {/* Step 1: Company & Developer */}
        {step === 1 && (
          <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-4)' }}>
              Company & developer info
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <label>
                <span style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-1)' }}>
                  Company / organization name
                </span>
                <input
                  type="text"
                  className="input"
                  value={form.companyName}
                  onChange={(e) => update('companyName', e.target.value)}
                  placeholder="Acme Inc."
                  required
                />
              </label>
              <label>
                <span style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-1)' }}>
                  Developer name
                </span>
                <input
                  type="text"
                  className="input"
                  value={form.developerName}
                  onChange={(e) => update('developerName', e.target.value)}
                  placeholder="Jane Smith"
                  required
                />
              </label>
              <label>
                <span style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-1)' }}>
                  Developer email
                </span>
                <input
                  type="email"
                  className="input"
                  value={form.developerEmail}
                  onChange={(e) => update('developerEmail', e.target.value)}
                  placeholder="developer@company.com"
                  required
                />
              </label>
            </div>
          </div>
        )}

        {/* Step 2: App details */}
        {step === 2 && (
          <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-4)' }}>
              App details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <label>
                <span style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-1)' }}>
                  App name
                </span>
                <input
                  type="text"
                  className="input"
                  value={form.appName}
                  onChange={(e) => update('appName', e.target.value)}
                  placeholder="My PCI Integration"
                  required
                />
              </label>
              <label>
                <span style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-1)' }}>
                  App description
                </span>
                <textarea
                  className="input"
                  value={form.appDescription}
                  onChange={(e) => update('appDescription', e.target.value)}
                  placeholder="Describe what your app does and how it integrates with PCI..."
                  rows={4}
                  required
                  style={{ resize: 'vertical', minHeight: '100px' }}
                />
              </label>
              <label>
                <span style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-1)' }}>
                  Category
                </span>
                <select
                  className="input"
                  value={form.appCategory}
                  onChange={(e) => update('appCategory', e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label>
                <span style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-1)' }}>
                  Integration type
                </span>
                <select
                  className="input"
                  value={form.integrationType}
                  onChange={(e) => update('integrationType', e.target.value)}
                  required
                >
                  <option value="">Select integration type</option>
                  {INTEGRATION_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        )}

        {/* Step 3: URLs & legal */}
        {step === 3 && (
          <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-4)' }}>
              Support & compliance
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <label>
                <span style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-1)' }}>
                  App / company website
                </span>
                <input
                  type="url"
                  className="input"
                  value={form.websiteUrl}
                  onChange={(e) => update('websiteUrl', e.target.value)}
                  placeholder="https://yourcompany.com"
                />
              </label>
              <label>
                <span style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-1)' }}>
                  Support email
                </span>
                <input
                  type="email"
                  className="input"
                  value={form.supportEmail}
                  onChange={(e) => update('supportEmail', e.target.value)}
                  placeholder="support@company.com"
                  required
                />
              </label>
              <label>
                <span style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-1)' }}>
                  Emergency contact (phone or email)
                </span>
                <input
                  type="text"
                  className="input"
                  value={form.emergencyContact}
                  onChange={(e) => update('emergencyContact', e.target.value)}
                  placeholder="+1 555-123-4567"
                />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)', display: 'block' }}>
                  For critical issues or security incidents
                </span>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                <input
                  type="checkbox"
                  checked={form.termsAccepted}
                  onChange={(e) => update('termsAccepted', e.target.checked)}
                  required
                  style={{ marginTop: '0.25rem' }}
                />
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                  I agree to the PCI App Marketplace Agreement and Developer Terms. My app complies with data handling and security requirements.
                </span>
              </label>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            style={{ visibility: step === 1 ? 'hidden' : 'visible' }}
          >
            Back
          </button>
          {step < 3 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setStep((s) => s + 1)}
            >
              Next step
            </button>
          ) : (
            <button type="submit" className="btn btn-accent">
              Submit for review
            </button>
          )}
        </div>
      </form>

      <p style={{ marginTop: 'var(--space-8)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
        Review typically takes 4–5 business days. We'll reach out at the developer email with feedback or approval.
      </p>
    </section>
  )
}
