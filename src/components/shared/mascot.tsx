interface MascotProps {
  size?: number;
  className?: string;
  mood?: "default" | "happy" | "cook" | "sleep";
}

export default function Mascot({ size = 64, className = "", mood = "default" }: MascotProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* body - 통통한 사각 얼음 */}
      <rect x="14" y="22" width="52" height="46" rx="18" fill="#E8F8F2" />
      <rect x="14" y="22" width="52" height="46" rx="18" stroke="#C5EEE0" strokeWidth="1.5" />

      {/* 하이라이트 */}
      <rect x="22" y="30" width="7" height="14" rx="3.5" fill="white" opacity="0.8" />

      {/* 볼터치 */}
      <ellipse cx="26" cy="52" rx="6" ry="3.5" fill="#FF8FA3" opacity="0.25" />
      <ellipse cx="54" cy="52" rx="6" ry="3.5" fill="#FF8FA3" opacity="0.25" />

      {/* 눈 */}
      {mood === "happy" || mood === "cook" ? (
        <>
          <path d="M30 44 Q33 40 36 44" stroke="#191F28" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M44 44 Q47 40 50 44" stroke="#191F28" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : mood === "sleep" ? (
        <>
          <path d="M29 43 L37 43" stroke="#191F28" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M43 43 L51 43" stroke="#191F28" strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="33" cy="42" r="3" fill="#191F28" />
          <circle cx="47" cy="42" r="3" fill="#191F28" />
          <circle cx="34.2" cy="41" r="1.2" fill="white" />
          <circle cx="48.2" cy="41" r="1.2" fill="white" />
        </>
      )}

      {/* 입 */}
      {mood === "sleep" ? (
        <ellipse cx="40" cy="52" rx="2" ry="1.5" fill="#191F28" opacity="0.3" />
      ) : (
        <path d="M36 52 Q40 56 44 52" stroke="#191F28" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}

      {/* 요리사 모자 (cook 모드) */}
      {mood === "cook" && (
        <>
          <ellipse cx="40" cy="18" rx="16" ry="8" fill="white" stroke="#E5E8EB" strokeWidth="1.5" />
          <circle cx="40" cy="12" r="6" fill="white" stroke="#E5E8EB" strokeWidth="1.5" />
        </>
      )}

      {/* 왕관 (default/happy) */}
      {(mood === "default" || mood === "happy") && (
        <path d="M30 22 L33 14 L40 20 L47 14 L50 22" fill="#FFD43B" stroke="#FFD43B" strokeWidth="1" strokeLinejoin="round" />
      )}

      {/* 발 */}
      <ellipse cx="30" cy="69" rx="7" ry="4" fill="#E8F8F2" stroke="#C5EEE0" strokeWidth="1" />
      <ellipse cx="50" cy="69" rx="7" ry="4" fill="#E8F8F2" stroke="#C5EEE0" strokeWidth="1" />
    </svg>
  );
}
