import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

/** Finds the repo root: the nearest ancestor of `start` with library/ and vocab/. */
export function findRoot(start: string): string | undefined {
  let dir = resolve(start);
  for (;;) {
    if (existsSync(resolve(dir, 'library')) && existsSync(resolve(dir, 'vocab'))) return dir;
    const parent = resolve(dir, '..');
    if (parent === dir) return undefined;
    dir = parent;
  }
}
