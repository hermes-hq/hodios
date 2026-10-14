---
schema: 1
id: review-vue-code-change
kind: prompt
title: Review a Vue code change
description: Reviews a Vue 3 or Nuxt diff for lost reactivity, mutated props, watchers used as computed, composables that leak listeners, hydration mismatches and costly template patterns.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [frontend-engineer, fullstack-engineer]
stack: [vue, typescript]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [reactivity, composition-api, composables, watchers, pull-request]
pairs_with:
  personas: [vue-engineer]
  prompts: [review-pull-request, fix-vue-reactivity-bug, fix-vue-rendering-performance]
  rules: [vue-rules]
args:
  - name: diff
    description: The Vue diff with file paths, including the parent that uses the changed component and any composables or stores it calls if they are not in the diff.
    type: text
    required: true
  - name: context
    description: Vue version (and Nuxt version if used), whether components use script setup or the Options API, the store (Pinia, Vuex) and whether pages are server-rendered.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Vue's reactivity hides its failures: when a value stops being reactive, nothing throws, the screen just stops updating. The usual causes in a diff are destructuring a `reactive` object, a store or `props` into plain variables (props destructuring is only reactive in Vue 3.5 and later with script setup), replacing a whole `reactive` object instead of mutating it, passing `props.x` into a composable as a plain value instead of a getter or ref, and storing a non-reactive copy at setup time. Props get mutated directly, or an object prop is mutated in place, which Vue does not warn about but which makes the parent's data change behind its back. `watch` is used to copy one value into another ref where `computed` belongs, causing an extra render and a moment of stale state; deep watchers on large objects are expensive; a watcher that needs to run on mount lacks `immediate`. Composables add event listeners, intervals or subscriptions with no cleanup in `onUnmounted` or `onScopeDispose`. In templates: `v-if` together with `v-for` on one element, index keys on reorderable lists, method calls that recompute on every render, and `v-html` with untrusted content. In Nuxt: `$fetch` called bare in setup fetches twice (server and client), `useAsyncData` keys collide, and `Date.now()`, `window` or locale formatting during server rendering cause hydration mismatches.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open each changed component in full, the composables and stores it uses, and its parent; check the Vue and Nuxt versions in `package.json`. Run `vue-tsc` or the type check, the linter and the related tests if you can, and report the results. If you only have the diff, say which conclusions depend on code you could not see.
2. Trace each reactive value from its source to the template. Flag every point where reactivity is lost: destructuring of `reactive`, stores (needs `storeToRefs`) or props on versions before 3.5 (on 3.5, a destructured prop passed to `watch` or a composable still needs a getter such as `() => size`), reassigning a `reactive` variable, `.value` read once at setup and passed on as a plain value, and composables that accept plain values where they need refs or getters.
3. Check data flow: props or object props mutated in the child, `v-model` on a prop, two-way binding done by hand where `defineModel` is available, and emits that are not declared.
4. Check every `watch` and `watchEffect`: whether it should be `computed`, whether it needs `immediate` or `deep` (and whether `deep` is too costly for the data size), async watchers without a guard against out-of-order results, and side effects without cleanup.
5. Check composables and lifecycle: listeners, timers, observers and subscriptions removed on unmount or scope dispose; composables and lifecycle hooks called outside setup, inside callbacks, or after an `await` in a plain async function (top-level `await` in script setup keeps the instance; other async code does not).
6. Check templates: `v-if` with `v-for` on one element, unstable keys, method calls doing real work on every render, large static data made deeply reactive (`shallowRef` or `markRaw` fits), and `v-html` with content that is not sanitised.
7. For Nuxt or server rendering: data fetched with `useFetch` or `useAsyncData` and unique keys, browser-only APIs guarded, no time, random or locale-dependent output during server render, and secrets only in private runtime config.
8. Check the states the user sees: loading, empty, error with a retry, and double submit while pending.
9. For each finding, write the user action or data change that triggers it and what goes wrong. Drop any finding you cannot trigger.
</task>

<constraints>
- State the Vue version you assumed; version-dependent behaviour (props destructuring, `defineModel`, `useTemplateRef`) must match it.
- Follow the codebase's API style; do not ask to rewrite Options API components to the Composition API as part of a review.
- At most 10 findings, most severe first: stale or wrong data shown, then broken data flow, then leaks, then render cost. No formatting or naming comments.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity (high, medium, low), `path:line`, the component, composable or store, the defect, the triggering action or data change, and the fix in one or two sentences.
## Missing tests
Bullets naming the user-visible behaviour each test covers, or "None".
## Questions
Versions, rendering mode or intended behaviour you need confirmed, or "None".
</output_format>
