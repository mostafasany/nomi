import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // brand palette — sampled from the Nömi's logo
        cream:    "#F2E8D5", // logo wordmark cream
        caramel:  "#C99565", // logo background tan
        cinnamon: "#7A3E20",
        glaze:    "#FAF1DE",
        cocoa:    "#3B1F12",
        accent:   "#FF4F87",
        teal:     "#0E5C5C",
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        steam: {
          "0%":   { transform: "translateY(0) scale(1)",    opacity: "0.6" },
          "100%": { transform: "translateY(-40px) scale(1.6)", opacity: "0" },
        },
        unroll: {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        drip: {
          "0%":   { transform: "translateY(-4px)", opacity: "0" },
          "50%":  { opacity: "1" },
          "100%": { transform: "translateY(8px)", opacity: "0" },
        },
      },
      animation: {
        steam:  "steam 2.6s ease-out infinite",
        unroll: "unroll 16s linear infinite",
        drip:   "drip 2s ease-in infinite",
      },
    },
  },
  plugins: [],
};

export default config;
