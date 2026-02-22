import pg from 'pg'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
config({ path: path.resolve(__dirname, '../../../.env.local') })
config({ path: path.resolve(__dirname, '../../../.env') })

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || process.env.DATABASE_PUBLIC_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

const DROP_ORDER = [
  'menu_item_ingredients', 'menu_items', 'purchase_order_items', 'purchase_orders',
  'inventory', 'forecasts', 'ingredients', 'vendors', 'locations', 'users', 'organizations',
]

async function reset() {
  try {
    for (const table of DROP_ORDER) {
      await pool.query(`DROP TABLE IF EXISTS ${table} CASCADE`)
      console.log(`Dropped ${table}`)
    }
    console.log('All tables dropped. Run "npm run db:migrate" then "npm run db:seed" to recreate.')
  } catch (err) {
    console.error('Reset failed:', err.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

reset()
