import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

function mapTransaction(row) {
  if (!row) return null;
  return {
    id: row.Id,
    date: row.Date,
    type: row.Type,
    category: row.Category,
    description: row.Description,
    amount: Number(row.Amount) || 0,
    method: row.Method,
    status: row.Status,
  };
}

// GET /api/accounts/summary
router.get('/summary', async (req, res) => {
  try {
    const txnRes = await query('SELECT * FROM "Transactions" ORDER BY "Id" DESC');
    const transactions = txnRes.rows.map(mapTransaction);

    const income = transactions
      .filter(t => t.type === 'Income')
      .reduce((acc, t) => acc + t.amount, 0);

    const expenses = transactions
      .filter(t => t.type === 'Expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const netProfit = income - expenses;
    const profitMargin = income ? ((netProfit / income) * 100).toFixed(1) : '0.0';

    res.json({
      monthlyRevenue: `₹${income.toLocaleString('en-IN')}`,
      monthlyExpenses: `₹${expenses.toLocaleString('en-IN')}`,
      netProfit: `₹${netProfit.toLocaleString('en-IN')}`,
      profitMargin: `${profitMargin}%`,
      recentTransactions: transactions,
    });
  } catch (err) {
    console.error('Error fetching accounts summary:', err);
    res.status(500).json({ error: 'Failed to fetch accounts summary' });
  }
});

// POST /api/accounts/transaction
router.post('/transaction', async (req, res) => {
  try {
    const t = req.body;
    const amount = Number(t.amount);
    if (!['Income', 'Expense'].includes(t.type) || !Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Transaction type must be Income or Expense and amount must be positive' });
    }
    let id = t.id;
    if (!id) {
      const countRes = await query('SELECT COUNT(*) FROM "Transactions"');
      const count = parseInt(countRes.rows[0].count, 10);
      id = `TXN-${8800 + count + 1}`;
    }

    const date = t.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    await query(
      `INSERT INTO "Transactions" ("Id", "Date", "Type", "Category", "Description", "Amount", "Method", "Status")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        id,
        date,
        t.type || 'Income',
        t.category || 'General',
        t.description || '',
        amount,
        t.method || 'Credit Card',
        t.status || 'Completed',
      ]
    );

    res.status(201).json({ id, date, ...t });
  } catch (err) {
    console.error('Error creating transaction:', err);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

export default router;
