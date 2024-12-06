/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-secondary": "var(--background-secondary)",
        foreground: "var(--foreground)",
        "theme-primary": "var(--theme-primary)",
        "theme-primary-dull": "var(--theme-primary-dull)",
        "theme-border": "var(--theme-border)",
        "theme-text-dull": "var(--theme-text-dull)",
      },
    },
  },
  plugins: [],
};
