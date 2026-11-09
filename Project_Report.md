# Royal Stay
## Luxury Hotel Management System and Restaurant Point of Sale

**Major Project Report**

| Project detail | Information |
|---|---|
| Project title | Royal Stay — Luxury Hotel Management System and Restaurant POS |
| Project type | Web application |
| Project status | Working prototype; see implementation status and limitations |
| Prepared by | [Student name] |
| Programme / Department | [Programme and department] |
| College / University | [College or university name] |
| Project guide | [Guide name] |
| Academic year | [Academic year] |
| Report last updated | 26 October 2026 |

> Replace the bracketed details with your college information. This report is maintained as the project changes; record verified implementation changes in the **Progress and Update Log** at the end.

## Abstract

Royal Stay is a web-based hotel operations prototype that brings together front-office reservation workflows, room and housekeeping views, restaurant point-of-sale screens, guest and staff information, inventory, tourism packages, and financial summaries. Its frontend is built with React and Vite. A separate Node.js/Express API uses PostgreSQL for data storage and can be configured with a local PostgreSQL connection or a cloud connection string.

The application demonstrates how common hotel activities can be represented in one interface. The backend defines REST endpoints for bookings, rooms, dashboard data, restaurant menu and settlement, staff, inventory, tourism, accounts, settings, and a health check. Database initialization creates eleven tables and seeds sample records when tables are empty. The frontend loads operational records from the API; authentication, external messaging, and kitchen printing are not implemented. Royal Stay is an academic prototype and foundation for further development, not a production-ready or deployed SaaS product.

**Keywords:** hotel management, hospitality, reservation system, housekeeping, restaurant POS, React, Express, PostgreSQL, REST API.

## 1. Introduction

Hotels coordinate reservations, room availability, guest services, housekeeping, dining, staff, stock, and payments. Handling these tasks in separate tools or paper records can make it difficult to maintain a consistent view of daily operations. Royal Stay explores a unified web application for presenting these functions through a hotel-oriented dashboard and departmental pages.

The project uses a browser-based frontend and a separately runnable backend. Sample records support demonstration, while PostgreSQL-backed endpoints provide a foundation for persisting selected operational data. The system is designed around the workflows represented in the interface, with further integration and operational hardening identified as future work.

## 2. Problem Statement

Hotel staff need timely access to reservations, room status, guest details, and operational records. Disconnected workflows can lead to duplicated data entry and slow coordination between reception, housekeeping, restaurant, and administration. The project addresses this problem by developing a single application interface that demonstrates these workflows and a backend API that can store selected data in a relational database.

## 3. Aim and Objectives

### Aim

To design and implement a web-based hotel management prototype that brings major hotel and restaurant operations into a unified interface.

### Objectives

1. Provide a dashboard view of hotel activity and occupancy-oriented metrics.
2. Represent reservation creation, reservation search, guest check-in, and check-out workflows.
3. Display room inventory and housekeeping status across hotel floors.
4. Provide restaurant menu and point-of-sale interfaces.
5. Represent supporting functions such as guest profiles, staff, inventory, tourism, accounts, reports, and property settings.
6. Implement a REST API using Express and PostgreSQL for selected hotel operations.
7. Establish a documented path for completing frontend/backend integration, testing, security, and deployment.

## 4. Project Scope

### Included

- A responsive, multi-page React interface with navigation for the major hotel departments.
- Sample data for demonstrations and a React context for shared booking and room state.
- Express API routes for booking, room, dashboard, restaurant, staff, inventory, tourism, accounts, and health-check functions.
- PostgreSQL table creation and sample-data seeding during backend startup.
- A database connection configuration that accepts `DATABASE_URL` and applies SSL options for production or recognized cloud database connection strings.

### Not yet established as production capabilities

- Complete persistence for every screen and every user action.
- Real authentication, role-based access control, or session management.
- Production payment processing, receipt generation, or a verified accounting ledger.
- Automated email/SMS, physical key-card issuance, or external concierge integrations.
- A deployed cloud environment, production monitoring, backups, or demonstrated load testing.
- A complete automated test suite or verified end-to-end acceptance results.

## 5. System Architecture

```text
Browser
  └── React single-page application (Vite)
        ├── Pages, shared components, and HotelContext
        └── hotelApi service ── HTTP /api requests ──┐
                                                     │
                                          Node.js / Express API
                                                     │
                                          PostgreSQL connection pool
                                                     │
                                         Local or cloud PostgreSQL
```

The frontend is served by Vite during development and built as static assets for deployment. The Express server mounts departmental routers under `/api`. The `pg` connection pool connects to PostgreSQL using `DATABASE_URL` when present, otherwise it uses local PostgreSQL environment variables. The frontend service uses the relative `/api` path; a production deployment therefore needs an appropriate reverse proxy or frontend API base configuration so browser requests reach the backend.

