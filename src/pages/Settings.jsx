import React, { useEffect, useState } from 'react';
import { Save, Building2, Bell, Sparkles } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useHotel } from '../context/HotelContext';
import hotelApi from '../services/hotelApi';

export const Settings = () => {
  const { showToast } = useHotel();
  const [propertyConfig, setPropertyConfig] = useState({
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
  });

  useEffect(() => {
    hotelApi.getSettings()
      .then(setPropertyConfig)
      .catch(error => showToast(`Could not load saved settings: ${error.message}`, 'error'));
  }, [showToast]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await hotelApi.saveSettings(propertyConfig);
      showToast('Hotel settings saved to the database.', 'success');
    } catch (error) {
      showToast(`Settings could not be saved: ${error.message}`, 'error');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
            <span>Administration</span>
            <span>/</span>
            <span className="text-[#C9A36A] font-semibold">Settings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
            Property & System Configurations
          </h2>
          <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
            Configure hotel metadata, check-in policies, tax structures, and automated guest notifications
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleSave}
          icon={Save}
        >
          Save Changes
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Property Identity */}
        <Card>
          <h3 className="text-base font-serif font-bold text-[#18233F] mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#C9A36A]" /> Property Identity & Branding
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#18233F] mb-1.5">
                Hotel Trade Name
              </label>
              <input
                type="text"
                value={propertyConfig.hotelName}
                onChange={(e) => setPropertyConfig({ ...propertyConfig, hotelName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#18233F] mb-1.5">
                Hospitality Category / Star Rating
              </label>
              <input
                type="text"
                value={propertyConfig.starRating}
                onChange={(e) => setPropertyConfig({ ...propertyConfig, starRating: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#18233F] mb-1.5">
                Property Address
              </label>
              <input
                type="text"
                value={propertyConfig.address}
                onChange={(e) => setPropertyConfig({ ...propertyConfig, address: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl outline-none"
              />
            </div>
          </div>
        </Card>

        {/* 2. Operations & Standard Timings */}
        <Card>
          <h3 className="text-base font-serif font-bold text-[#18233F] mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A36A]" /> Front Desk & Check-in Policies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#18233F] mb-1.5">
                Standard Check-in Time
              </label>
              <input
                type="text"
                value={propertyConfig.checkInTime}
                onChange={(e) => setPropertyConfig({ ...propertyConfig, checkInTime: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#18233F] mb-1.5">
                Standard Check-out Time
              </label>
              <input
                type="text"
                value={propertyConfig.checkOutTime}
                onChange={(e) => setPropertyConfig({ ...propertyConfig, checkOutTime: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#18233F] mb-1.5">
                Default Currency
              </label>
              <select
                value={propertyConfig.currency}
                onChange={(e) => setPropertyConfig({ ...propertyConfig, currency: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl outline-none"
              >
                <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                <option value="USD ($)">USD ($) - US Dollar</option>
                <option value="EUR (€)">EUR (€) - Euro</option>
                <option value="GBP (£)">GBP (£) - British Pound</option>
              </select>
            </div>
          </div>
        </Card>

        {/* 3. Automation and Alerts */}
        <Card>
          <h3 className="text-base font-serif font-bold text-[#18233F] mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#C9A36A]" /> Notifications & Concierge Automation
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 rounded-xl border border-[#ECE8E1] bg-[#FAF8F5] cursor-pointer">
              <input
                type="checkbox"
                checked={propertyConfig.vipSmsNotifications}
                onChange={(e) => setPropertyConfig({ ...propertyConfig, vipSmsNotifications: e.target.checked })}
                className="w-4 h-4 text-[#C9A36A] rounded"
              />
              <div>
                <p className="text-xs font-bold text-[#18233F]">Automatic VIP Arrival SMS & Welcome Email</p>
                <p className="text-[11px] text-[#7B7D85]">Dispatch welcoming greetings with assigned room & digital key link 2 hours before arrival.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-[#ECE8E1] bg-[#FAF8F5] cursor-pointer">
              <input
                type="checkbox"
                checked={propertyConfig.autoKeycardIssuance}
                onChange={(e) => setPropertyConfig({ ...propertyConfig, autoKeycardIssuance: e.target.checked })}
                className="w-4 h-4 text-[#C9A36A] rounded"
              />
              <div>
                <p className="text-xs font-bold text-[#18233F]">Auto Housekeeping Turnover Dispatch</p>
                <p className="text-[11px] text-[#7B7D85]">Instantly flag rooms as 'Dirty' and notify floor attendants the moment check-out is registered.</p>
              </div>
            </label>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default Settings;
