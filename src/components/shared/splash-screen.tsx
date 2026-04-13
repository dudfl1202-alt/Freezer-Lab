"use client";

import { useEffect, useState } from "react";

/**
 * 스플래시 화면 - 앱 첫 진입 시 표시
 * 1.5초 후 자동으로 사라짐
 */
export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // 이미 본 세션이면 스킵
    if (sessionStorage.getItem("splash-shown")) {
      setVisible(false);
      return;
    }

    const fadeTimer = setTimeout(() => setFading(true), 1200);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("splash-shown", "1");
    }, 1600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-400"
      style={{
        background: "#4A5D4A",
        opacity: fading ? 0 : 1,
      }}
    >
      {/* 로고 */}
      <div className="mb-4">
        <span
          className="text-[48px] font-bold italic"
          style={{ fontFamily: "Georgia, 'Noto Serif KR', serif", color: "#FFFFFF" }}
        >
          F
        </span>
      </div>
      <h1
        className="text-[22px] font-bold tracking-tight"
        style={{ fontFamily: "Georgia, 'Noto Serif KR', serif", color: "#FFFFFF" }}
      >
        프리저랩
      </h1>
      <p className="text-[13px] mt-2" style={{ color: "rgba(255,255,255,0.6)" }}>
        냉동 밀프랩 가이드
      </p>

      {/* 로딩 인디케이터 */}
      <div className="mt-10">
        <div
          className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "transparent" }}
        />
      </div>
    </div>
  );
}
