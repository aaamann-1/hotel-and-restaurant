import { Router } from 'express';
import { pool, query } from '../db.js';

const router = Router();

function mapBooking(row) {
  if (!row) return null;
  return {
    id: row.Id,
    guestName: row.GuestName,
    guestEmail: row.GuestEmail,
    guestPhone: row.GuestPhone,
    avatar: row.Avatar,
    roomNo: row.RoomNo,
    roomType: row.RoomType,
    checkIn: row.CheckIn,
    checkOut: row.CheckOut,
    nights: Number(row.Nights) || 1,
    guests: Number(row.Guests) || 1,
    status: row.Status,
    totalAmount: Number(row.TotalAmount) || 0,
    paidAmount: Number(row.PaidAmount) || 0,
    paymentStatus: row.PaymentStatus,
    paymentMethod: row.PaymentMethod,
    specialRequest: row.SpecialRequest,
    bookingSource: row.BookingSource,
    createdAt: row.CreatedAt,
  };
}

// GET /api/bookings
router.get('/', async (req, res) => {
  try {
    const { search, status } = req.query;
    let sql = 'SELECT * FROM "Bookings" WHERE 1=1';
    const params = [];

    if (status && status !== 'All') {
      params.push(status.toLowerCase());
      sql += ` AND LOWER("Status") = $${params.length}`;
    }

    if (search) {
      params.push(`%${search.toLowerCase().trim()}%`);
      const idx = params.length;
      sql += ` AND (
        LOWER("Id") LIKE $${idx} OR
        LOWER("GuestName") LIKE $${idx} OR
        LOWER("RoomNo") LIKE $${idx} OR
        LOWER("RoomType") LIKE $${idx} OR
        LOWER("Status") LIKE $${idx}
      )`;
    }

    sql += ' ORDER BY "CreatedAt" DESC';

    const result = await query(sql, params);
    res.json(result.rows.map(mapBooking));
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// GET /api/bookings/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM "Bookings" WHERE "Id" = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Booking ${req.params.id} not found` });
    }
    res.json(mapBooking(result.rows[0]));
  } catch (err) {
    console.error('Error fetching booking:', err);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// POST /api/bookings
router.post('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const b = req.body;
    if (!b.guestName?.trim() || !b.roomNo || !b.checkIn || !b.checkOut) {
      return res.status(400).json({ error: 'Guest name, room, check-in, and check-out are required' });
    }
    await client.query('BEGIN');
    const roomRes = await client.query('SELECT * FROM "Rooms" WHERE "RoomNo" = $1 FOR UPDATE', [b.roomNo]);
    if (!roomRes.rows.length) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: `Room ${b.roomNo} not found` });
    }
    if (roomRes.rows[0].Status !== 'Available') {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: `Room ${b.roomNo} is not available` });
    }

    let id = b.id;
    if (!id) {
      const countRes = await client.query('SELECT COUNT(*) FROM "Bookings"');
      const count = parseInt(countRes.rows[0].count, 10);
      id = `BK-${1000 + count + 1}`;
    }

    const createdAt = b.createdAt || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    await client.query(
      `INSERT INTO "Bookings" (
        "Id", "GuestName", "GuestEmail", "GuestPhone", "Avatar", "RoomNo", "RoomType",
        "CheckIn", "CheckOut", "Nights", "Guests", "Status", "TotalAmount", "PaidAmount",
        "PaymentStatus", "PaymentMethod", "SpecialRequest", "BookingSource", "CreatedAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
      [
        id,
        b.guestName,
        b.guestEmail || 'guest@royalstay.com',
        b.guestPhone || '+91 99999 00000',
        b.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        b.roomNo,
        b.roomType,
        b.checkIn,
        b.checkOut,
        Number(b.nights) || 1,
        Number(b.guests) || 1,
        b.status || 'Confirmed',
        Number(b.totalAmount) || 0,
        Number(b.paidAmount) || 0,
        b.paymentStatus || 'Paid',
        b.paymentMethod || 'Credit Card',
        b.specialRequest || '',
        b.bookingSource || 'Direct Website',
        createdAt,
      ]
    );

    await client.query(
      `UPDATE "Rooms" SET "Status" = 'Reserved', "Guest" = $1 WHERE "RoomNo" = $2`,
      [b.guestName, b.roomNo]
    );
    await client.query('COMMIT');

    res.status(201).json({ id, ...b, createdAt });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Failed to create booking' });
  } finally {
    client.release();
  }
});

// PUT /api/bookings/:id/checkin
router.put('/:id/checkin', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const bookingRes = await client.query('SELECT * FROM "Bookings" WHERE "Id" = $1 FOR UPDATE', [req.params.id]);
    if (bookingRes.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Booking not found' });
    }

    const booking = bookingRes.rows[0];
    if (!['Confirmed', 'Arriving'].includes(booking.Status)) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: `Booking ${req.params.id} cannot be checked in from status ${booking.Status}` });
    }
    const roomRes = await client.query(
      `UPDATE "Rooms" SET "Status" = 'Occupied', "Guest" = $1
       WHERE "RoomNo" = $2 AND "Status" = 'Reserved' RETURNING "RoomNo"`,
      [booking.GuestName, booking.RoomNo]
    );
    if (!roomRes.rows.length) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: `Reserved room ${booking.RoomNo} is unavailable` });
    }
    await client.query('UPDATE "Bookings" SET "Status" = \'Checked In\' WHERE "Id" = $1', [req.params.id]);
    await client.query('COMMIT');

    res.json({
      message: `Guest ${booking.GuestName} checked into Room ${booking.RoomNo}`,
      booking: mapBooking({ ...booking, Status: 'Checked In' }),
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error checking in:', err);
    res.status(500).json({ error: 'Failed to check in guest' });
  } finally {
    client.release();
  }
});

// PUT /api/bookings/:id/checkout
router.put('/:id/checkout', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const bookingRes = await client.query('SELECT * FROM "Bookings" WHERE "Id" = $1 FOR UPDATE', [req.params.id]);
    if (bookingRes.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Booking not found' });
    }

    const booking = bookingRes.rows[0];
    if (booking.Status !== 'Checked In') {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: `Booking ${req.params.id} cannot be checked out from status ${booking.Status}` });
    }
    const roomRes = await client.query(
      `UPDATE "Rooms" SET "Status" = 'Available', "Guest" = NULL, "Housekeeping" = 'Dirty'
       WHERE "RoomNo" = $1 AND "Status" = 'Occupied' RETURNING "RoomNo"`,
      [booking.RoomNo]
    );
    if (!roomRes.rows.length) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: `Occupied room ${booking.RoomNo} is unavailable` });
    }
    await client.query('UPDATE "Bookings" SET "Status" = \'Checked Out\' WHERE "Id" = $1', [req.params.id]);
    await client.query('COMMIT');

    res.json({
      message: `Guest ${booking.GuestName} checked out. Room ${booking.RoomNo} marked for housekeeping.`,
      booking: mapBooking({ ...booking, Status: 'Checked Out' }),
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error checking out:', err);
    res.status(500).json({ error: 'Failed to check out guest' });
  } finally {
    client.release();
  }
});

// DELETE /api/bookings/:id
router.delete('/:id', async (req, res) => {
  try {
    await query('DELETE FROM "Bookings" WHERE "Id" = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting booking:', err);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

export default router;
