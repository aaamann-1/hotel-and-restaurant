import React from 'react';
import { Sparkles, Maximize2, Bed, ArrowRight } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

export const RoomTypes = () => {
  const navigate = useNavigate();
  const { roomTypes } = useHotel();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
            <span>Rooms</span>
            <span>/</span>
            <span className="text-[#C9A36A] font-semibold">Room Types</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
            Luxury Room Categories & Suites
          </h2>
          <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
            Curated collection of residential suites, ocean lofts, and royal penthouses
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/front-office/new-booking')}
          icon={Sparkles}
        >
          Book a Suite
        </Button>
      </div>

      {/* Room Categories Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomTypes.map((cat) => (
          <Card key={cat.id} hoverEffect className="p-0 overflow-hidden flex flex-col justify-between">
            {/* Image */}
            <div className="relative h-48 overflow-hidden group">
              <img
                src={cat.image || '/images/luxury-suite.jpg'}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#A37E45] shadow-sm border border-[#E5D0AB]">
                ₹{cat.basePrice.toLocaleString('en-IN')} / nt
              </div>
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[11px] text-white font-medium">
                {cat.view || 'Hotel room inventory'}
              </div>
            </div>

            {/* Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-serif font-bold text-[#18233F]">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-[#7B7D85] font-semibold bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#ECE8E1]">
                    {cat.totalCount} Units
                  </span>
                </div>

                <p className="text-xs text-[#7B7D85] mb-4 leading-relaxed font-sans line-clamp-2">
                  {cat.description || `Room inventory for ${cat.name}. Availability is calculated from the current room records.`}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 text-xs text-[#18233F] py-2 border-y border-[#ECE8E1] mb-4 bg-[#FAF8F5]/60 px-2 rounded-lg">
                  <span className="flex items-center gap-1.5 text-[#7B7D85]">
                    <Maximize2 className="w-3.5 h-3.5 text-[#C9A36A]" /> {cat.size || 'See room details'}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#7B7D85]">
                    <Bed className="w-3.5 h-3.5 text-[#C9A36A]" /> {cat.bedType || 'See room details'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-emerald-700 font-semibold">
                  {cat.totalCount - cat.occupiedCount} rooms not occupied
                </span>
                <button
                  onClick={() => navigate('/front-office/new-booking')}
                  className="text-xs font-bold text-[#C9A36A] hover:text-[#B89258] flex items-center gap-1"
                >
                  Reserve <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoomTypes;
