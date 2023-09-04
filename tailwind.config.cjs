/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    fontSize: {
      sm: ["16px"],
      base: ["18px", "1.5rem"],
      lg: ["24px"],
      xl: ["32px"],
      "2xl": ["42px"],
      "3xl": ["57px"],
      "4xl": ["76px"],
    },
  },
  plugins: [],
};
