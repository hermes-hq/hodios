#!/usr/bin/env node
// Copies a `hodios build` output into a hermes-hq/hodios-dist checkout: every generated tree, including the v1
// catalog the CLI reads from jsDelivr and raw GitHub, then the README's catalog line. See RELEASING.md.
//
// Usage: node tools/release/sync-dist.mjs <build-out-dir> <hodios-dist-checkout>
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

/** Top-level paths `hodios build` owns in hodios-dist. README.md, LICENSE and .git are kept. */
export const GENERATED = ['.claude-plugin', 'plugins', 'skills', 'native', 'paste', 'bundles', 'catalog'];
export const SKILL_MAX = 2000;
export const PLUGIN_MAX = 100;

/**
 * @param {{manifest: {catalog?: string, tiers?: Record<string, {rows: number}>} | null, skills: number,
 *   plugins: {name: string, category?: string}[]}} tree
 * @returns {string[]} reasons the tree must not be published
 */
export function checkTree({ manifest, skills, plugins }) {
  const errors = [];
  if (!manifest) errors.push('catalog/v1/manifest.json is missing; the hodios CLI reads the catalog from it');
  else if (!/^20\d{2}\.\d+\.\d+$/.test(manifest.catalog ?? ''))
    errors.push('catalog/v1/manifest.json has no catalog version');
  if (skills > SKILL_MAX) errors.push(`${skills} skills; hodios-dist holds at most ${SKILL_MAX}`);
  if (plugins.length > PLUGIN_MAX) errors.push(`${plugins.length} plugins; the marketplace limit is ${PLUGIN_MAX}`);
  const domains = plugins.filter((p) => p.category).map((p) => p.category);
  const repeated = domains.filter((d, i) => domains.indexOf(d) !== i);
  if (repeated.length > 0) errors.push(`more than one plugin for domain ${[...new Set(repeated)].join(', ')}`);
  return errors;
}

/** Rewrites "catalog `X`: N entries" in the hodios-dist README. */
export function updateReadme(readme, catalog, rows) {
  const line = /catalog `[^`]+`: [\d,]+ entries/;
  if (!line.test(readme)) throw new Error('hodios-dist README.md has no "catalog `X`: N entries" line');
  return readme.replace(line, `catalog \`${catalog}\`: ${rows.toLocaleString('en-US')} entries`);
}

function main() {
  const [from, to] = process.argv.slice(2);
  if (!from || !to) throw new Error('usage: node tools/release/sync-dist.mjs <build-out-dir> <hodios-dist-checkout>');
  if (!existsSync(join(to, '.git'))) throw new Error(`${to} is not a git checkout of hermes-hq/hodios-dist`);
  const manifestPath = join(from, 'catalog', 'v1', 'manifest.json');
  const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : null;
  const skills = existsSync(join(from, 'skills')) ? readdirSync(join(from, 'skills')).length : 0;
  const marketplace = join(from, '.claude-plugin', 'marketplace.json');
  const plugins = existsSync(marketplace) ? JSON.parse(readFileSync(marketplace, 'utf8')).plugins : [];
  const errors = checkTree({ manifest, skills, plugins });
  if (errors.length > 0) throw new Error(errors.join('\n'));

  for (const path of GENERATED) {
    // Catalog objects are content-addressed: earlier ones stay, so a manifest a CDN still caches can resolve them.
    if (path === 'catalog') rmSync(join(to, 'catalog', 'v1', 'manifest.json'), { force: true });
    else rmSync(join(to, path), { recursive: true, force: true });
    if (existsSync(join(from, path))) cpSync(join(from, path), join(to, path), { recursive: true });
  }
  const rows = Object.values(manifest.tiers ?? {}).reduce((n, t) => n + t.rows, 0);
  const readme = join(to, 'README.md');
  writeFileSync(readme, updateReadme(readFileSync(readme, 'utf8'), manifest.catalog, rows));
  console.log(
    `hodios-dist: catalog ${manifest.catalog}, ${rows} entries, ${skills} skills, ${plugins.length} plugins.`,
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
