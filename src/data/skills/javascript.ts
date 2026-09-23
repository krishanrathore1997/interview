import { SkillPageContent } from '../types';

export const javascript: SkillPageContent = {
  topic: 'JavaScript',
  title: 'JavaScript Fundamentals — Absolute Basics to Core Logic',
  subtitle: 'Learn the programming language that powers the web: from simple variables to complex loops and browser interaction.',
  docs: [
    { label: 'W3Schools JS Tutorial', href: 'https://www.w3schools.com/js/' },
    { label: 'MDN JavaScript Guide', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
  ],
  sections: [
    {
      id: 'js-basics',
      title: '1. JavaScript Basics',
      description: 'Variables, syntax, and outputting data.',
      concepts: [
        {
          id: 'js-output-syntax',
          title: 'Syntax & Output',
          level: 'Fundamental',
          summary: 'JavaScript can be used in the <script> tag. Messages can be displayed via alerts, console.log, or by modifying HTML.',
          whyItMatters: 'Knowing how to get feedback from your code (outputs) is crucial for learning and debugging.',
          detailedBreakdown: 'Statements end with semicolons. Case-sensitivity. Methods like console.log() and alert().',
          examples: [
            {
              title: 'Output Methods',
              description: 'Three ways to see your JS in action.',
              codeSample: {
                label: 'output.js',
                language: 'javascript',
                code: `// Output to browser console
console.log("Hello Console!");

// Popup alert
alert("Hello Alert!");

// Change HTML content
document.getElementById("demo").innerHTML = "Hello HTML!";`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'Which is better for debugging: alert() or console.log()?',
              answer: 'console.log() is generally better as it doesn\'t block the UI thread and allows you to inspect complex objects without dismissing a popup.',
              difficulty: 'Easy'
            },
            {
              question: 'What\'s the difference between console.log and console.error?',
              answer: 'Both print to the console and accept multiple arguments or objects for inspection, but console.error is styled distinctly (usually red) and, in Node/browser dev tools, includes a stack trace, which makes real errors easier to spot among normal logs.',
              difficulty: 'Easy'
            },
          ],
        },
        {
          id: 'js-variables',
          title: 'Variables: let & const',
          level: 'Fundamental',
          summary: 'Variables are containers for data. Use "let" for values that change and "const" for those that don\'t.',
          whyItMatters: 'Correct variable declaration prevents bugs and makes intent clear (e.g. constant vs changing state).',
          detailedBreakdown: 'Naming conventions (camelCase). Difference between let, const, and the legacy var (scope differences).',
          examples: [
            {
              title: 'Declaring Variables',
              description: 'Using let and const correctly.',
              codeSample: {
                label: 'variables.js',
                language: 'javascript',
                code: `const price = 99; // Cannot be changed
let quantity = 2; // Can be updated
quantity = quantity + 1;

let total = price * quantity;`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'Can you re-declare a variable with "let" in the same scope?',
              answer: 'No, "let" does not allow re-declaration in the same scope, which helps prevent accidental bugs.',
              difficulty: 'Easy'
            },
            {
              question: 'What\'s the difference between let/const and the legacy var in terms of scope?',
              answer: 'var is function-scoped and hoisted with an initial value of undefined, so it can be referenced (as undefined) before its declaration line. let and const are block-scoped and sit in a "temporal dead zone" until their declaration runs, throwing a ReferenceError if accessed early.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'js-logic',
      title: '2. Logic & Control Flow',
      description: 'Comparisons, conditionals, and repeating code.',
      concepts: [
        {
          id: 'js-conditionals',
          title: 'Conditionals (If...Else)',
          level: 'Fundamental',
          summary: 'Use "if" to perform an action only when a condition is true.',
          whyItMatters: 'Decisions are the core of any application logic.',
          detailedBreakdown: 'Comparison operators (==, ===, >, <). Logical operators (&&, ||, !).',
          examples: [
            {
              title: 'Simple Condition',
              description: 'Checking a range.',
              codeSample: {
                label: 'logic.js',
                language: 'javascript',
                code: `let hour = 15;
if (hour < 12) {
  console.log("Good Morning");
} else {
  console.log("Good Afternoon");
}`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'What is the difference between == and ===?',
              answer: '== checks for equality only (with type conversion), while === checks for both equality AND data type (strict equality).',
              difficulty: 'Medium'
            },
            {
              question: 'What are JavaScript\'s falsy values?',
              answer: 'false, 0, -0, "" (empty string), null, undefined, and NaN. Everything else — including "0", "false" as a string, [], and {} — is truthy.',
              difficulty: 'Easy'
            },
          ],
        },
        {
          id: 'js-loops',
          title: 'Loops (For & While)',
          level: 'Fundamental',
          summary: 'Loops repeat code for a specific number of times or while a condition is true.',
          whyItMatters: 'Loops are essential for working with lists (arrays) and processing repeating data.',
          detailedBreakdown: 'For loop syntax (initialization, condition, increment). While loop as a more flexible alternative.',
          examples: [
            {
              title: 'For Loop',
              description: 'Counting from 1 to 5.',
              codeSample: {
                label: 'loops.js',
                language: 'javascript',
                code: `for (let i = 1; i <= 5; i++) {
  console.log("Number: " + i);
}`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'How do you stop a loop prematurely?',
              answer: 'Use the "break" keyword inside the loop body.',
              difficulty: 'Easy'
            },
            {
              question: 'What\'s the difference between for...in and for...of?',
              answer: 'for...in iterates over enumerable property keys — indexes for arrays, keys for objects — and isn\'t ideal for arrays since order and inherited keys aren\'t guaranteed. for...of iterates over the values of any iterable (arrays, strings, Maps, Sets) and is the preferred way to loop over array values.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'js-data',
      title: '3. Functions & Arrays',
      description: 'Reusing code and managing lists.',
      concepts: [
        {
          id: 'js-functions',
          title: 'Functions Basics',
          level: 'Fundamental',
          summary: 'A function is a block of code designed to perform a particular task.',
          whyItMatters: 'Functions allow you to write code once and reuse it many times.',
          detailedBreakdown: 'Parameters vs Arguments. Return values.',
          examples: [
            {
              title: 'Simple Function',
              description: 'Adding two numbers.',
              codeSample: {
                label: 'functions.js',
                language: 'javascript',
                code: `function add(a, b) {
  return a + b;
}
let sum = add(10, 20);`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'What happens if a function doesn\'t use the "return" keyword?',
              answer: 'It returns "undefined" by default.',
              difficulty: 'Medium'
            },
            {
              question: 'What is a closure, and why does it matter?',
              answer: 'A closure is a function that keeps access to the variables from its enclosing scope even after that outer function has finished running. It\'s the basis of private state — the module pattern, memoization, and factory functions like counters all rely on closures.',
              difficulty: 'Medium'
            },
          ],
        },
        {
          id: 'js-arrays',
          title: 'Working with Arrays',
          level: 'Fundamental',
          summary: 'Arrays are used to store multiple values in a single variable.',
          whyItMatters: 'Arrays are the most common way to handle collections of data in JavaScript.',
          detailedBreakdown: 'Accessing elements using index (starting at 0). Basic methods like length, push(), and pop().',
          examples: [
            {
              title: 'Fruits Array',
              description: 'Adding and accessing items.',
              codeSample: {
                label: 'arrays.js',
                language: 'javascript',
                code: `let fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits[0]); // Apple
fruits.push("Date");    // Adds to the end`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'How do you find the number of elements in an array?',
              answer: 'Use the .length property (e.g. fruits.length).',
              difficulty: 'Easy'
            },
            {
              question: 'What\'s the difference between slice() and splice()?',
              answer: 'slice() returns a shallow copy of a portion of the array without touching the original. splice() mutates the original array in place, removing and/or inserting elements at a given position.',
              difficulty: 'Easy'
            },
          ],
        },
        {
          id: 'js-array-iteration',
          title: 'Array Iteration (forEach, map)',
          level: 'Core',
          summary: 'Use iteration methods to perform actions on every element in an array.',
          whyItMatters: 'Modern JavaScript focuses on functional iteration rather than manual for-loops for cleaner, more readable code.',
          detailedBreakdown: 'forEach() executes a function for each element. map() creates a NEW array by performing a function on each element.',
          examples: [
            {
              title: 'Using map()',
              description: 'Creating a new array of squared numbers.',
              codeSample: {
                label: 'map.js',
                language: 'javascript',
                code: `const numbers = [1, 2, 3];
const squared = numbers.map(x => x * x);
console.log(squared); // [1, 4, 9]`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'Does map() change the original array?',
              answer: 'No, map() creates a new array and leaves the original array unchanged.',
              difficulty: 'Medium'
            },
            {
              question: 'When would you use reduce() instead of map() or forEach()?',
              answer: 'Use reduce() when you need to derive a single accumulated value from an array — a sum, a grouped object, a flattened list — rather than a same-length transformed array (map) or just a side effect per item (forEach).',
              difficulty: 'Medium'
            },
          ],
        },
        {
          id: 'js-math-date',
          title: 'Math & Date Objects',
          level: 'Fundamental',
          summary: 'Built-in objects for mathematical operations and date handling.',
          whyItMatters: 'Handling time and performing calculations (like random numbers) are common requirements in web development.',
          detailedBreakdown: 'Math.random(), Math.floor(), and Math.round(). Creating dates with new Date().',
          examples: [
            {
              title: 'Random Number',
              description: 'Generating a random integer between 1 and 10.',
              codeSample: {
                label: 'math.js',
                language: 'javascript',
                code: `let randomNum = Math.floor(Math.random() * 10) + 1;
let today = new Date();`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'How do you get the current year in JavaScript?',
              answer: 'Use new Date().getFullYear().',
              difficulty: 'Easy'
            },
            {
              question: 'Why is comparing floating point numbers with === risky?',
              answer: 'Floating point arithmetic can introduce tiny rounding errors — 0.1 + 0.2 === 0.3 is false in JavaScript. Compare with a small epsilon tolerance (Math.abs(a - b) < 0.0001) or round to a fixed precision instead of relying on exact equality.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'js-dom',
      title: '4. Browser JS & Interaction',
      description: 'Connecting JS to the web page.',
      concepts: [
        {
          id: 'js-dom-basics',
          title: 'DOM Basics & Events',
          level: 'Core',
          summary: 'Interaction with HTML occurs through the Document Object Model (DOM) and event listeners.',
          whyItMatters: 'This is where JavaScript becomes interactive, allowing buttons to work and elements to change.',
          detailedBreakdown: 'Selecting elements (getElementById). Responding to actions like "onclick".',
          examples: [
            {
              title: 'Button Click',
              description: 'Changing text on a click.',
              codeSample: {
                label: 'dom.js',
                language: 'javascript',
                code: `function changeText() {
  document.getElementById("btn").innerText = "Clicked!";
}

// In HTML: <button id="btn" onclick="changeText()">Click Me</button>`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'What is the DOM?',
              answer: 'DOM stands for Document Object Model. It is a programming interface for HTML and XML documents that represents the page as a tree structure.',
              difficulty: 'Medium'
            },
            {
              question: 'What\'s the difference between addEventListener and an inline onclick attribute?',
              answer: 'addEventListener lets you attach multiple listeners to the same event without one overwriting another, supports capturing/bubbling options and a removeEventListener cleanup path, and keeps markup separate from behavior, which is the modern best practice.',
              difficulty: 'Easy'
            },
          ],
        },
        {
          id: 'js-classes-errors',
          title: 'ES6 Classes & Error Handling',
          level: 'Core',
          summary: 'Use classes to organize code and try/catch to handle errors.',
          whyItMatters: 'Modern applications use classes for structure and error handling to prevent the app from crashing on unexpected inputs.',
          detailedBreakdown: 'Defining a class with a constructor. Using the try...catch...finally block.',
          examples: [
            {
              title: 'Simple Class',
              description: 'Defining a class and creating an instance.',
              codeSample: {
                label: 'classes.js',
                language: 'javascript',
                code: `class Car {
  constructor(name) {
    this.name = name;
  }
}
const myCar = new Car("Ford");`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'What is the purpose of "try...catch"?',
              answer: 'It allows you to test a block of code for errors and handle them gracefully without stopping the script.',
              difficulty: 'Medium'
            },
            {
              question: 'What is prototypal inheritance in JavaScript?',
              answer: 'Every object has an internal link to a prototype object it can inherit properties and methods from. Classes are syntactic sugar over this prototype chain — methods defined in a class body live once on the prototype and are shared by every instance, not copied onto each one.',
              difficulty: 'Hard'
            },
          ],
        },
      ],
    },
    {
      id: 'js-objects-strings',
      title: '5. Objects, Strings & Type Conversion',
      description: 'Daily JavaScript data modeling and common type pitfalls.',
      concepts: [
        {
          id: 'js-objects-properties',
          title: 'Objects, Properties & Destructuring',
          level: 'Fundamental',
          summary: 'Objects store related data as key-value pairs. Destructuring extracts values into variables with cleaner syntax.',
          whyItMatters: 'Most API responses, React props, and app state are JavaScript objects. Reading and reshaping objects is daily project work.',
          detailedBreakdown: 'Object literals, dot vs bracket access, optional chaining, computed properties, spread/rest, and object destructuring.',
          advancedNotes: [
            'Use dot access for known property names and bracket access for dynamic property names.',
            'Use optional chaining for uncertain nested values, such as user?.profile?.name.',
            'Object spread creates a shallow copy, not a deep clone.',
          ],
          examples: [
            {
              title: 'Object destructuring',
              description: 'Extract values and keep the rest.',
              codeSample: {
                label: 'object.js',
                language: 'javascript',
                code: `const user = { id: 1, name: "Asha", role: "admin" };
const { id, name, ...meta } = user;

console.log(name); // Asha
console.log(meta); // { role: "admin" }`,
              },
            },
          ],
          pitfalls: [
            'Mutating a shared object can create bugs in React state and cached data.',
            'Forgetting that spread only copies one level deep.',
          ],
          interviewQuestions: [
            {
              question: 'What is the difference between dot notation and bracket notation?',
              answer: 'Dot notation is for fixed property names like user.name. Bracket notation is for dynamic names like user[field] or names that are not valid identifiers.',
              difficulty: 'Easy',
            },
            {
              question: 'What\'s the difference between Object.freeze() and just using const for an object?',
              answer: 'const only stops the variable from being reassigned to a different object; the object\'s own properties can still be mutated. Object.freeze() makes the object itself immutable (mutations silently fail in non-strict mode, throw in strict mode), though it\'s only a shallow freeze — nested objects stay mutable.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'js-strings-numbers-coercion',
          title: 'Strings, Numbers & Type Conversion',
          level: 'Fundamental',
          summary: 'JavaScript converts values in many operations. Understanding strings, numbers, truthy/falsy values, and parsing prevents surprise bugs.',
          whyItMatters: 'Form inputs, query strings, and API payloads often arrive as strings even when your business logic expects numbers or booleans.',
          detailedBreakdown: 'String methods, template literals, Number(), parseInt(), parseFloat(), NaN, truthy/falsy values, == vs ===, and nullish coalescing.',
          advancedNotes: [
            'Prefer === unless you intentionally want coercion.',
            'Use Number.isNaN(value) instead of value === NaN.',
            'Use ?? when only null/undefined should trigger a default.',
          ],
          examples: [
            {
              title: 'Parsing form values',
              description: 'Convert string input before doing math.',
              codeSample: {
                label: 'parse.js',
                language: 'javascript',
                code: `const quantityInput = "3";
const price = 99;

const quantity = Number(quantityInput);
const total = quantity * price;`,
              },
            },
          ],
          pitfalls: [
            'Using || for defaults can replace valid values like 0 or an empty string.',
            'parseInt("10px") returns 10, which can hide invalid input if you expected a pure number.',
          ],
          interviewQuestions: [
            {
              question: 'Why is Number.isNaN(value) safer than value === NaN?',
              answer: 'NaN is never equal to itself, so value === NaN is always false. Number.isNaN(value) correctly checks whether the value is the special NaN number.',
              difficulty: 'Medium',
            },
            {
              question: 'What does [] + [] evaluate to, and why?',
              answer: 'It evaluates to an empty string "". The + operator coerces both operands with ToPrimitive; arrays convert to strings via their toString(), and an empty array becomes "", so "" + "" is "". The same rule explains why [] + {} produces "[object Object]".',
              difficulty: 'Hard',
            },
          ],
        },
      ],
    },
    {
      id: 'js-modern-data',
      title: '6. Modern Data Tools',
      description: 'Collections and formats used in modern browser and Node projects.',
      concepts: [
        {
          id: 'js-set-map-json',
          title: 'Set, Map & JSON',
          level: 'Core',
          summary: 'Set stores unique values, Map stores key-value pairs with any key type, and JSON is the common text format for API data.',
          whyItMatters: 'These tools show up in filtering, caching, API communication, deduping data, and frontend performance work.',
          detailedBreakdown: 'Set for uniqueness, Map for dynamic lookup, JSON.stringify() to serialize, JSON.parse() to read JSON strings.',
          advancedNotes: [
            'Map preserves insertion order and supports non-string keys.',
            'JSON cannot represent functions, undefined, Map, Set, Date objects, or circular references directly.',
            'Always validate parsed JSON from external sources before trusting it.',
          ],
          examples: [
            {
              title: 'Deduplicate IDs and parse JSON',
              description: 'Two common W3Schools-level operations used in real apps.',
              codeSample: {
                label: 'data.js',
                language: 'javascript',
                code: `const ids = [1, 2, 2, 3];
const uniqueIds = [...new Set(ids)];

const payload = '{"name":"Asha"}';
const user = JSON.parse(payload);`,
              },
            },
          ],
          pitfalls: [
            'Assuming JSON.parse is safe just because the string is valid JSON.',
            'Using an object as a dictionary when Map would handle dynamic keys more clearly.',
          ],
          interviewQuestions: [
            {
              question: 'When would you use Set instead of an array?',
              answer: 'Use Set when uniqueness and fast membership checks matter. Arrays are better when order, duplicates, or array methods are the main need.',
              difficulty: 'Easy',
            },
            {
              question: 'Why would you use a Map instead of a plain object for a lookup table?',
              answer: 'Map preserves insertion order reliably, allows any value (not just strings or symbols) as a key, exposes a real .size property, and doesn\'t carry inherited prototype properties that could accidentally collide with your data keys.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'js-regexp-modules',
          title: 'Regular Expressions & Modules',
          level: 'Core',
          summary: 'Regular expressions match patterns in text. Modules split code into reusable files with import and export.',
          whyItMatters: 'Regex is common in validation and parsing; modules are the foundation of modern frontend and backend JavaScript code organization.',
          detailedBreakdown: 'RegExp literals, test(), match(), replace(), named exports, default exports, and module boundaries.',
          advancedNotes: [
            'Keep regex readable; complex validation often belongs in a library.',
            'ES modules are statically analyzable, which helps bundlers tree-shake unused code.',
            'Avoid large modules with hidden side effects because they are harder to test.',
          ],
          examples: [
            {
              title: 'Regex and named export',
              description: 'Small reusable validation helper.',
              codeSample: {
                label: 'email.js',
                language: 'javascript',
                code: `export function isEmail(value) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
}`,
              },
            },
          ],
          pitfalls: [
            'Trying to validate every possible email address with a handcrafted regex.',
            'Mixing CommonJS and ES modules without understanding interop behavior.',
          ],
          interviewQuestions: [
            {
              question: 'Why are JavaScript modules useful?',
              answer: 'Modules split code into reusable files, make dependencies explicit with import/export, reduce global variables, and help bundlers optimize the final bundle.',
              difficulty: 'Easy',
            },
            {
              question: 'What\'s the difference between a default export and a named export?',
              answer: 'A module can have only one default export, and the importer can give it any local name (import Foo from "./x"). Named exports can be many per module and must be imported by their exact name (or renamed with "as"), which plays better with IDE auto-import and refactoring tools.',
              difficulty: 'Easy',
            },
          ],
        },
      ],
    },
    {
      id: 'js-async-web',
      title: '7. Async JavaScript & Web APIs',
      description: 'Fetching data, handling async work, and using browser APIs safely.',
      concepts: [
        {
          id: 'js-callbacks-promises-async',
          title: 'Callbacks, Promises & Async/Await',
          level: 'Core',
          summary: 'Callbacks run later, Promises represent future values, and async/await makes promise code read like sequential code.',
          whyItMatters: 'APIs, timers, file uploads, and most browser work are asynchronous. Interviews almost always test this area.',
          detailedBreakdown: 'Callback functions, Promise states, then/catch/finally, async functions, await, try/catch, and parallel work with Promise.all.',
          advancedNotes: [
            'await pauses the async function, not the whole JavaScript engine.',
            'Use Promise.all for independent parallel requests when one failure should fail the group.',
            'Use try/catch around awaited work at the boundary where you can handle or report the error.',
          ],
          examples: [
            {
              title: 'Fetch with async/await',
              description: 'Common API call pattern.',
              codeSample: {
                label: 'fetch.js',
                language: 'javascript',
                code: `async function loadUsers() {
  const response = await fetch('/api/users');
  if (!response.ok) throw new Error('Request failed');
  return response.json();
}`,
              },
            },
          ],
          pitfalls: [
            'Forgetting to await response.json(), which returns a Promise.',
            'Running independent awaits sequentially when Promise.all would be faster.',
          ],
          interviewQuestions: [
            {
              question: 'What is the difference between a callback and a Promise?',
              answer: 'A callback is a function passed to run later. A Promise is an object representing a future result and supports chaining, error handling, and async/await syntax.',
              difficulty: 'Medium',
            },
            {
              question: 'In what order do a synchronous log, a setTimeout(fn, 0), and a Promise.then() run?',
              answer: 'Synchronous code runs first, in order. Then all pending microtasks (Promise.then/catch/finally callbacks) run before the event loop moves to the next macrotask — so even setTimeout(fn, 0) fires after every already-queued Promise callback, not before it.',
              difficulty: 'Hard',
            },
          ],
        },
        {
          id: 'js-web-apis-storage',
          title: 'Web APIs, Storage & Debugging',
          level: 'Core',
          summary: 'Browser APIs provide DOM, timers, fetch, storage, history, and debugging tools beyond the JavaScript language itself.',
          whyItMatters: 'Real frontend debugging often depends on knowing whether a feature is JavaScript syntax or a browser API.',
          detailedBreakdown: 'setTimeout, setInterval, fetch, localStorage, sessionStorage, cookies, console, debugger, Network tab, and Application tab.',
          advancedNotes: [
            'localStorage stores strings and is readable by JavaScript, so do not store secrets there.',
            'Use DevTools Network to inspect request headers, payloads, status codes, and CORS problems.',
            'Use debugger statements and breakpoints to inspect call stack and variable values.',
          ],
          examples: [
            {
              title: 'Store a simple preference',
              description: 'Small values can be persisted in localStorage.',
              codeSample: {
                label: 'storage.js',
                language: 'javascript',
                code: `localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme') ?? 'light';`,
              },
            },
          ],
          pitfalls: [
            'Confusing browser APIs with the JavaScript language core.',
            'Leaving setInterval running without clearing it when the UI no longer needs it.',
          ],
          interviewQuestions: [
            {
              question: 'localStorage vs sessionStorage vs cookies: what is the difference?',
              answer: 'localStorage persists until cleared, sessionStorage lasts for the browser tab, and cookies are sent with HTTP requests. Cookies can be protected with flags like HttpOnly, Secure, and SameSite.',
              difficulty: 'Medium',
            },
            {
              question: 'How would you clean up a setInterval so it doesn\'t leak?',
              answer: 'Store the ID that setInterval returns and call clearInterval(id) once the feature no longer needs it — for example in a component\'s cleanup function, or right before starting a replacement interval — so duplicate timers don\'t silently stack up.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
  ],
};
