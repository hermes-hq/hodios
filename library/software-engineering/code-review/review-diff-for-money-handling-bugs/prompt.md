---
schema: 1
id: review-diff-for-money-handling-bugs
kind: prompt
title: Review a diff for money handling bugs
description: Reviews code that calculates, stores or moves money for floating-point use, rounding at the wrong step, currency mix-ups, minor unit errors, lost cents in splits and non-idempotent charges.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, software-engineer, tech-lead]
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
depth: specific
tags: [money-handling, rounding, currency, payments-code, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [integrate-payments, review-pull-request, review-diff-for-concurrency-bugs]
args:
  - name: diff
    description: The change, with the code that computes, stores or transfers amounts.
    type: text
    required: true
  - name: rules
    description: Business and accounting rules you know, for example currencies supported, rounding rule (half-up, half-even), whether prices include tax, where rounding must happen (per line or per invoice).
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Rules to confirm, Tests to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Money bugs are small per transaction and large in aggregate, and they show up in reconciliation, audits and customer complaints rather than in tests. The classic defects: binary floating point for amounts (0.1 + 0.2), rounding each line versus rounding the total giving different invoice totals, rounding mode not matching the accounting rule, splitting an amount three ways and losing or creating a cent, assuming two decimal places when currencies have zero (JPY) or three (KWD, BHD) minor units, adding amounts in different currencies, converting with a rate of unknown age or direction, storing amounts without their currency, negative amounts for refunds handled inconsistently, integer overflow in minor units for large values, and charges or transfers retried without an idempotency key so a customer pays twice.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#rules}}
<rules>
{{rules}}
</rules>
{{/rules}}

1. List every amount the change computes, stores, compares, converts or sends, with its type and currency.
2. Check representation: floating point types or JSON numbers parsed as floats, decimal precision and scale in the database, minor units versus major units at every boundary (API, database, payment provider), and the currency stored next to every amount.
3. Check arithmetic: where rounding happens and with which mode, rounding before versus after tax or discount, percentage calculations, allocation and splits (the remainder must go somewhere deterministic), sums of rounded values versus rounded sums, overflow, and sign handling for refunds and credits.
4. Check currency: mixed-currency arithmetic, minor-unit exponent per currency, conversion rate source, age, direction and rounding, and display formatting kept separate from stored values.
5. Check movement: idempotency keys on charges, refunds and transfers, double-entry or ledger balance, partial failure between debit and credit, and concurrency on balances.
6. For each finding, give a concrete example amount that produces the wrong result and the expected value.
7. Rate: critical (wrong charge, double charge, money lost or created), high (reconciliation mismatch), medium, low.
</task>

<constraints>
- Every finding has a worked example with real numbers.
- Do not assume the rounding rule or tax treatment; if the rules do not say, list it under rules to confirm and show both outcomes.
- Do not give tax or accounting advice beyond what the code needs; point to the finance owner for the rule.
- Use the decimal or money type idiomatic to the code's language in fixes.
- At most 10 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Findings
Numbered: severity, `path:line`, problem, example (input, wrong result, expected), fix.
## Rules to confirm
Bullets for the finance or product owner.
## Tests to add
Bullets with exact amounts and currencies.
</output_format>
