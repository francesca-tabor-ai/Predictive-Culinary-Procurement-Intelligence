import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section
      style={{
        padding: 'var(--space-24) var(--space-8)',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)', marginBottom: 'var(--space-4)' }}>
        404
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)', maxWidth: '400px' }}>
        This page doesn&apos;t exist. Check the URL or head back to the homepage.
      </p>
      <Link to="/" className="btn btn-primary">
        Go to homepage
      </Link>
    </section>
  )
}
