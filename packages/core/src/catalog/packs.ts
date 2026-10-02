import type { EntryFrontmatter } from '@hermes-hq/hodios-schema';
import type { PackObject } from './types.js';

/** A rule in `packs/<pack>.yml` `include`: facets AND'd, values OR'd; `ids` adds entries by id. */
export interface PackRule {
  ids?: string[];
  category?: string[];
  kind?: string[];
  status?: string[];
  stage?: string[];
  stack?: string[];
  tags?: string[];
}

/** `packs/<pack>.yml` (design §4.4). */
export interface PackDefinition {
  id: string;
  title: string;
  description: string;
  include: PackRule[];
  exclude?: { ids?: string[] };
}

function matches(rule: PackRule, fm: EntryFrontmatter): boolean {
  const facets: [string[] | undefined, string[]][] = [
    [rule.category, [fm.category]],
    [rule.kind, [fm.kind]],
    [rule.status, [fm.status]],
    [rule.stage, fm.stage ?? []],
    [rule.stack, fm.stack ?? []],
    [rule.tags, fm.tags ?? []],
  ];
  const constrained = facets.filter(([wanted]) => wanted !== undefined);
  if (constrained.length === 0) return false;
  return constrained.every(([wanted, have]) => have.some((v) => wanted?.includes(v)));
}

/** Resolves a pack definition against the library's entries. Ids come out sorted. */
export function resolvePack(def: PackDefinition, entries: readonly EntryFrontmatter[]): PackObject {
  const excluded = new Set(def.exclude?.ids ?? []);
  const ids = new Set<string>();
  for (const fm of entries) {
    if (excluded.has(fm.id)) continue;
    if (def.include.some((rule) => rule.ids?.includes(fm.id) || matches(rule, fm))) ids.add(fm.id);
  }
  return { schema: 1, id: def.id, title: def.title, description: def.description, ids: [...ids].sort() };
}

/** Parses an untrusted pack document loosely; returns an error message instead of throwing. */
export function parsePack(data: unknown, fileId: string): { pack?: PackDefinition; error?: string } {
  if (typeof data !== 'object' || data === null) return { error: 'pack must be a YAML mapping' };
  const d = data as Record<string, unknown>;
  const id = typeof d['id'] === 'string' ? d['id'] : fileId;
  if (id !== fileId) return { error: `id "${id}" does not match the file name "${fileId}"` };
  if (!Array.isArray(d['include'])) return { error: 'include must be a list' };
  return {
    pack: {
      id,
      title: typeof d['title'] === 'string' ? d['title'] : id,
      description: typeof d['description'] === 'string' ? d['description'] : '',
      include: d['include'] as PackRule[],
      exclude: (d['exclude'] as PackDefinition['exclude']) ?? undefined,
    },
  };
}