The frontend uses a shared API service and loads departmental records from the backend at startup. Vite proxies frontend `/api` requests to the Express server during local development. API connection failures are reported to the user; the UI does not silently treat sample records as live data.

## 6. Technology Stack

| Layer | Technology | Use in the project |
|---|---|---|
| Frontend | React 19, JavaScript, React Router | User interface, page rendering, and navigation |
| Frontend build | Vite | Local development server and production asset build |
| Charts | Recharts | Dashboard visualizations |
| Icons and styling | Lucide React, Tailwind CSS, project CSS | Icons and visual presentation |
| Backend | Node.js, Express 4 | REST API and HTTP middleware |
| Database | PostgreSQL, `pg` | Relational persistence |
| Configuration | dotenv | Loading local environment variables |
| Cross-origin requests | cors | API CORS middleware |

## 7. Functional Modules

The following describes current interfaces and API-backed workflows. Features that are simulated or not yet integrated are identified below.

| Module | Current project functionality |
|---|---|
| Executive dashboard | KPI cards, occupancy snapshot, and room-type distribution load from PostgreSQL-backed API endpoints. |
| Reservations and front office | Reservation directory, new-booking page, check-in desk, and check-out desk. Booking list/create/check-in/check-out endpoints are available. |
| Rooms and housekeeping | Floor-oriented room views, room-type catalog, and housekeeping interface. Room listing and housekeeping update endpoints are available. |
| Guests | Guest directory and stay history derived from saved reservation records. Loyalty tiers and concierge preferences are not stored. |
| Restaurant and POS | Menu data loads from PostgreSQL. POS settlement validates menu items and saves the order, order lines, and corresponding financial transaction. Kitchen ticket printing is not connected. |
| Staff | Staff roster interface and API endpoints to list staff, add a member, and update staff status. |
| Inventory | Stock interface and API endpoints to list stock and update quantities/status. |
| Tourism | Package and booking screens; API endpoints list packages and bookings and create a tourism booking. |
| Accounts | Financial totals are calculated from stored transactions; transactions can be added through the interface. |
| Reports | Current room occupancy and financial transactions are loaded from the API. Print/save uses the browser print dialog. |
| Settings | Property and policy values load from and save to PostgreSQL. External SMS/email and key-card automation are not configured. |

## 8. Database Design

The backend creates these eleven PostgreSQL tables if they do not already exist:

| Table | Purpose |
|---|---|
| `Rooms` | Room number, floor, type, price, occupancy/status, guest, housekeeping status, and amenities |
| `Bookings` | Guest and room references, stay dates, booking status, amount and payment fields, and booking notes |
| `MenuItems` | Restaurant menu item name, category, price, preparation time, dietary flag, and image |
| `RestaurantOrders` | Settled POS order, table, date, total, payment method, and linked transaction |
| `RestaurantOrderItems` | Menu item and quantity for each settled POS order |
| `Staff` | Staff identity, role, department, shift, status, and contact details |
| `Inventory` | Stock item category, quantity, threshold, unit, status, and supplier |
| `TourismPackages` | Experience details, duration, price, rating, category, inclusions, and image |
| `TourBookings` | Guest/package booking information, date, participants, status, and amount |
| `Transactions` | Income/expense type, category, description, amount, method, and status |
| `Settings` | Persisted property and system settings stored as JSON |

The initialization routine seeds example data when the corresponding tables are empty. These records are demonstration data and should not be treated as live hotel records. The current schema uses text fields for some dates and does not yet declare relational foreign-key constraints between bookings and rooms or between tour bookings and packages.

## 9. API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Return API health information |
| GET, POST | `/api/bookings` | List/search/filter bookings and create a booking |
| GET, DELETE | `/api/bookings/:id` | Retrieve or delete a booking |
| PUT | `/api/bookings/:id/checkin` | Mark a booking checked in and its room occupied |
| PUT | `/api/bookings/:id/checkout` | Mark a booking checked out and its room dirty for housekeeping |
| GET | `/api/rooms` | List rooms, optionally filtered by floor or status |
| GET | `/api/rooms/:roomNo` | Retrieve a room |
| PUT | `/api/rooms/:roomNo/housekeeping` | Update a room's housekeeping status |
| GET | `/api/dashboard/stats` | Return dashboard summary metrics |
| GET | `/api/dashboard/occupancy` | Return occupancy chart data |
| GET | `/api/dashboard/room-distribution` | Return room-category distribution data |
| GET | `/api/restaurant/menu` | List menu items, optionally filtered by category |
| POST | `/api/restaurant/settle` | Validate and save a POS order, order lines, and ledger transaction |
| GET, POST | `/api/staff` | List and create staff records |
| PUT | `/api/staff/:id/status` | Update a staff member's status |
| GET | `/api/inventory` | List inventory items |
| PUT | `/api/inventory/:id/stock` | Update stock quantity and derived stock status |
| GET | `/api/tourism/packages` | List tourism packages |
| GET, POST | `/api/tourism/bookings` | List and create tourism bookings |
| GET | `/api/accounts/summary` | Return transaction summary and transactions |
| POST | `/api/accounts/transaction` | Create a financial transaction |
| GET, PUT | `/api/settings` | Read and save property settings |
| PUT | `/api/tourism/bookings/:id/status` | Update tourism booking status |
| GET | `/api/rooms/types` | Return room-type counts and base prices derived from room records |

