/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // ← must match where your files actually live
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}