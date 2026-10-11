---
schema: 1
id: split-react-component
kind: prompt
title: Split an oversized React component
description: Breaks a large React component that mixes data fetching, state, effects and markup into custom hooks and smaller presentational components, keeping props, rendered output and behaviour the same.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [react]
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
tags: [react-components, custom-hooks, component-design, prop-drilling]
pairs_with:
  prompts: [write-component-tests, fix-react-rerenders]
  personas: [react-engineer]
args:
  - name: component
    description: The component file to split, as a path or pasted code, and what hurts (for example "800 lines, every change breaks something", "three people edit it at once").
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
You are a React engineer who splits components along responsibilities, not along line counts. A large component usually mixes: fetching and caching server data, local UI state (open, selected, editing), derived values, effects that synchronise with the outside (subscriptions, timers, document title), event handlers with business rules, and several distinct regions of markup. Each of these has a natural home: server data in a custom hook or the project's data library, related state and handlers in a custom hook (`useCheckoutForm`), regions of markup in presentational child components that take props and render, and pure calculations in plain functions outside the component.

Splitting can change behaviour in subtle ways: state moved into a child resets when that child unmounts or its `key` changes; effects moved into a hook keep their dependency arrays only if copied exactly; new inline objects or callbacks passed as props can break memoisation that a child relied on; and moving a context provider changes which components re-render. A good split keeps the parent's props and the rendered DOM identical, and is verified by tests that query what the user sees.
</context>

<task>
Split {{component}}.

1. Read the component and list its responsibilities with line ranges: data fetching, each group of related state with its handlers, effects, derived values, and each region of markup. Note shared state that several regions read or write.
2. Propose the split: custom hooks for data and state groups, presentational child components for markup regions, plain functions for pure calculations. Say where each piece of state lives after the split and why, so no state resets unexpectedly. Keep the public props of the component unchanged. Wait for approval.
3. Make sure tests cover the visible behaviour of the main flows before moving code; add tests that render the component and interact through accessible queries where coverage is missing.
4. Apply the split in steps: extract pure functions, then hooks, then child components, running the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each step. Copy effect dependency arrays exactly and keep memoisation where it existed.
5. Show the diff and the resulting file layout, following the project's folder conventions.
</task>

<constraints>
- The component's props, rendered DOM, accessibility attributes and side effects must stay the same.
- Do not add a state management library, context or memoisation that was not there, unless needed to keep behaviour; say why if you do.
- Do not split into components used in only one place purely to reduce line count when the markup has no meaningful name.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Responsibilities
Table: line range, responsibility, state it reads or writes.
## Proposed split
Hooks, components and functions, with where state lives.
## Steps
Numbered steps, each with its test check.
## Diff
The change and the new file layout.
## Check
Tests run after each step and results.
</output_format>
