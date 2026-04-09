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
        bg: "#FAF9F6",
        surface: "#FFFFFF",
        olive: {
          DEFAULT: "#4A5D4A",
          light: "#EEF2EC",
          dark: "#3A4A3A",
          muted: "#8A9E8A",
        },
        sand: {
          DEFAULT: "#C4A97D",
          light: "#F5F0E8",
        },
        t: {
          DEFAULT: "#1C2118",
          sub: "#6B6B60",
          caption: "#9C9C90",
          disabled: "#C8C8C0",
        },
        line: {
          DEFAULT: "#EEEEE8",
          bold: "#E0E0D8",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        serif: ["Georgia", "'Noto Serif KR'", "serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0,0,0,0.03)",
        card: "0 2px 12px rgba(0,0,0,0.04)",
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
