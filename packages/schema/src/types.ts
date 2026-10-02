import type {
  ArgType,
  Authorship,
  Effort,
  Interaction,
  Invocation,
  Kind,
  Layout,
  Level,
  ModelTier,
  OutputFormat,
  PersonaColor,
  PersonaTool,
  Reasoning,
  Risk,
  Status,
  StepGate,
} from './constants.js';

export interface EntryArg {
  name: string;
  description: string;
  type: ArgType;
  required?: boolean;
  default?: string | number | boolean;
  enum?: string[];
}

export interface StyleRef {
  id: string;
  level?: number;
}

export interface PairsWith {
  prompts?: string[];
  personas?: string[];
  workflows?: string[];
  rules?: string[];
  styles?: StyleRef[];
}

export interface OutputContract {
  format: OutputFormat;
  sections?: string[];
  strict?: boolean;
}

export interface ChangelogItem {
  version: string;
  note: string;
}

export interface WorkflowStep {
  id: string;
  file: string;
  stage: string;
  gate: StepGate;
  artifact?: string;
}

export interface StyleLevel {
  label: string;
  instruction: string;
}

/** Frontmatter of a library entry. Mirrors entry.schema.json. */
export interface EntryFrontmatter {
  schema: 1;
  id: string;
  kind: Kind;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  proposed_category?: string;
  version: string;
  status: Status;
  aliases?: string[];
  replaced_by?: string;
  sunset?: string;
  stage?: string[];
  stack?: string[];
  role?: string[];
  subject?: string[];
  advice_risk?: string[];
  lang?: string;
  requires?: string[];
  inputs?: string[];
  output?: string[];
  tags?: string[];
  risk?: Risk;
  invocation?: Invocation;
  effort?: Effort;
  interaction?: Interaction;
  model_tier?: ModelTier;
  reasoning?: Reasoning;
  level?: Level;
  pairs_with?: PairsWith;
  args?: EntryArg[];
  output_contract?: OutputContract;
  authorship?: Authorship;
  authors?: string[];
  last_reviewed?: string;
  changelog?: ChangelogItem[];
  targets?: Record<string, Record<string, unknown>>;
  /** persona */
  voice?: string;
  tools?: PersonaTool[];
  color?: PersonaColor;
  keep_coding_instructions?: boolean;
  /** workflow */
  steps?: WorkflowStep[];
  /** rule */
  applies_to?: string[];
  /** style */
  levels?: StyleLevel[];
}

export interface EvalModelRef {
  family: string;
  tier: ModelTier;
}

export interface EvalAssertion {
  type: string;
  value?: unknown;
  threshold?: number;
}

export interface EvalCase {
  name: string;
  description?: string;
  vars: Record<string, string | number | boolean>;
  assert: EvalAssertion[];
}

/** Contents of an entry's evals.yaml. Mirrors evals.schema.json. */
export interface EvalsFile {
  schema: 1;
  baseline: string;
  providers?: EvalModelRef[];
  judge?: EvalModelRef;
  pass_threshold?: number;
  min_lift_over_baseline?: number;
  cases: EvalCase[];
}

export interface VocabValue {
  value: string;
  label: string;
  description?: string;
  synonyms?: string[];
  deprecated_by?: string | null;
  /** category: owning domain. */
  domain?: string;
  scope_note?: string;
  examples?: string[];
  /** category: advice-risk values every entry in it must declare. */
  advice_risk?: string[];
  /** category: path layout. */
  layout?: Layout;
  /** subcategory: parent category. */
  parent?: string;
  /** stack, subject: broader values this one implies. */
  implies?: string[];
  type?: string;
  /** stack: on-device detection hints. */
  detect?: { files?: string[]; deps?: string[] };
  /** role: picker group. */
  group?: string;
  onet?: string;
  /** advice-risk: guardrail partials an entry with this value must include. */
  partials?: string[];
}

/** Contents of a vocab/<facet>.yml file. Mirrors vocab.schema.json. */
export interface VocabFile {
  schema: 1;
  facet: string;
  description?: string;
  values: VocabValue[];
}
