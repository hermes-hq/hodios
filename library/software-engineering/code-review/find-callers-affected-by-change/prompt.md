---
schema: 1
id: find-callers-affected-by-change
kind: prompt
title: Find callers affected by a change
description: Traces every caller of the functions, types, config keys and events a diff changes, across the repository, and says which break, change behaviour or need a test.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead]
requires: [repo-read]
inputs: [diff, repo]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [impact-analysis, call-sites, pull-request, regression]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-pull-request, review-diff-for-risks, review-refactoring-change]
args:
  - name: diff
    description: The change, branch or pull request, with file paths.
    type: text
    required: true
  - name: scope
    description: Other repositories, services or packages that consume this code, if any, and how to reach them.
    type: text
output_contract:
  format: markdown
  sections: [Changed contracts, Call sites, Breaks, Coverage gaps, Not searched]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most regressions from a reviewed change happen in files the diff did not touch: a caller that relied on the old return value, a subclass overriding a method whose signature changed, a template reading a renamed field, a job that passes a positional argument that now means something else. Text search for the function name misses a lot: dynamic dispatch and interface implementations, reflection and dependency injection, string-keyed lookups (event names, config keys, feature flag names, serialised field names, SQL column names, translation keys), re-exports and aliases, and consumers in other repositories or services. A useful impact analysis states not just "who calls this" but, for each caller, what it assumes and whether that still holds.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#scope}}
<scope>
{{scope}}
</scope>
{{/scope}}

1. List the changed contracts in the diff: function and method signatures, return values and error behaviour, types and fields, defaults, config keys, environment variables, event and message names and payloads, database columns, routes, and shared constants. For each, state what changed in behaviour, not just in text.
2. For each contract, find every use in the repository: direct calls, imports and re-exports, subclasses and interface implementations, overrides, mocks and test doubles, string references (search for the literal name in code, templates, config, SQL, and docs), reflection or registration by name.
3. For each call site, read enough of it to state what it assumes and classify it: breaks (will not compile or will fail), behaves differently (silently), unaffected, or unknown.
4. Check whether each affected call site is covered by a test that exercises the changed behaviour; note mocks that encode the old behaviour and will keep tests green.
5. List places you could not search (other repositories, dynamic names built at runtime, external consumers of a public API or event) and how someone could check them.
</task>

<constraints>
- Every call site is listed with `path:line`; do not summarise as "several callers".
- Do not edit callers; this is analysis. Suggest fixes in one line each.
- Say which search methods you used (symbol references, text search, type checker) so gaps are visible.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Changed contracts
Bullets: contract, before, after.
## Call sites
Table: contract, `path:line`, what it assumes, classification (breaks / behaves differently / unaffected / unknown), covered by test (yes/no).
## Breaks
Numbered: `path:line`, why it breaks or changes, one-line fix.
## Coverage gaps
Bullets: affected call sites with no test, and mocks encoding old behaviour.
## Not searched
Bullets: what could not be checked and how to check it.
</output_format>
