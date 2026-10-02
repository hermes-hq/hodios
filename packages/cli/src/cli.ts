import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { BRAND, checkLibrary, RULES, type Issue } from '@hermes-hq/hodios-core';
import { loadRepo } from './load.js';
import { VERSION } from './version.js';

export interface Io {
  out: (line: string) => void;
  err: (line: string) => void;
  cwd: string;
}

const USAGE = `${BRAND.tagline}

Usage: ${BRAND.cli} <command> [options]

Commands:
  validate [--root <dir>] [--json] [--verbose]
      Validate library/ against the entry schema, vocab/, partials/ and ids.lock.
  rules
      List lint rule ids.

Options:
  -h, --help       Show this help
  -v, --version    Show the CLI version

Coming next: search, show, use, install, list, remove (see ${BRAND.site}).`;

/** Finds the repo root: the nearest ancestor of `start` with library/ and vocab/. */
function findRoot(start: string): string | undefined {
  let dir = resolve(start);
  for (;;) {
    if (existsSync(resolve(dir, 'library')) && existsSync(resolve(dir, 'vocab'))) return dir;
    const parent = resolve(dir, '..');
    if (parent === dir) return undefined;
    dir = parent;
  }
}

function formatIssue(i: Issue): string {
  return `${i.severity.padEnd(7)} ${i.rule} ${i.file}: ${i.message}`;
}

function runValidate(args: string[], io: Io): number {
  const { values } = parseArgs({
    args,
    options: {
      root: { type: 'string' },
      json: { type: 'boolean', default: false },
      verbose: { type: 'boolean', default: false },
    },
    allowPositionals: false,
  });
  const root = values.root ? resolve(io.cwd, values.root) : findRoot(io.cwd);
  if (!root || !existsSync(resolve(root, 'library'))) {
    io.err(`${BRAND.cli} validate: no library/ found (run inside a Hodios checkout or pass --root)`);
    return 2;
  }

  const repo = loadRepo(root);
  const result = checkLibrary(repo.sources, repo.context);
  const issues = [...repo.issues, ...result.issues];
  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');

  if (values.json) {
    io.out(
      JSON.stringify(
        {
          ok: errors.length === 0,
          entries: result.entries.map((e) => ({ dir: e.dir, id: e.frontmatter?.id, kind: e.frontmatter?.kind })),
          issues,
        },
        null,
        2,
      ),
    );
    return errors.length === 0 ? 0 : 1;
  }

  for (const issue of issues) {
    if (issue.severity === 'info' && !values.verbose) continue;
    (issue.severity === 'error' ? io.err : io.out)(formatIssue(issue));
  }
  const byKind = new Map<string, number>();
  for (const e of result.entries) {
    const kind = e.frontmatter?.kind ?? 'invalid';
    byKind.set(kind, (byKind.get(kind) ?? 0) + 1);
  }
  const breakdown = [...byKind].map(([k, n]) => `${n} ${k}`).join(', ');
  io.out(
    `Validated ${result.entries.length} entries${breakdown ? ` (${breakdown})` : ''}, ${repo.context.partials.size} partials, ${repo.context.vocab.size} vocabularies: ${errors.length} errors, ${warnings.length} warnings.`,
  );
  return errors.length === 0 ? 0 : 1;
}

export function run(argv: string[], io: Io): number {
  const [command, ...rest] = argv;
  try {
    switch (command) {
      case undefined:
      case '-h':
      case '--help':
      case 'help':
        io.out(USAGE);
        return command === undefined ? 2 : 0;
      case '-v':
      case '--version':
        io.out(VERSION);
        return 0;
      case 'validate':
        return runValidate(rest, io);
      case 'rules':
        for (const [id, text] of Object.entries(RULES)) io.out(`${id}  ${text}`);
        return 0;
      default:
        io.err(`${BRAND.cli}: unknown command "${command}"\n\n${USAGE}`);
        return 2;
    }
  } catch (err) {
    io.err(`${BRAND.cli}: ${err instanceof Error ? err.message : String(err)}`);
    return 2;
  }
}
