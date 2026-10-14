import type { ResolvedEntry } from '../compile/types.js';
import {
  defaultDepth,
  depthLevels,
  normalizePhrase,
  type Essentials,
  type IntentVocab,
  type QueryRoute,
} from '../everyday.js';
import type { Vocab } from '../vocab.js';
import {
  TIER_ORDER,
  type QueriesObject,
  type CatalogRow,
  type Manifest,
  type ObjectRef,
  type PackObject,
  type ShardList,
  type Tier,
  type VocabObject,
} from './types.js';

/** Rows per shard the prefix length aims for (≈ 1 MB uncompressed at ~250 B/row). */
export const ROWS_PER_SHARD = 4000;

/** `prefixLen = ceil(log16(rows / 4000))`, at least 0 (design §12.4). */
export function prefixLenFor(rows: number): number {
  if (rows <= ROWS_PER_SHARD) return 0;
  return Math.ceil(Math.log(rows / ROWS_PER_SHARD) / Math.log(16));
}

/** Path of an object relative to the manifest folder. */
export function objectPath(ref: ObjectRef): string {
  const hex = ref.replace(/^sha256:/, '');
  return `o/${hex.slice(0, 2)}/${hex}`;
}

const AGENT_TARGETS = [
  'claude-code',
  'codex',
  'cursor',
  'copilot',
  'gemini-cli',
  'antigravity',
  'opencode',
  'windsurf',
  'zed',
  'continue',
];
const CHAT_TARGETS = ['chatgpt', 'claude-ai'];

/** Computed `works_in` (never authored): from `requires`, the kind and the target list. */
export function worksIn(entry: ResolvedEntry): string[] {
  const { fm } = entry;
  const requires = (fm.requires ?? []).map((r) => r.split(':')[0]);
  const out = [...AGENT_TARGETS];
  if (requires.every((r) => r === 'none' || r === 'web')) out.push(...CHAT_TARGETS);
  if (fm.kind === 'rule' || fm.kind === 'style' || fm.kind === 'persona') out.push('agents-md');
  if (fm.kind !== 'rule') out.push('mcp');
  out.push('hermes');
  return out;
}

/** Stable JSON for content addressing: keys in insertion order, no whitespace. */
const json = (v: unknown) => JSON.stringify(v);

/** What `toRow` needs beyond the entry to fill the everyday fields (format 1.1). Built once per catalog. */
export interface RowContext {
  /** id -> essentials level (2 = level1, 1 = level2). */
  ess?: Map<string, number>;
  intent?: IntentVocab;
  /** id -> queries.yml phrases routed to it. */
  phrases?: Map<string, string[]>;
  /** category -> its label and synonyms, as search words. */
  categoryTerms?: Map<string, string[]>;
  /** depth values in vocab order. */
  depthLevels?: string[];
}

export function rowContext(
  vocab: Vocab,
  opts: { essentials?: Essentials; intent?: IntentVocab; queries?: readonly QueryRoute[] } = {},
): RowContext {
  const ess = new Map<string, number>();
  for (const id of opts.essentials?.level2 ?? []) ess.set(id, 1);
  for (const id of opts.essentials?.level1 ?? []) ess.set(id, 2);
  const phrases = new Map<string, string[]>();
  for (const route of opts.queries ?? []) phrases.set(route.to, [...(phrases.get(route.to) ?? []), ...route.phrases]);
  const categoryTerms = new Map<string, string[]>();
  for (const [value, meta] of vocab.get('category')?.meta ?? []) {
    categoryTerms.set(value, [meta.label, ...(meta.synonyms ?? []).map((s) => s.replaceAll('-', ' '))]);
  }
  return { ess, intent: opts.intent, phrases, categoryTerms, depthLevels: depthLevels(vocab) };
}

/**
 * Commonness `q` (TAXONOMY.md §6.5), deterministic: essentials level 1 = 100, level 2 = 80, deprecated = 0. Otherwise
 * 40, plus: curated tier +10; first depth +8, last depth -8; level beginner +6, expert -6; audience includes
 * `individual` or is empty +6; evals (experimental or stable) +4; title of at most 3 words +6, 4 words +3, 7 or more
 * words -5; a qualified title (" for ", " with ", " in ", " on ", " from ", ":" or "(") -6; a `stack` -4; text in
 * a language other than English -10. Clamped to 1-79, so every essential ranks above every other entry.
 */
