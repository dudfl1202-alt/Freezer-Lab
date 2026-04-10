/**
 * 쿠팡 파트너스 수수료 공지 (공정위 표시·광고의 공정화에 관한 법률 준수)
 *
 * 규정:
 * - "수수료를 제공받습니다" (확정형) 사용
 * - "받을 수 있음" 같은 불확실한 표현 금지
 * - 소비자가 명확히 인식 가능하도록 강조
 */

interface AffiliateDisclosureProps {
  /** prominent: 눈에 띄는 박스형 / inline: 작은 한 줄 */
  variant?: "prominent" | "inline";
  className?: string;
}

export default function AffiliateDisclosure({
  variant = "prominent",
  className = "",
}: AffiliateDisclosureProps) {
  if (variant === "inline") {
    return (
      <p
        className={`text-[11px] font-semibold leading-relaxed ${className}`}
        style={{ color: "#92400E" }}
      >
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
        제공받습니다.
      </p>
    );
  }

  return (
    <div
      className={`rounded-lg px-4 py-3 ${className}`}
      style={{
        background: "#FEF3C7",
        border: "1px solid #FCD34D",
      }}
    >
      <div className="flex items-start gap-2">
        <span
          className="shrink-0 inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-extrabold"
          style={{ background: "#92400E", color: "#FFFFFF" }}
        >
          광고
        </span>
        <p
          className="text-[12px] font-semibold leading-relaxed"
          style={{ color: "#78350F" }}
        >
          이 포스팅은 쿠팡 파트너스 활동의 일환으로,
          <br />
          이에 따른 일정액의 수수료를 제공받습니다.
        </p>
      </div>
    </div>
  );
}
