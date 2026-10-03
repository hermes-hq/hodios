import { ID_PATTERN, type EntryFrontmatter } from '@hermes-hq/hodios-schema';
import type { Issue } from './rules.js';

/**
 * curated.txt: the curated tier, one id per line, sorted (TAXONOMY.md §6.1). Only curated entries go to
 * hermes-hq/hodios-dist (Agent Skills, Claude Code plugins, native trees, paste, bundles); every entry is in the
 * catalog. `tools/release/curate.mjs` regenerates the file; maintainers review the diff in git.
 *
 *   <id>     in the curated tier
 *   !<id>    opted out: never curated, and the script never adds it
 *   # ...    comment
 */
export interface CuratedList {
  ids: Set<string>;
  excluded: Set<string>;
  problems: { line: number; message: string }[];
}

/** hodios-dist cap (design §3.3, §12.4): installers clone or tree-list the whole repo. */
export const CURATED_MAX = 2000;
/** What `tools/release/curate.mjs` fills to, leaving headroom under the cap for hand-picked promotions. */
export const CURATED_TARGET = 1900;

const idRe = new RegExp(ID_PATTERN);

export function parseCuratedList(text: string): CuratedList {
  const ids = new Set<string>();
  const excluded = new Set<string>();
  const problems: CuratedList['problems'] = [];
  let previous = '';
  text.split(/\r?\n/).forEach((raw, i) => {
    const line = i + 1;
    const trimmed = raw.trim();
    if (trimmed === '' || trimmed.startsWith('#')) return;
    const out = trimmed.startsWith('!');
    const id = out ? trimmed.slice(1) : trimmed;
    if (!idRe.test(id) || id.startsWith('@')) {
      problems.push({ line, message: `invalid unscoped id "${id}"` });
      return;
    }
    if (ids.has(id) || excluded.has(id)) {
      problems.push({ line, message: `"${id}" is listed twice` });
      return;
    }
    if (previous && id < previous) problems.push({ line, message: `not sorted: "${id}" comes after "${previous}"` });
    previous = id;
    (out ? excluded : ids).add(id);
  });
  return { ids, excluded, problems };
}

/** PS060: every curated id is a live entry outside the holding area, not deprecated, and the tier fits the cap. */
export function checkCurated(list: CuratedList, entries: readonly EntryFrontmatter[]): Issue[] {
  const file = 'curated.txt';
  const issues: Issue[] = list.problems.map((p) => ({
    rule: 'PS060',
    severity: 'error',
    file,
    message: `line ${p.line}: ${p.message}`,
  }));
  const byId = new Map(entries.map((fm) => [fm.id, fm]));
  const aliasOf = new Map(entries.flatMap((fm) => (fm.aliases ?? []).map((a) => [a, fm.id] as const)));
  const unknown = (id: string) => {
    const successor = aliasOf.get(id);
    return successor ? `"${id}" is now an alias of "${successor}"; list "${successor}"` : `"${id}" is not an entry`;
  };
  for (const id of list.ids) {
    const fm = byId.get(id);
    if (!fm) issues.push({ rule: 'PS060', severity: 'error', file, message: unknown(id) });
    else if (fm.status === 'deprecated')
      issues.push({ rule: 'PS060', severity: 'error', file, message: `"${id}" is deprecated and cannot be curated` });
    else if (fm.category === 'unsorted')
      issues.push({
        rule: 'PS060',
        severity: 'error',
        file,
        message: `"${id}" is in the holding area (other/unsorted) and cannot be curated`,
      });
  }
  for (const id of list.excluded) {
    if (!byId.has(id)) issues.push({ rule: 'PS060', severity: 'error', file, message: unknown(id) });
  }
  if (list.ids.size > CURATED_MAX) {
    issues.push({
      rule: 'PS060',
      severity: 'error',
      file,
      message: `${list.ids.size} curated entries; hodios-dist holds at most ${CURATED_MAX}`,
    });
  }
  return issues;
}
