import { Router } from 'express'
import pool from '../db/pool.js'
import { authRequired, adminRequired } from '../middleware/auth.js'

const router = Router()
router.use(authRequired)
router.use(adminRequired)

const TABLES = {
  organizations: ['name', 'plan_type'],
  users: ['email', 'password_hash', 'name', 'role', 'organization_id'],
  locations: ['organization_id', 'name', 'address'],
  vendors: ['name', 'contact_email', 'phone', 'address'],
  ingredients: ['name', 'unit', 'category', 'perishability_days'],
  forecasts: ['location_id', 'ingredient_id', 'forecast_date', 'predicted_quantity', 'confidence'],
  inventory: ['location_id', 'ingredient_id', 'quantity', 'unit'],
  purchase_orders: ['location_id', 'vendor_id', 'status', 'order_date'],
  purchase_order_items: ['purchase_order_id', 'ingredient_id', 'quantity', 'unit_price'],
  menu_items: ['organization_id', 'name'],
  menu_item_ingredients: ['menu_item_id', 'ingredient_id', 'quantity', 'unit'],
}

function crud(table) {
  const cols = TABLES[table]
  if (!cols) return null

  router.get(`/api/${table}`, async (req, res) => {
    try {
      const { rows } = await pool.query(`SELECT * FROM ${table} ORDER BY created_at DESC NULLS LAST`)
      res.json(rows)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  router.get(`/api/${table}/:id`, async (req, res) => {
    try {
      const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [req.params.id])
      if (!rows[0]) return res.status(404).json({ error: 'Not found' })
      res.json(rows[0])
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  router.post(`/api/${table}`, async (req, res) => {
    try {
      const body = req.body
      if (table === 'users' && body.password) {
        const bcrypt = (await import('bcrypt')).default
        body.password_hash = await bcrypt.hash(body.password, 10)
        delete body.password
      }
      const setCols = cols.filter(c => body[c] !== undefined)
      const values = setCols.map(c => body[c])
      const placeholders = setCols.map((_, i) => `$${i + 1}`).join(', ')
      const colList = setCols.join(', ')
      const { rows } = await pool.query(
        `INSERT INTO ${table} (${colList}) VALUES (${placeholders}) RETURNING *`,
        values
      )
      res.status(201).json(rows[0])
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  router.patch(`/api/${table}/:id`, async (req, res) => {
    try {
      const body = req.body
      if (table === 'users' && body.password) {
        const bcrypt = (await import('bcrypt')).default
        body.password_hash = await bcrypt.hash(body.password, 10)
        delete body.password
      }
      const setCols = cols.filter(c => body[c] !== undefined)
      if (setCols.length === 0) return res.status(400).json({ error: 'No valid fields to update' })
      const setClause = setCols.map((c, i) => `${c} = $${i + 1}`).join(', ')
      const values = [...setCols.map(c => body[c]), req.params.id]
      const { rows } = await pool.query(
        `UPDATE ${table} SET ${setClause} WHERE id = $${values.length} RETURNING *`,
        values
      )
      if (!rows[0]) return res.status(404).json({ error: 'Not found' })
      res.json(rows[0])
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  router.delete(`/api/${table}/:id`, async (req, res) => {
    try {
      const { rowCount } = await pool.query(`DELETE FROM ${table} WHERE id = $1`, [req.params.id])
      if (rowCount === 0) return res.status(404).json({ error: 'Not found' })
      res.status(204).send()
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })
}

Object.keys(TABLES).forEach(crud)

export default router
