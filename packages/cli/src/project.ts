import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { delimiter, join } from 'node:path';
import {
  AGENT_BINARIES,
  AGENT_MARKERS,
  detectStack,
  type Profile,
  type VocabObject,
} from '@hermes-hq/hodios-core/catalog';

const SKIP = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  'out',
  'target',
  'vendor',
  '.venv',
  'venv',
  '__pycache__',
  '.next',
  '.nuxt',
  'coverage',
]);
const MAX_FILES = 5000;
const MAX_DEPTH = 3;

/** True when `dir` looks like a project (so an empty search can default to "for this project"). */
export function looksLikeProject(dir: string): boolean {
  return ['.git', 'package.json', 'pyproject.toml', 'Cargo.toml', 'go.mod', 'Gemfile', 'pom.xml', 'composer.json'].some(
    (f) => existsSync(join(dir, f)),
  );
}

function listFiles(root: string): string[] {
  const out: string[] = [];
  const walk = (dir: string, depth: number) => {
    if (out.length >= MAX_FILES) return;
    let names: string[];
    try {
      names = readdirSync(dir);
    } catch {
      return;
    }
    for (const name of names) {
      if (out.length >= MAX_FILES) return;
      const full = join(dir, name);
      let isDir: boolean;
      try {
        isDir = statSync(full).isDirectory();
      } catch {
        continue;
      }
      if (isDir) {
        if (!SKIP.has(name) && depth < MAX_DEPTH) walk(full, depth + 1);
      } else out.push(full);
    }
  };
  walk(root, 1);
  return out;
}

const read = (path: string) => {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    return '';
  }
};

/** `<ecosystem>:<package>` dependencies from the manifests found (npm, pypi, cargo, go, gem, composer). */
function scanDeps(files: string[]): Set<string> {
  const deps = new Set<string>();
  for (const file of files) {
    const base = file.split(/[\\/]/).pop() ?? '';
    if (base === 'package.json') {
      try {
        const j = JSON.parse(read(file)) as Record<string, Record<string, string> | undefined>;
        for (const k of ['dependencies', 'devDependencies', 'peerDependencies'])
          for (const name of Object.keys(j[k] ?? {})) deps.add(`npm:${name}`);
      } catch {
        /* not JSON */
      }
    } else if (base === 'requirements.txt') {
      for (const m of read(file).matchAll(/^\s*([A-Za-z0-9_.-]+)/gm)) deps.add(`pypi:${(m[1] ?? '').toLowerCase()}`);
    } else if (base === 'pyproject.toml') {
      for (const m of read(file).matchAll(/^\s*"([A-Za-z0-9_.-]+)\s*[<>=~!;[\]"]/gm))
        deps.add(`pypi:${(m[1] ?? '').toLowerCase()}`);
    } else if (base === 'Cargo.toml') {
      for (const m of read(file).matchAll(/^\s*([A-Za-z0-9_-]+)\s*=/gm)) deps.add(`cargo:${m[1] ?? ''}`);
    } else if (base === 'go.mod') {
      for (const m of read(file).matchAll(/^\s*(?:require\s+)?([a-z0-9.-]+\.[a-z]+\/[^\s]+)\s+v/gm))
        deps.add(`go:${m[1] ?? ''}`);
    } else if (base === 'Gemfile') {
      for (const m of read(file).matchAll(/^\s*gem\s+['"]([^'"]+)['"]/gm)) deps.add(`gem:${m[1] ?? ''}`);
    } else if (base === 'composer.json') {
      try {
        const j = JSON.parse(read(file)) as { require?: Record<string, string> };
        for (const name of Object.keys(j.require ?? {})) deps.add(`composer:${name}`);
      } catch {
        /* not JSON */
      }
    }
  }
  return deps;
}

/** Agents set up in the project (config folders) or installed (CLIs on PATH). */
export function detectAgents(dir: string, env: Record<string, string | undefined> = {}): string[] {
  const found = new Set<string>();
  for (const [target, markers] of Object.entries(AGENT_MARKERS)) {
    if (markers.some((m) => existsSync(join(dir, m)))) found.add(target);
  }
  const exts = process.platform === 'win32' ? ['.exe', '.cmd', ''] : [''];
  for (const p of (env['PATH'] ?? '').split(delimiter).filter(Boolean)) {
    for (const [bin, target] of Object.entries(AGENT_BINARIES)) {
      if (!found.has(target) && exts.some((e) => existsSync(join(p, bin + e)))) found.add(target);
    }
  }
  return [...found].sort();
}

/**
 * The on-device profile for `--here` (TAXONOMY.md §8): the project's stack from `detect` hints and the agents
 * found. Nothing is sent anywhere; it only reorders results.
 */
export function projectProfile(dir: string, vocab: VocabObject, env: Record<string, string | undefined> = {}): Profile {
  const files = listFiles(dir);
  return { stack: detectStack({ files, deps: scanDeps(files) }, vocab), works: detectAgents(dir, env) };
}
