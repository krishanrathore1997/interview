'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="page-container fade-in"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}
    >
      <div>
        <div className="label" style={{ marginBottom: '0.75rem', color: '#f87171' }}>Something went wrong</div>
        <h1 style={{ marginBottom: '0.75rem' }}>This page hit an error</h1>
        <p className="text-secondary" style={{ marginBottom: '1.5rem', maxWidth: '32rem' }}>
          Try again, and if it keeps happening, refresh the page.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px',
            padding: '0.625rem 1.25rem',
            cursor: 'pointer',
            background: 'var(--bg-surface)',
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
