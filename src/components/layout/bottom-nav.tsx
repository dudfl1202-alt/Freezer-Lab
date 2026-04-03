"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "홈", icon: "🏠" },
  { href: "/weekly", label: "밀프랩", icon: "🧊" },
  { href: "/fridge", label: "냉장고", icon: "🥕" },
  { href: "/shopping", label: "장보기", icon: "🛒" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-lavender-100 pb-safe">
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
              className={
                isActive
                  ? "flex-1 flex flex-col items-center py-2 gap-0.5 text-lavender-500 transition-colors"
                  : "flex-1 flex flex-col items-center py-2 gap-0.5 text-txt-light hover:text-txt-muted transition-colors"
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
