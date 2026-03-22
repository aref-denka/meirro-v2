/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent:      '#7C5CFC',
        'accent-soft': '#A78BFA',
        'accent-glow': 'rgba(124,92,252,0.25)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'mesh-purple':
          'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(124,92,252,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(196,75,247,0.12) 0%, transparent 60%)',
        'mesh-screen':
          'radial-gradient(ellipse 80% 60% at 30% 60%, #7C5CFC 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 70% 40%, #C44BF7 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 50% 10%, #3B82F6 0%, transparent 50%)',
      },
      keyframes: {
        shimmer: {
          '0%':   { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '0.9' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer:     'shimmer 3.5s ease-in-out infinite',
        'pulse-glow':'pulse-glow 4s ease-in-out infinite',
        'fade-up':   'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
      },
    },
  },
  plugins: [],
};
