import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../db/pool.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'pci-dev-secret-change-in-production'
const TOKEN_EXPIRY = '7d'

router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }
    const hash = await bcrypt.hash(password, 10)
    const orgRes = await pool.query(
      `INSERT INTO organizations (name) VALUES ($1) RETURNING id`,
      [name ? `${name}'s Organization` : 'New Organization']
    )
    const orgId = orgRes.rows[0].id
    const userRes = await pool.query(
      `INSERT INTO users (email, password_hash, name, role, organization_id) VALUES ($1, $2, $3, 'user', $4) RETURNING id, email, name, role`,
      [email, hash, name || null, orgId]
    )
    const user = userRes.rows[0]
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY })
    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Email already registered' })
    console.error(err)
    res.status(500).json({ error: 'Signup failed' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }
    const res_ = await pool.query(
      `SELECT id, email, password_hash, name, role FROM users WHERE email = $1`,
      [email]
    )
    const user = res_.rows[0]
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.password_hash)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY })
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Login failed' })
  }
})

export default router
