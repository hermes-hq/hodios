import type { ResolvedEntry } from '../compile/types.js';
import type { Vocab } from '../vocab.js';
import type { CatalogRow, Manifest, ObjectRef, PackObject, ShardList, Tier, VocabObject } from './types.js';

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

export function toRow(
  entry: ResolvedEntry,
  opts: { body: ObjectRef; bytes: number; tier: Tier; domain?: string },
): CatalogRow {
  const { fm } = entry;
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
    q: 0,
    u: 0,
    aliases: fm.aliases ?? [],
    body: opts.body,
    bytes: opts.bytes,
  };
  return JSON.parse(json(row)) as CatalogRow;
}

export function vocabObject(vocab: Vocab): VocabObject {
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
  return { schema: 1, facets, domains, detect };
}

export interface CatalogInput {
  entries: readonly ResolvedEntry[];
  vocab: Vocab;
  catalog: string;
  /** sha256 hex of a UTF-8 string. Injected so the core stays isomorphic and synchronous. */
  sha256: (text: string) => string;
  packs?: readonly PackObject[];
  seq?: number;
  tier?: Tier;
  minClientVersion?: string;
}

export interface CatalogOutput {
  manifest: Manifest;
  /** Every object by ref, ready to write at `objectPath(ref)`. */
  objects: Map<ObjectRef, string>;
  rows: CatalogRow[];
}

/** Builds the v1 manifest, shard list, NDJSON shards, body objects, packs and vocab object. Deterministic. */
export function buildCatalog(input: CatalogInput): CatalogOutput {
  const objects = new Map<ObjectRef, string>();
  const put = (text: string): ObjectRef => {
    const ref = `sha256:${input.sha256(text)}`;
    objects.set(ref, text);
    return ref;
  };
  const tier = input.tier ?? 'curated';
  const vocab = vocabObject(input.vocab);
  const rows = [...input.entries]
    .sort((a, b) => a.fm.id.localeCompare(b.fm.id))
    .map((entry) => {
      const text = `${json(entry)}\n`;
      const body = put(text);
      return toRow(entry, {
        body,
        bytes: new TextEncoder().encode(text).length,
        tier,
        domain: vocab.domains[entry.fm.category],
      });
    });

  const prefixLen = prefixLenFor(rows.length);
  const byShard = new Map<string, CatalogRow[]>();
  for (const row of rows) {
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
  const packs: Record<string, ObjectRef> = {};
  for (const pack of [...(input.packs ?? [])].sort((a, b) => a.id.localeCompare(b.id)))
    packs[pack.id] = put(`${json(pack)}\n`);

  const manifest: Manifest = {
    schema: 1,
    catalog: input.catalog,
    seq: input.seq ?? 0,
    minClientVersion: input.minClientVersion ?? '0.1.0',
    objects: 'o/{aa}/{sha256}',
    tiers: { [tier]: { list: put(`${json(list)}\n`), rows: rows.length } },
    deltas: [],
    packs,
    vocab: put(`${json(vocab)}\n`),
  };
  return { manifest, objects, rows };
}

/** Parses an NDJSON shard. Unknown fields are kept and ignored; blank lines are skipped. */
export function parseShard(text: string): CatalogRow[] {
  return text
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => JSON.parse(line) as CatalogRow);
}
