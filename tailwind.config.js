/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        chakra: ['"Chakra Petch"', 'serif'], 
      },
      backgroundImage: {
        airQuality: "linear-gradient(to top right, #33ccff 0%, #00ffcc 100%);",
      },
      backgroundColor: {
        forecastbox: "rgb(79, 203, 77)"
      }
    },
  },
  plugins: [
  ],
}

