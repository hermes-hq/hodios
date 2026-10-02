// End to end: build the library's example entries into every target, then search, show, use, install, list and
// remove through the CLI against the built catalog (folder and HTTP), in throwaway project and home folders.
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createServer, type Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { INSTALL_TARGETS } from '@hermes-hq/hodios-core';
import type { Manifest, ShardList } from '@hermes-hq/hodios-core/catalog';
import { run } from '../src/cli.js';

const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));
const temp = mkdtempSync(join(tmpdir(), 'hodios-e2e-'));
const out = join(temp, 'dist');
const catalogDir = join(out, 'catalog', 'v1');
// The three reference entries (ids are permanent); other library entries may come and go without breaking this test.
const EXAMPLES = ['feature-track', 'review-pull-request', 'security-auditor'];
const KIND: Record<string, 'workflow' | 'prompt' | 'persona'> = {
  'feature-track': 'workflow',
  'review-pull-request': 'prompt',
  'security-auditor': 'persona',
};

async function cli(argv: string[], opts: { cwd?: string; stdin?: string; env?: Record<string, string> } = {}) {
  const lines: string[] = [];
  const errs: string[] = [];
  const code = await run(argv, {
    out: (l) => lines.push(l),
    err: (l) => errs.push(l),
    cwd: opts.cwd ?? repoRoot,
    home: join(temp, 'home'),
    env: { HODIOS_CATALOG: catalogDir, XDG_CACHE_HOME: join(temp, 'cache'), PATH: '', ...opts.env },
    readStdin: async () => opts.stdin ?? '',
  });
  return { code, out: lines.join('\n'), err: errs.join('\n') };
}

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full).map((f) => `${name}/${f}`) : [name];
  });
}

function project(name: string): string {
  const dir = join(temp, 'projects', name);
  mkdirSync(dir, { recursive: true });
  return dir;
}

beforeAll(async () => {
  const result = await cli(['build', '--out', out, '--catalog', '2026.1002.0']);
  expect(result.err).toBe('');
  expect(result.code).toBe(0);
});
afterAll(() => rmSync(temp, { recursive: true, force: true }));

