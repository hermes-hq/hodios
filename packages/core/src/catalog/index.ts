// `@hermes-hq/hodios-core/catalog`: the v1 index format, its builder and the query engine. No schema validator.
export * from './types.js';
export {
  ROWS_PER_SHARD,
  buildCatalog,
  objectPath,
  parseShard,
  prefixLenFor,
  toRow,
  vocabObject,
  worksIn,
} from './build.js';
export type { CatalogInput, CatalogOutput } from './build.js';
export {
  QUERY_KEYS,
  WEIGHTS,
  compareStatic,
  findRow,
  impliesOf,
  parseQuery,
  search,
  type ParsedQuery,
  type Profile,
  type SearchHit,
  type SearchOptions,
  type SearchResult,
} from './query.js';
export { AGENT_BINARIES, AGENT_MARKERS, detectStack, type ProjectScan } from './detect.js';
export { parsePack, resolvePack, type PackDefinition, type PackRule } from './packs.js';
