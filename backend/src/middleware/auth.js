import jwt from 'jsonwebtoken'
import pool from '../db/pool.js'

const JWT_SECRET = process.env.JWT_SECRET || 'pci-dev-secret-change-in-production'

export function authRequired(req, res, next) {
  const auth = req.headers.authorization
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' })
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.userId = payload.userId
    req.userRole = payload.role
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

export function adminRequired(req, res, next) {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}
