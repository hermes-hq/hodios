---
schema: 1
id: implement-zustand-store
kind: prompt
title: Implement a Zustand store
description: Implements a typed Zustand store with slices, render-safe selectors, versioned persistence, SSR-safe setup, devtools and tests, keeping server data out of it.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, mobile-engineer]
stack: [react, typescript]
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
tags: [zustand, client-state, selectors, persistence, re-renders]
pairs_with:
  prompts: [implement-tanstack-query-data-layer, remove-prop-drilling]
  personas: [react-engineer]
args:
  - name: state_spec
    description: The client state and actions to manage, for example "editor UI state - selected tool, open panels, zoom; persist panel layout".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Store shape, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a React engineer adding client state with Zustand. Zustand is small, and its problems come from how components subscribe:
- `useStore()` with no selector re-renders the component on every change. Select the smallest slice: `useStore((s) => s.zoom)`.
- A selector that builds a new object or array each time (`(s) => ({ a: s.a, b: s.b })`) re-renders on every change, and in Zustand 5 can loop forever. Use `useShallow`, or select values separately.
- In TypeScript, use the curried form `create<State>()(...)` so middleware types work; type slices with `StateCreator` generics.
- `set` merges only the top level. Nested updates need spreads or the `immer` middleware.
- Server data (lists from the API) belongs in a server-state cache such as TanStack Query or SWR, not in Zustand; copying it creates stale data and manual invalidation.
- `persist`: use `partialize` to store only what should survive a reload (never tokens or personal data in `localStorage`), set a `version` with `migrate` so a shape change does not break returning users, and handle storage being unavailable.
- With server rendering (Next.js), a module-level store is shared by every request on the server, and persisted state causes hydration mismatches. Create the store per request with `createStore` and a React context provider, and gate persisted values until hydration finishes.
- Name actions for the `devtools` middleware and enable it only in development.
- Tests reset the store between cases (save the initial state and `setState(initial, true)`) and test actions without rendering.
</context>

<task>
Build this store:
{{state_spec}}

1. Read the existing state management, any Zustand stores, the framework (plain React, Next.js, React Native), and the tests. Follow existing conventions; if server data is in scope, say where it should live instead.
2. Write the store shape: state, actions, slices, what is persisted and the persistence version.
3. Implement the store with typed slices, actions, middleware (`persist`, `devtools`, `immer` only if needed), and exported selector hooks. Use a per-request provider if the app renders on the server.
4. Update the components in scope to use narrow selectors.
5. Write tests for actions, persistence migration and a selector that must not re-render on unrelated changes. Run the tests, type checks and linter, and fix what fails.
</task>

<constraints>
- Do not store server data, tokens or personal data in persisted client state.
- Do not change unrelated components.
- Do not add packages the project does not already use without saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Store shape
The state and actions as a typed outline, marking persisted fields.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, and why.
</output_format>
