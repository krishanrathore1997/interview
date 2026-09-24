import Link from 'next/link';

type DocLink = {
  label: string;
  href: string;
};

type CodeExample = {
  label: string;
  language: string;
  code: string;
};

type StudyStep = {
  num: string;
  title: string;
  text: string;
};

type Track = {
  id: string;
  title: string;
  shortLabel: string;
  color: string;
  href: string;
  focus: string;
  concept: string;
  simpleExplanation: string;
  whyItMatters: string;
  keyPoints: string[];
  exampleTitle: string;
  example: CodeExample;
  officialDocs: DocLink[];
};

const techStack = [
  { label: 'Laravel 13', color: '#ff7043' },
  { label: 'PHP 8.4', color: '#9b8fe8' },
  { label: 'HTML & CSS', color: '#38bdf8' },
  { label: 'JavaScript ES2024', color: '#b45309' },
  { label: 'TypeScript 5', color: '#60a5fa' },
  { label: 'React 19.2.4', color: '#087ea4' },
  { label: 'MySQL 8.4', color: '#0f6f96' },
  { label: 'HTTP & APIs', color: '#2563eb' },
  { label: 'Security', color: '#f87171' },
  { label: 'Testing', color: '#fbbf24' },
  { label: 'System Design', color: '#0f766e' },
  { label: 'DevOps', color: '#f97316' },
  { label: 'Next.js 16.2.0', color: '#111827' },
  { label: 'Git', color: '#f97316' },
];

const studySteps: StudyStep[] = [
  {
    num: '01',
    title: 'Read the idea',
    text: 'Start with the simple explanation first. If you cannot explain it in one sentence, stay on that concept a little longer.',
  },
  {
    num: '02',
    title: 'Run the example',
    text: 'Every section gives one short example. Type it yourself and change one small thing to see what happens.',
  },
  {
    num: '03',
    title: 'Go deeper with docs',
    text: 'After the basic idea is clear, open the official documentation links to learn the exact rules and edge cases.',
  },
  {
    num: '04',
    title: 'Practice out loud',
    text: 'Open the interview question bank after each topic and explain answers in your own words.',
  },
];

