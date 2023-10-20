import he from './app/img/Home.svg'

const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      backgroundImage: {
        'home_bg_image' : "url('../app/img/Home.svg')",
      },
      colors: {
        Blue: '#2e56f3',
        darkBlue: '#184867',
        LightBlue: '#2e56f37a',
        Red: '#f32e2e',
        LightRed: '#f32e2e54',
        White: '#f8f9ff',
        SupLightBlue: '#f8f9ff',
        Gray: '#808080',
      }
    },
  },
  plugins: [],
}
