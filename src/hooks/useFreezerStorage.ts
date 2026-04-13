"use client";

import { useState, useEffect, useCallback } from "react";

export interface FreezerItem {
  id: string;
  recipeId: string;
  recipeName: string;
  startDate: string; // YYYY-MM-DD
  totalPacks: number;
  remainingPacks: number;
  freezeLimitDays: number; // 레시피별 냉동 한도 (기본 30일)
  /** 사용자가 직접 입력한 커스텀 밀프랩 여부 */
  isCustom?: boolean;
  /** 커스텀일 때 메모 (예: "엄마 레시피 갈비찜") */
  memo?: string;
}

const STORAGE_KEY = "freezer-items-v2";
const DEFAULT_LIMIT = 30;

function read(): FreezerItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // v1 → v2 마이그레이션
      const oldRaw = localStorage.getItem("freezer-items");
      if (oldRaw) {
        const old = JSON.parse(oldRaw);
        const migrated = old.map((i: FreezerItem & { freezeLimitDays?: number }) => ({
          ...i,
          freezeLimitDays: i.freezeLimitDays ?? DEFAULT_LIMIT,
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        return migrated;
      }
      return [];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function write(items: FreezerItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("freezer-storage-updated"));
  } catch {
    // quota exceeded
  }
}

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function daysSince(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return Math.max(0, Math.floor((now.getTime() - start.getTime()) / 86400000));
}

export function daysRemaining(startDate: string, limit: number = DEFAULT_LIMIT): number {
  return limit - daysSince(startDate);
}

export type FreshnessStatus = "fresh" | "soon" | "urgent" | "expired";

export function getFreshnessStatus(startDate: string, limit: number = DEFAULT_LIMIT): FreshnessStatus {
  const remaining = daysRemaining(startDate, limit);
  if (remaining <= 0) return "expired";
  if (remaining <= 4) return "urgent";
  if (remaining <= 15) return "soon";
  return "fresh";
}

export function getStatusInfo(status: FreshnessStatus) {
  switch (status) {
    case "fresh":
      return { color: "#4CAF50", label: "신선해요", bg: "#E8F5E9", borderColor: "#C8E6C9" };
    case "soon":
      return { color: "#FF9800", label: "곧 드세요", bg: "#FFF3E0", borderColor: "#FFE0B2" };
    case "urgent":
      return { color: "#F44336", label: "빨리 드세요!", bg: "#FFEBEE", borderColor: "#FFCDD2" };
    case "expired":
      return { color: "#9E9E9E", label: "기한 지남", bg: "#F5F5F5", borderColor: "#E0E0E0" };
  }
}

export function getProgressPercent(startDate: string, limit: number = DEFAULT_LIMIT): number {
  const elapsed = daysSince(startDate);
  return Math.min(100, Math.max(0, (elapsed / limit) * 100));
}

export function useFreezerStorage() {
  const [items, setItems] = useState<FreezerItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(read());
    setMounted(true);
    const handler = () => setItems(read());
    window.addEventListener("freezer-storage-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("freezer-storage-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const addItem = useCallback(
    (
      recipeId: string,
      recipeName: string,
      totalPacks: number,
      startDate: string = todayISO(),
      freezeLimitDays: number = DEFAULT_LIMIT,
      opts?: { isCustom?: boolean; memo?: string }
    ) => {
      const newItem: FreezerItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        recipeId,
        recipeName,
        startDate,
        totalPacks,
        remainingPacks: totalPacks,
        freezeLimitDays,
        ...(opts?.isCustom && { isCustom: true }),
        ...(opts?.memo && { memo: opts.memo }),
      };
      const next = [...read(), newItem];
      write(next);
      setItems(next);
      return newItem;
    },
    []
  );

  const consumePack = useCallback((id: string) => {
    const current = read();
    const target = current.find((i) => i.id === id);
    if (!target) return;
    if (target.remainingPacks <= 1) {
      const next = current.filter((i) => i.id !== id);
      write(next);
      setItems(next);
    } else {
      const next = current.map((i) =>
        i.id === id ? { ...i, remainingPacks: i.remainingPacks - 1 } : i
      );
      write(next);
      setItems(next);
    }
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<FreezerItem>) => {
    const next = read().map((i) => (i.id === id ? { ...i, ...updates } : i));
    write(next);
    setItems(next);
  }, []);

  const removeItem = useCallback((id: string) => {
    const next = read().filter((i) => i.id !== id);
    write(next);
    setItems(next);
  }, []);

  // 정렬: 급한 순서 → 오래된 순서
  const sortedItems = [...items].sort((a, b) => {
    const ra = daysRemaining(a.startDate, a.freezeLimitDays);
    const rb = daysRemaining(b.startDate, b.freezeLimitDays);
    return ra - rb;
  });

  const hasUrgent = items.some((i) => {
    const s = getFreshnessStatus(i.startDate, i.freezeLimitDays);
    return s === "urgent" || s === "expired";
  });

  const totalPacks = items.reduce((sum, i) => sum + i.remainingPacks, 0);

  return {
    items: sortedItems,
    mounted,
    addItem,
    consumePack,
    updateItem,
    removeItem,
    hasUrgent,
    totalCount: items.length,
    totalPacks,
  };
}

export { todayISO, DEFAULT_LIMIT };
