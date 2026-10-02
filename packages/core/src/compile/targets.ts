import type { Kind } from '@hermes-hq/hodios-schema';
import {
  claudeAgentAdapter,
  claudeCommandAdapter,
  claudeMdAdapter,
  claudeOutputStyleAdapter,
} from './adapters/claude.js';
import { hermesBundleAdapter } from './adapters/hermes.js';
import {
  agentsMdAdapter,
  codexPromptAdapter,
  copilotAgentAdapter,
  copilotInstructionsAdapter,
  copilotPromptAdapter,
  cursorCommandAdapter,
  cursorRuleAdapter,
  geminiMdAdapter,
  geminiTomlAdapter,
  opencodeAgentAdapter,
  opencodeCommandAdapter,
} from './adapters/native.js';
import { pasteAdapter } from './adapters/paste.js';
import { claudeSkillAdapter, codexSkillAdapter, skillAdapter } from './adapters/skill.js';
import type { Adapter, AdapterContext, OutputFile, ResolvedEntry, Slot } from './types.js';

export const ADAPTERS: readonly Adapter[] = [
  skillAdapter,
  claudeSkillAdapter,
  claudeCommandAdapter,
  claudeAgentAdapter,
  claudeOutputStyleAdapter,
  claudeMdAdapter,
  codexSkillAdapter,
  codexPromptAdapter,
  copilotPromptAdapter,
  copilotAgentAdapter,
  copilotInstructionsAdapter,
  cursorRuleAdapter,
  cursorCommandAdapter,
  geminiTomlAdapter,
  geminiMdAdapter,
  opencodeCommandAdapter,
  opencodeAgentAdapter,
  agentsMdAdapter,
  pasteAdapter,
  hermesBundleAdapter,
];

export const adapterById = (id: string): Adapter | undefined => ADAPTERS.find((a) => a.id === id);

export type Scope = 'project' | 'user';

/** Slot -> path per scope. Project paths are relative to the project root; user paths start with `~/`. */
type SlotPaths = Partial<Record<Slot, { project?: string; user?: string }>>;

export interface Target {
  id: string;
  label: string;
  /** Default adapter per kind; a kind missing here is not supported by the target. */
  defaults: Partial<Record<Kind, string>>;
  /** Other adapters the user can pick with `--format`. */
  alternatives: string[];
  paths: SlotPaths;
}

/**
 * Per-target knowledge: paths, kinds and formats (design §6.4, tier 3). A vendor format change touches this table
 * and one adapter. The ids match vocab/targets.yml (checked by a test).
 */
export const TARGETS: readonly Target[] = [
  {
    id: 'claude-code',
    label: 'Claude Code',
    defaults: {
      prompt: 'claude-skill',
      workflow: 'claude-skill',
      persona: 'claude-agent',
      rule: 'claude-md',
      style: 'claude-output-style',
    },
    alternatives: ['claude-command', 'claude-output-style', 'claude-md'],
    paths: {
      skills: { project: '.claude/skills', user: '~/.claude/skills' },
      commands: { project: '.claude/commands', user: '~/.claude/commands' },
      agents: { project: '.claude/agents', user: '~/.claude/agents' },
      'output-styles': { project: '.claude/output-styles', user: '~/.claude/output-styles' },
      memory: { project: 'CLAUDE.md', user: '~/.claude/CLAUDE.md' },
    },
  },
  {
    id: 'codex',
    label: 'Codex',
    defaults: {
      prompt: 'codex-skill',
      workflow: 'codex-skill',
      persona: 'codex-skill',
      rule: 'agents-md',
      style: 'agents-md',
    },
    alternatives: ['codex-prompt', 'agents-md'],
    paths: {
      skills: { project: '.agents/skills', user: '~/.agents/skills' },
      prompts: { user: '~/.codex/prompts' },
      memory: { project: 'AGENTS.md', user: '~/.codex/AGENTS.md' },
    },
  },
  {
    id: 'cursor',
    label: 'Cursor',
    defaults: { prompt: 'skill', workflow: 'skill', persona: 'cursor-rule', rule: 'cursor-rule', style: 'cursor-rule' },
    alternatives: ['cursor-command', 'skill'],
    paths: {
      skills: { project: '.cursor/skills', user: '~/.cursor/skills' },
      commands: { project: '.cursor/commands', user: '~/.cursor/commands' },
      rules: { project: '.cursor/rules' },
    },
  },
  {
    id: 'copilot',
    label: 'GitHub Copilot',
    defaults: {
      prompt: 'copilot-prompt',
      workflow: 'copilot-prompt',
      persona: 'copilot-agent',
      rule: 'copilot-instructions',
      style: 'copilot-instructions',
    },
    alternatives: ['skill', 'copilot-instructions'],
    paths: {
      skills: { project: '.github/skills', user: '~/.copilot/skills' },
      prompts: { project: '.github/prompts' },
      agents: { project: '.github/agents', user: '~/.copilot/agents' },
      instructions: { project: '.github/instructions' },
    },
  },
  {
    id: 'gemini-cli',
    label: 'Gemini CLI',
    defaults: {
      prompt: 'gemini-toml',
      workflow: 'gemini-toml',
      persona: 'skill',
      rule: 'gemini-md',
      style: 'gemini-md',
    },
    alternatives: ['skill', 'gemini-md'],
    paths: {
      skills: { project: '.gemini/skills', user: '~/.gemini/skills' },
      commands: { project: '.gemini/commands', user: '~/.gemini/commands' },
      memory: { project: 'GEMINI.md', user: '~/.gemini/GEMINI.md' },
    },
  },
  {
    id: 'opencode',
    label: 'OpenCode',
    defaults: {
      prompt: 'opencode-command',
      workflow: 'opencode-command',
      persona: 'opencode-agent',
      rule: 'agents-md',
      style: 'agents-md',
    },
    alternatives: ['skill', 'agents-md'],
    paths: {
      skills: { project: '.opencode/skills', user: '~/.config/opencode/skills' },
      commands: { project: '.opencode/commands', user: '~/.config/opencode/commands' },
      agents: { project: '.opencode/agents', user: '~/.config/opencode/agents' },
      memory: { project: 'AGENTS.md', user: '~/.config/opencode/AGENTS.md' },
    },
  },
  {
    id: 'agents-md',
    label: 'AGENTS.md',
    defaults: { rule: 'agents-md', style: 'agents-md', persona: 'agents-md' },
    alternatives: [],
    paths: { memory: { project: 'AGENTS.md' } },
  },
  {
    id: 'paste',
    label: 'Paste-in text (ChatGPT, claude.ai)',
    defaults: { prompt: 'paste', workflow: 'paste', persona: 'paste', rule: 'paste', style: 'paste' },
    alternatives: [],
    paths: {},
  },
  {
    id: 'hermes',
    label: 'Hermes IDE',
    defaults: {
      prompt: 'hermes-bundle',
      workflow: 'hermes-bundle',
      persona: 'hermes-bundle',
      rule: 'hermes-bundle',
      style: 'hermes-bundle',
    },
    alternatives: [],
    paths: {},
  },
];

