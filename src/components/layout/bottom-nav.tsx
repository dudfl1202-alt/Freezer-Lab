"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "홈", icon: (active: boolean) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 8.5L10 3L17 8.5V16C17 16.5523 16.5523 17 16 17H4C3.44772 17 3 16.5523 3 16V8.5Z" stroke={active ? "#7C5CFC" : "#A0A0C0"} strokeWidth="1.5" fill={active ? "#EDE8FF" : "none"} /></svg>
  )},
  { href: "/weekly", label: "밀프랩", icon: (active: boolean) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="5" width="14" height="12" rx="2" stroke={active ? "#7C5CFC" : "#A0A0C0"} strokeWidth="1.5" fill={active ? "#EDE8FF" : "none"} /><path d="M3 9H17" stroke={active ? "#7C5CFC" : "#A0A0C0"} strokeWidth="1.5" /><path d="M7 3V6M13 3V6" stroke={active ? "#7C5CFC" : "#A0A0C0"} strokeWidth="1.5" strokeLinecap="round" /></svg>
  )},
  { href: "/fridge", label: "냉장고", icon: (active: boolean) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="2" stroke={active ? "#7C5CFC" : "#A0A0C0"} strokeWidth="1.5" fill={active ? "#EDE8FF" : "none"} /><path d="M4 9H16" stroke={active ? "#7C5CFC" : "#A0A0C0"} strokeWidth="1.5" /><path d="M7.5 5.5V7" stroke={active ? "#7C5CFC" : "#A0A0C0"} strokeWidth="1.5" strokeLinecap="round" /><path d="M7.5 12V14" stroke={active ? "#7C5CFC" : "#A0A0C0"} strokeWidth="1.5" strokeLinecap="round" /></svg>
  )},
  { href: "/shopping", label: "장보기", icon: (active: boolean) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6H17L15.5 13H7.5L6 6Z" stroke={active ? "#7C5CFC" : "#A0A0C0"} strokeWidth="1.5" fill={active ? "#EDE8FF" : "none"} strokeLinejoin="round" /><path d="M6 6L5 3H3" stroke={active ? "#7C5CFC" : "#A0A0C0"} strokeWidth="1.5" strokeLinecap="round" /><circle cx="9" cy="16" r="1" fill={active ? "#7C5CFC" : "#A0A0C0"} /><circle cx="14" cy="16" r="1" fill={active ? "#7C5CFC" : "#A0A0C0"} /></svg>
  )},
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-t border-border pb-safe">
      <div className="max-w-lg mx-auto flex">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors duration-150"
            >
              {item.icon(active)}
              <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-t-hint"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
