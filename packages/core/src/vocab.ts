import type { VocabFile, VocabValue } from '@hermes-hq/hodios-schema';

export interface FacetIndex {
  facet: string;
  values: Set<string>;
  /** synonym -> canonical value */
  synonyms: Map<string, string>;
  /** deprecated value -> replacement */
  deprecated: Map<string, string | null>;
  /** value -> its full vocab record (domain, layout, implies, advice_risk, …) */
  meta: Map<string, VocabValue>;
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
      meta: new Map(),
    };
    for (const v of file.values) {
      index.values.add(v.value);
      index.meta.set(v.value, v);
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
    for (const target of v.implies ?? []) {
      if (target === v.value) problems.push(`"${v.value}" implies itself`);
      else if (!values.has(target)) problems.push(`"${v.value}" implies unknown value "${target}"`);
    }
  }
  return problems;
}

/** Live (not deprecated) values of a facet. */
export function liveValues(vocab: Vocab, facet: string): Set<string> {
  const index = vocab.get(facet);
  if (!index) return new Set();
  return new Set([...index.values].filter((v) => !index.deprecated.has(v)));
}

/** Every value a value implies, transitively (stack: nextjs -> react -> javascript). Cycle-safe. */
export function impliedBy(vocab: Vocab, facet: string, value: string): Set<string> {
  const out = new Set<string>();
  const index = vocab.get(facet);
  const queue = [...(index?.meta.get(value)?.implies ?? [])];
  while (queue.length > 0) {
    const next = queue.shift() as string;
    if (out.has(next) || next === value) continue;
    out.add(next);
    queue.push(...(index?.meta.get(next)?.implies ?? []));
  }
  return out;
}

/** Max categories in one domain before PS055 errors, and where it starts warning (TAXONOMY.md §2.3). */
export const DOMAIN_CATEGORY_LIMITS = { warn: 30, error: 40 } as const;

export interface VocabProblem {
  file: string;
  message: string;
  severity: 'error' | 'warning';
  rule: 'PS050' | 'PS055';
}

/**
 * Cross-vocabulary integrity (PS050) and domain width (PS055): category -> domain, subcategory -> parent,
 * advice-risk references and partials, disjoint domain and category ids. `partials` holds paths under partials/.
 */
export function checkVocabSet(vocab: Vocab, partials: Map<string, string>): VocabProblem[] {
  const problems: VocabProblem[] = [];
  const err = (facet: string, message: string) =>
    problems.push({ file: `vocab/${facet}.yml`, message, severity: 'error', rule: 'PS050' });
  const categories = vocab.get('category');
  const domains = vocab.get('domain');
  if (!categories || !domains) return problems;
  const liveCategories = liveValues(vocab, 'category');
  const perDomain = new Map<string, number>();
  for (const [value, meta] of categories.meta) {
    if (!meta.domain) err('category', `"${value}" has no domain`);
    else if (!domains.values.has(meta.domain)) err('category', `"${value}" has unknown domain "${meta.domain}"`);
    else if (liveCategories.has(value)) perDomain.set(meta.domain, (perDomain.get(meta.domain) ?? 0) + 1);
    for (const risk of meta.advice_risk ?? []) {
      if (!vocab.get('advice-risk')?.values.has(risk))
        err('category', `"${value}" lists unknown advice_risk "${risk}"`);
    }
    if (meta.deprecated_by && categories.deprecated.has(meta.deprecated_by)) {
      err('category', `"${value}" is deprecated_by "${meta.deprecated_by}", which is itself deprecated`);
    }
  }
  for (const [value, meta] of domains.meta) {
    if (liveCategories.has(value)) err('domain', `"${value}" is both a domain and a live category`);
    for (const syn of meta.synonyms ?? []) {
      if (liveCategories.has(syn)) err('domain', `synonym "${syn}" of "${value}" is a live category id`);
    }
  }
  for (const [domain, count] of perDomain) {
    if (count > DOMAIN_CATEGORY_LIMITS.warn) {
      problems.push({
        file: 'vocab/category.yml',
        message: `domain "${domain}" has ${count} categories (warn above ${DOMAIN_CATEGORY_LIMITS.warn}, error above ${DOMAIN_CATEGORY_LIMITS.error}); split the domain`,
        severity: count > DOMAIN_CATEGORY_LIMITS.error ? 'error' : 'warning',
        rule: 'PS055',
      });
    }
  }
  for (const [value, meta] of vocab.get('subcategory')?.meta ?? []) {
    if (!meta.parent) err('subcategory', `"${value}" has no parent category`);
    else if (!categories.values.has(meta.parent)) err('subcategory', `"${value}" has unknown parent "${meta.parent}"`);
    if (liveCategories.has(value)) err('subcategory', `"${value}" is also a category id`);
  }
  for (const [value, meta] of vocab.get('advice-risk')?.meta ?? []) {
    if ((meta.partials ?? []).length === 0) err('advice-risk', `"${value}" names no guardrail partials`);
    for (const partial of meta.partials ?? []) {
      if (!partials.has(`${partial}.md`))
        err('advice-risk', `"${value}" needs partials/${partial}.md, which does not exist`);
    }
  }
  return problems;
}
