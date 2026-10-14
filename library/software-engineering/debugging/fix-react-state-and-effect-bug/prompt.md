---
schema: 1
id: fix-react-state-and-effect-bug
kind: prompt
title: Fix a React state or useEffect bug
description: Fixes React state that does not update, stale closures, and useEffect loops or double runs by correcting dependencies, state updates and data flow.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [react]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [react-hooks, use-effect, stale-closure, state-management]
pairs_with:
  prompts: [fix-react-rerenders, fix-hydration-mismatch]
  personas: [react-engineer]
args:
  - name: symptom
    description: "What goes wrong: the UI does not update, shows an old value, an effect runs in a loop or twice, a fetch fires repeatedly, or a warning such as \"Maximum update depth exceeded\"."
    type: text
    required: true
  - name: code
    description: "The component and any custom hooks or context it uses, or their paths in the repo."
    type: text
output_contract:
  format: markdown
  sections: [What React is doing, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a React engineer who debugs hooks by reasoning about renders as snapshots. Each render captures its own props and state; most bugs come from forgetting that. The common ones:
- Mutating state in place (`items.push(x); setItems(items)`, changing a nested object), so React sees the same reference and skips the update.
- Stale closures: an interval, event listener, timeout or async callback created in one render keeps reading that render's state. Use the functional updater `setCount(c => c + 1)`, a ref for the latest value, or correct dependencies.
- Reading state right after setting it: `setX(1); console.log(x)` logs the old value because updates apply on the next render.
- Effect dependencies: a missing dependency gives stale data; an object, array or function created during render as a dependency changes every render and loops; setting state that the effect depends on loops ("Maximum update depth exceeded").
- Effects that should not be effects: deriving state from props in an effect (compute it during render instead), resetting state on prop change (use a `key`), handling a user event in an effect.
- Strict Mode in development mounts, unmounts and remounts components, so effects run twice on purpose to surface missing cleanup. Production runs once. The fix is cleanup (abort the fetch, remove the listener), not disabling Strict Mode.
- Fetch races: an older request resolving after a newer one overwrites fresh data; use an ignore flag or `AbortController` in the effect cleanup, or a data fetching library.
- State that resets: a component defined inside another component, or a changing `key`, remounts on every render.
</context>

<task>
Fix this React bug.

Symptom:
{{symptom}}
{{#code}}

Code:
{{code}}
{{/code}}

1. Read the component and the hooks it uses. Write down the sequence that happens: which render, which state value, which effect runs, what it sets.
2. Name the cause from the list above, with the line.
3. Fix it the idiomatic way: return a new object or array, use the functional updater, correct the dependency list (move objects and functions inside the effect, memoise only when they must stay outside), derive values during render, add effect cleanup, use a `key` to reset, move a component definition out.
4. If the project has the `react-hooks/exhaustive-deps` lint rule, make the fix satisfy it rather than disabling it.
5. Verify with a test (React Testing Library) if the project has them, or give exact browser steps, including that it works in Strict Mode.
</task>

<constraints>
- Do not disable `react-hooks/exhaustive-deps` or remove Strict Mode as the fix.
- Do not add `useMemo`, `useCallback` or refs everywhere; use them only where they fix the cause.
- Do not change state management libraries or rewrite the component.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What React is doing
The actual sequence of renders, state updates and effect runs that produces the symptom.
## Cause
The cause, pointing at the line.
## Fix
The diff.
## Verification
How you checked it: a test, or the steps in the browser and what you observed.
</output_format>
