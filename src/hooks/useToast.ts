"use client";

import { useState, useEffect, useCallback } from "react";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "warning";
}

let toastListeners: ((toasts: Toast[]) => void)[] = [];
let currentToasts: Toast[] = [];

function notify() {
  toastListeners.forEach((l) => l(currentToasts));
}

export function showToast(message: string, type: Toast["type"] = "success") {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  currentToasts = [...currentToasts, { id, message, type }];
  notify();
  setTimeout(() => {
    currentToasts = currentToasts.filter((t) => t.id !== id);
    notify();
  }, 2500);
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>(currentToasts);

  useEffect(() => {
    const listener = (next: Toast[]) => setToasts(next);
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  const dismiss = useCallback((id: string) => {
    currentToasts = currentToasts.filter((t) => t.id !== id);
    notify();
  }, []);

  return { toasts, dismiss };
}
