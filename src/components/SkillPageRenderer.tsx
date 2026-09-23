import Link from 'next/link';
import SkillConceptCard from '@/components/SkillConceptCard';
import AIAgent from '@/components/AIAgent';
import type { SkillPageContent, SkillTopic } from '@/data/skills';

const deepDiveByTopic: Partial<Record<SkillTopic, string>> = {
  Laravel: '/laravel-deep-dive.html',
  'Next.js': '/nextjs-deep-dive.html',
  React: '/react-js-deep-dive.html',
  MySQL: '/sql-deep-dive.html',
};

const topicColors: Record<string, string> = {
  React: 'var(--clr-react)',
  Laravel: 'var(--clr-laravel)',
  PHP: 'var(--clr-php)',
  MySQL: 'var(--clr-sql)',
  'Next.js': 'var(--clr-nextjs)',
  Git: 'var(--clr-git)',
  'HTML & CSS': 'var(--clr-html-css)',
  JavaScript: '#b45309',
  TypeScript: '#2563eb',
  'HTTP & APIs': '#2563eb',
  Security: '#dc2626',
  Testing: '#b45309',
  'System Design': 'var(--clr-interview)',
  DevOps: 'var(--clr-git)',
};

const interviewSearchSeed: Record<string, string> = {
  Laravel: 'laravel',
  PHP: 'php',
  'HTML & CSS': 'html css',
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  React: 'react',
  MySQL: 'mysql',
  'HTTP & APIs': 'http api',
  Security: 'security',
  Testing: 'testing',
  'Next.js': 'next.js',
  Git: 'git',
  'System Design': 'system design',
  DevOps: 'devops',
};

interface Props {
  content: SkillPageContent;
}

export default function SkillPageRenderer({ content }: Props) {
  const color = topicColors[content.topic] ?? 'var(--accent)';
  const q = encodeURIComponent(interviewSearchSeed[content.topic] ?? content.topic);
  const practiceHref = `/interview?q=${q}`;
  const deepDiveHref = deepDiveByTopic[content.topic];

  const totalConcepts = content.sections.reduce((total, section) => total + section.concepts.length, 0);
  const totalQuestions = content.sections.reduce(
    (total, section) =>
      total + section.concepts.reduce((sectionTotal, concept) => sectionTotal + (concept.interviewQuestions?.length ?? 0), 0),
    0,
  );

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <div className="page-header-tag">
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, display: 'inline-block' }} />
          {content.topic}
        </div>
        <h1>{content.title}</h1>
        <p>{content.subtitle}</p>

        <div className="page-meta">
          <span className="page-meta-item">
            <span className="page-meta-dot" />
            {content.sections.length} Sections
          </span>
          <span className="page-meta-item">
            <span className="page-meta-dot" />
            {totalConcepts} Concepts
          </span>
          <span className="page-meta-item">
            <span className="page-meta-dot" />
            {totalQuestions} Interview Questions
          </span>
          <Link
            href={practiceHref}
            className="page-meta-item"
            style={{ color: 'var(--text-link)', textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            Practice Q&amp;A -&gt;
          </Link>
          {deepDiveHref && (
            <a
              href={deepDiveHref}
              target="_blank"
              rel="noreferrer"
              className="page-meta-item"
              style={{ color: 'var(--text-link)', textDecoration: 'underline', textUnderlineOffset: '2px' }}
            >
              Advanced Deep Dive -&gt;
            </a>
          )}
          {content.docs.map((doc) => (
            <a
              key={doc.href}
              href={doc.href}
              target="_blank"
              rel="noreferrer"
              className="page-meta-item"
              style={{ color: 'var(--text-link)', textDecoration: 'underline', textUnderlineOffset: '2px' }}
            >
              {doc.label} -&gt;
            </a>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {content.sections.map((section) => (
          <div key={section.id} id={section.id} className="content-section anchor">
            <div className="section-heading">
              <div className="section-icon" style={{ background: `${color}20`, color }}>
                #
              </div>
              <div>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>
            </div>

            <div>
              {section.concepts.map((concept) => (
                <SkillConceptCard key={concept.id} concept={concept} topic={content.topic} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div className="section-title-row">
          <h2>AI Interview Practice</h2>
          <span className="text-secondary" style={{ fontSize: '0.8125rem' }}>Ask follow-ups or start a mock interview for {content.topic}.</span>
        </div>
        <AIAgent topic={content.topic} mode="interview" className="h-[min(70vh,520px)] min-h-[380px]" />
      </div>
    </div>
  );
}
