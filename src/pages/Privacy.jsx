import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <section
      style={{
        padding: 'var(--space-24) var(--space-8)',
        maxWidth: '700px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)', marginBottom: 'var(--space-4)' }}>
        Privacy Policy
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
        Last updated: {new Date().toLocaleDateString()}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div>
          <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
            Information We Collect
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            We collect information you provide when signing up, using our services, or contacting us. This includes name, email address, organization details, and usage data necessary to operate our forecasting platform.
          </p>
        </div>
        <div>
          <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
            How We Use Your Data
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            We use your data to provide, maintain, and improve our services; to communicate with you; and to comply with legal obligations. We do not sell your personal information to third parties.
          </p>
        </div>
        <div>
          <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
            Data Security
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            We implement industry-standard security measures to protect your data. Access to sensitive information is restricted and encrypted in transit and at rest.
          </p>
        </div>
        <div>
          <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
            Contact
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            For questions about this privacy policy, contact us via the <Link to="/contact" style={{ color: 'var(--color-accent-blue)' }}>Contact</Link> page.
          </p>
        </div>
      </div>
    </section>
  )
}
