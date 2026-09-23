'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  label?: string;
}

export default function CodeBlock({ code, language = 'javascript', label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-lang">{label ?? language}</span>
        <button
          type="button"
          onClick={copyToClipboard}
          aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
          className={`code-copy-btn${copied ? ' copied' : ''}`}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="code-content">
        <code>{code}</code>
      </pre>
    </div>
  );
}
