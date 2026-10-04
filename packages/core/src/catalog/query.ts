import { TIER_ORDER, type CatalogRow, type VocabObject } from './types.js';

/** Query keys (TAXONOMY.md §6) -> row field, and the vocab facet whose synonyms/implies apply. */
const KEYS: Record<string, { field: keyof CatalogRow; facet?: string }> = {
  kind: { field: 'kind' },
  cat: { field: 'cat', facet: 'category' },
  category: { field: 'cat', facet: 'category' },
  domain: { field: 'dom', facet: 'domain' },
  sub: { field: 'sub', facet: 'subcategory' },
  stage: { field: 'stage', facet: 'stage' },
  role: { field: 'role', facet: 'role' },
  stack: { field: 'stack', facet: 'stack' },
  subject: { field: 'subject', facet: 'subject' },
  works: { field: 'works' },
  in: { field: 'in', facet: 'inputs' },
  out: { field: 'out', facet: 'output' },
  risk: { field: 'risk' },
  tag: { field: 'tags', facet: 'tags' },
  tier: { field: 'tier' },
  status: { field: 'status' },
  level: { field: 'level' },
  lang: { field: 'lang' },
};

export const QUERY_KEYS = Object.keys(KEYS);

const WORKS_ALIASES: Record<string, string> = {
  claude: 'claude-code',
  gemini: 'gemini-cli',
  'github-copilot': 'copilot',
};

export interface ParsedQuery {
  terms: string[];
  /** Query key -> values (OR'd); keys are AND'd. */
  filters: Record<string, string[]>;
}

/** Parses `flaky kind:prompt cat:testing stack:react,vue`. Unknown `key:` tokens are treated as text. */
export function parseQuery(q: string): ParsedQuery {
  const terms: string[] = [];
  const filters: Record<string, string[]> = {};
  for (const token of q.trim().split(/\s+/).filter(Boolean)) {
    const m = /^([a-z]+):(.+)$/.exec(token);
    if (m && m[1] && m[2] && KEYS[m[1]]) {
      const key = m[1] === 'category' ? 'cat' : m[1];
      filters[key] = [
        ...(filters[key] ?? []),
        ...m[2]
          .split(',')
          .filter(Boolean)
          .map((v) => v.toLowerCase()),
      ];
    } else terms.push(token.toLowerCase());
  }
  return { terms, filters };
}

/** Values that imply `value`, transitively (entries tagged `nextjs` match a `stack:react` query). */
function impliedFrom(vocab: VocabObject | undefined, facet: string, value: string): Set<string> {
  const out = new Set<string>([value]);
  const implies = vocab?.facets[facet]?.implies ?? {};
  let grew = true;
  while (grew) {
    grew = false;
    for (const [from, targets] of Object.entries(implies)) {
      if (!out.has(from) && targets.some((t) => out.has(t))) {
        out.add(from);
        grew = true;
      }
    }
  }
  return out;
}

/** Values `value` implies, transitively (a project on `nextjs` also uses `react` and `javascript`). */
export function impliesOf(vocab: VocabObject | undefined, facet: string, value: string): Set<string> {
  const out = new Set<string>([value]);
  const implies = vocab?.facets[facet]?.implies ?? {};
  const queue = [value];
  while (queue.length) {
    for (const next of implies[queue.shift() as string] ?? []) {
      if (!out.has(next)) {
        out.add(next);
        queue.push(next);
      }
    }
  }
  return out;
}

function canonical(vocab: VocabObject | undefined, facet: string | undefined, value: string): string {
  if (!facet) return WORKS_ALIASES[value] ?? value;
  return vocab?.facets[facet]?.synonyms[value] ?? value;
}

const asList = (v: unknown): string[] => (Array.isArray(v) ? (v as string[]) : v === undefined ? [] : [String(v)]);

/** Static rank: tier, deprecated last, quality, usage, then id. Lower sorts first. */
export function compareStatic(a: CatalogRow, b: CatalogRow): number {
  return (
    (TIER_ORDER[a.tier] ?? 9) - (TIER_ORDER[b.tier] ?? 9) ||
    Number(a.status === 'deprecated') - Number(b.status === 'deprecated') ||
    b.q - a.q ||
    b.u - a.u ||
    a.id.localeCompare(b.id)
  );
}

/** On-device personal signals (TAXONOMY.md §8). They reorder; they never hide an entry. */
export interface Profile {
  /** Detected project stack and chosen stack interests. */
  stack?: string[];
  /** Installed agents (target ids). */
  works?: string[];
  role?: string[];
  subject?: string[];
  domain?: string[];
  category?: string[];
}

export const WEIGHTS = { stack: 3, works: 3, worksMiss: -3, role: 3, subject: 2, domain: 2, category: 2 } as const;

export interface SearchHit {
  row: CatalogRow;
  score: number;
  /** Why the entry was boosted ("your project uses react"). */
  reasons: string[];
}

export interface SearchOptions {
  vocab?: VocabObject;
  profile?: Profile;
  limit?: number;
  offset?: number;
  /** Candidate cap before rerank (design §5.5). */
  candidates?: number;
}

export interface SearchResult {
  hits: SearchHit[];
  /** Matches before paging (capped at `candidates`). */
  total: number;
  capped: boolean;
}

