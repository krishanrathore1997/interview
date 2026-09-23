'use client';

import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'skills_progress_v1';

export type ProgressMap = Record<string, Record<string, true>>;

type Listener = () => void;
const listeners = new Set<Listener>();

function emitChange() {
  for (const listener of listeners) listener();
}

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

let cachedRaw: string | null = null;
let cachedSnapshot: ProgressMap = {};

function readSnapshot(): ProgressMap {
  if (typeof window === 'undefined') return cachedSnapshot;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSnapshot = safeParseProgress(raw);
  }
  return cachedSnapshot;
}

function writeSnapshot(next: ProgressMap) {
  cachedRaw = JSON.stringify(next);
  cachedSnapshot = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, cachedRaw);
  } catch {
    // storage unavailable (private mode, quota) — keep in-memory state only
  }
  emitChange();
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function getServerSnapshot(): ProgressMap {
  return {};
}

/**
 * Shared localStorage-backed "done" tracker for skill concepts, used by both
 * the per-concept card and the /checklist page so they always agree and stay
 * in sync across every open instance (and other tabs, via the storage event).
 */
export function useSkillsProgress() {
  const progress = useSyncExternalStore(subscribe, readSnapshot, getServerSnapshot);

  const setConceptDone = useCallback((topicSlug: string, conceptId: string, done: boolean) => {
    const current = readSnapshot();
    const topicMap = { ...(current[topicSlug] ?? {}) };

    if (done) {
      topicMap[conceptId] = true;
    } else {
      delete topicMap[conceptId];
    }

    const next: ProgressMap = { ...current };
    if (Object.keys(topicMap).length === 0) {
      delete next[topicSlug];
    } else {
      next[topicSlug] = topicMap;
    }

    writeSnapshot(next);
  }, []);

  const toggleConcept = useCallback(
    (topicSlug: string, conceptId: string) => {
      const isDone = !!readSnapshot()[topicSlug]?.[conceptId];
      setConceptDone(topicSlug, conceptId, !isDone);
    },
    [setConceptDone],
  );

  const clearProgress = useCallback(() => {
    writeSnapshot({});
  }, []);

  return { progress, toggleConcept, setConceptDone, clearProgress };
}
