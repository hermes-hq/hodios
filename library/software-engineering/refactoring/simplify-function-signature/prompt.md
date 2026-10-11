---
schema: 1
id: simplify-function-signature
kind: prompt
title: Simplify a function signature
description: Cleans up a function with too many parameters, boolean flag arguments, positional arguments of the same type or output parameters, and updates every caller with behaviour unchanged.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, backend-engineer, frontend-engineer]
stack: []
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
tags: [function-signatures, parameter-object, flag-arguments, api-ergonomics]
pairs_with:
  prompts: [simplify-function, improve-naming, rename-public-api-safely]
  personas: [refactoring-specialist]
args:
  - name: function
    description: The function or method to clean up, as a path and name or pasted code.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests and type check, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Problems with the signature, New signature, Call sites, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who knows that a bad signature causes bugs at every call site, not just in the function. The common problems and their usual cures:
- Long parameter lists, especially several of the same type (`createUser(name, email, phone, city, true, false)`), where swapped arguments compile and run. Cure: a parameter object or named arguments, or splitting the function if the parameters serve different jobs.
- Boolean flag arguments that change what the function does (`render(data, true)`). Cure: two functions with clear names, or an enum or named option when the variants share most code.
- Parameters that always travel together (start and end date, latitude and longitude, amount and currency). Cure: a small type that holds them and can validate them.
- Output or in-out parameters mutated by the function. Cure: return the result.
- Parameters the function ignores, or passes through untouched to a single callee. Cure: remove them or pass the collaborator.
- Optional parameters with defaults that most callers override the same way. Cure: change the default after checking the call sites.
Changes to a widely used or public function need a migration path; changes to internal functions with a few callers can be done in one step.
</context>

<task>
Simplify the signature of {{function}}.

1. Read the function and find every call site (search the repo, including tests, scripts and dynamic calls such as reflection, string-based dispatch or serialised job arguments). Report the count and any call sites you cannot update automatically.
2. List the problems with the current signature from the list above, with an example call site showing the risk.
3. Propose the new signature, or the split into several functions, and show three call sites before and after. If the function is exported from a library or used by other services, propose a compatibility step instead (keep the old signature as a thin deprecated wrapper) and stop for approval.
4. Apply the change and update all call sites. Where a boolean flag becomes two functions, map each call site by the value it passes; where it is a variable, keep the dispatch at the call site.
5. Run the type check and tests{{#test_command}} with `{{test_command}}`{{/test_command}} and report results.
</task>

<constraints>
- Behaviour must not change, including default values and the order arguments are evaluated if they have side effects.
- Keep the change to this function and its call sites; note other signatures with the same problem rather than fixing them.
- Do not introduce a builder or configuration framework for a function with four parameters; prefer the simplest form the language supports (named arguments, an object literal, a data class or record).
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Problems with the signature
Each problem with an example call.
## New signature
The new signature or split, with before and after for three call sites.
## Call sites
Count updated, and any needing manual attention.
## Diff
The change.
## Check
Commands run and results.
</output_format>
