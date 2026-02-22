import pg from 'pg'
import bcrypt from 'bcrypt'
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

const ADMIN_EMAIL = 'admin@pci.local'
const ADMIN_PASSWORD = 'Admin123!'
const ADMIN_NAME = 'PCI Admin'

async function seed() {
  const client = await pool.connect()
  try {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10)

    const orgRes = await client.query(
      `INSERT INTO organizations (name, plan_type) VALUES ('Demo Organization', 'team') RETURNING id`
    )
    const orgId = orgRes.rows[0].id

    await client.query(
      `INSERT INTO users (email, password_hash, name, role, organization_id)
       VALUES ($1, $2, $3, 'admin', $4)
       ON CONFLICT (email) DO NOTHING`,
      [ADMIN_EMAIL, passwordHash, ADMIN_NAME, orgId]
    )

    const locRes = await client.query(
      `INSERT INTO locations (organization_id, name, address) VALUES ($1, 'Downtown Kitchen', '123 Main St') RETURNING id`,
      [orgId]
    )
    const locId = locRes.rows[0].id

    const vendorRes = await client.query(
      `INSERT INTO vendors (name, contact_email, phone) VALUES ('Fresh Foods Co', 'orders@freshfoods.com', '555-0100') RETURNING id`
    )
    const vendorId = vendorRes.rows[0].id

    const ingredients = [
      ['Tomatoes', 'kg', 'produce', 7],
      ['Chicken Breast', 'kg', 'meat', 3],
      ['Olive Oil', 'L', 'pantry', 365],
      ['Garlic', 'kg', 'produce', 14],
      ['Onions', 'kg', 'produce', 21],
    ]
    const ingIds = []
    for (const [name, unit, cat, days] of ingredients) {
      const r = await client.query(
        `INSERT INTO ingredients (name, unit, category, perishability_days) VALUES ($1, $2, $3, $4) RETURNING id`,
        [name, unit, cat, days]
      )
      ingIds.push(r.rows[0].id)
    }

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    for (let i = 0; i < ingIds.length; i++) {
      await client.query(
        `INSERT INTO forecasts (location_id, ingredient_id, forecast_date, predicted_quantity, confidence)
         VALUES ($1, $2, $3, $4, 0.92)
         ON CONFLICT (location_id, ingredient_id, forecast_date) DO UPDATE SET predicted_quantity = $4`,
        [locId, ingIds[i], tomorrow.toISOString().slice(0, 10), 10 + i * 5]
      )
    }

    for (let i = 0; i < ingIds.length; i++) {
      await client.query(
        `INSERT INTO inventory (location_id, ingredient_id, quantity, unit)
         VALUES ($1, $2, $3, (SELECT unit FROM ingredients WHERE id = $2))
         ON CONFLICT (location_id, ingredient_id) DO UPDATE SET quantity = $3`,
        [locId, ingIds[i], 5 + i * 2]
      )
    }

    const poRes = await client.query(
      `INSERT INTO purchase_orders (location_id, vendor_id, status, order_date) VALUES ($1, $2, 'draft', CURRENT_DATE) RETURNING id`,
      [locId, vendorId]
    )
    const poId = poRes.rows[0].id
    await client.query(
      `INSERT INTO purchase_order_items (purchase_order_id, ingredient_id, quantity, unit_price) VALUES ($1, $2, 20, 2.50)`,
      [poId, ingIds[0]]
    )
    await client.query(
      `INSERT INTO purchase_order_items (purchase_order_id, ingredient_id, quantity, unit_price) VALUES ($1, $2, 15, 8.00)`,
      [poId, ingIds[1]]
    )

    const menuRes = await client.query(
      `INSERT INTO menu_items (organization_id, name) VALUES ($1, 'Grilled Chicken Salad') RETURNING id`,
      [orgId]
    )
    const menuId = menuRes.rows[0].id
    await client.query(
      `INSERT INTO menu_item_ingredients (menu_item_id, ingredient_id, quantity, unit) VALUES ($1, $2, 0.15, 'kg')`,
      [menuId, ingIds[1]]
    )
    await client.query(
      `INSERT INTO menu_item_ingredients (menu_item_id, ingredient_id, quantity, unit) VALUES ($1, $2, 0.05, 'kg')`,
      [menuId, ingIds[0]]
    )

    console.log('Seed completed successfully.')
    console.log(`Admin: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
  } catch (err) {
    console.error('Seed failed:', err.message)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

seed()
