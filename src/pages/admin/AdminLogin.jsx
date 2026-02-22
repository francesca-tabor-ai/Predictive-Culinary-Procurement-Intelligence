import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const user = await login(email, password)
      if (user.role !== 'admin') {
        setError('Admin access only. Please use admin credentials.')
        return
      }
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-8)',
      }}
    >
      <div
        className="card card-micro"
        style={{
          maxWidth: '400px',
          width: '100%',
          padding: 'var(--space-8)',
        }}
      >
        <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-2)' }}>Admin Login</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          Sign in with admin credentials to access the dashboard.
        </p>
        <form onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                padding: 'var(--space-3)',
                background: 'rgba(220, 38, 38, 0.1)',
                color: '#b91c1c',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
              }}
            >
              {error}
            </div>
          )}
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-sm)' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 'var(--space-3)',
              border: '1px solid var(--color-grey-300)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)',
              boxSizing: 'border-box',
            }}
          />
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-sm)' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 'var(--space-3)',
              border: '1px solid var(--color-grey-300)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-6)',
              boxSizing: 'border-box',
            }}
          />
          <button
            type="submit"
            className="card card-micro"
            style={{
              width: '100%',
              padding: 'var(--space-3) var(--space-4)',
              background: 'var(--color-black)',
              color: 'var(--color-white)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
        </form>
        <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
          <Link to="/" style={{ color: 'var(--color-accent-blue)' }}>← Back to site</Link>
        </p>
      </div>
    </div>
  )
}
