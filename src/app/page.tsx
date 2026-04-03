import Link from "next/link";
import Mascot from "@/components/shared/mascot";

const modes = [
  {
    href: "/fridge",
    icon: "🥕",
    title: "냉장고 털기",
    subtitle: "있는 재료로 뚝딱!",
    description: "냉장고에 남은 재료를 입력하면 레시피를 추천해줘요",
    gradient: "from-peach-100 to-pink-100",
    border: "border-pink-200",
    iconBg: "bg-peach-200",
  },
  {
    href: "/shopping",
    icon: "🛒",
    title: "스마트 장보기",
    subtitle: "가성비 장보기 플랜",
    description: "예산별 장보기 리스트부터 소분, 냉동 보관까지",
    gradient: "from-mint-100 to-sky-100",
    border: "border-mint-200",
    iconBg: "bg-mint-200",
  },
  {
    href: "/weekly",
    icon: "📅",
    title: "주간 밀프랩",
    subtitle: "한 번 만들고 쭉~ 먹기",
    description: "일요일에 만들어두면 평일은 전자레인지만!",
    gradient: "from-lavender-100 to-pink-100",
    border: "border-lavender-200",
    iconBg: "bg-lavender-200",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-12 pb-6 px-4 text-center">
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

      {/* Mode Cards */}
      <section className="max-w-lg mx-auto px-4 pb-20 space-y-3">
        {modes.map((mode) => (
          <Link key={mode.href} href={mode.href}>
            <div
              className={`bg-gradient-to-r ${mode.gradient} ${mode.border} border rounded-3xl p-5 hover:shadow-cute-lg transition-all active:scale-[0.97] mb-3`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 ${mode.iconBg} rounded-2xl flex items-center justify-center text-2xl shrink-0`}
                >
                  {mode.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-txt-primary">
                      {mode.title}
                    </h2>
                    <span className="text-[10px] text-txt-muted bg-white/60 px-2 py-0.5 rounded-full">
                      {mode.subtitle}
                    </span>
                  </div>
                  <p className="text-xs text-txt-secondary mt-1">
                    {mode.description}
                  </p>
                </div>
                <span className="text-lavender-300 text-lg">&rarr;</span>
              </div>
            </div>
          </Link>
        ))}

        {/* Tagline */}
        <div className="text-center pt-4 pb-4">
          <p className="text-xs text-txt-light">
            매일 배달비 아끼고, 건강하게 먹자 &#10024;
          </p>
        </div>
      </section>
    </main>
  );
}
