import { describe, expect, it } from 'vitest';
import type { EntryFrontmatter } from '@hermes-hq/hodios-schema';
import {
  ESSENTIALS_LIMITS,
  buildVocab,
  checkEveryday,
  parseEssentials,
  parseIntentVocab,
  parseQueries,
  suggestDepth,
} from '../src/index.js';
import {
  buildCatalog,
  commonness,
  compareStatic,
  depthRanker,
  routeQuery,
  search,
  type CatalogRow,
  type QueriesObject,
  type VocabObject,
} from '../src/catalog/index.js';
import type { ResolvedEntry } from '../src/compile/types.js';

const vocab = buildVocab([
  {
    schema: 1,
    facet: 'domain',
    values: [
      { value: 'travel', label: 'Travel' },
      { value: 'software-engineering', label: 'Software engineering' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    schema: 1,
    facet: 'category',
    values: [
      { value: 'trip-planning', label: 'Trip planning', domain: 'travel', synonyms: ['itinerary', 'vacation'] },
      { value: 'debugging', label: 'Debugging', domain: 'software-engineering' },
      { value: 'unsorted', label: 'Unsorted', domain: 'other' },
    ],
  },
  {
    schema: 1,
    facet: 'depth',
    values: [
      { value: 'basic', label: 'Start here' },
      { value: 'specific', label: 'Specific' },
      { value: 'advanced', label: 'Advanced' },
    ],
  },
]);

const fm = (id: string, extra: Partial<EntryFrontmatter> = {}): EntryFrontmatter => ({
  schema: 1,
  id,
  kind: 'prompt',
  title: id.replaceAll('-', ' '),
  description: `Description of ${id}, long enough for the lint rule.`,
  category: 'trip-planning',
  version: '1.0.0',
  status: 'incubating',
  ...extra,
});

const entries = [
  fm('plan-a-trip', { title: 'Plan a trip', depth: 'basic', level: 'beginner', role: ['individual'] }),
  fm('plan-road-trip', { title: 'Plan a road trip', depth: 'specific', level: 'beginner' }),
  fm('plan-points-redemption', { title: 'Plan a points redemption', depth: 'advanced', level: 'expert' }),
  fm('fix-a-bug', { title: 'Fix a bug', category: 'debugging', depth: 'basic' }),
  fm('debug-mobile-crash', { title: 'Debug a mobile crash', category: 'debugging', depth: 'specific' }),
];

const intentYaml = {
  intents: [
    { id: 'plan', label: 'Plan', hint: 'trips' },
    { id: 'fix', label: 'Fix' },
  ],
  topics: [
    { id: 'travel', label: 'Travel' },
    { id: 'software', label: 'Software' },
  ],
  categories: {
    'trip-planning': { intents: ['plan'], topic: 'travel' },
    debugging: { intents: ['fix'], topic: 'software' },
    unsorted: { intents: ['plan'], topic: 'travel' },
  },
};
const queriesYaml = [
  { to: 'plan-a-trip', phrases: ['trip', 'vacation'], refine: ['plan-road-trip'] },
  { to: 'plan-road-trip', phrases: ['road trip'], refine: ['plan-a-trip'] },
];

const rules = (issues: { rule: string; message: string }[]) => issues.map((i) => `${i.rule} ${i.message}`);

describe('essentials.yml (PS061)', () => {
  it('passes nested lists of first-depth entries', () => {
    const essentials = parseEssentials({ level1: ['plan-a-trip'], level2: ['plan-a-trip', 'fix-a-bug'] });
    expect(checkEveryday({ vocab, essentials }, entries)).toEqual([]);
  });

  it('enforces the caps, nesting, live ids and first depth', () => {
    const tooMany = Array.from({ length: ESSENTIALS_LIMITS.level1 + 1 }, (_, i) => `x-${i}`);
    const essentials = parseEssentials({ level1: [...tooMany, 'plan-road-trip'], level2: ['plan-road-trip'] });
    const found = rules(checkEveryday({ vocab, essentials }, entries)).join('\n');
    expect(found).toContain('the cap is 24. To add one, remove one');
    expect(found).toContain('"x-0" is not an entry');
    expect(found).toContain('level1 id "x-0" must also be in level2');
    expect(found).toContain('"plan-road-trip" has depth "specific"; essentials are "basic" entries only');
  });
});

describe('vocab/intent.yml (PS062)', () => {
  it('maps every live category', () => {
    expect(checkEveryday({ vocab, intent: parseIntentVocab(intentYaml) }, entries)).toEqual([]);
    const missing = { ...intentYaml, categories: { debugging: { intents: ['fix', 'plan', 'plan'], topic: 'x' } } };
    const found = rules(checkEveryday({ vocab, intent: parseIntentVocab(missing) }, entries)).join('\n');
    expect(found).toContain('category "trip-planning" has no intents and topic');
    expect(found).toContain('debugging: list 1–2 intents');
    expect(found).toContain('debugging: unknown topic "x"');
  });
});

describe('queries.yml (PS063)', () => {
  it('routes each phrase to one live entry', () => {
    expect(checkEveryday({ vocab, queries: parseQueries(queriesYaml) }, entries)).toEqual([]);
    const bad = parseQueries([...queriesYaml, { to: 'nope', phrases: ['Trip'], refine: ['nope-2'] }]);
    const found = rules(checkEveryday({ vocab, queries: bad }, entries)).join('\n');
    expect(found).toContain('to: "nope" is not an entry');
    expect(found).toContain('phrase "Trip" must be lower case');
    expect(found).toContain('phrase "Trip" routes to both "plan-a-trip" and "nope"');
    expect(found).toContain('nope refine: "nope-2" is not an entry');
  });
});

describe('depth (PS064)', () => {
  it('requires a first-depth prompt or workflow in every live category that has entries', () => {
    expect(checkEveryday({ vocab }, entries)).toEqual([]);
    const withoutDoor = entries.filter((e) => e.id !== 'fix-a-bug');
    expect(rules(checkEveryday({ vocab }, withoutDoor))).toEqual([
      'PS064 category "debugging" has no "basic" prompt or workflow: give it a front door (depth: basic)',
    ]);
  });

  it('suggests a depth from the id, the category words, the level and the stack', () => {
    expect(suggestDepth(fm('plan-itinerary'), vocab)).toBe('basic');
    expect(suggestDepth(fm('trip-planning-track', { kind: 'workflow' }), vocab)).toBe('basic');
    expect(suggestDepth(fm('travel-planner', { kind: 'persona' }), vocab)).toBe('basic');
    expect(suggestDepth(fm('plan-road-trip'), vocab)).toBe('specific');
    expect(suggestDepth(fm('plan-itinerary', { stack: ['excel'] }), vocab)).toBe('specific');
    expect(suggestDepth(fm('plan-itinerary', { level: 'expert' }), vocab)).toBe('advanced');
  });
});

describe('catalog rows and ranking (format 1.1)', () => {
  const resolved = (f: EntryFrontmatter): ResolvedEntry =>
    ({ fm: f, body: 'Body.', steps: [], files: {} }) as unknown as ResolvedEntry;
  const built = buildCatalog({
    entries: entries.map(resolved),
    vocab,
    catalog: '2026.1014.0',
    sha256: (s) => String(s.length).padStart(64, '0') + s.length.toString(16),
    essentials: parseEssentials({ level1: ['plan-a-trip'], level2: ['plan-a-trip', 'fix-a-bug'] }).value,
    intent: parseIntentVocab(intentYaml).value,
    queries: parseQueries(queriesYaml).value,
  });
  const row = (id: string) => built.rows.find((r) => r.id === id) as CatalogRow;
  const vocabObject = JSON.parse(built.objects.get(built.manifest.vocab) as string) as VocabObject;
  const queries = (JSON.parse(built.objects.get(built.manifest.queries as string) as string) as QueriesObject).routes;

  it('fills ess, dep, int, top, syn, adv and q', () => {
    expect(row('plan-a-trip')).toMatchObject({
      ess: 2,
      dep: 'basic',
      int: ['plan'],
      top: 'travel',
      q: 100,
      adv: [],
    });
    expect(row('plan-a-trip').syn).toEqual(['trip planning', 'itinerary', 'vacation', 'trip']);
    expect(row('fix-a-bug')).toMatchObject({ ess: 1, q: 80, top: 'software' });
    expect(row('plan-road-trip').ess).toBe(0);
    expect(row('plan-road-trip').q).toBeLessThan(80);
    expect(built.manifest.format).toBe('1.1');
    expect(vocabObject.depth).toEqual({
      values: [
        { id: 'basic', label: 'Start here' },
        { id: 'specific', label: 'Specific' },
        { id: 'advanced', label: 'Advanced' },
      ],
      default: 'specific',
    });
    expect(vocabObject.intent?.intents.map((i) => i.id)).toEqual(['plan', 'fix']);
    expect(vocabObject.queries).toEqual(queries);
  });

  it('computes commonness deterministically from the documented signals', () => {
    const levels = ['basic', 'specific', 'advanced'];
    const general = fm('plan-a-trip', { title: 'Plan a trip', level: 'beginner', role: ['individual'] });
    const niche = fm('plan-x', {
      title: 'Plan a trip for a sporting event in winter',
      level: 'expert',
      stack: ['excel'],
    });
    expect(commonness(general, { tier: 'curated', depth: 'basic', depthLevels: levels })).toBe(76);
    expect(commonness(niche, { tier: 'verified', depth: 'advanced', depthLevels: levels })).toBe(17);
    expect(commonness(general, { tier: 'verified', ess: 2 })).toBe(100);
    expect(commonness({ ...general, status: 'deprecated' }, { tier: 'curated', ess: 2 })).toBe(0);
  });

  it('orders statically by essentials, then depth in vocab order, then q, and the id last', () => {
    const rank = depthRanker(vocabObject);
    const sorted = [...built.rows].sort((a, b) => compareStatic(a, b, rank)).map((r) => r.id);
    expect(sorted.slice(0, 2)).toEqual(['plan-a-trip', 'fix-a-bug']);
    expect(sorted.at(-1)).toBe('plan-points-redemption');
    expect(rank(undefined)).toBe(1);
  });

  it('routes the longest phrase, drops stop words and reports leftover words', () => {
    expect(routeQuery('a road trip with kids', queries)?.to).toBe('plan-road-trip');
    expect(routeQuery('cheap vacations', queries)?.to).toBe('plan-a-trip');
    const result = search(built.rows, 'help me plan a 5-day trip to Lisbon', { vocab: vocabObject, queries });
    expect(result.hits.map((h) => h.row.id).slice(0, 2)).toEqual(['plan-a-trip', 'plan-road-trip']);
    expect(result.leftover).toEqual(['5-day', 'Lisbon']);
  });

  it('matches the category label and synonyms through syn', () => {
    const result = search(built.rows, 'itinerary', { vocab: vocabObject });
    expect(result.hits[0]?.row.id).toBe('plan-a-trip');
    expect(result.hits.map((h) => h.row.cat).every((c) => c === 'trip-planning')).toBe(true);
  });

  it('filters by depth, intent and topic', () => {
    const ids = (q: string) => search(built.rows, q, { vocab: vocabObject }).hits.map((h) => h.row.id);
    expect(ids('topic:software')).toEqual(['fix-a-bug', 'debug-mobile-crash']);
    expect(ids('intent:plan depth:basic')).toEqual(['plan-a-trip']);
  });
});
