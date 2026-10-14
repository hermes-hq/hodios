---
schema: 1
id: replace-usestate-tangle-with-reducer
kind: prompt
title: Replace a useState tangle with a reducer
description: Consolidates many interdependent useState calls in one React component into a reducer or a single state object with named transitions, so impossible states cannot happen, without changing behaviour.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [react]
requires: [repo-read, file-write, shell]
inputs: [file]
output: [diff, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [react-hooks, use-reducer, state-machines, impossible-states]
pairs_with:
  prompts: [split-react-component, remove-unnecessary-useeffects]
  personas: [react-engineer]
args:
  - name: component
    description: The component or custom hook with the tangled state, as a path or pasted code, and the bug it causes if any (spinner stuck, error shown with data, double submit).
    type: text
    required: true
  - name: test_command
    description: The command that runs the relevant tests, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [State today, New state shape, Diff, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a React engineer. The smell is several `useState` calls that always change together: `isLoading`, `error`, `data`, `isSubmitting`, `step`, `selectedId`. Each handler sets three or four of them, and sooner or later one path forgets one, giving states that should be impossible: loading and error at once, data from the previous request with a new error, a wizard on step 3 with no answers from step 2.

Two fixes, chosen by how the state changes:
- **One state object** with `useState` when updates are simple replacements.
- **`useReducer`** with named actions (`submitted`, `succeeded`, `failed`, `reset`) when transitions have rules. A discriminated union for status (`{status: 'idle'} | {status: 'loading'} | {status: 'error', error} | {status: 'success', data}`) makes impossible states unrepresentable in TypeScript. The reducer is a pure function and can be tested without rendering.

Traps: a reducer that only does `{...state, ...action.payload}` is useState with extra steps; derived values (counts, `canSubmit`) belong in render, not in state; functional updates (`setCount(c => c + 1)`) relied on for batching must keep the same semantics; and state that unrelated parts of the UI own should stay separate rather than being forced into one blob.
</context>

<task>
Consolidate the state in {{component}}.

1. List every `useState` with where it is set and read. Group the ones that change together, mark derived values that should not be state, and list the combinations that should be impossible but the current code allows (with the path that can produce each).
2. Choose a state object or a reducer for each group and design it: state type (a discriminated union where status drives what fields exist), action names in past tense describing what happened, and the transition rules.
3. Make sure tests cover the visible flows (success, error, retry, cancel); add them where missing. Write unit tests for the reducer's transitions.
4. Replace the useState calls with the new state, one group at a time, keeping event handlers' external behaviour the same. Compute derived values in render.
5. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}} and the type check, and report results. If a previously possible impossible state was a real bug, say so and show the test that now covers it.
</task>

<constraints>
- Keep the component's props and rendered output the same for every valid state.
- Do not merge unrelated state (a modal's open flag and form data) just to have one reducer.
- Do not add a state management library or move state to context in this change.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## State today
Table: state variable, set in, read in, group; then the impossible combinations found.
## New state shape
The type, actions and transition rules.
## Diff
The change.
## Tests
Reducer tests and behaviour tests.
## Check
Commands run and results.
</output_format>
