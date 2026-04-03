import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Freezer Lab - 냉동 밀프랩",
  description:
    "가성비 있게, 건강하게. 자취생을 위한 냉동 밀프랩 가이드.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen bg-bg text-t">
        {children}
      </body>
    </html>
  );
}
