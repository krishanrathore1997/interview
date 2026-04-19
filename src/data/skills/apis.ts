import { SkillPageContent } from '../types';

export const apis: SkillPageContent = {
  topic: 'HTTP & APIs',
  title: 'HTTP & API Design (Real-World)',
  subtitle: 'Status codes, REST design, auth, caching, rate limiting, and reliable integrations.',
  docs: [
    { label: 'MDN HTTP', href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
    { label: 'RFC 9110 (HTTP Semantics)', href: 'https://www.rfc-editor.org/rfc/rfc9110' },
  ],
  sections: [
    {
      id: 'http-basics',
      title: 'HTTP Fundamentals',
      description: 'The request/response model, methods, status codes, and headers you use daily.',
      concepts: [
        {
          id: 'http-methods',
          title: 'HTTP methods + safety + idempotency',
          level: 'Core',
          summary: 'GET/HEAD should be safe (no side effects). PUT/DELETE should be idempotent. POST is usually not idempotent unless you add idempotency keys.',
          whyItMatters: 'Correct semantics make caching, retries, and client behavior predictable — and interviewers love these details.',
          detailedBreakdown: 'Safety = no state change. Idempotency = repeated requests produce same result. Retries depend on idempotency.',
          advancedNotes: [
            'GET is cacheable and can be preloaded/crawled — never mutate state with GET.',
            'PUT is often “replace the resource” (idempotent). PATCH is “partial update”.',
            'POST can be made idempotent using an Idempotency-Key + server-side dedupe.',
          ],
          examples: [
            {
              title: 'Idempotency in payments',
              description: 'Prevent double charge when the client retries.',
              codeSample: {
                label: 'headers',
                language: 'http',
                code: `POST /api/payments
Idempotency-Key: 2c1c0b1b-0d9c-4b8f-9a7f-...
Content-Type: application/json

{"amount": 4999, "currency": "INR"}`,
              },
            },
          ],
          pitfalls: [
            'Treating retries as “harmless” without idempotency leads to duplicated writes.',
            'Using GET for deletes or updates causes accidental changes via caches/crawlers.',
          ],
          interviewQuestions: [
            {
              question: 'What does “idempotent” mean and why does it matter?',
              answer: 'Idempotent means repeating the same request has the same effect as doing it once. It matters because networks fail and clients retry; if your write endpoint isn’t idempotent, retries can duplicate writes (double charge, double order).',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'http-status-codes',
          title: 'Status codes (what to use in real APIs)',
          level: 'Core',
          summary: 'Use 201 for create, 204 for successful no-body, 400/422 for validation, 401/403 for auth, 409 for conflicts, 429 for rate limits.',
          whyItMatters: 'Good status codes speed up debugging and improve client behavior. It’s a frequent interview topic.',
          detailedBreakdown: 'Differentiate authentication vs authorization; validation vs conflict; rate-limit vs server error.',
          advancedNotes: [
            '401 = not authenticated, 403 = authenticated but not allowed.',
            '422 is common for validation errors (especially in Laravel).',
            '409 for concurrency/conflicts (unique constraint, version mismatch).',
            '429 + Retry-After for rate limiting.',
          ],
          examples: [
            {
              title: 'Validation error response',
              description: 'Return a consistent error shape.',
              codeSample: {
                label: 'response.json',
                language: 'json',
                code: `{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is invalid",
    "fields": { "email": "Invalid email format" }
  }
}`,
              },
            },
          ],
          pitfalls: [
            'Returning 200 for everything forces clients to parse strings and makes monitoring harder.',
          ],
          interviewQuestions: [
            {
              question: '401 vs 403 — what’s the difference?',
              answer: '401 means the request is not authenticated (no/invalid credentials). 403 means the user is authenticated but doesn’t have permission for that resource/action.',
              difficulty: 'Easy',
            },
          ],
        },
      ],
    },
    {
      id: 'rest-design',
      title: 'REST & API Design',
      description: 'Resource modeling, naming, pagination, and versioning strategies.',
      concepts: [
        {
          id: 'rest-resource-modeling',
          title: 'Resource modeling (nouns, not verbs)',
          level: 'Core',
          summary: 'Good REST APIs model resources (users/orders) and use HTTP methods for actions, instead of endpoints like /doThing.',
          whyItMatters: 'Resource-oriented APIs are easier to maintain, document, and cache. Interviewers want to see clear thinking.',
          detailedBreakdown: 'Nouns + standard verbs. Nested resources where it matches domain boundaries.',
          advancedNotes: [
            'Prefer /users/:id over /getUser?id=.',
            'Use POST for creating sub-resources: POST /orders to create an order.',
            'Use action endpoints sparingly for true commands: POST /payments/:id/capture.',
          ],
          examples: [
            {
              title: 'Resource-oriented endpoints',
              description: 'Clear and predictable routing.',
              codeSample: {
                label: 'routes',
                language: 'text',
                code: `GET    /users/:id
POST   /users
PATCH  /users/:id
GET    /users/:id/orders`,
              },
            },
          ],
          pitfalls: [
            'Over-nesting can make URLs unreadable. Keep it shallow unless it expresses ownership.',
          ],
          interviewQuestions: [
            {
              question: 'REST vs RPC — when would you choose each?',
              answer: 'REST fits resource CRUD and benefits from HTTP semantics/caching. RPC can be simpler for complex command workflows. In interviews: explain tradeoffs and choose based on product needs and client ecosystem.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'api-pagination',
          title: 'Pagination (offset vs cursor)',
          level: 'Advanced',
          summary: 'Offset pagination is simple but slow/inconsistent at scale. Cursor pagination scales better and avoids duplicates/skips when data changes.',
          whyItMatters: 'Pagination is everywhere in production APIs, and it’s a common system design follow-up.',
          detailedBreakdown: 'Cursor = stable ordering + opaque cursor token. Requires indexes on sort keys.',
          advancedNotes: [
            'Offset: easy, but performance degrades with high offsets.',
            'Cursor: WHERE (created_at,id) > lastSeen ORDER BY created_at,id LIMIT n.',
            'Always define a stable sort order (tie-break with id).',
          ],
          examples: [
            {
              title: 'Cursor pagination shape',
              description: 'Opaque cursor token returned to clients.',
              codeSample: {
                label: 'response.json',
                language: 'json',
                code: `{
  "data": [{ "id": 101 }, { "id": 102 }],
  "nextCursor": "eyJpZCI6MTAyfQ=="
}`,
              },
            },
          ],
          pitfalls: [
            'Using cursor pagination without stable sorting leads to missing/duplicate items.',
            'Exposing raw DB IDs as cursors may leak information — encode/sign cursors.',
          ],
          interviewQuestions: [
            {
              question: 'Why is OFFSET pagination slow on large tables?',
              answer: 'The database must scan and discard N rows before returning the page. As N grows, latency grows. Cursor pagination avoids that by continuing from the last seen key using an index.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'auth',
      title: 'Auth, Cookies, CORS, CSRF',
      description: 'How browsers behave, what can be attacked, and how to defend.',
      concepts: [
        {
          id: 'api-auth-cookies-vs-tokens',
          title: 'Cookies vs bearer tokens',
          level: 'Core',
          summary: 'Cookies are automatically sent by browsers (great for web apps, need CSRF defenses). Bearer tokens are explicit (good for APIs/mobile), but storage is your responsibility.',
          whyItMatters: 'This determines your threat model (CSRF vs token theft) and your integration approach.',
          detailedBreakdown: 'Cookie-based sessions: server state + easy revocation. JWT: stateless verification but harder revocation.',
          advancedNotes: [
            'For browser apps, prefer HttpOnly + Secure cookies to reduce XSS token theft.',
            'SameSite helps mitigate CSRF, but don’t rely on it alone for high-risk flows.',
            'For third-party APIs/mobile, bearer tokens are common; store securely (not localStorage for high-risk apps).',
          ],
          examples: [
            {
              title: 'Cookie flags',
              description: 'Secure defaults for session cookies.',
              codeSample: {
                label: 'Set-Cookie',
                language: 'http',
                code: `Set-Cookie: session=...; HttpOnly; Secure; SameSite=Lax; Path=/`,
              },
            },
          ],
          pitfalls: [
            'Putting secrets in localStorage makes XSS far more damaging.',
          ],
          interviewQuestions: [
            {
              question: 'JWT vs session cookies — what are the tradeoffs?',
              answer: 'Sessions keep state on the server (easy revocation, smaller cookies). JWTs are self-contained (stateless verification) but revocation is harder; token leakage is dangerous. Choose based on architecture and revocation needs.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'cors-vs-csrf',
          title: 'CORS vs CSRF (common confusion)',
          level: 'Core',
          summary: 'CORS is a browser policy controlling which origins can read responses. CSRF is an attack that makes a browser send authenticated requests.',
          whyItMatters: 'Teams often “fix security” by changing CORS. That doesn’t stop CSRF. Interviews love this trap.',
          detailedBreakdown: 'CORS protects response reading. CSRF protects state-changing requests by ensuring intent.',
          advancedNotes: [
            'CORS errors show up in the browser console but are server configuration problems.',
            'CSRF defenses: SameSite cookies, CSRF tokens, Origin/Referer checks, and avoiding GET side effects.',
          ],
          examples: [
            {
              title: 'CORS allowlist',
              description: 'Allow only known origins.',
              codeSample: {
                label: 'CORS',
                language: 'text',
                code: `Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true`,
              },
            },
          ],
          pitfalls: [
            'Allowing * with credentials is invalid and insecure.',
          ],
          interviewQuestions: [
            {
              question: 'Does CORS prevent CSRF?',
              answer: 'No. CORS controls which origins can read responses in the browser. CSRF is about sending authenticated requests; it’s mitigated with SameSite cookies, CSRF tokens, and origin checks.',
              difficulty: 'Easy',
            },
          ],
        },
      ],
    },
    {
      id: 'caching',
      title: 'Caching & Performance',
      description: 'HTTP caching, ETags, CDNs, and rate limiting.',
      concepts: [
        {
          id: 'http-cache-control',
          title: 'Cache-Control, ETag, and 304',
          level: 'Advanced',
          summary: 'Cache-Control defines caching behavior. ETags let clients validate cached responses and receive 304 Not Modified without re-downloading the body.',
          whyItMatters: 'Correct caching reduces latency and cost. It’s a practical performance skill in real projects.',
          detailedBreakdown: 'Strong vs weak validators; max-age; no-store; private vs public caching.',
          advancedNotes: [
            'Use `no-store` for sensitive data (banking, auth tokens).',
            'Use ETag + If-None-Match for assets and read-heavy endpoints.',
            'CDNs cache best when URLs are stable and responses are cacheable.',
          ],
          examples: [
            {
              title: 'ETag validation flow',
              description: 'Client revalidates cached response.',
              codeSample: {
                label: 'headers',
                language: 'http',
                code: `GET /api/products
If-None-Match: "v1-abc123"

HTTP/1.1 304 Not Modified`,
              },
            },
          ],
          pitfalls: [
            'Caching personalized responses publicly can leak data. Use private/no-store correctly.',
          ],
          interviewQuestions: [
            {
              question: 'What problem does ETag solve?',
              answer: 'It lets clients cache responses and later validate whether the cached version is still current. If unchanged, the server returns 304 Not Modified, saving bandwidth and improving speed.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'rate-limiting',
          title: 'Rate limiting (protect APIs)',
          level: 'Advanced',
          summary: 'Rate limiting prevents abuse and protects your service under spikes. Communicate it with 429 and Retry-After.',
          whyItMatters: 'This is a standard production requirement, especially for login endpoints and public APIs.',
          detailedBreakdown: 'Token bucket vs fixed/sliding window; per-IP vs per-user; edge vs app-layer.',
          advancedNotes: [
            'Return 429 Too Many Requests and include Retry-After when possible.',
            'Prefer limiting by API key/user when available; IP-only can punish NAT/shared networks.',
            'Use Redis or gateway limits to avoid per-instance counters.',
          ],
          examples: [
            {
              title: '429 response',
              description: 'Tell clients when to retry.',
              codeSample: {
                label: 'headers',
                language: 'http',
                code: `HTTP/1.1 429 Too Many Requests
Retry-After: 30`,
              },
            },
          ],
          pitfalls: [
            'Rate limiting without good error messages causes client retry storms.',
          ],
          interviewQuestions: [
            {
              question: 'How do you implement rate limiting in a scalable system?',
              answer: 'Use a shared store (like Redis) or an API gateway to track counters per key (user/API key/IP). Use token bucket/sliding window algorithms, return 429 with retry hints, and avoid per-server local counters that break under horizontal scaling.',
              difficulty: 'Hard',
            },
          ],
        },
      ],
    },
    {
      id: 'webhooks',
      title: 'Webhooks & Reliability',
      description: 'Signatures, retries, idempotency, and safe background processing.',
      concepts: [
        {
          id: 'webhooks-signatures',
          title: 'Webhook signatures and verification',
          level: 'Core',
          summary: 'Webhook endpoints must verify signatures to ensure events really came from the provider and weren’t modified.',
          whyItMatters: 'Webhooks are a common integration path. Signature verification prevents spoofing and privilege escalation.',
          detailedBreakdown: 'Shared secret + HMAC signature header. Verify before processing and before logging sensitive payload.',
          advancedNotes: [
            'Verify signature first, then parse/process.',
            'Respond fast (enqueue work) to avoid provider timeouts and retries.',
          ],
          examples: [
            {
              title: 'Typical flow',
              description: 'Verify, enqueue, ack.',
              codeSample: {
                label: 'flow',
                language: 'text',
                code: `1) Verify signature
2) Store event id
3) Enqueue job
4) Return 200 quickly`,
              },
            },
          ],
          pitfalls: [
            'Doing heavy work synchronously increases timeouts and duplicate deliveries.',
          ],
          interviewQuestions: [
            {
              question: 'How do you securely handle incoming webhooks?',
              answer: 'Verify signatures, respond quickly, process asynchronously, and make handlers idempotent using event IDs. Log correlation IDs and handle retries and dead-letter failures.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'timeouts-retries',
          title: 'Timeouts, retries, and idempotency as a set',
          level: 'Advanced',
          summary: 'Retries without timeouts can hang the system; retries without idempotency can duplicate writes. Use backoff + jitter and idempotency keys.',
          whyItMatters: 'This is one of the highest-signal production engineering topics in interviews.',
          detailedBreakdown: 'Deadlines, exponential backoff, idempotency keys, and safe error propagation.',
          advancedNotes: [
            'Use timeouts everywhere (client + server + DB).',
            'Retry only transient failures, with exponential backoff + jitter.',
            'Add idempotency to write operations that might be retried.',
          ],
          examples: [
            {
              title: 'Retry policy sketch',
              description: 'A simple and safe approach.',
              codeSample: {
                label: 'policy',
                language: 'text',
                code: `Attempts: 3
Backoff: 200ms, 500ms, 1s (+ jitter)
Retry: 429/503/timeouts
Never retry: 4xx validation`,
              },
            },
          ],
          pitfalls: [
            'Retry storms can DDOS your own services. Add jitter, limits, and circuit breakers.',
          ],
          interviewQuestions: [
            {
              question: 'Why do retries and idempotency go together?',
              answer: 'Because clients and servers retry under failure. If an operation isn’t idempotent, a retry can apply the write twice. Idempotency keys or safe “set” semantics ensure retries don’t create duplicates.',
              difficulty: 'Hard',
            },
          ],
        },
      ],
    },
  ],
};

