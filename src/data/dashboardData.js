// Mock data for Royal Stay Hotel Management System (THMS)

export const kpiStats = {
  totalRooms: {
    value: 48,
    occupied: 42,
    available: 6,
    occupancyRate: 87,
    label: "Total Rooms",
    change: "+4% vs last week",
  },
  todayBookings: {
    value: 12,
    checkIns: 6,
    checkOuts: 6,
    trend: "+20%",
    isPositive: true,
    label: "Today's Bookings",
  },
  todayRevenue: {
    value: "₹1,28,450",
    rawValue: 128450,
    subtitle: "Room + F&B + Others",
    trend: "+15%",
    isPositive: true,
    label: "Today's Revenue",
    sparkline: [35, 42, 48, 52, 60, 58, 65, 78, 92, 110, 128]
  },
  totalGuests: {
    value: 36,
    subtitle: "In-house guests",
    trend: "+12%",
    isPositive: true,
    label: "Total Guests",
  }
};

export const occupancyChartData = {
  last7Days: [
    { date: "18 Apr", occupancy: 35, rooms: 17, revenue: "₹64,200" },
    { date: "19 Apr", occupancy: 45, rooms: 22, revenue: "₹78,400" },
    { date: "20 Apr", occupancy: 58, rooms: 28, revenue: "₹96,100" },
    { date: "21 Apr", occupancy: 53, rooms: 25, revenue: "₹89,500" },
    { date: "22 Apr", occupancy: 72, rooms: 35, revenue: "₹1,12,000" },
    { date: "23 Apr", occupancy: 68, rooms: 33, revenue: "₹1,08,300" },
    { date: "24 Apr", occupancy: 87, rooms: 42, revenue: "₹1,28,450" },
  ],
  last14Days: [
    { date: "11 Apr", occupancy: 40, rooms: 19, revenue: "₹70,000" },
    { date: "12 Apr", occupancy: 44, rooms: 21, revenue: "₹76,000" },
    { date: "13 Apr", occupancy: 50, rooms: 24, revenue: "₹84,000" },
    { date: "14 Apr", occupancy: 62, rooms: 30, revenue: "₹1,01,000" },
    { date: "15 Apr", occupancy: 55, rooms: 26, revenue: "₹91,000" },
    { date: "16 Apr", occupancy: 48, rooms: 23, revenue: "₹82,000" },
    { date: "17 Apr", occupancy: 52, rooms: 25, revenue: "₹88,000" },
    { date: "18 Apr", occupancy: 35, rooms: 17, revenue: "₹64,200" },
    { date: "19 Apr", occupancy: 45, rooms: 22, revenue: "₹78,400" },
    { date: "20 Apr", occupancy: 58, rooms: 28, revenue: "₹96,100" },
    { date: "21 Apr", occupancy: 53, rooms: 25, revenue: "₹89,500" },
    { date: "22 Apr", occupancy: 72, rooms: 35, revenue: "₹1,12,000" },
    { date: "23 Apr", occupancy: 68, rooms: 33, revenue: "₹1,08,300" },
    { date: "24 Apr", occupancy: 87, rooms: 42, revenue: "₹1,28,450" },
  ],
  last30Days: [
    { date: "W1", occupancy: 52, rooms: 25, revenue: "₹5,40,000" },
    { date: "W2", occupancy: 64, rooms: 31, revenue: "₹6,80,000" },
    { date: "W3", occupancy: 71, rooms: 34, revenue: "₹7,65,000" },
    { date: "W4", occupancy: 87, rooms: 42, revenue: "₹9,20,000" },
  ]
};

export const roomTypeDistribution = [
  { name: "Deluxe", count: 18, percentage: 37, color: "#C9A36A" },
  { name: "Super Deluxe", count: 14, percentage: 29, color: "#15966A" },
  { name: "Suite", count: 8, percentage: 17, color: "#2563EB" },
  { name: "Family", count: 5, percentage: 10, color: "#8B5CF6" },
  { name: "Others", count: 3, percentage: 7, color: "#94A3B8" },
];

export const recentActivities = [
  {
    id: 1,
    title: "New booking confirmed",
    guest: "Emma Wilson",
    detail: "Deluxe Room",
    time: "2 mins ago",
    category: "booking",
    iconColor: "text-amber-700 bg-amber-100",
  },
  {
    id: 2,
    title: "Check-in completed",
    guest: "Ravi Kumar",
    detail: "Room 204",
    time: "12 mins ago",
    category: "checkin",
    iconColor: "text-emerald-700 bg-emerald-100",
  },
  {
    id: 3,
    title: "Room cleaned",
    guest: "Room 301",
    detail: "Housekeeping",
    time: "28 mins ago",
    category: "housekeeping",
    iconColor: "text-blue-700 bg-blue-100",
  },
  {
    id: 4,
    title: "Payment received",
    guest: "₹8,500",
    detail: "Cash",
    time: "45 mins ago",
    category: "payment",
    iconColor: "text-green-700 bg-green-100",
  },
  {
    id: 5,
    title: "New enquiry",
    guest: "Sophia Martin",
    detail: "Tour Package",
    time: "1 hour ago",
    category: "tourism",
    iconColor: "text-purple-700 bg-purple-100",
  },
  {
    id: 6,
    title: "Stock updated",
    guest: "Fresh Vegetables",
    detail: "Inventory",
    time: "2 hours ago",
    category: "inventory",
    iconColor: "text-slate-700 bg-slate-100",
  },
];

export const notificationsList = [
  {
    id: 1,
    title: "VIP Arrival Alert",
    message: "Ambassador guest Mr. Vikram Singhania arriving at 2:00 PM for Royal Suite 401.",
    time: "10 mins ago",
    unread: true,
    type: "vip"
  },
  {
    id: 2,
    title: "Housekeeping Request",
    message: "Extra down feather pillows requested by Room 208 (James Taylor).",
    time: "25 mins ago",
    unread: true,
    type: "service"
  },
  {
    id: 3,
    title: "Banquet Hall Booking",
    message: "New confirmation for Sapphire Hall wedding reception on 28 Apr.",
    time: "1 hour ago",
    unread: false,
    type: "event"
  },
  {
    id: 4,
    title: "Low Inventory Notification",
    message: "Premium sparkling wine stock is below reorder threshold (4 bottles left).",
    time: "3 hours ago",
    unread: false,
    type: "inventory"
  }
];
