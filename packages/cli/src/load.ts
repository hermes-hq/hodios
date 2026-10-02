import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import {
  buildVocab,
  checkVocabFile,
  parseIdsLock,
  parseYamlDocument,
  type EntrySource,
  type Issue,
  type LibraryContext,
} from '@hermes-hq/hodios-core';
import { validateVocab, type VocabFile } from '@hermes-hq/hodios-schema';

const toPosix = (p: string) => p.split(sep).join('/');

/** Lists files under `dir`, recursively, as POSIX paths relative to `dir`. */
function listFiles(dir: string): string[] {
  const out: string[] = [];
  const walk = (current: string) => {
    for (const name of readdirSync(current).sort()) {
      if (name === '.DS_Store') continue;
      const full = join(current, name);
      if (statSync(full).isDirectory()) walk(full);
      else out.push(toPosix(relative(dir, full)));
    }
  };
  if (existsSync(dir)) walk(dir);
  return out;
}

export interface LoadedRepo {
  context: LibraryContext;
  sources: EntrySource[];
  /** Problems found while loading (layout outside entry folders, vocab files). */
  issues: Issue[];
}

/** Reads library/, vocab/, partials/ and ids.lock from a Hodios source checkout. */
export function loadRepo(root: string): LoadedRepo {
  const issues: Issue[] = [];

  // vocab/: every file with a `facet` key is a controlled vocabulary.
  const vocabFiles: VocabFile[] = [];
  for (const rel of listFiles(join(root, 'vocab'))) {
    const file = `vocab/${rel}`;
    if (!/\.ya?ml$/.test(rel)) {
      issues.push({ rule: 'PS006', severity: 'error', file, message: 'vocab/ holds YAML files only' });
      continue;
    }
    const doc = parseYamlDocument(readFileSync(join(root, file), 'utf8'));
    if (doc.error) {
      issues.push({ rule: 'PS006', severity: 'error', file, message: doc.error });
      continue;
    }
    const isFacet = typeof doc.data === 'object' && doc.data !== null && 'facet' in doc.data;
    if (!isFacet) continue; // targets.yml, url-allowlist.yml: other shapes, checked by their own tools
    const result = validateVocab(doc.data);
    if (!result.valid || !result.value) {
      for (const i of result.issues) {
        issues.push({
          rule: 'PS006',
          severity: 'error',
          file,
          message: `${i.path.slice(1).replaceAll('/', '.') || 'root'}: ${i.message}`,
        });
      }
      continue;
    }
    const expected = rel.replace(/\.ya?ml$/, '');
    if (result.value.facet !== expected) {
      issues.push({
        rule: 'PS006',
        severity: 'error',
        file,
        message: `facet "${result.value.facet}" must match the file name "${expected}"`,
      });
    }
    for (const problem of checkVocabFile(result.value)) {
      issues.push({ rule: 'PS006', severity: 'error', file, message: problem });
    }
    vocabFiles.push(result.value);
  }

  const partials = new Map<string, string>();
  for (const rel of listFiles(join(root, 'partials'))) {
    if (!rel.endsWith('.md')) {
      issues.push({
        rule: 'PS011',
        severity: 'error',
        file: `partials/${rel}`,
        message: 'partials/ holds Markdown files only',
      });
      continue;
    }
    partials.set(rel, readFileSync(join(root, 'partials', rel), 'utf8'));
  }

  const lockPath = join(root, 'ids.lock');
  const idsLock = parseIdsLock(existsSync(lockPath) ? readFileSync(lockPath, 'utf8') : '');
  if (!existsSync(lockPath)) {
    issues.push({ rule: 'PS003', severity: 'error', file: 'ids.lock', message: 'ids.lock is missing' });
  }

  // library/<category>/<id>/…
  const sources: EntrySource[] = [];
  const libraryDir = join(root, 'library');
  if (!existsSync(libraryDir)) {
    issues.push({ rule: 'PS009', severity: 'error', file: 'library', message: 'library/ is missing' });
  } else {
    for (const category of readdirSync(libraryDir).sort()) {
      const categoryDir = join(libraryDir, category);
      if (category === '.DS_Store') continue;
      if (!statSync(categoryDir).isDirectory()) {
        issues.push({
          rule: 'PS009',
          severity: 'error',
          file: `library/${category}`,
          message: 'only category folders belong in library/',
        });
        continue;
      }
      for (const id of readdirSync(categoryDir).sort()) {
        const entryDir = join(categoryDir, id);
        if (id === '.DS_Store') continue;
        if (!statSync(entryDir).isDirectory()) {
          issues.push({
            rule: 'PS009',
            severity: 'error',
            file: `library/${category}/${id}`,
            message: 'only entry folders belong in a category folder',
          });
          continue;
        }
        const files = new Map<string, string>();
        for (const rel of listFiles(entryDir)) files.set(rel, readFileSync(join(entryDir, rel), 'utf8'));
        sources.push({ dir: `library/${category}/${id}`, files });
      }
    }
  }

  return { context: { vocab: buildVocab(vocabFiles), partials, idsLock }, sources, issues };
}
