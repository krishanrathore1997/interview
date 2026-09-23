import { SkillPageContent } from '../types';

export const security: SkillPageContent = {
  topic: 'Security',
  title: 'Web Security (OWASP + Practical Defenses)',
  subtitle: 'The everyday security mindset: validate input, encode output, authorize every access, and protect secrets.',
  docs: [
    { label: 'OWASP Top 10', href: 'https://owasp.org/www-project-top-ten/' },
    { label: 'MDN Web Security', href: 'https://developer.mozilla.org/en-US/docs/Web/Security' },
  ],
  sections: [
    {
      id: 'security-mindset',
      title: 'Security Mindset',
      description: 'Threat modeling basics and principles that apply to every project.',
      concepts: [
        {
          id: 'auth-vs-authz',
          title: 'Authentication vs Authorization',
          level: 'Core',
          summary: 'Authentication proves who you are (login). Authorization decides what you can do (permissions/policies).',
          whyItMatters: 'Most serious bugs happen when authentication exists but authorization checks are missing on one endpoint.',
          detailedBreakdown: 'Authenticate once; authorize every request to a resource. Centralize authorization rules (policies).',
          advancedNotes: [
            'Enforce authz at the boundary (controllers/route handlers/actions) and in business logic for defense-in-depth.',
            'Add tests for “User A must not access User B’s resource” (IDOR).',
          ],
          examples: [
            {
              title: 'Policy-style check (pseudo)',
              description: 'Centralize access logic.',
              codeSample: {
                label: 'policy',
                language: 'text',
                code: `canViewOrder(user, order) = order.userId === user.id || user.role === 'admin'`,
              },
            },
          ],
          pitfalls: [
            'Relying on “hidden buttons” as authorization — attackers call APIs directly.',
          ],
          interviewQuestions: [
            {
              question: 'What is the difference between authentication and authorization?',
              answer: 'Authentication is proving identity. Authorization is verifying permissions for an action/resource. You must check authorization on every sensitive endpoint, not just at login.',
              difficulty: 'Easy',
            },
            {
              question: 'What\'s a common bug pattern where authentication is fine but authorization is missing?',
              answer: 'An endpoint checks that a valid session or token exists, so unauthenticated users are blocked, but never verifies the logged-in user actually owns the specific resource requested — so a logged-in User A can fetch User B\'s order by changing the order ID in the URL. That\'s broken access control (IDOR), not an authentication failure.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'least-privilege',
          title: 'Least privilege (limit blast radius)',
          level: 'Core',
          summary: 'Give users/services the minimum permissions needed. If credentials leak, damage is limited.',
          whyItMatters: 'This prevents one compromised token from becoming “game over”. It’s relevant in DB users, cloud IAM, and app roles.',
          detailedBreakdown: 'Separate roles, rotate secrets, scope API keys. Avoid shared admin credentials.',
          advancedNotes: [
            'DB users: read-only vs read-write; separate migration user from app user.',
            'Cloud: separate dev/staging/prod accounts and limit cross-access.',
          ],
          examples: [
            {
              title: 'DB least privilege',
              description: 'Different credentials for different jobs.',
              codeSample: {
                label: 'db-users',
                language: 'text',
                code: `app_user: SELECT/INSERT/UPDATE on app tables
migration_user: DDL permissions
analytics_user: SELECT only`,
              },
            },
          ],
          pitfalls: [
            'Using one “superuser” DB account everywhere increases blast radius.',
          ],
          interviewQuestions: [
            {
              question: 'What does least privilege mean in a web app?',
              answer: 'Each user/service gets only the permissions it needs. Apply it to DB credentials, API keys, and roles so a compromise has limited impact.',
              difficulty: 'Easy',
            },
            {
              question: 'Why is a shared admin database account used by every microservice risky, even if each service is trusted?',
              answer: 'If any one service is compromised — a dependency vulnerability, a leaked env var, a bug — the attacker inherits that account\'s full privileges across every table and every other service\'s data, turning one small breach into total database compromise. Scoped, per-service credentials keep a compromise contained.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'web-attacks',
      title: 'Common Web Attacks',
      description: 'XSS, CSRF, SQLi, SSRF, and IDOR — and what actually prevents them.',
      concepts: [
        {
          id: 'xss-defense',
          title: 'XSS (encode output + CSP)',
          level: 'Core',
          summary: 'XSS happens when untrusted input is rendered as executable HTML/JS. The main defense is output encoding + avoiding unsafe HTML rendering.',
          whyItMatters: 'XSS can steal sessions, change user actions, and exfiltrate data. It’s a top interview topic.',
          detailedBreakdown: 'Escape by default, sanitize if you must render HTML, and add Content Security Policy to reduce impact.',
          advancedNotes: [
            'Use frameworks that escape output by default.',
            'If you must render HTML, sanitize using a well-maintained sanitizer.',
            'CSP can block inline scripts and restrict allowed sources.',
          ],
          examples: [
            {
              title: 'CSP idea (high level)',
              description: 'Reduce XSS impact.',
              codeSample: {
                label: 'CSP',
                language: 'text',
                code: `Content-Security-Policy: default-src 'self'; script-src 'self'`,
              },
            },
          ],
          pitfalls: [
            'Sanitizing input alone is not sufficient — output encoding is the real core defense.',
          ],
          interviewQuestions: [
            {
              question: 'How do you prevent XSS in a modern web app?',
              answer: 'Escape output by default, avoid rendering unsanitized HTML, sanitize if needed, and add CSP to reduce impact. Also store sessions in HttpOnly cookies to reduce token theft.',
              difficulty: 'Medium',
            },
            {
              question: 'What\'s the difference between stored, reflected, and DOM-based XSS?',
              answer: 'Stored XSS is saved on the server (a comment, a profile field) and served to every visitor who views it. Reflected XSS is echoed straight back from a request, like a search query on the results page, and needs a crafted link per victim. DOM-based XSS never touches the server — vulnerable client-side JavaScript writes untrusted data, like location.hash, directly into the page.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'csrf-defense',
          title: 'CSRF (SameSite + tokens + origin checks)',
          level: 'Core',
          summary: 'CSRF tricks a browser into sending authenticated requests. Defend with SameSite cookies, CSRF tokens, and Origin/Referer checks for state-changing requests.',
          whyItMatters: 'Cookie-auth apps must think about CSRF. Interviewers ask this constantly.',
          detailedBreakdown: 'CSRF is about intent. Tokens and origin checks confirm requests came from your app.',
          advancedNotes: [
            'SameSite=Lax mitigates many CSRF cases, but high-risk actions still benefit from explicit tokens.',
            'Never allow GET to mutate state.',
          ],
          examples: [
            {
              title: 'CSRF token flow',
              description: 'Server issues token; client sends it on unsafe methods.',
              codeSample: {
                label: 'flow',
                language: 'text',
                code: `1) GET form -> server returns CSRF token
2) POST form -> includes CSRF token
3) Server validates token + session`,
              },
            },
          ],
          pitfalls: [
            'Assuming CORS prevents CSRF (it doesn’t).',
          ],
          interviewQuestions: [
            {
              question: 'What is CSRF and how do you mitigate it?',
              answer: 'CSRF makes a logged-in browser send a state-changing request. Use SameSite cookies, CSRF tokens, and origin checks; ensure GET is safe and mutations use POST/PUT/PATCH/DELETE.',
              difficulty: 'Easy',
            },
            {
              question: 'Why doesn\'t CORS protect you from CSRF?',
              answer: 'CORS controls whether JavaScript on another origin can read the response of a cross-origin request — it does nothing to stop the browser from sending the request in the first place, cookies included. A classic CSRF attack, like an auto-submitting form, never needs to read the response, so CORS headers are irrelevant to it.',
              difficulty: 'Hard',
            },
          ],
        },
        {
          id: 'ssrf-defense',
          title: 'SSRF (don’t fetch arbitrary URLs)',
          level: 'Advanced',
          summary: 'SSRF is when attackers make your server send requests to internal resources (metadata endpoints, internal services).',
          whyItMatters: 'Modern systems have internal networks and cloud metadata endpoints. SSRF often leads to credential theft.',
          detailedBreakdown: 'Use allowlists, block private ranges, validate redirects, and set timeouts. Avoid “URL from user” features.',
          advancedNotes: [
            'Block private IP ranges and link-local addresses (e.g., 169.254.169.254).',
            'Don’t follow redirects to untrusted locations.',
            'Use short timeouts and limit response size.',
          ],
          examples: [
            {
              title: 'Allowlist approach',
              description: 'Fetch only known hosts.',
              codeSample: {
                label: 'policy',
                language: 'text',
                code: `Allowed hosts: images.example.com, api.partner.com
Denied: everything else`,
              },
            },
          ],
          pitfalls: [
            'Regex-based URL validation is fragile; prefer allowlists + network-level blocking.',
          ],
          interviewQuestions: [
            {
              question: 'What is SSRF and how do you prevent it?',
              answer: 'SSRF tricks your server into making internal requests. Prevent with allowlists, blocking private IP ranges, validating redirects, and using timeouts/size limits. Avoid accepting arbitrary URLs from users.',
              difficulty: 'Hard',
            },
            {
              question: 'Why is blocking 169.254.169.254 specifically important in cloud environments?',
              answer: 'That\'s the cloud metadata service IP (AWS, GCP, Azure) instances use to fetch their own IAM credentials without authentication, from inside the network. If an app can be tricked into fetching an arbitrary URL, requesting that address can leak the server\'s cloud credentials directly, turning an SSRF bug into full account takeover.',
              difficulty: 'Hard',
            },
          ],
        },
        {
          id: 'idor-defense',
          title: 'IDOR (broken object level authorization)',
          level: 'Core',
          summary: 'IDOR is when a user can access another user’s resource by changing an ID. The defense is server-side authorization for every resource access.',
          whyItMatters: 'IDOR is one of the most common real-world security issues in CRUD apps.',
          detailedBreakdown: 'Never trust that “the UI won’t show it”. Check tenant/user ownership on every query.',
          advancedNotes: [
            'Use policies/gates. In SQL, always filter by tenant_id/user_id.',
            'Test: “User A tries to read User B’s record”.',
          ],
          pitfalls: [
            'Using incremental IDs doesn’t cause IDOR — missing authorization does. UUIDs can help, but are not a substitute.',
          ],
          interviewQuestions: [
            {
              question: 'How do you prevent IDOR bugs?',
              answer: 'Authorize every resource access server-side based on the authenticated user/tenant. Never rely on hiding IDs in the UI. Add tests for cross-user access attempts.',
              difficulty: 'Medium',
            },
            {
              question: 'Why isn\'t switching from sequential IDs to UUIDs a fix for IDOR by itself?',
              answer: 'UUIDs only make IDs harder to guess; they add no authorization check. If the app still fetches a resource by ID without verifying the requester owns it, an attacker who obtains a valid UUID — from a shared link, a referrer header, a leaked log — can access it just as easily as with a sequential ID.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'secure-storage',
      title: 'Secrets, Passwords, and Storage',
      description: 'How to store secrets and passwords correctly and avoid leaks.',
      concepts: [
        {
          id: 'password-storage',
          title: 'Password storage (slow hashes, never encrypt)',
          level: 'Core',
          summary: 'Store passwords as salted slow hashes (Argon2/bcrypt). Never store plaintext or reversible encryption for passwords.',
          whyItMatters: 'If the DB leaks, hashing is the difference between a breach and a catastrophe.',
          detailedBreakdown: 'Use built-in framework helpers. Add rate limiting and secure resets.',
          advancedNotes: [
            'Use a slow hash with per-password salt (Argon2 recommended; bcrypt acceptable).',
            'Add login rate limiting + MFA where possible.',
            'Secure reset flows: short-lived tokens and single-use.',
          ],
          pitfalls: [
            'Rolling your own crypto is a red flag in interviews and production.',
          ],
          interviewQuestions: [
            {
              question: 'How should passwords be stored?',
              answer: 'As salted slow hashes using a modern algorithm (Argon2/bcrypt) via framework helpers. Never plaintext. Add rate limiting and secure reset flows.',
              difficulty: 'Easy',
            },
            {
              question: 'Why is bcrypt/Argon2 preferred over a fast hash like SHA-256 for passwords?',
              answer: 'SHA-256 is designed to be fast, which is exactly the wrong property for password hashing — it lets an attacker with a leaked hash database try billions of guesses per second on cheap hardware. bcrypt and Argon2 are deliberately slow and tunable, making brute-forcing even a weak password expensive at scale.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'secrets-management',
          title: 'Secrets management',
          level: 'Core',
          summary: 'Secrets must not be committed to git. Use env vars or a secret manager, rotate keys, and scope access.',
          whyItMatters: 'Leaked API keys and DB passwords are one of the most common “avoidably fatal” incidents.',
          detailedBreakdown: 'Env vars in dev, secret managers in prod, and strict CI discipline.',
          advancedNotes: [
            'Do not log tokens/headers. Redact sensitive fields.',
            'Rotate keys periodically and when compromised.',
            'Scope secrets to environments and least privilege.',
          ],
          pitfalls: [
            'Accidentally committing .env or copying tokens into tickets/chat logs.',
          ],
          interviewQuestions: [
            {
              question: 'How do you manage secrets safely in production?',
              answer: 'Use a secret manager or environment variables managed by the platform, restrict access, rotate secrets, and avoid logging sensitive values. Never commit secrets to git.',
              difficulty: 'Medium',
            },
            {
              question: 'Why is rotating a secret still necessary even after removing it from git in a follow-up commit?',
              answer: 'Git history retains every previous commit, so deleting the secret in a new commit doesn\'t erase it — anyone with repo access, a fork, or a CI log can still find it in history. The only real fix is treating the secret as compromised and rotating or revoking it at the source.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'dependency-security',
          title: 'Dependency supply-chain risk',
          level: 'Advanced',
          summary: 'Dependencies can be compromised. Reduce risk with lockfiles, minimal deps, audits, and controlled upgrades.',
          whyItMatters: 'Supply-chain incidents are common. A single transitive dependency can compromise production.',
          detailedBreakdown: 'Pin versions, audit, and monitor advisories. Prefer maintained packages.',
          advancedNotes: [
            'Lockfiles ensure reproducible installs (important for security investigations).',
            'Use vulnerability scanning in CI and update promptly for critical CVEs.',
            'Remove unused dependencies to shrink attack surface.',
          ],
          pitfalls: [
            'Blindly bumping majors without reading release notes can introduce security regressions.',
          ],
          interviewQuestions: [
            {
              question: 'How do you reduce supply-chain risk?',
              answer: 'Pin versions with lockfiles, keep dependencies minimal, monitor advisories/scans, and review major upgrades carefully. Remove unused dependencies and avoid running untrusted scripts in sensitive environments.',
              difficulty: 'Hard',
            },
            {
              question: 'What is a lockfile actually protecting you from?',
              answer: 'Without a lockfile, a fresh install can resolve to a newer version of a transitive dependency that satisfies the same semver range but ships different — possibly malicious or broken — code than what you tested and shipped last time. A lockfile pins exact resolved versions so every install, dev, CI, or production, gets identical dependency code.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'uploads',
      title: 'File Uploads & Data Handling',
      description: 'One of the most attack-prone features in web apps.',
      concepts: [
        {
          id: 'secure-uploads',
          title: 'Secure file uploads',
          level: 'Advanced',
          summary: 'Validate type/size, store outside the web root, generate random names, scan when needed, and never trust user paths.',
          whyItMatters: 'Upload bugs lead to RCE, malware hosting, and data leaks. Interviewers love this because it’s real.',
          detailedBreakdown: 'Validate + store safely + serve via controlled access (signed URLs/CDN).',
          advancedNotes: [
            'Never use user-provided filenames as filesystem paths.',
            'Store in object storage (S3/GCS) and serve via signed URLs when private.',
            'Re-encode images server-side to avoid polyglot files.',
          ],
          pitfalls: [
            'Allowing SVG uploads without sanitization can lead to script execution.',
          ],
          interviewQuestions: [
            {
              question: 'How do you handle file uploads securely?',
              answer: 'Validate content type and size, store outside web root (or in object storage), generate random names, scan if needed, and never trust user paths. Control access via signed URLs for private files.',
              difficulty: 'Hard',
            },
            {
              question: 'Why re-encode uploaded images server-side instead of just checking the file extension?',
              answer: 'A file extension, or even a magic-byte check, can be spoofed by a "polyglot" file crafted to be valid as both an image and something else, like embedded HTML/script or a PHP payload. Re-encoding the image through a real image library strips anything that isn\'t valid image data, so a disguised malicious payload doesn\'t survive the round-trip.',
              difficulty: 'Hard',
            },
          ],
        },
      ],
    },
  ],
};

