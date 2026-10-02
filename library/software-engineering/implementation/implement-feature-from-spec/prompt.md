---
schema: 1
id: implement-feature-from-spec
kind: prompt
title: Implement a feature from a spec
description: Turns a written spec or ticket into working code that follows the codebase's patterns, with tests and a list of decisions. Use when handing a well-scoped ticket to an agent.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, fullstack-engineer, tech-lead]
requires: [repo-read, file-write, shell]
inputs: [spec, ticket, repo]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [spec-driven, requirements, acceptance-criteria]
args:
  - name: spec
    description: The ticket, spec or user story, including acceptance criteria if it has them.
    type: text
    required: true
  - name: scope_paths
    description: Files, folders or modules the change may touch. Leave empty to let the agent find the smallest set.
    type: text
  - name: test_policy
    description: "add-tests: cover each acceptance criterion. update-existing: only adjust tests the spec changes. none: leave tests alone."
    type: enum
    enum: [add-tests, update-existing, none]
    default: add-tests
output_contract:
  format: markdown
  sections: [Summary, Acceptance criteria, Changes, Decisions, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are implementing a ticket in an existing codebase you did not write. The person who handed it over will judge the result on four things: every acceptance criterion is met, the new code reads like the code around it, the tests would catch a regression, and nothing outside the ticket changed by surprise. A working change that ignores local conventions, or quietly decides an ambiguous requirement, costs them more review time than it saves.
</context>

<task>
Implement this spec:

{{spec}}

Allowed scope: {{scope_paths}} (if empty, find the smallest set of files that delivers the spec).
Test policy: {{test_policy}}.

1. **Pin down the requirements.** Rewrite the spec as numbered acceptance criteria. Add the requirements it implies but does not state (error cases, empty input, permissions, existing callers). List every ambiguity.
   - If an ambiguity changes a public API, data model, persisted format, permission or user-visible behaviour, stop and ask up to 5 numbered questions, each with the option you would pick by default. Write no code until answered.
   - If it is minor, choose the most conservative reading that matches existing behaviour, and record it under Decisions.
2. **Read before writing.** Find the entry point, the closest existing feature that does something similar, and the local conventions: error handling, validation, logging, naming, dependency injection, configuration, and test layout and runner. Use the analogous feature as your template.
3. **Plan.** List the files you will change or create, in order. If something outside the allowed scope must change, say why before changing it.
4. **Implement** in small, coherent steps. Reuse existing helpers instead of writing new ones. Add no new dependency unless the spec requires it; if it does, ask first.
5. **Test** according to the policy:
   - `add-tests`: at least one test per acceptance criterion, plus the failure or edge case that matters most for each, in the existing framework and style.
   - `update-existing`: change only the tests whose expected behaviour the spec changes. Add none.
   - `none`: do not touch tests. List the tests you would have written under Follow-ups.
6. **Verify.** Run the project's type check, linter and the relevant tests. Fix failures your change caused. Report failures that existed before you started without fixing them.
</task>

<constraints>
- Match the existing style even where you would choose differently. No drive-by refactors, renames or reformatting.
- Never mark a criterion "done" unless code implements it and a test or a run demonstrates it.
- Do not add feature flags, configuration options or abstractions the spec does not ask for.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Summary
Two or three sentences: what now works that did not before.

## Acceptance criteria
| # | Criterion | Status (done / partial / not done) | Where (`path:symbol`) | Test |

## Changes
One line per file: `path`, what changed and why.

## Decisions
Each interpretation or design choice you made: the choice, the alternative, and why. Mark the ones the requester should confirm with **confirm**.

## Verification
Each command you ran and its actual result (pass/fail counts, errors). Say plainly if you could not run something.

## Follow-ups
Out-of-scope issues you noticed, one line each, or "None".
</output_format>
