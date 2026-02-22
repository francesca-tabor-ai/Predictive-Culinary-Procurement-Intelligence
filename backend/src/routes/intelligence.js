/**
 * AI Intelligence API routes - ingredient analysis and menu optimization.
 * Requires authentication (optional: admin for sensitive operations).
 */
import { Router } from 'express'
import pool from '../db/pool.js'
import { authRequired } from '../middleware/auth.js'
import { getIngredientIntelligence, getMenuOptimization } from '../services/geminiService.js'

const router = Router()

/** Get AI intelligence for a specific ingredient */
router.post('/api/intelligence/ingredient', authRequired, async (req, res) => {
  try {
    const { ingredientId } = req.body
    if (!ingredientId) {
      return res.status(400).json({ error: 'ingredientId required' })
    }
    const { rows } = await pool.query(
      'SELECT id, name, unit, category, perishability_days FROM ingredients WHERE id = $1',
      [ingredientId]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Ingredient not found' })
    const ingredient = {
      id: rows[0].id,
      name: rows[0].name,
      unit: rows[0].unit,
      category: rows[0].category,
      perishability_days: rows[0].perishability_days,
    }
    const report = await getIngredientIntelligence(ingredient)
    if (!report) {
      return res.status(503).json({ error: 'AI service unavailable or GEMINI_API_KEY not set' })
    }
    report.ingredient_id = ingredientId
    res.json(report)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/** Get menu optimization suggestions for a set of ingredients */
router.post('/api/intelligence/menu-optimization', authRequired, async (req, res) => {
  try {
    const { ingredientIds } = req.body
    if (!Array.isArray(ingredientIds) || ingredientIds.length === 0) {
      return res.status(400).json({ error: 'ingredientIds array required' })
    }
    const { rows } = await pool.query(
      `SELECT id, name, unit, category, perishability_days FROM ingredients WHERE id = ANY($1::uuid[])`,
      [ingredientIds]
    )
    const summary = await getMenuOptimization(rows)
    res.json({ summary })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
