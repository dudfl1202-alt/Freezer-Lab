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
      <div className="max-w-lg mx-auto px-5 h-[52px] flex items-center justify-between">
        <Link href="/" className="text-[17px] font-extrabold tracking-tight text-t">
          프리저랩
        </Link>
        {!isHome && (
          <div className="flex">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={
                  pathname === tab.href
                    ? "text-[13px] px-3 py-1 text-main font-bold"
                    : "text-[13px] px-3 py-1 text-t-caption font-medium"
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
