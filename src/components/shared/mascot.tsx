interface MascotProps {
  size?: number;
  className?: string;
}

export default function Mascot({ size = 40, className = "" }: MascotProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <rect x="6" y="10" width="28" height="24" rx="9" fill="#F0F7F4" stroke="#D4E8DC" strokeWidth="1" />
      <rect x="10" y="14" width="3.5" height="7" rx="1.75" fill="white" opacity="0.7" />
      <circle cx="16" cy="22" r="1.5" fill="#1A1A1A" />
      <circle cx="24" cy="22" r="1.5" fill="#1A1A1A" />
      <circle cx="16.7" cy="21.5" r="0.6" fill="white" />
      <circle cx="24.7" cy="21.5" r="0.6" fill="white" />
      <path d="M18 27 Q20 29 22 27" stroke="#1A1A1A" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <ellipse cx="12" cy="26" rx="3" ry="1.8" fill="#E8A87C" opacity="0.2" />
      <ellipse cx="28" cy="26" rx="3" ry="1.8" fill="#E8A87C" opacity="0.2" />
    </svg>
  );
}
