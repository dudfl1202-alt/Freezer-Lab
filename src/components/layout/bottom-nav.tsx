"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const items = [
    { href: "/", label: "홈" },
    { href: "/weekly", label: "밀프랩" },
    { href: "/fridge", label: "냉장고" },
    { href: "/shopping", label: "장보기" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-line">
      <div className="max-w-lg mx-auto flex">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex-1 py-3 text-center text-[11px] font-semibold transition-colors ${
                active ? "text-main" : "text-t-disabled"
              }`}>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
