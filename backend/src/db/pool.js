import pg from 'pg'
import { config } from 'dotenv'

config()

const { Pool } = pg

const connectionString = process.env.DATABASE_URL || process.env.DATABASE_PUBLIC_URL

if (!connectionString) {
  console.warn('Missing DATABASE_URL or DATABASE_PUBLIC_URL. Set in .env for local dev.')
}

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

export default pool
