"use client";

import { useState, useEffect } from "react";
import { useFreezerStorage, todayISO, DEFAULT_LIMIT } from "@/hooks/useFreezerStorage";
import { FreezerItemList } from "@/components/freezer/freezer-tracker";
import { showToast } from "@/hooks/useToast";

export default function FreezerDrawer() {
  const [open, setOpen] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
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
          <div className="flex justify-center pt-3 pb-1">
            <div style={{ width: 40, height: 6, borderRadius: 999, background: "#A0C8E0" }} />
          </div>

          <div className="px-5 pb-4 pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-[17px] font-bold text-t">내 냉동실</h3>
              {mounted && hasUrgent && (
                <span className="relative inline-flex items-center justify-center">
                  <span className="absolute inline-flex h-3 w-3 rounded-full opacity-75 animate-ping" style={{ background: "#F44336" }} />
                  <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "#F44336" }} />
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {mounted && totalCount > 0 && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: "#FFFFFF", color: "#3B82C4" }}>
                  {totalCount}개 · {totalPacks}팩
                </span>
              )}
              {mounted && totalCount === 0 && (
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "#FFFFFF", color: "#9CB3C7" }}>
                  비어있음
                </span>
              )}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 300ms cubic-bezier(0.4,0,0.2,1)" }}>
                <path d="M3 5l4 4 4-4" stroke="#3B82C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </button>

        {/* Content */}
        <div
          style={{
            maxHeight: open ? "2000px" : "0px",
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
            {/* 직접 추가 버튼 */}
            <button
              onClick={() => setShowCustomForm(true)}
              className="w-full mb-4 py-3 rounded-xl text-[13px] font-semibold active:scale-[0.98] transition-transform flex items-center justify-center gap-1.5"
              style={{ background: "#FFFFFF", color: "#3B82C4", border: "1px solid #D0E8F5" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              직접 추가하기
            </button>

            <FreezerItemList />
          </div>
        </div>
      </div>

      {/* 커스텀 밀프랩 입력 바텀시트 */}
      {showCustomForm && (
        <CustomFreezerSheet onClose={() => setShowCustomForm(false)} />
      )}
    </section>
  );
}

// ============================================================
// 직접 입력 바텀시트
// ============================================================

function CustomFreezerSheet({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [packs, setPacks] = useState(1);
  const [startDate, setStartDate] = useState(todayISO());
  const [limitDays, setLimitDays] = useState(DEFAULT_LIMIT);
  const [memo, setMemo] = useState("");
  const [visible, setVisible] = useState(false);
  const { addItem } = useFreezerStorage();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => setVisible(true));
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    addItem(
      `custom-${Date.now()}`,
      name.trim(),
      packs,
      startDate,
      limitDays,
      { isCustom: true, memo: memo.trim() || undefined }
    );
    showToast(`"${name.trim()}" 냉동실에 저장했어요`, "success");
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-[90]">
      <div
        onClick={handleClose}
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: "rgba(0,0,0,0.4)", opacity: visible ? 1 : 0 }}
      />
      <div
        className="absolute left-0 right-0 bottom-0 bg-surface rounded-t-[28px] transition-transform duration-300 ease-out"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
          maxHeight: "90vh",
          overflowY: "auto",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)",
        }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-line-bold" />
        </div>

        <div className="px-6 pb-4">
          <h3 className="font-serif text-[20px] font-bold text-t">직접 추가하기</h3>
          <p className="text-[12px] text-t-caption mt-1">
            본인만의 레시피로 만든 밀프랩을 냉동실에 등록하세요
          </p>
        </div>

        <div className="px-6 pt-2 space-y-5">
          {/* 이름 */}
          <div>
            <label className="text-[12px] text-t-sub font-semibold block mb-1.5">
              음식 이름 <span className="text-[#F44336]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 엄마표 갈비찜, 닭가슴살 고구마볼"
              className="w-full px-4 py-3 rounded-xl bg-bg border border-line-bold text-[14px] text-t
                         focus:outline-none focus:border-olive placeholder:text-t-disabled transition-colors"
            />
          </div>

          {/* 팩 수 */}
          <div>
            <label className="text-[12px] text-t-sub font-semibold block mb-1.5">
              소분 팩 수
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPacks((p) => Math.max(1, p - 1))}
                disabled={packs <= 1}
                className="w-11 h-11 rounded-full border border-line-bold bg-white text-t font-bold text-[18px] active:scale-95 transition-transform disabled:opacity-30"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-[28px] font-bold text-t tracking-tight">{packs}</span>
                <span className="text-[14px] text-t-sub ml-1">팩</span>
              </div>
              <button
                onClick={() => setPacks((p) => Math.min(30, p + 1))}
                disabled={packs >= 30}
                className="w-11 h-11 rounded-full border border-line-bold bg-white text-t font-bold text-[18px] active:scale-95 transition-transform disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>

          {/* 보관 시작일 */}
          <div>
            <label className="text-[12px] text-t-sub font-semibold block mb-1.5">
              보관 시작일
            </label>
            <input
              type="date"
              value={startDate}
              max={todayISO()}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-bg border border-line-bold text-[14px] text-t
                         focus:outline-none focus:border-olive transition-colors"
            />
          </div>

          {/* 냉동 보관 기한 */}
          <div>
            <label className="text-[12px] text-t-sub font-semibold block mb-1.5">
              냉동 보관 기한
            </label>
            <div className="flex gap-2">
              {[14, 21, 30, 60].map((d) => (
                <button
                  key={d}
                  onClick={() => setLimitDays(d)}
                  className={
                    limitDays === d
                      ? "flex-1 py-2.5 rounded-xl text-[13px] font-semibold transition-all bg-olive text-white"
                      : "flex-1 py-2.5 rounded-xl text-[13px] transition-all bg-bg text-t-sub border border-line-bold"
                  }
                >
                  {d}일
                </button>
              ))}
            </div>
          </div>

          {/* 메모 */}
          <div>
            <label className="text-[12px] text-t-sub font-semibold block mb-1.5">
              메모 <span className="text-t-caption font-normal">(선택)</span>
            </label>
            <input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="예: 간장 1스푼 더 넣음, 매운맛 버전"
              className="w-full px-4 py-3 rounded-xl bg-bg border border-line-bold text-[13px] text-t
                         focus:outline-none focus:border-olive placeholder:text-t-disabled transition-colors"
            />
          </div>

          {/* 저장 버튼 */}
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="w-full py-4 rounded-xl text-[15px] font-bold text-white active:scale-[0.98] transition-transform disabled:opacity-40"
            style={{ background: "#4A5D4A" }}
          >
            냉동실에 저장
          </button>
        </div>
      </div>
    </div>
  );
}
