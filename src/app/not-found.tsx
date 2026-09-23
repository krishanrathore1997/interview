import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="page-container fade-in"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}
    >
      <div>
        <div className="label" style={{ marginBottom: '0.75rem' }}>404</div>
        <h1 style={{ marginBottom: '0.75rem' }}>Page not found</h1>
        <p className="text-secondary" style={{ marginBottom: '1.5rem', maxWidth: '32rem' }}>
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Try the homepage or jump straight into the
          interview question bank.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              border: '1px solid var(--border-default)',
              borderRadius: '8px',
              padding: '0.625rem 1rem',
            }}
          >
            Back to homepage
          </Link>
          <Link
            href="/interview"
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--clr-interview)',
              border: '1px solid var(--border-default)',
              borderRadius: '8px',
              padding: '0.625rem 1rem',
            }}
          >
            Interview question bank -&gt;
          </Link>
        </div>
      </div>
    </div>
  );
}
