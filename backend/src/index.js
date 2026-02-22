import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

import authRoutes from './routes/auth.js'
import crudRoutes from './routes/crud.js'
import pool from './db/pool.js'
import { authRequired } from './middleware/auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
config({ path: path.resolve(__dirname, '../../.env.local') })
config({ path: path.resolve(__dirname, '../../.env') })

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

app.use('/auth', authRoutes)
app.use(crudRoutes)

app.get('/api/me', authRequired, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, email, name, role, organization_id FROM users WHERE id = $1`,
      [req.userId]
    )
    if (!rows[0]) return res.status(404).json({ error: 'User not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/health', (_, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})
