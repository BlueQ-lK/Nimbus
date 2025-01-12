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
      backgroundColor: {
        airQuality: "#93CC4B",
        forecastbox: "#65B963"
      }
    },
  },
  plugins: [],
}

