import type { VocabObject } from './types.js';

/** What the caller found in a project (the core has no file system): base names and `<ecosystem>:<package>` deps. */
export interface ProjectScan {
  files: readonly string[];
  deps: ReadonlySet<string>;
}

function globMatch(pattern: string, name: string): boolean {
  if (!pattern.includes('*')) return pattern === name;
  const re = new RegExp(`^${pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`);
  return re.test(name);
}

/**
 * Detects stack values from `detect` hints in vocab/stack.yml (TAXONOMY.md §8). Runs on the device; nothing leaves it.
 * Returns values sorted for stable output.
 */
export function detectStack(scan: ProjectScan, vocab: VocabObject): string[] {
  const names = new Set(scan.files.map((f) => f.split('/').pop() ?? f));
  const found: string[] = [];
  for (const [value, hints] of Object.entries(vocab.detect)) {
    const byDep = (hints.deps ?? []).some((d) => scan.deps.has(d));
    const byFile = (hints.files ?? []).some((p) => [...names].some((n) => globMatch(p, n)));
    if (byDep || byFile) found.push(value);
  }
  return found.sort();
}

/** Config folders and files that reveal an installed agent in a project (target ids). */
export const AGENT_MARKERS: Record<string, string[]> = {
  'claude-code': ['.claude', 'CLAUDE.md'],
  codex: ['.codex', '.agents'],
  cursor: ['.cursor', '.cursorrules'],
  copilot: ['.github/copilot-instructions.md', '.github/prompts', '.github/agents', '.github/instructions'],
  'gemini-cli': ['.gemini', 'GEMINI.md'],
  opencode: ['.opencode', 'opencode.json'],
  windsurf: ['.windsurf'],
  continue: ['.continue'],
};

/** Agent CLIs on PATH -> target ids. */
export const AGENT_BINARIES: Record<string, string> = {
  claude: 'claude-code',
  codex: 'codex',
  'cursor-agent': 'cursor',
  copilot: 'copilot',
  gemini: 'gemini-cli',
  opencode: 'opencode',
};
