import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    const roomCountRes = await query('SELECT COUNT(*) FROM "Rooms"');
    const totalRooms = Number(roomCountRes.rows[0].count);
    const occupiedRes = await query('SELECT COUNT(*) FROM "Rooms" WHERE "Status" = \'Occupied\'');
    const occupiedCount = parseInt(occupiedRes.rows[0].count, 10);
    const availableRes = await query('SELECT COUNT(*) FROM "Rooms" WHERE "Status" = \'Available\'');
    const availableCount = parseInt(availableRes.rows[0].count, 10);
    const occupancyRate = totalRooms ? Math.round((occupiedCount / totalRooms) * 100) : 0;

    const guestRes = await query('SELECT SUM("Guests") FROM "Bookings" WHERE "Status" = \'Checked In\'');
    const inHouseGuests = parseInt(guestRes.rows[0].sum, 10) || 0;
    const today = new Date().toISOString().slice(0, 10);
    const bookingsRes = await query(
      `SELECT
        COUNT(*) FILTER (WHERE "CreatedAt" = $1 OR "CreatedAt" = to_char(CURRENT_DATE, 'DD Mon YYYY')) AS total,
        COUNT(*) FILTER (WHERE "CheckIn" = $1 OR "CheckIn" = to_char(CURRENT_DATE, 'DD Mon YYYY')) AS check_ins,
        COUNT(*) FILTER (WHERE "CheckOut" = $1 OR "CheckOut" = to_char(CURRENT_DATE, 'DD Mon YYYY')) AS check_outs
       FROM "Bookings"`,
      [today]
    );
    const revenueRes = await query(
      `SELECT COALESCE(SUM("Amount"), 0) AS revenue
       FROM "Transactions"
       WHERE "Type" = 'Income'
         AND ("Date" = $1 OR "Date" = to_char(CURRENT_DATE, 'DD Mon YYYY'))`,
      [today]
    );

    res.json({
      totalRooms: {
        value: totalRooms,
        occupied: occupiedCount,
        available: availableCount,
        occupancyRate,
      },
      todayBookings: {
        value: Number(bookingsRes.rows[0].total),
        checkIns: Number(bookingsRes.rows[0].check_ins),
        checkOuts: Number(bookingsRes.rows[0].check_outs),
        trend: '',
      },
      todayRevenue: {
        value: `₹${Number(revenueRes.rows[0].revenue).toLocaleString('en-IN')}`,
        subtitle: 'Recorded income today',
        trend: '',
      },
      totalGuests: {
        value: inHouseGuests,
        subtitle: 'In-house guests',
        trend: '',
      },
    });
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// GET /api/dashboard/occupancy
router.get('/occupancy', async (req, res) => {
  try {
    const [roomsRes, revenueRes] = await Promise.all([
      query('SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE "Status" = \'Occupied\') AS occupied FROM "Rooms"'),
      query(
        `SELECT COALESCE(SUM("Amount"), 0) AS revenue
         FROM "Transactions"
         WHERE "Type" = 'Income'
           AND ("Date" = CURRENT_DATE::text OR "Date" = to_char(CURRENT_DATE, 'DD Mon YYYY'))`
      ),
    ]);
    const rooms = Number(roomsRes.rows[0].occupied);
    const total = Number(roomsRes.rows[0].total);
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    res.json([{
      date: today,
      occupancy: total ? Math.round((rooms / total) * 100) : 0,
      rooms,
      totalRooms: total,
      revenue: `₹${Number(revenueRes.rows[0].revenue).toLocaleString('en-IN')}`,
    }]);
  } catch (err) {
    console.error('Error fetching occupancy data:', err);
    res.status(500).json({ error: 'Failed to fetch occupancy data' });
  }
});

// GET /api/dashboard/room-distribution
router.get('/room-distribution', async (req, res) => {
  try {
    const result = await query('SELECT "Type", COUNT(*)::integer AS count FROM "Rooms" GROUP BY "Type" ORDER BY "Type"');
    const colors = ['#C9A36A', '#15966A', '#2563EB', '#8B5CF6', '#94A3B8'];
    const total = result.rows.reduce((sum, row) => sum + row.count, 0);
    res.json(result.rows.map((row, index) => ({
      name: row.Type,
      count: row.count,
      percentage: total ? Math.round((row.count / total) * 100) : 0,
      color: colors[index % colors.length],
    })));
  } catch (err) {
    console.error('Error fetching room distribution:', err);
    res.status(500).json({ error: 'Failed to fetch room distribution' });
  }
});

export default router;
