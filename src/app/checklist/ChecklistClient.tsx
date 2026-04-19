'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChecklistTopicData } from './types';

const STORAGE_KEY = 'skills_progress_v1';

type ProgressMap = Record<string, Record<string, true>>;

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

function isTypingTarget(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable;
}

export default function ChecklistClient({ topics }: { topics: ChecklistTopicData[] }) {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [search, setSearch] = useState('');
  const [onlyRemaining, setOnlyRemaining] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const searchRef = useRef<HTMLInputElement>(null);
  const hasLoaded = useRef(false);

  const searchTokens = search.trim().toLowerCase().split(/\s+/).filter(Boolean);

  useEffect(() => {
    setProgress(safeParseProgress(localStorage.getItem(STORAGE_KEY)));
    hasLoaded.current = true;
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {}
  }, [progress]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;

      if (e.key === '/' || (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey))) {
        e.preventDefault();
        searchRef.current?.focus();
      }

      if (e.key === 'Escape' && search) {
        setSearch('');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [search]);

  const totals = useMemo(() => {
    let totalConcepts = 0;
    let doneConcepts = 0;

    for (const topic of topics) {
      for (const section of topic.sections) {
        for (const concept of section.concepts) {
          totalConcepts += 1;
          if (progress[topic.slug]?.[concept.id]) doneConcepts += 1;
        }
      }
    }

    return { totalConcepts, doneConcepts };
  }, [topics, progress]);

  const completionPct = totals.totalConcepts === 0 ? 0 : Math.round((totals.doneConcepts / totals.totalConcepts) * 100);

  const filteredTopics = useMemo(() => {
    const matchesTokens = (haystack: string) =>
      searchTokens.length === 0 || searchTokens.every((t) => haystack.includes(t));

    return topics
      .map((topic) => {
        const topicHaystack = `${topic.topic} ${topic.title} ${topic.subtitle}`.toLowerCase();
        const topicMatches = matchesTokens(topicHaystack);

        const sections = topic.sections
          .map((section) => {
            const sectionHaystack = `${section.title}`.toLowerCase();
            const sectionMatches = topicMatches || matchesTokens(sectionHaystack);

            const concepts = section.concepts.filter((concept) => {
              const done = !!progress[topic.slug]?.[concept.id];
              if (onlyRemaining && done) return false;
              const conceptHaystack = `${concept.title} ${concept.level ?? ''}`.toLowerCase();
              return sectionMatches || matchesTokens(conceptHaystack);
            });

            if (!sectionMatches && concepts.length === 0) return null;
            return { ...section, concepts };
          })
          .filter(Boolean) as ChecklistTopicData['sections'];

        if (!topicMatches && sections.length === 0) return null;
        return { ...topic, sections };
      })
      .filter(Boolean) as ChecklistTopicData[];
  }, [topics, searchTokens, onlyRemaining, progress, search]);

  const toggleConcept = (topicSlug: string, conceptId: string) => {
    setProgress((prev) => {
      const next: ProgressMap = { ...prev };
      const topicMap = { ...(next[topicSlug] ?? {}) };
      const isDone = !!topicMap[conceptId];

      if (isDone) {
        delete topicMap[conceptId];
      } else {
        topicMap[conceptId] = true;
      }

      if (Object.keys(topicMap).length === 0) {
        delete next[topicSlug];
      } else {
        next[topicSlug] = topicMap;
      }

      return next;
    });
  };

  const clearProgress = () => {
    setProgress({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const toggleTopic = (slug: string) => setCollapsed((prev) => ({ ...prev, [slug]: !prev[slug] }));

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <div className="page-header-tag">
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--clr-interview)', display: 'inline-block' }} />
          Checklist
        </div>
        <h1>Skills Checklist</h1>
        <p>
          Track every concept one-by-one across all skill pages. Use search, mark concepts as done, and jump directly to the exact section in the docs.
        </p>
        <div className="page-meta">
          <span className="page-meta-item">
            <span className="page-meta-dot" />
            {topics.length} Topics
          </span>
          <span className="page-meta-item">
            <span className="page-meta-dot" />
            {totals.doneConcepts}/{totals.totalConcepts} Done ({completionPct}%)
          </span>
        </div>
      </div>

      <div id="checklist-topics" className="checklist-controls anchor">
        <div className="checklist-controls-row">
          <div className="checklist-search">
            <input
              ref={searchRef}
              type="text"
              className="checklist-search-input"
              placeholder="Search concepts... ( / or Ctrl+K )"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button type="button" className="checklist-search-clear" onClick={() => setSearch('')} aria-label="Clear search">
                ×
              </button>
            )}
          </div>

          <label className="checklist-toggle">
            <input
              type="checkbox"
              checked={onlyRemaining}
              onChange={(e) => setOnlyRemaining(e.target.checked)}
            />
            <span>Only remaining</span>
          </label>

          <div className="checklist-actions">
            <button type="button" className="interview-action-btn" onClick={clearProgress}>
              Reset progress
            </button>
            <Link href="/interview" className="interview-action-btn">
              Open question bank →
            </Link>
          </div>
        </div>

        <div className="checklist-progress">
          <div className="checklist-bar" role="progressbar" aria-valuenow={completionPct} aria-valuemin={0} aria-valuemax={100}>
            <div className="checklist-bar-fill" style={{ width: `${completionPct}%` }} />
          </div>
          <div className="checklist-progress-text">
            {completionPct}% complete
          </div>
        </div>
      </div>

      {filteredTopics.length === 0 ? (
        <div className="checklist-empty">
          No results for “{search}”.
          <button type="button" onClick={() => setSearch('')} className="checklist-empty-action">
            Clear search
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredTopics.map((topic) => {
            const open = searchTokens.length > 0 ? true : !collapsed[topic.slug];

            const topicTotals = topic.sections.reduce((acc, section) => acc + section.concepts.length, 0);
            const topicDone = topic.sections.reduce(
              (acc, section) =>
                acc + section.concepts.reduce((b, c) => b + (progress[topic.slug]?.[c.id] ? 1 : 0), 0),
              0
            );

            return (
              <section key={topic.slug} id={`checklist-${topic.slug}`} className="content-section anchor">
                <div className="section-heading checklist-topic-heading">
                  <button type="button" className="checklist-topic-toggle" onClick={() => toggleTopic(topic.slug)} aria-expanded={open}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  <div style={{ minWidth: 0 }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <Link href={`/${topic.slug}`} className="checklist-topic-link">
                        {topic.topic}
                      </Link>
                      <span className="checklist-topic-count">{topicDone}/{topicTotals}</span>
                    </h2>
                    <p>{topic.subtitle}</p>
                  </div>

                  <div className="checklist-topic-actions">
                    <Link href={`/${topic.slug}`} className="topic-pill">
                      Open topic →
                    </Link>
                  </div>
                </div>

                {open && (
                  <div className="checklist-topic-body">
                    {topic.sections.map((section) => {
                      const sectionTotal = section.concepts.length;
                      const sectionDone = section.concepts.reduce((acc, c) => acc + (progress[topic.slug]?.[c.id] ? 1 : 0), 0);

                      return (
                        <div key={section.id} className="checklist-section">
                          <div className="checklist-section-title" id={`checklist-${topic.slug}-${section.id}`}>
                            <span>{section.title}</span>
                            <span className="checklist-section-count">{sectionDone}/{sectionTotal}</span>
                          </div>

                          <div className="checklist-items">
                            {section.concepts.map((concept) => {
                              const done = !!progress[topic.slug]?.[concept.id];

                              return (
                                <div key={concept.id} className={`checklist-item${done ? ' done' : ''}`}>
                                  <button
                                    type="button"
                                    className="checklist-checkbox"
                                    aria-pressed={done}
                                    aria-label={done ? 'Mark as not done' : 'Mark as done'}
                                    onClick={() => toggleConcept(topic.slug, concept.id)}
                                  >
                                    {done ? '✓' : ''}
                                  </button>

                                  <div className="checklist-item-main">
                                    <div className="checklist-item-title">{concept.title}</div>
                                    <div className="checklist-item-meta">
                                      {concept.level && <span className="level-badge">{concept.level}</span>}
                                      <Link href={`/${topic.slug}#${concept.id}`} className="checklist-jump">
                                        Jump to concept →
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

