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
        main: {
          DEFAULT: "#3CC8A1",
          light: "#E8F8F2",
          dark: "#2BA888",
          50: "#F2FBF8",
        },
        sub: {
          DEFAULT: "#FF8FA3",
          light: "#FFF0F3",
        },
        point: "#FFD43B",
        bg: "#F7F8FA",
        surface: "#FFFFFF",
        t: {
          DEFAULT: "#191F28",
          sub: "#6B7684",
          caption: "#8B95A1",
          disabled: "#B0B8C1",
          inverse: "#FFFFFF",
        },
        line: {
          DEFAULT: "#F2F3F6",
          bold: "#E5E8EB",
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
        sm: "0 1px 2px rgba(0,0,0,0.04)",
        card: "0 2px 8px rgba(0,0,0,0.04)",
        float: "0 4px 16px rgba(0,0,0,0.08)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
