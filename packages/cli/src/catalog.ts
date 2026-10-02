import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import {
  findRow,
  objectPath,
  parseShard,
  type CatalogRow,
  type Manifest,
  type ObjectRef,
  type PackObject,
  type ShardList,
  type Tier,
  type VocabObject,
} from '@hermes-hq/hodios-core/catalog';
import type { ResolvedEntry } from '@hermes-hq/hodios-core/compile';
import type { Io } from './cli.js';
import { findRoot } from './root.js';

/** The public catalog. Same v1 format as `dist/catalog/v1` (design §3.3). */
export const DEFAULT_CATALOG_URL = 'https://library.hermes-ide.com/v1';

const sha256 = (text: string) => createHash('sha256').update(text, 'utf8').digest('hex');
const TIERS: Tier[] = ['curated', 'verified', 'community'];

interface ObjectStore {
  label: string;
  manifest(): Promise<string>;
  get(path: string): Promise<string>;
}

function dirStore(dir: string): ObjectStore {
  return {
    label: dir,
    manifest: async () => readFileSync(join(dir, 'manifest.json'), 'utf8'),
    get: async (path) => readFileSync(join(dir, path), 'utf8'),
  };
}

/** HTTP store with a content-addressed cache: objects are immutable, so a cached object is never refetched. */
function httpStore(base: string, cacheDir: string): ObjectStore {
  const url = base.replace(/\/+$/, '');
  const cachedManifest = join(cacheDir, 'manifest.json');
  const fetchText = async (path: string) => {
    const res = await fetch(`${url}/${path}`);
    if (!res.ok) throw new Error(`GET ${url}/${path}: HTTP ${res.status}`);
    return res.text();
  };
  return {
    label: url,
    async manifest() {
      try {
        const text = await fetchText('manifest.json');
        mkdirSync(cacheDir, { recursive: true });
        writeFileSync(cachedManifest, text);
        return text;
      } catch (err) {
        if (existsSync(cachedManifest)) return readFileSync(cachedManifest, 'utf8'); // offline: last good manifest
        throw new Error(`cannot reach the catalog at ${url} (${err instanceof Error ? err.message : String(err)})`, {
          cause: err,
        });
      }
    },
    async get(path) {
      const cached = join(cacheDir, path);
      if (existsSync(cached)) return readFileSync(cached, 'utf8');
      const text = await fetchText(path);
      mkdirSync(dirname(cached), { recursive: true });
      writeFileSync(`${cached}.tmp`, text);
      renameSync(`${cached}.tmp`, cached);
      return text;
    },
  };
}

/** A read-only view of a v1 catalog. Reads the manifest, then only the objects a command needs. */
export class Catalog {
  private rowsCache?: CatalogRow[];
  private shardLists = new Map<Tier, ShardList>();

  private constructor(
    private readonly store: ObjectStore,
    readonly manifest: Manifest,
  ) {}

  static async open(store: ObjectStore): Promise<Catalog> {
    const manifest = JSON.parse(await store.manifest()) as Manifest;
    if (manifest.schema !== 1)
      throw new Error(`catalog schema ${String(manifest.schema)} is not supported; update hodios`);
    return new Catalog(store, manifest);
  }

  get label(): string {
    return this.store.label;
  }

  /** Fetches an object and verifies its hash. */
  async object(ref: ObjectRef): Promise<string> {
    const text = await this.store.get(objectPath(ref));
    if (`sha256:${sha256(text)}` !== ref) throw new Error(`object ${ref} failed its hash check`);
    return text;
  }

  private async shardList(tier: Tier): Promise<ShardList | undefined> {
    const info = this.manifest.tiers[tier];
    if (!info) return undefined;
    let list = this.shardLists.get(tier);
    if (!list) {
      list = JSON.parse(await this.object(info.list)) as ShardList;
      this.shardLists.set(tier, list);
    }
    return list;
  }

  /** Every row of the locally searchable tiers (curated and verified; the community tier is search-API only). */
  async rows(): Promise<CatalogRow[]> {
    if (this.rowsCache) return this.rowsCache;
    const rows: CatalogRow[] = [];
    for (const tier of TIERS.filter((t) => t !== 'community')) {
      const list = await this.shardList(tier);
      for (const shard of Object.values(list?.shards ?? {})) rows.push(...parseShard(await this.object(shard.object)));
    }
    this.rowsCache = rows;
    return rows;
  }

  /** Looks an id up in the one shard its hash maps to; falls back to a scan for aliases. */
  async row(id: string): Promise<CatalogRow | undefined> {
    for (const tier of TIERS) {
      const list = await this.shardList(tier);
      if (!list) continue;
      const shard = list.shards[sha256(id).slice(0, list.prefixLen)];
      if (!shard) continue;
      const hit = parseShard(await this.object(shard.object)).find((r) => r.id === id);
      if (hit) return hit;
    }
    return findRow(await this.rows(), id);
  }

  async entry(row: CatalogRow): Promise<ResolvedEntry> {
    return JSON.parse(await this.object(row.body)) as ResolvedEntry;
  }

  async vocab(): Promise<VocabObject> {
    return JSON.parse(await this.object(this.manifest.vocab)) as VocabObject;
  }

  async pack(name: string): Promise<PackObject | undefined> {
    const ref = this.manifest.packs[name];
    return ref ? (JSON.parse(await this.object(ref)) as PackObject) : undefined;
  }
}

export function cacheDir(io: Io): string {
  const base = io.env?.['XDG_CACHE_HOME'] || join(io.home ?? '.', '.cache');
  return join(base, 'hodios');
}

/**
 * Opens the catalog: `--catalog` or HODIOS_CATALOG (a folder or URL); inside a Hodios checkout its
 * dist/catalog/v1 (built on first use); otherwise the public catalog.
 */
export async function openCatalog(io: Io, flag?: string): Promise<Catalog> {
  const spec = flag ?? io.env?.['HODIOS_CATALOG'];
  if (spec) {
    if (/^https?:\/\//.test(spec)) return Catalog.open(httpStore(spec, join(cacheDir(io), sha256(spec).slice(0, 12))));
    return Catalog.open(dirStore(resolve(io.cwd, spec)));
  }
  const root = findRoot(io.cwd);
  if (root) {
    const dir = join(root, 'dist', 'catalog', 'v1');
    if (!existsSync(join(dir, 'manifest.json'))) {
      const { loadLibrary, todayCalver, writeCatalog } = await import('./library.js');
      const lib = loadLibrary(root);
      const errors = lib.issues.filter((i) => i.severity === 'error');
      if (errors.length) throw new Error(`the library has ${errors.length} validation errors; run hodios validate`);
      writeCatalog(lib, dir, todayCalver());
      io.err(`hodios: built the local catalog index at dist/catalog/v1 (run hodios build to refresh it)`);
    }
    return Catalog.open(dirStore(dir));
  }
  return Catalog.open(httpStore(DEFAULT_CATALOG_URL, join(cacheDir(io), 'default')));
}
