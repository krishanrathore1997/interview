import ChecklistClient from './ChecklistClient';
import { skillPages } from '@/data/skills';
import { topicSlugs } from '@/lib/topicSlugs';
import type { ChecklistTopicData } from './types';

function buildChecklistTopics(): ChecklistTopicData[] {
  return Object.values(skillPages).map((content) => ({
    topic: content.topic,
    slug: topicSlugs[content.topic],
    title: content.title,
    subtitle: content.subtitle,
    sections: content.sections.map((section) => ({
      id: section.id,
      title: section.title,
      concepts: section.concepts.map((concept) => ({
        id: concept.id,
        title: concept.title,
        level: concept.level,
      })),
    })),
  }));
}

export default function Page() {
  return <ChecklistClient topics={buildChecklistTopics()} />;
}
