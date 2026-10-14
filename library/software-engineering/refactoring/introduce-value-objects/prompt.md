---
schema: 1
id: introduce-value-objects
kind: prompt
title: Introduce value objects for primitive values
description: Replaces raw strings, numbers and loose pairs that carry domain meaning, like email addresses, money, ids, date ranges and quantities, with small validated value objects, without changing behaviour.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [software-engineer, backend-engineer, architect]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [value-objects, primitive-obsession, domain-modeling, validation, immutability]
pairs_with:
  prompts: [replace-loose-types, simplify-function-signature]
  personas: [refactoring-specialist]
args:
  - name: target
    description: The module or domain area to work on, as a path or pasted code, and the values that cause trouble if you know them (for example "money as float plus currency string", "user and order ids both plain strings").
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Candidates, Value objects, Rollout steps, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who uses value objects where a primitive keeps causing bugs. A value object is small, immutable, compared by value, and valid by construction: once you hold an `EmailAddress`, a `Money` or a `DateRange`, you know it was checked. The signs that one is missing are concrete: the same validation or normalisation repeated in several places; two values that must travel together (amount and currency, start and end); ids of different entities that are all strings and get swapped; units mixed up (seconds versus milliseconds, cents versus euros); and helper functions like `isValidEmail` or `formatMoney` scattered around.

The cost is real too: wrapping every string adds noise, and value objects need mapping at the edges (database, JSON, forms). Introduce them where the bugs or the duplication are, and do it from the inside out: create the type, use it in the core logic, and convert at the boundaries, so storage formats and APIs stay the same.
</context>

<task>
Introduce value objects in {{target}}.

1. Read the code and list candidate primitives with evidence: repeated validation, pairs that travel together, swappable ids, unit confusion, scattered helper functions. Rank them by bugs prevented and duplication removed. Recommend at most three to do now, and say why the others can wait.
2. For each chosen value object, define: the fields, the validation and normalisation on construction (trimmed, lower-cased email; currency code checked; start not after end), equality, the operations that belong to it (adding two `Money` values of the same currency, checking a range overlaps another), and how it is serialised and stored. Use the language's idiom: records or data classes, frozen dataclasses, readonly classes, or branded types where a runtime wrapper is too heavy.
3. Plan the rollout: create the type with its own tests, convert at one boundary, move core functions to accept and return it, then the remaining call sites. Storage and API formats stay the same. Wait for approval before editing beyond the first value object.
4. Apply the change, running the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each step. Report any existing data or call that the new validation would reject; do not silently change behaviour for it.
</task>

<constraints>
- Behaviour must stay the same for valid inputs. If construction-time validation would reject data the system accepts today, report it and ask how to handle it rather than throwing in production.
- Do not change database columns, JSON field names or public API shapes in this refactor.
- Do not wrap values that cause no problems; avoid one class per field.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Candidates
Table: primitive, where it appears, evidence of trouble, recommended now or later.
## Value objects
For each: fields, validation, operations, serialisation.
## Rollout steps
Numbered steps with the test check for each.
## Diff
The change.
## Check
Tests run, results, and any data the new validation would reject.
</output_format>
