import type { EntryFrontmatter } from '@hermes-hq/hodios-schema';
import type { Issue } from './rules.js';
import { liveValues, type Vocab } from './vocab.js';

/**
 * The everyday layer (TAXONOMY.md §6.2–§6.4): essentials.yml (the fixed-size front shelves), vocab/intent.yml (verbs
 * and topics over the categories), queries.yml (everyday words routed to a front door) and the depth facet
 * (vocab/depth.yml). All isomorphic: the CLI reads the files, the core parses and checks them.
 */

/** essentials.yml caps. Fixed: to add an id, remove one (one in, one out). */
export const ESSENTIALS_LIMITS = { level1: 24, level2: 200 } as const;

export interface Essentials {
  /** Front doors: shown first everywhere (row `ess` = 2). */
  level1: string[];
  /** The everyday essentials shelf, including every level1 id (row `ess` = 1 for the rest). */
  level2: string[];
}

export interface IntentDef {
  id: string;
  label: string;
  hint?: string;
}

export interface TopicDef {
  id: string;
  label: string;
}

/** vocab/intent.yml: verbs and topics in display order, and every category mapped to 1–2 intents and one topic. */
export interface IntentVocab {
  intents: IntentDef[];
  topics: TopicDef[];
  categories: Record<string, { intents: string[]; topic: string }>;
}

/** One queries.yml item: everyday phrases that route to a front door, plus the specialists to offer next. */
export interface QueryRoute {
  to: string;
  phrases: string[];
  refine: string[];
}

export interface Parsed<T> {
  value?: T;
  problems: string[];
}

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const strings = (v: unknown): v is string[] => Array.isArray(v) && v.every((s) => typeof s === 'string');

export function parseEssentials(data: unknown): Parsed<Essentials> {
  const problems: string[] = [];
  if (!isObject(data)) return { problems: ['must be a mapping with level1 and level2'] };
  for (const key of Object.keys(data)) if (key !== 'level1' && key !== 'level2') problems.push(`unknown key "${key}"`);
  const list = (key: 'level1' | 'level2'): string[] => {
    const v = data[key];
    if (!strings(v)) {
      problems.push(`${key} must be a list of ids`);
      return [];
    }
    return v;
  };
  const value = { level1: list('level1'), level2: list('level2') };
  return { value, problems };
}

export function parseIntentVocab(data: unknown): Parsed<IntentVocab> {
  const problems: string[] = [];
  if (!isObject(data)) return { problems: ['must be a mapping with intents, topics and categories'] };
  const defs = <T extends { id: string; label: string }>(key: string, extra?: string): T[] => {
    const v = data[key];
    if (!Array.isArray(v)) {
      problems.push(`${key} must be a list`);
      return [];
    }
    const out: T[] = [];
    v.forEach((item, i) => {
      if (!isObject(item) || typeof item.id !== 'string' || typeof item.label !== 'string') {
        problems.push(`${key}[${i}] needs an id and a label`);
        return;
      }
      if (!SLUG.test(item.id)) problems.push(`${key}[${i}]: "${item.id}" is not a kebab-case id`);
      const def: Record<string, string> = { id: item.id, label: item.label };
      if (extra && typeof item[extra] === 'string') def[extra] = item[extra] as string;
      out.push(def as unknown as T);
    });
    return out;
  };
  const intents = defs<IntentDef>('intents', 'hint');
  const topics = defs<TopicDef>('topics');
  const categories: IntentVocab['categories'] = {};
  const raw = data['categories'];
  if (!isObject(raw)) problems.push('categories must map each category to {intents, topic}');
  else {
    for (const [category, value] of Object.entries(raw)) {
      if (!isObject(value) || !strings(value.intents) || typeof value.topic !== 'string') {
        problems.push(`categories.${category} needs intents: [..] and topic: ..`);
        continue;
      }
      categories[category] = { intents: value.intents, topic: value.topic };
    }
  }
  return { value: { intents, topics, categories }, problems };
}

export function parseQueries(data: unknown): Parsed<QueryRoute[]> {
  const problems: string[] = [];
  if (!Array.isArray(data)) return { problems: ['must be a list of {to, phrases, refine}'] };
  const value: QueryRoute[] = [];
  data.forEach((item, i) => {
    if (!isObject(item) || typeof item.to !== 'string' || !strings(item.phrases)) {
      problems.push(`item ${i + 1} needs to: <id> and phrases: [..]`);
      return;
    }
    if (item.refine !== undefined && !strings(item.refine))
      problems.push(`item ${i + 1} (${item.to}): refine must list ids`);
    value.push({ to: item.to, phrases: item.phrases, refine: strings(item.refine) ? item.refine : [] });
  });
  return { value, problems };
}

// ─── Depth ────────────────────────────────────────────────────────────

/** Live depth values in vocab order: the first is the front door ("Start here"), the last the expert end. */
export function depthLevels(vocab: Vocab): string[] {
  return [...liveValues(vocab, 'depth')];
}

