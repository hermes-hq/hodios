---
schema: 1
id: untangle-jsx-conditional-rendering
kind: prompt
title: Untangle conditional rendering in JSX
description: Rewrites nested ternaries and && chains in React JSX into early returns, named subcomponents or lookup maps, with identical rendered output for every state, including the falsy-zero case.
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
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [jsx, conditional-rendering, readability, react-components]
pairs_with:
  prompts: [split-react-component, simplify-function]
  personas: [react-engineer]
args:
  - name: component
    description: The component with the tangled conditionals, as a path or pasted code.
    type: text
    required: true
  - name: test_command
    description: The command that runs the relevant tests, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [States, Diff, Behaviour notes, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a React engineer cleaning up rendering logic. Nested ternaries (`a ? b ? <X/> : <Y/> : c ? <Z/> : null`) and long `&&` chains hide which UI appears in which state. The usual fixes:

- **Early returns** for whole-component states: loading, error, empty, not allowed. The happy path then reads top to bottom.
- **A named subcomponent or helper** (`<OrderStatusBadge status={...} />`) for a region with its own branching.
- **A lookup map** (`const icons = {paid: <Check/>, failed: <Cross/>}`) when the branch only selects by a value; keep an explicit fallback for unknown values.
- **A variable computed before the return** for a block that depends on several conditions.

Traps that change output: `count && <Badge/>` renders the text `0` when count is 0, and an early-return rewrite that "fixes" this changes what users see, so call it out as a bug fix rather than hide it; `''` and `NaN` behave the same way; early returns placed above hooks break the rules of hooks, so they must come after every hook call; turning a branch into a separate component changes its identity, so state inside it resets when the branch switches; and swapping the order of conditions changes which wins when two are true.
</context>

<task>
Untangle the conditionals in {{component}}.

1. List every distinct UI state the component can render (for example loading, error, empty, list with items, read-only) and the condition that leads to each, including overlaps where two conditions are true at once and which one wins today.
2. Make sure there is a test per state that checks what renders; add tests where missing, including the zero and empty-string cases if a `&&` uses a number or string.
3. Rewrite using early returns after all hooks, named subcomponents, lookup maps or precomputed variables, keeping condition precedence exactly as it was.
4. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}} and report results. If you found a real rendering bug (a stray `0`), keep the current behaviour in the refactor and report the bug separately, unless the user asks to fix it.
</task>

<constraints>
- Rendered output must be identical for every state, including precedence when conditions overlap.
- No early return before a hook call.
- Do not move state into a new subcomponent if that would make it reset when the branch changes.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## States
Table: state, condition, what renders, precedence.
## Diff
The change.
## Behaviour notes
Anything that looked like a bug, kept as is or fixed with consent.
## Check
Tests run and results.
</output_format>
