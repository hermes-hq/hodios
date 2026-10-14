---
schema: 1
id: migrate-vue-cli-to-vite
kind: prompt
title: Migrate a Vue CLI project to Vite
description: Moves a Vue CLI (webpack) project to Vite, covering environment variables, index.html, aliases, require calls, proxy, Sass imports, tests and build output, with the app verified page by page.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [vue]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [vite, vue-cli, webpack, bundler, vitest]
pairs_with:
  prompts: [migrate-vue-2-to-vue-3, migrate-create-react-app-to-vite, switch-build-tool]
args:
  - name: notes
    description: "Vue version (2.6, 2.7 or 3), contents of vue.config.js, Vue CLI plugins in use (router, PWA, unit tests, eslint), target browsers and how the build is deployed."
    type: text
output_contract:
  format: markdown
  sections: [Inventory, Config mapping, Changes made, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Vue CLI is in maintenance mode and the official tooling for Vue is Vite. Most of the move is mechanical, and the failures are predictable. Environment variables: `VUE_APP_*` read through `process.env` become `VITE_*` read through `import.meta.env` (or keep the old prefix during the move with `envPrefix`), and `process.env.NODE_ENV` becomes `import.meta.env.MODE` or `PROD`. `public/index.html` moves to the project root and needs `<script type="module" src="/src/main.js">`; `<%= BASE_URL %>` template tags no longer work. Vite does not resolve `.vue` extensions implicitly, so `import Foo from './Foo'` must name the file. `require()` and `require.context` do not exist: use imports, `import.meta.glob`, or `new URL('./img.png', import.meta.url)` for dynamic assets. The `@` alias must be declared in `resolve.alias`. Sass imports with the webpack `~` prefix fail. `devServer.proxy` maps to `server.proxy`, `publicPath` to `base`, `css.loaderOptions` to `css.preprocessorOptions`. Vue 2.7 uses `@vitejs/plugin-vue2`; Vue 2.6 should go to 2.7 first. Vite builds for modern browsers; older targets need `@vitejs/plugin-legacy`. Jest with vue-jest usually becomes Vitest. Custom `chainWebpack` rules need an equivalent plugin or must be dropped knowingly.
</context>

<task>
Migrate this Vue CLI project to Vite.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read `package.json`, `vue.config.js`, `babel.config.js`, `public/index.html`, `.env*` files, the test config and the CI and deploy steps. Inventory every `process.env`, `require(`, `require.context`, extensionless `.vue` import, `~` Sass import and webpack-specific comment or loader.
2. Write a mapping of each `vue.config.js` setting and Vue CLI plugin to its Vite equivalent, and flag anything without one for a decision.
3. Add Vite and the right Vue plugin, create `vite.config` with `base`, `resolve.alias`, `server.proxy`, `css.preprocessorOptions` and `build.outDir` matching today's output path. Move `index.html` to the root and fix its tags.
4. Rename environment variables or set `envPrefix` temporarily, and replace `process.env` reads. Fix imports, dynamic requires and Sass imports in small commits.
5. Move unit tests to Vitest (or keep Jest with a working transform) and keep the same test files passing. Replace the lint plugin with a direct ESLint script.
6. Update `package.json` scripts, CI and deploy config, then remove Vue CLI packages and `vue.config.js` last.
7. Build, serve the production build, and check every route, lazy-loaded chunk, environment value, asset and proxy call against the old build.
</task>

<constraints>
- Keep the build output path and public base the same unless the deploy is updated in the same change.
- Do not rename user-facing environment values without updating every environment's configuration; list them.
- Do not drop browser support silently; state the new targets and add the legacy plugin if old browsers are required.
- Do not upgrade Vue 2 to Vue 3 in this change.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Inventory
Counts and locations of env reads, requires, extensionless imports, Sass `~` imports and webpack-only config.
## Config mapping
Table: Vue CLI setting or plugin, Vite equivalent, notes.
## Changes made
Files changed by group.
## Verification
Dev server, tests, production build checked route by route, bundle size before and after.
## Follow-ups
Environment variables to rename in deploy settings, dropped features, cleanup.
</output_format>
