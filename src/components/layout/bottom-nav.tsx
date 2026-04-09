"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "홈" },
  { href: "/weekly", label: "밀프랩" },
  { href: "/fridge", label: "냉장고" },
  { href: "/shopping", label: "장보기" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-t border-line">
      <div className="max-w-lg mx-auto flex">
        {items.map(item => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex-1 py-3.5 text-center text-[11px] font-medium transition-colors ${
                active ? "text-olive font-semibold" : "text-t-disabled"
              }`}>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
