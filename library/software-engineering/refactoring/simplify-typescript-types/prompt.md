---
schema: 1
id: simplify-typescript-types
kind: prompt
title: Simplify over-clever TypeScript types
description: Rewrites unreadable conditional, mapped, recursive and generic TypeScript types into simpler ones that accept and reject the same code, proven by type-level tests and faster type checks.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, backend-engineer, software-engineer]
stack: [typescript]
requires: [repo-read, file-write, shell]
inputs: [file]
output: [diff, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [type-level-programming, generics, conditional-types, type-tests]
pairs_with:
  prompts: [replace-loose-types, consolidate-duplicate-type-definitions, fix-typescript-type-error]
  personas: [typescript-engineer]
args:
  - name: target
    description: The types or generic functions to simplify, as a path or pasted code, and what hurts (unreadable errors, slow type check, nobody dares change it).
    type: text
    required: true
  - name: check_command
    description: The type check command, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [What the types enforce, Type tests, Simpler version, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a TypeScript engineer who values types people can read. Type-level code gets clever: deeply nested conditional types, recursive mapped types, generics with five parameters, template literal types building paths. The costs are real: error messages nobody can read, slow type checks and editor lag ("Type instantiation is excessively deep"), and code no one dares touch.

Common simplifications: replace a conditional type over a closed set with a discriminated union or an overload list; replace a generic parameter that is only used once with its constraint; replace a computed mapped type with an explicit interface when the keys are known and few; make functions accept a union instead of a generic when callers do not need the precise type back; use `satisfies` to check an object against a type while keeping its literal type, instead of a helper generic; and name intermediate types so errors mention them.

The proof that simpler is equivalent is type-level tests: assertions of what must compile and what must not (`// @ts-expect-error` lines, or `expectTypeOf` and `assertType` if the project uses Vitest, or `tsd`). Write them against the current types first; they pin the contract. Some simplifications deliberately accept slightly more or reject slightly less; that is a trade-off to show, not hide. Distributive conditional types, variance of generics and `any` leaking through `infer` are where "equivalent" rewrites quietly differ.
</context>

<task>
Simplify {{target}}.

1. Explain in plain language what the current types enforce: which calls compile, which are rejected, and what type callers get back. Find the real call sites to see which of that precision is used.
2. Write type-level tests against the current types: positive cases from real usage and negative cases (`@ts-expect-error`) for the mistakes they prevent. Run the type check to confirm they pass today.
3. Propose the simpler version and name any difference in what it accepts or rejects. Measure type check time before if it was a complaint (`tsc --extendedDiagnostics`).
4. Replace the types, run the type tests and the full type check{{#check_command}} with `{{check_command}}`{{/check_command}}, and fix call sites only where the agreed difference requires it.
5. Report the result, including type check time after, and compare a typical error message before and after.
</task>

<constraints>
- No runtime code changes except call sites that the agreed type difference requires.
- Every difference in accepted or rejected code is listed and agreed, never silent.
- No `any`, casts or `@ts-ignore` to make the simpler types fit.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What the types enforce
Plain-language contract and what callers actually use.
## Type tests
The positive and negative assertions.
## Simpler version
The new types and any intended difference.
## Diff
The change.
## Check
Type tests, type check and timings.
</output_format>
