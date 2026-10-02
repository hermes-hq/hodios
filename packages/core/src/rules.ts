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
  PS050: 'vocabularies are consistent with each other (domains, parents, advice-risk partials, disjoint ids)',
  PS051:
    'entry path is library/<domain>/<category>/[<subcategory>/]<id>/ as the vocab says (legacy 2-level path warns)',
  PS052: 'an entry in a sensitive category declares the category’s advice_risk values',
  PS053: 'an entry with advice_risk includes the guardrail partials and is never model-invoked',
  PS054: 'holding area: unsorted entries name a proposed_category; capped at 50; graduate at 5 per proposal',
  PS055: 'size limits: at most 1,000 entries per category folder and 40 categories per domain',
  PS056: 'risk is at least what requires implies (file-write, shell, web)',
  PS057: 'a tag does not duplicate a category, stack, subject, role or stage value',
  PS058: 'stack and subject do not list a value together with one it implies',
  PS059: 'facet cardinality stays within vocab/facets.yml limits',
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