## 10. Typical Workflows

### Reservation and check-in

1. A user enters guest, room, and stay details through the booking interface.
2. The frontend can submit a booking to `POST /api/bookings`.
3. The booking is listed with its current status.
4. The check-in endpoint changes the booking status and marks the allocated room occupied.

### Check-out and housekeeping

1. A checked-in booking is selected for check-out.
2. `PUT /api/bookings/:id/checkout` changes the booking status to checked out.
3. The associated room is marked available and its housekeeping status is set to dirty.
4. Housekeeping staff can update the room status using the room housekeeping endpoint.

### Stock update

1. Inventory items are retrieved from the inventory endpoint.
2. A stock quantity update is submitted.
3. The backend derives an inventory status from the configured minimum threshold and returns the updated record.

## 11. Implementation Status and Limitations

This section is important when presenting the project: it distinguishes implemented code from planned or simulated behavior.

### Implemented in the codebase

- React application routing and departmental interface pages.
- Express server with routers for the listed operational areas.
- PostgreSQL connection pool configuration and schema initialization/seeding.
- Persistent booking and room endpoints, including booking status and housekeeping transitions.
- Endpoints for menu, staff, inventory, tourism, and account data operations.
- A shared frontend API service and startup loading for operational data including bookings, rooms, dashboard metrics, menu, staff, inventory, tourism, accounts, settings, and room types.

### Known limitations and unimplemented behavior

- API loading and error states are implemented, but consistent loading and empty-state design can be improved across pages.
- Dashboard occupancy is a current snapshot; historical occupancy trend data is not recorded yet.
- POS orders are persisted with their item lines and ledger transaction, but kitchen ticket printing is not integrated.
- Settings are persisted, but their SMS/email and key-card automation toggles do not trigger external services.
- Report and ledger print actions use the browser print dialog, not server-side PDF generation.
- Cloud connection support is configuration code only. It does not establish that the service is deployed, secured, backed up, or production-ready.
- The current CORS configuration allows requests from any origin. Authentication, authorization, input validation, rate limiting, and production secret-management controls need review before real deployment.
- No automated test scripts are defined in the frontend or backend package manifests.

## 12. Setup and Execution

### Prerequisites

- Node.js and npm.
- PostgreSQL for persistent backend operation.
- A PostgreSQL database and credentials for local development, or a provider-issued connection string.

### Install dependencies

From the project root:

```powershell
npm install
npm --prefix server install
```

Configure the backend database settings below, then start both services from the project root:

```powershell
npm run dev
```

The frontend is served on port 5173 and proxies `/api` requests to the backend on port 5000. For separate services, run `npm run dev:frontend` and `npm run dev:backend` in two terminals. Build frontend assets with:

```powershell
npm run build
```

### Database configuration

From the `server` directory, create a local `.env` file with database settings. For example:

```dotenv
PORT=5000
PGHOST=localhost
PGPORT=5432
PGDATABASE=royal_stay_db
PGUSER=postgres
PGPASSWORD=replace-with-your-local-password
```

For a hosted PostgreSQL database, use the provider's connection string as `DATABASE_URL` instead. Do not commit real credentials or place them in this report.

The backend listens on port 5000 by default, initializes the database, and exposes `/api/health`.

## 13. Testing and Evaluation Plan

The repository does not currently define an automated test suite. The following manual verification was performed against the configured local environment on 26 October 2026; repeat it after significant changes and record results in the update log.

| Verification | Result |
|---|---|
| Frontend production build (`npm run build`) | Passed; Vite emitted a large-chunk advisory. |
| Lint (`npm run lint`) | Passed with existing unused-import and Fast Refresh warnings. |
| Booking workflow | Passed: create booking, check in, and check out; verified the room became occupied and then available/dirty. The temporary test booking was removed and room 103 restored to its prior available/clean state. |
| PostgreSQL/API smoke checks | Backend connected successfully and API GET endpoints returned HTTP 200; invalid test requests returned HTTP 400. Dashboard displayed 15 rooms, 8 occupied, 4 available, 53% occupancy, and 7 in-house guests. |
| Deployment | No public cloud deployment performed. |

