import { normalizePhrase, stemWord } from '../everyday.js';
import { TIER_ORDER, type CatalogRow, type QueriesObject, type VocabObject } from './types.js';

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
  depth: { field: 'dep', facet: 'depth' },
  intent: { field: 'int' },
  topic: { field: 'top' },
  advice: { field: 'adv', facet: 'advice-risk' },
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
  /** Free-text terms, lower case. */
  terms: string[];
  /** The same terms as typed (case kept), for leftover words a UI passes on as arguments ("Lisbon"). */
  raw?: string[];
  /** Query key -> values (OR'd); keys are AND'd. */
  filters: Record<string, string[]>;
}

/** Parses `flaky kind:prompt cat:testing stack:react,vue`. Unknown `key:` tokens are treated as text. */
export function parseQuery(q: string): ParsedQuery {
  const terms: string[] = [];
  const raw: string[] = [];
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
    } else {
      terms.push(token.toLowerCase());
      raw.push(token);
    }
  }
  return { terms, raw, filters };
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

/** Rank of each depth value in vocab order (lower first); unknown or missing values count as the default (middle). */
export function depthRanker(vocab: VocabObject | undefined): (dep: string | undefined) => number {
  const values = vocab?.depth?.values.map((v) => v.id) ?? [];
  const rank = new Map(values.map((id, i) => [id, i]));
  const fallback = rank.get(vocab?.depth?.default ?? '') ?? Math.floor((values.length - 1) / 2);
  return (dep) => (dep === undefined ? fallback : (rank.get(dep) ?? fallback));
}

const NO_DEPTH = () => 0;

/**
 * Static rank (TAXONOMY.md §6.5), lower sorts first: deprecated last, then essentials level (`ess`, higher first),
 * depth in vocab order (the "Start here" level first; pass `depthRank` from {@link depthRanker}), commonness `q`,
 * tier, usage `u`, and the id only as the final tie-break.
 */
