export interface NavItem {
  title: string;
  href: string;
  color?: string;
  items?: { title: string; href: string }[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon?: string;
  content?: string;
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tech: string;
  code?: string;
}

export const navigationContent: NavItem[] = [
  {
    title: 'Laravel',
    href: '/laravel',
    color: '#ff8552',
    items: [
      { title: 'Installation & Setup', href: '#installation' },
      { title: 'Request Lifecycle', href: '#lifecycle' },
      { title: 'Eloquent ORM Mastery', href: '#eloquent' },
      { title: 'Auth & Sanctum', href: '#auth' },
      { title: 'Queues & Jobs', href: '#queues' },
      { title: 'Performance & Caching', href: '#perf' },
      { title: 'Email & Mailables', href: '#email' },
      { title: 'Batch, Chain & Horizon', href: '#queues-advanced' },
      { title: 'Task Scheduling', href: '#cron' },
      { title: 'Multi-Database', href: '#multidb' },
      { title: 'Events & Real-time', href: '#broadcasting' },
      { title: 'API & Rate Limiting', href: '#api' },
      { title: 'Enterprise Testing', href: '#testing' },
      { title: 'Advanced Eloquent', href: '#eloquent-advanced-patterns' },
      { title: 'Design Patterns', href: '#patterns' },
      { title: 'Project Blueprints', href: '#blueprints' },
    ],
  },
  {
    title: 'PHP',
    href: '/php',
    color: '#8a90d8',
    items: [
      { title: 'Foundations', href: '#php-foundations' },
      { title: 'Logic & Control Flow', href: '#php-logic' },
      { title: 'Functions & Arrays', href: '#php-data-ops' },
      { title: 'Web & Forms', href: '#php-web' },
      { title: 'Files, Filter & JSON', href: '#php-files-json-filter' },
      { title: 'OOP & MySQL', href: '#php-oop-mysql' },
    ],
  },
  {
    title: 'JavaScript',
    href: '/javascript',
    color: '#f2d86b',
    items: [
      { title: 'JavaScript Basics', href: '#js-basics' },
      { title: 'Logic & Control Flow', href: '#js-logic' },
      { title: 'Functions & Arrays', href: '#js-data' },
      { title: 'Browser Interaction', href: '#js-dom' },
      { title: 'Objects & Strings', href: '#js-objects-strings' },
      { title: 'Modern Data Tools', href: '#js-modern-data' },
      { title: 'Async & Web APIs', href: '#js-async-web' },
    ],
  },
  {
    title: 'HTML & CSS',
    href: '/html-css',
    color: '#38bdf8',
    items: [
      { title: 'HTML Foundations', href: '#html-foundations' },
      { title: 'CSS Foundations', href: '#css-foundations' },
      { title: 'Layout & Responsive', href: '#layout-responsive' },
      { title: 'Accessibility & Browser', href: '#accessibility-browser-basics' },
    ],
  },
  {
    title: 'TypeScript',
    href: '/typescript',
    color: '#60a5fa',
    items: [
      { title: 'Foundations', href: '#ts-foundations' },
      { title: 'Narrowing & Safety', href: '#ts-narrowing' },
      { title: 'Generics & Utils', href: '#ts-generics' },
      { title: 'TSConfig & Tooling', href: '#ts-config' },
      { title: 'React + TS', href: '#ts-react' },
    ],
  },
  {
    title: 'React',
    href: '/react',
    color: '#087ea4',
    items: [
      { title: 'React Learn Basics', href: '#react-learn-fundamentals' },
      { title: 'React 19 Actions', href: '#react-19-mastery' },
      { title: 'The use() Hook', href: '#react-19-use-hook' },
      { title: 'JS Core & Event Loop', href: '#js-core' },
      { title: 'Virtual DOM', href: '#react-core' },
      { title: 'All 18 Hooks', href: '#hooks' },
      { title: 'Redux Toolkit', href: '#state' },
      { title: 'Performance', href: '#performance' },
    ],
  },
  {
    title: 'SQL',
    href: '/sql',
    color: '#ffbe63',
    items: [
      { title: 'Index Internals', href: '#mysql-locking-internals' },
      { title: 'Locking & Deadlocks', href: '#locking-strategies' },
      { title: 'Partitioning', href: '#sql-architecture' },
      { title: 'Normalization', href: '#basics' },
      { title: 'Query Optimization', href: '#optimization' },
      { title: 'JSON Columns', href: '#json' },
    ],
  },
  {
    title: 'HTTP & APIs',
    href: '/apis',
    color: '#93c5fd',
    items: [
      { title: 'HTTP Basics', href: '#http-basics' },
      { title: 'REST Design', href: '#rest-design' },
      { title: 'Auth, CORS, CSRF', href: '#auth' },
      { title: 'Caching & Perf', href: '#caching' },
      { title: 'Webhooks', href: '#webhooks' },
    ],
  },
  {
    title: 'Security',
    href: '/security',
    color: '#f87171',
    items: [
      { title: 'Mindset', href: '#security-mindset' },
      { title: 'Web Attacks', href: '#web-attacks' },
      { title: 'Secrets & Passwords', href: '#secure-storage' },
      { title: 'File Uploads', href: '#uploads' },
    ],
  },
  {
    title: 'Testing',
    href: '/testing',
    color: '#fbbf24',
    items: [
      { title: 'Strategy', href: '#testing-strategy' },
      { title: 'Unit Testing', href: '#unit-testing' },
      { title: 'Integration', href: '#integration-testing' },
      { title: 'Frontend', href: '#frontend-testing' },
      { title: 'CI Quality', href: '#ci-quality' },
    ],
  },
  {
    title: 'Next.js',
    href: '/nextjs',
    color: '#111827',
    items: [
      { title: 'App Router Basics', href: '#route-architecture' },
      { title: 'Server Functions', href: '#server-actions' },
      { title: 'Cache Components', href: '#cache-components' },
      { title: 'Security Hardening', href: '#hardening' },
      { title: 'Revalidation & ISR', href: '#isr' },
      { title: 'App Router', href: '#app-router' },
      { title: 'Caching', href: '#caching' },
      { title: 'Streaming', href: '#rendering-performance' },
    ],
  },
  {
    title: 'Git',
    href: '/git',
    color: '#ff7d64',
    items: [
      { title: 'Worktrees', href: '#git-worktree' },
      { title: 'Bisect Expert', href: '#git-bisect-expert' },
      { title: 'Rebase vs Merge', href: '#branching-merging' },
      { title: 'Remote Mastery', href: '#remotes' },
      { title: 'Undo & Recovery', href: '#undo-stash' },
    ],
  },
  {
    title: 'System Design',
    href: '/system-design',
    color: '#34d399',
    items: [
      { title: 'Foundations', href: '#sd-foundations' },
      { title: 'Caching', href: '#sd-caching' },
      { title: 'Data', href: '#sd-data' },
      { title: 'Async', href: '#sd-async' },
      { title: 'Observability', href: '#sd-observability' },
    ],
  },
  {
    title: 'DevOps',
    href: '/devops',
    color: '#f97316',
    items: [
      { title: 'Foundations', href: '#devops-foundations' },
      { title: 'CI/CD', href: '#ci-cd' },
      { title: 'Containers', href: '#containers' },
      { title: 'Operations', href: '#operations' },
    ],
  },
  {
    title: 'Interview',
    href: '/interview',
    color: '#73d9c7',
    items: [
      { title: 'Playbook', href: '#interview-playbook' },
      { title: 'Question Bank', href: '#master-questions' },
    ],
  },
];

export const heroContent = {
  tag: 'Fullstack Interview Prep - Senior Technical Handbook',
  title1: 'Technical Mastery for',
  title2: 'Senior Engineers',
  description:
    'The official-documentation-based guide for HTML, CSS, PHP 8.4, React 19.2, Laravel 13, JavaScript, TypeScript, APIs, security, testing, and system design.',
  tech: ['HTML', 'CSS', 'Laravel 13', 'PHP 8.4', 'JavaScript', 'TypeScript', 'React 19.2', 'MySQL 8.4', 'Next.js 16', 'Git', 'APIs', 'Security'],
};
