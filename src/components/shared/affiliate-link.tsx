interface AffiliateLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function AffiliateLink({ href, children, className }: AffiliateLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer sponsored" className={className}>
      {children}
      <span className="inline-block ml-0.5 text-[9px] px-1 py-px rounded bg-accent-light text-accent font-medium align-middle">
        AD
      </span>
    </a>
  );
}
