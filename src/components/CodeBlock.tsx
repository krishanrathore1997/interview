'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group my-6">
      <div className="absolute top-0 right-0 flex items-center">
        {language && (
          <div className="px-3 py-1 text-[9px] font-bold text-[var(--text-muted)] bg-[var(--bg-elevated)] border-l border-b border-[var(--border-subtle)] rounded-bl-lg uppercase tracking-wider">
            {language}
          </div>
        )}
        <button
          onClick={copyToClipboard}
          className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-300 border-l border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] ${
            copied ? 'text-emerald-400' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="!mt-0 overflow-x-auto custom-scrollbar">
        <code className="text-[var(--text-secondary)]">{code}</code>
      </pre>
    </div>
  );
}
