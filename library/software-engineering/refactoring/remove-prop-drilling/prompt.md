---
schema: 1
id: remove-prop-drilling
kind: prompt
title: Remove prop drilling in a React tree
description: Removes props threaded through layers of React components that never use them, choosing per case between composition, colocated state and context, without changing behaviour or adding a store.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [react]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [prop-drilling, react-context, component-composition, data-flow]
pairs_with:
  prompts: [split-react-component, fix-react-rerenders]
  personas: [react-engineer]
args:
  - name: tree
    description: The components involved, as paths or pasted code, and which props are being drilled (for example "user and onLogout pass through Layout, Sidebar and Menu to Avatar").
    type: text
    required: true
  - name: test_command
    description: The command that runs the relevant tests, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Drilled props, Fix per prop, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a React engineer who reaches for the lightest fix first. Prop drilling is only a problem when intermediate components receive props they do not use, so every change in the leaf touches four files. The fixes, from lightest to heaviest:

1. **Colocate the state:** the state lives higher than it needs to. Move it down to the lowest common parent of the components that use it.
2. **Composition:** the intermediate components are layout. Let them accept `children` or slot props (`<Layout sidebar={<Menu user={user} />}>`) so the parent that owns the data renders the leaf directly. This removes the drilling with no new mechanism and keeps data flow visible.
3. **Context:** many distant leaves need the same slowly changing value (current user, theme, locale, feature flags). Create a narrow context with a provider and a custom hook (`useCurrentUser`) that throws a clear error outside the provider.

Context has costs: every consumer re-renders when the value changes, so a value object created inline in the provider on every render re-renders all consumers each time unless memoised; one big app context couples unrelated parts; and components that read context are harder to reuse and test in isolation. Fast-changing values (input text, mouse position) are a poor fit. Passing a prop through two layers is often fine and should be left alone.
</context>

<task>
Remove the prop drilling in {{tree}}.

1. Trace each drilled prop from where it is created to where it is used. For each intermediate component, note whether it uses the prop or only passes it on, and how many places render it.
2. For each prop, pick the lightest fix that works (colocate, compose, context, or leave it) and give the reason. Group values that change together into one context only when the same consumers need them. Wait for approval.
3. Make sure tests cover what the leaves render and do with the data; add them where missing. For context, plan how tests will provide it.
4. Apply the fixes one prop at a time. For context: a provider near the lowest common owner, a memoised value, a custom hook with a clear error outside the provider. Remove the now-unused props from intermediate components and their types.
5. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}} and the type check, and report results.
</task>

<constraints>
- Rendered output and behaviour must stay the same.
- Do not add a state management library; do not put fast-changing values in context.
- Do not create one global context for unrelated values.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Drilled props
Table: prop, created in, used in, pass-through components.
## Fix per prop
Chosen fix and why, including props left alone.
## Diff
The change.
## Check
Tests and type check run and results.
</output_format>
