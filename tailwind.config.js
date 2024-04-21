/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        container: '600px',
      },
      fontFamily: {
        'merr': ["Merriweather" , "serif"],
      },
    },
  },
  plugins: [],
};
