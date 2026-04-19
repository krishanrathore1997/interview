import { SkillPageContent } from '../types';

export const laravel: SkillPageContent = {
  topic: 'Laravel',
  title: 'Laravel Deep Dive - Installation to Production',
  subtitle: 'Installation, request lifecycle, Service Container internals, Eloquent ORM mastery, Auth, Email, Queues (Batch/Chain), Cron Jobs, Multi-DB, Events, WebSocket Broadcasting, and production optimization.',
  docs: [
    { label: 'Laravel 13 Installation', href: 'https://laravel.com/docs/13.x/installation' },
    { label: 'Laravel 13 Request Lifecycle', href: 'https://laravel.com/docs/13.x/lifecycle' },
    { label: 'Laravel 13 Eloquent Relationships', href: 'https://laravel.com/docs/13.x/eloquent-relationships' },
  ],
  sections: [
    {
      id: 'installation',
      title: 'Installation & Environment Setup',
      description: 'How Laravel 13 is installed, started locally, and explained clearly in interviews.',
      concepts: [
        {
          id: 'laravel-13-installation-flow',
          title: 'Laravel 13 Installation Flow',
          level: 'Fundamental',
          summary: 'A modern Laravel 13 setup starts with PHP, Composer, and the Laravel installer, plus Node and NPM or Bun for frontend assets. In the official flow, you create the app with `laravel new`, install and build frontend assets, and then run `composer run dev` to start the local Laravel server, queue worker, and Vite development server.',
          whyItMatters: 'Correct installation and understanding of the local stack (Vite, Queue, Server) is the foundation of high-performance development.',
          detailedBreakdown: 'Modern Laravel uses `laravel new` to guide developers through choosing a database (SQLite is default), testing framework (Pest vs PHPUnit), and starter kits (Breeze/Jetstream). `composer run dev` is a shortcut that manages multiple processes (Artisan + Vite) in a single terminal.',
          advancedNotes: [
            'If PHP and Composer are already installed, `composer global require laravel/installer` is enough to add the Laravel CLI.',
            'The installer now prompts for testing framework, database, and starter kit choices, so the initial scaffold is not just a blank copy.',
            'The frontend dependency step matters because a fresh Laravel application expects assets to be compiled before the full local stack feels complete.',
            '`composer run dev` is an interview-worthy detail because it starts multiple local services together instead of only one PHP server process.',
          ],
          examples: [
            {
              title: 'Official Laravel 13 happy-path setup',
              description: 'The shortest explanation of the first-run flow from machine prerequisites to a running local app.',
              codeSample: {
                label: 'terminal',
                language: 'bash',
                code: `# If PHP and Composer are already installed
composer global require laravel/installer

laravel new interview-notebook
cd interview-notebook

npm install && npm run build
composer run dev

# App is then available at http://localhost:8000`,
              },
            },
          ],
          pitfalls: [
            'Skipping the frontend install/build step and then wondering why the local app setup feels incomplete.',
            'Describing `laravel new` as only folder creation and forgetting that it can guide starter-kit, testing, and database choices.',
          ],
          interviewQuestions: [
            {
              question: 'What do you need before creating a Laravel 13 application?',
              answer: 'At minimum you need PHP, Composer, the Laravel installer, and Node with NPM or Bun for frontend assets. If PHP and Composer are already present, `composer global require laravel/installer` gives you the `laravel` CLI used by `laravel new`.',
              difficulty: 'Easy'
            },
            {
              question: 'What does `composer run dev` start in a fresh Laravel 13 app?',
              answer: 'In the official Laravel 13 installation flow, `composer run dev` starts the local Laravel development server, the queue worker, and the Vite development server so the app is ready for full-stack local development.',
              difficulty: 'Easy'
            },
          ],
        },
        {
          id: 'local-dev-options',
          title: 'Manual Setup vs Laravel Herd',
          level: 'Fundamental',
          summary: 'Laravel supports both a manual toolchain setup and the Laravel Herd development environment. Manual setup gives you explicit control over PHP, Composer, Node, and databases, while Herd bundles the Laravel-focused toolchain and serves parked projects on `.test` domains for faster local onboarding.',
          whyItMatters: 'Senior devs should choose the right tool for the job. Herd is great for speed, while manual setup is necessary for specialized environments.',
          detailedBreakdown: 'Laravel Herd uses Nginx and PHP-FPM binaries compiled for performance without depending on Homebrew. It manages DNS and SSL (via mkcert) automatically for `.test` domains.',
          advancedNotes: [
            'Herd is available for macOS and Windows and includes command line tools like `php`, `composer`, `laravel`, `node`, `npm`, and `nvm`.',
            'Herd uses parked directories, so apps inside the default Herd folder can be reached locally by directory name on a `.test` domain.',
            'Manual setup is still a valid professional choice when a team pins its own PHP, Composer, database, or Node versions.',
            'In interviews, Herd is best explained as a convenience layer for local Laravel development, not a deployment requirement.',
          ],
          examples: [
            {
              title: 'Two valid local development paths',
              description: 'Both approaches are official; the difference is convenience and tooling style.',
              codeSample: {
                label: 'local-dev-options.sh',
                language: 'bash',
                code: `# Manual path
composer global require laravel/installer
laravel new my-app

# Herd path after installing Herd
cd ~/Herd
laravel new my-app
cd my-app
herd open`,
              },
            },
          ],
          pitfalls: [
            'Assuming Herd is mandatory when the docs present it as an optional, streamlined local environment.',
            'Confusing Herd `.test` domains with production hosting or public deployment URLs.',
          ],
          interviewQuestions: [
            {
              question: 'What is the difference between manual Laravel setup and Laravel Herd?',
              answer: 'Manual setup means you install and manage PHP, Composer, the Laravel installer, Node, and any databases yourself. Herd packages the day-to-day Laravel toolchain for macOS or Windows and gives you conveniences like parked directories, `.test` domains, and a ready-to-use local web server experience.',
              difficulty: 'Easy'
            },
            {
              question: 'When would you mention Herd in an interview answer?',
              answer: 'Mention Herd when the discussion is about local developer productivity, faster onboarding, or easier switching between Laravel projects on macOS or Windows. It is a convenience for development, not a requirement for running Laravel itself.',
              difficulty: 'Easy'
            },
          ],
        },
        {
          id: 'initial-config-database',
          title: 'Initial Configuration, .env, and Databases',
          level: 'Fundamental',
          summary: 'A fresh Laravel 13 app keeps framework configuration in `config/*`, but environment-specific values live in the project root `.env` file. The official installation flow defaults to SQLite, creates `database/database.sqlite`, and runs the initial migrations for you; switching to MySQL or PostgreSQL means changing the `DB_*` values and running migrations against that database.',
          whyItMatters: 'Security and environment parity are critical. Understanding the relationship between `.env` and `config/` is fundamental for deployment.',
          detailedBreakdown: 'Laravel 13 defaults to SQLite for speed. The framework provides `config:cache` to optimize performance by flattening all config and `.env` values into a single PHP file.',
          advancedNotes: [
            'The `.env` file is environment-specific and must stay out of source control because it may contain credentials or host-specific settings.',
            'SQLite is the default first-run database in the official Laravel 13 installation flow, which keeps initial setup lightweight.',
            'Moving to MySQL or PostgreSQL is mostly an environment change: update the driver and connection values in `.env`.',
            'If you switch away from SQLite, create the target database first and then run `php artisan migrate`.',
          ],
          examples: [
            {
              title: 'Switching a fresh app from SQLite to MySQL',
              description: 'The common interview explanation is that Laravel reads the connection from `.env`, while `config/database.php` defines the shape of each driver.',
              codeSample: {
                label: '.env + artisan',
                language: 'bash',
                code: `DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

php artisan migrate`,
              },
            },
          ],
          pitfalls: [
            'Committing `.env` to Git or sharing real credentials in the repository.',
            'Changing database assumptions in code before updating the environment connection values that Laravel actually reads.',
          ],
          interviewQuestions: [
            {
              question: 'What database does a fresh Laravel 13 app use by default?',
              answer: 'The official Laravel 13 installation flow defaults to SQLite. A fresh application gets a `database/database.sqlite` file and the initial migrations are run during setup, which keeps local onboarding simple.',
              difficulty: 'Easy'
            },
            {
              question: 'Why should the `.env` file stay out of Git?',
              answer: 'Because `.env` holds environment-specific values such as database credentials, app URLs, and service secrets. Committing it leaks sensitive information and also mixes one machine or server configuration into every other environment.',
              difficulty: 'Easy'
            },
          ],
        },
        {
          id: 'directory-and-next-steps',
          title: 'Web Root, Starter Choices, and Next Steps',
          level: 'Fundamental',
          summary: 'Laravel should always be served from the root of the web directory so only the intended public entry point is exposed. During application creation, the installer can ask about testing, database, and starter-kit choices, and the right next learning path depends on whether the project is a full-stack Laravel app or an API backend.',
          whyItMatters: 'Security best practices start at the server level. Starter kits (Breeze/Jetstream) accelerate TDD and Auth setup.',
          detailedBreakdown: 'Laravel exposes only the `public/` directory to the web. The entry point `index.php` bootstraps the framework. Starter kits provide a complete stack (Tailwind/Inertia/Livewire) out of the box.',
          advancedNotes: [
            'Serving Laravel from the correct web root is a security topic because files outside the public entry point should not be directly reachable.',
            'The installer choices matter early: testing framework, database, and starter kit all influence the initial developer experience.',
            'For full-stack Laravel, the official next steps point toward frontend, routing, views, Eloquent, and starter kits.',
            'For API backend work, the official next steps point toward routing, Sanctum, and Eloquent for SPAs or mobile clients.',
            'Laravel Boost is an optional AI-focused development dependency, not a prerequisite for starting a Laravel application.',
          ],
          examples: [
            {
              title: 'A clean decision path after installation',
              description: 'This is the interview-friendly flow from project creation to choosing the right learning direction.',
              codeSample: {
                label: 'decision-path.sh',
                language: 'bash',
                code: `laravel new crm-backend
# choose testing framework, database, and starter kit during setup

cd crm-backend
php artisan migrate
composer run dev

# Next study path:
# - Full-stack Laravel: frontend, routing, views, Eloquent
# - API backend: routing, Sanctum, Eloquent`,
              },
            },
          ],
          pitfalls: [
            'Trying to serve Laravel from a nested subdirectory of the web root and exposing files that should stay private.',
            'Jumping into feature work without deciding whether the app is primarily full-stack Laravel or an API backend.',
          ],
          interviewQuestions: [
            {
              question: 'Why should Laravel be served from the root of the web directory?',
              answer: 'Because Laravel expects only the public entry point to be web-accessible. Serving the project from an unsafe subdirectory layout can expose sensitive framework or configuration files that should never be reachable from the browser.',
              difficulty: 'Easy'
            },
            {
              question: 'What should you learn next after installing Laravel 13?',
              answer: 'That depends on the app type. For a full-stack Laravel app, continue into frontend, routing, views, and Eloquent. For an API backend, continue into routing, Sanctum, and Eloquent. That shows you understand both the framework and the product direction.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'lifecycle',
      title: 'Complete Request Lifecycle',
      description: 'Every senior Laravel developer must explain this flow without notes.',
      concepts: [
        {
          id: 'request-lifecycle',
          title: 'From Browser to Response — Every Step',
          level: 'Core',
          summary: 'public/index.php → Autoloader → Application → HTTP Kernel Bootstrappers → Service Providers (register then boot) → Global Middleware → Router → Route Middleware → Controller → Response → Terminable Middleware.',
          whyItMatters: 'Senior developers must know where to hook logic. Middleware vs Service Providers vs Controllers — each has a specific point in the timeline.',
          detailedBreakdown: 'The Kernel bootstraps the environment, config, and exception handling. Service Providers are the heart of Laravel; `register` is for binding, and `boot` is for using. Terminable middleware allows post-response logic (like logging).',
          advancedNotes: [
            'register() is called on ALL providers before any boot() — never use services in register().',
            'boot() is safe to use other services, register observers, routes, Blade directives.',
            'Terminable middleware (terminate() method) runs AFTER the response is sent to the browser.',
          ],
          examples: [
            {
              title: 'Full lifecycle flow',
              description: 'The exact sequence from first byte received to last byte sent.',
              codeSample: {
                label: 'lifecycle.txt',
                language: 'bash',
                code: `Browser Request
  ↓
public/index.php         → Loads Composer autoloader. Creates Application.
  ↓
bootstrap/app.php        → Binds HTTP/Console Kernels to the Application.
  ↓
Illuminate\\Http\\Kernel   → Bootstrappers run sequentially:
  - LoadEnvironmentVariables  (reads .env)
  - LoadConfiguration         (merges config/ files)
  - HandleExceptions          (registers error handler)
  - RegisterFacades           (aliases Facade classes)
  - RegisterProviders         → ALL ServiceProviders::register() called
  - BootProviders             → ALL ServiceProviders::boot() called
  ↓
Global Middleware Stack  → TrimStrings, EncryptCookies, StartSession...
  ↓
Router::dispatch()       → Matches URL+Method → Route definition
  ↓
Route Middleware         → auth, throttle, verified, etc.
  ↓
Controller Method        → Returns Response/View/JSON
  ↓
Response flows back up middleware stack (modifications)
  ↓
$response->send()        → Emits headers + body to browser
  ↓
Kernel::terminate()      → Terminable middleware runs AFTER response`,
              },
            },
          ],
          pitfalls: [
            'Using a service inside register() — that service may not be registered yet by another provider.',
            'Forgetting that env() returns null after config:cache — always use config() in app code.',
          ],
          interviewQuestions: [
            {
              question: 'Difference between register() and boot() in a Service Provider?',
              answer: 'register() is called on ALL providers first — use it ONLY to bind into the container. boot() is called after ALL providers are registered, making it safe to use any service, add routes, observers, or Blade directives.',
              difficulty: 'Medium'
            },
            {
              question: 'How do Facades work internally?',
              answer: 'A Facade extends Illuminate\\Support\\Facades\\Facade and implements getFacadeAccessor() returning a container key (e.g. "cache"). When you call Cache::get("key"), PHP\'s __callStatic intercepts it, resolves the real instance from the IoC container, and calls get("key") on it.',
              difficulty: 'Hard'
            },
          ],
        },
      ],
    },
    {
      id: 'architecture-internals',
      title: 'Advanced Architecture & Internals',
      description: 'The engine room: Service Container, Middleware patterns, and high-performance design.',
      concepts: [
        {
          id: 'service-container-deep-dive',
          title: 'The Service Container (IoC)',
          level: 'Advanced',
          summary: 'The powerful tool for managing class dependencies and performing dependency injection.',
          whyItMatters: 'Understanding IoC is what separates Laravel users from Laravel developers. It enables loose coupling, easy mocking for tests, and contextual binding.',
          detailedBreakdown: 'Laravel resolves dependencies using PHP Reflection. Key methods include `bind`, `singleton`, and `scoped`. Contextual binding allows you to inject different implementations of an interface into different classes based on where they are needed.',
          examples: [
            {
              title: 'Contextual Binding',
              description: 'Injecting different drivers into different services.',
              codeSample: {
                label: 'AppServiceProvider.php',
                language: 'php',
                code: `$this->app->when(PhotoController::class)
          ->needs(Filesystem::class)
          ->give(fn() => Storage::disk('local'));

$this->app->when(VideoController::class)
          ->needs(Filesystem::class)
          ->give(fn() => Storage::disk('s3'));`
              }
            }
          ],
          interviewQuestions: [
            {
              question: 'Difference between singleton() and scoped() closures?',
              answer: 'singleton() creates one instance for the entire application lifetime. scoped() creates one instance per request lifecycle — useful for things like Auth managers or database connections that should reset per request.',
              difficulty: 'Hard'
            },
            {
              question: 'What is "Automatic Injection"?',
              answer: 'Laravel uses Reflection to look at the constructor type-hints of a class and automatically instantiates and injects those dependencies if it knows how to resolve them.',
              difficulty: 'Medium'
            }
          ]
        },
        {
          id: 'middleware-patterns',
          title: 'Middleware Onion & Terminable Patterns',
          level: 'Advanced',
          summary: 'Middleware provides a convenient mechanism for filtering HTTP requests entering your application.',
          whyItMatters: 'Middleware is the primary way to implement cross-cutting concerns (Auth, Logging, IP filtering).',
          detailedBreakdown: 'Laravel uses the "Onion" model (Pipeline design pattern). Each middleware "wraps" the request. Terminable middleware is critical for operations that can happen after the user gets their response (e.g. sending logs to an external API).',
          interviewQuestions: [
            {
              question: 'Explain the "Onion" model in Laravel Middleware.',
              answer: 'Requests pass through a stack of middleware before reaching the controller. Responses then flow back out through the same stack in reverse order, allowing each layer to modify the response.',
              difficulty: 'Medium'
            }
          ]
        }
      ]
    },
    {
      id: 'eloquent',
      title: 'Eloquent ORM Mastery',
      description: 'All relationships, accessors, scopes, and the N+1 problem with real production fixes.',
      concepts: [
        {
          id: 'eloquent-relationships',
          title: 'All Relationship Types',
          level: 'Core',
          summary: 'hasOne, hasMany, belongsToMany (with pivot), hasManyThrough, and polymorphic (morphTo/morphMany) — know cardinality, eager loading, and pivot metadata.',
          whyItMatters: 'Relationships are the heart of data modeling; mastering them ensures clean code and efficient queries.',
          detailedBreakdown: 'Covers hasMany, belongsTo, and Many-to-Many with pivots. Focuses on eager loading to solve the N+1 problem. Polymorphic relations allow models to belong to more than one other model on a single association.',
          advancedNotes: [
            'sync() replaces all pivot rows. attach() adds. syncWithoutDetaching() adds without removing.',
            'withPivot(\'assigned_at\') includes extra pivot columns in the relationship result.',
            'Polymorphic relations need imageable_id + imageable_type columns.',
          ],
          examples: [
            {
              title: 'All relationship types in one place',
              description: 'The complete reference for every Eloquent relationship.',
              codeSample: {
                label: 'relationships.php',
                language: 'php',
                code: `// ONE-TO-ONE
class User extends Model {
    public function profile(): HasOne {
        return $this->hasOne(Profile::class);
    }
}

// ONE-TO-MANY
class Post extends Model {
    public function comments(): HasMany {
        return $this->hasMany(Comment::class);
    }
}

// MANY-TO-MANY with pivot metadata
class User extends Model {
    public function roles(): BelongsToMany {
        return $this->belongsToMany(Role::class)
            ->withTimestamps()
            ->withPivot('assigned_by');
    }
}
$user->roles()->attach($roleId, ['assigned_by' => auth()->id()]);
$user->roles()->sync([1, 2, 3]); // Replaces all

// HAS MANY THROUGH (Country → Users → Posts)
class Country extends Model {
    public function posts(): HasManyThrough {
        return $this->hasManyThrough(Post::class, User::class);
    }
}

// POLYMORPHIC (Image belongs to User OR Post OR Product)
// images: imageable_id, imageable_type
class Image extends Model {
    public function imageable(): MorphTo {
        return $this->morphTo();
    }
}
class User extends Model {
    public function images(): MorphMany {
        return $this->morphMany(Image::class, 'imageable');
    }
}`,
              },
            },
          ],
          pitfalls: [
            'N+1 problem: User::all() then accessing $user->profile in loop = 1+N queries. Fix: User::with("profile")->get()',
            'attach() without detach check creates duplicate pivot rows — use syncWithoutDetaching() or check first.',
          ],
          interviewQuestions: [
            {
              question: 'What is the N+1 problem and how do you fix it in Laravel?',
              answer: 'N+1 is when you load N records then execute 1 additional query per record (e.g., accessing a relation in a loop). Fix with eager loading: User::with("profile")->get() executes only 2 queries. Use Model::preventLazyLoading(!app()->isProduction()) to auto-detect it in development.',
              difficulty: 'Medium'
            },
          ],
        },
        {
          id: 'scopes-accessors',
          title: 'Query Scopes, Accessors & Model Config',
          level: 'Core',
          summary: 'Local scopes for chainable business intent. Global scopes for baseline constraints (like SoftDeletes). Modern accessor/mutator syntax with Attribute::make().',
          whyItMatters: 'Readable, chainable code is easier to maintain. Scopes keep business logic inside the model layer.',
          detailedBreakdown: 'Local scopes are methods prefixed with `scope`. Global scopes are classes implementing `Scope`. Accessors transform model values when accessed, while mutators transform values when set.',
          advancedNotes: [
            'Global scopes must be bypassed explicitly: withoutGlobalScope(ActiveScope::class).',
            'PHP 8.1 Enum casting: protected $casts = ["status" => Status::class].',
            'Model::preventLazyLoading() throws an exception when a lazy relation is accessed.',
          ],
          examples: [
            {
              title: 'Local scopes + Modern accessor',
              description: 'Readable query chains and computed attributes with new Laravel 9+ syntax.',
              codeSample: {
                label: 'model-features.php',
                language: 'php',
                code: `class Product extends Model {
    protected $casts = [
        'is_active'    => 'boolean',
        'price'        => 'decimal:2',
        'metadata'     => 'array',       // JSON ↔ PHP Array auto
        'status'       => Status::class, // PHP 8.1 Enum casting
    ];

    // Local scope — chainable
    public function scopeActive(Builder $q): Builder {
        return $q->where('is_active', true);
    }
    public function scopePriceBetween(Builder $q, float $min, float $max): Builder {
        return $q->whereBetween('price', [$min, $max]);
    }

    // Modern accessor + mutator (Laravel 9+)
    protected function firstName(): Attribute {
        return Attribute::make(
            get: fn($v) => ucfirst($v),   // When reading
            set: fn($v) => strtolower($v), // When writing
        );
    }

    // Computed accessor (no DB column)
    protected function fullName(): Attribute {
        return Attribute::make(
            get: fn() => "{$this->first_name} {$this->last_name}",
        );
    }
}

// Usage
Product::active()->priceBetween(1000, 50000)->paginate(20);`,
              },
            },
          ],
          pitfalls: [
            'After config:cache, env() returns null — always use config() in application code.',
            'Forgetting $appends to include computed accessors in JSON serialization.',
          ],
          interviewQuestions: [
            {
              question: 'Difference between Local and Global Query Scopes?',
              answer: 'Global scopes auto-apply to EVERY query for that model (e.g., SoftDeletes). Local scopes must be called explicitly — they are chainable method calls like Product::active()->get(). Global scopes can be bypassed with withoutGlobalScope().',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'auth',
      title: 'Authentication & Authorization',
      description: 'Sanctum API tokens, Gates for simple checks, Policies for model-level authorization.',
      concepts: [
        {
          id: 'sanctum-auth',
          title: 'Sanctum, Gates & Policies',
          level: 'Core',
          summary: 'Sanctum provides API token auth for SPAs. Gates are closures for non-model authorization. Policies are class-based per-model authorization — keep controllers thin.',
          whyItMatters: 'Security is paramount. Sanctum is the standard for modern API auth, and Policies keep authorization logic clean and auditable.',
          detailedBreakdown: 'Sanctum uses simple database-backed tokens. Gates are registered in the `AuthServiceProvider`. Policies are created per model and handle CRUD authorization logic.',
          advancedNotes: [
            'Token abilities (scopes): createToken("name", ["orders:read"]) then tokenCan("orders:read").',
            'Policy nullable user: ?User $user for guest support in view policies.',
            '$user->can("update", $post) for programmatic check. $this->authorize() for controller auto-403.',
          ],
          examples: [
            {
              title: 'Sanctum + Policy pattern',
              description: 'The complete auth stack from token generation to controller authorization.',
              codeSample: {
                label: 'auth-pattern.php',
                language: 'php',
                code: `// Sanctum: Generate token on login
$token = $user->createToken('API Token', ['orders:read'])->plainTextToken;
$user->currentAccessToken()->delete(); // Logout current
$user->tokens()->delete();             // Logout all

// Protect routes
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('orders', OrderController::class);
});

// Gate — simple closure (not model-specific)
Gate::define('access-admin', fn(User $user) => $user->is_admin);
Gate::allows('access-admin'); // bool

// Policy — per-model authorization class
class PostPolicy {
    public function update(User $user, Post $post): bool {
        return $user->id === $post->user_id;
    }
    // Guest support — nullable user
    public function view(?User $user, Post $post): bool {
        return $post->published || $user?->id === $post->user_id;
    }
}

// In controller
$this->authorize('update', $post); // Auto-throws 403 if denied`,
              },
            },
          ],
          pitfalls: [
            'Scattered permission checks in controllers — centralize in Policies for auditability.',
            'Forgetting to register the Policy: protected $policies = [Post::class => PostPolicy::class].',
          ],
          interviewQuestions: [
            {
              question: 'Difference between Gates and Policies?',
              answer: 'Gates are closures for simple one-off checks not tied to a specific model: Gate::define("is-admin", fn($u) => $u->is_admin). Policies are classes organized per Eloquent model with CRUD authorization methods — better for model-level security.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'queues',
      title: 'Queues, Jobs & Events',
      description: 'Async processing, retry safety, and the Event/Listener Observer pattern.',
      concepts: [
        {
          id: 'job-reliability',
          title: 'Queue Jobs — Retry Safety & WithoutOverlapping',
          level: 'Advanced',
          summary: 'Jobs must be idempotent — safe to run multiple times. WithoutOverlapping prevents duplicate concurrent execution. The failed() method handles permanent failures gracefully.',
          whyItMatters: 'Distributed systems are unreliable. Designing jobs that can fail and retry safely is a core senior skill.',
          detailedBreakdown: 'Idempotency ensures that running the same job twice has the same effect as running it once. `WithoutOverlapping` uses cache locks to ensure only one instance of a specific job runs at a time.',
          advancedNotes: [
            'WithoutOverlapping middleware uses atomic cache locks — requires Redis or database cache driver.',
            'lockForUpdate() in jobs prevents race conditions when modifying shared rows.',
            'queue:restart signal tells workers to reload code after deployment — critical!',
          ],
          examples: [
            {
              title: 'Production-safe job with overlap protection',
              description: 'Full job class with retry config, overlap prevention, and failure handling.',
              codeSample: {
                label: 'ProcessPayment.php',
                language: 'php',
                code: `class ProcessPayment implements ShouldQueue {
    use Queueable, Dispatchable, InteractsWithQueue, SerializesModels;

    public string $queue   = 'payments';
    public int    $tries   = 3;
    public int    $backoff = 60;    // 60s between retries
    public int    $timeout = 120;   // Kill job after 120s

    public function __construct(private Order $order) {}

    public function middleware(): array {
        // Prevent two jobs for same order running simultaneously
        return [new WithoutOverlapping($this->order->id)];
    }

    public function handle(PaymentService $payment): void {
        DB::transaction(function () use ($payment) {
            // Lock row — other processes must wait
            $order = Order::where('id', $this->order->id)
                ->lockForUpdate()->first();
            $payment->charge($order);
        });
    }

    public function failed(\\Throwable $e): void {
        $this->order->update(['status' => 'payment_failed']);
        Notification::send($this->order->user, new PaymentFailed($this->order));
    }
}

// Dispatch
ProcessPayment::dispatch($order)->onQueue('payments');
ProcessPayment::dispatch($order)->delay(now()->addMinutes(5));`,
              },
            },
          ],
          pitfalls: [
            'Non-idempotent jobs charging a customer twice or sending duplicate emails on retry.',
            'Forgetting php artisan queue:restart after deployment — workers use old code in memory.',
          ],
          interviewQuestions: [
            {
              question: 'When would you use a Job vs an Event?',
              answer: 'An Event represents something that HAPPENED (UserRegistered) — multiple Listeners react to it (SendWelcomeEmail, CreateProfile). A Job is a specific TASK to execute asynchronously. Listeners implement ShouldQueue to become async jobs. Events provide loose coupling; Jobs for isolated async tasks.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'perf',
      title: 'Performance & Production Optimization',
      description: 'Cache hierarchy, config caching, and the critical env() gotcha.',
      concepts: [
        {
          id: 'caching',
          title: 'Caching — Remember, Tags & Atomic Locks',
          level: 'Advanced',
          summary: 'Cache::remember implements Cache-Aside pattern. Cache tags enable group invalidation. Atomic locks prevent race conditions — the correct way to handle "last item in stock" scenarios.',
          whyItMatters: 'Performance is often a cache problem. Distributed systems need atomic locks to prevent race conditions during high concurrency.',
          detailedBreakdown: 'Cache-aside is the standard pattern where you check the cache, then the DB, then populate the cache. Tags allow you to flush multiple items at once. Atomic locks (Redis) are for critical sections of code.',
          advancedNotes: [
            'Cache::tags() requires Redis or Memcached — not supported by file/database drivers.',
            'Cache::lock() uses atomic operations — prevents two requests from overselling inventory.',
            'After config:cache, env() returns null in application code — use config() everywhere.',
          ],
          examples: [
            {
              title: 'Cache patterns for production Laravel',
              description: 'Cache-Aside, tag invalidation, and atomic lock patterns.',
              codeSample: {
                label: 'caching.php',
                language: 'php',
                code: `// Cache-Aside — fetch from DB only if cache miss
$stats = Cache::remember('dashboard:user:'.$userId, 3600, function () use ($userId) {
    return DB::table('orders')
        ->selectRaw('SUM(total) as revenue, COUNT(id) as count')
        ->where('user_id', $userId)
        ->first();
});

// Cache Tags — group invalidation (Redis only)
Cache::tags(['products', 'featured'])->put('featured_list', $data, 3600);
Cache::tags(['products'])->flush(); // Clears ALL product caches

// Atomic Lock — "last item in stock" race condition fix
$lock = Cache::lock('stock_' . $productId, 10);
if ($lock->get()) {
    try {
        $product->decrement('stock');
        Order::create([...]);
    } finally {
        $lock->release();
    }
} else {
    throw new \\Exception('Unable to acquire lock, try again.');
}

// Production deployment
// php artisan config:cache  → env() returns null after this!
// Use config('app.key') NOT env('APP_KEY') in application code`,
              },
            },
          ],
          pitfalls: [
            'Calling env() in controllers/models after config:cache — always use config() instead.',
            'Not running queue:restart after deployment — workers serve stale code from memory.',
          ],
          interviewQuestions: [
            {
              question: 'What happens to env() after php artisan config:cache?',
              answer: 'env() returns null everywhere except inside config/*.php files. The .env file is ignored after caching. Always use config("app.key") in controllers, models, and services — only call env() inside config/*.php files.',
              difficulty: 'Hard'
            },
          ],
        },
      ],
    },
    {
      id: 'email',
      title: 'Email & Mailables',
      description: 'Queued Mailables, Markdown templates, attachments, and SMTP configuration.',
      concepts: [
        {
          id: 'laravel-email',
          title: 'Mailables — Queued, Markdown & Attachments',
          level: 'Core',
          summary: 'Laravel Mailables encapsulate email content. Implement ShouldQueue to offload sending to the queue. Markdown templates provide pre-styled email HTML. Always test with Mailtrap or Mailhog locally.',
          whyItMatters: 'Email is a primary communication channel. Reliable, queued delivery ensures your application remains responsive.',
          detailedBreakdown: 'Mailables are class-based. The `envelope` contains metadata, `content` defines the template, and `attachments` handles files. Queuing mailables offloads the slow SMTP process.',
          advancedNotes: [
            'Mail::to($user)->queue(new WelcomeMail($user)) — dispatches to the queue driver (Redis/DB).',
            'Mail::later(now()->addMinutes(10), new ReceiptMail($order)) — delayed delivery.',
            'Markdown templates: php artisan make:mail OrderShipped --markdown=emails.orders.shipped.',
            'Global From address: config/mail.php → from.address. Override per-Mailable in envelope().',
            'Test locally: .env MAIL_MAILER=log (writes to storage/logs/laravel.log) or MAIL_MAILER=smtp with Mailhog/Mailtrap.',
          ],
          examples: [
            {
              title: 'Complete Mailable with queued delivery and attachment',
              description: 'Production Mailable pattern used in real applications.',
              codeSample: {
                label: 'OrderShipped.php + usage',
                language: 'php',
                code: `// Mailable class
class OrderShipped extends Mailable implements ShouldQueue {
    use Queueable, SerializesModels;

    public function __construct(
        public Order $order,         // Auto-serialized/restored for queue
        public string $pdfPath,
    ) {}

    // Email metadata
    public function envelope(): Envelope {
        return new Envelope(
            subject: "Order #{$this->order->id} has shipped!",
            from:    new Address('noreply@shop.com', 'Shop'),
            replyTo: [new Address('support@shop.com')],
        );
    }

    // Email content
    public function content(): Content {
        return new Content(
            markdown: 'emails.orders.shipped',    // Blade template
            with: ['trackingUrl' => "https://track.example.com/{$this->order->tracking}"],
        );
    }

    // Attachments
    public function attachments(): array {
        return [
            Attachment::fromPath($this->pdfPath)
                       ->as('invoice.pdf')
                       ->withMime('application/pdf'),
        ];
    }
}

// Dispatch the email
Mail::to($order->user)
    ->cc($order->manager_email)
    ->queue(new OrderShipped($order, $pdfPath));

// Delayed
Mail::to($order->user)->later(now()->addHours(1), new OrderShipped($order, $pdfPath));`,
              },
            },
          ],
          pitfalls: [
            'Not implementing ShouldQueue on Mailable — email blocks the HTTP request during delivery (1-3 seconds per email).',
            'Storing large objects in Mailable constructor — the entire Mailable is serialized to the queue. Pass IDs and re-query in handle().',
          ],
          interviewQuestions: [
            {
              question: 'How do you send a queued email in Laravel and why is it important?',
              answer: 'Implement ShouldQueue on the Mailable class, then: Mail::to($user)->queue(new WelcomeMail($user)). The email is pushed to the queue driver (Redis/database) and processed by a worker asynchronously. Critical because SMTP calls can block for 1-5 seconds — queuing keeps your HTTP response instant.',
              difficulty: 'Medium'
            },
            {
              question: 'How do you test emails locally without sending real emails?',
              answer: 'Set MAIL_MAILER=log in .env to write emails to laravel.log. For visual testing: use Mailhog (local SMTP) or Mailtrap (cloud inbox). In tests: Mail::fake() prevents real sending and allows assertions: Mail::assertSent(WelcomeMail::class, fn($m) => $m->hasTo($user->email)).',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'queues-advanced',
      title: 'Queue Batch, Chain & Horizon',
      description: 'Batch jobs for parallel processing, job chaining for sequential pipelines, and Laravel Horizon for Redis queue monitoring.',
      concepts: [
        {
          id: 'batch-chain-horizon',
          title: 'Batch Jobs, Job Chains & Laravel Horizon',
          summary: 'Batch: run multiple jobs in parallel with progress tracking and then/catch/finally hooks. Chain: run jobs sequentially, each starting only after the previous completes. Horizon: dashboard for monitoring Redis queues with worker process management.',
          advancedNotes: [
            'Batch requires a batches database table: php artisan queue:batches-table then migrate.',
            'Chain: if one job fails, subsequent jobs in the chain are not executed.',
            'Batch: one job failing does NOT stop others — use allowFailures() or check $batch->cancelled().',
            'Horizon config in config/horizon.php: processes per queue, supervisor names, balance strategies.',
            'php artisan horizon → starts all workers. php artisan horizon:pause/horizon:terminate.',
          ],
          examples: [
            {
              title: 'Batch processing CSV rows + job chain',
              description: 'Parallel batch upload + sequential chain pipeline.',
              codeSample: {
                label: 'batch-chain.php',
                language: 'php',
                code: `// ── BATCH JOBS ── (parallel, with progress tracking)
$batch = Bus::batch([
    new ProcessCsvChunk($rows1),
    new ProcessCsvChunk($rows2),
    new ProcessCsvChunk($rows3),
])
->then(function (Batch $batch) {
    // All jobs completed successfully
    Log::info("CSV import done. {$batch->totalJobs} jobs processed.");
    ImportComplete::dispatch($batch->id);
})
->catch(function (Batch $batch, Throwable $e) {
    // First batch job failure
    Log::error("Batch failed: {$e->getMessage()}");
    ImportFailed::dispatch();
})
->finally(function (Batch $batch) {
    // Always runs — cleanup
    Storage::delete("temp/{$batch->id}.csv");
})
->name('CSV Import')             // Shows in Horizon dashboard
->allowFailures()                // Don't cancel batch on individual failure
->onQueue('imports')             // Send to specific queue
->dispatch();

// Track progress in controller
$batch = Bus::findBatch($batchId);
return response()->json([
    'progress'  => $batch->progress(),          // 0-100
    'pending'   => $batch->pendingJobs,
    'failed'    => $batch->failedJobs,
    'finished'  => $batch->finished(),
]);

// ── JOB CHAIN ── (sequential)
Bus::chain([
    new ValidateUpload($upload),     // Step 1: validate
    new OptimizeImage($upload),      // Step 2: runs only if step 1 passes
    new GenerateThumbnails($upload), // Step 3: runs only if step 2 passes
    new NotifyUser($upload->user),   // Step 4: only if all above pass
])
->catch(function (Throwable $e) {
    // Called when ANY job in the chain fails
    Log::error("Upload pipeline failed: {$e->getMessage()}");
})
->onQueue('media')
->dispatch();`,
              },
            },
          ],
          pitfalls: [
            'Using Bus::chain() when jobs are independent — chain is sequential so total time = sum of all. Use batch for independent jobs.',
            'Forgetting queue:restart after deployment — Horizon/workers use old code in memory, new job classes won\'t be found.',
          ],
          interviewQuestions: [
            {
              question: 'What is the difference between job batching and job chaining in Laravel?',
              answer: 'Batch: jobs run in PARALLEL simultaneously with progress tracking and then/catch/finally hooks. One job failing doesn\'t stop others (unless allowFailures() is not set). Chain: jobs run SEQUENTIALLY — each job only starts after the previous one completes. If one fails, subsequent jobs in the chain are not executed.',
            },
            {
              question: 'What is Laravel Horizon and what problem does it solve?',
              answer: 'Horizon is a queue monitoring dashboard for Redis-backed queues. It provides real-time job throughput metrics, runtime, failure tracking, and configurable worker processes per queue with load balancing. Without Horizon, you\'re blind to queue health — jobs could pile up silently.',
            },
          ],
        },
      ],
    },
    {
      id: 'cron',
      title: 'Cron Job Scheduling',
      description: 'Laravel Task Scheduler — schedule commands, closures, and artisan tasks with overlap protection.',
      concepts: [
        {
          id: 'laravel-scheduler',
          title: 'Task Scheduling — Cron logic in PHP',
          level: 'Core',
          summary: 'The Laravel scheduler allows you to fluently define your command schedule within Laravel itself. Only one cron entry is needed on your server.',
          whyItMatters: 'Centralizing scheduled tasks in the codebase (rather than server crontabs) makes them version-controlled and easier to manage across environments.',
          detailedBreakdown: 'Uses a single server-level cron to trigger the `schedule:run` command every minute. Tasks can be scheduled with sub-minute granularity in modern Laravel.',
          advancedNotes: [
            'Only 1 server cron entry needed: "* * * * * php artisan schedule:run".',
            'withoutOverlapping() prevents a task from running if the previous instance is still active.',
            'onOneServer() ensures a task only runs on a single server in a load-balanced environment (requires Redis/Memcached).',
          ],
          examples: [
            {
              title: 'Complete task scheduling patterns',
              description: 'All scheduling patterns used in production Laravel applications.',
              codeSample: {
                label: 'Kernel.php (or routes/console.php)',
                language: 'php',
                code: `// Laravel 10: app/Console/Kernel.php
protected function schedule(Schedule $schedule): void {

    // Run artisan command daily at 2 AM
    $schedule->command('reports:daily')
             ->dailyAt('02:00')
             ->withoutOverlapping()      // Prevent 2nd run if 1st still running
             ->runInBackground()         // Don't block next scheduled task
             ->onOneServer();            // Only 1 server runs this (Redis required)

    // Queue a job every 5 minutes
    $schedule->job(new ProcessPendingPayments, 'payments')
             ->everyFiveMinutes()
             ->withoutOverlapping(10);   // Lock for max 10 minutes

    // Send weekly report every Monday at 8 AM
    $schedule->command('emails:weekly-report')
             ->weeklyOn(1, '08:00')     // 1 = Monday
             ->emailOutputTo('admin@example.com')  // Email output
             ->sendOutputTo(storage_path('logs/weekly-report.log'));

    // Closure for simple one-off tasks
    $schedule->call(function () {
        DB::table('temp_uploads')->where('created_at', '<', now()->subDays(7))->delete();
    })->daily()->name('cleanup-temp-uploads')->withoutOverlapping();

    // Conditional scheduling
    $schedule->command('sync:external-api')
             ->everyThirtyMinutes()
             ->when(fn() => config('services.api.enabled'));
}

// Modern Laravel: routes/console.php
use Illuminate\\Support\\Facades\\Schedule;

Schedule::command('reports:daily')->dailyAt('02:00')->withoutOverlapping();`,
              },
            },
          ],
          pitfalls: [
            'Adding multiple server cron entries — each server runs its own scheduler. Use onOneServer() with Redis to avoid duplicate execution.',
            'Not running withoutOverlapping() on long-running tasks — a slow report job can run multiple overlapping instances.',
          ],
          interviewQuestions: [
            {
              question: 'How many cron entries do you need on the server for Laravel Task Scheduler?',
              answer: 'Exactly ONE: "* * * * * php /path/to/artisan schedule:run". Laravel\'s schedule:run command checks all registered tasks internally and executes only the ones due. This centralizes all scheduling logic in PHP code rather than scattered server crontabs.',
              difficulty: 'Easy'
            },
            {
              question: 'What does withoutOverlapping() do in Laravel scheduling?',
              answer: 'It acquires a mutex lock (via the cache driver, usually Redis) before running the task. If a previous run of the same task is still executing, the new run is skipped. Prevents issues where a slow task (e.g., 8-minute report) is still running when the next 5-minute schedule fires.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'multidb',
      title: 'Multi-Database Connections',
      description: 'Multiple DB configs, Eloquent model connections, read/write split, and cross-database queries.',
      concepts: [
        {
          id: 'multiple-connections',
          title: 'Multiple Connections — Config, Eloquent & Read/Write Split',
          level: 'Advanced',
          summary: 'Define multiple database connections in config/database.php. Eloquent models can declare $connection. DB facade can use a specific connection dynamically. Read/write split routes SELECTs to read replica automatically.',
          whyItMatters: 'Large apps often split data across DBs (Analytics vs Transactional) and use read replicas to handle massive query load.',
          detailedBreakdown: 'Multiple connections require distinct configurations. Eloquent uses the default connection unless specified. Read/write split is achieved by adding `read` and `write` arrays under a single connection configuration.',
          advancedNotes: [
            'DB::connection("reporting")->select(...) — any query on a named connection.',
            'Model::on("reporting")->get() — one-time connection override per query.',
            'protected $connection = "analytics" — all model queries always use this connection.',
            'Read/write split: "read" key with hosts array, "write" key with primary host under one connection.',
            'Cross-database JOIN: DB::table("main.users")->join("analytics.events", ...) — only works on same MySQL server.',
          ],
          examples: [
            {
              title: 'Multi-DB config and Eloquent patterns',
              description: 'Complete multi-database setup from config to query.',
              codeSample: {
                label: 'database.php + models',
                language: 'php',
                code: `// ── config/database.php ──
'connections' => [
    // Primary database
    'mysql' => [
        'driver' => 'mysql',
        'host'   => env('DB_HOST'),
        'database' => env('DB_DATABASE'),
        // ...
    ],

    // Reporting / analytics database
    'reporting' => [
        'driver'   => 'mysql',
        'host'     => env('DB_REPORT_HOST'),
        'database' => env('DB_REPORT_DATABASE'),
        'username' => env('DB_REPORT_USERNAME'),
        'password' => env('DB_REPORT_PASSWORD'),
    ],

    // Read/write split (same logical connection)
    'mysql' => [
        'driver' => 'mysql',
        'read'  => [
            'host' => [env('DB_READ_HOST_1'), env('DB_READ_HOST_2')], // Load balanced
        ],
        'write' => [
            'host' => env('DB_WRITE_HOST'),  // Primary
        ],
        'database' => env('DB_DATABASE'),
        // ... shared config
    ],
],

// ── Eloquent Model ──
class Report extends Model {
    protected $connection = 'reporting'; // Always use this DB
    protected $table = 'monthly_reports';
}

// ── Dynamic connection ──
// One query on different DB
User::on('reporting')->where('active', true)->get();
DB::connection('reporting')->table('events')->where('date', today())->get();

// ── Transaction on specific connection ──
DB::connection('reporting')->transaction(function () {
    DB::connection('reporting')->table('reports')->insert([...]);
    DB::connection('reporting')->table('audit_log')->insert([...]);
});

// ── Cross-DB query (same MySQL server) ──
DB::table('main_db.users as u')
   ->join('analytics_db.page_views as pv', 'u.id', '=', 'pv.user_id')
   ->select('u.name', DB::raw('COUNT(pv.id) as page_views'))
   ->groupBy('u.id')
   ->get();`,
              },
            },
          ],
          pitfalls: [
            'Running migrations on wrong connection — php artisan migrate --database=reporting to target a specific DB.',
            'Not wrapping multi-DB operations in connection-specific transactions — default DB::transaction() only wraps the default connection.',
          ],
          interviewQuestions: [
            {
              question: 'How do you configure a read/write database split in Laravel?',
              answer: 'Under the connection in config/database.php, add "read" array with replica hosts and "write" array with primary host. Laravel automatically routes SELECT queries to read hosts and INSERT/UPDATE/DELETE to write host. No code changes needed — it\'s transparent in Eloquent and DB facade.',
              difficulty: 'Hard'
            },
            {
              question: 'How do you use a different database connection for a specific Eloquent model?',
              answer: 'Add protected $connection = "connection_name" to the model — all queries for that model use that connection. For a one-off override: User::on("reporting")->get(). For raw queries: DB::connection("reporting")->select(...).',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'broadcasting',
      title: 'Events & WebSocket Broadcasting',
      description: 'Laravel Reverb/Echo, ShouldBroadcast, channels, presence channels, and real-time patterns.',
      concepts: [
        {
          id: 'laravel-broadcasting',
          title: 'Broadcasting Events with Laravel Reverb & Echo',
          level: 'Advanced',
          summary: 'Laravel broadcasting dispatches events to WebSocket channels. The frontend Echo client subscribes and listens in real-time.',
          whyItMatters: 'Real-time UX (chat, notifications, live updates) is a hallmark of modern advanced web applications.',
          detailedBreakdown: 'Events implement `ShouldBroadcast`. Reverb is the new first-party WebSocket server for Laravel. Private channels require authorization in `routes/channels.php`.',
          advancedNotes: [
            'Event must implement ShouldBroadcast (sync) or ShouldBroadcastNow (bypasses queue, immediate).',
            'Public channel: Channel("orders"). Private: PrivateChannel (requires auth). Presence: PresenceChannel (tracks who is "here").',
            'routes/channels.php: Broadcast::channel("orders.{orderId}", fn($user, $orderId) => $user->can("view", Order::find($orderId))).',
            'broadcastWith(): control what data is sent to the client (never send sensitive fields).',
            'Echo.private("orders.123").listen(".OrderStatusUpdated", (data) => {}). Note the dot prefix for event class name.',
          ],
          examples: [
            {
              title: 'Complete broadcasting: Event → Channel → Echo frontend',
              description: 'End-to-end real-time order status updates.',
              codeSample: {
                label: 'OrderStatusUpdated.php + Echo',
                language: 'php',
                code: `// ── Laravel event ──
class OrderStatusUpdated implements ShouldBroadcast {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Order $order) {}

    public function broadcastOn(): array {
        return [
            new PrivateChannel("orders.{$this->order->id}"),
            new PrivateChannel("users.{$this->order->user_id}"), // User dashboard
        ];
    }

    // Control what data is broadcast (never expose internals!)
    public function broadcastWith(): array {
        return [
            'id'         => $this->order->id,
            'status'     => $this->order->status,
            'updated_at' => $this->order->updated_at->toIso8601String(),
        ];
    }

    // Custom event name on frontend (default: class name)
    public function broadcastAs(): string {
        return 'order.status.updated';
    }
}

// ── Dispatch the event ──
OrderStatusUpdated::dispatch($order);

// ── routes/channels.php ── (authorization)
Broadcast::channel('orders.{orderId}', function (User $user, int $orderId) {
    return $user->can('view', Order::findOrFail($orderId));
});`,
              },
            },
          ],
          pitfalls: [
            'Forgetting the dot prefix in Echo.listen(".EventName") — the event class name maps to a dotted string.',
            'Broadcasting sensitive model attributes — always override broadcastWith() to control the payload.',
          ],
          interviewQuestions: [
            {
              question: 'How does Laravel broadcasting work end-to-end?',
              answer: 'Event implements ShouldBroadcast → dispatched → pushed to broadcast queue → broadcast driver (Reverb/Pusher) sends it to the channel → frontend Echo subscribes and receives it. Private channels require auth via routes/channels.php. The frontend never sees the PHP code — it only receives JSON via WebSocket.',
              difficulty: 'Hard'
            },
            {
              question: 'What is the difference between ShouldBroadcast and ShouldBroadcastNow?',
              answer: 'ShouldBroadcast queues the broadcast — goes through the queue worker (slight delay). ShouldBroadcastNow sends immediately, bypassing the queue — use for urgent real-time events (chat messages, live bid updates) where a 1-2 second queue delay would be noticeable.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'api',
      title: 'API Rate Limiting & Versioning',
      description: 'Throttle middleware, custom rate limiters per plan, API versioning, FormRequest validation, and Resource transformers.',
      concepts: [
        {
          id: 'api-patterns',
          title: 'Rate Limiting, Resources & FormRequest',
          level: 'Advanced',
          summary: 'RateLimiter::for() defines named limits per user/IP/plan. API Resources transform models into consistent JSON. FormRequest centralizes validation and authorization — keeping controllers thin.',
          whyItMatters: 'API design is about consistency and protection. Rate limiting prevents abuse, while Resources ensure a stable contract with frontend consumers.',
          detailedBreakdown: 'Rate limiting uses the `throttle` middleware. API Resources allow you to wrap models in a layer that controls JSON structure. FormRequests handle validation before the controller even runs.',
          advancedNotes: [
            'RateLimiter supports dynamic limits: pro users get 1000 req/min, free users get 60.',
            'throttle:api middleware applies the registered "api" limiter.',
            'API Resources: "$this->when($condition, $value)" for conditional fields. "$this->mergeWhen()" for arrays.',
            'FormRequest: authorize() must return true or it throws 403 (no further validation runs).',
            'API versioning: prefix routes with /v1/, /v2/ or use domain routing (v1.api.example.com).',
          ],
          examples: [
            {
              title: 'Rate limiter + FormRequest + API Resource',
              description: 'Complete API layer: throttle → validate → transform.',
              codeSample: {
                label: 'api-patterns.php',
                language: 'php',
                code: `// ── RouteServiceProvider / AppServiceProvider ──
RateLimiter::for('api', function (Request $request) {
    $user = $request->user();
    if (!$user) return Limit::perMinute(20)->by($request->ip()); // Guest

    return match($user?->plan) {
        'pro'      => Limit::perMinute(1000)->by($user->id),
        'business' => Limit::perMinute(5000)->by($user->id),
        default    => Limit::perMinute(60)->by($user->id),        // Free
    };
});

// ── routes/api.php ──
Route::prefix('v1')->middleware(['auth:sanctum', 'throttle:api'])->group(function () {
    Route::apiResource('orders', OrderController::class);
    Route::post('orders/{order}/cancel', [OrderController::class, 'cancel']);
});

// ── FormRequest ── (validation + authorization in one place)
class CreateOrderRequest extends FormRequest {
    public function authorize(): bool {
        return $this->user()->can('create', Order::class); // Policy check
    }

    public function rules(): array {
        return [
            'product_id' => ['required', 'integer', 'exists:products,id'],
            'quantity'   => ['required', 'integer', 'min:1', 'max:100'],
            'address'    => ['required', 'string', 'max:500'],
        ];
    }
}

// ── API Resource ── (consistent JSON transformation)
class OrderResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id'     => $this->id,
            'status' => $this->status,
            'total'  => number_format($this->total / 100, 2), // cents → dollars
            'items'  => OrderItemResource::collection($this->whenLoaded('items')),
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}`,
              },
            },
          ],
          pitfalls: [
            'Returning raw Eloquent models from API — exposes all model attributes including sensitive ones. Always use API Resources.',
            'Putting business logic in FormRequest rules — keep it for validation only. Authorization happens in authorize().',
          ],
          interviewQuestions: [
            {
              question: 'How do you implement different rate limits for free vs paid API users?',
              answer: 'In AppServiceProvider, use RateLimiter::for("api", fn($request) => match($request->user()?->plan) { "pro" => Limit::perMinute(1000)->by($user->id), default => Limit::perMinute(60)->by($user->id) }). Apply with throttle:api middleware.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'testing',
      title: 'Enterprise Testing (Pest & PHPUnit)',
      description: 'Unit vs Feature tests, HTTP assertions, DB transactions, and Mocking/Fakes.',
      concepts: [
        {
          id: 'laravel-testing',
          title: 'Feature Testing, Mocking & Fakes',
          level: 'Core',
          summary: 'Laravel testing focuses on Feature tests (HTTP requests/responses) and Unit tests (isolated logic). Use RefreshDatabase trait to keep tests clean. Use Fakes (Mail::fake, Bus::fake) to avoid side effects.',
          whyItMatters: 'Testing ensures that new features don\'t break existing ones. Feature tests are especially valuable for verifying high-level user flows.',
          detailedBreakdown: 'Feature tests simulate a complete request through the stack. Unit tests focus on a single class. Fakes allow you to assert that a side effect occurred without actually executing it.',
          advancedNotes: [
            'Pest is a modern, expressive testing framework built on PHPUnit and is widely used in modern Laravel starter flows.',
            'Feature tests: simulate a full request through the entire stack.',
            'Fakes: Service mocks that allow assertions (e.g., Mail::assertSent) without sending real mail.',
          ],
          examples: [
            {
              title: 'Complete Feature Test with Mocking',
              description: 'Testing an API endpoint with authentication and a mail fake.',
              codeSample: {
                label: 'StoreOrderTest.php (Pest)',
                language: 'php',
                code: `test('authenticated user can place order', function () {
    Mail::fake();

    $user = User::factory()->create();
    $product = Product::factory()->create(['price' => 1000]);

    $response = $this->actingAs($user)
        ->postJson('/api/orders', [
            'product_id' => $product->id,
            'quantity'   => 2,
        ]);

    $response->assertStatus(201);
    Mail::assertSent(OrderPlaced::class);
});`,
              },
            },
          ],
          pitfalls: [
            'Not using a separate testing database — you might accidentally wipe your development data.',
          ],
          interviewQuestions: [
            {
              question: 'Why use Mail::fake() in tests?',
              answer: 'It replaces the real mailer with a "fake" that records outgoing emails without sending them. This speeds up tests and allows assertions like Mail::assertSent().',
              difficulty: 'Easy'
            },
          ],
        },
      ],
    },
    {
      id: 'eloquent-advanced-patterns',
      title: 'Advanced Eloquent & Observers',
      description: 'Subqueries, whereHas optimization, Model Observers vs Events, and custom pivot models.',
      concepts: [
        {
          id: 'eloquent-internals',
          title: 'Subqueries, Observers & Performance',
          level: 'Advanced',
          summary: 'Go beyond basic CRUD. Use addSelect() for subqueries to avoid N+1. Use Observers to centralize model event logic.',
          whyItMatters: 'As datasets grow, standard Eloquent usage becomes slow. Subqueries and Observers allow for optimized, clean architecture.',
          detailedBreakdown: 'addSelect() allows you to include a subquery as a calculated column on the model. Observers allow you to hook into model events (saving, deleted) without cluttering the model file.',
          advancedNotes: [
            'addSelect(query) — allows adding a subquery column to a model in a single request.',
            'Observers: handle multiple events (creating, updated, deleted) in one class.',
          ],
          examples: [
            {
              title: 'Subquery optimization',
              description: 'Get users with their latest order date in ONE query.',
              codeSample: {
                label: 'subquery.php',
                language: 'php',
                code: `$users = User::addSelect(['last_order_date' => 
    Order::select('created_at')
        ->whereColumn('user_id', 'users.id')
        ->latest()
        ->limit(1)
])->paginate();`,
              },
            },
          ],
          pitfalls: [
            'Using whereHas() on high-cardinality tables — it converts to expensive subqueries. Prefer joins for speed.',
          ],
          interviewQuestions: [
            {
              question: 'When would you use addSelect() for subqueries?',
              answer: 'When you need a single piece of data from a related table for a list of records. It executes as a sub-select, which is faster than loading all related models.',
              difficulty: 'Hard'
            },
          ],
        },
      ],
    },
    {
      id: 'patterns',
      title: 'Design Patterns & SOLID',
      description: 'Repository pattern, Service layer, DTOs, and SOLID principles in Laravel.',
      concepts: [
        {
          id: 'laravel-patterns',
          title: 'Service Layer & Repository Pattern',
          level: 'Advanced',
          summary: 'Avoid "Fat Controllers". Use Service classes for business logic and Repositories for data access abstraction.',
          whyItMatters: 'As applications grow, putting logic in controllers makes them unmanageable. The Service Layer pattern promotes reusability across CLI, web, and jobs.',
          detailedBreakdown: 'Service classes encapsulate business rules. Repositories provide a standard interface for data access, which can be useful when switching data sources or for complex queries.',
          advancedNotes: [
            'Service Layer: Business logic lives here. Controllers only handle HTTP.',
            'Repository Pattern: Abstracts Eloquent queries. Useful for decoupling.',
          ],
          examples: [
            {
              title: 'Architecture: Controller → Service → Repository',
              description: 'Complete decoupled architecture for a complex feature.',
              codeSample: {
                label: 'architecture.php',
                language: 'php',
                code: `class OrderController extends Controller {
    public function store(CreateOrderRequest $request, OrderService $service) {
        $order = $service->placeOrder($request->validated());
        return new OrderResource($order);
    }
}

class OrderService {
    public function __construct(private OrderRepository $repo) {}
    public function placeOrder(array $data): Order {
        return DB::transaction(fn() => $this->repo->create($data));
    }
}

class OrderRepository {
    public function create(array $data): Order {
        return Order::create($data);
    }
}`,
              },
            },
          ],
          pitfalls: [
            'Over-engineering with Repositories for tiny apps — Eloquent is already an abstraction.',
          ],
          interviewQuestions: [
            {
              question: 'What is the benefit of the Service Layer pattern?',
              answer: 'It removes complex logic from Controllers, making them "thin" and the logic reusable (e.g., from CLI).',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'blueprints',
      title: 'Real Project Blueprints',
      description: 'Architecting complex systems: E-commerce APIs, Blog platforms, and RBAC systems.',
      concepts: [
        {
          id: 'ecommerce-blueprint',
          title: 'Blueprint 1: E-commerce API (Concurrency & Payments)',
          level: 'Advanced',
          summary: 'Architecting a system where data integrity is paramount. Handles stock management with database locks.',
          whyItMatters: 'Senior roles require thinking in terms of full system architecture, handling race conditions, and external integrations.',
          detailedBreakdown: 'E-commerce systems must prioritize data consistency over eventual consistency in stock management. This section covers the workflow from checkout initialization to payment webhooks.',
          advancedNotes: [
            'Database: Use lockForUpdate() to prevent overselling.',
            'Workflow: Checkout → Validate Stock → Create Order → Charge Payment → Notify.',
          ],
          examples: [
            {
              title: 'Stock Lock logic',
              description: 'Critical logic for handling stock.',
              codeSample: {
                label: 'stock.php',
                language: 'php',
                code: `DB::transaction(function () use ($productId) {
    $product = Product::where('id', $productId)->lockForUpdate()->first();
    if ($product->stock > 0) {
        $product->decrement('stock');
        // ...
    }
});`,
              },
            },
          ],
          pitfalls: [
            'Not using transactions for order/payment logic — can lead to inconsistent state.',
          ],
          interviewQuestions: [
            {
              question: 'How do you prevent overselling in an e-commerce app?',
              answer: 'Use database transactions with "pessimistic locking" (lockForUpdate()). This prevents other processes from reading/updating the stock until the current transaction completes.',
              difficulty: 'Hard'
            },
          ],
        },
      ],
    },
    {
      id: 'high-performance',
      title: 'High Performance & Scaling',
      description: 'Octane, Reverb, and enterprise-grade scaling strategies.',
      concepts: [
        {
          id: 'laravel-octane',
          title: 'Laravel Octane (Swoole / RoadRunner)',
          level: 'Advanced',
          summary: 'Octane supercharges your application performance by serving it using high-powered application servers like Swoole or RoadRunner.',
          whyItMatters: 'Standard PHP-FPM incurs overhead by booting the framework on every request. Octane boots it once and keeps it in memory.',
          detailedBreakdown: 'Octane uses a long-lived process model. This requires careful management of state (singleton resets) but provides 10x throughput increases.',
          interviewQuestions: [
            {
              question: 'How does Laravel Octane improve performance?',
              answer: 'It boots the application once and keeps it in memory across multiple requests, eliminating the framework boot time (30-60ms) for every hit.',
              difficulty: 'Hard'
            }
          ]
        },
        {
          id: 'situational-debugging',
          title: 'Situational: "The Site is Slow"',
          level: 'Advanced',
          summary: 'A methodical approach to identifying and fixing performance bottlenecks.',
          whyItMatters: 'Senior developers are valued for their ability to debug complex production issues under pressure.',
          detailedBreakdown: 'Methodology: 1. Check server metrics (CPU/RAM). 2. Use logs/Telescope to check query counts (N+1). 3. Profile with Xdebug or Blackfire. 4. Check external API latency. 5. Verify caching headers.',
          interviewQuestions: [
            {
              question: 'A user reports the site is slow. Walk me through your debugging process.',
              answer: 'I start with the "Outside-In" approach: Browser Network tab (Frontend vs Backend time) → Laravel Telescope/Debugbar (Query count, N+1) → Server Logs/Monitoring (CPU/Memory) → Profiler (Blackfire/Xdebug) to pinpoint slow functions.',
              difficulty: 'Hard'
            }
          ]
        }
      ]
    },
  ],
};
