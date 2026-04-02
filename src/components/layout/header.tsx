"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary-100">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🧊</span>
          <span className="font-bold text-lg text-warm-800">
            Freezer Lab
          </span>
        </Link>
        {!isHome && (
          <nav className="flex gap-1">
            {[
              { href: "/fridge", label: "냉장고", emoji: "🥕" },
              { href: "/shopping", label: "장보기", emoji: "🛒" },
              { href: "/weekly", label: "밀프랩", emoji: "📅" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-xs px-2.5 py-1.5 rounded-full transition-colors",
                  pathname === item.href
                    ? "bg-primary-500 text-white"
                    : "text-warm-800/60 hover:bg-primary-50"
                )}
              >
                {item.emoji} {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
