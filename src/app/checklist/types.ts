export type ChecklistConceptData = {
  id: string;
  title: string;
  level?: string;
};

export type ChecklistSectionData = {
  id: string;
  title: string;
  concepts: ChecklistConceptData[];
};

export type ChecklistTopicData = {
  topic: string;
  slug: string;
  title: string;
  subtitle: string;
  sections: ChecklistSectionData[];
};

