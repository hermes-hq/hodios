---
schema: 1
id: fix-vue-reactivity-bug
kind: prompt
title: Fix a Vue reactivity bug
description: Fixes Vue 3 reactivity loss from destructuring, ref versus reactive misuse, watchers that do not fire, mutated props and non-reactive values in templates.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [vue]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [vue-3, composition-api, reactivity, pinia]
pairs_with:
  prompts: [fix-hydration-mismatch]
  personas: [vue-engineer]
args:
  - name: symptom
    description: "What goes wrong: the template does not update, a watcher or computed does not run, a prop change is ignored, or a warning such as \"Avoid mutating a prop directly\"."
    type: text
    required: true
  - name: code
    description: "The component, composables and store code involved, or their paths."
    type: text
output_contract:
  format: markdown
  sections: [Where reactivity is lost, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Vue 3 engineer who knows reactivity works through proxies and `.value` access, and is lost whenever code copies a value out of them. The usual causes:
- Destructuring a `reactive` object, `props`, or a Pinia store: `const { count } = store` copies the current value. Use `toRefs`/`toRef`, `storeToRefs` for Pinia state and getters, or access through the object.
- `ref` versus `reactive`: reassigning a `reactive` variable (`state = newObj`) replaces the proxy the template uses; forgetting `.value` in script; a ref nested in a plain array or Map is not unwrapped in templates.
- Watchers: `watch(state.count, ...)` passes a number, not a source; use a getter `() => state.count`. Watching a ref of an object does not see nested changes without `deep: true` (or watch a getter of the specific property). `immediate` is needed for the initial value.
- Props: mutating a prop or a nested prop object directly; use an emitted event, `defineModel`, or a local copy that is re-synced deliberately.
- Values created outside reactivity: class instances with private fields, values marked `markRaw` or `shallowRef` whose inner changes are not tracked (needs `triggerRef`), third-party objects mutated internally.
- `computed` with side effects, or a computed whose dependency is read only on some branches.
- Template refs and `nextTick`: reading the DOM before the update has flushed.
Vue 2 caveats (adding properties with `Vue.set`, array index assignment) do not apply in Vue 3; say which version the code uses.
</context>

<task>
Fix this Vue reactivity bug.

Symptom:
{{symptom}}
{{#code}}

Code:
{{code}}
{{/code}}

1. Read the component, composables and stores involved, and confirm the Vue version and whether it uses the Composition API, Options API or both.
2. Follow the value from its reactive source to the template, watcher or computed that should update, and find where it becomes non-reactive or untracked.
3. Fix it with the idiomatic tool: `toRefs`, `storeToRefs`, a getter source for `watch`, `.value`, emitting instead of mutating a prop, `defineModel`, `triggerRef` for shallow refs, `nextTick` for DOM reads.
4. Verify with a component test (Vue Test Utils with `await` on updates) if the project has tests, or exact browser steps.
</task>

<constraints>
- Do not use `$forceUpdate`, key-changing remounts or `deep: true` everywhere as the fix.
- Do not convert the component between Options and Composition API.
- Do not apply Vue 2 workarounds to Vue 3 code.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Where reactivity is lost
The exact expression where a reactive value becomes a plain value or is not tracked, and why.
## Fix
The diff.
## Verification
The test or browser steps used to confirm the update now happens.
</output_format>
