import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/product', label: 'Product' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/docs', label: 'Docs' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const location = useLocation()
  const { user, isAdmin } = useAuth()

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
              <Link to="/" className="btn btn-primary btn-micro">
                {user.email}
              </Link>
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
