// Golden snapshots per adapter (design §6.1): compiled output for frozen fixtures in test/fixtures/.
// After an intended output change, refresh with `npx vitest run -u` and review the diff in test/golden/.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  ADAPTERS,
  claudeMarketplace,
  claudePluginFiles,
  exportName,
  hermesBundle,
  resolveEntry,
  type ResolvedEntry,
} from '@hermes-hq/hodios-core';

const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));
const fixtures = join(repoRoot, 'test', 'fixtures');
const golden = join(repoRoot, 'test', 'golden');
const ctx = { catalog: '2026.1002.0' };

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function loadFixtures(): ResolvedEntry[] {
  const partials = new Map<string, string>();
  for (const file of walk(join(fixtures, 'partials'))) {
    partials.set(relative(join(fixtures, 'partials'), file).split('\\').join('/'), readFileSync(file, 'utf8'));
  }
  const dirs = new Set(
    walk(join(fixtures, 'library'))
      .filter((f) => /\/(prompt|persona|workflow|rule|style)\.md$/.test(f.split('\\').join('/')))
      .map((f) => join(f, '..')),
  );
  return [...dirs].sort().map((dir) => {
    const files = new Map<string, string>();
    for (const f of walk(dir)) files.set(relative(dir, f).split('\\').join('/'), readFileSync(f, 'utf8'));
    return resolveEntry({ dir: relative(repoRoot, dir), files }, partials);
  });
}

const entries = loadFixtures();

describe('golden fixtures', () => {
  it('cover every kind', () => {
    expect(new Set(entries.map((e) => e.fm.kind))).toEqual(new Set(['prompt', 'persona', 'workflow', 'rule', 'style']));
  });
});

for (const adapter of ADAPTERS) {
  describe(`adapter ${adapter.id}`, () => {
    for (const entry of entries.filter((e) => adapter.kinds.includes(e.fm.kind))) {
      it(`compiles ${entry.fm.id}`, async () => {
        const result = adapter.compile(entry, ctx);
        expect(result.files.length).toBeGreaterThan(0);
        for (const file of result.files) {
          const id = exportName(entry.fm.id);
          const name = file.name === '' ? 'section.md' : file.name.replace(new RegExp(`^${id}/`), '');
          await expect(file.content).toMatchFileSnapshot(join(golden, adapter.id, id, name));
        }
      });
    }
  });
}

describe('claude plugin and marketplace', () => {
  it('compiles a plugin per group and the marketplace', async () => {
    const groups = [
      {
        name: 'code-review',
        category: 'code-review',
        description: 'Code review.',
        entries: entries.filter((e) => e.fm.category === 'code-review'),
      },
      { name: 'starter', description: 'A small starter pack.', entries },
    ];
    for (const group of groups) {
      const plugin = claudePluginFiles(group, ctx);
      for (const [path, content] of plugin.files)
        await expect(content).toMatchFileSnapshot(join(golden, 'claude-plugin', path));
    }
    await expect(claudeMarketplace(groups)).toMatchFileSnapshot(
      join(golden, 'claude-plugin', '.claude-plugin', 'marketplace.json'),
    );
  });

  it('bundles every fixture for Hermes', async () => {
    await expect(hermesBundle(entries, ctx)).toMatchFileSnapshot(join(golden, 'hermes-bundle', 'all.hermes-prompts'));
  });
});
