"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-lavender-100">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5">
          <span className="w-8 h-8 rounded-lg bg-lavender-100 flex items-center justify-center text-base">
            🧊
          </span>
          <span className="font-bold text-lg bg-gradient-to-r from-lavender-500 to-pink-500 bg-clip-text text-transparent">
            Freezer Lab
          </span>
        </Link>
        {!isHome && (
          <nav className="flex gap-1">
            {[
              { href: "/weekly", label: "밀프랩", icon: "🧊" },
              { href: "/fridge", label: "냉장고", icon: "🥕" },
              { href: "/shopping", label: "장보기", icon: "🛒" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  pathname === item.href
                    ? "text-xs px-2.5 py-1.5 rounded-full bg-lavender-500 text-white font-medium transition-colors"
                    : "text-xs px-2.5 py-1.5 rounded-full text-txt-muted hover:bg-lavender-50 transition-colors"
                }
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
