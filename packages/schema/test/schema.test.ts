import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { schemaFiles, validateEntry, validateEvals, validateVocab } from '../src/index.js';

const base = {
  schema: 1,
  id: 'write-unit-tests',
  kind: 'prompt',
  title: 'Write unit tests',
  description: 'Writes focused unit tests for a function or module. Use when adding coverage to untested code.',
  category: 'testing',
  version: '1.0.0',
  status: 'incubating',
};

describe('schema/ JSON files', () => {
  it.each(Object.entries(schemaFiles))('%s is in sync with the TypeScript source (run npm run gen:schema)', (name, schema) => {
    const onDisk = JSON.parse(readFileSync(new URL(`../../../schema/${name}`, import.meta.url), 'utf8'));
    expect(onDisk).toEqual(JSON.parse(JSON.stringify(schema)));
  });
});

describe('validateEntry', () => {
  it('accepts a minimal entry', () => {
    expect(validateEntry(base)).toMatchObject({ valid: true, issues: [] });
  });

  it('rejects unknown and computed fields', () => {
    const result = validateEntry({ ...base, works_in: ['codex'] });
    expect(result.valid).toBe(false);
    expect(result.issues).toContainEqual({ path: '', message: 'unknown field "works_in"' });
  });

  it('rejects allowed-tools (entries are text only)', () => {
    expect(validateEntry({ ...base, 'allowed-tools': ['Bash'] }).valid).toBe(false);
  });

  it.each(['Write-Tests', 'write_tests', '-tests', 'tests-', 'a'.repeat(65), '@/x', '@bad_owner/x'])(
    'rejects id %s',
    (id) => {
      expect(validateEntry({ ...base, id }).valid).toBe(false);
    },
  );

  it.each(['a', 'write-unit-tests', 'a'.repeat(64), '@acme/review-terraform-plan', '@a-b/x'])('accepts id %s', (id) => {
    expect(validateEntry({ ...base, id }).valid).toBe(true);
  });

  it('requires a non-empty list of values for enum args', () => {
    const arg = { name: 'focus', description: 'Focus area.', type: 'enum' };
    expect(validateEntry({ ...base, args: [arg] }).valid).toBe(false);
    expect(validateEntry({ ...base, args: [{ ...arg, enum: ['a', 'b'] }] }).valid).toBe(true);
    expect(validateEntry({ ...base, args: [{ ...arg, type: 'text', enum: ['a', 'b'] }] }).valid).toBe(false);
  });

  it('requires steps on workflows and forbids them elsewhere', () => {
    const steps = [{ id: 'plan', file: 'steps/01-plan.md', stage: 'plan', gate: 'approve' }];
    expect(validateEntry({ ...base, kind: 'workflow' }).valid).toBe(false);
    expect(validateEntry({ ...base, kind: 'workflow', steps }).valid).toBe(true);
    expect(validateEntry({ ...base, steps }).valid).toBe(false);
  });

  it('requires exactly five levels on styles', () => {
    const level = { label: 'Light', instruction: 'Trim filler.' };
    expect(validateEntry({ ...base, kind: 'style', levels: [level, level, level, level] }).valid).toBe(false);
    expect(validateEntry({ ...base, kind: 'style', levels: [level, level, level, level, level] }).valid).toBe(true);
  });

  it('keeps persona fields on personas', () => {
    expect(validateEntry({ ...base, voice: 'calm' }).valid).toBe(false);
    expect(validateEntry({ ...base, kind: 'persona', voice: 'calm', tools: ['read'] }).valid).toBe(true);
  });

  it('requires replaced_by when deprecated and authors for AI-written entries', () => {
    expect(validateEntry({ ...base, status: 'deprecated' }).valid).toBe(false);
    expect(validateEntry({ ...base, status: 'deprecated', replaced_by: 'write-tests' }).valid).toBe(true);
    expect(validateEntry({ ...base, authorship: 'ai-generated' }).valid).toBe(false);
    expect(validateEntry({ ...base, authorship: 'ai-generated', authors: ['octocat'] }).valid).toBe(true);
  });

  it('accepts only CalVer sunsets', () => {
    expect(validateEntry({ ...base, sunset: '2026.1002.0' }).valid).toBe(true);
    expect(validateEntry({ ...base, sunset: '2026.10.2' }).valid).toBe(false);
  });
});

describe('validateEvals', () => {
  it('accepts a valid file and rejects unknown assertion types', () => {
    const evals = {
      schema: 1,
      baseline: 'Write tests for {{code}}',
      cases: [{ name: 'happy', vars: { code: 'x' }, assert: [{ type: 'contains', value: 'test' }] }],
    };
    expect(validateEvals(evals).valid).toBe(true);
    const bad = { ...evals, cases: [{ ...evals.cases[0], assert: [{ type: 'magic' }] }] };
    expect(validateEvals(bad).valid).toBe(false);
  });
});

describe('validateVocab', () => {
  it('accepts a facet file and rejects non-kebab values', () => {
    const vocab = { schema: 1, facet: 'stage', values: [{ value: 'plan', label: 'Plan' }] };
    expect(validateVocab(vocab).valid).toBe(true);
    expect(validateVocab({ ...vocab, values: [{ value: 'Plan', label: 'Plan' }] }).valid).toBe(false);
  });
});
