import { Link } from 'react-router-dom'

const footerLinks = [
  { to: '/product', label: 'Product', isLink: true },
  { to: '/case-studies', label: 'Case Studies', isLink: true },
  { to: '/pricing', label: 'Pricing', isLink: true },
  { to: '/docs', label: 'Docs', isLink: true },
  { to: '/api-docs', label: 'API Docs', isLink: true },
  { to: '/marketplace', label: 'App Marketplace', isLink: true },
  { to: '/contact', label: 'Contact', isLink: true },
  { to: '#', label: 'Status', isLink: false },
  { to: '#', label: 'Privacy', isLink: false },
]

export default function Footer() {
  return (
    <footer className="footer-micro">
      <div className="footer-inner">
        <Link to="/" className="footer-logo">
          PCI
        </Link>
        <div className="footer-links">
          {footerLinks.map(({ to, label, isLink }) =>
            isLink ? (
              <Link key={label} to={to} className="footer-link">
                {label}
              </Link>
            ) : (
              <a key={label} href={to} className="footer-link">
                {label}
              </a>
            )
          )}
        </div>
      </div>
      <p className="footer-copyright">
        © {new Date().getFullYear()} Predictive Culinary Procurement Intelligence
      </p>
    </footer>
  )
}
