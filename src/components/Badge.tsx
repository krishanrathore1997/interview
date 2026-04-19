interface BadgeProps {
  text: string;
  color?: string;
  variant?: 'solid' | 'outline' | 'glass';
}

export default function Badge({ text, color, variant = 'glass' }: BadgeProps) {
  const className =
    variant === 'solid'
      ? 'border-transparent text-[#07111b]'
      : variant === 'outline'
        ? 'bg-transparent'
        : 'border-white/10 bg-white/[0.06] text-[var(--text-secondary)]';

  const style =
    variant === 'solid'
      ? {
          backgroundColor: color ?? 'var(--text-primary)',
          color: '#07111b',
        }
      : variant === 'outline'
        ? {
            borderColor: color ?? 'rgba(255,255,255,0.22)',
            color: color ?? 'var(--text-primary)',
          }
        : undefined;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:shadow-lg active:scale-95 ${className}`}
      style={style}
    >
      {text}
    </span>
  );
}
