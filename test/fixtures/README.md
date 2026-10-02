# Test fixtures

Frozen copies of entries and partials for the golden tests in `packages/cli/test/golden.test.ts`. They are test data, not library content: `hodios validate` and the catalog never read this folder. Edit them only to cover a new adapter case, then refresh the snapshots with `npx vitest run -u`.
