"use client";

import { useState } from "react";
import { useFreezerStorage } from "@/hooks/useFreezerStorage";
import { FreezerItemList } from "@/components/freezer/freezer-tracker";

export default function FreezerDrawer() {
  const [open, setOpen] = useState(false);
  const { totalCount, totalPacks, hasUrgent, mounted } = useFreezerStorage();

  return (
    <section>
      <p className="text-[11px] text-t-caption uppercase tracking-wider mb-2">
        My Freezer
      </p>

      <div
        className="rounded-2xl overflow-hidden transition-shadow duration-300"
        style={{
          background: "#F0F7FF",
          border: "1px solid #D0E8F5",
          boxShadow: open ? "0 4px 16px rgba(58,96,136,0.12)" : "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        {/* Header */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full text-left active:bg-[#E8F1FA] transition-colors"
          aria-expanded={open}
        >
          {/* 손잡이 바 */}
          <div className="flex justify-center pt-3 pb-1">
            <div
              style={{
                width: 40,
                height: 6,
                borderRadius: 999,
                background: "#A0C8E0",
              }}
            />
          </div>

          <div className="px-5 pb-4 pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-[17px] font-bold text-t">내 냉동실</h3>
              {mounted && hasUrgent && (
                <span className="relative inline-flex items-center justify-center">
                  <span
                    className="absolute inline-flex h-3 w-3 rounded-full opacity-75 animate-ping"
                    style={{ background: "#F44336" }}
                  />
                  <span
                    className="relative inline-flex w-2 h-2 rounded-full"
                    style={{ background: "#F44336" }}
                  />
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {mounted && totalCount > 0 && (
                <div className="flex items-center gap-1">
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "#FFFFFF", color: "#3B82C4" }}
                  >
                    {totalCount}개 · {totalPacks}팩
                  </span>
                </div>
              )}
              {mounted && totalCount === 0 && (
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "#FFFFFF", color: "#9CB3C7" }}
                >
                  비어있음
                </span>
              )}
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

        {/* Content */}
        <div
          style={{
            maxHeight: open ? "1200px" : "0px",
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
