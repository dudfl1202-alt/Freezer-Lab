"use client";

import { useState } from "react";
import {
  useFreezerStorage,
  daysSince,
  daysRemaining,
  getFreshnessStatus,
  getStatusInfo,
} from "@/hooks/useFreezerStorage";

interface FreezerTrackerButtonProps {
  recipeId: string;
  recipeName: string;
}

export function FreezerTrackerButton({
  recipeId,
  recipeName,
}: FreezerTrackerButtonProps) {
  const [open, setOpen] = useState(false);
  const [packs, setPacks] = useState(1);
  const [saved, setSaved] = useState(false);
  const { addItem } = useFreezerStorage();

  const handleSave = () => {
    addItem(recipeId, recipeName, packs);
    setSaved(true);
    setTimeout(() => {
      setOpen(false);
      setSaved(false);
      setPacks(1);
    }, 1200);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full py-3 rounded-xl text-[14px] font-semibold transition-transform active:scale-[0.98]"
        style={{ background: "#F0F7FF", color: "#3B82C4", border: "1px solid #D0E8F5" }}
      >
        냉동 보관 시작
      </button>
    );
  }

  return (
    <div
      className="rounded-xl p-4 border"
      style={{ background: "#F0F7FF", borderColor: "#D0E8F5" }}
    >
      {saved ? (
        <p className="text-[13px] text-center py-2" style={{ color: "#3B82C4" }}>
          냉동실에 저장되었어요
        </p>
      ) : (
        <>
          <p className="text-[13px] font-semibold text-t mb-3">
            몇 팩으로 소분하셨나요?
          </p>
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={() => setPacks((p) => Math.max(1, p - 1))}
              className="w-9 h-9 rounded-full bg-white border border-line-bold text-t font-bold active:scale-95 transition-transform"
            >
              -
            </button>
            <span className="text-[22px] font-bold text-t w-12 text-center">
              {packs}
            </span>
            <button
              onClick={() => setPacks((p) => Math.min(20, p + 1))}
              className="w-9 h-9 rounded-full bg-white border border-line-bold text-t font-bold active:scale-95 transition-transform"
            >
              +
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setOpen(false)}
              className="flex-1 py-2.5 rounded-lg bg-white border border-line-bold text-[13px] font-semibold text-t-sub active:scale-[0.98] transition-transform"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold text-white active:scale-[0.98] transition-transform"
              style={{ background: "#3B82C4" }}
            >
              저장
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function FreezerItemList() {
  const { items, removeItem } = useFreezerStorage();

  if (items.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-[13px] text-t-sub font-medium">
          아직 보관 중인 밀프렙이 없어요
        </p>
        <p className="text-[12px] text-t-caption mt-1">
          레시피에서 냉동 보관 시작 버튼을 눌러주세요
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {items.map((item) => {
        const elapsed = daysSince(item.startDate);
        const remaining = daysRemaining(item.startDate);
        const status = getFreshnessStatus(item.startDate);
        const info = getStatusInfo(status);

        return (
          <div
            key={item.id}
            className="rounded-xl bg-white p-3.5 border"
            style={{ borderColor: "#E0EEF7" }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-t truncate">
                  {item.recipeName}
                </p>
                <p className="text-[11px] text-t-caption mt-0.5">
                  {item.startDate.replace(/-/g, ".")} 시작 · {elapsed}일째 · {item.totalPacks}팩
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: info.bg, color: info.color }}
                  >
                    {info.label}
                  </span>
                  <span
                    className="text-[11px] font-bold"
                    style={{ color: info.color }}
                  >
                    {remaining > 0 ? `D-${remaining}` : `D+${-remaining}`}
                  </span>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-bg text-t-sub hover:text-t active:scale-95 transition-all"
              >
                먹었어요
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
