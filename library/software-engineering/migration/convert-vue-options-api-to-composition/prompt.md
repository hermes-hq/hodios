---
schema: 1
id: convert-vue-options-api-to-composition
kind: prompt
title: Convert Vue Options API to Composition API
description: Converts Vue components from the Options API to the Composition API with script setup, typed props and emits, composables in place of mixins, and the reactivity pitfalls that break behaviour.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [vue]
requires: [repo-read, file-write, shell]
inputs: [repo, file, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [composition-api, script-setup, composables, reactivity]
pairs_with:
  prompts: [migrate-vue-2-to-vue-3, write-vue-composable, split-large-vue-component]
args:
  - name: target
    description: The components, folder or feature to convert.
    type: text
    required: true
  - name: notes
    description: "Vue version, TypeScript or not, mixins in use, state library, test setup."
    type: text
output_contract:
  format: markdown
  sections: [Components converted, Mapping notes, Behaviour risks, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Converting a component from the Options API to `<script setup>` looks mechanical, and the bugs come from the parts that are not. What experienced people check: destructuring a `reactive` object or props loses reactivity (use `toRefs`, or the props destructure support in recent Vue versions); `ref` values need `.value` in script but not in the template; `watch` on a reactive object is deep by default while watching a getter is not, and `immediate` must be carried over; `created` logic moves into the setup body, and `beforeDestroy` or `beforeUnmount` cleanup to `onBeforeUnmount` or `onUnmounted`; `<script setup>` components are closed by default, so a parent calling a child method through a template ref breaks unless the child uses `defineExpose`; `name` and `inheritAttrs` need `defineOptions`; `this.$emit`, `this.$refs`, `this.$router` and `this.$store` become `defineEmits`, template refs, `useRouter` and the store's composable; and mixins become composables, where name collisions and implicit dependencies on `this` become explicit. Recent Vue versions add `defineModel` for `v-model` props. Vue 2.7 supports the Composition API and `<script setup>`, so this conversion does not require Vue 3.
</context>

<task>
Convert these components to the Composition API with `<script setup>`: {{target}}
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read each component, the mixins it uses, its parent usages (template refs, events, `v-model`, slots) and its tests. Note the project's existing composable and typing conventions and follow them.
2. Convert mixins used by these components into composables first, keeping the old mixin until all users are converted.
3. Convert each component: props and emits with `defineProps` and `defineEmits` (typed if the project uses TypeScript), `data` to `ref` or `reactive`, `computed`, `methods` to functions, watchers with the same `deep` and `immediate` behaviour, lifecycle hooks, template refs, router and store access, and `defineExpose` for anything parents call.
4. Keep the template unchanged except where names must change; keep the public interface (props, events, slots, exposed methods) identical.
5. Run the component tests and update only what depended on the instance internals (for example `wrapper.vm` data access), keeping the same behaviour checks.
6. Run type checks, lint and the app's tests, and check each converted component in the running app where possible.
</task>

<constraints>
- No behaviour or interface changes; parents must not need edits unless they used internals, which you list.
- Do not convert components outside the given target.
- Do not loosen types or tests to get the conversion through.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Components converted
List with notes per component; mixins turned into composables.
## Mapping notes
Non-obvious mappings made (watchers, exposed methods, lifecycle).
## Behaviour risks
Places where reactivity or interface could change, and how each was checked.
## Verification
Tests, type check and manual checks run, with results.
</output_format>
