import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './db.js';
import bookingsRouter from './routes/bookings.js';
import roomsRouter from './routes/rooms.js';
import dashboardRouter from './routes/dashboard.js';
import restaurantRouter from './routes/restaurant.js';
import staffRouter from './routes/staff.js';
import inventoryRouter from './routes/inventory.js';
import tourismRouter from './routes/tourism.js';
import accountsRouter from './routes/accounts.js';
import settingsRouter from './routes/settings.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    backend: 'Node.js Express',
    database: 'PostgreSQL',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routers
app.use('/api/bookings', bookingsRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/staff', staffRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/tourism', tourismRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/settings', settingsRouter);

// Start server and initialize PostgreSQL database
async function startServer() {
  await initDb();
  app.listen(PORT, () => {
    console.log(`🏨 Royal Stay Node.js Express server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Royal Stay backend failed to start:', err);
  process.exitCode = 1;
});
