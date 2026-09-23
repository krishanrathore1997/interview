import { SkillPageContent } from '../types';

export const php: SkillPageContent = {
  topic: 'PHP',
  title: 'PHP Fundamentals — Beginner to Intermediate',
  subtitle: 'Master the core syntax, logic flow, arrays, and web basics of the world’s most popular server-side language.',
  docs: [
    { label: 'W3Schools PHP Tutorial', href: 'https://www.w3schools.com/php/' },
    { label: 'PHP Official Manual', href: 'https://www.php.net/manual/en/langref.php' },
  ],
  sections: [
    {
      id: 'php-foundations',
      title: '1. PHP Foundations',
      description: 'Setup, syntax, and basic data output.',
      concepts: [
        {
          id: 'php-syntax',
          title: 'Syntax & Echo/Print',
          level: 'Fundamental',
          summary: 'PHP scripts start with <?php and end with ?>. Instructions are separated by semicolons.',
          whyItMatters: 'Every PHP journey starts with understanding the basic structure and how to output data to the user.',
          detailedBreakdown: 'Standard PHP tags. Case sensitivity (keywords are not case-sensitive, but variables are). Using echo and print for output.',
          examples: [
            {
              title: 'Basic PHP Tag',
              description: 'Outputting text to the browser.',
              codeSample: {
                label: 'index.php',
                language: 'php',
                code: `<?php
echo "Hello World!";
echo "<h2>PHP is Fun!</h2>";
?>`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'What is the main difference between echo and print?',
              answer: 'Echo has no return value and can take multiple parameters. Print has a return value of 1 (so it can be used in expressions) and takes only one argument. Echo is marginally faster.',
              difficulty: 'Easy'
            },
            {
              question: 'Why might you omit the closing ?> tag in a PHP file that\'s included by others?',
              answer: 'Leaving it off prevents accidental whitespace or a newline after it from being sent to the browser, which can trigger "headers already sent" errors when the file is included before session_start() or a header() call.',
              difficulty: 'Medium'
            },
          ],
        },
        {
          id: 'php-variables',
          title: 'Variables & Data Types',
          level: 'Fundamental',
          summary: 'Variables start with $ and are loosely typed. PHP supports Strings, Integers, Floats, Booleans, Arrays, Objects, and NULL.',
          whyItMatters: 'Variables are the building blocks of any program. Understanding data types helps in choosing the right way to store and manipulate info.',
          detailedBreakdown: 'Variable naming rules. Scope (local, global, static). PHP data types overview.',
          examples: [
            {
              title: 'Variables and Types',
              description: 'Declaring different types of variables.',
              codeSample: {
                label: 'vars.php',
                language: 'php',
                code: `<?php
$str = "Hello";    // String
$num = 42;         // Integer
$float = 10.5;     // Float
$bool = true;      // Boolean
$arr = [1, 2, 3];  // Array
?>`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'How do you declare a global variable inside a function?',
              answer: 'Use the "global" keyword before the variable name inside the function, or use the $GLOBALS array.',
              difficulty: 'Easy'
            },
            {
              question: 'Why can\'t a function see an outer variable by default?',
              answer: 'PHP functions have their own local scope, so a variable defined outside a function isn\'t automatically visible inside it. That stops functions from silently depending on and mutating global state — you opt in explicitly with "global" or by passing it as a parameter.',
              difficulty: 'Easy'
            },
          ],
        },
        {
          id: 'php-math-constants',
          title: 'Math & Constants',
          level: 'Fundamental',
          summary: 'Use define() for constants and built-in math functions for numeric operations.',
          whyItMatters: 'Constants provide a way to store values that should not change, while math functions simplify complex calculations.',
          detailedBreakdown: 'Defining constants with define(). Using pi(), min(), max(), abs(), sqrt(), and round().',
          examples: [
            {
              title: 'Math and Constants',
              description: 'Defining a constant and performing math.',
              codeSample: {
                label: 'math.php',
                language: 'php',
                code: `<?php
define("GREETING", "Welcome to PHP!");
echo GREETING;

echo pi(); // 3.1415926535898
echo min(0, 150, 30, 20, -10);  // -10
echo max(0, 150, 30, 20, -10);  // 150
?>`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'What is the main difference between a variable and a constant?',
              answer: 'A constant\'s value cannot be changed after it is defined, and it does not need a $ sign. Variables can be reassigned at any time.',
              difficulty: 'Easy'
            },
            {
              question: 'What\'s the difference between define() and a class constant?',
              answer: 'define() creates a global constant available everywhere once loaded. A class constant (const NAME = ...) belongs to a class or interface, is accessed via ClassName::NAME, and can be overridden in a subclass — giving it a namespace and inheritance that define() doesn\'t have.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'php-logic',
      title: '2. Logic & Control Flow',
      description: 'Making decisions and repeating tasks.',
      concepts: [
        {
          id: 'conditionals',
          title: 'Conditionals (If, Switch, Match)',
          level: 'Fundamental',
          summary: 'Control the flow of your script based on conditions.',
          whyItMatters: 'Logic is essential for creating dynamic responses based on user input or state.',
          detailedBreakdown: 'If, Else, Elseif syntax. Switch statements for multiple comparisons. Match expression (PHP 8.0+).',
          examples: [
            {
              title: 'If...Else Statement',
              description: 'Checking a simple condition.',
              codeSample: {
                label: 'logic.php',
                language: 'php',
                code: `<?php
$t = 14;
if ($t < 10) {
  echo "Good morning!";
} elseif ($t < 20) {
  echo "Good day!";
} else {
  echo "Good night!";
}
?>`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'What is the "match" expression in PHP 8?',
              answer: 'It is a safer, more concise alternative to switch. It returns a value, does not require break statements, and uses strict identity comparison (===).',
              difficulty: 'Medium'
            },
            {
              question: 'How does match\'s strict comparison change error handling compared to switch?',
              answer: 'match uses strict identity (===), so it won\'t silently fall through on a type-coerced match the way switch\'s loose == can. It also throws an UnhandledMatchError when no arm matches and there\'s no default, instead of switch\'s silent no-op — surfacing missing cases immediately.',
              difficulty: 'Medium'
            },
          ],
        },
        {
          id: 'loops',
          title: 'Loops (While, For, Foreach)',
          level: 'Fundamental',
          summary: 'Repeat a block of code while a condition is true.',
          whyItMatters: 'Loops are used to process lists, iterate through database results, and automate repetitive tasks.',
          detailedBreakdown: 'While and Do-While (condition-first vs execution-first). For (counter-based). Foreach (array-specific).',
          examples: [
            {
              title: 'Foreach Loop',
              description: 'Iterating through an array.',
              codeSample: {
                label: 'loops.php',
                language: 'php',
                code: `<?php
$colors = ["red", "green", "blue"];
foreach ($colors as $value) {
  echo "$value <br>";
}
?>`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'What happens if you use "foreach" on a non-array variable?',
              answer: 'It will trigger a warning in PHP. It is best practice to check if a variable is an array or use type-hinting before reaching the loop.',
              difficulty: 'Medium'
            },
            {
              question: 'What\'s the difference between break and continue in a loop?',
              answer: 'break exits the loop entirely, skipping any remaining iterations. continue skips the rest of the current iteration\'s code and moves straight to the next iteration.',
              difficulty: 'Easy'
            },
          ],
        },
      ],
    },
    {
      id: 'php-data-ops',
      title: '3. Functions & Arrays',
      description: 'Organizing and managing data structures.',
      concepts: [
        {
          id: 'php-functions-arguments',
          title: 'Functions, Arguments & Return Types',
          level: 'Fundamental',
          summary: 'Functions package reusable logic. Parameters receive values, return sends a result back, and type declarations make contracts clearer.',
          whyItMatters: 'Every PHP application and Laravel controller/service depends on clean function boundaries.',
          detailedBreakdown: 'Function declarations, parameters, default arguments, return values, scalar type hints, nullable types, and strict_types.',
          advancedNotes: [
            'Use return types to document and enforce function output.',
            'Default arguments should come after required arguments.',
            'declare(strict_types=1) makes scalar argument checks stricter for calls made from that file.',
          ],
          examples: [
            {
              title: 'Typed function',
              description: 'Small, testable logic with a clear contract.',
              codeSample: {
                label: 'functions.php',
                language: 'php',
                code: `<?php
declare(strict_types=1);

function total(int $price, int $quantity = 1): int
{
    return $price * $quantity;
}
?>`,
              },
            },
          ],
          pitfalls: [
            'Doing output inside every function makes logic harder to test.',
            'Relying on loose coercion can hide bugs in form/API input.',
          ],
          interviewQuestions: [
            {
              question: 'Why use type declarations in PHP functions?',
              answer: 'They make function contracts clear, catch wrong inputs earlier, improve IDE support, and reduce runtime surprises.',
              difficulty: 'Easy',
            },
            {
              question: 'What do PHP 8.4\'s property hooks let you do that a plain public property can\'t?',
              answer: 'Property hooks run logic — validation, transformation, computed values — when a property is read (get) or written (set), without separate getter/setter methods. So `$user->email = $value` can normalize the value on the way in while callers keep using plain property syntax.',
              difficulty: 'Hard',
            },
          ],
        },
        {
          id: 'arrays-basic',
          title: 'Array Handling',
          level: 'Fundamental',
          summary: 'Store multiple values in one variable. PHP supports Indexed, Associative, and Multidimensional arrays.',
          whyItMatters: 'Arrays are the primary way to manage collections of data in PHP.',
          detailedBreakdown: 'Creating arrays. Associative arrays (key-value pairs). Array sorting functions (sort, rsort, asort, ksort).',
          examples: [
            {
              title: 'Associative Array',
              description: 'Defining keys for array values.',
              codeSample: {
                label: 'arrays.php',
                language: 'php',
                code: `<?php
$age = ["Peter"=>"35", "Ben"=>"37", "Joe"=>"43"];
echo "Ben is " . $age['Ben'] . " years old.";
?>`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'How do you add an element to an existing array?',
              answer: 'Use $array[] = "value"; or array_push($array, "value");',
              difficulty: 'Easy'
            },
            {
              question: 'What\'s the difference between array_map() and array_filter()?',
              answer: 'array_map() applies a callback to every element and returns a new array of the same length with transformed values. array_filter() applies a callback that returns true or false and returns a new array with only the elements that passed, preserving the original keys.',
              difficulty: 'Easy'
            },
          ],
        },
        {
          id: 'php-strings-operators',
          title: 'Strings, Operators & Type Juggling',
          level: 'Core',
          summary: 'PHP strings can be joined, searched, sliced, and converted. Operators perform math, comparison, assignment, and null handling.',
          whyItMatters: 'User input is usually text. Knowing string functions and comparison behavior prevents validation and security mistakes.',
          detailedBreakdown: 'String concatenation with ., interpolation, strlen(), str_replace(), trim(), comparison operators, === vs ==, ??, and type juggling.',
          advancedNotes: [
            'Use === when type matters; == performs type juggling.',
            'Use ?? to provide a default for missing/null values.',
            'Trim form input before validation when whitespace is not meaningful.',
          ],
          examples: [
            {
              title: 'Clean and compare input',
              description: 'Common form input preparation.',
              codeSample: {
                label: 'strings.php',
                language: 'php',
                code: `<?php
$email = trim($_POST['email'] ?? '');

if ($email === '') {
    echo 'Email is required';
}
?>`,
              },
            },
          ],
          pitfalls: [
            'Using == for security-sensitive comparisons can allow surprising type conversions.',
            'Forgetting that . is concatenation in PHP, not +.',
          ],
          interviewQuestions: [
            {
              question: 'What is the difference between == and === in PHP?',
              answer: '== compares after type conversion. === compares both value and type. Prefer === for predictable checks, especially in validation and security-sensitive code.',
              difficulty: 'Medium',
            },
            {
              question: 'What does the null coalescing assignment operator (??=) do?',
              answer: '$value ??= \'default\' assigns \'default\' only if $value is currently null or undefined, leaving any existing non-null value untouched — shorthand for $value = $value ?? \'default\'.',
              difficulty: 'Easy',
            },
          ],
        },
      ],
    },
    {
      id: 'php-web',
      title: '4. Web & Form Handling',
      description: 'Interacting with users and the browser.',
      concepts: [
        {
          id: 'superglobals-forms',
          title: 'Superglobals & Form Data',
          level: 'Core',
          summary: 'Built-in variables like $_GET and $_POST are used to collect form data.',
          whyItMatters: 'Handling user input via forms is the foundation of most web applications.',
          detailedBreakdown: 'Difference between GET (URL visible) and POST (hidden in request). Collecting data using $_POST["name"]. Security basics (escaping data).',
          examples: [
            {
              title: 'Form Processing',
              description: 'A simple way to receive form input.',
              codeSample: {
                label: 'welcome.php',
                language: 'php',
                code: `<?php
// PHP code to receive data from an HTML form
$name = $_POST["name"];
echo "Welcome, " . htmlspecialchars($name);
?>`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'When should you use $_GET vs $_POST?',
              answer: 'Use $_GET for non-sensitive data like search queries (bookmarks). Use $_POST for sensitive information (passwords) or data that modifies the server state.',
              difficulty: 'Easy'
            },
            {
              question: 'Why is htmlspecialchars() important when echoing user input back to the page?',
              answer: 'It encodes characters like < > " & into HTML entities, so a value like <script> that a user submitted is displayed as text instead of executing as markup or script — a core defense against stored and reflected XSS.',
              difficulty: 'Medium'
            },
          ],
        },
        {
          id: 'php-date-include',
          title: 'Date, Time & Include',
          level: 'Fundamental',
          summary: 'Use date() to format time and include/require to merge files.',
          whyItMatters: 'Managing dates and splitting code into multiple files is essential for organized, maintainable applications.',
          detailedBreakdown: 'Formatting dates with Y-m-d. Difference between include and require (require stops the script on failure).',
          examples: [
            {
              title: 'Include and Date',
              description: 'Using other files and showing the current date.',
              codeSample: {
                label: 'footer.php',
                language: 'php',
                code: `<?php
require 'config.php';
echo "Copyright &copy; " . date("Y") . " W3Schools.com";
?>`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'What is the difference between include and require?',
              answer: 'If the file is missing, include produces a warning but the script continues. require produces a fatal error and stops the script.',
              difficulty: 'Easy'
            },
            {
              question: 'What\'s the difference between include_once and include?',
              answer: 'include_once checks whether the file has already been included anywhere in the request and skips it if so, preventing redeclaration errors — like a "Cannot redeclare function" fatal error — when the same file could be pulled in through more than one path.',
              difficulty: 'Easy'
            },
          ],
        },
        {
          id: 'php-state-errors',
          title: 'Sessions, Cookies & Errors',
          level: 'Core',
          summary: 'Use sessions/cookies for state and try/catch for error handling.',
          whyItMatters: 'Professional apps need to "remember" users across pages and handle exceptions without crashing.',
          detailedBreakdown: 'setcookie() syntax. session_start() and $_SESSION. Basic try...catch block structure.',
          examples: [
            {
              title: 'Session Management',
              description: 'Starting and setting a session variable.',
              codeSample: {
                label: 'session.php',
                language: 'php',
                code: `<?php
session_start();
$_SESSION["favcolor"] = "green";
echo "Session variables are set.";
?>`,
              },
            },
          ],
          interviewQuestions: [
            {
              question: 'Where are session variables stored?',
              answer: 'Session variables are stored on the server, while the session ID is usually stored in a cookie on the client browser.',
              difficulty: 'Medium'
            },
            {
              question: 'How would you make a PHP session cookie safer against theft?',
              answer: 'Set the HttpOnly flag (blocks JavaScript access), Secure (HTTPS only), and SameSite=Lax or Strict (limits cross-site sending), and call session_regenerate_id() after login to prevent session fixation.',
              difficulty: 'Hard'
            },
          ],
        },
      ],
    },
    {
      id: 'php-files-json-filter',
      title: '5. Files, Validation & JSON',
      description: 'Common PHP web tasks beyond simple form reads.',
      concepts: [
        {
          id: 'php-file-handling-upload',
          title: 'File Handling & Uploads',
          level: 'Core',
          summary: 'PHP can read/write files and receive uploaded files through $_FILES, but uploads must be validated carefully.',
          whyItMatters: 'Profile photos, CSV imports, invoices, and logs are common features. File upload mistakes are also common security issues.',
          detailedBreakdown: 'file_get_contents(), file_put_contents(), fopen/fread/fwrite, $_FILES, move_uploaded_file(), size limits, MIME validation, and storage paths.',
          advancedNotes: [
            'Never trust the original filename or extension from the browser.',
            'Store uploads outside the public web root when possible.',
            'Validate size, MIME type, extension, and authorization before moving the file.',
          ],
          examples: [
            {
              title: 'Safe upload shape',
              description: 'The important checks before moving a file.',
              codeSample: {
                label: 'upload.php',
                language: 'php',
                code: `<?php
$file = $_FILES['avatar'] ?? null;

if ($file && $file['error'] === UPLOAD_ERR_OK && $file['size'] < 2_000_000) {
    move_uploaded_file($file['tmp_name'], __DIR__ . '/uploads/avatar.jpg');
}
?>`,
              },
            },
          ],
          pitfalls: [
            'Saving uploaded files with the user-provided filename.',
            'Serving uploaded files directly without validating type and permissions.',
          ],
          interviewQuestions: [
            {
              question: 'What should you validate for a PHP file upload?',
              answer: 'Validate upload error code, size, MIME type, extension, authorization, and storage path. Do not trust the browser filename, and prefer storing files outside the public web root.',
              difficulty: 'Medium',
            },
            {
              question: 'Why shouldn\'t you trust the MIME type in $_FILES[\'field\'][\'type\']?',
              answer: 'That value comes straight from the browser\'s Content-Type header on the upload request, which the client fully controls and can spoof. Re-verify the real file type server-side, for example with finfo_file(), instead of trusting the client-supplied value.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'php-filter-json',
          title: 'Filters, Sanitization & JSON',
          level: 'Core',
          summary: 'PHP filter functions validate/sanitize input, and JSON functions encode/decode API payloads.',
          whyItMatters: 'APIs, AJAX, webhooks, and form validation all depend on safe input handling and consistent JSON output.',
          detailedBreakdown: 'filter_var(), FILTER_VALIDATE_EMAIL, FILTER_VALIDATE_INT, json_encode(), json_decode(), associative arrays, json_last_error(), and content-type headers.',
          advancedNotes: [
            'Validation checks if data is acceptable; sanitization transforms data.',
            'Use json_decode($json, true) when you want associative arrays.',
            'Set Content-Type: application/json for JSON responses.',
          ],
          examples: [
            {
              title: 'Validate email and return JSON',
              description: 'Common API response pattern.',
              codeSample: {
                label: 'api.php',
                language: 'php',
                code: `<?php
header('Content-Type: application/json');

$email = $_POST['email'] ?? '';
$valid = filter_var($email, FILTER_VALIDATE_EMAIL) !== false;

echo json_encode(['valid' => $valid]);
?>`,
              },
            },
          ],
          pitfalls: [
            'Sanitizing when you actually need validation and rejection.',
            'Decoding JSON without checking whether decoding failed.',
          ],
          interviewQuestions: [
            {
              question: 'Validation vs sanitization: what is the difference?',
              answer: 'Validation decides whether data is acceptable. Sanitization changes data into a safer or normalized form. For important input, validate and reject bad data instead of silently changing meaning.',
              difficulty: 'Medium',
            },
            {
              question: 'What does json_last_error() protect you from?',
              answer: 'json_decode() returns null both for an actual JSON null and for invalid or malformed JSON, so checking only the return value can\'t tell them apart. json_last_error() tells you whether decoding truly failed, so you can reject bad input instead of silently treating it as null.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
    {
      id: 'php-oop-mysql',
      title: '6. OOP & MySQL Basics',
      description: 'Core backend concepts used before and inside frameworks like Laravel.',
      concepts: [
        {
          id: 'php-oop-basics',
          title: 'Classes, Objects, Inheritance & Interfaces',
          level: 'Core',
          summary: 'Classes define structure and behavior, objects are instances, inheritance shares behavior, and interfaces define contracts.',
          whyItMatters: 'Laravel, Symfony, Composer packages, services, DTOs, controllers, and tests all rely on PHP OOP fundamentals.',
          detailedBreakdown: 'class, object, constructor, public/private/protected, extends, implements, interface, trait, namespace, and autoloading.',
          advancedNotes: [
            'Use interfaces for contracts and dependency inversion.',
            'Use inheritance carefully; composition is often easier to change.',
            'Namespaces prevent class-name collisions across packages.',
          ],
          examples: [
            {
              title: 'Interface and implementation',
              description: 'A simple contract for a service.',
              codeSample: {
                label: 'Payment.php',
                language: 'php',
                code: `<?php
interface PaymentGateway
{
    public function charge(int $amount): bool;
}

class StripeGateway implements PaymentGateway
{
    public function charge(int $amount): bool
    {
        return true;
    }
}
?>`,
              },
            },
          ],
          pitfalls: [
            'Putting too much shared behavior in traits can hide dependencies.',
            'Using inheritance for code reuse when composition would be clearer.',
          ],
          interviewQuestions: [
            {
              question: 'Interface vs abstract class in PHP: when do you use each?',
              answer: 'Use an interface to define a contract that many classes can implement. Use an abstract class when you need a shared base with common behavior plus required methods.',
              difficulty: 'Medium',
            },
            {
              question: 'What\'s the difference between a trait and inheritance for sharing code?',
              answer: 'A class can only extend one parent (single inheritance), but can use multiple traits, which paste in a bundle of methods directly onto the class. Traits fit small, shared, mixin-like behavior — like a Loggable trait — where a full parent-child relationship doesn\'t make sense.',
              difficulty: 'Medium',
            },
          ],
        },
        {
          id: 'php-mysql-prepared-statements',
          title: 'MySQL, PDO & Prepared Statements',
          level: 'Core',
          summary: 'PHP commonly talks to MySQL using PDO or mysqli. Prepared statements protect queries from SQL injection.',
          whyItMatters: 'Even when using Laravel Eloquent, interviewers expect you to understand the lower-level reason parameter binding is safe.',
          detailedBreakdown: 'PDO connection, prepare(), execute(), placeholders, fetching rows, exceptions, and why string-concatenated SQL is dangerous.',
          advancedNotes: [
            'Use placeholders for all user-provided values.',
            'Do not concatenate raw input into SQL.',
            'Handle database errors without exposing credentials or SQL details to users.',
          ],
          examples: [
            {
              title: 'Prepared query with PDO',
              description: 'Bind user input instead of concatenating SQL.',
              codeSample: {
                label: 'users.php',
                language: 'php',
                code: `<?php
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
$user = $stmt->fetch();
?>`,
              },
            },
          ],
          pitfalls: [
            'Escaping manually instead of using bound parameters.',
            'Logging full SQL queries with sensitive user data in production.',
          ],
          interviewQuestions: [
            {
              question: 'Why do prepared statements prevent SQL injection?',
              answer: 'They send the SQL structure and user values separately, so user input is treated as data instead of executable SQL.',
              difficulty: 'Medium',
            },
            {
              question: 'What\'s the difference between PDO and mysqli for database access?',
              answer: 'PDO supports multiple database drivers — MySQL, PostgreSQL, SQLite, and more — behind one consistent API, plus named placeholders. mysqli is MySQL-specific only. That driver-agnostic interface is why most modern PHP frameworks build on something similar to PDO.',
              difficulty: 'Medium',
            },
          ],
        },
      ],
    },
  ],
};
