---
schema: 1
id: speed-up-frontend-build
kind: prompt
title: Speed up a slow Webpack or Vite build
description: Speeds up a slow Webpack or Vite dev server start, hot reload and production build by profiling plugins and loaders, fixing dependency pre-bundling and caching, measured on one machine.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer]
stack: [javascript]
requires: [repo-read, file-write, shell]
inputs: [repo, config, logs, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [webpack, vite, hot-reload, build-time, developer-experience]
pairs_with:
  prompts: [speed-up-ci-pipeline, speed-up-typescript-type-checking, reduce-bundle-size, fix-frontend-build-error]
  personas: [frontend-engineer, typescript-engineer]
args:
  - name: build
    description: Bundler and version, framework, which step is slow (dev start, hot reload, production build) with current times, repository size, and the plugins and loaders in use.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Profile, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Slow front-end builds are usually caused by a few specific things, and the profile says which. In Webpack, `babel-loader` or `ts-loader` running full type checks on every file is the classic cost: switch to transpile-only (`transpileOnly`, or swc-loader or esbuild-loader) and run `tsc --noEmit` or `fork-ts-checker-webpack-plugin` separately; enable the persistent filesystem cache (`cache: { type: 'filesystem' }`); avoid expensive source maps in dev (`eval-cheap-module-source-map` instead of `source-map`); keep loaders' `include` narrow so `node_modules` is not reprocessed; and check heavy plugins (image minifiers, CSS minimizers, bundle analysers) that should only run in production or CI. `webpack --profile` (with the stats output) or `speed-measure-webpack-plugin` (not compatible with every plugin) shows per-loader and plugin time. In Vite, dev start is dominated by dependency pre-bundling and by many unbundled requests: large barrel files (`index.ts` re-exporting everything) and deep icon libraries cause thousands of module requests; `optimizeDeps.include` for late-discovered deps avoids full reloads; `vite --profile` and `--debug` show where time goes. Production Vite builds go through Rollup (Rolldown in newer Vite versions), so plugin `transform` hooks running on every file and minification of very large chunks dominate. Hot reload slowness often comes from a module graph where a change invalidates a root (a context provider file exporting both components and constants).
</context>

<task>
Speed up this build: {{build}}

1. Read the bundler config, plugin and loader list, `tsconfig`, and package scripts. Note node and bundler versions.
2. Measure each slow step on a warm and cold cache on the same machine: dev start to first usable page, hot reload time for a typical edit, production build time. Record them.
3. Profile with the bundler's tools to find the top costs by step: per-loader and plugin time, module count, pre-bundling, source map generation, minification, type checking.
4. Apply fixes one at a time: transpile-only with separate type checking, persistent caching, cheaper dev source maps, narrower loader scope, production-only plugins, faster transpilers or minifiers, fixing barrel imports, and pre-bundling settings. Re-measure after each.
5. Confirm the production output is equivalent: run the build, compare bundle sizes, and run tests and a smoke check of the app.
</task>

<constraints>
- Compare times on the same machine, cache state and branch; say whether caches were warm or cold.
- Do not drop type checking; move it, and say where it now runs.
- Do not switch bundlers as a fix unless the user asks; mention it only as a larger option.
- Keep production output behaviour the same; flag any source map or minifier change that affects debugging.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Dev start, hot reload and build times, warm and cold.
## Profile
Top costs per step, with numbers.
## Changes
One line per change: file, what, time saved.
## Results
Times after, bundle size check, tests run.
</output_format>
