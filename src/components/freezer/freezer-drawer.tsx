"use client";

import { useState } from "react";
import { useFreezerStorage } from "@/hooks/useFreezerStorage";
import { FreezerItemList } from "@/components/freezer/freezer-tracker";

export default function FreezerDrawer() {
  const [open, setOpen] = useState(false);
  const { totalCount, hasUrgent, mounted } = useFreezerStorage();

  return (
    <section>
      <p className="text-[11px] text-t-caption uppercase tracking-wider mb-2">
        My Freezer
      </p>

      <div
        className="rounded-2xl overflow-hidden transition-shadow"
        style={{
          background: "#F0F7FF",
          border: "1px solid #D0E8F5",
          boxShadow: open ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
        }}
      >
        {/* Header */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full text-left"
          aria-expanded={open}
        >
          {/* 손잡이 바 */}
          <div className="flex justify-center pt-3 pb-1.5">
            <div
              style={{
                width: 40,
                height: 6,
                borderRadius: 999,
                background: "#A0C8E0",
              }}
            />
          </div>

          <div className="px-5 pb-4 pt-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-[16px] font-bold text-t">내 냉동실</h3>
              {mounted && hasUrgent && (
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: "#F44336" }}
                  aria-label="주의 필요한 항목 있음"
                />
              )}
            </div>
            <div className="flex items-center gap-2">
              {mounted && (
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: "#FFFFFF", color: "#3B82C4" }}
                >
                  {totalCount}개 보관 중
                </span>
              )}
              {/* 화살표 */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                style={{
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 300ms cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <path
                  d="M3 5l4 4 4-4"
                  stroke="#3B82C4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </button>

        {/* Content - 애니메이션 영역 */}
        <div
          style={{
            maxHeight: open ? "600px" : "0px",
            overflow: "hidden",
            transition: open
              ? "max-height 400ms cubic-bezier(0.4,0,0.2,1)"
              : "max-height 300ms cubic-bezier(0.4,0,0.2,1)",
            background: "#F8FBFF",
          }}
        >
          <div
            style={{
              padding: 16,
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-6px)",
              transition: open
                ? "opacity 200ms ease 100ms, transform 200ms ease 100ms"
                : "opacity 100ms ease, transform 100ms ease",
              borderTop: "1px solid #E0EEF7",
            }}
          >
            <FreezerItemList />
          </div>
        </div>
      </div>
    </section>
  );
}
