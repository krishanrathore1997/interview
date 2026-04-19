import { readFile } from 'node:fs/promises';
import path from 'node:path';

interface GuideReplacement {
  pattern: RegExp;
  replacement: string;
}

interface LoadImportedGuideOptions {
  fileName: string;
  replacements?: GuideReplacement[];
}

function extractBetween(source: string, pattern: RegExp) {
  return source.match(pattern)?.[1]?.trim() ?? '';
}

function scopeCss(css: string) {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '');

  return withoutComments.replace(/(^|})\s*([^@{}][^{}]*)\{/g, (_match, prefix: string, selectorGroup: string) => {
    const scopedSelectors = selectorGroup
      .split(',')
      .map((selector) => selector.trim())
      .filter(Boolean)
      .map((selector) => {
        if (selector === ':root' || selector === 'html' || selector === 'body') {
          return '.imported-guide';
        }

        if (selector === '*') {
          return '.imported-guide *';
        }

        return `.imported-guide ${selector}`;
      })
      .join(', ');

    return `${prefix}\n${scopedSelectors}{`;
  });
}

export async function loadImportedGuide({ fileName, replacements = [] }: LoadImportedGuideOptions) {
  const guidePath = path.join(process.cwd(), 'public', fileName);
  const rawHtml = await readFile(guidePath, 'utf8');
  const rawCss = extractBetween(rawHtml, /<style>([\s\S]*?)<\/style>/i);
  const rawBody = extractBetween(rawHtml, /<body[^>]*>([\s\S]*?)<\/body>/i);

  const normalizedCss = replacements.reduce((css, entry) => {
    return css.replace(entry.pattern, entry.replacement);
  }, rawCss);

  return {
    css: ``, // styles provided globally via globals.css,
    html: rawBody.replace(/<script[\s\S]*?<\/script>/gi, '').trim(),
  };
}

