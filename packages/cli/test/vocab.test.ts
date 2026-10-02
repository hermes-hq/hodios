import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parseYamlDocument } from '@hermes-hq/hodios-core';
import {
  EFFORTS,
  FACET_LIMITS,
  INTERACTIONS,
  INVOCATIONS,
  LEVELS,
  MODEL_TIERS,
  REASONING,
  RISKS,
} from '@hermes-hq/hodios-schema';
import { loadRepo } from '../src/load.js';

const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));

interface FacetRow {
  name: string;
  max: number | null;
}
interface Registry {
  version: string;
  facets: FacetRow[];
  enums: Record<string, { value: string }[]>;
}

const registry = parseYamlDocument(readFileSync(`${repoRoot}vocab/facets.yml`, 'utf8')).data as Registry;

describe('vocab/facets.yml', () => {
  it('has a semver version', () => {
    expect(registry.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('lists the schema enums exactly', () => {
    const expected: Record<string, readonly string[]> = {
      risk: RISKS,
      model_tier: MODEL_TIERS,
      reasoning: REASONING,
      level: LEVELS,
      effort: EFFORTS,
      interaction: INTERACTIONS,
      invocation: INVOCATIONS,
    };
    for (const [name, values] of Object.entries(expected)) {
      expect(registry.enums[name]?.map((v) => v.value)).toEqual([...values]);
    }
  });

  it('mirrors FACET_LIMITS', () => {
    for (const [name, max] of Object.entries(FACET_LIMITS)) {
      expect(registry.facets.find((f) => f.name === name)?.max).toBe(max);
    }
  });
});

describe('vocab/ in this repository', () => {
  it('loads with no problems', () => {
    const repo = loadRepo(repoRoot);
    expect(repo.issues.filter((i) => i.file.startsWith('vocab/'))).toEqual([]);
    for (const facet of ['domain', 'category', 'role', 'subject', 'advice-risk', 'subcategory']) {
      expect(repo.context.vocab.has(facet)).toBe(true);
    }
  });

  it('gives every live category a domain', () => {
    const categories = loadRepo(repoRoot).context.vocab.get('category');
    for (const [value, meta] of categories?.meta ?? []) {
      expect(meta.domain, value).toBeTruthy();
    }
  });
});