describe('hodios build', () => {
  it('writes skills, plugins, the marketplace, paste, bundles and the catalog', () => {
    const files = walk(out);
    for (const id of EXAMPLES) {
      expect(files).toContain(`skills/${id}/SKILL.md`);
      expect(files).toContain(`skills/${id}/agents/openai.yaml`);
      expect(files).toContain(`paste/${id}.md`);
    }
    expect(files).toContain('.claude-plugin/marketplace.json');
    expect(files).toContain('plugins/hodios-security/agents/security-auditor.md');
    expect(files).toContain('plugins/hodios-code-review/skills/review-pull-request/SKILL.md');
    expect(files).toContain('bundles/all.hermes-prompts');
    expect(files).toContain('catalog/v1/manifest.json');
    const bundle = JSON.parse(readFileSync(join(out, 'bundles/all.hermes-prompts'), 'utf8')) as {
      items: { id: string }[];
    };
    expect(bundle.items.map((i) => i.id)).toEqual(expect.arrayContaining(EXAMPLES));
  });

  it('lists only plugins that ship something besides plugin.json', () => {
    const market = JSON.parse(readFileSync(join(out, '.claude-plugin/marketplace.json'), 'utf8')) as {
      plugins: { name: string; source: string }[];
    };
    expect(market.plugins.length).toBeGreaterThan(0);
    for (const plugin of market.plugins) {
      const files = walk(join(out, plugin.source));
      expect(files.filter((f) => !f.endsWith('plugin.json')).length, plugin.name).toBeGreaterThan(0);
    }
  });

  it('builds every example into every tool that supports its kind', () => {
    for (const target of INSTALL_TARGETS) {
      const files = walk(join(out, 'native', target.id)).join('\n');
      for (const id of EXAMPLES) {
        const kind = KIND[id] as 'workflow' | 'prompt' | 'persona';
        if (!target.defaults[kind]) continue;
        const memory = target.defaults[kind]?.endsWith('-md');
        if (memory)
          expect(readFileSync(join(out, 'native', target.id, 'AGENTS.md'), 'utf8')).toContain(`<!-- hodios:${id} -->`);
        else expect(files, `${target.id}/${id}`).toContain(id);
      }
    }
  });

  it('outputs are self-contained: no includes, no unlowered arguments', () => {
    for (const file of walk(out).filter((f) => !f.startsWith('catalog/') && !f.endsWith('.hermes-prompts'))) {
      const text = readFileSync(join(out, file), 'utf8');
      expect(text, file).not.toMatch(/\{\{\s*[>#/]/);
      expect(text.replace(/\{\{args\}\}/g, ''), file).not.toMatch(/\{\{\s*[a-z_]+\s*\}\}/);
    }
  });

  it('writes a v1 catalog whose objects verify', () => {
    const manifest = JSON.parse(readFileSync(join(catalogDir, 'manifest.json'), 'utf8')) as Manifest;
    expect(manifest.catalog).toBe('2026.1002.0');
    expect(manifest.tiers.curated?.rows).toBeGreaterThanOrEqual(EXAMPLES.length);
    for (const file of walk(join(catalogDir, 'o'))) {
      const hex = file.split('/').pop() as string;
      expect(
        createHash('sha256')
          .update(readFileSync(join(catalogDir, 'o', file)))
          .digest('hex'),
      ).toBe(hex);
    }
    const list = JSON.parse(
      readFileSync(
        join(
          catalogDir,
          'o',
          manifest.tiers.curated?.list.slice(7, 9) ?? '',
          manifest.tiers.curated?.list.slice(7) ?? '',
        ),
        'utf8',
      ),
    ) as ShardList;
    expect(list.prefixLen).toBe(0);
  });

  it('refuses to clear a folder it did not write', async () => {
    const foreign = project('foreign');
    writeFileSync(join(foreign, 'keep.txt'), 'mine');
    const result = await cli(['build', '--out', foreign]);
    expect(result.code).toBe(2);
    expect(readFileSync(join(foreign, 'keep.txt'), 'utf8')).toBe('mine');
  });
});

describe('hodios search, show, use', () => {
  it('searches by text and facets', async () => {
    const result = await cli(['search', 'review', 'kind:prompt']);
    expect(result.code).toBe(0);
    expect(result.out).toContain('review-pull-request');
    expect(result.out).not.toContain('security-auditor ');
    const json = JSON.parse((await cli(['search', '--kind', 'persona', '--limit', '100', '--json'])).out) as {
      hits: { id: string; kind: string }[];
    };
    expect(json.hits.map((h) => h.id)).toContain('security-auditor');
    expect(json.hits.every((h) => h.kind === 'persona')).toBe(true);
  });

  it('ranks for the project in an empty search inside a project', async () => {
    const dir = project('for-you');
    writeFileSync(join(dir, 'package.json'), '{"dependencies":{"react":"19"}}');
    mkdirSync(join(dir, '.claude'));
    const result = await cli(['search', '--json'], { cwd: dir });
    const json = JSON.parse(result.out) as { profile: { stack: string[]; works: string[] } };
    expect(json.profile.stack).toContain('react');
    expect(json.profile.works).toEqual(['claude-code']);
  });

  it('shows an entry and its compiled file for a target, by id or alias', async () => {
    expect((await cli(['show', 'review-pr'])).out).toContain('Review a pull request (review-pull-request)');
    const copilot = await cli(['show', 'review-pull-request', '--target', 'copilot']);
    expect(copilot.out).toContain('${input:diff:');
    expect((await cli(['show', 'nope'])).code).toBe(2);
  });

  it('fills arguments for paste, from a value, a file or stdin', async () => {
    const dir = project('use');
    writeFileSync(join(dir, 'change.diff'), '--- a/x\n+++ b/x\n');
    const fromFile = await cli(
      ['use', 'review-pull-request', '--arg', 'diff=@change.diff', '--arg', 'focus=security'],
      { cwd: dir },
    );
    expect(fromFile.out).toContain('Review --- a/x\n+++ b/x.');
    expect(fromFile.out).toContain('Weight your attention toward: security.');
    const fromStdin = await cli(['use', 'feature-track', '--arg', 'feature=@-'], { stdin: 'dark-mode\n' });
    expect(fromStdin.out).toContain('.hermes/features/dark-mode/questions.md');
    const missing = await cli(['use', 'review-pull-request']);
    expect(missing.err).toContain('missing --arg diff');
    expect(missing.out).toContain('Review [DIFF].');
    expect((await cli(['use', 'review-pull-request', '--arg', 'nope=1'])).code).toBe(2);
  });
});

describe('hodios install, list, remove', () => {
  for (const target of INSTALL_TARGETS) {
    it(`round-trips every example for ${target.id}`, async () => {
      const dir = project(`install-${target.id}`);
      const ids = EXAMPLES.filter((id) => {
        const kind = KIND[id] as 'workflow' | 'prompt' | 'persona';
        return Boolean(target.defaults[kind]);
      });
      const installed = await cli(['install', ...ids, '--target', target.id], { cwd: dir });
      expect(installed.err).toBe('');
      expect(installed.code).toBe(0);
      expect(walk(dir).filter((f) => f !== '.hodios.lock').length).toBeGreaterThan(0);
      const list = await cli(['list'], { cwd: dir });
      for (const id of ids) expect(list.out).toContain(id);
      // A second install changes nothing.
      expect((await cli(['install', ...ids, '--target', target.id], { cwd: dir })).out).toMatch(/^unchanged/m);
      const removed = await cli(['remove', ...ids], { cwd: dir });
      expect(removed.code).toBe(0);
      expect(walk(dir)).toEqual([]);
    });
  }

  it('installs into the user scope', async () => {
    const dir = project('user-scope');
    const result = await cli(['install', 'security-auditor', '--target', 'claude-code', '--scope', 'user'], {
      cwd: dir,
    });
    expect(result.code).toBe(0);
    expect(existsSync(join(temp, 'home', '.claude', 'agents', 'security-auditor.md'))).toBe(true);
    expect((await cli(['list', '--scope', 'user'], { cwd: dir })).out).toContain(
      '~/.claude/agents/security-auditor.md',
    );
    expect((await cli(['remove', 'security-auditor', '--scope', 'user'], { cwd: dir })).code).toBe(0);
    expect(existsSync(join(temp, 'home', '.claude', 'agents'))).toBe(false);
  });

  it('never overwrites a file it did not write, and keeps sections next to user text', async () => {
    const dir = project('conflict');
    mkdirSync(join(dir, '.claude', 'agents'), { recursive: true });
    writeFileSync(join(dir, '.claude', 'agents', 'security-auditor.md'), 'mine\n');
    const refused = await cli(['install', 'security-auditor', '--target', 'claude-code'], { cwd: dir });
    expect(refused.code).toBe(1);
    expect(readFileSync(join(dir, '.claude', 'agents', 'security-auditor.md'), 'utf8')).toBe('mine\n');
    expect((await cli(['install', 'security-auditor', '--target', 'claude-code', '--force'], { cwd: dir })).code).toBe(
      0,
    );

    writeFileSync(join(dir, 'AGENTS.md'), '# House rules\n\nBe kind.\n');
    expect((await cli(['install', 'security-auditor', '--target', 'agents-md'], { cwd: dir })).code).toBe(0);
    expect(readFileSync(join(dir, 'AGENTS.md'), 'utf8')).toMatch(
      /^# House rules\n\nBe kind\.\n\n<!-- hodios:security-auditor -->/,
    );
    expect((await cli(['remove', 'security-auditor', '--target', 'agents-md'], { cwd: dir })).code).toBe(0);
    expect(readFileSync(join(dir, 'AGENTS.md'), 'utf8')).toBe('# House rules\n\nBe kind.\n');
  });

  it('installs a category as a pack and explains unsupported combinations', async () => {
    const dir = project('pack');
    const result = await cli(['install', 'pack:security', '--target', 'opencode'], { cwd: dir });
    expect(result.out).toContain('.opencode/agents/security-auditor.md');
    const unsupported = await cli(['install', 'review-pull-request', '--target', 'agents-md'], { cwd: dir });
    expect(unsupported.code).toBe(2);
    expect(unsupported.err).toContain('no format for a prompt');
    const userOnly = await cli(['install', 'review-pull-request', '--target', 'codex', '--format', 'codex-prompt'], {
      cwd: dir,
    });
    expect(userOnly.err).toContain('no project-scope location');
  });
});

describe('remote catalog over HTTP', () => {
  let server: Server;
  let url = '';
  beforeAll(async () => {
    server = createServer((req, res) => {
      const path = join(catalogDir, decodeURIComponent((req.url ?? '/').replace(/^\/v1\//, '')));
      if (!path.startsWith(catalogDir) || !existsSync(path)) {
        res.writeHead(404).end();
        return;
      }
      res.writeHead(200).end(readFileSync(path));
    });
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const address = server.address();
    url = `http://127.0.0.1:${typeof address === 'object' && address ? address.port : 0}/v1`;
  });
  afterAll(() => server.close());

  it('searches, then works offline from the cache', async () => {
    const online = await cli(['search', 'review'], { env: { HODIOS_CATALOG: url } });
    expect(online.code).toBe(0);
    expect(online.out).toContain('review-pull-request');
    server.close();
    const offline = await cli(['search', 'review'], { env: { HODIOS_CATALOG: url } });
    expect(offline.out).toContain('review-pull-request');
  });
});