const tracks: Track[] = [
  {
    id: 'laravel-fundamentals',
    title: 'Laravel Fundamentals',
    shortLabel: 'LV',
    color: '#ff7043',
    href: '/laravel',
    focus: 'Installation, request lifecycle, Eloquent, and queues',
    concept: 'A Laravel app has a clear setup flow and request path from install to response.',
    simpleExplanation:
      'In Laravel 13, a project is usually created with the installer, frontend assets are prepared, and `composer run dev` starts the local stack. After that, each browser request enters the app, passes through bootstrapping and middleware, reaches a route or controller, runs your business logic, and returns a response. Eloquent gives you a PHP model that represents one database table.',
    whyItMatters:
      'When you understand both the installation flow and the request lifecycle, debugging and environment setup become easier because you know how the app starts and where problems happen. When you understand Eloquent, database code becomes easier to read and explain in interviews.',
    keyPoints: [
      '`laravel new` plus `composer run dev` is now a practical interview topic because it shows you know the current Laravel 13 setup flow.',
      'Middleware runs before or after your controller logic and is great for auth, logging, and validation checks.',
      'An Eloquent model usually represents one table, such as User for the users table.',
      'Queues move slow work like emails or reports into the background so the user does not wait.',
    ],
    exampleTitle: 'Simple Eloquent query',
    example: {
      label: 'routes/web.php',
      language: 'php',
      code: `Route::get('/users', function () {
  return User::where('active', true)->latest()->get();
});`,
    },
    officialDocs: [
      { label: 'Laravel Installation', href: 'https://laravel.com/docs/13.x/installation' },
      { label: 'Laravel Request Lifecycle', href: 'https://laravel.com/docs/13.x/lifecycle' },
      { label: 'Laravel Queues', href: 'https://laravel.com/docs/13.x/queues' },
    ],
  },
  {
    id: 'php-fundamentals',
    title: 'PHP Fundamentals',
    shortLabel: 'PHP',
    color: '#9b8fe8',
    href: '/php',
    focus: 'Classes, scope, and property hooks',
    concept: 'A class is a blueprint, and an object is a real thing created from that blueprint.',
    simpleExplanation:
      'PHP classes hold properties and methods. When you create an object with new, you get an instance you can use. Variable scope decides where a value can be read. In PHP 8.4, property hooks let you run logic when a property is read or written.',
    whyItMatters:
      'These ideas are the base for OOP, frameworks, and clean architecture questions. They also help you explain why code behaves differently inside and outside a class.',
    keyPoints: [
      'Properties store data on the object, and methods define behavior.',
      'Scope prevents variables from leaking into places where they should not exist.',
      'Property hooks are useful when you want validation or transformation without separate getter and setter methods.',
    ],
    exampleTitle: 'Property hook in PHP 8.4',
    example: {
      label: 'User.php',
      language: 'php',
      code: `class User
{
  public string $email {
    set => strtolower(trim($value));
  }
}`,
    },
    officialDocs: [
      { label: 'PHP Classes and Objects', href: 'https://www.php.net/manual/en/language.oop5.basic.php' },
      { label: 'PHP Variable Scope', href: 'https://www.php.net/manual/en/language.variables.scope.php' },
      { label: 'PHP Property Hooks', href: 'https://www.php.net/manual/en/language.oop5.property-hooks.php' },
    ],
  },
  {
    id: 'html-css-fundamentals',
    title: 'HTML & CSS Fundamentals',
    shortLabel: 'HC',
    color: '#38bdf8',
    href: '/html-css',
    focus: 'Semantic HTML, forms, box model, layout, and accessibility',
    concept: 'HTML gives content meaning; CSS controls presentation and layout.',
    simpleExplanation:
      'HTML describes the structure of a page with elements like headings, links, forms, buttons, and main content. CSS makes that structure readable and responsive using selectors, the box model, Flexbox, Grid, and media queries. Together they are the foundation under every React, Next.js, and Laravel frontend.',
    whyItMatters:
      'Frameworks do not replace browser fundamentals. Interviewers expect you to explain semantic HTML, forms, accessibility, responsive layout, and why a CSS rule wins.',
    keyPoints: [
      'Use semantic elements for meaning: header, nav, main, section, article, footer, button, and form.',
      'Understand the box model: content, padding, border, margin, and box-sizing.',
      'Use Flexbox for one-dimensional alignment and Grid for two-dimensional layouts.',
      'Check accessibility basics: labels, alt text, keyboard focus, heading order, and contrast.',
    ],
    exampleTitle: 'Semantic card with responsive CSS',
    example: {
      label: 'card.html/css',
      language: 'html',
      code: `<article class="card">
  <h2>Interview Prep</h2>
  <p>Learn one concept, then practice one question.</p>
  <a href="/interview">Practice</a>
</article>

.card {
  box-sizing: border-box;
  max-width: 32rem;
  padding: 1rem;
}`,
    },
    officialDocs: [
      { label: 'MDN HTML', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { label: 'MDN CSS', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
      { label: 'W3Schools HTML', href: 'https://www.w3schools.com/html/' },
      { label: 'W3Schools CSS', href: 'https://www.w3schools.com/css/' },
    ],
  },
  {
    id: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals',
    shortLabel: 'JS',
    color: '#f2d86b',
    href: '/javascript',
    focus: 'Closures, promises, and async thinking',
    concept: 'A closure lets a function remember variables from the place where it was created.',
    simpleExplanation:
      'JavaScript functions keep access to outer variables even after the outer function finishes. Promises represent future results, so you can write async code without deeply nested callbacks. Together, these ideas power modern frontend code.',
    whyItMatters:
      'Closures explain event handlers, factory functions, and private state. Promises explain fetch, async and await, and the event loop behavior you are often asked about in interviews.',
    keyPoints: [
      'Every function creation closes over the variables around it.',
      'A Promise can be pending, fulfilled, or rejected.',
      'async and await are built on top of Promises and make async code easier to read.',
    ],
    exampleTitle: 'Closure with a counter',
    example: {
      label: 'counter.js',
      language: 'javascript',
      code: `function makeCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const next = makeCounter();
next(); // 1
next(); // 2`,
    },
    officialDocs: [
      { label: 'MDN JavaScript Guide', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
      { label: 'MDN Closures', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures' },
      { label: 'MDN Using Promises', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises' },
    ],
  },
  {
    id: 'typescript-essentials',
    title: 'TypeScript Essentials',
    shortLabel: 'TS',
    color: '#60a5fa',
    href: '/typescript',
    focus: 'Types, narrowing, generics, and TSConfig',
    concept: 'Types make invalid states harder to represent.',
    simpleExplanation:
      'TypeScript adds a type system on top of JavaScript so many common bugs become compile-time errors. The practical daily win is narrowing: you start with a broad type (like a union) and the compiler helps you safely handle each case. Over time, good types become living documentation that makes refactors safer.',
    whyItMatters:
      'Most production issues are “wrong shape” bugs — missing fields, null values, wrong assumptions. TypeScript catches these earlier, and in interviews it shows you can design stable APIs and data models.',
    keyPoints: [
      'Use unions + narrowing (`in`, `typeof`, discriminated unions) to keep logic safe.',
      'Prefer `unknown` over `any` at boundaries; validate then narrow.',
      'Use strict TSConfig in real projects to catch bugs early.',
    ],
    exampleTitle: 'Discriminated union narrowing',
    example: {
      label: 'result.ts',
      language: 'ts',
      code: `type Result =
  | { ok: true; value: string }
  | { ok: false; error: string };

function unwrap(r: Result) {
  if (r.ok) return r.value;
  throw new Error(r.error);
}`,
    },
    officialDocs: [
      { label: 'TypeScript Handbook', href: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
      { label: 'Narrowing', href: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html' },
      { label: 'TSConfig Reference', href: 'https://www.typescriptlang.org/tsconfig' },
    ],
  },
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    shortLabel: 'R',
    color: '#61dafb',
    href: '/react',
    focus: 'Props, state, and the use() API',
    concept: 'Props are inputs from a parent, while state is memory inside a component.',
    simpleExplanation:
      'React UI is built from components. A parent passes data down with props. A component keeps changing data with state. In modern React, use() can also read a Promise or context and works with Suspense.',
    whyItMatters:
      'If you can clearly explain props, state, and rendering, most React interview questions become much easier. The use() API is also important for modern React and server-driven apps.',
    keyPoints: [
      'Props help components stay reusable because the parent controls the input.',
      'State is for data that changes over time, like form input or a counter.',
      'use() is especially useful when React is reading async resources with Suspense.',
    ],
    exampleTitle: 'Small state example',
    example: {
      label: 'Counter.tsx',
      language: 'tsx',
      code: `import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
    },
    officialDocs: [
      { label: 'React Props', href: 'https://react.dev/learn/passing-props-to-a-component' },
      { label: 'React State', href: 'https://react.dev/learn/state-a-components-memory' },
      { label: 'React use()', href: 'https://react.dev/reference/react/use' },
    ],
  },
  {
    id: 'mysql-fundamentals',
    title: 'MySQL Fundamentals',
    shortLabel: 'SQL',
    color: '#4fc3f7',
    href: '/sql',
    focus: 'Indexes, transactions, and locking',
    concept: 'An index is like the index page in a book: it helps the database find rows faster.',
    simpleExplanation:
      'MySQL can scan a whole table, but that gets slow as data grows. Indexes help it jump closer to the right rows. In InnoDB, the primary key is the clustered index, and transactions group multiple changes into one safe unit of work.',
    whyItMatters:
      'Performance and data consistency are two of the most common backend interview topics. If you understand indexes and transactions, you can explain both speed and safety.',
    keyPoints: [
      'A clustered index stores table data in primary-key order in InnoDB.',
      'Secondary indexes help lookup but may still need an extra row lookup.',
      'Transactions help you commit all changes together or roll them back together.',
    ],
    exampleTitle: 'Index-friendly query',
    example: {
      label: 'query.sql',
      language: 'sql',
      code: `SELECT id, name
FROM users
WHERE email = 'a@example.com';`,
    },
    officialDocs: [
      { label: 'MySQL InnoDB Index Types', href: 'https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html' },
      { label: 'MySQL InnoDB Transaction Model', href: 'https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html' },
    ],
  },
  {
    id: 'http-apis',
    title: 'HTTP & API Design',
    shortLabel: 'API',
    color: '#93c5fd',
    href: '/apis',
    focus: 'Methods, status codes, auth, and caching',
    concept: 'APIs are contracts: define inputs, outputs, and guarantees.',
    simpleExplanation:
      'HTTP gives you a standard language to move data between clients and servers. A good API is predictable: it uses the right methods (GET/POST/PUT/PATCH/DELETE), returns meaningful status codes, validates input, and documents its contract. In real projects, performance and security matter too — caching, pagination, rate limits, and clear error shapes.',
    whyItMatters:
      'Most backend interviews quickly become API design interviews. If you can design a clean endpoint and explain tradeoffs (REST vs RPC, tokens vs cookies, cache strategy), you stand out.',
    keyPoints: [
      'Status codes communicate outcomes (200/201/204, 400/401/403/404, 409, 422, 429, 500).',
      'Auth is a security boundary: always validate and authorize, not just authenticate.',
      'Caching is a performance tool: use Cache-Control/ETag and stable pagination.',
    ],
    exampleTitle: 'A predictable JSON endpoint',
    example: {
      label: 'client.ts',
      language: 'ts',
      code: `const res = await fetch('/api/users?limit=20', {
  headers: { Accept: 'application/json' },
});

if (!res.ok) throw new Error('Request failed');
const data = await res.json();`,
    },
    officialDocs: [
      { label: 'MDN HTTP Overview', href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview' },
      { label: 'MDN HTTP Status', href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status' },
      { label: 'MDN CORS', href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS' },
    ],
  },
  {
    id: 'nextjs-fundamentals',
    title: 'Next.js Fundamentals',
    shortLabel: 'NX',
    color: '#e2e8f0',
    href: '/nextjs',
    focus: 'Server Components, cache, and streaming',
    concept: 'In the App Router, pages are Server Components by default.',
    simpleExplanation:
      'Next.js lets you render most UI on the server first, then add small interactive client parts only where needed. In Next.js 16, the old experimental PPR path was replaced by Cache Components, caching tools, and Suspense-based streaming patterns.',
    whyItMatters:
      'This is the core mental model for modern Next.js. It helps you decide where code should run, how much JavaScript should ship to the browser, and how to keep pages fast.',
    keyPoints: [
      'Use "use client" only for interactivity, browser APIs, or client-only hooks.',
      'Keep pages server-first so you send less JavaScript to the browser.',
      'Use Suspense and caching tools to stream slow or dynamic parts without blocking the whole page.',
    ],
    exampleTitle: 'Server-first page with streaming',
    example: {
      label: 'app/page.tsx',
      language: 'tsx',
      code: `import { Suspense } from 'react';

export default function Page() {
  return (
    <main>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>Loading stats...</p>}>
        <LiveStats />
      </Suspense>
    </main>
  );
}`,
    },
    officialDocs: [
      { label: 'Next.js Server and Client Components', href: 'https://nextjs.org/docs/app/getting-started/server-and-client-components' },
      { label: 'Next.js Caching', href: 'https://nextjs.org/docs/app/getting-started/caching' },
      { label: 'Next.js Version 16 Guide', href: 'https://nextjs.org/docs/app/guides/upgrading/version-16' },
    ],
  },
  {
    id: 'git-fundamentals',
    title: 'Git Fundamentals',
    shortLabel: 'GIT',
    color: '#f97316',
    href: '/git',
    focus: 'Branches, worktrees, and rebase',
    concept: 'A branch is a named pointer to a commit, not a full copy of the project.',
    simpleExplanation:
      'Git stores snapshots and lets branches move forward as you make commits. A worktree lets you open another branch in another folder at the same time. Rebase takes your commits and replays them on top of a different base commit.',
    whyItMatters:
      'These three ideas explain most daily Git workflows. They also help you answer interview questions about clean history, hotfixes, and working on multiple tasks at once.',
    keyPoints: [
      'Creating a branch is cheap because Git mainly moves references, not full folders.',
      'Worktrees are great when you need two branches checked out at the same time.',
      'Rebase rewrites commit history, so use it carefully on shared branches.',
    ],
    exampleTitle: 'Create a feature branch',
    example: {
      label: 'terminal',
      language: 'bash',
      code: `git switch -c feature/auth
git add .
git commit -m "Add auth flow"`,
    },
    officialDocs: [
      { label: 'Git Branching Basics', href: 'https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell' },
      { label: 'git-worktree', href: 'https://git-scm.com/docs/git-worktree' },
      { label: 'git-rebase', href: 'https://git-scm.com/docs/git-rebase' },
    ],
  },
  {
    id: 'security-essentials',
    title: 'Security Essentials',
    shortLabel: 'SEC',
    color: '#f87171',
    href: '/security',
    focus: 'XSS, CSRF, injection, and auth hardening',
    concept: 'Assume user input is hostile until proven safe.',
    simpleExplanation:
      'Web security is a mindset: every boundary is an opportunity for abuse. The basics are simple but strict — validate input, escape output, enforce authorization, and handle secrets safely. Most real vulnerabilities are not “hacker magic”; they are missing checks, unsafe defaults, and poor data handling.',
    whyItMatters:
      'Security questions show up in almost every interview. A strong answer is structured: threat → exploit → defense → verification (tests/headers/logs).',
    keyPoints: [
      'Stop injection by parameterizing queries and validating input shapes.',
      'Stop XSS by escaping output and using safe templating + CSP when needed.',
      'Stop CSRF by using same-site cookies plus CSRF tokens for state-changing requests.',
    ],
    exampleTitle: 'Validate → authorize → act',
    example: {
      label: 'handler.ts',
      language: 'ts',
      code: `function updateUser(input: unknown) {
  // 1) validate input shape
  // 2) authorize user permissions
  // 3) perform update (parameterized DB calls)
}`,
    },
    officialDocs: [
      { label: 'OWASP Top 10', href: 'https://owasp.org/Top10/' },
      { label: 'OWASP Cheat Sheet Series', href: 'https://cheatsheetseries.owasp.org/' },
      { label: 'MDN Content Security Policy', href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP' },
    ],
  },
  {
    id: 'testing-quality',
    title: 'Testing & Quality',
    shortLabel: 'TST',
    color: '#fbbf24',
    href: '/testing',
    focus: 'Unit, integration, end-to-end, and CI',
    concept: 'Tests verify behavior; CI makes it repeatable.',
    simpleExplanation:
      'Good tests give you confidence to refactor and ship faster. A practical strategy is the “testing pyramid”: lots of fast unit tests, fewer integration tests, and a small number of end-to-end tests for critical paths. In real projects, CI runs tests automatically on every change and blocks broken code from merging.',
    whyItMatters:
      'Interviewers trust engineers who can prevent regressions. If you can explain what to test, where to test it, and what NOT to test, you sound senior.',
    keyPoints: [
      'Unit tests are fast and local; integration tests catch wiring issues.',
      'E2E tests are powerful but slower — keep them focused on business-critical flows.',
      'Use CI to enforce quality gates (lint, tests, typecheck) before merge.',
    ],
    exampleTitle: 'A simple unit test',
    example: {
      label: 'sum.test.ts',
      language: 'ts',
      code: `import { sum } from './sum';

test('adds two numbers', () => {
  expect(sum(2, 3)).toBe(5);
});`,
    },
    officialDocs: [
      { label: 'Jest Docs', href: 'https://jestjs.io/docs/getting-started' },
      { label: 'Testing Library', href: 'https://testing-library.com/docs/' },
      { label: 'Playwright', href: 'https://playwright.dev/docs/intro' },
    ],
  },
  {
    id: 'system-design',
    title: 'System Design',
    shortLabel: 'SD',
    color: '#34d399',
    href: '/system-design',
    focus: 'Scalability, caching, data, and observability',
    concept: 'Design by clarifying requirements, then choosing tradeoffs.',
    simpleExplanation:
      'System design is not memorizing architectures — it’s a method. Start with requirements (users, latency, throughput, consistency, cost). Then pick building blocks (databases, caches, queues) and explain tradeoffs. Finally, discuss failure modes and observability (metrics, logs, traces).',
    whyItMatters:
      'For senior roles, system design is usually the deciding round. Clear structure and tradeoffs beat fancy buzzwords.',
    keyPoints: [
      'Separate reads from writes when it simplifies scaling (CQRS-lite, caching).',
      'Use async queues for slow work and reliability (emails, video, reports).',
      'Always discuss failure modes + monitoring (timeouts, retries, dashboards).',
    ],
    exampleTitle: 'Cache-aside in one picture',
    example: {
      label: 'notes.txt',
      language: 'text',
      code: `read(key):
  v = cache.get(key)
  if v != null: return v
  v = db.get(key)
  cache.set(key, v, ttl=60s)
  return v`,
    },
    officialDocs: [
      { label: 'AWS Well-Architected', href: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html' },
      { label: 'Google SRE Book', href: 'https://sre.google/sre-book/table-of-contents/' },
      { label: 'Redis Caching Patterns', href: 'https://redis.io/docs/latest/develop/use/patterns/' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Delivery',
    shortLabel: 'DO',
    color: '#f97316',
    href: '/devops',
    focus: 'CI/CD, containers, and production operations',
    concept: 'Automation turns “works on my machine” into reliable releases.',
    simpleExplanation:
      'DevOps is about reducing risk and time-to-deliver. CI runs checks on every change. CD deploys safely using small batches, rollbacks, and monitoring. Containers standardize environments so your app runs the same locally and in production.',
    whyItMatters:
      'Teams ship value through pipelines. In interviews, DevOps answers show you understand reliability, deployment risk, and operational ownership.',
    keyPoints: [
      'Prefer small deploys with fast rollback over big risky releases.',
      'Use containers to standardize runtime + dependencies across environments.',
      'Monitor what users feel (p95 latency, error rate) and alert on regressions.',
    ],
    exampleTitle: 'Tiny CI step (typecheck + tests)',
    example: {
      label: '.github/workflows/ci.yml',
      language: 'yaml',
      code: `- name: Install
  run: npm ci
- name: Typecheck
  run: npm run build
- name: Tests
  run: npm test`,
    },
    officialDocs: [
      { label: 'Docker Docs', href: 'https://docs.docker.com/' },
      { label: 'Kubernetes Docs', href: 'https://kubernetes.io/docs/' },
      { label: 'GitHub Actions', href: 'https://docs.github.com/actions' },
    ],
  },
];

function SimpleCodeBlock({ example }: { example: CodeExample }) {
  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-lang">{example.label}</span>
        <span className="code-lang">{example.language}</span>
      </div>
      <pre className="code-content">{example.code}</pre>
    </div>
  );
}

function OfficialDocLinks({ docs, color }: { docs: DocLink[]; color: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {docs.map((doc) => (
        <a
          key={doc.href}
          href={doc.href}
          target="_blank"
          rel="noreferrer"
          className="topic-pill"
          style={{
            color,
            borderColor: `${color}40`,
            background: `${color}12`,
          }}
        >
          {doc.label} -&gt;
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  const officialDocCount = new Set(tracks.flatMap((track) => track.officialDocs.map((doc) => doc.href))).size;

  return (
    <div className="page-container fade-in">
      <div className="relative mb-12 p-8 lg:p-12 rounded-2xl overflow-hidden border border-white/10 bg-surface/50 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-teal-500/5">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent blur-2xl"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-400 to-blue-500 rounded-l-2xl"></div>
        
        <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-primary leading-[1.1]">
          Concepts and Fundamentals in <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">Simple Language</span>
        </h1>
        
        <p className="text-[1.05rem] text-secondary max-w-3xl leading-relaxed mb-8">
          Official-doc based explanations for Laravel, PHP, HTML, CSS, JavaScript, TypeScript, React, MySQL, HTTP & APIs, Next.js, Git — plus security, testing, system design, and DevOps.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {techStack.map((item) => (
            <span
              key={item.label}
              className="px-3 py-1 text-xs font-semibold rounded-full border transition-transform hover:scale-105 cursor-default"
              style={{
                color: item.color,
                borderColor: `${item.color}40`,
                background: `${item.color}14`,
              }}
            >
              {item.label}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/interview"
            className="px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium transition-all shadow-md hover:shadow-teal-500/20 active:scale-95"
          >
            Interview Q&A Bank &rarr;
          </Link>
          <Link
            href="/typescript"
            className="px-6 py-2.5 rounded-lg border border-border-default hover:border-border-active text-primary font-medium transition-colors active:scale-95 bg-white/5"
          >
            Open TypeScript Track &rarr;
          </Link>
        </div>
      </div>

      <div className="info-box" style={{ marginTop: 0 }}>
        The homepage stays beginner-friendly: short explanations first, small examples next, official documentation links, then interview practice.
      </div>

      <div className="stats-row">
        {[
          { value: String(tracks.length), label: 'Study Tracks' },
          { value: String(officialDocCount), label: 'Official Docs' },
          { value: String(tracks.length), label: 'Short Examples' },
          { value: 'Simple', label: 'Language Style' },
        ].map((item) => (
          <div key={item.label} className="stat-card">
            <span className="stat-value">{item.value}</span>
            <span className="stat-label">{item.label}</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <div className="section-title-row">
          <h2>How To Study This Site</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {studySteps.map((step) => (
            <div
              key={step.num}
              style={{
                border: '1px solid var(--border-default)',
                borderRadius: '10px',
                padding: '1rem',
                background: 'var(--bg-surface)',
              }}
            >
              <div
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.1em',
                }}
              >
                Step {step.num}
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '0.375rem' }}>{step.title}</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <div className="section-title-row">
          <h2>Jump To A Track</h2>
          <span className="text-secondary" style={{ fontSize: '0.8125rem' }}>Open the full topic page after the quick summary.</span>
        </div>

        <div className="track-grid">
          {tracks.map((track) => (
            <Link key={track.id} href={`#${track.id}`} className="track-card">
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: track.color }} />
              <div className="track-card-icon" style={{ background: `${track.color}20`, color: track.color }}>
                {track.shortLabel}
              </div>
              <div className="track-card-title">{track.title}</div>
              <div className="track-card-desc">{track.focus}</div>
              <div className="track-card-topics">
                <span className="topic-pill">{track.concept}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {tracks.map((track) => (
          <section key={track.id} id={track.id} className="content-section anchor">
            <div className="section-heading">
              <div className="section-icon" style={{ background: `${track.color}20`, color: track.color }}>
                {track.shortLabel}
              </div>
              <div>
                <h2>{track.title}</h2>
                <p>{track.focus}</p>
              </div>
            </div>

            <div className="concept-card">
              <div className="label" style={{ marginBottom: '0.5rem' }}>Simple Idea</div>
              <div className="concept-card-title">{track.concept}</div>
              <p className="concept-card-summary">{track.simpleExplanation}</p>

              <ul className="notes-list">
                {track.keyPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <div className="label" style={{ marginBottom: '0.5rem' }}>Example</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>{track.exampleTitle}</div>
              <SimpleCodeBlock example={track.example} />

              <div className="info-box">
                <strong style={{ color: 'var(--text-primary)' }}>Why this matters:</strong> {track.whyItMatters}
              </div>

              <div className="label" style={{ marginBottom: '0.5rem' }}>Official Docs</div>
              <OfficialDocLinks docs={track.officialDocs} color={track.color} />

              <div style={{ marginTop: '1rem' }}>
                <Link href={track.href} style={{ color: track.color, fontSize: '0.875rem', fontWeight: 600 }}>
                  Open full {track.title} page -&gt;
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="profile-card" style={{ marginTop: '2rem', marginBottom: 0 }}>
        <div className="profile-info">
          <div className="profile-name">What To Do Next</div>
          <div className="profile-role">
            When the simple explanation feels clear, move to the detailed topic pages and then use the interview question bank to test yourself out loud.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignSelf: 'center' }}>
          <Link
            href="/checklist"
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              border: '1px solid var(--border-default)',
              borderRadius: '8px',
              padding: '0.625rem 1rem',
            }}
          >
            Track your progress -&gt;
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
            Practice interview questions -&gt;
          </Link>
        </div>
      </div>
    </div>
  );
}
