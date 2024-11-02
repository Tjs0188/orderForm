/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,pug}"],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [],
};
