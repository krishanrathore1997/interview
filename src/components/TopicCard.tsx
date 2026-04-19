import Link from 'next/link';

interface TopicCardProps {
  title: string;
  description: string;
  icon?: string;
  category?: string;
  href?: string;
  ctaLabel?: string;
}

export default function TopicCard({
  title,
  description,
  icon,
  category,
  href,
  ctaLabel = 'Open track',
}: TopicCardProps) {
  const cardContent = (
    <article className="glass-card group flex h-full flex-col gap-6 overflow-hidden p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_45px_100px_rgba(2,8,14,0.6)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] font-syne text-sm font-bold tracking-[0.16em] text-[var(--text-accent-soft)] transition-all duration-500 group-hover:border-[var(--text-accent)]/40 group-hover:bg-[var(--text-accent)]/10 group-hover:text-[var(--text-primary)] group-hover:shadow-[0_0_20px_rgba(255,133,82,0.15)]">
          {icon ?? title.slice(0, 2).toUpperCase()}
        </div>
        {category ? (
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {category}
          </span>
        ) : null}
      </div>

      <div className="space-y-3">
        <h3 className="font-syne text-xl text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--text-accent-soft)]">
          {title}
        </h3>
        <p className="text-sm leading-7 text-[var(--text-secondary)]">{description}</p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--text-primary)]">
        <span>{ctaLabel}</span>
        <span aria-hidden="true">-&gt;</span>
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
