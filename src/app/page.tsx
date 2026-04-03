import Link from "next/link";
import Mascot from "@/components/shared/mascot";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-12 pb-4 px-4 text-center">
        <div className="flex justify-center mb-2">
          <Mascot size={100} expression="happy" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-lavender-500 to-pink-500 bg-clip-text text-transparent mb-1">
          Freezer Lab
        </h1>
        <p className="text-txt-secondary text-sm leading-relaxed">
          가성비 있게, 건강하게
          <br />
          <span className="text-pink-400">자취생을 위한 냉동 밀프랩 가이드</span>
        </p>
      </section>

      <section className="max-w-lg mx-auto px-4 pb-20">
        {/* 메인: 밀프랩 */}
        <Link href="/weekly">
          <div className="bg-gradient-to-br from-lavender-100 via-pink-50 to-peach-50 border border-lavender-200 rounded-3xl p-6 hover:shadow-cute-lg transition-all active:scale-[0.97] mb-3 relative overflow-hidden">
            <div className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full bg-lavender-500 text-white font-medium">
              MAIN
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-lavender-200 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                &#129482;
              </div>
              <div>
                <h2 className="text-lg font-bold text-txt-primary">
                  냉동 밀프랩
                </h2>
                <p className="text-xs text-txt-muted">
                  한 번 만들고 냉동실에 쌓아두기
                </p>
              </div>
            </div>
            <p className="text-sm text-txt-secondary leading-relaxed mb-3">
              일요일에 한 번 요리해서 소분 냉동하면, 평일은 전자레인지만 돌리면 끝!
              냉동보관용 / 다이어트용 플랜으로 시작하세요.
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] px-2 py-1 rounded-full bg-white/60 text-lavender-500">
                &#129482; 냉동보관 플랜
              </span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-white/60 text-mint-500">
                &#129388; 다이어트 플랜
              </span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-white/60 text-txt-muted">
                초보자 OK
              </span>
            </div>
            <div className="flex justify-end mt-2">
              <span className="text-sm text-lavender-400 font-medium">시작하기 &rarr;</span>
            </div>
          </div>
        </Link>

        {/* 서브 기능 2개 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Link href="/fridge">
            <div className="bg-gradient-to-br from-peach-100 to-pink-50 border border-pink-200 rounded-2xl p-4 hover:shadow-cute transition-all active:scale-[0.97] h-full">
              <div className="w-10 h-10 bg-peach-200 rounded-xl flex items-center justify-center text-xl mb-2">
                &#127805;
              </div>
              <h3 className="text-sm font-bold text-txt-primary mb-0.5">
                냉장고 털기
              </h3>
              <p className="text-[11px] text-txt-muted leading-relaxed">
                있는 재료 입력하면 레시피 추천
              </p>
            </div>
          </Link>
          <Link href="/shopping">
            <div className="bg-gradient-to-br from-mint-100 to-sky-50 border border-mint-200 rounded-2xl p-4 hover:shadow-cute transition-all active:scale-[0.97] h-full">
              <div className="w-10 h-10 bg-mint-200 rounded-xl flex items-center justify-center text-xl mb-2">
                &#128722;
              </div>
              <h3 className="text-sm font-bold text-txt-primary mb-0.5">
                스마트 장보기
              </h3>
              <p className="text-[11px] text-txt-muted leading-relaxed">
                예산별 장보기 + 소분 가이드
              </p>
            </div>
          </Link>
        </div>

        {/* Tagline */}
        <div className="text-center pt-2 pb-4">
          <p className="text-xs text-txt-light">
            매일 배달비 아끼고, 건강하게 먹자 &#10024;
          </p>
        </div>
      </section>
    </main>
  );
}
