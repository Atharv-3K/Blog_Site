/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src//*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '30vh':'30vh',
        '10vh':'10vh',
        '50vh': '50vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '90vh': '90vh'
      },
    },
  },
  plugins: [],
}