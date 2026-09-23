import { SkillPageContent } from '../types';

export const testing: SkillPageContent = {
  topic: 'Testing',
  title: 'Testing & Quality (Practical)',
  subtitle: 'Unit, integration, E2E, flakiness, and CI practices that teams actually use.',
  docs: [
    { label: 'Testing Library', href: 'https://testing-library.com/' },
    { label: 'PHPUnit', href: 'https://phpunit.de/' },
  ],
  sections: [
    {
      id: 'testing-strategy',
      title: 'Strategy',
      description: 'What to test, where to test, and how to avoid wasting time.',
      concepts: [
        {
          id: 'test-pyramid',
          title: 'Unit vs integration vs E2E (the test pyramid)',
          level: 'Core',
          summary: 'Unit tests are fast and isolated. Integration tests validate multiple components (DB/framework). E2E tests validate user flows in a real browser.',
          whyItMatters: 'A good suite catches bugs early without slowing the team down. This is a frequent interview question.',
          detailedBreakdown: 'Many unit tests, some integration tests, a few E2E tests for critical paths.',
          advancedNotes: [
            'Unit tests: pure logic, edge cases, invariants.',
            'Integration tests: DB queries, routing, auth, serialization.',
            'E2E tests: “login → checkout” critical flows only.',
          ],
          pitfalls: [
            'Only doing E2E tests makes feedback slow and flaky.',
            'Only doing unit tests misses real integration bugs (DB/auth/routing).',
          ],
          interviewQuestions: [
            {
              question: 'Explain unit vs integration vs E2E testing.',
              answer: 'Unit tests cover small logic in isolation. Integration tests cover multiple components together (framework, DB, HTTP). E2E tests simulate real user flows. A healthy suite is a pyramid: many unit, some integration, few E2E.',
              difficulty: 'Easy',
            },
            {
              question: 'Why do integration tests catch bugs that unit tests miss?',
              answer: 'Unit tests mock dependencies by design, so they can\'t catch a bug in how two real components actually connect — a wrong SQL query, a misconfigured route, a serialization mismatch. Integration tests exercise the real wiring, which is where a large share of production bugs actually live.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'what-to-test',
          title: 'What to test (high-signal areas)',
          level: 'Core',
          summary: 'Test the risky parts: business rules, money, permissions, data integrity, and edge cases — not trivial getters.',
          whyItMatters: 'The goal is confidence, not maximum coverage. Interviews love “what do you test first?”',
          detailedBreakdown: 'Prioritize correctness and regressions over pure coverage numbers.',
          advancedNotes: [
            'Write tests for authorization boundaries (IDOR prevention).',
            'Test validation rules and error shapes for APIs.',
            'Add regression tests after bug fixes.',
          ],
          pitfalls: [
            'Chasing 100% coverage can create brittle tests and waste time on low-risk code.',
          ],
          interviewQuestions: [
            {
              question: 'Why is 100% test coverage not the goal?',
              answer: 'Coverage measures what ran, not what was asserted. You want high-signal tests on risky logic and critical flows. Chasing 100% often produces brittle tests on trivial code.',
              difficulty: 'Medium',
            },
            {
              question: 'How would you decide what to test first on a brand-new feature?',
              answer: 'Start with the parts that are expensive to get wrong: money or billing logic, authorization boundaries, and calculations with real edge cases like rounding, empty input, or boundary values. Trivial getters and framework-generated code add coverage numbers without adding real confidence.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'unit-testing',
      title: 'Unit Testing',
      description: 'Fast feedback, pure logic, and clean dependency boundaries.',
      concepts: [
        {
          id: 'mocks-stubs-spies',
          title: 'Mock vs stub vs spy',
          level: 'Core',
          summary: 'Stub returns canned values. Spy records calls. Mock is a fake with expectations about how it’s called.',
          whyItMatters: 'This language shows experience. It also helps you pick the right test double and avoid brittle tests.',
          detailedBreakdown: 'Use stubs/mocks at boundaries (network, time). Prefer real code for business logic.',
          advancedNotes: [
            'Stub to isolate a dependency output.',
            'Spy to verify calls without changing behavior.',
            'Mock when interaction itself is the contract (e.g., job dispatched).',
          ],
          pitfalls: [
            'Mocking too much couples tests to implementation details.',
          ],
          interviewQuestions: [
            {
              question: 'What’s the difference between mocks, stubs, and spies?',
              answer: 'Stubs return fixed values. Spies record calls. Mocks also record calls but typically include expectations like “must be called with X”. Use them at boundaries and keep core logic real.',
              difficulty: 'Easy',
            },
            {
              question: 'When would mocking too aggressively actually hurt your test suite?',
              answer: 'If every collaborator is mocked, the test only verifies your code calls the mocks the way you expected, not that the real system behaves correctly. A refactor that keeps behavior identical but changes internal call patterns then breaks tests that shouldn\'t have broken, teaching the team to distrust red CI.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'unit-design',
          title: 'Designing code to be testable',
          level: 'Advanced',
          summary: 'Testable code has clear inputs/outputs and dependencies that can be swapped (DI). Avoid global state and time/network in pure logic.',
          whyItMatters: 'If you can’t test it, you can’t refactor safely. Testable design is senior-level thinking.',
          detailedBreakdown: 'Separate pure functions from side effects; inject dependencies; keep functions small.',
          advancedNotes: [
            'Extract pure functions for business rules.',
            'Inject time/randomness (clock, UUID generator) so tests are deterministic.',
          ],
          pitfalls: [
            'Singletons/global state cause test order coupling and flakiness.',
          ],
          interviewQuestions: [
            {
              question: 'How do you make code more testable?',
              answer: 'Separate pure logic from side effects, inject dependencies (DB/time/network), avoid global state, and keep functions small with clear inputs/outputs. This makes unit tests fast and reliable.',
              difficulty: 'Medium',
            },
            {
              question: 'Why does injecting a clock or UUID generator make tests more reliable than calling Date.now() directly?',
              answer: 'A function that reads the real clock or generates a real random ID produces a different result on every run, so assertions on time- or ID-based output become flaky or impossible to write precisely. Injecting a fake clock or generator lets the test control the exact value and assert deterministically.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'integration-testing',
      title: 'Integration Testing',
      description: 'Where most real bugs live: DB, auth, serialization, and framework behavior.',
      concepts: [
        {
          id: 'api-endpoint-tests',
          title: 'Testing API endpoints (status, auth, schema)',
          level: 'Core',
          summary: 'A good endpoint test asserts status codes, validation errors, authorization, and response shape — plus side effects.',
          whyItMatters: 'API bugs often come from glue code: middleware, validators, serialization, and DB state.',
          detailedBreakdown: 'Test the contract, not the implementation. Use fixtures/seed data and isolate DB state.',
          advancedNotes: [
            'Assert authz: “user without permission gets 403”.',
            'Assert validation: “bad input gets 422 with field errors”.',
            'Assert side effects: DB rows created/updated as expected.',
          ],
          pitfalls: [
            'Hitting real third-party services in tests causes flakiness and slowness.',
          ],
          interviewQuestions: [
            {
              question: 'How do you test an API endpoint effectively?',
              answer: 'Test status codes, validation errors, authentication/authorization, and response schema. Use a test DB (transactions/fixtures) and assert side effects. Mock external services at the boundary.',
              difficulty: 'Medium',
            },
            {
              question: 'Why test the response schema, not just the status code, for an API endpoint?',
              answer: 'A 200 status code doesn\'t guarantee the body still has the shape consumers expect — a field could silently be renamed, removed, or change type without touching the status code. Schema assertions catch contract-breaking changes that a purely status-code-based test would miss entirely.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'db-isolation',
          title: 'DB isolation (keep tests independent)',
          level: 'Advanced',
          summary: 'Tests must not depend on ordering or shared DB state. Use transactions, refresh DB, or per-test schemas.',
          whyItMatters: 'Most flaky backend tests are caused by shared state and timing issues.',
          detailedBreakdown: 'Fresh fixtures, deterministic data, and cleanup.',
          advancedNotes: [
            'Laravel: RefreshDatabase or transactions per test.',
            'Avoid relying on auto-increment IDs when ordering matters.',
          ],
          pitfalls: [
            'Shared state across tests causes “passes locally, fails in CI”.',
          ],
          interviewQuestions: [
            {
              question: 'What makes tests flaky and how do you fix it?',
              answer: 'Flakes come from timing, concurrency, shared state, random data, real network, and clocks. Fix with deterministic data, isolated DB state, proper waiting for async conditions, and mocking at boundaries.',
              difficulty: 'Hard',
            },
            {
              question: 'Why does "passes locally, fails in CI" often trace back to test isolation?',
              answer: 'Locally, tests might always run one at a time in the same order, silently relying on data left behind by a previous test. In CI, tests can run in parallel or a different order, so a test that assumed "the users table starts empty" or "ID 1 exists" breaks the moment that assumption stops holding.',
              difficulty: 'Hard',
            },
          ],
        },
      ],
    },
    {
      id: 'frontend-testing',
      title: 'Frontend Testing',
      description: 'React Testing Library, user behavior tests, and a small set of E2E tests.',
      concepts: [
        {
          id: 'rtl-principles',
          title: 'React Testing Library: test behavior, not implementation',
          level: 'Core',
          summary: 'Query by role/label/text, simulate user events, and assert what the user sees — avoid testing internal state.',
          whyItMatters: 'This produces resilient tests that survive refactors.',
          detailedBreakdown: 'Render component, interact like a user, assert accessible output.',
          advancedNotes: [
            'Prefer `getByRole`/`getByLabelText` over brittle selectors.',
            'Avoid snapshot testing for dynamic UIs.',
          ],
          pitfalls: [
            'Testing implementation details makes tests break on harmless refactors.',
          ],
          interviewQuestions: [
            {
              question: 'How do you write resilient React component tests?',
              answer: 'Test user behavior with React Testing Library: query by role/label/text, fire user events, and assert visible outcomes. Avoid brittle snapshots and avoid testing implementation details.',
              difficulty: 'Medium',
            },
            {
              question: 'Why does querying by role or label text produce more resilient tests than a CSS class or test ID?',
              answer: 'Role/label queries test what a real user (and a screen reader) perceives, which usually only changes when user-facing behavior changes. A CSS class or DOM structure can be refactored for purely internal or styling reasons, and a selector tied to it breaks even though nothing the user experiences actually changed.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'e2e-scope',
          title: 'E2E tests: keep the scope small',
          level: 'Advanced',
          summary: 'E2E tests are the most expensive and flaky. Use them only for critical flows and keep them deterministic.',
          whyItMatters: 'This is how teams keep CI fast while still having confidence.',
          detailedBreakdown: 'A few critical flows, stable test data, and controlled environments.',
          advancedNotes: [
            'Avoid relying on real third-party services in E2E; use stubs or sandbox envs.',
            'Use retries carefully — fix flakiness first.',
          ],
          pitfalls: [
            'Large E2E suites become slow and brittle; developers stop trusting CI.',
          ],
          interviewQuestions: [
            {
              question: 'How many E2E tests should a typical product have?',
              answer: 'A small number focused on critical user journeys (login, checkout, onboarding). Most logic should be covered by unit/integration tests for speed and reliability.',
              difficulty: 'Hard',
            },
            {
              question: 'Why do E2E tests tend to be flakier than unit or integration tests?',
              answer: 'E2E tests depend on the most moving parts at once — network timing, real rendering, animations, third-party services, browser quirks — so there are far more places for a transient, unrelated failure to sneak in. That\'s why they\'re reserved for a small number of truly critical flows instead of exhaustive coverage.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'ci-quality',
      title: 'CI & Quality Gates',
      description: 'Make tests fast, reliable, and useful in a real team.',
      concepts: [
        {
          id: 'fast-ci',
          title: 'Fast, reliable CI',
          level: 'Advanced',
          summary: 'Run cheap checks first (lint/typecheck/unit), isolate integration state, and parallelize. Cache dependencies.',
          whyItMatters: 'CI speed directly affects developer velocity. Senior engineers optimize feedback loops.',
          detailedBreakdown: 'Fail fast, parallelize, and keep environments deterministic.',
          advancedNotes: [
            'Fail fast on typecheck/lint before expensive E2E.',
            'Use dependency caching (npm/composer) and test parallelization.',
            'Use containers or consistent environments to prevent “works on my machine”.',
          ],
          pitfalls: [
            'Allowing flaky tests trains teams to ignore CI failures.',
          ],
          interviewQuestions: [
            {
              question: 'How do you make tests fast and reliable in CI?',
              answer: 'Run small checks first, parallelize, isolate DB state, avoid real network, use deterministic fixtures, and cache dependencies. Fix flakiness rather than adding retries everywhere.',
              difficulty: 'Hard',
            },
            {
              question: 'Why can caching dependencies (npm/composer) meaningfully speed up CI?',
              answer: 'Reinstalling every package from scratch on every run repeats the same network downloads and disk writes even when nothing in the lockfile changed. Caching the dependency directory between runs, keyed on the lockfile hash, skips that repeated work and often cuts install time from minutes to seconds.',
              difficulty: 'Easy',
            },
          ],
        },
      ],
    },
  ],
};

