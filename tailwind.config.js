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
      gray: {
        100: '#F3F5F4',
        200: '#E8EBEB',
        300: '#C1C5C5',
        400: '#898C8C',
        500: '#3E4040',
        600: '#2D3637',
        700: '#1F2B2E',
        800: '#132025',
        900: '#0B181E'
      },
      brand: {
        100: '#CEFAEF',
        200: '#9EF6E7',
        300: '#6AE4DA',
        400: '#43C9C9',
        500: '#139AA6',
        600: '#0D798E',
        700: '#095C77',
        800: '#064260',
        900: '#03304F'
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
      ringColor: ['hover'],
      ringOpacity: ['hover'],
      ringWidth: ['hover'],
      borderWidth: ['last']
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
