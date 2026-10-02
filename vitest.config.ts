import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const src = (path: string) => fileURLToPath(new URL(`./packages/${path}`, import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@hermes-hq\/hodios-schema$/, replacement: src('schema/src/index.ts') },
      { find: /^@hermes-hq\/hodios-core$/, replacement: src('core/src/index.ts') },
      { find: /^@hermes-hq\/hodios-core\/(compile|catalog)$/, replacement: src('core/src/$1/index.ts') },
    ],
  },
  test: {
    include: ['packages/*/test/**/*.test.ts', 'tools/**/*.test.mjs'],
  },
});
