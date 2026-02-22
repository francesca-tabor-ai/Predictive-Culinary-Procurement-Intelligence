import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setTokenState] = useState(() => localStorage.getItem('pci_token'))
  const [loading, setLoading] = useState(true)

  const setToken = useCallback((t) => {
    setTokenState(t)
    t ? localStorage.setItem('pci_token', t) : localStorage.removeItem('pci_token')
  }, [])

  useEffect(() => {
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }
    fetch(`${API}/api/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setUser)
      .catch(() => setToken(null))
      .finally(() => setLoading(false))
  }, [token, setToken])

  const login = async (email, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Login failed')
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  const signup = async (email, password, name) => {
    const res = await fetch(`${API}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Signup failed')
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  const api = (path, opts = {}) => {
    const headers = { ...opts.headers }
    if (token) headers.Authorization = `Bearer ${token}`
    return fetch(`${API}${path}`, { ...opts, headers })
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, api, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
