import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { checkLibrary, RULES, type Issue } from '@hermes-hq/hodios-core';
import type { Io } from '../cli.js';
import { loadRepo } from '../load.js';
import { findRoot } from '../root.js';

function formatIssue(i: Issue): string {
  return `${i.severity.padEnd(7)} ${i.rule} ${i.file}: ${i.message}`;
}

export function runValidate(args: string[], io: Io): number {
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
    io.err('hodios validate: no library/ found (run inside a Hodios checkout or pass --root)');
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

export function runRules(_args: string[], io: Io): number {
  for (const [id, text] of Object.entries(RULES)) io.out(`${id}  ${text}`);
  return 0;
}
