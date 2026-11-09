import React, { useState } from 'react';
import {
  Plus,
  Minus,
  Printer,
  CreditCard,
  ShoppingBag,
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { restaurantTables } from '../data/restaurantData';
import { useHotel } from '../context/HotelContext';

export const RestaurantPOS = () => {
  const { showToast, menuItems: restaurantMenuItems, settleRestaurantBill } = useHotel();
  const [selectedTable, setSelectedTable] = useState('T1');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);

  const categories = ['All', 'Starters', 'Mains', 'Luxury Steaks', 'Beverages', 'Desserts'];

  const filteredItems = restaurantMenuItems.filter(item =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev =>
      prev
        .map(i => {
          if (i.id === id) {
            const newQty = i.qty + delta;
            return newQty > 0 ? { ...i, qty: newQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const subtotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const serviceCharge = Math.round(subtotal * 0.10);
  const total = subtotal + tax + serviceCharge;

  const handleSettle = async () => {
    const settled = await settleRestaurantBill(
      selectedTable,
      total,
      'Credit Card',
      cart.map(({ id, name, qty, price }) => ({ id, name, quantity: qty, unitPrice: price }))
    );
    if (settled) setCart([]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-[#ECE8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
            <span>Restaurant & POS</span>
            <span>/</span>
            <span className="text-[#C9A36A] font-semibold">POS Terminal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
            Royal Dining & POS Billing Terminal
          </h2>
          <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
            Touch-screen optimized point-of-sale for fine dining, poolside cabanas, and in-room dining
          </p>
        </div>

        {/* Table Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {restaurantTables.slice(0, 5).map(tbl => (
            <button
              key={tbl.id}
              onClick={() => setSelectedTable(tbl.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedTable === tbl.id
                  ? 'bg-[#18233F] text-white border-[#18233F] shadow-sm'
                  : 'bg-white text-[#7B7D85] border-[#ECE8E1] hover:border-[#C9A36A]'
              }`}
            >
              {tbl.name}
            </button>
          ))}
        </div>
      </div>

      {/* POS Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Category Tabs & Menu Items Grid (Spans 8) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#C9A36A] text-white shadow-sm'
                    : 'bg-white text-[#7B7D85] border border-[#ECE8E1] hover:text-[#18233F]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <Card
                key={item.id}
                hoverEffect
                className="p-3 cursor-pointer flex flex-col justify-between group"
                onClick={() => addToCart(item)}
              >
                <div>
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#18233F]">
                      {item.prepTime}
                    </span>
                    <span
                      className={`absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${
                        item.veg ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                  </div>

                  <h4 className="text-xs font-bold text-[#18233F] group-hover:text-[#C9A36A] transition-colors line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#7B7D85]">{item.category}</p>
                </div>

                <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#ECE8E1]">
                  <span className="font-serif font-bold text-sm text-[#A37E45]">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="w-7 h-7 rounded-lg bg-[#FAF5EC] text-[#C9A36A] hover:bg-[#C9A36A] hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Active Order Ticket / Billing Cart (Spans 4) */}
        <div className="lg:col-span-4">
          <Card className="sticky top-24 p-5">
            {/* Ticket Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E1] mb-4">
              <div>
                <h3 className="font-serif font-bold text-base text-[#18233F]">
                  Order Ticket #{selectedTable}
                </h3>
                <p className="text-[11px] text-[#7B7D85]">Server: Ananya Deshmukh • Dine-in</p>
              </div>
              <ShoppingBag className="w-5 h-5 text-[#C9A36A]" />
            </div>

            {/* Cart Items List */}
            <div className="max-h-72 overflow-y-auto divide-y divide-[#ECE8E1] -mx-2 px-2 mb-4">
              {cart.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#7B7D85]">
                  Cart is empty. Click any menu delicacy to add.
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex-1 pr-2">
                      <p className="font-semibold text-[#18233F] truncate">{item.name}</p>
                      <p className="text-[10px] text-[#7B7D85]">₹{item.price} each</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-[#ECE8E1] rounded-lg overflow-hidden bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="p-1 hover:bg-gray-200 text-[#18233F]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-bold text-xs">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="p-1 hover:bg-gray-200 text-[#18233F]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-[#18233F] w-14 text-right">
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Billing Calculation Breakdown */}
            <div className="pt-3 border-t border-[#ECE8E1] space-y-1.5 text-xs text-[#7B7D85]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#18233F]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>F&B GST (5%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Hospitality Service Charge (10%)</span>
                <span>₹{serviceCharge.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-[#ECE8E1] flex justify-between text-base font-bold text-[#18233F]">
                <span>Total Amount</span>
                <span className="text-[#A37E45] font-serif text-lg">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Settle / Print KOT Actions */}
            <div className="pt-4 mt-2 space-y-2">
              <Button
                variant="primary"
                className="w-full py-2.5"
                disabled={cart.length === 0}
                onClick={handleSettle}
                icon={CreditCard}
              >
                Settle & Print Receipt
              </Button>
              <Button
                variant="outline"
                className="w-full py-2 text-xs"
                disabled={cart.length === 0}
                onClick={() => showToast('Kitchen ticket printing is not configured yet.', 'error')}
                icon={Printer}
              >
                Send KOT to Kitchen Only
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPOS;
