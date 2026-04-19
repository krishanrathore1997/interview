export type SkillTopic =
  | 'React'
  | 'Laravel'
  | 'PHP'
  | 'Next.js'
  | 'Git'
  | 'MySQL'
  | 'HTML & CSS'
  | 'JavaScript'
  | 'TypeScript'
  | 'HTTP & APIs'
  | 'Security'
  | 'Testing'
  | 'System Design'
  | 'DevOps';

export interface SkillCodeSample {
  label: string;
  language: string;
  code: string;
}

export interface SkillExample {
  title: string;
  description: string;
  codeSample?: SkillCodeSample;
}

export interface SkillInterviewQuestion {
  question: string;
  answer: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface SkillConcept {
  id: string;
  title: string;
  level?: 'Fundamental' | 'Core' | 'Advanced';
  summary: string;
  whyItMatters?: string;
  detailedBreakdown?: string;
  advancedNotes?: string[];
  examples?: SkillExample[];
  pitfalls?: string[];
  interviewQuestions?: SkillInterviewQuestion[];
  codeSamples?: SkillCodeSample[];
  aiPromptSeed?: string;
  isWarning?: boolean;
  warningTitle?: string;
  warningBody?: string;
}

export interface SkillSection {
  id: string;
  title: string;
  description: string;
  concepts: SkillConcept[];
}

export interface SkillPageContent {
  topic: SkillTopic;
  title: string;
  subtitle: string;
  docs: { label: string; href: string }[];
  sections: SkillSection[];
}
