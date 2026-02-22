export default function PainPoints() {
  const pains = [
    {
      title: 'Guessing instead of forecasting',
      description: 'Spreadsheets and tribal knowledge fail when menu changes, seasonality, and weather shift demand. Last week\'s order is never next week\'s need.',
    },
    {
      title: 'Chronic over-ordering',
      description: 'Fear of stockouts leads to excess inventory. Perishable food waste averages 15–25% in hospitality — draining margin and sustainability goals.',
    },
    {
      title: 'Scattered data, no single truth',
      description: 'POS, inventory, vendors, and historical orders live in silos. You spend hours reconciling instead of planning.',
    },
    {
      title: 'Reactive firefighting',
      description: 'Price spikes and supply disruptions hit without warning. Teams chase problems instead of preventing them.',
    },
  ]

  return (
    <section
      style={{
        padding: 'var(--space-24) var(--space-8)',
        background: 'var(--color-grey-50)',
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
            Sound familiar?
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
            Procurement teams at food operations face the same bottlenecks every day.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {pains.map((pain, i) => (
            <div
              key={i}
              className="card animate-fade-in"
              style={{
                animationDelay: `${i * 80}ms`,
                padding: 'var(--space-6)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '32px',
                  height: '4px',
                  background: 'var(--gradient-accent)',
                  borderRadius: 'var(--radius-full)',
                  marginBottom: 'var(--space-4)',
                }}
              />
              <h3
                style={{
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {pain.title}
              </h3>
              <p
                style={{
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--line-height-loose)',
                }}
              >
                {pain.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
