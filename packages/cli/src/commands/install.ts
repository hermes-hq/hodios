import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { parseArgs } from 'node:util';
import {
  compileFor,
  findSection,
  removeSection,
  targetById,
  upsertSection,
  type ResolvedEntry,
  type Scope,
} from '@hermes-hq/hodios-core/compile';
import { openCatalog, type Catalog } from '../catalog.js';
import type { Io } from '../cli.js';
import { loadEntry } from './show.js';

const sha = (text: string) => `sha256:${createHash('sha256').update(text, 'utf8').digest('hex')}`;

/** One installed file or section. `.hodios.lock` is a sorted list of these (design §6.5). */
export interface LockEntry {
  id: string;
  version: string;
  kind: string;
  target: string;
  format: string;
  /** Project-relative path, or `~/…` for user scope. */
  path: string;
  section: boolean;
  /** Hash of what was written (the whole file, or the section block). A different hash means a local edit. */
  hash: string;
  catalog: string;
}

interface LockFile {
  schema: 1;
  entries: LockEntry[];
}

interface Scoped {
  scope: Scope;
  lockPath: string;
  /** Turns a lock/compile path into an absolute path. */
  abs: (path: string) => string;
}

function scoped(io: Io, scope: string | undefined): Scoped {
  if (scope !== undefined && scope !== 'project' && scope !== 'user')
    throw new Error('--scope must be project or user');
  if (scope === 'user') {
    if (!io.home) throw new Error('no home directory');
    const home = io.home;
    const config = io.env?.['XDG_CONFIG_HOME'] || join(home, '.config');
    return {
      scope: 'user',
      lockPath: join(config, 'hodios', 'hodios.lock'),
      abs: (p) => resolve(home, p.replace(/^~\//, '')),
    };
  }
  return { scope: 'project', lockPath: join(io.cwd, '.hodios.lock'), abs: (p) => resolve(io.cwd, p) };
}

function readLock(path: string): LockFile {
  if (!existsSync(path)) return { schema: 1, entries: [] };
  const data = JSON.parse(readFileSync(path, 'utf8')) as Partial<LockFile>;
  return { schema: 1, entries: Array.isArray(data.entries) ? data.entries : [] };
}

function writeLock(path: string, lock: LockFile): void {
  if (lock.entries.length === 0) {
    rmSync(path, { force: true });
    return;
  }
  lock.entries.sort(
    (a, b) => a.id.localeCompare(b.id) || a.target.localeCompare(b.target) || a.path.localeCompare(b.path),
  );
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(lock, null, 2)}\n`);
}

const readText = (path: string) => (existsSync(path) ? readFileSync(path, 'utf8') : undefined);

/** Expands `pack:<name>` (a pack, or a category when no pack has that name) and aliases into entries. */
async function expandSpecs(catalog: Catalog, specs: string[]): Promise<ResolvedEntry[]> {
  const out: ResolvedEntry[] = [];
  const seen = new Set<string>();
  for (const spec of specs) {
    let ids: string[];
    if (spec.startsWith('pack:')) {
      const name = spec.slice(5);
      const pack = await catalog.pack(name);
      ids = pack ? pack.ids : (await catalog.rows()).filter((r) => r.cat === name).map((r) => r.id);
      if (ids.length === 0) throw new Error(`no pack or category "${name}"`);
    } else ids = [spec];
    for (const id of ids) {
      const entry = await loadEntry(catalog, id);
      if (seen.has(entry.fm.id)) continue;
      seen.add(entry.fm.id);
      out.push(entry);
    }
  }
  return out;
}

export async function runInstall(args: string[], io: Io): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      target: { type: 'string', short: 't' },
      scope: { type: 'string', default: 'project' },
      format: { type: 'string' },
      force: { type: 'boolean', default: false },
      'dry-run': { type: 'boolean', default: false },
      catalog: { type: 'string' },
    },
    allowPositionals: true,
  });
  if (positionals.length === 0 || !values.target) {
    io.err('usage: hodios install <id|pack:name>... --target <tool> [--scope project|user] (see hodios targets)');
    return 2;
  }
  const target = targetById(values.target);
  if (!target) throw new Error(`unknown target "${values.target}"; see hodios targets`);
  if (Object.keys(target.paths).length === 0) {
    throw new Error(
      `${target.label} is not installed into files; use hodios use <id> (paste) or hodios show <id> --target ${target.id}`,
    );
  }
  const s = scoped(io, values.scope);
  const catalog = await openCatalog(io, values.catalog);
  const entries = await expandSpecs(catalog, positionals);
  const lock = readLock(s.lockPath);

  // Plan every write first, so a conflict anywhere writes nothing.
  type Write = { abs: string; content: string; lock: LockEntry; note: string };
  const writes: Write[] = [];
  const conflicts: string[] = [];
  const pending = new Map<string, string>(); // abs path -> content after earlier planned section merges
  for (const entry of entries) {
    const result = compileFor(entry, target.id, {
      format: values.format,
      scope: s.scope,
      catalog: catalog.manifest.catalog,
    });
    for (const w of result.warnings) io.err(`warning ${w}`);
    for (const file of result.files) {
      if (!file.path) {
        throw new Error(
          `${target.label} has no ${s.scope}-scope location for ${result.adapter}; try --scope ${s.scope === 'user' ? 'project' : 'user'} or another --format`,
        );
      }
      const abs = s.abs(file.path);
      const previous = lock.entries.find((l) => l.path === file.path && l.id === entry.fm.id && l.target === target.id);
      const current = pending.get(abs) ?? readText(abs);
      const section = file.mode === 'section';
      const ours = section ? findSection(current ?? '', entry.fm.id) : current;
      const locked: LockEntry = {
        id: entry.fm.id,
        version: entry.fm.version,
        kind: entry.fm.kind,
        target: target.id,
        format: result.adapter,
        path: file.path,
        section,
        hash: sha(file.content),
        catalog: catalog.manifest.catalog,
      };
      if (ours === file.content) {
        writes.push({ abs, content: current ?? file.content, lock: locked, note: 'unchanged' });
        continue;
      }
      const edited = ours !== undefined && (!previous || sha(ours) !== previous.hash);
      if (edited && !values.force) {
        conflicts.push(`${file.path}${section ? ` (section ${entry.fm.id})` : ''}`);
        continue;
      }
      const content = section ? upsertSection(current ?? '', entry.fm.id, file.content) : file.content;
      pending.set(abs, content);
      writes.push({ abs, content, lock: locked, note: ours === undefined ? 'added' : 'updated' });
    }
  }
  if (conflicts.length) {
    io.err(
      `hodios install: these exist and were not written by hodios (or were edited since):\n  ${conflicts.join('\n  ')}\nNothing was written. Re-run with --force to overwrite.`,
    );
    return 1;
  }
  for (const w of writes) {
    const shown = s.scope === 'user' ? w.lock.path : w.lock.path.split('/').join(sep);
    io.out(`${values['dry-run'] ? 'would write' : w.note.padEnd(9)} ${w.lock.id} -> ${shown}`);
    if (values['dry-run']) continue;
    if (w.note !== 'unchanged') {
      mkdirSync(dirname(w.abs), { recursive: true });
      writeFileSync(w.abs, pending.get(w.abs) ?? w.content);
    }
    lock.entries = lock.entries.filter(
      (l) => !(l.id === w.lock.id && l.target === w.lock.target && l.path === w.lock.path),
    );
    lock.entries.push(w.lock);
  }
  if (!values['dry-run']) writeLock(s.lockPath, lock);
  return 0;
}

export function runList(args: string[], io: Io): number {
  const { values } = parseArgs({
    args,
    options: { scope: { type: 'string', default: 'project' }, json: { type: 'boolean', default: false } },
    allowPositionals: false,
  });
  const s = scoped(io, values.scope);
  const lock = readLock(s.lockPath);
  if (values.json) {
    io.out(JSON.stringify(lock.entries, null, 2));
    return 0;
  }
  if (lock.entries.length === 0) {
    io.out(`Nothing installed (${s.scope} scope). Find entries with hodios search.`);
    return 0;
  }
  const width = Math.max(...lock.entries.map((e) => e.id.length));
  for (const e of lock.entries) {
    const state = existsSync(s.abs(e.path)) ? '' : '  (missing)';
    io.out(`${e.id.padEnd(width)}  ${e.version.padEnd(7)} ${e.target.padEnd(11)} ${e.path}${state}`);
  }
  return 0;
}

/** Removes now-empty folders up to (not including) the scope root. */
function pruneDirs(start: string, stop: string): void {
  let dir = start;
  while (dir.startsWith(stop) && dir !== stop) {
    if (!existsSync(dir) || readdirSync(dir).length > 0) return;
    rmdirSync(dir);
    dir = dirname(dir);
  }
}

export function runRemove(args: string[], io: Io): number {
  const { values, positionals } = parseArgs({
    args,
    options: {
      target: { type: 'string', short: 't' },
      scope: { type: 'string', default: 'project' },
      force: { type: 'boolean', default: false },
    },
    allowPositionals: true,
  });
  if (positionals.length === 0) {
    io.err('usage: hodios remove <id>... [--target t] [--scope project|user]');
    return 2;
  }
  const s = scoped(io, values.scope);
  const stop = s.scope === 'user' ? resolve(io.home ?? '/') : resolve(io.cwd);
  const lock = readLock(s.lockPath);
  const target = values.target ? (targetById(values.target)?.id ?? values.target) : undefined;
  const matches = lock.entries.filter((e) => positionals.includes(e.id) && (!target || e.target === target));
  if (matches.length === 0) {
    io.err(`hodios remove: ${positionals.join(', ')} is not installed (${s.scope} scope); see hodios list`);
    return 1;
  }
  let code = 0;
  for (const e of matches) {
    const abs = s.abs(e.path);
    const current = readText(abs);
    const ours = e.section ? findSection(current ?? '', e.id) : current;
    if (ours !== undefined && sha(ours) !== e.hash && !values.force) {
      io.err(`kept      ${e.id} -> ${e.path} (edited since install; use --force)`);
      code = 1;
      continue;
    }
    if (current !== undefined) {
      if (e.section) {
        const rest = removeSection(current, e.id);
        if (rest === '') rmSync(abs);
        else writeFileSync(abs, rest);
      } else rmSync(abs);
      pruneDirs(dirname(abs), stop);
    }
    lock.entries = lock.entries.filter((l) => l !== e);
    io.out(`removed   ${e.id} -> ${e.path}`);
  }
  writeLock(s.lockPath, lock);
  return code;
}
