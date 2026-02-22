import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { signup, user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) navigate('/', { replace: true })
  }, [loading, user, navigate])

  if (loading || user) {
    return (
      <section style={{ padding: 'var(--space-24) var(--space-8)' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
          <div className="loading-spinner" />
        </div>
      </section>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signup(email, password, name || undefined)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Signup failed')
    }
  }

  return (
    <section style={{ padding: 'var(--space-24) var(--space-8)' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-2)' }}>Sign up</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          Create your Predictive Culinary Procurement Intelligence account.
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
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-sm)' }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={{
              width: '100%',
              padding: 'var(--space-3)',
              border: '1px solid var(--color-grey-300)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)',
              boxSizing: 'border-box',
            }}
          />
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
            minLength={6}
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
            Sign up
          </button>
        </form>
        <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-accent-blue)' }}>Log in</Link>
        </p>
      </div>
    </section>
  )
}
