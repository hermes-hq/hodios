---
schema: 1
id: migrate-vue-2-to-vue-3
kind: prompt
title: Migrate a Vue 2 app to Vue 3
description: Moves a Vue 2 app to Vue 3 using the migration build, fixing filters, event buses, v-model, global API and transition changes, and swapping Vuex, Vue Router and UI libraries.
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
model_tier: frontier
reasoning: recommended
level: expert
tags: [vue-3, migration-build, pinia, breaking-changes, end-of-life]
pairs_with:
  prompts: [upgrade-major-dependency, convert-vue-options-api-to-composition, migrate-nuxt-2-to-nuxt-3]
args:
  - name: notes
    description: "Vue 2 version, build tool (Vue CLI, webpack, Vite), Vuex or Pinia, Vue Router version, UI library (Vuetify, Element UI, BootstrapVue), TypeScript, tests."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Ecosystem blockers, Migration plan, Changes made, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Vue 2 reached end of life at the end of 2023. The core code changes are well documented; what decides the timeline is the ecosystem. What experienced people know: the UI library is usually the biggest blocker (Vuetify 3 and Element Plus are substantial rewrites of their Vue 2 versions, and BootstrapVue never shipped a stable Vue 3 release; community successors exist but have different APIs), so check it first. The migration build (`@vue/compat`) runs Vue 3 in a Vue 2 compatible mode and logs deprecation warnings per feature, letting you fix one category at a time and switch features to Vue 3 behaviour individually. Common breaking changes: filters are removed (use methods or computed); `$on`, `$off` and `$once` are removed, so event buses need a small emitter or proper state; component `v-model` uses `modelValue` and `update:modelValue` and `.sync` is gone; `$listeners` merges into `$attrs`; `new Vue` and global `Vue.use` become `createApp` per app; transition class names changed; `v-if` now has higher priority than `v-for` on the same element; components should declare `emits`. Vue Router 4 and Vuex 4 (or Pinia, the recommended store) have their own changes, such as the catch-all route syntax. Vue 2.7 backports the Composition API, which makes it a useful stepping stone. Vue CLI is in maintenance, so many teams move to Vite alongside, but that is a separate change.
</context>

<task>
Migrate this app from Vue 2 to Vue 3.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read `package.json`, the entry file, router, store, plugins and global registrations. List every Vue-ecosystem dependency and the Vue 3 version or replacement for each, marking blockers.
2. Stop and report if the UI library or another core dependency has no Vue 3 path; propose options (replacement, wrapper, staying on 2.7 with extended support) for the user to decide.
3. Record the baseline: build, unit tests, end-to-end tests, and a list of key screens to check.
4. Upgrade to Vue 2.7 first if not already, fixing its warnings. Then switch to Vue 3 with the migration build, updating the router, store and test utils to their Vue 3 versions.
5. Work through compat warnings by category (global API, filters, event bus, v-model and `.sync`, `$listeners`, transitions, `v-if` with `v-for`, async components, `emits`), fixing code and turning off each compat flag once its category is clean.
6. Replace or upgrade the UI library screen by screen if needed, keeping a list of visual and behaviour differences.
7. Remove the migration build once no warnings remain, then run all tests and smoke test the key screens.
</task>

<constraints>
- Fix behaviour by compat category, one category per commit; do not switch off the migration build with warnings still firing.
- Do not combine the build tool switch, a TypeScript conversion or the Composition API rewrite with this migration unless the user asks.
- Do not invent component APIs for replacement libraries; check their documentation.
- Keep behaviour the same; note any visible change caused by library replacements.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Versions, build, store, router, UI library, tests.
## Ecosystem blockers
Table: dependency, Vue 3 version or replacement, effort, decision needed.
## Migration plan
Ordered steps from 2.7 through the migration build to plain Vue 3.
## Changes made
Per compat category: what changed and where.
## Verification
Tests and screens checked; remaining warnings (should be none).
</output_format>
