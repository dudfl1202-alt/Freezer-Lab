export default function AffiliateLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer sponsored" className={className}>
      {children}
      <span className="inline-block ml-0.5 text-[8px] px-1 py-px rounded bg-line text-t-caption font-semibold align-middle">AD</span>
    </a>
  );
}
