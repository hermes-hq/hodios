---
schema: 1
id: migrate-svelte-4-to-svelte-5
kind: prompt
title: Migrate Svelte 4 components to Svelte 5 runes
description: Moves Svelte 4 components to Svelte 5 runes, snippets and event attributes using the migration script plus manual review of reactive statements, slots, events and component APIs.
category: migration
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer]
stack: [svelte]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [svelte-5, runes, snippets, legacy-mode, reactivity]
pairs_with:
  prompts: [upgrade-major-dependency, replace-state-management-library]
  rules: [svelte-rules]
  personas: [frontend-engineer]
args:
  - name: project
    description: Svelte and SvelteKit versions, number of components, UI or component libraries in use, and whether components are published as a library.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Readiness, Automated migration, Manual changes, Behaviour checks, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Svelte 5 keeps Svelte 4 syntax working per component (legacy mode), so migration can be gradual, but a component uses either runes or legacy syntax, not both. The official migration script converts most code: `let` state to `$state`, `export let` to `$props()`, `$:` to `$derived` or `$effect`, slots to snippets with `{@render}`, and `on:click` to `onclick`. What it cannot decide well is the meaning of `$:` blocks. A `$:` that computes a value should be `$derived`, which is lazy and pure; a `$:` with side effects becomes `$effect`, which runs after the DOM updates, not before, and the script sometimes falls back to `run()` from `svelte/legacy`, which needs manual work. Event modifiers such as `|preventDefault` are gone and must be called in the handler. `createEventDispatcher` gives way to callback props, which changes the API for parent components and any external users of a component library. `new Component()` becomes `mount()`. `$state` objects and arrays are deeply reactive proxies, so code that relied on reassignment to trigger updates, or that passes state to libraries expecting plain objects, behaves differently. Svelte 5 needs current SvelteKit and compatible libraries.
</context>

<task>
Project: {{project}}

1. Read `package.json`, SvelteKit config and a sample of components. List libraries with Svelte components and check each for Svelte 5 support; list blockers.
2. Upgrade Svelte, SvelteKit and the Vite plugin in a branch and confirm the app runs in legacy mode before converting anything.
3. Run the migration script on one folder at a time, starting with leaf components, and review its diff.
4. Fix what it marked: classify each former `$:` as derived value or effect, remove `svelte/legacy` helpers, replace event modifiers, and convert dispatched events to callback props, updating parents.
5. Check places where state is passed to non-Svelte code or compared by identity, and use snapshots where a plain object is needed.
6. Run tests and the type checker, then click through forms, lists and modals where effect timing or event handling changed. Report results.
</task>

<constraints>
- Do not convert `$:` blocks to `$effect` by default; derive values where possible.
- Do not change a published component library's public events or props without listing it as a breaking change for its users.
- Keep each folder's conversion reviewable on its own.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Readiness
Svelte and SvelteKit versions, libraries and their Svelte 5 support.
## Automated migration
What the migration script changed and what it marked for manual work.
## Manual changes
Per component: reactive statements, slots, events, component API changes.
## Behaviour checks
Effects timing, reactivity of objects and arrays, event modifiers, tests.
## Remaining risks
Bullets, or "None".
</output_format>
