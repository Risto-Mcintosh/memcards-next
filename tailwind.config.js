module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        xxs: '15rem'
      }
    }
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
