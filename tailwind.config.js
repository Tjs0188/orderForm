/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./views/**/*.{html,js,pug}", "node_modules/preline/dist/*.js"],
  darkMode: "class",
  safelist: ["border-rose-500", "text-rose-500", "bg-rose-500"],
  theme: {
    extend: {
      fontFamily: {
        playfairDisplay: [
          '"Playfair Display"',
          ...defaultTheme.fontFamily.sans,
        ],
        sourcePro: ["Source Code Pro", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blue: {
          DEFAULT: "#274579",
          50: "#f1f7fd",
          100: "#dfeefa",
          200: "#c5e1f8",
          300: "#9ecff2",
          400: "#70b4ea",
          500: "#4e97e3",
          600: "#397cd7",
          700: "#3067c5",
          800: "#2d54a0",
          900: "#274579",
          950: "#1d2d4e",
        },
        green: {
          DEFAULT: "#75aa5c",
          50: "#f1f7ee",
          100: "#e1edda",
          200: "#c6deb8",
          300: "#a2c88e",
          400: "#75aa5c",
          500: "#63964c",
          600: "#4b763a",
          700: "#3c5b30",
          800: "#324a2a",
          900: "#2d4027",
          950: "#152211",
        },
        gray: {
          DEFAULT: "#6e7167",
          50: "#333934",
          100: "#414740",
          200: "#4F554D",
          300: "#5E635A",
          400: "#6e7167",
          500: "#83847B",
          600: "#97978F",
          700: "#AAA8A4",
          800: "#BDBBB8",
          900: "#D0CECC",
          950: "#E3E1E0",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
