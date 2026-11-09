import { Router } from 'express';
import { pool, query } from '../db.js';

const router = Router();

function mapMenuItem(row) {
  return {
    id: row.Id,
    name: row.Name,
    category: row.Category,
    price: Number(row.Price),
    prepTime: row.PrepTime,
    veg: row.Veg,
    image: row.Image,
  };
}

// GET /api/restaurant/menu
router.get('/menu', async (req, res) => {
  try {
    const { category } = req.query;
    let sql = 'SELECT * FROM "MenuItems"';
    const params = [];

    if (category && category !== 'All') {
      params.push(category.toLowerCase());
      sql += ' WHERE LOWER("Category") = $1';
    }

    sql += ' ORDER BY "Id" ASC';
    const result = await query(sql, params);
    res.json(result.rows.map(mapMenuItem));
  } catch (err) {
    console.error('Error fetching menu items:', err);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

// POST /api/restaurant/settle
router.post('/settle', async (req, res) => {
  const { tableName, paymentMethod, items } = req.body;
  if (!tableName?.trim() || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: 'A table name and at least one menu item are required' });
  }
  const lines = items.map(item => ({ id: Number(item.id), quantity: Number(item.quantity) }));
  if (lines.some(item => !Number.isInteger(item.id) || item.id < 1 || !Number.isInteger(item.quantity) || item.quantity < 1)) {
    return res.status(400).json({ error: 'Each order item must have a valid menu item and positive whole-number quantity' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const menuRes = await client.query(
      'SELECT "Id", "Name", "Price" FROM "MenuItems" WHERE "Id" = ANY($1::integer[])',
      [lines.map(item => item.id)]
    );
    const menuItems = new Map(menuRes.rows.map(item => [item.Id, item]));
    if (lines.some(line => !menuItems.has(line.id))) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'An order item is not present in the menu' });
    }
    const subtotal = lines.reduce(
      (sum, line) => sum + Number(menuItems.get(line.id).Price) * line.quantity,
      0
    );
    const amount = subtotal + Math.round(subtotal * 0.05) + Math.round(subtotal * 0.10);
    const countRes = await client.query('SELECT COUNT(*) FROM "Transactions"');
    const id = `TXN-${8801 + parseInt(countRes.rows[0].count, 10)}`;
    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    await client.query(
      `INSERT INTO "Transactions" ("Id", "Date", "Type", "Category", "Description", "Amount", "Method", "Status")
       VALUES ($1, $2, 'Income', 'Restaurant', $3, $4, $5, 'Completed')`,
      [id, date, `Restaurant bill for ${tableName.trim()}`, amount, paymentMethod || 'Credit Card']
    );
    const orderRes = await client.query(
      `INSERT INTO "RestaurantOrders" ("TableName", "Date", "TotalAmount", "PaymentMethod", "TransactionId")
       VALUES ($1, $2, $3, $4, $5) RETURNING "Id"`,
      [tableName.trim(), date, amount, paymentMethod || 'Credit Card', id]
    );
    for (const line of lines) {
      const menuItem = menuItems.get(line.id);
      await client.query(
        `INSERT INTO "RestaurantOrderItems" ("OrderId", "MenuItemId", "ItemName", "Quantity", "UnitPrice")
         VALUES ($1, $2, $3, $4, $5)`,
        [orderRes.rows[0].Id, line.id, menuItem.Name, line.quantity, menuItem.Price]
      );
    }
    await client.query('COMMIT');
    res.status(201).json({
      success: true,
      transactionId: id,
      orderId: orderRes.rows[0].Id,
      totalAmount: amount,
      message: `Bill of ₹${amount.toLocaleString('en-IN')} for ${tableName} settled successfully.`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error settling restaurant bill:', err);
    res.status(500).json({ error: 'Failed to settle restaurant bill' });
  } finally {
    client.release();
  }
});

export default router;
