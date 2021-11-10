module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        black: '#333',
        ink: '#252a41',
        'dark-gray': '#3b3f54',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