export function compareStatic(
  a: CatalogRow,
  b: CatalogRow,
  depthRank: (dep: string | undefined) => number = NO_DEPTH,
): number {
  return (
    Number(a.status === 'deprecated') - Number(b.status === 'deprecated') ||
    (b.ess ?? 0) - (a.ess ?? 0) ||
    depthRank(a.dep) - depthRank(b.dep) ||
    b.q - a.q ||
    (TIER_ORDER[a.tier] ?? 9) - (TIER_ORDER[b.tier] ?? 9) ||
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

/** Text weights per row field (TAXONOMY.md §6.5). `syn` holds the category label and synonyms and routed phrases. */
export const TEXT_WEIGHTS = { title: 5, syn: 4, tags: 3, desc: 2 } as const;
/** Score added to the front door a queries.yml phrase routes to, and to its refine list (minus its position). */
export const ROUTE_BOOST = { to: 1000, refine: 500 } as const;

/** Words dropped from free-text queries: they match everything and decide nothing ("help me plan a trip to …"). */
export const STOP_WORDS = new Set(
  (
    'a an the and or but of for to in on at by with from into onto about over under as is are was be been am ' +
    'i me my mine we us our you your yours it its this that these those there here some any so very just ' +
    'do does did can could would should will shall may might must want wanna need needs please help how what ' +
    "which who whom whose why when where im i'm id i'd ive i've let lets let's give tell show"
  ).split(' '),
);

/** Lower-case words of letters and digits (any script). */
export function searchWords(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}

export interface SearchHit {
  row: CatalogRow;
  score: number;
  /** Why the entry was boosted ("your project uses react"). */
  reasons: string[];
}

export interface SearchOptions {
  vocab?: VocabObject;
  /** Compiled queries.yml routes (manifest `queries`, or `vocab.queries`). Defaults to `vocab.queries`. */
  queries?: QueriesObject['routes'];
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
  /** The queries.yml route the text matched: the front door first, then its refine list. */
  route?: { to: string; refine: string[]; phrase: string };
  /** True when no entry matched every term and the hits match some of them, most matched terms first. */
  fallback: boolean;
  /**
   * Query words (as typed) that the top hit does not match, stop words excluded: what a UI can pass to it as
   * arguments ("plan a 5-day trip to Lisbon" -> ["5-day", "Lisbon"] for Plan a trip).
   */
  leftover: string[];
}

/**
 * The queries.yml route for a free-text query: the longest phrase whose words appear in order, next to each other, in
 * the query (words compared by a light stem, so "trips" matches "trip"); the first route listed wins a tie.
 */
export function routeQuery(
  text: string,
  routes: QueriesObject['routes'] | undefined,
): { to: string; refine: string[]; phrase: string } | undefined {
  if (!routes?.length) return undefined;
  const words = searchWords(text).map(stemWord);
  if (words.length === 0) return undefined;
  let best: { to: string; refine: string[]; phrase: string; size: number } | undefined;
  for (const route of routes) {
    for (const phrase of route.phrases) {
      const parts = normalizePhrase(phrase).split(' ').filter(Boolean).map(stemWord);
      if (parts.length === 0 || (best && parts.length <= best.size)) continue;
      for (let i = 0; i + parts.length <= words.length; i++) {
        if (parts.every((p, j) => words[i + j] === p)) {
          best = { to: route.to, refine: route.refine, phrase, size: parts.length };
          break;
        }
      }
    }
  }
  return best && { to: best.to, refine: best.refine, phrase: best.phrase };
}

interface TextMatch {
  score: number;
  /** Indexes of the terms this row matches. */
  matched: Set<number>;
}

function rowFields(row: CatalogRow): [string[], number][] {
  return [
    [[...searchWords(row.id), ...searchWords(row.title)], TEXT_WEIGHTS.title],
    [(row.syn ?? []).flatMap(searchWords), TEXT_WEIGHTS.syn],
    [[...row.aliases.flatMap(searchWords), ...row.tags.flatMap(searchWords)], TEXT_WEIGHTS.tags],
    [searchWords(row.desc), TEXT_WEIGHTS.desc],
  ];
}

/** Per term, the best field weight it matches (a word starting with the term, or with its stem). */
function textMatch(row: CatalogRow, terms: readonly string[][]): TextMatch {
  const fields = rowFields(row);
  let score = 0;
  const matched = new Set<number>();
  terms.forEach((parts, i) => {
    let best = 0;
    for (const [list, weight] of fields) {
      if (weight <= best) continue;
      const hit = parts.every((p) => {
        const stem = p.length > 3 ? stemWord(p) : p;
        return list.some((w) => w.startsWith(p) || w.startsWith(stem));
      });
      if (hit) best = weight;
    }
    if (best > 0) {
      matched.add(i);
      score += best;
    }
  });
  return { score, matched };
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
 *
 * Text (TAXONOMY.md §6.5): stop words are dropped; every remaining term must match the id or title (5), `syn` (4),
 * aliases or tags (3) or the description (2). When no row matches every term, rows matching any term are ranked by
 * how many terms they match (`fallback`). A queries.yml phrase in the query puts its front door first and its refine
 * list next, whatever the text match.
 */
export function search(
  rows: readonly CatalogRow[],
  query: ParsedQuery | string,
  opts: SearchOptions = {},
): SearchResult {
  const q = typeof query === 'string' ? parseQuery(query) : query;
  const { vocab, profile } = opts;
  const cap = opts.candidates ?? 300;
  const depthRank = depthRanker(vocab);
  const staticOrder = (a: CatalogRow, b: CatalogRow) => compareStatic(a, b, depthRank);
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
  const passes = (row: CatalogRow) => filters.every((f) => asList(row[f.field]).some((v) => f.accepted.has(v)));

  // Free text: stop words out; each kept term remembers how it was typed.
  const typed = q.raw && q.raw.length === q.terms.length ? q.raw : q.terms;
  const kept = q.terms
    .map((term, i) => ({ term, typed: typed[i] as string, parts: searchWords(term) }))
    .filter((t) => t.parts.length > 0 && !(t.parts.length === 1 && STOP_WORDS.has(t.parts[0] as string)));
  const terms = kept.map((t) => t.parts);
  const route = routeQuery(q.terms.join(' '), opts.queries ?? vocab?.queries);

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
  const ordered = [...rows].sort((a, b) => personal(a, b) || staticOrder(a, b));

  const matched = new Map<CatalogRow, TextMatch>();
  let capped = false;
  for (const row of ordered) {
    if (!passes(row)) continue;
    const m = textMatch(row, terms);
    if (m.matched.size < terms.length) continue;
    matched.set(row, m);
    if (matched.size >= cap) {
      capped = true;
      break;
    }
  }
  // Any-term fallback: every row is scored, so the rows matching the most terms are never cut off by the cap.
  let fallback = false;
  if (matched.size === 0 && terms.length > 1) {
    const partial: [CatalogRow, TextMatch][] = [];
    for (const row of ordered) {
      if (!passes(row)) continue;
      const m = textMatch(row, terms);
      if (m.matched.size > 0) partial.push([row, m]);
    }
    partial.sort(([ra, a], [rb, b]) => b.matched.size - a.matched.size || b.score - a.score || personal(ra, rb));
    for (const [row, m] of partial.slice(0, cap))
      matched.set(row, { score: m.score + 100 * m.matched.size, matched: m.matched });
    capped = partial.length > cap;
    fallback = matched.size > 0;
  }
  // Routing: the front door and its refine list join the hits even when their text does not match.
  const routeBoost = new Map<string, number>();
  if (route) {
    routeBoost.set(route.to, ROUTE_BOOST.to);
    route.refine.forEach((id, i) => routeBoost.set(id, ROUTE_BOOST.refine - i));
    for (const row of rows) {
      if (routeBoost.has(row.id) && !matched.has(row) && passes(row)) matched.set(row, textMatch(row, terms));
    }
  }

  // A specific entry whose id or title holds every term ("plan a road trip", "write a news story") beats a front door
  // that does not: the front door then comes second.
  if (route && terms.length > 1) {
    const door = [...matched].find(([row]) => row.id === route.to)?.[1];
    if (!door || door.matched.size < terms.length) {
      const exact = [...matched]
        .filter(([row, m]) => row.id !== route.to && m.score === TEXT_WEIGHTS.title * terms.length)
        .sort(([a], [b]) => staticOrder(a, b))[0];
      if (exact) routeBoost.set(exact[0].id, ROUTE_BOOST.to + 1);
    }
  }

  const hits = [...matched].map(([row, m]) => {
    const b = boostOf(row);
    return { row, score: m.score + b.score + (routeBoost.get(row.id) ?? 0), reasons: b.reasons };
  });
  hits.sort((a, b) => b.score - a.score || personal(a.row, b.row) || staticOrder(a.row, b.row));
  const top = hits[0];
  const leftover = top
    ? kept.filter((_, i) => !(matched.get(top.row) as TextMatch).matched.has(i)).map((t) => t.typed)
    : [];
  const offset = opts.offset ?? 0;
  const limit = opts.limit ?? 20;
  return {
    hits: hits.slice(offset, offset + limit),
    total: hits.length,
    capped,
    route: route && rows.some((r) => r.id === route.to) ? route : undefined,
    fallback,
    leftover,
  };
}

/** Resolves an id or alias to a row. */
export function findRow(rows: readonly CatalogRow[], id: string): CatalogRow | undefined {
  return rows.find((r) => r.id === id) ?? rows.find((r) => r.aliases.includes(id));
}
