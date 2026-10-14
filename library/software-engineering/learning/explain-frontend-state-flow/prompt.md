---
schema: 1
id: explain-frontend-state-flow
kind: prompt
title: Explain state flow in a frontend feature
description: Traces how state and data move through one frontend feature, from fetch and cache or store to props, context and re-renders, with a diagram of who owns each piece of state.
category: learning
version: 1.0.0
status: incubating
stage: [learn, discover]
role: [frontend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [repo-read]
inputs: [repo, file]
output: [explanation, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [state-management, data-fetching, component-tree, re-renders]
pairs_with:
  prompts: [explain-codebase, fix-react-state-and-effect-bug, replace-usestate-tangle-with-reducer]
args:
  - name: feature
    description: The screen, component or user action to trace (for example "adding an item to the cart updates the header badge").
    type: text
    required: true
  - name: code
    description: Paste the relevant components if the assistant cannot read the repo.
    type: text
output_contract:
  format: markdown
  sections: [In short, State inventory, The flow step by step, Diagram, Gotchas, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In a frontend, most confusion comes from not knowing where a value lives and who is allowed to change it. A feature typically mixes several kinds of state: server state in a data-fetching cache (React Query, SWR, Apollo, RTK Query), global client state in a store (Redux, Zustand, Pinia, NgRx, signals), shared state in context or provide/inject, local component state, URL state (route params and query strings), and form state. Bugs come from the same value being copied into two places, effects that sync one into another, stale closures, cache keys that do not match so one screen does not update, and context providers re-rendering whole subtrees. A good trace names the single owner of each value and every path by which it changes.
</context>

<task>
Trace how state flows through this feature: {{feature}}
{{#code}}

```
{{code}}
```
{{/code}}

1. Identify the framework and the state tools in use from the code and manifest (component state, store, data-fetching cache, context, router, form library).
2. Find the components involved, starting from the user-facing entry (route or component) and following imports and children.
3. Build a state inventory: every piece of state the feature reads or writes, its kind (server cache, global store, context, local, URL, form), its owner (the file and line where it is defined), and who reads and writes it.
4. Walk through the main user action step by step: the event handler, what it calls, how server data is fetched or mutated, how the cache or store updates (invalidation, optimistic update, manual set), and which components re-render as a result.
5. Draw a Mermaid flowchart with components as nodes, state owners highlighted, and arrows labelled with props, context, store selectors, cache keys or events.
6. Flag gotchas: duplicated state, effects that copy state, missing or mismatched cache keys, mutations without invalidation, wide context values that re-render many components, and derived values stored instead of computed.
</task>

<constraints>
- Every claim about where state lives cites a file path and line. Mark anything inferred from names "(inferred)".
- Explain the existing flow; do not refactor it. Gotchas are observations, each with its evidence.
- Do not assume a library's behaviour beyond its documented defaults; if a default matters (such as stale time), say what it is assumed to be.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## In short
Three sentences: where the data comes from, who owns it, what updates the screen.
## State inventory
A table: state, kind, owner (path:line), read by, written by.
## The flow step by step
Numbered steps with path:line.
## Diagram
Mermaid flowchart.
## Gotchas
Bullets with evidence. "None found" if none.
## Questions
What the code did not answer.
</output_format>
