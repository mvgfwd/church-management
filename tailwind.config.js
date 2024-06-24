/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      circular: ["Circular", "sans-serif"],
      nunito: ["Nunito", "sans-serif"],
      jakarta: ["Jakarta", "sans-serif"]
    },
    extend: {
      colors: {
        "cm-blue": {
          50: "#D7E1FE",
          100: "#AFC4FE",
          200: "#648CFC",
          300: "#1351FB",
          400: "#0335BE",
          500: "#021F6F",
          600: "#02195A",
          700: "#011241",
          800: "#010D2D",
          900: "#000614",
          950: "#00030A",
        },
        "cm-brown": {
          50: "#FFE3D6",
          100: "#FFCBB3",
          200: "#FF9666",
          300: "#FF621A",
          400: "#CC4100",
          500: "#7F2800",
          600: "#662000",
          700: "#4D1800",
          800: "#331000",
          900: "#190800",
          950: "#0A0300",
        },
        "cm-green": {
          50: "#D6FFF3",
          100: "#ADFFE8",
          200: "#57FFCF",
          300: "#05FFB8",
          400: "#00AD7C",
          500: "#005940",
          600: "#004733",
          700: "#003828",
          800: "#00241A",
          900: "#00140F",
          950: "#000A07",
        },
      },
    },
  },
  plugins: [],
};
