module.exports = {
  purge: [
    "./components/**/*.tsx",
    "./components/**/*.jsx",
    "./pages/**/*.tsx",
    "./pages/**/*.jsx"
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          "100": "#E6E6FF",
          "200": "#C4C6FF",
          "300": "#A2A5FC",
          "400": "#8888FC",
          "500": "#7069FA",
          "600": "#5D55FA",
          "700": "#4D3DF7",
          "800": "#3525E6",
          "900": "#1D0EBE",
          "1000": "#0C008C"
        }
      }
    }
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "focus-within"],
    boxShadow: ["responsive", "hover", "focus", "focus-within"]
  },
  plugins: []
};
