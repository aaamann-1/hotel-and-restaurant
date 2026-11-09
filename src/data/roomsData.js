export const hotelRooms = [
  { roomNo: "101", floor: 1, type: "Deluxe Ocean View", price: 9200, status: "Occupied", guest: "David Chen", housekeeping: "Clean", amenities: ["King Bed", "Balcony", "Jacuzzi", "Wi-Fi", "Mini Bar"] },
  { roomNo: "102", floor: 1, type: "Deluxe Ocean View", price: 9200, status: "Occupied", guest: "Emma Wilson", housekeeping: "Clean", amenities: ["King Bed", "Balcony", "Wi-Fi", "Espresso Bar"] },
  { roomNo: "103", floor: 1, type: "Deluxe Ocean View", price: 9200, status: "Available", guest: null, housekeeping: "Clean", amenities: ["King Bed", "Balcony", "Wi-Fi"] },
  { roomNo: "104", floor: 1, type: "Deluxe Garden View", price: 8500, status: "Occupied", guest: "Arjun Mehta", housekeeping: "In Progress", amenities: ["Twin Beds", "Garden Patio", "Wi-Fi"] },
  { roomNo: "105", floor: 1, type: "Deluxe Garden View", price: 8500, status: "Available", guest: null, housekeeping: "Clean", amenities: ["Twin Beds", "Garden Patio", "Wi-Fi"] },
  { roomNo: "110", floor: 1, type: "Deluxe Garden Suite", price: 12250, status: "Reserved", guest: "Michael Brown (Arriving)", housekeeping: "Clean", amenities: ["King Bed", "Private Terrace", "Bathtub"] },
  
  { roomNo: "201", floor: 2, type: "Super Deluxe Balcony", price: 10500, status: "Occupied", guest: "Kavita Rao", housekeeping: "Clean", amenities: ["King Bed", "Wrap Balcony", "Sea View"] },
  { roomNo: "204", floor: 2, type: "Super Deluxe Balcony", price: 10500, status: "Occupied", guest: "Ravi Kumar", housekeeping: "Clean", amenities: ["King Bed", "Wrap Balcony", "Sea View"] },
  { roomNo: "205", floor: 2, type: "Family Duplex Suite", price: 17000, status: "Reserved", guest: "Olivia Davis (26 Apr)", housekeeping: "Clean", amenities: ["2 King Beds", "Living Lounge", "2 Baths"] },
  { roomNo: "208", floor: 2, type: "Super Deluxe Balcony", price: 10500, status: "Occupied", guest: "James Taylor", housekeeping: "Clean", amenities: ["King Bed", "Feather-free", "Executive Desk"] },
  
  { roomNo: "301", floor: 3, type: "Royal Suite", price: 24000, status: "Available", guest: null, housekeeping: "Dirty", amenities: ["Master Suite", "Plunge Pool", "Butler Service"] },
  { roomNo: "302", floor: 3, type: "Super Deluxe Garden", price: 14000, status: "Available", guest: null, housekeeping: "Clean", amenities: ["King Bed", "Garden View", "Steam Shower"] },
  { roomNo: "305", floor: 3, type: "Royal Presidential Suite", price: 24000, status: "Reserved", guest: "Priya Sharma (25 Apr)", housekeeping: "Clean", amenities: ["Master Bedroom", "Dining Room", "Private Terrace"] },

  { roomNo: "401", floor: 4, type: "Imperial Penthouse", price: 70000, status: "Occupied", guest: "Rajesh Singhania", housekeeping: "Clean", amenities: ["Helipad Access", "Private Pool", "Dedicated Chef", "Wine Cellar"] },
  { roomNo: "402", floor: 4, type: "Imperial Penthouse", price: 70000, status: "Available", guest: null, housekeeping: "Clean", amenities: ["Panoramic Ocean", "Private Jacuzzi", "Dedicated Butler"] },
];

export const roomCategories = [
  {
    id: "deluxe",
    name: "Deluxe Rooms",
    totalCount: 18,
    occupiedCount: 15,
    basePrice: 9200,
    size: "450 sq ft",
    bedType: "King / Twin",
    view: "Ocean or Garden View",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=600",
    description: "Spacious luxury sanctuary featuring plush Italian linens, marble ensuite, and serene terrace outlooks."
  },
  {
    id: "super-deluxe",
    name: "Super Deluxe Balcony",
    totalCount: 14,
    occupiedCount: 13,
    basePrice: 10500,
    size: "620 sq ft",
    bedType: "California King",
    view: "Unobstructed Sea View",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600",
    description: "Elevated sea-facing haven with wrap-around private terrace, rain shower, and champagne minibar."
  },
  {
    id: "suite",
    name: "Royal & Presidential Suites",
    totalCount: 8,
    occupiedCount: 7,
    basePrice: 24000,
    size: "1,150 sq ft",
    bedType: "Grand Royal King",
    view: "Panoramic Coastline",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600",
    description: "Opulent dual-room suite with private plunge pool, executive meeting lounge, and 24/7 butler service."
  },
  {
    id: "family",
    name: "Family Duplex Suite",
    totalCount: 5,
    occupiedCount: 4,
    basePrice: 17000,
    size: "980 sq ft",
    bedType: "2 King Beds + Daybed",
    view: "Resort Lagoon View",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600",
    description: "Two-level family villa design with connected living zone, kitchenette, and child-safe amenities."
  },
  {
    id: "penthouse",
    name: "Imperial Penthouse",
    totalCount: 3,
    occupiedCount: 2,
    basePrice: 70000,
    size: "2,400 sq ft",
    bedType: "Custom Emporium King",
    view: "360° Ocean & Skyline",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=600",
    description: "The pinnacle of royal luxury. Rooftop private infinity pool, grand piano, and private sommelier."
  }
];
