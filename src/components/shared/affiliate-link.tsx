interface AffiliateLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function AffiliateLink({
  href,
  children,
  className,
}: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={className}
    >
      {children}
      <span className="inline-block ml-1 text-[9px] px-1 py-0.5 rounded bg-primary-50 text-primary-400 align-middle">
        AD
      </span>
    </a>
  );
}
