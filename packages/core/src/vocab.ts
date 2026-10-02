import type { VocabFile } from '@hermes-hq/hodios-schema';

export interface FacetIndex {
  facet: string;
  values: Set<string>;
  /** synonym -> canonical value */
  synonyms: Map<string, string>;
  /** deprecated value -> replacement */
  deprecated: Map<string, string | null>;
}

export type Vocab = Map<string, FacetIndex>;

export type VocabLookup =
  | { status: 'ok' }
  | { status: 'synonym'; canonical: string }
  | { status: 'deprecated'; replacement: string | null }
  | { status: 'unknown' };

export function buildVocab(files: VocabFile[]): Vocab {
  const vocab: Vocab = new Map();
  for (const file of files) {
    const index: FacetIndex = {
      facet: file.facet,
      values: new Set(),
      synonyms: new Map(),
      deprecated: new Map(),
    };
    for (const v of file.values) {
      index.values.add(v.value);
      for (const s of v.synonyms ?? []) index.synonyms.set(s, v.value);
      if (v.deprecated_by !== undefined) index.deprecated.set(v.value, v.deprecated_by);
    }
    vocab.set(file.facet, index);
  }
  return vocab;
}

export function lookup(vocab: Vocab, facet: string, value: string): VocabLookup {
  const index = vocab.get(facet);
  if (!index) return { status: 'unknown' };
  if (index.deprecated.has(value)) return { status: 'deprecated', replacement: index.deprecated.get(value) ?? null };
  if (index.values.has(value)) return { status: 'ok' };
  const canonical = index.synonyms.get(value);
  if (canonical) return { status: 'synonym', canonical };
  return { status: 'unknown' };
}

/** Problems inside the vocab files themselves (duplicates, synonym clashes). */
export function checkVocabFile(file: VocabFile): string[] {
  const problems: string[] = [];
  const values = new Set<string>();
  const synonyms = new Map<string, string>();
  for (const v of file.values) {
    if (values.has(v.value)) problems.push(`duplicate value "${v.value}"`);
    values.add(v.value);
  }
  for (const v of file.values) {
    for (const s of v.synonyms ?? []) {
      if (values.has(s)) problems.push(`synonym "${s}" of "${v.value}" is also a value`);
      const owner = synonyms.get(s);
      if (owner) problems.push(`synonym "${s}" is listed under both "${owner}" and "${v.value}"`);
      synonyms.set(s, v.value);
    }
    if (v.deprecated_by && !values.has(v.deprecated_by)) {
      problems.push(`"${v.value}" is deprecated_by unknown value "${v.deprecated_by}"`);
    }
  }
  return problems;
}
