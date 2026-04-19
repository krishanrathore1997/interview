import InterviewQuestionBank from '@/components/interview/InterviewQuestionBank';
import { interviewQuestions } from '@/data/interview';
import type { Difficulty } from '@/data/interview';

const playbookSteps = [
  {
    label: 'Clarify',
    title: 'Restate the problem',
    text: 'Confirm inputs, constraints, and what success looks like before answering.',
  },
  {
    label: 'Compare',
    title: 'Show tradeoffs',
    text: 'Name two workable approaches, then explain which one fits the situation.',
  },
  {
    label: 'Structure',
    title: 'Answer in order',
    text: 'Use short numbered points so the interviewer can follow your reasoning.',
  },
  {
    label: 'Verify',
    title: 'Close with checks',
    text: 'Mention tests, monitoring, or edge cases that prove the answer works.',
  },
];

const starSteps = [
  { letter: 'S', label: 'Situation', text: 'What was the context and what needed attention?' },
  { letter: 'T', label: 'Task', text: 'What were you specifically responsible for?' },
  { letter: 'A', label: 'Action', text: 'What did you do, and why did you choose that path?' },
  { letter: 'R', label: 'Result', text: 'What improved, and how can you measure it?' },
];

function getDifficultyCounts() {
  return interviewQuestions.reduce(
    (counts, question) => {
      counts[question.difficulty] += 1;
      return counts;
    },
    { easy: 0, medium: 0, hard: 0 } as Record<Difficulty, number>,
  );
}

export default function InterviewPage() {
  const difficultyCounts = getDifficultyCounts();
  const topicCount = new Set(interviewQuestions.map((question) => question.topic)).size;

  return (
    <div className="interview-page-shell">
      <div className="interview-page fade-in">
        <header className="interview-hero">
          <div className="interview-hero-content">
            <p className="interview-eyebrow">Interview Preparation</p>
            <h1>Full-Stack Question Bank</h1>
            <p className="interview-hero-copy">
              Practice topic-linked questions from the study tracks, with focused filters for difficulty, search, and
              related concepts.
            </p>
            <div className="interview-hero-actions">
              <a href="#master-questions" className="interview-primary-link">
                Start practicing
              </a>
              <a href="#interview-playbook" className="interview-secondary-link">
                Review playbook
              </a>
            </div>
          </div>

          <div className="interview-hero-panel" aria-label="Question bank summary">
            <div>
              <span className="interview-stat-value">{interviewQuestions.length}</span>
              <span className="interview-stat-label">Questions</span>
            </div>
            <div>
              <span className="interview-stat-value">{topicCount}</span>
              <span className="interview-stat-label">Topics</span>
            </div>
            <div>
              <span className="interview-stat-value">{difficultyCounts.easy}</span>
              <span className="interview-stat-label">Easy</span>
            </div>
            <div>
              <span className="interview-stat-value">{difficultyCounts.medium}</span>
              <span className="interview-stat-label">Medium</span>
            </div>
            <div>
              <span className="interview-stat-value">{difficultyCounts.hard}</span>
              <span className="interview-stat-label">Hard</span>
            </div>
          </div>
        </header>

        <section id="interview-playbook" className="interview-playbook anchor" aria-labelledby="interview-playbook-title">
          <div className="interview-section-heading">
            <div>
              <p className="interview-eyebrow">Answer Flow</p>
              <h2 id="interview-playbook-title">A Simple Interview Playbook</h2>
            </div>
          </div>

          <div className="interview-playbook-grid">
            {playbookSteps.map((step, index) => (
              <article key={step.label} className="interview-playbook-card">
                <span className="interview-playbook-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="interview-playbook-label">{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <InterviewQuestionBank questions={interviewQuestions} />

        <section className="interview-star" aria-labelledby="interview-star-title">
          <div className="interview-section-heading">
            <div>
              <p className="interview-eyebrow">Behavioral Rounds</p>
              <h2 id="interview-star-title">STAR Framework</h2>
            </div>
          </div>
          <p className="interview-star-copy">
            For story-based questions, keep the answer under two minutes and make your personal contribution clear.
          </p>
          <div className="interview-star-grid">
            {starSteps.map((step) => (
              <article key={step.letter} className="interview-star-card">
                <span>{step.letter}</span>
                <h3>{step.label}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
