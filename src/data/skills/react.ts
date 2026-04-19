import { SkillPageContent } from '../types';

export const react: SkillPageContent = {
  topic: 'React',
  title: 'React 19 & JavaScript Mastery',
  subtitle: 'From Closures and the Event Loop to React 19 Actions, the use() hook, and the React Compiler.',
  docs: [
    { label: 'React Learn', href: 'https://react.dev/learn' },
    { label: 'React 19 Docs', href: 'https://react.dev/blog/2024/12/05/react-19' },
    { label: 'MDN JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  ],
  sections: [
    {
      id: 'react-learn-fundamentals',
      title: 'React Learn Fundamentals',
      description: 'Official React Learn basics: describing UI, adding interactivity, managing state, and escape hatches.',
      concepts: [
        {
          id: 'thinking-in-react',
          title: 'Thinking in React',
          level: 'Fundamental',
          summary: 'Build UI by breaking the screen into components, describing the data model, and deciding where state should live.',
          whyItMatters: 'This is the practical method interviewers expect when they ask how you design a React feature from a mockup or API response.',
          detailedBreakdown: 'Start from the UI and data. Split the UI into components, build a static version, identify minimal state, choose the owner component, and pass data down with props.',
          advancedNotes: [
            'Keep state as close as possible to where it is needed.',
            'Lift state up only when multiple components must share the same value.',
            'A component should usually have one clear responsibility.',
          ],
          examples: [
            {
              title: 'Searchable list ownership',
              description: 'The parent owns query state because the search box and filtered list both need it.',
              codeSample: {
                label: 'ProductsPage.tsx',
                language: 'tsx',
                code: `function ProductsPage({ products }) {
  const [query, setQuery] = useState('');
  const visible = products.filter(p => p.name.includes(query));

  return (
    <>
      <SearchBox value={query} onChange={setQuery} />
      <ProductList products={visible} />
    </>
  );
}`,
              },
            },
          ],
          pitfalls: [
            'Putting every value in a global store makes simple UI harder to change.',
            'Duplicating the same state in multiple components causes sync bugs.',
          ],
          interviewQuestions: [
            {
              question: 'What does "Thinking in React" mean?',
              answer: 'It means building UI from components and data flow: split the UI into components, build a static version, identify the minimal state, choose where that state lives, then pass data down and events up.',
              difficulty: 'Easy',
            },
          ],
        },
        {
          id: 'jsx-rendering-basics',
          title: 'JSX, components, props, conditions, and lists',
          level: 'Fundamental',
          summary: 'JSX lets components return markup from JavaScript. Props pass data in, and normal JavaScript handles conditions and lists.',
          whyItMatters: 'Most React bugs start in basic rendering: incorrect JSX, missing keys, calling handlers too early, or mixing up props and state.',
          detailedBreakdown: 'Components must be capitalized. JSX must return one parent element. Use curly braces for JS expressions, ternaries/&& for conditional UI, and map() with stable keys for lists.',
          advancedNotes: [
            'Use className instead of class in JSX.',
            'Pass event handlers like onClick={handleClick}, not onClick={handleClick()}.',
            'Keys should come from stable data IDs, not array indexes when order can change.',
          ],
          examples: [
            {
              title: 'Conditional list rendering',
              description: 'A compact pattern used in almost every project.',
              codeSample: {
                label: 'Tasks.tsx',
                language: 'tsx',
                code: `function Tasks({ tasks, showDone }) {
  return (
    <ul>
      {tasks
        .filter(task => showDone || !task.done)
        .map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
    </ul>
  );
}`,
              },
            },
          ],
          pitfalls: [
            'Returning sibling JSX elements without a wrapper or fragment.',
            'Using array index as key for sortable, insertable, or removable lists.',
          ],
          interviewQuestions: [
            {
              question: 'What are the key rules of JSX?',
              answer: 'JSX must return one parent element, tags must be closed, component names start with a capital letter, class becomes className, and JavaScript expressions go inside curly braces.',
              difficulty: 'Easy',
            },
          ],
        },
        {
          id: 'state-snapshot-update-queue',
          title: 'State as a snapshot and update queue',
          level: 'Core',
          summary: 'Each render sees a fixed snapshot of state. React queues updates and processes them during the next render.',
          whyItMatters: 'This explains why setState does not update a variable immediately and why functional updates prevent stale state bugs.',
          detailedBreakdown: 'Calling a setter schedules a new render. The current render keeps its old values. Use setCount(c => c + 1) when the next value depends on the previous queued value.',
          advancedNotes: [
            'Multiple setState(count + 1) calls in one handler often use the same old count.',
            'Functional updates compose correctly when several updates are queued.',
            'React batches updates to reduce unnecessary renders.',
          ],
          examples: [
            {
              title: 'Correct queued updates',
              description: 'Increment three times from the latest queued value.',
              codeSample: {
                label: 'Counter.tsx',
                language: 'tsx',
                code: `function Counter() {
  const [count, setCount] = useState(0);

  function addThree() {
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
  }

  return <button onClick={addThree}>{count}</button>;
}`,
              },
            },
          ],
          pitfalls: [
            'Reading state immediately after calling its setter and expecting the new value.',
            'Mutating objects or arrays in state instead of creating new copies.',
          ],
          interviewQuestions: [
            {
              question: 'What does React mean by state as a snapshot?',
              answer: 'During one render, state values do not change. A setter schedules a future render with new values, but the current event handler still sees the old snapshot.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'state-structure-preservation',
          title: 'Choosing state structure and preserving/resetting state',
          level: 'Core',
          summary: 'Good state is minimal, non-duplicated, and shaped for updates. React preserves state by component position and resets it when identity changes.',
          whyItMatters: 'This is the difference between forms that stay predictable and forms that randomly keep old values or reset unexpectedly.',
          detailedBreakdown: 'Avoid redundant or duplicated state. Store IDs instead of whole derived objects. React associates state with a component position in the tree; changing keys or component types resets that state.',
          advancedNotes: [
            'Derive values during render when possible instead of storing them.',
            'Use keys intentionally to reset a form or wizard step.',
            'Avoid deeply nested state when frequent updates are needed.',
          ],
          examples: [
            {
              title: 'Reset by key',
              description: 'Changing selectedUserId remounts the form and resets local state.',
              codeSample: {
                label: 'ProfileEditor.tsx',
                language: 'tsx',
                code: `function ProfileShell({ selectedUserId }) {
  return <ProfileForm key={selectedUserId} userId={selectedUserId} />;
}`,
              },
            },
          ],
          pitfalls: [
            'Storing derived state that can be calculated from props or other state.',
            'Expecting state to reset just because props changed.',
          ],
          interviewQuestions: [
            {
              question: 'How does React decide whether to preserve or reset component state?',
              answer: 'React preserves state when the same component type stays at the same position in the tree. It resets state when the component type changes or when its key changes.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'effects-escape-hatches',
          title: 'Effects, refs, and custom hooks',
          level: 'Core',
          summary: 'Effects synchronize React with external systems. Refs hold mutable values or DOM nodes. Custom hooks reuse stateful logic.',
          whyItMatters: 'Official React Learn emphasizes that many effects are unnecessary. Knowing when to avoid an effect prevents bugs, loops, and overcomplicated code.',
          detailedBreakdown: 'Use event handlers for user actions, rendering for derived UI, effects for synchronization with systems outside React, and custom hooks to package repeated state/effect logic.',
          advancedNotes: [
            'You might not need an effect if you are only deriving data from props or state.',
            'Effect dependencies should match every reactive value used by the effect.',
            'Refs do not trigger renders, so they are for DOM access or mutable instance values.',
          ],
          examples: [
            {
              title: 'Derived data without an effect',
              description: 'Calculate during render instead of storing duplicate state.',
              codeSample: {
                label: 'Cart.tsx',
                language: 'tsx',
                code: `function Cart({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return <strong>Total: {total}</strong>;
}`,
              },
            },
          ],
          pitfalls: [
            'Using useEffect to copy props into state without a real synchronization need.',
            'Suppressing exhaustive-deps instead of changing the code structure.',
          ],
          interviewQuestions: [
            {
              question: 'When do you not need useEffect?',
              answer: 'You do not need useEffect for derived data, event-specific logic, or resetting state that can be handled with keys. Effects are mainly for synchronizing with external systems like network, subscriptions, timers, or browser APIs.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'react-19-mastery',
      title: 'React 19 & Modern Data Flow',
      description: 'Actions, useActionState, useOptimistic, the use() hook, and the React Compiler paradigm shift.',
      concepts: [
        {
          id: 'react-19-actions',
          title: 'Actions & Form Hooks (useActionState, useFormStatus)',
          level: 'Advanced',
          summary: 'React 19 introduces Actions to manage async state (pending, error, data) automatically via the form "action" prop. useActionState replaces manual loading headers, and useFormStatus provides form state to nested children.',
          whyItMatters: 'React 19 marks a paradigm shift towards "Uncontrolled" form handling with managed transitions. Senior devs must understand this to reduce boilerplate and improve UX.',
          detailedBreakdown: 'Async transitions in forms. Automatic state management for loading and errors. Context-based form status access through nested components.',
          advancedNotes: [
            'Actions: <form action={async (formData) => { ... }}> — React handles the async lifecycle.',
            'useActionState: const [state, formAction, isPending] = useActionState(fn, initial);',
            'useFormStatus: Retrieves { pending, data, method, action } from the closest parent form.',
            'These features reduce reliance on React Query/SWR for simple mutations.',
          ],
          examples: [
            {
              title: 'Modern React 19 Form with Actions',
              description: 'No more manual isSubmitting or error states.',
              codeSample: {
                label: 'LoginForm.tsx',
                language: 'tsx',
                code: `function LoginForm() {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const res = await login(formData);
      return res.error || null;
    },
    null
  );

  return (
    <form action={submitAction}>
      <input name="email" disabled={isPending} />
      <SubmitButton />
      {error && <p>{error}</p>}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus(); // Accesses parent form state!
  return <button disabled={pending}>{pending ? 'Logging in...' : 'Login'}</button>;
}`,
              },
            },
          ],
          pitfalls: [
            'Using useFormStatus in the same component as the <form> — it must be a child component to see the context.',
            'Expecting Actions to work without a "name" attribute on inputs (standard FormData behavior).',
          ],
          interviewQuestions: [
            {
              question: 'How do React 19 Actions simplify form handling?',
              answer: 'They eliminate manual state management for "pending" and "error" states. By passing an async function to the form "action" prop, React automatically tracks the transition and provides hooks like useActionState and useFormStatus to access progress and results.',
              difficulty: 'Medium'
            },
          ],
        },
        {
          id: 'react-19-use-hook',
          title: 'The use() Hook — Async & Context',
          level: 'Advanced',
          summary: 'The use() hook is the only hook that can be called conditionally and inside loops! It reads resources like Promises or Context during render.',
          whyItMatters: 'The use() hook is foundational to React 19\'s improved async support. It allows for "suspending" during render, enabling cleaner data fetching patterns.',
          detailedBreakdown: 'Conditional hook execution. Reading promises in render. Suspending on async resources.',
          advancedNotes: [
            'use(promise): Suspends the component until the promise resolves. Pairs with <Suspense>.',
            'use(Context): Alternative to useContext() that can be called inside if-statements.',
            'Warning: Reading a promise in use() during every render will cause infinite loops — the promise must be memoized or passed from a Server Component.',
          ],
          examples: [
            {
              title: 'Reading a promise and conditional context',
              description: 'The use() hook in practice.',
              codeSample: {
                label: 'UseHook.tsx',
                language: 'tsx',
                code: `function Profile({ userPromise }) {
  // 1. Read promise (Suspends parent boundary)
  const user = use(userPromise); 

  // 2. Read context conditionally (Impossible with useContext!)
  let theme = 'light';
  if (user.isVip) {
     theme = use(ThemeContext);
  }

  return <div className={theme}>{user.name}</div>;
}`,
              },
            },
          ],
          pitfalls: [
            'Creating the promise INSIDE the component — use() will re-trigger the promise on every render. The promise must be stable.',
          ],
          interviewQuestions: [
            {
              question: 'How is the use() hook unique compared to all other hooks?',
              answer: 'It is the only hook that can be called conditionally (inside an "if" statement) or inside loops. It allows and encourages reading async data and context "as needed" within the render logic.',
              difficulty: 'Hard'
            },
          ],
        },
      ],
    },
    {
      id: 'react-core',
      title: 'React Core — Virtual DOM & Reconciliation',
      description: 'How React renders, diffs, and commits changes to the real DOM.',
      concepts: [
        {
          id: 'virtual-dom',
          title: 'Virtual DOM, Reconciliation & Fiber',
          level: 'Core',
          summary: 'React builds a Virtual DOM (lightweight JS object tree). On state change, a new VDOM is created and diffed against the previous one (Fiber algorithm). Only actual changes are batched and applied to the real DOM.',
          whyItMatters: 'Optimization requires understanding why React renders. Knowing how Fiber handles "concurrent" tasks is essential for senior-level performance discussions.',
          detailedBreakdown: 'Virtual DOM vs Real DOM. Reconciliation algorithm (Fiber). Batching of updates. The role of "keys".',
          advancedNotes: [
            'Fiber is React\'s reconciler — it enables async rendering and priority scheduling.',
            'React 18 automatic batching groups multiple setState calls into one re-render.',
            'The key prop is critical — its change forces component unmount+remount (resetting state).',
          ],
          examples: [
            {
              title: 'key prop — mount vs update',
              description: 'Changing the key forces a full remount — this is the trick to reset component state.',
              codeSample: {
                label: 'key-prop.tsx',
                language: 'tsx',
                code: `// Same component, same position — React UPDATES it (state preserved)
<UserForm userId={1} />
<UserForm userId={2} /> // Same component — state from userId=1 LEAKS!

// ✅ Different key — React UNMOUNTS old, MOUNTS new (state reset)
<UserForm key={userId} userId={userId} />`,
              },
            },
          ],
          pitfalls: [
            'Using array index as key in dynamic lists — sorting/filtering moves state to wrong rows.',
            'Wrapping everything in React.memo without profiling first adds comparison overhead.',
          ],
          interviewQuestions: [
            {
              question: 'What are the 4 things that trigger a React re-render?',
              answer: '1) State change via useState/useReducer. 2) New props passed from parent. 3) Parent re-renders (all children re-render unless wrapped in React.memo). 4) Consumed Context value changes.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'hooks',
      title: 'All React Hooks — Deep Dive',
      description: 'Every hook with real gotchas, the memory-leak fix, and interview answers.',
      concepts: [
        {
          id: 'usestate-useeffect',
          title: 'useState & useEffect — Gotchas & Cleanup',
          level: 'Core',
          summary: 'useState with functional updates prevents stale state bugs. useEffect cleanup cancels in-flight requests on unmount — preventing memory leaks and "state update on unmounted component" errors.',
          whyItMatters: '90% of React bugs originate from incorrect hook usage (stale closures or missing cleanup). Mastering these is the baseline for professional React coding.',
          detailedBreakdown: 'Functional state updates. Dependency arrays and closure behavior. Request cancellation and cleanup logic.',
          advancedNotes: [
            'Always use functional update when next state depends on previous: setCount(prev => prev + 1).',
            'For objects, always spread: setUser(prev => ({ ...prev, name })) — same reference = no re-render.',
            'useEffect cleanup runs on unmount AND before the next effect fires (on dependency change).',
          ],
          examples: [
            {
              title: 'Preventing memory leaks with AbortController',
              description: 'The most common production React bug — cancelling async requests on unmount.',
              codeSample: {
                label: 'useEffect-cleanup.tsx',
                language: 'tsx',
                code: `useEffect(() => {
  const controller = new AbortController();

  async function fetchData() {
    try {
      const res = await fetch('/api/reports', {
        signal: controller.signal // Tied to this effect lifecycle
      });
      const data = await res.json();
      setData(data); // Only runs if component still mounted
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message);
    }
  }

  fetchData();

  // Cleanup: runs when component unmounts or deps change
  return () => controller.abort(); // Cancels the in-flight request
}, [userId]); // Re-runs only when userId changes`,
              },
            },
          ],
          pitfalls: [
            'Omitting dependencies causes stale closures — the effect uses old values forever.',
            'Putting an object/array in the dep array causes infinite re-renders (new reference each render).',
          ],
          interviewQuestions: [
            {
              question: 'What causes infinite loops in useEffect?',
              answer: 'Including an object or array created inline in the dependency array. Each render creates a new reference (even if content is identical). React sees it as changed → triggers re-render → creates new reference → infinite loop. Fix: depend on primitive values, or memoize with useMemo.',
              difficulty: 'Medium'
            },
          ],
        },
        {
          id: 'usememo-usecallback',
          title: 'useCallback, useMemo & React.memo',
          level: 'Core',
          summary: 'useCallback memoizes a function reference (stable prop for memoized children). useMemo memoizes an expensive computed value. React.memo skips re-render when props haven\'t shallowly changed.',
          whyItMatters: 'Unnecessary re-renders are the primary cause of React performance issues. Mastering memoization is key to building "buttery smooth" complex interfaces.',
          detailedBreakdown: 'Function stability with useCallback. Expensive calculation caching with useMemo. Component bail-out with React.memo.',
          advancedNotes: [
            'useCallback without React.memo on the child is useless — the child re-renders anyway.',
            'useMemo is for expensive calculations, NOT for simple transformations.',
            'React.memo does a shallow comparison — nested objects that change reference still cause re-renders.',
          ],
          examples: [
            {
              title: 'Stable callback for memoized child',
              description: 'The pattern: useCallback + React.memo working together.',
              codeSample: {
                label: 'memo-pattern.tsx',
                language: 'tsx',
                code: `function ProductList({ products }) {
  // ❌ New function on every render → React.memo on child is useless
  const handleDelete = (id) => api.delete(id);

  // ✅ Stable reference — only recreated if deps change
  const handleDelete = useCallback((id) => {
    api.delete(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []); // Empty deps = never recreated

  // ✅ Expensive sort computed once per data change
  const sortedProducts = useMemo(() =>
    [...products].sort((a, b) => a.price - b.price),
    [products]
  );

  return sortedProducts.map(p =>
    <ProductCard key={p.id} p={p} onDelete={handleDelete} />
  );
}

// React.memo — ONLY re-renders when props shallowly change
const ProductCard = React.memo(({ p, onDelete }) => (
  <div>{p.name} <button onClick={() => onDelete(p.id)}>Delete</button></div>
));`,
              },
            },
          ],
          pitfalls: [
            'Memoizing everything — adds overhead without measured benefit for cheap renders.',
            'React.memo with inline object props: <Comp style={{ color: "red" }} /> — new object every render, memo is useless.',
          ],
          interviewQuestions: [
            {
              question: 'What is the difference between useMemo and useCallback?',
              answer: 'useMemo(() => computedValue, [deps]) memoizes a VALUE. useCallback(() => fn, [deps]) memoizes a FUNCTION REFERENCE. useCallback is essentially useMemo(() => fn, [deps]).',
              difficulty: 'Medium'
            },
          ],
        },
        {
          id: 'useref-usecontext-usereducer',
          title: 'useRef, useContext & useReducer',
          level: 'Core',
          summary: 'useRef stores mutable values without triggering re-renders. useContext provides shared data without prop drilling. useReducer manages complex state machines.',
          whyItMatters: 'Professional state management often avoids global stores for localized complexity. useReducer is perfect for "complex" local state like multi-step forms.',
          detailedBreakdown: 'Mutable state without re-renders (useRef). Global-lite state distribution (Context). Redux-style local state (useReducer).',
          advancedNotes: [
            'useRef persists a mutable value across renders WITHOUT triggering re-render — use for timers, DOM refs, previous values.',
            'Context re-renders ALL consumers when the value changes — even if they only use one field.',
            'useReducer is better than useState when next state depends on previous state in complex ways.',
          ],
          examples: [
            {
              title: 'useRef for interval and DOM access',
              description: 'Store interval ID without triggering re-renders, plus direct DOM manipulation.',
              codeSample: {
                label: 'useref.tsx',
                language: 'tsx',
                code: `function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef    = useRef<HTMLInputElement>(null);

  const start = () => {
    // Store ID in ref — doesn't re-render
    intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };
  const stop = () => clearInterval(intervalRef.current!);
  const focus = () => inputRef.current?.focus(); // Direct DOM access

  return <input ref={inputRef} type="text" />;
}

// useReducer for cart state machine
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':    return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE': return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'CLEAR':  return { ...state, items: [] };
    default:       return state;
  }
}
const [cart, dispatch] = useReducer(cartReducer, { items: [] });`,
              },
            },
          ],
          pitfalls: [
            'Storing derived state in useRef — it won\'t update the UI. Store it in useState.',
            'Context API for high-frequency state like mouse position — causes massive re-renders.',
          ],
          interviewQuestions: [
            {
              question: 'How is useRef different from useState?',
              answer: 'useRef stores a mutable value in .current that persists across renders WITHOUT triggering a re-render on change. useState triggers a re-render on every change.',
              difficulty: 'Easy'
            },
          ],
        },
      ],
    },
    {
      id: 'state',
      title: 'Redux Toolkit — Complete Pattern',
      description: 'Modern Redux with RTK: createSlice, createAsyncThunk, and selector patterns.',
      concepts: [
        {
          id: 'redux-toolkit',
          title: 'Redux Toolkit — Slice, Thunk & Store',
          level: 'Core',
          summary: 'RTK eliminates Redux boilerplate. createSlice creates reducer + action creators together. createAsyncThunk handles async API calls with pending/fulfilled/rejected states. Immer allows direct mutation syntax.',
          whyItMatters: 'Redux remains the industry standard for enterprise-scale state. RTK is the "official" modern way to write Redux, making it much more approachable and powerful.',
          detailedBreakdown: 'The transition from legacy Redux to RTK. Slices and Reducers. Async logic with Thunks. Immer-based state modification.',
          advancedNotes: [
            'RTK uses Immer internally — you can "mutate" state in reducers because Immer produces immutable output.',
            'createAsyncThunk auto-dispatches pending/fulfilled/rejected actions.',
            'useSelector with specific selectors prevents unnecessary re-renders.',
          ],
          examples: [
            {
              title: 'Complete RTK slice with async thunk',
              description: 'Full pattern: async thunk → slice with extraReducers → store → component.',
              codeSample: {
                label: 'usersSlice.ts',
                language: 'typescript',
                code: `import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';

// 1. Async Thunk — handles API call
export const fetchUsers = createAsyncThunk('users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/users');
      return res.json();
    } catch (err) {
      return rejectWithValue('Failed to load users');
    }
  }
);

// 2. Slice — reducer + actions + extraReducers
const usersSlice = createSlice({
  name: 'users',
  initialState: { list: [], loading: false, error: null as string | null },
  reducers: {
    addUser:    (state, { payload }) => { state.list.push(payload); },  // Immer!
    removeUser: (state, { payload }) => {
      state.list = state.list.filter((u: any) => u.id !== payload);
    },
  },
  extraReducers: builder => builder
    .addCase(fetchUsers.pending,   state => { state.loading = true; state.error = null; })
    .addCase(fetchUsers.fulfilled, (state, { payload }) => { state.list = payload; state.loading = false; })
    .addCase(fetchUsers.rejected,  (state, { payload }) => { state.error = payload as string; state.loading = false; }),
});

export const { addUser, removeUser } = usersSlice.actions;

// 3. Store
export const store = configureStore({ reducer: { users: usersSlice.reducer } });

// 4. Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`,
              },
            },
            {
              title: 'Component using the slice',
              description: 'useSelector for reading state, useDispatch for dispatching actions.',
              codeSample: {
                label: 'UserList.tsx',
                language: 'tsx',
                code: `function UserList() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((s: RootState) => s.users);

  useEffect(() => { dispatch(fetchUsers()); }, [dispatch]);

  if (loading) return <Spinner />;
  if (error)   return <p>Error: {error}</p>;

  return list.map((u: any) => (
    <div key={u.id}>
      {u.name}
      <button onClick={() => dispatch(removeUser(u.id))}>Remove</button>
    </div>
  ));
}`,
              },
            },
          ],
          pitfalls: [
            'Putting non-serializable data (class instances, functions) in Redux state — causes DevTools errors.',
            'Calling dispatch inside useEffect without it in the deps array — exhaustive-deps lint rule will warn you.',
          ],
          interviewQuestions: [
            {
              question: 'Context API vs Redux — when to use which?',
              answer: 'Context API: low-frequency updates (theme, current user, language). All consumers re-render on change. Redux/RTK: high-frequency data, complex state logic, large team apps. Selective subscriptions via useSelector prevent unnecessary re-renders.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'performance',
      title: 'Performance, Error Boundaries & Code Splitting',
      description: 'React.lazy, Suspense, Error Boundaries, and profiling techniques.',
      concepts: [
        {
          id: 'code-splitting',
          title: 'Lazy Loading, Suspense & Error Boundaries',
          level: 'Core',
          summary: 'React.lazy() code-splits a component into its own JS chunk. Suspense shows a fallback while loading. Error Boundaries catch render errors in the tree below and display fallback UI.',
          whyItMatters: 'Large apps need code splitting to maintain fast initial load times. Error boundaries ensure a single component crash doesn\'t take down the entire application.',
          detailedBreakdown: 'Dynamic imports with React.lazy. Declarative loading states with Suspense. Catching render errors with class-based Error Boundaries.',
          advancedNotes: [
            'Error Boundaries must be class components — no hook equivalent exists yet.',
            'Suspense boundaries can be nested for granular loading states.',
            'React.lazy + Suspense reduces the initial JS bundle sent to the browser.',
          ],
          examples: [
            {
              title: 'Error Boundary with Lazy Loading',
              description: 'Full production pattern for catching render errors and lazy-loading admin panels.',
              codeSample: {
                label: 'error-boundary.tsx',
                language: 'tsx',
                code: `// Error Boundary — MUST be class component
class ErrorBoundary extends React.Component<
  { fallback?: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Render error:', error, info);
  }
  render() {
    return this.state.hasError
      ? this.props.fallback ?? <h2>Something went wrong.</h2>
      : this.props.children;
  }
}

// Code splitting with Suspense
const AdminPanel = React.lazy(() => import('./pages/AdminPanel'));

function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<Spinner />}>
        <AdminPanel />
      </Suspense>
    </ErrorBoundary>
  );
}`,
              },
            },
          ],
          pitfalls: [
            'Error Boundaries do not catch async errors, event handler errors, or server-side errors.',
            'Only errors in the render cycle are caught — use try/catch for async operations.',
          ],
          interviewQuestions: [
            {
              question: 'Why can\'t Error Boundaries be function components?',
              answer: 'They need to implement getDerivedStateFromError and componentDidCatch lifecycle methods — there are no hook equivalents for these specific lifecycle events in React (as of React 18).',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'advanced-hooks',
      title: 'Advanced Hooks — React 18 Concurrency Hooks',
      description: 'useTransition, useDeferredValue, useId, useImperativeHandle, useLayoutEffect, useSyncExternalStore — when and why to use each.',
      concepts: [
        {
          id: 'usetransition-usedeferred',
          title: 'useTransition & useDeferredValue — Non-Blocking UI',
          level: 'Advanced',
          summary: 'useTransition wraps a state setter to mark an update as non-urgent — React can interrupt it for urgent updates. useDeferredValue defers a value update. Both prevent blocking UI during heavy renders.',
          whyItMatters: 'Senior frontend engineers must optimize for "Perceived Performance". These hooks allow keeping the UI responsive even during expensive re-renders.',
          detailedBreakdown: 'Urgent vs Non-urgent updates. Rendering priority. Handling laggy lists or heavy tabs without traditional debounce/throttle.',
          advancedNotes: [
            'useTransition: you control the setState call. useDeferredValue: you only have the value, not the setter (e.g., a prop).',
            'isPending flag from useTransition lets you show a spinner during the deferred render.',
            'Both are concurrent features — only useful in React 18+ with concurrent mode (createRoot).',
            'Real use: search with 10,000 items, tab switching with heavy panels, typeahead filters.',
          ],
          examples: [
            {
              title: 'useTransition for search with heavy list',
              description: 'Typing stays instant even as the filtered 10k-item list re-renders.',
              codeSample: {
                label: 'useTransition.tsx',
                language: 'tsx',
                code: `import { useState, useTransition, useDeferredValue } from 'react';

// ── useTransition ──
function SearchPage({ items }: { items: string[] }) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // Urgent — input updates instantly

    startTransition(() => {
      // Non-urgent — React may defer this render
      setFiltered(items.filter(i => i.includes(e.target.value)));
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />} {/* Shows while deferred render is pending */}
      <ul>{filtered.map(i => <li key={i}>{i}</li>)}</ul>
    </>
  );
}

// ── useDeferredValue ── (when you don't control the setter)
function ResultList({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  // deferredQuery lags behind query during typing
  // React renders with stale value first, updates when idle
  const filtered = useMemo(
    () => expensiveFilter(items, deferredQuery),
    [deferredQuery]
  );
  return <ul>{filtered.map(i => <li key={i}>{i}</li>)}</ul>;
}`,
              },
            },
          ],
          pitfalls: [
            'Using useTransition for network requests — it only defers React rendering, not async operations.',
            'Expecting startTransition to be synchronous — the update is still batched and async.',
          ],
          interviewQuestions: [
            {
              question: 'What is useTransition and when do you use it?',
              answer: 'useTransition marks a state update as non-urgent. React can interrupt and defer the update if a higher-priority update comes in (e.g., user typing). Use it for: search filtering large lists, tab content switching, or anything that makes the UI feel sluggish during re-render.',
              difficulty: 'Hard'
            },
            {
              question: 'Difference between useTransition and useDeferredValue?',
              answer: 'useTransition wraps the setState call — you have control of when the state is set. useDeferredValue wraps the value itself — use when you receive a value as a prop and don\'t control its setter. Both prevent blocking the UI during heavy renders.',
              difficulty: 'Hard'
            },
          ],
        },
        {
          id: 'advanced-hooks-misc',
          title: 'useId, useImperativeHandle, useLayoutEffect & useSyncExternalStore',
          level: 'Advanced',
          summary: 'useId: stable unique IDs for accessibility without hydration mismatches. useImperativeHandle: expose controlled imperative ref APIs. useLayoutEffect: synchronous DOM measurement before paint. useSyncExternalStore: safe external store subscription in concurrent React.',
          whyItMatters: 'These hooks solve specific, high-level problems in library development and complex UI synchronization. Knowing when to use useLayoutEffect instead of useEffect is a key senior differentiator.',
          detailedBreakdown: 'Hydration-safe IDs. Ref API control. Synchronous DOM measurement. Safe store subscriptions.',
          advancedNotes: [
            'useId() generates ":r0:", ":r1:" — stable server+client. Never use Math.random() for ARIA IDs.',
            'useImperativeHandle works with forwardRef — expose only what the parent needs, never the raw DOM ref.',
            'useLayoutEffect fires before browser paint — use for measuring DOM (getBoundingClientRect). Causes SSR warning — guard with typeof window !== "undefined".',
            'useSyncExternalStore prevents "tearing" in React 18 concurrent mode — required for Redux, Zustand, Valtio store subscriptions.',
          ],
          examples: [
            {
              title: 'All four advanced hooks in one reference',
              description: 'Practical patterns for each hook.',
              codeSample: {
                label: 'advanced-hooks.tsx',
                language: 'tsx',
                code: `// ── useId ── stable unique ID (no hydration mismatch)
function FormField({ label }: { label: string }) {
  const id = useId(); // → ":r0:", ":r1:" — same on server+client
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-describedby={\`\${id}-hint\`} />
      <span id={\`\${id}-hint\`}>Hint text</span>
    </div>
  );
}

// ── useImperativeHandle ── controlled ref API
const VideoPlayer = forwardRef<{ play: () => void; pause: () => void }, {}>(
  (_, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      play:  () => videoRef.current?.play(),
      pause: () => videoRef.current?.pause(),
      // Note: we DON'T expose the raw videoRef!
    }));

    return <video ref={videoRef} src="/video.mp4" />;
  }
);

// ── useLayoutEffect ── DOM measurement before paint
function Tooltip({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0 });

  useLayoutEffect(() => {
    // Runs before browser paints — no flicker
    const rect = ref.current!.getBoundingClientRect();
    setPosition({ top: rect.bottom + 8 });
  }, []);

  return <div ref={ref} />;
}

// ── useSyncExternalStore ── safe external store subscription
function useWindowSize() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    () => ({ width: window.innerWidth, height: window.innerHeight }),
    () => ({ width: 0, height: 0 }) // SSR snapshot
  );
}`,
              },
            },
          ],
          pitfalls: [
            'useLayoutEffect in SSR — Next.js will warn. Use useEffect + isomorphic check, or next/dynamic with { ssr: false }.',
            'Not passing a server snapshot to useSyncExternalStore — causes hydration mismatch.',
          ],
          interviewQuestions: [
            {
              question: 'Why can\'t you use Math.random() for accessibility IDs? What is the solution?',
              answer: 'Math.random() generates different values on server and client, causing a React hydration mismatch and console errors. The solution is useId() — it generates a stable string like ":r0:" that is identical on server and client, preventing hydration failures.',
              difficulty: 'Medium'
            },
            {
              question: 'What is useSyncExternalStore and why does Redux need it in React 18?',
              answer: 'In React 18 concurrent mode, rendering can be interrupted and resumed. Without useSyncExternalStore, a component might read state at two different points in a single render pass — "tearing". useSyncExternalStore forces synchronous reads, ensuring all components see the same snapshot. Redux >= v8 uses it internally.',
              difficulty: 'Hard'
            },
          ],
        },
      ],
    },
    {
      id: 'rtkquery',
      title: 'RTK Query — API Data Fetching & Caching',
      description: 'Auto-generated hooks, cache invalidation with tags, optimistic updates, and why RTK Query eliminates 90% of async boilerplate.',
      concepts: [
        {
          id: 'rtk-query-full',
          title: 'RTK Query — createApi, Endpoints & Cache Tags',
          level: 'Advanced',
          summary: 'RTK Query is a data-fetching layer built into Redux Toolkit. Define endpoints, get auto-generated hooks, built-in caching, background refetching, and cache invalidation via tags. No manual thunks, no loading state boilerplate.',
          whyItMatters: 'Managing server state is distinct from client state. RTK Query provides an enterprise-standard way to handle API interactions with automatic caching and invalidation logic.',
          detailedBreakdown: 'Endpoint definitions. Auto-generated hooks. Cache invalidation with tags. Optimistic updates.',
          advancedNotes: [
            'createApi generates useGetUsersQuery, useCreateUserMutation, etc. automatically.',
            'providesTags/invalidatesTags: when a mutation fires, queries tagged with matching tags are automatically refetched.',
            'Tags can be entity-level: { type: "User", id: user.id } — only refetches that specific user.',
            'RTK Query manages normalization via tags — not entity normalization like normalizr.',
            'selectFromResult: subscribe to a computed slice of a query result without re-rendering for whole cache.',
          ],
          examples: [
            {
              title: 'Complete RTK Query: createApi + optimistic update',
              description: 'Full API slice, component usage, and cache invalidation pattern.',
              codeSample: {
                label: 'api.ts + UserList.tsx',
                language: 'typescript',
                code: `// ── api.ts ── Define the API
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api', prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set('Authorization', \`Bearer \${token}\`);
    return headers;
  }}),
  tagTypes: ['User', 'Post'],
  endpoints: (builder) => ({

    // Query endpoint — reads data
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'User' as const, id })), 'User']
               : ['User'],
    }),

    getUserById: builder.query<User, number>({
      query: (id) => \`/users/\${id}\`,
      providesTags: (_, __, id) => [{ type: 'User', id }],
    }),

    // Mutation endpoint — writes data
    createUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({ url: '/users', method: 'POST', body }),
      invalidatesTags: ['User'], // Refetches getUsers after create
    }),

    updateUser: builder.mutation<User, { id: number } & Partial<User>>({
      query: ({ id, ...patch }) => ({ url: \`/users/\${id}\`, method: 'PATCH', body: patch }),
      invalidatesTags: (_, __, { id }) => [{ type: 'User', id }], // Only refetch this user
      // Optimistic update:
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getUserById', id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try { await queryFulfilled; }
        catch { patchResult.undo(); } // Revert on error
      },
    }),

    deleteUser: builder.mutation<void, number>({
      query: (id) => ({ url: \`/users/\${id}\`, method: 'DELETE' }),
      invalidatesTags: (_, __, id) => [{ type: 'User', id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = api;

// ── UserList.tsx ── Component using auto-generated hooks
function UserList() {
  const { data: users, isLoading, isFetching, error } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading users</p>;

  return (
    <>
      {isFetching && <RefreshIndicator />}
      {users?.map(u => <UserCard key={u.id} user={u} />)}
      <button onClick={() => createUser({ name: 'New User' })}>Add User</button>
    </>
  );
}`,
              },
            },
          ],
          pitfalls: [
            'Not using error boundaries for RTK Query errors — components may crash if API fails.',
            'Misconfiguring tag invalidation — cache stays stale or refetches too much.',
          ],
          interviewQuestions: [
            {
              question: 'What is RTK Query and why use it over useEffect + fetch?',
              answer: 'RTK Query is a powerful data fetching and caching tool built into Redux Toolkit. It automates loading states, error handling, caching, background refetching, and cache invalidation via tags. It eliminates 90% of the manual boilerplate required for managing server state in React.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'advanced-testing-architecture',
      title: 'Testing & Enterprise Architecture',
      description: 'Building robust, tested React applications with Vitest and modern patterns.',
      concepts: [
        {
          id: 'testing-react',
          title: 'Testing (Vitest & React Testing Library)',
          level: 'Advanced',
          summary: 'The shift from implementation testing to user-behavior testing. Focus on accessibility-first selectors.',
          whyItMatters: 'Senior devs must ensure stability. Automated testing is the only way to scale a codebase safely.',
          detailedBreakdown: 'Testing Library philosophy. Mocks vs Spies. Integration testing of complex flows.',
          examples: [
             {
              title: 'Testing a Counter with RTL',
              description: 'Correct user-behavior testing pattern.',
              codeSample: {
                label: 'Counter.test.tsx',
                language: 'tsx',
                code: `test('increments the counter', async () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: /increment/i });
  await userEvent.click(button);
  expect(screen.getByText(/count is 1/i)).toBeInTheDocument();
});`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'What is the "Testing Library" philosophy?',
              answer: 'Test how a user interacts with the app, not its internal state. Prefer accessibility-based selectors (getByRole, getByLabelText) over test IDs or class names.',
              difficulty: 'Medium'
            }
          ]
        },
        {
          id: 'compound-components',
          title: 'Compound Components Pattern',
          level: 'Advanced',
          summary: 'A powerful pattern for building flexible, reusable UI components like Tabs, Selects, and Modals.',
          whyItMatters: 'Professional component libraries (Radix, HeadlessUI) use this to allow users to compose UI while the component manages shared state.',
          interviewQuestions: [
            {
              question: 'What is the benefit of the Compound Component pattern?',
              answer: 'It avoids "Prop Drilling" and "Mega-Components" with 30+ props. Instead, you split the UI into child components that share state via Context, allowing the consumer greater layout flexibility.',
              difficulty: 'Hard'
            }
          ]
        }
      ]
    },
  ],
};
