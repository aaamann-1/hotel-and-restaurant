/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: '#202123',
          hover: '#2c2d30',
          active: '#C9A36A',
          border: 'rgba(255, 255, 255, 0.08)',
          text: '#C8CCD0',
          textMuted: '#8E9297',
        },
        luxury: {
          bg: '#F8F6F2',
          card: '#FFFFFF',
          border: '#ECE8E1',
          gold: '#C9A36A',
          goldLight: '#E5D0AB',
          goldDark: '#A37E45',
          goldBg: '#FAF5EC',
          goldAccent: '#DFBE82',
          navy: '#18233F',
          navyDark: '#0F172A',
          gray: '#7B7D85',
          grayLight: '#F3EFEA',
          success: '#15966A',
          successLight: '#E8F6F0',
          warning: '#D97706',
          warningLight: '#FEF3C7',
          danger: '#DC2626',
          dangerLight: '#FEE2E2',
          info: '#2563EB',
          infoLight: '#EFF6FF',
          purple: '#7C3AED',
          purpleLight: '#F3E8FF',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['Cinzel', '"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'luxury-sm': '0 1px 3px rgba(24, 35, 63, 0.04), 0 1px 2px rgba(24, 35, 63, 0.02)',
        'luxury': '0 4px 20px -2px rgba(24, 35, 63, 0.05), 0 2px 6px -1px rgba(24, 35, 63, 0.02)',
        'luxury-lg': '0 10px 30px -4px rgba(24, 35, 63, 0.08), 0 4px 12px -2px rgba(24, 35, 63, 0.03)',
        'gold-glow': '0 0 20px rgba(201, 163, 106, 0.25)',
      },
      borderRadius: {
        'luxury': '14px',
        'luxury-lg': '18px',
      }
    },
  },
  plugins: [],
}
