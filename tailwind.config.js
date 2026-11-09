/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F0E9',
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#EFE7E1',
        },
        primary: {
          DEFAULT: '#421D2A',
          hover: '#552736',
        },
        secondary: {
          DEFAULT: '#A65D70',
        },
        accent: {
          soft: '#D9B9B4',
        },
        text: {
          primary: '#292426',
          secondary: '#72545A',
        },
        border: {
          DEFAULT: '#E8DED7',
        },
        semantic: {
          success: '#367A59',
          warning: '#A36A36',
          error: '#A44444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(66, 29, 42, 0.04)',
        'elevated': '0 10px 30px rgba(66, 29, 42, 0.06)',
        'modal': '0 20px 40px rgba(41, 36, 38, 0.12)',
      },
    },
  },
  plugins: [],
}
