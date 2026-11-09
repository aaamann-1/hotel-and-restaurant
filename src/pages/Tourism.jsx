import React from 'react';
import { Compass, Star, Sparkles, Check } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

export const Tourism = () => {
  const navigate = useNavigate();
  const { tourismPackages, createTourismBooking } = useHotel();

  const bookPackage = async (pkg) => {
    const guest = window.prompt(`Guest name for ${pkg.title}`);
    if (!guest?.trim()) return;
    const participantsInput = window.prompt('Number of participants', '1');
    if (participantsInput === null) return;
    const participants = Number(participantsInput);
    if (!Number.isInteger(participants) || participants < 1) {
      window.alert('Enter a whole number of participants greater than zero.');
      return;
    }
    await createTourismBooking({
      guest: guest.trim(),
      package: pkg.title,
      participants,
      amount: pkg.price * participants,
      status: 'Confirmed',
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
            <span>Tourism & Concierge</span>
            <span>/</span>
            <span className="text-[#C9A36A] font-semibold">Luxury Excursions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
            Curated Resort Tours & Private Charters
          </h2>
          <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
            Bespoke VIP experiences, yacht charters, heritage aircraft tours, and cultural masterclasses
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/tourism/bookings')}
          icon={Compass}
        >
          View Tour Bookings
        </Button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tourismPackages.map(pkg => (
          <Card key={pkg.id} hoverEffect className="p-0 overflow-hidden flex flex-col justify-between">
            {/* Image */}
            <div className="relative h-56 overflow-hidden group">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#A37E45] shadow-sm border border-[#E5D0AB]">
                ₹{pkg.price.toLocaleString('en-IN')} / person
              </div>
              <div className="absolute top-3 left-3 bg-[#18233F]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-white font-semibold flex items-center gap-1">
                <Star className="w-3 h-3 text-[#C9A36A] fill-[#C9A36A]" />
                {pkg.rating} ({pkg.reviews} reviews)
              </div>
            </div>

            {/* Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A36A]">
                  {pkg.category} • {pkg.duration}
                </span>
                <h3 className="text-lg font-serif font-bold text-[#18233F] mt-1 mb-3">
                  {pkg.title}
                </h3>

                {/* Inclusions */}
                <div className="space-y-1.5 mb-5">
                  {pkg.includes.map(inc => (
                    <div key={inc} className="flex items-center gap-2 text-xs text-[#7B7D85]">
                      <Check className="w-3.5 h-3.5 text-[#15966A] flex-shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#ECE8E1] flex items-center justify-between">
                <span className="text-xs text-[#7B7D85]">VIP Chauffeur Included</span>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => bookPackage(pkg)}
                  icon={Sparkles}
                >
                  Book Excursion
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tourism;
