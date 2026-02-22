import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section
      style={{
        padding: 'var(--space-32) var(--space-8)',
        textAlign: 'center',
        background: 'var(--color-white)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120%',
          height: '60%',
          background: 'var(--gradient-accent-subtle)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.8,
          pointerEvents: 'none',
        }}
        aria-hidden
      />
      <div
        className="animate-fade-in"
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-accent-blue)',
            marginBottom: 'var(--space-4)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          For procurement teams at multi-site food operations
        </p>
        <h1
          style={{
            fontSize: 'var(--font-size-5xl)',
            fontWeight: 'var(--font-weight-extrabold)',
            letterSpacing: '-0.03em',
            lineHeight: '1.1',
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-6)',
          }}
        >
          Stop guessing. Start forecasting.
        </h1>
        <p
          style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-regular)',
            lineHeight: 'var(--line-height-loose)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-10)',
          }}
        >
          You waste up to 25% of food to avoid stockouts. We use AI to predict demand so you order exactly what you need — cutting waste, optimizing spend, and giving you a single source of truth.
        </p>
        <div className="hero-cta" style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/pricing" className="btn btn-primary btn-micro" style={{ padding: 'var(--space-3) var(--space-6)' }}>
            Start free trial
          </Link>
          <Link to="/product" className="btn btn-secondary btn-micro" style={{ padding: 'var(--space-3) var(--space-6)' }}>
            See how it works
          </Link>
        </div>
        <div
          style={{
            marginTop: 'var(--space-24)',
            paddingTop: 'var(--space-8)',
            borderTop: '1px solid var(--color-grey-200)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--space-4)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Trusted by procurement teams at restaurant groups, hotels & caterers
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-8)',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {['Restaurant Groups', 'Hotel Chains', 'Catering Companies', 'Institutional Dining'].map((name, i) => (
              <span
                key={i}
                style={{
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-grey-400)',
                  opacity: 0.8,
                }}
              >
                {name}
              </span>
            ))}
          </div>
          <Link to="/case-studies" style={{ display: 'inline-block', marginTop: 'var(--space-4)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-accent-blue)' }}>
            View case studies →
          </Link>
        </div>
      </div>
    </section>
  )
}
