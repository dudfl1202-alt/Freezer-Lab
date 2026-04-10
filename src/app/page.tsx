import Link from "next/link";
import FreezerDrawer from "@/components/freezer/freezer-drawer";

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      {/* 인사 + 히어로 */}
      <div className="px-5 pt-14 pb-6 max-w-lg mx-auto">
        <p className="text-[13px] text-t-caption mb-1">WELCOME BACK</p>
        <h1 className="font-serif text-[28px] font-bold leading-tight text-t">
          오늘도 건강하게,<br />간편하게 한 끼
        </h1>
      </div>

      {/* 메인 히어로 카드 - 밀프랩 */}
      <div className="px-5 max-w-lg mx-auto mb-6">
        <Link href="/weekly" className="block">
          <div className="relative bg-olive-dark rounded-3xl overflow-hidden h-[220px] p-6 flex flex-col justify-end active:scale-[0.98] transition-transform">
            <div className="absolute inset-0 bg-gradient-to-t from-olive-dark/90 via-olive-dark/40 to-olive-dark/10" />
            <div className="relative z-10">
              <p className="text-[11px] text-olive-muted font-medium uppercase tracking-wider mb-1">Today&apos;s Selection</p>
              <h2 className="font-serif text-[22px] font-bold text-white leading-snug">
                냉동 밀프랩<br />한 번에 준비하기
              </h2>
              <div className="flex gap-4 mt-3">
                <span className="text-[11px] text-white/70">22,000원</span>
                <span className="text-[11px] text-white/70">2시간</span>
                <span className="text-[11px] text-white/70">13팩</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Your Week 섹션 */}
      <div className="px-5 max-w-lg mx-auto mb-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-serif text-[20px] font-bold text-t">Your Week</h2>
            <p className="text-[12px] text-t-caption mt-0.5">4가지 메뉴, 13팩 준비 완료</p>
          </div>
        </div>
        <Link href="/weekly" className="block">
          <div className="bg-olive text-white rounded-full py-3.5 px-6 text-center text-[14px] font-semibold active:scale-[0.97] transition-transform">
            View Planner
          </div>
        </Link>
      </div>

      {/* Quick & Easy 섹션 - 냉장고 털기 */}
      <div className="px-5 max-w-lg mx-auto mb-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-serif text-[20px] font-bold text-t">Quick & Easy</h2>
            <p className="text-[12px] text-t-caption mt-0.5">15분 이내 간단 레시피</p>
          </div>
          <Link href="/fridge" className="text-[12px] text-olive font-semibold">See All</Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "김치볶음밥", sub: "쉬움 · 15분", href: "/recipe/kimchi-friedrice" },
            { name: "계란볶음밥", sub: "쉬움 · 15분", href: "/recipe/egg-friedrice" },
          ].map(item => (
            <Link key={item.href} href={item.href} className="block">
              <div className="bg-olive-light rounded-2xl p-4 h-[120px] flex flex-col justify-end active:scale-[0.97] transition-transform">
                <p className="text-[14px] font-bold text-t">{item.name}</p>
                <p className="text-[11px] text-t-caption mt-0.5">{item.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 내 냉동실 섹션 */}
      <div className="px-5 max-w-lg mx-auto mb-8">
        <FreezerDrawer />
      </div>

      {/* 스마트 장보기 섹션 */}
      <div className="px-5 max-w-lg mx-auto mb-8">
        <div className="bg-sand-light rounded-3xl p-6">
          <p className="text-[11px] text-sand font-semibold uppercase tracking-wider mb-1">Smart Shopping</p>
          <h2 className="font-serif text-[20px] font-bold text-t mb-1">스마트 장보기</h2>
          <p className="text-[13px] text-t-sub mb-4">
            예산별 장보기 플랜으로<br />가성비 밀프랩을 시작하세요
          </p>
          <Link href="/shopping"
            className="inline-block bg-olive text-white rounded-full py-2.5 px-5 text-[13px] font-semibold active:scale-[0.97] transition-transform">
            View Plans
          </Link>
        </div>
      </div>

      {/* 오늘의 팁 */}
      <div className="px-5 max-w-lg mx-auto">
        <p className="text-[11px] text-t-caption uppercase tracking-wider mb-2">Daily Tip</p>
        <p className="text-[14px] text-t leading-relaxed">
          냉동밥은 김이 빠지기 전에 랩으로 감싸야 촉촉하게 유지돼요.
          <span className="text-t-caption"> 해동 시 물 1스푼을 뿌려주면 더 좋아요.</span>
        </p>
      </div>
    </main>
  );
}
