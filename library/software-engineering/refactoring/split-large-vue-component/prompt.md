---
schema: 1
id: split-large-vue-component
kind: prompt
title: Split an oversized Vue component
description: Breaks a large Vue single-file component into composables and child components, keeping its props, emits, slots, v-model contract and rendered output unchanged.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [vue]
requires: [repo-read, file-write, shell]
inputs: [file]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [vue-composables, single-file-components, component-design, composition-api]
pairs_with:
  personas: [vue-engineer]
  rules: [vue-rules]
args:
  - name: component
    description: The .vue file to split, as a path or pasted code, whether it uses the Options API or the Composition API, and what hurts.
    type: text
    required: true
  - name: test_command
    description: The command that runs the component tests, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Responsibilities, Proposed split, Steps, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Vue engineer. A large single-file component typically mixes data fetching, several groups of reactive state with their watchers, computed values, form handling and several regions of template. The natural homes: stateful logic in composables (`useOrderFilters()` returning refs and functions), template regions in child components with explicit props and emits, and pure calculations in plain functions.

Vue-specific traps:
- **Reactivity loss:** destructuring a `reactive()` object or props in a composable breaks reactivity. Pass refs or getters, use `toRefs`, and return refs from composables.
- **Two-way binding:** children must not mutate props. A child that edits data needs `defineModel` or a `modelValue` prop with an `update:modelValue` emit, so the parent's `v-model` keeps working.
- **Emits and slots:** the component's own emits, slots and exposed methods (`defineExpose`, template refs used by the parent) are its public contract and must not change.
- **Watchers:** moving a `watch` into a composable keeps its `immediate` and `deep` options and its cleanup only if copied exactly; a watcher created outside setup leaks.
- **Options API:** if the component uses the Options API, either keep it and extract mixins-free helpers, or convert to `<script setup>` as a separate first step, not interleaved with the split.
- **provide/inject** and scoped styles: moving markup into a child changes which scoped styles apply; `:deep()` may be needed.
</context>

<task>
Split {{component}}.

1. Read the component and list its responsibilities with line ranges: fetching, state groups with their watchers and computed values, form handling, template regions. Note its public contract: props, emits, slots, `v-model` bindings, exposed methods.
2. Propose the split: composables for state groups, child components for template regions with their props and emits, plain functions for calculations. Say where each piece of state lives after the split. Wait for approval.
3. Make sure tests cover the visible flows (Vue Test Utils or the project's testing library) before moving code; add them where missing, including emitted events.
4. Apply the split in steps (functions, then composables, then child components), running the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each step. Keep reactivity intact and the parent contract unchanged.
5. Show the diff and the new file layout following the project's conventions, and report test and type check results.
</task>

<constraints>
- Props, emits, slots, v-model bindings, exposed methods and rendered output must stay the same.
- Children must not mutate props; use defineModel or update events.
- Do not add Pinia or another store, and do not switch API style in the same step as the split.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Responsibilities
Table: line range, responsibility, state it reads or writes; then the public contract.
## Proposed split
Composables, components and functions, with where state lives.
## Steps
Numbered steps, each with its test check.
## Diff
The change and the new file layout.
## Check
Tests and type check run and results.
</output_format>
