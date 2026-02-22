import { useState } from 'react'
import { Link } from 'react-router-dom'

const plans = [
  {
    id: 'individual',
    name: 'Individual',
    tagline: 'For single-location operators',
    monthly: 99,
    annual: 79,
    periodLabel: 'per location / month',
    features: [
      'Up to 3 locations',
      'AI demand forecasting',
      'Real-time dashboards',
      'Basic reports & exports',
      'Email support',
    ],
    cta: 'Start free trial',
    ctaVariant: 'secondary',
    highlighted: false,
  },
  {
    id: 'team',
    name: 'Team',
    tagline: 'For growing multi-site operations',
    monthly: 249,
    annual: 199,
    periodLabel: 'per location / month',
    features: [
      'Up to 25 locations',
      'Everything in Individual',
      'Multi-user collaboration',
      'POS & inventory integrations',
      'Advanced analytics & trends',
      'Priority support',
    ],
    cta: 'Start free trial',
    ctaVariant: 'primary',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For large-scale food operations',
    monthly: null,
    annual: null,
    periodLabel: 'Custom pricing',
    features: [
      'Unlimited locations',
      'Everything in Team',
      'Custom integrations & API',
      'Dedicated success manager',
      'SLA & compliance support',
      'On-premise deployment option',
    ],
    cta: 'Contact sales',
    ctaVariant: 'secondary',
    highlighted: false,
  },
]

export default function Pricing() {
  const [billingAnnual, setBillingAnnual] = useState(true)

  return (
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
            Simple, scalable pricing
          </h1>
          <p
            className="animate-fade-in animate-delay-1"
            style={{
              fontSize: 'var(--font-size-lg)',
              color: 'var(--color-text-secondary)',
              maxWidth: '560px',
              margin: '0 auto var(--space-8)',
              lineHeight: 'var(--line-height-loose)',
            }}
          >
            Start with one location, scale as you grow. All plans include a 14-day free trial.
          </p>
          <div
            className="animate-fade-in animate-delay-2"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              padding: 'var(--space-1)',
              background: 'var(--color-grey-100)',
              borderRadius: 'var(--radius-full)',
            }}
          >
            <button
              onClick={() => setBillingAnnual(false)}
              style={{
                padding: 'var(--space-2) var(--space-5)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: billingAnnual ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
                background: billingAnnual ? 'transparent' : 'var(--color-white)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                boxShadow: billingAnnual ? 'none' : 'var(--shadow-sm)',
                transition: 'all var(--transition-base)',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingAnnual(true)}
              style={{
                padding: 'var(--space-2) var(--space-5)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: billingAnnual ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                background: billingAnnual ? 'var(--color-white)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                boxShadow: billingAnnual ? 'var(--shadow-sm)' : 'none',
                transition: 'all var(--transition-base)',
              }}
            >
              Annual
            </button>
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-accent-blue)',
                marginLeft: 'var(--space-2)',
              }}
            >
              Save 20%
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-8)',
            alignItems: 'stretch',
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="card animate-fade-in"
              style={{
                padding: 'var(--space-8)',
                display: 'flex',
                flexDirection: 'column',
                border: plan.highlighted ? '2px solid var(--color-accent-blue)' : undefined,
                boxShadow: plan.highlighted ? 'var(--shadow-lg)' : undefined,
              }}
            >
              {plan.highlighted && (
                <span
                  style={{
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-accent-blue)',
                    background: 'var(--gradient-accent-subtle)',
                    padding: 'var(--space-1) var(--space-3)',
                    borderRadius: 'var(--radius-full)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  Most popular
                </span>
              )}
              <h2
                style={{
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                {plan.name}
              </h2>
              <p
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                {plan.tagline}
              </p>
              <div style={{ marginBottom: 'var(--space-6)' }}>
                {plan.monthly !== null ? (
                  <>
                    <span
                      style={{
                        fontSize: 'var(--font-size-4xl)',
                        fontWeight: 'var(--font-weight-extrabold)',
                        color: 'var(--color-text-primary)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      ${billingAnnual ? plan.annual : plan.monthly}
                    </span>
                    <span
                      style={{
                        fontSize: 'var(--font-size-base)',
                        color: 'var(--color-text-muted)',
                        marginLeft: 'var(--space-1)',
                      }}
                    >
                      {plan.periodLabel}
                    </span>
                  </>
                ) : (
                  <span
                    style={{
                      fontSize: 'var(--font-size-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {plan.periodLabel}
                  </span>
                )}
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  flex: 1,
                  marginBottom: 'var(--space-8)',
                }}
              >
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      fontSize: 'var(--font-size-base)',
                      color: 'var(--color-text-secondary)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--color-accent-blue)',
                        fontWeight: 'var(--font-weight-bold)',
                      }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to={plan.id === 'enterprise' ? '#' : '/pricing'}
                className={`btn ${plan.ctaVariant === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: 'var(--space-3) var(--space-6)',
                }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p
          style={{
            textAlign: 'center',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-muted)',
            marginTop: 'var(--space-12)',
          }}
        >
          No credit card required for trial. Cancel anytime.
        </p>
      </div>
    </section>
  )
}
