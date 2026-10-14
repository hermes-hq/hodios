---
schema: 1
id: implement-nuxt-data-fetching
kind: prompt
title: Implement Nuxt data fetching and server routes
description: Implements Nuxt data loading with useFetch or useAsyncData, validated server API routes, unique cache keys, SSR-safe shared state and error pages, without double fetching.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [nuxt, typescript]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [usefetch, server-routes, ssr, nitro, data-fetching]
pairs_with:
  prompts: [write-vue-composable, implement-pagination]
  personas: [vue-engineer]
  rules: [vue-rules]
args:
  - name: feature_spec
    description: The pages and data to build, for example "product list with filters in the URL and a product detail page, reading from our Postgres through server routes".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Data flow, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Nuxt engineer wiring pages to data. Nuxt renders on the server and hydrates on the client, and most data bugs come from forgetting that:
- Calling `$fetch` directly in `setup` runs on the server and again in the browser. `useFetch` and `useAsyncData` fetch once on the server and pass the result to the client in the payload. Use `$fetch` for event handlers such as form submits.
- Keys: `useAsyncData` keys must be unique per distinct data; two components with the same key share one result. For data that depends on route params or filters, include them in the key or pass reactive `query` refs to `useFetch`, which then refetches when they change.
- `lazy`, `server: false` and `immediate: false` change when data arrives; use `status` (or `pending`) and handle the empty state. Nuxt 4 changed defaults (for example `data` starts as `undefined` and is a shallow ref); check the version.
- Errors: read `error` from the composable; in pages, throw `createError({ statusCode, statusMessage, fatal })` to show `error.vue`. In server routes, throw `createError` with the right status.
- Server routes in `server/api/` use `defineEventHandler`, and validate input with `readValidatedBody`, `getValidatedQuery` and `getValidatedRouterParams` and a schema. They run in Nitro, not in the Vue app.
- When the server renders a page that calls your own API, cookies are not forwarded automatically by `$fetch`; `useFetch` with relative URLs forwards them, otherwise use `useRequestFetch` or `useRequestHeaders(['cookie'])`.
- Shared state uses `useState`. A module-level `ref` lives in the server process and leaks one user's data into another's request.
- Secrets go in `runtimeConfig` (private), public values in `runtimeConfig.public`.
- Use `pick` or `transform` to keep the payload small; cache server routes with `defineCachedEventHandler` or `routeRules` only for data that is the same for every user.
</context>

<task>
Build this feature:
{{feature_spec}}

1. Read `nuxt.config`, `package.json` (Nuxt version), existing pages, composables, server routes, auth handling and tests. Follow their patterns.
2. Write the data flow: each page, which composable loads what with which key, the server routes it calls, and what is cached.
3. Implement the server routes with validation and errors, the composables or page fetching with keys and reactive params, loading, empty and error states, and `error.vue` handling if missing.
4. Write tests with `@nuxt/test-utils` where the project uses it: server routes (valid, invalid, not found) and a page render that asserts data is fetched once on the server.
5. Run `nuxi typecheck`, the tests and the linter. Fix what fails.
</task>

<constraints>
- No `$fetch` in `setup` for initial page data.
- No module-level reactive state holding per-user data.
- Do not cache responses that differ per user.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Data flow
A table: Page or component | Composable | Key | Server route | Caching.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, and why.
</output_format>
