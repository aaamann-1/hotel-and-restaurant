export const hotelStaff = [
  { id: "EMP-101", name: "Rahul Sharma", role: "General Manager / Admin", department: "Executive Office", shift: "Morning (08:00 - 17:00)", status: "On Duty", contact: "+91 98110 00111", email: "rahul.gm@royalstay.com" },
  { id: "EMP-102", name: "Ananya Deshmukh", role: "Front Office Manager", department: "Front Office", shift: "Morning (07:00 - 15:30)", status: "On Duty", contact: "+91 98110 00222", email: "ananya.fo@royalstay.com" },
  { id: "EMP-103", name: "Chef Jean-Luc Laurent", role: "Executive Head Chef", department: "Food & Beverage", shift: "Split (11:00 - 23:00)", status: "On Duty", contact: "+91 98110 00333", email: "chef.jean@royalstay.com" },
  { id: "EMP-104", name: "Sunil Verma", role: "Executive Housekeeper", department: "Housekeeping", shift: "Morning (06:30 - 15:00)", status: "On Duty", contact: "+91 98110 00444", email: "sunil.hk@royalstay.com" },
  { id: "EMP-105", name: "Pooja Malhotra", role: "Chief Concierge & Guest Relations", department: "Concierge", shift: "General (09:00 - 18:00)", status: "On Duty", contact: "+91 98110 00555", email: "pooja.concierge@royalstay.com" },
  { id: "EMP-106", name: "Vikram Rathore", role: "Director of Security", department: "Loss Prevention", shift: "Night (22:00 - 06:30)", status: "Off Duty", contact: "+91 98110 00666", email: "vikram.sec@royalstay.com" },
];

export const inventoryItems = [
  { id: "INV-01", name: "Egyptian Cotton Bed Linen (King)", category: "Housekeeping", inStock: 142, minThreshold: 50, unit: "Sets", status: "Optimal", supplier: "Riviera Textiles Ltd" },
  { id: "INV-02", name: "L'Occitane Verbena Toiletry Kits", category: "Guest Amenities", inStock: 320, minThreshold: 100, unit: "Boxes", status: "Optimal", supplier: "Provence Hospitality" },
  { id: "INV-03", name: "Dom Pérignon Vintage 2013", category: "F&B Beverage", inStock: 4, minThreshold: 12, unit: "Bottles", status: "Low Stock", supplier: "Moët Hennessy India" },
  { id: "INV-04", name: "Organic Farm Fresh Microgreens & Herbs", category: "Kitchen Produce", inStock: 28, minThreshold: 15, unit: "Kg", status: "Optimal", supplier: "Valley Organic Farms" },
  { id: "INV-05", name: "Illy Dark Roast Espresso Pods", category: "F&B Dry Stores", inStock: 480, minThreshold: 200, unit: "Units", status: "Optimal", supplier: "Global Brew Co" },
  { id: "INV-06", name: "Spa Ayurvedic Essential Massage Oils", category: "Wellness & Spa", inStock: 18, minThreshold: 20, unit: "Liters", status: "Reorder Required", supplier: "Kama Ayurveda" }
];

export const accountsSummary = {
  monthlyRevenue: "₹42,85,900",
  monthlyExpenses: "₹18,40,200",
  netProfit: "₹24,45,700",
  profitMargin: "57.1%",
  recentTransactions: [
    { id: "TXN-8812", date: "24 Apr 2025", type: "Income", category: "Room Settlement", description: "BK-1001 Emma Wilson Room Folio", amount: 18400, method: "Amex Card", status: "Completed" },
    { id: "TXN-8813", date: "24 Apr 2025", type: "Expense", category: "F&B Procurement", description: "Fresh Seafood & Lobster Delivery", amount: 32500, method: "Direct Bank", status: "Completed" },
    { id: "TXN-8814", date: "24 Apr 2025", type: "Income", category: "Restaurant POS", description: "Table 4 Sea Deck Dinner Bill", amount: 8900, method: "UPI Pay", status: "Completed" },
    { id: "TXN-8815", date: "23 Apr 2025", type: "Income", category: "Tour Booking", description: "TB-303 Royal Aarti Excursion Folio", amount: 20800, method: "Corporate Transfer", status: "Completed" },
    { id: "TXN-8816", date: "23 Apr 2025", type: "Expense", category: "Utilities & Fuel", description: "Monthly Chiller Plant Generator Diesel", amount: 64000, method: "NEFT", status: "Completed" },
  ]
};
