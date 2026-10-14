#!/usr/bin/env node
// Fills `depth:` (vocab/depth.yml, TAXONOMY.md §3.12) in entries that have none, with the deterministic heuristic in
// @hermes-hq/hodios-core `suggestDepth`, and applies hand overrides. Review the diff: the heuristic only seeds the
// field, and a reviewer moves an entry to another level when it reads wrong.
//
// Usage: npm run build && node tools/release/fill-depth.mjs [--set <id>=<depth>]... [--from <file>] [--check]
//   --set id=depth  set (or change) one entry's depth
//   --from file     the same, one "id depth" pair per line (# comments allowed)
//   --check         exit 1 if any entry has no depth, instead of writing
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * Sets `depth: <value>` in an entry file's front matter: replaces an existing depth line, else inserts it after
 * `level:` (or after `status:` when there is no level). Returns the text unchanged when it already says so.
 * @param {string} text
 * @param {string} depth
 */
export function setDepth(text, depth) {
  const end = text.indexOf('\n---', 4);
  if (!text.startsWith('---\n') || end < 0) throw new Error('no front matter');
  const head = text.slice(0, end + 1);
  const tail = text.slice(end + 1);
  const line = `depth: ${depth}\n`;
  if (/^depth:.*\n/m.test(head)) return head.replace(/^depth:.*\n/m, line) + tail;
  for (const key of ['level', 'status']) {
    const m = new RegExp(`^${key}:.*\\n`, 'm').exec(head);
    if (m) return head.slice(0, m.index + m[0].length) + line + head.slice(m.index + m[0].length) + tail;
  }
  return head + line + tail;
}

async function main() {
  const args = process.argv.slice(2);
  const root = fileURLToPath(new URL('../../', import.meta.url));
  const { loadRepo } = await import(pathToFileURL(join(root, 'packages/cli/dist/load.js')).href);
  const { checkLibrary, depthLevels, suggestDepth } = await import('@hermes-hq/hodios-core');
  const overrides = new Map();
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--set') {
      const [id, depth] = String(args[++i]).split('=');
      overrides.set(id, depth);
    } else if (args[i] === '--from') {
      for (const raw of readFileSync(String(args[++i]), 'utf8').split('\n')) {
        const line = raw.replace(/#.*/, '').trim();
        if (!line) continue;
        const [id, depth] = line.split(/\s+/);
        overrides.set(id, depth);
      }
    }
  }
  const check = args.includes('--check');
  const repo = loadRepo(root);
  const levels = depthLevels(repo.context.vocab);
  if (levels.length === 0) throw new Error('vocab/depth.yml is missing');
  for (const depth of overrides.values()) if (!levels.includes(depth)) throw new Error(`unknown depth "${depth}"`);
  const { entries } = checkLibrary(repo.sources, repo.context);
  const ids = new Set(entries.flatMap((e) => (e.frontmatter ? [e.frontmatter.id] : [])));
  for (const id of overrides.keys()) if (!ids.has(id)) throw new Error(`--set/--from: "${id}" is not an entry`);
  const counts = Object.fromEntries(levels.map((l) => [l, 0]));
  const missing = [];
  let written = 0;
  for (const e of entries) {
    const fm = e.frontmatter;
    if (!fm || !e.file) continue;
    const want = overrides.get(fm.id) ?? fm.depth ?? suggestDepth(fm, repo.context.vocab);
    counts[want] = (counts[want] ?? 0) + 1;
    if (fm.depth === want) continue;
    if (!fm.depth) missing.push(fm.id);
    if (check) continue;
    const path = join(root, e.file);
    writeFileSync(path, setDepth(readFileSync(path, 'utf8'), want));
    written++;
  }
  const summary = levels.map((l) => `${counts[l]} ${l}`).join(', ');
  if (check) {
    console.log(`${missing.length} entries without depth (${summary}).`);
    process.exit(missing.length > 0 ? 1 : 0);
  }
  console.log(`Wrote depth in ${written} entries (${missing.length} had none). Depth now: ${summary}.`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main();
