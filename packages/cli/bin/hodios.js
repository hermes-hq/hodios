#!/usr/bin/env node
// Stable entry point for the `hodios` bin. It exists before the first build, so npm links it on install;
// the compiled CLI lives in dist/ (run `npm run build` in a checkout).
import('../dist/bin.js').catch((err) => {
  if (err && err.code === 'ERR_MODULE_NOT_FOUND' && String(err.message).includes('dist/bin.js')) {
    console.error('hodios: the CLI is not built yet. Run `npm run build` in the repository first.');
  } else {
    console.error(err);
  }
  process.exitCode = 2;
});
