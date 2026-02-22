import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <section style={{ padding: 'var(--space-24) var(--space-8)' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-2)' }}>Log in</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          Sign in to your Predictive Culinary Procurement Intelligence account.
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
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-sm)' }}>Email</label>
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
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-sm)' }}>Password</label>
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
              marginBottom: 'var(--space-4)',
              boxSizing: 'border-box',
            }}
          />
          <button
            type="submit"
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
            Log in
          </button>
        </form>
        <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--color-accent-blue)' }}>Sign up</Link>
        </p>
        <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
          <Link to="/admin/login" style={{ color: 'var(--color-accent-blue)' }}>Admin login</Link>
        </p>
      </div>
    </section>
  )
}
