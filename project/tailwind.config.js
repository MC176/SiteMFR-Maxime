/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D1B69',
          light: '#4527A0',
        },
        secondary: {
          DEFAULT: '#9C27B0',
          light: '#E1BEE7',
        },
        accent: {
          DEFAULT: '#7B1FA2',
          dark: '#6A1B9A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'phone': '0 50px 100px -20px rgba(45, 27, 105, 0.25)',
      }
    },
  },
  plugins: [],
}