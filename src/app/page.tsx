import Link from "next/link";
import Mascot from "@/components/shared/mascot";

export default function Home() {
  return (
    <main className="min-h-screen pb-8">
      {/* Hero */}
      <section className="pt-14 pb-8 px-4 text-center">
        <div className="flex justify-center mb-3 animate-fade-up">
          <Mascot size={72} />
        </div>
        <h1 className="text-2xl font-bold text-t animate-fade-up stagger-1">
          Freezer Lab
        </h1>
        <p className="text-t-sub text-sm mt-1 animate-fade-up stagger-2">
          한 번 만들고 냉동실에 쌓아두면, 평일은 레인지만.
        </p>
      </section>

      <section className="max-w-lg mx-auto px-4 space-y-3">
        {/* 메인: 밀프랩 */}
        <Link href="/weekly" className="block animate-fade-up stagger-2">
          <div className="card p-5 group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="5" width="16" height="14" rx="2.5" stroke="#7C5CFC" strokeWidth="1.5" /><path d="M3 10H19" stroke="#7C5CFC" strokeWidth="1.5" /><path d="M8 3V6M14 3V6" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" /><rect x="7" y="13" width="3" height="3" rx="0.5" fill="#7C5CFC" opacity="0.3" /><rect x="12" y="13" width="3" height="3" rx="0.5" fill="#7C5CFC" opacity="0.3" /></svg>
                </div>
                <div>
                  <h2 className="text-base font-bold text-t">냉동 밀프랩</h2>
                  <p className="text-xs text-t-hint">한 번에 만들고 소분 냉동</p>
                </div>
              </div>
              <span className="chip bg-primary-light text-primary">MAIN</span>
            </div>
            <p className="text-sm text-t-sub leading-relaxed mb-4">
              일요일에 2시간 투자하면 평일 내내 전자레인지만 돌리면 끝.
              냉동보관용과 다이어트용 플랜을 골라보세요.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="chip bg-info-light text-info">냉동보관</span>
                <span className="chip bg-success-light text-success">다이어트</span>
              </div>
              <span className="text-xs text-primary font-semibold group-hover:translate-x-0.5 transition-transform duration-200">
                시작하기 &rarr;
              </span>
            </div>
          </div>
        </Link>

        {/* 서브 */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/fridge" className="block animate-fade-up stagger-3">
            <div className="card p-4 h-full">
              <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center mb-2.5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="4" y="1" width="10" height="16" rx="2" stroke="#FF6B9D" strokeWidth="1.5" /><path d="M4 8H14" stroke="#FF6B9D" strokeWidth="1.5" /><path d="M7 4V5.5M7 11V13" stroke="#FF6B9D" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
              <h3 className="text-sm font-bold text-t mb-0.5">냉장고 털기</h3>
              <p className="text-[11px] text-t-hint leading-relaxed">
                있는 재료로 뭐 만들지?
              </p>
            </div>
          </Link>
          <Link href="/shopping" className="block animate-fade-up stagger-4">
            <div className="card p-4 h-full">
              <div className="w-9 h-9 rounded-lg bg-success-light flex items-center justify-center mb-2.5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 5H16L14.5 12H6.5L5 5Z" stroke="#34D399" strokeWidth="1.5" strokeLinejoin="round" /><path d="M5 5L4 2H2" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" /><circle cx="8" cy="15" r="1" fill="#34D399" /><circle cx="13" cy="15" r="1" fill="#34D399" /></svg>
              </div>
              <h3 className="text-sm font-bold text-t mb-0.5">스마트 장보기</h3>
              <p className="text-[11px] text-t-hint leading-relaxed">
                예산별 장보기 플랜
              </p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