function textScore(row: CatalogRow, terms: readonly string[]): number | undefined {
  if (terms.length === 0) return 0;
  const words = (s: string) =>
    s
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean);
  const fields: [string[], number][] = [
    [[...words(row.id), ...words(row.title)], 5],
    [[...row.aliases.flatMap(words), ...row.tags.flatMap(words)], 3],
    [words(row.desc), 2],
  ];
  let total = 0;
  for (const term of terms) {
    const parts = words(term);
    let best = 0;
    for (const [list, weight] of fields) {
      const hit = parts.every((p) => list.some((w) => w.startsWith(p)));
      if (hit) best = Math.max(best, weight);
    }
    if (best === 0) return undefined; // every term must match somewhere
    total += best;
  }
  return total;
}

/** Personal boost: score, the reasons shown, and `fit` (how specific the stack match is) to break ties. */
interface Boost {
  score: number;
  reasons: string[];
  fit: number;
}

function boost(row: CatalogRow, profile: Profile | undefined, vocab: VocabObject | undefined): Boost {
  if (!profile) return { score: 0, reasons: [], fit: 0 };
  let score = 0;
  let fit = 0;
  const reasons: string[] = [];
  const label = (facet: string, v: string) => vocab?.facets[facet]?.labels[v] ?? v;
  if (profile.stack?.length && row.stack.length) {
    const expanded = new Set(profile.stack.flatMap((s) => [...impliesOf(vocab, 'stack', s)]));
    // The most specific stack value wins (nextjs over react over javascript): it names the reason and breaks ties.
    let hit: string | undefined;
    for (const s of row.stack) {
      if (!expanded.has(s)) continue;
      const depth = impliesOf(vocab, 'stack', s).size;
      if (depth > fit) [hit, fit] = [s, depth];
    }
    if (hit) {
      score += WEIGHTS.stack;
      reasons.push(`your project uses ${label('stack', hit)}`);
    }
  }
  if (profile.works?.length) {
    // Not listed as a reason: nearly everything runs in a coding agent, so it only matters when it does not.
    score += row.works.some((w) => profile.works?.includes(w)) ? WEIGHTS.works : WEIGHTS.worksMiss;
  }
  const simple: [keyof Profile, keyof CatalogRow, string, number][] = [
    ['role', 'role', 'role', WEIGHTS.role],
    ['subject', 'subject', 'subject', WEIGHTS.subject],
    ['domain', 'dom', 'domain', WEIGHTS.domain],
    ['category', 'cat', 'category', WEIGHTS.category],
  ];
  for (const [key, field, facet, weight] of simple) {
    const wanted = profile[key];
    if (!wanted?.length) continue;
    const hit = asList(row[field]).find((v) => wanted.includes(v));
    if (hit) {
      score += weight;
      reasons.push(`you chose ${label(facet, hit)}`);
    }
  }
  return { score, reasons, fit };
}

/**
 * In-memory search backend (MVP, offline and curated-shard search). Rows are filtered by facets, taken in personal-fit
 * then static rank order up to `candidates`, then reranked by text relevance plus personal boosts. Cost is bounded by the cap,
 * not the catalog size; the SQL backend (Hermes, registry) runs the same plan over FTS5.
 */
export function search(
  rows: readonly CatalogRow[],
  query: ParsedQuery | string,
  opts: SearchOptions = {},
): SearchResult {
  const q = typeof query === 'string' ? parseQuery(query) : query;
  const { vocab, profile } = opts;
  const cap = opts.candidates ?? 300;
  const filters = Object.entries(q.filters).map(([key, values]) => {
    const spec = KEYS[key] as { field: keyof CatalogRow; facet?: string };
    const accepted = new Set<string>();
    for (const raw of values) {
      const value = canonical(vocab, spec.facet, raw);
      const expandable = spec.facet === 'stack' || spec.facet === 'subject';
      for (const v of expandable ? impliedFrom(vocab, spec.facet as string, value) : [value]) accepted.add(v);
    }
    return { field: spec.field, accepted };
  });

  // With a profile, candidates are taken in order of personal fit first, so the cap never cuts off the entries that
  // fit the project (in static order alone, an empty search only reached the alphabetically first `cap` rows).
  const boosts = new Map<CatalogRow, Boost>();
  const boostOf = (row: CatalogRow) => {
    let b = boosts.get(row);
    if (!b) boosts.set(row, (b = boost(row, profile, vocab)));
    return b;
  };
  const personal = (a: CatalogRow, b: CatalogRow) =>
    profile ? boostOf(b).score - boostOf(a).score || boostOf(b).fit - boostOf(a).fit : 0;
  const ordered = [...rows].sort((a, b) => personal(a, b) || compareStatic(a, b));
  const matched: { row: CatalogRow; text: number }[] = [];
  for (const row of ordered) {
    if (!filters.every((f) => asList(row[f.field]).some((v) => f.accepted.has(v)))) continue;
    const text = textScore(row, q.terms);
    if (text === undefined) continue;
    matched.push({ row, text });
    if (matched.length >= cap) break;
  }
  const hits = matched.map(({ row, text }) => {
    const b = boostOf(row);
    return { row, score: text + b.score, reasons: b.reasons };
  });
  hits.sort((a, b) => b.score - a.score || personal(a.row, b.row) || compareStatic(a.row, b.row));
  const offset = opts.offset ?? 0;
  const limit = opts.limit ?? 20;
  return { hits: hits.slice(offset, offset + limit), total: hits.length, capped: matched.length >= cap };
}

/** Resolves an id or alias to a row. */
export function findRow(rows: readonly CatalogRow[], id: string): CatalogRow | undefined {
  return rows.find((r) => r.id === id) ?? rows.find((r) => r.aliases.includes(id));
}
