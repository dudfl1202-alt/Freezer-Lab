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
        background: "var(--background)",
        foreground: "var(--foreground)",
        pink: {
          50: "#FFF0F6",
          100: "#FFE0EE",
          200: "#FFC2DD",
          300: "#FF94C4",
          400: "#FF6BAD",
          500: "#FF4D9B",
          600: "#E8368A",
        },
        lavender: {
          50: "#F5F0FF",
          100: "#EDE5FF",
          200: "#DDD0FF",
          300: "#C4ADFF",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
        },
        mint: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
        },
        peach: {
          50: "#FFF8F0",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
        },
        sky: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
        },
        cream: {
          50: "#FFFCF9",
          100: "#FFF8F0",
          200: "#FFF0E0",
        },
        txt: {
          primary: "#3D3044",
          secondary: "#7D6B8A",
          muted: "#B8A9C4",
          light: "#D4C8DE",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Helvetica Neue",
          "Apple SD Gothic Neo",
          "sans-serif",
        ],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        cute: "0 2px 12px rgba(139, 92, 246, 0.08)",
        "cute-lg": "0 4px 20px rgba(139, 92, 246, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