/** The level an entry without `depth` counts as: the middle of the vocab order. */
export function defaultDepth(levels: readonly string[]): string | undefined {
  return levels[Math.floor((levels.length - 1) / 2)];
}

const DEPTH_STOP = new Set(
  'a an the and or of for to in on with your my our you me it its this that from into at by as up out about how what when who which'.split(
    ' ',
  ),
);
/** Words that never make an id specific: verbs of doing and generic role nouns (TAXONOMY.md §3.12). */
const DEPTH_GENERIC = new Set(
  'plan write make create build get start choose find learn improve review fix explain prepare draft run do set organize organise manage track check help guide idea ideas list basics basic first simple general new beginner everyday personal own something anything thing things coach tutor planner assistant helper'.split(
    ' ',
  ),
);

/** A crude English stem, enough to match "planning" with "plan" and "itineraries" with "itinerary". */
export function stemWord(word: string): string {
  let w = word.toLowerCase();
  for (const s of ['ings', 'ing', 'ers', 'er', 'ies', 'es', 's', 'ed']) {
    if (w.length > s.length + 2 && w.endsWith(s)) {
      w = w.slice(0, -s.length) + (s === 'ies' ? 'y' : '');
      break;
    }
  }
  return /(.)\1$/.test(w) ? w.slice(0, -1) : w;
}

const idWords = (s: string) =>
  s
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

/**
 * The deterministic depth heuristic (TAXONOMY.md §3.12) used to fill `depth` when an entry has none:
 *   - `level: expert` → the last level;
 *   - every word of the id, after stop words and generic verbs/role nouns, names the category or its domain
 *     (the value, its label or a synonym) and the entry has no `stack` → the first level ("plan-itinerary" in
 *     trip-planning, "travel-planner");
 *   - otherwise the middle level ("plan-road-trip").
 * Authors and reviewers override it in front matter; the heuristic only seeds the field.
 */
export function suggestDepth(fm: EntryFrontmatter, vocab: Vocab): string | undefined {
  const levels = depthLevels(vocab);
  if (levels.length === 0) return undefined;
  if (fm.level === 'expert') return levels.at(-1);
  const own = new Set<string>();
  const addWords = (text: string | undefined) => idWords(text ?? '').forEach((w) => own.add(stemWord(w)));
  const cat = vocab.get('category');
  const meta = cat?.meta.get(fm.category);
  addWords(fm.category);
  addWords(meta?.label);
  for (const s of meta?.synonyms ?? []) addWords(s);
  if (meta?.domain) {
    addWords(meta.domain);
    addWords(vocab.get('domain')?.meta.get(meta.domain)?.label);
  }
  const rest = idWords(fm.id).filter(
    (w) => !DEPTH_STOP.has(w) && !DEPTH_GENERIC.has(w) && !DEPTH_GENERIC.has(stemWord(w)) && !own.has(stemWord(w)),
  );
  if (rest.length === 0 && (fm.stack ?? []).length === 0) return levels[0];
  return defaultDepth(levels);
}

// ─── Checks ───────────────────────────────────────────────────────────

export interface EverydayContext {
  vocab: Vocab;
  essentials?: Parsed<Essentials>;
  intent?: Parsed<IntentVocab>;
  queries?: Parsed<QueryRoute[]>;
}

/**
 * PS061 (essentials.yml), PS062 (vocab/intent.yml and entry intent/topic overrides), PS063 (queries.yml) and PS064
 * (depth: every live category has a first-level entry; entries without depth are warned with a suggestion).
 */
