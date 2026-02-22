import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/product', label: 'Product' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/docs', label: 'Docs' },
  { to: '/api-docs', label: 'API' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const location = useLocation()
  const { user, isAdmin, logout } = useAuth()

  return (
    <header className="header-micro">
      <div className="header-inner">
        <Link to="/" className="logo-link">
          PCI
        </Link>
        <nav className="nav-micro">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link ${location.pathname === to ? 'nav-link-active' : ''}`}
            >
              {label}
            </Link>
          ))}
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="nav-link" style={{ marginRight: 'var(--space-2)' }}>
                  Admin
                </Link>
              )}
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginRight: 'var(--space-2)' }}>
                {user.email}
              </span>
              <button
                type="button"
                onClick={() => logout()}
                className="btn btn-secondary btn-micro"
                style={{ padding: 'var(--space-2) var(--space-3)' }}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Log in</Link>
              <Link to="/signup" className="btn btn-primary btn-micro">
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
