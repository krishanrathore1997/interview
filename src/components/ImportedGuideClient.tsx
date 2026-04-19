'use client';

import { useEffect, useRef } from 'react';

interface ImportedGuideClientProps {
  html: string;
  css: string;
  sectionSelector: string;
  navLinkSelector: string;
  activeClassName: string;
}

export default function ImportedGuideClient({
  html,
  css,
  sectionSelector,
  navLinkSelector,
  activeClassName,
}: ImportedGuideClientProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>(sectionSelector));
    const navLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>(navLinkSelector));

    if (sections.length === 0 || navLinks.length === 0) return;

    const setActiveLink = (id: string) => {
      navLinks.forEach((link) => {
        link.classList.toggle(activeClassName, link.getAttribute('href') === `#${id}`);
      });
    };

    const initialId = window.location.hash.replace(/^#/, '') || sections[0]?.id;
    if (initialId) {
      setActiveLink(initialId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-60px 0px -60% 0px' },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [activeClassName, html, navLinkSelector, sectionSelector]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={rootRef} className="imported-guide" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
