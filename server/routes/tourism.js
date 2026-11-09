import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

function mapPackage(row) {
  if (!row) return null;
  return {
    id: row.Id,
    title: row.Title,
    duration: row.Duration,
    price: Number(row.Price) || 0,
    rating: Number(row.Rating) || 5.0,
    reviews: Number(row.Reviews) || 0,
    category: row.Category,
    includes: row.Includes ? row.Includes.split(',').map(s => s.trim()) : [],
    image: row.Image,
  };
}

function mapTourBooking(row) {
  if (!row) return null;
  return {
    id: row.Id,
    guest: row.Guest,
    room: row.Room,
    package: row.Package,
    date: row.Date,
    participants: Number(row.Participants) || 1,
    status: row.Status,
    amount: Number(row.Amount) || 0,
  };
}

// GET /api/tourism/packages
router.get('/packages', async (req, res) => {
  try {
    const result = await query('SELECT * FROM "TourismPackages" ORDER BY "Id" ASC');
    res.json(result.rows.map(mapPackage));
  } catch (err) {
    console.error('Error fetching tourism packages:', err);
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
});

// GET /api/tourism/bookings
router.get('/bookings', async (req, res) => {
  try {
    const result = await query('SELECT * FROM "TourBookings" ORDER BY "Id" DESC');
    res.json(result.rows.map(mapTourBooking));
  } catch (err) {
    console.error('Error fetching tour bookings:', err);
    res.status(500).json({ error: 'Failed to fetch tour bookings' });
  }
});

// POST /api/tourism/bookings
router.post('/bookings', async (req, res) => {
  try {
    const b = req.body;
    const participants = Number(b.participants);
    const amount = Number(b.amount);
    if (!b.guest?.trim() || !b.package?.trim() || !Number.isInteger(participants) || participants < 1 || !Number.isFinite(amount) || amount < 0) {
      return res.status(400).json({ error: 'Guest, package, valid participant count, and non-negative amount are required' });
    }
    let id = b.id;
    if (!id) {
      const countRes = await query('SELECT COUNT(*) FROM "TourBookings"');
      const count = parseInt(countRes.rows[0].count, 10);
      id = `TB-${300 + count + 1}`;
    }

    await query(
      `INSERT INTO "TourBookings" ("Id", "Guest", "Room", "Package", "Date", "Participants", "Status", "Amount")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        id,
        b.guest,
        b.room || 'General',
        b.package,
        b.date || new Date().toLocaleDateString('en-GB'),
        participants,
        b.status || 'Confirmed',
        amount,
      ]
    );

    res.status(201).json({ id, ...b });
  } catch (err) {
    console.error('Error booking tourism package:', err);
    res.status(500).json({ error: 'Failed to create tour booking' });
  }
});

router.put('/bookings/:id/status', async (req, res) => {
  const { status } = req.body;
  if (!['Confirmed', 'Under Review', 'Dispatched', 'Completed', 'Cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid tour booking status' });
  }

  try {
    const result = await query(
      'UPDATE "TourBookings" SET "Status" = $1 WHERE "Id" = $2 RETURNING *',
      [status, req.params.id]
    );
    if (!result.rows.length) {
      return res.status(404).json({ error: 'Tour booking not found' });
    }
    res.json(mapTourBooking(result.rows[0]));
  } catch (err) {
    console.error('Error updating tour booking status:', err);
    res.status(500).json({ error: 'Failed to update tour booking status' });
  }
});

export default router;
