/** Version of the entry format. Bumped only on a breaking change (new /v2/ assets). */
export const SCHEMA_VERSION = 1 as const;

/** Entry kinds. The kind is also the entry's file name: `library/<category>/<id>/<kind>.md`. */
export const KINDS = ['prompt', 'persona', 'workflow', 'rule', 'style'] as const;
export type Kind = (typeof KINDS)[number];

export const STATUSES = ['incubating', 'experimental', 'stable', 'deprecated'] as const;
export type Status = (typeof STATUSES)[number];

/** Statuses that require an `evals.yaml` next to the entry. */
export const STATUSES_REQUIRING_EVALS: readonly Status[] = ['experimental', 'stable'];

export const RISKS = ['read-only', 'edits-files', 'runs-commands', 'network'] as const;
export type Risk = (typeof RISKS)[number];

export const INVOCATIONS = ['user', 'model', 'both'] as const;
export type Invocation = (typeof INVOCATIONS)[number];

export const EFFORTS = ['quick', 'standard', 'deep'] as const;
export type Effort = (typeof EFFORTS)[number];

export const INTERACTIONS = ['one-shot', 'interactive', 'autonomous'] as const;
export type Interaction = (typeof INTERACTIONS)[number];

export const MODEL_TIERS = ['small', 'mid', 'frontier'] as const;
export type ModelTier = (typeof MODEL_TIERS)[number];

export const REASONING = ['off', 'optional', 'recommended'] as const;
export type Reasoning = (typeof REASONING)[number];

export const LEVELS = ['beginner', 'intermediate', 'expert'] as const;
export type Level = (typeof LEVELS)[number];

export const AUTHORSHIPS = ['human', 'ai-assisted', 'ai-generated'] as const;
export type Authorship = (typeof AUTHORSHIPS)[number];

export const ARG_TYPES = ['string', 'text', 'enum', 'number', 'boolean'] as const;
export type ArgType = (typeof ARG_TYPES)[number];

export const OUTPUT_FORMATS = ['markdown', 'json', 'yaml', 'text', 'diff'] as const;
export type OutputFormat = (typeof OUTPUT_FORMATS)[number];

export const STEP_GATES = ['approve', 'none'] as const;
export type StepGate = (typeof STEP_GATES)[number];

/** Abstract tool names for personas; adapters map them to each target's tool names. */
export const PERSONA_TOOLS = ['read', 'search', 'edit', 'write', 'shell', 'web', 'git'] as const;
export type PersonaTool = (typeof PERSONA_TOOLS)[number];

export const PERSONA_COLORS = [
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'purple',
  'pink',
] as const;
export type PersonaColor = (typeof PERSONA_COLORS)[number];

/** Fields computed by the build. Authoring any of them is an error. */
export const COMPUTED_FIELDS = [
  'works_in',
  'packs',
  'quality',
  'tested_on',
  'hash',
  'created',
  'updated',
  'license',
] as const;

/** Fields forbidden in every tier: entries are text only. */
export const FORBIDDEN_FIELDS = ['allowed-tools', 'allowed_tools', 'scripts'] as const;

/**
 * Entry id grammar, frozen in schema v1.
 * Optional `@owner/` scope (GitHub login rules, community registry only), then a kebab-case name of at most 64 chars.
 */
export const ID_PATTERN =
  '^(@[a-z0-9](-?[a-z0-9]){0,38}/)?(?=[a-z0-9-]{1,64}$)[a-z0-9]+(-[a-z0-9]+)*$';

/** Kebab-case token used for categories, facet values, tags and step ids. */
export const SLUG_PATTERN = '^[a-z0-9]+(-[a-z0-9]+)*$';

/** Semantic version (no pre-release or build metadata for entries). */
export const SEMVER_PATTERN = '^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)$';

/** Catalog CalVer: YYYY.MDD.PATCH, where MDD = month * 100 + day. */
export const CALVER_PATTERN = '^20\\d{2}\\.([1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])\\.(0|[1-9]\\d*)$';

/** GitHub login. */
export const GITHUB_LOGIN_PATTERN = '^[A-Za-z0-9](-?[A-Za-z0-9]){0,38}$';

export const DATE_PATTERN = '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$';
