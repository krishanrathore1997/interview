import { SkillPageContent } from '../types';

export const typescript: SkillPageContent = {
  topic: 'TypeScript',
  title: 'TypeScript for Real Projects',
  subtitle: 'Narrowing, generics, utility types, and TS config patterns that prevent production bugs.',
  docs: [
    { label: 'TypeScript Handbook', href: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
    { label: 'TSConfig Reference', href: 'https://www.typescriptlang.org/tsconfig' },
  ],
  sections: [
    {
      id: 'ts-foundations',
      title: 'Foundations',
      description: 'The small set of TypeScript rules you use daily in every codebase.',
      concepts: [
        {
          id: 'ts-type-vs-interface',
          title: 'type vs interface (and when each wins)',
          level: 'Core',
          summary: 'Both describe shapes. Interfaces are great for public object APIs (extendable + declaration merging). Types are more flexible (unions/intersections/mapped types).',
          whyItMatters: 'Teams fight about style, but interviews want your reasoning: picking the right tool keeps types readable and maintainable.',
          detailedBreakdown: 'Interfaces: object shapes + extension + merging. Types: unions/intersections + computed types. Both are structural.',
          advancedNotes: [
            'Use `interface` for “this is a stable object contract” (DTOs, component props, library APIs).',
            'Use `type` for unions, intersections, and advanced transforms.',
            'Declaration merging can be helpful (augmenting types), but can also hide changes — use it intentionally.',
          ],
          examples: [
            {
              title: 'A pragmatic example',
              description: 'Interface for a contract + type for composition.',
              codeSample: {
                label: 'types.ts',
                language: 'ts',
                code: `interface User {
  id: string;
  email: string;
}

type UserId = User['id'];
type Admin = User & { role: 'admin' };`,
              },
            },
          ],
          pitfalls: [
            'Using `type` unions where a stable object contract is expected can make errors harder to read.',
            'Overusing declaration merging can surprise teammates.',
          ],
          interviewQuestions: [
            {
              question: 'In TypeScript, what is the difference between `type` and `interface`?',
              answer: 'Both can describe object shapes. Interfaces are extendable and support declaration merging, so they’re good for public object contracts. Types are more flexible and are required for unions/intersections and many advanced type transforms. In practice: pick the one that keeps the API readable.',
              difficulty: 'Easy',
            },
          ],
        },
        {
          id: 'ts-structural-typing',
          title: 'Structural typing (why “shape” matters)',
          level: 'Core',
          summary: 'TypeScript is structurally typed: if two values have the same shape, they’re compatible, even if they come from different “domains”.',
          whyItMatters: 'This is powerful for DX but can cause domain bugs (mixing IDs) unless you add constraints.',
          detailedBreakdown: 'Compatibility is based on properties, not nominal “names”. Add branding when domains must not mix.',
          advancedNotes: [
            'Structural typing makes refactors and composition easy.',
            'When two IDs are both `string`, TS can’t stop you mixing them. Use branded types if it matters.',
          ],
          examples: [
            {
              title: 'Branding IDs (simple safety)',
              description: 'Prevent mixing domains that are both strings.',
              codeSample: {
                label: 'ids.ts',
                language: 'ts',
                code: `type Brand<T, B extends string> = T & { __brand: B };
type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;

declare const userId: UserId;
declare const orderId: OrderId;

// userId !== orderId at compile time`,
              },
            },
          ],
          pitfalls: [
            'Branding adds friction — use it only where a wrong ID would be expensive (payments, permissions, multi-tenant).',
          ],
          interviewQuestions: [
            {
              question: 'What does “TypeScript is structurally typed” mean?',
              answer: 'Compatibility is based on shape. If two values have the same required fields, they’re assignable even if they came from different “types” or domains. This is convenient, but you may need branded types to prevent mixing same-shaped values like IDs.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'ts-narrowing',
      title: 'Narrowing & Safety',
      description: 'Write TS that is safe at runtime: unknown, guards, and exhaustive checks.',
      concepts: [
        {
          id: 'ts-any-unknown-never',
          title: 'any vs unknown vs never',
          level: 'Core',
          summary: 'any disables type checking. unknown forces runtime checks before use. never represents impossible states (great for exhaustive checks).',
          whyItMatters: 'Most TS bugs are “I trusted data I didn’t validate”. unknown + narrowing is the cure.',
          detailedBreakdown: 'Use unknown at boundaries (JSON, env, external APIs). Use never in exhaustive switches and “should not happen” code.',
          advancedNotes: [
            'Prefer `unknown` for JSON parsing and API responses before validation.',
            'Use `never` to make missing cases a compile error.',
            'Avoid `any` unless you’re migrating legacy code and have a plan to remove it.',
          ],
          examples: [
            {
              title: 'unknown boundary + narrowing',
              description: 'Don’t trust JSON without checks.',
              codeSample: {
                label: 'parse.ts',
                language: 'ts',
                code: `function parseJson(input: string): unknown {
  return JSON.parse(input);
}

const value = parseJson('{"x": 1}');
if (typeof value === 'object' && value && 'x' in value) {
  // safe-ish narrowing
}`,
              },
            },
            {
              title: 'Exhaustive switch with never',
              description: 'Force the compiler to keep you honest.',
              codeSample: {
                label: 'exhaustive.ts',
                language: 'ts',
                code: `type Status = 'idle' | 'loading' | 'success' | 'error';

function render(s: Status) {
  switch (s) {
    case 'idle': return 'Idle';
    case 'loading': return 'Loading';
    case 'success': return 'Done';
    case 'error': return 'Oops';
    default: {
      const _exhaustive: never = s;
      return _exhaustive;
    }
  }
}`,
              },
            },
          ],
          pitfalls: [
            'Casting unknown to a type (`as User`) without validation only hides the problem.',
            'Using any spreads: one any often makes the rest of the file effectively untyped.',
          ],
          interviewQuestions: [
            {
              question: 'Why is `unknown` safer than `any`?',
              answer: '`unknown` forces you to narrow with runtime checks before using the value. `any` disables checking and lets runtime errors slip through. In real projects, treat external inputs as unknown until validated.',
              difficulty: 'Easy',
            },
          ],
        },
        {
          id: 'ts-type-guards',
          title: 'Type guards and narrowing patterns',
          level: 'Advanced',
          summary: 'Type guards (typeof/in/instanceof/custom predicates) let TypeScript safely narrow unions and unknown values.',
          whyItMatters: 'This is how you write safe code at boundaries: API responses, event payloads, feature flags, env vars.',
          detailedBreakdown: 'Use custom predicates (`x is T`) to encapsulate runtime validation and keep calling code clean.',
          advancedNotes: [
            'Narrow primitives with `typeof`, objects with `"key" in obj`, classes with `instanceof`.',
            'Custom type guard functions return boolean but tell the compiler the narrowed type.',
            'For complex validation, use a schema validator (Zod, Valibot, etc.) and infer types.',
          ],
          examples: [
            {
              title: 'Custom guard',
              description: 'Encapsulate runtime checks.',
              codeSample: {
                label: 'guards.ts',
                language: 'ts',
                code: `type User = { id: string; email: string };

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value &&
    typeof (value as any).id === 'string' &&
    typeof (value as any).email === 'string'
  );
}`,
              },
            },
          ],
          pitfalls: [
            'Guards can become “fake safety” if the runtime checks are incomplete. Validate all required fields.',
          ],
          interviewQuestions: [
            {
              question: 'What is a custom type guard in TypeScript?',
              answer: 'A function that performs runtime checks and has a return type like `value is SomeType`. If it returns true, TypeScript narrows the variable to that type in the surrounding scope.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'ts-generics',
      title: 'Generics & Utility Types',
      description: 'Reusable, type-safe code and the utility types you see everywhere.',
      concepts: [
        {
          id: 'ts-generics-basics',
          title: 'Generics (preserve relationships between values)',
          level: 'Core',
          summary: 'Generics let you write functions/components that work with many types while keeping input/output types linked.',
          whyItMatters: 'This is the difference between “typed” and “type-safe”. Without generics, helpers degrade to any.',
          detailedBreakdown: 'Use generics when the output type depends on the input type (identity, map, fetch helpers, components).',
          advancedNotes: [
            'Prefer generic constraints (`<T extends ...>`) to express requirements.',
            'Use generics to avoid re-writing helpers for each model.',
          ],
          examples: [
            {
              title: 'Typed fetch helper',
              description: 'Keep API response types explicit at call sites.',
              codeSample: {
                label: 'fetchJson.ts',
                language: 'ts',
                code: `export async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json() as Promise<T>;
}

type User = { id: string; email: string };
const user = await fetchJson<User>('/api/user');`,
              },
            },
          ],
          pitfalls: [
            'Using `fetchJson<T>` without runtime validation can still break at runtime — generics don’t validate.',
          ],
          interviewQuestions: [
            {
              question: 'Why are generics useful in TypeScript?',
              answer: 'They let you write reusable helpers while preserving the relationship between inputs and outputs. This keeps types accurate without using any.',
              difficulty: 'Easy',
            },
          ],
        },
        {
          id: 'ts-utility-types',
          title: 'Utility types (Pick, Omit, Partial, Record)',
          level: 'Core',
          summary: 'Utility types transform existing types so you don’t duplicate interfaces for slight variants.',
          whyItMatters: 'In real codebases, type duplication is a maintenance bug. Utility types keep types consistent.',
          detailedBreakdown: 'Pick selects keys, Omit removes keys, Partial makes optional, Record makes a map shape.',
          advancedNotes: [
            'Use Pick/Omit to create request/response DTOs from a domain model.',
            'Use Record for lookup tables (maps).',
            'Use Partial for patches — but be explicit when “required vs optional” is security-sensitive.',
          ],
          examples: [
            {
              title: 'DTO shaping',
              description: 'Don’t leak internal fields to the client.',
              codeSample: {
                label: 'dto.ts',
                language: 'ts',
                code: `type User = { id: string; email: string; passwordHash: string };
type UserPublic = Omit<User, 'passwordHash'>;

type UserPatch = Partial<Pick<User, 'email'>>;`,
              },
            },
          ],
          pitfalls: [
            'Partial can hide missing required fields; don’t use it blindly for create requests.',
          ],
          interviewQuestions: [
            {
              question: 'When would you use `Omit` or `Pick` in a real project?',
              answer: 'To shape DTOs. Example: remove passwordHash from a User type for client responses, or pick only allowed fields for update requests.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'ts-config',
      title: 'TSConfig & Tooling',
      description: 'Project configuration choices that affect correctness and migration speed.',
      concepts: [
        {
          id: 'ts-strict-mode',
          title: 'Strict mode (the default for serious apps)',
          level: 'Core',
          summary: 'Strict mode enables a set of checks that catch bugs early (null/undefined mistakes, implicit any, unsafe indexing).',
          whyItMatters: 'Most “TypeScript didn’t catch it” stories are because strictness is off or bypassed with any/casts.',
          detailedBreakdown: 'Start strict on new projects. For legacy projects, turn it on incrementally with lint + CI.',
          advancedNotes: [
            'Key flags: strict, noImplicitAny, strictNullChecks, noUncheckedIndexedAccess (optional but powerful).',
            'Use `satisfies` + `as const` to keep config objects typed without losing inference.',
          ],
          examples: [
            {
              title: 'Config typing with satisfies',
              description: 'Keep literal types without unsafe casts.',
              codeSample: {
                label: 'config.ts',
                language: 'ts',
                code: `type Role = 'admin' | 'user';

const permissions = {
  admin: ['read', 'write'],
  user: ['read'],
} as const satisfies Record<Role, readonly string[]>;`,
              },
            },
          ],
          pitfalls: [
            'Turning on strict in one giant PR is painful. Enable gradually and fix the hottest paths first.',
          ],
          interviewQuestions: [
            {
              question: 'What’s your strategy for enabling strict TypeScript in a legacy codebase?',
              answer: 'Do it incrementally: turn on strict checks gradually, fix critical paths first, add lint rules to prevent new any, and keep type safety at boundaries (API, env). Avoid a “big bang” conversion.',
              difficulty: 'Hard',
            },
          ],
        },
        {
          id: 'ts-path-aliases',
          title: 'Path aliases and module resolution',
          level: 'Core',
          summary: 'Aliases (like @/*) make imports stable and refactors easier, especially in large apps.',
          whyItMatters: 'Import mess slows teams down. Clean imports improve navigation and reduce merge conflicts.',
          detailedBreakdown: 'Configure `paths` in tsconfig + ensure tooling (bundler, eslint) resolves them too.',
          advancedNotes: [
            'In Next.js projects, `paths` is a common pattern (e.g., "@/lib/*").',
            'Keep aliases simple and consistent; avoid deep alias trees.',
          ],
          examples: [
            {
              title: 'Example alias',
              description: 'Clean imports for shared modules.',
              codeSample: {
                label: 'tsconfig.json',
                language: 'json',
                code: `{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`,
              },
            },
          ],
          pitfalls: [
            'Aliases can break if only TS knows about them (bundler/lint/test must match).',
          ],
          interviewQuestions: [
            {
              question: 'Why do teams use path aliases like `@/`?',
              answer: 'They avoid brittle relative imports, make refactors easier, and improve code navigation. The key is keeping TS, bundler, and lint/test tooling consistent.',
              difficulty: 'Easy',
            },
          ],
        },
      ],
    },
    {
      id: 'ts-react',
      title: 'TypeScript + React',
      description: 'Type components and events without fighting the compiler.',
      concepts: [
        {
          id: 'ts-react-props',
          title: 'Typing props and components',
          level: 'Core',
          summary: 'Type your props, keep them narrow, and prefer inference when it stays readable.',
          whyItMatters: 'Most frontend “typing pain” comes from over-abstracting. Simple props types scale best.',
          detailedBreakdown: 'Use explicit prop types for component boundaries and public components. Use ComponentProps to reuse types.',
          advancedNotes: [
            'Prefer `type Props = { ... }` near the component; keep props small and focused.',
            'Use `React.ComponentProps<\'button\'>` to inherit native element props.',
          ],
          examples: [
            {
              title: 'ComponentProps pattern',
              description: 'Extend native button props safely.',
              codeSample: {
                label: 'Button.tsx',
                language: 'tsx',
                code: `type Props = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'ghost';
};

export function Button({ variant = 'primary', ...props }: Props) {
  return <button {...props} data-variant={variant} />;
}`,
              },
            },
          ],
          pitfalls: [
            'Using `React.FC` everywhere can hide children typing and defaults; it’s optional, not required.',
          ],
          interviewQuestions: [
            {
              question: 'How do you type a reusable React component in TypeScript?',
              answer: 'Define a Props type, keep it small, and rely on inference where it stays readable. For native elements, compose with React.ComponentProps to inherit correct HTML attributes.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'ts-react-events',
          title: 'Typing events and form handlers',
          level: 'Core',
          summary: 'Use React’s event types (or inference) to avoid “any event” bugs in forms and inputs.',
          whyItMatters: 'Correct event typing prevents common mistakes like reading the wrong target or missing null checks.',
          detailedBreakdown: 'ChangeEvent for inputs, FormEvent for forms. Prefer currentTarget over target.',
          advancedNotes: [
            'Use `e.currentTarget` for strongly-typed element access.',
            'For simple handlers, let TypeScript infer the event from the JSX prop.',
          ],
          examples: [
            {
              title: 'Typed onChange',
              description: 'Safe access to input value.',
              codeSample: {
                label: 'Form.tsx',
                language: 'tsx',
                code: `function EmailField() {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  };

  return <input type="email" onChange={onChange} />;
}`,
              },
            },
          ],
          pitfalls: [
            'Using `e.target` can be loosely typed. Prefer `currentTarget` in TS.',
          ],
          interviewQuestions: [
            {
              question: 'Why prefer `currentTarget` over `target` in React event handlers?',
              answer: 'currentTarget is the element the handler is attached to (strongly typed). target can be a child element and is often less specific. Using currentTarget avoids subtle typing and runtime bugs.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
  ],
};

