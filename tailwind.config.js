/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rajmudra: {
          orange: '#FF6000',
          'orange-hover': '#E05500',
          'orange-light': '#FFF0E6',
          'orange-subtle': '#FFE4D1',
          black: '#0A0A0A',
          charcoal: '#242424',
          'charcoal-light': '#2F2F2F',
          'charcoal-dark': '#171717',
          'off-white': '#F7F7F7',
          'border-gray': '#3A3A3A',
          'border-light': '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        marathi: ['Noto Sans Devanagari', 'Yatra One', 'serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 20px -3px rgba(255, 96, 0, 0.35)',
        'glow-orange-lg': '0 0 35px -5px rgba(255, 96, 0, 0.45)',
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'premium-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'hero-pattern': "radial-gradient(circle at top center, rgba(255, 96, 0, 0.15), transparent 70%)",
        'subtle-grid': "radial-gradient(rgba(255, 96, 0, 0.08) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
