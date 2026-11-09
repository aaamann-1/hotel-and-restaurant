import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

export const pool = new Pool(
  connectionString
    ? {
        connectionString,
        ssl:
          process.env.NODE_ENV === 'production' ||
          connectionString.includes('sslmode=require') ||
          connectionString.includes('supabase') ||
          connectionString.includes('neon.tech')
            ? { rejectUnauthorized: false }
            : false,
      }
    : {
        host: process.env.PGHOST || 'localhost',
        port: parseInt(process.env.PGPORT || '5432', 10),
        database: process.env.PGDATABASE || 'royal_stay_db',
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'root',
      }
);

// Helper for running queries
export const query = (text, params) => pool.query(text, params);

export async function initDb() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL connected successfully at:', res.rows[0].now);

    // Create tables if not already existing
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "Rooms" (
        "RoomNo" text PRIMARY KEY,
        "Floor" integer NOT NULL,
        "Type" text NOT NULL,
        "Price" numeric NOT NULL,
        "Status" text NOT NULL DEFAULT 'Available',
        "Guest" text,
        "Housekeeping" text NOT NULL DEFAULT 'Clean',
        "Amenities" text
      );

      CREATE TABLE IF NOT EXISTS "Bookings" (
        "Id" text PRIMARY KEY,
        "GuestName" text NOT NULL,
        "GuestEmail" text,
        "GuestPhone" text,
        "Avatar" text,
        "RoomNo" text NOT NULL,
        "RoomType" text,
        "CheckIn" text NOT NULL,
        "CheckOut" text NOT NULL,
        "Nights" integer DEFAULT 1,
        "Guests" integer DEFAULT 1,
        "Status" text NOT NULL DEFAULT 'Confirmed',
        "TotalAmount" numeric DEFAULT 0,
        "PaidAmount" numeric DEFAULT 0,
        "PaymentStatus" text DEFAULT 'Paid',
        "PaymentMethod" text DEFAULT 'Credit Card',
        "SpecialRequest" text,
        "BookingSource" text DEFAULT 'Direct Website',
        "CreatedAt" text
      );

      CREATE TABLE IF NOT EXISTS "MenuItems" (
        "Id" SERIAL PRIMARY KEY,
        "Name" text NOT NULL,
        "Category" text NOT NULL,
        "Price" numeric NOT NULL,
        "PrepTime" text,
        "Veg" boolean DEFAULT false,
        "Image" text
      );

      CREATE TABLE IF NOT EXISTS "Staff" (
        "Id" text PRIMARY KEY,
        "Name" text NOT NULL,
        "Role" text NOT NULL,
        "Department" text NOT NULL,
        "Shift" text,
        "Status" text DEFAULT 'On Duty',
        "Contact" text,
        "Email" text
      );

      CREATE TABLE IF NOT EXISTS "Inventory" (
        "Id" text PRIMARY KEY,
        "Name" text NOT NULL,
        "Category" text NOT NULL,
        "InStock" integer DEFAULT 0,
        "MinThreshold" integer DEFAULT 0,
        "Unit" text,
        "Status" text DEFAULT 'Optimal',
        "Supplier" text
      );

      CREATE TABLE IF NOT EXISTS "TourismPackages" (
        "Id" text PRIMARY KEY,
        "Title" text NOT NULL,
        "Duration" text,
        "Price" numeric NOT NULL,
        "Rating" numeric DEFAULT 5.0,
        "Reviews" integer DEFAULT 0,
        "Category" text,
        "Includes" text,
        "Image" text
      );

      CREATE TABLE IF NOT EXISTS "TourBookings" (
        "Id" text PRIMARY KEY,
        "Guest" text NOT NULL,
        "Room" text,
        "Package" text NOT NULL,
        "Date" text,
        "Participants" integer DEFAULT 1,
        "Status" text DEFAULT 'Confirmed',
        "Amount" numeric DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS "Transactions" (
        "Id" text PRIMARY KEY,
        "Date" text,
        "Type" text NOT NULL,
        "Category" text,
        "Description" text,
        "Amount" numeric DEFAULT 0,
        "Method" text,
        "Status" text DEFAULT 'Completed'
      );

      CREATE TABLE IF NOT EXISTS "RestaurantOrders" (
        "Id" SERIAL PRIMARY KEY,
        "TableName" text NOT NULL,
        "Date" text NOT NULL,
        "TotalAmount" numeric NOT NULL,
        "PaymentMethod" text NOT NULL,
        "TransactionId" text NOT NULL UNIQUE REFERENCES "Transactions"("Id")
      );

      CREATE TABLE IF NOT EXISTS "RestaurantOrderItems" (
        "Id" SERIAL PRIMARY KEY,
        "OrderId" integer NOT NULL REFERENCES "RestaurantOrders"("Id") ON DELETE CASCADE,
        "MenuItemId" integer NOT NULL REFERENCES "MenuItems"("Id"),
        "ItemName" text NOT NULL,
        "Quantity" integer NOT NULL,
        "UnitPrice" numeric NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "Settings" (
        "Key" text PRIMARY KEY,
        "Value" jsonb NOT NULL
      );
    `);

    // Check if rooms need seeding
    const roomCheck = await pool.query('SELECT COUNT(*) FROM "Rooms"');
    if (parseInt(roomCheck.rows[0].count, 10) === 0) {
      console.log('Seeding initial rooms...');
      const rooms = [
        ['101', 1, 'Deluxe Ocean View', 9200, 'Occupied', 'David Chen', 'Clean', 'King Bed, Balcony, Jacuzzi, Wi-Fi, Mini Bar'],
        ['102', 1, 'Deluxe Ocean View', 9200, 'Occupied', 'Emma Wilson', 'Clean', 'King Bed, Balcony, Wi-Fi, Espresso Bar'],
        ['103', 1, 'Deluxe Ocean View', 9200, 'Available', null, 'Clean', 'King Bed, Balcony, Wi-Fi'],
        ['104', 1, 'Deluxe Garden View', 8500, 'Occupied', 'Arjun Mehta', 'In Progress', 'Twin Beds, Garden Patio, Wi-Fi'],
        ['105', 1, 'Deluxe Garden View', 8500, 'Available', null, 'Clean', 'Twin Beds, Garden Patio, Wi-Fi'],
        ['110', 1, 'Deluxe Garden Suite', 12250, 'Reserved', 'Michael Brown (Arriving)', 'Clean', 'King Bed, Private Terrace, Bathtub'],
        ['201', 2, 'Super Deluxe Balcony', 10500, 'Occupied', 'Kavita Rao', 'Clean', 'King Bed, Wrap Balcony, Sea View'],
        ['204', 2, 'Super Deluxe Balcony', 10500, 'Occupied', 'Ravi Kumar', 'Clean', 'King Bed, Wrap Balcony, Sea View'],
        ['205', 2, 'Family Duplex Suite', 17000, 'Reserved', 'Olivia Davis', 'Clean', '2 King Beds, Living Lounge, 2 Baths'],
        ['208', 2, 'Super Deluxe Balcony', 10500, 'Occupied', 'James Taylor', 'Clean', 'King Bed, Feather-free, Executive Desk'],
        ['301', 3, 'Royal Suite', 24000, 'Available', null, 'Dirty', 'Master Suite, Plunge Pool, Butler Service'],
        ['302', 3, 'Super Deluxe Garden', 14000, 'Available', null, 'Clean', 'King Bed, Garden View, Steam Shower'],
        ['305', 3, 'Royal Presidential Suite', 24000, 'Reserved', 'Priya Sharma', 'Clean', 'Master Bedroom, Dining Room, Private Terrace'],
        ['401', 4, 'Imperial Penthouse', 70000, 'Occupied', 'Rajesh Singhania', 'Clean', 'Helipad Access, Private Pool, Dedicated Chef, Wine Cellar'],
        ['402', 4, 'Imperial Penthouse', 70000, 'Available', null, 'Clean', 'Panoramic Ocean, Private Jacuzzi, Dedicated Butler'],
      ];
      for (const r of rooms) {
        await pool.query(
          `INSERT INTO "Rooms" ("RoomNo", "Floor", "Type", "Price", "Status", "Guest", "Housekeeping", "Amenities")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING`,
          r
        );
      }
    }

    // Check if bookings need seeding
    const bookingCheck = await pool.query('SELECT COUNT(*) FROM "Bookings"');
    if (parseInt(bookingCheck.rows[0].count, 10) === 0) {
      console.log('Seeding initial bookings...');
      const bookings = [
        ['BK-1001', 'Emma Wilson', 'emma.wilson@gmail.com', '+1 (555) 382-9014', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250', '102', 'Deluxe Ocean View', '24 Apr 2025', '26 Apr 2025', 2, 2, 'Checked In', 18400, 18400, 'Paid', 'Credit Card (Amex)', 'Early check-in & high floor corner room preferred.', 'Direct Website', '20 Apr 2025'],
        ['BK-1002', 'James Taylor', 'j.taylor@skyward.org', '+44 7911 123456', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250', '208', 'Super Deluxe Balcony', '24 Apr 2025', '28 Apr 2025', 4, 1, 'Checked In', 42000, 25000, 'Partial', 'Corporate Billing', 'Allergic to feather pillows, feather-free bedding setup.', 'Corporate Partner', '18 Apr 2025'],
        ['BK-1003', 'Priya Sharma', 'priya.sharma@outlook.in', '+91 98201 44521', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250', '305', 'Royal Presidential Suite', '25 Apr 2025', '29 Apr 2025', 4, 3, 'Confirmed', 96000, 96000, 'Paid', 'UPI / Net Banking', 'Anniversary celebration setup with champagne & red roses.', 'Luxury Escapes Agency', '22 Apr 2025'],
        ['BK-1004', 'Michael Brown', 'm.brown@apexadvisors.com', '+1 (415) 890-3321', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250', '110', 'Deluxe Garden Suite', '25 Apr 2025', '27 Apr 2025', 2, 2, 'Arriving', 24500, 12000, 'Partial', 'Credit Card (Visa)', 'Airport limousine pickup requested for 3:30 PM.', 'Booking.com', '21 Apr 2025'],
        ['BK-1005', 'Olivia Davis', 'olivia.davis@designstudio.uk', '+44 7700 900821', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250', '205', 'Family Duplex Suite', '26 Apr 2025', '30 Apr 2025', 4, 4, 'Confirmed', 68000, 68000, 'Paid', 'MasterCard', 'Baby cot and extra baby amenities required in master bedroom.', 'Direct Website', '23 Apr 2025'],
        ['BK-1006', 'Rajesh Singhania', 'rajesh@singhaniagroup.com', '+91 99100 87654', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250', '401', 'Imperial Penthouse', '23 Apr 2025', '25 Apr 2025', 2, 2, 'Checked In', 140000, 140000, 'Paid', 'Bank Transfer', 'Private butler assigned, dietary preference: pure vegetarian.', 'VIP Concierge', '19 Apr 2025'],
        ['BK-1007', 'Elena Rostova', 'elena.rostova@geneva-cap.ch', '+41 22 765 4321', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250', '302', 'Super Deluxe Garden', '22 Apr 2025', '24 Apr 2025', 2, 1, 'Checked Out', 28000, 28000, 'Paid', 'Credit Card (Amex)', 'Late checkout at 1:00 PM utilized.', 'Expedia', '15 Apr 2025'],
      ];
      for (const b of bookings) {
        await pool.query(
          `INSERT INTO "Bookings" ("Id", "GuestName", "GuestEmail", "GuestPhone", "Avatar", "RoomNo", "RoomType", "CheckIn", "CheckOut", "Nights", "Guests", "Status", "TotalAmount", "PaidAmount", "PaymentStatus", "PaymentMethod", "SpecialRequest", "BookingSource", "CreatedAt")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) ON CONFLICT DO NOTHING`,
          b
        );
      }
    }

    // Check Menu Items
    const menuCheck = await pool.query('SELECT COUNT(*) FROM "MenuItems"');
    if (parseInt(menuCheck.rows[0].count, 10) === 0) {
      console.log('Seeding initial menu items...');
      const items = [
        ['Truffle Infused Lobster Bisque', 'Starters', 1450, '15 min', false, 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=300'],
        ['Wild Forest Mushroom Bruschetta', 'Starters', 780, '10 min', true, 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&q=80&w=300'],
        ['Pan-Seared Chilean Sea Bass', 'Mains', 2850, '25 min', false, 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=300'],
        ['Royal Saffron Dum Biryani (Awadhi)', 'Mains', 1650, '20 min', false, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=300'],
        ['Paneer Lababdar with Warqi Paratha', 'Mains', 1250, '18 min', true, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=300'],
        ['A5 Japanese Wagyu Ribeye (200g)', 'Luxury Steaks', 4900, '22 min', false, 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=300'],
        ['Dom Pérignon Vintage Champagne (Glass)', 'Beverages', 3200, '5 min', true, 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&q=80&w=300'],
        ['Royal Saffron & Pistachio Kulfi', 'Desserts', 650, '8 min', true, 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=300'],
        ['24K Gold Valrhona Chocolate Fondant', 'Desserts', 1100, '15 min', true, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=300']
      ];
      for (const m of items) {
        await pool.query(
          `INSERT INTO "MenuItems" ("Name", "Category", "Price", "PrepTime", "Veg", "Image") VALUES ($1, $2, $3, $4, $5, $6)`,
          m
        );
      }
    }

    // Check Staff
    const staffCheck = await pool.query('SELECT COUNT(*) FROM "Staff"');
    if (parseInt(staffCheck.rows[0].count, 10) === 0) {
      console.log('Seeding initial staff...');
      const staffMembers = [
        ['EMP-101', 'Rahul Sharma', 'General Manager / Admin', 'Executive Office', 'Morning (08:00 - 17:00)', 'On Duty', '+91 98110 00111', 'rahul.gm@royalstay.com'],
        ['EMP-102', 'Ananya Deshmukh', 'Front Office Manager', 'Front Office', 'Morning (07:00 - 15:30)', 'On Duty', '+91 98110 00222', 'ananya.fo@royalstay.com'],
        ['EMP-103', 'Chef Jean-Luc Laurent', 'Executive Head Chef', 'Food & Beverage', 'Split (11:00 - 23:00)', 'On Duty', '+91 98110 00333', 'chef.jean@royalstay.com'],
        ['EMP-104', 'Sunil Verma', 'Executive Housekeeper', 'Housekeeping', 'Morning (06:30 - 15:00)', 'On Duty', '+91 98110 00444', 'sunil.hk@royalstay.com'],
        ['EMP-105', 'Pooja Malhotra', 'Chief Concierge & Guest Relations', 'Concierge', 'General (09:00 - 18:00)', 'On Duty', '+91 98110 00555', 'pooja.concierge@royalstay.com'],
        ['EMP-106', 'Vikram Rathore', 'Director of Security', 'Loss Prevention', 'Night (22:00 - 06:30)', 'Off Duty', '+91 98110 00666', 'vikram.sec@royalstay.com'],
      ];
      for (const s of staffMembers) {
        await pool.query(
          `INSERT INTO "Staff" ("Id", "Name", "Role", "Department", "Shift", "Status", "Contact", "Email")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING`,
          s
        );
      }
    }

    // Check Inventory
    const invCheck = await pool.query('SELECT COUNT(*) FROM "Inventory"');
    if (parseInt(invCheck.rows[0].count, 10) === 0) {
      console.log('Seeding initial inventory...');
      const inventory = [
        ['INV-01', 'Egyptian Cotton Bed Linen (King)', 'Housekeeping', 142, 50, 'Sets', 'Optimal', 'Riviera Textiles Ltd'],
        ['INV-02', "L'Occitane Verbena Toiletry Kits", 'Guest Amenities', 320, 100, 'Boxes', 'Optimal', 'Provence Hospitality'],
        ['INV-03', 'Dom Pérignon Vintage 2013', 'F&B Beverage', 4, 12, 'Bottles', 'Low Stock', 'Moët Hennessy India'],
        ['INV-04', 'Organic Farm Fresh Microgreens & Herbs', 'Kitchen Produce', 28, 15, 'Kg', 'Optimal', 'Valley Organic Farms'],
        ['INV-05', 'Illy Dark Roast Espresso Pods', 'F&B Dry Stores', 480, 200, 'Units', 'Optimal', 'Global Brew Co'],
        ['INV-06', 'Spa Ayurvedic Essential Massage Oils', 'Wellness & Spa', 18, 20, 'Liters', 'Reorder Required', 'Kama Ayurveda'],
      ];
      for (const i of inventory) {
        await pool.query(
          `INSERT INTO "Inventory" ("Id", "Name", "Category", "InStock", "MinThreshold", "Unit", "Status", "Supplier")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING`,
          i
        );
      }
    }

    // Check Tourism Packages
    const pkgCheck = await pool.query('SELECT COUNT(*) FROM "TourismPackages"');
    if (parseInt(pkgCheck.rows[0].count, 10) === 0) {
      console.log('Seeding initial tourism packages...');
      const pkgs = [
        ['PKG-01', 'Royal Sunset Catamaran & Champagne Cruise', '4 Hours', 14500, 4.9, 128, 'Maritime Luxury', 'Private Yacht, Sommelier onboard, Caviar & Canapés, Hotel Transfer', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600'],
        ['PKG-02', 'Heritage Fortress Helicopter Tour & High Tea', 'Full Day (6 Hours)', 38000, 5.0, 84, 'Aviation & Heritage', 'Helicopter Transit, Royal Guide, 7-Course Palace Tea, Champagne', 'https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&q=80&w=600'],
        ['PKG-03', 'Spiritual Twilight Aarti & Temple Walkway', '3 Hours', 5200, 4.8, 215, 'Culture & Spiritual', 'VIP Temple Entry, Historian Guide, Floral Offerings, Chauffeured BMW', 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600'],
        ['PKG-04', 'Secret Spice Plantation & Organic Culinary Masterclass', '5 Hours', 9500, 4.9, 96, 'Culinary & Nature', 'Executive Chef Guide, Tasting Session, Cookbook Gift, Wine Pairing', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600'],
      ];
      for (const p of pkgs) {
        await pool.query(
          `INSERT INTO "TourismPackages" ("Id", "Title", "Duration", "Price", "Rating", "Reviews", "Category", "Includes", "Image")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT DO NOTHING`,
          p
        );
      }
    }

    // Check Tour Bookings
    const tbCheck = await pool.query('SELECT COUNT(*) FROM "TourBookings"');
    if (parseInt(tbCheck.rows[0].count, 10) === 0) {
      console.log('Seeding initial tour bookings...');
      const tbs = [
        ['TB-301', 'Emma Wilson', '102', 'Royal Sunset Catamaran & Champagne Cruise', '25 Apr 2025', 2, 'Confirmed', 29000],
        ['TB-302', 'Sophia Martin', 'Enquiry', 'Heritage Fortress Helicopter Tour & High Tea', '27 Apr 2025', 2, 'Under Review', 76000],
        ['TB-303', 'Rajesh Singhania', '401', 'Spiritual Twilight Aarti & Temple Walkway', '24 Apr 2025', 4, 'Completed', 20800],
        ['TB-304', 'James Taylor', '208', 'Secret Spice Plantation & Organic Culinary Masterclass', '26 Apr 2025', 1, 'Confirmed', 9500],
      ];
      for (const tb of tbs) {
        await pool.query(
          `INSERT INTO "TourBookings" ("Id", "Guest", "Room", "Package", "Date", "Participants", "Status", "Amount")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING`,
          tb
        );
      }
    }

    // Check Transactions
    const txnCheck = await pool.query('SELECT COUNT(*) FROM "Transactions"');
    if (parseInt(txnCheck.rows[0].count, 10) === 0) {
      console.log('Seeding initial transactions...');
      const txns = [
        ['TXN-8812', '24 Apr 2025', 'Income', 'Room Settlement', 'BK-1001 Emma Wilson Room Folio', 18400, 'Amex Card', 'Completed'],
        ['TXN-8813', '24 Apr 2025', 'Expense', 'F&B Procurement', 'Fresh Seafood & Lobster Delivery', 32500, 'Direct Bank', 'Completed'],
        ['TXN-8814', '24 Apr 2025', 'Income', 'Restaurant POS', 'Table 4 Sea Deck Dinner Bill', 8900, 'UPI Pay', 'Completed'],
        ['TXN-8815', '23 Apr 2025', 'Income', 'Tour Booking', 'TB-303 Royal Aarti Excursion Folio', 20800, 'Corporate Transfer', 'Completed'],
        ['TXN-8816', '23 Apr 2025', 'Expense', 'Utilities & Fuel', 'Monthly Chiller Plant Generator Diesel', 64000, 'NEFT', 'Completed'],
      ];
      for (const t of txns) {
        await pool.query(
          `INSERT INTO "Transactions" ("Id", "Date", "Type", "Category", "Description", "Amount", "Method", "Status")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING`,
          t
        );
      }
    }
  } catch (err) {
    console.error('Error initializing PostgreSQL database:', err);
    throw err;
  }
}
