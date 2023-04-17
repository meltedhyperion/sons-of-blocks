/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      body: ["DM Sans", "sans-serif"],
    },
  },
  plugins: [require("tailwindcss-animate")],
};
