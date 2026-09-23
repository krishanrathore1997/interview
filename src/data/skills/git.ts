import { SkillPageContent } from '../types';

export const git: SkillPageContent = {
  topic: 'Git',
  title: 'Git Commands & Collaboration Workflow',
  subtitle: 'All git commands with real team scenarios, conventional commits, rebase vs merge, and safe recovery techniques.',
  docs: [
    { label: 'Git Reference', href: 'https://git-scm.com/docs' },
    { label: 'Pro Git Book', href: 'https://git-scm.com/book/en/v2' },
  ],
  sections: [
    {
      id: 'setup',
      title: 'Setup & Configuration',
      description: 'Initialize repositories and configure identity.',
      concepts: [
        {
          id: 'repo-bootstrap',
          title: 'Repository Bootstrap & Identity',
          level: 'Fundamental',
          summary: 'git init for new repos, git clone for existing.',
          whyItMatters: 'Correct configuration of identity and remotes is the first step in contributing to professional codebases. Improper setup can lead to attribution issues or permission errors.',
          detailedBreakdown: 'Initializing local repositories. Identity configuration (user.name/email). Cloning from diverse remotes (SSH vs HTTPS).',
          advancedNotes: [
            'Configure user.name and user.email globally.',
          ],
          examples: [
            {
              title: 'Setup',
              description: 'Identity setup.',
              codeSample: {
                label: 'setup.bash',
                language: 'bash',
                code: `git config --global user.name "Name"
git config --global user.email "email@test.com"
git init
git clone <url>`,
              },
            },
          ],
          pitfalls: [
            'Running git init in the wrong folder.',
          ],
          interviewQuestions: [
            {
              question: 'git init vs git clone?',
              answer: 'init starts fresh; clone copies remote history.',
              difficulty: 'Easy'
            },
            {
              question: 'What\'s the difference between cloning over SSH vs HTTPS?',
              answer: 'SSH uses key-based auth — no password prompt once your key is registered, which works well for daily pushes and CI. HTTPS uses a username/token per request (or a credential helper) and tends to get through corporate proxies and firewalls that block SSH\'s port.',
              difficulty: 'Easy'
            },
          ],
        },
      ],
    },
    {
      id: 'daily-workflow',
      title: 'Daily Development Workflow',
      description: 'The healthy Git loop.',
      concepts: [
        {
          id: 'status-stage-commit',
          title: 'Status, Staging & Commit',
          level: 'Fundamental',
          summary: 'Status, add deliberately, diff, and commit with purpose.',
          whyItMatters: 'Professional commits are atomic. Understanding the staging area (index) allows for building clean history by committing only logical units of change.',
          detailedBreakdown: 'The three states of Git (Working, Staged, Committed). Inspecting changes with git diff. Writing meaningful commit messages with Conventional Commits.',
          advancedNotes: [
            'git add -p for interactive staging.',
            'Conventional commits: feat, fix, refactor.',
          ],
          examples: [
            {
              title: 'Daily workflow',
              description: 'Diff and commit.',
              codeSample: {
                label: 'daily.bash',
                language: 'bash',
                code: `git status
git diff --staged
git commit -m "feat: user auth"`,
              },
            },
          ],
          pitfalls: [
            'git add . without checking status.',
          ],
          interviewQuestions: [
            {
              question: 'git diff vs git diff --staged?',
              answer: 'diff is unstaged; --staged is what is about to be committed.',
              difficulty: 'Easy'
            },
            {
              question: 'What does git add -p let you do that git add doesn\'t?',
              answer: 'Patch mode walks through your changes hunk by hunk and lets you stage only part of a file\'s edits, so you can split unrelated changes into separate, logical commits instead of committing an entire file\'s worth of unrelated diffs at once.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'branching',
      title: 'Branching & Merging',
      description: 'Feature branches and history management.',
      concepts: [
        {
          id: 'rebase-merge',
          title: 'Rebase vs Merge',
          level: 'Core',
          summary: 'Rebase for clean linear history; Merge for preserving branch context.',
          whyItMatters: 'History hygiene is vital for maintainability. Senior devs must know when to merge (to show where features joined) and when to rebase (to keep a flat history for review).',
          detailedBreakdown: 'Fast-forward merges. Resolving conflicts. The "Golden Rule of Rebase". Choosing the right strategy for team workflows (GitFlow vs Trunk Based).',
          advancedNotes: [
            'Never rebase shared branches.',
          ],
          examples: [
            {
              title: 'Workflow',
              description: 'Rebase feature onto main.',
              codeSample: {
                label: 'rebase.bash',
                language: 'bash',
                code: `git checkout feature
git rebase main
# Fix conflicts
git checkout main
git merge feature`,
              },
            },
          ],
          pitfalls: [
            'git rebase on a pushed branch.',
          ],
          interviewQuestions: [
            {
              question: 'When to rebase?',
              answer: 'Keep private feature branches updated with main for clean history.',
              difficulty: 'Medium'
            },
            {
              question: 'What\'s the "Golden Rule of Rebase"?',
              answer: 'Never rebase a branch that other people have already pulled from or built work on top of. Rebase rewrites commit hashes, so anyone with the old commits diverges from you, leading to confusing history and painful conflicts when they try to sync.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'recovery',
      title: 'Undo & Recovery',
      description: 'Fixing mistakes safely.',
      concepts: [
        {
          id: 'undo',
          title: 'Reset, Revert & Reflog',
          level: 'Core',
          summary: 'Revert is safe (adds commit); Reset is destructive.',
          whyItMatters: 'Errors are inevitable. Knowing the difference between "soft" reset and "hard" reset, and how to use the reflog, prevents permanent data loss.',
          detailedBreakdown: 'Undoing staging (reset). Undoing history safely (revert). Recovering "lost" commits from the reflog.',
          advancedNotes: [
             'git reflog is the lifesaver to recover "lost" commits.',
          ],
          examples: [
            {
              title: 'Undo last commit',
              description: 'Soft reset.',
              codeSample: {
                label: 'undo.bash',
                language: 'bash',
                code: `git reset --soft HEAD~1
git revert <hash>`,
              },
            },
          ],
          pitfalls: [
            'git reset --hard without stashing.',
          ],
          interviewQuestions: [
            {
              question: 'Reset --hard vs Revert?',
              answer: 'Reset deletes history; Revert creates an inverse commit (safe for shared).',
              difficulty: 'Medium'
            },
            {
              question: 'What\'s the difference between reset --soft, --mixed, and --hard?',
              answer: '--soft moves HEAD but keeps your changes staged. --mixed (the default) moves HEAD and unstages the changes but keeps them in the working directory. --hard moves HEAD and discards the changes entirely, so uncommitted work is gone unless it\'s recoverable through the reflog.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'expert',
      title: 'Expert Ops',
      description: 'Worktrees and Bisect.',
      concepts: [
        {
          id: 'worktree',
          title: 'Git Worktree',
          level: 'Advanced',
          summary: 'Multitask without stashing.',
          whyItMatters: 'Senior devs often juggle multiple features or need to quickly jump to a hotfix without disrupting their current working state. Worktrees are cleaner than frequent stashing.',
          detailedBreakdown: 'Creating separate checkout directories for different branches. Managing lifecycle of multiple worktrees.',
          advancedNotes: [
            'Worktrees allow you to have multiple branches of the same repository checked out simultaneously.',
          ],
          examples: [
            {
              title: 'Worktree',
              description: 'Handle hotfix.',
              codeSample: {
                label: 'worktree.bash',
                language: 'bash',
                code: `git worktree add ../hotfix main`,
              },
            },
          ],
          pitfalls: [
            'Forgetting to remove the worktree directory when done.',
          ],
          interviewQuestions: [
            {
              question: 'What is a Git Worktree?',
              answer: 'A way to checkout multiple branches into different folders at once.',
              difficulty: 'Medium'
            },
            {
              question: 'How is a worktree different from just cloning the repo again into another folder?',
              answer: 'A worktree shares the same .git object database and history with the original clone, so branches, stashes, and fetches are visible across all worktrees instantly, and it uses far less disk space than a second full clone.',
              difficulty: 'Medium'
            },
          ],
        },
        {
          id: 'bisect',
          title: 'Git Bisect',
          level: 'Advanced',
          summary: 'Binary search for bugs.',
          whyItMatters: 'Finding the exact cause of a regression in a massive codebase is needles in haystacks. Git bisect is the most efficient technical solution for bug hunting.',
          detailedBreakdown: 'Starting a bisect session. Automating bisect with shell scripts. Marking good/bad commits.',
          advancedNotes: [
            'Bisect uses binary search to find the exact commit that introduced a bug.',
          ],
          examples: [
            {
              title: 'Bisect',
              description: 'Find breaking commit.',
              codeSample: {
                label: 'bisect.bash',
                language: 'bash',
                code: `git bisect start \ngit bisect run npm test`,
              },
            },
          ],
          pitfalls: [
            'Bisecting through "broken" commits.',
          ],
          interviewQuestions: [
            {
              question: 'How do you find which commit broke a feature?',
              answer: 'Use git bisect to pinpoint the regression.',
              difficulty: 'Medium'
            },
            {
              question: 'How does git bisect narrow down a buggy commit so efficiently?',
              answer: 'It performs a binary search: you mark one known-good and one known-bad commit, and it checks out the midpoint for you to test. Each good/bad answer halves the remaining range, so even thousands of commits resolve in roughly log2(n) steps.',
              difficulty: 'Medium'
            },
          ],
        },
      ],
    },
    {
      id: 'git-internals',
      title: 'Git Internals & Data Integrity',
      description: 'Objects, Blobs, Trees, and Commits.',
      concepts: [
        {
          id: 'git-objects',
          title: 'Git Objects Deep Dive',
          level: 'Advanced',
          summary: 'Git is a content-addressable filesystem.',
          whyItMatters: 'Understanding that Git is fundamentally a hash-based file store helps in understanding why history isimmutable and how data integrity is maintained.',
          detailedBreakdown: 'SHA-1 hashing. Blobs (file content). Trees (directories). Commits (snapshots). References (pointers to commits).',
          interviewQuestions: [
            {
              question: 'What are the three main bucket types in Git?',
              answer: 'Blob (file contents), Tree (directory structure), and Commit (snapshot and metadata).',
              difficulty: 'Hard'
            },
            {
              question: 'Why don\'t two identical files in different parts of a repo double the storage?',
              answer: 'Git is content-addressable — a blob\'s identity is the SHA-1 hash of its content. Two files with identical content produce the identical blob hash, so Git stores that content once, no matter how many tree entries across history point to it.',
              difficulty: 'Hard'
            }
          ]
        }
      ]
    },
  ],
};
