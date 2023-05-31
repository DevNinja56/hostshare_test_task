/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#329a9a",
        primaryDarker: "#1e6565",
        lightbg: "#F7F7F7",
      },
      backgroundImage: {
        header:
          "linear-gradient(180deg, #ffffff 0px, rgba(255, 255, 255, 0) 180px)",
      },
      fontFamily: {
        circular: ["Circular", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        "helvetica-neue": ["Helvetica Neue", "sans-serif"],
      },
      boxShadow: {
        custom: "rgba(0, 0, 0, 0.16) 0px 1px 4px 0px;",
        menu: "0 2px 16px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
