---
schema: 1
id: review-ai-generated-code
kind: prompt
title: Review AI-generated code
description: Reviews code written by an AI assistant for hallucinated APIs, over-engineering, swallowed errors, weakened tests and copy-paste drift. Use before merging a change an agent produced.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead, maintainer, engineering-manager]
stack: []
requires: [repo-read]
inputs: [diff, text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ai-generated-code, hallucinated-api, over-engineering, test-integrity, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-pull-request, review-agent-transcript, review-test-quality]
args:
  - name: diff
    description: The unified diff or changed files the assistant produced.
    type: text
    required: true
  - name: task_description
    description: What the assistant was asked to do, ideally the original prompt or ticket, so the review can check scope.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Scope check, Questions for the author]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Code from an AI assistant fails differently from code a colleague wrote. It compiles and reads fluently, so reviewers skim it, but it often calls functions or options that do not exist in the installed library version, adds layers and configuration nobody asked for, catches and discards errors so the happy path "works", edits or deletes tests until they pass, and repeats a pattern across files with small inconsistencies. It also changes files outside the task. This review looks for those failure modes specifically, on top of normal correctness.
</context>

<task>
Review this change:
<diff>
{{diff}}
</diff>
{{#task_description}}
The assistant was asked to:
<task_description>
{{task_description}}
</task_description>
{{/task_description}}

Check, in this order:
1. **Scope.** Compare the files and behaviour changed with the task. List changes the task did not call for (renames, reformatting, new dependencies, unrelated refactors, edited config). If no task description was given, say scope could not be checked.
2. **Hallucinated or misused APIs.** For every imported symbol, method, option, flag, environment variable and config key that the diff introduces, check that it exists in the code base or in the dependency version the project pins. If you can read the repository, look in lockfiles, vendored types or the dependency source. If you cannot verify one, list it as "unverified" rather than calling it wrong.
3. **Tests.** Flag deleted or skipped tests, loosened assertions (exact value replaced by "not null", snapshot regenerated wholesale), mocks that replace the unit under test, tests that assert the implementation instead of the behaviour, and special cases in production code that only exist to satisfy a test.
4. **Error handling.** Flag catch-all handlers that log and continue, empty catch blocks, default values that hide failures, retries without limits, and errors converted to success responses.
5. **Over-engineering.** Flag abstractions with one implementation, factories, strategy patterns and options objects for a single call site, speculative configuration, and new dependencies for a few lines of standard library code. Propose the simpler shape.
6. **Copy-paste drift.** Where similar blocks appear more than once, compare them line by line and flag the ones that differ in ways that look accidental (a different field name, a missing await, an off-by-one in one copy).
7. **Normal correctness and security** issues you find along the way: trace the input that triggers each one.
</task>

<constraints>
- Every finding cites `path:line` and names the concrete failure or cost. Drop anything you cannot tie to a line.
- Do not object to code just because an AI wrote it, and do not comment on formatting or naming unless it causes a defect.
- Report at most 12 findings, ranked by severity: blocker, major, minor.
- Mark each API finding "confirmed missing", "wrong signature" or "unverified", and say how you checked.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-changes | request-changes, and the single most important reason.
## Findings
A table: severity, `path:line`, category (scope, api, tests, errors, over-engineering, drift, correctness, security), the problem, the fix.
## Scope check
Bullets of out-of-scope changes to revert or split out, or "Within scope" or "Not checked: no task description".
## Questions for the author
Up to 5 questions the human who ran the assistant must answer before merge.
</output_format>
