import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AdminCRUD from '../../components/admin/AdminCRUD'

const ENTITIES = [
  { key: 'organizations', label: 'Organizations', columns: ['name', 'plan_type'] },
  { key: 'users', label: 'Users', columns: ['email', 'password', 'name', 'role', 'organization_id'], skipColumns: ['password_hash'], displayColumns: ['email', 'name', 'role'] },
  { key: 'locations', label: 'Locations', columns: ['name', 'address'] },
  { key: 'vendors', label: 'Vendors', columns: ['name', 'contact_email', 'phone'] },
  { key: 'ingredients', label: 'Ingredients', columns: ['name', 'unit', 'category', 'perishability_days'] },
  { key: 'forecasts', label: 'Forecasts', columns: ['forecast_date', 'predicted_quantity', 'confidence'] },
  { key: 'inventory', label: 'Inventory', columns: ['quantity', 'unit'] },
  { key: 'purchase_orders', label: 'Purchase Orders', columns: ['status', 'order_date'] },
  { key: 'purchase_order_items', label: 'PO Items', columns: ['quantity', 'unit_price'] },
  { key: 'menu_items', label: 'Menu Items', columns: ['name'] },
  { key: 'menu_item_ingredients', label: 'Menu Ingredients', columns: ['quantity', 'unit'] },
]

export default function AdminDashboard() {
  const { user, isAdmin, loading, logout } = useAuth()
  const [active, setActive] = useState('organizations')
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) navigate('/admin/login')
    else if (!loading && user && !isAdmin) navigate('/admin/login')
  }, [user, isAdmin, loading, navigate])

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-spinner" />
      </div>
    )
  }

  if (!user || !isAdmin) return null

  const entity = ENTITIES.find((e) => e.key === active)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-grey-50)' }}>
      <header
        style={{
          background: 'var(--color-white)',
          borderBottom: '1px solid var(--color-grey-200)',
          padding: 'var(--space-4) var(--space-8)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600 }}>Admin Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{user.email}</span>
          <Link to="/" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-accent-blue)' }}>Site</Link>
          <button
            onClick={logout}
            style={{
              padding: 'var(--space-2) var(--space-3)',
              background: 'transparent',
              border: '1px solid var(--color-grey-300)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto' }}>
        <nav
          style={{
            width: '220px',
            padding: 'var(--space-4)',
            background: 'var(--color-white)',
            borderRight: '1px solid var(--color-grey-200)',
            minHeight: 'calc(100vh - 65px)',
          }}
        >
          {ENTITIES.map((e) => (
            <button
              key={e.key}
              onClick={() => setActive(e.key)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: 'var(--space-2) var(--space-3)',
                marginBottom: 'var(--space-1)',
                border: 'none',
                background: active === e.key ? 'var(--color-grey-100)' : 'transparent',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm)',
                fontWeight: active === e.key ? 600 : 400,
              }}
            >
              {e.label}
            </button>
          ))}
        </nav>

        <main style={{ flex: 1, padding: 'var(--space-6)' }}>
          {entity && <AdminCRUD entity={entity} />}
        </main>
      </div>
    </div>
  )
}
