import type { Metadata, Viewport } from "next";
import "./globals.css";
import ToastHost from "@/components/shared/toast-host";
import SplashScreen from "@/components/shared/splash-screen";
import LoadingBar from "@/components/shared/loading-bar";

export const metadata: Metadata = {
  title: "프리저랩 - 냉동 밀프랩",
  description: "자취생을 위한 냉동 밀프랩 가이드. 한 번 만들고 냉동실에 쌓아두면 평일은 전자레인지만.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "프리저랩",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#4A5D4A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
      </head>
      <body className="antialiased min-h-screen">
        <SplashScreen />
        <LoadingBar />
        {children}
        <ToastHost />
      </body>
    </html>
  );
}
