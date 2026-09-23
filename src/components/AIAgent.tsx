'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import type { UIMessage } from 'ai';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type AgentMode = 'learn' | 'interview';

interface AIAgentProps {
  topic: string;
  mode?: AgentMode;
  conceptTitle?: string;
  conceptSummary?: string;
  starterPrompts?: string[];
  className?: string;
}

function getMessageText(message: UIMessage): string {
  const texts = message.parts
    .map((part) => {
      if (part.type === 'text') return part.text;
      if (part.type === 'reasoning') return part.text;
      return '';
    })
    .filter((value): value is string => Boolean(value));

  if (texts.length > 0) {
    return texts.join('\n').trim();
  }

  const legacyContent = (message as { content?: unknown }).content;
  return typeof legacyContent === 'string' ? legacyContent : '';
}

function createLearnStarter(topic: string, conceptTitle?: string, conceptSummary?: string): string {
  const title = conceptTitle ?? topic;
  const summary = conceptSummary ? ` Summary: ${conceptSummary}` : '';
  return `Teach me ${title} for a senior interview.${summary} Explain the core idea, give one practical example, and then ask me a follow-up question.`;
}

export default function AIAgent({
  topic,
  mode = 'interview',
  conceptTitle,
  conceptSummary,
  starterPrompts = [],
  className,
}: AIAgentProps) {
  const chatId = useMemo(
    () =>
      `${mode}-${topic}-${conceptTitle ?? 'general'}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    [mode, topic, conceptTitle],
  );

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        body: {
          mode,
          topic,
          conceptTitle,
          conceptSummary,
          starterPrompts,
        },
      }),
    [mode, topic, conceptTitle, conceptSummary, starterPrompts],
  );

  const { messages, sendMessage, status, error, clearError } = useChat({
    id: chatId,
    transport,
  });

  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const seededKeyRef = useRef<string>('');

  const isLoading = status === 'submitted' || status === 'streaming';
  const panelTitle = mode === 'learn' ? 'AI Learning Coach' : 'AI Interviewer';
  const panelSubtitle = mode === 'learn' ? 'Concept deep dive mode' : 'Interview practice mode';

  const seedKey = useMemo(
    () => [mode, topic, conceptTitle ?? '', conceptSummary ?? ''].join('|'),
    [mode, topic, conceptTitle, conceptSummary],
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, error]);

  useEffect(() => {
    if (mode !== 'learn') return;
    if (messages.length > 0) return;
    if (seededKeyRef.current === seedKey) return;

    seededKeyRef.current = seedKey;
    void sendMessage({ text: createLearnStarter(topic, conceptTitle, conceptSummary) });
  }, [mode, messages.length, seedKey, sendMessage, topic, conceptTitle, conceptSummary]);

  const submitMessage = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setInput('');
    await sendMessage({ text: trimmed });
  };

  const startInterview = async () => {
    if (isLoading) return;
    await sendMessage({ text: `Let's practice ${topic}. Start with a senior-level question.` });
  };

  return (
    <div
      className={`relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-3 shadow-sm sm:gap-4 sm:p-5 ${
        className ?? 'h-[min(70vh,600px)] min-h-[380px]'
      }`}
    >
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40" />

      <div className="mb-1 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 px-1">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] text-xs font-bold text-[var(--accent)] shadow-xs">
              AI
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--bg-surface)] bg-emerald-500" />
          </div>
          <div className="min-w-0">
            <h4 className="truncate text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)]">{panelTitle}</h4>
            <p className="truncate text-[9px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{panelSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto pr-1 min-h-0 sm:gap-5 sm:pr-2">
        {messages.length === 0 ? (
          <div className="my-auto mx-auto flex max-w-sm flex-col items-center justify-center px-4 py-8 text-center">
            {mode === 'learn' ? (
              <p className="text-sm text-[var(--text-muted)]">Preparing a concept-focused explanation for {conceptTitle ?? topic}...</p>
            ) : (
              <>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-dim)] text-[var(--accent)]">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <p className="mb-4 text-sm font-medium text-[var(--text-secondary)]">
                  Ready for a senior-level {topic} interview simulation?
                </p>
                <button
                  type="button"
                  onClick={startInterview}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[var(--accent-soft)] hover:shadow"
                >
                  Start Interview
                </button>
              </>
            )}
          </div>
        ) : (
          messages.map((message) => {
            const text = getMessageText(message);
            return (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[92%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-xs sm:max-w-[88%] sm:p-4 ${
                    message.role === 'user'
                      ? 'rounded-tr-none bg-[var(--accent)] font-medium text-white'
                      : 'rounded-tl-none border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)]'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{text || '(No text content)'}</div>
                </div>
              </div>
            );
          })
        )}

        {error ? (
          <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-xs text-rose-100">
            <p className="font-semibold">AI request failed</p>
            <p className="mt-1 opacity-90">{error.message}</p>
            <button
              type="button"
              onClick={clearError}
              className="mt-2 cursor-pointer rounded-md border border-rose-300/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
            >
              Dismiss
            </button>
          </div>
        ) : null}

        {isLoading ? (
          <div className="flex justify-start">
            <div className="w-16 rounded-2xl rounded-tl-none border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4">
              <div className="flex items-center justify-center gap-1.5">
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:-0.3s]" />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:-0.15s]" />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)]" />
              </div>
            </div>
          </div>
        ) : null}

        <div ref={bottomRef} />
      </div>

      {starterPrompts.length > 0 ? (
        <div className="flex flex-wrap gap-2 border-t border-[var(--border-subtle)] pt-3">
          {starterPrompts.slice(0, 3).map((prompt) => (
            <button
              key={prompt}
              type="button"
              disabled={isLoading}
              onClick={() => {
                void sendMessage({ text: prompt });
              }}
              className="cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] disabled:opacity-40"
            >
              {prompt.length > 48 ? `${prompt.slice(0, 48)}...` : prompt}
            </button>
          ))}
        </div>
      ) : null}

      <form onSubmit={submitMessage} className="mt-1 flex gap-2 border-t border-[var(--border-subtle)] pt-3 sm:gap-3 sm:pt-4">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={mode === 'learn' ? 'Ask a follow-up...' : 'Type your answer...'}
          className="min-w-0 flex-1 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] sm:px-5 sm:py-3"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="cursor-pointer shrink-0 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:bg-[var(--accent-soft)] disabled:opacity-40 disabled:cursor-not-allowed sm:px-6 sm:py-3"
        >
          Send
        </button>
      </form>
    </div>
  );
}
