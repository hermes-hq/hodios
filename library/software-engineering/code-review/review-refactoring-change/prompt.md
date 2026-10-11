---
schema: 1
id: review-refactoring-change
kind: prompt
title: Review a refactoring change
description: Reviews a pull request that claims to be a pure refactor and hunts for hidden behaviour changes, such as altered evaluation order, error types, defaults, null handling and logging, before it merges.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead]
requires: [none]
inputs: [diff, file]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [behaviour-preservation, pure-refactor, semantic-diff, pull-request, regression-risk]
pairs_with:
  personas: [code-reviewer]
  prompts: [plan-large-refactor, add-characterization-tests, review-pull-request]
args:
  - name: diff
    description: The refactoring diff, with the PR description that says what it claims to do.
    type: text
    required: true
  - name: test_evidence
    description: What tests cover the changed code and whether they changed in this PR. Leave empty if unknown.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Behaviour changes found, Unverified equivalences, Test gaps, Split suggestion]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"No functional change" PRs get the lightest review and cause a surprising share of regressions. The behaviour changes hide in details: extracting a function changes when an argument is evaluated, a loop rewritten as a stream or comprehension stops short-circuiting or swallows an exception, a merged branch drops an edge case, a moved constant changes a default, null and empty collections are treated alike where they were not, a renamed field changes a serialised name or log key that dashboards depend on, and a reordered call changes side-effect order or transaction scope. A refactor that also edits the tests can make them agree with the new behaviour. The reviewer's job is to prove equivalence, hunk by hunk, or find the difference.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#test_evidence}}
<test_evidence>
{{test_evidence}}
</test_evidence>
{{/test_evidence}}

1. Classify each hunk by refactoring type: rename, extract or inline, move, restructure control flow, change data structure, replace library call, or not a refactor at all (a behaviour change mixed in).
2. For each hunk, compare old and new behaviour for: inputs at the edges (null, empty, zero, negative, very large, unicode), exceptions thrown and their types and messages, evaluation and side-effect order, short-circuiting and laziness, mutation and aliasing of shared objects, concurrency and transaction boundaries, defaults and constants, and externally visible names (serialised fields, API params, log keys, metric names, config keys, database columns).
3. Report each confirmed behaviour change with an input that shows the difference.
4. List equivalences you could not verify from the diff alone and what would settle them (the callee's code, a test).
5. Check the tests: were assertions changed in the same PR, are the changed paths covered, and which characterisation tests would lock the old behaviour before merging.
6. If behaviour changes are mixed with refactoring, suggest how to split the PR.
</task>

<constraints>
- Every claimed behaviour change needs a concrete input or call sequence that triggers it.
- Do not comment on style or naming preferences; only on equivalence.
- Changed test assertions in a "pure refactor" are a finding unless the PR explains them.
- At most 10 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: equivalent | equivalent with unverified points | behaviour changed.
## Behaviour changes found
Numbered: `path:line`, refactoring type, old behaviour, new behaviour, triggering input, fix or accept.
## Unverified equivalences
Bullets with what would settle each.
## Test gaps
Bullets, including changed assertions.
## Split suggestion
Only if behaviour changes are mixed in; otherwise "not needed".
</output_format>
