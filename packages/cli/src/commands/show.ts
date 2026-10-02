import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';
import {
  ADAPTERS,
  TARGETS,
  compileFor,
  pasteText,
  type ResolvedEntry,
  type Scope,
} from '@hermes-hq/hodios-core/compile';
import { openCatalog, type Catalog } from '../catalog.js';
import type { Io } from '../cli.js';

export async function loadEntry(catalog: Catalog, id: string): Promise<ResolvedEntry> {
  const row = await catalog.row(id);
  if (!row) throw new Error(`no entry "${id}" in catalog ${catalog.manifest.catalog}; try hodios search ${id}`);
  return catalog.entry(row);
}

export async function runShow(args: string[], io: Io): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      target: { type: 'string' },
      format: { type: 'string' },
      scope: { type: 'string', default: 'project' },
      json: { type: 'boolean', default: false },
      catalog: { type: 'string' },
    },
    allowPositionals: true,
  });
  const [id] = positionals;
  if (!id) {
    io.err('usage: hodios show <id> [--target t] [--format f]');
    return 2;
  }
  const catalog = await openCatalog(io, values.catalog);
  const entry = await loadEntry(catalog, id);
  if (values.json && !values.target) {
    io.out(JSON.stringify(entry, null, 2));
    return 0;
  }
  if (!values.target) {
    const { fm } = entry;
    const facets = [
      ['kind', fm.kind],
      ['category', fm.category],
      ['version', fm.version],
      ['status', fm.status],
      ['stage', fm.stage?.join(', ')],
      ['stack', fm.stack?.join(', ')],
      ['risk', fm.risk],
      ['args', fm.args?.map((a) => `${a.name}${a.required ? '' : '?'}`).join(', ')],
    ].filter(([, v]) => v);
    io.out(`${fm.title} (${fm.id})\n${fm.description}\n`);
    for (const [k, v] of facets) io.out(`  ${String(k).padEnd(9)} ${String(v)}`);
    io.out(`\n${pasteText(entry, {}, { catalog: catalog.manifest.catalog }).trimEnd()}`);
    return 0;
  }
  const scope = values.scope as Scope;
  if (scope !== 'project' && scope !== 'user') throw new Error('--scope must be project or user');
  const result = compileFor(entry, values.target, { format: values.format, scope, catalog: catalog.manifest.catalog });
  for (const w of result.warnings) io.err(`warning ${w}`);
  if (values.json) {
    io.out(JSON.stringify(result, null, 2));
    return 0;
  }
  const many = result.files.length > 1;
  for (const file of result.files) {
    if (many) io.out(`==> ${file.path ?? file.name} <==`);
    io.out(file.content.trimEnd());
  }
  return 0;
}

/** Parses `name=value`; `@-` reads stdin and `@path` reads a file. */
async function argValues(pairs: string[], io: Io): Promise<Record<string, string>> {
  const values: Record<string, string> = {};
  for (const pair of pairs) {
    const eq = pair.indexOf('=');
    if (eq <= 0) throw new Error(`--arg expects name=value, got "${pair}"`);
    const name = pair.slice(0, eq);
    let value = pair.slice(eq + 1);
    if (value === '@-') value = io.readStdin ? await io.readStdin() : '';
    else if (value.startsWith('@')) value = readFileSync(resolve(io.cwd, value.slice(1)), 'utf8');
    values[name] = value.replace(/\n+$/, '');
  }
  return values;
}

function copyToClipboard(text: string): boolean {
  const candidates: [string, string[]][] =
    process.platform === 'darwin'
      ? [['pbcopy', []]]
      : process.platform === 'win32'
        ? [['clip', []]]
        : [
            ['wl-copy', []],
            ['xclip', ['-selection', 'clipboard']],
            ['xsel', ['--clipboard', '--input']],
          ];
  return candidates.some(([cmd, args]) => spawnSync(cmd, args, { input: text }).status === 0);
}

export async function runUse(args: string[], io: Io): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      arg: { type: 'string', multiple: true },
      var: { type: 'string', multiple: true },
      copy: { type: 'boolean', default: false },
      catalog: { type: 'string' },
    },
    allowPositionals: true,
  });
  const [id] = positionals;
  if (!id) {
    io.err('usage: hodios use <id> [--arg name=value]... [--copy]');
    return 2;
  }
  const catalog = await openCatalog(io, values.catalog);
  const entry = await loadEntry(catalog, id);
  const filled = await argValues([...(values.arg ?? []), ...(values.var ?? [])], io);
  const declared = new Set((entry.fm.args ?? []).map((a) => a.name));
  if (entry.fm.kind === 'style') declared.add('level');
  for (const name of Object.keys(filled)) {
    if (!declared.has(name))
      throw new Error(`${entry.fm.id} has no argument "${name}"; it takes: ${[...declared].join(', ') || 'none'}`);
  }
  const missing = (entry.fm.args ?? []).filter((a) => a.required && !filled[a.name]).map((a) => a.name);
  if (missing.length)
    io.err(`hodios use: missing ${missing.map((m) => `--arg ${m}=…`).join(', ')}; left as placeholders`);
  const text = pasteText(entry, filled, { catalog: catalog.manifest.catalog });
  if (values.copy) {
    if (copyToClipboard(text)) {
      io.err(`Copied ${entry.fm.id} (${text.length} characters) to the clipboard.`);
      return 0;
    }
    io.err('hodios use: no clipboard tool found (pbcopy, clip, wl-copy, xclip, xsel); printing instead');
  }
  io.out(text.trimEnd());
  return 0;
}

export function runTargets(_args: string[], io: Io): number {
  for (const target of TARGETS) {
    io.out(`${target.id}  ${target.label}`);
    for (const [kind, adapter] of Object.entries(target.defaults)) io.out(`  ${kind.padEnd(9)} ${adapter}`);
    if (target.alternatives.length) io.out(`  also     ${target.alternatives.join(', ')} (--format)`);
  }
  io.out(`\nFormats: ${ADAPTERS.map((a) => a.id).join(', ')}`);
  return 0;
}
