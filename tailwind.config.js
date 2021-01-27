const colors = require('tailwindcss/colors');
module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        xxs: '15rem'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      brand: {
        100: '#ECD9FC',
        200: '#D7B4F9',
        300: '#B98AEC',
        400: '#9A69DB',
        500: '#713CC3',
        600: '#572BA7',
        700: '#401E8C',
        800: '#2C1371',
        900: '#1E0B5D'
      },
      info: {
        100: '#CEEBFD',
        200: '#9ED3FB',
        300: '#6DB4F4',
        400: '#4896EA',
        500: '#116ADD',
        600: '#0C52BE',
        700: '#083C9F',
        800: '#052A80',
        900: '#031D6A'
      },
      warning: {
        100: '#FEF5CB',
        200: '#FDE898',
        300: '#FAD664',
        400: '#F5C33D',
        500: '#EFA700',
        600: '#CD8900',
        700: '#AC6D00',
        800: '#8A5300',
        900: '#724100'
      },
      danger: {
        100: '#FDE3D1',
        200: '#FCC0A4',
        300: '#F79475',
        400: '#EF6A52',
        500: '#E52B1D',
        600: '#C41517',
        700: '#A40E1C',
        800: '#84091F',
        900: '#6D0520'
      },
      success: {
        100: '#EEFBD2',
        200: '#D9F8A7',
        300: '#B9EC79',
        400: '#98D954',
        500: '#6BC124',
        600: '#51A51A',
        700: '#3B8A12',
        800: '#286F0B',
        900: '#1B5C06'
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
