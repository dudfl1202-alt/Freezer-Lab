"use client";

import { useState, useEffect, useCallback } from "react";

export interface FreezerItem {
  id: string;
  recipeId: string;
  recipeName: string;
  startDate: string; // YYYY-MM-DD
  totalPacks: number;
  remainingPacks: number;
}

const STORAGE_KEY = "freezer-items";
const FREEZE_LIMIT_DAYS = 30;

function read(): FreezerItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
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
    // ignore quota errors
  }
}

export function daysSince(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export function daysRemaining(startDate: string): number {
  return FREEZE_LIMIT_DAYS - daysSince(startDate);
}

export type FreshnessStatus = "fresh" | "soon" | "urgent";

export function getFreshnessStatus(startDate: string): FreshnessStatus {
  const elapsed = daysSince(startDate);
  if (elapsed <= 14) return "fresh";
  if (elapsed <= 25) return "soon";
  return "urgent";
}

export function getStatusInfo(status: FreshnessStatus) {
  switch (status) {
    case "fresh":
      return { color: "#4CAF50", label: "신선해요", bg: "#E8F5E9" };
    case "soon":
      return { color: "#FF9800", label: "곧 드세요", bg: "#FFF3E0" };
    case "urgent":
      return { color: "#F44336", label: "빨리 드세요!", bg: "#FFEBEE" };
  }
}

function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
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
    (recipeId: string, recipeName: string, totalPacks: number) => {
      const newItem: FreezerItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        recipeId,
        recipeName,
        startDate: todayISO(),
        totalPacks,
        remainingPacks: totalPacks,
      };
      const next = [...read(), newItem];
      write(next);
      setItems(next);
      return newItem;
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    const next = read().filter((i) => i.id !== id);
    write(next);
    setItems(next);
  }, []);

  const hasUrgent = items.some(
    (i) => getFreshnessStatus(i.startDate) === "urgent"
  );

  return {
    items,
    mounted,
    addItem,
    removeItem,
    hasUrgent,
    totalCount: items.length,
  };
}
