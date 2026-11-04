/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#F6F0E1', light: '#FBF7EC', dark: '#EADFC6', deep: '#DDCDA8' },
        ink: { DEFAULT: '#1F1B16', soft: '#3A342C', muted: '#6B6255' },
        cobalt: { DEFAULT: '#2F4B8C', dark: '#223A70', light: '#4A67A8' },
        terracotta: { DEFAULT: '#C8623F', dark: '#A84D2F', light: '#DB8566' },
        fern: { DEFAULT: '#3E8A6E', dark: '#2E6B55', light: '#5FA88B' },
        mustard: { DEFAULT: '#D6A630', dark: '#B88A1F', light: '#E6C266' },
        danger: '#B3261E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'Arial Narrow', 'sans-serif'],
      },
      boxShadow: {
        sketch: '2px 2px 0 0 #1F1B16',
        'sketch-sm': '1px 1px 0 0 #1F1B16',
      },
      borderWidth: { 3: '3px' },
    },
  },
  plugins: [],
};
