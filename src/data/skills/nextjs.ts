import { SkillPageContent } from '../types';

export const nextjs: SkillPageContent = {
  topic: 'Next.js',
  title: 'Next.js 16 & App Router - Production Architecture',
  subtitle: 'Server-first composition, Cache Components, Server Functions, streaming, revalidation, and security.',
  docs: [
    { label: 'Next.js Docs', href: 'https://nextjs.org/docs' },
    { label: 'Server and Client Components', href: 'https://nextjs.org/docs/app/getting-started/server-and-client-components' },
    { label: 'Linking and Navigating', href: 'https://nextjs.org/docs/app/getting-started/linking-and-navigating' },
    { label: 'Caching in the App Router', href: 'https://nextjs.org/docs/app/getting-started/caching' },
    { label: 'Upgrade Guide for Version 16', href: 'https://nextjs.org/docs/app/guides/upgrading/version-16' },
  ],
  sections: [
    {
      id: 'app-router',
      title: 'App Router - Layouts, Pages & Server-First',
      description: 'Server Components, Layouts, and when to cross the client boundary.',
      concepts: [
        {
          id: 'route-architecture',
          title: 'Server Components, Layouts & Route Segments',
          level: 'Core',
          summary: 'Every page and layout in the App Router is a Server Component by default. Add "use client" only when you actually need client-side interactivity.',
          whyItMatters: 'Next.js 13+ (App Router) shifted the paradigm to server-first. Understanding this is critical for reducing bundle size and improving core web vitals.',
          detailedBreakdown: 'The distinction between Server and Client components. Component composition patterns. The client boundary and its implications for bundle size.',
          advancedNotes: [
            'Server Components can fetch data directly on the server.',
            'Layouts share UI across routes without re-mounting.',
            'Adding "use client" too high in the tree sends more JavaScript to the browser than necessary.',
          ],
          examples: [
            {
              title: 'Server-first page',
              description: 'Fetch data on the server, then render a small interactive island on the client.',
              codeSample: {
                label: 'app/page.tsx',
                language: 'tsx',
                code: `export default async function Page() {
  const stats = await getStats();

  return (
    <div>
      <StatsGrid data={stats} />
      <InteractiveChart />
    </div>
  );
}`,
              },
            },
          ],
          pitfalls: [
            'Adding "use client" to a layout converts the entire subtree to the client bundle.',
            'Trying to read browser-only APIs like window inside a Server Component.',
          ],
          interviewQuestions: [
            {
              question: 'When should you add "use client" in Next.js?',
              answer: 'Only when you need browser APIs, event handlers, or client-only hooks like useState and useEffect.',
              difficulty: 'Easy'
            },
            {
              question: 'Why can\'t you pass a function as a prop from a Server Component to a Client Component?',
              answer: 'Server Components run and finish executing entirely on the server, and their output is serialized and sent to the client. A function isn\'t serializable, so only serializable data — strings, numbers, plain objects, JSX — can cross that boundary; interactivity itself must live inside a Client Component.',
              difficulty: 'Hard'
            },
          ],
        },
        {
          id: 'server-actions',
          title: 'Server Functions for Mutations',
          level: 'Core',
          summary: 'Run server-side code for form submissions and user actions without building a separate API route for every small mutation.',
          whyItMatters: 'Server Actions simplify the developer experience by unifying client and server code, reducing the overhead of managing API endpoints for simple state changes.',
          detailedBreakdown: 'Defining server-side functions with "use server". Revalidating data after mutations. Handling form-level states with modern hooks.',
          advancedNotes: [
            '"use server" marks async functions for server execution.',
            'revalidatePath() refreshes route output after a mutation.',
            'Server Functions are best for user-triggered writes such as forms, buttons, and updates.',
          ],
          examples: [
            {
              title: 'Server Function',
              description: 'Submit form data directly to server code.',
              codeSample: {
                label: 'actions.ts',
                language: 'tsx',
                code: `'use server';

export async function createPost(formData: FormData) {
  await db.post.create({
    data: { title: String(formData.get('title')) },
  });

  revalidatePath('/posts');
}`,
              },
            },
          ],
          pitfalls: [
            'Calling a Server Function inside useEffect instead of a user action.',
            'Forgetting to revalidate data after a successful mutation.',
          ],
          interviewQuestions: [
            {
              question: 'What problem do Server Functions solve?',
              answer: 'They keep simple write operations on the server without needing a separate API route for every form or button action.',
              difficulty: 'Medium'
            },
            {
              question: 'Why is calling a Server Function from inside useEffect usually a mistake?',
              answer: 'Server Functions are designed for user-triggered writes tied to an explicit action, like a form submit or button click, where the mutation has clear intent and pending/error UI. Firing one from useEffect can trigger it on every render or mount, causing duplicate writes the user never asked for.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'routing-file-conventions',
      title: 'Routing & File Conventions',
      description: 'The special files and route patterns that make App Router projects predictable.',
      concepts: [
        {
          id: 'special-files',
          title: 'page, layout, template, loading, error, not-found and route',
          level: 'Core',
          summary: 'Next.js uses special filenames inside app route segments to define UI, shared layouts, loading states, errors, 404s, and API endpoints.',
          whyItMatters: 'Most App Router debugging starts with knowing which file owns which behavior. This is a daily project skill and common interview topic.',
          detailedBreakdown: 'page.tsx renders a route. layout.tsx wraps nested routes and preserves state. template.tsx remounts on navigation. loading.tsx creates an automatic Suspense boundary. error.tsx is a client error boundary. not-found.tsx handles 404 UI. route.ts creates HTTP endpoints.',
          advancedNotes: [
            'A route segment cannot have page.tsx and route.ts at the same level.',
            'Use template.tsx when you need a fresh instance on navigation; use layout.tsx when shared UI should preserve state.',
            'loading.tsx improves dynamic route navigation by giving immediate feedback and partial prefetching.',
          ],
          examples: [
            {
              title: 'Common segment files',
              description: 'A realistic App Router folder shape.',
              codeSample: {
                label: 'app/dashboard/*',
                language: 'text',
                code: `app/dashboard/layout.tsx
app/dashboard/loading.tsx
app/dashboard/error.tsx
app/dashboard/page.tsx
app/dashboard/api/route.ts`,
              },
            },
          ],
          pitfalls: [
            'Putting route.ts next to page.tsx in the same segment.',
            'Using layout.tsx when the UI must reset on every navigation.',
          ],
          interviewQuestions: [
            {
              question: 'What is the difference between layout.tsx and template.tsx?',
              answer: 'layout.tsx is shared and preserves state between child route navigations. template.tsx creates a new instance on navigation, so it can reset state, animations, or effects.',
              difficulty: 'Medium',
            },
            {
              question: 'Why does loading.tsx improve perceived performance on a slow dynamic route?',
              answer: 'It automatically wraps the route segment in a Suspense boundary, so Next.js can immediately show that fallback while the slower data-dependent content streams in behind it, instead of leaving the user staring at a blank screen or the previous page until the whole route is ready.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'dynamic-route-patterns',
          title: 'Dynamic routes, route groups, parallel routes and intercepting routes',
          level: 'Advanced',
          summary: 'App Router supports dynamic params, invisible route groups, slots for parallel UI, and intercepting routes for modal-style flows.',
          whyItMatters: 'These patterns explain real product routing: dashboards, auth groups, modals, split layouts, and details pages that preserve the previous screen.',
          detailedBreakdown: '[slug] creates dynamic params. (group) organizes routes without changing the URL. @slot creates parallel route slots. Intercepting routes let one route render another route in the current layout context.',
          advancedNotes: [
            'Route groups are useful for separating marketing, app, and auth layouts without changing URLs.',
            'Parallel routes are good for dashboards where independent panels load or error separately.',
            'Intercepting routes are often used for photo/product/detail modals while preserving direct URL access.',
          ],
          examples: [
            {
              title: 'Routing patterns',
              description: 'Folder names carry meaning in App Router.',
              codeSample: {
                label: 'app/*',
                language: 'text',
                code: `app/blog/[slug]/page.tsx
app/(marketing)/page.tsx
app/dashboard/@analytics/page.tsx
app/photos/(.)[id]/page.tsx`,
              },
            },
          ],
          pitfalls: [
            'Using route groups for URL structure; groups do not appear in the URL.',
            'Using parallel routes where simple component composition is enough.',
          ],
          interviewQuestions: [
            {
              question: 'What are route groups in Next.js?',
              answer: 'Route groups are folders wrapped in parentheses, like (marketing). They organize routes and apply layouts without adding a URL segment.',
              difficulty: 'Medium',
            },
            {
              question: 'Why use an intercepting route for a photo modal instead of a plain conditional modal component?',
              answer: 'An intercepting route stays reachable by direct URL — sharing or refreshing the link still lands on the full detail page — while showing it as an overlay when navigated to from within the app. A plain client-side modal has no URL of its own, so a shared link or refresh loses that context entirely.',
              difficulty: 'Hard',
            },
          ],
        },
      ],
    },
    {
      id: 'navigation-and-builtins',
      title: 'Navigation & Built-in Components',
      description: 'The official primitives for navigation, images, fonts, scripts, forms and metadata.',
      concepts: [
        {
          id: 'link-prefetch-navigation',
          title: 'Link, prefetching, useRouter and loading UI',
          level: 'Core',
          summary: 'The Link component enables client-side navigation and automatic prefetching. loading.tsx and Suspense make route transitions feel responsive.',
          whyItMatters: 'Navigation performance is one of the biggest UX wins in Next.js. Interviewers often ask why Link is better than a plain anchor for internal routes.',
          detailedBreakdown: 'Link handles client-side transitions and can prefetch routes. Static routes can be fully prefetched; dynamic routes may be skipped or partially prefetched when loading.tsx exists. useRouter is for imperative client navigation.',
          advancedNotes: [
            'Use Link for internal navigation and a for external links or full document navigation.',
            'Dynamic routes without loading.tsx can feel slow because the client waits for the server response.',
            'Use router.push or router.replace in Client Components only when navigation is triggered imperatively.',
          ],
          examples: [
            {
              title: 'Fast internal navigation',
              description: 'Link gives client transitions and prefetch behavior.',
              codeSample: {
                label: 'nav.tsx',
                language: 'tsx',
                code: `import Link from 'next/link';

export function Nav() {
  return <Link href="/dashboard">Dashboard</Link>;
}`,
              },
            },
          ],
          pitfalls: [
            'Using a plain anchor for internal navigation and losing client-side transitions.',
            'Forgetting loading.tsx on slow dynamic routes.',
          ],
          interviewQuestions: [
            {
              question: 'Why use next/link instead of a plain a tag for internal navigation?',
              answer: 'Link enables client-side transitions and route prefetching, so shared layouts can stay mounted and navigation feels faster. A plain anchor triggers normal browser document navigation.',
              difficulty: 'Easy',
            },
            {
              question: 'Why might a dynamic route feel slower to navigate to even with next/link?',
              answer: 'Link can only prefetch what\'s safe to prefetch ahead of time. A fully dynamic route without loading.tsx has to wait for the server to actually render before anything shows up, so click-to-content time depends on that server response instead of a cached prefetch.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'image-font-script-form-metadata',
          title: 'Image, Font, Script, Form and Metadata APIs',
          level: 'Core',
          summary: 'Next.js includes built-in primitives for common production needs: optimized images, self-hosted fonts, third-party scripts, enhanced forms, and SEO metadata.',
          whyItMatters: 'These APIs are regular production work. They affect Core Web Vitals, SEO, accessibility, and mutation UX.',
          detailedBreakdown: 'next/image optimizes size, lazy loading, formats, and layout stability. next/font self-hosts fonts. next/script controls third-party script loading. next/form enhances navigation for form submissions. metadata and generateMetadata generate head tags.',
          advancedNotes: [
            'Use width/height or static imports with Image to prevent layout shift.',
            'Remote images must be allowed in next.config image settings.',
            'metadata and generateMetadata are supported in Server Components.',
          ],
          examples: [
            {
              title: 'Metadata and Image',
              description: 'Two high-frequency APIs in real Next.js apps.',
              codeSample: {
                label: 'app/page.tsx',
                language: 'tsx',
                code: `import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Team metrics and reports',
};

export default function Page() {
  return <Image src="/hero.png" alt="Dashboard preview" width={1200} height={630} />;
}`,
              },
            },
          ],
          pitfalls: [
            'Using unoptimized img tags for critical images that affect LCP.',
            'Putting metadata exports in Client Components.',
          ],
          interviewQuestions: [
            {
              question: 'What problem does next/image solve?',
              answer: 'It optimizes image size and format, supports lazy loading, handles remote/local images, and helps prevent layout shift when width and height are known.',
              difficulty: 'Easy',
            },
            {
              question: 'Why does next/font avoid the layout shift a regular Google Fonts <link> tag usually causes?',
              answer: 'next/font downloads and self-hosts the font at build time and injects @font-face rules with size-adjust metrics computed for that font, so the browser can reserve the correct space before it loads. A regular external <link> renders with a fallback font first, then swaps fonts once the network request finishes, shifting layout.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'rendering-performance',
      title: 'Rendering Performance - Cache Components & Streaming',
      description: 'How Next.js 16 uses cache tools and Suspense-based streaming for fast pages.',
      concepts: [
        {
          id: 'cache-components',
          title: 'Cache Components in Next.js 16',
          level: 'Advanced',
          summary: 'Next.js 16 replaces the old experimental PPR path with Cache Components, caching directives, and streaming patterns built around Suspense.',
          whyItMatters: 'Next.js 16 introduces more granular control over caching. Senior developers must master these to balance high performance with data freshness.',
          detailedBreakdown: 'Granular caching at the component level. Integration with Suspense for non-blocking UI. The evolution from experimental PPR to stable cache control.',
          advancedNotes: [
            'Pages stay server-first by default.',
            'Wrap slower or uncached parts in Suspense so they can stream later.',
            'Old PPR flags from Next.js 15 canaries should not be copied into a Next.js 16 app.',
          ],
          examples: [
            {
              title: 'Stream a dynamic section',
              description: 'Send the main page immediately and load the slow part after.',
              codeSample: {
                label: 'app/page.tsx',
                language: 'tsx',
                code: `export default function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <Suspense fallback={<Loader />}>
        <DynamicStats />
      </Suspense>
    </main>
  );
}`,
              },
            },
          ],
          pitfalls: [
            'Using old PPR flags from outdated examples even though Next.js 16 moved to Cache Components.',
            'Forgetting Suspense around slow dynamic parts, which can make the whole page wait.',
          ],
          interviewQuestions: [
            {
              question: 'What changed from PPR to Next.js 16 Cache Components?',
              answer: 'Next.js 16 no longer uses the older experimental PPR route flag. It focuses on cache tools and Suspense-based streaming for mixing fast static content with dynamic content.',
              difficulty: 'Hard'
            },
            {
              question: 'Why does wrapping a slow section in Suspense change what the rest of the page has to wait for?',
              answer: 'Without Suspense, the whole page\'s response can\'t be sent until every part of it is ready. Wrapping a slow section in Suspense lets Next.js send the fast, ready parts immediately and stream the fallback-then-real content separately, so one slow dependency no longer blocks parts of the page that were always ready.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'security',
      title: 'Security & Sanitization',
      description: 'CSP, safe server boundaries, and request-time hardening.',
      concepts: [
        {
          id: 'hardening',
          title: 'CSP, Server Boundaries, and Safe Configuration',
          level: 'Advanced',
          summary: 'Keep secrets on the server, use safe headers, and prefer the modern proxy convention for request-time hardening.',
          whyItMatters: 'Web security is a priority. Understanding server boundaries and how to enforce security policies like CSP (Content Security Policy) is key for production apps.',
          detailedBreakdown: 'Environment variable safety. CSRF protection in server actions. Hardening with security headers using the modern proxy convention.',
          advancedNotes: [
            'Only NEXT_PUBLIC_ variables should reach the client bundle.',
            'Server Functions include CSRF protection.',
            'Prefer proxy.ts for modern request-time hardening examples in Next.js 16.',
          ],
          examples: [
            {
              title: 'Proxy for security headers',
              description: 'Set a basic security header in a request-time boundary.',
              codeSample: {
                label: 'proxy.ts',
                language: 'typescript',
                code: `import { NextResponse } from 'next/server';

export function proxy() {
  const res = NextResponse.next();
  res.headers.set('X-Frame-Options', 'DENY');
  return res;
}`,
              },
            },
          ],
          pitfalls: [
            'Putting private keys in NEXT_PUBLIC_ environment variables.',
            'Injecting unsanitized user data into dangerouslySetInnerHTML.',
          ],
          interviewQuestions: [
            {
              question: 'How do you prevent XSS in Next.js?',
              answer: 'Use React and Next.js automatic escaping, avoid unsafe HTML injection, and add a clear Content Security Policy and safe server boundaries.',
              difficulty: 'Medium'
            },
            {
              question: 'Why do Server Functions still need CSRF protection when they\'re not traditional REST endpoints?',
              answer: 'A Server Function is invoked over an HTTP POST under the hood, and if a browser holds an authenticated session cookie for your site, a malicious page could still try to trigger that action, just like classic form-based CSRF, unless the framework validates the request actually originated from your own app.',
              difficulty: 'Hard'
            },
          ],
        },
      ],
    },
    {
      id: 'caching',
      title: 'Caching & Revalidation',
      description: 'Understanding revalidation, tags, and how to keep pages fast and fresh.',
      concepts: [
        {
          id: 'isr',
          title: 'Incremental Static Regeneration (ISR)',
          level: 'Core',
          summary: 'Keep a page fast by serving cached output and refresh it later with timed or tagged revalidation.',
          whyItMatters: 'ISR provides the performance of static sites with the flexibility of dynamic ones. Essential for e-commerce, blogs, and marketing pages.',
          detailedBreakdown: 'Static page generation. Cache invalidation strategies. Timed vs. Tag-based revalidation.',
          advancedNotes: [
            'next: { revalidate: 60 } keeps the page fresh on a timer.',
            'revalidateTag() is useful for targeted invalidation.',
            'updateTag() is useful when the user should immediately see the result of their own change.',
          ],
          examples: [
            {
              title: 'ISR Pattern',
              description: 'Fetch data with timed revalidation.',
              codeSample: {
                label: 'isr.tsx',
                language: 'tsx',
                code: `const res = await fetch('https://example.com/posts', {
  next: { revalidate: 60 },
});`,
              },
            },
          ],
          pitfalls: [
            'Mixing static and dynamic data without understanding the cache boundary.',
            'Forgetting to call revalidateTag() or revalidatePath() after a write.',
          ],
          interviewQuestions: [
            {
              question: 'What is ISR?',
              answer: 'It means serving a cached page first and then refreshing it later in the background so users get both speed and fresh data.',
              difficulty: 'Medium'
            },
            {
              question: 'When would you choose revalidateTag() over revalidatePath()?',
              answer: 'revalidatePath() invalidates everything rendered by one specific route, even if multiple unrelated pieces of data were fetched there. revalidateTag() invalidates just the data that changed — tag a specific fetch and revalidate only that tag — which is more precise when the same data is reused across several different pages.',
              difficulty: 'Hard'
            },
          ],
        },
      ],
    },
    {
      id: 'deployment-infrastructure',
      title: 'Infrastructure & Advanced Performance',
      description: 'Edge functions, middleware, and Vercel analytics.',
      concepts: [
        {
          id: 'middleware-edge',
          title: 'Middleware & Edge Functions',
          level: 'Advanced',
          summary: 'Run code at the edge before a request is completed.',
          whyItMatters: 'Middleware allows for global authentication, redirect logic, and A/B testing without adding latency to the main page render.',
          detailedBreakdown: 'Filtering requests by route. Modifying headers. Early redirects before the origin server is hit.',
          interviewQuestions: [
            {
              question: 'What can you do in Next.js Middleware?',
              answer: 'You can inspect cookies, rewrite/redirect requests, and add custom headers. It runs before the route handler, making it perfect for global auth checks.',
              difficulty: 'Medium'
            },
            {
              question: 'Why is Middleware a poor place to do a full database lookup for authorization?',
              answer: 'Middleware runs on every matching request, often on an edge runtime with limited APIs and a strict time budget, before the request even reaches your normal server environment. A slow database call there adds latency to every request through that path, so middleware is best for cheap checks like reading a cookie or token, not full authorization logic.',
              difficulty: 'Hard'
            }
          ]
        },
        {
          id: 'environment-config-observability',
          title: 'Environment variables, redirects, instrumentation and production checks',
          level: 'Core',
          summary: 'Production Next.js work includes env loading, safe browser exposure, routing rules, observability hooks, deployment checks, and build/runtime configuration.',
          whyItMatters: 'Many real bugs are not component bugs; they are configuration, deployment, environment, or monitoring problems.',
          detailedBreakdown: 'Next loads .env files from the project root. NEXT_PUBLIC_ variables are bundled for the browser. next.config can define redirects, rewrites, headers, images, and build settings. instrumentation hooks are used for observability. Production checklists cover security, performance, logging, and caching.',
          advancedNotes: [
            'Never commit real .env files or expose secrets with NEXT_PUBLIC_.',
            'Use redirects for URL changes and rewrites when the browser URL should stay the same.',
            'Use instrumentation/OpenTelemetry for tracing server work in production.',
          ],
          examples: [
            {
              title: 'Environment variable boundary',
              description: 'Only public values should use NEXT_PUBLIC_.',
              codeSample: {
                label: '.env',
                language: 'text',
                code: `DATABASE_URL=mysql://secret
NEXT_PUBLIC_ANALYTICS_ID=public-client-id`,
              },
            },
          ],
          pitfalls: [
            'Expecting .env files inside src to be loaded.',
            'Putting private tokens in NEXT_PUBLIC_ variables.',
            'Using rewrites when the user should see the new canonical URL.',
          ],
          interviewQuestions: [
            {
              question: 'How do environment variables work in Next.js?',
              answer: 'Next.js loads .env files from the project root into process.env on the server. Variables prefixed with NEXT_PUBLIC_ are inlined into the browser bundle, so secrets must never use that prefix.',
              difficulty: 'Medium',
            },
            {
              question: 'Why use a redirect instead of a rewrite when a page has permanently moved?',
              answer: 'A redirect changes the URL the browser and user actually see, updating bookmarks and search indexing to the new canonical address. A rewrite serves different content at the same visible URL without the browser knowing, which is wrong for a moved page since old links and search results would keep pointing at a URL that no longer represents the canonical location.',
              difficulty: 'Medium',
            },
          ],
        }
      ]
    },
  ],
};
