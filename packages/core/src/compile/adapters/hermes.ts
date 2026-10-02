import { exportName } from '../text.js';
import type { Adapter, ResolvedEntry } from '../types.js';
import { ALL_KINDS } from './skill.js';

export const HERMES_BUNDLE_VERSION = 2;

/** One bundle item. Hermes renders `body` itself through `@hermes-hq/hodios-core`, so arguments stay `{{x}}`. */
export interface HermesBundleItem {
  id: string;
  kind: ResolvedEntry['fm']['kind'];
  version: string;
  title: string;
  description: string;
  category: string;
  aliases?: string[];
  tags?: string[];
  stage?: string[];
  args?: NonNullable<ResolvedEntry['fm']['args']>;
  body: string;
  steps?: { id: string; stage: string; gate: string; artifact?: string; text: string }[];
  levels?: NonNullable<ResolvedEntry['fm']['levels']>;
  applies_to?: string[];
  pairs_with?: ResolvedEntry['fm']['pairs_with'];
  hash?: string;
}

/**
 * `.hermes-prompts` bundle v2 (design §9.4): items keyed by id, never by name; ids are never regenerated.
 * Partials and examples are expanded, so a bundle is self-contained.
 */
export interface HermesBundle {
  _hermes_bundle_version: 2;
  source?: string;
  items: HermesBundleItem[];
}

export function hermesItem(entry: ResolvedEntry, hash?: string): HermesBundleItem {
  const { fm } = entry;
  const item: HermesBundleItem = {
    id: fm.id,
    kind: fm.kind,
    version: fm.version,
    title: fm.title,
    description: fm.description,
    category: fm.category,
    aliases: fm.aliases?.length ? fm.aliases : undefined,
    tags: fm.tags?.length ? fm.tags : undefined,
    stage: fm.stage?.length ? fm.stage : undefined,
    args: fm.args?.length ? fm.args : undefined,
    body: entry.body,
    steps: entry.steps.length
      ? entry.steps.map((s) => ({ id: s.id, stage: s.stage, gate: s.gate, artifact: s.artifact, text: s.text }))
      : undefined,
    levels: fm.levels,
    applies_to: fm.applies_to,
    pairs_with: fm.pairs_with,
    hash,
  };
  return JSON.parse(JSON.stringify(item)) as HermesBundleItem; // drop undefined keys
}

export function hermesBundle(
  entries: readonly ResolvedEntry[],
  opts: { catalog?: string; hash?: (entry: ResolvedEntry) => string } = {},
): string {
  const bundle: HermesBundle = {
    _hermes_bundle_version: HERMES_BUNDLE_VERSION,
    source: opts.catalog ? `hodios@${opts.catalog}` : 'hodios',
    items: [...entries].sort((a, b) => a.fm.id.localeCompare(b.fm.id)).map((e) => hermesItem(e, opts.hash?.(e))),
  };
  return `${JSON.stringify(bundle, null, 2)}\n`;
}

export const hermesBundleAdapter: Adapter = {
  id: 'hermes-bundle',
  label: 'Hermes IDE bundle (.hermes-prompts v2)',
  kinds: ALL_KINDS,
  compile(entry, ctx) {
    const content = hermesBundle([entry], { catalog: ctx.catalog });
    return {
      files: [{ slot: 'prompts', name: `${exportName(entry.fm.id)}.hermes-prompts`, content, mode: 'file' }],
      warnings: [],
    };
  },
};
