import { SkillPageContent } from '../types';

export const htmlCss: SkillPageContent = {
  topic: 'HTML & CSS',
  title: 'HTML & CSS Fundamentals',
  subtitle: 'Semantic HTML, forms, CSS box model, responsive layouts, and accessibility basics every web developer should know.',
  docs: [
    { label: 'MDN HTML', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { label: 'MDN CSS', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { label: 'W3Schools HTML', href: 'https://www.w3schools.com/html/' },
    { label: 'W3Schools CSS', href: 'https://www.w3schools.com/css/' },
  ],
  sections: [
    {
      id: 'html-foundations',
      title: 'HTML Foundations',
      description: 'The document structure and elements you use on every web page.',
      concepts: [
        {
          id: 'doctype-html-head-body',
          title: 'DOCTYPE, html, head, and body',
          level: 'Fundamental',
          summary: 'A valid HTML document starts with a doctype, wraps content in html, puts metadata in head, and visible content in body.',
          whyItMatters: 'Interviewers often check if you understand page structure before frameworks. It also helps with SEO, accessibility, and browser rendering.',
          detailedBreakdown: 'DOCTYPE tells the browser to use standards mode. The head contains title, meta tags, styles, and scripts. The body contains what users see.',
          advancedNotes: [
            'Always include a language attribute like <html lang="en"> for accessibility and translation tools.',
            'Use meta viewport for responsive pages on mobile.',
            'Keep critical metadata such as title and description accurate.',
          ],
          examples: [
            {
              title: 'Minimal HTML document',
              description: 'The smallest useful page skeleton.',
              codeSample: {
                label: 'index.html',
                language: 'html',
                code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Profile</title>
  </head>
  <body>
    <h1>Krishan Rathore</h1>
  </body>
</html>`,
              },
            },
          ],
          pitfalls: [
            'Missing viewport meta makes responsive layouts look zoomed out on mobile.',
            'Putting visible page content in head is invalid.',
          ],
          interviewQuestions: [
            {
              question: 'Why do we write <!doctype html> at the top of a page?',
              answer: 'It tells the browser to render the document in standards mode instead of quirks mode. That gives more predictable CSS layout and browser behavior.',
              difficulty: 'Easy',
            },
            {
              question: 'What actually happens if you omit the DOCTYPE?',
              answer: 'The browser falls back to "quirks mode," emulating old, inconsistent rendering behaviors from pre-standards browsers, which can subtly change box-model sizing and other layout calculations in ways that are hard to debug.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'semantic-html',
          title: 'Semantic HTML',
          level: 'Fundamental',
          summary: 'Semantic elements describe meaning: header, nav, main, section, article, aside, footer, button, and form.',
          whyItMatters: 'Semantic HTML improves accessibility, SEO, maintainability, and testing because the page structure has meaning.',
          detailedBreakdown: 'Use elements based on purpose, not appearance. CSS controls style; HTML describes the content and interaction.',
          advancedNotes: [
            'Use button for actions and a for navigation links.',
            'Use one main region per page for the primary content.',
            'Heading levels should form a logical outline.',
          ],
          examples: [
            {
              title: 'Semantic page layout',
              description: 'Meaningful structure without extra divs.',
              codeSample: {
                label: 'layout.html',
                language: 'html',
                code: `<header>
  <nav aria-label="Main navigation">
    <a href="/interview">Interview</a>
  </nav>
</header>

<main>
  <article>
    <h1>HTML Basics</h1>
    <p>Semantic tags make pages easier to understand.</p>
  </article>
</main>`,
              },
            },
          ],
          pitfalls: [
            'Using div and span for everything removes useful meaning.',
            'Skipping heading levels for visual size creates a confusing document outline.',
          ],
          interviewQuestions: [
            {
              question: 'What is semantic HTML and why is it important?',
              answer: 'Semantic HTML uses elements that describe meaning, like main, nav, article, and button. It helps browsers, screen readers, search engines, tests, and developers understand the page.',
              difficulty: 'Easy',
            },
            {
              question: 'Why use <button> instead of a <div onclick=...> for a clickable action?',
              answer: '<button> is natively keyboard-focusable and operable with Enter/Space, exposes the correct role to screen readers automatically, and gets built-in form-submission behavior. A div needs a manually added tabindex, an ARIA role, and keydown handlers just to reach the same baseline accessibility.',
              difficulty: 'Easy',
            },
          ],
        },
        {
          id: 'forms-inputs-labels',
          title: 'Forms, inputs, labels, and validation',
          level: 'Core',
          summary: 'Forms collect data. Labels connect text to controls, input types add browser behavior, and validation catches bad input early.',
          whyItMatters: 'Most real applications have login, search, checkout, filters, and admin forms. Strong form basics prevent many UX and accessibility issues.',
          detailedBreakdown: 'Use label for every input. Pick the correct type (email, number, password, date). Use required, min, max, pattern, and server-side validation.',
          advancedNotes: [
            'Client-side validation improves UX but never replaces server-side validation.',
            'Use fieldset and legend for grouped controls like radio buttons.',
            'Use name attributes so form data is submitted correctly.',
          ],
          examples: [
            {
              title: 'Accessible login form',
              description: 'Labels and input types do real work.',
              codeSample: {
                label: 'login.html',
                language: 'html',
                code: `<form method="post" action="/login">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required />

  <button type="submit">Sign in</button>
</form>`,
              },
            },
          ],
          pitfalls: [
            'Using placeholder text instead of a label makes forms harder to use.',
            'Trusting only browser validation is insecure.',
          ],
          interviewQuestions: [
            {
              question: 'Why should every input have a label?',
              answer: 'Labels improve accessibility, enlarge the clickable area, and make the form understandable to assistive technologies. Placeholder text is not a replacement.',
              difficulty: 'Easy',
            },
            {
              question: 'Why is client-side form validation not a security control?',
              answer: 'Client-side checks run in code the user fully controls and can bypass entirely, by disabling JavaScript, using devtools, or calling the API directly. They\'re a UX convenience for catching typos early; the server must independently validate and reject bad input regardless of what the client claims.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'css-foundations',
      title: 'CSS Foundations',
      description: 'The rules that decide how elements look and how layout size is calculated.',
      concepts: [
        {
          id: 'selectors-cascade-specificity',
          title: 'Selectors, cascade, inheritance, and specificity',
          level: 'Core',
          summary: 'CSS applies styles by matching selectors. The cascade decides the winning rule using origin, importance, specificity, and source order.',
          whyItMatters: 'Most CSS debugging is answering one question: why did this style win?',
          detailedBreakdown: 'Selectors target elements. Inherited properties pass from parent to child. Specificity ranks selectors. Later rules win when specificity is equal.',
          advancedNotes: [
            'Avoid overusing !important because it makes future overrides harder.',
            'Prefer low-specificity, component-friendly selectors.',
            'Use DevTools computed styles to inspect the winning declaration.',
          ],
          examples: [
            {
              title: 'Specificity example',
              description: 'The class selector beats the element selector.',
              codeSample: {
                label: 'styles.css',
                language: 'css',
                code: `button {
  color: gray;
}

.primary-button {
  color: white;
}`,
              },
            },
          ],
          pitfalls: [
            'Writing deeply nested selectors makes small UI changes difficult.',
            'Using IDs for styling often creates unnecessary specificity problems.',
          ],
          interviewQuestions: [
            {
              question: 'What is CSS specificity?',
              answer: 'Specificity is the scoring system browsers use to decide which CSS selector wins when multiple rules target the same element. Inline styles, IDs, classes, and elements have different weights.',
              difficulty: 'Easy',
            },
            {
              question: 'Why can a later single-class selector still lose to an earlier rule with two classes?',
              answer: 'Source order only breaks ties when specificity is equal. A selector with two classes has higher specificity than one with a single class, so it wins regardless of which rule appears later in the stylesheet — you have to match or exceed that specificity, not just reorder the CSS.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'box-model',
          title: 'Box model and box-sizing',
          level: 'Fundamental',
          summary: 'Every element is a box made of content, padding, border, and margin. box-sizing controls how width and height are calculated.',
          whyItMatters: 'Layout bugs often come from misunderstanding why an element is wider or taller than expected.',
          detailedBreakdown: 'content-box calculates width from content only. border-box includes padding and border in the declared width.',
          advancedNotes: [
            'Many projects set * { box-sizing: border-box; } globally for predictable layouts.',
            'Margin creates outside spacing; padding creates inside spacing.',
            'Vertical margins between block elements can collapse in normal flow.',
          ],
          examples: [
            {
              title: 'Predictable sizing',
              description: 'Border and padding stay inside the declared width.',
              codeSample: {
                label: 'box.css',
                language: 'css',
                code: `* {
  box-sizing: border-box;
}

.card {
  width: 320px;
  padding: 16px;
  border: 1px solid #ccc;
}`,
              },
            },
          ],
          pitfalls: [
            'Confusing margin and padding leads to inconsistent spacing.',
            'Forgetting border-box can cause overflow when padding is added.',
          ],
          interviewQuestions: [
            {
              question: 'Explain the CSS box model.',
              answer: 'Each element has content, padding, border, and margin. By default width applies to content only, but with border-box the declared width includes content, padding, and border.',
              difficulty: 'Easy',
            },
            {
              question: 'Why can two elements with identical padding, border, and width still render at different sizes?',
              answer: 'If one uses content-box (the default) and the other uses border-box, padding and border get added on top of the declared width in the first case but are included within it in the second, so the same values produce different rendered sizes depending on box-sizing.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'display-positioning',
          title: 'Display and positioning',
          level: 'Core',
          summary: 'display controls layout behavior. position controls how an element is placed relative to normal flow or another reference.',
          whyItMatters: 'Menus, modals, sticky headers, badges, and overlays all require good display and positioning fundamentals.',
          detailedBreakdown: 'Common display values: block, inline, inline-block, flex, grid, none. Common position values: static, relative, absolute, fixed, sticky.',
          advancedNotes: [
            'absolute positions relative to the nearest positioned ancestor.',
            'sticky needs a scroll container and a top/right/bottom/left value.',
            'display: none removes an element from layout and accessibility tree.',
          ],
          examples: [
            {
              title: 'Badge positioning',
              description: 'Absolute child inside a relative parent.',
              codeSample: {
                label: 'badge.css',
                language: 'css',
                code: `.notification {
  position: relative;
}

.notification-count {
  position: absolute;
  top: 0;
  right: 0;
}`,
              },
            },
          ],
          pitfalls: [
            'Using fixed when sticky is the actual requirement.',
            'Forgetting the positioned parent makes absolute elements jump to unexpected places.',
          ],
          interviewQuestions: [
            {
              question: 'What is the difference between relative, absolute, fixed, and sticky positioning?',
              answer: 'relative keeps the element in normal flow and offsets it. absolute removes it from flow and positions it against the nearest positioned ancestor. fixed positions against the viewport. sticky behaves normal until it reaches a threshold, then sticks.',
              difficulty: 'Medium',
            },
            {
              question: 'Why can overflow: hidden on a parent silently break position: sticky on a child?',
              answer: 'Sticky needs the browser to track the element within its nearest scrolling ancestor and release it once that container scrolls out of view. If any ancestor between the sticky element and the scroll container clips with overflow hidden/auto/scroll, that ancestor becomes the effective boundary and can clip the element before sticky behavior ever triggers.',
              difficulty: 'Hard',
            },
          ],
        },
      ],
    },
    {
      id: 'layout-responsive',
      title: 'Layout & Responsive Design',
      description: 'Build layouts that adapt cleanly from mobile to desktop.',
      concepts: [
        {
          id: 'flexbox',
          title: 'Flexbox',
          level: 'Core',
          summary: 'Flexbox is a one-dimensional layout system for arranging items in a row or column with alignment and spacing control.',
          whyItMatters: 'Flexbox is used constantly for nav bars, button rows, form controls, card actions, and centered layouts.',
          detailedBreakdown: 'Use display: flex on the parent. Control direction, wrapping, main-axis alignment, cross-axis alignment, and item growth.',
          advancedNotes: [
            'Use gap for spacing between flex items.',
            'Use flex-wrap when items must move to a new line.',
            'Use min-width: 0 on flex children that need text truncation.',
          ],
          examples: [
            {
              title: 'Toolbar layout',
              description: 'A common interview and project layout pattern.',
              codeSample: {
                label: 'toolbar.css',
                language: 'css',
                code: `.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}`,
              },
            },
          ],
          pitfalls: [
            'Using flex for two-dimensional layouts where CSS Grid would be clearer.',
            'Forgetting flex-wrap on small screens can cause overflow.',
          ],
          interviewQuestions: [
            {
              question: 'When do you use Flexbox?',
              answer: 'Use Flexbox for one-dimensional layouts, either a row or a column. It is ideal for alignment, spacing, nav bars, button groups, and small component layouts.',
              difficulty: 'Easy',
            },
            {
              question: 'Why does a flex child with long text overflow even with text-overflow: ellipsis set?',
              answer: 'Flex items have an implicit min-width: auto, which stops them shrinking smaller than their content\'s intrinsic size by default, so the truncation CSS never gets a chance to apply. Setting min-width: 0 on the flex child overrides that default and lets truncation actually work.',
              difficulty: 'Hard',
            },
          ],
        },
        {
          id: 'css-grid',
          title: 'CSS Grid',
          level: 'Core',
          summary: 'CSS Grid is a two-dimensional layout system for rows and columns.',
          whyItMatters: 'Grid is the best tool for page shells, dashboards, cards, galleries, and layouts that need both row and column control.',
          detailedBreakdown: 'Define columns and rows on the parent. Place items explicitly or let the browser auto-place them.',
          advancedNotes: [
            'Use repeat(auto-fit, minmax(...)) for responsive card grids.',
            'Use grid-template-areas when a layout needs named regions.',
            'Grid and Flexbox are complementary, not competitors.',
          ],
          examples: [
            {
              title: 'Responsive card grid',
              description: 'Cards adapt to available width.',
              codeSample: {
                label: 'grid.css',
                language: 'css',
                code: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}`,
              },
            },
          ],
          pitfalls: [
            'Hardcoding too many fixed columns makes mobile layout break.',
            'Using only Grid for tiny row alignment can be heavier than Flexbox.',
          ],
          interviewQuestions: [
            {
              question: 'Flexbox vs Grid: what is the difference?',
              answer: 'Flexbox is mainly one-dimensional: row or column. Grid is two-dimensional: rows and columns together. Use Flexbox inside components and Grid for larger layout structures.',
              difficulty: 'Easy',
            },
            {
              question: 'What\'s the difference between fr units and percentages for grid columns?',
              answer: 'fr units divide the remaining space after fixed-size tracks and gaps are accounted for, so "200px 1fr 1fr" gives the fixed column exactly what it needs first, then splits what\'s left evenly. Percentages are always relative to the full container width, so mixing them with fixed columns and gaps can overflow the container.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'responsive-design',
          title: 'Responsive design and media queries',
          level: 'Core',
          summary: 'Responsive design makes the same page usable across screen sizes using fluid layout, flexible media, and media queries.',
          whyItMatters: 'Real users browse on many devices. Interviews often ask how you avoid desktop-only layouts.',
          detailedBreakdown: 'Start with mobile-friendly layout, use relative units, constrain content width, make media flexible, and add breakpoints where the design needs them.',
          advancedNotes: [
            'Use max-width: 100% for images to avoid overflow.',
            'Choose breakpoints based on layout needs, not only device names.',
            'Test keyboard, touch, and zoom behavior on small screens.',
          ],
          examples: [
            {
              title: 'Mobile-first media query',
              description: 'Enhance the layout when space is available.',
              codeSample: {
                label: 'responsive.css',
                language: 'css',
                code: `.layout {
  display: grid;
  gap: 16px;
}

@media (min-width: 768px) {
  .layout {
    grid-template-columns: 240px 1fr;
  }
}`,
              },
            },
          ],
          pitfalls: [
            'Designing only for desktop and patching mobile later creates fragile CSS.',
            'Text and buttons that do not wrap cause mobile overflow.',
          ],
          interviewQuestions: [
            {
              question: 'What does mobile-first CSS mean?',
              answer: 'Write the default styles for small screens first, then use min-width media queries to enhance the layout for larger screens. This usually produces simpler, more resilient CSS.',
              difficulty: 'Easy',
            },
            {
              question: 'Why do rem-based font sizes scale better across devices than fixed px values?',
              answer: 'rem is relative to the root <html> font-size, so if a user increases their browser\'s default font size for accessibility, every rem-based value scales proportionally with it. A fixed px value ignores that accessibility preference entirely.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'accessibility-browser-basics',
      title: 'Accessibility & Browser Basics',
      description: 'The basics that turn HTML/CSS knowledge into usable real-world interfaces.',
      concepts: [
        {
          id: 'accessibility-basics',
          title: 'Accessibility basics',
          level: 'Core',
          summary: 'Accessible UI is usable with keyboard, screen readers, zoom, high contrast, and assistive technology.',
          whyItMatters: 'Accessibility is part of professional frontend work. It improves usability for everyone and is often legally important.',
          detailedBreakdown: 'Use semantic HTML first, label form controls, keep focus visible, provide alt text for meaningful images, and ensure text contrast.',
          advancedNotes: [
            'Use ARIA only when semantic HTML cannot express the needed behavior.',
            'Interactive elements must be reachable and usable by keyboard.',
            'Do not remove focus outlines unless you provide an equally visible replacement.',
          ],
          examples: [
            {
              title: 'Good image alt text',
              description: 'Describe meaningful images; leave decorative images empty.',
              codeSample: {
                label: 'image.html',
                language: 'html',
                code: `<img src="/profile.jpg" alt="Krishan presenting a Laravel demo" />
<img src="/decorative-line.svg" alt="" />`,
              },
            },
          ],
          pitfalls: [
            'Adding ARIA to broken HTML usually makes the page more confusing.',
            'Icon-only buttons need an accessible name.',
          ],
          interviewQuestions: [
            {
              question: 'What are quick checks for accessibility?',
              answer: 'Check keyboard navigation, focus visibility, labels for form controls, meaningful alt text, heading order, color contrast, and whether interactive elements use the correct semantic element.',
              difficulty: 'Medium',
            },
            {
              question: 'Why is alt="" (empty, not missing) correct for a purely decorative image?',
              answer: 'An empty alt attribute explicitly tells screen readers to skip the image entirely, so users don\'t waste time hearing a meaningless filename or "image" announcement for a decorative divider or icon. Omitting the attribute altogether is different — some screen readers announce the file path instead, which is worse than silence.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'dom-events-browser-storage',
          title: 'DOM, events, and browser storage',
          level: 'Fundamental',
          summary: 'The DOM is the browser object tree for a page. Events respond to user actions. Storage APIs keep small data in the browser.',
          whyItMatters: 'Even React developers debug real DOM, event, and storage behavior in daily project work.',
          detailedBreakdown: 'querySelector reads elements, addEventListener handles events, localStorage persists strings, sessionStorage lasts for a tab session, and cookies are sent with HTTP requests.',
          advancedNotes: [
            'Use event delegation for large dynamic lists.',
            'Do not store secrets in localStorage.',
            'Cookies can be protected with HttpOnly, Secure, and SameSite flags.',
          ],
          examples: [
            {
              title: 'Simple event handler',
              description: 'Browser basics before frameworks.',
              codeSample: {
                label: 'dom.js',
                language: 'js',
                code: `const button = document.querySelector('#save');

button?.addEventListener('click', () => {
  localStorage.setItem('lastAction', 'save');
});`,
              },
            },
          ],
          pitfalls: [
            'Reading DOM elements before the page renders can return null.',
            'Storing auth tokens in localStorage increases XSS impact.',
          ],
          interviewQuestions: [
            {
              question: 'What is the DOM?',
              answer: 'The DOM is the browser representation of an HTML document as a tree of objects. JavaScript can read and update that tree to change what the user sees.',
              difficulty: 'Easy',
            },
            {
              question: 'What is event delegation, and why does it help with a large dynamic list?',
              answer: 'Instead of attaching a click listener to every one of 1,000 list items, you attach one listener to their shared parent and use event bubbling plus e.target to figure out which item was clicked. That means far fewer listeners in memory, and new items added later work automatically without needing their own listener.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
  ],
};

