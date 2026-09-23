import { SkillPageContent } from '../types';

export const devops: SkillPageContent = {
  topic: 'DevOps',
  title: 'DevOps & Delivery (Practical)',
  subtitle: 'CI/CD, environments, containers, and operating your app safely in production.',
  docs: [
    { label: 'Docker Docs', href: 'https://docs.docker.com/' },
    { label: '12-Factor App', href: 'https://12factor.net/' },
  ],
  sections: [
    {
      id: 'devops-foundations',
      title: 'Foundations',
      description: 'Environment management, configuration, and safe release habits.',
      concepts: [
        {
          id: 'devops-envs',
          title: 'Environments (dev/staging/prod) + config',
          level: 'Core',
          summary: 'Keep dev/staging/prod separated. Configuration should be externalized (env vars/secret manager) and reproducible.',
          whyItMatters: 'Many outages are “config drift” issues. Seniors reduce risk by standardizing environments.',
          detailedBreakdown: '12-factor config, consistent build artifacts, and environment-specific secrets.',
          advancedNotes: [
            'Build once, deploy the same artifact across environments.',
            'Use environment variables (or secret manager) for config, not hardcoded values.',
            'Document required env vars and defaults.',
          ],
          pitfalls: [
            'Manual “hot fixes” in production that aren’t reflected in code/config management.',
          ],
          interviewQuestions: [
            {
              question: 'What’s a safe strategy for managing environments?',
              answer: 'Separate dev/staging/prod, build once and promote the same artifact, externalize configuration via env vars/secret manager, and keep infrastructure/config changes reviewed and reproducible.',
              difficulty: 'Medium',
            },
            {
              question: 'What\'s the risk of letting staging and production configs silently drift apart?',
              answer: 'A change that "works in staging" can fail in production because of an untracked difference — a missing env var, a different feature flag, a different resource limit — so bugs only surface after deploy, exactly when they\'re most expensive to debug. Treating config as versioned code instead of manual dashboard edits prevents this.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'devops-rollouts',
          title: 'Deployments: canary, blue/green, and rollback',
          level: 'Advanced',
          summary: 'Reduce risk by shipping in small steps: canary releases, blue/green deployments, and fast rollbacks.',
          whyItMatters: 'Most teams win by making deployment safe, not by “never breaking anything”.',
          detailedBreakdown: 'Progressive delivery + monitoring + quick rollback paths.',
          advancedNotes: [
            'Canary: send small % of traffic to the new version and watch metrics.',
            'Blue/green: two environments; switch traffic when ready.',
            'Always plan rollback + DB migration strategy (backward compatible).',
          ],
          pitfalls: [
            'Non-backward-compatible DB migrations can block rollbacks.',
          ],
          interviewQuestions: [
            {
              question: 'How do you deploy safely without causing downtime?',
              answer: 'Use progressive delivery (canary/blue-green), monitor error rate/latency, keep changes backward compatible, and ensure a fast rollback strategy. Handle DB migrations carefully to preserve rollback paths.',
              difficulty: 'Hard',
            },
            {
              question: 'What\'s the practical difference between canary and blue/green deployments?',
              answer: 'Canary gradually shifts a small percentage of live traffic to the new version while both run side by side, catching problems on real traffic before a full rollout. Blue/green keeps two complete environments and switches all traffic at once — instant rollback by flipping back, but it won\'t catch issues that only appear under partial, real-world load.',
              difficulty: 'Hard',
            },
          ],
        },
      ],
    },
    {
      id: 'ci-cd',
      title: 'CI/CD',
      description: 'Build pipelines that give fast feedback and reduce manual work.',
      concepts: [
        {
          id: 'ci-quality-gates',
          title: 'Quality gates (lint, typecheck, tests)',
          level: 'Core',
          summary: 'Run cheap checks first, fail fast, and keep CI deterministic. Typecheck + tests prevent broken main branches.',
          whyItMatters: 'Healthy CI is one of the highest leverage improvements for engineering velocity.',
          detailedBreakdown: 'Fail fast, parallelize, cache dependencies, and isolate stateful tests.',
          advancedNotes: [
            'Order: lint/typecheck → unit → integration → E2E.',
            'Use `npm ci` for reproducible installs.',
            'Cache node_modules/composer caches to speed builds.',
          ],
          examples: [
            {
              title: 'A simple pipeline outline',
              description: 'Fast feedback first.',
              codeSample: {
                label: 'pipeline',
                language: 'text',
                code: `1) Install (npm ci / composer install)
2) Lint + typecheck
3) Unit tests (parallel)
4) Integration tests
5) Build artifact
6) Deploy canary`,
              },
            },
          ],
          pitfalls: [
            'Allowing flaky tests to remain forces teams to ignore CI signals.',
          ],
          interviewQuestions: [
            {
              question: 'What checks do you run in CI for a web app?',
              answer: 'Install with a lockfile, run lint + typecheck, run unit and integration tests, then build the artifact. Optionally run a small E2E suite for critical flows. Keep CI deterministic and fast.',
              difficulty: 'Medium',
            },
            {
              question: 'Why order CI steps from cheapest to most expensive check?',
              answer: 'Lint and typecheck fail in seconds and catch a large share of mistakes, so running them first gives developers fast feedback and avoids burning CI minutes running a full test suite on a build that was always going to fail a basic check.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'containers',
      title: 'Containers',
      description: 'Docker concepts used in most modern deployments.',
      concepts: [
        {
          id: 'docker-basics',
          title: 'Images vs containers (and why Dockerfiles matter)',
          level: 'Core',
          summary: 'An image is a build artifact. A container is a running instance of an image. Dockerfiles make builds reproducible.',
          whyItMatters: 'Containers standardize environments and reduce “works on my machine” issues.',
          detailedBreakdown: 'Build step vs run step; layers; environment variables; ports.',
          advancedNotes: [
            'Multi-stage builds reduce final image size.',
            'Pin base images and keep them updated for security.',
          ],
          examples: [
            {
              title: 'Core commands',
              description: 'The everyday Docker workflow.',
              codeSample: {
                label: 'commands',
                language: 'bash',
                code: `docker build -t myapp:latest .
docker run -p 3000:3000 --env-file .env myapp:latest`,
              },
            },
          ],
          pitfalls: [
            'Baking secrets into images is a major security mistake.',
          ],
          interviewQuestions: [
            {
              question: 'What’s the difference between a Docker image and a container?',
              answer: 'An image is the packaged artifact (filesystem + metadata). A container is a running instance of that image with a writable layer and runtime configuration.',
              difficulty: 'Easy',
            },
            {
              question: 'Why do multi-stage Docker builds reduce the final image size?',
              answer: 'Build tools, compilers, and a full SDK can run in an early stage, then only the compiled output gets copied into a lean final stage — the heavy build-time dependencies never make it into the image that actually ships to production.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'docker-network-storage',
          title: 'Ports, volumes, and networking (practical)',
          level: 'Advanced',
          summary: 'Ports expose services. Volumes persist data. Networking connects services like app + DB.',
          whyItMatters: 'Most real apps run multiple services. Understanding ports/volumes prevents common local and prod issues.',
          detailedBreakdown: 'Port mapping, named volumes, container-to-container communication.',
          advancedNotes: [
            'Use volumes for DB data persistence in local dev.',
            'Prefer network aliases and service names for container communication (docker compose).',
          ],
          pitfalls: [
            'Storing DB data inside the container filesystem leads to data loss on rebuild.',
          ],
          interviewQuestions: [
            {
              question: 'Why do we use Docker volumes?',
              answer: 'To persist data independent of the container lifecycle. Containers are disposable; volumes keep state like database data across restarts/rebuilds.',
              difficulty: 'Medium',
            },
            {
              question: 'How do containers in the same Docker Compose network usually talk to each other?',
              answer: 'By service name — Compose creates a shared network where each service is reachable at a hostname matching its service key, like an app container reaching a database at "db:5432" instead of a hardcoded IP. That hostname stays stable even after the underlying container is recreated.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'operations',
      title: 'Operations',
      description: 'Monitoring, logging, migrations, and incident basics.',
      concepts: [
        {
          id: 'ops-observability',
          title: 'Monitoring and alerts (symptom-based)',
          level: 'Advanced',
          summary: 'Monitor error rate, latency, and saturation. Alert on symptoms and SLOs, not noisy low-signal metrics.',
          whyItMatters: 'This is how teams detect incidents early and avoid alert fatigue.',
          detailedBreakdown: 'Golden signals: latency, traffic, errors, saturation.',
          advancedNotes: [
            'Track p95/p99 latency and 5xx rate.',
            'Use structured logs + request IDs.',
          ],
          pitfalls: [
            'Too many alerts = no one responds. Tune alert thresholds and add runbooks.',
          ],
          interviewQuestions: [
            {
              question: 'What do you monitor for a typical web API?',
              answer: 'Error rate (5xx), latency (p95/p99), traffic/rate, and saturation (CPU/memory/DB). Use request IDs in logs and alert on SLO breaches with clear runbooks.',
              difficulty: 'Hard',
            },
            {
              question: 'What\'s the difference between a metric, a log, and a trace?',
              answer: 'A metric is a numeric measurement over time, like request count or latency. A log is a discrete, timestamped event with context. A trace follows one request as it moves through multiple services, showing where the time went. Metrics tell you something is wrong; logs and traces help you find why.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'ops-migrations',
          title: 'Safe database migrations',
          level: 'Advanced',
          summary: 'Schema changes must preserve compatibility during rollout and rollback. Use expand/contract strategies for large changes.',
          whyItMatters: 'Migrations are one of the most common deployment failure points.',
          detailedBreakdown: 'Add columns first, write both, backfill, switch reads, then delete old.',
          advancedNotes: [
            'Prefer additive migrations during rolling deploys.',
            'Backfill in background jobs for large tables.',
            'Avoid long locks during peak traffic.',
          ],
          pitfalls: [
            'Dropping columns before all app instances are updated breaks rolling deployments.',
          ],
          interviewQuestions: [
            {
              question: 'How do you roll out a breaking schema change safely?',
              answer: 'Use expand/contract: add new schema, deploy code that supports both, backfill data, switch reads/writes, then remove old schema in a later deploy. This preserves rollback paths.',
              difficulty: 'Hard',
            },
            {
              question: 'Why is dropping an old column right after deploying new code risky during a rolling deploy?',
              answer: 'Old and new instances of the app run side by side for a period during a rolling deploy. If the old instances still read or write the dropped column, they start erroring the moment it disappears — that\'s exactly why expand/contract keeps the old column around until every instance is confirmed on the new code.',
              difficulty: 'Hard',
            },
          ],
        },
      ],
    },
  ],
};

