---
schema: 1
id: spec-calculation-rules
kind: prompt
title: Specify business calculation rules
description: Writes the calculation rules for a feature such as fees, commissions, discounts or scores as ordered formulas with rounding and currency rules and worked examples QA can test against.
category: product
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, business-analyst, backend-engineer, qa-engineer]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [business-rules, rounding, worked-examples, requirements]
pairs_with:
  prompts: [list-feature-edge-cases, write-acceptance-criteria, write-gherkin-scenarios]
args:
  - name: rules_as_described
    description: The calculation as the business describes it today, in words, a spreadsheet formula, or examples.
    type: text
    required: true
  - name: context
    description: Currencies, markets, tax handling, who sees the result (invoice, payout, dashboard) and any existing system this must match.
    type: text
output_contract:
  format: markdown
  sections: [Inputs, Calculation steps, Rounding and precision, Worked examples, Edge cases, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Calculation bugs are expensive because they look correct on the happy path and drift by a cent, a rounding step or an ordering choice at scale. The business usually describes rules in words ("10% commission after fees") that hide the decisions: is the discount applied before or after tax, is rounding done per line or on the total, half-up or half-even, which currency's minor unit applies, what happens with refunds and partial periods, and which date's rate or price applies. Engineers and testers need an ordered list of steps with named inputs, an explicit rounding point, and a table of worked examples with exact expected outputs, including the awkward ones. When the new rule must match an existing spreadsheet or legacy system, the examples should come from that source.
</context>

<task>
<rules_as_described>
{{rules_as_described}}
</rules_as_described>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. List every input with its source, unit, type and allowed range, and the date or moment at which each is read (order date, payment date, period end).
2. Rewrite the calculation as numbered steps, each producing a named intermediate value, in the exact order applied. Make the order of discounts, fees, taxes and caps explicit.
3. Specify rounding and precision: where rounding happens (per line, per step, on the total), the rounding mode, the decimal places or currency minor units, and how residual cents are allocated when amounts are split.
4. Produce worked examples as a table with concrete inputs, each intermediate value and the expected output. Include at least one typical case, one boundary case (cap reached, zero, threshold exactly met), one refund or reversal, and one case that exposes rounding.
5. List edge cases: negative or zero values, missing inputs, mid-period changes, currency conversion, very large values, and changes to rules over time (which version applies to old records).
6. List open questions where the described rule is ambiguous, with the interpretations side by side and a recommended default marked as a proposal.
</task>

<constraints>
- Do not invent tax rates, exchange rates, legal fee caps or accounting treatments; use placeholders and say who must confirm them.
- Show the arithmetic for every worked example so a reviewer can check it by hand; double-check each result.
- Where the description allows two readings, present both with their different results instead of silently picking one.
- If the rule cannot be expressed without missing inputs, ask for them first.
</constraints>

<output_format>
## Inputs
Table: input, source, unit and type, range, read at.
## Calculation steps
Numbered steps with named intermediate values.
## Rounding and precision
Bullets.
## Worked examples
Table: example, inputs, intermediate values, expected output, with arithmetic shown below.
## Edge cases
Bullets: case, expected behaviour.
## Open questions
Numbered: question, readings and their results, recommended default (proposal).
</output_format>
