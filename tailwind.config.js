// tailwind.config.js
module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
  variants: {
    padding: ['responsive', 'first'],
    margin: ['responsive', 'first'],
  },
};
