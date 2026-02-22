import React from 'react'

export default function DashboardPreview() {
  return (
    <section
      style={{
        padding: 'var(--space-24) var(--space-8)',
        background: 'var(--color-grey-50)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max-width)',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <h2
            style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Your command centre
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
            Real-time dashboards, clear metrics, and actionable insights. Built for procurement teams who move fast.
          </p>
        </div>

        {/* Realistic product mockup — hero of the section */}
        <div
          className="card card-micro animate-fade-in animate-delay-1"
          style={{
            padding: 0,
            overflow: 'hidden',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-grey-200)',
          }}
        >
          {/* Mock dashboard UI */}
          <div
            style={{
              background: 'var(--color-white)',
              padding: 'var(--space-4)',
              borderBottom: '1px solid var(--color-grey-200)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--color-grey-400)',
              }}
            />
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--color-grey-400)',
              }}
            />
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--color-grey-400)',
              }}
            />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '240px 1fr',
              minHeight: '400px',
            }}
          >
            {/* Sidebar */}
            <div
              style={{
                padding: 'var(--space-4)',
                borderRight: '1px solid var(--color-grey-200)',
                background: 'var(--color-grey-50)',
              }}
            >
              {['Overview', 'Forecasts', 'Inventory', 'Reports'].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: 'var(--space-2) var(--space-3)',
                    fontSize: 'var(--font-size-sm)',
                    color: i === 0 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    fontWeight: i === 0 ? 600 : 400,
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
            {/* Main content — data viz mockup */}
            <div style={{ padding: 'var(--space-6)' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                {[
                  { label: 'Forecast accuracy', value: '94.2%', trend: '+'2.1% },
                  { label: 'Waste reduction', value: '23%', trend: '−5%' },
                  { label: 'Cost savings', value: '$12.4k', trend: '+8%' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="card card-micro"
                    style={{
                      padding: 'var(--space-4)',
                      background: 'var(--color-white)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-text-muted)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      {stat.label}
                    </p>
                    <p
                      className="tabular-nums"
                      style={{
                        fontSize: 'var(--font-size-2xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {stat.value}
                    </p>
                    <span
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {stat.trend}
                    </span>
                  </div>
                ))}
              </div>
              {/* Chart placeholder */}
              <div
                style={{
                  height: '200px',
                  background: 'var(--gradient-accent-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-grey-200)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
