"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

/**
 * 페이지 전환 시 상단 프로그레스 바
 *
 * Next.js App Router는 route 이벤트가 없어서,
 * 내부 링크 클릭을 감지하여 프로그레스 바를 표시합니다.
 */
export default function LoadingBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // 내부 링크 클릭 감지 → 로딩 시작
  const handleClick = useCallback(
    (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // 외부 링크, 해시 링크, 현재 페이지 클릭은 무시
      if (href.startsWith("http") || href.startsWith("#") || href === pathname) return;

      // 로딩 시작
      setLoading(true);
      setProgress(20);
    },
    [pathname]
  );

  // 클릭 이벤트 리스너
  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [handleClick]);

  // pathname 변경 = 네비게이션 완료 → 프로그레스 100% → 숨김
  useEffect(() => {
    if (!loading) return;
    setProgress(100);
    const timer = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // 로딩 중 프로그레스 점진 증가 (네비게이션이 느릴 때 대비)
  useEffect(() => {
    if (!loading || progress >= 90) return;
    const timer = setTimeout(() => {
      setProgress((p) => Math.min(p + 10, 90));
    }, 300);
    return () => clearTimeout(timer);
  }, [loading, progress]);

  if (!loading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2.5px]" style={{ background: "rgba(74,93,74,0.1)" }}>
      <div
        className="h-full rounded-r-full"
        style={{
          width: `${progress}%`,
          background: "#4A5D4A",
          transition: progress === 100 ? "width 200ms ease-out" : "width 400ms ease-out",
        }}
      />
    </div>
  );
}
