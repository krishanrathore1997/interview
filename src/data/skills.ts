import { SkillPageContent, SkillConcept, SkillTopic } from './types';
export type { SkillPageContent, SkillConcept, SkillTopic };
import { react } from './skills/react';
import { laravel } from './skills/laravel';
import { php } from './skills/php';
import { mysql } from './skills/mysql';
import { nextjs } from './skills/nextjs';
import { git } from './skills/git';
import { javascript } from './skills/javascript';
import { htmlCss } from './skills/htmlCss';
import { typescript } from './skills/typescript';
import { apis } from './skills/apis';
import { security } from './skills/security';
import { testing } from './skills/testing';
import { systemDesign } from './skills/systemDesign';
import { devops } from './skills/devops';

export const skillPages: Record<string, SkillPageContent> = {
  react,
  laravel,
  php,
  sql: mysql,
  nextjs,
  git,
  htmlCss,
  javascript,
  typescript,
  apis,
  security,
  testing,
  systemDesign,
  devops,
};
