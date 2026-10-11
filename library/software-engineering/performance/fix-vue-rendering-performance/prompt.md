---
schema: 1
id: fix-vue-rendering-performance
kind: prompt
title: Fix slow Vue rendering
description: Fixes slow Vue 3 or Nuxt rendering caused by deep reactivity on large data, unstable props, missing keys, template method calls, deep watchers and heavy hydration.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [vue]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [reactivity, shallowref, v-memo, hydration, vue-devtools]
pairs_with:
  prompts: [fix-vue-reactivity-bug, speed-up-long-list-rendering, write-vue-composable]
  personas: [vue-engineer, performance-engineer]
args:
  - name: symptom
    description: What is slow (initial load, typing lag, a table that freezes on update, slow page transitions), the components involved, Vue or Nuxt version and state management (Pinia, composables).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Measurement, Causes, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Vue tracks dependencies precisely, so a component re-renders only when reactive data it read changes, but several patterns defeat that. `ref` and `reactive` are deep: wrapping a large API response, a 10,000-row array or a third-party instance (a map, chart or editor object) makes Vue create proxies for every nested object, which is slow to create and slow to access. `shallowRef`, `shallowReactive` and `markRaw` fix that when the data is replaced rather than mutated in place. Methods called in templates run on every render while `computed` values are cached. Passing a new object, array or inline function as a prop each render makes the child re-render even when nothing changed. `v-for` without a stable `key` (or keyed by index on a reorderable list) re-creates elements. `watch` with `deep: true` on large objects traverses them on every change. One giant component re-renders its whole template for any change; splitting it isolates updates. `v-memo` and `v-once` skip work for parts that rarely change. In Nuxt, initial cost is often hydration and payload size: large `useFetch` payloads serialised into the page, components that could be lazy (`Lazy` prefix) or server-only, and client-only plugins that run on every page.
</context>

<task>
Fix the rendering performance problem: {{symptom}}

1. Read the slow components, the stores or composables they use, and for Nuxt the page's data fetching and plugins. Note the Vue or Nuxt version.
2. Measure: use the Vue DevTools performance and component render timings, plus a browser Performance recording of the slow interaction, in a production build. If you cannot run it, give the steps and list code-level suspects.
3. Find the causes and cite file:line: deep reactivity on large or external objects; template method calls doing real work; unstable props; missing or unstable keys; deep watchers; oversized components; for Nuxt, payload size, hydration of components that could be lazy or server-only, and heavy client plugins.
4. Fix with the smallest correct change: `shallowRef` or `markRaw` for large or external data (and replace rather than mutate it); `computed` for derived values; stable props and keys; narrower watchers; split components where one change re-renders a large template; `v-memo` for large rows that rarely change; virtualise very long lists; in Nuxt, `pick` or `transform` to shrink payloads and lazy or server components.
5. Re-measure the same interaction and run tests, checking that UI still updates for every state change.
</task>

<constraints>
- When switching to shallow reactivity, find every in-place mutation of that data and change it to a replacement; otherwise the UI will stop updating.
- Do not add `v-memo` without listing exactly which dependencies it must include.
- Use only APIs that exist in the installed version; mark uncertain ones [CHECK DOCS].
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Measurement
Render timings or recording findings before the change.
## Causes
Ranked, with file:line.
## Changes
One line per file: `path`, what changed.
## Results
After-change timings, test results and any update paths checked by hand.
</output_format>
