import { SkillPageContent } from '../types';

export const mysql: SkillPageContent = {
  topic: 'MySQL',
  title: 'MySQL & Database Design — Beginner to Advanced',
  subtitle: 'Normalization, all JOINs, indexes (B-Tree internals), ACID transactions, Window Functions, CTEs, JSON columns, query optimization, and locking strategies.',
  docs: [
    { label: 'MySQL 8.0 Docs', href: 'https://dev.mysql.com/doc/refman/8.0/en/' },
    { label: 'Use The Index Luke', href: 'https://use-the-index-luke.com/' },
  ],
  sections: [
    {
      id: 'mysql-locking-internals',
      title: 'Locking Internals & B-Tree Deep Dive',
      description: 'Clustered vs Non-Clustered index internals, Row/Table/Gap locking, and Deadlock resolution.',
      concepts: [
        {
          id: 'index-internals',
          title: 'Index Internals — Clustered vs Non-Clustered',
          level: 'Advanced',
          summary: 'Every InnoDB table has one Clustered Index (usually the Primary Key) that stores the actual row data in its B-tree leaves. Non-Clustered (Secondary) indexes store only a pointer (the PK value) to the real row.',
          whyItMatters: 'Understanding how data is physically organized on disk is the difference between a query that takes 1ms and one that take 1s. Senior devs must understand B-Tree depth and traversal costs.',
          detailedBreakdown: 'InnoDB B+Tree structure. Clustered index leaf nodes. Secondary index "Double Lookup" (bookmark lookup). Page fragmentation and UUID impacts.',
          advancedNotes: [
            'Clustered Index: Data is physically sorted on disk based on the key. Only one per table.',
            'Secondary Index: Leads to "Double Lookup" — first search index tree, then search PK tree (unless it\'s a covering index).',
            'B-Tree vs Hash: B-Tree supports range scans (BETWEEN, >). Hash only supports equality (=).',
          ],
          examples: [
            {
              title: 'Visualizing the double lookup cost',
              description: 'Why Secondary indexes are slower than the Primary Key.',
              codeSample: {
                label: 'index-cost.sql',
                language: 'sql',
                code: `-- 1. Fastest: Clustered Index Lookup
SELECT * FROM users WHERE id = 101; 

-- 2. Fast: Covering Secondary Index
-- (assuming idx_email_name(email, name) exists)
SELECT name FROM users WHERE email = 'bob@test.com';

-- 3. Slower: Secondary Index with Table Lookup
SELECT age FROM users WHERE email = 'bob@test.com';`,
              },
            },
          ],
          pitfalls: [
            'Choosing a large, random string (UUID) as the Primary Key — causes massive data fragmentation.',
            'Forgetting that secondary indexes include the PK value — a wide PK bloats every index.',
          ],
          interviewQuestions: [
            {
              question: 'Difference between Clustered and Non-Clustered indexes?',
              answer: 'Clustered index (PK) stores data in its leaf nodes. Non-Clustered index stores only a pointer to the PK, requiring two traversals unless it\'s a covering index.',
              difficulty: 'Hard'
            },
          ],
        },
        {
          id: 'locking-strategies',
          title: 'Locking — Row, Gap & Deadlocks',
          level: 'Advanced',
          summary: 'MySQL uses different lock types to ensure ACID compliance. Shared (S) locks for reading, Exclusive (X) locks for writing. Gap locks prevent "Phantom Reads".',
          whyItMatters: 'Concurrency is the hardest part of database management. Improper locking leads to deadlocks or "lock wait timeouts" which can crash high-traffic sites.',
          detailedBreakdown: 'Isolation levels vs Lock types. Gap locks and Next-key locks in REPEATABLE READ. Optimistic vs Pessimistic locking patterns.',
          advancedNotes: [
            'Intention Locks (IS, IX): Table-level locks indicating a plan to lock a row.',
            'Gap Locks: Block insertions in a range to prevent phantom reads in REPEATABLE READ.',
            'Deadlock Detection: InnoDB automatically rolls back the transaction with fewest changes.',
          ],
          examples: [
            {
              title: 'Gap Lock scenario',
              description: 'How MySQL prevents phantom reads in a range.',
              codeSample: {
                label: 'gap-locks.sql',
                language: 'sql',
                code: `-- Session A:
START TRANSACTION;
SELECT * FROM orders WHERE id BETWEEN 10 AND 20 FOR UPDATE;

-- Session B: 
-- This INSERT will BLOCK until Session A commits
INSERT INTO orders (id, total) VALUES (15, 100);`,
              },
            },
          ],
          pitfalls: [
            'Not indexing the column in a WHERE clause of a FOR UPDATE query — MySQL locks the ENTIRE table.',
          ],
          interviewQuestions: [
            {
              question: 'How do you identify and resolve a Deadlock in MySQL?',
              answer: 'Run "SHOW ENGINE INNODB STATUS". To resolve, ensure consistent table access order and keep transactions short.',
              difficulty: 'Hard'
            },
          ],
        },
      ],
    },
    {
      id: 'sql-architecture',
      title: 'Enterprise Architecture: Partitioning & Revalidation',
      description: 'Scaling MySQL to 100M+ rows: Horizontal Partitioning, Sharding, and Performance Schema.',
      concepts: [
        {
          id: 'partitioning',
          title: 'Horizontal Table Partitioning',
          level: 'Advanced',
          summary: 'Partitioning splits a large table into smaller physical files based on a rule (RANGE, LIST, HASH). appearing as one table to the application.',
          whyItMatters: 'When tables reach 100M+ rows, even indexed queries slow down due to B-Tree depth and disk I/O. Partitioning allows for efficient data purging and pruning.',
          detailedBreakdown: 'Range, List, and Hash partitioning. Partition pruning logic. Maintenance tasks like dropping old partitions (DROP PARTITION vs DELETE).',
          advancedNotes: [
            'Partition Pruning: The optimizer skips partitions that don\'t match the WHERE clause.',
            'Every column in the partition function MUST be part of every Unique/Primary key.',
          ],
          examples: [
            {
              title: 'Range Partitioning by year',
              description: 'Splitting an orders table by year for faster queries.',
              codeSample: {
                label: 'partitioning.sql',
                language: 'sql',
                code: `CREATE TABLE logs (
    id INT NOT NULL,
    log_date DATE NOT NULL,
    PRIMARY KEY (id, log_date)
)
PARTITION BY RANGE (YEAR(log_date)) (
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION pmax  VALUES LESS THAN MAXVALUE
);`,
              },
            },
          ],
          pitfalls: [
            'Querying without the partition key — MySQL must scan ALL partitions.',
          ],
          interviewQuestions: [
            {
              question: 'What is Partition Pruning?',
              answer: 'The database engine determine which partitions to scan based on the WHERE clause, significantly reducing I/O.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'joins',
      title: 'All JOIN Types',
      description: 'INNER, LEFT, RIGHT, FULL OUTER, SELF, and CROSS joins.',
      concepts: [
        {
          id: 'all-joins',
          title: 'Complete JOIN Reference',
          level: 'Core',
          summary: 'INNER (matches), LEFT (all from left), RIGHT (all from right), FULL OUTER (union workaround), SELF (hierarchy), CROSS (cartesian).',
          whyItMatters: 'Relational databases are about JOINs. Choosing the wrong type or missing an index on a join key can degrade performance exponentially.',
          detailedBreakdown: 'Standard join types. Cartesian products and their dangers. Self-joins for hierarchical data (e.g. employee-manager).',
          advancedNotes: [
            'MySQL has no native FULL OUTER JOIN — use LEFT JOIN UNION RIGHT JOIN.',
            'SELF JOIN uses table aliases for the same table.',
          ],
          examples: [
            {
              title: 'All JOIN types',
              description: 'Complete SQL reference for every JOIN type.',
              codeSample: {
                label: 'joins.sql',
                language: 'sql',
                code: `-- INNER JOIN
SELECT u.name, o.total FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN
SELECT u.name, COUNT(o.id) FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;`,
              },
            },
          ],
          pitfalls: [
            'Using LEFT JOIN and then filtering in WHERE — turns into INNER JOIN.',
          ],
          interviewQuestions: [
            {
              question: 'Difference between LEFT JOIN and INNER JOIN?',
              answer: 'INNER JOIN returns only matches; LEFT JOIN returns all from left plus matches (NULL if none).',
              difficulty: 'Easy'
            },
          ],
        },
      ],
    },
    {
      id: 'indexes',
      title: 'Indexes — B-Tree Internals & Performance',
      description: 'Strategy, Composite Index, and EXPLAIN.',
      concepts: [
        {
          id: 'index-strategy',
          title: 'Index Strategy — B-Tree, Composite & EXPLAIN',
          level: 'Advanced',
          summary: 'Indexes trade write overhead for faster reads. Composite index left-prefix rule is critical.',
          whyItMatters: 'Indexes are often misused. Over-indexing slows down inserts, while under-indexing causes table scans. Mastering EXPLAIN is the only way to verify indexing success.',
          detailedBreakdown: 'B-Tree leaf node distribution. Composite index ordering. Analyzing query plans with EXPLAIN.',
          advancedNotes: [
            'Composite index (user_id, status): works for user_id OR user_id+status. Not for status alone.',
            'EXPLAIN type: ALL (bad), ref/range (good).',
          ],
          examples: [
            {
              title: 'Creating indexes and EXPLAIN',
              description: 'How to check if your query is using indexes.',
              codeSample: {
                label: 'indexes.sql',
                language: 'sql',
                code: `EXPLAIN SELECT * FROM users WHERE email = 'k@test.com';
CREATE INDEX idx_orders_composite ON orders(user_id, status);`,
              },
            },
          ],
          pitfalls: [
            'Adding indexes to write-heavy tables.',
            'Using LIKE "%keyword%" — skips B-Tree index.',
          ],
          interviewQuestions: [
            {
              question: 'Explain the composite index left-prefix rule.',
              answer: 'The leftmost column of the index must be present in the query for the index to be used.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'transactions',
      title: 'Transactions & ACID Properties',
      description: 'Atomicity, Consistency, Isolation, Durability.',
      concepts: [
        {
          id: 'acid-transactions',
          title: 'ACID, Locking & Isolation Levels',
          level: 'Core',
          summary: 'Ensuring all-or-nothing operations with proper locking.',
          whyItMatters: 'Financial integrity depends on ACID. Data corruption happens when transactions are not properly isolated or atomic.',
          detailedBreakdown: 'Atomicity (All or nothing). Consistency (Valid state). Isolation (Parallel safety). Durability (Crash safety).',
          advancedNotes: [
            'Pessimistic: SELECT FOR UPDATE (blocks others).',
            'Optimistic: Check version column before update (higher concurrency).',
          ],
          examples: [
            {
              title: 'Transactions',
              description: 'Bank transfer (ACID).',
              codeSample: {
                label: 'transactions.sql',
                language: 'sql',
                code: `START TRANSACTION;
  UPDATE accounts SET balance = balance - 5000 WHERE id = 1;
  UPDATE accounts SET balance = balance + 5000 WHERE id = 2;
COMMIT;`,
              },
            },
          ],
          pitfalls: [
            'Long transactions holding locks — causes timeout cascade.',
            'Not handling deadlock exceptions.',
          ],
          interviewQuestions: [
            {
              question: 'What are the ACID properties?',
              answer: 'Atomicity, Consistency, Isolation, Durability.',
              difficulty: 'Easy'
            },
          ],
        },
      ],
    },
    {
      id: 'window',
      title: 'Window Functions & CTEs',
      description: 'RANK, LAG, LEAD, and Common Table Expressions.',
      concepts: [
        {
          id: 'window-functions',
          title: 'Window Functions — RANK, LAG & Running Totals',
          level: 'Advanced',
          summary: 'Compute aggregates over a sliding window without collapsing rows.',
          whyItMatters: 'Complex analytical queries (e.g. daily active users, growth trends) are 10x easier and faster with window functions than with self-joins or subqueries.',
          detailedBreakdown: 'OVER clause. Partitioning and Ordering within windows. Practical usage of LAG and LEAD for time-series analysis.',
          advancedNotes: [
            'PARTITION BY groups rows for the function without collapsing them.',
            'LAG/LEAD access previous/next row values.',
          ],
          examples: [
            {
              title: 'Window functions',
              description: 'Department rankings and running totals.',
              codeSample: {
                label: 'window.sql',
                language: 'sql',
                code: `SELECT
    name, salary, department,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank,
    SUM(salary) OVER (ORDER BY hire_date) AS running_total
FROM employees;`,
              },
            },
          ],
          pitfalls: [
            'Using GROUP BY when you need window functions — GROUP BY collapses rows, windows don\'t.',
          ],
          interviewQuestions: [
            {
              question: 'What is the difference between RANK() and ROW_NUMBER()?',
              answer: 'ROW_NUMBER is unique; RANK can have ties and skips next numbers.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'optimization',
      title: 'Query Optimization — EXPLAIN ANALYZE',
      description: 'Diagnose and fix slow queries.',
      concepts: [
        {
          id: 'query-optimization',
          title: 'EXPLAIN ANALYZE & Covering Indexes',
          level: 'Advanced',
          summary: 'Use EXPLAIN to see the plan and ANALYZE for actual runtime.',
          whyItMatters: 'Optimization is about measurement. EXPLAIN ANALYZE provides actual execution times, helping identify if a query is CPU-bound or I/O-bound.',
          detailedBreakdown: 'Reading EXPLAIN output (types, rows, filtered). The power of covering indexes. Optimization strategies for slow GROUP BY / ORDER BY queries.',
          advancedNotes: [
            'Covering index: Index contains all needed columns, skipping table fetch.',
            'Slow query log: Identify bottlenecks in production.',
          ],
          examples: [
            {
              title: 'Optimization workflow',
              description: 'Identify → ANALYZE → Index.',
              codeSample: {
                label: 'opt.sql',
                language: 'sql',
                code: `EXPLAIN ANALYZE SELECT * FROM orders WHERE status = 'pending';`,
              },
            },
          ],
          pitfalls: [
            'Reading EXPLAIN without ANALYZE — estimates can be wrong.',
          ],
          interviewQuestions: [
            {
              question: 'What is a covering index?',
              answer: 'An index that contains all columns in the SELECT and WHERE clauses, allowing MySQL to avoid reading table rows entirely.',
              difficulty: 'Hard'
            },
          ],
        },
      ],
    },
    {
      id: 'json',
      title: 'JSON Columns in MySQL 8',
      description: 'Querying and indexing JSON data.',
      concepts: [
        {
          id: 'json-columns',
          title: 'JSON Column Type — Query, Extract & Index',
          level: 'Advanced',
          summary: 'Native JSON support with validation and paths.',
          whyItMatters: 'Hybrid databases (Relational + JSON) are standard in modern apps. Knowing how to efficiently query and index semi-structured data is a vital skill.',
          detailedBreakdown: 'JSON storage and validation. JSON path syntax ($.key). Speeding up JSON queries with virtual columns/indexes.',
          advancedNotes: [
            'Index JSON by creating a generated column on a path.',
            '->> shorthand for unquoted values.',
          ],
          examples: [
            {
              title: 'JSON index pattern',
              description: 'Index a JSON path.',
              codeSample: {
                label: 'json.sql',
                language: 'sql',
                code: `ALTER TABLE p ADD c VARCHAR(50) AS (metadata->>"$.color") STORED, ADD INDEX(c);`,
              },
            },
          ],
          pitfalls: [
            'Indexing JSON columns directly — not supported.',
          ],
          interviewQuestions: [
            {
              question: 'How do you index JSON in MySQL?',
              answer: 'Create a generated column from the JSON path and index that column.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'replication-monitoring',
      title: 'Replication & Monitoring',
      description: 'Scaling reads and monitoring database health.',
      concepts: [
        {
          id: 'master-slave',
          title: 'Master-Slave Replication',
          level: 'Advanced',
          summary: 'Scale read traffic by replicating data to one or more slave nodes.',
          whyItMatters: 'A single database server is a single point of failure. Replication provides both high availability and horizontal read scalability.',
          detailedBreakdown: 'Binary log (binlog) and relay log. Asynchronous vs. Semi-synchronous replication. Read/Write splitting logic in the application layer.',
          interviewQuestions: [
            {
              question: 'What is the main challenge with Master-Slave replication?',
              answer: 'Replication Lag. Data written to the master may not be immediately available on the slaves, which can cause consistency issues for the user.',
              difficulty: 'Medium'
            }
          ]
        }
      ]
    },
  ],
};
