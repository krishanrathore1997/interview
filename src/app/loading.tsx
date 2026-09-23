export default function Loading() {
  return (
    <div
      className="page-container fade-in"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '2.25rem',
            height: '2.25rem',
            margin: '0 auto 1rem',
            border: '3px solid var(--border-default)',
            borderTopColor: 'var(--accent)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Loading...</p>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
