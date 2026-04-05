import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Freezer Lab",
  description: "자취생을 위한 냉동 밀프랩 가이드",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
