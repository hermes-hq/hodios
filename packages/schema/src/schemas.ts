import {
  ARG_TYPES,
  AUTHORSHIPS,
  CALVER_PATTERN,
  DATE_PATTERN,
  EFFORTS,
  GITHUB_LOGIN_PATTERN,
  ID_PATTERN,
  INTERACTIONS,
  INVOCATIONS,
  KINDS,
  LEVELS,
  MODEL_TIERS,
  OUTPUT_FORMATS,
  PERSONA_COLORS,
  PERSONA_TOOLS,
  REASONING,
  RISKS,
  SEMVER_PATTERN,
  SLUG_PATTERN,
  STATUSES,
  STEP_GATES,
} from './constants.js';

const SCHEMA_BASE = 'https://hermes-ide.com/prompts/schema/v1';

const slugList = (description: string) => ({
  type: 'array',
  description,
  items: { type: 'string', pattern: SLUG_PATTERN },
  uniqueItems: true,
});

const idRef = { type: 'string', pattern: ID_PATTERN };

/** JSON Schema (2020-12) for the YAML frontmatter of `library/<category>/<id>/<kind>.md`. */
export const entrySchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: `${SCHEMA_BASE}/entry.schema.json`,
  title: 'Hodios entry',
  description:
    'Frontmatter of a Hodios library entry (prompt, persona, workflow, rule or style). A superset of Agent Skills SKILL.md frontmatter.',
  type: 'object',
  required: ['schema', 'id', 'kind', 'title', 'description', 'category', 'version', 'status'],
  additionalProperties: false,
  properties: {
    schema: { const: 1, description: 'Entry format version. Always 1.' },
    id: {
      ...idRef,
      description: 'Globally unique, immutable id. Equals the entry folder name.',
    },
    kind: { enum: [...KINDS], description: 'Entry kind. Equals the entry file name.' },
    title: { type: 'string', minLength: 3, maxLength: 80 },
    description: {
      type: 'string',
      minLength: 1,
      maxLength: 1024,
      description: 'Third person; says what it does and when to use it (lint PS023: 40-200 chars).',
    },
    category: {
      type: 'string',
      pattern: SLUG_PATTERN,
      description: 'Primary category from vocab/category.yml. Equals the parent folder name.',
    },
    version: { type: 'string', pattern: SEMVER_PATTERN, description: 'Entry semver.' },
    status: { enum: [...STATUSES] },
    aliases: {
      type: 'array',
      items: idRef,
      uniqueItems: true,
      description: 'Old ids that resolve to this entry. Never the entry’s own id.',
    },
    replaced_by: { ...idRef, description: 'Successor id when status is deprecated.' },
    sunset: {
      type: 'string',
      pattern: CALVER_PATTERN,
      description: 'Catalog version after which a deprecated entry may be removed.',
    },
    stage: slugList('Lifecycle stages from vocab/stage.yml.'),
    stack: slugList('Technologies from vocab/stack.yml. Empty means stack-agnostic.'),
    requires: {
      type: 'array',
      description: 'Capabilities from vocab/requires.yml, or mcp:<server>.',
      items: { type: 'string', pattern: '^[a-z0-9]+(-[a-z0-9]+)*(:[a-z0-9][a-z0-9._-]*)?$' },
      uniqueItems: true,
    },
    inputs: slugList('Input types from vocab/inputs.yml.'),
    output: slugList('Output types from vocab/output.yml.'),
    tags: slugList('Free tags, normalized by vocab/tags.yml (lint PS007: at most 8).'),
    risk: { enum: [...RISKS] },
    invocation: { enum: [...INVOCATIONS] },
    effort: { enum: [...EFFORTS] },
    interaction: { enum: [...INTERACTIONS] },
    model_tier: { enum: [...MODEL_TIERS] },
    reasoning: { enum: [...REASONING] },
    level: { enum: [...LEVELS] },
    pairs_with: {
      type: 'object',
      description: 'UI hint only; never a runtime dependency.',
      additionalProperties: false,
      properties: {
        prompts: { type: 'array', items: idRef, uniqueItems: true },
        personas: { type: 'array', items: idRef, uniqueItems: true },
        workflows: { type: 'array', items: idRef, uniqueItems: true },
        rules: { type: 'array', items: idRef, uniqueItems: true },
        styles: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id'],
            additionalProperties: false,
            properties: { id: idRef, level: { type: 'integer', minimum: 1, maximum: 5 } },
          },
        },
      },
    },
    args: {
      type: 'array',
      description: 'Typed arguments, referenced in the body as {{name}}.',
      items: {
        type: 'object',
        required: ['name', 'description', 'type'],
        additionalProperties: false,
        properties: {
          name: { type: 'string', pattern: '^[a-z][a-z0-9_]*$' },
          description: { type: 'string', minLength: 1, maxLength: 300 },
          type: { enum: [...ARG_TYPES] },
          required: { type: 'boolean' },
          default: { type: ['string', 'number', 'boolean'] },
          enum: { type: 'array', items: { type: 'string' }, minItems: 2, uniqueItems: true },
        },
        if: { properties: { type: { const: 'enum' } } },
        then: { required: ['enum'] },
        else: { not: { required: ['enum'] } },
      },
    },
    output_contract: {
      type: 'object',
      required: ['format'],
      additionalProperties: false,
      properties: {
        format: { enum: [...OUTPUT_FORMATS] },
        sections: { type: 'array', items: { type: 'string', minLength: 1 }, uniqueItems: true },
        strict: { type: 'boolean' },
      },
    },
    authorship: { enum: [...AUTHORSHIPS] },
    authors: {
      type: 'array',
      items: { type: 'string', pattern: GITHUB_LOGIN_PATTERN },
      minItems: 1,
      uniqueItems: true,
      description: 'GitHub logins of the accountable humans.',
    },
    last_reviewed: { type: 'string', pattern: DATE_PATTERN },
    changelog: {
      type: 'array',
      items: {
        type: 'object',
        required: ['version', 'note'],
        additionalProperties: false,
        properties: {
          version: { type: 'string', pattern: SEMVER_PATTERN },
          note: { type: 'string', minLength: 1, maxLength: 300 },
        },
      },
    },
    targets: {
      type: 'object',
      description: 'Per-target escape hatch. Every use prints a compiler warning.',
      propertyNames: { pattern: SLUG_PATTERN },
      additionalProperties: { type: 'object' },
    },
    voice: { type: 'string', minLength: 1, maxLength: 200, description: 'Persona only.' },
    tools: {
      type: 'array',
      items: { enum: [...PERSONA_TOOLS] },
      uniqueItems: true,
      description: 'Persona only. Abstract tools, mapped per target.',
    },
    color: { enum: [...PERSONA_COLORS], description: 'Persona only.' },
    keep_coding_instructions: { type: 'boolean', description: 'Persona only.' },
    steps: {
      type: 'array',
      minItems: 1,
      description: 'Workflow only. Ordered, gated steps; each file lives in steps/.',
      items: {
        type: 'object',
        required: ['id', 'file', 'stage', 'gate'],
        additionalProperties: false,
        properties: {
          id: { type: 'string', pattern: SLUG_PATTERN },
          file: { type: 'string', pattern: '^steps/\\d{2}-[a-z0-9]+(-[a-z0-9]+)*\\.md$' },
          stage: { type: 'string', pattern: SLUG_PATTERN },
          gate: { enum: [...STEP_GATES] },
          artifact: { type: 'string', minLength: 1 },
        },
      },
    },
    applies_to: {
      type: 'array',
      items: { type: 'string', minLength: 1 },
      uniqueItems: true,
      description: 'Rule only. Glob patterns; omit for an always-on rule.',
    },
    levels: {
      type: 'array',
      minItems: 5,
      maxItems: 5,
      description: 'Style only. Exactly 5 levels, from lightest (1) to strongest (5).',
      items: {
        type: 'object',
        required: ['label', 'instruction'],
        additionalProperties: false,
        properties: {
          label: { type: 'string', minLength: 1, maxLength: 40 },
          instruction: { type: 'string', minLength: 1, maxLength: 600 },
        },
      },
    },
  },
  allOf: [
    {
      if: { properties: { kind: { const: 'workflow' } } },
      then: { required: ['steps'] },
      else: { not: { required: ['steps'] } },
    },
    {
      if: { properties: { kind: { const: 'style' } } },
      then: { required: ['levels'] },
      else: { not: { required: ['levels'] } },
    },
    {
      if: { properties: { kind: { const: 'rule' } } },
      else: { not: { required: ['applies_to'] } },
    },
    {
      if: { properties: { kind: { const: 'persona' } } },
      else: {
        not: {
          anyOf: [
            { required: ['voice'] },
            { required: ['tools'] },
            { required: ['color'] },
            { required: ['keep_coding_instructions'] },
          ],
        },
      },
    },
    {
      if: { properties: { status: { const: 'deprecated' } }, required: ['status'] },
      then: { required: ['replaced_by'] },
    },
    {
      if: { properties: { authorship: { enum: ['ai-assisted', 'ai-generated'] } }, required: ['authorship'] },
      then: { required: ['authors'] },
    },
  ],
} as const;

