'use client';

import { useId, useState } from 'react';

interface QuestionAccordionProps {
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  code?: string;
}

const difficultyStyles: Record<QuestionAccordionProps['difficulty'], string> = {
  easy: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-200',
  medium: 'border-amber-300/20 bg-amber-300/10 text-amber-100',
  hard: 'border-rose-300/20 bg-rose-300/10 text-rose-100',
};

export default function QuestionAccordion({ question, answer, difficulty, code }: QuestionAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div
      className={`glass-card overflow-hidden border transition-all duration-300 ${
        isOpen ? 'border-white/[0.18] shadow-[0_26px_60px_rgba(2,8,14,0.36)]' : 'border-white/10'
      }`}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left md:p-6"
      >
        <div className="flex flex-col gap-3">
          <span
            className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] ${difficultyStyles[difficulty]}`}
          >
            {difficulty}
          </span>
          <h4 className="font-syne text-lg leading-snug text-[var(--text-primary)] md:text-xl">{question}</h4>
        </div>

        <span
          aria-hidden="true"
          className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg font-bold text-[var(--text-primary)] transition-transform duration-300"
        >
          {isOpen ? '-' : '+'}
        </span>
      </button>

      <div
        id={panelId}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[2000px] border-t border-white/10' : 'max-h-0'
        }`}
      >
        <div className="space-y-5 p-6 md:p-8">
          <div className="prose prose-invert max-w-none text-sm leading-7 text-[var(--text-secondary)] prose-headings:text-[var(--text-primary)] prose-li:marker:text-[var(--text-accent)] prose-strong:text-[var(--text-primary)]">
            <div dangerouslySetInnerHTML={{ __html: answer }} />
          </div>

          {code ? (
            <div className="relative">
              <div className="absolute right-0 top-0 rounded-bl-2xl border-b border-l border-white/10 bg-[rgba(7,17,28,0.92)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Answer flow
              </div>
              <pre className="!mt-0">
                <code>{code}</code>
              </pre>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
