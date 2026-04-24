/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Primary - Emerald Green Scale
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',  // Main brand green
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        // Brand Secondary - Amber/Gold Scale
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',  // Main brand gold
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Semantic Colors
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        info: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        // Health Condition Colors
        health: {
          diabetes: '#3b82f6',      // Blue
          hypertension: '#ef4444',  // Red
          maternal: '#ec4899',      // Pink
          weight: '#f59e0b',        // Amber
          sickle: '#8b5cf6',        // Purple
          wellness: '#10b981',      // Green
        },
        // Neutral Grays
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Legacy color mappings (for backwards compatibility)
        'dwm-green-deep': '#047857',    // primary-700
        'dwm-green-mid': '#059669',     // primary-600
        'dwm-green-light': '#10b981',   // primary-500
        'dwm-green-pale': '#d1fae5',    // primary-100
        'dwm-gold': '#f59e0b',          // secondary-500
        'dwm-gold-light': '#fbbf24',    // secondary-400
        'dwm-gold-pale': '#fef3c7',     // secondary-100
        'dwm-white': '#ffffff',
        'dwm-off-white': '#fafafa',     // neutral-50
        'dwm-text-dark': '#171717',     // neutral-900
        'dwm-text-mid': '#525252',      // neutral-600
        'dwm-text-light': '#a3a3a3',    // neutral-400
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'dwm-sm': '0 2px 12px rgba(13,59,43,0.08)',
        'dwm-md': '0 8px 32px rgba(13,59,43,0.14)',
        'dwm-lg': '0 20px 60px rgba(13,59,43,0.18)',
      },
      borderRadius: {
        'dwm-sm': '8px',
        'dwm-md': '16px',
        'dwm-lg': '24px',
      },
      transitionTimingFunction: {
        'dwm': 'cubic-bezier(0.4,0,0.2,1)',
      },
      transitionDuration: {
        'dwm': '300ms',
      },
    },
  },
  plugins: [],
}
