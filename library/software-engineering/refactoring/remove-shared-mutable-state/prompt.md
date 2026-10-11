---
schema: 1
id: remove-shared-mutable-state
kind: prompt
title: Remove shared mutable state
description: Finds objects mutated from many places, such as arguments changed in place, module-level dicts and singletons with setters, and refactors them toward immutable values and single owners.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, backend-engineer, frontend-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [report, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [immutability, side-effects, global-state, aliasing, pure-functions]
pairs_with:
  prompts: [decouple-for-testability, debug-race-condition]
  personas: [refactoring-specialist]
args:
  - name: target
    description: The module or data structure that gets changed from too many places, as paths or pasted code, and the symptom if any (for example "config dict changed by a request handler leaks into other requests").
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Who mutates what, Risks today, Target ownership, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who knows that the hardest bugs to trace come from data changed somewhere far from where it is read. The patterns: functions that modify their arguments in place (`def apply_discount(order): order.total *= 0.9`), so callers holding the same object see it change; module-level dicts, lists or caches written from several places; singletons with setters; default mutable arguments in Python; React or Redux state mutated instead of replaced, so updates are missed; shared objects reused across requests or threads, so one request's change leaks into another.

The cures, smallest first: return a new value instead of mutating an argument; make data immutable where the language helps (frozen dataclasses, `readonly` and `as const`, records, `final` fields, persistent collections, `Object.freeze` in development); give each piece of mutable state a single owner that exposes intention-revealing methods; copy at the boundary when ownership cannot change yet; and pass state explicitly instead of reading globals. Copying has a cost in hot paths, which should be measured, not assumed.
</context>

<task>
Reduce shared mutable state in {{target}}.

1. Find every place the target data is written: direct assignment, in-place methods (`append`, `update`, `push`, `splice`, `sort`), mutation through aliases (the same object stored in two places), and mutation of arguments. List writers and readers with file and line.
2. Describe the risks this causes today: order-dependent behaviour, leaks between requests, threads or tests, missed UI updates. Tie them to the reported symptom if there is one.
3. Propose the target: who owns the state, which functions become pure and return new values, which types become immutable, and where copies are needed at boundaries for now. Wait for approval if the change touches more than the target module.
4. Before changing anything, add tests that would catch a leak or order dependency (two requests or calls in sequence that must not affect each other, or an assertion that an input is unchanged).
5. Apply the changes in small steps, running the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each. If a hot path now copies large data, say so and suggest how to measure it.
</task>

<constraints>
- Behaviour visible to callers must stay the same, except for fixing a reported leak, which you report as a fix with its own test.
- Do not rewrite the module in a different paradigm or introduce a new state library; change ownership and mutation only.
- Keep thread-safety claims grounded in the code; do not say something is safe under concurrency without explaining why.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Who mutates what
Table: data, writer (file:line), kind of mutation, readers.
## Risks today
Concrete failure scenarios.
## Target ownership
Owner, pure functions, immutable types, boundary copies.
## Diff
The change with the new tests.
## Check
Tests run and results, and any performance note.
</output_format>
