import Link from "next/link";
import Mascot from "@/components/shared/mascot";

export default function Home() {
  return (
    <main className="min-h-screen pb-10">
      {/* Hero - 따뜻한 그라데이션 */}
      <div className="bg-gradient-to-b from-[#F0F7F4] to-bg pt-14 pb-10 px-5">
        <div className="max-w-lg mx-auto text-center">
          <Mascot size={48} className="mx-auto mb-3" />
          <h1 className="text-[24px] font-extrabold tracking-tight text-t">프리저랩</h1>
          <p className="text-[14px] text-t-sub mt-1.5 leading-relaxed">
            한 번 만들고 냉동실에 쌓아두면<br />평일은 전자레인지만 돌리면 끝
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 -mt-3 space-y-4">
        {/* 메인: 밀프랩 */}
        <Link href="/weekly" className="block">
          <div className="bg-surface rounded-xl shadow-card p-5 active:scale-[0.98] transition-transform">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[11px] text-main font-bold tracking-wide uppercase mb-1">Main</p>
                <h2 className="text-[18px] font-extrabold tracking-tight text-t">냉동 밀프랩</h2>
                <p className="text-[13px] text-t-sub mt-1">일요일 2시간이면 평일 내내 편안해요</p>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 bg-main-light rounded-lg py-2.5 px-3 text-center">
                <p className="text-[11px] text-main font-bold">냉동보관</p>
                <p className="text-[10px] text-t-caption mt-0.5">13팩 완성</p>
              </div>
              <div className="flex-1 bg-sub-light rounded-lg py-2.5 px-3 text-center">
                <p className="text-[11px] text-sub font-bold">다이어트</p>
                <p className="text-[10px] text-t-caption mt-0.5">9팩 완성</p>
              </div>
            </div>
          </div>
        </Link>

        {/* 서브 카드 */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/fridge" className="block">
            <div className="bg-surface rounded-xl shadow-sm p-4 h-full active:scale-[0.98] transition-transform">
              <p className="text-[20px] mb-2">🥕</p>
              <h3 className="text-[15px] font-bold tracking-tight text-t">냉장고 털기</h3>
              <p className="text-[12px] text-t-sub mt-1 leading-relaxed">있는 재료로 뭐 해먹지?</p>
            </div>
          </Link>
          <Link href="/shopping" className="block">
            <div className="bg-surface rounded-xl shadow-sm p-4 h-full active:scale-[0.98] transition-transform">
              <p className="text-[20px] mb-2">🛒</p>
              <h3 className="text-[15px] font-bold tracking-tight text-t">스마트 장보기</h3>
              <p className="text-[12px] text-t-sub mt-1 leading-relaxed">예산별 장보기 플랜</p>
            </div>
          </Link>
        </div>

        {/* 오늘의 팁 */}
        <div className="bg-surface rounded-xl shadow-sm p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-sub-light flex items-center justify-center shrink-0">
            <span className="text-[14px]">💡</span>
          </div>
          <div>
            <p className="text-[12px] font-bold text-t">오늘의 팁</p>
            <p className="text-[12px] text-t-sub mt-0.5 leading-relaxed">
              냉동밥은 김이 빠지기 전에 랩으로 감싸야 촉촉하게 유지돼요
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
