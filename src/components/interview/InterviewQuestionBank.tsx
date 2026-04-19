'use client';

import Link from 'next/link';
import { ChevronDown, ChevronsUp, RotateCcw, Search, Shuffle, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import type { Difficulty, InterviewQuestion } from '@/data/interview';

type DifficultyFilter = 'all' | Difficulty;

type StoredFilters = {
  topic?: string;
  diff?: DifficultyFilter;
  search?: string;
};

type FilterState = {
  topic: string;
  diff: DifficultyFilter;
  search: string;
};

interface InterviewQuestionBankProps {
  questions: InterviewQuestion[];
}

const STORAGE_KEY = 'interview_qas_filters_v1';
const DEFAULT_FILTERS: FilterState = { topic: 'All', diff: 'all', search: '' };
const SERVER_FILTER_SNAPSHOT = JSON.stringify(DEFAULT_FILTERS);

const difficultyLabels: Record<DifficultyFilter, string> = {
  all: 'All Levels',
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

const difficulties: DifficultyFilter[] = ['all', 'easy', 'medium', 'hard'];

function isDifficulty(value: unknown): value is DifficultyFilter {
  return value === 'all' || value === 'easy' || value === 'medium' || value === 'hard';
}

function safeParseFilters(value: string | null): StoredFilters {
  if (!value) return {};

  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object') return {};

    const input = parsed as Record<string, unknown>;
    return {
      topic: typeof input.topic === 'string' ? input.topic : undefined,
      diff: isDifficulty(input.diff) ? input.diff : undefined,
      search: typeof input.search === 'string' ? input.search : undefined,
    };
  } catch {
    return {};
  }
}

function safeParseSnapshot(value: string): StoredFilters {
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object') return {};

    const input = parsed as Record<string, unknown>;
    return {
      topic: typeof input.topic === 'string' ? input.topic : undefined,
      diff: isDifficulty(input.diff) ? input.diff : undefined,
      search: typeof input.search === 'string' ? input.search : undefined,
    };
  } catch {
    return {};
  }
}

