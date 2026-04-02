import Link from "next/link";

const modes = [
  {
    href: "/fridge",
    emoji: "🥕",
    title: "냉장고 털기",
    subtitle: "있는 재료로 뚝딱",
    description: "냉장고에 남은 재료를 입력하면 만들 수 있는 레시피를 추천해드려요",
    bgColor: "bg-primary-50",
    borderColor: "border-primary-200",
  },
  {
    href: "/shopping",
    emoji: "🛒",
    title: "스마트 장보기",
    subtitle: "가성비 장보기 플랜",
    description: "예산별 장보기 리스트부터 소분, 냉동 보관까지 한번에 가이드",
    bgColor: "bg-fresh-50",
    borderColor: "border-fresh-200",
  },
  {
    href: "/weekly",
    emoji: "📅",
    title: "주간 밀프랩",
    subtitle: "일요일에 만들고 평일에 먹기",
    description: "한 번에 일주일치 식사를 준비하고 전자레인지만 돌리면 끝",
    bgColor: "bg-ice-50",
    borderColor: "border-ice-200",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 pb-10 px-4 text-center">
        <div className="text-5xl mb-4">🧊</div>
        <h1 className="text-3xl font-bold text-warm-800 mb-2">Freezer Lab</h1>
        <p className="text-warm-800/50 text-sm max-w-xs mx-auto leading-relaxed">
          가성비 있게, 건강하게
          <br />
          자취생을 위한 냉동 밀프랩 가이드
        </p>
      </section>

      {/* Mode Cards */}
      <section className="max-w-lg mx-auto px-4 pb-20 space-y-4">
        {modes.map((mode) => (
          <Link key={mode.href} href={mode.href}>
            <div
              className={`${mode.bgColor} ${mode.borderColor} border rounded-2xl p-5 hover:shadow-lg transition-all active:scale-[0.98] mb-4`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{mode.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-warm-800">
                      {mode.title}
                    </h2>
                    <span className="text-xs text-warm-800/40">
                      {mode.subtitle}
                    </span>
                  </div>
                  <p className="text-sm text-warm-800/60 mt-1 leading-relaxed">
                    {mode.description}
                  </p>
                </div>
                <span className="text-warm-800/20 text-xl mt-1">&rarr;</span>
              </div>
            </div>
          </Link>
        ))}

        {/* Tagline */}
        <div className="text-center pt-6 pb-4">
          <p className="text-xs text-warm-800/30">
            매일 배달비 아끼고, 건강하게 먹자
          </p>
        </div>
      </section>
    </main>
  );
}
