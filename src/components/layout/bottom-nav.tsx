"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "홈", emoji: "🏠" },
  { href: "/fridge", label: "냉장고 털기", emoji: "🥕" },
  { href: "/shopping", label: "장보기", emoji: "🛒" },
  { href: "/weekly", label: "주간 밀프랩", emoji: "📅" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-primary-100 pb-safe">
      <div className="max-w-lg mx-auto flex">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors",
                isActive
                  ? "text-primary-500"
                  : "text-warm-800/40 hover:text-warm-800/60"
              )}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
