"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md">
      <div className="max-w-lg mx-auto px-5 h-[52px] flex items-center justify-between">
        <Link href="/" className="font-serif text-[18px] font-bold italic text-olive-dark">
          Freezer Lab
        </Link>
        {!isHome && (
          <div className="flex gap-5">
            {[
              { href: "/weekly", label: "밀프랩" },
              { href: "/fridge", label: "냉장고" },
              { href: "/shopping", label: "장보기" },
            ].map((tab) => (
              <Link key={tab.href} href={tab.href}
                className={pathname === tab.href
                  ? "text-[13px] text-olive font-semibold"
                  : "text-[13px] text-t-caption"
                }>
                {tab.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
