import type { EntryArg, EntryFrontmatter } from '@hermes-hq/hodios-schema';
import { stringify } from 'yaml';
import { placeholder, placeholderLowering, renderTemplate, type Lowering } from './render.js';
import type { ResolvedEntry } from './types.js';

export const SITE = 'https://hermes-ide.com/prompts';
export const CONTENT_LICENSE = 'CC0-1.0';

/** Agent Skills `name`: the name part of an id (`@acme/x` exports as `x`, design §5.4). */
export const exportName = (id: string): string => id.replace(/^@[^/]+\//, '');

export const sourceUrl = (id: string): string => `${SITE}/${id}`;

/** YAML frontmatter block. Keys keep insertion order; undefined values are dropped. */
export function frontmatter(data: Record<string, unknown>): string {
  const clean = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined));
  return `---\n${stringify(clean, { lineWidth: 0 }).trimEnd()}\n---\n`;
}

/** Joins blocks with one blank line and ends the file with a newline. */
export const blocks = (...parts: (string | undefined | false)[]): string =>
  `${parts
    .filter((p): p is string => typeof p === 'string' && p.trim() !== '')
    .map((p) => p.trim())
    .join('\n\n')}\n`;

function argDetails(arg: EntryArg): string {
  const notes: string[] = [arg.required ? 'required' : 'optional'];
  if (arg.enum?.length) notes.push(`one of: ${arg.enum.join(', ')}`);
  if (arg.default !== undefined) notes.push(`default: ${String(arg.default)}`);
  return notes.join('; ');
}

/**
 * The `## Inputs` block for targets that pass arguments as free text (design §6.3).
 * `ref` names how each input appears in the body.
 */
export function inputsBlock(
  args: readonly EntryArg[] | undefined,
  ref: (arg: EntryArg) => string = (a) => placeholder(a.name),
  intro = 'Take each value from the invocation or the user’s message. If a required value is missing, ask for it once.',
): string | undefined {
  if (!args?.length) return undefined;
  const lines = args.map((a) => `- ${ref(a)} (${argDetails(a)}): ${a.description}`);
  return `## Inputs\n\n${lines.join('\n')}\n\n${intro}`;
}

/** Shifts Markdown ATX headings down by `by` levels (capped at 6), outside code fences. */
export function demoteHeadings(text: string, by: number): string {
  let fenced = false;
  return text
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
      if (fenced) return line;
      return line.replace(
        /^(#{1,6})(\s)/,
        (_m, hashes: string, space: string) => `${'#'.repeat(Math.min(6, hashes.length + by))}${space}`,
      );
    })
    .join('\n');
}

/** A workflow as one self-contained text: purpose, then every step inlined with its gate and artifact. */
export function workflowText(entry: ResolvedEntry, lowering: Lowering): string {
  const args = entry.fm.args ?? [];
  const render = (t: string) => renderTemplate(t, args, lowering);
  const steps = entry.steps.map((step, i) => {
    const n = i + 1;
    const next = entry.steps[i + 1];
    const lines = [demoteHeadings(render(step.text), 2)];
    if (!/^#{1,6}\s/.test(step.text)) lines.unshift(`### Step ${n}: ${step.id}`);
    if (step.artifact) lines.push(`Save this step's result to \`${render(step.artifact)}\`.`);
    if (step.gate === 'approve' && next) {
      lines.push(`**Gate:** stop here and wait for the user's approval before step ${n + 1} (${next.id}).`);
    }
    return lines.join('\n\n');
  });
  const overview = entry.steps.map((s, i) => `${i + 1}. ${s.id} (${s.stage})`).join('\n');
  return blocks(
    render(entry.body),
    `## Steps\n\nWork through these steps in order. Do not skip a gate.\n\n${overview}`,
    ...steps,
  );
}

/** The 1-5 level of a style, clamped; default 3. */
export function styleLevel(
  fm: EntryFrontmatter,
  level: number | undefined,
): { n: number; label: string; instruction: string } {
  const levels = fm.levels ?? [];
  const n = Math.min(Math.max(Math.round(level ?? 3), 1), Math.max(levels.length, 1));
  const chosen = levels[n - 1];
  return { n, label: chosen?.label ?? '', instruction: chosen?.instruction ?? '' };
}

export function styleText(entry: ResolvedEntry, level: number | undefined): string {
  const { n, label, instruction } = styleLevel(entry.fm, level);
  return blocks(entry.body, `Output style: ${entry.fm.title}, level ${n} of 5 (${label}). ${instruction}`);
}

export function ruleText(entry: ResolvedEntry): string {
  const scope = entry.fm.applies_to?.length
    ? `Apply these rules to files matching: ${entry.fm.applies_to.map((g) => `\`${g}\``).join(', ')}.`
    : undefined;
  return blocks(scope, entry.body);
}

/**
 * The main text of any entry for a target with the given lowering: prompt body, persona body, workflow with
 * steps inlined, rule statements or the chosen style level. Self-contained: no reference to other entries.
 */
export function entryText(entry: ResolvedEntry, lowering: Lowering = placeholderLowering, level?: number): string {
  switch (entry.fm.kind) {
    case 'workflow':
      return workflowText(entry, lowering);
    case 'rule':
      return ruleText(entry);
    case 'style':
      return styleText(entry, level);
    default:
      return blocks(renderTemplate(entry.body, entry.fm.args ?? [], lowering));
  }
}

/** Markers for a section merged into AGENTS.md, CLAUDE.md or GEMINI.md. */
export const sectionStart = (id: string) => `<!-- hodios:${id} -->`;
export const sectionEnd = (id: string) => `<!-- /hodios:${id} -->`;

/** A section block for a shared instructions file. */
export function sectionBlock(entry: ResolvedEntry, level?: number): string {
  const { fm } = entry;
  const text =
    fm.kind === 'persona'
      ? blocks('Work as the persona below unless the user asks otherwise.', entry.body)
      : entryText(entry, placeholderLowering, level);
  return `${sectionStart(fm.id)}\n## ${fm.title}\n\n${text.trim()}\n${sectionEnd(fm.id)}\n`;
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');

/** Inserts or replaces a marked section in a shared file. Text outside the markers is never touched. */
export function upsertSection(existing: string, id: string, block: string): string {
  const re = new RegExp(`${escapeRe(sectionStart(id))}[\\s\\S]*?${escapeRe(sectionEnd(id))}\\n?`);
  if (re.test(existing)) return existing.replace(re, () => block);
  if (existing.trim() === '') return block;
  return `${existing.replace(/\n*$/, '\n\n')}${block}`;
}

/** Removes a marked section; returns the file unchanged when the section is absent. */
export function removeSection(existing: string, id: string): string {
  const re = new RegExp(`\\n?${escapeRe(sectionStart(id))}[\\s\\S]*?${escapeRe(sectionEnd(id))}\\n?`);
  const out = existing.replace(re, '\n');
  return out.trim() === ''
    ? ''
    : `${out
        .replace(/^\n+/, '')
        .replace(/\n{3,}/g, '\n\n')
        .trimEnd()}\n`;
}

/** Extracts a marked section (including markers), or undefined. */
export function findSection(existing: string, id: string): string | undefined {
  const re = new RegExp(`${escapeRe(sectionStart(id))}[\\s\\S]*?${escapeRe(sectionEnd(id))}\\n?`);
  const m = re.exec(existing);
  if (!m) return undefined;
  return m[0].endsWith('\n') ? m[0] : `${m[0]}\n`;
}
