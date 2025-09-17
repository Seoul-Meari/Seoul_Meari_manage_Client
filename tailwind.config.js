/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-background': "url('@/assets/login_bg.jpeg')",
      }
    },
  },
  plugins: [],
}
