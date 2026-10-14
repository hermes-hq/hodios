---
schema: 1
id: review-diff-for-numeric-and-unit-bugs
kind: prompt
title: Review a diff for numeric and unit bugs
description: Reviews code doing arithmetic for integer overflow, division by zero, float comparison and drift, unit and scale mix-ups and wrong rounding, outside currency handling.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, backend-engineer, frontend-engineer, data-engineer]
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
tags: [arithmetic, integer-overflow, floating-point, units-of-measure, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-pull-request, review-diff-for-money-handling-bugs, review-diff-for-boundary-bugs]
args:
  - name: diff
    description: The change, with file paths, and where the numbers come from (sensor, API, user input, database column types).
    type: text
    required: true
  - name: context
    description: Language and numeric types in use, units each value is expected in, realistic ranges (largest counts, longest durations), and any precision or rounding rules. For money, use the money review instead.
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
Numeric bugs pass every test with small round numbers and fail at scale or at the edges. Integers overflow: a 32-bit `int` holds about 2.1 billion, so milliseconds since epoch, byte counts of large files, row ids on a busy table and `width * height * 4` for big images all overflow; in Java and C# it wraps silently, in C and C++ signed overflow is undefined, and in JavaScript every number is a float, so integers above 2^53 (64-bit ids from an API) lose precision unless parsed as strings or BigInt. Multiplying before dividing can overflow where dividing first loses precision; the order matters. Integer division truncates (`7 / 2 == 3` in Java, C, Go; `//` floors toward negative infinity in Python, so `-7 // 2 == -4`). Division by zero throws for integers but gives `Infinity` or `NaN` for floats, and `NaN` then spreads silently through every later calculation and compares false with everything. Floats cannot represent most decimals, so `0.1 + 0.2 != 0.3`, equality checks need a tolerance, and summing many small values drifts. Converting a float to an int truncates rather than rounds. Rounding each item and then summing differs from summing then rounding; percentages of a whole that must add to 100 need a largest-remainder step. Units cause the costliest bugs: seconds versus milliseconds, bytes versus bits, KB (1000) versus KiB (1024), degrees versus radians, percent as 0 to 100 versus 0 to 1, metric versus imperial. Parsing "1,5" or "1.000" depends on locale.
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

1. If you can read the repository, open each changed file in full and trace where each number comes from and what unit and type it has at the source, before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. List every numeric value the change computes or converts, with its type, unit and realistic range. Mark values whose unit is not stated in a name, type or comment.
3. Check unit and scale at every boundary: function calls, API and database fields, config values and library calls (for example a timeout in seconds passed to a parameter in milliseconds), and percent or ratio scales.
4. Check integer arithmetic against the realistic range: overflow in the type used, multiplication order, integer division where a fraction was meant, floor versus truncation for negatives, and 64-bit values passing through JavaScript or JSON.
5. Check float arithmetic: equality comparisons, accumulation over many items, conversion to integers, `NaN` and `Infinity` from division or invalid input and how they propagate, and parsing that depends on locale.
6. Check rounding: where it happens (per item or on the total), which mode (half-up, half-even, truncation), whether displayed and stored values agree, and parts that must sum to a whole.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (wrong results on realistic inputs in billing quantities, measurements, limits or safety thresholds, unit errors off by a factor of 1000), medium (failures only at large but reachable sizes, display rounding mismatches), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Every finding includes the concrete input (a value at the realistic maximum, a zero, a negative, a unit mismatch) and the wrong versus expected number.
- Money amounts are out of scope here; point to the money review in one line if the change handles currency.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the expression, the value's type and unit, the triggering input, the wrong versus expected number, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