const modelRef = {
  type: 'object',
  required: ['family', 'tier'],
  additionalProperties: false,
  properties: {
    family: { type: 'string', pattern: SLUG_PATTERN },
    tier: { enum: [...MODEL_TIERS] },
  },
} as const;

export const ASSERTION_TYPES = [
  'contains',
  'icontains',
  'not-contains',
  'not-icontains',
  'contains-any',
  'contains-all',
  'equals',
  'starts-with',
  'regex',
  'not-regex',
  'is-json',
  'javascript',
  'llm-rubric',
  'similar',
] as const;

/** JSON Schema (2020-12) for `evals.yaml`, compiled to promptfoo by tools/evals. */
export const evalsSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: `${SCHEMA_BASE}/evals.schema.json`,
  title: 'Hodios entry evals',
  type: 'object',
  required: ['schema', 'baseline', 'cases'],
  additionalProperties: false,
  properties: {
    schema: { const: 1 },
    baseline: {
      type: 'string',
      minLength: 1,
      description: 'The naive prompt the entry must beat.',
    },
    providers: { type: 'array', items: modelRef, minItems: 1 },
    judge: modelRef,
    pass_threshold: { type: 'number', minimum: 0, maximum: 1 },
    min_lift_over_baseline: { type: 'number', minimum: 0, maximum: 1 },
    cases: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['name', 'vars', 'assert'],
        additionalProperties: false,
        properties: {
          name: { type: 'string', pattern: SLUG_PATTERN },
          description: { type: 'string' },
          vars: {
            type: 'object',
            additionalProperties: { type: ['string', 'number', 'boolean'] },
          },
          assert: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              required: ['type'],
              additionalProperties: false,
              properties: {
                type: { enum: [...ASSERTION_TYPES] },
                value: {},
                threshold: { type: 'number' },
              },
            },
          },
        },
      },
    },
  },
} as const;

/** JSON Schema (2020-12) for a controlled vocabulary file in vocab/. */
export const vocabSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: `${SCHEMA_BASE}/vocab.schema.json`,
  title: 'Hodios controlled vocabulary',
  type: 'object',
  required: ['schema', 'facet', 'values'],
  additionalProperties: false,
  properties: {
    schema: { const: 1 },
    facet: { type: 'string', pattern: SLUG_PATTERN },
    description: { type: 'string' },
    values: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['value', 'label'],
        additionalProperties: false,
        properties: {
          value: { type: 'string', pattern: SLUG_PATTERN },
          label: { type: 'string', minLength: 1 },
          description: { type: 'string' },
          synonyms: {
            type: 'array',
            items: { type: 'string', pattern: SLUG_PATTERN },
            uniqueItems: true,
          },
          deprecated_by: { type: ['string', 'null'], pattern: SLUG_PATTERN },
        },
      },
    },
  },
} as const;

/** Every published schema, keyed by its file name under schema/. */
export const schemaFiles = {
  'entry.schema.json': entrySchema,
  'evals.schema.json': evalsSchema,
  'vocab.schema.json': vocabSchema,
} as const;
