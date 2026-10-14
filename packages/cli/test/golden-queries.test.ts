import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parseYamlDocument } from '@hermes-hq/hodios-core';
import { buildCatalog, search, type QueriesObject, type VocabObject } from '@hermes-hq/hodios-core/catalog';
import { loadLibrary } from '../src/library.js';

/**
 * test/golden-queries.yml: plain queries people type, run through the core ranking over the real catalog of this
 * checkout. Fails below 90% top-3, and when any category's first entry is not a "Start here" (first-depth) entry.
 */
const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));
const TOP3_MIN = 0.9;

interface Golden {
  queries: { q: string; expect: string[] }[];
  categories: string[];
}

const golden = parseYamlDocument(readFileSync(`${repoRoot}test/golden-queries.yml`, 'utf8')).data as Golden;
const lib = loadLibrary(repoRoot);
const built = buildCatalog({
  entries: lib.entries,
  vocab: lib.vocab,
  catalog: '2026.1014.0',
  sha256: (s) => createHash('sha256').update(s, 'utf8').digest('hex'),
  tierOf: (e) => (lib.curated.has(e.fm.id) ? 'curated' : 'verified'),
  essentials: lib.essentials,
  intent: lib.intent,
  queries: lib.queries,
});
const vocab = JSON.parse(built.objects.get(built.manifest.vocab) as string) as VocabObject;
const queries = (JSON.parse(built.objects.get(built.manifest.queries as string) as string) as QueriesObject).routes;
const ids = new Set(built.rows.map((r) => r.id));

describe('test/golden-queries.yml', () => {
  it('names only live entries', () => {
    const unknown = golden.queries.flatMap((g) => g.expect.filter((id) => !ids.has(id)));
    expect(unknown).toEqual([]);
    expect(golden.queries.every((g) => g.expect.length > 0)).toBe(true);
  });

  it(`puts an expected entry in the top 3 for at least ${TOP3_MIN * 100}% of the queries`, () => {
    const misses: string[] = [];
    for (const g of golden.queries) {
      const top = search(built.rows, g.q, { vocab, queries, limit: 3 }).hits.map((h) => h.row.id);
      if (!top.some((id) => g.expect.includes(id)))
        misses.push(`${g.q} -> ${top.join(', ')} (want ${g.expect.join(' | ')})`);
    }
    const rate = 1 - misses.length / golden.queries.length;
    expect(rate, `top-3 ${(rate * 100).toFixed(1)}%; misses:\n${misses.join('\n')}`).toBeGreaterThanOrEqual(TOP3_MIN);
  });

  it('shows a "Start here" entry first in every category', () => {
    const first = vocab.depth?.values[0]?.id;
    expect(first).toBeTruthy();
    const categories = [...new Set([...golden.categories, ...built.rows.map((r) => r.cat)])].filter(
      (c) => c !== 'unsorted',
    );
    const wrong = categories.filter(
      (cat) => search(built.rows, `cat:${cat}`, { vocab, limit: 1 }).hits[0]?.row.dep !== first,
    );
    expect(wrong).toEqual([]);
  });

  it('routes a query with extra words to its front door and reports the leftover words', () => {
    const result = search(built.rows, 'plan a 5-day trip to Lisbon', { vocab, queries, limit: 3 });
    expect(result.hits[0]?.row.id).toBe('plan-a-trip');
    expect(result.route?.to).toBe('plan-a-trip');
    expect(result.leftover).toContain('Lisbon');
  });
});
