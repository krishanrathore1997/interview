import SkillPageRenderer from '@/components/SkillPageRenderer';
import { skillPages } from '@/data/skills';

export default function Page() {
  return <SkillPageRenderer content={skillPages.php} />;
}
