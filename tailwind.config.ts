import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAFA",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#7C5CFC",
          light: "#EDE8FF",
          dark: "#5B3FD9",
        },
        accent: {
          DEFAULT: "#FF6B9D",
          light: "#FFF0F5",
        },
        success: {
          DEFAULT: "#34D399",
          light: "#ECFDF5",
        },
        info: {
          DEFAULT: "#38BDF8",
          light: "#F0F9FF",
        },
        t: {
          DEFAULT: "#1A1A2E",
          sub: "#64648C",
          hint: "#A0A0C0",
          disabled: "#CDCDE0",
        },
        border: {
          DEFAULT: "#EDEDF5",
          hover: "#D5D5E8",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
        "card-hover": "0 4px 12px rgba(124,92,252,0.08)",
        float: "0 8px 24px rgba(0,0,0,0.06)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
