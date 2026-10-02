export type TemplateToken =
  | { type: 'var'; name: string; raw: string }
  | { type: 'section-open'; name: string; raw: string }
  | { type: 'section-close'; name: string; raw: string }
  | { type: 'include'; path: string; raw: string };

const TOKEN = /\{\{\s*([#/>]?)\s*([^{}]*?)\s*\}\}/g;
export const ARG_NAME = /^[a-z][a-z0-9_]*$/;

/** Lists the logic-less template tokens in a text: {{x}}, {{#x}}…{{/x}} and {{> path}}. */
export function scanTemplate(text: string): TemplateToken[] {
  const tokens: TemplateToken[] = [];
  for (const m of text.matchAll(TOKEN)) {
    const sigil = m[1] ?? '';
    const value = m[2] ?? '';
    const raw = m[0];
    if (sigil === '>') tokens.push({ type: 'include', path: value, raw });
    else if (sigil === '#') tokens.push({ type: 'section-open', name: value, raw });
    else if (sigil === '/') tokens.push({ type: 'section-close', name: value, raw });
    else tokens.push({ type: 'var', name: value, raw });
  }
  return tokens;
}

/** Positional placeholders are target-specific (Claude counts from 0, Codex from 1) and banned in source. */
const POSITIONAL = /\$(ARGUMENTS\b|\d+\b|\{\d+\})/g;

export function findPositionalPlaceholders(text: string): string[] {
  return [...text.matchAll(POSITIONAL)].map((m) => m[0]);
}

/** Resolves an include path. `./x` is relative to the entry folder; anything else is under partials/. */
export function resolveInclude(path: string): { scope: 'entry' | 'partial'; file: string } {
  if (path.startsWith('./')) return { scope: 'entry', file: path.slice(2) };
  return { scope: 'partial', file: path.endsWith('.md') ? path : `${path}.md` };
}
