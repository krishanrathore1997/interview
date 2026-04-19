'use client';

import { useEffect, useMemo, useState } from 'react';
import type { SkillConcept, SkillTopic } from '@/data/skills';

interface Props {
  concept: SkillConcept;
  topic: SkillTopic;
}

const STORAGE_KEY = 'skills_progress_v1';

type ProgressMap = Record<string, Record<string, true>>;

const slugByTopic: Record<SkillTopic, string> = {
  Laravel: 'laravel',
  PHP: 'php',
  'HTML & CSS': 'html-css',
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  React: 'react',
  MySQL: 'sql',
  'HTTP & APIs': 'apis',
  Security: 'security',
  Testing: 'testing',
  'Next.js': 'nextjs',
  Git: 'git',
  'System Design': 'system-design',
  DevOps: 'devops',
};

function safeParseProgress(raw: string | null): ProgressMap {
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    const obj = parsed as Record<string, unknown>;
    const result: ProgressMap = {};

    for (const [topicSlug, value] of Object.entries(obj)) {
      if (!value || typeof value !== 'object') continue;
      const conceptMap = value as Record<string, unknown>;
      const out: Record<string, true> = {};
      for (const [conceptId, done] of Object.entries(conceptMap)) {
        if (done === true) out[conceptId] = true;
      }
      if (Object.keys(out).length > 0) result[topicSlug] = out;
    }

    return result;
  } catch {
    return {};
  }
}

export default function SkillConceptCard({ concept, topic }: Props) {
  const [openQIdx, setOpenQIdx] = useState<number | null>(null);
  const [isDone, setIsDone] = useState(false);

  const topicSlug = useMemo(() => slugByTopic[topic], [topic]);

  useEffect(() => {
    try {
      const parsed = safeParseProgress(localStorage.getItem(STORAGE_KEY));
      setIsDone(!!parsed[topicSlug]?.[concept.id]);
    } catch {}
  }, [topicSlug, concept.id]);

  const toggleDone = () => {
    setIsDone((prev) => {
      const nextDone = !prev;

      try {
        const parsed = safeParseProgress(localStorage.getItem(STORAGE_KEY));
        const next: ProgressMap = { ...parsed };
        const nextTopic = { ...(next[topicSlug] ?? {}) };

        if (nextDone) {
          nextTopic[concept.id] = true;
        } else {
          delete nextTopic[concept.id];
        }

        if (Object.keys(nextTopic).length === 0) {
          delete next[topicSlug];
        } else {
          next[topicSlug] = nextTopic;
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}

      return nextDone;
    });
  };

  return (
    <div id={concept.id} className="concept-card anchor">
      {/* Title */}
      <div className="concept-card-header">
        <div className="concept-card-title">{concept.title}</div>
        <button
          type="button"
          className={`concept-done-btn${isDone ? ' done' : ''}`}
          aria-pressed={isDone}
          onClick={toggleDone}
        >
          {isDone ? '✓ Done' : 'Mark done'}
        </button>
      </div>

      {/* Summary */}
      <p className="concept-card-summary">{concept.summary}</p>

      {/* Key Notes */}
      {concept.advancedNotes && concept.advancedNotes.length > 0 && (
        <ul className="notes-list" style={{ marginBottom: '1rem' }}>
          {concept.advancedNotes.map((note: string, i: number) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      )}

      {/* Examples with code */}
      {concept.examples?.map((ex: any, i: number) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            {ex.title}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: ex.codeSample ? '0.5rem' : 0 }}>
            {ex.description}
          </div>
          {ex.codeSample && (
            <CodeBlock code={ex.codeSample.code} language={ex.codeSample.language} label={ex.codeSample.label} />
          )}
        </div>
      ))}

      {/* Extra code samples */}
      {concept.codeSamples?.map((cs: any, i: number) => (
        <CodeBlock key={i} code={cs.code} language={cs.language} label={cs.label} />
      ))}

      {/* Pitfalls */}
      {concept.pitfalls && concept.pitfalls.length > 0 && (
        <div className="pitfall-box">
          <div className="pitfall-box-title">⚠ Common Pitfalls</div>
          <ul>
            {concept.pitfalls.map((p: string, i: number) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}

      {/* Interview Q&A */}
        {concept.interviewQuestions && concept.interviewQuestions.length > 0 && (
          <div>
            <div className="label" style={{ marginBottom: '0.5rem' }}>Interview Questions</div>
            <div className="qa-list">
              {concept.interviewQuestions.map((iq: any, i: number) => (
                <div key={i} className="qa-item" data-open={openQIdx === i}>
                  <button
                    type="button"
                    className="qa-question"
                    aria-expanded={openQIdx === i}
                    aria-controls={`${concept.id}-qa-${i}`}
                    onClick={() => setOpenQIdx(openQIdx === i ? null : i)}
                  >
                    <span className="qa-left">
                      <span className="qa-question-prefix">Q</span>
                      <span className="qa-question-text">{iq.question}</span>
                    </span>
                    <span className="qa-right">
                      <svg
                        className={`qa-chevron${openQIdx === i ? ' open' : ''}`}
                        width="14" height="14" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                  {openQIdx === i && (
                    <div id={`${concept.id}-qa-${i}`} className="qa-answer">{iq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────
   Inline CodeBlock (no external package needed)
──────────────────────────────────────────── */
function CodeBlock({ code, language, label }: { code: string; language: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-lang">{label ?? language}</span>
        <button type="button" className="code-copy-btn" onClick={copy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="code-content">{code}</pre>
    </div>
  );
}
