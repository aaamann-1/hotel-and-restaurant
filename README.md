# Royal Stay

Royal Stay is a web-based hotel management and restaurant POS prototype. It includes a React/Vite frontend and a separate Node.js/Express API backed by PostgreSQL. The application presents hotel workflows for reservations, rooms, housekeeping, dining, staff, inventory, tourism, and accounts.

> This is an academic prototype, not a production-ready hosted SaaS. Operational pages use the Express API for data and supported updates, but some features remain simulated or incomplete. See the [Project Report](./Project_Report.md) for implementation status, setup, API details, limitations, testing guidance, and the future-work roadmap.

## Requirements

- Node.js and npm
- PostgreSQL for persistent backend functionality

## Run the application

From the project root, start both the React frontend and Express/PostgreSQL backend:

```powershell
npm run dev
```

The frontend is served at `http://localhost:5173` and proxies `/api` requests to the backend on port 5000. The backend initializes the PostgreSQL schema when it starts.

If you need to run the services separately, use two terminals:

```powershell
npm run dev:frontend
npm run dev:backend
```

## Install dependencies

Install the frontend and backend dependencies once:

```powershell
npm install
npm --prefix server install
```

Before starting the backend, configure `server\.env`. For local PostgreSQL:

```dotenv
PORT=5000
PGHOST=localhost
PGPORT=5432
PGDATABASE=royal_stay_db
PGUSER=postgres
PGPASSWORD=replace-with-your-local-password
```

Alternatively, set `DATABASE_URL` to the PostgreSQL connection string supplied by your provider. Keep credentials out of source control. Then run the application from the project root with `npm run dev`.

## Production build

```powershell
npm run build
```

The backend listens on port 5000 by default and exposes its health endpoint at `/api/health`.

## Documentation

- [College major project report](./Project_Report.md) — includes the current implementation baseline and an update-log template for future work.
