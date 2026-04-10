"use client";

import { useState, useEffect } from "react";
import {
  useFreezerStorage,
  daysSince,
  daysRemaining,
  getFreshnessStatus,
  getStatusInfo,
  getProgressPercent,
  todayISO,
  DEFAULT_LIMIT,
  FreezerItem,
} from "@/hooks/useFreezerStorage";
import { showToast } from "@/hooks/useToast";

// ============================================================
// 냉동 보관 시작 버튼 + 바텀시트
// ============================================================

interface FreezerTrackerButtonProps {
  recipeId: string;
  recipeName: string;
  defaultPacks?: number;
}

export function FreezerTrackerButton({
  recipeId,
  recipeName,
  defaultPacks = 1,
}: FreezerTrackerButtonProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [packs, setPacks] = useState(defaultPacks);
  const [startDate, setStartDate] = useState(todayISO());
  const { addItem } = useFreezerStorage();

  // Sheet 열렸을 때 body scroll lock
  useEffect(() => {
    if (sheetOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [sheetOpen]);

  const handleSave = () => {
    addItem(recipeId, recipeName, packs, startDate, DEFAULT_LIMIT);
    setSheetOpen(false);
    showToast("냉동실에 저장했어요", "success");
    setPacks(defaultPacks);
    setStartDate(todayISO());
  };

  return (
    <>
      <button
        onClick={() => setSheetOpen(true)}
        className="w-full py-4 rounded-2xl text-[14px] font-bold text-white active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        style={{ background: "#4A5D4A" }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="4" y="2" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 7H14" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 4.5V5.5M9 9V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        냉동실에 보관하기
      </button>

      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="냉동 보관 시작">
        <div className="space-y-5">
          <div>
            <p className="text-[12px] text-t-caption uppercase tracking-wider mb-2">Recipe</p>
            <p className="text-[15px] font-semibold text-t">{recipeName}</p>
          </div>

          {/* 팩 수 */}
          <div>
            <p className="text-[12px] text-t-caption uppercase tracking-wider mb-2">Packs</p>
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
                onClick={() => setPacks((p) => Math.min(20, p + 1))}
                disabled={packs >= 20}
                className="w-11 h-11 rounded-full border border-line-bold bg-white text-t font-bold text-[18px] active:scale-95 transition-transform disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>

          {/* 보관 시작일 */}
          <div>
            <p className="text-[12px] text-t-caption uppercase tracking-wider mb-2">Start Date</p>
            <input
              type="date"
              value={startDate}
              max={todayISO()}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-bg border border-line-bold text-[14px] text-t focus:outline-none focus:border-olive transition-colors"
            />
            <p className="text-[11px] text-t-caption mt-1.5">
              {daysSince(startDate) === 0
                ? "오늘 보관 시작"
                : `${daysSince(startDate)}일 전 보관 시작`}
            </p>
          </div>

          {/* 정보 */}
          <div className="bg-olive-light rounded-xl p-3.5">
            <p className="text-[12px] text-olive leading-relaxed">
              냉동 보관 기한은 <span className="font-bold">{DEFAULT_LIMIT}일</span>을
              기준으로 계산돼요. 보관 상태를 홈 화면 &ldquo;내 냉동실&rdquo;에서 확인할 수 있어요.
            </p>
          </div>

          {/* 저장 버튼 */}
          <button
            onClick={handleSave}
            className="w-full py-4 rounded-xl text-[15px] font-bold text-white active:scale-[0.98] transition-transform"
            style={{ background: "#4A5D4A" }}
          >
            냉동실에 저장
          </button>
        </div>
      </BottomSheet>
    </>
  );
}

// ============================================================
// 냉동실 항목 리스트
// ============================================================

export function FreezerItemList() {
  const { items, consumePack, removeItem } = useFreezerStorage();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-3"
          style={{ background: "#E8F0F8" }}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect x="6" y="3" width="14" height="20" rx="2" stroke="#A0C8E0" strokeWidth="1.5" />
            <path d="M6 10H20" stroke="#A0C8E0" strokeWidth="1.5" />
          </svg>
        </div>
        <p className="text-[13px] text-t-sub font-semibold">
          아직 보관 중인 밀프랩이 없어요
        </p>
        <p className="text-[12px] text-t-caption mt-1">
          레시피에서 &ldquo;냉동실에 보관하기&rdquo; 버튼을 눌러주세요
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2.5">
        {items.map((item) => (
          <FreezerItemCard
            key={item.id}
            item={item}
            onConsume={() => {
              consumePack(item.id);
              showToast(
                item.remainingPacks <= 1
                  ? `${item.recipeName} 다 드셨어요`
                  : `1팩 차감 (${item.remainingPacks - 1}팩 남음)`,
                "success"
              );
            }}
            onDelete={() => setConfirmId(item.id)}
          />
        ))}
      </div>

      {/* 삭제 확인 모달 */}
      {confirmId && (
        <ConfirmModal
          title="정말 삭제할까요?"
          message="냉동실에서 이 항목을 완전히 삭제합니다."
          confirmText="삭제"
          onConfirm={() => {
            removeItem(confirmId);
            setConfirmId(null);
            showToast("삭제했어요", "info");
          }}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </>
  );
}

// ============================================================
// 개별 항목 카드
// ============================================================

function FreezerItemCard({
  item,
  onConsume,
  onDelete,
}: {
  item: FreezerItem;
  onConsume: () => void;
  onDelete: () => void;
}) {
  const elapsed = daysSince(item.startDate);
  const remaining = daysRemaining(item.startDate, item.freezeLimitDays);
  const status = getFreshnessStatus(item.startDate, item.freezeLimitDays);
  const info = getStatusInfo(status);
  const progress = getProgressPercent(item.startDate, item.freezeLimitDays);

  return (
    <div
      className="rounded-2xl bg-white p-4 border transition-all"
      style={{ borderColor: info.borderColor }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-bold"
              style={{ background: info.bg, color: info.color }}
            >
              {info.label}
            </span>
            <span className="text-[11px] font-bold" style={{ color: info.color }}>
              {remaining > 0 ? `D-${remaining}` : remaining === 0 ? "D-day" : `D+${-remaining}`}
            </span>
          </div>
          <p className="text-[15px] font-bold text-t truncate">{item.recipeName}</p>
          <p className="text-[11px] text-t-caption mt-0.5">
            {item.startDate.replace(/-/g, ".")} 시작 · {elapsed}일 경과
          </p>
        </div>
        <button
          onClick={onDelete}
          aria-label="삭제"
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-t-caption hover:bg-bg transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* 진행도 바 */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-t-caption font-medium">
            {elapsed}일 / {item.freezeLimitDays}일
          </span>
          <span className="text-[10px] text-t-caption">
            {item.remainingPacks}/{item.totalPacks}팩 남음
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-bg overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: info.color }}
          />
        </div>
      </div>

      {/* 액션 */}
      <button
        onClick={onConsume}
        className="w-full py-2.5 rounded-lg text-[12px] font-bold active:scale-[0.98] transition-transform"
        style={{
          background: info.bg,
          color: info.color,
        }}
      >
        {item.remainingPacks <= 1 ? "마지막 1팩 먹었어요" : "1팩 먹었어요"}
      </button>
    </div>
  );
}

// ============================================================
// 바텀시트
// ============================================================

function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      {/* Dim */}
      <div
        onClick={onClose}
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: "rgba(0,0,0,0.4)", opacity: visible ? 1 : 0 }}
      />

      {/* Sheet */}
      <div
        className="absolute left-0 right-0 bottom-0 bg-surface rounded-t-[28px] transition-transform duration-300 ease-out"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
          maxHeight: "90vh",
          overflowY: "auto",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)",
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-line-bold" />
        </div>

        {/* Header */}
        <div className="px-6 pb-4">
          <h3 className="font-serif text-[20px] font-bold text-t">{title}</h3>
        </div>

        {/* Body */}
        <div className="px-6 pt-2">{children}</div>
      </div>
    </div>
  );
}

// ============================================================
// 확인 모달
// ============================================================

function ConfirmModal({
  title,
  message,
  confirmText,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center px-6">
      <div
        onClick={onCancel}
        className="absolute inset-0 animate-fade-in"
        style={{ background: "rgba(0,0,0,0.4)" }}
      />
      <div className="relative bg-surface rounded-2xl p-6 w-full max-w-[320px] animate-fade-in">
        <h3 className="font-serif text-[17px] font-bold text-t mb-1">{title}</h3>
        <p className="text-[13px] text-t-sub mb-5">{message}</p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-bg text-[13px] font-semibold text-t-sub active:scale-[0.98] transition-transform"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl text-[13px] font-bold text-white active:scale-[0.98] transition-transform"
            style={{ background: "#F44336" }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
