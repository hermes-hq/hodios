---
schema: 1
id: write-vue-composable
kind: prompt
title: Write a reusable Vue composable
description: Writes a reusable Vue 3 composable with flexible typed inputs, returned refs, cleanup on scope dispose, stale-request handling, SSR safety, a usage example and tests.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [vue, typescript]
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
tags: [composables, composition-api, reactivity, ssr, vitest]
args:
  - name: behaviour
    description: What the composable should do, for example "debounced search against an API", "track online status", "paginate a list from an endpoint".
    type: text
    required: true
  - name: used_in
    description: Where it will be used, for example "Nuxt 3 pages with SSR" or "Vite SPA". Leave empty to detect it.
    type: string
output_contract:
  format: markdown
  sections: [API, Changes, Usage, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Composables that work in one component often fail when reused. Common problems: accepting only plain values, so callers cannot pass a ref or getter and the composable never reacts to changes; returning a `reactive()` object that loses reactivity when destructured; event listeners, intervals and watchers that are never removed; an older request resolving after a newer one and overwriting fresh data; touching `window` or `document` during setup, which crashes under SSR; and module-level state that leaks between users on an SSR server. Many common needs are already in VueUse.
</context>

<task>
Write a composable that does this:

{{behaviour}}

{{#used_in}}
Used in: {{used_in}}
{{/used_in}}

1. Read `package.json` for Vue, Nuxt and VueUse versions, and existing composables for naming, folder and test style. If VueUse (or the project) already provides this, say so and use or wrap it instead of rewriting it.
2. Design the API: name `useX`; accept `MaybeRefOrGetter<T>` inputs and read them with `toValue()` (Vue 3.3+); return an object of refs (`ref`, `shallowRef`, `computed`, readonly where callers must not write) plus functions, so destructuring keeps reactivity. Type everything.
3. React to input changes with `watch` or `watchEffect` on the getters, with `immediate` where needed.
4. For async work: track the latest request and ignore or abort stale ones (AbortController), expose `isLoading` and `error` refs, and avoid unhandled promise rejections.
5. Clean up in `onScopeDispose` (listeners, timers, observers, aborts) so it works in components and in `effectScope`.
6. Make it SSR safe: access browser APIs only in `onMounted` or behind a client check; never keep per-user state at module level; in Nuxt, use `useState` or `useFetch` where shared or server-fetched state is intended.
7. Show a short usage example in a component.
8. Write tests with Vitest (and Vue Test Utils or a `withSetup` helper): reacts to a changed input ref, ignores a stale response, cleans up on unmount, and handles errors. Run tests and the type check.
</task>

<constraints>
- Do not return a single `reactive()` object meant to be destructured.
- Do not add VueUse as a dependency only for this unless the user agrees; reimplementing a small piece is fine.
- Do not mutate caller-owned refs passed as inputs unless that is the stated contract.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## API
The composable's TypeScript signature and a one-line description of each returned member.

## Changes
One line per file: `path`, what changed.

## Usage
A short component example in a code block.

## Tests
One line per test.

## Verification
Commands run and their real results.
</output_format>
