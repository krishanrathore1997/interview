'use client';

import { useState } from 'react';
import type { SkillConcept, SkillTopic } from '@/data/skills';
import type { SkillExample, SkillCodeSample, SkillInterviewQuestion } from '@/data/types';
import { useSkillsProgress } from '@/lib/useSkillsProgress';
import { topicSlugs } from '@/lib/topicSlugs';
import CodeBlock from '@/components/CodeBlock';

interface Props {
  concept: SkillConcept;
  topic: SkillTopic;
}

export default function SkillConceptCard({ concept, topic }: Props) {
  const [openQIdx, setOpenQIdx] = useState<number | null>(null);
  const { progress, toggleConcept } = useSkillsProgress();

  const topicSlug = topicSlugs[topic];
  const isDone = !!progress[topicSlug]?.[concept.id];

  const toggleDone = () => toggleConcept(topicSlug, concept.id);

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
      {concept.examples?.map((ex: SkillExample, i: number) => (
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
      {concept.codeSamples?.map((cs: SkillCodeSample, i: number) => (
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
              {concept.interviewQuestions.map((iq: SkillInterviewQuestion, i: number) => (
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
