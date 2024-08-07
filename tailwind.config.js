/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      body: ["Inter", "sans-serif"],
      headers: ["Jomolhari", "serif"],
    },
    extend: {
      colors: {
        "bg-dark": "#DCDDD7",
        "bg-light": "#F0EEE2",
        "bg-lightest": "#FDFCF7",
        "text-color": "#101321",
        "btn-color": "#242632",
        "accent-color": "#E76064",
      },
    },
  },
  plugins: [],
};
