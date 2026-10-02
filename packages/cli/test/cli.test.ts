import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';
import { run } from '../src/cli.js';
import { VERSION } from '../src/version.js';

const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));

async function capture(argv: string[], cwd = repoRoot) {
  const out: string[] = [];
  const err: string[] = [];
  const code = await run(argv, { out: (l) => out.push(l), err: (l) => err.push(l), cwd });
  return { code, out: out.join('\n'), err: err.join('\n') };
}

const temps: string[] = [];
function fixtureCopy(): string {
  const dir = mkdtempSync(join(tmpdir(), 'hodios-cli-'));
  temps.push(dir);
  for (const part of ['library', 'vocab', 'partials', 'ids.lock']) {
    cpSync(join(repoRoot, part), join(dir, part), { recursive: true });
  }
  return dir;
}
afterEach(() => {
  for (const dir of temps.splice(0)) rmSync(dir, { recursive: true, force: true });
});

describe('hodios validate', () => {
  it('passes on this repository', async () => {
    const result = await capture(['validate']);
    expect(result.err).toBe('');
    expect(result.out).toMatch(/Validated \d+ entries .*: 0 errors/);
    expect(result.code).toBe(0);
  });

  it('finds the repo root from a subdirectory', async () => {
    expect((await capture(['validate'], join(repoRoot, 'library', 'code-review'))).code).toBe(0);
  });

  it('fails with rule ids on a broken entry', async () => {
    const root = fixtureCopy();
    const file = join(root, 'library/software-engineering/code-review/review-pull-request/prompt.md');
    writeFileSync(file, readFileSync(file, 'utf8').replace('category: code-review', 'category: security'));
    const result = await capture(['validate', '--root', root]);
    expect(result.code).toBe(1);
    expect(result.err).toContain('PS002 library/software-engineering/code-review/review-pull-request/prompt.md');
  });

  it('prints JSON', async () => {
    const result = await capture(['validate', '--json']);
    const parsed = JSON.parse(result.out);
    expect(parsed.ok).toBe(true);
    expect(parsed.entries.map((e: { kind: string }) => e.kind)).toEqual(
      expect.arrayContaining(['persona', 'prompt', 'workflow']),
    );
  });

  it('exits 2 outside a checkout', async () => {
    const empty = mkdtempSync(join(tmpdir(), 'hodios-empty-'));
    temps.push(empty);
    expect((await capture(['validate', '--root', empty])).code).toBe(2);
  });
});

describe('hodios', () => {
  it('prints the package version', async () => {
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
    expect(VERSION).toBe(pkg.version);
    expect((await capture(['--version'])).out).toBe(pkg.version);
  });

  it('rejects unknown commands and lists rules', async () => {
    expect((await capture(['frobnicate'])).code).toBe(2);
    expect((await capture(['rules'])).out).toContain('PS001');
  });
});
