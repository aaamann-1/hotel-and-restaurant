import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

function mapInventory(row) {
  if (!row) return null;
  return {
    id: row.Id,
    name: row.Name,
    category: row.Category,
    inStock: Number(row.InStock) || 0,
    minThreshold: Number(row.MinThreshold) || 0,
    unit: row.Unit,
    status: row.Status,
    supplier: row.Supplier,
  };
}

// GET /api/inventory
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let sql = 'SELECT * FROM "Inventory" WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      params.push(category.toLowerCase());
      sql += ` AND LOWER("Category") = $${params.length}`;
    }

    sql += ' ORDER BY "Id" ASC';
    const result = await query(sql, params);
    res.json(result.rows.map(mapInventory));
  } catch (err) {
    console.error('Error fetching inventory:', err);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// PUT /api/inventory/:id/stock
router.put('/:id/stock', async (req, res) => {
  try {
    const { inStock } = req.body;
    const newStock = Number(inStock);
    if (!Number.isInteger(newStock) || newStock < 0) {
      return res.status(400).json({ error: 'Stock quantity must be a whole number that is zero or greater' });
    }
    const invRes = await query('SELECT * FROM "Inventory" WHERE "Id" = $1', [req.params.id]);
    if (invRes.rows.length === 0) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    const item = invRes.rows[0];
    let status = 'Optimal';
    if (newStock <= item.MinThreshold / 2) {
      status = 'Reorder Required';
    } else if (newStock <= item.MinThreshold) {
      status = 'Low Stock';
    }

    const result = await query(
      'UPDATE "Inventory" SET "InStock" = $1, "Status" = $2 WHERE "Id" = $3 RETURNING *',
      [newStock, status, req.params.id]
    );

    res.json(mapInventory(result.rows[0]));
  } catch (err) {
    console.error('Error updating stock level:', err);
    res.status(500).json({ error: 'Failed to update stock' });
  }
});

export default router;
