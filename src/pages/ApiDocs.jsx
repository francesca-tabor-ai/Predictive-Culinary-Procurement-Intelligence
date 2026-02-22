export default function ApiDocs() {
  const baseUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001' : 'https://api.pci.example.com')
  const entities = [
    { name: 'organizations', fields: ['name', 'plan_type'], desc: 'Multi-tenant organizations' },
    { name: 'users', fields: ['email', 'password', 'name', 'role', 'organization_id'], desc: 'Platform users (user/admin roles)' },
    { name: 'locations', fields: ['organization_id', 'name', 'address'], desc: 'Kitchens/sites per organization' },
    { name: 'vendors', fields: ['name', 'contact_email', 'phone', 'address'], desc: 'Suppliers' },
    { name: 'ingredients', fields: ['name', 'unit', 'category', 'perishability_days'], desc: 'Procurement items' },
    { name: 'forecasts', fields: ['location_id', 'ingredient_id', 'forecast_date', 'predicted_quantity', 'confidence'], desc: 'Demand predictions' },
    { name: 'inventory', fields: ['location_id', 'ingredient_id', 'quantity', 'unit'], desc: 'Current stock per location' },
    { name: 'purchase_orders', fields: ['location_id', 'vendor_id', 'status', 'order_date'], desc: 'Purchase orders (draft/submitted/delivered/cancelled)' },
    { name: 'purchase_order_items', fields: ['purchase_order_id', 'ingredient_id', 'quantity', 'unit_price'], desc: 'PO line items' },
    { name: 'menu_items', fields: ['organization_id', 'name'], desc: 'Recipes/dishes' },
    { name: 'menu_item_ingredients', fields: ['menu_item_id', 'ingredient_id', 'quantity', 'unit'], desc: 'Recipe/usage mappings' },
  ]

  return (
    <section
      className="api-docs"
      style={{
        padding: 'var(--space-24) var(--space-8)',
        maxWidth: 'var(--container-max-width)',
        margin: '0 auto',
      }}
    >
      <header style={{ marginBottom: 'var(--space-12)' }}>
        <h1
          className="animate-fade-in"
          style={{
            fontSize: 'var(--font-size-4xl)',
            fontWeight: 'var(--font-weight-extrabold)',
            marginBottom: 'var(--space-4)',
          }}
        >
          API Reference
        </h1>
        <p
          className="animate-fade-in animate-delay-1"
          style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
          }}
        >
          REST API for programmatic access. Base URL: <code style={{ background: 'var(--color-grey-100)', padding: '0.125rem 0.375rem', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: 'var(--font-size-sm)' }}>{baseUrl}</code>. All CRUD endpoints require admin JWT in <code style={{ background: 'var(--color-grey-100)', padding: '0.125rem 0.375rem', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: 'var(--font-size-sm)' }}>Authorization: Bearer &lt;token&gt;</code>.
        </p>
      </header>

      {/* Auth endpoints */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <h2
          style={{
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: 'var(--space-6)',
            paddingBottom: 'var(--space-2)',
            borderBottom: '1px solid var(--color-grey-200)',
          }}
        >
          Authentication
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <EndpointRow method="POST" path="/auth/signup" body={{ email: 'string', password: 'string', name: 'string (optional)' }} desc="Create user + organization, returns JWT" />
          <EndpointRow method="POST" path="/auth/login" body={{ email: 'string', password: 'string' }} desc="Validate credentials, returns JWT" />
          <EndpointRow method="GET" path="/api/me" desc="Current user (protected)" />
        </div>
      </section>

      {/* Entities & CRUD */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <h2
          style={{
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: 'var(--space-6)',
            paddingBottom: 'var(--space-2)',
            borderBottom: '1px solid var(--color-grey-200)',
          }}
        >
          Entities & CRUD
        </h2>
        {entities.map((entity, i) => (
          <div
            key={entity.name}
            className="card animate-fade-in"
            style={{
              marginBottom: 'var(--space-6)',
              animationDelay: `${(i + 2) * 50}ms`,
            }}
          >
            <h3
              style={{
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-semibold)',
                marginBottom: 'var(--space-2)',
              }}
            >
              <code style={{ fontFamily: 'monospace', background: 'var(--color-grey-100)', padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>{entity.name}</code>
            </h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
              {entity.desc}. Fields: <code style={{ fontSize: 'var(--font-size-xs)', background: 'var(--color-grey-100)', padding: '0.125rem 0.25rem', borderRadius: '2px' }}>{entity.fields.join(', ')}</code>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <EndpointRow method="GET" path={`/api/${entity.name}`} desc="List all" />
              <EndpointRow method="GET" path={`/api/${entity.name}/:id`} desc="Get by ID" />
              <EndpointRow method="POST" path={`/api/${entity.name}`} body={`{ ${entity.fields.slice(0, 3).join(', ') }, ... }`} desc="Create" />
              <EndpointRow method="PATCH" path={`/api/${entity.name}/:id`} body={`{ field: value }`} desc="Update" />
              <EndpointRow method="DELETE" path={`/api/${entity.name}/:id`} desc="Delete" />
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2
          style={{
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: 'var(--space-4)',
            paddingBottom: 'var(--space-2)',
            borderBottom: '1px solid var(--color-grey-200)',
          }}
        >
          Response Codes
        </h2>
        <ul style={{ listStyle: 'none', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          <li><code>200</code> OK — Success (GET, PATCH)</li>
          <li><code>201</code> Created — Success (POST)</li>
          <li><code>204</code> No Content — Success (DELETE)</li>
          <li><code>400</code> Bad Request — Invalid input</li>
          <li><code>401</code> Unauthorized — Missing/invalid token</li>
          <li><code>403</code> Forbidden — Admin required</li>
          <li><code>404</code> Not Found — Resource not found</li>
        </ul>
      </section>
    </section>
  )
}

function EndpointRow({ method, path, body, desc, auth }) {
  const methodColors = {
    GET: 'var(--color-accent-blue)',
    POST: 'var(--color-accent-purple)',
    PATCH: 'var(--color-accent-orange)',
    DELETE: 'var(--color-accent-pink)',
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--space-3)',
        flexWrap: 'wrap',
        fontFamily: 'monospace',
        fontSize: 'var(--font-size-sm)',
      }}
    >
      <span
        style={{
          fontWeight: 'var(--font-weight-semibold)',
          color: methodColors[method] || 'var(--color-text-primary)',
          minWidth: '4rem',
        }}
      >
        {method}
      </span>
      <code style={{ background: 'var(--color-grey-100)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>{path}</code>
      {body && (
        <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>
          body: {typeof body === 'string' ? body : JSON.stringify(body)}
        </span>
      )}
      <span style={{ color: 'var(--color-text-secondary)', fontWeight: 'var(--font-weight-regular)' }}>— {desc}</span>
    </div>
  )
}
