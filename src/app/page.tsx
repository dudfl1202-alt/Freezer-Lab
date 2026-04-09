import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen pb-10">
      <div className="bg-gradient-to-b from-[#F0F7F4] to-bg pt-16 pb-12 px-5">
        <div className="max-w-lg mx-auto">
          <h1 className="text-[26px] font-extrabold tracking-tight text-t">프리저랩</h1>
          <p className="text-[15px] text-t-sub mt-2 leading-relaxed">
            한 번 만들고 냉동실에 쌓아두면<br />평일은 전자레인지만 돌리면 끝
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 -mt-4 space-y-5">
        <Link href="/weekly" className="block">
          <div className="bg-surface rounded-xl shadow-sm p-5 active:scale-[0.98] transition-transform">
            <p className="text-[11px] text-main font-bold mb-2">메인 기능</p>
            <h2 className="text-[18px] font-extrabold tracking-tight text-t">냉동 밀프랩</h2>
            <p className="text-[13px] text-t-sub mt-1 mb-4">일요일 2시간이면 평일 내내 편안해요</p>
            <div className="flex gap-3">
              <div className="flex-1">
                <p className="text-[11px] text-t-caption mb-0.5">냉동보관</p>
                <p className="text-[15px] font-extrabold text-main tracking-tight">13팩 완성</p>
              </div>
              <div className="w-px bg-line" />
              <div className="flex-1">
                <p className="text-[11px] text-t-caption mb-0.5">다이어트</p>
                <p className="text-[15px] font-extrabold text-sub tracking-tight">9팩 완성</p>
              </div>
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-3">
          <Link href="/fridge" className="block">
            <div className="bg-surface rounded-xl shadow-sm p-5 active:scale-[0.98] transition-transform">
              <h3 className="text-[15px] font-bold tracking-tight text-t">냉장고 털기</h3>
              <p className="text-[12px] text-t-sub mt-1">있는 재료로 뭐 해먹지?</p>
            </div>
          </Link>
          <Link href="/shopping" className="block">
            <div className="bg-surface rounded-xl shadow-sm p-5 active:scale-[0.98] transition-transform">
              <h3 className="text-[15px] font-bold tracking-tight text-t">스마트 장보기</h3>
              <p className="text-[12px] text-t-sub mt-1">예산별 장보기 플랜</p>
            </div>
          </Link>
        </div>

        <div className="bg-surface rounded-xl shadow-sm p-5">
          <p className="text-[12px] font-bold text-t mb-1">오늘의 팁</p>
          <p className="text-[13px] text-t-sub leading-relaxed">
            냉동밥은 김이 빠지기 전에 랩으로 감싸야 촉촉하게 유지돼요
          </p>
        </div>
      </div>
    </main>
  );
}
