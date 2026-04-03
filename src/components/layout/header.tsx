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
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-lg mx-auto px-4 h-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <span className="font-bold text-sm text-t">Freezer Lab</span>
        </Link>
        {!isHome && (
          <nav className="flex gap-0.5 bg-bg rounded-lg p-0.5">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={
                  pathname === tab.href
                    ? "text-xs px-3 py-1.5 rounded-md bg-surface text-primary font-semibold shadow-sm transition-all duration-200"
                    : "text-xs px-3 py-1.5 rounded-md text-t-hint hover:text-t-sub transition-all duration-200"
                }
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
