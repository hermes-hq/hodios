import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const src = (pkg: string) => fileURLToPath(new URL(`./packages/${pkg}/src/index.ts`, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@hermes-hq/hodios-schema': src('schema'),
      '@hermes-hq/hodios-core': src('core'),
    },
  },
  test: {
    include: ['packages/*/test/**/*.test.ts', 'tools/**/*.test.mjs'],
  },
});
