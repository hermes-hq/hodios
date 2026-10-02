import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  buildCatalog,
  buildVocab,
  detectStack,
  objectPath,
  parseQuery,
  parseShard,
  prefixLenFor,
  resolvePack,
  search,
  type CatalogRow,
  type ResolvedEntry,
  type ShardList,
  type VocabObject,
} from '@hermes-hq/hodios-core';

const sha256 = (s: string) => createHash('sha256').update(s, 'utf8').digest('hex');

function entry(id: string, extra: Partial<ResolvedEntry['fm']> = {}): ResolvedEntry {
  return {
    schema: 1,
    fm: {
      schema: 1,
      id,
      kind: 'prompt',
      title: id.replace(/-/g, ' '),
      description: `Does ${id} for tests.`,
      category: 'testing',
      version: '1.0.0',
      status: 'incubating',
      ...extra,
    },
    body: `Body of ${id}.`,
    steps: [],
  };
}

const vocab = buildVocab([
  {
    schema: 1,
    facet: 'stack',
    values: [
      { value: 'javascript', label: 'JavaScript', synonyms: ['js'], detect: { files: ['*.js'] } },
      { value: 'react', label: 'React', implies: ['javascript'], detect: { deps: ['npm:react'] } },
      { value: 'nextjs', label: 'Next.js', implies: ['react'], detect: { deps: ['npm:next'] } },
      { value: 'python', label: 'Python', detect: { files: ['pyproject.toml'] } },
    ],
  },
  { schema: 1, facet: 'category', values: [{ value: 'testing', label: 'Testing', domain: 'software-engineering' }] },
]);

const entries = [
  entry('fix-flaky-test', { tags: ['flaky-tests'], stage: ['verify'] }),
  entry('test-react-hooks', { stack: ['react'], stage: ['verify'] }),
  entry('test-python-cli', { stack: ['python'] }),
  entry('test-nextjs-pages', { stack: ['nextjs'], requires: ['shell'] }),
  entry('old-test-thing', { status: 'deprecated' }),
];
const built = buildCatalog({ entries, vocab, catalog: '2026.1002.0', sha256 });
const rows = built.rows;
const vocabObject = JSON.parse(built.objects.get(built.manifest.vocab) as string) as VocabObject;

describe('buildCatalog', () => {
  it('writes a manifest, one shard list, one shard and a body per entry', () => {
    expect(built.manifest.tiers.curated?.rows).toBe(5);
    const list = JSON.parse(built.objects.get(built.manifest.tiers.curated?.list as string) as string) as ShardList;
    expect(list.prefixLen).toBe(0);
    const shard = list.shards[''];
    expect(parseShard(built.objects.get(shard?.object as string) as string).map((r) => r.id)).toEqual(
      [...entries.map((e) => e.fm.id)].sort(),
    );
    for (const [ref, text] of built.objects) expect(ref).toBe(`sha256:${sha256(text)}`);
    expect(JSON.stringify(built.manifest).length).toBeLessThan(8192);
  });

  it('is deterministic', () => {
    const again = buildCatalog({ entries: [...entries].reverse(), vocab, catalog: '2026.1002.0', sha256 });
    expect(again.manifest).toEqual(built.manifest);
  });

  it('computes works_in from requires', () => {
    const plain = rows.find((r) => r.id === 'fix-flaky-test') as CatalogRow;
    const shell = rows.find((r) => r.id === 'test-nextjs-pages') as CatalogRow;
    expect(plain.works).toContain('chatgpt');
    expect(shell.works).not.toContain('chatgpt');
    expect(shell.works).toContain('codex');
    expect(plain.dom).toBe('software-engineering');
  });

  it('scales the shard prefix with the row count (design §12.4)', () => {
    expect([3, 4000, 10_000, 100_000, 1_000_000, 5_000_000].map(prefixLenFor)).toEqual([0, 0, 1, 2, 2, 3]);
    expect(objectPath('sha256:abcdef')).toBe('o/ab/abcdef');
  });
});

describe('search', () => {
  const ids = (q: string, opts = {}) => search(rows, q, { vocab: vocabObject, ...opts }).hits.map((h) => h.row.id);

  it('parses keys, OR within a key and AND across keys', () => {
    expect(parseQuery('flaky kind:prompt stack:react,vue')).toEqual({
      terms: ['flaky'],
      filters: { kind: ['prompt'], stack: ['react', 'vue'] },
    });
    expect(ids('stage:verify stack:react')).toEqual(['test-react-hooks']);
  });

  it('matches text on id, title, tags and description, every term', () => {
    expect(ids('flaky')).toEqual(['fix-flaky-test']);
    expect(ids('flaky python')).toEqual([]);
  });

  it('expands synonyms and implies (entries for nextjs match a react query)', () => {
    expect(ids('stack:react').sort()).toEqual(['test-nextjs-pages', 'test-react-hooks']);
    expect(ids('stack:js').sort()).toEqual(['test-nextjs-pages', 'test-react-hooks']);
  });

  it('ranks deprecated entries last', () => {
    expect(ids('').at(-1)).toBe('old-test-thing');
  });

  it('boosts what fits the profile and says why, without hiding the rest', () => {
    const result = search(rows, '', { vocab: vocabObject, profile: { stack: ['nextjs'], works: ['codex'] } });
    const order = result.hits.map((h) => h.row.id);
    expect(order.slice(0, 2).sort()).toEqual(['test-nextjs-pages', 'test-react-hooks']);
    expect(order).toHaveLength(5);
    expect(result.hits[0]?.reasons[0]).toMatch(/your project uses (Next\.js|React)/);
  });

  it('pages and caps candidates', () => {
    expect(search(rows, '', { limit: 2, offset: 2 }).hits).toHaveLength(2);
    expect(search(rows, '', { candidates: 3 }).capped).toBe(true);
  });
});

describe('detectStack', () => {
  it('finds stack values from file names and dependencies', () => {
    expect(
      detectStack({ files: ['/p/src/index.js', '/p/package.json'], deps: new Set(['npm:next']) }, vocabObject),
    ).toEqual(['javascript', 'nextjs']);
  });
});

describe('resolvePack', () => {
  it('selects by facets and ids, minus excludes', () => {
    const pack = resolvePack(
      {
        id: 'p',
        title: 'P',
        description: '',
        include: [{ stack: ['react'] }, { ids: ['test-python-cli'] }],
        exclude: { ids: ['test-react-hooks'] },
      },
      entries.map((e) => e.fm),
    );
    expect(pack.ids).toEqual(['test-python-cli']);
  });
});
