/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#c8421a',
          hover:   '#a83515',
          light:   '#fef0eb',
        },
        accent: {
          DEFAULT: '#d4a853',
          hover:   '#b8923e',
        },
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
  darkMode: ['selector', '[data-theme="dark"]'],
};
