import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../components/common/Button';
import hotelApi from '../services/hotelApi';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('rahul.gm@royalstay.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await hotelApi.getHealth();
      setLoading(false);
      navigate('/dashboard');
    } catch (requestError) {
      setLoading(false);
      setError(`Cannot connect to the hotel API: ${requestError.message}`);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#18233F] overflow-hidden">
      {/* Background with luxury hotel image & dark ambient veil */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/resort-hero.jpg"
          alt="Royal Stay Luxury Resort"
          className="w-full h-full object-cover opacity-30 filter blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18233F] via-[#18233F]/80 to-[#18233F]/60" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#ECE8E1] p-8 sm:p-10 animate-in zoom-in-95 duration-300">
        {/* Emblem & Branding */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#202123] border border-[#E5D0AB] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#C9A36A]/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C9A36A"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-7"
            >
              <path d="M12 2.5C12 2.5 8.5 7 8.5 11.5C8.5 13.5 10 15 12 15C14 15 15.5 13.5 15.5 11.5C15.5 7 12 2.5 12 2.5Z" fill="#C9A36A" fillOpacity="0.25" />
              <path d="M5 8.5C5 8.5 4 12 5.5 14C7 16 9.5 16 11 15" />
              <path d="M19 8.5C19 8.5 20 12 18.5 14C17 16 14.5 16 13 15" />
              <circle cx="12" cy="18" r="1.5" fill="#C9A36A" />
            </svg>
          </div>

          <h2 className="text-2xl font-serif font-bold text-[#18233F] tracking-wide">
            ROYAL STAY
          </h2>
          <p className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#C9A36A] mt-1">
            HOTEL MANAGEMENT SYSTEM
          </p>
          <p className="text-xs text-[#7B7D85] mt-2 font-sans">
            Enterprise Management Console • Staff Portal
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2">
            Prototype access only. This screen checks API availability; it does not authenticate users.
          </p>
          <div>
            <label className="block text-xs font-semibold text-[#18233F] mb-1.5">
              Official Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#7B7D85] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl text-[#18233F] focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A] outline-none"
              />
            </div>
          </div>

          {error && <p role="alert" className="text-xs text-rose-700">{error}</p>}

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-[#18233F]">
                Security Password
              </label>
              <a href="#forgot" className="text-[11px] text-[#A37E45] hover:underline">
                Forgot passkey?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#7B7D85] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl text-[#18233F] focus:ring-2 focus:ring-[#C9A36A]/30 focus:border-[#C9A36A] outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 shadow-md"
              disabled={loading}
              icon={ArrowRight}
            >
              {loading ? 'Authenticating Staff...' : 'Access Dashboard'}
            </Button>
          </div>
        </form>

        {/* Demo credentials hint */}
        <div className="mt-6 pt-5 border-t border-[#ECE8E1] text-center">
          <p className="text-[11px] text-[#7B7D85]">
            Demo user: <strong className="text-[#18233F]">Rahul Sharma</strong>
          </p>
          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 mt-1 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> API connection checked at sign-in
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
