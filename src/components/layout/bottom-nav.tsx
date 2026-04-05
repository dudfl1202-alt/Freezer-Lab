"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "홈", d: "M4 8.5L10 4l6 4.5V15a1 1 0 01-1 1H5a1 1 0 01-1-1V8.5z" },
  { href: "/weekly", label: "밀프랩", d: "M4 6h12M4 10h12M4 14h12", isLines: true },
  { href: "/fridge", label: "냉장고", d: "M5 2h10a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1zM4 9h12" },
  { href: "/shopping", label: "장보기", d: "M6 6h11l-1.5 7H7.5L6 6zM6 6L5 3H3" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-line">
      <div className="max-w-lg mx-auto flex">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className="flex-1 flex flex-col items-center py-2 gap-0.5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {item.isLines ? (
                  <path d={item.d} stroke={active ? "#3CC8A1" : "#B0B8C1"} strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <path d={item.d} stroke={active ? "#3CC8A1" : "#B0B8C1"} strokeWidth="1.5" fill={active ? "#E8F8F2" : "none"} strokeLinecap="round" strokeLinejoin="round" />
                )}
                {item.href === "/shopping" && (
                  <>
                    <circle cx="9" cy="16" r="1" fill={active ? "#3CC8A1" : "#B0B8C1"} />
                    <circle cx="14" cy="16" r="1" fill={active ? "#3CC8A1" : "#B0B8C1"} />
                  </>
                )}
              </svg>
              <span className={`text-[10px] font-medium ${active ? "text-main" : "text-t-disabled"}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
