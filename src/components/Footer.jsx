import { Link } from 'react-router-dom'

const footerLinks = [
  { to: '/product', label: 'Product' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/docs', label: 'Docs' },
  { to: '/api-docs', label: 'API Docs' },
  { to: '/marketplace', label: 'App Marketplace' },
  { to: '/contact', label: 'Contact' },
  { to: '/status', label: 'Status' },
  { to: '/privacy', label: 'Privacy' },
]

export default function Footer() {
  return (
    <footer className="footer-micro">
      <div className="footer-inner">
        <Link to="/" className="footer-logo">
          PCI
        </Link>
        <div className="footer-links">
          {footerLinks.map(({ to, label }) => (
            <Link key={label} to={to} className="footer-link">
              {label}
            </Link>
          ))}
        </div>
      </div>
      <p className="footer-copyright">
        © {new Date().getFullYear()} Predictive Culinary Procurement Intelligence
      </p>
    </footer>
  )
}
