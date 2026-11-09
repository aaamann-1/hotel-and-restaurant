import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

function mapRoom(row) {
  if (!row) return null;
  return {
    roomNo: row.RoomNo,
    floor: row.Floor,
    type: row.Type,
    price: Number(row.Price),
    status: row.Status,
    guest: row.Guest,
    housekeeping: row.Housekeeping,
    amenities: row.Amenities ? row.Amenities.split(',').map(a => a.trim()) : [],
  };
}

// GET /api/rooms
router.get('/', async (req, res) => {
  try {
    const { floor, status } = req.query;
    let sql = 'SELECT * FROM "Rooms" WHERE 1=1';
    const params = [];

    if (floor && parseInt(floor, 10) > 0) {
      params.push(parseInt(floor, 10));
      sql += ` AND "Floor" = $${params.length}`;
    }

    if (status && status !== 'All') {
      params.push(status.toLowerCase());
      sql += ` AND LOWER("Status") = $${params.length}`;
    }

    sql += ' ORDER BY "RoomNo" ASC';

    const result = await query(sql, params);
    res.json(result.rows.map(mapRoom));
  } catch (err) {
    console.error('Error fetching rooms:', err);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

router.get('/types', async (req, res) => {
  try {
    const result = await query(
      `SELECT "Type", COUNT(*)::integer AS "TotalCount",
        COUNT(*) FILTER (WHERE "Status" = 'Occupied')::integer AS "OccupiedCount",
        MIN("Price") AS "BasePrice"
       FROM "Rooms"
       GROUP BY "Type"
       ORDER BY "Type"`
    );
    res.json(result.rows.map((row) => ({
      id: row.Type.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: row.Type,
      totalCount: row.TotalCount,
      occupiedCount: row.OccupiedCount,
      basePrice: Number(row.BasePrice),
    })));
  } catch (err) {
    console.error('Error fetching room types:', err);
    res.status(500).json({ error: 'Failed to fetch room types' });
  }
});

// GET /api/rooms/:roomNo
router.get('/:roomNo', async (req, res) => {
  try {
    const result = await query('SELECT * FROM "Rooms" WHERE "RoomNo" = $1', [req.params.roomNo]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Room ${req.params.roomNo} not found` });
    }
    res.json(mapRoom(result.rows[0]));
  } catch (err) {
    console.error('Error fetching room:', err);
    res.status(500).json({ error: 'Failed to fetch room' });
  }
});

// PUT /api/rooms/:roomNo/housekeeping
router.put('/:roomNo/housekeeping', async (req, res) => {
  try {
    const { status } = req.body;
    const result = await query(
      'UPDATE "Rooms" SET "Housekeeping" = $1 WHERE "RoomNo" = $2 RETURNING *',
      [status || 'Clean', req.params.roomNo]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Room ${req.params.roomNo} not found` });
    }

    res.json(mapRoom(result.rows[0]));
  } catch (err) {
    console.error('Error updating housekeeping:', err);
    res.status(500).json({ error: 'Failed to update housekeeping' });
  }
});

export default router;
