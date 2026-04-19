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
      className={`relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)] p-6 ${
        className ?? 'h-[600px]'
      }`}
    >
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--text-accent)] to-transparent opacity-30" />

      <div className="mb-2 flex items-center gap-3 px-1">
        <div className="relative">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-medium)] bg-[var(--bg-elevated)] text-sm">
            AI
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--bg-surface)] bg-emerald-500" />
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)]">{panelTitle}</h4>
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-muted)]">{panelSubtitle}</p>
        </div>
      </div>

      <div className="custom-scrollbar flex flex-1 flex-col gap-5 overflow-y-auto pr-2">
        {messages.length === 0 ? (
          <div className="my-auto mx-auto max-w-sm text-center text-sm text-[var(--text-muted)]">
            {mode === 'learn' ? (
              <p>Preparing a concept-focused explanation for {conceptTitle ?? topic}...</p>
            ) : (
              <>
                <p className="mb-4">Ready for a senior-level {topic} interview simulation?</p>
                <button
                  type="button"
                  onClick={startInterview}
                  className="rounded-full border border-[var(--border-medium)] px-6 py-2 text-[11px] font-bold uppercase tracking-wider text-[var(--text-primary)] transition-all hover:border-[var(--text-accent)]"
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
                  className={`max-w-[88%] rounded-2xl p-4 text-sm leading-relaxed shadow-lg ${
                    message.role === 'user'
                      ? 'rounded-tr-none bg-[var(--text-accent)] font-medium text-white'
                      : 'rounded-tl-none border border-[var(--border-medium)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]'
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
              className="mt-2 rounded-md border border-rose-300/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
            >
              Dismiss
            </button>
          </div>
        ) : null}

        {isLoading ? (
          <div className="flex justify-start">
            <div className="w-16 rounded-2xl rounded-tl-none border border-[var(--border-medium)] bg-[var(--bg-elevated)] p-4">
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
              className="rounded-full border border-[var(--border-medium)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] transition hover:border-[var(--text-accent)] hover:text-[var(--text-primary)] disabled:opacity-40"
            >
              {prompt.length > 48 ? `${prompt.slice(0, 48)}...` : prompt}
            </button>
          ))}
        </div>
      ) : null}

      <form onSubmit={submitMessage} className="mt-2 flex gap-3 border-t border-[var(--border-subtle)] pt-4">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={mode === 'learn' ? 'Ask a follow-up question...' : 'Type your answer...'}
          className="flex-1 rounded-xl border border-[var(--border-medium)] bg-[var(--bg-elevated)] px-5 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--text-accent)]"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="rounded-xl bg-[var(--text-primary)] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[var(--bg-main)] transition-all hover:bg-white disabled:opacity-30"
        >
          Send
        </button>
      </form>
    </div>
  );
}
