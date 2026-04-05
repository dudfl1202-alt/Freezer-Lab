import Link from "next/link";
import Mascot from "@/components/shared/mascot";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg pb-10">
      {/* Hero */}
      <div className="bg-main-light pt-10 pb-8 px-5 text-center rounded-b-[32px]">
        <Mascot size={80} mood="happy" className="mx-auto mb-2" />
        <h1 className="text-xl font-bold text-t">프리저랩</h1>
        <p className="text-[13px] text-t-sub mt-1">
          한 번 만들고 냉동실에 쌓아두면,<br />평일은 전자레인지만 돌리면 끝!
        </p>
      </div>

      <div className="max-w-lg mx-auto px-5 -mt-4 space-y-3">
        {/* 메인: 밀프랩 */}
        <Link href="/weekly">
          <div className="bg-surface rounded-2xl p-5 shadow-card active:scale-[0.98] transition-transform">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-main-light flex items-center justify-center">
                <Mascot size={28} mood="cook" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-[15px] font-bold text-t">냉동 밀프랩</h2>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-main text-white font-semibold">MAIN</span>
                </div>
                <p className="text-[12px] text-t-caption mt-0.5">일요일 2시간 = 평일 내내 편안</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 5l5 5-5 5" stroke="#B0B8C1" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
            <div className="flex gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-main-50 text-main font-medium">냉동보관 플랜</span>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-sub-light text-sub font-medium">다이어트 플랜</span>
            </div>
          </div>
        </Link>

        {/* 서브 */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/fridge">
            <div className="bg-surface rounded-2xl p-4 shadow-card active:scale-[0.98] transition-transform">
              <Mascot size={36} mood="default" className="mb-2" />
              <h3 className="text-[14px] font-bold text-t">냉장고 털기</h3>
              <p className="text-[11px] text-t-caption mt-0.5 leading-relaxed">있는 재료로<br />뭐 해먹지?</p>
            </div>
          </Link>
          <Link href="/shopping">
            <div className="bg-surface rounded-2xl p-4 shadow-card active:scale-[0.98] transition-transform">
              <Mascot size={36} mood="sleep" className="mb-2" />
              <h3 className="text-[14px] font-bold text-t">스마트 장보기</h3>
              <p className="text-[11px] text-t-caption mt-0.5 leading-relaxed">예산별<br />장보기 플랜</p>
            </div>
          </Link>
        </div>

        {/* 한마디 */}
        <div className="bg-surface rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <Mascot size={32} mood="happy" />
          <p className="text-[12px] text-t-sub leading-relaxed">
            <span className="font-semibold text-main">오늘의 팁!</span> 냉동밥은 김이 빠지기 전에 랩으로 감싸야 촉촉해요
          </p>
        </div>
      </div>
    </main>
  );
}