export function checkEveryday(ctx: EverydayContext, entries: readonly EntryFrontmatter[]): Issue[] {
  const issues: Issue[] = [];
  const add = (rule: Issue['rule'], severity: Issue['severity'], file: string, message: string) =>
    issues.push({ rule, severity, file, message });
  const byId = new Map(entries.map((fm) => [fm.id, fm]));
  const aliasOf = new Map(entries.flatMap((fm) => (fm.aliases ?? []).map((a) => [a, fm.id] as const)));
  const levels = depthLevels(ctx.vocab);
  const first = levels[0];
  const liveEntry = (file: string, rule: Issue['rule'], id: string, where: string): EntryFrontmatter | undefined => {
    const fm = byId.get(id);
    if (!fm) {
      const successor = aliasOf.get(id);
      add(rule, 'error', file, `${where}: "${id}" ${successor ? `is an alias of "${successor}"` : 'is not an entry'}`);
      return undefined;
    }
    if (fm.status === 'deprecated') add(rule, 'error', file, `${where}: "${id}" is deprecated`);
    if (fm.category === 'unsorted') add(rule, 'error', file, `${where}: "${id}" is in the holding area`);
    return fm;
  };

  // PS061: essentials.yml.
  if (ctx.essentials) {
    const file = 'essentials.yml';
    for (const p of ctx.essentials.problems) add('PS061', 'error', file, p);
    const ess = ctx.essentials.value;
    if (ess) {
      for (const key of ['level1', 'level2'] as const) {
        const list = ess[key];
        if (list.length > ESSENTIALS_LIMITS[key])
          add(
            'PS061',
            'error',
            file,
            `${key} lists ${list.length} ids; the cap is ${ESSENTIALS_LIMITS[key]}. To add one, remove one`,
          );
        const seen = new Set<string>();
        for (const id of list) {
          if (seen.has(id)) add('PS061', 'error', file, `${key}: "${id}" is listed twice`);
          seen.add(id);
          const fm = liveEntry(file, 'PS061', id, key);
          if (fm && first && fm.depth !== first)
            add(
              'PS061',
              'error',
              file,
              `${key}: "${id}" has depth "${fm.depth ?? 'unset'}"; essentials are "${first}" entries only`,
            );
        }
      }
      const level2 = new Set(ess.level2);
      for (const id of ess.level1)
        if (!level2.has(id)) add('PS061', 'error', file, `level1 id "${id}" must also be in level2 (level1 ⊂ level2)`);
    }
  }

  // PS062: vocab/intent.yml covers every live category; entry overrides use known values.
  if (ctx.intent) {
    const file = 'vocab/intent.yml';
    for (const p of ctx.intent.problems) add('PS062', 'error', file, p);
    const iv = ctx.intent.value;
    if (iv) {
      const intents = new Set(iv.intents.map((i) => i.id));
      const topics = new Set(iv.topics.map((t) => t.id));
      if (intents.size !== iv.intents.length) add('PS062', 'error', file, 'an intent id is listed twice');
      if (topics.size !== iv.topics.length) add('PS062', 'error', file, 'a topic id is listed twice');
      const categories = ctx.vocab.get('category');
      for (const live of liveValues(ctx.vocab, 'category'))
        if (!iv.categories[live]) add('PS062', 'error', file, `category "${live}" has no intents and topic`);
      for (const [category, map] of Object.entries(iv.categories)) {
        if (!categories?.values.has(category)) add('PS062', 'error', file, `"${category}" is not a category`);
        if (map.intents.length < 1 || map.intents.length > 2)
          add('PS062', 'error', file, `${category}: list 1–2 intents`);
        for (const i of map.intents)
          if (!intents.has(i)) add('PS062', 'error', file, `${category}: unknown intent "${i}"`);
        if (!topics.has(map.topic)) add('PS062', 'error', file, `${category}: unknown topic "${map.topic}"`);
      }
    }
  }

  // PS063: queries.yml.
  if (ctx.queries) {
    const file = 'queries.yml';
    for (const p of ctx.queries.problems) add('PS063', 'error', file, p);
    const owners = new Map<string, string>();
    for (const route of ctx.queries.value ?? []) {
      liveEntry(file, 'PS063', route.to, `to`);
      if (route.phrases.length === 0) add('PS063', 'error', file, `${route.to}: list at least one phrase`);
      for (const phrase of route.phrases) {
        const norm = normalizePhrase(phrase);
        if (norm === '' || norm !== phrase)
          add(
            'PS063',
            'error',
            file,
            `${route.to}: phrase "${phrase}" must be lower case words separated by single spaces`,
          );
        const owner = owners.get(norm);
        if (owner && owner !== route.to)
          add('PS063', 'error', file, `phrase "${phrase}" routes to both "${owner}" and "${route.to}"`);
        owners.set(norm, route.to);
      }
      for (const id of route.refine) {
        liveEntry(file, 'PS063', id, `${route.to} refine`);
        if (id === route.to) add('PS063', 'error', file, `${route.to}: refine must not list the front door itself`);
      }
    }
  }

  // PS064: depth.
  if (first) {
    const perCategory = new Map<string, { runnable: number; runnableFirst: number; first: number }>();
    for (const fm of entries) {
      if (fm.status === 'deprecated') continue;
      const c = perCategory.get(fm.category) ?? { runnable: 0, runnableFirst: 0, first: 0 };
      const runnable = fm.kind === 'prompt' || fm.kind === 'workflow';
      if (runnable) c.runnable++;
      if (fm.depth === first) {
        c.first++;
        if (runnable) c.runnableFirst++;
      }
      perCategory.set(fm.category, c);
    }
    for (const category of liveValues(ctx.vocab, 'category')) {
      if (category === 'unsorted') continue;
      const c = perCategory.get(category);
      if (!c) continue; // an empty category has nothing to show yet
      const ok = c.runnable > 0 ? c.runnableFirst > 0 : c.first > 0;
      if (!ok)
        add(
          'PS064',
          'error',
          `vocab/category.yml`,
          `category "${category}" has no "${first}" ${c.runnable > 0 ? 'prompt or workflow' : 'entry'}: give it a front door (depth: ${first})`,
        );
    }
  }
  return issues;
}

/** Lower case, words of letters and digits separated by single spaces. */
export function normalizePhrase(text: string): string {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
    .join(' ');
}