function subscribeToFilterSource(onStoreChange: () => void) {
  window.addEventListener('popstate', onStoreChange);
  window.addEventListener('storage', onStoreChange);

  return () => {
    window.removeEventListener('popstate', onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
}

function getBrowserFilterSnapshot() {
  const stored = safeParseFilters(localStorage.getItem(STORAGE_KEY));
  const params = new URLSearchParams(window.location.search);
  const topic = params.get('topic') ?? stored.topic ?? DEFAULT_FILTERS.topic;
  const diff = params.get('diff') ?? stored.diff ?? DEFAULT_FILTERS.diff;
  const search = params.get('q') ?? params.get('search') ?? stored.search ?? DEFAULT_FILTERS.search;

  return JSON.stringify({ topic, diff, search });
}

function getServerFilterSnapshot() {
  return SERVER_FILTER_SNAPSHOT;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSearchTokens(search: string) {
  return Array.from(new Set(search.trim().toLowerCase().split(/\s+/).filter(Boolean)));
}

function highlightText(text: string, tokens: string[]) {
  if (tokens.length === 0) return text;

  const escaped = tokens.map(escapeRegExp).filter(Boolean);
  if (escaped.length === 0) return text;

  const tokenSet = new Set(tokens);
  const parts = text.split(new RegExp(`(${escaped.join('|')})`, 'ig'));
  if (parts.length === 1) return text;

  return parts.map((part, index) =>
    tokenSet.has(part.toLowerCase()) ? (
      <mark key={`${part}-${index}`} className="interview-mark">
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

function getQuestionHref(question: InterviewQuestion) {
  if (!question.topicSlug || !question.conceptId) return null;
  return `/${question.topicSlug}#${question.conceptId}`;
}

export default function InterviewQuestionBank({ questions }: InterviewQuestionBankProps) {
  const [filters, setFilters] = useState<FilterState | null>(null);
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const filterSnapshot = useSyncExternalStore(
    subscribeToFilterSource,
    getBrowserFilterSnapshot,
    getServerFilterSnapshot,
  );

  const topicOptions = useMemo(() => {
    const counts = new Map<string, number>();

    for (const question of questions) {
      counts.set(question.topic, (counts.get(question.topic) ?? 0) + 1);
    }

    return [
      { label: 'All', count: questions.length },
      ...Array.from(counts, ([label, count]) => ({ label, count })),
    ];
  }, [questions]);

  const topicByParam = useMemo(() => {
    const lookup = new Map<string, string>();

    for (const option of topicOptions) {
      lookup.set(option.label.toLowerCase(), option.label);
    }

    for (const question of questions) {
      lookup.set(question.topicSlug.toLowerCase(), question.topic);
    }

    return lookup;
  }, [questions, topicOptions]);

  const difficultyCounts = useMemo(
    () =>
      questions.reduce(
        (counts, question) => {
          counts[question.difficulty] += 1;
          return counts;
        },
        { easy: 0, medium: 0, hard: 0 } as Record<Difficulty, number>,
      ),
    [questions],
  );

  const initialFilters = useMemo(() => {
    const parsed = safeParseSnapshot(filterSnapshot);
    const topic = parsed.topic ? topicByParam.get(parsed.topic.trim().toLowerCase()) ?? 'All' : 'All';
    const diff = isDifficulty(parsed.diff) ? parsed.diff : 'all';
    const searchValue = typeof parsed.search === 'string' ? parsed.search : '';

    return { topic, diff, search: searchValue };
  }, [filterSnapshot, topicByParam]);

  const activeFilters = filters ?? initialFilters;
  const topicFilter = activeFilters.topic;
  const diffFilter = activeFilters.diff;
  const search = activeFilters.search;
  const searchTokens = useMemo(() => getSearchTokens(search), [search]);

  const filtered = useMemo(
    () =>
      questions.filter((question) => {
        const matchesTopic = topicFilter === 'All' || question.topic === topicFilter;
        const matchesDifficulty = diffFilter === 'all' || question.difficulty === diffFilter;
        const haystack = [
          question.topic,
          question.sectionTitle,
          question.conceptTitle,
          question.question,
          question.answer,
          ...question.tags,
        ]
          .join(' ')
          .toLowerCase();
        const matchesSearch = searchTokens.length === 0 || searchTokens.every((token) => haystack.includes(token));

        return matchesTopic && matchesDifficulty && matchesSearch;
      }),
    [diffFilter, questions, searchTokens, topicFilter],
  );

  const hasActiveFilters = topicFilter !== 'All' || diffFilter !== 'all' || searchTokens.length > 0;

  useEffect(() => {
    const scrollToQuestionBank = () => {
      if (window.location.hash !== '#master-questions') return;

      requestAnimationFrame(() => {
        document.getElementById('master-questions')?.scrollIntoView({ block: 'start' });
      });
    };

    scrollToQuestionBank();
    window.addEventListener('hashchange', scrollToQuestionBank);

    return () => window.removeEventListener('hashchange', scrollToQuestionBank);
  }, []);

  useEffect(() => {
    if (!filters) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } catch {}
  }, [filters]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable;

      if (!isTyping && (event.key === '/' || (event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey)))) {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.key === 'Escape') {
        if (search) {
          setFilters((current) => ({ ...(current ?? activeFilters), search: '' }));
          setOpenQuestionId(null);
        } else if (openQuestionId) {
          setOpenQuestionId(null);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeFilters, openQuestionId, search]);

  const updateFilters = (updater: (current: FilterState) => FilterState) => {
    setFilters((current) => updater(current ?? activeFilters));
    setOpenQuestionId(null);
  };

  const clearAll = () => {
    setFilters(DEFAULT_FILTERS);
    setOpenQuestionId(null);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const randomQuestion = () => {
    if (filtered.length === 0) return;

    const question = filtered[Math.floor(Math.random() * filtered.length)];
    setOpenQuestionId(question.id);

    requestAnimationFrame(() => {
      document.getElementById(`question-${question.id}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <section id="master-questions" className="interview-bank anchor" aria-labelledby="interview-bank-title">
      <div className="interview-section-heading">
        <div>
          <p className="interview-eyebrow">Question Bank</p>
          <h2 id="interview-bank-title">Practice By Topic</h2>
        </div>
        <div className="interview-result-count" aria-live="polite">
          {filtered.length} of {questions.length}
        </div>
      </div>

      <div className="interview-toolbar">
        <div className="interview-topic-strip" aria-label="Filter by topic">
          {topicOptions.map((topic) => (
            <button
              key={topic.label}
              type="button"
              className="interview-chip"
              data-active={topicFilter === topic.label}
              aria-pressed={topicFilter === topic.label}
              onClick={() => {
                updateFilters((current) => ({ ...current, topic: topic.label }));
              }}
            >
              <span>{topic.label}</span>
              <span className="interview-chip-count">{topic.count}</span>
            </button>
          ))}
        </div>

        <div className="interview-filter-row">
          <div className="interview-segmented" aria-label="Filter by difficulty">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                type="button"
                className="interview-segment"
                data-active={diffFilter === difficulty}
                aria-pressed={diffFilter === difficulty}
                onClick={() => {
                  updateFilters((current) => ({ ...current, diff: difficulty }));
                }}
              >
                <span>{difficultyLabels[difficulty]}</span>
                {difficulty !== 'all' ? (
                  <span className="interview-chip-count">{difficultyCounts[difficulty]}</span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="interview-bank-search">
            <Search aria-hidden="true" size={18} className="interview-search-icon" />
            <input
              ref={searchRef}
              type="search"
              className="interview-bank-search-input"
              placeholder="Search questions, answers, tags..."
              value={search}
              onChange={(event) => {
                updateFilters((current) => ({ ...current, search: event.target.value }));
              }}
              aria-label="Search interview questions"
            />
            {search ? (
              <button
                type="button"
                className="interview-search-clear-btn"
                onClick={() => {
                  updateFilters((current) => ({ ...current, search: '' }));
                  searchRef.current?.focus();
                }}
                aria-label="Clear search"
                title="Clear search"
              >
                <X aria-hidden="true" size={16} />
              </button>
            ) : null}
          </div>

          <div className="interview-actions">
            <button
              type="button"
              className="interview-action"
              onClick={randomQuestion}
              disabled={filtered.length === 0}
              title="Pick a random question"
            >
              <Shuffle aria-hidden="true" size={16} />
              Random
            </button>
            <button
              type="button"
              className="interview-action"
              onClick={() => setOpenQuestionId(null)}
              disabled={!openQuestionId}
              title="Collapse open answer"
            >
              <ChevronsUp aria-hidden="true" size={16} />
              Collapse
            </button>
            <button
              type="button"
              className="interview-action"
              onClick={clearAll}
              disabled={!hasActiveFilters}
              title="Clear filters"
            >
              <RotateCcw aria-hidden="true" size={16} />
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="interview-question-list">
        {filtered.map((question) => {
          const isOpen = openQuestionId === question.id;
          const sourceHref = getQuestionHref(question);

          return (
            <article
              key={question.id}
              id={`question-${question.id}`}
              className="interview-question-card anchor"
              data-open={isOpen}
            >
              <button
                type="button"
                className="interview-question-trigger"
                aria-expanded={isOpen}
                aria-controls={`answer-${question.id}`}
                onClick={() => setOpenQuestionId(isOpen ? null : question.id)}
              >
                <span className="interview-question-main">
                  <span className="interview-question-meta">
                    <span>{question.topic}</span>
                    <span className={`interview-difficulty interview-difficulty-${question.difficulty}`}>
                      {difficultyLabels[question.difficulty]}
                    </span>
                  </span>
                  <span className="interview-question-title">{highlightText(question.question, searchTokens)}</span>
                  <span className="interview-question-source">
                    {question.conceptTitle} / {question.sectionTitle}
                  </span>
                </span>
                <span className="interview-question-icon" aria-hidden="true">
                  <ChevronDown size={18} />
                </span>
              </button>

              {isOpen ? (
                <div id={`answer-${question.id}`} className="interview-answer">
                  <p>{highlightText(question.answer, searchTokens)}</p>
                  {sourceHref ? (
                    <Link href={sourceHref} className="interview-source-link">
                      Review related concept
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </article>
          );
        })}

        {filtered.length === 0 ? (
          <div className="interview-empty">
            <p>No questions match the current filters.</p>
            <button type="button" className="interview-empty-action" onClick={clearAll}>
              Clear filters
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