/** Target aliases accepted on the command line. */
const TARGET_ALIASES: Record<string, string> = {
  claude: 'claude-code',
  gemini: 'gemini-cli',
  chatgpt: 'paste',
  'claude-ai': 'paste',
  'github-copilot': 'copilot',
};

export function targetById(id: string): Target | undefined {
  const canonical = TARGET_ALIASES[id] ?? id;
  return TARGETS.find((t) => t.id === canonical);
}

/** Targets that write files into a project or home directory. */
export const INSTALL_TARGETS = TARGETS.filter((t) => Object.keys(t.paths).length > 0);

export interface CompiledFile extends OutputFile {
  adapter: string;
  /** Install path for the scope: relative to the project root, or `~/…` for user scope. */
  path?: string;
}

export interface CompileResult {
  target: string;
  adapter: string;
  files: CompiledFile[];
  warnings: string[];
}

/** Resolves a slot + name to an install path for the scope, or undefined when the target has no such path. */
export function installPath(target: Target, file: OutputFile, scope: Scope): string | undefined {
  const base = target.paths[file.slot]?.[scope];
  if (!base) return undefined;
  return file.name ? `${base}/${file.name}` : base;
}

/** Picks the adapter for an entry on a target: `format` if given and valid, else the target's default. */
export function pickAdapter(target: Target, kind: Kind, format?: string): Adapter {
  const id = format ?? target.defaults[kind];
  if (!id) throw new Error(`${target.label} has no format for a ${kind}; try --target agents-md or paste`);
  const allowed = new Set([...Object.values(target.defaults), ...target.alternatives]);
  if (!allowed.has(id)) {
    throw new Error(
      `format "${id}" is not available for ${target.id}; choose one of: ${[...allowed].sort().join(', ')}`,
    );
  }
  const adapter = adapterById(id);
  if (!adapter) throw new Error(`unknown format "${id}"`);
  if (!adapter.kinds.includes(kind)) throw new Error(`format "${id}" does not support a ${kind}`);
  return adapter;
}

/** Compiles one entry for one target. Every output is self-contained (no reference to another entry). */
export function compileFor(
  entry: ResolvedEntry,
  targetId: string,
  opts: AdapterContext & { format?: string; scope?: Scope } = {},
): CompileResult {
  const target = targetById(targetId);
  if (!target) throw new Error(`unknown target "${targetId}"; one of: ${TARGETS.map((t) => t.id).join(', ')}`);
  const adapter = pickAdapter(target, entry.fm.kind, opts.format);
  const result = adapter.compile(entry, opts);
  const scope = opts.scope ?? 'project';
  return {
    target: target.id,
    adapter: adapter.id,
    files: result.files.map((f) => ({ ...f, adapter: adapter.id, path: installPath(target, f, scope) })),
    warnings: result.warnings,
  };
}
