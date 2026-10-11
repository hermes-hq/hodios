---
schema: 1
id: remove-unnecessary-useeffects
kind: prompt
title: Remove unnecessary useEffect calls
description: Replaces useEffect calls that copy derived state, reset state on prop changes or react to user events with computed values, keys and event handlers, keeping rendered behaviour identical.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [react]
requires: [repo-read, file-write, shell]
inputs: [file]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [react-hooks, use-effect, derived-state, render-loops]
pairs_with:
  prompts: [split-react-component, fix-react-rerenders]
  personas: [react-engineer]
  rules: [react-component-rules]
args:
  - name: component
    description: The component or hook file to clean up, as a path or pasted code, and any symptom (double renders, flicker, stale values, effect loops).
    type: text
    required: true
  - name: test_command
    description: The command that runs the relevant tests, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Effect inventory, Diff, Effects kept, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a React engineer who knows that an effect is an escape hatch for synchronising with something outside React: a subscription, a timer, a non-React widget, a network request tied to what is on screen, the document title. Most effects in real code are not that. The common unnecessary ones:

- **Derived state:** `useEffect(() => setFullName(first + ' ' + last), [first, last])`. Compute it during render instead; wrap it in `useMemo` only if it is measurably expensive. The effect version renders twice and shows a stale value for one frame.
- **Resetting state when a prop changes:** an effect that clears a draft when `userId` changes. Give the child `key={userId}` or store the previous prop and adjust during render.
- **Event logic in effects:** setting a flag in a click handler and then reacting to the flag in an effect (posting a form, showing a toast, navigating). Do the work in the handler, where the cause is known.
- **Chains of effects** that set state which triggers another effect. Collapse into one calculation or one handler.
- **Notifying a parent** of a change through an effect. Call the parent's callback in the same handler that changes the state, or lift the state.

Effects that must stay: subscriptions with cleanup, data fetching (unless the project already has a data library to move it to, which is a separate decision), integration with non-React code, and anything that must run because the component appeared on screen rather than because the user did something. Strict Mode double-invoking an effect in development is a hint that cleanup is missing, not a reason to delete the effect.
</context>

<task>
Clean up the effects in {{component}}.

1. List every `useEffect` and `useLayoutEffect` with its dependencies, what it reads, what it sets, and its category: derived state, reset on prop change, event logic, effect chain, parent notification, or real synchronisation.
2. Make sure tests cover the visible behaviour each removable effect affects (what renders after typing, after a prop change, after submit); add tests through accessible queries where coverage is missing.
3. Replace each unnecessary effect with the right shape: a value computed in render, a `key`, logic moved into the handler, or a callback called from the handler. Remove the state variable it fed when that state is now derived.
4. Leave real synchronisation effects in place; fix a missing cleanup or a wrong dependency array only if it is clearly a bug, and say so separately.
5. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}} and the linter (`react-hooks/exhaustive-deps` if configured), and report results.
</task>

<constraints>
- Rendered output and user-visible behaviour must stay the same, except removing a one-frame stale value, which you must call out.
- Do not silence `exhaustive-deps` warnings with disable comments or by removing dependencies.
- Do not swap fetching effects for a new data library in this change; mention it as a follow-up if it fits.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Effect inventory
Table: line, dependencies, category, action (remove, replace, keep).
## Diff
The change.
## Effects kept
Each remaining effect and what external system it synchronises with.
## Check
Tests and lint run and results.
</output_format>
