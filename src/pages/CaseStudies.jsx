const logos = [
  'Marriott Hotels', 'Sodexo', 'Compass Group', 'Aramark', 'Hilton Worldwide',
  'Levy Restaurants', 'Delaware North', 'Thompson Hospitality', 'Restaurant Associates',
  'Bon Appétit', 'Chartwells', 'Guckenheimer',
]

const caseStudies = [
  {
    company: 'Pacific Coast Dining Group',
    industry: 'Restaurant group • 42 locations',
    quote: 'We cut food waste by 23% in the first quarter. The forecasts are so accurate we\'ve stopped second-guessing ourselves.',
    author: 'Sarah Chen',
    role: 'VP of Procurement',
    metrics: [
      { value: '23%', label: 'Waste reduction' },
      { value: '12%', label: 'Spend saved' },
      { value: '8 hrs', label: 'Saved per site/week' },
    ],
  },
  {
    company: 'Summit Hotels',
    industry: 'Hotel chain • 18 properties',
    quote: 'Finally, one place to see what we need across all our kitchens. Implementation took two weeks and we saw ROI in the first month.',
    author: 'Marcus Webb',
    role: 'Director of F&B Operations',
    metrics: [
      { value: '19%', label: 'Waste reduction' },
      { value: '94%', label: 'Forecast accuracy' },
      { value: '$180k', label: 'Annual savings' },
    ],
  },
  {
    company: 'Urban Catering Co.',
    industry: 'Catering • 6 kitchens',
    quote: 'Event-based demand was a nightmare to predict. PCI handles seasonality and last-minute changes without us lifting a finger.',
    author: 'Jessica Torres',
    role: 'Operations Manager',
    metrics: [
      { value: '28%', label: 'Waste reduction' },
      { value: '15%', label: 'Cost optimization' },
      { value: '6 hrs', label: 'Planning time saved/week' },
    ],
  },
]

export default function CaseStudies() {
  return (
    <>
      {/* Scrolling logos strip */}
      <section
        style={{
          padding: 'var(--space-12) 0',
          background: 'var(--color-grey-50)',
          borderTop: '1px solid var(--color-grey-200)',
          borderBottom: '1px solid var(--color-grey-200)',
          overflow: 'hidden',
        }}
        aria-label="Companies that trust PCI"
      >
        <div className="logo-scroll-wrap">
          <div className="logo-scroll-track">
            {[...logos, ...logos].map((name, i) => (
              <span
                key={i}
                className="logo-scroll-item"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies content */}
      <section
        style={{
          padding: 'var(--space-24) var(--space-8)',
          background: 'var(--color-white)',
        }}
      >
        <div style={{ maxWidth: 'var(--container-max-width)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <h1
              className="animate-fade-in"
              style={{
                fontSize: 'var(--font-size-4xl)',
                fontWeight: 'var(--font-weight-extrabold)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Real results from real teams
            </h1>
            <p
              className="animate-fade-in animate-delay-1"
              style={{
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-text-secondary)',
                maxWidth: '560px',
                margin: '0 auto',
                lineHeight: 'var(--line-height-loose)',
              }}
            >
              Procurement teams at restaurant groups, hotels, and caterers are cutting waste and optimizing spend with PCI.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-12)',
            }}
          >
            {caseStudies.map((study, i) => (
              <article
                key={i}
                className="card animate-fade-in"
                style={{
                  padding: 'var(--space-10)',
                  maxWidth: '800px',
                  margin: i % 2 === 1 ? '0 0 0 auto' : '0 auto 0 0',
                }}
              >
                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-accent-blue)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {study.industry}
                </p>
                <h2
                  style={{
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {study.company}
                </h2>
                <blockquote
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    lineHeight: 'var(--line-height-loose)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--space-6)',
                    borderLeft: '4px solid var(--color-accent-blue)',
                    paddingLeft: 'var(--space-4)',
                    fontStyle: 'italic',
                  }}
                >
                  "{study.quote}"
                </blockquote>
                <p
                  style={{
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  {study.author}
                </p>
                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-muted)',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  {study.role}
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--space-8)',
                    flexWrap: 'wrap',
                  }}
                >
                  {study.metrics.map((m, j) => (
                    <div key={j}>
                      <span
                        style={{
                          fontSize: 'var(--font-size-2xl)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--color-text-primary)',
                          display: 'block',
                        }}
                      >
                        {m.value}
                      </span>
                      <span
                        style={{
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
