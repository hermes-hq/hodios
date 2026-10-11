---
schema: 1
id: migrate-angular-to-standalone-and-signals
kind: prompt
title: Migrate Angular to standalone components and signals
description: Moves an Angular app from NgModules to standalone components and to signal inputs, outputs, queries and the built-in control flow, using the official schematics in safe, reviewable steps.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [angular]
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
tags: [standalone-components, signals, control-flow, schematics]
pairs_with:
  prompts: [upgrade-angular-major-version, slim-down-angular-components]
args:
  - name: scope
    description: Which migrations to do (standalone, control flow, signal inputs and outputs, queries, inject function, component state to signals) and for which part of the app.
    type: text
    required: true
  - name: notes
    description: "Angular version, size of the app, shared modules, state management library, test setup."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Migration order, Changes made, Manual decisions, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recent Angular versions ship schematics for each of these moves, and the work is mostly running them in the right order and handling what they skip. What experienced people know: the standalone schematic runs in three passes (convert declarations, remove unneeded NgModules, switch bootstrapping to standalone APIs) and should be run and committed pass by pass; shared modules that export many components need care because every consumer must then import what it uses. Routes move to `loadComponent` and providers move into `provideRouter`, `provideHttpClient` and similar functions, where interceptors and guards become functional. The control flow schematic converts `*ngIf`, `*ngFor` and `*ngSwitch` to `@if`, `@for` and `@switch`, and `@for` requires a `track` expression, which is a chance to fix bad tracking. Signal input, output and query migrations skip cases they cannot prove safe (inputs written to inside the component, for example) and report them. Converting component state from fields or RxJS subjects to signals is a design change, not a syntax change: keep RxJS for event streams and async flows, use `toSignal` and `toObservable` at the edges, use `computed` for derived values, and avoid `effect` for state propagation. Tests that use `TestBed` with declarations need updating to imports.
</context>

<task>
Migrate this Angular app as described: {{scope}}
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Check the Angular version supports each requested migration and its schematic; upgrade first if not (and say so).
2. Read the module structure, shared modules, routing, providers, interceptors and guards, and how state is held in components and services.
3. Propose the order, typically: standalone conversion pass by pass, bootstrapping and providers, control flow, `inject()` if wanted, signal inputs, outputs and queries, then component state to signals by feature. Each item is its own commit.
4. Run each schematic on a branch, review its diff, and run build and tests before moving on. Collect what each schematic skipped and why.
5. Handle the skipped cases by hand where safe, and list those left alone with the reason.
6. For state conversion, change one feature at a time: derived values to `computed`, local state to `signal`, keep observables where they model streams, and bridge with `toSignal` or `toObservable`. Do not add effects that write state.
7. Update tests (TestBed declarations to imports, input setting through the component API), then run unit and end-to-end tests and check change detection behaviour in the main screens.
</task>

<constraints>
- Run the official schematics instead of rewriting by hand where a schematic exists; review their output rather than trusting it.
- One migration type per commit, so each is reviewable and revertible.
- Do not convert RxJS streams to signals where they model asynchronous events (HTTP, websockets, debounced input) just for uniformity.
- No behaviour or UI changes beyond what the migrations require.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Angular version, modules, routing and state patterns found.
## Migration order
Ordered list of steps, each with its schematic or manual approach.
## Changes made
Per step: files changed, skipped cases and how handled.
## Manual decisions
State conversions done or left as RxJS, with reasons.
## Verification
Build, unit, end-to-end results; screens checked.
</output_format>
