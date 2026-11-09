import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

const defaultSettings = {
  hotelName: 'Royal Stay Heritage & Beach Resort',
  tagline: 'Exceptional Stays, Create Lasting Memories',
  starRating: '5-Star Luxury Palace',
  address: 'Palace Road, Cliff Edge Promenade, Resort Strip',
  currency: 'INR (₹)',
  checkInTime: '14:00 (2:00 PM)',
  checkOutTime: '11:00 (11:00 AM)',
  roomGst: '18%',
  fnbGst: '5%',
  autoKeycardIssuance: true,
  vipSmsNotifications: true,
};

router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT "Value" FROM "Settings" WHERE "Key" = $1', ['property']);
    res.json(result.rows[0]?.Value || defaultSettings);
  } catch (err) {
    console.error('Error fetching settings:', err);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

router.put('/', async (req, res) => {
  const settings = req.body;
  if (!settings || typeof settings !== 'object' || Array.isArray(settings)) {
    return res.status(400).json({ error: 'Settings must be a JSON object' });
  }

  try {
    await query(
      `INSERT INTO "Settings" ("Key", "Value") VALUES ($1, $2::jsonb)
       ON CONFLICT ("Key") DO UPDATE SET "Value" = EXCLUDED."Value"`,
      ['property', JSON.stringify(settings)]
    );
    res.json(settings);
  } catch (err) {
    console.error('Error saving settings:', err);
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

export default router;
