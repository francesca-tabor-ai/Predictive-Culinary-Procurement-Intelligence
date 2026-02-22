import { Link } from 'react-router-dom'

export default function HowWeSolve() {
  const solutions = [
    {
      title: 'AI that understands food',
      description: 'Purpose-built for perishables, menu mix, substitutions, and seasonality — not a generic inventory tool.',
      metric: '90%+ forecast accuracy',
    },
    {
      title: 'One dashboard, one source of truth',
      description: 'Connect POS, inventory, and vendors. Real-time metrics, actionable insights, zero spreadsheet hell.',
      metric: '5–15 hrs/week saved',
    },
    {
      title: 'Waste down. Spend optimized.',
      description: 'Order exactly what you need. Customers typically cut waste 15–25% and procurement costs 10–15%.',
      metric: '$150k+ annual savings',
    },
  ]

  return (
    <section
      style={{
        padding: 'var(--space-24) var(--space-8)',
        background: 'var(--color-white)',
      }}
    >
      <div style={{ maxWidth: 'var(--container-max-width)', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
          <h2
            style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-4)',
            }}
          >
            How we solve it
          </h2>
          <p
            style={{
              fontSize: 'var(--font-size-lg)',
              color: 'var(--color-text-secondary)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 'var(--line-height-loose)',
            }}
          >
            Predictive Culinary Procurement Intelligence is built exclusively for food operations — so you get results, not complexity.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-8)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {solutions.map((sol, i) => (
            <div
              key={i}
              className="card animate-fade-in animate-delay-1"
              style={{
                padding: 'var(--space-8)',
                position: 'relative',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--font-size-xl)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {sol.title}
              </h3>
              <p
                style={{
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--line-height-loose)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {sol.description}
              </p>
              <span
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-accent-blue)',
                }}
              >
                {sol.metric}
              </span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to="/pricing" className="btn btn-primary" style={{ padding: 'var(--space-3) var(--space-8)' }}>
            Get started — free trial
          </Link>
        </div>
      </div>
    </section>
  )
}
