import React from 'react';
import { Utensils, Flame, Sparkles, ChefHat } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useHotel } from '../context/HotelContext';
import { useNavigate } from 'react-router-dom';

export const RestaurantMenu = () => {
  const navigate = useNavigate();
  const { menuItems: restaurantMenuItems } = useHotel();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
            <span>Restaurant & Dining</span>
            <span>/</span>
            <span className="text-[#C9A36A] font-semibold">Culinary Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
            Haute Cuisine & Dining Venues
          </h2>
          <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
            Master-curated epicurean experiences curated by Executive Chef Jean-Luc Laurent
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/restaurant/pos')}
          icon={Utensils}
        >
          Open POS Billing Desk
        </Button>
      </div>

      {/* Dining Venues Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverEffect className="p-5 border-l-4 border-l-[#C9A36A]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C9A36A] uppercase mb-1">
            <ChefHat className="w-4 h-4" /> Fine Dining
          </div>
          <h3 className="text-lg font-serif font-bold text-[#18233F]">The Royal Palm Grand Room</h3>
          <p className="text-xs text-[#7B7D85] mt-1">Multi-course international degustation menus with sommelier wine pairing.</p>
          <span className="inline-block mt-3 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            Dinner: 19:00 - 23:30
          </span>
        </Card>

        <Card hoverEffect className="p-5 border-l-4 border-l-[#15966A]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#15966A] uppercase mb-1">
            <Flame className="w-4 h-4" /> Heritage Royal
          </div>
          <h3 className="text-lg font-serif font-bold text-[#18233F]">Saffron Court Indian Pavilion</h3>
          <p className="text-xs text-[#7B7D85] mt-1">Slow-cooked Awadhi dum preparations and clay oven tandoori delicacies.</p>
          <span className="inline-block mt-3 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            Lunch & Dinner
          </span>
        </Card>

        <Card hoverEffect className="p-5 border-l-4 border-l-[#2563EB]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase mb-1">
            <Sparkles className="w-4 h-4" /> Oceanside Deck
          </div>
          <h3 className="text-lg font-serif font-bold text-[#18233F]">Azure Infinity Pool Bar & Grill</h3>
          <p className="text-xs text-[#7B7D85] mt-1">Artisanal cocktails, fresh woodfired flatbreads, and grilled lobster tails.</p>
          <span className="inline-block mt-3 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            11:00 - Midnight
          </span>
        </Card>
      </div>

      {/* Menu Catalog Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-[#ECE8E1] flex justify-between items-center bg-white">
          <h3 className="text-base font-serif font-bold text-[#18233F]">
            Current In-House Culinary Menu
          </h3>
          <span className="text-xs text-[#A37E45] font-semibold">
            {restaurantMenuItems.length} Signature Offerings
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] text-[#7B7D85] uppercase tracking-wider text-[11px] font-semibold border-b border-[#ECE8E1]">
                <th className="py-3 px-6">Dish Name</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Dietary</th>
                <th className="py-3 px-6">Prep Time</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8E1]/80">
              {restaurantMenuItems.map(item => (
                <tr key={item.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-[#18233F] flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className="py-3.5 px-6 text-[#7B7D85]">{item.category}</td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                        item.veg ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {item.veg ? 'Vegetarian' : 'Non-Vegetarian'}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-[#7B7D85]">{item.prepTime}</td>
                  <td className="py-3.5 px-6 font-serif font-bold text-sm text-[#A37E45]">
                    ₹{item.price.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => navigate('/restaurant/pos')}
                      className="text-xs font-semibold text-[#C9A36A] hover:underline"
                    >
                      Order in POS →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default RestaurantMenu;
