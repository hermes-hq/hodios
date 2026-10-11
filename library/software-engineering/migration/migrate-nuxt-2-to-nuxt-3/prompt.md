---
schema: 1
id: migrate-nuxt-2-to-nuxt-3
kind: prompt
title: Migrate a Nuxt 2 app to Nuxt 3
description: Moves a Nuxt 2 app to Nuxt 3 or later, covering asyncData and fetch, plugins and middleware, server middleware to Nitro, runtime config, head management and module replacements.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [nuxt]
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
tags: [nitro, ssr, nuxt-modules, breaking-changes, end-of-life]
pairs_with:
  prompts: [migrate-vue-2-to-vue-3, upgrade-major-dependency]
args:
  - name: notes
    description: "Nuxt 2 version, rendering mode (SSR, static, SPA), deploy target, modules used (axios, auth, i18n, content, pwa), Vuex store, TypeScript, tests."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Module map, Migration plan, Changes made, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Nuxt 2 reached end of life in mid-2024, and moving to Nuxt 3 means moving to Vue 3, Vite and the Nitro server at the same time, so it is closer to a port than an upgrade. What experienced people know: the module list decides the effort, because many Nuxt 2 modules were never ported (the axios module gives way to the built-in `$fetch` and `useFetch`; the auth module has no direct Nuxt 3 version; i18n, content and PWA have new major versions with different APIs). Data fetching changes the most: `asyncData` and `fetch()` become `useAsyncData` or `useFetch`, which need stable keys and dedupe between server and client; fetching in `onMounted` instead loses SSR. The `context` object is gone; use composables (`useRoute`, `useNuxtApp`, `useRuntimeConfig`). Plugins use `defineNuxtPlugin`, route middleware uses `defineNuxtRouteMiddleware`, `serverMiddleware` becomes Nitro handlers under `server/`, `env` and `publicRuntimeConfig` become `runtimeConfig` with a `public` key, `head()` becomes `useHead` or `useSeoMeta`, `<Nuxt />` and `<NuxtChild />` become `<NuxtPage />` and layouts use `<slot />`. Vuex is no longer built in; Pinia is the usual replacement. Nuxt Bridge offered an incremental route but has limits, and newer Nuxt majors change the directory layout again, so decide the target version up front.
</context>

<task>
Migrate this Nuxt 2 app to Nuxt 3 or the current major the user chooses.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read `nuxt.config`, `package.json`, pages, layouts, plugins, middleware, `serverMiddleware`, the store and components using `asyncData`, `fetch`, `context` or `$axios`.
2. Build the module map: each Nuxt 2 module, its current equivalent (built-in, new major, community replacement or none), and the effort. Stop and ask on any module with no path.
3. Decide with the user: target Nuxt major, in-place migration vs a fresh project with code moved in (often cleaner for this jump), and whether Nuxt Bridge is worth it here.
4. Record the baseline: routes list, rendered HTML and meta tags for key pages, server API responses, and test results.
5. Migrate in order: config and runtime config, layouts and pages, plugins and middleware, server middleware to Nitro handlers, store to Pinia, data fetching to `useAsyncData` or `useFetch` with explicit keys, head management, then components through the Vue 3 changes.
6. Check SSR behaviour: data fetched once on the server and not again on hydration, no hydration mismatch warnings, correct meta tags and status codes for missing pages.
7. Build for the real deploy target (Nitro preset) and compare routes, HTML, meta and API responses with the baseline. Run all tests.
</task>

<constraints>
- Do not move server-side fetching into client-only hooks to silence errors; that changes SEO and performance.
- Do not invent module names or options; check that each replacement module exists and supports the chosen Nuxt version.
- Never expose private runtime config values to the client by moving them under `public`.
- Keep URLs, meta output and API responses the same unless the user agrees to a change.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Nuxt version, rendering mode, deploy target, modules, store, tests.
## Module map
Table: Nuxt 2 module, replacement, effort, notes.
## Migration plan
Chosen target and approach, ordered steps.
## Changes made
Per area: config, pages, plugins, server, store, data fetching, head.
## Verification
Routes, HTML and meta comparison, hydration, API responses, tests.
</output_format>
