// `@hermes-hq/hodios-core/catalog`: the v1 index format, its builder and the query engine. No schema validator.
export * from './types.js';
export {
  CATALOG_FORMAT,
  ROWS_PER_SHARD,
  buildCatalog,
  commonness,
  queriesObject,
  rowContext,
  objectPath,
  parseShard,
  prefixLenFor,
  toRow,
  vocabObject,
  worksIn,
} from './build.js';
export type { CatalogInput, CatalogOutput, RowContext } from './build.js';
export {
  QUERY_KEYS,
  ROUTE_BOOST,
  STOP_WORDS,
  TEXT_WEIGHTS,
  WEIGHTS,
  compareStatic,
  depthRanker,
  routeQuery,
  searchWords,
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
