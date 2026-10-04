---
schema: 1
id: replace-loose-types
kind: prompt
title: Replace loose types with precise ones
description: Replaces any, unknown casts, stringly typed values and optional-field bags in a module with precise types and discriminated unions, and shows which bugs the compiler now catches.
category: refactoring
version: 1.0.0
status: incubating
aliases: [refactor-types]
stage: [maintain, build]
role: [software-engineer, frontend-engineer, backend-engineer]
stack: [typescript]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [type-safety, discriminated-unions, strict-mode, runtime-validation]
pairs_with:
  personas: [typescript-engineer]
  rules: [typescript-strict-rules]
  workflows: [adopt-strict-typing-track]
args:
  - name: target
    description: The file, module or type to tighten, as a path or pasted code.
    type: text
    required: true
  - name: check_command
    description: The type check command for the project, if not the usual one (for example "npm run typecheck").
    type: string
output_contract:
  format: markdown
  sections: [Loose spots, Diff, Errors the compiler now catches, Boundaries, Check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Loose types hide bugs until runtime: `any` switches the checker off, `as` casts assert what nobody verified, a `status: string` accepts typos, and an object with ten optional fields allows combinations that can never happen. Precise types move those mistakes to compile time. This is a focused pass over one module, not a codebase-wide strictness migration; for that, use a staged strict-typing workflow.
</context>

<task>
Tighten the types in {{target}}.
1. Read the module, its callers and the data that enters it. List every loose spot with its line: `any`, `unknown` immediately cast away, non-null assertions, `as` casts, `string` or `number` where only a few values are valid, boolean flags that encode a state, and object types whose optional fields only make sense in certain combinations.
2. For each spot, find the real shape from the code and the data: the literal values used, the states an object moves through, the fields present in each state.
3. Replace loose types with precise ones: literal unions or enums for closed sets, discriminated unions for objects with states (one variant per state, each with only its own fields), branded or nominal types for ids that must not be mixed, generics where a function is really generic, and `unknown` plus a type guard or schema at boundaries where data comes from outside.
4. Make switches over a union exhaustive, with a never check, so a new variant fails to compile until it is handled.
5. Run the type check{{#check_command}} with `{{check_command}}`{{/check_command}} and the tests. Fix the errors the new types expose. For each error, say whether it was a real bug or a type that needed refining.
</task>

<constraints>
- Do not change runtime behaviour except where a new type exposes a real bug; report each such fix separately.
- Never silence the checker with new `any`, `as` casts, non-null assertions or ts-ignore comments.
- Validate external data (network, storage, environment, user input) at the boundary instead of casting it.
- Stay inside the target module and the call sites that must change to compile.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Loose spots
Table: location, current type, problem, new type.
## Diff
The change as a diff.
## Errors the compiler now catches
Each type error the change surfaced: real bug (and the fix) or refined type.
## Boundaries
Where external data is now validated, and how.
## Check
The type check and test commands run, with results.
</output_format>
