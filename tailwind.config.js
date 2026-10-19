/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // Royal Ultramarine
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        surface: {
          50: '#FFFFFF',
          100: '#FAFAFC',
          200: '#F4F4F7',
          300: '#EDEDF2',
          400: '#E4E4E9',
          500: '#D4D4DC',
          600: '#71717A',
          700: '#52525B',
          800: '#27272A',
          900: '#18181B',
          950: '#0F172A',
        }
      },
      boxShadow: {
        'glass': '0 8px 30px -4px rgba(0, 0, 0, 0.04), 0 2px 8px -2px rgba(0, 0, 0, 0.02)',
        'glass-hover': '0 14px 40px -6px rgba(0, 0, 0, 0.06), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'pill': '0 2px 10px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-mascot': 'float-mascot 4s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-mascot': {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1deg)' },
        },
        'pulse-ring': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      }
    },
  },
  plugins: [],
}
