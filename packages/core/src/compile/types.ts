import type { EntryFrontmatter, Kind, WorkflowStep } from '@hermes-hq/hodios-schema';

/** A workflow step with its file's text (includes expanded, args still `{{x}}`). */
export interface ResolvedStep extends WorkflowStep {
  text: string;
}

/**
 * A self-contained entry: frontmatter plus a body whose partials and entry includes are already expanded.
 * Arguments are still `{{x}}`; each adapter lowers them. This is also the catalog's body object, so a
 * client can compile any target from one fetched object without the repo, partials or other entries.
 */
export interface ResolvedEntry {
  schema: 1;
  fm: EntryFrontmatter;
  body: string;
  steps: ResolvedStep[];
}

/** Where an output goes. Each target maps a slot to a directory or file per scope (see targets.ts). */
export type Slot = 'skills' | 'commands' | 'prompts' | 'agents' | 'output-styles' | 'rules' | 'instructions' | 'memory';

export interface OutputFile {
  slot: Slot;
  /** Path under the slot's directory (`<id>/SKILL.md`, `<id>.md`). Empty for `memory`, which is one file. */
  name: string;
  content: string;
  /** `section`: merged into a shared file between `<!-- hodios:<id> -->` markers instead of written whole. */
  mode: 'file' | 'section';
}

export interface AdapterContext {
  /** Catalog CalVer stamped into metadata, when known. */
  catalog?: string;
  /** Style level (1-5) for style entries; default 3. */
  level?: number;
}

export interface AdapterResult {
  files: OutputFile[];
  warnings: string[];
}

export interface Adapter {
  id: string;
  label: string;
  kinds: readonly Kind[];
  compile(entry: ResolvedEntry, ctx: AdapterContext): AdapterResult;
}
