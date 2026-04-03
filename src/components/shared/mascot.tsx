interface MascotProps {
  size?: number;
  className?: string;
}

export default function Mascot({ size = 64, className = "" }: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* body */}
      <rect x="12" y="18" width="40" height="36" rx="12" fill="#EDE8FF" stroke="#D5D5E8" strokeWidth="1.5" />
      {/* shine */}
      <rect x="18" y="24" width="5" height="10" rx="2.5" fill="white" opacity="0.7" />
      {/* cheeks */}
      <circle cx="22" cy="40" r="4" fill="#FFF0F5" />
      <circle cx="42" cy="40" r="4" fill="#FFF0F5" />
      {/* eyes */}
      <path d="M24 36 Q26.5 33 29 36" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M35 36 Q37.5 33 40 36" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* mouth */}
      <path d="M28 43 Q32 46 36 43" stroke="#1A1A2E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* chef hat */}
      <ellipse cx="32" cy="15" rx="14" ry="7" fill="white" stroke="#D5D5E8" strokeWidth="1.5" />
      <circle cx="32" cy="10" r="5" fill="white" stroke="#D5D5E8" strokeWidth="1.5" />
      {/* feet */}
      <rect x="20" y="53" width="10" height="5" rx="2.5" fill="#EDE8FF" stroke="#D5D5E8" strokeWidth="1" />
      <rect x="34" y="53" width="10" height="5" rx="2.5" fill="#EDE8FF" stroke="#D5D5E8" strokeWidth="1" />
    </svg>
  );
}
