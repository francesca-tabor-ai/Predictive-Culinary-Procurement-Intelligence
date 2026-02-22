export default function Status() {
  return (
    <section
      style={{
        padding: 'var(--space-24) var(--space-8)',
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)', marginBottom: 'var(--space-4)' }}>
        System Status
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
        All systems operational.
      </p>
      <div
        className="card"
        style={{
          padding: 'var(--space-6)',
          display: 'inline-block',
          background: 'var(--color-grey-50)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'var(--color-accent-green, #22c55e)',
            }}
          />
          <span style={{ fontWeight: 600 }}>API</span>
          <span style={{ color: 'var(--color-text-muted)' }}>Operational</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'var(--color-accent-green, #22c55e)',
            }}
          />
          <span style={{ fontWeight: 600 }}>Dashboard</span>
          <span style={{ color: 'var(--color-text-muted)' }}>Operational</span>
        </div>
      </div>
    </section>
  )
}
