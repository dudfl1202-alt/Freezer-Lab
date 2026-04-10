"use client";

import { useToast } from "@/hooks/useToast";

export default function ToastHost() {
  const { toasts } = useToast();

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 76px)" }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto rounded-full px-5 py-3 shadow-lg animate-fade-in"
          style={{
            background:
              t.type === "success"
                ? "#4A5D4A"
                : t.type === "warning"
                ? "#F44336"
                : "#1C2118",
            color: "white",
            fontSize: 13,
            fontWeight: 600,
            maxWidth: "90vw",
          }}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
