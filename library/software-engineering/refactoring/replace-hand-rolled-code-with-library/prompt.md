---
schema: 1
id: replace-hand-rolled-code-with-library
kind: prompt
title: Replace hand-rolled code with the standard library
description: Finds code that reimplements the standard library or an existing dependency (date math, CSV, retries, deep copy, UUIDs) and replaces it, checking edge-case differences first.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [table, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [standard-library, reinvented-wheel, dependencies, edge-cases]
pairs_with:
  prompts: [reduce-duplication, remove-dead-code]
args:
  - name: scope
    description: The files or folders to search, with the language and runtime version, and the dependencies already in the project.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests.
    type: string
output_contract:
  format: markdown
  sections: [Candidates, Edge-case differences, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hand-rolled versions of solved problems are common and costly: date arithmetic that breaks at daylight saving changes and month ends, CSV parsing that splits on commas and fails on quoted fields, URL building by string concatenation without encoding, retry loops without backoff or jitter, deep copy by JSON round trip that drops dates and undefined, UUIDs from `Math.random`, padding, chunking, grouping and debounce helpers, and email or path handling that misses cases the platform API covers. The standard library or a dependency already in the lockfile usually has a tested version.

Replacement is a behaviour change at the edges, and sometimes the hand-rolled version is the correct one. The library may differ on: invalid input (throw versus return null), time zones and locale, rounding mode (banker's rounding versus half up), sort stability, Unicode handling, quoting and escaping, and performance on large inputs. Some home-grown code exists for a reason (a bug in the library version the project pins, a deliberate leniency clients rely on, a hot path). Adding a new dependency to replace twenty lines is often worse than keeping them: it brings supply-chain risk, size and upgrades. Prefer the standard library, then dependencies already present, and propose a new dependency only when the hand-rolled code is clearly buggy and large.
</context>

<task>
Find and replace hand-rolled code in {{scope}}.

1. Search the scope for reimplementations: helper names and patterns such as date math, parsing, formatting, encoding, retries, copying, id generation, collection helpers. Check the runtime version so you only propose APIs it has.
2. For each candidate list: location, what it does, the standard-library or existing-dependency replacement, and known edge-case differences (invalid input, time zones, rounding, Unicode, quoting, ordering). Check git history or comments for a reason it was written by hand. Mark candidates that need a new dependency separately.
3. Write tests that pin the current behaviour on edge cases before replacing, and run them against the replacement. Where behaviour differs, show the difference and ask whether the old behaviour was a bug or a requirement.
4. Replace one candidate at a time, deleting the helper when it has no remaining callers, and run the tests{{#test_command}} with `{{test_command}}`{{/test_command}}.
5. Show the diff and list candidates you left alone with the reason.
</task>

<constraints>
- No behaviour difference ships without the user's decision; where the hand-rolled code is buggy, say so and treat the fix as an intended change.
- Do not add a new dependency without approval; state its size, maintenance status as far as you can tell from the repo, and what it replaces.
- Only use APIs available in the project's runtime and language version.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Candidates
Table: location, what it does, replacement, new dependency (yes or no).
## Edge-case differences
Per candidate: input, old result, new result, decision needed.
## Diff
The change.
## Check
Tests run and results, and candidates left alone with reasons.
</output_format>
