'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navigationContent } from '@/data/content';

const topicColors: Record<string, string> = {
  Laravel:   'var(--clr-laravel)',
  PHP:       'var(--clr-php)',
  React:     'var(--clr-react)',
  SQL:       'var(--clr-sql)',
  'Next.js': 'var(--clr-nextjs)',
  Git:       'var(--clr-git)',
  'HTML & CSS': 'var(--clr-html-css)',
  JavaScript: '#f2d86b',
  TypeScript: '#60a5fa',
  'HTTP & APIs': '#93c5fd',
  Security: '#f87171',
  Testing: '#fbbf24',
  'System Design': 'var(--clr-interview)',
  DevOps: 'var(--clr-git)',
  Interview: 'var(--clr-interview)',
};

export default function Sidebar() {
  const pathname = usePathname();
  const [hash, setHash] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const q = search.toLowerCase();
  const visibleNav = navigationContent.map(section => {
    const items = section.items?.filter(i => !q || i.title.toLowerCase().includes(q) || section.title.toLowerCase().includes(q)) ?? [];
    if (!q || section.title.toLowerCase().includes(q) || items.length) return { ...section, items };
    return null;
  }).filter(Boolean) as typeof navigationContent;

  const toggle = (title: string) =>
    setCollapsed(prev => ({ ...prev, [title]: !prev[title] }));

  const isOpen = (title: string) => {
    if (search) return true;
    if (collapsed[title] !== undefined) return !collapsed[title];
    return navigationContent.findIndex(s => s.title === title) === navigationContent.findIndex(s => pathname.startsWith(s.href));
  };

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        className="hamburger"
        onClick={() => setIsMobileOpen(p => !p)}
        aria-label="Toggle menu"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {isMobileOpen
            ? <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>
            : <><path d="M4 8h16"/><path d="M4 16h16"/></>
          }
        </svg>
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div className="sidebar-overlay visible" onClick={closeMobile} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar${isMobileOpen ? ' is-open' : ''}`}>
        {/* Logo / Brand */}
        <Link href="/" className="sidebar-logo" onClick={closeMobile}>
          <span className="sidebar-logo-icon">FS</span>
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700 }}>Interview Prep</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 400 }}>Fullstack Interview Guide</div>
          </div>
        </Link>

        {/* Search */}
        <div className="sidebar-search">
          <input
            type="text"
            className="sidebar-search-input"
            placeholder="Search topics..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Overview + Checklist */}
        <div style={{ padding: '0.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.125rem', borderBottom: '1px solid var(--border-default)' }}>
          <Link
            href="/"
            className={`sidebar-overview-link${pathname === '/' ? ' active' : ''}`}
            onClick={closeMobile}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            Overview
          </Link>
          <Link
            href="/checklist"
            className={`sidebar-overview-link${pathname === '/checklist' ? ' active' : ''}`}
            onClick={closeMobile}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            Checklist
          </Link>
        </div>

        {/* Navigation sections */}
        <nav style={{ flex: 1 }}>
          {visibleNav.map(section => {
            const color = topicColors[section.title] ?? 'var(--text-muted)';
            const open = isOpen(section.title);
            const isActive = pathname.startsWith(section.href);

            return (
              <div key={section.title} className="sidebar-section">
                {/* Section header */}
                <button
                  type="button"
                  className="sidebar-section-header"
                  onClick={() => toggle(section.title)}
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="sidebar-dot" style={{ background: color }} />
                    <Link
                      href={section.href}
                      onClick={e => { e.stopPropagation(); closeMobile(); }}
                      style={{
                        color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                        fontWeight: isActive ? 700 : 600,
                        letterSpacing: '0.1em',
                        fontSize: '0.6875rem',
                        textTransform: 'uppercase',
                      }}
                    >
                      {section.title}
                    </Link>
                  </span>
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>

                {/* Sub-links */}
                {open && section.items && section.items.length > 0 && (
                  <div>
                    {section.items.map(item => {
                      const fullHref = item.href.startsWith('#')
                        ? `${section.href}${item.href}`
                        : item.href;
                      const activeItem = item.href.startsWith('#')
                        ? pathname === section.href && hash === item.href
                        : pathname === item.href;

                      return (
                        <Link
                          key={item.title}
                          href={fullHref}
                          onClick={closeMobile}
                          className={`sidebar-link${activeItem ? ' active' : ''}`}
                          style={{ borderLeftColor: activeItem ? color : 'transparent' }}
                        >
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {visibleNav.length === 0 && (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              No results for &ldquo;{search}&rdquo;
              <button onClick={() => setSearch('')} style={{ display: 'block', margin: '0.5rem auto 0', color: 'var(--accent)', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                Clear search
              </button>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-profile">
            <div className="sidebar-avatar">FS</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Fullstack Developer
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Interview Prep Hub</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
