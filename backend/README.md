# PCI Backend

Express API for Predictive Culinary Procurement Intelligence. Deploy to Railway with PostgreSQL.

## Setup (Local)

1. Install dependencies: `npm install`
2. Ensure `.env.local` or `.env` in project root has:
   - `DATABASE_URL` or `DATABASE_PUBLIC_URL` (PostgreSQL connection string)
3. Run migrations: `npm run db:migrate`
4. Seed database: `npm run db:seed`
5. Start: `npm run dev`

## Railway Deployment

1. Create a new Railway project
2. Add PostgreSQL from the Railway marketplace
3. Set **Root Directory** to `backend` in project settings
4. Add environment variable:
   - `DATABASE_URL` (auto-injected when you connect PostgreSQL)
   - `JWT_SECRET` (generate a secure random string for production)
5. Deploy from GitHub (connect repo, branch: main)
6. Run migrations and seed after first deploy:
   - Use Railway CLI: `railway run npm run db:migrate`
   - Then: `railway run npm run db:seed`

## API Endpoints

### Auth (no token required)
- `POST /auth/signup` — `{ email, password, name? }`
- `POST /auth/login` — `{ email, password }`

### Protected (Bearer token)
- `GET /api/me` — Current user profile

### Admin CRUD (admin role required)
- `GET /api/:entity` — List all
- `GET /api/:entity/:id` — Get one
- `POST /api/:entity` — Create
- `PATCH /api/:entity/:id` — Update
- `DELETE /api/:entity/:id` — Delete

Entities: `organizations`, `users`, `locations`, `vendors`, `ingredients`, `forecasts`, `inventory`, `purchase_orders`, `purchase_order_items`, `menu_items`, `menu_item_ingredients`
