---
schema: 1
id: fix-floating-point-bug
kind: prompt
title: Fix a floating-point or rounding bug
description: Fixes wrong totals, failed equality checks, drifting sums and odd rounding caused by binary floating point, choosing integers, decimals or tolerances, and tests the edge values.
category: debugging
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, backend-engineer, data-engineer]
stack: []
requires: [none]
inputs: [file, text]
output: [explanation, diff, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [floating-point, rounding, decimal, money, numeric-precision]
pairs_with:
  prompts: [find-root-cause, add-regression-test]
args:
  - name: symptom
    description: What is wrong, with real numbers, for example "cart total shows 59.699999999999996 instead of 59.70" or "two invoices that should match differ by 0.01".
    type: text
    required: true
  - name: code
    description: The code that computes, stores, rounds or compares the values, plus the column or field types where they are stored.
    type: text
    required: true
  - name: rounding_rule
    description: The rounding the business or regulator expects, if known, for example "half-up to 2 decimals per line item" or "banker's rounding on the invoice total".
    type: string
output_contract:
  format: markdown
  sections: [Why the numbers are wrong, Fix, Rounding decisions, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who knows that a binary double cannot store most decimal fractions exactly: 0.1 + 0.2 is 0.30000000000000004, and 1.005 is stored as slightly less than 1.005, so it rounds to 1.00. Most numeric bugs come from one of these:
- Money or quantities kept in binary floats and summed, so errors accumulate.
- Equality comparisons on floats (`==`, using a float as a map key, deduplicating on a float).
- Rounding at the wrong step: rounding each line versus rounding the total gives different answers, and both can be legal depending on the rule.
- Language rounding that is not what people expect: Python's `round()` and .NET's `Math.Round` use banker's rounding (half to even), JavaScript's `toFixed` works on the binary value, `Math.round` rounds -2.5 to -2.
- Precision loss crossing a boundary: JSON numbers parsed into JavaScript doubles lose integers above 2^53, `FLOAT` database columns instead of `NUMERIC` or `DECIMAL`, spreadsheet exports.
- Catastrophic cancellation and summation order in scientific code, where subtracting near-equal values or adding small numbers to a large total loses digits.
The fix depends on the domain: money wants integer minor units or a decimal type with an explicit rounding mode; measurements want a relative tolerance and a stable algorithm; identifiers should never be numbers at all.
</context>

<task>
Fix this numeric bug.

Symptom:
{{symptom}}

Code and storage types:
{{code}}

{{#rounding_rule}}Required rounding: {{rounding_rule}}{{/rounding_rule}}

1. Reproduce the wrong value by hand from the inputs, showing the exact binary result at the step where it goes wrong (for example "19.9 * 3 = 59.699999999999996" in IEEE 754 doubles).
2. Name the cause from the list above, and every other place in the given code with the same problem.
3. Choose the representation: integer minor units, a decimal type (`decimal.Decimal`, `BigDecimal`, `System.Decimal`, a decimal library in JavaScript, `NUMERIC` in SQL), or floats with a tolerance for measured quantities. Explain the choice in one or two sentences.
4. Rewrite the code so values are parsed from strings (not from floats) into the chosen type, computed, rounded once at the step the rule requires with an explicit rounding mode, and only formatted for display at the edge.
5. If the rounding rule is unknown and it changes the result, say which options exist (per line or on the total, half-up, half-even), show the difference on the user's numbers, and ask which applies instead of picking one silently.
6. Write tests with the values that break naive code: 0.1 + 0.2, 1.005 and 2.675 rounded to 2 places, a half-way case for each rounding mode, negative values, a large sum of many small amounts, and an integer above 2^53 if ids or large counts are involved.
</task>

<constraints>
- Never fix money by adding a small epsilon before rounding or by formatting with more decimals; fix the representation.
- Do not change a rounding rule that may be set by law, contract or tax authority; flag it and ask. Rounding rules differ by country and currency, and some currencies have zero or three minor units.
- Keep stored historical values unchanged unless the user asks for a data correction, and then show it as a separate, reversible step.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Why the numbers are wrong
The exact computation that produces the wrong value, and the cause.
## Fix
A diff, including storage type changes if needed.
## Rounding decisions
Where rounding happens, with which mode, and any open question about the rule.
## Tests
Test code covering the edge values listed above.
</output_format>
