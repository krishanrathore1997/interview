import { skillPages } from './skills';
import type { SkillConcept, SkillInterviewQuestion, SkillPageContent, SkillTopic } from './types';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface InterviewQuestion {
  id: string;
  topic: string;
  topicSlug: string;
  sectionTitle: string;
  conceptId: string;
  conceptTitle: string;
  question: string;
  answer: string;
  difficulty: Difficulty;
  tags: string[];
}

type TopicConfig = {
  key: keyof typeof skillPages;
  slug: string;
};

const topicOrder: TopicConfig[] = [
  { key: 'htmlCss', slug: 'html-css' },
  { key: 'javascript', slug: 'javascript' },
  { key: 'typescript', slug: 'typescript' },
  { key: 'react', slug: 'react' },
  { key: 'nextjs', slug: 'nextjs' },
  { key: 'php', slug: 'php' },
  { key: 'laravel', slug: 'laravel' },
  { key: 'sql', slug: 'sql' },
  { key: 'apis', slug: 'apis' },
  { key: 'git', slug: 'git' },
  { key: 'security', slug: 'security' },
  { key: 'testing', slug: 'testing' },
  { key: 'systemDesign', slug: 'system-design' },
  { key: 'devops', slug: 'devops' },
];

function normalizeQuestionKey(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function slugify(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);

  return slug || 'question';
}

function normalizeDifficulty(
  difficulty: SkillInterviewQuestion['difficulty'],
  level: SkillConcept['level'],
): Difficulty {
  if (difficulty === 'Easy') return 'easy';
  if (difficulty === 'Medium') return 'medium';
  if (difficulty === 'Hard') return 'hard';

  if (level === 'Fundamental') return 'easy';
  if (level === 'Advanced') return 'hard';

  return 'medium';
}

function buildQuestion(
  page: SkillPageContent,
  topicSlug: string,
  sectionTitle: string,
  concept: SkillConcept,
  interviewQuestion: SkillInterviewQuestion,
  index: number,
): InterviewQuestion {
  return {
    id: `${topicSlug}-${concept.id}-${index}-${slugify(interviewQuestion.question)}`,
    topic: page.topic,
    topicSlug,
    sectionTitle,
    conceptId: concept.id,
    conceptTitle: concept.title,
    question: interviewQuestion.question,
    answer: interviewQuestion.answer,
    difficulty: normalizeDifficulty(interviewQuestion.difficulty, concept.level),
    tags: [
      page.topic,
      sectionTitle,
      concept.title,
      concept.level ?? '',
      interviewQuestion.difficulty ?? '',
    ].filter(Boolean),
  };
}

const topicQuestions = topicOrder.flatMap(({ key, slug }) => {
  const page = skillPages[key];

  return page.sections.flatMap((section) =>
    section.concepts.flatMap((concept) =>
      (concept.interviewQuestions ?? []).map((interviewQuestion, index) =>
        buildQuestion(page, slug, section.title, concept, interviewQuestion, index),
      ),
    ),
  );
});

const interviewExtras: InterviewQuestion[] = [
  {
    id: 'behavioral-production-incident',
    topic: 'Behavioral',
    topicSlug: 'behavioral',
    sectionTitle: 'Behavioral Practice',
    conceptId: '',
    conceptTitle: 'STAR Stories',
    question: 'Tell me about a production issue you helped resolve.',
    answer:
      'Use STAR: describe the user impact, your responsibility, the debugging steps you took, and the measurable result. A strong answer includes communication, rollback or mitigation, root cause, and the prevention work you added afterward.',
    difficulty: 'medium',
    tags: ['Behavioral', 'STAR', 'debugging', 'production'],
  },
  {
    id: 'behavioral-technical-disagreement',
    topic: 'Behavioral',
    topicSlug: 'behavioral',
    sectionTitle: 'Behavioral Practice',
    conceptId: '',
    conceptTitle: 'Collaboration',
    question: 'Tell me about a time you disagreed with a technical decision.',
    answer:
      'Frame the disagreement around constraints, not ego. Explain the options, tradeoffs, evidence you used, how you listened to the other view, and how the team reached or committed to a decision.',
    difficulty: 'medium',
    tags: ['Behavioral', 'communication', 'tradeoffs'],
  },
  {
    id: 'behavioral-learning-fast',
    topic: 'Behavioral',
    topicSlug: 'behavioral',
    sectionTitle: 'Behavioral Practice',
    conceptId: '',
    conceptTitle: 'Learning',
    question: 'How do you learn a new technology quickly for a project?',
    answer:
      'Start with the official quickstart, build one small end-to-end example, read the core concepts, then apply it to the real feature. Keep notes about sharp edges and validate assumptions with tests or a small spike.',
    difficulty: 'easy',
    tags: ['Behavioral', 'learning', 'delivery'],
  },
  {
    id: 'cross-topic-slow-page',
    topic: 'Cross-Topic',
    topicSlug: 'cross-topic',
    sectionTitle: 'Full-Stack Practice',
    conceptId: '',
    conceptTitle: 'Performance Debugging',
    question: 'A full-stack page is slow. How would you debug it end to end?',
    answer:
      'Split the path into browser, network, server, database, and third-party calls. Measure first, check waterfall and server timing, inspect database queries and indexes, look for unnecessary client JavaScript, then fix the largest verified bottleneck and monitor p95 latency.',
    difficulty: 'hard',
    tags: ['Cross-Topic', 'performance', 'debugging', 'database', 'frontend'],
  },
  {
    id: 'cross-topic-safe-refactor',
    topic: 'Cross-Topic',
    topicSlug: 'cross-topic',
    sectionTitle: 'Full-Stack Practice',
    conceptId: '',
    conceptTitle: 'Refactoring',
    question: 'How do you refactor a risky feature without breaking users?',
    answer:
      'Capture current behavior with focused tests, isolate the change, keep public contracts stable, ship in small steps, and monitor the flow after release. For larger changes, use feature flags or compatibility layers.',
    difficulty: 'medium',
    tags: ['Cross-Topic', 'testing', 'refactor', 'release'],
  },
  {
    id: 'cross-topic-secure-form',
    topic: 'Cross-Topic',
    topicSlug: 'cross-topic',
    sectionTitle: 'Full-Stack Practice',
    conceptId: '',
    conceptTitle: 'Secure Forms',
    question: 'What checks belong in a secure form submission flow?',
    answer:
      'Validate input on the server, authorize the user, protect against CSRF where cookies are used, escape output, handle errors without leaking secrets, and add tests for invalid input and permission boundaries.',
    difficulty: 'medium',
    tags: ['Cross-Topic', 'security', 'forms', 'validation'],
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  ...topicQuestions,
  ...interviewExtras,
].reduce<InterviewQuestion[]>((questions, question) => {
  const seen = new Set(questions.map((item) => normalizeQuestionKey(item.question)));
  const key = normalizeQuestionKey(question.question);

  if (seen.has(key)) return questions;

  return [...questions, question];
}, []);

export const interviewTopics = ['All', ...new Set(interviewQuestions.map((question) => question.topic))];

export const difficultyLabels: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export const skillTopicSlugs: Partial<Record<SkillTopic, string>> = topicOrder.reduce(
  (acc, { key, slug }) => {
    acc[skillPages[key].topic] = slug;
    return acc;
  },
  {} as Partial<Record<SkillTopic, string>>,
);
