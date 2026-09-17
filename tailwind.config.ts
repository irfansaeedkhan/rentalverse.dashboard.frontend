import { error } from "console";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // From Small to big
      xs: "375px",
      tablet: "1000px",
      xxl: "1440px",
      maxmobile: { max: "767px" },
      ...defaultTheme.screens,
    },
    extend: {
      fontSize: {
        xxs: "10px",
      },
      boxShadow: {
        1: "0px 2px 20px 0px rgba(0, 0, 0, 0.02)",
        2: "0px 4px 12px 0px rgba(0, 0, 0, 0.02)",
        3: "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
      },
      fontFamily: {
        // kanit: ["kanit", "sans-serif"],
        nexa1: ["nexa", "sans-serif"],
        kanit: ["var(--font-kanit)"],
        nexa: ["var(--font-nexa-regular)"],
        nexathin: ["var(--font-nexa-light)"],
        nexablack: ["var(--font-nexa-black)"],
        inter: ["var(--font-inter)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-theme": "linear-gradient(90deg, #05121E 0%, #0E1F30 100%)",
        "gradient-theme-2": "linear-gradient(90deg, #00FF94 0%, #00A3FF 100%)",
        "gradient-pattern": "linear-gradient(90deg, #00FF94 0%, #00A3FF 100%)",
      },
      colors: {
        "black-shade": {
          1: "#141414",
          2: "#111114",
          3: "#0E0D0F",
          4: "#101828",
          5: "#1A1A1A",
        },
        "gray-shade": {
          1: "#808080",
          2: "#8C8C8F",
          3: "#5F5E66",
          4: "#EAECF0",
          5: "#969699",
        },
        "blue-shade": {
          1: "#00020A",
          2: "#EEFF9B",
          3: "#839F00",
          4: "#FFBE18",
        },
        "green-shade": {
          1: "#51AE26",
          2: "#BAFF9B",
          3: "#51AE26",
          4: "#FFBE18",
        },
        "white-shade": {
          1: "#F7F7F7",
          2: "#FBFBFB",
        },
        "red-shade": {
          1: "#E34B4B",
          2: "#FF5454",
          3: "#FFD4D4",
          4: "#FF4768",
        },
        primary: "#05121E",
        "primary-dark": "#050E18",
        "primary-light": "#0E1F30",
        orange: "#FFCC65",
        "blue-light": "#0E1F30",
        "blue-dark": "#05121E",
        blue: "#050e18",
        green: "#00FF94",
        yellow: "#FFBC39",
        gray: "#666",
      },
    },
  },
  plugins: [],
};
export default config;
