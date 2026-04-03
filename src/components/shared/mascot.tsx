interface MascotProps {
  size?: number;
  expression?: "happy" | "cooking" | "thinking" | "wink" | "love";
  className?: string;
}

export default function Mascot({
  size = 120,
  expression = "happy",
  className = "",
}: MascotProps) {
  const eyes = {
    happy: (
      <>
        {/* 웃는 눈 (^ ^) */}
        <path d="M34 42 Q37 38 40 42" stroke="#3D3044" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M56 42 Q59 38 62 42" stroke="#3D3044" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </>
    ),
    cooking: (
      <>
        {/* 집중 눈 */}
        <circle cx="37" cy="40" r="3" fill="#3D3044" />
        <circle cx="59" cy="40" r="3" fill="#3D3044" />
        <circle cx="38.5" cy="39" r="1" fill="white" />
        <circle cx="60.5" cy="39" r="1" fill="white" />
      </>
    ),
    thinking: (
      <>
        {/* 생각하는 눈 */}
        <circle cx="37" cy="40" r="3" fill="#3D3044" />
        <circle cx="59" cy="40" r="3" fill="#3D3044" />
        <circle cx="38.5" cy="39" r="1" fill="white" />
        <circle cx="60.5" cy="39" r="1" fill="white" />
        {/* 물음표 */}
        <text x="72" y="30" fontSize="12" fill="#A78BFA" fontWeight="bold">?</text>
      </>
    ),
    wink: (
      <>
        {/* 윙크 */}
        <path d="M34 42 Q37 38 40 42" stroke="#3D3044" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="59" cy="40" r="3" fill="#3D3044" />
        <circle cx="60.5" cy="39" r="1" fill="white" />
      </>
    ),
    love: (
      <>
        {/* 하트 눈 */}
        <path d="M33 39 Q34 36 37 39 Q40 36 41 39 Q41 42 37 45 Q33 42 33 39Z" fill="#FF6BAD" />
        <path d="M55 39 Q56 36 59 39 Q62 36 63 39 Q63 42 59 45 Q55 42 55 39Z" fill="#FF6BAD" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 몸통 - 둥근 얼음 큐브 */}
      <rect x="18" y="24" rx="16" ry="16" width="60" height="56" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="2" />

      {/* 반짝이 하이라이트 */}
      <rect x="26" y="32" rx="3" ry="3" width="8" height="12" fill="white" opacity="0.6" />
      <rect x="28" y="48" rx="2" ry="2" width="4" height="6" fill="white" opacity="0.4" />

      {/* 볼터치 */}
      <ellipse cx="30" cy="52" rx="6" ry="4" fill="#FFC2DD" opacity="0.5" />
      <ellipse cx="66" cy="52" rx="6" ry="4" fill="#FFC2DD" opacity="0.5" />

      {/* 눈 */}
      {eyes[expression]}

      {/* 입 */}
      <path d="M43 54 Q48 59 53 54" stroke="#3D3044" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* 요리사 모자 */}
      <ellipse cx="48" cy="20" rx="20" ry="10" fill="white" stroke="#DDD0FF" strokeWidth="1.5" />
      <rect x="38" y="16" rx="8" ry="8" width="20" height="12" fill="white" stroke="#DDD0FF" strokeWidth="1.5" />
      <circle cx="48" cy="14" r="6" fill="white" stroke="#DDD0FF" strokeWidth="1.5" />

      {/* 팔 */}
      <path d="M18 50 Q10 48 8 54 Q6 60 12 58" stroke="#BAE6FD" strokeWidth="3" fill="#E0F2FE" strokeLinecap="round" />
      <path d="M78 50 Q86 48 88 54 Q90 60 84 58" stroke="#BAE6FD" strokeWidth="3" fill="#E0F2FE" strokeLinecap="round" />

      {/* 다리 */}
      <rect x="32" y="78" rx="4" ry="4" width="12" height="8" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="1.5" />
      <rect x="52" y="78" rx="4" ry="4" width="12" height="8" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="1.5" />
    </svg>
  );
}
