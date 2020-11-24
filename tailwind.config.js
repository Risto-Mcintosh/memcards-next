module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      outline: ['focus-visible'],
      ringColor: ['focus-visible'],
      ringOpacity: ['focus-visible'],
      ringWidth: ['focus-visible']
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
