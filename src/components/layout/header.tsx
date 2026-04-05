"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/weekly", label: "밀프랩" },
  { href: "/fridge", label: "냉장고" },
  { href: "/shopping", label: "장보기" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-line">
      <div className="max-w-lg mx-auto px-5 h-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-main flex items-center justify-center">
            <span className="text-white text-[11px] font-extrabold">F</span>
          </div>
          <span className="font-bold text-[15px] text-t">프리저랩</span>
        </Link>
        {!isHome && (
          <div className="flex">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={
                  pathname === tab.href
                    ? "text-[13px] px-3 py-1 text-main font-semibold"
                    : "text-[13px] px-3 py-1 text-t-caption"
                }
              >
                {tab.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
