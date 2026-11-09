import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';

export const WelcomeBanner = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: Thursday, 24 Apr 2025 • 09:42 AM IST
      const datePart = now.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      const timePart = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setCurrentDateTime(`${datePart} • ${timePart}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#ECE8E1] shadow-luxury mb-8 bg-white">
      {/* Background Resort Image with Subtle Luxury Cream/Warm Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/resort-hero.jpg"
          alt="Luxury Resort Horizon"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 hover:scale-100"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1600';
          }}
        />
        {/* Soft Champagne & Ivory Overlay to guarantee pristine readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F2]/95 via-[#F8F6F2]/80 to-transparent sm:w-3/4 md:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F6F2] via-transparent to-transparent h-16 bottom-0" />
      </div>

      {/* Banner Content */}
      <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[190px]">
        <div className="max-w-2xl">
          {/* Greeting with waving hand */}
          <div className="flex items-center gap-2 mb-1.5">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F] tracking-tight">
              Good Morning, Rahul!
            </h2>
            <span className="text-2xl animate-bounce" role="img" aria-label="wave">
              👋
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#7B7D85] font-sans font-normal">
            Here's what's happening at your hotel today.
          </p>

          {/* Decorative Resort Headline */}
          <div className="mt-4 pt-3 border-t border-[#C9A36A]/20 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A36A] flex-shrink-0" />
            <p className="font-serif italic text-xs sm:text-sm text-[#A37E45] font-medium tracking-wide">
              "Exceptional Stays, Create Lasting Memories"
            </p>
          </div>
        </div>

        {/* Live Date and Time Display */}
        <div className="mt-5 flex items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#ECE8E1] shadow-sm text-xs font-medium text-[#18233F]">
            <Calendar className="w-3.5 h-3.5 text-[#C9A36A]" />
            <span className="font-sans font-semibold text-[#18233F]">
              {currentDateTime || 'Thursday, 24 Apr 2025 • 09:42 AM IST'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
