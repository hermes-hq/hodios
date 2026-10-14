/**
 * Catalog index format v1 (design §3.3 and §12.4). Frozen from the MVP so 50 entries and 5M entries use the same
 * format; only parameters change (`prefixLen`, number of tiers, deltas). Every reader ignores unknown fields.
 *
 *   v1/manifest.json        the only mutable object, ≤ 8 KB at any scale
 *   v1/o/<aa>/<sha256>      immutable, content-addressed objects: shard lists, NDJSON shards, entry bodies,
 *                           packs, vocab. `aa` = first two hex chars. Hashes cover the uncompressed bytes;
 *                           the CDN may serve them brotli-encoded.
 */

export type Tier = 'curated' | 'verified' | 'community';
export const TIER_ORDER: Record<Tier, number> = { curated: 0, verified: 1, community: 2 };

/** `sha256:<64 hex>` */
export type ObjectRef = string;

export interface Manifest {
  schema: 1;
  /** Catalog CalVer, `YYYY.MDD.PATCH`. */
  catalog: string;
  /** Monotonic release sequence; deltas cover `from`..`to` in this space. */
  seq: number;
  /** Oldest CLI/app that can read this manifest. */
  minClientVersion: string;
  /** Object path template relative to the manifest's folder. */
  objects: string;
  tiers: Partial<Record<Tier, { list: ObjectRef; rows: number }>>;
  /** Delta segments since the last compaction (none in the MVP: every release ships full shards). */
  deltas: { from: number; to: number; object: ObjectRef; bytes: number }[];
  packs: Record<string, ObjectRef>;
  vocab: ObjectRef;
  /**
   * Catalog format revision, `MAJOR.MINOR`. Absent means "1.0". 1.1 adds the row fields `ess`, `dep`, `int`, `top`,
   * `syn` and `adv`, a computed `q`, the vocab's `depth`, `intent` and `queries`, and `queries` below. Additive: a
   * 1.0 reader ignores them.
   */
  format?: string;
  /** The compiled queries.yml ({@link QueriesObject}), when the release has one. */
  queries?: ObjectRef;
}

export interface ShardList {
  schema: 1;
  tier: Tier;
  /** An entry's shard is the first `prefixLen` hex chars of sha256(id). 0 = one shard (key ""). */
  prefixLen: number;
  shards: Record<string, { object: ObjectRef; rows: number }>;
}

/** One NDJSON line of a shard (design §3.3 "Row"). Short keys keep a row near 150 bytes compressed. */
export interface CatalogRow {
  id: string;
  v: string;
  kind: string;
  cat: string;
  dom?: string;
  sub?: string;
  tier: Tier;
  status: string;
  title: string;
  desc: string;
  tags: string[];
  stage: string[];
  stack: string[];
  role: string[];
  subject: string[];
  in: string[];
  out: string[];
  /** Computed `works_in`: target ids from vocab/targets.yml. */
  works: string[];
  risk?: string;
  level?: string;
  lang?: string;
  /**
   * Commonness 0-100 (TAXONOMY.md §6.5): 100 for essentials level 1, 80 for level 2, otherwise 1-79 from tier, depth,
   * level, audience, evals and how short and unqualified the title is. Deterministic.
   */
  q: number;
  /** Essentials level: 2 = front door (essentials.yml level1), 1 = essentials shelf (level2 only), 0 = neither. */
  ess?: number;
  /** Depth, a value of the vocab's `depth` (in its order; a row without one counts as `depth.default`). */
  dep?: string;
  /** Intent ids (vocab `intent.intents`), from the category or the entry's override. */
  int?: string[];
  /** Topic id (vocab `intent.topics`), from the category or the entry's override. */
  top?: string;
  /** Extra search terms: category label and synonyms, queries.yml phrases routed here, and aliases. Lower case. */
  syn?: string[];
  /** advice_risk values (medical, mental-health, legal, financial): show a care notice. */
  adv?: string[];
  /** Usage bucket 0-15. */
  u: number;
  aliases: string[];
  /** The entry's self-contained body object (a ResolvedEntry as JSON). */
  body: ObjectRef;
  bytes: number;
  updated?: string;
}

/** Delta segment line (format frozen; the MVP does not emit deltas yet). */
export type DeltaOp = { op: 'put'; row: CatalogRow } | { op: 'del'; id: string };

export interface PackObject {
  schema: 1;
  id: string;
  title: string;
  description: string;
  ids: string[];
}

/** The vocab object: what search needs to expand synonyms and `implies`, plus on-device stack detection hints. */
export interface VocabObject {
  schema: 1;
  facets: Record<
    string,
    { labels: Record<string, string>; synonyms: Record<string, string>; implies: Record<string, string[]> }
  >;
  /** category -> domain */
  domains: Record<string, string>;
  /** stack value -> detection hints (TAXONOMY.md §8) */
  detect: Record<string, { files?: string[]; deps?: string[] }>;
  /** vocab/depth.yml in display order; `default` is what a row without `dep` counts as (format 1.1). */
  depth?: { values: { id: string; label: string; description?: string }[]; default: string };
  /** vocab/intent.yml: intents and topics in display order, and the category map (format 1.1). */
  intent?: {
    intents: { id: string; label: string; hint?: string }[];
    topics: { id: string; label: string }[];
    categories: Record<string, { intents: string[]; topic: string }>;
  };
  /** Same content as the manifest's `queries` object, for clients that only fetch the vocab (format 1.1). */
  queries?: QueriesObject['routes'];
}

/** The compiled queries.yml: everyday phrases routed to a front door, plus the specialists to offer next. */
export interface QueriesObject {
  schema: 1;
  routes: { to: string; phrases: string[]; refine: string[] }[];
}
