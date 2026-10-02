import ajv2020 from 'ajv/dist/2020.js';
import type { ErrorObject, ValidateFunction } from 'ajv';
import { entrySchema, evalsSchema, vocabSchema } from './schemas.js';
import type { EntryFrontmatter, EvalsFile, VocabFile } from './types.js';

// ajv ships CommonJS; its default export is reachable as `.default` in every module system.
const Ajv2020 = ajv2020.default;

const ajv = new Ajv2020({ allErrors: true, strict: true, strictRequired: false, allowUnionTypes: true });

export interface SchemaIssue {
  /** JSON pointer into the validated document, e.g. `/args/0/type`. Empty for the root. */
  path: string;
  message: string;
}

export interface SchemaResult<T> {
  valid: boolean;
  value?: T;
  issues: SchemaIssue[];
}

function toIssues(errors: ErrorObject[] | null | undefined): SchemaIssue[] {
  if (!errors) return [];
  const seen = new Set<string>();
  const issues: SchemaIssue[] = [];
  for (const e of errors) {
    // if/then/else wrappers repeat the real error; keep the specific one only.
    if (e.keyword === 'if') continue;
    let message = e.message ?? 'is invalid';
    if (e.keyword === 'additionalProperties') {
      message = `unknown field "${String(e.params['additionalProperty'])}"`;
    } else if (e.keyword === 'enum') {
      message = `must be one of: ${(e.params['allowedValues'] as unknown[]).join(', ')}`;
    } else if (e.keyword === 'not') {
      message = 'contains a field that is not allowed for this kind or status';
    }
    const key = `${e.instancePath}|${message}`;
    if (seen.has(key)) continue;
    seen.add(key);
    issues.push({ path: e.instancePath, message });
  }
  return issues;
}

function makeValidator<T>(validate: ValidateFunction) {
  return (data: unknown): SchemaResult<T> => {
    const valid = validate(data);
    return valid
      ? { valid: true, value: data as T, issues: [] }
      : { valid: false, issues: toIssues(validate.errors) };
  };
}

/** Validates entry frontmatter against entry.schema.json. */
export const validateEntry = makeValidator<EntryFrontmatter>(ajv.compile(entrySchema));

/** Validates the contents of an evals.yaml against evals.schema.json. */
export const validateEvals = makeValidator<EvalsFile>(ajv.compile(evalsSchema));

/** Validates a vocab/<facet>.yml against vocab.schema.json. */
export const validateVocab = makeValidator<VocabFile>(ajv.compile(vocabSchema));
