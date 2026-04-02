import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Freezer Lab - 1인 가구 냉동 밀프랩",
  description:
    "가성비 있게, 건강하게. 자취생을 위한 냉동 밀프랩 가이드. 냉장고 털기, 스마트 장보기, 주간 밀프랩까지.",
  keywords: ["밀프랩", "자취", "냉동보관", "1인가구", "가성비", "레시피"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen bg-warm-50 text-warm-800">
        {children}
      </body>
    </html>
  );
}
