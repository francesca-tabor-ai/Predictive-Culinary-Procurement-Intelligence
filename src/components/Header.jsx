import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/product', label: 'Product' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/docs', label: 'Docs' },
]

export default function Header() {
  const location = useLocation()

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
          <Link to="/" className="btn btn-primary btn-micro">
            Get started
          </Link>
        </nav>
      </div>
    </header>
  )
}
