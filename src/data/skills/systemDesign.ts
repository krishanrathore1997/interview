import { SkillPageContent } from '../types';

export const systemDesign: SkillPageContent = {
  topic: 'System Design',
  title: 'System Design (High-Yield)',
  subtitle: 'Scalability, caching, reliability, and data tradeoffs explained in interview-ready language.',
  docs: [
    { label: 'AWS Well-Architected', href: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html' },
    { label: 'Google SRE Book', href: 'https://sre.google/sre-book/table-of-contents/' },
  ],
  sections: [
    {
      id: 'sd-foundations',
      title: 'Foundations',
      description: 'The core concepts you use in most system design interviews.',
      concepts: [
        {
          id: 'sd-scaling',
          title: 'Horizontal vs vertical scaling',
          level: 'Core',
          summary: 'Vertical scaling adds more CPU/RAM to one machine. Horizontal scaling adds more machines behind a load balancer.',
          whyItMatters: 'Scaling strategy influences state management, data stores, and reliability.',
          detailedBreakdown: 'Horizontal scaling requires stateless app servers and shared state (DB/cache/queues).',
          advancedNotes: [
            'Stateless app servers scale easiest behind a load balancer.',
            'State goes to DB, cache (Redis), or durable queues.',
          ],
          pitfalls: [
            'Horizontal scaling without shared session strategy breaks authentication.',
          ],
          interviewQuestions: [
            {
              question: 'Horizontal vs vertical scaling — what’s the difference?',
              answer: 'Vertical scaling means a bigger machine. Horizontal scaling means more machines with load balancing. Horizontal scaling improves availability and throughput but requires stateless app design and shared state.',
              difficulty: 'Easy',
            },
            {
              question: 'Why is a stateless app server a prerequisite for easy horizontal scaling?',
              answer: 'If a server keeps session or request state in its own memory, a load balancer routing a user\'s next request to a different instance won\'t find that state, breaking logins or in-progress work. Statelessness lets any instance handle any request, which is what makes safely adding or removing servers behind a load balancer possible.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'sd-cap',
          title: 'CAP theorem (what it means in practice)',
          level: 'Advanced',
          summary: 'During a network partition, a distributed system must choose between consistency and availability. Real systems pick tradeoffs per operation.',
          whyItMatters: 'Interviewers use CAP to test if you understand distributed tradeoffs and failure modes.',
          detailedBreakdown: 'Consistency vs availability under partitions; eventual consistency for some reads/writes.',
          advancedNotes: [
            'Payments usually favor consistency; feeds often favor availability.',
            'CAP is not “choose two always” — it’s about behavior during partitions.',
          ],
          pitfalls: [
            'Using CAP as a slogan without connecting to real failure scenarios.',
          ],
          interviewQuestions: [
            {
              question: 'What is CAP theorem?',
              answer: 'In a partition, you must choose between consistency and availability. In practice, systems make different tradeoffs depending on the operation and user expectations.',
              difficulty: 'Medium',
            },
            {
              question: 'Give a concrete example of choosing availability over consistency.',
              answer: 'A social post\'s like or comment count can show a slightly stale number during a network partition instead of failing the request outright. Users tolerate a momentarily wrong count far better than a broken page, so the system stays available and reconciles the exact count once the partition heals.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'sd-caching',
      title: 'Caching',
      description: 'Where to cache, how to invalidate, and how to avoid stampedes.',
      concepts: [
        {
          id: 'sd-cache-layers',
          title: 'Caching layers (CDN → server → app → DB)',
          level: 'Core',
          summary: 'Cache close to users first (CDN), then at the edge/server, then in-app (Redis/memory). Cache read-heavy, expensive data.',
          whyItMatters: 'Caching is one of the fastest ways to improve performance and reduce cost.',
          detailedBreakdown: 'Choose cache keys, TTLs, and invalidation strategy based on freshness needs.',
          advancedNotes: [
            'Cache only when you can tolerate staleness or have invalidation.',
            'Measure hit rate and p95 latency; tune iteratively.',
          ],
          pitfalls: [
            'Caching user-specific data publicly can leak data.',
          ],
          interviewQuestions: [
            {
              question: 'Where do you cache and what do you cache?',
              answer: 'CDN for static assets and cacheable GETs, then server/edge cache, then Redis/in-memory for hot data. Cache read-heavy expensive computations with TTLs + invalidation. Always measure hit rate and tail latency.',
              difficulty: 'Medium',
            },
            {
              question: 'What\'s the tradeoff of choosing a longer cache TTL?',
              answer: 'A longer TTL means fewer origin or database hits and better performance, but also means users may see stale data for longer after an update. The right TTL balances how expensive a cache miss is against how quickly the underlying data actually needs to be reflected.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'sd-cache-stampede',
          title: 'Cache stampede prevention',
          level: 'Advanced',
          summary: 'When a hot key expires, many requests recompute at once. Prevent with single-flight, stale-while-revalidate, jittered TTLs, and locks.',
          whyItMatters: 'Stampedes cause outages under load spikes.',
          detailedBreakdown: 'Serve stale value while one worker recomputes; add jitter to avoid synchronized expiry.',
          advancedNotes: [
            'Use request coalescing (one recompute per key).',
            'Stale-while-revalidate avoids thundering herds.',
            'Jitter TTLs to avoid synchronized expiration.',
          ],
          pitfalls: [
            'Locking too aggressively can reduce throughput; keep recomputes bounded and fast.',
          ],
          interviewQuestions: [
            {
              question: 'How do you prevent cache stampedes?',
              answer: 'Use request coalescing/single-flight, stale-while-revalidate, jittered TTLs, and locks for hot keys. Measure hit rate and tail latency.',
              difficulty: 'Hard',
            },
            {
              question: 'What is "stale-while-revalidate" and why does it prevent a stampede?',
              answer: 'Instead of blocking every request while recomputing an expired cache entry, you keep serving the old value immediately to all callers while exactly one background request refreshes it. A spike of concurrent requests on an expired key never turns into a spike of concurrent expensive recomputes.',
              difficulty: 'Hard',
            },
          ],
        },
      ],
    },
    {
      id: 'sd-data',
      title: 'Data & Consistency',
      description: 'Replication, read-your-writes, and safe concurrency patterns.',
      concepts: [
        {
          id: 'sd-replication',
          title: 'Read replicas and replication lag',
          level: 'Advanced',
          summary: 'Read replicas scale reads, but lag can cause stale reads right after writes. Some flows need “read-your-writes” from primary.',
          whyItMatters: 'This shows you understand real production consistency issues.',
          detailedBreakdown: 'Route reads to primary for critical paths; accept eventual consistency for less critical reads.',
          advancedNotes: [
            'Use primary for post-write reads (account balance, payment status).',
            'Use replicas for feeds, analytics, and read-heavy endpoints with staleness tolerance.',
          ],
          pitfalls: [
            'Assuming replicas are always up-to-date can create confusing user experiences.',
          ],
          interviewQuestions: [
            {
              question: 'What can go wrong with read replicas?',
              answer: 'Replication lag. Users may not see their latest write if you read from a replica immediately after a write. Solve with read-your-writes routing to primary for critical flows.',
              difficulty: 'Hard',
            },
            {
              question: 'Why might an app deliberately read from the primary right after a write instead of a replica?',
              answer: 'Replication lag means a replica might not have the just-written data yet. Reading from it immediately after a write — a "read-your-writes" flow — can show the user their own change as if it never happened. Routing that specific read to the primary guarantees they see it.',
              difficulty: 'Hard',
            },
          ],
        },
        {
          id: 'sd-pagination',
          title: 'Pagination at scale (cursor)',
          level: 'Core',
          summary: 'Cursor/keyset pagination scales better than offset and avoids duplicates/skips on changing datasets.',
          whyItMatters: 'It comes up in most API designs for large datasets.',
          detailedBreakdown: 'Use a stable sort key (created_at,id) and return a next cursor token.',
          pitfalls: [
            'Offset pagination can be slow and inconsistent when rows are inserted/deleted.',
          ],
          interviewQuestions: [
            {
              question: 'How do you design pagination for a large API?',
              answer: 'Prefer cursor pagination with a stable sort key and a next-cursor token. Index the sort key. Offset is simple but slow/inconsistent at scale.',
              difficulty: 'Medium',
            },
            {
              question: 'Why does offset pagination break down on a large, actively-changing dataset?',
              answer: 'OFFSET N forces the database to scan and discard the first N rows on every page request, which gets slower as N grows. If rows are inserted or deleted between page loads, the offset no longer lines up with a stable position, so users can see duplicate or skipped items.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'sd-async',
      title: 'Async & Workflows',
      description: 'Queues, retries, and “exactly once” thinking.',
      concepts: [
        {
          id: 'sd-queues',
          title: 'Queues (decouple and smooth spikes)',
          level: 'Core',
          summary: 'Queues decouple producers and consumers and absorb bursts. Use them for background work and retryable workflows.',
          whyItMatters: 'Queues are a standard scaling tool in real products.',
          detailedBreakdown: 'Producers enqueue; workers consume. Add retries and dead-letter queues.',
          advancedNotes: [
            'Design jobs to be idempotent.',
            'Use DLQ for poison messages and manual inspection.',
          ],
          pitfalls: [
            'Retrying non-idempotent jobs causes duplicates (double emails, double charges).',
          ],
          interviewQuestions: [
            {
              question: 'When would you use a queue?',
              answer: 'For background tasks (emails, image processing), smoothing spikes, and workflows that can be retried. It decouples request latency from processing time.',
              difficulty: 'Easy',
            },
            {
              question: 'What\'s the difference between at-least-once and exactly-once delivery, and why does it matter?',
              answer: 'Most real message queues guarantee at-least-once delivery — a message can be redelivered if a worker crashes after processing but before acknowledging. True exactly-once delivery is extremely hard to guarantee end to end, so in practice you design jobs to be idempotent instead of relying on the queue to never redeliver.',
              difficulty: 'Hard',
            },
          ],
        },
        {
          id: 'sd-outbox',
          title: 'Outbox pattern (DB + events safely)',
          level: 'Advanced',
          summary: 'Write an “event” row to an outbox table in the same DB transaction as your business write, then a worker publishes it.',
          whyItMatters: 'It prevents lost events and inconsistent “DB updated but message not published” failures.',
          detailedBreakdown: 'Transactional outbox + relay worker + idempotent consumers.',
          pitfalls: [
            'Publishing events directly after DB commit without durability guarantees can drop events.',
          ],
          interviewQuestions: [
            {
              question: 'What is the outbox pattern and why use it?',
              answer: 'It ensures DB writes and event publication stay consistent by writing the event to an outbox table in the same transaction, then publishing asynchronously. It avoids lost messages.',
              difficulty: 'Hard',
            },
            {
              question: 'What problem does the outbox pattern solve that "commit, then publish" doesn\'t?',
              answer: 'Committing the DB write and publishing an event as two separate steps means a crash in between either loses the event or fires it for a write that got rolled back. Writing the event to an outbox table inside the same transaction as the business write makes both succeed or fail together, and a separate relay worker publishes it reliably afterward.',
              difficulty: 'Hard',
            },
          ],
        },
      ],
    },
    {
      id: 'sd-observability',
      title: 'Observability & Reliability',
      description: 'How you debug production systems and reduce incidents.',
      concepts: [
        {
          id: 'sd-logs-metrics-traces',
          title: 'Logs vs metrics vs traces',
          level: 'Core',
          summary: 'Logs explain what happened for a request. Metrics quantify behavior (rates, p95). Traces show where time is spent across services.',
          whyItMatters: 'Debugging production without observability is guesswork. This is daily work for seniors.',
          detailedBreakdown: 'Use correlation IDs; instrument slow paths; alert on SLOs.',
          advancedNotes: [
            'Add request IDs and propagate across services.',
            'Alert on symptoms (error rate, latency) not on “CPU is high” alone.',
          ],
          pitfalls: [
            'Logging too much (or sensitive data) creates cost and security risks.',
          ],
          interviewQuestions: [
            {
              question: 'How do you debug a production issue you can’t reproduce locally?',
              answer: 'Use observability: logs with request IDs, metrics (spikes in 5xx/p95), and traces to see bottlenecks. Compare environment/config/data differences. Add safe instrumentation behind a flag if needed.',
              difficulty: 'Hard',
            },
            {
              question: 'Why alert on symptoms like error rate and latency instead of raw resource metrics like CPU?',
              answer: 'High CPU doesn\'t necessarily mean users are affected — it might just mean the system is efficiently using its capacity. Alerting on symptoms that directly reflect user experience, like 5xx rate or p95 latency, avoids paging someone for a non-problem and keeps every alert tied to something a user could actually feel.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
  ],
};

