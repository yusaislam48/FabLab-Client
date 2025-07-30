/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fab-blue': '#1e40af',
        'fab-orange': '#f97316',
        'fab-dark': '#1e293b',
        'fab-light': '#f8fafc',
      },
    },
  },
  plugins: [],
}