/**
 * Lint rule ids are stable: agents and contributors are told exactly which rule to fix.
 * Numbering follows the design (section 8). Rules not implemented yet are listed so ids are never reused.
 */
export const RULES = {
  PS000: 'Frontmatter parses and matches schema/entry.schema.json; no computed fields authored',
  PS001: 'id matches the entry folder name; core-repo ids are unscoped',
  PS002: 'category matches the parent folder name',
  PS003: 'id is in ids.lock with the same kind, or is new',
  PS004: 'no id in ids.lock disappears without an alias successor',
  PS005: 'version bumped and changelog item added when content changes (not implemented yet)',
  PS006: 'facet values come from vocab/ (synonyms must be normalized)',
  PS007: 'at most 8 tags',
  PS008: 'an alias is never the entry’s own id, a live id, or another entry’s alias',
  PS009: 'kind matches the file name; entry folder holds only the allowed layout',
  PS010: 'every {{placeholder}} is a declared arg and every arg is used',
  PS011: 'includes resolve and partials have no include cycles',
  PS012: 'no positional placeholders ($1, $0, $ARGUMENTS)',
  PS020: 'required body sections for the kind are present',
  PS023: 'description is 40-200 characters, contains no markup, and is written in the third person',
  PS024: 'a persona has no task steps or output format',
  PS025: 'evals.yaml is valid and present (3+ cases) for experimental and stable entries',
  PS040: 'no zero-width, bidirectional or control characters',
  PS043: 'no download-and-execute patterns (curl | sh, iwr | iex)',
  PS045: 'text only: no scripts/ directory, allowed-tools, or shell injection',
} as const;

export type RuleId = keyof typeof RULES;
export type Severity = 'error' | 'warning' | 'info';

export interface Issue {
  rule: RuleId;
  severity: Severity;
  /** Repo-relative POSIX path. */
  file: string;
  message: string;
}
