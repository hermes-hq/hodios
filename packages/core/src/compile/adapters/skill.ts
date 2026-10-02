import type { EntryArg, Kind } from '@hermes-hq/hodios-schema';
import { stringify } from 'yaml';
import { renderTemplate, type Lowering } from '../render.js';
import {
  CONTENT_LICENSE,
  blocks,
  entryText,
  exportName,
  frontmatter,
  inputsBlock,
  sourceUrl,
  workflowText,
} from '../text.js';
import type { Adapter, AdapterContext, AdapterResult, ResolvedEntry } from '../types.js';

export const ALL_KINDS: readonly Kind[] = ['prompt', 'persona', 'workflow', 'rule', 'style'];

/** True when only the user should trigger the entry (design §6.4; model invocation is opt-in per pack). */
export const userOnly = (entry: ResolvedEntry): boolean =>
  entry.fm.invocation !== 'model' && entry.fm.invocation !== 'both';

export function skillMetadata(entry: ResolvedEntry, ctx: AdapterContext): Record<string, string> {
  const { fm } = entry;
  const meta: Record<string, string> = {
    version: fm.version,
    kind: fm.kind,
    category: fm.category,
    source: sourceUrl(fm.id),
  };
  if (ctx.catalog) meta['catalog'] = ctx.catalog;
  return meta;
}

/** The skill body for any kind, with the given argument lowering and Inputs block. */
export function skillBody(
  entry: ResolvedEntry,
  ctx: AdapterContext,
  lowering: Lowering,
  inputs: string | undefined,
): string {
  const { fm } = entry;
  let main: string;
  if (fm.kind === 'persona') {
    main = blocks('Work as the persona below for this task, unless the user asks otherwise.', entry.body);
  } else if (fm.kind === 'workflow') {
    main = workflowText(entry, lowering);
  } else if (fm.kind === 'prompt') {
    main = renderTemplate(entry.body, fm.args ?? [], lowering);
  } else {
    main = entryText(entry, lowering, ctx.level);
  }
  return blocks(`# ${fm.title}`, inputs, main);
}

/**
 * Agent Skills SKILL.md, spec-clean: name, description, license and string-only metadata. This is the form in
 * hodios-dist/skills/ and in the codex, cursor, opencode, gemini and copilot skills folders.
 */
export function specSkill(entry: ResolvedEntry, ctx: AdapterContext): string {
  const { fm } = entry;
  const head = frontmatter({
    name: exportName(fm.id),
    description: fm.description,
    license: CONTENT_LICENSE,
    metadata: skillMetadata(entry, ctx),
  });
  const body = skillBody(entry, ctx, { ref: (a) => `[${a.name.toUpperCase()}]` }, inputsBlock(fm.args));
  return `${head}\n${body}`;
}

/** Codex `agents/openai.yaml`: UI strings and the implicit-invocation policy. */
export function codexSkillYaml(entry: ResolvedEntry): string {
  return stringify(
    {
      interface: { display_name: entry.fm.title, short_description: entry.fm.description },
      policy: { allow_implicit_invocation: !userOnly(entry) },
    },
    { lineWidth: 0 },
  );
}

export const skillAdapter: Adapter = {
  id: 'skill',
  label: 'Agent Skills SKILL.md',
  kinds: ALL_KINDS,
  compile(entry, ctx): AdapterResult {
    const name = exportName(entry.fm.id);
    return {
      files: [{ slot: 'skills', name: `${name}/SKILL.md`, content: specSkill(entry, ctx), mode: 'file' }],
      warnings: [],
    };
  },
};

/** Codex: the spec skill plus agents/openai.yaml (implicit invocation off for user-only entries). */
export const codexSkillAdapter: Adapter = {
  id: 'codex-skill',
  label: 'Codex skill (SKILL.md + agents/openai.yaml)',
  kinds: ALL_KINDS,
  compile(entry, ctx): AdapterResult {
    const name = exportName(entry.fm.id);
    return {
      files: [
        { slot: 'skills', name: `${name}/SKILL.md`, content: specSkill(entry, ctx), mode: 'file' },
        { slot: 'skills', name: `${name}/agents/openai.yaml`, content: codexSkillYaml(entry), mode: 'file' },
      ],
      warnings: [],
    };
  },
};

/** Claude Code lowering: named `$arg` substitution declared with `arguments` (positions in declared order). */
export const claudeLowering: Lowering = {
  ref: (arg) => `$${arg.name}`,
  section: (arg, inner) => `Only if ${arg.name} was provided: ${inner}`,
};

export function claudeArgFields(args: readonly EntryArg[] | undefined): Record<string, unknown> {
  if (!args?.length) return {};
  return {
    arguments: args.map((a) => a.name),
    'argument-hint': args.map((a) => (a.required ? `<${a.name}>` : `[${a.name}]`)).join(' '),
  };
}

export function claudeInputs(args: readonly EntryArg[] | undefined): string | undefined {
  return inputsBlock(
    args,
    (a) => `\`${a.name}\``,
    'Arguments fill these in order. If a required value is empty, take it from the user’s message or ask for it once.',
  );
}

/** Claude Code skill: the spec skill plus Claude's argument and invocation fields. */
export function claudeSkill(entry: ResolvedEntry, ctx: AdapterContext): string {
  const { fm } = entry;
  const head = frontmatter({
    name: exportName(fm.id),
    description: fm.description,
    license: CONTENT_LICENSE,
    ...claudeArgFields(fm.args),
    'disable-model-invocation': userOnly(entry) ? true : undefined,
    metadata: skillMetadata(entry, ctx),
  });
  return `${head}\n${skillBody(entry, ctx, claudeLowering, claudeInputs(fm.args))}`;
}

export const claudeSkillAdapter: Adapter = {
  id: 'claude-skill',
  label: 'Claude Code skill',
  kinds: ALL_KINDS,
  compile(entry, ctx): AdapterResult {
    const name = exportName(entry.fm.id);
    return {
      files: [{ slot: 'skills', name: `${name}/SKILL.md`, content: claudeSkill(entry, ctx), mode: 'file' }],
      warnings: [],
    };
  },
};
