# Admin Login Credentials

**⚠️ IMPORTANT:** Change these credentials in production. Do not commit real passwords to version control.

---

## Default Admin Account (after seeding)

| Field | Value |
|-------|-------|
| **Email** | `admin@pci.local` |
| **Password** | `Admin123!` |
| **Name** | PCI Admin |

---

## How to Use

1. Run the database migrations: `cd backend && npm run db:migrate`
2. Seed the database: `cd backend && npm run db:seed`
3. Start the backend: `cd backend && npm run dev`
4. Open the admin login page: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
5. Log in with the credentials above

---

## Changing the Admin Password

To change the admin password after seeding:

1. Log in to the admin dashboard
2. Go to **Users** in the sidebar
3. Find the admin user (`admin@pci.local`)
4. Click **Edit** and enter a new password
5. Click **Update**

Alternatively, update the password directly in the database using SQL or reset and re-seed with new credentials (edit `backend/src/db/seed.js` and run `npm run db:reset` then `npm run db:migrate` and `npm run db:seed`).
