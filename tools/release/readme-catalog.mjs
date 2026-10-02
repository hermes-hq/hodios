#!/usr/bin/env node
// Writes the README catalog section (between <!-- catalog:start --> and <!-- catalog:end -->) from the library.
// One row per category, never one per entry, so the table stays readable at any catalog size.
//
// Usage: npm run build && node tools/release/readme-catalog.mjs [--check]
//   --check  exit 1 if README.md is out of date instead of writing it
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const START = '<!-- catalog:start -->';
const END = '<!-- catalog:end -->';
const EXAMPLES = 3;
const KINDS = ['prompt', 'persona', 'workflow', 'rule', 'style'];

/**
 * @param {{id: string, kind: string, category: string, title: string, path: string}[]} entries
 * @param {{domains: {value: string, label: string}[], categories: {value: string, label: string, domain: string}[]}} vocab
 * @returns {string} Markdown for the section body
 */
export function renderCatalog(entries, vocab) {
  const byKind = Object.fromEntries(KINDS.map((k) => [k, entries.filter((e) => e.kind === k).length]));
  const kinds = KINDS.filter((k) => byKind[k] > 0)
    .map((k) => `${byKind[k]} ${k}${byKind[k] === 1 ? '' : 's'}`)
    .join(', ');
  const lines = [`**${entries.length} entries** (${kinds}).`, ''];
  for (const domain of vocab.domains) {
    const cats = vocab.categories
      .filter((c) => c.domain === domain.value)
      .map((c) => ({ ...c, entries: entries.filter((e) => e.category === c.value) }))
      .filter((c) => c.entries.length > 0)
      .sort((a, b) => b.entries.length - a.entries.length || a.value.localeCompare(b.value));
    if (cats.length === 0) continue;
    const total = cats.reduce((n, c) => n + c.entries.length, 0);
    lines.push(`<details><summary><b>${domain.label}</b> · ${total}</summary>`, '');
    lines.push('| Category | Entries | Try |', '|---|---:|---|');
    for (const c of cats) {
      const picks = [...c.entries]
        .sort((a, b) => KINDS.indexOf(a.kind) - KINDS.indexOf(b.kind) || a.id.localeCompare(b.id))
        .slice(0, EXAMPLES)
        .map((e) => `[\`${e.id}\`](${e.path})`)
        .join(' · ');
      lines.push(`| ${c.label} | ${c.entries.length} | ${picks} |`);
    }
    lines.push('', '</details>', '');
  }
  return lines.join('\n').trimEnd();
}

/** Replaces the text between the markers; throws if they are missing. */
export function replaceSection(readme, body) {
  const start = readme.indexOf(START);
  const end = readme.indexOf(END);
  if (start < 0 || end < start) throw new Error(`README.md needs ${START} and ${END}`);
  return `${readme.slice(0, start + START.length)}\n${body}\n${readme.slice(end)}`;
}

async function main() {
  const root = fileURLToPath(new URL('../../', import.meta.url));
  const { loadLibrary } = await import(pathToFileURL(join(root, 'packages/cli/dist/library.js')).href);
  const lib = loadLibrary(root);
  const errors = lib.issues.filter((i) => i.severity === 'error');
  if (errors.length > 0) throw new Error(`${errors.length} validation errors; run npm run validate`);
  const { parse } = await import('yaml');
  const values = (facet) => parse(readFileSync(join(root, 'vocab', `${facet}.yml`), 'utf8')).values;
  /** @type {Map<string, string>} entry id -> folder path relative to the repo root */
  const folders = new Map();
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (KINDS.includes(name.replace(/\.md$/, ''))) folders.set(dir.split(sep).pop(), relative(root, dir));
    }
  };
  walk(join(root, 'library'));
  const entries = lib.entries.map((e) => ({
    id: e.fm.id,
    kind: e.fm.kind,
    category: e.fm.category,
    title: e.fm.title,
    path: `${(folders.get(e.fm.id) ?? '').split(sep).join('/')}/`,
  }));
  const body = renderCatalog(entries, { domains: values('domain'), categories: values('category') });
  const file = join(root, 'README.md');
  const before = readFileSync(file, 'utf8');
  const after = replaceSection(before, body);
  if (process.argv.includes('--check')) {
    if (before !== after) {
      console.error('README.md catalog section is out of date; run node tools/release/readme-catalog.mjs');
      process.exit(1);
    }
    return;
  }
  writeFileSync(file, after);
  console.log(`README.md catalog section: ${entries.length} entries.`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main();
