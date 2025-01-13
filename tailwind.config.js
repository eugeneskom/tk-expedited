/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        michroma: ['Michroma', 'sans-serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out'
      },
      screens: {
        'xl': '900px',
      }
    },
  },
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  plugins: [],
  corePlugins: {
    float: false,
    clear: false,
    skew: false,
    scale: false,
    rotate: false,
    translate: false,
    backdropFilter: false,
    mixBlendMode: false,
    backgroundBlendMode: false,
    isolation: false,
  },
}

