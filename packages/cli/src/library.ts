import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import {
  buildCatalog,
  checkLibrary,
  objectPath,
  parsePack,
  parseYamlDocument,
  resolveEntry,
  resolvePack,
  type CatalogOutput,
  type Issue,
  type PackObject,
  type ResolvedEntry,
  type Vocab,
} from '@hermes-hq/hodios-core';
import { loadRepo } from './load.js';

export const sha256 = (text: string): string => createHash('sha256').update(text, 'utf8').digest('hex');

export interface Library {
  entries: ResolvedEntry[];
  packs: PackObject[];
  vocab: Vocab;
  issues: Issue[];
}

/** Validates the checkout and resolves every entry into its self-contained form. Errors stop the build. */
export function loadLibrary(root: string): Library {
  const repo = loadRepo(root);
  const checked = checkLibrary(repo.sources, repo.context);
  const issues = [...repo.issues, ...checked.issues];
  if (issues.some((i) => i.severity === 'error')) return { entries: [], packs: [], vocab: repo.context.vocab, issues };
  const entries = repo.sources.map((src) => resolveEntry(src, repo.context.partials));
  const packs: PackObject[] = [];
  const packDir = join(root, 'packs');
  if (existsSync(packDir)) {
    for (const file of readdirSync(packDir)
      .filter((f) => /\.ya?ml$/.test(f))
      .sort()) {
      const doc = parseYamlDocument(readFileSync(join(packDir, file), 'utf8'));
      const parsed = parsePack(doc.data, file.replace(/\.ya?ml$/, ''));
      if (doc.error || parsed.error || !parsed.pack) {
        issues.push({
          rule: 'PS000',
          severity: 'error',
          file: `packs/${file}`,
          message: doc.error ?? parsed.error ?? 'invalid',
        });
        continue;
      }
      packs.push(
        resolvePack(
          parsed.pack,
          entries.map((e) => e.fm),
        ),
      );
    }
  }
  return { entries, packs, vocab: repo.context.vocab, issues };
}

/** Today's catalog CalVer, `YYYY.MDD.0` (UTC). */
export function todayCalver(now = new Date()): string {
  return `${now.getUTCFullYear()}.${(now.getUTCMonth() + 1) * 100 + now.getUTCDate()}.0`;
}

/** Writes the v1 catalog (manifest + content-addressed objects) into `dir`. */
export function writeCatalog(lib: Library, dir: string, catalog: string, seq = 0): CatalogOutput {
  const out = buildCatalog({ entries: lib.entries, vocab: lib.vocab, catalog, sha256, packs: lib.packs, seq });
  for (const [ref, text] of out.objects) {
    const path = join(dir, objectPath(ref));
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, text);
  }
  writeFileSync(join(dir, 'manifest.json'), `${JSON.stringify(out.manifest, null, 2)}\n`);
  return out;
}