export function commonness(
  fm: ResolvedEntry['fm'],
  opts: { tier: Tier; ess?: number; depth?: string; depthLevels?: readonly string[] },
): number {
  if (fm.status === 'deprecated') return 0;
  if (opts.ess === 2) return 100;
  if (opts.ess === 1) return 80;
  const levels = opts.depthLevels ?? [];
  let q = 40;
  if (opts.tier === 'curated') q += 10;
  if (levels.length > 1 && opts.depth === levels[0]) q += 8;
  if (levels.length > 1 && opts.depth === levels.at(-1)) q -= 8;
  if (fm.level === 'beginner') q += 6;
  if (fm.level === 'expert') q -= 6;
  if (!fm.role?.length || fm.role.includes('individual')) q += 6;
  if (fm.status === 'experimental' || fm.status === 'stable') q += 4;
  const words = fm.title.trim().split(/\s+/).length;
  q += words <= 3 ? 6 : words === 4 ? 3 : words >= 7 ? -5 : 0;
  if (/ (for|with|in|on|from) |[:(]/i.test(fm.title)) q -= 6;
  if (fm.stack?.length) q -= 4;
  if (fm.lang && fm.lang !== 'en' && !fm.lang.startsWith('en-')) q -= 10;
  return Math.max(1, Math.min(79, q));
}

const unique = (list: string[]) => [...new Set(list.map((s) => s.toLowerCase().trim()).filter(Boolean))];

export function toRow(
  entry: ResolvedEntry,
  opts: { body: ObjectRef; bytes: number; tier: Tier; domain?: string; context?: RowContext },
): CatalogRow {
  const { fm } = entry;
  const ctx = opts.context ?? {};
  const ess = ctx.ess?.get(fm.id) ?? 0;
  const dep = fm.depth ?? defaultDepth(ctx.depthLevels ?? []);
  const mapped = ctx.intent?.categories[fm.category];
  const syn = unique([
    ...(ctx.categoryTerms?.get(fm.category) ?? []),
    ...(ctx.phrases?.get(fm.id) ?? []).map(normalizePhrase),
    ...(fm.aliases ?? []).map((a) => a.replaceAll('-', ' ')),
  ]);
  const row: CatalogRow = {
    id: fm.id,
    v: fm.version,
    kind: fm.kind,
    cat: fm.category,
    dom: opts.domain,
    sub: fm.subcategory,
    tier: opts.tier,
    status: fm.status,
    title: fm.title,
    desc: fm.description,
    tags: fm.tags ?? [],
    stage: [...new Set([...(fm.stage ?? []), ...(fm.steps ?? []).map((s) => s.stage)])],
    stack: fm.stack ?? [],
    role: fm.role ?? [],
    subject: fm.subject ?? [],
    in: fm.inputs ?? [],
    out: fm.output ?? [],
    works: worksIn(entry),
    risk: fm.risk,
    level: fm.level,
    lang: fm.lang,
    q: commonness(fm, { tier: opts.tier, ess, depth: dep, depthLevels: ctx.depthLevels }),
    u: 0,
    aliases: fm.aliases ?? [],
    body: opts.body,
    bytes: opts.bytes,
    ess,
    dep,
    int: fm.intent ?? mapped?.intents ?? [],
    top: fm.topic ?? mapped?.topic,
    syn,
    adv: fm.advice_risk ?? [],
  };
  return JSON.parse(json(row)) as CatalogRow;
}

export function vocabObject(
  vocab: Vocab,
  extra: { intent?: IntentVocab; queries?: readonly QueryRoute[] } = {},
): VocabObject {
  const facets: VocabObject['facets'] = {};
  const domains: Record<string, string> = {};
  const detect: VocabObject['detect'] = {};
  for (const [facet, index] of [...vocab].sort(([a], [b]) => a.localeCompare(b))) {
    const labels: Record<string, string> = {};
    const implies: Record<string, string[]> = {};
    for (const [value, meta] of index.meta) {
      labels[value] = meta.label;
      if (meta.implies?.length) implies[value] = meta.implies;
      if (facet === 'category' && meta.domain) domains[value] = meta.domain;
      if (facet === 'stack' && meta.detect) detect[value] = meta.detect;
    }
    const synonyms = Object.fromEntries([...index.synonyms].sort(([a], [b]) => a.localeCompare(b)));
    facets[facet] = { labels, synonyms, implies };
  }
  const out: VocabObject = { schema: 1, facets, domains, detect };
  const levels = depthLevels(vocab);
  if (levels.length > 0) {
    const meta = vocab.get('depth')?.meta;
    out.depth = {
      values: levels.map((id) => ({ id, label: meta?.get(id)?.label ?? id, description: meta?.get(id)?.description })),
      default: defaultDepth(levels) as string,
    };
  }
  if (extra.intent) out.intent = extra.intent;
  if (extra.queries) out.queries = queriesObject(extra.queries).routes;
  return out;
}

/** The compiled queries.yml: phrases normalised (lower case, single spaces), order kept (earlier wins ties). */
export function queriesObject(queries: readonly QueryRoute[]): QueriesObject {
  return {
    schema: 1,
    routes: queries.map((r) => ({ to: r.to, phrases: r.phrases.map(normalizePhrase), refine: [...r.refine] })),
  };
}

export interface CatalogInput {
  entries: readonly ResolvedEntry[];
  vocab: Vocab;
  catalog: string;
  /** sha256 hex of a UTF-8 string. Injected so the core stays isomorphic and synchronous. */
  sha256: (text: string) => string;
  packs?: readonly PackObject[];
  seq?: number;
  /** Tier of every entry, when `tierOf` is not given. Default `curated`. */
  tier?: Tier;
  /** Tier per entry (curated.txt decides it at release). Each tier gets its own shard list. */
  tierOf?: (entry: ResolvedEntry) => Tier;
  minClientVersion?: string;
  /** essentials.yml, vocab/intent.yml and queries.yml (format 1.1). */
  essentials?: Essentials;
  intent?: IntentVocab;
  queries?: readonly QueryRoute[];
}

/** Catalog format written by this builder (see `Manifest.format`). */
export const CATALOG_FORMAT = '1.1';

export interface CatalogOutput {
  manifest: Manifest;
  /** Every object by ref, ready to write at `objectPath(ref)`. */
  objects: Map<ObjectRef, string>;
  rows: CatalogRow[];
}

/** Builds the v1 manifest, one shard list per tier, NDJSON shards, body objects, packs and vocab. Deterministic. */
export function buildCatalog(input: CatalogInput): CatalogOutput {
  const objects = new Map<ObjectRef, string>();
  const put = (text: string): ObjectRef => {
    const ref = `sha256:${input.sha256(text)}`;
    objects.set(ref, text);
    return ref;
  };
  const tierOf = input.tierOf ?? (() => input.tier ?? 'curated');
  const vocab = vocabObject(input.vocab, { intent: input.intent, queries: input.queries });
  const context = rowContext(input.vocab, input);
  const rows = [...input.entries]
    .sort((a, b) => a.fm.id.localeCompare(b.fm.id))
    .map((entry) => {
      const text = `${json(entry)}\n`;
      const body = put(text);
      return toRow(entry, {
        body,
        bytes: new TextEncoder().encode(text).length,
        tier: tierOf(entry),
        domain: vocab.domains[entry.fm.category],
        context,
      });
    });

  const tiers: Manifest['tiers'] = {};
  for (const tier of (Object.keys(TIER_ORDER) as Tier[]).sort((a, b) => TIER_ORDER[a] - TIER_ORDER[b])) {
    const tierRows = rows.filter((r) => r.tier === tier);
    // An empty catalog still lists its default tier, so clients always find a shard list.
    if (tierRows.length === 0 && (rows.length > 0 || tier !== (input.tier ?? 'curated'))) continue;
    const prefixLen = prefixLenFor(tierRows.length);
    const byShard = new Map<string, CatalogRow[]>();
    for (const row of tierRows) {
      const key = input.sha256(row.id).slice(0, prefixLen);
      const bucket = byShard.get(key);
      if (bucket) bucket.push(row);
      else byShard.set(key, [row]);
    }
    const shards: ShardList['shards'] = {};
    for (const [key, shardRows] of [...byShard].sort(([a], [b]) => a.localeCompare(b))) {
      shards[key] = { object: put(shardRows.map((r) => `${json(r)}\n`).join('')), rows: shardRows.length };
    }
    const list: ShardList = { schema: 1, tier, prefixLen, shards };
    tiers[tier] = { list: put(`${json(list)}\n`), rows: tierRows.length };
  }
  const packs: Record<string, ObjectRef> = {};
  for (const pack of [...(input.packs ?? [])].sort((a, b) => a.id.localeCompare(b.id)))
    packs[pack.id] = put(`${json(pack)}\n`);

  const manifest: Manifest = {
    schema: 1,
    format: CATALOG_FORMAT,
    catalog: input.catalog,
    seq: input.seq ?? 0,
    minClientVersion: input.minClientVersion ?? '0.1.0',
    objects: 'o/{aa}/{sha256}',
    tiers,
    deltas: [],
    packs,
    vocab: put(`${json(vocab)}\n`),
  };
  if (input.queries) manifest.queries = put(`${json(queriesObject(input.queries))}\n`);
  return { manifest, objects, rows };
}

/** Parses an NDJSON shard. Unknown fields are kept and ignored; blank lines are skipped. */
export function parseShard(text: string): CatalogRow[] {
  return text
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => JSON.parse(line) as CatalogRow);
}
