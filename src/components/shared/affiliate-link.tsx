// 쿠팡 파트너스 트래킹 ID
export const COUPANG_PARTNER_ID = "AF0908324";

/**
 * 키워드로 쿠팡 검색 URL 생성 (파트너스 트래킹 코드 포함)
 */
export function buildCoupangSearchUrl(keyword: string): string {
  const q = encodeURIComponent(keyword.trim());
  return `https://www.coupang.com/np/search?q=${q}&channel=user&lptag=${COUPANG_PARTNER_ID}`;
}

interface AffiliateLinkProps {
  /** 검색 키워드 (재료명 등) */
  keyword: string;
  children: React.ReactNode;
  className?: string;
  /** AD 배지 표시 여부 (기본: true) */
  showBadge?: boolean;
}

/**
 * 쿠팡 파트너스 어필리에이트 링크
 * - sponsored/nofollow 관계 명시
 * - 새 탭 열림
 * - AD 배지 (공정위 표시 기준)
 */
export default function AffiliateLink({
  keyword,
  children,
  className,
  showBadge = true,
}: AffiliateLinkProps) {
  return (
    <a
      href={buildCoupangSearchUrl(keyword)}
      target="_blank"
      rel="noopener noreferrer sponsored nofollow"
      className={className}
    >
      {children}
      {showBadge && (
        <span
          className="inline-block ml-0.5 text-[9px] px-1 py-px rounded font-bold align-middle"
          style={{ background: "#FEF3C7", color: "#92400E" }}
        >
          AD
        </span>
      )}
    </a>
  );
}
