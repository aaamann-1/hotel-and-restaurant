import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

function mapStaff(row) {
  if (!row) return null;
  return {
    id: row.Id,
    name: row.Name,
    role: row.Role,
    department: row.Department,
    shift: row.Shift,
    status: row.Status,
    contact: row.Contact,
    email: row.Email,
  };
}

// GET /api/staff
router.get('/', async (req, res) => {
  try {
    const { department, status } = req.query;
    let sql = 'SELECT * FROM "Staff" WHERE 1=1';
    const params = [];

    if (department && department !== 'All') {
      params.push(department.toLowerCase());
      sql += ` AND LOWER("Department") = $${params.length}`;
    }

    if (status && status !== 'All') {
      params.push(status.toLowerCase());
      sql += ` AND LOWER("Status") = $${params.length}`;
    }

    sql += ' ORDER BY "Id" ASC';
    const result = await query(sql, params);
    res.json(result.rows.map(mapStaff));
  } catch (err) {
    console.error('Error fetching staff:', err);
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
});

// POST /api/staff
router.post('/', async (req, res) => {
  try {
    const s = req.body;
    if (!s.name?.trim()) {
      return res.status(400).json({ error: 'Staff name is required' });
    }
    let id = s.id;
    if (!id) {
      const countRes = await query('SELECT COUNT(*) FROM "Staff"');
      const count = parseInt(countRes.rows[0].count, 10);
      id = `EMP-${100 + count + 1}`;
    }

    const result = await query(
      `INSERT INTO "Staff" ("Id", "Name", "Role", "Department", "Shift", "Status", "Contact", "Email")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        id,
        s.name,
        s.role || 'Staff Member',
        s.department || 'Front Office',
        s.shift || 'General (09:00 - 18:00)',
        s.status || 'On Duty',
        s.contact || '+91 98000 00000',
        s.email || `${s.name.toLowerCase().replace(/\s+/g, '.')}@royalstay.com`,
      ]
    );

    res.status(201).json(mapStaff(result.rows[0]));
  } catch (err) {
    console.error('Error creating staff member:', err);
    res.status(500).json({ error: 'Failed to create staff member' });
  }
});

// PUT /api/staff/:id/status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const result = await query(
      'UPDATE "Staff" SET "Status" = $1 WHERE "Id" = $2 RETURNING *',
      [status || 'On Duty', req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    res.json(mapStaff(result.rows[0]));
  } catch (err) {
    console.error('Error updating staff status:', err);
    res.status(500).json({ error: 'Failed to update staff status' });
  }
});

export default router;