| Test area | Suggested verification |
|---|---|
| Frontend build | Run `npm run build` and confirm the Vite build succeeds |
| Frontend lint | Run `npm run lint` and review all reported issues |
| Backend startup | Start Express with a test database and verify `/api/health` |
| Database initialization | Confirm the eleven tables are created and sample rows are seeded only when appropriate |
| Booking workflow | Create, retrieve, check in, and check out a booking; verify both booking and room state |
| Housekeeping | Update a room's housekeeping state and read the result back |
| Inventory | Update quantities above, at, and below the threshold and verify returned status |
| Invalid requests | Exercise missing fields, unknown IDs, and invalid values; verify meaningful HTTP errors |
| Frontend integration | Verify API requests, loading/error states, and persistence after page reload |
| Security and deployment | Verify restricted CORS, secrets outside source control, authentication/authorization requirements, HTTPS, and database backups |

## 14. Future Work Roadmap

Priorities below are recommendations, not statements that the work is already complete.

### Priority 1 — Reliable data and workflow integration

- Add date-aware historical reporting; the current occupancy visualization is a real-time snapshot rather than a historical trend.
- Add loading and empty-state designs consistently on each API-backed page.
- Add a persistent guest profile/preferences module if loyalty and concierge details are required.
- Add kitchen ticket printing and external SMS/email integrations only after choosing and configuring providers.

### Priority 2 — Data integrity and validation

- Add server-side request validation and consistent error response formats.
- Use appropriate date/time and numeric database types; add foreign keys and indexes where applicable.
- Extend transaction boundaries and integrity checks to all multi-step write workflows.
- Define reservation collision checks and room availability rules.
- Add pagination and audit metadata for operational records.

### Priority 3 — Security and operational readiness

- Implement authentication, role-based permissions, and secure session/token handling.
- Restrict CORS to approved frontend origins and configure HTTPS at deployment.
- Keep secrets in platform-managed environment variables and rotate them as needed.
- Add rate limiting, request-size limits, structured logging, monitoring, and database backups.
- Review privacy handling for guest identity, contact, and payment-related data.

### Priority 4 — Verification and delivery

- Add API tests and frontend component/workflow tests using a dedicated test database.
- Add CI checks for lint, build, and tests.
- Deploy frontend and backend with explicit API routing and environment configuration.
- Perform acceptance testing with representative hotel workflows and document results.
- Prepare user documentation and a deployment/rollback procedure.

## 15. Conclusion

Royal Stay demonstrates a broad hotel operations interface and a separate Express/PostgreSQL backend with a meaningful set of domain-specific REST endpoints. Its booking and room workflows have database-backed operations, and the database initialization routine provides a quick demonstration setup. Some advanced behaviors remain incomplete, and authentication, security hardening, automated tests, and cloud deployment are not yet complete; the project is therefore best described as an academic prototype under active development.

## 16. Progress and Update Log

Keep this section current whenever implementation, testing, or deployment changes. Record only work that has actually been completed and verified. Do not mark a roadmap item complete solely because a UI screen or API route exists.

### Current implementation baseline

- **Implemented:** React/Vite frontend with API-backed departmental pages; Express routers and PostgreSQL schema/seed initialization; booking, room, housekeeping, menu/POS, staff, inventory, tourism, account, dashboard, and settings workflows; one-command local development startup.
- **Persistence:** POS settlement stores order lines and a matching income ledger entry; settings are persisted in PostgreSQL.
- **Not implemented:** Authentication/authorization, kitchen printer integration, external messaging, and historical occupancy reporting.
- **Verification:** Local production build, lint, PostgreSQL-backed API smoke checks, and a reversible booking check-in/check-out workflow have been run successfully. Lint reports warnings and the build reports a large-chunk advisory. Deployment to a public cloud has not been performed.

### Update template

Copy this block for each meaningful project update:

```text
#### YYYY-MM-DD — [Short update title]
- **Work completed:** [Specific code/features changed]
- **Files or modules affected:** [Relevant paths or module names]
- **Verification performed:** [Commands, test cases, and actual results]
- **Known issues / next steps:** [Remaining work or blockers]
```

### Update history

| Date | Update |
|---|---|
| 2026-10-25 | Created the initial college project report from the current repository structure and implementation. Documented prototype limitations and a maintainable future-work/update process. |
| 2026-10-26 | Connected operational pages to the shared API, added settings and POS persistence, and enabled combined local startup. Verified the production build, lint, database/API smoke checks, and a reversible booking workflow; cleaned up the test booking and restored room 103. |
