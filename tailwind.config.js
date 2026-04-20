// === FILE: tailwind.config.js ===
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base':      '#F9FAFB',
        'bg-surface':   '#FFFFFF',
        'bg-section':   '#F1F5F9',
        accent:         '#FF4D00',
        'accent-hover': '#E03D00',
        'accent-light': '#FFF0EB',
        'accent-2':     '#FFB800',
        'text-primary': '#1A1A2E',
        'text-secondary':'#64748B',
        'text-light':   '#94A3B8',
        border:         '#E2E8F0',
        success:        '#22C55E',
        danger:         '#EF4444',
        pending:        '#F59E0B',
        'sidebar-bg':   '#1A1A2E',
        'sidebar-text': '#CBD5E1',
        'sidebar-active':'#FF4D00',
      },
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'sans-serif'],
        inter:  ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card:       '0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.05)',
        'card-hover':'0 10px 25px -5px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        sidebar:    '4px 0 24px rgba(0,0,0,0.15)',
      },
      backgroundImage: {
        'hero-grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      animation: {
        'count-up': 'countUp 1s ease-out forwards',
        'fade-in':  'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        countUp:  { from: { opacity: 0 }, to: { opacity: 1 } },
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp:  { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
