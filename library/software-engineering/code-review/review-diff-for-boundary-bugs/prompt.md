---
schema: 1
id: review-diff-for-boundary-bugs
kind: prompt
title: Review a diff for boundary bugs
description: Reviews a change for off-by-one errors, empty and single-element inputs, inclusive and exclusive ranges, pagination edges and limits, naming the exact input at each boundary.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, backend-engineer, frontend-engineer]
stack: []
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [off-by-one, edge-cases, pagination, ranges, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-pull-request, review-diff-for-null-handling-bugs, review-diff-for-time-handling-bugs]
args:
  - name: diff
    description: The change, with file paths and the code around any loop, slice, range check, limit or pagination it touches.
    type: text
    required: true
  - name: context
    description: The business rules for limits and ranges (is 18 included, is the end date inclusive, maximum page size) and the sizes of real inputs.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Boundary bugs live where a value is exactly at a limit, one past it, or where a collection is empty or has one item, which are exactly the inputs that happy-path tests skip. The reviewer's method is to pick the boundary values for every comparison and loop, then run them through the code by hand. Comparisons: `<` versus `<=` against limits ("up to 10 items", "18 or older", "free over 50") where the rule's wording decides which is right. Ranges: whether each end is inclusive or exclusive, mixing conventions between a database query and the code that builds it, and overlap checks (two ranges overlap when `a.start < b.end && b.start < a.end` for half-open ranges, and the common hand-written version misses containment). Loops and slices: fence-post counts (n items need n-1 separators; 3 retries can mean 3 or 4 attempts), slices that drop the last element, and 0- versus 1-based conversions at UI or API boundaries. Empty and single inputs: `max` or `min` of an empty list, average dividing by zero, `first` on an empty result, a batch of one. Pagination: the last page when the total is an exact multiple of the page size, offset pagination skipping or repeating rows when data changes or the sort has ties, page size zero or above the maximum, and `hasNextPage` computed from `count == pageSize`. Strings: truncating at a byte or code-unit count can split a multi-byte character or emoji.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open each changed file in full and the callers that decide the sizes and limits passed in, before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. List every comparison against a limit, loop bound, slice, range, retry count, pagination parameter and truncation in the change, and the rule it implements.
3. For each, choose the boundary inputs: empty, one element, exactly at the limit, one below and one above, the maximum allowed, and zero or negative where the type permits. Walk each through the code and write down the result.
4. Check ranges for inclusive and exclusive ends on both sides of every interface (UI, API, SQL), and overlap or containment checks against touching, nested and identical ranges.
5. Check pagination and batching: last page, exact multiples of the page size, page size limits, ties in the sort order, and data changing between pages.
6. Check string and unit boundaries: truncation of multi-byte text, length limits measured in bytes versus characters, and limits that are inclusive in the spec but exclusive in code.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (wrong eligibility, pricing or access decisions at the limit, data skipped or duplicated in pagination or batch jobs), medium (crashes on empty input, off-by-one in display or counts), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Every finding includes the exact boundary input and the wrong versus expected result; no generic "check edge cases".
- When the rule's wording does not settle whether a limit is inclusive, ask instead of choosing.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the expression, the boundary input, the wrong versus expected result, the fix in one or two sentences.
## Missing tests
Bullets of boundary test inputs with their expected results, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
