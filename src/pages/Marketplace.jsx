import { Link } from 'react-router-dom'

const APPS = [
  {
    id: 'pos-sync',
    name: 'POS Sync Pro',
    category: 'Point of Sale',
    description: 'Real-time POS data sync from major systems. Keep sales data and forecasts in sync automatically.',
    icon: '📊',
    installs: '500+',
  },
  {
    id: 'inventory-tracker',
    name: 'Inventory Tracker',
    category: 'Inventory',
    description: 'Track stock levels across locations with automatic reorder triggers and waste analytics.',
    icon: '📦',
    installs: '320+',
  },
  {
    id: 'vendor-connect',
    name: 'Vendor Connect',
    category: 'Procurement',
    description: 'Direct integrations with major food distributors. Compare prices and auto-create POs.',
    icon: '🚚',
    installs: '180+',
  },
  {
    id: 'recipe-costing',
    name: 'Recipe Costing',
    category: 'Analytics',
    description: 'Calculate recipe costs from ingredient prices. Menu margin analysis and portion control.',
    icon: '🧮',
    installs: '420+',
  },
  {
    id: 'waste-watch',
    name: 'Waste Watch',
    category: 'Sustainability',
    description: 'Monitor food waste by category. Identify hotspots and reduce spoilage with AI recommendations.',
    icon: '♻️',
    installs: '250+',
  },
  {
    id: 'supply-chain-alerts',
    name: 'Supply Chain Alerts',
    category: 'Procurement',
    description: 'Get alerts on price changes, delivery delays, and supplier issues. Never miss a beat.',
    icon: '🔔',
    installs: '95+',
  },
]

export default function Marketplace() {
  return (
    <section
      style={{
        padding: 'var(--space-24) var(--space-8)',
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
      }}
    >
      <header
        style={{
          marginBottom: 'var(--space-12)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <h1
          className="animate-fade-in"
          style={{
            fontSize: 'var(--font-size-4xl)',
            fontWeight: 'var(--font-weight-extrabold)',
            marginBottom: 'var(--space-4)',
          }}
        >
          App Marketplace
        </h1>
        <p
          className="animate-fade-in animate-delay-1"
          style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-text-secondary)',
            maxWidth: '560px',
            marginBottom: 'var(--space-8)',
          }}
        >
          Integrate with PCI for advanced workflows. Connect POS, inventory, vendors, and analytics in one platform.
        </p>
        <Link
          to="/marketplace/build"
          className="btn btn-accent animate-fade-in animate-delay-2"
        >
          Build an app →
        </Link>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--space-6)',
        }}
      >
        {APPS.map((app, i) => (
          <article
            key={app.id}
            className="card animate-fade-in"
            style={{
              animationDelay: `${(i + 2) * 50}ms`,
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform var(--transition-base)',
            }}
          >
            <div
              style={{
                fontSize: '2.5rem',
                marginBottom: 'var(--space-4)',
              }}
            >
              {app.icon}
            </div>
            <span
              className="badge"
              style={{
                alignSelf: 'flex-start',
                marginBottom: 'var(--space-2)',
              }}
            >
              {app.category}
            </span>
            <h3
              style={{
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-bold)',
                marginBottom: 'var(--space-2)',
              }}
            >
              {app.name}
            </h3>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--line-height-relaxed)',
                flex: 1,
                marginBottom: 'var(--space-4)',
              }}
            >
              {app.description}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 'auto',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--color-grey-200)',
              }}
            >
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                {app.installs} installs
              </span>
              <button className="btn btn-primary" type="button">
                Install
              </button>
            </div>
          </article>
        ))}
      </div>

      <div
        className="card animate-fade-in"
        style={{
          marginTop: 'var(--space-12)',
          background: 'var(--gradient-accent-subtle)',
          border: '1px solid var(--color-grey-200)',
          textAlign: 'center',
          padding: 'var(--space-10)',
        }}
      >
        <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-2)' }}>
          Build your own integration
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          Have a unique workflow? Submit an app to our marketplace and reach thousands of restaurants.
        </p>
        <Link to="/marketplace/build" className="btn btn-accent">
          Apply to build an app
        </Link>
      </div>
    </section>
  )
}
