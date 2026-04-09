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
        bg: "#FAFAF8",
        surface: "#FFFFFF",
        main: {
          DEFAULT: "#3D7A5F",
          light: "#F0F7F4",
          dark: "#2D5C47",
          muted: "#A8CCBA",
        },
        sub: {
          DEFAULT: "#E8A87C",
          light: "#FFF5EE",
        },
        t: {
          DEFAULT: "#1A1A1A",
          sub: "#888888",
          caption: "#AAAAAA",
          disabled: "#CCCCCC",
        },
        line: {
          DEFAULT: "#F0EDEA",
          bold: "#E5E0DB",
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
      letterSpacing: {
        tight: "-0.02em",
      },
      boxShadow: {
        sm: "0 1px 4px rgba(0,0,0,0.04)",
        card: "0 2px 12px rgba(0,0,0,0.05)",
        float: "0 4px 20px rgba(0,0,0,0.08)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
